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

      await sendMessageStream(
        convId,
        content,
        (token) => appendStreamingContent(token),
        (fullContent) => {
          const assistantMsg = {
            id: crypto.randomUUID(),
            conversation_id: convId!,
            role: "assistant" as const,
            content: fullContent,
            created_at: new Date().toISOString(),
          };
          addMessage(assistantMsg);
          setStreamingContent("");
          setIsStreaming(false);
        },
        (error) => {
          console.error("Stream error:", error);
          setStreamingContent("");
          setIsStreaming(false);
        }
      );
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
    ]
  );

  if (!agent) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Select an agent to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/30 text-purple-400 flex items-center justify-center text-sm font-medium">
            {agent.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">{agent.name}</h2>
            <p className="text-xs text-gray-500">{agent.model}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("editor")}
            className="px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setSelectedConversationId(null);
              setMessages([]);
            }}
            className="px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            New Chat
          </button>
        </div>
      </div>

      {/* Messages or empty state */}
      {messages.length === 0 && !isStreaming ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-2xl font-semibold mx-auto mb-4">
              {agent.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-lg font-medium text-white mb-1">
              Chat with {agent.name}
            </h3>
            <p className="text-sm text-gray-500">Send a message to get started</p>
          </div>
        </div>
      ) : (
        <MessageList />
      )}

      <ChatInput onSend={handleSend} disabled={isStreaming} />
    </div>
  );
}
