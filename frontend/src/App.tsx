import { Sidebar } from "./components/Sidebar";
import { AgentEditor } from "./components/AgentEditor";
import { ChatView } from "./components/ChatView";
import { SkillsPage } from "./components/SkillsPage";
import { useAppStore } from "./stores/appStore";

function App() {
  const { view, selectedAgentId } = useAppStore();

  return (
    <div className="flex h-screen w-full bg-[#0f1117]">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {view === "skills" ? (
          <SkillsPage />
        ) : !selectedAgentId ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto size-12 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-white">
                Welcome to Agents Doodle
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Create a new agent or select one from the sidebar
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    /* Trigger new agent from sidebar store action */
                  }}
                  className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="-ml-0.5 mr-1.5 size-5">
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                  New Agent
                </button>
              </div>
            </div>
          </div>
        ) : view === "editor" ? (
          <AgentEditor />
        ) : (
          <ChatView />
        )}
      </main>
    </div>
  );
}

export default App;
