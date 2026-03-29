# Tailwind Plus Dark Theme Class Patterns Report

Extracted from Tailwind Plus UI Blocks on 2026-03-28. All classes are from the **dark theme** variant.

---

## 1. Badges (149 unique classes)
Source: https://tailwindcss.com/plus/ui-blocks/application-ui/elements/badges

### With border (standard rounded-md, inset-ring)
- `inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20`
- `inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20`
- `inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20`
- `inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20`
- `inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30`
- `inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 inset-ring inset-ring-indigo-400/30`
- `inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 inset-ring inset-ring-purple-400/30`
- `inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/20`

### With border and dot
- `inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white inset-ring inset-ring-white/10`
- Dot SVG: `size-1.5 fill-red-400` / `fill-yellow-400` / `fill-green-400` / `fill-blue-400` / `fill-indigo-400` / `fill-purple-400` / `fill-pink-400`

### Pill with border (rounded-full, inset-ring)
- `inline-flex items-center rounded-full bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20`
- `inline-flex items-center rounded-full bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20`
- `inline-flex items-center rounded-full bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20`
- `inline-flex items-center rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20`
- `inline-flex items-center rounded-full bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30`
- `inline-flex items-center rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 inset-ring inset-ring-indigo-400/30`
- `inline-flex items-center rounded-full bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 inset-ring inset-ring-purple-400/30`
- `inline-flex items-center rounded-full bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/20`

### Pill with border and dot
- `inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-200 inset-ring inset-ring-white/10`

### With border and remove button
- Badge: `inline-flex items-center gap-x-0.5 rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20`
- Remove button: `group relative -mr-1 size-3.5 rounded-xs hover:bg-gray-500/30`
- Remove icon: `size-3.5 stroke-gray-400 group-hover:stroke-gray-300`
- SR-only: `sr-only`
- Absolute inset: `absolute -inset-1`
- (Same pattern for red, yellow, green, blue, indigo, purple, pink variants)

### Flat (no ring)
- `inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400`
- `inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400`
- `inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500`
- `inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400`
- `inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400`
- `inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400`
- `inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400`
- `inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400`

### Flat pill (no ring, rounded-full)
- `inline-flex items-center rounded-full bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400`
- `inline-flex items-center rounded-full bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400`
- `inline-flex items-center rounded-full bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-300`
- `inline-flex items-center rounded-full bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400`
- `inline-flex items-center rounded-full bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400`
- `inline-flex items-center rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400`
- `inline-flex items-center rounded-full bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400`
- `inline-flex items-center rounded-full bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400`

### Flat with dot
- `inline-flex items-center gap-x-1.5 rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400`
- Dot: `size-1.5 fill-gray-400`
- (Same pattern for all color variants)

### Flat pill with dot
- `inline-flex items-center gap-x-1.5 rounded-full bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400`
- (Same pattern for all color variants)

### Flat with remove button
- `inline-flex items-center gap-x-0.5 rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400`
- Remove: `group relative -mr-1 size-3.5 rounded-xs hover:bg-gray-400/20`
- (Same pattern for all color variants)

### Small with border (px-1.5 py-0.5)
- `inline-flex items-center rounded-md bg-gray-400/10 px-1.5 py-0.5 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20`
- (Same pattern for all color variants)

### Small flat (px-1.5 py-0.5, no ring)
- `inline-flex items-center rounded-md bg-gray-400/10 px-1.5 py-0.5 text-xs font-medium text-gray-300`
- (Same pattern for all color variants)

### Small pill with border
- `inline-flex items-center rounded-full bg-gray-400/10 px-1.5 py-0.5 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20`
- `inline-flex items-center rounded-full bg-red-900/20 px-1.5 py-0.5 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20`
- `inline-flex items-center rounded-full bg-yellow-900/20 px-1.5 py-0.5 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20`
- `inline-flex items-center rounded-full bg-green-900/20 px-1.5 py-0.5 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20`
- `inline-flex items-center rounded-full bg-blue-900/20 px-1.5 py-0.5 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30`
- `inline-flex items-center rounded-full bg-indigo-900/20 px-1.5 py-0.5 text-xs font-medium text-indigo-400 inset-ring inset-ring-indigo-400/30`
- `inline-flex items-center rounded-full bg-purple-900/20 px-1.5 py-0.5 text-xs font-medium text-purple-400 inset-ring inset-ring-purple-400/30`
- `inline-flex items-center rounded-full bg-pink-900/20 px-1.5 py-0.5 text-xs font-medium text-pink-400 inset-ring inset-ring-pink-400/20`

### Small flat pill
- `inline-flex items-center rounded-full bg-gray-800 px-1.5 py-0.5 text-xs font-medium text-gray-300`
- `inline-flex items-center rounded-full bg-red-400/10 px-1.5 py-0.5 text-xs font-medium text-red-400`
- (Same pattern for all color variants)

### Small flat with dot
- `inline-flex items-center gap-x-1.5 rounded-md bg-gray-400/10 px-1.5 py-0.5 text-xs font-medium text-gray-300`
- (Same pattern for all color variants)

### Small flat pill with dot
- `inline-flex items-center gap-x-1.5 rounded-full bg-gray-400/10 px-1.5 py-0.5 text-xs font-medium text-gray-300`
- (Same pattern for all color variants)

### Badge Pattern Summary
Base: `inline-flex items-center text-xs font-medium`
- Standard size: `px-2 py-1`
- Small size: `px-1.5 py-0.5`
- Shapes: `rounded-md` (default) or `rounded-full` (pill)
- With ring: `inset-ring inset-ring-{color}-{shade}/{opacity}`
- Backgrounds: `bg-{color}-400/10` or `bg-{color}-900/20` (small pill)
- Text: `text-{color}-400` (most) or `text-{color}-500` (yellow) or `text-{color}-300` (some flat)
- Dot: `gap-x-1.5` + SVG `size-1.5 fill-{color}-400`
- Remove button: `gap-x-0.5` + button `group relative -mr-1 size-3.5 rounded-xs hover:bg-{color}-{shade}/30`

---

## 2. Buttons (34 unique classes)
Source: https://tailwindcss.com/plus/ui-blocks/application-ui/elements/buttons

### Primary buttons (5 sizes)
- XS: `rounded-sm bg-indigo-500 px-2 py-1 text-xs font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- SM: `rounded-sm bg-indigo-500 px-2 py-1 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- MD: `rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- LG: `rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- XL: `rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`

### Secondary buttons (5 sizes)
- XS: `rounded-sm bg-white/10 px-2 py-1 text-xs font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`
- SM: `rounded-sm bg-white/10 px-2 py-1 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`
- MD: `rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`
- LG: `rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`
- XL: `rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`

### Soft buttons (5 sizes)
- XS: `rounded-sm bg-indigo-500/20 px-2 py-1 text-xs font-semibold text-indigo-400 hover:bg-indigo-500/30`
- SM: `rounded-sm bg-indigo-500/20 px-2 py-1 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/30`
- MD: `rounded-md bg-indigo-500/20 px-2.5 py-1.5 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/30`
- LG: `rounded-md bg-indigo-500/20 px-3 py-2 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/30`
- XL: `rounded-md bg-indigo-500/20 px-3.5 py-2.5 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/30`

### Buttons with leading icon
- MD: `inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- LG: `inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- XL: `inline-flex items-center gap-x-2 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- Icon: `-ml-0.5 size-5`

### Buttons with trailing icon
- Icon: `-mr-0.5 size-5`

### Rounded primary buttons (5 sizes)
- XS: `rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- SM: `rounded-full bg-indigo-500 px-2.5 py-1 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- MD: `rounded-full bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- LG: `rounded-full bg-indigo-500 px-3.5 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- XL: `rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`

### Rounded secondary buttons (5 sizes)
- XS: `rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`
- SM: `rounded-full bg-white/10 px-2.5 py-1 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`
- MD: `rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`
- LG: `rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`
- XL: `rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`

### Circular buttons (icon-only)
- SM: `rounded-full bg-indigo-500 p-1 text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- MD: `rounded-full bg-indigo-500 p-1.5 text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- LG: `rounded-full bg-indigo-500 p-2 text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- Icon: `size-5`

### Button Pattern Summary
Base: `font-semibold`
- Primary: `bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- Secondary: `bg-white/10 text-white inset-ring inset-ring-white/5 hover:bg-white/20`
- Soft: `bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30`
- Shapes: `rounded-sm` (xs/sm), `rounded-md` (md/lg/xl), `rounded-full` (pill/circular)

---

## 3. Input Groups (64 unique classes)
Source: https://tailwindcss.com/plus/ui-blocks/application-ui/forms/input-groups

### Labels
- `block text-sm/6 font-medium text-white`
- `text-sm/6 text-gray-400` (corner hint)
- `block text-xs font-medium text-gray-200` (inset label)
- `ml-px block pl-4 text-sm/6 font-medium text-white` (pill label)

### Standard input
- `block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`

### Disabled input
- `block w-full rounded-md bg-white/5 px-3 py-1.5 text-gray-300 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500 disabled:outline-white/5 sm:text-sm/6`

### Validation error input
- `col-start-1 row-start-1 block w-full rounded-md bg-white/5 py-1.5 pr-10 pl-3 text-red-400 outline-1 -outline-offset-1 outline-red-500/50 placeholder:text-red-400/70 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:pr-9 sm:text-sm/6`
- Error icon: `pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-400 sm:size-4`
- Error text: `mt-2 text-sm text-red-400`

### Help text
- `mt-2 text-sm text-gray-400`

### Input with leading icon
- Wrapper: `mt-2 grid grid-cols-1`
- Input: `col-start-1 row-start-1 block w-full rounded-md bg-white/5 py-1.5 pr-3 pl-10 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:pl-9 sm:text-sm/6`
- Icon: `pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-500 sm:size-4`

### Input with trailing icon
- Input: `col-start-1 row-start-1 block w-full rounded-md bg-white/5 py-1.5 pr-10 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:pr-9 sm:text-sm/6`
- Icon: `pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-500 sm:size-4`

### Input with add-on
- Add-on: `flex shrink-0 items-center rounded-l-md bg-white/5 px-3 text-base text-gray-400 outline-1 -outline-offset-1 outline-gray-700 sm:text-sm/6`
- Input: `-ml-px block w-full grow rounded-r-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`

### Input with inline add-on
- Wrapper: `flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500`
- Prefix text: `shrink-0 text-base text-gray-400 select-none sm:text-sm/6`
- Input: `block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6`

### Input with inline leading and trailing add-ons
- Wrapper: `flex items-center rounded-md bg-white/5 px-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500`
- Input: `block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6`

### Input with inline leading dropdown
- Wrapper: `flex rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500`
- Select wrapper: `grid shrink-0 grid-cols-1 focus-within:relative`
- Select: `col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent py-1.5 pr-7 pl-3 text-base text-gray-400 *:bg-gray-800 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`
- Chevron: `pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4`

### Input with leading icon and trailing button
- Input: `col-start-1 row-start-1 block w-full rounded-l-md bg-white/5 py-1.5 pr-3 pl-10 text-base text-white outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:pl-9 sm:text-sm/6`
- Button: `flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white/10 px-3 py-2 text-sm font-semibold text-white outline-1 -outline-offset-1 outline-gray-700 hover:bg-white/20 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500`
- Button icon: `-ml-0.5 size-4 text-gray-400`

### Inputs with shared borders
- Top: `block w-full rounded-t-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-500 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`
- Bottom-left: `block w-full rounded-bl-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-500 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`
- Bottom-right: `block w-full rounded-br-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-500 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`
- Bottom: `block w-full rounded-b-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-500 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`

### Input with inset label
- Wrapper: `rounded-md bg-white/5 px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500`
- Label: `block text-xs font-medium text-gray-200`
- Input: `block w-full bg-transparent text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6`

### Input with overlapping label
- Wrapper: `relative`
- Label: `absolute -top-2 left-2 inline-block rounded-lg bg-gray-900 px-1 text-xs font-medium text-white`
- Input: `block w-full rounded-md bg-gray-900 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`

### Input with pill shape
- Input: `block w-full rounded-full bg-white/5 px-4 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`

### Input with gray background and bottom border
- Wrapper: `relative mt-2`
- Input: `peer block w-full bg-white/5 px-3 py-1.5 text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6`
- Border: `absolute inset-x-0 bottom-0 border-t border-white/20 peer-focus:border-t-2 peer-focus:border-indigo-500`

### Input with keyboard shortcut
- Wrapper: `flex rounded-md bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500`
- Input: `block min-w-0 grow bg-transparent px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6`
- Shortcut wrapper: `flex py-1.5 pr-1.5`
- Shortcut: `inline-flex items-center rounded-sm border border-white/10 px-1 font-sans text-xs text-gray-400`

### Input Pattern Summary
Base input: `w-full bg-white/5 text-base text-white placeholder:text-gray-500 sm:text-sm/6`
- Outline: `outline-1 -outline-offset-1 outline-white/10`
- Focus: `focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500`
- Shared border variant: `outline-gray-700` instead of `outline-white/10`
- Padding: `px-3 py-1.5` (standard)

---

## 4. Toggles (19 unique classes)
Source: https://tailwindcss.com/plus/ui-blocks/application-ui/forms/toggles

### Simple toggle
- Switch: `group relative inline-flex w-11 shrink-0 rounded-full bg-white/5 p-0.5 inset-ring inset-ring-white/10 outline-offset-2 outline-indigo-500 transition-colors duration-200 ease-in-out has-checked:bg-indigo-500 has-focus-visible:outline-2`
- Knob: `size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5`
- Hidden input: `absolute inset-0 size-full appearance-none focus:outline-hidden`

### Short toggle
- Switch: `group relative inline-flex h-5 w-10 shrink-0 items-center justify-center rounded-full outline-offset-2 outline-indigo-500 has-focus-visible:outline-2`
- Track: `absolute mx-auto h-4 w-9 rounded-full bg-gray-800/50 inset-ring inset-ring-white/10 transition-colors duration-200 ease-in-out group-has-checked:bg-indigo-500`
- Knob: `absolute left-0 size-5 rounded-full border border-gray-300 bg-white transition-transform duration-200 ease-in-out group-has-checked:translate-x-5`

### Toggle with icon
- Knob: `relative size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5`
- Off icon wrapper: `absolute inset-0 flex size-full items-center justify-center opacity-100 transition-opacity duration-200 ease-in group-has-checked:opacity-0 group-has-checked:duration-100 group-has-checked:ease-out`
- Off icon: `size-3 text-gray-600`
- On icon wrapper: `absolute inset-0 flex size-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-has-checked:opacity-100 group-has-checked:duration-200 group-has-checked:ease-in`
- On icon: `size-3 text-indigo-500`

### Toggle with label
- Container: `flex items-center justify-between`
- Label wrapper: `flex grow flex-col`
- Label: `text-sm/6 font-medium text-white`
- Description: `text-sm text-gray-400`

### Toggle with label (variant)
- Container: `flex items-center justify-between gap-3`

### Toggle Pattern Summary
Base switch: `group relative inline-flex shrink-0 rounded-full`
- Off state: `bg-white/5 inset-ring inset-ring-white/10`
- On state: `has-checked:bg-indigo-500`
- Knob: `size-5 rounded-full bg-white shadow-xs`
- Transition: `transition-colors duration-200 ease-in-out` (track), `transition-transform duration-200 ease-in-out` (knob)

---

## 5. Empty States (67 unique classes)
Source: https://tailwindcss.com/plus/ui-blocks/application-ui/feedback/empty-states

### Simple centered
- Container: `text-center`
- Icon: `mx-auto size-12 text-gray-500`
- Heading: `mt-2 text-sm font-semibold text-white`
- Description: `mt-1 text-sm text-gray-400`
- Button wrapper: `mt-6`
- Button: `inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- Button icon: `mr-1.5 -ml-0.5 size-5`

### Simple centered with dashed border
- Container: `relative block w-full rounded-lg border-2 border-dashed border-white/15 p-12 text-center hover:border-white/25 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500`
- Heading: `mt-2 block text-sm font-semibold text-white`

### With recommendations
- Heading: `text-base font-semibold text-white`
- Grid: `mt-6 grid grid-cols-1 gap-6 border-y border-white/10 py-6 sm:grid-cols-2`
- Item flow: `flow-root`
- Item wrapper: `relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:outline-2 focus-within:outline-indigo-500 hover:bg-white/5`
- Item icon containers: `flex size-16 shrink-0 items-center justify-center rounded-lg bg-pink-500` (also bg-yellow-500, bg-green-500, bg-blue-500, bg-indigo-500, bg-purple-500)
- Item icon: `size-6 text-white`
- Item text: `text-sm font-medium text-white`
- Link overlay: `focus:outline-hidden` + `absolute inset-0`
- Action link: `text-sm font-medium text-indigo-400 hover:text-indigo-300`

### With starting points and inline email form
- Container: `mx-auto max-w-lg`
- Heading: `mt-2 text-base font-semibold text-white`
- Form: `mt-6 flex`
- Input: `block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`
- Submit button: `ml-4 shrink-0 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`

### With starting points and people list
- List dividers: `mt-4 divide-y divide-white/10 border-t border-b border-white/10`
- List item: `flex items-center justify-between space-x-3 py-4`
- Avatar: `size-10 rounded-full outline -outline-offset-1 outline-white/10`
- Name: `truncate text-sm font-medium text-white`
- Role: `truncate text-sm font-medium text-gray-400`
- Action button: `inline-flex items-center gap-x-1.5 text-sm/6 font-semibold text-white`
- Action icon: `size-5 text-gray-500`
- SR text: `sr-only`

### With starting points and icons list
- List: `mt-6 divide-y divide-white/10 border-y border-white/10`
- Item: `group relative flex items-start space-x-3 py-4`
- Icon container: `inline-flex size-10 items-center justify-center rounded-lg bg-pink-500` (also bg-purple-500, bg-yellow-500)
- Description: `text-sm text-gray-400`
- Chevron: `size-5 text-gray-500 group-hover:text-gray-400`

### With starting points and role select
- Container: `mx-auto max-w-md sm:max-w-3xl`
- Form: `mt-6 sm:flex sm:items-center`
- Input wrapper: `flex grow items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500`
- Input: `block min-w-0 grow bg-transparent py-1.5 pr-3 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6`
- Select wrapper: `grid shrink-0 grid-cols-1 focus-within:relative`
- Select: `col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent py-1.5 pr-7 pl-3 text-base text-gray-400 *:bg-gray-800 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`
- Select chevron: `pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4`
- Submit button: `mt-3 sm:mt-0 sm:ml-4 sm:shrink-0` + `block w-full rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`

### With starting points and people grid
- Grid: `mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2`
- Person button: `group flex w-full items-center justify-between space-x-3 rounded-full border border-white/10 p-2 text-left hover:bg-white/5 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500`
- Name: `block truncate text-sm font-medium text-white`
- Role: `block truncate text-sm font-medium text-gray-400`
- Add icon wrapper: `inline-flex size-10 shrink-0 items-center justify-center`

---

## 6. Notifications (40 unique classes)
Source: https://tailwindcss.com/plus/ui-blocks/application-ui/overlays/notifications

### Container (all variants)
- Fixed wrapper: `pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6`
- Inner wrapper: `flex w-full flex-col items-center space-y-4 sm:items-end`

### Simple notification
- Card: `pointer-events-auto w-full max-w-sm translate-y-0 transform rounded-lg bg-gray-800 opacity-100 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition duration-300 ease-out sm:translate-x-0 starting:translate-y-2 starting:opacity-0 starting:sm:translate-x-2 starting:sm:translate-y-0`
- Content: `p-4`
- Icon wrapper: `flex items-start`
- Success icon: `size-6 text-green-400`
- Text wrapper: `ml-3 w-0 flex-1 pt-0.5`
- Title: `text-sm font-medium text-white`
- Description: `mt-1 text-sm text-gray-400`
- Close wrapper: `ml-4 flex shrink-0`
- Close button: `inline-flex rounded-md text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500`
- SR text: `sr-only`
- Close icon: `size-5`

### Notification with action
- Layout: `flex items-center`
- Text: `w-0 flex-1 text-sm font-medium text-white`
- Action button: `ml-3 shrink-0 rounded-md bg-gray-800 text-sm font-medium text-indigo-400 hover:text-indigo-300 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-400`

### Notification with split buttons
- Actions: `mt-3 flex space-x-7`
- Accept: `rounded-md text-sm font-medium text-indigo-400 hover:text-indigo-300 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-400`
- Decline: `rounded-md text-sm font-medium text-gray-300 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-400`

### Notification with avatar
- Card: `pointer-events-auto flex w-full max-w-md translate-y-0 transform rounded-lg bg-gray-800 opacity-100 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition duration-300 ease-out sm:translate-x-0 starting:translate-y-2 starting:opacity-0 starting:sm:translate-x-2 starting:sm:translate-y-0`
- Avatar: `size-10 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10`
- Button area: `flex border-l border-white/10`
- Action: `flex w-full items-center justify-center rounded-none rounded-r-lg p-4 text-sm font-medium text-indigo-400 hover:text-indigo-300 focus:outline-2 focus:outline-indigo-400`

### Notification with split actions
- Card: `pointer-events-auto flex w-full max-w-md translate-y-0 transform divide-x divide-white/10 rounded-lg bg-gray-800 opacity-100 shadow-lg outline-1 -outline-offset-1 outline-white/10 transition duration-300 ease-out sm:translate-x-0 starting:translate-y-2 starting:opacity-0 starting:sm:translate-x-2 starting:sm:translate-y-0`
- Top action: `flex w-full items-center justify-center rounded-none rounded-tr-lg px-4 py-3 text-sm font-medium text-indigo-400 hover:text-indigo-300 focus:z-10 focus:outline-2 focus:outline-indigo-400`
- Bottom action: `flex w-full items-center justify-center rounded-none rounded-br-lg px-4 py-3 text-sm font-medium text-gray-300 hover:text-white focus:outline-2 focus:outline-indigo-400`

### Notification with buttons below
- Actions: `mt-4 flex`
- Primary: `inline-flex items-center rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`
- Secondary: `ml-3 inline-flex items-center rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20`

### Notification Pattern Summary
Card base: `rounded-lg bg-gray-800 shadow-lg outline-1 -outline-offset-1 outline-white/10`
- Transition: `transition duration-300 ease-out`
- Enter from: `starting:translate-y-2 starting:opacity-0 starting:sm:translate-x-2`
- Dividers: `divide-white/10`, `border-white/10`

---

## 7. Cards (11 unique classes)
Source: https://tailwindcss.com/plus/ui-blocks/application-ui/layout/cards

### Basic card
- `overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10`
- Body: `px-4 py-5 sm:p-6`

### Card without rounded corners (mobile)
- `overflow-hidden bg-gray-800/50 outline -outline-offset-1 outline-white/10 sm:rounded-lg`

### Card with divider (header + body)
- `divide-y divide-white/10 overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10`
- Header: `px-4 py-5 sm:px-6`
- Body: `px-4 py-5 sm:p-6` (or `sm:px-6`)

### Card with divider (header + body + footer)
- `divide-white/10 overflow-hidden rounded-lg bg-gray-800/50 outline -outline-offset-1 outline-white/10`
- Header: `bg-gray-800/50 px-4 py-4 sm:px-6`
- Body: `bg-gray-800/50 px-4 py-5 sm:p-6` (or `px-4 py-4 sm:px-6`)

### Card with gray header
- Header: `bg-gray-800/50 px-4 py-4 sm:px-6`

### Card without shadow
- `overflow-hidden rounded-lg bg-gray-800/50`
- Mobile: `overflow-hidden bg-gray-800/50 sm:rounded-lg`

### Card Pattern Summary
Base: `overflow-hidden rounded-lg bg-gray-800/50`
- With outline: `outline -outline-offset-1 outline-white/10`
- With dividers: `divide-y divide-white/10`
- Padding: `px-4 py-5 sm:p-6` (body) or `px-4 py-5 sm:px-6` (header)
- Gray header: `bg-gray-800/50 px-4 py-4 sm:px-6`

---

## 8. Textareas (78 unique classes)
Source: https://tailwindcss.com/plus/ui-blocks/application-ui/forms/textareas

### Simple textarea with label
- Label: `block text-sm/6 font-medium text-white`
- Spacing: `mt-2`
- Textarea: `block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6`

### Textarea with avatar and actions
- Layout: `flex items-start space-x-4`
- Avatar: `inline-block size-10 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10`
- Wrapper: `min-w-0 flex-1`
- Card: `rounded-lg bg-white/5 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500`
- SR label: `sr-only`
- Textarea: `block w-full resize-none bg-transparent px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6`
- Toolbar: `absolute inset-x-0 bottom-0 flex justify-between py-2 pr-2 pl-3`
- Icon buttons: `-m-2.5 flex size-10 items-center justify-center rounded-full text-gray-500 hover:text-white`
- Icons: `size-5`
- Dropdown icon button: `relative -m-2.5 flex size-10 items-center justify-center rounded-full text-gray-500 hover:text-white`
- Dropdown menu: `-ml-3.5 w-60 rounded-lg bg-gray-800 py-3 text-base outline-1 -outline-offset-1 outline-white/10 ...`
- Dropdown option: `relative block cursor-default bg-transparent px-3 py-2 text-white select-none focus:bg-white/5 focus:outline-hidden`
- Mood emoji: `flex size-8 items-center justify-center rounded-full bg-red-500` (also bg-pink-400, bg-green-400, bg-yellow-400, bg-blue-500)
- Submit: `inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`

### Textarea with underline border
- Textarea: `block w-full resize-none text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6`
- Border: `border-b border-white/10 pb-px focus-within:border-b-2 focus-within:border-indigo-500 focus-within:pb-0`
- Icon buttons: `-m-2 inline-flex size-10 items-center justify-center rounded-full text-gray-500 hover:text-white`
- Icons: `size-6`

### Textarea with title
- Card: `rounded-lg bg-gray-800/50 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500`
- Title input: `block w-full px-3 pt-2.5 text-lg font-medium text-white placeholder:text-gray-500 focus:outline-none`
- Textarea: `block w-full resize-none px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6`
- Divider: `h-px`
- Footer: `absolute inset-x-px bottom-0`
- Assignee dropdown: `relative inline-flex items-center rounded-full bg-white/5 px-2 py-2 text-sm font-medium whitespace-nowrap hover:bg-white/10 sm:px-3`
- Assignee icon: `size-5 shrink-0 text-gray-500 sm:-ml-1`
- Assignee text: `hidden truncate text-gray-300 sm:block`
- Label menu: `max-h-56 w-52 overflow-auto rounded-lg bg-gray-800 py-3 text-base shadow-sm outline-1 -outline-offset-1 outline-white/10 ...`
- Label option: `block cursor-default bg-gray-800 px-3 py-2 select-none focus:relative focus:bg-white/5 focus:outline-hidden`
- Label avatar: `size-5 shrink-0 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10`

### Textarea with preview tabs
- Tabs container: `flex gap-2`
- Tab: `rounded-md border border-transparent bg-gray-900 px-3 py-1.5 text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white aria-selected:bg-white/10 aria-selected:text-white`
- Textarea (tab panel): `mx-px mt-px px-3 pt-2 pb-12 text-sm text-gray-300`
- Card: `border-b border-white/10`

---

## 9. Select Menus (45 unique classes)
Source: https://tailwindcss.com/plus/ui-blocks/application-ui/forms/select-menus

### Native select
- Label: `block text-sm/6 font-medium text-white`
- Wrapper: `mt-2 grid grid-cols-1`
- Select: `col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 sm:text-sm/6`
- Chevron: `pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4`

### Custom listbox
- Button: `grid w-full cursor-default grid-cols-1 rounded-md bg-white/5 py-1.5 pr-2 pl-3 text-left text-white outline-1 -outline-offset-1 outline-white/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 sm:text-sm/6`
- Button text: `col-start-1 row-start-1 truncate pr-6`
- Button chevron: `col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4`
- Options list: `max-h-60 w-(--button-width) overflow-auto rounded-md bg-gray-800 py-1 text-base outline-1 -outline-offset-1 outline-white/10 [--anchor-gap:--spacing(1)] data-leave:transition data-leave:transition-discrete data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm`
- Option (checkmark right): `group/option relative block cursor-default py-2 pr-9 pl-3 text-white select-none focus:bg-indigo-500 focus:text-white focus:outline-hidden`
- Option (checkmark left): `group/option relative block cursor-default py-2 pr-4 pl-8 text-white select-none focus:bg-indigo-500 focus:text-white focus:outline-hidden`
- Option text: `block truncate font-normal group-aria-selected/option:font-semibold`
- Check icon (right): `absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-not-aria-selected/option:hidden group-focus/option:text-white in-[el-selectedcontent]:hidden`
- Check icon (left): `absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-400 group-not-aria-selected/option:hidden group-focus/option:text-white in-[el-selectedcontent]:hidden`
- Check icon size: `size-5`

### Listbox with status indicator
- Button content: `col-start-1 row-start-1 flex items-center gap-3 pr-6`
- Status dot: `inline-block size-2 shrink-0 rounded-full border border-transparent`
- Active dot: `inline-block size-2 shrink-0 rounded-full border border-transparent bg-green-400 forced-colors:bg-[Highlight]`
- Inactive dot: `inline-block size-2 shrink-0 rounded-full border border-transparent bg-white/25`

### Listbox with avatars
- Avatar: `size-5 shrink-0 rounded-full bg-gray-700 outline -outline-offset-1 outline-white/10`
- Options (shorter): `max-h-56 w-(--button-width) overflow-auto rounded-md bg-gray-800 py-1 text-base outline-1 -outline-offset-1 outline-white/10 [--anchor-gap:--spacing(1)] data-leave:transition data-leave:transition-discrete data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm`

### Listbox with secondary text
- Button content: `col-start-1 row-start-1 flex w-full gap-2 pr-6`
- Primary text: `truncate`
- Secondary text: `truncate text-gray-400`
- Option secondary text: `ml-2 truncate text-gray-400 group-focus/option:text-indigo-100`

### Split button with dropdown
- Container: `inline-flex divide-x divide-indigo-600 rounded-md outline-hidden`
- Primary button: `inline-flex items-center gap-x-1.5 rounded-l-md bg-indigo-500 px-3 py-2 text-white`
- Primary icon: `-ml-0.5 size-5`
- Primary text: `text-sm font-semibold`
- Dropdown trigger: `inline-flex items-center rounded-l-none rounded-r-md bg-indigo-500 p-2 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-400`
- Dropdown icon: `size-5 text-white forced-colors:text-[Highlight]`
- Menu: `w-72 origin-top-right divide-y divide-white/10 overflow-hidden rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 [--anchor-gap:--spacing(2)] data-leave:transition data-leave:transition-discrete data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0`
- Menu option: `group/option block cursor-default p-4 text-sm text-white select-none focus:bg-indigo-500 focus:text-white focus:outline-hidden`
- Option text: `font-normal group-aria-selected/option:font-semibold in-[el-selectedcontent]:font-semibold`
- Check mark: `text-indigo-400 group-not-aria-selected/option:hidden group-focus/option:text-white in-[el-selectedcontent]:hidden`
- Description: `mt-2 text-gray-400 group-focus/option:text-indigo-100 in-[el-selectedcontent]:hidden`

### Select Pattern Summary
Button base: `w-full rounded-md bg-white/5 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10`
- Focus: `focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500`
- Options dropdown: `rounded-md bg-gray-800 py-1 outline-1 -outline-offset-1 outline-white/10`
- Option hover: `focus:bg-indigo-500 focus:text-white focus:outline-hidden`
- Selected: `group-aria-selected/option:font-semibold`
- Check: `text-indigo-400 group-not-aria-selected/option:hidden`

---

## Cross-Component Pattern Summary (Dark Theme)

### Colors
- **Background**: `bg-white/5` (inputs, cards), `bg-gray-800` (dropdowns, notifications), `bg-gray-800/50` (cards), `bg-gray-900` (overlapping label bg)
- **Text primary**: `text-white`
- **Text secondary**: `text-gray-400`
- **Text tertiary**: `text-gray-500` (placeholders, icons)
- **Text muted**: `text-gray-300`
- **Primary action**: `bg-indigo-500 hover:bg-indigo-400`
- **Primary text on action**: `text-indigo-400 hover:text-indigo-300`
- **Borders**: `outline-white/10` (default), `outline-gray-700` (shared borders), `outline-gray-600` (overlapping label)
- **Dividers**: `divide-white/10`, `border-white/10`
- **Focus ring**: `outline-indigo-500` (always)
- **Error**: `text-red-400`, `outline-red-500/50`, `outline-red-400`
- **Success**: `text-green-400`

### Spacing
- Input padding: `px-3 py-1.5` (standard)
- Button padding: `px-2 py-1` (xs), `px-2.5 py-1.5` (md), `px-3 py-2` (lg), `px-3.5 py-2.5` (xl)
- Badge padding: `px-2 py-1` (standard), `px-1.5 py-0.5` (small)
- Card padding: `px-4 py-5 sm:p-6` (body), `px-4 py-4 sm:px-6` (footer)

### Typography
- Labels: `text-sm/6 font-medium text-white`
- Help text: `text-sm text-gray-400`
- Error text: `text-sm text-red-400`
- Badge text: `text-xs font-medium`
- Button text: `text-sm font-semibold`
- Input text: `text-base sm:text-sm/6`

### Borders & Outlines
- Default outline: `outline-1 -outline-offset-1 outline-white/10`
- Focus outline: `focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500`
- Focus-within: `focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500`
- Inset ring (badges): `inset-ring inset-ring-{color}-400/{opacity}`
- Inset ring (secondary buttons): `inset-ring inset-ring-white/5`

### Radius
- `rounded-sm` (xs/sm buttons)
- `rounded-md` (standard inputs, buttons, badges)
- `rounded-lg` (cards, notifications, dropdowns)
- `rounded-full` (pill badges, rounded buttons, toggles, avatars)
- `rounded-xs` (badge remove buttons)

### Icons
- Standard: `size-5`
- Small (in inputs): `sm:size-4`
- Badge dots: `size-1.5`
- Empty state hero: `size-12`
- Card icons: `size-6`
- Badge remove: `size-3.5`
