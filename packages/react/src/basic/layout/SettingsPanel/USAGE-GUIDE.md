# SettingsPanel Component - Comprehensive Usage Guide

Version: 0.2.0
Package: @spexop/react
Status: Production Ready

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Quick Start](#quick-start)
- [Settings Sections](#settings-sections)
- [Advanced Patterns](#advanced-patterns)
- [State Management](#state-management)
- [Real-World Examples](#real-world-examples)
- [Common Pitfalls](#common-pitfalls)
- [Accessibility](#accessibility)
- [API Reference](#api-reference)

## Overview

SettingsPanel is a comprehensive, slide-in settings drawer that provides a complete settings interface for applications. It includes theme selection, color palettes, layout controls, spacing options, sidebar configuration, and text zoom - all with full WCAG AA+ accessibility compliance.

### When to Use SettingsPanel

- Application-wide settings interface
- User preference management
- Theme and appearance customization
- Layout configuration
- Accessibility settings
- Multi-section settings drawer

### When NOT to Use SettingsPanel

- Simple single setting (use SettingItem)
- Form-based settings (use form components)
- Modal dialogs (use Modal)
- Inline settings (use SettingsCard)

## Core Concepts

### Drawer Interface

SettingsPanel uses the Drawer component to slide in from the right side of the screen:

- **Desktop**: 420px wide drawer
- **Mobile**: Full-width overlay
- **Backdrop**: Semi-transparent overlay
- **Body scroll lock**: Prevents background scrolling when open

### Settings Architecture

The panel is organized into distinct sections:

1. **Theme** - Light, Dark, Auto modes
2. **Color Palette** - Accent color selection
3. **Layout Width** - Default, Boxed, Fluid
4. **Content Width** - Full, XL, L, M
5. **Spacing** - Compact, Normal, Spacious
6. **Sidebar Position** - Left, Right
7. **Sidebar Visibility** - Show, Hide
8. **Text Zoom** - 100-200% (WCAG compliance)

### Controlled Component

SettingsPanel is a fully controlled component - all settings values and change handlers must be provided by the parent:

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  theme={theme}
  onThemeChange={setTheme}
  // ... other props
/>
```

## Quick Start

### Minimal Example

```tsx
import { SettingsPanel } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Settings
      </button>
      
      <SettingsPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
      />
    </>
  );
}
```

### With Multiple Settings

```tsx
function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    colorPalette: 'red',
    textZoom: '100',
  });

  return (
    <>
      <button onClick={() => setShowSettings(true)}>
        Settings
      </button>
      
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        theme={settings.theme}
        onThemeChange={(val) => setSettings({ ...settings, theme: val })}
        colorPalette={settings.colorPalette}
        onColorPaletteChange={(val) => setSettings({ ...settings, colorPalette: val })}
        textZoom={settings.textZoom}
        onTextZoomChange={(val) => setSettings({ ...settings, textZoom: val })}
      />
    </>
  );
}
```

## Settings Sections

### Theme Selection

Choose between Light, Dark, and Auto modes:

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  theme={theme}
  onThemeChange={setTheme}
/>
```

**Options:**

- `light` - Light theme with bright backgrounds
- `dark` - Dark theme with dark backgrounds  
- `auto` - Follows system preference

**Visual Indicators:**

- Sun icon for Light mode
- Moon icon for Dark mode
- Monitor icon for Auto mode

### Color Palette

Choose accent color for the application:

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  colorPalette={colorPalette}
  onColorPaletteChange={setColorPalette}
/>
```

**Options:**

- `red` - Red accent (#b04554)
- `blue` - Blue accent (#3b82f6)
- `green` - Green accent (#10b981)
- `purple` - Purple accent (#8b5cf6)
- `neutral` - Neutral accent (#404040)

**Visual Indicators:**

- Color circles showing each palette color

### Layout Width

Control overall layout behavior:

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  layoutVariant={layoutVariant}
  onLayoutVariantChange={setLayoutVariant}
/>
```

**Options:**

- `default` - Standard responsive behavior
- `boxed` - Constrained width with margin
- `fluid` - Full-width layout

### Content Width

Optimize reading line length:

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  contentMaxWidth={contentMaxWidth}
  onContentMaxWidthChange={setContentMaxWidth}
/>
```

**Options:**

- `full` - No width constraint
- `xl` - 1280px maximum (default)
- `lg` - 1024px maximum
- `md` - 768px maximum

### Spacing Density

Control padding and spacing:

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  spacing={spacing}
  onSpacingChange={setSpacing}
/>
```

**Options:**

- `compact` - Reduced spacing for dense layouts
- `normal` - Balanced spacing (default)
- `spacious` - Generous spacing for comfort

### Sidebar Position

Choose sidebar placement:

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  sidebarPosition={sidebarPosition}
  onSidebarPositionChange={setSidebarPosition}
/>
```

**Options:**

- `left` - Sidebar on left side (default)
- `right` - Sidebar on right side

### Sidebar Visibility

Control sidebar display:

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  sidebarState={sidebarState}
  onSidebarStateChange={setSidebarState}
/>
```

**Options:**

- `icons` - Show sidebar with icons (default)
- `hidden` - Completely hide sidebar

### Text Zoom

Adjust text size for accessibility:

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  textZoom={textZoom}
  onTextZoomChange={setTextZoom}
/>
```

**Range:** 100% - 200% (WCAG 2.2 AA requirement)
**Control:** Slider with percentage display
**Steps:** 10% increments

**WCAG Compliance:**

- WCAG 2.2 Level AA requires support up to 200%
- Helps users with low vision
- Improves readability for all users

### Reset to Defaults

Optionally provide a reset function:

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  // ... other props
  onResetToDefaults={handleReset}
/>
```

## Advanced Patterns

### Complete Settings Integration

```tsx
import { SettingsPanel } from '@spexop/react';
import { useState } from 'react';

function CompleteApp() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    colorPalette: 'red',
    textZoom: '100',
    layoutVariant: 'default',
    contentMaxWidth: 'xl',
    spacing: 'normal',
    sidebarPosition: 'left',
    sidebarState: 'icons',
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings({
      theme: 'light',
      colorPalette: 'red',
      textZoom: '100',
      layoutVariant: 'default',
      contentMaxWidth: 'xl',
      spacing: 'normal',
      sidebarPosition: 'left',
      sidebarState: 'icons',
    });
  };

  return (
    <>
      <TopBar
        logo={logo}
        links={links}
        actions={
          <IconButton
            icon={Settings}
            label="Settings"
            onClick={() => setShowSettings(true)}
          />
        }
      />
      
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        theme={settings.theme}
        onThemeChange={(val) => updateSetting('theme', val)}
        colorPalette={settings.colorPalette}
        onColorPaletteChange={(val) => updateSetting('colorPalette', val)}
        textZoom={settings.textZoom}
        onTextZoomChange={(val) => updateSetting('textZoom', val)}
        layoutVariant={settings.layoutVariant}
        onLayoutVariantChange={(val) => updateSetting('layoutVariant', val)}
        contentMaxWidth={settings.contentMaxWidth}
        onContentMaxWidthChange={(val) => updateSetting('contentMaxWidth', val)}
        spacing={settings.spacing}
        onSpacingChange={(val) => updateSetting('spacing', val)}
        sidebarPosition={settings.sidebarPosition}
        onSidebarPositionChange={(val) => updateSetting('sidebarPosition', val)}
        sidebarState={settings.sidebarState}
        onSidebarStateChange={(val) => updateSetting('sidebarState', val)}
        onResetToDefaults={resetToDefaults}
      />
    </>
  );
}
```

### With Keyboard Shortcut

```tsx
function AppWithShortcut() {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+, or Ctrl+, to open settings
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        setShowSettings(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SettingsPanel
      isOpen={showSettings}
      onClose={() => setShowSettings(false)}
      // ... other props
    />
  );
}
```

### With Custom Trigger

```tsx
import { Settings } from '@spexop/icons';
import { Icon, IconButton } from '@spexop/react';

function CustomTrigger() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <IconButton
        icon={Settings}
        label="Open Settings"
        onClick={() => setShowSettings(true)}
        variant="ghost"
      />
      
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        // ... settings props
      />
    </>
  );
}
```

### Conditional Settings Based on User Role

```tsx
function ConditionalSettings({ userRole }) {
  return (
    <SettingsPanel
      isOpen={isOpen}
      onClose={handleClose}
      theme={theme}
      onThemeChange={setTheme}
      colorPalette={colorPalette}
      onColorPaletteChange={setColorPalette}
      // Only show layout controls to admins
      {...(userRole === 'admin' && {
        layoutVariant: layoutVariant,
        onLayoutVariantChange: setLayoutVariant,
        contentMaxWidth: contentMaxWidth,
        onContentMaxWidthChange: setContentMaxWidth,
      })}
    />
  );
}
```

## State Management

### Local State (useState)

Best for simple apps or single-page applications:

```tsx
function App() {
  const [settings, setSettings] = useState({
    theme: 'light',
    colorPalette: 'red',
    textZoom: '100',
  });

  return (
    <SettingsPanel
      isOpen={isOpen}
      onClose={handleClose}
      theme={settings.theme}
      onThemeChange={(val) => setSettings({ ...settings, theme: val })}
      colorPalette={settings.colorPalette}
      onColorPaletteChange={(val) => setSettings({ ...settings, colorPalette: val })}
      textZoom={settings.textZoom}
      onTextZoomChange={(val) => setSettings({ ...settings, textZoom: val })}
    />
  );
}
```

### Context API

For sharing settings across components:

```tsx
const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    theme: 'light',
    colorPalette: 'red',
    // ... other settings
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

function App() {
  const { settings, updateSetting } = useContext(SettingsContext);

  return (
    <SettingsPanel
      isOpen={isOpen}
      onClose={handleClose}
      theme={settings.theme}
      onThemeChange={(val) => updateSetting('theme', val)}
      // ... other props
    />
  );
}
```

### localStorage Persistence

Persist settings across sessions:

```tsx
function usePersistedSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('app-settings');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      colorPalette: 'red',
      textZoom: '100',
      layoutVariant: 'default',
      contentMaxWidth: 'xl',
      spacing: 'normal',
      sidebarPosition: 'left',
      sidebarState: 'icons',
    };
  });

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return [settings, updateSetting];
}

function App() {
  const [settings, updateSetting] = usePersistedSettings();

  return (
    <SettingsPanel
      isOpen={isOpen}
      onClose={handleClose}
      theme={settings.theme}
      onThemeChange={(val) => updateSetting('theme', val)}
      // ... other props
    />
  );
}
```

### With Zustand

For complex state management:

```tsx
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'light',
      colorPalette: 'red',
      textZoom: '100',
      layoutVariant: 'default',
      contentMaxWidth: 'xl',
      spacing: 'normal',
      sidebarPosition: 'left',
      sidebarState: 'icons',
      
      setTheme: (theme) => set({ theme }),
      setColorPalette: (colorPalette) => set({ colorPalette }),
      setTextZoom: (textZoom) => set({ textZoom }),
      setLayoutVariant: (layoutVariant) => set({ layoutVariant }),
      setContentMaxWidth: (contentMaxWidth) => set({ contentMaxWidth }),
      setSpacing: (spacing) => set({ spacing }),
      setSidebarPosition: (sidebarPosition) => set({ sidebarPosition }),
      setSidebarState: (sidebarState) => set({ sidebarState }),
      
      resetToDefaults: () => set({
        theme: 'light',
        colorPalette: 'red',
        textZoom: '100',
        layoutVariant: 'default',
        contentMaxWidth: 'xl',
        spacing: 'normal',
        sidebarPosition: 'left',
        sidebarState: 'icons',
      }),
    }),
    {
      name: 'app-settings',
    }
  )
);

function App() {
  const settings = useSettingsStore();

  return (
    <SettingsPanel
      isOpen={isOpen}
      onClose={handleClose}
      theme={settings.theme}
      onThemeChange={settings.setTheme}
      colorPalette={settings.colorPalette}
      onColorPaletteChange={settings.setColorPalette}
      textZoom={settings.textZoom}
      onTextZoomChange={settings.setTextZoom}
      layoutVariant={settings.layoutVariant}
      onLayoutVariantChange={settings.setLayoutVariant}
      contentMaxWidth={settings.contentMaxWidth}
      onContentMaxWidthChange={settings.setContentMaxWidth}
      spacing={settings.spacing}
      onSpacingChange={settings.setSpacing}
      sidebarPosition={settings.sidebarPosition}
      onSidebarPositionChange={settings.setSidebarPosition}
      sidebarState={settings.sidebarState}
      onSidebarStateChange={settings.setSidebarState}
      onResetToDefaults={settings.resetToDefaults}
    />
  );
}
```

## Real-World Examples

### Dashboard Application

```tsx
function DashboardApp() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'dark',
    colorPalette: 'blue',
    textZoom: '100',
    layoutVariant: 'default',
    contentMaxWidth: 'xl',
    spacing: 'normal',
    sidebarPosition: 'left',
    sidebarState: 'icons',
  });

  return (
    <div>
      <TopBar
        logo={<Logo />}
        links={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/analytics', label: 'Analytics' },
          { href: '/reports', label: 'Reports' },
        ]}
        actions={
          <IconButton
            icon={Settings}
            label="Settings"
            onClick={() => setShowSettings(true)}
          />
        }
      />
      
      <Sidebar position={settings.sidebarPosition}>
        {/* Sidebar content */}
      </Sidebar>
      
      <Container maxWidth={settings.contentMaxWidth} padding={6}>
        <h1>Dashboard</h1>
        {/* Dashboard content */}
      </Container>
      
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        theme={settings.theme}
        onThemeChange={(val) => setSettings({ ...settings, theme: val })}
        colorPalette={settings.colorPalette}
        onColorPaletteChange={(val) => setSettings({ ...settings, colorPalette: val })}
        textZoom={settings.textZoom}
        onTextZoomChange={(val) => setSettings({ ...settings, textZoom: val })}
        layoutVariant={settings.layoutVariant}
        onLayoutVariantChange={(val) => setSettings({ ...settings, layoutVariant: val })}
        contentMaxWidth={settings.contentMaxWidth}
        onContentMaxWidthChange={(val) => setSettings({ ...settings, contentMaxWidth: val })}
        spacing={settings.spacing}
        onSpacingChange={(val) => setSettings({ ...settings, spacing: val })}
        sidebarPosition={settings.sidebarPosition}
        onSidebarPositionChange={(val) => setSettings({ ...settings, sidebarPosition: val })}
        sidebarState={settings.sidebarState}
        onSidebarStateChange={(val) => setSettings({ ...settings, sidebarState: val })}
      />
    </div>
  );
}
```

### Content Management System

```tsx
function CMSApp() {
  const [showSettings, setShowSettings] = useState(false);
  
  // Persist settings to localStorage
  const [settings, setSettings] = useLocalStorage('cms-settings', {
    theme: 'light',
    colorPalette: 'neutral',
    textZoom: '100',
    layoutVariant: 'boxed',
    contentMaxWidth: 'lg',
    spacing: 'spacious',
    sidebarPosition: 'left',
    sidebarState: 'icons',
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <EditorToolbar
        onSettingsClick={() => setShowSettings(true)}
      />
      
      <EditorLayout
        sidebarPosition={settings.sidebarPosition}
        contentMaxWidth={settings.contentMaxWidth}
        spacing={settings.spacing}
      >
        {/* Editor content */}
      </EditorLayout>
      
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        theme={settings.theme}
        onThemeChange={(val) => updateSetting('theme', val)}
        colorPalette={settings.colorPalette}
        onColorPaletteChange={(val) => updateSetting('colorPalette', val)}
        textZoom={settings.textZoom}
        onTextZoomChange={(val) => updateSetting('textZoom', val)}
        layoutVariant={settings.layoutVariant}
        onLayoutVariantChange={(val) => updateSetting('layoutVariant', val)}
        contentMaxWidth={settings.contentMaxWidth}
        onContentMaxWidthChange={(val) => updateSetting('contentMaxWidth', val)}
        spacing={settings.spacing}
        onSpacingChange={(val) => updateSetting('spacing', val)}
        sidebarPosition={settings.sidebarPosition}
        onSidebarPositionChange={(val) => updateSetting('sidebarPosition', val)}
        sidebarState={settings.sidebarState}
        onSidebarStateChange={(val) => updateSetting('sidebarState', val)}
      />
    </>
  );
}
```

## Common Pitfalls

### 1. Missing Change Handlers

**Problem:**

```tsx
// Settings won't update - no handlers provided
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  theme={theme}
  // Missing: onThemeChange
/>
```

**Solution:**

```tsx
// Provide all required change handlers
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  theme={theme}
  onThemeChange={setTheme}
/>
```

### 2. Not Persisting Settings

**Problem:**

```tsx
// Settings reset on page reload
const [settings, setSettings] = useState({ theme: 'light' });
```

**Solution:**

```tsx
// Persist to localStorage
const [settings, setSettings] = useLocalStorage('settings', {
  theme: 'light',
});
```

### 3. Prop Drilling

**Problem:**

```tsx
// Passing settings through many levels
<App settings={settings}>
  <Layout settings={settings}>
    <Content settings={settings}>
      {/* Deep nesting */}
    </Content>
  </Layout>
</App>
```

**Solution:**

```tsx
// Use Context API or state management library
const SettingsContext = createContext();

function App() {
  return (
    <SettingsProvider>
      <Layout>
        <Content />
      </Layout>
    </SettingsProvider>
  );
}
```

### 4. Not Handling Edge Cases

**Problem:**

```tsx
// Crashes if textZoom is undefined
const fontSize = parseInt(textZoom);
```

**Solution:**

```tsx
// Provide defaults and validate
const fontSize = parseInt(textZoom || '100', 10);
```

### 5. Forgetting Reset Function

**Problem:**

```tsx
// No way for users to reset settings
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  // ... settings
  // Missing: onResetToDefaults
/>
```

**Solution:**

```tsx
// Provide reset functionality
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  // ... settings
  onResetToDefaults={resetToDefaults}
/>
```

### 6. Type Mismatches

**Problem:**

```tsx
// Wrong type for textZoom
onTextZoomChange={(val) => setTextZoom(val)}
// val is number, but textZoom expects string
```

**Solution:**

```tsx
// Convert types correctly
onTextZoomChange={(val) => setTextZoom(val.toString())}
```

## Accessibility

### Keyboard Navigation

Full keyboard support for all interactions:

**Global:**

- `Escape` - Close settings panel
- `Tab` - Navigate between settings
- `Shift + Tab` - Navigate backwards

**Controls:**

- `Space` / `Enter` - Activate buttons
- `Arrow keys` - Adjust slider values
- `Home` / `End` - Jump to slider min/max

### Focus Management

- **Focus trap** - Focus stays within panel when open
- **Initial focus** - Focuses close button on open
- **Focus restore** - Returns focus to trigger on close

### Screen Reader Support

All settings are properly announced:

```tsx
// Theme setting announced as:
// "Theme selection. Light button, selected"
// "Dark button, not selected"
// "Auto button, not selected"

// Text zoom announced as:
// "Text zoom selection, slider, 100%, minimum 100, maximum 200"
```

### ARIA Attributes

Comprehensive ARIA support:

```tsx
// Panel has proper ARIA labels
aria-labelledby="settings-title"
aria-modal="true"

// Controls have ARIA labels
aria-label="Theme selection"
aria-label="Text zoom selection"

// Buttons have pressed states
aria-pressed={theme === 'light'}
```

### Body Scroll Lock

Prevents background scrolling when panel is open:

```tsx
// Automatically managed by Drawer component
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}, [isOpen]);
```

### WCAG Compliance

**WCAG 2.2 Level AA+ Compliant:**

- ✅ Text contrast: 7:1 minimum (AAA)
- ✅ UI contrast: 3:1 minimum (AA)
- ✅ Touch targets: 44px minimum (AA)
- ✅ Text resize: Up to 200% (AA)
- ✅ Keyboard navigation: Full support (AA)
- ✅ Focus indicators: 3px solid outline (AA)
- ✅ Color independence: No color-only indicators (AA)

## API Reference

### Props

```typescript
interface SettingsPanelProps {
  /** Whether the panel is open */
  isOpen: boolean;
  
  /** Callback when panel should close */
  onClose: () => void;
  
  /** Theme value */
  theme?: "light" | "dark" | "auto";
  
  /** Theme change handler */
  onThemeChange?: (theme: "light" | "dark" | "auto") => void;
  
  /** Color palette value */
  colorPalette?: "red" | "blue" | "green" | "purple" | "neutral";
  
  /** Color palette change handler */
  onColorPaletteChange?: (
    palette: "red" | "blue" | "green" | "purple" | "neutral"
  ) => void;
  
  /** Text zoom value (percentage as string) */
  textZoom?: "100" | "130" | "150" | "200";
  
  /** Text zoom change handler */
  onTextZoomChange?: (zoom: "100" | "130" | "150" | "200") => void;
  
  /** Layout variant - controls content width behavior */
  layoutVariant?: "default" | "boxed" | "fluid";
  
  /** Layout variant change handler */
  onLayoutVariantChange?: (variant: "default" | "boxed" | "fluid") => void;
  
  /** Content max width - maximum content area width */
  contentMaxWidth?: "full" | "xl" | "lg" | "md";
  
  /** Content max width change handler */
  onContentMaxWidthChange?: (width: "full" | "xl" | "lg" | "md") => void;
  
  /** Spacing density - control padding/spacing throughout layout */
  spacing?: "compact" | "normal" | "spacious";
  
  /** Spacing change handler */
  onSpacingChange?: (spacing: "compact" | "normal" | "spacious") => void;
  
  /** Sidebar position - left or right side of layout */
  sidebarPosition?: "left" | "right";
  
  /** Sidebar position change handler */
  onSidebarPositionChange?: (position: "left" | "right") => void;
  
  /** Sidebar state - two-state architecture */
  sidebarState?: "icons" | "hidden";
  
  /** Sidebar state change handler */
  onSidebarStateChange?: (state: "icons" | "hidden") => void;
  
  /** Custom className */
  className?: string;
  
  /** Reset all settings to default values handler */
  onResetToDefaults?: () => void;
}
```

### Default Values

```typescript
{
  theme: "light",
  colorPalette: "red",
  textZoom: "100",
  layoutVariant: "default",
  contentMaxWidth: "xl",
  spacing: "normal",
  sidebarPosition: "left",
  sidebarState: "icons",
}
```

### Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Drawer, Stack, and SettingsCard
2. **Borders before shadows** - Clean section separators with 2px borders
3. **Typography before decoration** - Font weight creates hierarchy
4. **Tokens before magic numbers** - Uses design tokens throughout
5. **Composition before complexity** - Composed from smaller components
6. **Accessibility before aesthetics** - WCAG AA+ compliance first

### Theme Tokens Used

**Spacing:**

- `--theme-spacing-3` - Button gaps
- `--theme-spacing-4` - Header padding
- `--theme-spacing-5` - Stack gaps
- `--theme-spacing-6` - Section margins

**Typography:**

- `--theme-font-family` - Font family
- `--theme-font-weight-bold` (700) - Title weight
- `--theme-font-weight-semibold` (600) - Button text
- `--theme-text` - Primary text color
- `--theme-text-secondary` - Description color

**Borders:**

- `--theme-border-width` (2px) - Border width
- `--theme-border-strong` - Border color
- `--theme-radius-subtle` (8px) - Border radius

**Colors:**

- `--theme-surface` - Background
- `--theme-surface-hover` - Hover background
- `--theme-primary` - Primary color
- `--theme-border` - Border color

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

### Related Components

- `Drawer` - Base slide-out panel
- `SettingsCard` - Individual setting sections
- `SettingItem` - Setting row layout
- `Button` - Action buttons
- `ButtonGroup` - Option groups
- `Slider` - Text zoom control
- `Stack` - Vertical spacing

### Icons Used

From `@spexop/icons`:

- `Sun` - Light theme indicator
- `Moon` - Dark theme indicator
- `Monitor` - Auto theme indicator
- `X` - Close button
- `RotateCcw` - Reset button

## License

MIT
