# Tailwind Plus Documentation Index

> Scraped from https://tailwindcss.com/plus/ui-blocks/documentation/
> Date: 2026-03-28

## Package Info

- **NPM Package:** `@tailwindplus/elements`
- **React Import:** `@tailwindplus/elements/react`
- **Dependencies:** `@headlessui/react`, `@heroicons/react`
- **Minimum React Version:** 18
- **License:** Commercial (Tailwind Plus)

---

## Documentation Pages

### Setup & Overview

| File | Source URL | Description |
|------|-----------|-------------|
| [docs-elements.md](docs-elements.md) | /documentation/elements | Overview of the Elements library -- 8 components, installation (CDN/NPM/React), browser support |
| [docs-using-react.md](docs-using-react.md) | /documentation/using-react | React usage guide -- dependencies, component philosophy, composition patterns, code examples |
| [docs-assets.md](docs-assets.md) | /documentation/assets | Third-party assets: Heroicons (MIT), Unsplash images, Lucid Illustrations, discontinued Figma kit |

### Interactive Components

| File | Source URL | Component Tag | Description |
|------|-----------|--------------|-------------|
| [docs-dialog.md](docs-dialog.md) | /documentation/dialog | `<el-dialog>` | Modal dialog wrapper with scroll lock, click-outside-close, backdrop, transitions. Sub-elements: `<el-dialog-backdrop>`, `<el-dialog-panel>` |
| [docs-popover.md](docs-popover.md) | /documentation/popover | `<el-popover>` | Floating panels with anchor positioning, grouping via `<el-popover-group>`, toggle/show/hide methods |
| [docs-select.md](docs-select.md) | /documentation/select | `<el-select>` | Fully accessible styled select replacement. Sub-elements: `<el-options>`, `<el-option>`, `<el-selectedcontent>` |
| [docs-tabs.md](docs-tabs.md) | /documentation/tabs | `<el-tab-group>` | Keyboard-navigable tabs. Sub-elements: `<el-tab-list>`, `<el-tab-panels>`. Method: `setActiveTab(index)` |
| [docs-disclosure.md](docs-disclosure.md) | /documentation/disclosure | `<el-disclosure>` | Accordion/expandable sections. Commands: `--show`, `--hide`, `--toggle`. Methods: `show()`, `hide()`, `toggle()` |
| [docs-autocomplete.md](docs-autocomplete.md) | /documentation/autocomplete | `<el-autocomplete>` | Text input with filtered suggestions (like `<datalist>` but styleable). Sub-elements: `<el-options>`, `<el-option>` |
| [docs-dropdown-menu.md](docs-dropdown-menu.md) | /documentation/dropdown-menu | `<el-dropdown>` | Dropdown menu with keyboard support and anchoring. Sub-element: `<el-menu>` with `popover` attribute |
| [docs-command-palette.md](docs-command-palette.md) | /documentation/command-palette | `<el-command-palette>` | Keyboard-friendly search/select (Cmd+K pattern). Sub-elements: `<el-command-list>`, `<el-command-group>`, `<el-defaults>`, `<el-no-results>`, `<el-command-preview>` |
| [docs-copy-button.md](docs-copy-button.md) | /documentation/copy-button | `<el-copyable>` | One-click clipboard copy with 2-second `data-copied` feedback and `data-error` state |

---

## Common Patterns Across Components

### Shared Data Attributes (Transitions)

All interactive components support these read-only data attributes for CSS transitions:

| Attribute | When Present |
|-----------|--------------|
| `data-closed` | Before transitioning in, and when transitioning out |
| `data-enter` | When transitioning in |
| `data-leave` | When transitioning out |
| `data-transition` | When transitioning in or out (either direction) |

### Shared ARIA Attributes

Trigger buttons across components automatically get:
- `aria-expanded="true"` when the associated panel/menu/popover is open
- `aria-expanded="false"` when closed

### Shared Popover Pattern

Components using dropdown/floating panels (`<el-options>`, `<el-menu>`, `<el-popover>`) share:
- `popover` attribute (required on the panel element)
- `anchor` attribute for positioning (bottom, bottom-start, bottom-end, top, etc.)
- `anchor-strategy` attribute (`absolute` default, or `fixed`)
- CSS variables: `--anchor-gap`, `--anchor-offset`
- Methods: `togglePopover()`, `showPopover()`, `hidePopover()`

### Command Pattern (Custom Elements)

Some components use the HTML `command`/`commandfor` pattern:
```html
<button command="--toggle" commandfor="element-id">Toggle</button>
```
Available commands vary by component (e.g., `--show`, `--hide`, `--toggle`, `--copy`).

---

## Component Quick Reference

| Component | Custom Element | React Import | Key Use Case |
|-----------|---------------|-------------|--------------|
| Dialog | `<el-dialog>` | `ElDialog` | Modals, confirmations |
| Popover | `<el-popover>` | `ElPopover` | Navigation menus, flyouts |
| Select | `<el-select>` | `ElSelect` | Styled dropdowns, form selects |
| Tabs | `<el-tab-group>` | `ElTabGroup` | Tabbed content panels |
| Disclosure | `<el-disclosure>` | `ElDisclosure` | Accordions, expandable sections |
| Autocomplete | `<el-autocomplete>` | `ElAutocomplete` | Search inputs, comboboxes |
| Dropdown Menu | `<el-dropdown>` | `ElDropdown` | Action menus, context menus |
| Command Palette | `<el-command-palette>` | `ElCommandPalette` | Global search, Cmd+K |
| Copy Button | `<el-copyable>` | `ElCopyable` | Code snippet copy |
