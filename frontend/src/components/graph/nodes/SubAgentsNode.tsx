import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { SubAgentsNodeData } from "../graphTypes";

export function SubAgentsNode({ data, selected }: NodeProps) {
  const d = data as unknown as SubAgentsNodeData;

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
      <div className="flex items-center justify-between bg-[#12121a] px-3 py-2.5">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Sub-agents
        </span>
        <span className="inline-flex items-center text-[10px] text-blue-400 cursor-pointer hover:text-blue-300 transition-all">
          + Add
        </span>
      </div>

      {/* Content */}
      <div className="py-1">
        {d.subagents.length > 0 ? (
          d.subagents.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-700/20"
            >
              <span className="text-sm">🤖</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white">{s.name}</div>
                <div className="text-[10px] text-gray-500 truncate">{s.description}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-[11px] text-gray-600 italic">
            No sub-agents configured
          </div>
        )}
      </div>
    </div>
  );
}
