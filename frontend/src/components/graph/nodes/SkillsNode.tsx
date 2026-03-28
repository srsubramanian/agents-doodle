import { Handle, Position, type NodeProps } from "@xyflow/react";

export function SkillsNode({ selected }: NodeProps) {
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
          Skills
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center text-[10px] text-blue-400 cursor-pointer hover:text-blue-300 transition-all">
            + Add
          </span>
          <span className="inline-flex items-center text-[10px] text-blue-400 cursor-pointer hover:text-blue-300 transition-all">
            ✏️ Create
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3 text-[11px] text-gray-600 italic">
        No skills configured
      </div>
    </div>
  );
}
