# Dialog Component Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/dialog

## Overview

The `<el-dialog>` component is a lightweight wrapper around the native `<dialog>` element that adds:
- Scroll locking
- Click-outside-to-close support
- Smooth exit transitions (consistent across all browsers)
- Standard HTML API enhancements

**License:** Commercial Tailwind Plus license required.

---

## Component API

### 1. `<el-dialog>` (Main Wrapper)

Manages open state and transitions.

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `open` | boolean | Indicates whether dialog is open/closed. Change dynamically to control state. |

#### Data Attributes (Read-only)

| Attribute | When Present |
|-----------|--------------|
| `data-closed` | Before transitioning in, and when transitioning out |
| `data-enter` | When transitioning in |
| `data-leave` | When transitioning out |
| `data-transition` | When transitioning in or out |

#### Events

| Event | Triggered | Notes |
|-------|-----------|-------|
| `open` | Dialog opens (any method except attribute update) | -- |
| `close` | Dialog closes (any method except attribute update) | -- |
| `cancel` | User dismisses via Escape or clicking outside | Call `preventDefault()` to prevent closing |

#### Methods

```javascript
show()          // Shows the dialog in modal mode
hide(options)   // Hides the dialog
                // options: { restoreFocus: boolean }
```

---

### 2. `<dialog>` (Native HTML Dialog)

#### Commands

```javascript
show-modal()    // Opens the dialog
close()         // Closes the dialog
```

---

### 3. `<el-dialog-backdrop>` (Backdrop)

Visual backdrop behind the dialog panel.

#### Data Attributes (Read-only)

| Attribute | When Present |
|-----------|--------------|
| `data-closed` | Before transitioning in, and when transitioning out |
| `data-enter` | When transitioning in |
| `data-leave` | When transitioning out |
| `data-transition` | When transitioning in or out |

---

### 4. `<el-dialog-panel>` (Content Panel)

Main content area of the dialog. Clicking outside triggers close.

#### Data Attributes (Read-only)

| Attribute | When Present |
|-----------|--------------|
| `data-closed` | Before transitioning in, and when transitioning out |
| `data-enter` | When transitioning in |
| `data-leave` | When transitioning out |
| `data-transition` | When transitioning in or out |

---

### 5. `<button>` (Trigger)

Button that opens the dialog when clicked.

#### ARIA Attributes (Read-only)

| Attribute | Value | When |
|-----------|-------|------|
| `aria-expanded` | `"true"` | Dialog is open |
| `aria-expanded` | `"false"` | Dialog is closed |

---

## Examples

1. **Basic example** - Standard dialog setup
2. **Opening the dialog** - Methods to trigger open state
3. **Closing the dialog** - Methods to trigger close state
4. **Adding a backdrop** - Visual backdrop implementation
5. **Adding transitions** - Smooth transition effects

---

## Element Hierarchy

```
<el-dialog>
  <button>Open Dialog</button>
  <dialog>
    <el-dialog-backdrop />
    <el-dialog-panel>
      ...content...
    </el-dialog-panel>
  </dialog>
</el-dialog>
```

## Related Components

- [Modals](/plus/ui-blocks/application-ui/overlays/modal-dialogs)
- [Dropdowns](/plus/ui-blocks/application-ui/elements/dropdowns)
- [Command Palettes](/plus/ui-blocks/application-ui/navigation/command-palettes)
