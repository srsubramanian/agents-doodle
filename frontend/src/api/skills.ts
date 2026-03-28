import type { Skill } from "../types";

export async function fetchSkills(): Promise<Skill[]> {
  const res = await fetch("/api/skills");
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export async function createSkill(data: { name: string; description?: string; content?: string }): Promise<Skill> {
  const res = await fetch("/api/skills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create skill");
  return res.json();
}

export async function updateSkill(id: string, data: Partial<{ name: string; description: string; content: string }>): Promise<Skill> {
  const res = await fetch(`/api/skills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update skill");
  return res.json();
}

export async function deleteSkill(id: string): Promise<void> {
  const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete skill");
}

export async function fetchAgentSkills(agentId: string): Promise<Skill[]> {
  const res = await fetch(`/api/skills/agent/${agentId}`);
  if (!res.ok) throw new Error("Failed to fetch agent skills");
  return res.json();
}

export async function attachSkill(agentId: string, skillId: string): Promise<void> {
  const res = await fetch(`/api/skills/agent/${agentId}/${skillId}`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to attach skill");
}

export async function detachSkill(agentId: string, skillId: string): Promise<void> {
  const res = await fetch(`/api/skills/agent/${agentId}/${skillId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to detach skill");
}
