import { Sidebar } from "./components/Sidebar";
import { AgentEditor } from "./components/AgentEditor";
import { ChatView } from "./components/ChatView";
import { useAppStore } from "./stores/appStore";

function App() {
  const { view, selectedAgentId } = useAppStore();

  return (
    <div className="flex h-screen w-full bg-[#0f1117]">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {!selectedAgentId ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-5xl mb-4">&#x2728;</div>
              <h2 className="text-xl font-medium text-gray-300 mb-2">
                Welcome to Agents Doodle
              </h2>
              <p className="text-sm">
                Create a new agent or select one from the sidebar
              </p>
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
