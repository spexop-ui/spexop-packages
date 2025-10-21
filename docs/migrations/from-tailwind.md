# Migrating from Tailwind CSS to Spexop Theme

This guide helps you migrate from Tailwind CSS configuration to the Spexop Theme System.

## Overview

Spexop Theme offers a structured, type-safe alternative to Tailwind's configuration while maintaining similar concepts. The main differences:

- **Structured tokens** vs utility-first classes
- **Token references** for better maintainability  
- **29+ export formats** including Tailwind
- **Built-in accessibility** features

## Quick Start

### 1. Install Spexop Theme

```bash
npm install @spexop/theme
# or
pnpm add @spexop/theme
```

### 2. Convert Your Tailwind Config

**Tailwind (`tailwind.config.js`):**

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
        },
        surface: '#ffffff',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
      },
      fontSize: {
        sm: '14px',
        base: '16px',
        lg: '18px',
      },
    },
  },
};
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
    primaryHover: "#2563eb",
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
  spacing: {
    baseUnit: 4,
    values: {
      1: 4,
      2: 8,
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    baseSize: 16,
    scale: 1.125, // Minor third
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

### 3. Generate Tailwind Config from Spexop Theme

```typescript
import { generateTailwind } from '@spexop/theme';
import { theme } from './theme.config';

const tailwindConfig = generateTailwind(theme);
// Save to tailwind.config.js or use programmatically
```

## Migration Mapping

### Colors

| Tailwind | Spexop Theme |
|----------|-------------|
| `colors.primary.DEFAULT` | `colors.primary` |
| `colors.primary['500']` | `colors.primary` |
| `colors.gray['100']` | `colors.surfaceSecondary` |
| `colors.gray['900']` | `colors.text` |

**Example:**

```javascript
// Tailwind
colors: {
  blue: {
    500: '#3b82f6',
    600: '#2563eb',
  },
}

// Spexop
colors: {
  primary: "#3b82f6",
  primaryHover: "#2563eb",
}
```

### Spacing

| Tailwind | Spexop Theme |
|----------|-------------|
| `spacing['4']` | `spacing.values[4]` or auto-generated |
| `space-x-4` utility | Use `--theme-spacing-4` CSS variable |

**Example:**

```javascript
// Tailwind
spacing: {
  px: '1px',
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
}

// Spexop (auto-generates from baseUnit)
spacing: {
  baseUnit: 4,
  // Automatically generates 0, 4, 8, 12, 16, etc.
}
```

### Typography

| Tailwind | Spexop Theme |
|----------|-------------|
| `fontSize.base` | `typography.baseSize` |
| `fontFamily.sans` | `typography.fontFamily` |
| `fontWeight.semibold` | `typography.weights.semibold` |

**Example:**

```javascript
// Tailwind
fontSize: {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
}

// Spexop (auto-generates from scale)
typography: {
  baseSize: 16,
  scale: 1.25, // Creates sm, base, lg automatically
}
```

### Borders & Radius

| Tailwind | Spexop Theme |
|----------|-------------|
| `borderRadius.md` | `borders.radiusRelaxed` |
| `borderWidth.DEFAULT` | `borders.default` |

**Example:**

```javascript
// Tailwind
borderRadius: {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
}

// Spexop
borders: {
  radiusSubtle: 8,
  radiusRelaxed: 12,
  radiusPill: 9999,
}
```

## Usage Patterns

### CSS Variables Approach

After migration, use CSS variables in your components:

```css
/* Tailwind approach */
.button {
  @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md;
}

/* Spexop approach */
.button {
  background: var(--theme-primary);
  color: var(--theme-surface);
  padding: var(--theme-spacing-2) var(--theme-spacing-4);
  border-radius: var(--theme-radius-relaxed);
}

.button:hover {
  background: var(--theme-primary-hover);
}
```

### React Components

```tsx
// Tailwind
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2">
  Click me
</button>

// Spexop with ThemeProvider
import { Button } from '@spexop/react';
import { ThemeProvider } from '@spexop/react';
import { theme } from './theme.config';

<ThemeProvider theme={theme}>
  <Button variant="primary">Click me</Button>
</ThemeProvider>
```

## Advanced Features

### Token References

Unlike Tailwind, Spexop supports token references:

```typescript
const theme: SpexopThemeConfig = {
  colors: {
    primary: "#3b82f6",
  },
  buttons: {
    primary: {
      background: "colors.primary", // References colors.primary
      text: "#ffffff",
    },
  },
};
```

When you change `colors.primary`, buttons automatically update!

### Dark Mode

```typescript
const theme: SpexopThemeConfig = {
  // ... light mode colors ...
  darkMode: {
    enabled: true,
    colors: {
      surface: "#1f2937",
      text: "#f9fafb",
    },
  },
};
```

### Multiple Export Formats

```typescript
import { generateTailwind, generateCSS, generateSCSS } from '@spexop/theme';

// Generate Tailwind config
const tailwind = generateTailwind(theme);

// Or CSS variables
const css = generateCSS(theme);

// Or SCSS variables
const scss = generateSCSS(theme);
```

## Migration Checklist

- [ ] Install `@spexop/theme`
- [ ] Create Spexop theme configuration
- [ ] Map Tailwind colors to Spexop colors
- [ ] Convert spacing scale
- [ ] Convert typography settings
- [ ] Update component styles to use CSS variables
- [ ] Test dark mode (if applicable)
- [ ] Generate CSS or continue using Tailwind

## Common Pitfalls

### 1. Utility Classes vs CSS Variables

**Issue:** Expecting utility classes like Tailwind

**Solution:** Use CSS variables or generate Tailwind config from Spexop theme

### 2. Spacing Scale Differences

**Issue:** Tailwind uses `0.25rem` increments, Spexop uses pixel-based

**Solution:** Adjust `baseUnit` to match (e.g., `baseUnit: 4` ≈ `0.25rem`)

### 3. Color Naming

**Issue:** Tailwind uses numbered scales (100-900)

**Solution:** Map to Spexop's semantic names (primary, secondary, surface, etc.)

## Resources

- [Spexop Theme Documentation](https://spexop.com/docs/theme)
- [Tailwind Generator API](https://spexop.com/docs/generators/tailwind)
- [Migration Tool](https://builder.spexop.com/migrate/tailwind) (coming soon)

## Support

Need help? Open an issue on [GitHub](https://github.com/spexop-ui/spexop-packages/issues)
