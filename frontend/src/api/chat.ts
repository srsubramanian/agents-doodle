import { fetchEventSource } from "@microsoft/fetch-event-source";
import type { Conversation, Message } from "../types";

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

export async function sendMessageStream(
  conversationId: string,
  content: string,
  onToken: (token: string) => void,
  onDone: (fullContent: string) => void,
  onError: (error: string) => void
): Promise<void> {
  const ctrl = new AbortController();

  await fetchEventSource(`/api/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
    signal: ctrl.signal,
    onmessage(ev) {
      if (ev.event === "token") {
        const data = JSON.parse(ev.data);
        onToken(data.content);
      } else if (ev.event === "done") {
        const data = JSON.parse(ev.data);
        onDone(data.full_content);
      } else if (ev.event === "error") {
        const data = JSON.parse(ev.data);
        onError(data.detail);
      }
    },
    onerror(err) {
      onError("Connection lost");
      ctrl.abort();
      throw err;
    },
    openWhenHidden: true,
  });
}
