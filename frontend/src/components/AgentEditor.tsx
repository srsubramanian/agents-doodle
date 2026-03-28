import { useState, useEffect, useCallback } from "react";
import { useNodesState, useEdgesState, type Node, type Edge } from "@xyflow/react";
import { useAppStore } from "../stores/appStore";
import { updateAgent } from "../api/agents";
import { GraphCanvas } from "./graph/GraphCanvas";
import { InspectorPanel } from "./graph/InspectorPanel";
import { buildGraphElements } from "./graph/useGraphLayout";
import type { ToolConfig, SubAgentConfig, AvailableTool } from "../types";

export function AgentEditor() {
  const { agents, selectedAgentId, updateAgentInList } = useAppStore();
  const agent = agents.find((a) => a.id === selectedAgentId);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [model, setModel] = useState("anthropic:claude-sonnet-4-6");
  const [toolsConfig, setToolsConfig] = useState<ToolConfig[]>([]);
  const [subagentsConfig, setSubagentsConfig] = useState<SubAgentConfig[]>([]);
  const [availableTools, setAvailableTools] = useState<AvailableTool[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Graph state
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("agent");
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);
  const [initialized, setInitialized] = useState(false);

  // Fetch available tools
  useEffect(() => {
    fetch("/api/agents/tools")
      .then((r) => r.json())
      .then(setAvailableTools)
      .catch(console.error);
  }, []);

  // Hydrate form from agent
  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setDescription(agent.description);
      setSystemPrompt(agent.system_prompt);
      setModel(agent.model);
      setToolsConfig(agent.tools_config || []);
      setSubagentsConfig(agent.subagents_config || []);
      setSaved(false);
      setInitialized(false);
    }
  }, [agent]);

  // Initialize graph nodes/edges when agent loads
  useEffect(() => {
    if (!initialized && agent) {
      const { nodes: n, edges: e } = buildGraphElements(
        name, model, systemPrompt, description,
        toolsConfig, subagentsConfig, availableTools
      );
      setNodes(n);
      setEdges(e);
      setInitialized(true);
    }
  }, [initialized, agent, name, model, systemPrompt, description, toolsConfig, subagentsConfig, availableTools, setNodes, setEdges]);

  // Sync form state → node data (preserve positions)
  useEffect(() => {
    if (!initialized) return;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "agent") {
          return { ...node, data: { name, model, systemPrompt, description } };
        }
        if (node.id === "toolbox") {
          return {
            ...node,
            data: {
              tools: toolsConfig.map((t) => ({ name: t.name, enabled: t.enabled })),
              totalAvailable: availableTools.length,
            },
          };
        }
        if (node.id === "subagents") {
          return {
            ...node,
            data: {
              subagents: subagentsConfig.map((s) => ({ name: s.name, description: s.description })),
            },
          };
        }
        return node;
      })
    );
  }, [name, model, systemPrompt, description, toolsConfig, subagentsConfig, availableTools, initialized, setNodes]);

  // Tool helpers
  const toggleTool = useCallback((toolName: string) => {
    setToolsConfig((prev) => {
      const existing = prev.find((t) => t.name === toolName);
      if (existing) {
        return prev.map((t) => (t.name === toolName ? { ...t, enabled: !t.enabled } : t));
      }
      return [...prev, { name: toolName, enabled: true, config: {} }];
    });
  }, []);

  const isToolEnabled = useCallback(
    (toolName: string) => toolsConfig.find((t) => t.name === toolName)?.enabled ?? false,
    [toolsConfig]
  );

  // Sub-agent helpers
  const addSubAgent = useCallback(() => {
    setSubagentsConfig((prev) => [
      ...prev,
      { name: `sub-agent-${prev.length + 1}`, description: "", system_prompt: "", tools: [] },
    ]);
  }, []);

  const removeSubAgent = useCallback((index: number) => {
    setSubagentsConfig((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateSubAgent = useCallback((index: number, field: keyof SubAgentConfig, value: string) => {
    setSubagentsConfig((prev) =>
      prev.map((sa, i) => (i === index ? { ...sa, [field]: value } : sa))
    );
  }, []);

  // Save
  const handleSave = async () => {
    if (!agent) return;
    setSaving(true);
    try {
      const updated = await updateAgent(agent.id, {
        name,
        description,
        system_prompt: systemPrompt,
        model,
        tools_config: toolsConfig,
        subagents_config: subagentsConfig,
      });
      updateAgentInList(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!agent) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-4">&#x1f916;</div>
          <p className="text-lg">Select an agent or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header — Fleet style */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => useAppStore.getState().setView("chat")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-white">{name}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-600/20 text-green-400 font-medium">
            Editing
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-600/30 text-gray-400 font-medium">
            Private
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11ZM7.5 2a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z" /><path d="M2 5.5a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Z" /></svg>
            Share
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              saved
                ? "bg-green-600/20 text-green-400 border border-green-600/30"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {saved ? "\u2713 Saved" : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Canvas + Inspector split */}
      <div className="flex-1 flex overflow-hidden" style={{ minHeight: 0 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <GraphCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          onPaneClick={() => setSelectedNodeId("agent")}
        />
        </div>
        <div style={{ width: 360, flexShrink: 0 }}>
          <InspectorPanel
          selectedNodeId={selectedNodeId}
          name={name} setName={setName}
          description={description} setDescription={setDescription}
          model={model} setModel={setModel}
          systemPrompt={systemPrompt} setSystemPrompt={setSystemPrompt}
          availableTools={availableTools}
          toggleTool={toggleTool} isToolEnabled={isToolEnabled}
          subagentsConfig={subagentsConfig}
          addSubAgent={addSubAgent} removeSubAgent={removeSubAgent} updateSubAgent={updateSubAgent}
        />
        </div>
      </div>
    </div>
  );
}
