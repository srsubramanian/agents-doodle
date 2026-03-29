# Copy Button Component Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/copy-button

## Overview

The `<el-copyable>` component enables users to copy text snippets to the clipboard with a single click.

**License:** Commercial Tailwind Plus license required.

---

## Component API

### `<el-copyable>` (Main Wrapper)

Wraps the text content that should be copied to the clipboard when the copy command is triggered.

#### Commands

| Command | Description |
|---------|-------------|
| `--copy` | Copies the text to the clipboard |

---

### `<button>` (Trigger)

A button element that triggers the copy operation when clicked.

#### Data Attributes (Read-only)

| Attribute | Description |
|-----------|-------------|
| `data-copied` | Present for 2 seconds after the text has been successfully copied |
| `data-error` | Present when the copy operation fails |

---

## Element Hierarchy

```html
<el-copyable>
  <button command="--copy">Copy</button>
  <pre><code>Text content to be copied goes here</code></pre>
</el-copyable>
```

## Usage Patterns

### Basic Copy Button
```html
<el-copyable>
  <button command="--copy">
    <span>Copy</span>
  </button>
  <pre>npm install @tailwindplus/elements</pre>
</el-copyable>
```

### With Visual Feedback (using data attributes in CSS)
```css
/* Show checkmark after copy */
button[data-copied] .copy-icon { display: none; }
button[data-copied] .check-icon { display: block; }

/* Show error state */
button[data-error] { color: red; }
```

## Key Features

- **Simple API** - Wraps content in `<el-copyable>` with a `<button>` trigger
- **Success feedback** - `data-copied` attribute present for 2 seconds after successful copy
- **Error feedback** - `data-error` attribute when copy operation fails
- **Clipboard integration** - Native clipboard copy functionality
- **Command-based** - Uses `--copy` command pattern
