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
- **Frontend**: React 19, TypeScript, Tailwind CSS v4 (with Tailwind Plus patterns), Vite, Zustand, @xyflow/react, react-markdown, @microsoft/fetch-event-source
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
| POST | `/api/conversations/{id}/approve` | Approve/reject pending tool call (returns SSE stream) |
| GET | `/api/agents/tools` | List available tools |
| POST | `/api/skills` | Create skill |
| GET | `/api/skills` | List all skills |
| GET | `/api/skills/{id}` | Get skill |
| PUT | `/api/skills/{id}` | Update skill |
| DELETE | `/api/skills/{id}` | Delete skill |
| GET | `/api/skills/agent/{agent_id}` | List skills for agent |
| POST | `/api/skills/agent/{agent_id}/{skill_id}` | Attach skill to agent |
| DELETE | `/api/skills/agent/{agent_id}/{skill_id}` | Detach skill from agent |

## SSE Event Protocol

| Event | Data | Description |
|-------|------|-------------|
| `token` | `{content}` | Incremental text token |
| `tool_call_start` | `{id, name}` | Tool invocation begins |
| `tool_call_args` | `{id, args_partial}` | Partial args JSON chunk |
| `tool_call_end` | `{id, name, args}` | Complete tool call |
| `tool_result` | `{id, name, content}` | Tool execution result |
| `todos` | `{todos: [{content, status}]}` | Agent planning state |
| `interrupt` | `{tool_calls: [{id, name, args}]}` | Agent paused for approval |
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
- **Human-in-the-loop**: `MemorySaver` checkpointer persists agent state during interrupts. `interrupt_on` configurable per agent via `interrupt_config` JSON. `thread_id` = `conversation_id` for checkpoint resume. `POST /approve` resumes with `Command(resume=...)`.
- **Skills**: Stored in SQLite `skills` table, linked to agents via `agent_skills` join table. Passed to deepagents as SKILL.md files via StateBackend `files` dict at invocation.

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

## Phase 3 Status: COMPLETE (Verified end-to-end, Fleet-matched styling)

### Visual Graph Editor
- **React Flow** (`@xyflow/react` v12) canvas — transparent background, no grid (matches Fleet)
- **6 custom nodes** styled to match Fleet's exact CSS values:
  - **Schedule** — "SCHEDULE + Add", empty state placeholder
  - **Channels** — Rich list: Chat (active, green dot), Slack (+ Connect), Gmail (+ Connect)
  - **Agent** — Central node: name, "INSTRUCTIONS" section with Edit button, full prompt text
  - **Toolbox** — "+ Add" + "MCP" badge, tool rows with name/source/action icons
  - **Sub-agents** — "+ Add" button, sub-agent list or empty state
  - **Skills** — "+ Add" + "Create" buttons, empty state placeholder
- **Node styling** — reverse-engineered from Fleet's DOM:
  - Background: `#09090f` (nearly black), header: `#12121a` (slightly lighter)
  - Border: `1px solid #393f55`, radius: `8px` (`rounded-lg`), shadow: `shadow-sm`
  - Handles: 6px circles, `bg: #1a192b`, `border: #8790ab`
- **Edges** — amber/orange (`#f59e0b`), `strokeDasharray: 5 5`, `opacity: 0.25` (matches Fleet exactly)
- **Inspector panel** (360px right panel) — node-specific property forms
- **Header bar** — Fleet-style: back arrow, agent name, green "Editing" badge, gray "Private" badge, Share/Settings icons, "Save Changes" button
- **Sidebar** — Fleet-style: Chat, Inbox, My Agents (+), Explore section (Integrations, Skills, Templates), Settings, Personal

### Graph Files
```
src/components/graph/
├── GraphCanvas.tsx          # ReactFlow wrapper, transparent bg, bottom-right controls
├── InspectorPanel.tsx       # Right panel with node-specific forms
├── graphTypes.ts            # Node data interfaces
├── useGraphLayout.ts        # buildGraphElements() with amber dashed edges
└── nodes/
    ├── AgentNode.tsx         # Central node with Instructions section
    ├── ToolboxNode.tsx       # Tools list with + Add / MCP header
    ├── SubAgentsNode.tsx     # Sub-agents with + Add
    ├── ChannelsNode.tsx      # Rich channel list (Chat/Slack/Gmail)
    ├── ScheduleNode.tsx      # Schedule placeholder with + Add
    └── SkillsNode.tsx        # Skills placeholder with + Add / Create
```

### Key Files Modified
- `App.tsx` — added `w-full` for full viewport width
- `AgentEditor.tsx` — canvas + inspector split layout, Fleet-style header with badges
- `Sidebar.tsx` — Fleet-style nav (Chat, Inbox, My Agents, Explore, Settings, Personal)
- `index.css` — React Flow handle overrides matching Fleet's exact 6px circle style

## UI Polish: Tailwind Plus Upgrade (COMPLETE)

Upgraded all components from hand-rolled Tailwind to **Tailwind Plus** (tailwindcss.com/plus) dark theme patterns. Reverse-engineered Fleet's exact CSS values for the graph canvas.

### Tailwind Plus Patterns Applied (v4 syntax — scraped from real source)
- **Sidebar Navigation** (Dark) — Heroicon SVGs (`size-6 shrink-0`), nav items with `group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold`, active: `bg-white/5 text-white`, inactive: `text-gray-400 hover:bg-white/5 hover:text-white`. Letter avatars: `rounded-lg border border-white/10 bg-white/5 text-[0.625rem]`. Section labels: `text-xs/6 font-semibold text-gray-400`.
- **Badges** — Ring-based pills: `inline-flex items-center rounded-md bg-{color}-400/10 px-2 py-1 text-xs font-medium text-{color}-400 inset-ring inset-ring-{color}-400/20`. Note: use `inset-ring` (v4), NOT `ring-1 ring-inset` (v3).
- **Buttons** — Primary: `rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`. Secondary: `bg-white/10 inset-ring inset-ring-white/5 hover:bg-white/20`. Soft: `bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30`. No `shadow-xs` on buttons.
- **Inputs** — `block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`
- **Empty States** — SVG icon `mx-auto size-12 text-gray-500`, heading `text-sm font-semibold text-white`, description `text-sm text-gray-400`, CTA button with indigo styling
- **Cards** — `bg-white/5 rounded-lg inset-ring inset-ring-white/10`. Selected: add `inset-ring-indigo-500/50`
- **Full skill reference**: `.claude/skills/tailwind-plus/SKILL.md` + 97 reference files (776KB) covering all 111 Tailwind Plus pages

### Fleet CSS Values (reverse-engineered from DOM inspection)
- Node background: `#09090f`, header: `#12121a`, border: `#393f55`
- Edges: `stroke: #f59e0b` (amber), `strokeDasharray: 5 5`, `opacity: 0.25`
- Handles: 6px circles, `bg: #1a192b`, `border: #8790ab`
- Canvas: transparent background (no grid)

## Phase 4 Status: COMPLETE

### Skills Management
- Skills CRUD API (`/api/skills`) with SQLite persistence
- Agent-skill association via join table (`/api/skills/agent/{id}`)
- Skills passed to deepagents as SKILL.md files via StateBackend at invocation
- SkillsPage with Fleet-style layout: card grid + Explorer panel (Preview/Source tabs)
- Syntax-highlighted Source view using Prism oneDark theme
- Skills attachable to agents via graph inspector panel
- Skills node in graph editor shows attached skills

### Human-in-the-Loop Approvals
- `interrupt_on` parameter configurable per agent via `interrupt_config` JSON column
- `MemorySaver` checkpointer for LangGraph state persistence across interrupts
- `thread_id` (= conversation_id) passed to agent for checkpoint resume
- `POST /api/conversations/{id}/approve` endpoint resumes agent with `Command(resume=...)`
- New SSE `interrupt` event emitted when agent pauses for approval
- `ApprovalDialog` component: yellow warning card with tool name + args preview + Approve/Reject buttons
- After approval, agent resumes streaming from checkpoint; after rejection, agent skips tool
- Chat input disabled during pending interrupt

### Tailwind Plus Skill (Claude Code)
- Comprehensive `.claude/skills/tailwind-plus/` skill with 97 reference files (776KB)
- All 111 Tailwind Plus pages scraped via Chrome DevTools (Application UI, Marketing, Ecommerce, Documentation)
- SKILL.md v3.0 with real Tailwind CSS v4 class strings, JSX examples, and troubleshooting guide
- Full UI audit applied: all components fixed to use correct v4 patterns (`inset-ring`, `bg-*-400/10`, `size-*`, etc.)

## Future Phases (Not Yet Implemented)

- Phase 5: Channels (Slack, Gmail triggers), schedules (cron-based agent runs)
- Phase 6: Memory (AGENTS.md persistent context), traces/observability
