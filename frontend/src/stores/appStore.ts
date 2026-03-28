import { create } from "zustand";
import type { Agent, Conversation, Message, View } from "../types";

interface AppState {
  // Agents
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;
  addAgent: (agent: Agent) => void;
  updateAgentInList: (agent: Agent) => void;
  removeAgent: (id: string) => void;

  // Selection
  selectedAgentId: string | null;
  setSelectedAgentId: (id: string | null) => void;
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;

  // View
  view: View;
  setView: (view: View) => void;

  // Conversations
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;

  // Messages
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;

  // Streaming
  streamingContent: string;
  setStreamingContent: (content: string) => void;
  appendStreamingContent: (token: string) => void;
  isStreaming: boolean;
  setIsStreaming: (streaming: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  agents: [],
  setAgents: (agents) => set({ agents }),
  addAgent: (agent) => set((s) => ({ agents: [agent, ...s.agents] })),
  updateAgentInList: (agent) =>
    set((s) => ({ agents: s.agents.map((a) => (a.id === agent.id ? agent : a)) })),
  removeAgent: (id) => set((s) => ({ agents: s.agents.filter((a) => a.id !== id) })),

  selectedAgentId: null,
  setSelectedAgentId: (id) => set({ selectedAgentId: id, selectedConversationId: null, messages: [], view: id ? "chat" : "editor" }),
  selectedConversationId: null,
  setSelectedConversationId: (id) => set({ selectedConversationId: id }),

  view: "editor",
  setView: (view) => set({ view }),

  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  addConversation: (conversation) => set((s) => ({ conversations: [conversation, ...s.conversations] })),

  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((s) => ({ messages: [...s.messages, message] })),

  streamingContent: "",
  setStreamingContent: (content) => set({ streamingContent: content }),
  appendStreamingContent: (token) => set((s) => ({ streamingContent: s.streamingContent + token })),
  isStreaming: false,
  setIsStreaming: (streaming) => set({ isStreaming: streaming }),
}));
