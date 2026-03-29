# Popover Component Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/popover

## Overview

The `<el-popover>` component displays floating panels with arbitrary content, perfect for navigation menus and flyouts.

**License:** Commercial Tailwind Plus license required.

---

## Component API

### `<el-popover>` (Main Container)

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `anchor` | string | Positioning location (e.g., "bottom", "bottom-start", "bottom-end", etc.) |
| `anchor-strategy` | string | CSS `position` property: `absolute` (default) or `fixed` |

#### Data Attributes (Read-only)

| Attribute | Description |
|-----------|-------------|
| `data-closed` | Present before transitioning in and when transitioning out |
| `data-enter` | Present when transitioning in |
| `data-leave` | Present when transitioning out |
| `data-transition` | Present during any transition (in or out) |

#### Events

| Event | Description |
|-------|-------------|
| `toggle` | Dispatched when the popover opens or closes |

#### Methods

```javascript
togglePopover()    // Toggles popover visibility
showPopover()      // Shows the popover
hidePopover()      // Hides the popover
```

---

### `<el-popover-group>` (Group Container)

Links related popovers to prevent them from closing when focus moves between them.

---

### `<button>` (Trigger)

Standard button element that toggles the popover when clicked.

#### ARIA Attributes (Read-only)

| Attribute | Values | Description |
|-----------|--------|-------------|
| `aria-expanded` | "true" / "false" | Indicates popover open state |

---

## Anchor Positions

- `bottom` (default)
- `bottom-start`
- `bottom-end`
- `top`
- `top-start`
- `top-end`
- `left`
- `left-start`
- `left-end`
- `right`
- `right-start`
- `right-end`

## Positioning Strategies

- `absolute` (default) - Positioned relative to nearest positioned ancestor
- `fixed` - Positioned relative to the viewport

---

## Examples

1. **Basic example** - Simple popover implementation
2. **Toggling popovers** - Programmatic toggle control
3. **Opening popovers** - Show popover methods
4. **Closing popovers** - Hide popover methods
5. **Setting the panel width** - Width customization
6. **Positioning the panel** - Anchor positioning
7. **Adding transitions** - Transition effects
8. **Grouping related popovers** - Multi-popover coordination with `<el-popover-group>`

---

## Element Hierarchy

```
<el-popover-group>          <!-- Optional: groups related popovers -->
  <el-popover>
    <button>Open</button>
    <div popover anchor="bottom">
      ...content...
    </div>
  </el-popover>
</el-popover-group>
```
