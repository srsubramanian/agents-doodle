import json
from datetime import datetime
from typing import Any

from pydantic import BaseModel, field_validator, model_validator


# --- Tool & sub-agent config schemas ---

class ToolConfig(BaseModel):
    name: str
    enabled: bool = True
    config: dict[str, Any] = {}


class SubAgentConfig(BaseModel):
    name: str
    description: str
    system_prompt: str = ""
    model: str | None = None
    tools: list[str] = []


# --- Agent schemas ---

class AgentCreate(BaseModel):
    name: str
    description: str = ""
    system_prompt: str = "You are a helpful assistant."
    model: str = "anthropic:claude-sonnet-4-6"
    tools_config: list[ToolConfig] = []
    subagents_config: list[SubAgentConfig] = []


class AgentUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    system_prompt: str | None = None
    model: str | None = None
    tools_config: list[ToolConfig] | None = None
    subagents_config: list[SubAgentConfig] | None = None


class AgentResponse(BaseModel):
    id: str
    name: str
    description: str
    system_prompt: str
    model: str
    tools_config: list[ToolConfig] = []
    subagents_config: list[SubAgentConfig] = []
    created_at: datetime
    updated_at: datetime

    @field_validator("tools_config", "subagents_config", mode="before")
    @classmethod
    def parse_json_string(cls, v):
        if isinstance(v, str):
            return json.loads(v)
        return v

    model_config = {"from_attributes": True}


# --- Conversation schemas ---

class ConversationResponse(BaseModel):
    id: str
    agent_id: str
    title: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# --- Message schemas ---

class SendMessageRequest(BaseModel):
    content: str


class ToolCallInfo(BaseModel):
    id: str
    name: str
    args: dict[str, Any] = {}
    result: str | None = None


class TodoItem(BaseModel):
    content: str
    status: str


class MessageMetadata(BaseModel):
    tool_calls: list[ToolCallInfo] = []
    todos: list[TodoItem] = []


class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    role: str
    content: str
    metadata: MessageMetadata | None = None
    created_at: datetime

    @model_validator(mode="before")
    @classmethod
    def parse_metadata(cls, data):
        if hasattr(data, "metadata_json"):
            raw = data.metadata_json
            if raw:
                data = dict(data.__dict__) if hasattr(data, "__dict__") else dict(data)
                data["metadata"] = json.loads(raw) if isinstance(raw, str) else raw
            else:
                data = dict(data.__dict__) if hasattr(data, "__dict__") else dict(data)
                data["metadata"] = None
        return data

    model_config = {"from_attributes": True}


# --- Skill schemas ---

class SkillCreate(BaseModel):
    name: str
    description: str = ""
    content: str = ""

class SkillUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    content: str | None = None

class SkillResponse(BaseModel):
    id: str
    name: str
    description: str
    content: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
