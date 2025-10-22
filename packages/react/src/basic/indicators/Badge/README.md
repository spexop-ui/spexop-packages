# Badge Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A versatile badge component for displaying small pieces of information like status indicators, counts, labels, and tags. Features multiple variants, sizes, and density options with full theme support.

## Features

- ✅ 6 visual variants (default, success, warning, error, info, subtle)
- ✅ 3 sizes (xs, sm, md)
- ✅ 3 density modes (compact, normal, spacious)
- ✅ Pill and square shapes
- ✅ WCAG AAA compliant colors (7:1+ contrast)
- ✅ Accessibility-first design
- ✅ Design token integration
- ✅ Theme-aware styling (light & dark mode)
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Badge } from '@spexop/react';

function App() {
  return (
    <>
      <Badge variant="success">Active</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info" size="xs">New</Badge>
    </>
  );
}
```

## Variants

### Status Variants

#### Success

Green badge for positive states and confirmations.

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="success">Completed</Badge>
```

#### Warning

Yellow badge for warnings and cautionary states.

```tsx
<Badge variant="warning">Pending</Badge>
<Badge variant="warning">Limited</Badge>
```

#### Error

Red badge for errors and destructive states.

```tsx
<Badge variant="error">Failed</Badge>
<Badge variant="error">Expired</Badge>
```

#### Info

Blue badge for informational states.

```tsx
<Badge variant="info">New</Badge>
<Badge variant="info">Beta</Badge>
```

### Visual Variants

#### Default

Neutral badge for general purpose use with high contrast.

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="default">v1.0</Badge>
```

**Colors:**

- Light mode: Light gray background with black text (12:1+ contrast)
- Dark mode: Semi-transparent white background with white text

#### Subtle

Minimal badge with subtle emphasis and high readability.

```tsx
<Badge variant="subtle">Draft</Badge>
<Badge variant="subtle">Internal</Badge>
```

**Colors:**

- Light mode: Medium gray background with black text (8:1+ contrast)
- Dark mode: Very subtle semi-transparent white background

## Sizes

### Extra Small (xs)

Compact badge for tight spaces.

```tsx
<Badge size="xs">12</Badge>
```

### Small (sm) - Default

Standard badge size for most use cases.

```tsx
<Badge size="sm">Badge</Badge>
```

### Medium (md)

Larger badge for emphasis.

```tsx
<Badge size="md">Featured</Badge>
```

## Density

Control padding and spacing for different contexts.

```tsx
<Badge density="compact">Compact</Badge>
<Badge density="normal">Normal</Badge>
<Badge density="spacious">Spacious</Badge>
```

## Shape

```tsx
{/* Pill shape (default) */}
<Badge pill={true}>Pill</Badge>

{/* Square corners */}
<Badge pill={false}>Square</Badge>
```

## Props

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "subtle";
  size?: "xs" | "sm" | "md";
  density?: "compact" | "normal" | "spacious";
  pill?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean 1-2px borders for definition
2. **Typography before decoration** - Semibold text (600) for clear hierarchy
3. **Tokens before magic numbers** - Uses design tokens for all values
4. **Accessibility before aesthetics** - WCAG AAA compliant (7:1+ contrast)

### Color Accessibility

All badge variants use high-contrast, accessible color combinations:

**Semantic Variants (Light Mode):**

- Success: Light green background (#dcfce7) + very dark green text (#14532d)
- Warning: Light yellow background (#fef3c7) + dark brown text (#713f12)
- Error: Light red background (#fee2e2) + very dark red text (#7f1d1d)
- Info: Light blue background (#dbeafe) + dark blue text (#1e3a8a)

**Neutral Variants:**

- Default: Neutral light gray + black text (truly neutral, no color bias)
- Subtle: Neutral medium gray + black text (minimal but clear)

All combinations exceed WCAG AAA standards (minimum 7:1 contrast ratio).

## Accessibility

- ✅ WCAG AAA compliant (7:1+ contrast for all variants)
- ✅ Uses semantic HTML (span element)
- ✅ Uppercase text with semibold weight for clarity
- ✅ Color is not the only indicator (text + color)
- ✅ Works perfectly with screen readers
- ✅ Respects reduced motion preferences
- ✅ Theme-aware (adapts to light/dark modes)

### Accessibility Improvements (v0.3.2)

Recent improvements ensure all badge variants meet the highest accessibility standards:

- **High Contrast Colors**: All text/background combinations exceed 7:1 contrast ratio
- **Truly Neutral Defaults**: Default and subtle variants use neutral grays without color bias
- **Semantic Clarity**: Each color variant has clear meaning (success=green, error=red, etc.)
- **No Color-on-Color**: Fixed previous issues where green was on green, red was on red

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Icon` - For icon-only indicators
- `KeyboardShortcut` - For keyboard shortcuts
- `Button` - For interactive elements

## License

MIT
