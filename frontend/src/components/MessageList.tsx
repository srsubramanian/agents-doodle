import { useEffect, useRef } from "react";
import { useAppStore } from "../stores/appStore";
import { MessageBubble } from "./MessageBubble";

export function MessageList() {
  const { messages, streamingContent, isStreaming } = useAppStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
      ))}
      {isStreaming && streamingContent && (
        <MessageBubble role="assistant" content={streamingContent} isStreaming />
      )}
      <div ref={bottomRef} />
    </div>
  );
}
