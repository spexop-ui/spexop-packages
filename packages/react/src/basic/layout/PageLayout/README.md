# PageLayout

Page-level layout container with responsive padding and centered content. Built on the Container primitive with page-optimized defaults (1600px max-width, responsive padding scaling).

## Features

- 1600px default max-width optimized for page layouts
- Responsive padding: 24px (mobile) → 40px (tablet) → 64px (desktop)
- Accepts both semantic string variants and numeric padding values
- Built on Container primitive for consistency
- Centered layout by default
- Polymorphic component (renders as any HTML element)
- Fully typed with TypeScript
- Follows "The Spexop Way" design principles

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { PageLayout } from '@spexop/react';
```

## Basic Usage

### Default Usage

```tsx
<PageLayout>
  <h1>Welcome to My Page</h1>
  <p>This content is centered with 1600px max-width and responsive padding.</p>
</PageLayout>
```

### Semantic Padding (Recommended)

```tsx
<PageLayout padding="lg">
  <h1>Page Title</h1>
  <p>Uses semantic padding variant that scales responsively.</p>
</PageLayout>
```

### Numeric Padding (Precise Control)

```tsx
<PageLayout padding={8}>
  <h1>Page Title</h1>
  <p>Uses exact numeric spacing scale value.</p>
</PageLayout>
```

### Custom Max-Width

```tsx
<PageLayout maxWidth="xl">
  <h1>Narrower Page</h1>
  <p>Content constrained to 1536px instead of 1600px.</p>
</PageLayout>
```

### As Main Element

```tsx
<PageLayout as="main">
  <h1>Main Content</h1>
  <p>Renders as semantic main element.</p>
</PageLayout>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Page content |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'page' \| 'full'` | `'page'` | Maximum width of container |
| `padding` | `SpacingScale \| SpacingVariant \| ResponsiveProp` | `'lg'` | Padding around content |
| `centered` | `boolean` | `true` | Center container horizontally |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |
| `as` | `ElementType` | `'div'` | HTML element type |

### MaxWidth Options

| Value | Width | Use Case |
|-------|-------|----------|
| `'sm'` | 640px | Narrow content |
| `'md'` | 768px | Medium content |
| `'lg'` | 1024px | Standard content |
| `'xl'` | 1536px | Wide content |
| `'2xl'` | 1920px | Extra wide |
| `'page'` | 1600px | Page layouts (default) |
| `'full'` | 100% | Full width |

### Padding Options

#### String Variants (Semantic)

| Value | Maps To | Size | Responsive Behavior |
|-------|---------|------|-------------------|
| `'none'` | 0 | 0px | No padding |
| `'sm'` | 4 | 16px | Static |
| `'md'` | 6 | 24px | Static |
| `'lg'` | 8 | 40px base | 24px → 40px → 64px |
| `'xl'` | 10 | 64px | Static |

#### Numeric Values (Precise)

Use SpacingScale values (0-10) that map to design tokens:

- `0` = 0px
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `5` = 20px
- `6` = 24px
- `7` = 32px
- `8` = 40px
- `9` = 48px
- `10` = 64px

#### Responsive Objects

```typescript
padding={{ xs: 4, md: 6, xl: 10 }}
```

## Examples

### Full Page Layout

```tsx
<PageLayout as="main" padding="lg">
  <header>
    <h1>Page Title</h1>
  </header>
  <article>
    <p>Main content...</p>
  </article>
  <footer>
    <p>Footer content</p>
  </footer>
</PageLayout>
```

### Narrow Content Page

```tsx
<PageLayout maxWidth="md" padding="md">
  <h1>Blog Post</h1>
  <p>Narrower content for better readability.</p>
</PageLayout>
```

### No Padding

```tsx
<PageLayout padding="none">
  <div>Full-bleed content</div>
</PageLayout>
```

### Custom Responsive Padding

```tsx
<PageLayout padding={{ xs: 4, sm: 6, md: 8, lg: 10 }}>
  <h1>Custom Responsive Padding</h1>
</PageLayout>
```

## Design Principles

PageLayout follows "The Spexop Way":

1. **Primitives before patterns** - Built on Container primitive
2. **Tokens before magic numbers** - Uses design tokens (SpacingScale)
3. **Composition before complexity** - Simple wrapper with smart defaults
4. **Standards before frameworks** - Standard HTML elements
5. **Accessibility before aesthetics** - Semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Uses semantic HTML elements when specified (main, article, section)
- No accessibility barriers introduced
- Works with screen readers
- Keyboard navigation compatible
- Respects user's reduced motion preferences

## Related Components

- **Container** - Base primitive for max-width constraints
- **Section** - Floating card-style sections
- **Hero** - Hero sections with media
- **Footer** - Page footer component

## Further Reading

- [Container Component](../../primitives/Container/README.md)
- [USAGE-GUIDE](./USAGE-GUIDE.md)
- [Spexop Design System Documentation](https://github.com/spexop-ui)

## License

MIT

## Author

Created by @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
