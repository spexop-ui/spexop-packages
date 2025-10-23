# Text Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A versatile text component for paragraphs and body text with size, weight, alignment, and semantic variant control. Features typography-driven hierarchy following Spexop design principles.

## Features

- 8 size variants (xs through 4xl)
- 4 weight variants (regular, medium, semibold, bold)
- 4 alignment options (left, center, right, justify)
- 6 semantic variants (default, secondary, success, error, warning, info)
- Text truncation and line clamping (1-5 lines)
- Text decoration (none, underline, line-through)
- Text transform (none, uppercase, lowercase, capitalize)
- Text overflow control (clip, ellipsis)
- White space handling (normal, nowrap, pre, pre-line, pre-wrap)
- Custom line height, letter spacing, and word spacing
- Polymorphic rendering (p, span, div, label, strong, em, small, mark)
- Enhanced accessibility with ARIA support
- Forward ref support
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
import { Text } from '@spexop/react';

function App() {
  return (
    <Text size="base" weight="regular">
      Body text content goes here.
    </Text>
  );
}
```

## Sizes

```tsx
<Text size="xs">Extra small text (12px)</Text>
<Text size="sm">Small text (14px)</Text>
<Text size="base">Base text (16px)</Text>
<Text size="lg">Large text (18px)</Text>
<Text size="xl">Extra large (20px)</Text>
<Text size="2xl">2X large (24px)</Text>
<Text size="3xl">3X large (30px)</Text>
<Text size="4xl">4X large (36px)</Text>
```

## Weights

```tsx
<Text weight="regular">Regular weight (400)</Text>
<Text weight="medium">Medium weight (500)</Text>
<Text weight="semibold">Semibold weight (600)</Text>
<Text weight="bold">Bold weight (700)</Text>
```

## Alignment

```tsx
<Text align="left">Left aligned text</Text>
<Text align="center">Center aligned text</Text>
<Text align="right">Right aligned text</Text>
<Text align="justify">Justified text</Text>
```

## Variants

```tsx
<Text variant="default">Default text color</Text>
<Text variant="secondary">Secondary muted text</Text>
<Text variant="success">Success message</Text>
<Text variant="error">Error message</Text>
<Text variant="warning">Warning message</Text>
<Text variant="info">Info message</Text>
```

## Text Utilities

### Truncation

```tsx
<Text truncate>
  This text will be truncated with ellipsis if it overflows
</Text>
```

### Line Clamping

```tsx
<Text clamp={2}>
  This text will be clamped to 2 lines with ellipsis
</Text>

<Text clamp={3}>
  This text will be clamped to 3 lines with ellipsis
</Text>
```

### Text Decoration

```tsx
<Text decoration="underline">Underlined text</Text>
<Text decoration="line-through">Strikethrough text</Text>
<Text decoration="none">No decoration</Text>
```

### Text Transform

```tsx
<Text transform="uppercase">UPPERCASE TEXT</Text>
<Text transform="lowercase">lowercase text</Text>
<Text transform="capitalize">Capitalized Text</Text>
<Text transform="none">Normal text</Text>
```

### Text Overflow

```tsx
<Text overflow="ellipsis">Text with ellipsis overflow</Text>
<Text overflow="clip">Text with clip overflow</Text>
```

### White Space

```tsx
<Text whiteSpace="nowrap">No wrap text</Text>
<Text whiteSpace="pre">Pre-formatted text</Text>
<Text whiteSpace="pre-line">Pre-line text</Text>
<Text whiteSpace="pre-wrap">Pre-wrap text</Text>
```

### Custom Spacing

```tsx
<Text lineHeight={1.8} letterSpacing={2} wordSpacing={4}>
  Custom spaced text
</Text>
```

## Semantic Elements

```tsx
<Text as="strong">Strong emphasis</Text>
<Text as="em">Emphasis</Text>
<Text as="small">Small text</Text>
<Text as="mark">Highlighted text</Text>
<Text as="span">Inline text</Text>
<Text as="div">Block text</Text>
<Text as="label">Form label</Text>
```

## Accessibility

```tsx
<Text
  aria-label="Descriptive label"
  aria-live="polite"
  aria-describedby="description"
  role="status"
  tabIndex={0}
>
  Accessible text
</Text>
```

## Advanced Usage

### Ref Forwarding

```tsx
const textRef = useRef<HTMLParagraphElement>(null);

<Text ref={textRef}>Text with ref</Text>
```

### Custom Styling

```tsx
<Text
  style={{ color: 'red', backgroundColor: 'yellow' }}
  className="custom-class"
>
  Custom styled text
</Text>
```

### Complex Combinations

```tsx
<Text
  size="lg"
  weight="bold"
  align="center"
  variant="success"
  decoration="underline"
  transform="uppercase"
  whiteSpace="nowrap"
  truncate
  aria-label="Success message"
>
  SUCCESS MESSAGE
</Text>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Text content |
| `size` | `TextSize` | `"base"` | Font size variant |
| `weight` | `TextWeight` | `"regular"` | Font weight variant |
| `align` | `TextAlign` | `"left"` | Text alignment |
| `variant` | `TextVariant` | `"default"` | Semantic color variant |
| `as` | `ElementType` | `"p"` | HTML element to render |
| `noMargin` | `boolean` | `false` | Remove default margin |
| `truncate` | `boolean` | `false` | Truncate with ellipsis |
| `clamp` | `1 \| 2 \| 3 \| 4 \| 5` | - | Number of lines to clamp |
| `decoration` | `TextDecoration` | `"none"` | Text decoration |
| `transform` | `TextTransform` | `"none"` | Text transform |
| `overflow` | `TextOverflow` | `"clip"` | Text overflow behavior |
| `whiteSpace` | `WhiteSpace` | `"normal"` | White space handling |
| `lineHeight` | `number` | - | Custom line height |
| `letterSpacing` | `number` | - | Letter spacing in pixels |
| `wordSpacing` | `number` | - | Word spacing in pixels |
| `className` | `string` | - | Additional CSS class |
| `style` | `CSSProperties` | - | Inline styles |
| `id` | `string` | - | Element ID |

### Accessibility Props

| Prop | Type | Description |
|------|------|-------------|
| `aria-label` | `string` | ARIA label |
| `aria-live` | `"polite" \| "assertive" \| "off"` | ARIA live region |
| `aria-describedby` | `string` | ARIA described by |
| `aria-atomic` | `boolean` | ARIA atomic |
| `aria-relevant` | `string` | ARIA relevant |
| `role` | `string` | ARIA role |
| `tabIndex` | `number` | Tab index |

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Migration Guide

### From v0.1.0 to v0.2.0

- Added `medium` weight option
- Added `info` variant
- Added new text utility props (`decoration`, `transform`, `overflow`, `whiteSpace`)
- Added custom spacing props (`lineHeight`, `letterSpacing`, `wordSpacing`)
- Added new semantic elements (`strong`, `em`, `small`, `mark`)
- Enhanced accessibility with additional ARIA props
- Added forward ref support

## Performance

The Text component is optimized for performance with:

- Memoized className computation
- Memoized inline styles
- Forward ref support for direct DOM access
- Minimal re-renders with proper dependency arrays

## Design Principles

Following "The Spexop Way":

- **Typography before decoration**: Uses font weight for hierarchy, not lighter colors
- **Tokens before magic numbers**: All values use design tokens from @spexop/theme
- **Accessibility before aesthetics**: WCAG AA+ compliance by default
- **Composition before complexity**: Build up from simple text primitives
