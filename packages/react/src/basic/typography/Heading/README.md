# Heading Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A semantic heading component (h1-h6) with typography hierarchy, weight control, alignment options, and full accessibility support. Follows "The Spexop Way" principle of typography before decoration.

## Features

- 6 semantic levels (h1-h6)
- 3 weight variants (regular, semibold, bold)
- 3 alignment options (left, center, right)
- 8 size overrides (xs through 4xl)
- 5 semantic variants (default, secondary, success, error, warning)
- Polymorphic rendering (as prop)
- Text truncation and line clamping
- Enhanced accessibility (ARIA live, expanded, controls)
- Responsive font sizing
- Proper heading hierarchy
- WCAG AA+ accessible
- TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Heading } from '@spexop/react';

function App() {
  return (
    <Heading level={1} weight="bold">
      Page Title
    </Heading>
  );
}
```

## Semantic Levels

### Level 1 (h1) - Page Title

```tsx
<Heading level={1} weight="bold">
  Welcome to Spexop
</Heading>
```

### Level 2 (h2) - Section Heading

```tsx
<Heading level={2} weight="bold">
  Features
</Heading>
```

### Level 3 (h3) - Subsection Heading

```tsx
<Heading level={3} weight="semibold">
  Responsive Design
</Heading>
```

### Levels 4-6 - Minor Headings

```tsx
<Heading level={4} weight="semibold">
  Getting Started
</Heading>

<Heading level={5} weight="semibold">
  Installation
</Heading>

<Heading level={6} weight="semibold">
  Requirements
</Heading>
```

## Typography Weights

### Bold (Default for h1-h3)

Strong emphasis for main headings.

```tsx
<Heading level={2} weight="bold">
  Strong Heading
</Heading>
```

### Semibold (Default for h4-h6)

Medium emphasis for subheadings.

```tsx
<Heading level={4} weight="semibold">
  Medium Heading
</Heading>
```

### Regular

Light emphasis when needed.

```tsx
<Heading level={3} weight="regular">
  Light Heading
</Heading>
```

## Alignment

### Left (Default)

```tsx
<Heading level={2} align="left">
  Left Aligned
</Heading>
```

### Center

```tsx
<Heading level={1} align="center">
  Centered Title
</Heading>
```

### Right

```tsx
<Heading level={2} align="right">
  Right Aligned
</Heading>
```

## Semantic Variants

### Default (Default)

```tsx
<Heading level={2} variant="default">
  Default Heading
</Heading>
```

### Secondary

```tsx
<Heading level={2} variant="secondary">
  Muted Heading
</Heading>
```

### Success

```tsx
<Heading level={2} variant="success">
  Success Message
</Heading>
```

### Error

```tsx
<Heading level={2} variant="error">
  Error Message
</Heading>
```

### Warning

```tsx
<Heading level={2} variant="warning">
  Warning Message
</Heading>
```

## Size Overrides

Override default size for a level:

```tsx
// h2 with h4 size
<Heading level={2} size="xl">
  Smaller H2
</Heading>

// h4 with h2 size
<Heading level={4} size="3xl">
  Larger H4
</Heading>
```

## Polymorphic Rendering

Render as different elements:

```tsx
// Render as div
<Heading level={2} as="div">
  Div Heading
</Heading>

// Render as span
<Heading level={3} as="span">
  Span Heading
</Heading>
```

## Text Utilities

### Truncation

```tsx
<Heading level={2} truncate>
  This long heading will be truncated with ellipsis
</Heading>
```

### Line Clamping

```tsx
<Heading level={2} clamp={2}>
  This heading will be clamped to 2 lines with ellipsis
</Heading>
```

## Spacing

### With Margin (Default)

```tsx
<Heading level={2}>
  Heading with bottom margin
</Heading>
```

### Without Margin

```tsx
<Heading level={2} noMargin>
  Heading without margin
</Heading>
```

## Advanced Usage

### With ID for Anchor Links

```tsx
<Heading level={2} id="features">
  Features
</Heading>

<a href="#features">Jump to Features</a>
```

### With Custom Styling

```tsx
<Heading 
  level={1} 
  weight="bold" 
  align="center"
  className="hero-title"
>
  Custom Styled Title
</Heading>
```

### Responsive Heading

```tsx
<Heading 
  level={1} 
  weight="bold" 
  align="center"
>
  Responsive Title
</Heading>
// Automatically reduces size on mobile
```

## Common Patterns

### Hero Section

```tsx
import { Stack, Heading, Text } from '@spexop/react';

function Hero() {
  return (
    <Stack direction="vertical" gap="md" align="center">
      <Heading level={1} weight="bold" align="center">
        Build Beautiful Interfaces
      </Heading>
      <Text size="lg" align="center" weight="regular">
        Modern design system for React applications
      </Text>
    </Stack>
  );
}
```

### Article Heading

```tsx
import { Stack, Heading, Text } from '@spexop/react';

function ArticleHeader() {
  return (
    <Stack direction="vertical" gap="sm">
      <Heading level={1} weight="bold">
        Getting Started with Design Systems
      </Heading>
      <Text size="sm" variant="secondary">
        Published on October 21, 2025 · 5 min read
      </Text>
    </Stack>
  );
}
```

### Feature Card

```tsx
import { Stack, Heading, Text, Icon } from '@spexop/react';

function FeatureCard() {
  return (
    <Stack direction="vertical" gap="sm">
      <Icon name="Layout" size="lg" />
      <Heading level={3} weight="semibold">
        Responsive Design
      </Heading>
      <Text weight="regular">
        Built-in responsive breakpoints that adapt to any screen size
      </Text>
    </Stack>
  );
}
```

## Design Principles

### Typography before decoration

Heading uses font-weight (regular/semibold/bold) to create hierarchy instead of relying on color or decoration.

### Tokens before magic numbers

All font sizes, weights, and spacing use design tokens from @spexop/theme:

- Font sizes: `--theme-font-size-*`
- Font weights: `--theme-font-weight-*`
- Spacing: `--theme-spacing-*`

### Standards before frameworks

Uses semantic HTML headings (h1-h6) for proper document outline and accessibility.

## Accessibility

### Semantic HTML

Uses proper HTML heading elements (h1-h6) for document structure.

### Heading Hierarchy

Always maintain proper heading hierarchy:

```tsx
// ✅ Correct hierarchy
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section</Heading>
<Heading level={3}>Subsection</Heading>

// ❌ Skipping levels
<Heading level={1}>Page Title</Heading>
<Heading level={3}>Subsection</Heading> {/* Skipped h2! */}
```

### Screen Readers

Heading levels help screen reader users navigate content:

```tsx
<Heading level={2} aria-label="Features section">
  Features
</Heading>
```

### Enhanced Accessibility

```tsx
<Heading 
  level={2} 
  aria-live="polite"
  aria-expanded={true}
  aria-controls="content"
>
  Dynamic Heading
</Heading>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Heading content |
| `level` | `1-6` | `2` | Semantic heading level |
| `weight` | `HeadingWeight` | `"bold"` | Font weight |
| `align` | `HeadingAlign` | `"left"` | Text alignment |
| `size` | `HeadingSize` | - | Size override |
| `variant` | `HeadingVariant` | `"default"` | Semantic color variant |
| `as` | `keyof JSX.IntrinsicElements` | - | Render as different element |
| `noMargin` | `boolean` | `false` | Remove bottom margin |
| `truncate` | `boolean` | `false` | Truncate text with ellipsis |
| `clamp` | `number` | - | Number of lines to clamp |
| `disabled` | `boolean` | `false` | Disable the component |
| `className` | `string` | - | Additional CSS class |
| `id` | `string` | - | Element ID for anchors |
| `aria-label` | `string` | - | ARIA label |
| `aria-describedby` | `string` | - | ARIA description |
| `aria-live` | `"polite" \| "assertive" \| "off"` | - | ARIA live region |
| `aria-expanded` | `boolean` | - | ARIA expanded state |
| `aria-controls` | `string` | - | ARIA controls |

### Default Sizes by Level

- `level={1}` → `4xl` (36px)
- `level={2}` → `3xl` (30px)
- `level={3}` → `2xl` (24px)
- `level={4}` → `xl` (20px)
- `level={5}` → `lg` (18px)
- `level={6}` → `base` (16px)

### Weights

- `regular` → 400
- `semibold` → 600
- `bold` → 700

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

## Related Components

- Text - For paragraph and body text
- Link - For navigation links
- Badge - For status indicators

## Best Practices

### Do's

- Maintain proper heading hierarchy (don't skip levels)
- Use `weight="bold"` for h1-h2
- Use `weight="semibold"` for h3-h6
- Use semantic levels based on content structure
- Add `id` for anchor links

### Don'ts

- Don't skip heading levels
- Don't use heading levels for styling only
- Don't use multiple h1s per page
- Don't forget heading hierarchy in nested sections

## License

MIT © Spexop Team
