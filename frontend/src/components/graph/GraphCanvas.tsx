import { useMemo } from "react";
import {
  ReactFlow,
  Controls,
  type Node,
  type Edge,
  type OnNodesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AgentNode } from "./nodes/AgentNode";
import { ToolboxNode } from "./nodes/ToolboxNode";
import { SubAgentsNode } from "./nodes/SubAgentsNode";
import { ChannelsNode } from "./nodes/ChannelsNode";
import { ScheduleNode } from "./nodes/ScheduleNode";
import { SkillsNode } from "./nodes/SkillsNode";

interface Props {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  onPaneClick: () => void;
}

export function GraphCanvas({ nodes, edges, onNodesChange, onNodeClick, onPaneClick }: Props) {
  const nodeTypes = useMemo(
    () => ({
      agent: AgentNode,
      toolbox: ToolboxNode,
      subagents: SubAgentsNode,
      channels: ChannelsNode,
      schedule: ScheduleNode,
      skills: SkillsNode,
    }),
    []
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{ type: "default" }}
        proOptions={{ hideAttribution: true }}
      >
        <Controls
          showInteractive={false}
          position="bottom-right"
        />
      </ReactFlow>
    </div>
  );
}
