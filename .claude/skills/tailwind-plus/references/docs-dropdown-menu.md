# Dropdown Menu Component Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/dropdown-menu

## Overview

The `<el-dropdown>` component creates dropdown menus with full keyboard support and built-in anchoring capabilities.

**License:** Commercial Tailwind Plus license required.

---

## Component API

### `<el-dropdown>` (Parent Container)

Connects the button trigger with the menu.

#### CSS Variables (Read-only)

| Variable | Purpose |
|----------|---------|
| `--input-width` | Provides width of input element |

---

### `<el-menu>` (Menu Container)

Contains all menu items. All focusable children are treated as selectable options.

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `popover` | required | Enables the popover behavior |
| `open` | boolean | Controls the open/closed state of the menu |
| `anchor` | string | Positioning reference (e.g., "bottom", "bottom-start", "bottom-end") |
| `anchor-strategy` | string | CSS `position` property: `absolute` (default) or `fixed` |

#### CSS Variables

| Variable | Purpose |
|----------|---------|
| `--anchor-gap` | Sets gap between anchor and popover |
| `--anchor-offset` | Distance popover is nudged from original position |

#### Data Attributes (Read-only)

| Attribute | When Present |
|-----------|--------------|
| `data-closed` | Before/during transition out |
| `data-enter` | When transitioning in |
| `data-leave` | When transitioning out |
| `data-transition` | During any transition |

#### Methods

```javascript
togglePopover()    // Toggle menu visibility
showPopover()      // Show menu
hidePopover()      // Hide menu
```

---

## Element Hierarchy

```html
<el-dropdown>
  <button>Options</button>
  <el-menu popover anchor="bottom-start">
    <button>Edit</button>
    <button>Duplicate</button>
    <a href="/archive">Archive</a>
    <button disabled>Delete</button>
  </el-menu>
</el-dropdown>
```

## Examples

1. **Basic example** - Simple dropdown implementation
2. **Using with buttons** - Button-triggered menu items
3. **Using with links** - Anchor tag menu items for navigation
4. **Disabling an item** - Disabled state on individual items
5. **Setting the dropdown width** - Width customization
6. **Positioning the dropdown** - Anchor positioning options
7. **Adding transitions** - Transition effects

## Key Features

- Full keyboard support (arrow keys, Enter, Escape)
- Built-in anchoring system with multiple positions
- Popover API integration
- Transition state management via data attributes
- Supports both buttons and links as menu items
