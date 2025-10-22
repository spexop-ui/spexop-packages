# Skeleton

An accessible skeleton loader component for content placeholders during loading.

## Features

- Multiple shape variants (text, circular, rectangular)
- Customizable width and height
- Smooth pulse animation
- Reduced motion support
- Screen reader accessible
- Lightweight and performant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Skeleton } from "@spexop/react";

function App() {
  return <Skeleton />;
}
```

## Variants

```tsx
{/* Text (default) */}
<Skeleton variant="text" />

{/* Circular (for avatars) */}
<Skeleton variant="circular" width={48} height={48} />

{/* Rectangular (for images/cards) */}
<Skeleton variant="rectangular" width="100%" height={200} />
```

## Custom Dimensions

```tsx
{/* Pixel values */}
<Skeleton width={300} height={20} />

{/* CSS values */}
<Skeleton width="100%" height="2rem" />
<Skeleton width="50vw" height="200px" />
```

## Without Animation

```tsx
<Skeleton animate={false} />
```

## Loading Card Example

```tsx
function LoadingCard() {
  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd' }}>
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="text" width="80%" style={{ marginTop: '1rem' }} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </div>
  );
}
```

## Profile Loading Example

```tsx
function LoadingProfile() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Skeleton variant="circular" width={48} height={48} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  );
}
```

## Conditional Loading

```tsx
function UserProfile({ userId }) {
  const { data, loading } = useUser(userId);

  if (loading) {
    return (
      <div>
        <Skeleton variant="circular" width={64} height={64} />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="70%" />
      </div>
    );
  }

  return <Profile user={data} />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string \| number` | - | Width (px or CSS value) |
| `height` | `string \| number` | - | Height (px or CSS value) |
| `variant` | `"text" \| "circular" \| "rectangular"` | `"text"` | Shape variant |
| `animate` | `boolean` | `true` | Whether to animate |
| `className` | `string` | - | Additional CSS class |

## Design Principles

This component follows "The Spexop Way":

- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - Proper ARIA for loading states

## Accessibility

- Uses `role="status"` for assistive technologies
- Includes `aria-label` for screen reader announcement
- `aria-live="polite"` for non-intrusive updates
- `aria-busy="true"` to indicate loading state
- Hidden text fallback for screen readers
- Respects `prefers-reduced-motion` preference

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Spinner - For indeterminate loading indicators
- Progress - For determinate loading states
- EmptyState - For empty content states

