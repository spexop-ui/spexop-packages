# Migrating from Material-UI to Spexop Theme

This guide helps you migrate from Material-UI (MUI) theme system to Spexop Theme.

## Overview

Both systems provide comprehensive theming, but with key differences:

| Feature | Material-UI | Spexop Theme |
|---------|-------------|--------------|
| Framework | React-only | Framework-agnostic |
| Dependencies | Many | Zero |
| Export Formats | 1 (JS object) | 29+ formats |
| Token References | No | Yes |
| Bundle Size | ~300KB+ | ~45KB |

## Quick Start

### 1. Install Spexop Theme

```bash
npm install @spexop/theme @spexop/react
```

### 2. Convert MUI Theme

**Material-UI (`theme.ts`):**

```typescript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      dark: '#2563eb',
    },
    secondary: {
      main: '#10b981',
    },
    background: {
      default: '#ffffff',
      paper: '#f3f4f6',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: 16,
  },
  spacing: 8,
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
    primaryHover: "#2563eb",
    secondary: "#10b981",
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
    fontFamily: "Inter, system-ui, sans-serif",
    baseSize: 16,
    scale: 1.25,
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
    baseUnit: 8, // Same as MUI default
    values: {},
  },
  borders: {
    thin: 1,
    default: 2,
    thick: 3,
    radiusSubtle: 4,
    radiusRelaxed: 8,
    radiusPill: 9999,
    defaultStyle: "solid",
  },
};
```

## Migration Mapping

### Palette → Colors

| MUI | Spexop |
|-----|--------|
| `palette.primary.main` | `colors.primary` |
| `palette.primary.dark` | `colors.primaryHover` |
| `palette.secondary.main` | `colors.secondary` |
| `palette.background.default` | `colors.surface` |
| `palette.background.paper` | `colors.surfaceSecondary` |
| `palette.text.primary` | `colors.text` |
| `palette.text.secondary` | `colors.textSecondary` |

### Typography

| MUI | Spexop |
|-----|--------|
| `typography.fontFamily` | `typography.fontFamily` |
| `typography.fontSize` | `typography.baseSize` |
| `typography.h1` | Auto-generated from `scale` |
| `typography.body1` | `typography.baseSize` |

### Spacing

| MUI | Spexop |
|-----|--------|
| `spacing(1)` (8px) | `spacing.values[1]` or `baseUnit * 1` |
| `theme.spacing(2)` (16px) | `var(--theme-spacing-2)` |

## Usage in Components

### Material-UI Approach

```tsx
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Button
      sx={{
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2),
      }}
    >
      Click me
    </Button>
  );
}
```

### Spexop Approach

```tsx
import { Button } from '@spexop/react';
import { ThemeProvider } from '@spexop/react';
import { theme } from './theme.config';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="primary">
        Click me
      </Button>
    </ThemeProvider>
  );
}
```

## Benefits of Migrating

### 1. Smaller Bundle Size

```bash
Material-UI: ~300KB minified
Spexop: ~45KB minified

Savings: ~255KB (85% reduction)
```

### 2. Framework Agnostic

```typescript
// Use same theme in React, Vue, Svelte, vanilla JS
import { generateCSS, generateVue, generateSvelte } from '@spexop/theme';
```

### 3. Token References

```typescript
buttons: {
  primary: {
    background: "colors.primary", // Auto-updates when primary changes
  },
}
```

### 4. Zero Dependencies

No dependency tree, no security vulnerabilities from dependencies.

## Migration Strategy

### Phase 1: Parallel Running

Run both systems temporarily:

```tsx
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider as SpexopThemeProvider } from '@spexop/react';

function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <SpexopThemeProvider theme={spexopTheme}>
        <YourApp />
      </SpexopThemeProvider>
    </MuiThemeProvider>
  );
}
```

### Phase 2: Gradual Component Migration

Migrate components one by one:

```tsx
// Old MUI component
<MuiButton color="primary">Click</MuiButton>

// New Spexop component
<SpexopButton variant="primary">Click</SpexopButton>
```

### Phase 3: Remove MUI

Once all components migrated:

```bash
npm uninstall @mui/material @emotion/react @emotion/styled
```

## Common Patterns

### Responsive Design

**MUI:**

```tsx
<Box sx={{
  width: { xs: '100%', md: '50%' },
  padding: { xs: 2, md: 4 },
}}>
```

**Spexop:**

```css
.box {
  width: 100%;
  padding: var(--theme-spacing-2);
}

@media (min-width: 768px) {
  .box {
    width: 50%;
    padding: var(--theme-spacing-4);
  }
}
```

### Dark Mode

**MUI:**

```typescript
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});
```

**Spexop:**

```typescript
const theme: SpexopThemeConfig = {
  // ... light colors ...
  darkMode: {
    enabled: true,
    colors: {
      surface: "#1f2937",
      text: "#f9fafb",
    },
  },
};
```

## Migration Checklist

- [ ] Install Spexop packages
- [ ] Create Spexop theme configuration
- [ ] Map MUI palette to Spexop colors
- [ ] Convert spacing (MUI default: 8, Spexop: 4 or 8)
- [ ] Convert typography settings
- [ ] Test in parallel with MUI
- [ ] Migrate components gradually
- [ ] Remove MUI dependencies

## Resources

- [Spexop Documentation](https://spexop.com/docs)
- [Component Library](@spexop/react)
- [Theme Builder](https://builder.spexop.com)

## Support

Need help? [Open an issue](https://github.com/spexop-ui/spexop-packages/issues)
