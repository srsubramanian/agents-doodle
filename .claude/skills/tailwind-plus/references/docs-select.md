# Select Component Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/select

## Overview

The `<el-select>` component is a fully accessible replacement for native HTML `<select>` elements, providing complete styling control while maintaining accessibility standards.

**License:** Commercial Tailwind Plus license required.

---

## Component API

### 1. `<el-select>` (Parent Container)

Manages form integration and coordinates with child components.

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | string | The form field name for the select when used in forms |
| `value` | string | The selected value (can be read and set programmatically) |

#### Events

| Event | Description |
|-------|-------------|
| `input` | Dispatched when the selected option changes |
| `change` | Dispatched when the selected option changes |

#### CSS Variables (Read-only)

| Variable | Purpose |
|----------|---------|
| `--input-width` | Provides the width of the input element |

---

### 2. `<el-options>` (Options Container)

Handles popover behavior and options visibility management.

#### Attributes

| Attribute | Description |
|-----------|-------------|
| `popover` | **Required** - Enables popover behavior |
| `anchor` | Configures how options are anchored to the button |
| `anchor-strategy` | CSS `position` property: `absolute` (default) or `fixed` |

#### CSS Variables

| Variable | Purpose |
|----------|---------|
| `--anchor-gap` | Sets gap between anchor and popover |
| `--anchor-offset` | Sets distance popover is nudged from original position |

#### Data Attributes (Read-only)

| Attribute | Description |
|-----------|-------------|
| `data-closed` | Before transitioning in, and when transitioning out |
| `data-enter` | When transitioning in |
| `data-leave` | When transitioning out |
| `data-transition` | During transitions in or out |

#### Methods

```javascript
togglePopover()    // Toggles options visibility
showPopover()      // Shows the options
hidePopover()      // Hides the options
```

---

### 3. `<el-option>` (Individual Option)

Represents a selectable option within the select.

#### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `value` | string | **Required** - The value of the option |
| `disabled` | boolean | Whether the option is disabled |

#### ARIA Attributes (Read-only)

| Attribute | Description |
|-----------|-------------|
| `aria-selected` | Present when the option is selected |

---

### 4. `<el-selectedcontent>` (Selected Display)

Automatically displays the content of the currently selected option.

---

## Element Hierarchy

```
<el-select name="color" value="red">
  <button>
    <el-selectedcontent />
  </button>
  <el-options popover anchor="bottom">
    <el-option value="red">Red</el-option>
    <el-option value="blue">Blue</el-option>
    <el-option value="green" disabled>Green</el-option>
  </el-options>
</el-select>
```

## Examples

1. **Basic example** - Simple select setup
2. **Positioning the dropdown** - Dropdown placement configuration
3. **Setting the dropdown width** - Width customization
4. **Adding transitions** - Transition animations
5. **Disabling the input** - Disabled state handling
