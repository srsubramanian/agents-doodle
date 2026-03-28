import os
from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_path: str = "./data/agents_doodle.db"
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    @property
    def database_url(self) -> str:
        # Ensure the directory exists
        db_path = Path(self.database_path)
        db_path.parent.mkdir(parents=True, exist_ok=True)
        return f"sqlite+aiosqlite:///{db_path}"

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
