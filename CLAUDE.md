# Agents Doodle

A minimal LangSmith Fleet lookalike — a web app for creating and chatting with AI agents, powered by LangChain's `deepagents` library.

## Project Structure

```
agents-doodle/
├── backend/           # Python FastAPI server
│   ├── app/
│   │   ├── main.py           # FastAPI app, CORS, lifespan, routers
│   │   ├── config.py         # pydantic-settings (DB path, CORS origins)
│   │   ├── database.py       # Async SQLAlchemy engine + session (aiosqlite)
│   │   ├── models.py         # ORM: Agent, Conversation, Message
│   │   ├── schemas.py        # Pydantic request/response schemas
│   │   ├── routers/
│   │   │   ├── agents.py     # CRUD: POST/GET/PUT/DELETE /api/agents
│   │   │   └── chat.py       # Conversations + SSE streaming endpoint
│   │   └── services/
│   │       ├── agent_service.py  # Agent CRUD business logic
│   │       └── chat_service.py   # deepagents integration + SSE streaming
│   ├── Dockerfile
│   └── pyproject.toml
├── frontend/          # React + TypeScript + Tailwind (Vite)
│   ├── src/
│   │   ├── App.tsx           # Layout: sidebar + main panel
│   │   ├── types.ts          # TypeScript interfaces
│   │   ├── stores/appStore.ts # Zustand state management
│   │   ├── api/
│   │   │   ├── agents.ts     # Agent CRUD fetch calls
│   │   │   └── chat.ts       # SSE streaming via @microsoft/fetch-event-source
│   │   └── components/
│   │       ├── Sidebar.tsx        # Agent list + conversation list
│   │       ├── AgentEditor.tsx    # Create/edit agent form
│   │       ├── ChatView.tsx       # Chat orchestration
│   │       ├── MessageList.tsx    # Scrollable message container
│   │       ├── MessageBubble.tsx  # User/assistant message styling
│   │       └── ChatInput.tsx      # Input textarea + send button
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── .env.example
└── .gitignore
```

## Tech Stack

- **Backend**: Python 3.12, FastAPI, SQLAlchemy (async + aiosqlite), deepagents
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Vite, Zustand, @microsoft/fetch-event-source
- **Database**: SQLite (persisted via Docker volume)
- **Docker**: uv for Python deps, multi-stage Node build + nginx

## Commands

### Dev mode (no Docker)
```bash
# Backend
cd backend && pip3 install -e . && uvicorn app.main:app --reload --port 8000

# Frontend (separate terminal)
cd frontend && npm install && npm run dev
# Vite proxies /api → localhost:8000
```

### Docker mode
```bash
cp .env.example .env   # add ANTHROPIC_API_KEY
docker compose up --build
# Frontend: http://localhost:3000, Backend: http://localhost:8000
```

### Frontend checks
```bash
cd frontend && npx tsc --noEmit   # type check
cd frontend && npm run build       # production build
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/agents` | Create agent |
| GET | `/api/agents` | List agents |
| GET | `/api/agents/{id}` | Get agent |
| PUT | `/api/agents/{id}` | Update agent |
| DELETE | `/api/agents/{id}` | Delete agent |
| POST | `/api/agents/{id}/conversations` | Create conversation |
| GET | `/api/agents/{id}/conversations` | List conversations |
| GET | `/api/conversations/{id}/messages` | Get messages |
| POST | `/api/conversations/{id}/messages` | Send message (returns SSE stream) |
| GET | `/api/agents/tools` | List available tools |

## SSE Event Protocol

| Event | Data | Description |
|-------|------|-------------|
| `token` | `{content}` | Incremental text token |
| `tool_call_start` | `{id, name}` | Tool invocation begins |
| `tool_call_args` | `{id, args_partial}` | Partial args JSON chunk |
| `tool_call_end` | `{id, name, args}` | Complete tool call |
| `tool_result` | `{id, name, content}` | Tool execution result |
| `todos` | `{todos: [{content, status}]}` | Agent planning state |
| `done` | `{full_content, tool_calls?, todos?}` | Stream complete |
| `error` | `{detail}` | Error occurred |

## Key Architecture Decisions

- **SSE streaming**: `POST /api/conversations/{id}/messages` returns `text/event-stream`. Uses `agent.astream()` with `stream_mode="messages"` and `version="v2"`.
- **Tool call visibility**: Tool calls and results are streamed as separate SSE events, rendered as collapsible cards in the chat UI.
- **Agent caching**: Compiled deepagent instances are cached by `"{agent_id}:{updated_at}"` to avoid recompilation. Cache invalidates when agent config changes.
- **Tool registry**: `tool_registry.py` maps tool names to factory functions. Tools config stored as JSON in the Agent model.
- **Message metadata**: Assistant messages store tool call info and todos in `metadata_json` column for history replay.
- **Message persistence**: Messages stored in SQLite, full history passed to deepagents on each invocation.
- **Frontend SSE**: Uses `@microsoft/fetch-event-source` (not native EventSource) because we need POST with a request body.
- **State management**: Zustand store holds agents, conversations, messages, streaming text, streaming tool calls, and todos.
- **Markdown**: Assistant messages rendered with `react-markdown` + `remark-gfm` + `react-syntax-highlighter`.
- **DB migrations**: Startup migration helper uses `PRAGMA table_info` + `ALTER TABLE ADD COLUMN` for schema evolution.

## Phase 1 Status: COMPLETE

- Agent CRUD (create, edit, delete)
- Dark-themed UI (sidebar + main panel)
- Chat with streaming text via deepagents
- Conversation persistence, history, auto-titles
- Model selection, Docker deployment

## Phase 2 Status: COMPLETE (Verified end-to-end)

### Markdown Rendering
- `react-markdown` + `remark-gfm` + `react-syntax-highlighter` (Prism, oneDark theme)
- Syntax-highlighted code blocks (Python, JS, etc.), bold, lists, inline code, tables, blockquotes, links
- User messages remain plain text; only assistant messages render markdown

### Tool Call Visibility
- Collapsible `<details>` cards showing tool name, arguments (JSON), and result
- Green checkmark when complete, hourglass when in-progress
- Built-in deepagents tools visible: `write_todos`, `write_file`, `edit_file`, `read_file`, `ls`, etc.
- Cards render in real-time during streaming, then persist via `metadata_json` for history replay

### Custom Tools & Sub-agents
- Tool registry (`tool_registry.py`) with extensible factory pattern
- `web_search` tool via Tavily (requires `TAVILY_API_KEY` in `.env`)
- Agent editor: tools checkboxes section + sub-agents dynamic form (name, description, system prompt)
- Tools/sub-agents config stored as JSON columns on Agent model

### Extended SSE Protocol (7 event types)
- `token`, `tool_call_start`, `tool_call_args`, `tool_call_end`, `tool_result`, `todos`, `done`, `error`
- `done` event includes `full_content`, `tool_calls[]`, and `todos[]` for metadata persistence

### DB Schema Evolution
- Startup migration helper: `PRAGMA table_info` + `ALTER TABLE ADD COLUMN`
- Added: `agents.tools_config`, `agents.subagents_config`, `messages.metadata_json`

## Phase 3 Status: COMPLETE (Verified end-to-end)

### Visual Graph Editor
- **React Flow** (`@xyflow/react` v12) canvas with dark theme, dot grid background, zoom controls
- **4 custom nodes** with color-coded left borders and connection handles:
  - **Channels** (cyan `#06b6d4`) — shows "Chat" as the active channel
  - **Agent** (purple `#8b5cf6`) — shows name, model, truncated instructions, purple avatar
  - **Toolbox** (blue `#3b82f6`) — lists enabled tools with count, updates in real-time
  - **Sub-agents** (green `#10b981`) — lists configured sub-agents with count
- **Colored edges**: animated cyan dashed (Channels→Agent), blue (Agent→Toolbox), green (Agent→Sub-agents)
- **Inspector panel** (360px right panel) — shows node-specific properties:
  - Click Agent node → Name, Description, Model, Instructions form
  - Click Toolbox node → Tool checkboxes (enable/disable)
  - Click Sub-agents node → Add/remove/edit sub-agents form
  - Click Channels node → Read-only channel info
- **Real-time sync**: editing in inspector instantly updates graph node data
- **Draggable nodes** with position persistence during session
- **Same Save button** persists via existing `PUT /api/agents/{id}` — no backend changes needed

### New Files
```
src/components/graph/
├── GraphCanvas.tsx          # ReactFlow wrapper with dark theme
├── InspectorPanel.tsx       # Right panel with node-specific forms
├── graphTypes.ts            # Node data interfaces
├── useGraphLayout.ts        # buildGraphElements() for initial layout
└── nodes/
    ├── AgentNode.tsx         # Purple center node
    ├── ToolboxNode.tsx       # Blue tools node
    ├── SubAgentsNode.tsx     # Green sub-agents node
    └── ChannelsNode.tsx      # Cyan channels node
```

### Modified Files
- `App.tsx` — added `w-full` to fix flex layout at high viewport widths
- `AgentEditor.tsx` — replaced form layout with canvas + inspector split (absolute positioning)
- `index.css` — React Flow dark theme CSS overrides for controls and handles

## Future Phases (Not Yet Implemented)

- Phase 4: Channels (Slack, Gmail triggers), schedules, human-in-the-loop approvals
- Phase 5: Skills (SKILL.md), memory/AGENTS.md, traces/observability
