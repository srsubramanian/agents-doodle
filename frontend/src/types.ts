export interface ToolConfig {
  name: string;
  enabled: boolean;
  config: Record<string, unknown>;
}

export interface SubAgentConfig {
  name: string;
  description: string;
  system_prompt: string;
  model?: string;
  tools: string[];
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
  model: string;
  tools_config: ToolConfig[];
  subagents_config: SubAgentConfig[];
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  agent_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ToolCallInfo {
  id: string;
  name: string;
  args: Record<string, unknown>;
  args_partial?: string;
  result?: string | null;
  status: "calling" | "streaming_args" | "executing" | "done";
}

export interface TodoItem {
  content: string;
  status: string;
}

export interface MessageMetadata {
  tool_calls: ToolCallInfo[];
  todos: TodoItem[];
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  metadata?: MessageMetadata | null;
  created_at: string;
}

export interface AvailableTool {
  name: string;
  description: string;
  requires_env: string[];
}

export type View = "editor" | "chat";
