import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { SkillsNodeData } from "../graphTypes";

type SkillsNodeProps = NodeProps & { data: SkillsNodeData };

export function SkillsNode({ selected, data }: SkillsNodeProps) {
  const skills = data.skills || [];

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
        <span className="text-[10px] text-gray-600">
          {skills.length} attached
        </span>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        {skills.length > 0 ? (
          <div className="space-y-1.5">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 text-blue-400 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
                <span className="text-[11px] text-gray-300 truncate">{skill.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[11px] text-gray-600 italic">
            No skills configured
          </div>
        )}
      </div>
    </div>
  );
}
