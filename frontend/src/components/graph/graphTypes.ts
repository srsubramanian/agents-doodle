export interface AgentNodeData {
  name: string;
  model: string;
  systemPrompt: string;
  description: string;
}

export interface ToolboxNodeData {
  tools: Array<{ name: string; enabled: boolean }>;
  totalAvailable: number;
}

export interface SubAgentsNodeData {
  subagents: Array<{ name: string; description: string }>;
}

export interface ChannelsNodeData {
  channels: string[];
}

export interface SkillsNodeData {
  skills: Array<{ name: string; description: string }>;
}
