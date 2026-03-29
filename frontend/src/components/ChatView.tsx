import { useEffect, useCallback } from "react";
import { useAppStore } from "../stores/appStore";
import {
  createConversation,
  fetchMessages,
  sendMessageStream,
} from "../api/chat";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

export function ChatView() {
  const {
    agents,
    selectedAgentId,
    selectedConversationId,
    setSelectedConversationId,
    messages,
    setMessages,
    addMessage,
    setStreamingContent,
    appendStreamingContent,
    isStreaming,
    setIsStreaming,
    setView,
    addConversation,
    addStreamingToolCall,
    appendToolCallArgs,
    finalizeToolCall,
    setToolCallResult,
    setStreamingTodos,
    clearStreamingState,
  } = useAppStore();

  const agent = agents.find((a) => a.id === selectedAgentId);

  // Load messages when conversation changes
  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages(selectedConversationId).then(setMessages).catch(console.error);
    }
  }, [selectedConversationId, setMessages]);

  const handleSend = useCallback(
    async (content: string) => {
      if (!selectedAgentId) return;

      let convId = selectedConversationId;

      // Create conversation if none exists
      if (!convId) {
        const conv = await createConversation(selectedAgentId);
        addConversation(conv);
        setSelectedConversationId(conv.id);
        convId = conv.id;
      }

      // Optimistically add user message
      const userMsg = {
        id: crypto.randomUUID(),
        conversation_id: convId,
        role: "user" as const,
        content,
        created_at: new Date().toISOString(),
      };
      addMessage(userMsg);
      setIsStreaming(true);
      setStreamingContent("");

      await sendMessageStream(convId, content, {
        onToken: (token) => appendStreamingContent(token),
        onToolCallStart: (id, name) => addStreamingToolCall(id, name),
        onToolCallArgs: (id, argsDelta) => appendToolCallArgs(id, argsDelta),
        onToolCallEnd: (id, name, args) => finalizeToolCall(id, name, args),
        onToolResult: (id, name, resultContent) => setToolCallResult(id, name, resultContent),
        onTodos: (todos) => setStreamingTodos(todos),
        onDone: (data) => {
          const assistantMsg = {
            id: crypto.randomUUID(),
            conversation_id: convId!,
            role: "assistant" as const,
            content: data.full_content,
            metadata: data.tool_calls || data.todos
              ? {
                  tool_calls: (data.tool_calls || []).map((tc) => ({ ...tc, status: "done" as const })),
                  todos: data.todos || [],
                }
              : undefined,
            created_at: new Date().toISOString(),
          };
          addMessage(assistantMsg);
          clearStreamingState();
        },
        onError: (error) => {
          console.error("Stream error:", error);
          clearStreamingState();
        },
      });
    },
    [
      selectedAgentId,
      selectedConversationId,
      addConversation,
      setSelectedConversationId,
      addMessage,
      setIsStreaming,
      setStreamingContent,
      appendStreamingContent,
      addStreamingToolCall,
      appendToolCallArgs,
      finalizeToolCall,
      setToolCallResult,
      setStreamingTodos,
      clearStreamingState,
    ]
  );

  if (!agent) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto size-12 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-white">No agent selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select an agent to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-gray-300">
            {agent.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <h2 className="text-sm font-semibold text-white">{agent.name}</h2>
            <p className="text-xs text-gray-500">{agent.model}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("editor")}
            className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 inset-ring inset-ring-white/5"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setSelectedConversationId(null);
              setMessages([]);
              clearStreamingState();
            }}
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            New Chat
          </button>
        </div>
      </div>

      {/* Messages or empty state */}
      {messages.length === 0 && !isStreaming ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto size-12 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-white">
              Chat with {agent.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">Send a message to get started</p>
          </div>
        </div>
      ) : (
        <MessageList />
      )}

      <ChatInput onSend={handleSend} disabled={isStreaming} />
    </div>
  );
}
