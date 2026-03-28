import { useEffect, useRef } from "react";
import { useAppStore } from "../stores/appStore";
import { MessageBubble } from "./MessageBubble";

export function MessageList() {
  const { messages, streamingContent, isStreaming, streamingToolCalls, streamingTodos } = useAppStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent, streamingToolCalls]);

  const hasStreamingActivity = isStreaming && (streamingContent || Object.keys(streamingToolCalls).length > 0);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          role={msg.role}
          content={msg.content}
          toolCalls={msg.metadata?.tool_calls}
          todos={msg.metadata?.todos}
        />
      ))}
      {hasStreamingActivity && (
        <MessageBubble
          role="assistant"
          content={streamingContent}
          isStreaming
          toolCalls={Object.values(streamingToolCalls)}
          todos={streamingTodos}
        />
      )}
      <div ref={bottomRef} />
    </div>
  );
}
