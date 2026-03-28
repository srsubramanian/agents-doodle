from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Skill, Agent, agent_skills
from app.schemas import SkillCreate, SkillUpdate, SkillResponse

router = APIRouter(prefix="/api/skills", tags=["skills"])


@router.post("", response_model=SkillResponse, status_code=201)
async def create_skill(data: SkillCreate, db: AsyncSession = Depends(get_db)):
    skill = Skill(**data.model_dump())
    db.add(skill)
    await db.commit()
    await db.refresh(skill)
    return skill


@router.get("", response_model=list[SkillResponse])
async def list_skills(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Skill).order_by(Skill.created_at.desc()))
    return list(result.scalars().all())


@router.get("/{skill_id}", response_model=SkillResponse)
async def get_skill(skill_id: str, db: AsyncSession = Depends(get_db)):
    skill = await db.get(Skill, skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill


@router.put("/{skill_id}", response_model=SkillResponse)
async def update_skill(skill_id: str, data: SkillUpdate, db: AsyncSession = Depends(get_db)):
    skill = await db.get(Skill, skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(skill, key, value)
    skill.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(skill)
    return skill


@router.delete("/{skill_id}", status_code=204)
async def delete_skill(skill_id: str, db: AsyncSession = Depends(get_db)):
    skill = await db.get(Skill, skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    await db.delete(skill)
    await db.commit()


# --- Agent-Skill association ---

@router.get("/agent/{agent_id}", response_model=list[SkillResponse])
async def list_agent_skills(agent_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Skill)
        .join(agent_skills, Skill.id == agent_skills.c.skill_id)
        .where(agent_skills.c.agent_id == agent_id)
    )
    return list(result.scalars().all())


@router.post("/agent/{agent_id}/{skill_id}", status_code=201)
async def attach_skill(agent_id: str, skill_id: str, db: AsyncSession = Depends(get_db)):
    agent = await db.get(Agent, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    skill = await db.get(Skill, skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    await db.execute(agent_skills.insert().values(agent_id=agent_id, skill_id=skill_id))
    await db.commit()
    return {"status": "attached"}


@router.delete("/agent/{agent_id}/{skill_id}", status_code=204)
async def detach_skill(agent_id: str, skill_id: str, db: AsyncSession = Depends(get_db)):
    await db.execute(
        delete(agent_skills).where(
            agent_skills.c.agent_id == agent_id,
            agent_skills.c.skill_id == skill_id,
        )
    )
    await db.commit()
