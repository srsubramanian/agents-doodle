import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db, async_session
from app.models import Agent, Conversation, Message
from app.schemas import ConversationResponse, MessageResponse, SendMessageRequest
from app.services.chat_service import get_or_create_agent, stream_agent_response

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

    # Stream response, persisting the assistant message when done
    async def generate():
        full_content = ""
        async for event in stream_agent_response(agent, messages, conv_id):
            # Capture content for persistence
            if event.startswith("event: done"):
                import json
                data_line = event.split("\n")[1]
                data = json.loads(data_line.replace("data: ", ""))
                full_content = data.get("full_content", "")

            yield event

        # Persist assistant message
        if full_content:
            async with async_session() as session:
                assistant_msg = Message(
                    id=str(uuid.uuid4()),
                    conversation_id=conv_id,
                    role="assistant",
                    content=full_content,
                )
                session.add(assistant_msg)
                # Update conversation timestamp
                conv_update = await session.get(Conversation, conv_id)
                if conv_update:
                    conv_update.updated_at = datetime.now(timezone.utc)
                await session.commit()

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive", "X-Accel-Buffering": "no"},
    )
