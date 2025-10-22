# EmptyState

An accessible empty state component for displaying helpful messages when there's no content.

## Features

- Clear title and description
- Icon or illustration support
- Action button support
- Size variants
- Centered layout
- Semantic HTML with ARIA
- Responsive design

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { EmptyState } from "@spexop/react";

function App() {
  return (
    <EmptyState 
      title="No results found"
      description="Try adjusting your search criteria"
    />
  );
}
```

## With Icon

```tsx
const SearchIcon = (
  <svg width="64" height="64" viewBox="0 0 24 24">
    {/* icon paths */}
  </svg>
);

<EmptyState 
  icon={SearchIcon}
  title="No results found"
  description="Try adjusting your search criteria"
/>
```

## With Action

```tsx
<EmptyState 
  title="No items yet"
  description="Get started by creating your first item"
  action={<button>Create Item</button>}
/>
```

## Multiple Actions

```tsx
<EmptyState 
  title="No data available"
  description="Import data or start fresh"
  action={
    <>
      <button>Import Data</button>
      <button>Start Fresh</button>
    </>
  }
/>
```

## Sizes

```tsx
{/* Small */}
<EmptyState 
  size="sm"
  title="No notifications"
  description="You're all caught up!"
/>

{/* Medium (default) */}
<EmptyState 
  size="md"
  title="No messages"
  description="Start a conversation"
/>

{/* Large */}
<EmptyState 
  size="lg"
  title="Welcome!"
  description="Let's get you started"
  action={<button>Begin</button>}
/>
```

## Search Results Example

```tsx
function SearchResults({ query, results }) {
  if (results.length === 0) {
    return (
      <EmptyState 
        icon={<SearchIcon />}
        title={`No results for "${query}"`}
        description="Try different keywords or check your spelling"
        action={<button onClick={clearSearch}>Clear search</button>}
      />
    );
  }
  
  return <ResultsList results={results} />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `React.ReactNode` | required | Title text |
| `description` | `React.ReactNode` | - | Description text |
| `icon` | `React.ReactNode` | - | Icon or illustration |
| `action` | `React.ReactNode` | - | Action button(s) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `className` | `string` | - | Additional CSS class |

## Design Principles

This component follows "The Spexop Way":

- **Principle 3: Typography before decoration** - Clear hierarchy with bold titles
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - Clear, helpful messaging

## Accessibility

- Uses `role="status"` for screen readers
- `aria-live="polite"` for dynamic updates
- Semantic HTML structure
- High contrast text
- Clear, actionable messaging

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Alert - For important messages
- Skeleton - For loading placeholders
- Card - For content containers

