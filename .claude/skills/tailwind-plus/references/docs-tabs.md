# Tabs Component Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/tabs

## Overview

The `<el-tab-group>` component provides an accessible, keyboard-navigable tab interface with full styling and layout control.

**License:** Commercial Tailwind Plus license required.

---

## Component API

### `<el-tab-group>` (Main Container)

Coordinates tabs and panels.

#### Methods

| Method | Description |
|--------|-------------|
| `setActiveTab(index)` | Sets the active tab by index programmatically |

---

### `<el-tab-list>` (Tab List Container)

Groups all tab button elements.

---

### `<el-tab-panels>` (Panels Container)

Contains tab panel content. All direct children are considered individual panels.

---

## Element Hierarchy

```html
<el-tab-group>
  <el-tab-list>
    <button>Tab 1</button>
    <button>Tab 2</button>
    <button>Tab 3</button>
  </el-tab-list>
  <el-tab-panels>
    <div>Panel 1 content</div>
    <div>Panel 2 content</div>
    <div>Panel 3 content</div>
  </el-tab-panels>
</el-tab-group>
```

## Examples

1. **Basic example** - Standard tab setup
2. **Setting the active tab** - Using `setActiveTab(index)` method

---

## Key Features

- Accessible keyboard navigation
- Active tab management via `setActiveTab()`
- Tab buttons within `<el-tab-list>`
- Corresponding panels within `<el-tab-panels>`
- Automatic tab-panel association by position/index
