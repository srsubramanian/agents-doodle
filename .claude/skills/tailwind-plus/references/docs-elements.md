# Tailwind Plus Elements - Overview Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/elements

## Overview

**Tailwind Plus Elements** is a commercial JavaScript UI component library that provides interactive behavior for HTML snippets. It has **no framework dependencies** and works with any modern stack (Next.js, Rails, Laravel, Svelte, Astro, plain HTML).

---

## Available Components

1. **Autocomplete** - Text input with filtered suggestions
2. **Command Palette** - Keyboard-friendly search and select
3. **Dialog** - Modal dialog wrapper
4. **Disclosure** - Toggleable accordion panels
5. **Dropdown Menu** - Menu with keyboard support and anchoring
6. **Popover** - Floating panels with arbitrary content
7. **Select** - Fully accessible styled select replacement
8. **Tabs** - Accessible keyboard-navigable tab interface

---

## Browser Support

Targets modern browsers with minimum versions:
- **Chrome 111** (March 2023)
- **Safari 16.4** (March 2023)
- **Firefox 128** (July 2024)

---

## Installation Methods

### 1. CDN Installation
```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1" type="module"></script>
```

### 2. NPM Installation
```bash
npm install @tailwindplus/elements
```

Import in root layout:
```javascript
import '@tailwindplus/elements';
```

### 3. React Installation
```bash
npm install @tailwindplus/elements
```

Use React-specific components instead of custom elements:
```jsx
import { ElDisclosure } from '@tailwindplus/elements/react'
import { useId } from 'react'

export default function MyAccordion() {
  let id = useId()

  return (
    <>
      <button command="--toggle" commandfor={id}>
        How do you make holy water?
      </button>
      <ElDisclosure id={id} hidden>
        You boil the hell out of it.
      </ElDisclosure>
    </>
  )
}
```

---

## Key Component Details

### Disclosure Component Example

**HTML Element Tag:** `<el-disclosure>` (or `<ElDisclosure>` in React)

**Attributes:**
- `id` - Unique identifier
- `hidden` - Boolean attribute to hide/show content

**Associated Elements:**
- `<button>` - Toggle trigger
- `command="--toggle"` - Command attribute
- `commandfor={id}` - Links button to disclosure element

---

## Package

- **NPM Package:** `@tailwindplus/elements`
- **React Import:** `@tailwindplus/elements/react`
- **License:** Commercial (Tailwind Plus license required)
