import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { AgentNodeData } from "../graphTypes";

export function AgentNode({ data, selected }: NodeProps) {
  const d = data as unknown as AgentNodeData;
  return (
    <div
      className={`rounded-lg min-w-[200px] max-w-[300px] overflow-hidden shadow-sm ${
        selected
          ? "border border-blue-500/50 bg-[#09090f]"
          : "border border-[#393f55] bg-[#09090f]"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-[#1a192b] !w-1.5 !h-1.5 !border !border-[#8790ab] !rounded-full"
      />

      {/* Header */}
      <div className="bg-[#12121a] px-3 py-2.5">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Agent
        </span>
      </div>

      {/* Agent name */}
      <div className="px-4 pt-3 pb-2">
        <div className="text-sm font-semibold text-white">
          {d.name || "Untitled Agent"}
        </div>
      </div>

      {/* Instructions section */}
      <div className="px-4 pb-3 border-t border-[#393f55]">
        <div className="flex items-center justify-between pt-2 mb-1.5">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Instructions
          </span>
          <span className="inline-flex items-center text-[10px] text-blue-400 cursor-pointer hover:text-blue-300 transition-all">
            ✏️ Edit
          </span>
        </div>
        <div className="text-[11px] text-gray-500 leading-relaxed">
          {d.systemPrompt
            ? d.systemPrompt.length > 120
              ? d.systemPrompt.slice(0, 120) + "..."
              : d.systemPrompt
            : "No instructions set."}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="tools"
        className="!bg-[#1a192b] !w-1.5 !h-1.5 !border !border-[#8790ab] !rounded-full"
        style={{ top: "35%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="subagents"
        className="!bg-[#1a192b] !w-1.5 !h-1.5 !border !border-[#8790ab] !rounded-full"
        style={{ top: "65%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="skills"
        className="!bg-[#1a192b] !w-1.5 !h-1.5 !border !border-[#8790ab] !rounded-full"
        style={{ top: "90%" }}
      />
    </div>
  );
}
