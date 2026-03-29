from sqlalchemy import text
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.config import settings

engine = create_async_engine(settings.database_url, echo=False)
async_session = async_sessionmaker(engine, expire_on_commit=False)


async def get_db():
    async with async_session() as session:
        yield session


async def run_migrations():
    """Add columns that may be missing from older databases."""
    migrations = [
        ("agents", "tools_config", "TEXT DEFAULT '[]'"),
        ("agents", "subagents_config", "TEXT DEFAULT '[]'"),
        ("messages", "metadata_json", "TEXT DEFAULT NULL"),
        ("agents", "interrupt_config", "TEXT DEFAULT '{}'"),
        ("agents", "agents_md_content", "TEXT DEFAULT ''"),
        ("agents", "memory_enabled", "INTEGER DEFAULT 1"),
    ]

    async with engine.begin() as conn:
        for table, column, col_type in migrations:
            result = await conn.execute(text(f"PRAGMA table_info({table})"))
            existing = {row[1] for row in result.fetchall()}
            if column not in existing:
                await conn.execute(
                    text(f"ALTER TABLE {table} ADD COLUMN {column} {col_type}")
                )
