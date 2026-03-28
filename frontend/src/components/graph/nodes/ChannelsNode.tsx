import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ChannelsNodeData } from "../graphTypes";

export function ChannelsNode({ data, selected }: NodeProps) {
  const d = data as unknown as ChannelsNodeData;

  return (
    <div
      className={`rounded-lg min-w-[200px] max-w-[300px] overflow-hidden shadow-sm ${
        selected
          ? "border border-blue-500/50 bg-[#09090f]"
          : "border border-[#393f55] bg-[#09090f]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-[#12121a] px-3 py-2.5">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Channels
        </span>
        <span className="text-[10px] text-gray-600">
          {d.channels.length} channel{d.channels.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Channel list */}
      <div className="py-1">
        {/* Chat - always active */}
        <div className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-700/20">
          <span className="text-sm">💬</span>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white">Chat</div>
            <div className="text-[10px] text-gray-500 leading-tight">Runs from the chat UI.</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
        </div>

        {/* Slack - placeholder */}
        <div className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-700/20">
          <span className="text-sm">💼</span>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-400">Slack</div>
            <div className="text-[10px] text-gray-600 leading-tight">Connect a Slack bot</div>
          </div>
          <span className="inline-flex items-center text-[10px] text-blue-400 shrink-0 transition-all">+ Connect</span>
        </div>

        {/* Gmail - placeholder */}
        <div className="flex items-center gap-2.5 px-4 py-2 hover:bg-gray-700/20">
          <span className="text-sm">📧</span>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-400">Gmail</div>
            <div className="text-[10px] text-gray-600 leading-tight">Trigger from incoming email</div>
          </div>
          <span className="inline-flex items-center text-[10px] text-blue-400 shrink-0 transition-all">+ Connect</span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-[#1a192b] !w-1.5 !h-1.5 !border !border-[#8790ab] !rounded-full"
      />
    </div>
  );
}
