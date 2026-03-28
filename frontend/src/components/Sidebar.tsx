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
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 w-[260px] min-w-[260px]">
      {/* Logo / Brand */}
      <div className="flex h-16 shrink-0 items-center">
        <span className="text-base font-semibold text-white">Fleet <span className="text-xs text-gray-400">clone</span></span>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          {/* Main navigation */}
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              <li>
                <a href="#" className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/5 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                  Chat
                </a>
              </li>
              <li>
                <a href="#" className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/5 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                  </svg>
                  Inbox
                </a>
              </li>
            </ul>
          </li>

          {/* My Agents section */}
          <li>
            <div className="flex items-center justify-between">
              <div className="text-xs/6 font-semibold text-gray-400">My Agents</div>
              <button
                onClick={handleNewAgent}
                className="rounded-md bg-white/10 p-1 text-gray-400 hover:bg-white/20 hover:text-white"
                title="New agent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {agents.map((agent) => (
                <li key={agent.id}>
                  <button
                    onClick={() => {
                      setSelectedAgentId(agent.id);
                      setView("chat");
                      setSelectedConversationId(null);
                      setMessages([]);
                    }}
                    className={`group flex w-full items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${
                      selectedAgentId === agent.id
                        ? "bg-white/5 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      {agent.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="truncate">{agent.name}</span>
                    <span
                      onClick={(e) => handleDeleteAgent(e, agent.id)}
                      className="ml-auto hidden rounded text-gray-500 hover:text-red-400 group-hover:inline-block"
                      title="Delete agent"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </span>
                  </button>

                  {/* Conversation list when agent is selected */}
                  {selectedAgentId === agent.id && conversations.length > 0 && (
                    <ul role="list" className="mt-1 space-y-0.5 pl-9">
                      {conversations.map((conv) => (
                        <li key={conv.id}>
                          <button
                            onClick={() => handleSelectConversation(conv.id)}
                            className={`block w-full truncate rounded-md px-2 py-1 text-left text-xs/5 ${
                              selectedConversationId === conv.id
                                ? "bg-white/5 text-white"
                                : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                            }`}
                          >
                            {conv.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>

          {/* Explore section */}
          <li>
            <div className="text-xs/6 font-semibold text-gray-400">Explore</div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              <li>
                <a href="#" className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/5 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                  </svg>
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/5 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                  Skills
                </a>
              </li>
              <li>
                <a href="#" className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/5 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                  </svg>
                  Templates
                </a>
              </li>
            </ul>
          </li>

          {/* Settings + User footer (pushed to bottom) */}
          <li className="-mx-2 mt-auto">
            <a href="#" className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/5 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Settings
            </a>
            <div className="flex items-center gap-x-4 py-3 text-sm/6 font-semibold text-white">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-800 text-xs font-medium text-gray-300">
                U
              </div>
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Personal</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
