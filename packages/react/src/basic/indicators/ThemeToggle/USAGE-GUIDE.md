# ThemeToggle Component - Complete Usage Guide

**Component Version**: v0.1.0
**Last Updated**: October 20, 2025
**Package**: @spexop/react
**Status**: Production Ready

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [Basic Usage](#basic-usage)
5. [Advanced Patterns](#advanced-patterns)
6. [State Management](#state-management)
7. [System Preferences Integration](#system-preferences-integration)
8. [Styling and Theming](#styling-and-theming)
9. [Accessibility](#accessibility)
10. [Best Practices](#best-practices)
11. [Performance Optimization](#performance-optimization)
12. [Troubleshooting](#troubleshooting)
13. [API Reference](#api-reference)

## Overview

The ThemeToggle component is a purpose-built button that cycles through light, dark, and auto theme modes. It provides a clean, accessible interface for users to control their theme preferences with visual icons representing each theme state.

### When to Use

Use ThemeToggle when you need:

- Quick theme switching in navigation bars or headers
- A simple, icon-based theme control
- Cycling through light, dark, and auto (system) themes
- Settings panel theme controls
- Footer or utility bar theme toggles
- Minimal interface for theme management

### When Not to Use

Consider alternatives when you need:

- **Dropdown with many themes**: Use Select with multiple preset options
- **Segmented control**: Use SegmentedControl for visual button group
- **Settings with labels**: Use RadioGroup or SegmentedControl for clarity
- **Binary light/dark only**: Use Toggle/Switch for two-state control
- **Complex theme customization**: Use dedicated theme configuration UI

### Key Features

- Cycles through three theme states: light, dark, and auto
- Automatic icon selection (Sun, Moon, Monitor) from @spexop/icons
- Two visual variants: icon-only and button with label
- Three size options: small, medium, and large
- Full keyboard navigation (Tab, Enter, Space)
- WCAG AA+ accessible with proper ARIA labels
- Smooth transitions and animations
- Theme-aware styling using design tokens
- TypeScript support with full type safety
- Composition pattern using IconButton primitive

## Quick Start

### Minimal Example

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

### With Theme Provider

```tsx
import { UnifiedThemeProvider, ThemeToggle } from '@spexop/react';
import { useState } from 'react';
import '@spexop/react/dist/index.css';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <UnifiedThemeProvider theme={theme}>
      <header>
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
        />
      </header>
      <main>
        {/* Your app content */}
      </main>
    </UnifiedThemeProvider>
  );
}
```

### With localStorage Persistence

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeToggle
      currentTheme={theme}
      onThemeChange={setTheme}
    />
  );
}
```

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
# or
yarn add @spexop/react @spexop/icons @spexop/theme
```

### Setup Theme Provider

For full theme support with CSS custom properties:

```tsx
import { UnifiedThemeProvider } from '@spexop/react';
import '@spexop/react/dist/index.css';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <UnifiedThemeProvider theme={theme}>
      {/* Your app with ThemeToggle */}
    </UnifiedThemeProvider>
  );
}
```

## Basic Usage

### Icon Variant (Default)

Clean icon-only button, ideal for navigation bars and toolbars.

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function TopBar() {
  const [theme, setTheme] = useState('light');

  return (
    <nav>
      <div className="logo">My App</div>
      <div className="actions">
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
          variant="icon"
        />
      </div>
    </nav>
  );
}
```

### Button Variant

Button with icon and outline, better for settings panels where clarity is important.

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function SettingsPanel() {
  const [theme, setTheme] = useState('light');

  return (
    <div className="settings">
      <h2>Appearance</h2>
      <div className="setting-row">
        <label>Theme</label>
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
          variant="button"
        />
      </div>
    </div>
  );
}
```

### Size Variants

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function SizeExamples() {
  const [theme, setTheme] = useState('light');

  return (
    <div>
      {/* Small - Compact UI, footers */}
      <ThemeToggle
        currentTheme={theme}
        onThemeChange={setTheme}
        size="sm"
      />

      {/* Medium (default) - Standard navigation */}
      <ThemeToggle
        currentTheme={theme}
        onThemeChange={setTheme}
        size="md"
      />

      {/* Large - Settings panels, prominent placement */}
      <ThemeToggle
        currentTheme={theme}
        onThemeChange={setTheme}
        size="lg"
      />
    </div>
  );
}
```

### Custom Styling

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function CustomStyledToggle() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeToggle
      currentTheme={theme}
      onThemeChange={setTheme}
      className="custom-theme-toggle"
    />
  );
}
```

## Advanced Patterns

### TopBar Integration

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function AppTopBar() {
  const [theme, setTheme] = useState('light');

  return (
    <header className="topbar">
      <div className="topbar-left">
        <img src="/logo.svg" alt="App Logo" />
        <nav>
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
      <div className="topbar-right">
        <button>Search</button>
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
          variant="icon"
          size="md"
        />
        <button>Sign In</button>
      </div>
    </header>
  );
}
```

### Sidebar Integration

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function AppSidebar() {
  const [theme, setTheme] = useState('light');

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/logo.svg" alt="Logo" />
      </div>

      <nav className="sidebar-nav">
        <a href="/dashboard">Dashboard</a>
        <a href="/projects">Projects</a>
        <a href="/settings">Settings</a>
      </nav>

      <div className="sidebar-footer">
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
          variant="icon"
          size="sm"
        />
      </div>
    </aside>
  );
}
```

### Settings Panel with Labels

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function AppearanceSettings() {
  const [theme, setTheme] = useState('light');

  return (
    <div className="settings-section">
      <h2>Appearance</h2>
      <div className="setting-item">
        <div className="setting-info">
          <h3>Theme</h3>
          <p>Choose your preferred color scheme</p>
          <p className="setting-hint">
            Current: {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'Auto (System)'}
          </p>
        </div>
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
          variant="button"
          size="lg"
        />
      </div>
    </div>
  );
}
```

### Footer Integration

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function AppFooter() {
  const [theme, setTheme] = useState('light');

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Company</h4>
          <a href="/about">About</a>
          <a href="/careers">Careers</a>
        </div>
        <div className="footer-section">
          <h4>Product</h4>
          <a href="/features">Features</a>
          <a href="/pricing">Pricing</a>
        </div>
        <div className="footer-section">
          <h4>Preferences</h4>
          <div className="footer-preference">
            <span>Theme</span>
            <ThemeToggle
              currentTheme={theme}
              onThemeChange={setTheme}
              variant="icon"
              size="sm"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
```

### With Theme Transition Animation

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useEffect } from 'react';

function AnimatedThemeApp() {
  const [theme, setTheme] = useState('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleThemeChange = (newTheme) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(newTheme);
      setIsTransitioning(false);
    }, 150);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('theme-transitioning', isTransitioning);
  }, [isTransitioning]);

  return (
    <div className={`app theme-${theme}`}>
      <header>
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={handleThemeChange}
        />
      </header>
      <main>{/* Content */}</main>
    </div>
  );
}
```

```css
/* Add smooth theme transitions */
.theme-transitioning * {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease !important;
}
```

### Dynamic Theme Based on Time

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useEffect } from 'react';

function TimeBasedThemeApp() {
  const [theme, setTheme] = useState('auto');

  useEffect(() => {
    if (theme === 'auto') {
      const hour = new Date().getHours();
      // Auto theme: dark from 8pm to 6am, light otherwise
      const autoTheme = hour >= 20 || hour < 6 ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', autoTheme);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <div>
      <header>
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
        />
      </header>
      <main>{/* Content */}</main>
    </div>
  );
}
```

### Multiple Theme Toggles Synchronized

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function MultiToggleApp() {
  const [theme, setTheme] = useState('light');

  return (
    <div>
      {/* Header toggle */}
      <header>
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
          variant="icon"
        />
      </header>

      {/* Settings toggle */}
      <main>
        <div className="settings">
          <h2>Appearance</h2>
          <ThemeToggle
            currentTheme={theme}
            onThemeChange={setTheme}
            variant="button"
            size="lg"
          />
        </div>
      </main>

      {/* Footer toggle */}
      <footer>
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
          variant="icon"
          size="sm"
        />
      </footer>
    </div>
  );
}
```

## State Management

### Local State with useState

Simple component-level state management.

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

### localStorage Persistence

Persist theme preference across sessions.

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useEffect } from 'react';

function usePersistedTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('app-theme');
    return stored || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}

function App() {
  const [theme, setTheme] = usePersistedTheme();

  return (
    <ThemeToggle
      currentTheme={theme}
      onThemeChange={setTheme}
    />
  );
}
```

### Context API for Global State

Share theme state across the application.

```tsx
import { ThemeToggle } from '@spexop/react';
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header>
      <ThemeToggle
        currentTheme={theme}
        onThemeChange={setTheme}
      />
    </header>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      {/* Other components can also use useTheme() */}
    </ThemeProvider>
  );
}
```

### Redux Integration

```tsx
import { ThemeToggle } from '@spexop/react';
import { useDispatch, useSelector } from 'react-redux';

// Redux slice
const themeSlice = createSlice({
  name: 'theme',
  initialState: { current: 'light' },
  reducers: {
    setTheme: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

// Component
function Header() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.current);

  return (
    <header>
      <ThemeToggle
        currentTheme={theme}
        onThemeChange={(newTheme) => dispatch(setTheme(newTheme))}
      />
    </header>
  );
}
```

### Zustand Integration

```tsx
import { ThemeToggle } from '@spexop/react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand store with persistence
const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

function Header() {
  const { theme, setTheme } = useThemeStore();

  return (
    <header>
      <ThemeToggle
        currentTheme={theme}
        onThemeChange={setTheme}
      />
    </header>
  );
}
```

## System Preferences Integration

### Detecting System Theme Preference

Respect user's operating system theme preference.

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useEffect } from 'react';

function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setSystemTheme(e.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return systemTheme;
}

function App() {
  const systemTheme = useSystemTheme();
  const [theme, setTheme] = useState('auto');

  const effectiveTheme = theme === 'auto' ? systemTheme : theme;

  return (
    <div data-theme={effectiveTheme}>
      <header>
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
        />
      </header>
      <main>{/* Content */}</main>
    </div>
  );
}
```

### Auto Theme with System Sync

Complete implementation with system preference detection and persistence.

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useEffect } from 'react';

function useThemeManager() {
  // Get system preference
  const getSystemTheme = () => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  // Initialize from localStorage or default to auto
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme-preference');
    return stored || 'auto';
  });

  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setSystemTheme(e.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Persist theme preference
  useEffect(() => {
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  // Calculate effective theme
  const effectiveTheme = theme === 'auto' ? systemTheme : theme;

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }, [effectiveTheme]);

  return { theme, setTheme, effectiveTheme };
}

function App() {
  const { theme, setTheme, effectiveTheme } = useThemeManager();

  return (
    <div>
      <header>
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
        />
        <span>Current theme: {effectiveTheme}</span>
      </header>
      <main>{/* Content */}</main>
    </div>
  );
}
```

### Prefers Reduced Motion Support

Respect user's motion preferences when switching themes.

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useEffect } from 'react';

function useThemeWithMotion() {
  const [theme, setTheme] = useState('light');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleThemeChange = (newTheme) => {
    if (prefersReducedMotion) {
      // Apply immediately without transitions
      document.documentElement.classList.add('no-transition');
      setTheme(newTheme);
      // Force reflow
      document.documentElement.offsetHeight;
      document.documentElement.classList.remove('no-transition');
    } else {
      setTheme(newTheme);
    }
  };

  return [theme, handleThemeChange];
}

function App() {
  const [theme, setTheme] = useThemeWithMotion();

  return (
    <ThemeToggle
      currentTheme={theme}
      onThemeChange={setTheme}
    />
  );
}
```

```css
/* CSS for no-transition class */
.no-transition * {
  transition: none !important;
}
```

## Styling and Theming

### CSS Custom Properties

ThemeToggle uses IconButton internally, which supports theme tokens.

```css
/* Override button colors */
.custom-theme-toggle button {
  --theme-surface: #f0f0f0;
  --theme-surface-hover: #e0e0e0;
  --theme-border: #d0d0d0;
  --theme-primary: #0066cc;
}

/* Dark theme overrides */
[data-theme="dark"] .custom-theme-toggle button {
  --theme-surface: #2a2a2a;
  --theme-surface-hover: #3a3a3a;
  --theme-border: #4a4a4a;
}
```

### Custom Size Styling

```css
/* Custom large size for prominent placement */
.theme-toggle-hero button {
  padding: 16px;
  border-radius: 12px;
}

.theme-toggle-hero button svg {
  width: 32px;
  height: 32px;
}
```

### Positioning in Layout

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function FixedThemeToggle() {
  const [theme, setTheme] = useState('light');

  return (
    <>
      {/* Fixed position in corner */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
          size="lg"
        />
      </div>

      <main>{/* Content */}</main>
    </>
  );
}
```

### Custom Focus Styles

```css
/* Enhanced focus indicator for accessibility */
.theme-toggle-accessible button:focus-visible {
  outline: 3px solid var(--theme-primary);
  outline-offset: 4px;
  border-radius: 8px;
}
```

## Accessibility

### WCAG AA+ Compliance

ThemeToggle is built with accessibility as a priority:

- Semantic `<button>` element
- Clear ARIA labels describing current theme
- Keyboard navigation support
- Focus indicators
- High contrast support
- Screen reader announcements

### ARIA Attributes

The component automatically provides:

```tsx
<button
  type="button"
  aria-label="Theme: light"  // Updates based on current theme
  title="Theme: light"       // Tooltip support
>
  {/* Icon */}
</button>
```

### Keyboard Navigation

Full keyboard support:

- `Tab` - Focus the toggle button
- `Shift + Tab` - Focus previous element
- `Enter` - Cycle to next theme
- `Space` - Cycle to next theme

Example with focus management:

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useRef } from 'react';

function AccessibleHeader() {
  const [theme, setTheme] = useState('light');
  const toggleRef = useRef(null);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // Announce change to screen readers
    const announcement = `Theme changed to ${newTheme}`;
    announceToScreenReader(announcement);
  };

  return (
    <header>
      <nav>
        <a href="/home">Home</a>
        <a href="/about">About</a>
      </nav>
      <ThemeToggle
        currentTheme={theme}
        onThemeChange={handleThemeChange}
      />
    </header>
  );
}

// Helper for screen reader announcements
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}
```

### Screen Reader Support

The component provides clear labels:

- "Theme: light" when light theme is active (Sun icon)
- "Theme: dark" when dark theme is active (Moon icon)
- "Theme: auto" when auto theme is active (Monitor icon)

Screen readers will announce the current theme and allow users to understand which theme will be activated next in the cycle.

### High Contrast Mode

ThemeToggle respects system high contrast settings:

```css
/* Automatically handled by design tokens, but can be enhanced */
@media (prefers-contrast: high) {
  .theme-toggle button {
    border-width: 2px;
    border-color: currentColor;
  }

  .theme-toggle button:focus-visible {
    outline-width: 4px;
  }
}
```

### Skip Links Integration

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState } from 'react';

function AccessibleApp() {
  const [theme, setTheme] = useState('light');

  return (
    <>
      {/* Skip links */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <a href="#theme-toggle" className="skip-link">
        Skip to theme toggle
      </a>

      <header>
        <nav>{/* Navigation */}</nav>
        <div id="theme-toggle">
          <ThemeToggle
            currentTheme={theme}
            onThemeChange={setTheme}
          />
        </div>
      </header>

      <main id="main-content">
        {/* Content */}
      </main>
    </>
  );
}
```

## Best Practices

### 1. Always Persist Theme Preference

Save user's theme choice to localStorage or server.

```tsx
// Good
const [theme, setTheme] = useState(() =>
  localStorage.getItem('theme') || 'auto'
);

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);
```

### 2. Respect System Preferences for Auto Theme

When theme is "auto", follow the operating system preference.

```tsx
// Good
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';

const effectiveTheme = theme === 'auto' ? systemTheme : theme;
```

### 3. Provide Visual Feedback

Show current theme state clearly, especially in settings.

```tsx
// Good
<div className="theme-setting">
  <div>
    <h3>Theme</h3>
    <p>Current: {theme === 'auto' ? `Auto (${systemTheme})` : theme}</p>
  </div>
  <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
</div>
```

### 4. Place Prominently in Navigation

Make theme toggle easy to find and access.

```tsx
// Good - Visible in header
<header>
  <nav>{/* Links */}</nav>
  <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
</header>
```

### 5. Use Appropriate Variant

- Use `icon` variant in navigation bars and headers
- Use `button` variant in settings panels for clarity

```tsx
// Navigation: icon variant
<header>
  <ThemeToggle currentTheme={theme} onThemeChange={setTheme} variant="icon" />
</header>

// Settings: button variant
<div className="settings">
  <ThemeToggle currentTheme={theme} onThemeChange={setTheme} variant="button" />
</div>
```

### 6. Apply Theme Globally

Ensure theme changes affect entire application.

```tsx
// Good
useEffect(() => {
  const effectiveTheme = theme === 'auto' ? systemTheme : theme;
  document.documentElement.setAttribute('data-theme', effectiveTheme);
}, [theme, systemTheme]);
```

### 7. Handle SSR/SSG Properly

Avoid hydration mismatches in server-rendered applications.

```tsx
// Good - Next.js example
import { ThemeToggle } from '@spexop/react';
import { useState, useEffect } from 'react';

function App() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored) setTheme(stored);
  }, []);

  if (!mounted) return null;

  return <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />;
}
```

### 8. Smooth Theme Transitions

Add CSS transitions for smooth theme changes.

```css
/* Good */
* {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none;
  }
}
```

### 9. Announce Theme Changes

Inform screen reader users of theme changes.

```tsx
// Good
const handleThemeChange = (newTheme) => {
  setTheme(newTheme);
  
  // Screen reader announcement
  const message = `Theme changed to ${newTheme}`;
  announceToScreenReader(message);
};
```

### 10. Test All Theme States

Ensure your app looks good in all three themes.

```tsx
// Test helper
function ThemeTestingTools() {
  const [theme, setTheme] = useState('light');

  return (
    <div className="theme-tester">
      <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
      <div>
        <button onClick={() => setTheme('light')}>Test Light</button>
        <button onClick={() => setTheme('dark')}>Test Dark</button>
        <button onClick={() => setTheme('auto')}>Test Auto</button>
      </div>
    </div>
  );
}
```

## Performance Optimization

### Memoize Theme Change Handler

Prevent unnecessary re-renders when using callbacks.

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useCallback } from 'react';

function App() {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = useCallback((newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  return (
    <ThemeToggle
      currentTheme={theme}
      onThemeChange={handleThemeChange}
    />
  );
}
```

### Lazy Load Theme Provider

For large applications, lazy load theme provider.

```tsx
import { lazy, Suspense } from 'react';
import { ThemeToggle } from '@spexop/react';

const UnifiedThemeProvider = lazy(() =>
  import('@spexop/react').then(m => ({ default: m.UnifiedThemeProvider }))
);

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnifiedThemeProvider theme={theme}>
        <header>
          <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
        </header>
        <main>{/* Content */}</main>
      </UnifiedThemeProvider>
    </Suspense>
  );
}
```

### Debounce Theme Application

For complex theme systems, debounce theme application.

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

function App() {
  const [theme, setTheme] = useState('light');

  const applyTheme = useCallback(
    debounce((newTheme) => {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }, 100),
    []
  );

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeToggle
      currentTheme={theme}
      onThemeChange={handleThemeChange}
    />
  );
}
```

### CSS-in-JS Performance

If using CSS-in-JS, optimize theme switching.

```tsx
import { ThemeToggle } from '@spexop/react';
import { useState, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

function App() {
  const [theme, setTheme] = useState('light');

  const themeObject = useMemo(() => ({
    mode: theme,
    colors: theme === 'dark' ? darkColors : lightColors,
  }), [theme]);

  return (
    <ThemeProvider theme={themeObject}>
      <header>
        <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
      </header>
      <main>{/* Content */}</main>
    </ThemeProvider>
  );
}
```

## Troubleshooting

### Theme Not Persisting

**Problem**: Theme resets to default on page reload.

**Solution**: Ensure localStorage is being set and read correctly.

```tsx
// Check implementation
const [theme, setTheme] = useState(() => {
  // Add error handling
  try {
    return localStorage.getItem('theme') || 'light';
  } catch (error) {
    console.error('Failed to read theme from localStorage:', error);
    return 'light';
  }
});

useEffect(() => {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.error('Failed to save theme to localStorage:', error);
  }
}, [theme]);
```

### Theme Not Applied to Entire App

**Problem**: Some components don't respect theme changes.

**Solution**: Ensure theme is applied at document root level.

```tsx
// Apply to document root
useEffect(() => {
  const effectiveTheme = theme === 'auto' ? systemTheme : theme;
  document.documentElement.setAttribute('data-theme', effectiveTheme);
}, [theme, systemTheme]);
```

### Auto Theme Not Detecting System Preference

**Problem**: Auto theme doesn't follow system dark mode.

**Solution**: Properly implement system preference detection.

```tsx
function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState(() => {
    // Check if window is available (for SSR)
    if (typeof window === 'undefined') return 'light';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Use correct event listener method
    mediaQuery.addEventListener('change', handler);
    
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  return systemTheme;
}
```

### SSR/Hydration Mismatch

**Problem**: Error about server/client mismatch in Next.js or similar frameworks.

**Solution**: Only render after client-side mount.

```tsx
function ThemeToggleWrapper() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
    // Read from localStorage only on client
    const stored = localStorage.getItem('theme');
    if (stored) setTheme(stored);
  }, []);

  // Don't render until mounted
  if (!mounted) {
    return <div style={{ width: '40px', height: '40px' }} />; // Placeholder
  }

  return <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />;
}
```

### Icon Not Displaying

**Problem**: Theme icon not showing up.

**Solution**: Ensure @spexop/icons is installed and imported correctly.

```bash
# Install icons package
npm install @spexop/icons
```

```tsx
// Icons are imported automatically by ThemeToggle
import { ThemeToggle } from '@spexop/react';
// No need to import Sun, Moon, Monitor separately
```

### Slow Theme Transitions

**Problem**: Theme change feels sluggish.

**Solution**: Optimize CSS transitions or disable if performance is critical.

```css
/* Optimize transitions - only animate necessary properties */
* {
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}

/* Or disable transitions for instant switching */
* {
  transition: none;
}
```

### Focus Ring Not Visible

**Problem**: Can't see focus indicator when navigating with keyboard.

**Solution**: Ensure focus-visible styles are not overridden.

```css
/* Check for global styles that might override focus */
button:focus-visible {
  outline: 2px solid var(--theme-primary) !important;
  outline-offset: 2px !important;
}
```

## API Reference

### ThemeToggle Props

```typescript
interface ThemeToggleProps {
  /** Current theme state (required) */
  currentTheme: "light" | "dark" | "auto";
  
  /** Theme change callback (required) */
  onThemeChange: (theme: "light" | "dark" | "auto") => void;
  
  /** Visual variant (optional, default: "icon") */
  variant?: "icon" | "button";
  
  /** Size variant (optional, default: "md") */
  size?: "sm" | "md" | "lg";
  
  /** Additional CSS class (optional) */
  className?: string;
}
```

### Props Details

#### currentTheme

- **Type**: `"light" | "dark" | "auto"`
- **Required**: Yes
- **Description**: Current active theme state
- **Values**:
  - `"light"` - Light theme (Sun icon)
  - `"dark"` - Dark theme (Moon icon)
  - `"auto"` - Auto/system theme (Monitor icon)

#### onThemeChange

- **Type**: `(theme: "light" | "dark" | "auto") => void`
- **Required**: Yes
- **Description**: Callback invoked when user clicks toggle
- **Behavior**: Called with the next theme in cycle order

#### variant

- **Type**: `"icon" | "button"`
- **Required**: No
- **Default**: `"icon"`
- **Description**: Visual style of the toggle
- **Values**:
  - `"icon"` - Icon-only button (ghost style)
  - `"button"` - Button with icon and outline

#### size

- **Type**: `"sm" | "md" | "lg"`
- **Required**: No
- **Default**: `"md"`
- **Description**: Size of the toggle button
- **Values**:
  - `"sm"` - Small (16px icon)
  - `"md"` - Medium (20px icon)
  - `"lg"` - Large (24px icon)

#### className

- **Type**: `string`
- **Required**: No
- **Default**: `""`
- **Description**: Additional CSS classes to apply
- **Usage**: Custom styling or layout positioning

### Theme Cycle Order

The component cycles through themes in this order:

```bash
light → dark → auto → light → ...
```

Each click advances to the next theme in the cycle.

### Icons Used

ThemeToggle automatically selects icons from @spexop/icons:

- **Light theme**: `Sun` icon
- **Dark theme**: `Moon` icon
- **Auto theme**: `Monitor` icon

### Component Composition

ThemeToggle is built using composition:

```tsx
ThemeToggle
  └── IconButton (from @spexop/react)
      └── Icon (Sun/Moon/Monitor from @spexop/icons)
```

This follows Spexop's "Composition before complexity" principle.

### TypeScript Support

Full TypeScript support with type inference:

```tsx
import { ThemeToggle } from '@spexop/react';
import type { ThemeToggleProps } from '@spexop/react';

// Type inference works
const [theme, setTheme] = useState<"light" | "dark" | "auto">("light");

// Props are fully typed
<ThemeToggle
  currentTheme={theme}      // Type: "light" | "dark" | "auto"
  onThemeChange={setTheme}  // Type: (theme: "light" | "dark" | "auto") => void
  variant="icon"            // Type: "icon" | "button"
  size="md"                 // Type: "sm" | "md" | "lg"
/>
```

## Related Components

- **SegmentedControl** - Alternative for theme selection with visual button group
- **IconButton** - Primitive used internally by ThemeToggle
- **UnifiedThemeProvider** - Theme provider for application-wide theming
- **Toggle** - Binary toggle for simple light/dark switching
- **Select** - Dropdown for selecting from many theme options

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## License

MIT

## Contributing

See main repository CONTRIBUTING.md for guidelines.

## Support

For issues, questions, or contributions, visit the GitHub repository or refer to the component documentation.
