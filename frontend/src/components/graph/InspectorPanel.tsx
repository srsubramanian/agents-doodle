import { useState, useEffect, useCallback } from "react";
import type { SubAgentConfig, AvailableTool, Skill } from "../../types";
import { fetchSkills, fetchAgentSkills, attachSkill, detachSkill } from "../../api/skills";

const MODEL_OPTIONS = [
  "anthropic:claude-sonnet-4-6",
  "anthropic:claude-haiku-4-5-20251001",
  "openai:gpt-4o",
  "openai:gpt-4o-mini",
];

interface Props {
  selectedNodeId: string | null;
  agentId: string;
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
  // Callback when skills change
  onSkillsChange?: () => void;
}

const inputClass =
  "block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6";

const labelClass = "block text-sm/6 font-medium text-white";

function SkillsInspector({ agentId, onSkillsChange }: { agentId: string; onSkillsChange?: () => void }) {
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [agentSkillIds, setAgentSkillIds] = useState<Set<string>>(new Set());
  const [toggling, setToggling] = useState<string | null>(null);

  const loadSkills = useCallback(async () => {
    try {
      const [all, attached] = await Promise.all([
        fetchSkills(),
        fetchAgentSkills(agentId),
      ]);
      setAllSkills(all);
      setAgentSkillIds(new Set(attached.map((s) => s.id)));
    } catch (err) {
      console.error(err);
    }
  }, [agentId]);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const handleToggle = async (skillId: string) => {
    setToggling(skillId);
    try {
      if (agentSkillIds.has(skillId)) {
        await detachSkill(agentId, skillId);
        setAgentSkillIds((prev) => {
          const next = new Set(prev);
          next.delete(skillId);
          return next;
        });
      } else {
        await attachSkill(agentId, skillId);
        setAgentSkillIds((prev) => new Set(prev).add(skillId));
      }
      onSkillsChange?.();
    } catch (err) {
      console.error(err);
    } finally {
      setToggling(null);
    }
  };

  return (
    <div className="space-y-2">
      {allSkills.map((skill) => (
        <label
          key={skill.id}
          className="flex items-start gap-3 p-3 bg-white/5 rounded-lg ring-1 ring-white/10 cursor-pointer hover:ring-white/20"
        >
          <input
            type="checkbox"
            checked={agentSkillIds.has(skill.id)}
            onChange={() => handleToggle(skill.id)}
            disabled={toggling === skill.id}
            className="mt-0.5 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
          />
          <div>
            <div className="text-sm text-white font-medium">{skill.name}</div>
            <div className="text-xs text-gray-500">{skill.description || "No description"}</div>
          </div>
        </label>
      ))}
      {allSkills.length === 0 && (
        <div className="text-sm text-gray-500">No skills available. Create skills from the Skills page.</div>
      )}
    </div>
  );
}

export function InspectorPanel({
  selectedNodeId,
  agentId,
  name, setName,
  description, setDescription,
  model, setModel,
  systemPrompt, setSystemPrompt,
  availableTools, toggleTool, isToolEnabled,
  subagentsConfig, addSubAgent, removeSubAgent, updateSubAgent,
  onSkillsChange,
}: Props) {
  const nodeId = selectedNodeId || "agent";

  return (
    <div className="h-full border-l border-gray-800 bg-gray-900 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-sm font-semibold text-white">
          {nodeId === "agent" && "Agent Properties"}
          {nodeId === "toolbox" && "Tools"}
          {nodeId === "subagents" && "Sub-Agents"}
          {nodeId === "channels" && "Channels"}
          {nodeId === "skills" && "Skills"}
        </h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Agent Properties */}
        {nodeId === "agent" && (
          <>
            <div>
              <label className={labelClass}>Name</label>
              <div className="mt-2">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Agent name..." />
              </div>
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <div className="mt-2">
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} placeholder="Short description..." />
              </div>
            </div>
            <div>
              <label className={labelClass}>Model</label>
              <div className="mt-2">
                <select value={model} onChange={(e) => setModel(e.target.value)} className={inputClass}>
                  {MODEL_OPTIONS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Instructions</label>
              <div className="mt-2">
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={10}
                  className={`${inputClass} font-mono resize-y`}
                  placeholder="You are a helpful assistant..."
                />
              </div>
            </div>
          </>
        )}

        {/* Tools */}
        {nodeId === "toolbox" && (
          <div className="space-y-2">
            {availableTools.map((tool) => (
              <label
                key={tool.name}
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg ring-1 ring-white/10 cursor-pointer hover:ring-white/20"
              >
                <input
                  type="checkbox"
                  checked={isToolEnabled(tool.name)}
                  onChange={() => toggleTool(tool.name)}
                  className="mt-0.5 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <div className="text-sm text-white font-medium">{tool.name}</div>
                  <div className="text-xs text-gray-500">{tool.description}</div>
                  {tool.requires_env.length > 0 && (
                    <div className="text-[10px] text-yellow-500 mt-0.5">
                      Requires: {tool.requires_env.join(", ")}
                    </div>
                  )}
                </div>
              </label>
            ))}
            {availableTools.length === 0 && (
              <div className="text-sm text-gray-500">No tools available</div>
            )}
          </div>
        )}

        {/* Sub-agents */}
        {nodeId === "subagents" && (
          <>
            <button onClick={addSubAgent} className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              + Add sub-agent
            </button>
            <div className="space-y-3">
              {subagentsConfig.map((sa, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-lg ring-1 ring-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={sa.name}
                      onChange={(e) => updateSubAgent(i, "name", e.target.value)}
                      className={inputClass}
                      placeholder="Sub-agent name"
                    />
                    <button onClick={() => removeSubAgent(i)} className="ml-2 rounded-md bg-white/10 px-2 py-1 text-xs font-semibold text-red-400 hover:bg-white/20">
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={sa.description}
                    onChange={(e) => updateSubAgent(i, "description", e.target.value)}
                    className={inputClass}
                    placeholder="When should this sub-agent be used?"
                  />
                  <textarea
                    value={sa.system_prompt}
                    onChange={(e) => updateSubAgent(i, "system_prompt", e.target.value)}
                    rows={3}
                    className={`${inputClass} font-mono resize-y`}
                    placeholder="Sub-agent instructions..."
                  />
                </div>
              ))}
              {subagentsConfig.length === 0 && (
                <div className="text-sm text-gray-500">No sub-agents configured</div>
              )}
            </div>
          </>
        )}

        {/* Channels */}
        {nodeId === "channels" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg ring-1 ring-white/10">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <div>
                <div className="text-sm text-white font-medium">Chat</div>
                <div className="text-xs text-gray-500">Messages from the chat UI</div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              More channels (Slack, Gmail, etc.) coming in future updates.
            </p>
          </div>
        )}

        {/* Skills */}
        {nodeId === "skills" && (
          <SkillsInspector agentId={agentId} onSkillsChange={onSkillsChange} />
        )}
      </div>
    </div>
  );
}
