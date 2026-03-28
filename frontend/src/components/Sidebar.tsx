import { useEffect } from "react";
import { useAppStore } from "../stores/appStore";
import { fetchAgents, createAgent, deleteAgent } from "../api/agents";
import { fetchConversations } from "../api/chat";

export function Sidebar() {
  const {
    agents,
    setAgents,
    selectedAgentId,
    setSelectedAgentId,
    selectedConversationId,
    setView,
    conversations,
    setConversations,
    setSelectedConversationId,
    setMessages,
  } = useAppStore();

  useEffect(() => {
    fetchAgents().then(setAgents).catch(console.error);
  }, [setAgents]);

  useEffect(() => {
    if (selectedAgentId) {
      fetchConversations(selectedAgentId).then(setConversations).catch(console.error);
    } else {
      setConversations([]);
    }
  }, [selectedAgentId, setConversations]);

  const handleNewAgent = async () => {
    const agent = await createAgent({ name: "New Agent" });
    useAppStore.getState().addAgent(agent);
    setSelectedAgentId(agent.id);
    setView("editor");
  };

  const handleDeleteAgent = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await deleteAgent(id);
    useAppStore.getState().removeAgent(id);
    if (selectedAgentId === id) {
      setSelectedAgentId(null);
    }
  };

  const handleSelectConversation = async (convId: string) => {
    setSelectedConversationId(convId);
    setView("chat");
  };

  return (
    <div className="w-[220px] min-w-[220px] bg-[#111827] border-r border-gray-800 flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800">
        <h1 className="text-base font-semibold text-white">Fleet <span className="text-gray-500 text-xs">clone</span></h1>
      </div>

      {/* Nav links */}
      <div className="px-2 py-2 space-y-0.5">
        <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg cursor-pointer">
          <span className="text-xs">💬</span> Chat
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg cursor-pointer">
          <span className="text-xs">📥</span> Inbox
        </div>
      </div>

      {/* My Agents + New Agent Button */}
      <div className="flex items-center justify-between px-3 py-1.5">
        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">My Agents</span>
        <button
          onClick={handleNewAgent}
          className="text-gray-400 hover:text-white text-lg leading-none"
          title="New agent"
        >
          +
        </button>
      </div>

      {/* Agent List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-1 text-xs text-gray-500 uppercase tracking-wider">
          My Agents
        </div>
        {agents.map((agent) => (
          <div key={agent.id}>
            <div
              onClick={() => {
                setSelectedAgentId(agent.id);
                setView("chat");
                setSelectedConversationId(null);
                setMessages([]);
              }}
              className={`mx-2 px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between group ${
                selectedAgentId === agent.id
                  ? "bg-gray-700/50 text-white"
                  : "text-gray-300 hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-purple-600/30 text-purple-400 flex items-center justify-center text-xs font-medium shrink-0">
                  {agent.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm truncate">{agent.name}</span>
              </div>
              <button
                onClick={(e) => handleDeleteAgent(e, agent.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 text-xs transition-opacity"
                title="Delete agent"
              >
                x
              </button>
            </div>

            {/* Conversation list when agent is selected */}
            {selectedAgentId === agent.id && conversations.length > 0 && (
              <div className="ml-6 mr-2 mt-1 mb-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv.id)}
                    className={`px-3 py-1.5 rounded text-xs cursor-pointer truncate ${
                      selectedConversationId === conv.id
                        ? "bg-gray-700/30 text-gray-200"
                        : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/30"
                    }`}
                  >
                    {conv.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Explore section */}
      <div className="px-2 py-2 border-t border-gray-800 mt-auto">
        <div className="px-3 py-1 text-xs text-gray-600 uppercase tracking-wider font-medium">Explore</div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 rounded-lg cursor-pointer">
            <span>🔌</span> Integrations
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 rounded-lg cursor-pointer">
            <span>⚡</span> Skills
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 rounded-lg cursor-pointer">
            <span>📋</span> Templates
          </div>
        </div>
      </div>

      {/* Settings + user */}
      <div className="px-3 py-3 border-t border-gray-800">
        <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-gray-500 hover:text-gray-300 cursor-pointer mb-2">
          <span>⚙️</span> Settings
        </div>
        <div className="flex items-center gap-2 px-2">
          <div className="w-6 h-6 rounded-full bg-green-600/30 text-green-400 flex items-center justify-center text-[10px] font-bold">
            U
          </div>
          <div className="text-[11px] text-gray-500 truncate">Personal</div>
        </div>
      </div>
    </div>
  );
}
