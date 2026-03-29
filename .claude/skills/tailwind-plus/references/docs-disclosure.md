# Disclosure Component Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/disclosure

## Overview

The `<el-disclosure>` component provides a simple, accessible way to show and hide content -- ideal for building toggleable accordion panels or expandable sections.

**License:** Commercial Tailwind Plus license required.

---

## Component API

### `<el-disclosure>` (Main Container)

Wraps the disclosure content.

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `hidden` | boolean | Whether the disclosure is initially hidden (closed) |
| `open` | boolean | Automatically synced with the `hidden` attribute (read-only) |

#### Data Attributes (Read-only)

| Attribute | Description |
|-----------|-------------|
| `data-closed` | Present before transitioning in, and when transitioning out |
| `data-enter` | Present when transitioning in |
| `data-leave` | Present when transitioning out |
| `data-transition` | Present when transitioning in or out |

#### Methods

| Method | Description |
|--------|-------------|
| `show()` | Shows the disclosure |
| `hide()` | Hides the disclosure |
| `toggle()` | Toggles the disclosure open/closed |

#### Commands (for `<button command="..." commandfor="id">`)

| Command | Description |
|---------|-------------|
| `--show` | Shows the disclosure |
| `--hide` | Hides the disclosure |
| `--toggle` | Toggles the disclosure |

---

### `<button>` (Trigger)

A button element that triggers the disclosure when clicked.

#### ARIA Attributes (Read-only)

| Attribute | Description |
|-----------|-------------|
| `aria-expanded` | Set to `"true"` when open, `"false"` when closed |

---

## Element Hierarchy

```html
<div>
  <button command="--toggle" commandfor="my-disclosure">
    Toggle Content
  </button>
  <el-disclosure id="my-disclosure" hidden>
    <p>Hidden content here...</p>
  </el-disclosure>
</div>
```

## React Usage

```jsx
import { ElDisclosure } from '@tailwindplus/elements/react'
import { useId } from 'react'

export default function MyAccordion() {
  let id = useId()
  return (
    <>
      <button command="--toggle" commandfor={id}>
        Toggle
      </button>
      <ElDisclosure id={id} hidden>
        Content here
      </ElDisclosure>
    </>
  )
}
```

## Examples

1. **Basic example** - Standard disclosure implementation
2. **Opening a disclosure** - Using the `show()` method or `--show` command
3. **Closing a disclosure** - Using the `hide()` method or `--hide` command
4. **Toggling a disclosure** - Using the `toggle()` method or `--toggle` command
5. **Adding transitions** - Using transition data attributes with CSS
