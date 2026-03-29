# Autocomplete Component Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/autocomplete

## Overview

The `<el-autocomplete>` component is a text input that allows users to enter arbitrary values or select from a list of filtered suggestions. It behaves like a native `<datalist>` but offers greater control over styling.

**License:** Commercial Tailwind Plus license required.

---

## Component API

### `<el-autocomplete>` (Primary Container)

Manages form integration, filtering, and coordinates with child components.

#### CSS Variables (Read-only)

| Variable | Purpose |
|----------|---------|
| `--input-width` | Provides the width of the input element |
| `--button-width` | Provides the width of the button element |

---

### `<el-options>` (Options Container)

Handles the popover behavior for the dropdown.

#### Attributes

| Attribute | Description |
|-----------|-------------|
| `popover` | **Required** - Enables the popover behavior |
| `anchor` | Configures how options are anchored to the button |
| `anchor-strategy` | Sets the `position` CSS property: `absolute` (default) or `fixed` |

#### CSS Variables

| Variable | Purpose |
|----------|---------|
| `--anchor-gap` | Sets the gap between the anchor and the popover |
| `--anchor-offset` | Sets the distance the popover is nudged from its original position |

#### Data Attributes (Read-only)

| Attribute | Description |
|-----------|-------------|
| `data-closed` | Present before transitioning in and when transitioning out |
| `data-enter` | Present when transitioning in |
| `data-leave` | Present when transitioning out |
| `data-transition` | Present when transitioning in or out |

#### Methods

```javascript
togglePopover()  // Toggles the options visibility
showPopover()    // Shows the options
hidePopover()    // Hides the options
```

---

### `<el-option>` (Individual Option)

#### Attributes

| Attribute | Description |
|-----------|-------------|
| `value` | **Required** - The value of the option |
| `disabled` | Whether the option is disabled |

#### ARIA Attributes (Read-only)

| Attribute | Description |
|-----------|-------------|
| `aria-selected` | Present when the option is selected |

---

### `<button>` (Toggle Button)

#### ARIA Attributes (Read-only)

| Attribute | Description |
|-----------|-------------|
| `aria-expanded` | Set to `"true"` when dropdown is open, `"false"` when closed |

---

## Element Hierarchy

```html
<el-autocomplete>
  <input type="text" />
  <button>Toggle</button>
  <el-options popover anchor="bottom">
    <el-option value="apple">Apple</el-option>
    <el-option value="banana">Banana</el-option>
    <el-option value="cherry" disabled>Cherry</el-option>
  </el-options>
</el-autocomplete>
```

## Examples

1. **Basic example** - Standard autocomplete implementation
2. **Positioning the dropdown** - Various dropdown anchor positions
3. **Setting the dropdown width** - Width configuration options
4. **Adding transitions** - Transition effects for popover animations
5. **Disabling the input** - Disabled state handling

## Related Components

- [Select Menus](/plus/ui-blocks/application-ui/forms/select-menus)
- [Comboboxes](/plus/ui-blocks/application-ui/forms/comboboxes)
- [Dropdown Menus](/plus/ui-blocks/application-ui/elements/dropdowns)
