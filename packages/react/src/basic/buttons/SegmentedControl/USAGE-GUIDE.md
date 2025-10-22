# SegmentedControl Component - Complete Usage Guide

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
6. [Icon Integration](#icon-integration)
7. [State Management](#state-management)
8. [Styling and Theming](#styling-and-theming)
9. [Accessibility](#accessibility)
10. [Best Practices](#best-practices)
11. [Performance Optimization](#performance-optimization)
12. [Troubleshooting](#troubleshooting)
13. [API Reference](#api-reference)

## Overview

The SegmentedControl component is a modern, accessible button group for selecting between multiple mutually exclusive options. It provides a clean, visual interface for choices like theme selection, view modes, or filter states.

### When to Use

Use SegmentedControl when you need:

- A visual button group for 2-5 mutually exclusive options
- Quick switching between related states or views
- Theme or preference selection with icons
- View mode toggles (list, grid, table)
- Filter or sort controls with clear visual feedback
- Settings panels with multiple choice options

### When Not to Use

Consider alternatives when you need:

- **More than 5 options**: Use a Select/Dropdown component instead
- **Binary toggle**: Use a Toggle or Switch component
- **Content switching**: Use the Tabs component
- **Traditional form inputs**: Use RadioGroup for standard forms
- **Navigation between pages**: Use Navigation or Tabs components

### Key Features

- Visual button group design with clear selection state
- Optional icons from @spexop/icons for enhanced clarity
- Full keyboard navigation (Arrow keys, Home, End)
- WCAG AA+ accessible with proper ARIA attributes
- Roving tabindex for efficient focus management
- Individual option disable support
- Mobile-responsive with touch-friendly targets
- Smooth animations with reduced motion support
- Theme-aware styling using design tokens
- TypeScript support with full type safety

## Quick Start

### Minimal Example

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [viewMode, setViewMode] = useState('list');

  return (
    <SegmentedControl
      value={viewMode}
      onChange={setViewMode}
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
        { value: 'table', label: 'Table' },
      ]}
      aria-label="View mode selection"
    />
  );
}
```

### With Icons

```tsx
import { SegmentedControl } from '@spexop/react';
import { List, Grid, Table } from '@spexop/icons';
import { useState } from 'react';

function App() {
  const [viewMode, setViewMode] = useState('list');

  return (
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

```tsx
import { UnifiedThemeProvider } from '@spexop/react';
import '@spexop/react/dist/index.css';

function App() {
  return (
    <UnifiedThemeProvider initialTheme="light">
      {/* Your app content */}
    </UnifiedThemeProvider>
  );
}
```

## Basic Usage

### Simple Text Options

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState } from 'react';

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

### With Disabled Options

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function FeatureControl() {
  const [feature, setFeature] = useState('basic');

  return (
    <SegmentedControl
      value={feature}
      onChange={setFeature}
      options={[
        { value: 'basic', label: 'Basic' },
        { value: 'pro', label: 'Pro' },
        { value: 'enterprise', label: 'Enterprise', disabled: true },
      ]}
      aria-label="Feature tier selection"
    />
  );
}
```

### Entire Control Disabled

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function DisabledExample() {
  const [value, setValue] = useState('option1');
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]}
      disabled={isLoading}
      aria-label="Options"
    />
  );
}
```

## Advanced Patterns

### Theme Selector

```tsx
import { SegmentedControl } from '@spexop/react';
import { Sun, Moon, Monitor } from '@spexop/icons';
import { useState, useEffect } from 'react';

function ThemeSelector() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Persist to localStorage
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  return (
    <div>
      <label id="theme-label">Theme Preference</label>
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
        aria-labelledby="theme-label"
      />
    </div>
  );
}
```

### View Mode Toggle with State Persistence

```tsx
import { SegmentedControl } from '@spexop/react';
import { List, Grid, LayoutGrid } from '@spexop/icons';
import { useState, useEffect } from 'react';

function ViewModeControl() {
  const [viewMode, setViewMode] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('view-mode') || 'list';
  });

  useEffect(() => {
    // Persist view mode
    localStorage.setItem('view-mode', viewMode);
  }, [viewMode]);

  const handleViewChange = (newView: string) => {
    setViewMode(newView);
    
    // Optional: Track analytics
    console.log('View mode changed:', newView);
  };

  return (
    <SegmentedControl
      value={viewMode}
      onChange={handleViewChange}
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

### Filter Control with Counts

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function StatusFilter({ tasks }: { tasks: Task[] }) {
  const [status, setStatus] = useState('all');

  // Calculate counts dynamically
  const counts = {
    all: tasks.length,
    active: tasks.filter(t => t.status === 'active').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <SegmentedControl
      value={status}
      onChange={setStatus}
      options={[
        { value: 'all', label: `All (${counts.all})` },
        { value: 'active', label: `Active (${counts.active})` },
        { value: 'completed', label: `Completed (${counts.completed})` },
      ]}
      aria-label="Filter tasks by status"
    />
  );
}
```

### Settings Panel Integration

```tsx
import { SegmentedControl } from '@spexop/react';
import { Stack } from '@spexop/react';
import { Sun, Moon, Monitor } from '@spexop/icons';
import { useState } from 'react';

function SettingsPanel() {
  const [theme, setTheme] = useState('light');
  const [layout, setLayout] = useState('default');
  const [density, setDensity] = useState('comfortable');

  return (
    <Stack direction="vertical" gap={6}>
      <div>
        <h3 id="theme-heading">Theme</h3>
        <SegmentedControl
          value={theme}
          onChange={setTheme}
          options={[
            { value: 'light', label: 'Light', icon: <Sun size={16} /> },
            { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
            { value: 'auto', label: 'Auto', icon: <Monitor size={16} /> },
          ]}
          aria-labelledby="theme-heading"
        />
      </div>

      <div>
        <h3 id="layout-heading">Layout</h3>
        <SegmentedControl
          value={layout}
          onChange={setLayout}
          options={[
            { value: 'default', label: 'Default' },
            { value: 'boxed', label: 'Boxed' },
            { value: 'fluid', label: 'Fluid' },
          ]}
          aria-labelledby="layout-heading"
        />
      </div>

      <div>
        <h3 id="density-heading">Density</h3>
        <SegmentedControl
          value={density}
          onChange={setDensity}
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'comfortable', label: 'Comfortable' },
            { value: 'spacious', label: 'Spacious' },
          ]}
          aria-labelledby="density-heading"
        />
      </div>
    </Stack>
  );
}
```

### Dynamic Options

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState, useEffect } from 'react';

function DynamicControl() {
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories([
          { value: 'all', label: 'All' },
          ...data.map(cat => ({
            value: cat.id,
            label: cat.name,
            disabled: !cat.available,
          })),
        ]);
      });
  }, []);

  return categories.length > 0 ? (
    <SegmentedControl
      value={category}
      onChange={setCategory}
      options={categories}
      aria-label="Category filter"
    />
  ) : (
    <div>Loading categories...</div>
  );
}
```

### Toolbar Integration

```tsx
import { SegmentedControl } from '@spexop/react';
import { List, Grid } from '@spexop/icons';
import { useState } from 'react';

function Toolbar() {
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('name');

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 'var(--theme-spacing-4)',
      padding: 'var(--theme-spacing-4)',
      borderBottom: '1px solid var(--theme-border)',
    }}>
      <h2 style={{ margin: 0, flex: 1 }}>Products</h2>
      
      <SegmentedControl
        value={sortBy}
        onChange={setSortBy}
        options={[
          { value: 'name', label: 'Name' },
          { value: 'price', label: 'Price' },
          { value: 'date', label: 'Date' },
        ]}
        aria-label="Sort by"
      />

      <SegmentedControl
        value={viewMode}
        onChange={setViewMode}
        options={[
          { value: 'list', label: 'List', icon: <List size={16} /> },
          { value: 'grid', label: 'Grid', icon: <Grid size={16} /> },
        ]}
        aria-label="View mode"
      />
    </div>
  );
}
```

## Icon Integration

### Using @spexop/icons

```tsx
import { SegmentedControl } from '@spexop/react';
import { 
  Sun, Moon, Monitor,
  List, Grid, Table,
  Clock, TrendingUp, Star
} from '@spexop/icons';
import { useState } from 'react';

function IconExamples() {
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('list');
  const [sort, setSort] = useState('recent');

  return (
    <div>
      {/* Theme with icons */}
      <SegmentedControl
        value={theme}
        onChange={setTheme}
        options={[
          { value: 'light', label: 'Light', icon: <Sun size={16} /> },
          { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
          { value: 'auto', label: 'Auto', icon: <Monitor size={16} /> },
        ]}
        aria-label="Theme"
      />

      {/* View mode with icons */}
      <SegmentedControl
        value={view}
        onChange={setView}
        options={[
          { value: 'list', label: 'List', icon: <List size={16} /> },
          { value: 'grid', label: 'Grid', icon: <Grid size={16} /> },
          { value: 'table', label: 'Table', icon: <Table size={16} /> },
        ]}
        aria-label="View mode"
      />

      {/* Sort with icons */}
      <SegmentedControl
        value={sort}
        onChange={setSort}
        options={[
          { value: 'recent', label: 'Recent', icon: <Clock size={16} /> },
          { value: 'trending', label: 'Trending', icon: <TrendingUp size={16} /> },
          { value: 'popular', label: 'Popular', icon: <Star size={16} /> },
        ]}
        aria-label="Sort by"
      />
    </div>
  );
}
```

### Icon-Only Options

For compact toolbars, you can use icons without labels:

```tsx
import { SegmentedControl } from '@spexop/react';
import { List, Grid, Table } from '@spexop/icons';
import { useState } from 'react';

function IconOnlyControl() {
  const [viewMode, setViewMode] = useState('list');

  return (
    <SegmentedControl
      value={viewMode}
      onChange={setViewMode}
      options={[
        { 
          value: 'list', 
          label: '', // Empty label for icon-only
          icon: <List size={20} /> 
        },
        { 
          value: 'grid', 
          label: '', 
          icon: <Grid size={20} /> 
        },
        { 
          value: 'table', 
          label: '', 
          icon: <Table size={20} /> 
        },
      ]}
      aria-label="View mode"
    />
  );
}
```

### Consistent Icon Usage

When using icons, be consistent across all options:

```tsx
// ✅ GOOD - All options have icons
<SegmentedControl
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: 'Option A', icon: <IconA size={16} /> },
    { value: 'b', label: 'Option B', icon: <IconB size={16} /> },
    { value: 'c', label: 'Option C', icon: <IconC size={16} /> },
  ]}
/>

// ❌ BAD - Inconsistent icon usage
<SegmentedControl
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: 'Option A', icon: <IconA size={16} /> },
    { value: 'b', label: 'Option B' }, // Missing icon
    { value: 'c', label: 'Option C', icon: <IconC size={16} /> },
  ]}
/>
```

## State Management

### Local State (useState)

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function LocalStateExample() {
  const [value, setValue] = useState('option1');

  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]}
      aria-label="Options"
    />
  );
}
```

### URL State (useSearchParams)

```tsx
import { SegmentedControl } from '@spexop/react';
import { useSearchParams } from 'react-router-dom';

function URLStateExample() {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewMode = searchParams.get('view') || 'list';

  const handleViewChange = (newView: string) => {
    setSearchParams({ view: newView });
  };

  return (
    <SegmentedControl
      value={viewMode}
      onChange={handleViewChange}
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
      ]}
      aria-label="View mode"
    />
  );
}
```

### Global State (Context)

```tsx
import { SegmentedControl } from '@spexop/react';
import { useContext } from 'react';
import { PreferencesContext } from './PreferencesContext';

function GlobalStateExample() {
  const { theme, setTheme } = useContext(PreferencesContext);

  return (
    <SegmentedControl
      value={theme}
      onChange={setTheme}
      options={[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ]}
      aria-label="Theme"
    />
  );
}
```

### Form Integration

```tsx
import { SegmentedControl } from '@spexop/react';
import { useForm, Controller } from 'react-hook-form';

function FormExample() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      theme: 'light',
    },
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="theme"
        control={control}
        render={({ field }) => (
          <SegmentedControl
            value={field.value}
            onChange={field.onChange}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'auto', label: 'Auto' },
            ]}
            aria-label="Theme preference"
          />
        )}
      />
      <button type="submit">Save Preferences</button>
    </form>
  );
}
```

## Styling and Theming

### Custom Styling

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function CustomStyledControl() {
  const [value, setValue] = useState('option1');

  return (
    <div style={{ padding: 'var(--theme-spacing-4)' }}>
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
        className="custom-segmented-control"
        aria-label="Options"
      />
    </div>
  );
}
```

### CSS Customization

```css
/* Custom styles for SegmentedControl */
.custom-segmented-control {
  /* Increase spacing */
  gap: var(--theme-spacing-3);
  
  /* Custom background */
  background: var(--theme-surface);
  
  /* Add shadow */
  box-shadow: var(--theme-shadow-sm);
}

/* Target specific parts using data attributes */
.custom-segmented-control [role="radio"] {
  /* Custom button styling */
  min-width: 100px;
  font-weight: var(--theme-font-weight-semibold);
}

.custom-segmented-control [role="radio"][aria-checked="true"] {
  /* Custom selected state */
  background: var(--theme-primary);
  color: white;
}
```

### Theme Token Override

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function ThemedControl() {
  const [value, setValue] = useState('option1');

  return (
    <div 
      style={{
        '--theme-primary': '#6366f1',
        '--theme-border': '#e5e7eb',
      } as React.CSSProperties}
    >
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
        aria-label="Options"
      />
    </div>
  );
}
```

## Accessibility

### ARIA Attributes

The SegmentedControl automatically provides:

- `role="radiogroup"` on the container
- `role="radio"` on each option
- `aria-checked` for selection state
- `aria-label` or `aria-labelledby` for description

```tsx
// With aria-label
<SegmentedControl
  value={value}
  onChange={setValue}
  options={options}
  aria-label="View mode selection"
/>

// With aria-labelledby
<>
  <h3 id="theme-label">Theme Preference</h3>
  <SegmentedControl
    value={theme}
    onChange={setTheme}
    options={themeOptions}
    aria-labelledby="theme-label"
  />
</>
```

### Keyboard Navigation

Full keyboard support is built-in:

- `Tab` - Move focus to/from the control
- `Arrow Left/Up` - Select previous option
- `Arrow Right/Down` - Select next option
- `Home` - Select first option
- `End` - Select last option

```tsx
// No additional configuration needed for keyboard navigation
<SegmentedControl
  value={value}
  onChange={setValue}
  options={options}
  aria-label="Options"
/>
```

### Focus Management

The component uses roving tabindex pattern:

- Only the selected option is in the tab order
- Arrow keys move between options without leaving the control
- Focus is visually indicated with outline

```tsx
// Focus management is automatic
<SegmentedControl
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ]}
  aria-label="Options"
/>
```

### Screen Reader Support

Screen readers announce:

- The role as "radio group"
- The label from aria-label or aria-labelledby
- Each option as "radio button"
- Selection state as "checked" or "not checked"
- Disabled state as "disabled"

```tsx
// Screen reader friendly example
<>
  <h2 id="settings-theme">Theme Setting</h2>
  <p id="theme-description">Choose your preferred color scheme</p>
  <SegmentedControl
    value={theme}
    onChange={setTheme}
    options={[
      { value: 'light', label: 'Light theme' },
      { value: 'dark', label: 'Dark theme' },
      { value: 'auto', label: 'Automatic theme' },
    ]}
    aria-labelledby="settings-theme"
  />
</>
```

### Disabled State Accessibility

```tsx
// Entire control disabled
<SegmentedControl
  value={value}
  onChange={setValue}
  options={options}
  disabled={true}
  aria-label="Options (currently unavailable)"
/>

// Individual options disabled
<SegmentedControl
  value={value}
  onChange={setValue}
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro (Requires upgrade)', disabled: true },
  ]}
  aria-label="Plan selection"
/>
```

## Best Practices

### 1. Keep Options Count Low

```tsx
// ✅ GOOD - 2-5 options
<SegmentedControl
  value={view}
  onChange={setView}
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'table', label: 'Table' },
  ]}
  aria-label="View mode"
/>

// ❌ BAD - Too many options (use Select instead)
<SegmentedControl
  value={option}
  onChange={setOption}
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
  ]}
  aria-label="Options"
/>
```

### 2. Use Short Labels

```tsx
// ✅ GOOD - Short, clear labels
<SegmentedControl
  value={sort}
  onChange={setSort}
  options={[
    { value: 'recent', label: 'Recent' },
    { value: 'popular', label: 'Popular' },
    { value: 'trending', label: 'Trending' },
  ]}
  aria-label="Sort by"
/>

// ❌ BAD - Labels too long
<SegmentedControl
  value={sort}
  onChange={setSort}
  options={[
    { value: 'recent', label: 'Most Recently Added' },
    { value: 'popular', label: 'Most Popular Items' },
    { value: 'trending', label: 'Currently Trending' },
  ]}
  aria-label="Sort by"
/>
```

### 3. Always Provide ARIA Label

```tsx
// ✅ GOOD - Has aria-label
<SegmentedControl
  value={value}
  onChange={setValue}
  options={options}
  aria-label="View mode selection"
/>

// ✅ GOOD - Has aria-labelledby
<>
  <h3 id="view-label">View Mode</h3>
  <SegmentedControl
    value={value}
    onChange={setValue}
    options={options}
    aria-labelledby="view-label"
  />
</>

// ❌ BAD - No ARIA label
<SegmentedControl
  value={value}
  onChange={setValue}
  options={options}
/>
```

### 4. Be Consistent with Icons

```tsx
// ✅ GOOD - All have icons
<SegmentedControl
  value={theme}
  onChange={setTheme}
  options={[
    { value: 'light', label: 'Light', icon: <Sun size={16} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
    { value: 'auto', label: 'Auto', icon: <Monitor size={16} /> },
  ]}
  aria-label="Theme"
/>

// ✅ GOOD - None have icons
<SegmentedControl
  value={sort}
  onChange={setSort}
  options={[
    { value: 'recent', label: 'Recent' },
    { value: 'popular', label: 'Popular' },
    { value: 'trending', label: 'Trending' },
  ]}
  aria-label="Sort by"
/>

// ❌ BAD - Inconsistent icon usage
<SegmentedControl
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: 'Option A', icon: <IconA size={16} /> },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ]}
  aria-label="Options"
/>
```

### 5. Handle Mobile Responsiveness

```tsx
// ✅ GOOD - Mobile friendly labels
<SegmentedControl
  value={view}
  onChange={setView}
  options={[
    { value: 'list', label: 'List', icon: <List size={16} /> },
    { value: 'grid', label: 'Grid', icon: <Grid size={16} /> },
  ]}
  aria-label="View mode"
/>

// Consider icon-only for very narrow spaces
const isMobile = window.innerWidth < 420;

<SegmentedControl
  value={view}
  onChange={setView}
  options={[
    { 
      value: 'list', 
      label: isMobile ? '' : 'List',
      icon: <List size={16} /> 
    },
    { 
      value: 'grid', 
      label: isMobile ? '' : 'Grid',
      icon: <Grid size={16} /> 
    },
  ]}
  aria-label="View mode"
/>
```

### 6. Provide Default Value

```tsx
// ✅ GOOD - Has default value
const [theme, setTheme] = useState('light');

<SegmentedControl
  value={theme}
  onChange={setTheme}
  options={themeOptions}
  aria-label="Theme"
/>

// ❌ BAD - No default (could cause issues)
const [theme, setTheme] = useState();

<SegmentedControl
  value={theme}
  onChange={setTheme}
  options={themeOptions}
  aria-label="Theme"
/>
```

### 7. Use Descriptive Change Handlers

```tsx
// ✅ GOOD - Descriptive handler
const handleThemeChange = (newTheme: string) => {
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  console.log('Theme changed to:', newTheme);
};

<SegmentedControl
  value={theme}
  onChange={handleThemeChange}
  options={themeOptions}
  aria-label="Theme"
/>

// ❌ BAD - Just setState (misses side effects)
<SegmentedControl
  value={theme}
  onChange={setTheme}
  options={themeOptions}
  aria-label="Theme"
/>
```

## Performance Optimization

### Memoize Options Array

```tsx
import { SegmentedControl } from '@spexop/react';
import { useMemo, useState } from 'react';
import { List, Grid, Table } from '@spexop/icons';

function OptimizedControl() {
  const [viewMode, setViewMode] = useState('list');

  // Memoize options to prevent recreating on every render
  const options = useMemo(() => [
    { value: 'list', label: 'List', icon: <List size={16} /> },
    { value: 'grid', label: 'Grid', icon: <Grid size={16} /> },
    { value: 'table', label: 'Table', icon: <Table size={16} /> },
  ], []);

  return (
    <SegmentedControl
      value={viewMode}
      onChange={setViewMode}
      options={options}
      aria-label="View mode"
    />
  );
}
```

### Memoize Change Handler

```tsx
import { SegmentedControl } from '@spexop/react';
import { useCallback, useState } from 'react';

function OptimizedHandlerControl() {
  const [value, setValue] = useState('option1');

  // Memoize handler to prevent recreating on every render
  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    localStorage.setItem('preference', newValue);
  }, []);

  return (
    <SegmentedControl
      value={value}
      onChange={handleChange}
      options={options}
      aria-label="Options"
    />
  );
}
```

### Conditional Rendering

```tsx
import { SegmentedControl } from '@spexop/react';
import { useState } from 'react';

function ConditionalControl({ showControl }: { showControl: boolean }) {
  const [value, setValue] = useState('option1');

  // Only render when needed
  if (!showControl) {
    return null;
  }

  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      options={options}
      aria-label="Options"
    />
  );
}
```

## Troubleshooting

### Issue: Selected State Not Updating

**Problem**: Selection doesn't change when clicking options

**Solution**: Ensure you're updating state correctly

```tsx
// ❌ WRONG - Not updating state
const [value, setValue] = useState('option1');

<SegmentedControl
  value={value}
  onChange={() => {}} // Empty handler!
  options={options}
  aria-label="Options"
/>

// ✅ CORRECT - Proper state update
const [value, setValue] = useState('option1');

<SegmentedControl
  value={value}
  onChange={setValue}
  options={options}
  aria-label="Options"
/>
```

### Issue: Options Not Displaying

**Problem**: No options visible

**Solution**: Check options array structure

```tsx
// ❌ WRONG - Missing required fields
<SegmentedControl
  value={value}
  onChange={setValue}
  options={[
    { val: 'a', name: 'Option A' }, // Wrong field names!
  ]}
  aria-label="Options"
/>

// ✅ CORRECT - Proper structure
<SegmentedControl
  value={value}
  onChange={setValue}
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
  aria-label="Options"
/>
```

### Issue: Icons Not Showing

**Problem**: Icons don't appear

**Solution**: Import icons from @spexop/icons

```tsx
// ❌ WRONG - Missing icon import
<SegmentedControl
  value={theme}
  onChange={setTheme}
  options={[
    { value: 'light', label: 'Light', icon: <Sun /> }, // Sun not imported!
  ]}
  aria-label="Theme"
/>

// ✅ CORRECT - Proper icon import
import { Sun, Moon } from '@spexop/icons';

<SegmentedControl
  value={theme}
  onChange={setTheme}
  options={[
    { value: 'light', label: 'Light', icon: <Sun size={16} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
  ]}
  aria-label="Theme"
/>
```

### Issue: Keyboard Navigation Not Working

**Problem**: Arrow keys don't change selection

**Solution**: Ensure onChange handler is provided and functional

```tsx
// ✅ CORRECT - Full setup
const [value, setValue] = useState('option1');

<SegmentedControl
  value={value}
  onChange={setValue} // Handler present
  options={options}
  aria-label="Options"
/>
```

### Issue: Styling Not Applied

**Problem**: Custom styles don't show

**Solution**: Check className and CSS specificity

```tsx
// Add custom className
<SegmentedControl
  value={value}
  onChange={setValue}
  options={options}
  className="my-custom-control"
  aria-label="Options"
/>

// CSS with proper specificity
.my-custom-control {
  /* Your custom styles */
}
```

### Issue: Mobile Layout Issues

**Problem**: Options overflow on mobile

**Solution**: Component is responsive by default, but check container width

```tsx
// Ensure parent container doesn't constrain
<div style={{ width: '100%', padding: '0 16px' }}>
  <SegmentedControl
    value={value}
    onChange={setValue}
    options={options}
    aria-label="Options"
  />
</div>
```

## API Reference

### SegmentedControlProps

```typescript
interface SegmentedControlProps {
  /** Current selected value */
  value: string;
  
  /** Change handler called when selection changes */
  onChange: (value: string) => void;
  
  /** Array of available options */
  options: SegmentedControlOption[];
  
  /** Whether the entire control is disabled */
  disabled?: boolean;
  
  /** Additional CSS class name */
  className?: string;
  
  /** ID for the control group */
  id?: string;
  
  /** ARIA label for accessibility (required if aria-labelledby not provided) */
  "aria-label"?: string;
  
  /** ARIA labelledby for accessibility (required if aria-label not provided) */
  "aria-labelledby"?: string;
}
```

### SegmentedControlOption

```typescript
interface SegmentedControlOption {
  /** Unique value for the option */
  value: string;
  
  /** Display label for the option */
  label: string;
  
  /** Optional icon (ReactNode from @spexop/icons) */
  icon?: React.ReactNode;
  
  /** Whether this specific option is disabled */
  disabled?: boolean;
}
```

### Events

- `onChange(value: string)` - Called when selection changes via click or keyboard

### Keyboard Shortcuts

- `Tab` - Move focus to/from control
- `Arrow Left` / `Arrow Up` - Select previous option
- `Arrow Right` / `Arrow Down` - Select next option
- `Home` - Select first option
- `End` - Select last option

### CSS Custom Properties

```css
/* Available theme tokens for customization */
--theme-spacing-1      /* 4px */
--theme-spacing-2      /* 8px */
--theme-spacing-3      /* 12px */
--theme-spacing-6      /* 24px */
--theme-border         /* Border color */
--theme-border-width   /* Border width */
--theme-radius-md      /* 8px border radius */
--theme-radius-lg      /* 12px border radius */
--theme-surface        /* Surface color */
--theme-surface-secondary /* Secondary surface */
--theme-surface-hover  /* Hover state surface */
--theme-text           /* Primary text */
--theme-text-secondary /* Secondary text */
--theme-primary        /* Primary color */
--theme-font-family    /* Font family */
--theme-font-weight-medium   /* 500 */
--theme-font-weight-semibold /* 600 */
```

## Related Components

- **RadioGroup** - Traditional radio button group for forms
- **Tabs** - Content switching with tab interface
- **Toggle** - Binary on/off switch
- **Select** - Dropdown for many options
- **ButtonGroup** - Generic button grouping

## License

MIT

## Support

For issues, questions, or contributions, visit:

- GitHub: <https://github.com/spexop-ui/spexop-public>
- Documentation: <https://spexop.dev>
