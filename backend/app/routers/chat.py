import json
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db, async_session
from app.models import Agent, Conversation, Message, Skill, agent_skills as agent_skills_table
from app.schemas import ApprovalRequest, ConversationResponse, MessageResponse, SendMessageRequest
from app.services.chat_service import check_for_interrupt, get_or_create_agent, stream_agent_response

router = APIRouter(tags=["chat"])


# --- Conversation endpoints ---


@router.post("/api/agents/{agent_id}/conversations", response_model=ConversationResponse, status_code=201)
async def create_conversation(agent_id: str, db: AsyncSession = Depends(get_db)):
    agent = await db.get(Agent, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    conv = Conversation(agent_id=agent_id)
    db.add(conv)
    await db.commit()
    await db.refresh(conv)
    return conv


@router.get("/api/agents/{agent_id}/conversations", response_model=list[ConversationResponse])
async def list_conversations(agent_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Conversation)
        .where(Conversation.agent_id == agent_id)
        .order_by(Conversation.updated_at.desc())
    )
    return list(result.scalars().all())


@router.get("/api/conversations/{conv_id}/messages", response_model=list[MessageResponse])
async def get_messages(conv_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Message)
        .where(Message.conversation_id == conv_id)
        .order_by(Message.created_at)
    )
    return list(result.scalars().all())


# --- Chat SSE endpoint ---


@router.post("/api/conversations/{conv_id}/messages")
async def send_message(conv_id: str, body: SendMessageRequest, db: AsyncSession = Depends(get_db)):
    # Load conversation + agent
    conv = await db.get(Conversation, conv_id)
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    agent_config = await db.get(Agent, conv.agent_id)
    if not agent_config:
        raise HTTPException(status_code=404, detail="Agent not found")

    # Persist user message
    user_msg = Message(
        id=str(uuid.uuid4()),
        conversation_id=conv_id,
        role="user",
        content=body.content,
    )
    db.add(user_msg)

    # Auto-title: use first message as title
    if conv.title == "New conversation":
        conv.title = body.content[:50] + ("..." if len(body.content) > 50 else "")
        conv.updated_at = datetime.now(timezone.utc)

    await db.commit()

    # Load full message history
    result = await db.execute(
        select(Message)
        .where(Message.conversation_id == conv_id)
        .order_by(Message.created_at)
    )
    history = result.scalars().all()
    messages = [{"role": m.role, "content": m.content} for m in history]

    # Create deepagent
    agent = get_or_create_agent(agent_config)

    # Load agent's skills
    skills_result = await db.execute(
        select(Skill)
        .join(agent_skills_table, Skill.id == agent_skills_table.c.skill_id)
        .where(agent_skills_table.c.agent_id == conv.agent_id)
    )
    agent_skills_list = list(skills_result.scalars().all())

    # Build skills files dict for StateBackend
    skills_files = {}
    for skill in agent_skills_list:
        skill_path = f"/skills/{skill.name}/SKILL.md"
        skill_md = f"---\nname: {skill.name}\ndescription: {skill.description}\n---\n\n{skill.content}"
        skills_files[skill_path] = {"type": "file", "data": {"content": skill_md}}

    # Add AGENTS.md if configured
    if agent_config.agents_md_content:
        skills_files["/AGENTS.md"] = {"type": "file", "data": {"content": agent_config.agents_md_content}}

    # Stream response, persisting the assistant message when done
    async def generate():
        full_content = ""
        metadata_json = None

        async for event in stream_agent_response(
            agent, messages, conv_id, skills_files=skills_files or None, thread_id=conv_id
        ):
            # Capture done payload for persistence
            if event.startswith("event: done"):
                data_line = event.split("\n")[1]
                data = json.loads(data_line.replace("data: ", ""))
                full_content = data.get("full_content", "")

                # Build metadata from tool calls and todos
                metadata = {}
                if data.get("tool_calls"):
                    metadata["tool_calls"] = data["tool_calls"]
                if data.get("todos"):
                    metadata["todos"] = data["todos"]
                if metadata:
                    metadata_json = json.dumps(metadata)

            yield event

        # Check for pending interrupt
        interrupt = await check_for_interrupt(agent, conv_id)
        if interrupt:
            yield f"event: interrupt\ndata: {json.dumps(interrupt)}\n\n"
        elif full_content or metadata_json:
            # Only persist assistant message if no interrupt
            async with async_session() as session:
                assistant_msg = Message(
                    id=str(uuid.uuid4()),
                    conversation_id=conv_id,
                    role="assistant",
                    content=full_content,
                    metadata_json=metadata_json,
                )
                session.add(assistant_msg)
                conv_update = await session.get(Conversation, conv_id)
                if conv_update:
                    conv_update.updated_at = datetime.now(timezone.utc)
                await session.commit()

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive", "X-Accel-Buffering": "no"},
    )


# --- Approval endpoint for Human-in-the-Loop ---


@router.post("/api/conversations/{conv_id}/approve")
async def approve_tool_call(conv_id: str, body: ApprovalRequest, db: AsyncSession = Depends(get_db)):
    conv = await db.get(Conversation, conv_id)
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    agent_config = await db.get(Agent, conv.agent_id)
    if not agent_config:
        raise HTTPException(status_code=404, detail="Agent not found")

    agent = get_or_create_agent(agent_config)

    from langgraph.types import Command

    # Build decision
    if body.decision == "approve":
        decisions = [{"type": "approve"}]
    else:
        decisions = [{"type": "reject"}]

    resume_command = Command(resume={"decisions": decisions})

    async def generate():
        full_content = ""
        metadata_json = None

        async for event in stream_agent_response(
            agent, conversation_id=conv_id, thread_id=conv_id, resume_command=resume_command
        ):
            # Capture done payload for persistence
            if event.startswith("event: done"):
                data_line = event.split("\n")[1]
                data = json.loads(data_line.replace("data: ", ""))
                full_content = data.get("full_content", "")

                # Build metadata from tool calls and todos
                metadata = {}
                if data.get("tool_calls"):
                    metadata["tool_calls"] = data["tool_calls"]
                if data.get("todos"):
                    metadata["todos"] = data["todos"]
                if metadata:
                    metadata_json = json.dumps(metadata)

            yield event

        # Check for another interrupt
        interrupt = await check_for_interrupt(agent, conv_id)
        if interrupt:
            yield f"event: interrupt\ndata: {json.dumps(interrupt)}\n\n"
        elif full_content or metadata_json:
            async with async_session() as session:
                assistant_msg = Message(
                    id=str(uuid.uuid4()),
                    conversation_id=conv_id,
                    role="assistant",
                    content=full_content,
                    metadata_json=metadata_json,
                )
                session.add(assistant_msg)
                conv_update = await session.get(Conversation, conv_id)
                if conv_update:
                    conv_update.updated_at = datetime.now(timezone.utc)
                await session.commit()

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive", "X-Accel-Buffering": "no"},
    )


# --- Memory browsing endpoints ---


@router.get("/api/agents/{agent_id}/memory")
async def list_agent_memory(agent_id: str):
    """List persistent memory files for an agent."""
    from app.services.chat_service import _store

    memories = []
    try:
        # Search store for items in the agent's namespace
        items = _store.search(("filesystem",))
        for item in items:
            key = item.key
            if key.startswith("/memories/"):
                memories.append({
                    "key": key,
                    "preview": str(item.value.get("data", {}).get("content", ""))[:200],
                })
    except Exception:
        pass

    return {"files": memories}


@router.delete("/api/agents/{agent_id}/memory/{filename:path}")
async def delete_agent_memory(agent_id: str, filename: str):
    """Delete a persistent memory file."""
    from app.services.chat_service import _store

    try:
        _store.delete(("filesystem",), f"/memories/{filename}")
    except Exception:
        pass

    return {"status": "deleted"}
