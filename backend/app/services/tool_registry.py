"""Registry of available tools for agents.

Maps tool names to factory functions that create tool callables
for use with create_deep_agent.
"""
import logging
from typing import Any

logger = logging.getLogger(__name__)

# Metadata about available tools (returned by GET /api/tools)
AVAILABLE_TOOLS = [
    {
        "name": "web_search",
        "description": "Search the web using Tavily for current information",
        "requires_env": ["TAVILY_API_KEY"],
    },
]


def _make_web_search(config: dict) -> Any:
    """Create a Tavily web search tool."""
    import os
    from tavily import TavilyClient

    api_key = os.environ.get("TAVILY_API_KEY", "")
    if not api_key:
        logger.warning("TAVILY_API_KEY not set, web_search tool will fail")
        return None

    client = TavilyClient(api_key=api_key)

    def internet_search(query: str, max_results: int = 5) -> str:
        """Search the web for current information on a topic."""
        results = client.search(query, max_results=max_results)
        # Format results as readable text
        output = []
        for r in results.get("results", []):
            output.append(f"**{r.get('title', '')}**\n{r.get('url', '')}\n{r.get('content', '')}\n")
        return "\n---\n".join(output) if output else "No results found."

    return internet_search


_TOOL_FACTORIES = {
    "web_search": _make_web_search,
}


def resolve_tools(tools_config: list[dict]) -> list:
    """Convert tools_config JSON array into tool callables."""
    tools = []
    for tc in tools_config:
        if not tc.get("enabled", True):
            continue
        name = tc.get("name", "")
        factory = _TOOL_FACTORIES.get(name)
        if not factory:
            continue
        tool = factory(tc.get("config", {}))
        if tool:
            tools.append(tool)
    return tools


def resolve_subagents(subagents_config: list[dict], tools_config: list[dict]) -> list[dict]:
    """Convert subagents_config JSON into dicts for create_deep_agent."""
    if not subagents_config:
        return []

    parent_tools = resolve_tools(tools_config)
    subagents = []
    for sa in subagents_config:
        subagent = {
            "name": sa["name"],
            "description": sa["description"],
            "system_prompt": sa.get("system_prompt", ""),
        }
        if sa.get("model"):
            subagent["model"] = sa["model"]
        if parent_tools:
            subagent["tools"] = parent_tools
        subagents.append(subagent)
    return subagents
