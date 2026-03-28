import { useState, useEffect } from "react";
import { useAppStore } from "../stores/appStore";
import { updateAgent } from "../api/agents";

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
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setDescription(agent.description);
      setSystemPrompt(agent.system_prompt);
      setModel(agent.model);
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateAgent(agent.id, {
        name,
        description,
        system_prompt: systemPrompt,
        model,
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
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Edit Agent</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            saved
              ? "bg-green-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
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
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            Description
          </label>
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
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            Instructions
          </label>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            rows={12}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-blue-500 resize-y"
            placeholder="You are a helpful assistant..."
          />
        </div>
      </div>
    </div>
  );
}
