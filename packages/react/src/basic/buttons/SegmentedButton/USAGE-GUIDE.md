# SegmentedButton Component - Complete Usage Guide

**Component Version**: v0.3.0
**Last Updated**: January 20, 2025
**Package**: @spexop/react
**Status**: Production Ready

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [Basic Usage](#basic-usage)
5. [View Switchers](#view-switchers)
6. [Filter Controls](#filter-controls)
7. [Icon Integration](#icon-integration)
8. [State Management](#state-management)
9. [Keyboard Navigation](#keyboard-navigation)
10. [Accessibility](#accessibility)
11. [Advanced Patterns](#advanced-patterns)
12. [Best Practices](#best-practices)
13. [API Reference](#api-reference)

## Overview

SegmentedButton is a radio-style button group component that allows users to select one option from a set of mutually exclusive choices. It implements the WAI-ARIA radiogroup pattern with full keyboard navigation support.

### When to Use

Use SegmentedButton when you need:

- View mode switchers (list/grid/table)
- Filter controls with exclusive options
- Time range selectors (day/week/month/year)
- Display preferences (compact/comfortable/spacious)
- Sort order toggles (ascending/descending)
- Category selectors
- Theme switchers (light/dark/auto)

### When Not to Use

Consider alternatives when you need:

- **Multiple selections**: Use CheckboxGroup
- **Many options (>5)**: Use Select/Dropdown
- **Binary toggle**: Use Toggle or Switch
- **Action buttons**: Use ButtonGroup
- **Navigation tabs**: Use Tabs component
- **Form radio inputs**: Use RadioGroup for forms

### Key Features

- Radio group pattern (single selection)
- Enhanced keyboard navigation (Arrow Left/Right, Home/End)
- Wrap-around navigation
- Skip disabled options
- Icon support with proper ARIA labels
- Size variants (sm, md, lg)
- Full width mode
- Visual active state with border-first design
- WCAG AA+ accessible
- High contrast mode support
- Theme-aware styling
- Smooth transitions with reduced motion support
- Mobile-optimized touch targets

## Quick Start

### Basic Example

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function ViewSwitcher() {
  const [view, setView] = useState('list');

  return (
    <SegmentedButton
      value={view}
      onChange={setView}
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
        { value: 'table', label: 'Table' }
      ]}
      aria-label="View mode"
    />
  );
}
```

### With Icons

```tsx
import { SegmentedButton } from '@spexop/react';
import { List, Grid, Table } from '@spexop/icons';
import { useState } from 'react';

function ViewSwitcherWithIcons() {
  const [view, setView] = useState('list');

  return (
    <SegmentedButton
      value={view}
      onChange={setView}
      options={[
        { value: 'list', label: 'List', icon: <List size={20} /> },
        { value: 'grid', label: 'Grid', icon: <Grid size={20} /> },
        { value: 'table', label: 'Table', icon: <Table size={20} /> }
      ]}
      aria-label="View mode"
    />
  );
}
```

### With Disabled Options

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function FilterWithDisabled() {
  const [filter, setFilter] = useState('all');

  return (
    <SegmentedButton
      value={filter}
      onChange={setFilter}
      options={[
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'archived', label: 'Archived', disabled: true }
      ]}
      aria-label="Filter items"
    />
  );
}
```

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
# or
yarn add @spexop/react @spexop/theme
```

### Import Styles

```tsx
import '@spexop/react/dist/index.css';
```

## Size Variants

### Small Size

Perfect for compact interfaces, toolbars, and secondary controls.

```tsx
<SegmentedButton
  size="sm"
  value={view}
  onChange={setView}
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' }
  ]}
  aria-label="Compact view"
/>
```

### Medium Size (Default)

Ideal for most use cases with balanced proportions.

```tsx
<SegmentedButton
  size="md"
  value={view}
  onChange={setView}
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' }
  ]}
  aria-label="View mode"
/>
```

### Large Size

Great for prominent controls and mobile interfaces.

```tsx
<SegmentedButton
  size="lg"
  value={view}
  onChange={setView}
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' }
  ]}
  aria-label="View mode"
/>
```

## Full Width Mode

Use full width mode when you want the segmented button to fill its container.

```tsx
<SegmentedButton
  fullWidth
  value={filter}
  onChange={setFilter}
  options={[
    { value: 'all', label: 'All Items' },
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' }
  ]}
  aria-label="Filter items"
/>
```

## Basic Usage

### Text-Only Options

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function TimeRangeSelector() {
  const [range, setRange] = useState('week');

  return (
    <SegmentedButton
      value={range}
      onChange={setRange}
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year' }
      ]}
      aria-label="Time range"
    />
  );
}
```

### Size Options

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function DensitySelector() {
  const [density, setDensity] = useState('comfortable');

  return (
    <SegmentedButton
      value={density}
      onChange={setDensity}
      options={[
        { value: 'compact', label: 'Compact' },
        { value: 'comfortable', label: 'Comfortable' },
        { value: 'spacious', label: 'Spacious' }
      ]}
      aria-label="Display density"
    />
  );
}
```

## View Switchers

### List/Grid/Table Switcher

```tsx
import { SegmentedButton } from '@spexop/react';
import { List, Grid, Table } from '@spexop/icons';
import { useState } from 'react';

function ContentViewSwitcher() {
  const [view, setView] = useState('grid');

  return (
    <div>
      <SegmentedButton
        value={view}
        onChange={setView}
        options={[
          {
            value: 'list',
            label: 'List',
            icon: <List size={20} />,
            'aria-label': 'List view'
          },
          {
            value: 'grid',
            label: 'Grid',
            icon: <Grid size={20} />,
            'aria-label': 'Grid view'
          },
          {
            value: 'table',
            label: 'Table',
            icon: <Table size={20} />,
            'aria-label': 'Table view'
          }
        ]}
        aria-label="Content view mode"
      />

      {view === 'list' && <ListView />}
      {view === 'grid' && <GridView />}
      {view === 'table' && <TableView />}
    </div>
  );
}
```

### Map/Satellite View

```tsx
import { SegmentedButton } from '@spexop/react';
import { Map, Satellite } from '@spexop/icons';
import { useState } from 'react';

function MapViewSwitcher() {
  const [mapView, setMapView] = useState('map');

  return (
    <SegmentedButton
      value={mapView}
      onChange={setMapView}
      options={[
        {
          value: 'map',
          label: 'Map',
          icon: <Map size={20} />
        },
        {
          value: 'satellite',
          label: 'Satellite',
          icon: <Satellite size={20} />
        }
      ]}
      aria-label="Map view"
    />
  );
}
```

## Filter Controls

### Status Filter

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function StatusFilter() {
  const [status, setStatus] = useState('all');

  return (
    <SegmentedButton
      value={status}
      onChange={setStatus}
      options={[
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' }
      ]}
      aria-label="Filter by status"
    />
  );
}
```

### Priority Filter

```tsx
import { SegmentedButton } from '@spexop/react';
import { AlertCircle, Info, CheckCircle } from '@spexop/icons';
import { useState } from 'react';

function PriorityFilter() {
  const [priority, setPriority] = useState('all');

  return (
    <SegmentedButton
      value={priority}
      onChange={setPriority}
      options={[
        { value: 'all', label: 'All' },
        {
          value: 'high',
          label: 'High',
          icon: <AlertCircle size={18} />
        },
        {
          value: 'medium',
          label: 'Medium',
          icon: <Info size={18} />
        },
        {
          value: 'low',
          label: 'Low',
          icon: <CheckCircle size={18} />
        }
      ]}
      aria-label="Filter by priority"
    />
  );
}
```

### Category Filter

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState, useEffect } from 'react';

function CategoryFilter({ onFilterChange }) {
  const [category, setCategory] = useState('all');

  useEffect(() => {
    onFilterChange(category);
  }, [category, onFilterChange]);

  return (
    <SegmentedButton
      value={category}
      onChange={setCategory}
      options={[
        { value: 'all', label: 'All Categories' },
        { value: 'design', label: 'Design' },
        { value: 'development', label: 'Development' },
        { value: 'marketing', label: 'Marketing' }
      ]}
      aria-label="Filter by category"
    />
  );
}
```

## Icon Integration

### Icon-Only Options

```tsx
import { SegmentedButton } from '@spexop/react';
import { Sun, Moon, Monitor } from '@spexop/icons';
import { useState } from 'react';

function ThemeSwitcher() {
  const [theme, setTheme] = useState('auto');

  return (
    <SegmentedButton
      value={theme}
      onChange={setTheme}
      options={[
        {
          value: 'light',
          label: '',  // Empty for icon-only
          icon: <Sun size={20} />,
          'aria-label': 'Light theme'
        },
        {
          value: 'dark',
          label: '',
          icon: <Moon size={20} />,
          'aria-label': 'Dark theme'
        },
        {
          value: 'auto',
          label: '',
          icon: <Monitor size={20} />,
          'aria-label': 'Auto theme'
        }
      ]}
      aria-label="Theme selection"
    />
  );
}
```

### Icon + Label

```tsx
import { SegmentedButton } from '@spexop/react';
import { Calendar, Clock, Bell } from '@spexop/icons';
import { useState } from 'react';

function NotificationMode() {
  const [mode, setMode] = useState('daily');

  return (
    <SegmentedButton
      value={mode}
      onChange={setMode}
      options={[
        {
          value: 'daily',
          label: 'Daily',
          icon: <Calendar size={18} />
        },
        {
          value: 'hourly',
          label: 'Hourly',
          icon: <Clock size={18} />
        },
        {
          value: 'instant',
          label: 'Instant',
          icon: <Bell size={18} />
        }
      ]}
      aria-label="Notification frequency"
    />
  );
}
```

## State Management

### Local State

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function LocalStateExample() {
  const [value, setValue] = useState('option1');

  return (
    <SegmentedButton
      value={value}
      onChange={setValue}
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]}
      aria-label="Options"
    />
  );
}
```

### Controlled with Callback

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function ControlledExample({ onViewChange }) {
  const [view, setView] = useState('list');

  const handleChange = (newView) => {
    setView(newView);
    onViewChange(newView);
  };

  return (
    <SegmentedButton
      value={view}
      onChange={handleChange}
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' }
      ]}
      aria-label="View mode"
    />
  );
}
```

### Context State

```tsx
import { SegmentedButton } from '@spexop/react';
import { createContext, useContext, useState } from 'react';

const ViewContext = createContext();

export function ViewProvider({ children }) {
  const [view, setView] = useState('grid');

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  return useContext(ViewContext);
}

// Usage
function ViewControls() {
  const { view, setView } = useView();

  return (
    <SegmentedButton
      value={view}
      onChange={setView}
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' }
      ]}
      aria-label="View mode"
    />
  );
}
```

### Persisted State

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState, useEffect } from 'react';

function PersistedViewSwitcher() {
  const [view, setView] = useState(() => {
    return localStorage.getItem('view-preference') || 'grid';
  });

  useEffect(() => {
    localStorage.setItem('view-preference', view);
  }, [view]);

  return (
    <SegmentedButton
      value={view}
      onChange={setView}
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
        { value: 'table', label: 'Table' }
      ]}
      aria-label="View mode"
    />
  );
}
```

## Keyboard Navigation

### Navigation Keys

SegmentedButton implements enhanced keyboard navigation:

- **Tab**: Focus the active option
- **Shift + Tab**: Focus previous element
- **Arrow Right**: Move to next option
- **Arrow Left**: Move to previous option
- **Home**: Move to first option
- **End**: Move to last option
- **Space/Enter**: Select focused option (when focused)

### Wrap-Around Navigation

```tsx
// Automatic wrap-around
// When on last option, Arrow Right moves to first
// When on first option, Arrow Left moves to last
<SegmentedButton
  value={value}
  onChange={setValue}
  options={[
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' }
  ]}
  aria-label="Options"
/>
```

### Skip Disabled Options

```tsx
// Disabled options are automatically skipped during keyboard navigation
<SegmentedButton
  value={value}
  onChange={setValue}
  options={[
    { value: '1', label: 'One' },
    { value: '2', label: 'Two', disabled: true },  // Skipped
    { value: '3', label: 'Three' }
  ]}
  aria-label="Options"
/>
```

## Accessibility

### ARIA Radiogroup Pattern

SegmentedButton implements the WAI-ARIA radiogroup pattern:

```tsx
<div role="radiogroup" aria-label="View mode">
  <button role="radio" aria-checked="true">List</button>
  <button role="radio" aria-checked="false">Grid</button>
  <button role="radio" aria-checked="false">Table</button>
</div>
```

### ARIA Labels

```tsx
// Group label
<SegmentedButton
  aria-label="View mode"  // Describes the group
  value={view}
  onChange={setView}
  options={[...]}
/>

// Option labels
<SegmentedButton
  value={theme}
  onChange={setTheme}
  options={[
    {
      value: 'light',
      label: 'Light',
      'aria-label': 'Light theme'  // Describes the option
    },
    {
      value: 'dark',
      label: 'Dark',
      'aria-label': 'Dark theme'
    }
  ]}
  aria-label="Theme selection"
/>
```

### Screen Reader Support

Screen readers will announce:

- Group role and label
- Option label
- Selected state (aria-checked)
- Position in group
- Disabled state

```tsx
// Example announcement:
// "Theme selection, radio group"
// "Light theme, radio button, checked, 1 of 3"
```

## Advanced Patterns

### Conditional Options

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function ConditionalOptions({ isPremium }) {
  const [view, setView] = useState('list');

  const options = [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    ...(isPremium ? [{ value: 'table', label: 'Table' }] : [])
  ];

  return (
    <SegmentedButton
      value={view}
      onChange={setView}
      options={options}
      aria-label="View mode"
    />
  );
}
```

### Dynamic Options from API

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState, useEffect } from 'react';

function DynamicCategories() {
  const [category, setCategory] = useState('all');
  const [options, setOptions] = useState([
    { value: 'all', label: 'All' }
  ]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(categories => {
        setOptions([
          { value: 'all', label: 'All' },
          ...categories.map(cat => ({
            value: cat.id,
            label: cat.name
          }))
        ]);
      });
  }, []);

  return (
    <SegmentedButton
      value={category}
      onChange={setCategory}
      options={options}
      aria-label="Category filter"
    />
  );
}
```

### With Tooltip

```tsx
import { SegmentedButton } from '@spexop/react';
import { Tooltip } from '@spexop/react';
import { useState } from 'react';

function SegmentedWithTooltip() {
  const [view, setView] = useState('list');

  return (
    <Tooltip content="Choose your preferred view mode">
      <SegmentedButton
        value={view}
        onChange={setView}
        options={[
          { value: 'list', label: 'List' },
          { value: 'grid', label: 'Grid' }
        ]}
        aria-label="View mode"
      />
    </Tooltip>
  );
}
```

## Best Practices

### 1. Provide Clear Labels

```tsx
// ✅ GOOD - Clear, descriptive labels
<SegmentedButton
  value={view}
  onChange={setView}
  options={[
    { value: 'list', label: 'List View' },
    { value: 'grid', label: 'Grid View' },
    { value: 'table', label: 'Table View' }
  ]}
  aria-label="Content view mode"
/>

// ❌ BAD - Vague labels
<SegmentedButton
  value={view}
  onChange={setView}
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
/>
```

### 2. Limit Number of Options

```tsx
// ✅ GOOD - 2-5 options (ideal)
<SegmentedButton
  options={[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' }
  ]}
  {...props}
/>

// ❌ BAD - Too many options (use Select instead)
<SegmentedButton
  options={[
    { value: 'jan', label: 'January' },
    { value: 'feb', label: 'February' },
    // ... 10 more options
  ]}
  {...props}
/>
```

### 3. Use Icons for Clarity

```tsx
// ✅ GOOD - Icons enhance understanding
<SegmentedButton
  options={[
    { value: 'list', label: 'List', icon: <List /> },
    { value: 'grid', label: 'Grid', icon: <Grid /> }
  ]}
  {...props}
/>

// ✅ ALSO GOOD - Icon-only with aria-label
<SegmentedButton
  options={[
    { value: 'list', label: '', icon: <List />, 'aria-label': 'List view' },
    { value: 'grid', label: '', icon: <Grid />, 'aria-label': 'Grid view' }
  ]}
  {...props}
/>
```

### 4. Always Provide aria-label

```tsx
// ✅ GOOD - Group has clear purpose
<SegmentedButton
  aria-label="View mode selection"
  options={[...]}
  {...props}
/>

// ❌ BAD - No context for screen readers
<SegmentedButton
  options={[...]}
  {...props}
/>
```

### 5. Mutually Exclusive Options

```tsx
// ✅ GOOD - Options are exclusive
<SegmentedButton
  options={[
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ]}
  {...props}
/>

// ❌ BAD - Options aren't exclusive (use CheckboxGroup)
<SegmentedButton
  options={[
    { value: 'bold', label: 'Bold' },
    { value: 'italic', label: 'Italic' }
  ]}
  {...props}
/>
```

## API Reference

### SegmentedButtonProps

```typescript
interface SegmentedButtonProps {
  /** Current selected value */
  value: string;
  
  /** Change handler */
  onChange: (value: string) => void;
  
  /** Array of options */
  options: SegmentedButtonOption[];
  
  /** Size variant */
  size?: "sm" | "md" | "lg";
  
  /** Full width mode */
  fullWidth?: boolean;
  
  /** Additional CSS class */
  className?: string;
  
  /** ARIA label for the group */
  "aria-label"?: string;
  
  /** ARIA labelled by */
  "aria-labelledby"?: string;
}

interface SegmentedButtonOption {
  /** Option value */
  value: string;
  
  /** Option label */
  label: string;
  
  /** Optional icon */
  icon?: React.ReactNode;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Custom ARIA label */
  "aria-label"?: string;
}
```

## Related Components

- **ButtonGroup**: For non-exclusive button groups
- **Toggle**: For binary on/off states
- **RadioGroup**: For form radio inputs
- **Tabs**: For navigation between views
- **Select**: For dropdown selections

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Bundle Size**: ~2KB gzipped
- **CSS Modules**: Scoped styles
- **Keyboard**: Full Arrow key navigation
- **Accessible**: ARIA radiogroup pattern

## License

MIT

## Support

For issues, questions, or contributions:

- [GitHub Issues](https://github.com/spexop-ui/design-system/issues)
- [Documentation](https://spexop.com)
