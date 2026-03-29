import { create } from "zustand";
import type { Agent, Conversation, Message, View, ToolCallInfo, TodoItem, InterruptEvent } from "../types";

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

  // Streaming text
  streamingContent: string;
  setStreamingContent: (content: string) => void;
  appendStreamingContent: (token: string) => void;
  isStreaming: boolean;
  setIsStreaming: (streaming: boolean) => void;

  // Streaming tool calls
  streamingToolCalls: Record<string, ToolCallInfo>;
  addStreamingToolCall: (id: string, name: string) => void;
  appendToolCallArgs: (id: string, argsDelta: string) => void;
  finalizeToolCall: (id: string, name: string, args: Record<string, unknown>) => void;
  setToolCallResult: (id: string, name: string, content: string) => void;

  // Streaming todos
  streamingTodos: TodoItem[];
  setStreamingTodos: (todos: TodoItem[]) => void;

  // Interrupt / approval
  pendingInterrupt: InterruptEvent | null;
  setPendingInterrupt: (interrupt: InterruptEvent | null) => void;

  // Clear all streaming state
  clearStreamingState: () => void;
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

  // Tool calls
  streamingToolCalls: {},
  addStreamingToolCall: (id, name) =>
    set((s) => ({
      streamingToolCalls: {
        ...s.streamingToolCalls,
        [id]: { id, name, args: {}, args_partial: "", status: "calling" },
      },
    })),
  appendToolCallArgs: (id, argsDelta) =>
    set((s) => {
      const tc = s.streamingToolCalls[id];
      if (!tc) return s;
      return {
        streamingToolCalls: {
          ...s.streamingToolCalls,
          [id]: { ...tc, args_partial: (tc.args_partial || "") + argsDelta, status: "streaming_args" },
        },
      };
    }),
  finalizeToolCall: (id, name, args) =>
    set((s) => ({
      streamingToolCalls: {
        ...s.streamingToolCalls,
        [id]: { ...s.streamingToolCalls[id], id, name, args, status: "executing" },
      },
    })),
  setToolCallResult: (id, name, content) =>
    set((s) => ({
      streamingToolCalls: {
        ...s.streamingToolCalls,
        [id]: { ...s.streamingToolCalls[id], id, name, result: content, status: "done" },
      },
    })),

  // Todos
  streamingTodos: [],
  setStreamingTodos: (todos) => set({ streamingTodos: todos }),

  // Interrupt
  pendingInterrupt: null,
  setPendingInterrupt: (interrupt) => set({ pendingInterrupt: interrupt }),

  // Clear
  clearStreamingState: () =>
    set({ streamingContent: "", streamingToolCalls: {}, streamingTodos: [], isStreaming: false, pendingInterrupt: null }),
}));
