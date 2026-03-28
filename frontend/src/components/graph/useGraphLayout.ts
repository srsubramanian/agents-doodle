import type { Node, Edge } from "@xyflow/react";
import type { ToolConfig, SubAgentConfig, AvailableTool } from "../../types";

const EDGE_STYLE = { stroke: "#f59e0b", strokeWidth: 2, strokeDasharray: "5 5", opacity: 0.25 };

export function buildGraphElements(
  name: string,
  model: string,
  systemPrompt: string,
  description: string,
  toolsConfig: ToolConfig[],
  subagentsConfig: SubAgentConfig[],
  availableTools: AvailableTool[]
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [
    {
      id: "schedule",
      type: "schedule",
      position: { x: 0, y: 0 },
      data: {},
    },
    {
      id: "channels",
      type: "channels",
      position: { x: 0, y: 140 },
      data: { channels: ["Chat"] },
    },
    {
      id: "agent",
      type: "agent",
      position: { x: 380, y: 100 },
      data: { name, model, systemPrompt, description },
    },
    {
      id: "toolbox",
      type: "toolbox",
      position: { x: 780, y: 0 },
      data: {
        tools: toolsConfig.map((t) => ({ name: t.name, enabled: t.enabled })),
        totalAvailable: availableTools.length,
      },
    },
    {
      id: "subagents",
      type: "subagents",
      position: { x: 780, y: 200 },
      data: {
        subagents: subagentsConfig.map((s) => ({
          name: s.name,
          description: s.description,
        })),
      },
    },
    {
      id: "skills",
      type: "skills",
      position: { x: 780, y: 380 },
      data: {},
    },
  ];

  const edges: Edge[] = [
    {
      id: "e-schedule-agent",
      source: "schedule",
      target: "agent",
      style: EDGE_STYLE,
    },
    {
      id: "e-channels-agent",
      source: "channels",
      target: "agent",
      style: EDGE_STYLE,
    },
    {
      id: "e-agent-toolbox",
      source: "agent",
      sourceHandle: "tools",
      target: "toolbox",
      style: EDGE_STYLE,
    },
    {
      id: "e-agent-subagents",
      source: "agent",
      sourceHandle: "subagents",
      target: "subagents",
      style: EDGE_STYLE,
    },
    {
      id: "e-agent-skills",
      source: "agent",
      sourceHandle: "skills",
      target: "skills",
      style: EDGE_STYLE,
    },
  ];

  return { nodes, edges };
}
