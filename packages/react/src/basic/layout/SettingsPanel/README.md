# SettingsPanel Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A comprehensive settings panel that slides in from the right as a drawer. Features theme selection, layout controls, spacing options, and sidebar configuration with organized sections.

## Features

- ✅ Slide-in drawer interface
- ✅ Theme selection (light, dark, auto)
- ✅ Color palette chooser
- ✅ Text zoom control (100-200%)
- ✅ Layout width options
- ✅ Content width control
- ✅ Spacing density
- ✅ Sidebar position and visibility
- ✅ Reset to defaults
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { SettingsPanel } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Settings
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

## Theme Settings

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  theme={theme}
  onThemeChange={setTheme}
  colorPalette={colorPalette}
  onColorPaletteChange={setColorPalette}
/>
```

## Layout Settings

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  layoutVariant={layoutVariant}
  onLayoutVariantChange={setLayoutVariant}
  contentMaxWidth={contentMaxWidth}
  onContentMaxWidthChange={setContentMaxWidth}
  spacing={spacing}
  onSpacingChange={setSpacing}
/>
```

## Sidebar Settings

```tsx
<SettingsPanel
  isOpen={isOpen}
  onClose={handleClose}
  sidebarPosition={sidebarPosition}
  onSidebarPositionChange={setSidebarPosition}
  sidebarState={sidebarState}
  onSidebarStateChange={setSidebarState}
/>
```

## Complete Example

```tsx
function AppWithSettings() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    colorPalette: 'blue',
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
        onThemeChange={(value) => updateSetting('theme', value)}
        colorPalette={settings.colorPalette}
        onColorPaletteChange={(value) => updateSetting('colorPalette', value)}
        textZoom={settings.textZoom}
        onTextZoomChange={(value) => updateSetting('textZoom', value)}
        layoutVariant={settings.layoutVariant}
        onLayoutVariantChange={(value) => updateSetting('layoutVariant', value)}
        contentMaxWidth={settings.contentMaxWidth}
        onContentMaxWidthChange={(value) => updateSetting('contentMaxWidth', value)}
        spacing={settings.spacing}
        onSpacingChange={(value) => updateSetting('spacing', value)}
        sidebarPosition={settings.sidebarPosition}
        onSidebarPositionChange={(value) => updateSetting('sidebarPosition', value)}
        sidebarState={settings.sidebarState}
        onSidebarStateChange={(value) => updateSetting('sidebarState', value)}
        onResetToDefaults={resetToDefaults}
      />
    </>
  );
}
```

## Settings Sections

### Theme Section
- Light, Dark, Auto options
- Visual theme switcher with icons

### Color Palette Section
- Red, Blue, Green, Purple, Neutral
- Visual color indicators

### Layout Width Section
- Default, Boxed, Fluid options
- Controls overall layout behavior

### Content Width Section
- Full, XL, L, M options
- Controls max content width

### Spacing Section
- Compact, Normal, Spacious
- Affects padding throughout

### Sidebar Position Section
- Left, Right options
- Controls sidebar placement

### Sidebar Visibility Section
- Show (icons mode), Hide options
- Two-state architecture

### Text Zoom Section
- 100-200% range
- WCAG 2.2 AA compliance
- Slider with percentage display

## Props

```typescript
interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark" | "auto";
  onThemeChange?: (theme: "light" | "dark" | "auto") => void;
  colorPalette?: "red" | "blue" | "green" | "purple" | "neutral";
  onColorPaletteChange?: (palette: "red" | "blue" | "green" | "purple" | "neutral") => void;
  textZoom?: "100" | "130" | "150" | "200";
  onTextZoomChange?: (zoom: "100" | "130" | "150" | "200") => void;
  layoutVariant?: "default" | "boxed" | "fluid";
  onLayoutVariantChange?: (variant: "default" | "boxed" | "fluid") => void;
  contentMaxWidth?: "full" | "xl" | "lg" | "md";
  onContentMaxWidthChange?: (width: "full" | "xl" | "lg" | "md") => void;
  spacing?: "compact" | "normal" | "spacious";
  onSpacingChange?: (spacing: "compact" | "normal" | "spacious") => void;
  sidebarPosition?: "left" | "right";
  onSidebarPositionChange?: (position: "left" | "right") => void;
  sidebarState?: "icons" | "hidden";
  onSidebarStateChange?: (state: "icons" | "hidden") => void;
  className?: string;
  onResetToDefaults?: () => void;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Drawer, Stack, and SettingsCard
2. **Borders before shadows** - Clean section separators
3. **Typography before decoration** - Clear section titles
4. **Tokens before magic numbers** - Uses design tokens throughout
5. **Accessibility before aesthetics** - Full keyboard and screen reader support

## Accessibility

- ✅ Focus trap when open
- ✅ Escape key closes panel
- ✅ Body scroll lock
- ✅ ARIA labels for all controls
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Escape` - Close settings panel
- `Tab` - Navigate through settings
- `Space/Enter` - Toggle/select options

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Drawer` - Slide-out panel base
- `SettingsCard` - Individual setting sections
- `SettingItem` - Setting row layout
- `SegmentedControl` - Option selector

## Best Practices

1. **Organize by category** - Group related settings
2. **Provide reset** - Allow users to revert changes
3. **Show current values** - Clear indication of active settings
4. **Save automatically** - No explicit save button needed
5. **Accessibility settings** - Include text zoom and high contrast

## License

MIT

