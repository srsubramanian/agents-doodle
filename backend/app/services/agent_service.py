from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Agent
from app.schemas import AgentCreate, AgentUpdate


async def create_agent(db: AsyncSession, data: AgentCreate) -> Agent:
    agent = Agent(**data.model_dump())
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
    update_data = data.model_dump(exclude_unset=True)
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
