import { MarkdownContent } from "./MarkdownContent";
import type { ToolCallInfo, TodoItem } from "../types";

interface Props {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  toolCalls?: ToolCallInfo[];
  todos?: TodoItem[];
}

export function MessageBubble({ role, content, isStreaming, toolCalls, todos }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white rounded-br-md px-4 py-3 whitespace-pre-wrap"
            : "bg-gray-800 text-gray-200 rounded-bl-md"
        }`}
      >
        {/* Todo panel for assistant messages */}
        {!isUser && todos && todos.length > 0 && (
          <div className="px-4 pt-3 pb-1">
            <div className="border border-gray-700 rounded-lg p-2.5 bg-gray-900/50 mb-2">
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Agent Plan
              </div>
              {todos.map((todo, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs py-0.5">
                  <span className="text-[10px]">
                    {todo.status === "completed" ? "\u2705" : todo.status === "in_progress" ? "\u23f3" : "\u2b1c"}
                  </span>
                  <span className={todo.status === "completed" ? "text-gray-500 line-through" : "text-gray-300"}>
                    {todo.content}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tool calls for assistant messages */}
        {!isUser && toolCalls && toolCalls.length > 0 && (
          <div className="px-4 pt-2">
            {toolCalls.map((tc) => (
              <ToolCallCard key={tc.id} toolCall={tc} />
            ))}
          </div>
        )}

        {/* Message content */}
        {content && (
          <div className={!isUser ? "px-4 py-3" : ""}>
            {isUser ? content : <MarkdownContent content={content} />}
          </div>
        )}

        {isStreaming && (
          <div className="px-4 pb-3">
            <span className="inline-block w-1.5 h-4 bg-blue-400 ml-0.5 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

function ToolCallCard({ toolCall }: { toolCall: ToolCallInfo }) {
  const isLoading = toolCall.status === "calling" || toolCall.status === "streaming_args" || toolCall.status === "executing";

  return (
    <details className="my-1.5 border border-gray-700 rounded-lg overflow-hidden bg-gray-900/50 group">
      <summary className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 cursor-pointer hover:bg-gray-700/30 list-none">
        <span className="text-[10px]">{isLoading ? "\u23f3" : "\u2705"}</span>
        <span className="font-mono font-medium text-blue-400">{toolCall.name}</span>
        {toolCall.args_partial && isLoading && (
          <span className="text-gray-600 truncate max-w-[200px]">{toolCall.args_partial}</span>
        )}
        <span className="text-gray-600 ml-auto text-[10px]">click to expand</span>
      </summary>
      <div className="px-3 py-2 border-t border-gray-700 text-xs space-y-2">
        {toolCall.args && Object.keys(toolCall.args).length > 0 && (
          <div>
            <span className="text-gray-500">Arguments:</span>
            <pre className="mt-1 p-2 bg-gray-950 rounded text-gray-400 overflow-x-auto text-[11px]">
              {JSON.stringify(toolCall.args, null, 2)}
            </pre>
          </div>
        )}
        {toolCall.result && (
          <div>
            <span className="text-gray-500">Result:</span>
            <pre className="mt-1 p-2 bg-gray-950 rounded text-gray-400 overflow-x-auto max-h-48 overflow-y-auto text-[11px]">
              {toolCall.result}
            </pre>
          </div>
        )}
      </div>
    </details>
  );
}
