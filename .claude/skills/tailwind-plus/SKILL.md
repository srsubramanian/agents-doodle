---
name: tailwind-plus-dark-theme
description: Tailwind Plus (tailwindcss.com/plus) dark theme UI component patterns for React apps. Use when building buttons, badges, forms, inputs, sidebars, cards, modals, alerts, toggles, tables, empty states, dropdowns, or any UI component. Use when user says "style this", "add a button", "make a form", "build a sidebar", "create a modal", or "make it look polished". Provides exact Tailwind CSS v4 class strings scraped from real Tailwind Plus source. Do NOT use for backend logic or database work.
metadata:
  author: agents-doodle
  version: 3.0.0
  category: frontend-ui
  tags: [tailwindcss, tailwind-plus, dark-theme, react, ui-components, tailwind-v4]
---

# Tailwind Plus Dark Theme Components

All class strings below are **scraped from real Tailwind Plus source code** via Chrome DevTools. For the full 639-line extraction with every variant, see `references/classes-report.md`. For Elements library interactive component APIs, see `references/docs-*.md`. For application shell layouts, see `references/shells-*.md`.

## CRITICAL: Tailwind v4 Syntax

These patterns use Tailwind CSS v4. **DO NOT** use v3 syntax:

| v3 (WRONG) | v4 (CORRECT) |
|---|---|
| `ring-1 ring-inset ring-green-500/20` | `inset-ring inset-ring-green-500/20` |
| `w-6 h-6` | `size-6` |
| `text-sm leading-6` | `text-sm/6` |
| `shadow-sm` on buttons | NO shadow — use `inset-ring` for secondary |
| `rounded-sm` everywhere | `rounded-sm` only for XS/SM, `rounded-md` for MD+ |
| `ring-1 ring-white/10` on inputs | `outline-1 -outline-offset-1 outline-white/10` |

## Quick Lookup: I Need A...

| I need... | Pattern | Size used in this project |
|---|---|---|
| Primary action button | `bg-indigo-500 text-white hover:bg-indigo-400` | LG (`px-3 py-2`) |
| Secondary/ghost button | `bg-white/10 text-white inset-ring inset-ring-white/5 hover:bg-white/20` | LG |
| Danger/soft button | `bg-red-500/20 text-red-400 hover:bg-red-500/30` | LG |
| Text input | `bg-white/5 outline-1 -outline-offset-1 outline-white/10` | Standard |
| Status badge | `bg-{color}-400/10 text-{color}-400 inset-ring inset-ring-{color}-400/20` | Standard |
| Sidebar nav item | `group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold` | — |
| Card/panel | `bg-white/5 rounded-lg ring-1 ring-white/10` | — |
| Empty state | `text-center` + icon `mx-auto size-12 text-gray-500` | — |
| Modal backdrop | `fixed inset-0 bg-gray-500/75` | — |
| Toggle switch | `group relative inline-flex w-11 shrink-0 rounded-full bg-white/5 p-0.5 inset-ring inset-ring-white/10` | — |

---

## Buttons

### Primary (most common — use LG for this project)
```jsx
<button className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
  Save Changes
</button>
```

### All Primary Sizes
```
XS:  rounded-sm  px-2   py-1   text-xs
SM:  rounded-sm  px-2   py-1   text-sm
MD:  rounded-md  px-2.5 py-1.5 text-sm
LG:  rounded-md  px-3   py-2   text-sm    ← default for this project
XL:  rounded-md  px-3.5 py-2.5 text-sm
```
All share: `bg-indigo-500 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`

### Secondary
```jsx
<button className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20">
  Cancel
</button>
```

### Soft (for colored actions like delete)
```jsx
<button className="rounded-md bg-red-500/20 px-3 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/30">
  Delete
</button>
```

### With Leading Icon
```jsx
<button className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
  <svg className="-ml-0.5 size-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
  </svg>
  New Item
</button>
```
Leading icon: `-ml-0.5 size-5`. Trailing icon: `-mr-0.5 size-5`.

### Circular Icon Button
```jsx
<button className="rounded-full bg-indigo-500 p-1.5 text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
  <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">...</svg>
</button>
```
Sizes: `p-1` (SM), `p-1.5` (MD), `p-2` (LG). Icon always `size-5`.

### Pill Buttons
Replace `rounded-sm`/`rounded-md` with `rounded-full`. Primary pill LG: `rounded-full bg-indigo-500 px-3.5 py-2 text-sm font-semibold text-white hover:bg-indigo-400`.

---

## Badges

### Standard with Ring (8 colors)
```jsx
<span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">
  Active
</span>
```

| Color | Background | Text | Ring |
|---|---|---|---|
| Gray | `bg-gray-400/10` | `text-gray-400` | `inset-ring-gray-400/20` |
| Red | `bg-red-400/10` | `text-red-400` | `inset-ring-red-400/20` |
| Yellow | `bg-yellow-400/10` | `text-yellow-500` | `inset-ring-yellow-400/20` |
| Green | `bg-green-400/10` | `text-green-400` | `inset-ring-green-500/20` |
| Blue | `bg-blue-400/10` | `text-blue-400` | `inset-ring-blue-400/30` |
| Indigo | `bg-indigo-400/10` | `text-indigo-400` | `inset-ring-indigo-400/30` |
| Purple | `bg-purple-400/10` | `text-purple-400` | `inset-ring-purple-400/30` |
| Pink | `bg-pink-400/10` | `text-pink-400` | `inset-ring-pink-400/20` |

### Pill: Replace `rounded-md` with `rounded-full`
### Small: Replace `px-2 py-1` with `px-1.5 py-0.5`
### Flat (no ring): Omit the `inset-ring` classes

### With Dot
```jsx
<span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white inset-ring inset-ring-white/10">
  <svg className="size-1.5 fill-green-400" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" /></svg>
  Online
</span>
```

### With Remove Button
```jsx
<span className="inline-flex items-center gap-x-0.5 rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 inset-ring inset-ring-indigo-400/30">
  Tag
  <button className="group relative -mr-1 size-3.5 rounded-xs hover:bg-indigo-500/30">
    <svg viewBox="0 0 14 14" className="size-3.5 stroke-indigo-400 group-hover:stroke-indigo-300">
      <path d="M4 4l6 6m0-6l-6 6" />
    </svg>
  </button>
</span>
```

---

## Form Inputs

### Label
```jsx
<label className="block text-sm/6 font-medium text-white">Email</label>
```

### Standard Input
```jsx
<input className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
```

### Disabled: add `disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500 disabled:outline-white/5`

### Error Input
```jsx
<input className="block w-full rounded-md bg-white/5 py-1.5 pr-10 pl-3 text-red-400 outline-1 -outline-offset-1 outline-red-500/50 placeholder:text-red-400/70 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6" />
<p className="mt-2 text-sm text-red-400">Not a valid email address.</p>
```

### Help Text: `mt-2 text-sm text-gray-400`

### With Leading Icon
```jsx
<div className="mt-2 grid grid-cols-1">
  <input className="col-start-1 row-start-1 block w-full rounded-md bg-white/5 py-1.5 pr-3 pl-10 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:pl-9 sm:text-sm/6" />
  <svg className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-500 sm:size-4" />
</div>
```

### Select: same as input, add `*:bg-gray-800`
### Textarea: same as input, add `font-mono` for code, `resize-y` for resizable
### Checkbox: `size-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900`

---

## Toggles

### Simple Switch
```jsx
<label className="group relative inline-flex w-11 shrink-0 cursor-pointer rounded-full bg-white/5 p-0.5 inset-ring inset-ring-white/10 transition-colors duration-200 ease-in-out has-checked:bg-indigo-500">
  <input type="checkbox" className="absolute inset-0 size-full appearance-none focus:outline-hidden" />
  <span className="size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5" />
</label>
```

### With Label: wrap in `flex items-center justify-between`. Label: `text-sm/6 font-medium text-white`. Description: `text-sm text-gray-400`.

---

## Sidebar Navigation

Container: `relative flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6`
Active: `group flex gap-x-3 rounded-md bg-white/5 p-2 text-sm/6 font-semibold text-white`
Inactive: `group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/5 hover:text-white`
Icon: `size-6 shrink-0` (inactive add `text-gray-400 group-hover:text-white`)
Badge: `ml-auto w-9 min-w-max rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs/5 font-medium whitespace-nowrap text-white outline-1 -outline-offset-1 outline-white/15`
Section label: `text-xs/6 font-semibold text-gray-400`
Letter avatar: `flex size-6 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[0.625rem] font-medium text-gray-400 group-hover:border-white/20 group-hover:text-white`
User footer: `flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-white/5`

Full layout code: see `references/shells-sidebar.md`

---

## Empty States

```jsx
<div className="text-center">
  <svg className="mx-auto size-12 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">{/* Heroicon */}</svg>
  <h3 className="mt-2 text-sm font-semibold text-white">No items</h3>
  <p className="mt-1 text-sm text-gray-400">Get started by creating something.</p>
  <div className="mt-6">
    <button className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400">
      <svg className="mr-1.5 -ml-0.5 size-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
      </svg>
      New Item
    </button>
  </div>
</div>
```

Dashed border variant: `relative block w-full rounded-lg border-2 border-dashed border-white/15 p-12 text-center hover:border-white/25`

---

## Cards & Layout

Simple: `bg-white/5 rounded-lg ring-1 ring-white/10 p-4`
Selected: add `ring-indigo-500/50 bg-white/[0.07]`
With header: `overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10` + header `px-4 py-3 border-b border-white/10`
Divider: `border-t border-white/10`

---

## Modals

```jsx
<div className="relative z-50">
  <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative overflow-hidden rounded-lg bg-gray-900 px-4 pt-5 pb-4 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
        <h3 className="text-lg/6 font-semibold text-white">Title</h3>
        <p className="mt-2 text-sm text-gray-400">Description.</p>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
          <button className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400">Confirm</button>
          <button className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Notifications

```jsx
<div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/10 shadow-lg">
  <div className="p-4"><div className="flex items-start">
    <svg className="size-6 text-green-400 shrink-0" />{/* checkmark icon */}
    <div className="ml-3 w-0 flex-1 pt-0.5">
      <p className="text-sm font-semibold text-white">Saved!</p>
      <p className="mt-1 text-sm text-gray-400">Changes saved.</p>
    </div>
    <button className="ml-4 shrink-0 rounded-md text-gray-400 hover:text-gray-300"><svg className="size-5" /></button>
  </div></div>
</div>
```

---

## Headings

Page: `text-2xl/8 font-semibold text-white sm:truncate sm:text-3xl`
Section: `text-base/7 font-semibold text-white`
Card: `text-sm font-semibold text-white`

---

## Elements Library

Interactive components from `@tailwindplus/elements`. See `references/docs-*.md` for APIs:
Dialog (`docs-dialog.md`), Popover (`docs-popover.md`), Select (`docs-select.md`), Tabs (`docs-tabs.md`), Disclosure (`docs-disclosure.md`), Autocomplete (`docs-autocomplete.md`), Dropdown (`docs-dropdown-menu.md`), Command Palette (`docs-command-palette.md`), Copy Button (`docs-copy-button.md`)

Shared: `data-closed`/`data-enter`/`data-leave` for transitions. Popover components share `anchor`/`--anchor-gap` positioning.

---

## Heroicons

24x24 outline: `<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0">`
20x20 solid: `<svg viewBox="0 0 20 20" fill="currentColor" className="size-5">`
16x16 micro: `<svg viewBox="0 0 16 16" fill="currentColor" className="size-4">`

---

## Troubleshooting

| Problem | Wrong | Right |
|---|---|---|
| Badge ring | `ring-1 ring-inset ring-green-500/20` | `inset-ring inset-ring-green-500/20` |
| Badge bg | `bg-green-500/10` | `bg-green-400/10` |
| Input focus | `focus:ring-2 focus:ring-indigo-500` | `focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500` |
| Button shadow | `shadow-xs` on buttons | Remove — secondary uses `inset-ring inset-ring-white/5` |
| Small button radius | `rounded-md` for XS/SM | `rounded-sm` for XS/SM |
| Icon sizing | `w-5 h-5` | `size-5` |
| Line height | `text-sm leading-6` | `text-sm/6` |
| Avatar border | `border-gray-700 bg-gray-800` | `border-white/10 bg-white/5` |
| Using emoji | Any emoji for icons | Always Heroicon SVGs with `shrink-0` |
