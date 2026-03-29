import { fetchEventSource } from "@microsoft/fetch-event-source";
import type { Conversation, Message, ToolCallInfo, TodoItem, InterruptEvent } from "../types";

export async function createConversation(agentId: string): Promise<Conversation> {
  const res = await fetch(`/api/agents/${agentId}/conversations`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to create conversation");
  return res.json();
}

export async function fetchConversations(agentId: string): Promise<Conversation[]> {
  const res = await fetch(`/api/agents/${agentId}/conversations`);
  if (!res.ok) throw new Error("Failed to fetch conversations");
  return res.json();
}

export async function fetchMessages(conversationId: string): Promise<Message[]> {
  const res = await fetch(`/api/conversations/${conversationId}/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

export interface StreamCallbacks {
  onToken: (token: string) => void;
  onToolCallStart: (id: string, name: string) => void;
  onToolCallArgs: (id: string, argsDelta: string) => void;
  onToolCallEnd: (id: string, name: string, args: Record<string, unknown>) => void;
  onToolResult: (id: string, name: string, content: string) => void;
  onTodos: (todos: TodoItem[]) => void;
  onInterrupt: (interrupt: InterruptEvent) => void;
  onDone: (data: {
    full_content: string;
    tool_calls?: ToolCallInfo[];
    todos?: TodoItem[];
  }) => void;
  onError: (error: string) => void;
}

function createSSEHandler(callbacks: StreamCallbacks) {
  return {
    onmessage(ev: { event: string; data: string }) {
      const data = JSON.parse(ev.data);
      switch (ev.event) {
        case "token":
          callbacks.onToken(data.content);
          break;
        case "tool_call_start":
          callbacks.onToolCallStart(data.id, data.name);
          break;
        case "tool_call_args":
          callbacks.onToolCallArgs(data.id, data.args_partial);
          break;
        case "tool_call_end":
          callbacks.onToolCallEnd(data.id, data.name, data.args);
          break;
        case "tool_result":
          callbacks.onToolResult(data.id, data.name, data.content);
          break;
        case "todos":
          callbacks.onTodos(data.todos);
          break;
        case "interrupt":
          callbacks.onInterrupt(data);
          break;
        case "done":
          callbacks.onDone(data);
          break;
        case "error":
          callbacks.onError(data.detail);
          break;
      }
    },
  };
}

export async function sendMessageStream(
  conversationId: string,
  content: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const ctrl = new AbortController();
  const handler = createSSEHandler(callbacks);

  await fetchEventSource(`/api/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
    signal: ctrl.signal,
    onmessage: handler.onmessage,
    onerror(err) {
      callbacks.onError("Connection lost");
      ctrl.abort();
      throw err;
    },
    openWhenHidden: true,
  });
}

export async function sendApproval(
  conversationId: string,
  decision: "approve" | "reject",
  callbacks: StreamCallbacks
): Promise<void> {
  const ctrl = new AbortController();
  const handler = createSSEHandler(callbacks);

  await fetchEventSource(`/api/conversations/${conversationId}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ decision }),
    signal: ctrl.signal,
    onmessage: handler.onmessage,
    onerror(err) {
      callbacks.onError("Connection lost");
      ctrl.abort();
      throw err;
    },
    openWhenHidden: true,
  });
}
