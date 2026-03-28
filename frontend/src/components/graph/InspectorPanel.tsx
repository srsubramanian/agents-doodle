import type { SubAgentConfig, AvailableTool } from "../../types";

const MODEL_OPTIONS = [
  "anthropic:claude-sonnet-4-6",
  "anthropic:claude-haiku-4-5-20251001",
  "openai:gpt-4o",
  "openai:gpt-4o-mini",
];

interface Props {
  selectedNodeId: string | null;
  // Agent fields
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  model: string;
  setModel: (v: string) => void;
  systemPrompt: string;
  setSystemPrompt: (v: string) => void;
  // Tools
  availableTools: AvailableTool[];
  toggleTool: (name: string) => void;
  isToolEnabled: (name: string) => boolean;
  // Sub-agents
  subagentsConfig: SubAgentConfig[];
  addSubAgent: () => void;
  removeSubAgent: (index: number) => void;
  updateSubAgent: (index: number, field: keyof SubAgentConfig, value: string) => void;
}

const inputClass =
  "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500";

export function InspectorPanel({
  selectedNodeId,
  name, setName,
  description, setDescription,
  model, setModel,
  systemPrompt, setSystemPrompt,
  availableTools, toggleTool, isToolEnabled,
  subagentsConfig, addSubAgent, removeSubAgent, updateSubAgent,
}: Props) {
  const nodeId = selectedNodeId || "agent";

  return (
    <div className="h-full border-l border-gray-800 bg-[#111827] overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-sm font-semibold text-white">
          {nodeId === "agent" && "Agent Properties"}
          {nodeId === "toolbox" && "Tools"}
          {nodeId === "subagents" && "Sub-Agents"}
          {nodeId === "channels" && "Channels"}
        </h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Agent Properties */}
        {nodeId === "agent" && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Agent name..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} placeholder="Short description..." />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Model</label>
              <select value={model} onChange={(e) => setModel(e.target.value)} className={inputClass}>
                {MODEL_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Instructions</label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={10}
                className={`${inputClass} font-mono resize-y`}
                placeholder="You are a helpful assistant..."
              />
            </div>
          </>
        )}

        {/* Tools */}
        {nodeId === "toolbox" && (
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
                  className="mt-0.5 rounded border-gray-600 bg-gray-700 text-blue-600"
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
        )}

        {/* Sub-agents */}
        {nodeId === "subagents" && (
          <>
            <button onClick={addSubAgent} className="text-xs text-blue-400 hover:text-blue-300">
              + Add sub-agent
            </button>
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
                    <button onClick={() => removeSubAgent(i)} className="text-xs text-red-400 hover:text-red-300">
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
          </>
        )}

        {/* Channels */}
        {nodeId === "channels" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <div>
                <div className="text-sm text-white font-medium">Chat</div>
                <div className="text-xs text-gray-500">Messages from the chat UI</div>
              </div>
            </div>
            <div className="text-[10px] text-gray-600 italic">
              More channels (Slack, Gmail, etc.) coming in future updates.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
