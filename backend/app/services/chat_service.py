import json
import logging
from typing import AsyncGenerator

from deepagents import create_deep_agent

from app.models import Agent as AgentModel

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

        agent = create_deep_agent(
            model=agent_config.model,
            system_prompt=agent_config.system_prompt,
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
    agent, messages: list[dict], conversation_id: str
) -> AsyncGenerator[str, None]:
    """Stream deepagent response as SSE events."""
    full_content = ""

    try:
        async for chunk in agent.astream(
            {"messages": messages},
            stream_mode="messages",
            version="v2",
        ):
            if chunk.get("type") != "messages":
                continue

            token_msg, metadata = chunk["data"]

            # Only stream AI text tokens (skip tool calls and tool results)
            if getattr(token_msg, "type", None) != "ai":
                continue
            if getattr(token_msg, "tool_call_chunks", None):
                continue

            content = getattr(token_msg, "content", None)
            if not content:
                continue

            text = _extract_text(content)
            if text:
                full_content += text
                yield f"event: token\ndata: {json.dumps({'content': text})}\n\n"

        # If no text was streamed from messages mode, extract from the final result
        if not full_content:
            # Run invoke to get the final result
            result = await agent.ainvoke(
                {"messages": messages},
            )
            # Get the last AI message from the result
            for msg in reversed(result.get("messages", [])):
                if getattr(msg, "type", None) == "ai" and not getattr(msg, "tool_calls", None):
                    text = _extract_text(msg.content)
                    if text:
                        full_content = text
                        yield f"event: token\ndata: {json.dumps({'content': text})}\n\n"
                        break

        yield f"event: done\ndata: {json.dumps({'full_content': full_content})}\n\n"

    except Exception as e:
        logger.exception("Error streaming agent response")
        yield f"event: error\ndata: {json.dumps({'detail': str(e)})}\n\n"
