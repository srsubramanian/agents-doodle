import json
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Agent
from app.schemas import AgentCreate, AgentUpdate


def _serialize_agent_data(data: dict) -> dict:
    """Convert list/dict fields to JSON strings for storage."""
    for key in ("tools_config", "subagents_config"):
        if key in data and not isinstance(data[key], str):
            data[key] = json.dumps([item.model_dump() if hasattr(item, "model_dump") else item for item in data[key]])
    if "interrupt_config" in data and not isinstance(data["interrupt_config"], str):
        data["interrupt_config"] = json.dumps(data["interrupt_config"])
    return data


async def create_agent(db: AsyncSession, data: AgentCreate) -> Agent:
    agent_data = _serialize_agent_data(data.model_dump())
    agent = Agent(**agent_data)
    db.add(agent)
    await db.commit()
    await db.refresh(agent)
    return agent


async def list_agents(db: AsyncSession) -> list[Agent]:
    result = await db.execute(select(Agent).order_by(Agent.created_at.desc()))
    return list(result.scalars().all())


async def get_agent(db: AsyncSession, agent_id: str) -> Agent | None:
    return await db.get(Agent, agent_id)


async def update_agent(db: AsyncSession, agent_id: str, data: AgentUpdate) -> Agent | None:
    agent = await db.get(Agent, agent_id)
    if not agent:
        return None
    update_data = _serialize_agent_data(data.model_dump(exclude_unset=True))
    for key, value in update_data.items():
        setattr(agent, key, value)
    agent.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(agent)
    return agent


async def delete_agent(db: AsyncSession, agent_id: str) -> bool:
    agent = await db.get(Agent, agent_id)
    if not agent:
        return False
    await db.delete(agent)
    await db.commit()
    return True
