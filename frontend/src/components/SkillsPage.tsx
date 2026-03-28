import { useState, useEffect } from "react";
import { fetchSkills, createSkill, updateSkill, deleteSkill } from "../api/skills";
import type { Skill } from "../types";

const inputClass = "block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6";
const labelClass = "block text-sm/6 font-medium text-white";

export function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSkills().then(setSkills).catch(console.error);
  }, []);

  const selected = skills.find((s) => s.id === selectedId);

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setDescription(selected.description);
      setContent(selected.content);
    }
  }, [selected]);

  const handleCreate = async () => {
    const skill = await createSkill({ name: "New Skill" });
    setSkills((prev) => [skill, ...prev]);
    setSelectedId(skill.id);
  };

  const handleSave = async () => {
    if (!selectedId) return;
    setSaving(true);
    try {
      const updated = await updateSkill(selectedId, { name, description, content });
      setSkills((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    await deleteSkill(selectedId);
    setSkills((prev) => prev.filter((s) => s.id !== selectedId));
    setSelectedId(null);
  };

  return (
    <div className="flex-1 flex h-full">
      {/* Skill list */}
      <div className="w-[280px] shrink-0 border-r border-gray-800 bg-gray-900 overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-sm font-semibold text-white">Skills</h2>
          <button
            onClick={handleCreate}
            className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-400"
          >
            + Create
          </button>
        </div>
        <div className="p-2 space-y-1">
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setSelectedId(skill.id)}
              className={`w-full text-left rounded-md px-3 py-2 text-sm ${
                selectedId === skill.id
                  ? "bg-white/5 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="font-medium truncate">{skill.name}</div>
              <div className="text-xs text-gray-500 truncate">{skill.description || "No description"}</div>
            </button>
          ))}
          {skills.length === 0 && (
            <div className="px-3 py-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto size-8 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">No skills yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Skill editor */}
      <div className="flex-1 overflow-y-auto">
        {selectedId ? (
          <div className="max-w-2xl mx-auto p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Edit Skill</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-red-400 shadow-xs hover:bg-white/20"
                >
                  Delete
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            <div>
              <label className={labelClass}>Name</label>
              <div className="mt-2">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Skill name..." />
              </div>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <p className="text-xs text-gray-500 mt-0.5">Brief description of when this skill should be used (max 1024 chars)</p>
              <div className="mt-2">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className={inputClass}
                  placeholder="This skill helps with..."
                  maxLength={1024}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Instructions</label>
              <p className="text-xs text-gray-500 mt-0.5">Detailed instructions the agent follows when using this skill</p>
              <div className="mt-2">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className={`${inputClass} font-mono resize-y`}
                  placeholder={"## How to use this skill\n\nStep-by-step instructions..."}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center h-full">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto size-12 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-white">Skills</h3>
              <p className="mt-1 text-sm text-gray-500">Select a skill to edit or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
