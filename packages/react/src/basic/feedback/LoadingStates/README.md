# LoadingStates

Comprehensive loading state components for various use cases. Includes skeletons for pages, cards, and text, plus customizable loading overlays with multiple animation variants.

## Features

- Multiple skeleton components (Page, Card, Text)
- Customizable loading overlay with 4 animation variants
- Size variants (sm, md, lg, xl)
- Animation speed control (slow, normal, fast)
- Responsive and mobile-optimized
- Dark mode support
- Reduced motion support
- Full ARIA labels for accessibility
- Built with design tokens

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import {
  TextSkeleton,
  CardSkeleton,
  PageSkeleton,
  LoadingOverlay
} from '@spexop/react';
```

## Components

### TextSkeleton

Versatile text loading skeleton for inline and block text.

```tsx
// Single line
<TextSkeleton />

// Multiple lines
<TextSkeleton lines={4} />

// Custom width
<TextSkeleton width="200px" />

// Variants
<TextSkeleton variant="heading" />
<TextSkeleton variant="circle" />
<TextSkeleton variant="rectangle" />
```

### CardSkeleton

Loading skeleton for card components.

```tsx
// Basic card
<CardSkeleton />

// With all features
<CardSkeleton
  showImage
  showAvatar
  showFooter
  lines={3}
/>

// Compact card
<CardSkeleton
  showImage={false}
  lines={2}
  size="sm"
/>
```

### PageSkeleton

Full page loading skeleton with header, navigation, sections, and sidebar.

```tsx
// Basic page
<PageSkeleton sections={3} />

// Full layout
<PageSkeleton
  showHeader
  showNav
  showSidebar
  sections={4}
/>

// Content only
<PageSkeleton
  showHeader={false}
  sections={2}
/>
```

### LoadingOverlay

Full-screen or section loading overlay with multiple animation variants.

```tsx
// Basic overlay with spinner
<LoadingOverlay />

// With message
<LoadingOverlay message="Loading content..." />

// Different variants
<LoadingOverlay variant="dots" />
<LoadingOverlay variant="pulse" />
<LoadingOverlay variant="bars" />

// Custom backdrop
<LoadingOverlay
  backdropOpacity={0.5}
  showBackdrop
/>

// Custom content
<LoadingOverlay>
  <div>Custom loading content</div>
</LoadingOverlay>
```

## Props

### TextSkeleton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `number` | `1` | Number of lines to display |
| `width` | `string \| number` | `"100%"` | Width of skeleton |
| `height` | `string \| number` | - | Height of each line |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size variant |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animation speed |
| `variant` | `'text' \| 'heading' \| 'circle' \| 'rectangle'` | `'text'` | Style variant |
| `borderRadius` | `string \| number` | - | Custom border radius |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |

### CardSkeleton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showImage` | `boolean` | `true` | Show image skeleton |
| `showAvatar` | `boolean` | `false` | Show avatar skeleton |
| `lines` | `number` | `3` | Number of text lines |
| `showFooter` | `boolean` | `false` | Show footer skeleton |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size variant |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animation speed |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |

### PageSkeleton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHeader` | `boolean` | `true` | Show header skeleton |
| `showNav` | `boolean` | `false` | Show navigation skeleton |
| `sections` | `number` | `3` | Number of content sections |
| `showSidebar` | `boolean` | `false` | Show sidebar skeleton |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size variant |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animation speed |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |

### LoadingOverlay Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showBackdrop` | `boolean` | `true` | Show backdrop |
| `message` | `string` | - | Loading message |
| `variant` | `'spinner' \| 'dots' \| 'pulse' \| 'bars'` | `'spinner'` | Animation variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Size variant |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animation speed |
| `children` | `ReactNode` | - | Custom overlay content |
| `backdropOpacity` | `number` | `0.75` | Backdrop opacity |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |

## Examples

### Loading Page Content

```tsx
function MyPage() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <PageSkeleton showHeader showSidebar sections={3} />;
  }

  return <div>Page content</div>;
}
```

### Loading Card Grid

```tsx
function CardGrid() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="grid">
        <CardSkeleton showImage lines={3} />
        <CardSkeleton showImage lines={3} />
        <CardSkeleton showImage lines={3} />
      </div>
    );
  }

  return <div>Cards content</div>;
}
```

### Loading Overlay with Message

```tsx
function DataFetcher() {
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await fetch('/api/data');
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingOverlay message="Fetching data..." />}
      <button onClick={fetchData}>Load Data</button>
    </>
  );
}
```

### Text Loading States

```tsx
function Article() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <article>
        <TextSkeleton variant="heading" width="60%" />
        <TextSkeleton lines={8} />
      </article>
    );
  }

  return <article>Article content</article>;
}
```

## Size Variants

All components support size variants:

- `sm` - Small (12px height for text)
- `md` - Medium (16px height for text) - Default
- `lg` - Large (20px height for text)
- `xl` - Extra Large (24px height for text)

## Animation Speeds

Control animation speed:

- `slow` - 3 seconds per cycle
- `normal` - 2 seconds per cycle (default)
- `fast` - 1 second per cycle

## Design Principles

LoadingStates follows "The Spexop Way":

1. **Primitives before patterns** - Built with simple skeleton primitives
2. **Tokens before magic numbers** - Uses design tokens for all values
3. **Composition before complexity** - Composable loading states
4. **Accessibility before aesthetics** - Proper ARIA labels and reduced motion support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- All components have proper ARIA labels (`role="status"`, `aria-label`, `aria-live`)
- Respects `prefers-reduced-motion` setting
- Screen reader friendly
- High contrast mode support

## Related Components

- **Spinner** - Standalone spinner component
- **Skeleton** - Base skeleton component
- **Progress** - Progress bar component
- **EmptyState** - Empty state component

## Further Reading

- [Spinner Component](../Spinner/README.md)
- [Skeleton Component](../Skeleton/README.md)
- [Progress Component](../Progress/README.md)
- [Feedback Components Guide](../USAGE-GUIDE.md)

## License

MIT

## Author

Created by @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
