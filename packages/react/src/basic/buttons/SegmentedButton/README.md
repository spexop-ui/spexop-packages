# SegmentedButton Component

**Version**: 0.3.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A radio-style button group with exclusive selection, perfect for view modes, filters, and option selection. Features modern UI/UX design following "The Spexop Way" with enhanced accessibility and smooth interactions.

## Features

- ✅ Exclusive selection (radio behavior)
- ✅ Icon support with proper ARIA labels
- ✅ Size variants (sm, md, lg)
- ✅ Full width mode
- ✅ Enhanced keyboard navigation (Arrow, Home, End keys)
- ✅ Smooth animations with reduced motion support
- ✅ Disabled options with screen reader support
- ✅ WCAG AA+ accessible
- ✅ High contrast mode support
- ✅ TypeScript support
- ✅ Mobile-optimized touch targets

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { SegmentedButton } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('list');
  
  return (
    <SegmentedButton
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

## Size Variants

```tsx
// Small size for compact interfaces
<SegmentedButton
  size="sm"
  value={value}
  onChange={setValue}
  options={options}
  aria-label="Compact view"
/>

// Medium size (default)
<SegmentedButton
  size="md"
  value={value}
  onChange={setValue}
  options={options}
  aria-label="View mode"
/>

// Large size for prominent controls
<SegmentedButton
  size="lg"
  value={value}
  onChange={setValue}
  options={options}
  aria-label="View mode"
/>
```

## Full Width Mode

```tsx
<SegmentedButton
  fullWidth
  value={value}
  onChange={setValue}
  options={options}
  aria-label="Full width view"
/>
```

## With Icons

```tsx
import { List, Grid, Table } from '@spexop/icons';

<SegmentedButton
  value={viewMode}
  onChange={setViewMode}
  options={[
    { value: 'list', label: 'List', icon: <List size={16} /> },
    { value: 'grid', label: 'Grid', icon: <Grid size={16} /> },
    { value: 'table', label: 'Table', icon: <Table size={16} /> },
  ]}
  aria-label="Select view mode"
/>
```

## Icon Only

```tsx
<SegmentedButton
  value={alignment}
  onChange={setAlignment}
  options={[
    { value: 'left', icon: <AlignLeft size={16} />, 'aria-label': 'Align left' },
    { value: 'center', icon: <AlignCenter size={16} />, 'aria-label': 'Align center' },
    { value: 'right', icon: <AlignRight size={16} />, 'aria-label': 'Align right' },
  ]}
  aria-label="Text alignment"
/>
```

## Disabled Options

```tsx
<SegmentedButton
  value={plan}
  onChange={setPlan}
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]}
  aria-label="Plan selection"
/>
```

## Common Patterns

### View Mode Toggle

```tsx
function ProductList() {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <Container maxWidth="xl" padding={8}>
      <div className="toolbar">
        <h1>Products</h1>
        <SegmentedButton
          value={viewMode}
          onChange={setViewMode}
          options={[
            { value: 'list', label: 'List', icon: <List size={16} /> },
            { value: 'grid', label: 'Grid', icon: <Grid size={16} /> },
          ]}
          aria-label="Change view mode"
        />
      </div>
      
      {viewMode === 'grid' ? (
        <ProductGrid products={products} />
      ) : (
        <ProductList products={products} />
      )}
    </Container>
  );
}
```

### Sort Control

```tsx
function SortedList() {
  const [sortBy, setSortBy] = useState('recent');

  return (
    <>
      <SegmentedButton
        value={sortBy}
        onChange={setSortBy}
        options={[
          { value: 'recent', label: 'Recent' },
          { value: 'popular', label: 'Popular' },
          { value: 'trending', label: 'Trending' },
        ]}
        aria-label="Sort by"
      />
      
      <ItemList items={sortedItems} />
    </>
  );
}
```

### Filter Tabs

```tsx
function FilteredContent() {
  const [filter, setFilter] = useState('all');
  const counts = { all: 42, active: 28, archived: 14 };

  return (
    <>
      <SegmentedButton
        value={filter}
        onChange={setFilter}
        options={[
          { value: 'all', label: `All (${counts.all})` },
          { value: 'active', label: `Active (${counts.active})` },
          { value: 'archived', label: `Archived (${counts.archived})` },
        ]}
        aria-label="Filter items"
      />
      
      <FilteredList filter={filter} />
    </>
  );
}
```

### Text Formatting

```tsx
function EditorToolbar() {
  const [alignment, setAlignment] = useState('left');

  return (
    <div className="toolbar">
      <SegmentedButton
        value={alignment}
        onChange={setAlignment}
        options={[
          { 
            value: 'left',
            icon: <AlignLeft size={16} />,
            'aria-label': 'Align left'
          },
          { 
            value: 'center',
            icon: <AlignCenter size={16} />,
            'aria-label': 'Align center'
          },
          { 
            value: 'right',
            icon: <AlignRight size={16} />,
            'aria-label': 'Align right'
          },
          { 
            value: 'justify',
            icon: <AlignJustify size={16} />,
            'aria-label': 'Justify'
          },
        ]}
        aria-label="Text alignment"
      />
    </div>
  );
}
```

### Chart Type Selector

```tsx
function ChartControls() {
  const [chartType, setChartType] = useState('bar');

  return (
    <Card>
      <div className="chart-header">
        <h3>Sales Data</h3>
        <SegmentedButton
          value={chartType}
          onChange={setChartType}
          options={[
            { value: 'bar', label: 'Bar', icon: <BarChart size={16} /> },
            { value: 'line', label: 'Line', icon: <LineChart size={16} /> },
            { value: 'pie', label: 'Pie', icon: <PieChart size={16} /> },
          ]}
          aria-label="Chart type"
        />
      </div>
      
      {chartType === 'bar' && <BarChart data={data} />}
      {chartType === 'line' && <LineChart data={data} />}
      {chartType === 'pie' && <PieChart data={data} />}
    </Card>
  );
}
```

## Props

```typescript
interface SegmentedButtonProps {
  /** Current selected value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Button options */
  options: SegmentedButtonOption[];
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Full width mode */
  fullWidth?: boolean;
  /** Additional CSS class */
  className?: string;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ARIA labelledby */
  "aria-labelledby"?: string;
}

interface SegmentedButtonOption {
  value: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  "aria-label"?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Strong 2-3px borders instead of heavy shadows
2. **Typography before decoration** - Font weight (600/700) for hierarchy, not lighter colors
3. **Tokens before magic numbers** - All values from @spexop/theme design tokens
4. **Composition before complexity** - Simple, focused design
5. **Standards before frameworks** - Web platform fundamentals
6. **Accessibility before aesthetics** - WCAG AA+ compliance by default

## Accessibility

- ✅ ARIA role="radiogroup"
- ✅ Proper radio pattern (role="radio")
- ✅ Keyboard navigation (Arrow Left/Right)
- ✅ Focus management (roving tabindex)
- ✅ Screen reader announcements
- ✅ Disabled state indication
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Arrow Left` - Select previous option
- `Arrow Right` - Select next option
- `Home` - Select first option
- `End` - Select last option
- `Tab` - Move focus to/from control
- `Space/Enter` - Select focused option

## Animation

- **Selection indicator** - Smooth slide animation
- **Hover effect** - Subtle background change
- **Active state** - Clear visual feedback

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `SegmentedControl` - Similar with different styling
- `RadioGroup` - Traditional radio buttons
- `ButtonGroup` - Generic button grouping
- `Tabs` - Content switching

## Best Practices

1. **Use 2-5 options** - Too many becomes unwieldy
2. **Keep labels short** - One or two words
3. **Use icons consistently** - All or none
4. **Provide aria-label** - Required for screen readers
5. **Consider mobile** - Ensure options fit

## License

MIT
