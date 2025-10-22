# ThemeToggle Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A button that cycles through light, dark, and auto themes. Shows appropriate icon based on current theme with smooth animations.

## Features

- ✅ Theme cycling (light → dark → auto)
- ✅ Automatic icon selection
- ✅ 2 variants (icon, button)
- ✅ 3 sizes (sm, md, lg)
- ✅ Smooth transitions
- ✅ Accessible labels
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeToggle
      currentTheme={theme}
      onThemeChange={setTheme}
    />
  );
}
```

## Variants

### Icon Variant (Default)

Icon-only button with tooltip.

```tsx
<ThemeToggle
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="icon"
/>
```

### Button Variant

Full button with icon and label.

```tsx
<ThemeToggle
  currentTheme={theme}
  onThemeChange={setTheme}
  variant="button"
/>
```

## Sizes

### Small (sm)

```tsx
<ThemeToggle
  currentTheme={theme}
  onThemeChange={setTheme}
  size="sm"
/>
```

### Medium (md) - Default

```tsx
<ThemeToggle
  currentTheme={theme}
  onThemeChange={setTheme}
  size="md"
/>
```

### Large (lg)

```tsx
<ThemeToggle
  currentTheme={theme}
  onThemeChange={setTheme}
  size="lg"
/>
```

## Theme Icons

- **Light theme** - Sun icon (☀️)
- **Dark theme** - Moon icon (🌙)
- **Auto theme** - Monitor icon (🖥️)

## Common Patterns

### In TopBar

```tsx
function AppTopBar() {
  const [theme, setTheme] = useState('light');

  return (
    <TopBar
      logo={logo}
      links={links}
      actions={
        <>
          <ThemeToggle
            currentTheme={theme}
            onThemeChange={setTheme}
            variant="icon"
          />
          <Button variant="primary">Sign In</Button>
        </>
      }
    />
  );
}
```

### In Settings Panel

```tsx
<SettingsCard
  title="THEME"
  description="Choose your color theme"
>
  <ThemeToggle
    currentTheme={theme}
    onThemeChange={setTheme}
    variant="button"
    size="lg"
  />
</SettingsCard>
```

### With Theme Provider

```tsx
import { ThemeProvider, ThemeToggle } from '@spexop/react';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <header>
          <ThemeToggle
            currentTheme={theme}
            onThemeChange={setTheme}
          />
        </header>
        
        <main>
          {/* App content */}
        </main>
      </div>
    </ThemeProvider>
  );
}
```

### In Footer

```tsx
<Footer
  logo={logo}
  sections={sections}
  actions={
    <ThemeToggle
      currentTheme={theme}
      onThemeChange={setTheme}
      variant="icon"
      size="sm"
    />
  }
/>
```

## Theme Cycle Order

1. **Light** → Dark
2. **Dark** → Auto
3. **Auto** → Light

Users can cycle through all three themes by clicking repeatedly.

## Props

```typescript
interface ThemeToggleProps {
  /** Current theme */
  currentTheme: "light" | "dark" | "auto";
  /** Theme change callback */
  onThemeChange: (theme: "light" | "dark" | "auto") => void;
  /** Visual variant */
  variant?: "icon" | "button";
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean button design
2. **Typography before decoration** - Clear theme labels
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Clear labels and ARIA

## Accessibility

- ✅ Semantic button element
- ✅ Clear ARIA label with current theme
- ✅ Keyboard accessible (Tab, Enter, Space)
- ✅ Focus indicators
- ✅ Screen reader announcements
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Tab` - Focus toggle
- `Enter/Space` - Cycle theme
- `Shift + Tab` - Focus previous

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `SegmentedControl` - Alternative theme selector
- `IconButton` - Icon-only buttons
- `Button` - Regular buttons

## Best Practices

1. **Persist theme** - Save to localStorage or user preferences
2. **Respect system** - Auto theme follows OS preference
3. **Smooth transitions** - Use CSS transitions for theme changes
4. **Clear feedback** - Show current theme state
5. **Accessible placement** - Easy to find and use

## License

MIT
