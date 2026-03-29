import { useState, useEffect, useCallback } from "react";
import { useNodesState, useEdgesState, type Node, type Edge } from "@xyflow/react";
import { useAppStore } from "../stores/appStore";
import { updateAgent } from "../api/agents";
import { fetchAgentSkills } from "../api/skills";
import { GraphCanvas } from "./graph/GraphCanvas";
import { InspectorPanel } from "./graph/InspectorPanel";
import { EditorChatPanel } from "./EditorChatPanel";
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
  const [agentSkills, setAgentSkills] = useState<Array<{ name: string; description: string }>>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Chat panel
  const [showChat, setShowChat] = useState(true);

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

  // Fetch agent skills
  const loadAgentSkills = useCallback(async () => {
    if (!agent) return;
    try {
      const skills = await fetchAgentSkills(agent.id);
      setAgentSkills(skills.map((s) => ({ name: s.name, description: s.description })));
    } catch (err) {
      console.error(err);
    }
  }, [agent]);

  useEffect(() => {
    loadAgentSkills();
  }, [loadAgentSkills]);

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
        toolsConfig, subagentsConfig, availableTools, agentSkills
      );
      setNodes(n);
      setEdges(e);
      setInitialized(true);
    }
  }, [initialized, agent, name, model, systemPrompt, description, toolsConfig, subagentsConfig, availableTools, agentSkills, setNodes, setEdges]);

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
        if (node.id === "skills") {
          return {
            ...node,
            data: { skills: agentSkills },
          };
        }
        return node;
      })
    );
  }, [name, model, systemPrompt, description, toolsConfig, subagentsConfig, availableTools, agentSkills, initialized, setNodes]);

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
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto size-12 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-white">No agent selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select an agent or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => useAppStore.getState().setView("chat")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-white">{name}</span>
          <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">
            Editing
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20">
            Private
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 inset-ring inset-ring-white/5 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4"><path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11ZM7.5 2a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z" /><path d="M2 5.5a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Z" /></svg>
            Share
          </button>
          <button className="rounded-md bg-white/10 p-2 text-white hover:bg-white/20 inset-ring inset-ring-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4"><path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`rounded-md px-3 py-2 text-sm font-semibold ${
              saved
                ? "bg-green-400/10 text-green-400 inset-ring inset-ring-green-500/20"
                : "bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            }`}
          >
            {saved ? "\u2713 Saved" : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Chat + Canvas + Inspector split */}
      <div className="flex-1 flex overflow-hidden" style={{ minHeight: 0 }}>
        {/* Embedded chat panel */}
        {showChat && (
          <div style={{ width: 400, flexShrink: 0 }}>
            <EditorChatPanel onHide={() => setShowChat(false)} />
          </div>
        )}
        {/* Show Chat toggle when hidden */}
        {!showChat && (
          <button
            onClick={() => setShowChat(true)}
            className="flex items-center gap-1.5 px-3 py-2 border-r border-gray-800 text-xs text-gray-500 hover:text-white bg-[#0f1117] hover:bg-white/5 transition-colors"
            style={{ writingMode: "vertical-rl" }}
          >
            Show Chat
          </button>
        )}
        {/* Graph canvas */}
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
          agentId={agent.id}
          name={name} setName={setName}
          description={description} setDescription={setDescription}
          model={model} setModel={setModel}
          systemPrompt={systemPrompt} setSystemPrompt={setSystemPrompt}
          availableTools={availableTools}
          toggleTool={toggleTool} isToolEnabled={isToolEnabled}
          subagentsConfig={subagentsConfig}
          addSubAgent={addSubAgent} removeSubAgent={removeSubAgent} updateSubAgent={updateSubAgent}
          onSkillsChange={loadAgentSkills}
        />
        </div>
      </div>
    </div>
  );
}
