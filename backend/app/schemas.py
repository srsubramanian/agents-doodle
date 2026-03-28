from datetime import datetime

from pydantic import BaseModel


# --- Agent schemas ---

class AgentCreate(BaseModel):
    name: str
    description: str = ""
    system_prompt: str = "You are a helpful assistant."
    model: str = "anthropic:claude-sonnet-4-6"


class AgentUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    system_prompt: str | None = None
    model: str | None = None


class AgentResponse(BaseModel):
    id: str
    name: str
    description: str
    system_prompt: str
    model: str
    created_at: datetime
    updated_at: datetime

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


class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    role: str
    content: str
    created_at: datetime

    model_config = {"from_attributes": True}
