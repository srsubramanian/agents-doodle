import { useState, useEffect } from "react";
import { useAppStore } from "../stores/appStore";
import { updateAgent } from "../api/agents";
import type { ToolConfig, SubAgentConfig, AvailableTool } from "../types";

const MODEL_OPTIONS = [
  "anthropic:claude-sonnet-4-6",
  "anthropic:claude-haiku-4-5-20251001",
  "openai:gpt-4o",
  "openai:gpt-4o-mini",
];

export function AgentEditor() {
  const { agents, selectedAgentId, updateAgentInList } = useAppStore();
  const agent = agents.find((a) => a.id === selectedAgentId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [model, setModel] = useState(MODEL_OPTIONS[0]);
  const [toolsConfig, setToolsConfig] = useState<ToolConfig[]>([]);
  const [subagentsConfig, setSubagentsConfig] = useState<SubAgentConfig[]>([]);
  const [availableTools, setAvailableTools] = useState<AvailableTool[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/agents/tools")
      .then((r) => r.json())
      .then(setAvailableTools)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setDescription(agent.description);
      setSystemPrompt(agent.system_prompt);
      setModel(agent.model);
      setToolsConfig(agent.tools_config || []);
      setSubagentsConfig(agent.subagents_config || []);
      setSaved(false);
    }
  }, [agent]);

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

  const toggleTool = (toolName: string) => {
    setToolsConfig((prev) => {
      const existing = prev.find((t) => t.name === toolName);
      if (existing) {
        return prev.map((t) => (t.name === toolName ? { ...t, enabled: !t.enabled } : t));
      }
      return [...prev, { name: toolName, enabled: true, config: {} }];
    });
  };

  const isToolEnabled = (toolName: string) => {
    return toolsConfig.find((t) => t.name === toolName)?.enabled ?? false;
  };

  const addSubAgent = () => {
    setSubagentsConfig((prev) => [
      ...prev,
      { name: `sub-agent-${prev.length + 1}`, description: "", system_prompt: "", tools: [] },
    ]);
  };

  const removeSubAgent = (index: number) => {
    setSubagentsConfig((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSubAgent = (index: number, field: keyof SubAgentConfig, value: string) => {
    setSubagentsConfig((prev) =>
      prev.map((sa, i) => (i === index ? { ...sa, [field]: value } : sa))
    );
  };

  const handleSave = async () => {
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

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Edit Agent</h2>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              saved ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {saved ? "Saved" : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              placeholder="Agent name..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              placeholder="Short description..."
            />
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {MODEL_OPTIONS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Instructions</label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-blue-500 resize-y"
              placeholder="You are a helpful assistant..."
            />
          </div>

          {/* Tools */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Tools</label>
            <div className="space-y-2">
              {availableTools.map((tool) => (
                <label
                  key={tool.name}
                  className="flex items-start gap-3 p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={isToolEnabled(tool.name)}
                    onChange={() => toggleTool(tool.name)}
                    className="mt-0.5 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-sm text-white font-medium">{tool.name}</div>
                    <div className="text-xs text-gray-500">{tool.description}</div>
                    {tool.requires_env.length > 0 && (
                      <div className="text-[10px] text-yellow-600 mt-0.5">
                        Requires: {tool.requires_env.join(", ")}
                      </div>
                    )}
                  </div>
                </label>
              ))}
              {availableTools.length === 0 && (
                <div className="text-xs text-gray-600 italic">No tools available</div>
              )}
            </div>
          </div>

          {/* Sub-agents */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-400">Sub-agents</label>
              <button
                onClick={addSubAgent}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                + Add sub-agent
              </button>
            </div>
            <div className="space-y-3">
              {subagentsConfig.map((sa, i) => (
                <div key={i} className="p-3 bg-gray-800 border border-gray-700 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={sa.name}
                      onChange={(e) => updateSubAgent(i, "name", e.target.value)}
                      className="px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-blue-500"
                      placeholder="Sub-agent name"
                    />
                    <button
                      onClick={() => removeSubAgent(i)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={sa.description}
                    onChange={(e) => updateSubAgent(i, "description", e.target.value)}
                    className="w-full px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-blue-500"
                    placeholder="When should this sub-agent be used?"
                  />
                  <textarea
                    value={sa.system_prompt}
                    onChange={(e) => updateSubAgent(i, "system_prompt", e.target.value)}
                    rows={3}
                    className="w-full px-2 py-1 bg-gray-900 border border-gray-700 rounded text-white text-xs font-mono focus:outline-none focus:border-blue-500 resize-y"
                    placeholder="Sub-agent instructions..."
                  />
                </div>
              ))}
              {subagentsConfig.length === 0 && (
                <div className="text-xs text-gray-600 italic">No sub-agents configured</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
