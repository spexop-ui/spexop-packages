# SettingItem Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A layout wrapper component for individual settings. Provides consistent label-control pairing with optional description and proper accessibility.

## Features

- ✅ Label and control layout
- ✅ Optional description text
- ✅ Disabled state styling
- ✅ Accessible label-control association
- ✅ Consistent spacing
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { SettingItem, Toggle } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <SettingItem
      label="Notifications"
      description="Receive email notifications"
    >
      <Toggle
        checked={enabled}
        onChange={setEnabled}
      />
    </SettingItem>
  );
}
```

## With Different Controls

### With Toggle

```tsx
<SettingItem
  label="Dark Mode"
  description="Enable dark theme"
>
  <Toggle
    checked={darkMode}
    onChange={setDarkMode}
  />
</SettingItem>
```

### With Select

```tsx
<SettingItem
  label="Language"
  description="Choose your preferred language"
>
  <Select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
  >
    <option value="en">English</option>
    <option value="es">Spanish</option>
    <option value="fr">French</option>
  </Select>
</SettingItem>
```

### With Slider

```tsx
<SettingItem
  label="Text Size"
  description="Adjust text size for better readability"
>
  <Slider
    value={textSize}
    onChange={setTextSize}
    min={100}
    max={200}
    showValue={true}
    formatValue={(val) => `${val}%`}
  />
</SettingItem>
```

### With SegmentedControl

```tsx
<SettingItem
  label="Theme"
  description="Choose your color theme"
>
  <SegmentedControl
    value={theme}
    onChange={setTheme}
    options={[
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'auto', label: 'Auto' },
    ]}
  />
</SettingItem>
```

## Disabled State

```tsx
<SettingItem
  label="Premium Feature"
  description="Upgrade to access this feature"
  disabled={true}
>
  <Toggle
    checked={false}
    onChange={() => {}}
    disabled={true}
  />
</SettingItem>
```

## Common Patterns

### Settings Form

```tsx
function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    theme: 'light',
    language: 'en',
    textSize: 100,
  });

  return (
    <Stack direction="vertical" gap={4}>
      <SettingItem
        label="Notifications"
        description="Receive email notifications"
      >
        <Toggle
          checked={settings.notifications}
          onChange={(val) =>
            setSettings({ ...settings, notifications: val })
          }
        />
      </SettingItem>
      
      <SettingItem
        label="Auto-save"
        description="Automatically save your work"
      >
        <Toggle
          checked={settings.autoSave}
          onChange={(val) =>
            setSettings({ ...settings, autoSave: val })
          }
        />
      </SettingItem>
      
      <SettingItem
        label="Theme"
        description="Choose your color theme"
      >
        <Select
          value={settings.theme}
          onChange={(e) =>
            setSettings({ ...settings, theme: e.target.value })
          }
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </Select>
      </SettingItem>
    </Stack>
  );
}
```

### Grouped Settings

```tsx
<SettingsCard title="Preferences">
  <Stack direction="vertical" gap={4}>
    <SettingItem
      label="Show tooltips"
      description="Display helpful hints throughout the app"
    >
      <Toggle checked={showTooltips} onChange={setShowTooltips} />
    </SettingItem>
    
    <SettingItem
      label="Compact mode"
      description="Reduce spacing for denser layouts"
    >
      <Toggle checked={compactMode} onChange={setCompactMode} />
    </SettingItem>
  </Stack>
</SettingsCard>
```

## Props

```typescript
interface SettingItemProps {
  /** Label for the setting */
  label: string;
  /** Optional description/help text */
  description?: string;
  /** The control element (Select, Toggle, etc.) */
  children: React.ReactNode;
  /** Whether the setting is disabled */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** ID for the control element (auto-generated if not provided) */
  id?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Simple layout wrapper
2. **Typography before decoration** - Clear label hierarchy
3. **Tokens before magic numbers** - Uses spacing tokens
4. **Accessibility before aesthetics** - Proper label association

## Accessibility

- ✅ Proper label-control association
- ✅ Description linked to control
- ✅ Disabled state styling
- ✅ Screen reader support
- ✅ Focus management

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `SettingsCard` - Settings section wrapper
- `SettingsPanel` - Full settings drawer
- `Toggle` - Common setting control
- `Select` - Dropdown setting control

## License

MIT
