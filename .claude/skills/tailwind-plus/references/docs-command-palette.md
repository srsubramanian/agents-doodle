# Command Palette Component Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/command-palette

## Overview

The `<el-command-palette>` component provides a fast, keyboard-friendly way for users to search and select from a predefined list of options. It's typically displayed inside a dialog -- often triggered with a `Cmd+K` shortcut -- making it ideal for building power-user features like global searches.

**License:** Commercial Tailwind Plus license required.

---

## Component API

### `<el-command-palette>` (Primary Component)

Manages filtering and coordinates with child components.

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | The form field name when used in forms |
| `value` | string | The selected value. Can be read and set programmatically |

#### Events

| Event | Details | Description |
|-------|---------|-------------|
| `change` | `{ relatedTarget }` | Dispatched when the active item changes. Detail contains the active item or `null` |

#### Methods

| Method | Parameters | Description |
|--------|-----------|-------------|
| `setFilterCallback(cb)` | `cb: ({query, node, content}) => boolean` | Customize filtering behavior |
| `reset()` | none | Resets the command to its initial state |

---

### `<el-command-list>` (List Container)

Contains all command items and groups. All focusable children are considered options.

---

### `<el-defaults>` (Default Suggestions)

Optional container for suggestion items shown when the input is empty.

---

### `<el-command-group>` (Group)

Groups related command items together for semantic organization.

---

### `<el-no-results>` (Empty State)

Optional element shown when no items match the current query.

---

### `<el-command-preview>` (Preview Pane)

Optional preview content shown when a specific item is active.

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `for` | string | The `id` of the item this preview content is associated with |

---

## Element Hierarchy

```html
<el-dialog>
  <dialog>
    <el-dialog-panel>
      <el-command-palette name="command" value="">
        <input type="text" placeholder="Search..." />

        <el-defaults>
          <button>Suggested action 1</button>
          <button>Suggested action 2</button>
        </el-defaults>

        <el-command-list>
          <el-command-group>
            <div>Group Label</div>
            <button id="item-1">Item 1</button>
            <button id="item-2">Item 2</button>
            <a href="/page">Link Item</a>
          </el-command-group>
        </el-command-list>

        <el-no-results>
          No results found.
        </el-no-results>

        <el-command-preview for="item-1">
          Preview for Item 1
        </el-command-preview>
      </el-command-palette>
    </el-dialog-panel>
  </dialog>
</el-dialog>
```

## Examples

1. **Basic example** - Simple implementation
2. **Opening and closing** - Dialog trigger and state management
3. **Using with buttons** - Button-triggered commands
4. **Using with links** - Navigation with command palette
5. **Showing option previews** - Preview pane functionality
6. **Showing default commands** - Default/suggestion items display
7. **Handling no results** - Empty state handling
8. **Grouping related commands** - Organization with `<el-command-group>`
9. **Customizing the filter logic** - Using `setFilterCallback()` method

## Usage Pattern: Cmd+K Trigger

Typically paired with `<el-dialog>` and keyboard shortcut:
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    // Open the dialog containing the command palette
  }
})
```
