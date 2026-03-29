import { useEffect, useCallback } from "react";
import { useAppStore } from "../stores/appStore";
import {
  createConversation,
  fetchMessages,
  sendMessageStream,
} from "../api/chat";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

interface Props {
  onHide: () => void;
}

export function EditorChatPanel({ onHide }: Props) {
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
    addConversation,
    addStreamingToolCall,
    appendToolCallArgs,
    finalizeToolCall,
    setToolCallResult,
    setStreamingTodos,
    clearStreamingState,
  } = useAppStore();

  const agent = agents.find((a) => a.id === selectedAgentId);

  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages(selectedConversationId).then(setMessages).catch(console.error);
    }
  }, [selectedConversationId, setMessages]);

  const handleSend = useCallback(
    async (content: string) => {
      if (!selectedAgentId) return;

      let convId = selectedConversationId;
      if (!convId) {
        const conv = await createConversation(selectedAgentId);
        addConversation(conv);
        setSelectedConversationId(conv.id);
        convId = conv.id;
      }

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
      selectedAgentId, selectedConversationId, addConversation,
      setSelectedConversationId, addMessage, setIsStreaming,
      setStreamingContent, appendStreamingContent, addStreamingToolCall,
      appendToolCallArgs, finalizeToolCall, setToolCallResult,
      setStreamingTodos, clearStreamingState,
    ]
  );

  if (!agent) return null;

  return (
    <div className="flex flex-col h-full border-r border-gray-800 bg-[#0f1117]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span className="text-xs font-semibold text-gray-400">Threads</span>
        </div>
        <button
          onClick={onHide}
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          Hide Chat
        </button>
      </div>

      {/* Chat content */}
      {messages.length === 0 && !isStreaming ? (
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-gray-300 mx-auto mb-3">
              {agent.name.charAt(0).toUpperCase()}
            </span>
            <h3 className="text-sm font-semibold text-white">Chat with {agent.name}</h3>
            <p className="mt-1 text-xs text-gray-500">Test your agent or ask it to make changes</p>
          </div>
        </div>
      ) : (
        <MessageList />
      )}

      {/* Input */}
      <div className="px-3 pb-3">
        <ChatInput onSend={handleSend} disabled={isStreaming} />
      </div>
    </div>
  );
}
