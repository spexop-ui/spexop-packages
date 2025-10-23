# Dropdown

A modern, accessible dropdown menu component for displaying a list of actions or options with advanced features like search, grouping, and mobile optimization.

## Features

- **Keyboard accessible** (Arrow keys, Enter, Escape, Home, End)
- **Screen reader accessible** with ARIA
- **Click outside to close**
- **Configurable placement**
- **Icons support**
- **Disabled items**
- **Danger variant** for destructive actions
- **Dividers between items**
- **Search functionality** with highlighting
- **Item grouping** for better organization
- **Loading states** for async operations
- **Empty states** with custom content
- **Mobile optimized** with touch-friendly targets
- **Controlled and uncontrolled modes**
- **Focus management**
- **WCAG AA+ compliant**
- **Modern animations** and micro-interactions

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Dropdown } from "@spexop/react";

const items = [
  { id: '1', label: 'Edit', onClick: () => console.log('Edit') },
  { id: '2', label: 'Duplicate', onClick: () => console.log('Duplicate') },
  { id: '3', label: 'Delete', variant: 'danger', onClick: () => console.log('Delete') },
];

function App() {
  return (
    <Dropdown items={items} trigger={<button>Actions</button>} />
  );
}
```

## With Icons

```tsx
import { Icon } from '@spexop/react';
import { Edit, Share, Trash } from '@spexop/icons';

const items = [
  { id: '1', label: 'Edit', icon: <Icon name="Edit" />, onClick: handleEdit },
  { id: '2', label: 'Share', icon: <Icon name="Share" />, onClick: handleShare },
  { id: '3', label: 'Delete', icon: <Icon name="Trash" />, variant: 'danger', onClick: handleDelete },
];

<Dropdown items={items} trigger={<button>Actions</button>} />
```

## With Dividers

```tsx
const items = [
  { id: '1', label: 'View', onClick: handleView },
  { id: '2', label: 'Edit', onClick: handleEdit, divider: true },
  { id: '3', label: 'Delete', variant: 'danger', onClick: handleDelete },
];

<Dropdown items={items} trigger={<button>Actions</button>} />
```

## Placement

```tsx
{/* Bottom start (default) */}
<Dropdown items={items} trigger={<button>Actions</button>} placement="bottom-start" />

{/* Bottom end */}
<Dropdown items={items} trigger={<button>Actions</button>} placement="bottom-end" />

{/* Top start */}
<Dropdown items={items} trigger={<button>Actions</button>} placement="top-start" />

{/* Top end */}
<Dropdown items={items} trigger={<button>Actions</button>} placement="top-end" />
```

## Disabled Items

```tsx
const items = [
  { id: '1', label: 'Edit', onClick: handleEdit },
  { id: '2', label: 'Share', disabled: true },
  { id: '3', label: 'Delete', variant: 'danger', onClick: handleDelete },
];

<Dropdown items={items} trigger={<button>Actions</button>} />
```

## Controlled Mode

```tsx
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown 
      items={items}
      trigger={<button>Actions</button>}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
```

## Keep Open on Click

```tsx
<Dropdown 
  items={items}
  trigger={<button>Options</button>}
  closeOnItemClick={false}
/>
```

## With Search

```tsx
const items = [
  { id: '1', label: 'Apple', keywords: ['fruit', 'red'], onClick: handleApple },
  { id: '2', label: 'Banana', keywords: ['fruit', 'yellow'], onClick: handleBanana },
  { id: '3', label: 'Cherry', keywords: ['fruit', 'red'], onClick: handleCherry },
];

<Dropdown 
  items={items}
  trigger={<button>Select Fruit</button>}
  searchable
  searchPlaceholder="Search fruits..."
  highlightMatches
/>
```

## With Grouping

```tsx
const items = [
  { id: '1', label: 'Edit', group: 'actions', onClick: handleEdit },
  { id: '2', label: 'Delete', group: 'actions', variant: 'danger', onClick: handleDelete },
  { id: '3', label: 'Settings', group: 'preferences', onClick: handleSettings },
  { id: '4', label: 'Theme', group: 'preferences', onClick: handleTheme },
];

<Dropdown 
  items={items}
  trigger={<button>Menu</button>}
  grouped
  showGroupDividers
/>
```

## With Loading State

```tsx
function AsyncDropdown() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    setLoading(true);
    const data = await fetchItems();
    setItems(data);
    setLoading(false);
  };

  return (
    <Dropdown 
      items={items}
      trigger={<button onClick={loadItems}>Load Items</button>}
      loading={loading}
    />
  );
}
```

## With Custom Empty State

```tsx
const customEmptyState = (
  <div>
    <div>🔍</div>
    <div>No results found</div>
    <button onClick={handleReset}>Reset filters</button>
  </div>
);

<Dropdown 
  items={[]}
  trigger={<button>Search</button>}
  emptyState={customEmptyState}
/>
```

## With Custom Search

```tsx
const customSearch = (query, items) => {
  return items.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.description?.toLowerCase().includes(query.toLowerCase())
  );
};

<Dropdown 
  items={items}
  trigger={<button>Search</button>}
  searchable
  onSearch={customSearch}
  onSearchChange={(query) => console.log('Searching:', query)}
/>
```

## Mobile Optimized

```tsx
<Dropdown 
  items={items}
  trigger={<button>Menu</button>}
  maxHeight={300}
  // Automatically applies mobile optimizations
  // - Larger touch targets (44px minimum)
  - Centered positioning on mobile
  - Responsive font sizes
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `DropdownMenuItem[]` | required | Menu items |
| `trigger` | `React.ReactElement` | required | Trigger element |
| `placement` | `"bottom-start" \| "bottom-end" \| "top-start" \| "top-end"` | `"bottom-start"` | Dropdown placement |
| `isOpen` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(isOpen: boolean) => void` | - | Open state callback |
| `className` | `string` | - | Additional CSS class |
| `triggerClassName` | `string` | - | CSS class for trigger |
| `closeOnItemClick` | `boolean` | `true` | Close on item click |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | `"Search..."` | Search placeholder text |
| `onSearch` | `(query: string, items: DropdownMenuItem[]) => DropdownMenuItem[]` | - | Custom search function |
| `grouped` | `boolean` | `false` | Group items by group property |
| `loading` | `boolean` | `false` | Show loading state |
| `emptyState` | `React.ReactNode` | - | Custom empty state content |
| `maxHeight` | `number` | `400` | Maximum height of dropdown |
| `showGroupDividers` | `boolean` | `true` | Show dividers between groups |
| `renderItem` | `(item: DropdownMenuItem, index: number) => React.ReactNode` | - | Custom item renderer |
| `onSearchChange` | `(query: string) => void` | - | Search query change callback |
| `highlightMatches` | `boolean` | `true` | Highlight search matches |

### DropdownMenuItem Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `label` | `React.ReactNode` | Yes | Item label |
| `icon` | `React.ReactNode` | No | Icon to display |
| `disabled` | `boolean` | No | Whether disabled |
| `variant` | `"default" \| "danger"` | No | Item variant |
| `onClick` | `() => void` | No | Click handler |
| `divider` | `boolean` | No | Show divider after |
| `keywords` | `string[]` | No | Search keywords for filtering |
| `group` | `string` | No | Group identifier for grouping |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong borders with subtle shadow
- **Principle 3: Typography before decoration** - Clear hierarchy with proper font weights
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with full keyboard support

## Accessibility

- Uses `role="menu"` and `role="menuitem"` for proper semantics
- `aria-expanded` and `aria-haspopup` on trigger
- `aria-label` on search input
- Keyboard navigation with arrow keys
- Focus management within menu
- Escape key closes menu and clears search
- Click outside closes menu
- Focus returns to trigger on close
- Screen reader friendly
- High contrast mode support
- Reduced motion support
- Touch-friendly targets (44px minimum on mobile)

## Keyboard Navigation

- **Click/Enter**: Open dropdown
- **Escape**: Close dropdown and clear search
- **Arrow Down**: Next item
- **Arrow Up**: Previous item
- **Home**: First item
- **End**: Last item
- **Enter/Space**: Activate item
- **Type**: Search items (when searchable)
- **Tab**: Navigate between search input and items

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Popover - For more complex interactive content
- Tooltip - For simple hover information
- Modal - For larger overlay content
