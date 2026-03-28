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
    <div className="w-[280px] min-w-[280px] bg-[#111827] border-r border-gray-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-lg font-semibold text-white">Agents Doodle</h1>
      </div>

      {/* New Agent Button */}
      <div className="p-3">
        <button
          onClick={handleNewAgent}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          + New Agent
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

      {/* Footer */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setView("editor")}
            className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer"
          >
            Edit Agent
          </div>
        </div>
      </div>
    </div>
  );
}
