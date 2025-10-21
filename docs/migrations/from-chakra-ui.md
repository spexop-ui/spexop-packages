# Migrating from Chakra UI to Spexop Theme

This guide helps you migrate from Chakra UI theme system to Spexop Theme.

## Overview

Both systems share similar philosophies but with different strengths:

| Feature | Chakra UI | Spexop Theme |
|---------|-----------|--------------|
| Framework | React-only | Framework-agnostic |
| Export Formats | 1 (JS object) | 29+ formats |
| Token System | Yes | Yes (with references) |
| Components | 50+ | 60+ via @spexop/react |
| Bundle Size | ~140KB | ~45KB |

## Quick Start

### 1. Install Spexop

```bash
npm install @spexop/theme @spexop/react
```

### 2. Convert Chakra Theme

**Chakra UI (`theme.ts`):**

```typescript
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f2ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
  },
  space: {
    1: '0.25rem',
    2: '0.5rem',
    4: '1rem',
  },
});
```

**Spexop Theme (`theme.config.ts`):**

```typescript
import type { SpexopThemeConfig } from '@spexop/theme';

export const theme: SpexopThemeConfig = {
  meta: {
    name: "My Theme",
    version: "1.0.0",
  },
  colors: {
    primary: "#3b82f6",
    primaryLight: "#e6f2ff",
    primaryDark: "#1e3a8a",
    surface: "#ffffff",
    surfaceSecondary: "#f3f4f6",
    surfaceHover: "#e5e7eb",
    text: "#111827",
    textSecondary: "#6b7280",
    textMuted: "#9ca3af",
    border: "#d1d5db",
    borderStrong: "#9ca3af",
    borderSubtle: "#e5e7eb",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontFamilyHeading: "Inter, sans-serif",
    baseSize: 16,
    scale: 1.125,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    baseUnit: 4, // 0.25rem base
    values: {
      1: 4,   // 0.25rem
      2: 8,   // 0.5rem
      4: 16,  // 1rem
    },
  },
  borders: {
    thin: 1,
    default: 2,
    thick: 3,
    radiusSubtle: 8,
    radiusRelaxed: 12,
    radiusPill: 9999,
    defaultStyle: "solid",
  },
};
```

## Migration Mapping

### Colors

| Chakra UI | Spexop |
|-----------|--------|
| `brand.500` | `colors.primary` |
| `brand.50` | `colors.primaryLight` |
| `brand.900` | `colors.primaryDark` |
| `gray.50` | `colors.surface` |
| `gray.100` | `colors.surfaceSecondary` |
| `gray.900` | `colors.text` |
| `gray.600` | `colors.textSecondary` |

### Typography

| Chakra UI | Spexop |
|-----------|--------|
| `fonts.heading` | `typography.fontFamilyHeading` |
| `fonts.body` | `typography.fontFamily` |
| `fontSizes.md` | `typography.baseSize` |
| `fontWeights.semibold` | `typography.weights.semibold` |

### Spacing

| Chakra UI | Spexop |
|-----------|--------|
| `space[4]` | `spacing.values[4]` |
| `spacing={4}` | `var(--theme-spacing-4)` |

## Component Migration

### Chakra Approach

```tsx
import { Button, Box } from '@chakra-ui/react';

<Box bg="brand.500" p={4}>
  <Button colorScheme="brand">
    Click me
  </Button>
</Box>
```

### Spexop Approach

```tsx
import { Button, Stack } from '@spexop/react';
import { ThemeProvider } from '@spexop/react';
import { theme } from './theme.config';

<ThemeProvider theme={theme}>
  <Stack style={{ background: 'var(--theme-primary)', padding: 'var(--theme-spacing-4)' }}>
    <Button variant="primary">
      Click me
    </Button>
  </Stack>
</ThemeProvider>
```

## Benefits of Migrating

### 1. Smaller Bundle

```bash
Chakra UI: ~140KB minified
Spexop: ~45KB minified

Savings: ~95KB (68% reduction)
```

### 2. Framework Flexibility

```typescript
// Use same theme in any framework
import { generateVue, generateSvelte, generateAngular } from '@spexop/theme';
```

### 3. Token References

```typescript
buttons: {
  primary: {
    background: "colors.primary", // Auto-syncs with colors
  },
}
```

### 4. Export Formats

```typescript
// Export to 29+ formats
import { generateTailwind, generateFigma, generateSCSS } from '@spexop/theme';
```

## Migration Strategy

### Phase 1: Setup

Install Spexop alongside Chakra:

```bash
npm install @spexop/theme @spexop/react
```

### Phase 2: Theme Conversion

Convert your Chakra theme to Spexop:

```typescript
// Chakra colors.brand.500 → Spexop colors.primary
// Chakra space[4] → Spexop spacing.values[4]
```

### Phase 3: Component Migration

Replace components gradually:

```tsx
// Chakra
import { Button } from '@chakra-ui/react';
<Button colorScheme="brand">Click</Button>

// Spexop
import { Button } from '@spexop/react';
<Button variant="primary">Click</Button>
```

### Phase 4: Cleanup

Remove Chakra after migration:

```bash
npm uninstall @chakra-ui/react @chakra-ui/system @emotion/react @emotion/styled
```

## Common Patterns

### Responsive Values

**Chakra:**

```tsx
<Box fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
```

**Spexop:**

```css
.box {
  font-size: var(--theme-font-size-sm);
}

@media (min-width: 768px) {
  .box { font-size: var(--theme-font-size-base); }
}

@media (min-width: 1024px) {
  .box { font-size: var(--theme-font-size-lg); }
}
```

### Color Mode

**Chakra:**

```tsx
<Box bg={useColorModeValue('white', 'gray.800')}>
```

**Spexop:**

```tsx
// Automatically handles dark mode via theme
<Stack style={{ background: 'var(--theme-surface)' }}>
```

### Component Styles

**Chakra:**

```typescript
const Button = {
  baseStyle: {
    fontWeight: 'semibold',
  },
  variants: {
    solid: {
      bg: 'brand.500',
    },
  },
};
```

**Spexop:**

```typescript
const theme: SpexopThemeConfig = {
  buttons: {
    primary: {
      background: "colors.primary",
      text: "#ffffff",
    },
  },
};
```

## Migration Checklist

- [ ] Install Spexop packages
- [ ] Convert Chakra theme to Spexop
- [ ] Map color scales to Spexop colors
- [ ] Convert spacing values (Chakra rem → Spexop px)
- [ ] Update font settings
- [ ] Test both systems in parallel
- [ ] Migrate components gradually
- [ ] Update useColorMode hooks
- [ ] Test dark mode
- [ ] Remove Chakra dependencies

## Resources

- [Spexop Documentation](https://spexop.com/docs)
- [Component Library](@spexop/react)
- [Chakra to Spexop Converter](https://builder.spexop.com/migrate/chakra) (coming soon)

## Support

Need help? [Open an issue](https://github.com/spexop-ui/spexop-packages/issues)
