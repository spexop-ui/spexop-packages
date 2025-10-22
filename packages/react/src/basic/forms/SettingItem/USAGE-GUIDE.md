# SettingItem Component - Comprehensive Usage Guide

Version: 0.2.0
Package: @spexop/react
Status: Production Ready

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Basic Usage](#basic-usage)
- [Advanced Patterns](#advanced-patterns)
- [Integration Examples](#integration-examples)
- [Real-World Examples](#real-world-examples)
- [Common Pitfalls](#common-pitfalls)
- [Accessibility](#accessibility)
- [API Reference](#api-reference)

## Overview

SettingItem is a layout wrapper component that provides consistent structure for individual settings. It pairs a label with a control element (Toggle, Select, Slider, etc.) and handles accessibility automatically.

### When to Use SettingItem

- Individual settings in a settings panel
- Form-like preference controls
- User profile configuration
- Application settings pages
- Feature toggles with descriptions

### When NOT to Use SettingItem

- Simple form inputs (use native form elements)
- Complex multi-field forms (use form components)
- Data entry forms (use form primitives)
- When custom layout is required

## Core Concepts

### Label-Control Association

SettingItem automatically associates labels with controls using the `htmlFor` attribute and unique IDs. This is crucial for accessibility.

```tsx
<SettingItem label="Enable notifications">
  <Toggle checked={enabled} onChange={setEnabled} />
</SettingItem>

// Renders with proper association:
// <label for="auto-generated-id">Enable notifications</label>
// <Toggle id="auto-generated-id" ... />
```

### Description Text

Optional description text provides additional context or help information:

```tsx
<SettingItem
  label="Auto-save"
  description="Automatically save your work every 5 minutes"
>
  <Toggle checked={autoSave} onChange={setAutoSave} />
</SettingItem>
```

### Disabled State

The disabled prop affects both visual styling and accessibility:

```tsx
<SettingItem
  label="Premium Feature"
  description="Upgrade to access this feature"
  disabled={!isPremium}
>
  <Toggle checked={false} onChange={() => {}} disabled={!isPremium} />
</SettingItem>
```

## Basic Usage

### With Toggle

```tsx
import { SettingItem, Toggle } from '@spexop/react';
import { useState } from 'react';

function NotificationSettings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  
  return (
    <SettingItem
      label="Email notifications"
      description="Receive updates via email"
    >
      <Toggle
        checked={emailNotifs}
        onChange={setEmailNotifs}
      />
    </SettingItem>
  );
}
```

### With Select

```tsx
import { SettingItem, Select } from '@spexop/react';
import { useState } from 'react';

function LanguageSettings() {
  const [language, setLanguage] = useState('en');
  
  return (
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
        <option value="de">German</option>
      </Select>
    </SettingItem>
  );
}
```

### With Slider

```tsx
import { SettingItem, Slider } from '@spexop/react';
import { useState } from 'react';

function TextSizeSettings() {
  const [textSize, setTextSize] = useState(100);
  
  return (
    <SettingItem
      label="Text size"
      description="Adjust text size for better readability"
    >
      <Slider
        value={textSize}
        onChange={setTextSize}
        min={100}
        max={200}
        step={10}
        showValue={true}
        formatValue={(val) => `${val}%`}
      />
    </SettingItem>
  );
}
```

### With SegmentedControl

```tsx
import { SettingItem, SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function ThemeSettings() {
  const [theme, setTheme] = useState('light');
  
  return (
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
  );
}
```

### With TextInput

```tsx
import { SettingItem, TextInput } from '@spexop/react';
import { useState } from 'react';

function ProfileSettings() {
  const [displayName, setDisplayName] = useState('');
  
  return (
    <SettingItem
      label="Display name"
      description="How others will see your name"
    >
      <TextInput
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Enter your name"
      />
    </SettingItem>
  );
}
```

## Advanced Patterns

### Grouped Settings

Use Stack to group related settings:

```tsx
import { SettingItem, Toggle, Stack } from '@spexop/react';

function PrivacySettings() {
  const [settings, setSettings] = useState({
    showEmail: false,
    showPhone: false,
    showAddress: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Stack direction="vertical" gap={4}>
      <SettingItem
        label="Show email"
        description="Display email on your public profile"
      >
        <Toggle
          checked={settings.showEmail}
          onChange={(val) => updateSetting('showEmail', val)}
        />
      </SettingItem>
      
      <SettingItem
        label="Show phone"
        description="Display phone number on your public profile"
      >
        <Toggle
          checked={settings.showPhone}
          onChange={(val) => updateSetting('showPhone', val)}
        />
      </SettingItem>
      
      <SettingItem
        label="Show address"
        description="Display address on your public profile"
      >
        <Toggle
          checked={settings.showAddress}
          onChange={(val) => updateSetting('showAddress', val)}
        />
      </SettingItem>
    </Stack>
  );
}
```

### Within SettingsCard

```tsx
import { SettingsCard, SettingItem, Toggle, Stack } from '@spexop/react';

function NotificationCard() {
  return (
    <SettingsCard
      title="NOTIFICATIONS"
      description="Manage how you receive notifications"
    >
      <Stack direction="vertical" gap={4}>
        <SettingItem label="Email notifications">
          <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
        </SettingItem>
        
        <SettingItem label="Push notifications">
          <Toggle checked={pushNotifs} onChange={setPushNotifs} />
        </SettingItem>
        
        <SettingItem label="SMS notifications">
          <Toggle checked={smsNotifs} onChange={setSmsNotifs} />
        </SettingItem>
      </Stack>
    </SettingsCard>
  );
}
```

### Conditional Settings

Show/hide settings based on other settings:

```tsx
function ConditionalSettings() {
  const [enabled, setEnabled] = useState(false);
  const [frequency, setFrequency] = useState('daily');

  return (
    <Stack direction="vertical" gap={4}>
      <SettingItem
        label="Enable backups"
        description="Automatically backup your data"
      >
        <Toggle checked={enabled} onChange={setEnabled} />
      </SettingItem>
      
      {enabled && (
        <SettingItem
          label="Backup frequency"
          description="How often to create backups"
        >
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </Select>
        </SettingItem>
      )}
    </Stack>
  );
}
```

### Custom ID for External Control

```tsx
function CustomIdExample() {
  return (
    <SettingItem
      id="custom-toggle-id"
      label="Custom setting"
      description="Setting with custom ID"
    >
      <Toggle id="custom-toggle-id" checked={value} onChange={setValue} />
    </SettingItem>
  );
}
```

### Multiple Controls

```tsx
function RangeSettings() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  return (
    <SettingItem
      label="Price range"
      description="Set minimum and maximum price"
    >
      <Stack direction="horizontal" gap={3}>
        <TextInput
          type="number"
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
          placeholder="Min"
        />
        <span>to</span>
        <TextInput
          type="number"
          value={max}
          onChange={(e) => setMax(Number(e.target.value))}
          placeholder="Max"
        />
      </Stack>
    </SettingItem>
  );
}
```

## Integration Examples

### Complete Settings Form

```tsx
import { SettingItem, SettingsCard, Toggle, Select, Slider, Stack, Container } from '@spexop/react';
import { useState } from 'react';

function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    theme: 'light',
    language: 'en',
    textSize: 100,
    privacy: {
      showEmail: false,
      showPhone: false,
    },
  });

  const updateSetting = (path: string, value: any) => {
    setSettings(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  return (
    <Container maxWidth="lg" padding={6}>
      <h1>Settings</h1>
      
      <Stack direction="vertical" gap={6}>
        <SettingsCard
          title="PREFERENCES"
          description="Customize your experience"
        >
          <Stack direction="vertical" gap={4}>
            <SettingItem
              label="Notifications"
              description="Receive email notifications"
            >
              <Toggle
                checked={settings.notifications}
                onChange={(val) => updateSetting('notifications', val)}
              />
            </SettingItem>
            
            <SettingItem
              label="Auto-save"
              description="Automatically save your work"
            >
              <Toggle
                checked={settings.autoSave}
                onChange={(val) => updateSetting('autoSave', val)}
              />
            </SettingItem>
          </Stack>
        </SettingsCard>
        
        <SettingsCard
          title="APPEARANCE"
          description="Customize how the app looks"
        >
          <Stack direction="vertical" gap={4}>
            <SettingItem
              label="Theme"
              description="Choose your color theme"
            >
              <Select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </Select>
            </SettingItem>
            
            <SettingItem
              label="Text size"
              description="Adjust text size for better readability"
            >
              <Slider
                value={settings.textSize}
                onChange={(val) => updateSetting('textSize', val)}
                min={100}
                max={200}
                step={10}
                showValue={true}
                formatValue={(val) => `${val}%`}
              />
            </SettingItem>
          </Stack>
        </SettingsCard>
        
        <SettingsCard
          title="PRIVACY"
          description="Control your privacy settings"
        >
          <Stack direction="vertical" gap={4}>
            <SettingItem
              label="Show email"
              description="Display email on public profile"
            >
              <Toggle
                checked={settings.privacy.showEmail}
                onChange={(val) => updateSetting('privacy.showEmail', val)}
              />
            </SettingItem>
            
            <SettingItem
              label="Show phone"
              description="Display phone on public profile"
            >
              <Toggle
                checked={settings.privacy.showPhone}
                onChange={(val) => updateSetting('privacy.showPhone', val)}
              />
            </SettingItem>
          </Stack>
        </SettingsCard>
      </Stack>
    </Container>
  );
}
```

### With Form Validation

```tsx
function ValidatedSettings() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value: string) => {
    if (!value.includes('@')) {
      setError('Invalid email address');
    } else {
      setError('');
    }
    setEmail(value);
  };

  return (
    <SettingItem
      label="Email address"
      description={error || "Your contact email"}
    >
      <TextInput
        value={email}
        onChange={(e) => validateEmail(e.target.value)}
        error={!!error}
      />
    </SettingItem>
  );
}
```

## Real-World Examples

### User Profile Settings

```tsx
function UserProfileSettings() {
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    website: '',
    location: '',
    timezone: 'UTC',
  });

  return (
    <SettingsCard title="PROFILE" description="Manage your public profile">
      <Stack direction="vertical" gap={4}>
        <SettingItem
          label="Display name"
          description="How others see your name"
        >
          <TextInput
            value={profile.displayName}
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
            placeholder="Enter your name"
          />
        </SettingItem>
        
        <SettingItem
          label="Bio"
          description="Tell others about yourself"
        >
          <TextArea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            placeholder="Write a short bio"
            rows={3}
          />
        </SettingItem>
        
        <SettingItem
          label="Timezone"
          description="Your local timezone"
        >
          <Select
            value={profile.timezone}
            onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
          </Select>
        </SettingItem>
      </Stack>
    </SettingsCard>
  );
}
```

### Accessibility Settings

```tsx
function AccessibilitySettings() {
  const [a11y, setA11y] = useState({
    textZoom: 100,
    highContrast: false,
    reduceMotion: false,
    screenReader: false,
  });

  return (
    <SettingsCard
      title="ACCESSIBILITY"
      description="Customize accessibility features"
    >
      <Stack direction="vertical" gap={4}>
        <SettingItem
          label="Text zoom"
          description="Adjust text size (WCAG 2.2 AA requires up to 200%)"
        >
          <Slider
            value={a11y.textZoom}
            onChange={(val) => setA11y({ ...a11y, textZoom: val })}
            min={100}
            max={200}
            step={10}
            showValue={true}
            formatValue={(val) => `${val}%`}
          />
        </SettingItem>
        
        <SettingItem
          label="High contrast"
          description="Increase contrast for better visibility"
        >
          <Toggle
            checked={a11y.highContrast}
            onChange={(val) => setA11y({ ...a11y, highContrast: val })}
          />
        </SettingItem>
        
        <SettingItem
          label="Reduce motion"
          description="Minimize animations and transitions"
        >
          <Toggle
            checked={a11y.reduceMotion}
            onChange={(val) => setA11y({ ...a11y, reduceMotion: val })}
          />
        </SettingItem>
        
        <SettingItem
          label="Screen reader optimizations"
          description="Enable additional screen reader features"
        >
          <Toggle
            checked={a11y.screenReader}
            onChange={(val) => setA11y({ ...a11y, screenReader: val })}
          />
        </SettingItem>
      </Stack>
    </SettingsCard>
  );
}
```

## Common Pitfalls

### 1. Not Passing ID to Control

**Problem:**

```tsx
// Control won't be properly associated
<SettingItem id="my-toggle" label="Setting">
  <Toggle checked={value} onChange={setValue} />
</SettingItem>
```

**Solution:**

```tsx
// Pass the same ID to the control
<SettingItem id="my-toggle" label="Setting">
  <Toggle id="my-toggle" checked={value} onChange={setValue} />
</SettingItem>
```

**Better: Let SettingItem auto-generate the ID:**

```tsx
// SettingItem handles ID generation automatically
<SettingItem label="Setting">
  <Toggle checked={value} onChange={setValue} />
</SettingItem>
```

### 2. Inconsistent Disabled States

**Problem:**

```tsx
// Only disabling the item, not the control
<SettingItem label="Setting" disabled={true}>
  <Toggle checked={value} onChange={setValue} />
</SettingItem>
```

**Solution:**

```tsx
// Disable both item and control
<SettingItem label="Setting" disabled={!isPremium}>
  <Toggle
    checked={value}
    onChange={setValue}
    disabled={!isPremium}
  />
</SettingItem>
```

### 3. Missing Description for Complex Settings

**Problem:**

```tsx
// No context for what this setting does
<SettingItem label="Data retention">
  <Select value={days} onChange={handleChange}>
    <option value="7">7 days</option>
    <option value="30">30 days</option>
    <option value="90">90 days</option>
  </Select>
</SettingItem>
```

**Solution:**

```tsx
// Provide helpful description
<SettingItem
  label="Data retention"
  description="How long to keep your data before automatic deletion"
>
  <Select value={days} onChange={handleChange}>
    <option value="7">7 days</option>
    <option value="30">30 days</option>
    <option value="90">90 days</option>
  </Select>
</SettingItem>
```

### 4. Using for Non-Setting Controls

**Problem:**

```tsx
// Don't use SettingItem for form submission
<SettingItem label="Submit">
  <Button type="submit">Save Changes</Button>
</SettingItem>
```

**Solution:**

```tsx
// Place submit buttons outside SettingItem
<Stack direction="vertical" gap={4}>
  <SettingItem label="Name">
    <TextInput value={name} onChange={setName} />
  </SettingItem>
  
  <Button type="submit">Save Changes</Button>
</Stack>
```

### 5. Overcomplicating Simple Settings

**Problem:**

```tsx
// Too much nesting for a simple toggle
<Container>
  <Stack>
    <SettingsCard>
      <SettingItem label="Enable">
        <Toggle checked={enabled} onChange={setEnabled} />
      </SettingItem>
    </SettingsCard>
  </Stack>
</Container>
```

**Solution:**

```tsx
// Keep it simple for single settings
<SettingItem label="Enable">
  <Toggle checked={enabled} onChange={setEnabled} />
</SettingItem>
```

## Accessibility

### Label Association

SettingItem automatically creates proper label-control association:

```tsx
// Automatically generates and associates IDs
<SettingItem label="Notifications">
  <Toggle checked={enabled} onChange={setEnabled} />
</SettingItem>

// Results in proper HTML:
// <label for="react-id-1">Notifications</label>
// <toggle id="react-id-1" ...>
```

### Description as Help Text

Descriptions are associated with controls using `aria-describedby`:

```tsx
<SettingItem
  label="Password"
  description="Must be at least 8 characters"
>
  <TextInput type="password" />
</SettingItem>
```

### Disabled State Announcement

The disabled attribute is properly announced by screen readers:

```tsx
<SettingItem
  label="Premium Feature"
  description="Upgrade to unlock"
  disabled={!isPremium}
>
  <Toggle checked={false} onChange={() => {}} disabled={!isPremium} />
</SettingItem>
```

### Keyboard Navigation

All controls within SettingItem support full keyboard navigation:

- `Tab` - Move between settings
- `Space` - Toggle switches
- `Enter` - Activate controls
- `Arrow keys` - Navigate select options and sliders

### Screen Reader Support

SettingItem provides excellent screen reader experience:

- Labels are announced with controls
- Descriptions provide additional context
- Disabled state is clearly communicated
- Focus order is logical

## API Reference

### Props

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

### Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Simple layout wrapper for label-control pairing
2. **Typography before decoration** - Font weight creates hierarchy between label and description
3. **Tokens before magic numbers** - Uses spacing tokens (spacing-2, spacing-3, spacing-4)
4. **Accessibility before aesthetics** - Proper label association, disabled states, ARIA support

### Theme Tokens Used

**Spacing:**

- `--theme-spacing-2` (8px) - Description gap
- `--theme-spacing-3` (12px) - Item gap
- `--theme-spacing-4` (16px) - Vertical padding

**Typography:**

- `--theme-font-family` - Font family
- `--theme-font-weight-semibold` (600) - Label weight
- `--theme-text` - Label color
- `--theme-text-secondary` - Description color

**Accessibility:**

- Opacity 0.5 for disabled state
- WCAG AAA contrast (7:1) for description
- WCAG AAA contrast (15:1) for label

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

### Related Components

- `SettingsCard` - Container for grouped settings
- `SettingsPanel` - Full settings drawer
- `Toggle` - Common setting control
- `Select` - Dropdown control
- `Slider` - Range control
- `SegmentedControl` - Multi-option control

## License

MIT
