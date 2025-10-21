# Migrating from Emotion Theme to Spexop Theme

This guide helps you migrate from Emotion theme system to Spexop Theme.

## Overview

Both systems integrate well with React, but have different focuses:

| Feature | Emotion | Spexop Theme |
|---------|---------|--------------|
| Primary Use | CSS-in-JS | Token-based theming |
| Framework | React-focused | Framework-agnostic |
| Export Formats | 1 (JS object) | 29+ formats (including Emotion!) |
| Runtime | CSS-in-JS runtime | CSS variables (zero runtime) |
| Bundle Impact | Runtime overhead | Zero runtime cost |

## Quick Start

### 1. Install Spexop

```bash
npm install @spexop/theme @spexop/react
```

### 2. Convert Emotion Theme

**Emotion (`theme.ts`):**

```typescript
export const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    background: '#ffffff',
    text: '#111827',
  },
  fontSizes: {
    small: '14px',
    medium: '16px',
    large: '20px',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
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
    baseUnit: 4,
    values: {
      2: 8,   // small
      4: 16,  // medium
      6: 24,  // large
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

### 3. Generate Emotion Theme from Spexop

If you want to keep using Emotion:

```typescript
import { generateEmotion } from '@spexop/theme';
import { theme } from './theme.config';

export const emotionTheme = generateEmotion(theme);
```

## Migration Mapping

### Theme Provider

**Emotion:**

```tsx
import { ThemeProvider } from '@emotion/react';

<ThemeProvider theme={emotionTheme}>
  <App />
</ThemeProvider>
```

**Spexop:**

```tsx
import { ThemeProvider } from '@spexop/react';
import { theme } from './theme.config';

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

### Using Theme Values

**Emotion:**

```tsx
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

const StyledDiv = styled.div`
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.medium};
`;

function Component() {
  const theme = useTheme();
  return <div css={css`color: ${theme.colors.primary};`}>Text</div>;
}
```

**Spexop:**

```tsx
import styles from './Component.module.css';

function Component() {
  return <div className={styles.container}>Text</div>;
}

// Component.module.css
.container {
  color: var(--theme-primary);
  padding: var(--theme-spacing-4);
}
```

## Comparison

### Runtime Cost

**Emotion:**

- CSS-in-JS runtime: ~30KB
- Style generation overhead
- Serialization cost

**Spexop:**

- Zero runtime cost
- Pre-generated CSS variables
- No serialization needed

### Bundle Size

```bash
Emotion + styled-components: ~30KB
Spexop Theme: ~45KB
Spexop React: ~60KB

But: Spexop uses CSS variables (no runtime overhead)
```

### Developer Experience

**Both provide:**

- Type-safe theming
- Auto-completion
- Theme values in code

**Spexop adds:**

- 29+ export formats
- Token references
- Framework-agnostic

## Migration Strategies

### Option 1: Full Migration to CSS Variables

Replace Emotion styling with CSS modules:

```tsx
// Before (Emotion)
const Button = styled.button`
  background: ${p => p.theme.colors.primary};
  color: white;
  padding: ${p => p.theme.spacing.medium};
`;

// After (Spexop)
import styles from './Button.module.css';

const Button = ({ children }: { children: React.ReactNode }) => (
  <button className={styles.button}>{children}</button>
);

// Button.module.css
.button {
  background: var(--theme-primary);
  color: white;
  padding: var(--theme-spacing-4);
}
```

### Option 2: Keep Emotion, Use Spexop Theme

Generate Emotion theme from Spexop:

```typescript
import { generateEmotion } from '@spexop/theme';
import { theme as spexopTheme } from './theme.config';

export const emotionTheme = generateEmotion(spexopTheme);

// Use with Emotion
<ThemeProvider theme={emotionTheme}>
  <App />
</ThemeProvider>
```

### Option 3: Gradual Migration

Use both temporarily:

```tsx
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ThemeProvider as SpexopThemeProvider } from '@spexop/react';

<EmotionThemeProvider theme={emotionTheme}>
  <SpexopThemeProvider theme={spexopTheme}>
    <App />
  </SpexopThemeProvider>
</EmotionThemeProvider>
```

## Benefits of Migrating

### 1. Zero Runtime Cost

```bash
Before (Emotion): CSS generation at runtime
After (Spexop): Pre-generated CSS variables
```

### 2. Better Performance

- No serialization overhead
- No runtime style generation
- Smaller bundle size
- Faster initial render

### 3. Framework Flexibility

```typescript
// Use same theme everywhere
import { generateVue, generateSvelte } from '@spexop/theme';
```

### 4. Better Tooling

- Export to Figma
- Export to Tailwind
- Export to any format

## Common Patterns

### Variant Styles

**Emotion:**

```tsx
const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  background: ${p => 
    p.variant === 'primary' ? p.theme.colors.primary : p.theme.colors.secondary
  };
`;
```

**Spexop:**

```tsx
// Button already handles variants
import { Button } from '@spexop/react';

<Button variant="primary">Click</Button>
```

### Responsive Styles

**Emotion:**

```tsx
const Box = styled.div`
  font-size: ${p => p.theme.fontSizes.small};
  
  @media (min-width: 768px) {
    font-size: ${p => p.theme.fontSizes.medium};
  }
`;
```

**Spexop:**

```css
.box {
  font-size: var(--theme-font-size-sm);
}

@media (min-width: 768px) {
  .box {
    font-size: var(--theme-font-size-base);
  }
}
```

### Theme Switching

**Emotion:**

```tsx
const [theme, setTheme] = useState(lightTheme);

<ThemeProvider theme={theme}>
  <button onClick={() => setTheme(darkTheme)}>
    Toggle
  </button>
</ThemeProvider>
```

**Spexop:**

```tsx
import { useTheme } from '@spexop/react';

function ThemeToggle() {
  const { mode, setMode } = useTheme();
  
  return (
    <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      Toggle
    </button>
  );
}
```

## Migration Checklist

- [ ] Install Spexop packages
- [ ] Create Spexop theme configuration
- [ ] Map Emotion theme to Spexop colors
- [ ] Convert spacing values
- [ ] Convert typography settings
- [ ] Decide on migration strategy
- [ ] Test with both systems (if gradual)
- [ ] Migrate styled components to CSS modules or use generateEmotion
- [ ] Test dark mode
- [ ] Remove Emotion (if full migration)

## Advanced: Keep Both Systems

You can generate Emotion theme from Spexop:

```typescript
import { generateEmotion } from '@spexop/theme';
import { theme as spexopTheme } from './theme.config';

// Generate Emotion theme
export const emotionTheme = generateEmotion(spexopTheme);

// Now changes to spexopTheme auto-generate emotionTheme!
```

Benefits:

- Single source of truth (Spexop theme)
- Keep existing Emotion components
- Export to other formats when needed

## Resources

- [Spexop Documentation](https://spexop.com/docs)
- [Emotion Generator API](https://spexop.com/docs/generators/emotion)
- [Component Library](@spexop/react)

## Support

Need help? [Open an issue](https://github.com/spexop-ui/spexop-packages/issues)
