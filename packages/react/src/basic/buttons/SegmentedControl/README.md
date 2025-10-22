# SegmentedControl Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready  
**Author**: @olmstedian | @spexop

## Overview

A modern, accessible segmented control for selecting between multiple mutually exclusive options. Following "The Spexop Way" with refined minimalism, border-based design, and typography-driven hierarchy. Perfect for theme selection, view modes, filters, and settings panels.

## Features

- ✅ Multiple options with visual selection state
- ✅ Optional icons from @spexop/icons
- ✅ Full keyboard navigation (Arrow keys, Home, End)
- ✅ WCAG AA+ accessible (ARIA, focus management)
- ✅ Roving tabindex pattern for efficient navigation
- ✅ Individual option disable support
- ✅ Entire control disable support
- ✅ Mobile-responsive with touch-friendly 44px targets
- ✅ Theme-aware styling using design tokens
- ✅ Smooth animations with reduced motion support
- ✅ TypeScript support with full type safety
- ✅ Comprehensive test coverage
- ✅ Complete USAGE-GUIDE.md documentation

For detailed usage examples and integration patterns, see [USAGE-GUIDE.md](./USAGE-GUIDE.md).

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('list');
  
  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
        { value: 'table', label: 'Table' },
      ]}
      aria-label="View mode"
    />
  );
}
```

## With Icons

```tsx
import { List, Grid, Table } from '@spexop/icons';

<SegmentedControl
  value={viewMode}
  onChange={setViewMode}
  options={[
    { value: 'list', label: 'List', icon: <List size={16} /> },
    { value: 'grid', label: 'Grid', icon: <Grid size={16} /> },
    { value: 'table', label: 'Table', icon: <Table size={16} /> },
  ]}
  aria-label="View mode selection"
/>
```

## Disabled State

### Entire Control

```tsx
<SegmentedControl
  value={value}
  onChange={setValue}
  options={options}
  disabled={true}
/>
```

### Individual Options

```tsx
<SegmentedControl
  value={theme}
  onChange={setTheme}
  options={[
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto', disabled: true },
  ]}
/>
```

## Common Patterns

### Theme Selector

```tsx
import { Sun, Moon, Monitor } from '@spexop/icons';

function ThemeSelector() {
  const [theme, setTheme] = useState('light');

  return (
    <SegmentedControl
      value={theme}
      onChange={setTheme}
      options={[
        { 
          value: 'light', 
          label: 'Light',
          icon: <Sun size={16} />
        },
        { 
          value: 'dark', 
          label: 'Dark',
          icon: <Moon size={16} />
        },
        { 
          value: 'auto', 
          label: 'Auto',
          icon: <Monitor size={16} />
        },
      ]}
      aria-label="Theme selection"
    />
  );
}
```

### View Mode Toggle

```tsx
import { List, Grid, LayoutGrid } from '@spexop/icons';

function ViewModeControl() {
  const [viewMode, setViewMode] = useState('list');

  return (
    <SegmentedControl
      value={viewMode}
      onChange={setViewMode}
      options={[
        { value: 'list', label: 'List', icon: <List size={16} /> },
        { value: 'grid', label: 'Grid', icon: <Grid size={16} /> },
        { value: 'gallery', label: 'Gallery', icon: <LayoutGrid size={16} /> },
      ]}
      aria-label="Change view mode"
    />
  );
}
```

### Sort Control

```tsx
function SortControl() {
  const [sortBy, setSortBy] = useState('recent');

  return (
    <SegmentedControl
      value={sortBy}
      onChange={setSortBy}
      options={[
        { value: 'recent', label: 'Recent' },
        { value: 'popular', label: 'Popular' },
        { value: 'trending', label: 'Trending' },
      ]}
      aria-label="Sort by"
    />
  );
}
```

### Filter Tabs

```tsx
function StatusFilter() {
  const [status, setStatus] = useState('all');
  const counts = { all: 42, active: 28, completed: 14 };

  return (
    <SegmentedControl
      value={status}
      onChange={setStatus}
      options={[
        { value: 'all', label: `All (${counts.all})` },
        { value: 'active', label: `Active (${counts.active})` },
        { value: 'completed', label: `Completed (${counts.completed})` },
      ]}
      aria-label="Filter by status"
    />
  );
}
```

### Settings Panel

```tsx
function SettingsPanel() {
  const [theme, setTheme] = useState('light');
  const [layout, setLayout] = useState('default');

  return (
    <Stack direction="vertical" gap={6}>
      <div>
        <label>Theme</label>
        <SegmentedControl
          value={theme}
          onChange={setTheme}
          options={[
            { value: 'light', label: 'Light', icon: <Sun size={16} /> },
            { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
            { value: 'auto', label: 'Auto', icon: <Monitor size={16} /> },
          ]}
        />
      </div>
      
      <div>
        <label>Layout</label>
        <SegmentedControl
          value={layout}
          onChange={setLayout}
          options={[
            { value: 'default', label: 'Default' },
            { value: 'boxed', label: 'Boxed' },
            { value: 'fluid', label: 'Fluid' },
          ]}
        />
      </div>
    </Stack>
  );
}
```

## Props

```typescript
interface SegmentedControlProps {
  /** Current selected value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Available options */
  options: SegmentedControlOption[];
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** ID for the control group */
  id?: string;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ARIA labelledby for accessibility */
  "aria-labelledby"?: string;
}

interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Simple button group composition
2. **Borders before shadows** - Clean 1-2px borders, no heavy shadows
3. **Typography before decoration** - Font weight (600) for hierarchy, high contrast text
4. **Tokens before magic numbers** - All values from @spexop/theme system
5. **Composition before complexity** - Built from simple, reusable parts
6. **Standards before frameworks** - Web platform fundamentals (role="radiogroup")
7. **Accessibility before aesthetics** - WCAG AA+ compliant, full keyboard navigation

### Refined Minimalism Applied

- Border-based separation with clear visual hierarchy
- Typography-driven selection state (font weight, not color fading)
- High-contrast colors for accessibility (7:1+ contrast ratio)
- Generous whitespace for breathing room
- Minimal decoration with purposeful focus indicators

## Accessibility

- ✅ ARIA role="radiogroup"
- ✅ Proper radio button pattern (role="radio")
- ✅ Keyboard navigation (Arrow keys, Home, End)
- ✅ Focus management (roving tabindex)
- ✅ Screen reader announcements
- ✅ Disabled state indication
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Arrow Left/Up` - Select previous option
- `Arrow Right/Down` - Select next option
- `Home` - Select first option
- `End` - Select last option
- `Tab` - Move focus to/from control

## Animation

- **Selection indicator** - Smooth slide animation (200ms)
- **Hover effect** - Subtle background change
- **Active state** - Clear visual feedback

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `SegmentedButton` - Similar but different use case
- `RadioGroup` - Traditional radio buttons
- `Tabs` - Content switching
- `Toggle` - Binary on/off

## When to Use

Use SegmentedControl when you need:

- 2-5 mutually exclusive options
- Visual button group for quick switching
- Theme or preference selection
- View mode toggles (list/grid/table)
- Filter or sort controls
- Settings panels with multiple choices

Consider alternatives when:

- **More than 5 options**: Use Select/Dropdown instead
- **Binary toggle**: Use Toggle or Switch component
- **Content switching**: Use Tabs component
- **Traditional forms**: Use RadioGroup component
- **Page navigation**: Use Navigation or Tabs component

## Best Practices

1. **Keep options count low (2-5)** - Too many options become hard to scan and use
2. **Use short, clear labels** - One or two words ideal, avoid long descriptions
3. **Be consistent with icons** - Either all options have icons or none do
4. **Always provide aria-label** - Essential for screen reader accessibility
5. **Consider mobile layout** - Ensure options fit on small screens (320px+)
6. **Use meaningful values** - Value prop should be semantic, not just "option1"
7. **Provide default selection** - Always have a selected option, avoid undefined
8. **Handle state properly** - Use controlled component pattern with useState
9. **Test keyboard navigation** - Verify arrow keys work correctly
10. **Check color contrast** - Ensure WCAG AA+ compliance in your theme

## License

MIT
