export interface Agent {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
  model: string;
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

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export type View = "editor" | "chat";
