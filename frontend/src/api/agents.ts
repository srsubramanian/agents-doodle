import type { Agent } from "../types";

const BASE = "/api/agents";

export async function fetchAgents(): Promise<Agent[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch agents");
  return res.json();
}

export async function createAgent(data: {
  name: string;
  description?: string;
  system_prompt?: string;
  model?: string;
}): Promise<Agent> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create agent");
  return res.json();
}

export async function updateAgent(
  id: string,
  data: Partial<Pick<Agent, "name" | "description" | "system_prompt" | "model" | "tools_config" | "subagents_config" | "agents_md_content" | "memory_enabled">>
): Promise<Agent> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update agent");
  return res.json();
}

export async function deleteAgent(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete agent");
}
