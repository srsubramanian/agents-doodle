import json
import logging
from typing import AsyncGenerator

from deepagents import create_deep_agent

from app.models import Agent as AgentModel
from app.services.tool_registry import resolve_tools, resolve_subagents

logger = logging.getLogger(__name__)

# Cache compiled agents: key = "{agent_id}:{updated_at_iso}"
_agent_cache: dict[str, object] = {}


def get_or_create_agent(agent_config: AgentModel):
    """Get a cached deepagent or create a new one."""
    cache_key = f"{agent_config.id}:{agent_config.updated_at.isoformat()}"

    if cache_key not in _agent_cache:
        # Evict old versions of this agent
        keys_to_remove = [k for k in _agent_cache if k.startswith(agent_config.id)]
        for k in keys_to_remove:
            del _agent_cache[k]

        tools_config = json.loads(agent_config.tools_config or "[]")
        subagents_config = json.loads(agent_config.subagents_config or "[]")

        tools = resolve_tools(tools_config) or None
        subagents = resolve_subagents(subagents_config, tools_config) or None

        agent = create_deep_agent(
            model=agent_config.model,
            system_prompt=agent_config.system_prompt,
            tools=tools,
            subagents=subagents,
            skills=["/skills/"],
        )
        _agent_cache[cache_key] = agent

    return _agent_cache[cache_key]


def _extract_text(content) -> str:
    """Extract text from AI message content (string or list of content blocks)."""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for c in content:
            if isinstance(c, dict) and c.get("type") == "text":
                parts.append(c["text"])
            elif isinstance(c, str):
                parts.append(c)
        return "".join(parts)
    return ""


async def stream_agent_response(
    agent, messages: list[dict], conversation_id: str, skills_files: dict | None = None
) -> AsyncGenerator[str, None]:
    """Stream deepagent response as SSE events including tool calls."""
    full_content = ""
    tool_calls_seen: dict[str, dict] = {}
    active_tool_call_ids: set[str] = set()
    latest_todos: list[dict] | None = None

    try:
        astream_input = {"messages": messages}
        if skills_files:
            astream_input["files"] = skills_files
        async for chunk in agent.astream(
            astream_input,
            stream_mode="messages",
            version="v2",
        ):
            if chunk.get("type") != "messages":
                continue

            token_msg, metadata = chunk["data"]
            msg_type = getattr(token_msg, "type", None)

            if msg_type == "ai":
                # --- Tool call chunks (streaming args) ---
                tc_chunks = getattr(token_msg, "tool_call_chunks", None)
                if tc_chunks:
                    for tc in tc_chunks:
                        call_id = tc.get("id") or str(tc.get("index", ""))
                        if not call_id:
                            continue
                        name = tc.get("name", "")
                        args_delta = tc.get("args", "")

                        if call_id not in active_tool_call_ids and name:
                            active_tool_call_ids.add(call_id)
                            tool_calls_seen[call_id] = {"name": name, "args_partial": "", "result": None}
                            yield f"event: tool_call_start\ndata: {json.dumps({'id': call_id, 'name': name})}\n\n"

                        if call_id in tool_calls_seen and args_delta:
                            tool_calls_seen[call_id]["args_partial"] += args_delta
                    continue

                # --- Finalized tool_calls on complete message ---
                finalized_tcs = getattr(token_msg, "tool_calls", None)
                if finalized_tcs:
                    for tc in finalized_tcs:
                        call_id = tc.get("id", "")
                        name = tc.get("name", "")
                        args = tc.get("args", {})
                        if call_id not in tool_calls_seen:
                            tool_calls_seen[call_id] = {"name": name, "args_partial": "", "result": None}
                        tool_calls_seen[call_id]["args_final"] = args
                        yield f"event: tool_call_end\ndata: {json.dumps({'id': call_id, 'name': name, 'args': args})}\n\n"
                    continue

                # --- Regular text content ---
                content = getattr(token_msg, "content", None)
                if not content:
                    continue
                text = _extract_text(content)
                if text:
                    full_content += text
                    yield f"event: token\ndata: {json.dumps({'content': text})}\n\n"

            elif msg_type == "tool":
                # --- Tool results ---
                tool_call_id = getattr(token_msg, "tool_call_id", "")
                tool_name = getattr(token_msg, "name", "")
                tool_content = _extract_text(getattr(token_msg, "content", ""))

                if tool_call_id in tool_calls_seen:
                    tool_calls_seen[tool_call_id]["result"] = tool_content

                # Check for write_todos results
                tc_name = tool_calls_seen.get(tool_call_id, {}).get("name", "") or tool_name
                if tc_name == "write_todos":
                    try:
                        # Try parsing the todo list from the result
                        if "todos" in tool_content.lower():
                            # The tool result might contain the todo list
                            pass
                    except Exception:
                        pass
                    yield f"event: tool_result\ndata: {json.dumps({'id': tool_call_id, 'name': tc_name, 'content': tool_content[:3000]})}\n\n"
                else:
                    yield f"event: tool_result\ndata: {json.dumps({'id': tool_call_id, 'name': tc_name, 'content': tool_content[:3000]})}\n\n"

        # Fallback: if no text was streamed and no tool calls, try invoke
        if not full_content and not tool_calls_seen:
            result = await agent.ainvoke(astream_input)
            for msg in reversed(result.get("messages", [])):
                if getattr(msg, "type", None) == "ai" and not getattr(msg, "tool_calls", None):
                    text = _extract_text(msg.content)
                    if text:
                        full_content = text
                        yield f"event: token\ndata: {json.dumps({'content': text})}\n\n"
                        break

        # Build done payload
        done_data: dict = {"full_content": full_content}
        if tool_calls_seen:
            done_data["tool_calls"] = [
                {
                    "id": cid,
                    "name": info.get("name", ""),
                    "args": info.get("args_final", {}),
                    "result": info.get("result"),
                }
                for cid, info in tool_calls_seen.items()
            ]
        if latest_todos:
            done_data["todos"] = latest_todos

        yield f"event: done\ndata: {json.dumps(done_data)}\n\n"

    except Exception as e:
        logger.exception("Error streaming agent response")
        yield f"event: error\ndata: {json.dumps({'detail': str(e)})}\n\n"
