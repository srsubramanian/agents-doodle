import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ToolboxNodeData } from "../graphTypes";

export function ToolboxNode({ data, selected }: NodeProps) {
  const d = data as unknown as ToolboxNodeData;
  const enabledTools = d.tools.filter((t) => t.enabled);

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
          Toolbox
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center text-[10px] text-blue-400 cursor-pointer hover:text-blue-300 transition-all">
            + Add
          </span>
          <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-gray-400">
            MCP
          </span>
        </div>
      </div>

      {/* Tool list */}
      <div className="py-1">
        {enabledTools.length > 0 ? (
          enabledTools.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-700/20"
            >
              <span className="text-sm">🔧</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white">{t.name}</div>
                <div className="text-[10px] text-gray-500">Fleet</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-[10px] text-gray-600 cursor-pointer hover:text-gray-400">📋</span>
                <span className="text-[10px] text-gray-600 cursor-pointer hover:text-red-400">🗑</span>
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-[11px] text-gray-600 italic">
            No tools configured
          </div>
        )}
      </div>
    </div>
  );
}
