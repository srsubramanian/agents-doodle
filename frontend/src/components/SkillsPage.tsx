import { useState, useEffect } from "react";
import { fetchSkills, createSkill, updateSkill, deleteSkill } from "../api/skills";
import { MarkdownContent } from "./MarkdownContent";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Skill } from "../types";

const inputClass = "block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6";
const labelClass = "block text-sm/6 font-medium text-white";

export function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<"preview" | "source">("preview");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSkills().then(setSkills).catch(console.error);
  }, []);

  const selected = skills.find((s) => s.id === selectedId);

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setDescription(selected.description);
      setContent(selected.content);
      setEditing(false);
    }
  }, [selected]);

  const handleCreate = async () => {
    const skill = await createSkill({ name: "New Skill" });
    setSkills((prev) => [skill, ...prev]);
    setSelectedId(skill.id);
    setEditing(true);
  };

  const handleSave = async () => {
    if (!selectedId) return;
    setSaving(true);
    try {
      const updated = await updateSkill(selectedId, { name, description, content });
      setSkills((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      setEditing(false);
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

  const filtered = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex h-full">
      {/* Main content — card grid */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
              <h1 className="text-lg font-semibold text-white">Skills</h1>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">Skills shared across all agents in this workspace</p>
          </div>
          <button
            onClick={handleCreate}
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 inline-flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Create Skill
          </button>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-800">
          <div className="relative flex-1 max-w-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className={`${inputClass} pl-9`} />
          </div>
          <span className="text-xs text-gray-500">{skills.length} skill{skills.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Card grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => setSelectedId(skill.id)}
                  className={`text-left p-4 rounded-lg ring-1 transition-all ${
                    selectedId === skill.id
                      ? "bg-white/[0.07] ring-indigo-500/50"
                      : "bg-white/5 ring-white/10 hover:ring-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-indigo-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                    <span className="text-sm font-semibold text-white truncate">{skill.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{skill.description || "No description"}</p>
                  <p className="text-[10px] text-gray-600 mt-2">You</p>
                </button>
              ))}
            </div>
          ) : skills.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto size-12 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
                <h3 className="mt-2 text-sm font-semibold text-white">No skills yet</h3>
                <p className="mt-1 text-sm text-gray-500">Skills teach your agents how to handle specific tasks.</p>
                <div className="mt-6">
                  <button onClick={handleCreate} className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 inline-flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                      <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                    </svg>
                    Create Skill
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-sm text-gray-500">No skills match "{search}"</div>
          )}
        </div>
      </div>

      {/* Right panel — Explorer (Fleet-style) */}
      {selected && (
        <div className="w-[420px] shrink-0 border-l border-gray-800 flex flex-col h-full bg-[#0f1117]">
          {/* Top action bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800">
            <button className="text-gray-500 hover:text-white text-lg">&raquo;</button>
            <div className="flex items-center gap-2">
              <button onClick={handleDelete} className="text-red-400/60 hover:text-red-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
              {editing ? (
                <>
                  <button onClick={handleSave} disabled={saving} className="rounded-md bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-xs hover:bg-indigo-400">
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button onClick={() => setEditing(false)} className="rounded-md bg-white/10 px-3 py-1 text-xs font-semibold text-white shadow-xs hover:bg-white/20 inline-flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    Done
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="rounded-md bg-white/10 px-3 py-1 text-xs font-semibold text-white shadow-xs hover:bg-white/20">
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Toolbar with formatting icons + Preview/Source toggle */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-800">
            {/* Format icons (decorative) */}
            <div className="flex items-center gap-1 text-gray-500">
              <span className="px-1.5 py-0.5 text-xs font-bold hover:text-white cursor-default">B</span>
              <span className="px-1.5 py-0.5 text-xs italic hover:text-white cursor-default">I</span>
              <span className="px-1.5 py-0.5 text-xs line-through hover:text-white cursor-default">S</span>
              <span className="mx-0.5 h-4 w-px bg-gray-700" />
              <span className="px-1.5 py-0.5 text-xs font-bold text-indigo-400 cursor-default">H</span>
              <span className="px-1.5 py-0.5 text-xs font-bold hover:text-white cursor-default">H</span>
              <span className="mx-0.5 h-4 w-px bg-gray-700" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5 hover:text-white cursor-default"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12M8.25 17.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
              <span className="px-1 py-0.5 text-xs font-mono hover:text-white cursor-default">&lt;&gt;</span>
              <span className="px-1 py-0.5 text-xs font-mono hover:text-white cursor-default">&lt;/&gt;</span>
            </div>
            {/* Preview / Source segmented toggle */}
            <div className="flex items-center rounded-md bg-white/5 ring-1 ring-white/10">
              <button
                onClick={() => setTab("preview")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-l-md transition-colors ${
                  tab === "preview" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Preview
              </button>
              <button
                onClick={() => setTab("source")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-r-md transition-colors ${
                  tab === "source" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="text-[10px] font-mono">&lt;&gt;</span>
                Source
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {editing ? (
              /* Edit mode */
              <div className="p-4 space-y-4">
                <div>
                  <label className={labelClass}>Name</label>
                  <div className="mt-1">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <div className="mt-1">
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={inputClass} placeholder="When to use this skill..." />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Content</label>
                  <div className="mt-1">
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={14} className={`${inputClass} font-mono resize-y`} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSave} disabled={saving} className="rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400">
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button onClick={() => setEditing(false)} className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-white/20">
                    Cancel
                  </button>
                </div>
              </div>
            ) : tab === "preview" ? (
              /* Preview mode — rendered markdown */
              <div className="p-4">
                <h2 className="text-lg font-bold text-white mb-1">{selected.name}</h2>
                <p className="text-sm text-gray-400 mb-4">{selected.description}</p>
                {selected.content ? (
                  <div className="text-sm text-gray-300 prose prose-invert prose-sm max-w-none">
                    <MarkdownContent content={selected.content} />
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 italic">No content yet. Click Edit to add instructions.</p>
                )}
              </div>
            ) : (
              /* Source mode — syntax-highlighted markdown */
              <SyntaxHighlighter
                language="markdown"
                style={oneDark}
                showLineNumbers
                lineNumberStyle={{ color: "#4b5563", fontSize: "0.7rem", minWidth: "2.5em", paddingRight: "1em" }}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  background: "transparent",
                  fontSize: "0.8rem",
                  lineHeight: "1.6",
                }}
                wrapLongLines
              >
{`---
name: ${selected.name}
description: ${selected.description}
---

${selected.content}`}
              </SyntaxHighlighter>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
