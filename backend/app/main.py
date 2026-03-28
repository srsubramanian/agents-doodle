from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, run_migrations
from app.models import Base
from app.routers import agents, chat, skills


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    # Add any missing columns to existing tables
    await run_migrations()
    yield


app = FastAPI(title="Agents Doodle", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agents.router)
app.include_router(chat.router)
app.include_router(skills.router)


@app.get("/api/health")
async def health():
    return {"status": "ok"}
