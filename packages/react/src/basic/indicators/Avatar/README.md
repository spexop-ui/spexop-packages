# Avatar

An accessible avatar component for displaying user profile images.

## Features

- Multiple size variants
- Circle or square shapes
- Image with fallback to initials
- Status indicators (online, offline, away, busy)
- Keyboard accessible (if clickable)
- Proper alt text for accessibility
- Automatic initials generation
- Custom fallback icon
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Avatar } from "@spexop/react";

function App() {
  return (
    <Avatar name="John Doe" src="/avatar.jpg" />
  );
}
```

## With Initials Fallback

```tsx
{/* Shows "JD" */}
<Avatar name="John Doe" />

{/* Shows "JS" */}
<Avatar name="Jane Smith" />
```

## Sizes

```tsx
{/* Extra Small */}
<Avatar name="John Doe" size="xs" />

{/* Small */}
<Avatar name="John Doe" size="sm" />

{/* Medium (default) */}
<Avatar name="John Doe" size="md" />

{/* Large */}
<Avatar name="John Doe" size="lg" />

{/* Extra Large */}
<Avatar name="John Doe" size="xl" />

{/* 2X Large */}
<Avatar name="John Doe" size="2xl" />
```

## Shapes

```tsx
{/* Circle (default) */}
<Avatar name="John Doe" shape="circle" />

{/* Square */}
<Avatar name="John Doe" shape="square" />
```

## With Status

```tsx
{/* Online */}
<Avatar name="John Doe" status="online" showStatus />

{/* Offline */}
<Avatar name="John Doe" status="offline" showStatus />

{/* Away */}
<Avatar name="John Doe" status="away" showStatus />

{/* Busy */}
<Avatar name="John Doe" status="busy" showStatus />
```

## Clickable

```tsx
<Avatar 
  name="John Doe" 
  src="/avatar.jpg"
  onClick={() => console.log('Avatar clicked')}
/>
```

## Custom Fallback

```tsx
<Avatar fallbackIcon={<CustomIcon />} />
```

## Avatar Group

```tsx
<div style={{ display: 'flex', marginLeft: '-8px' }}>
  <Avatar name="John Doe" src="/avatar1.jpg" />
  <Avatar name="Jane Smith" src="/avatar2.jpg" />
  <Avatar name="Bob Johnson" src="/avatar3.jpg" />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | User name (for initials and alt) |
| `src` | `string` | - | Image source |
| `alt` | `string` | name | Image alt text |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Size variant |
| `shape` | `"circle" \| "square"` | `"circle"` | Shape variant |
| `status` | `"online" \| "offline" \| "away" \| "busy"` | - | Status indicator |
| `showStatus` | `boolean` | `false` | Show status indicator |
| `fallbackIcon` | `React.ReactNode` | user icon | Fallback icon |
| `className` | `string` | - | Additional CSS class |
| `onClick` | `() => void` | - | Click handler |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Clear borders for definition
- **Principle 3: Typography before decoration** - Clear, readable initials
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - Proper alt text and ARIA labels

## Accessibility

- Proper `alt` text for images
- ARIA labels for screen readers
- Keyboard accessible when clickable
- Focus visible indicators
- High contrast colors for status indicators
- Semantic HTML

## Keyboard Navigation

- **Tab**: Focus on avatar (if clickable)
- **Enter/Space**: Activate avatar (if clickable)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Badge - For small status indicators
- Icon - For icon displays
- IconButton - For clickable icons
