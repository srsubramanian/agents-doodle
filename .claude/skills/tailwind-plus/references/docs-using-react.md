# Tailwind Plus - Using React Documentation

> Source: https://tailwindcss.com/plus/ui-blocks/documentation/using-react

## Overview

Guidance on implementing Tailwind Plus UI components in React projects.

## Installation Requirements

### Dependencies
```bash
npm install @headlessui/react @heroicons/react
```

**Requirements:**
- React >= 18 (minimum version)
- Headless UI - powers interactive behavior
- Heroicons - provides icon library

## Component Philosophy

Tailwind Plus provides **blueprints and patterns, not rigid constraints**. Key principles:

1. **Minimal assumptions** - Examples don't enforce specific prop APIs or data sources
2. **Flexible composition** - Break down examples into smaller components as needed
3. **Data extraction** - Some data provided in local variables for readability, but kept minimal
4. **Ownership** - Final code is yours to structure however you prefer

> "Tailwind Plus is more like a set of blueprints, patterns, and ideas than a rigid UI kit. The code you end up with at the end of the day is _yours_, and you can factor it however you like."

## Example: Stacked List Component

### Starting Example (single component)

```jsx
const people = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kristen Ramos',
    email: 'kristen.ramos@example.com',
    image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Ted Fox',
    email: 'ted.fox@example.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export default function Example() {
  return (
    <ul className="divide-y divide-gray-200">
      {people.map((person) => (
        <li key={person.email} className="flex py-4">
          <img className="size-10 rounded-full" src={person.image} alt="" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{person.name}</p>
            <p className="text-sm text-gray-500">{person.email}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
```

### Refactored Example (separated components)

```jsx
function HockeyTeamItem({ team }) {
  return (
    <li className="flex py-4">
      <img className="size-10 rounded-full" src={team.logo} alt="" />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{team.name}</p>
        <p className="text-sm text-gray-500">{team.city}</p>
      </div>
    </li>
  )
}

export default function HockeyTeamList({ teams }) {
  return (
    <ul className="divide-y divide-gray-200">
      {teams.map((team) => (
        <HockeyTeamItem key={team.id} team={team} />
      ))}
    </ul>
  )
}
```

## Common CSS Classes in Examples

| Class | Purpose |
|-------|---------|
| `divide-y` | Adds border between y-axis items |
| `divide-gray-200` | Gray color for dividers |
| `flex` | Flexbox layout |
| `py-4` | Padding on y-axis |
| `size-10` | Sets width and height to 10 units |
| `rounded-full` | Full border radius (circular) |
| `ml-3` | Margin left |
| `text-sm` | Small text size |
| `font-medium` | Medium font weight |
| `text-gray-900` | Dark gray text |
| `text-gray-500` | Medium gray text |
