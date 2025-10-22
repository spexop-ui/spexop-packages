# Icon Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A flexible icon component with wrapper shapes, visual variants, and color options. Supports @spexop/icons by name or custom icon components with full accessibility and theme support.

## Features

- ✅ Support for @spexop/icons by name
- ✅ Custom icon component support
- ✅ 4 sizes (sm: 16px, md: 20px, lg: 24px, xl: 32px)
- ✅ 3 wrapper shapes (circle, square, rounded)
- ✅ 5 visual variants (default, filled, outlined, soft, ghost)
- ✅ 6 color variants (default, primary, success, error, warning, info)
- ✅ WCAG AAA compliant color combinations
- ✅ Theme-aware styling (light & dark mode)
- ✅ Consistent sizing with design tokens
- ✅ TypeScript support
- ✅ Accessible by default

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { Icon } from '@spexop/react';

function App() {
  return (
    <>
      {/* Basic icon */}
      <Icon name="Home" size="md" />
      
      {/* Icon with wrapper and color */}
      <Icon 
        name="Check" 
        wrapper="circle" 
        variant="soft" 
        color="success" 
      />
      
      {/* Custom icon */}
      <Icon size="lg">
        <CustomIcon />
      </Icon>
    </>
  );
}
```

## Sizes

### Small (sm) - 16px

```tsx
<Icon name="Check" size="sm" />
```

### Medium (md) - 20px (Default)

```tsx
<Icon name="User" size="md" />
```

### Large (lg) - 24px

```tsx
<Icon name="Settings" size="lg" />
```

### Extra Large (xl) - 32px

```tsx
<Icon name="Heart" size="xl" />
```

## Wrapper Shapes

Icons can be wrapped in different shapes for visual emphasis:

### None (Default)

No wrapper, just the icon:

```tsx
<Icon name="Heart" />
```

### Circle

Circular wrapper with padding:

```tsx
<Icon name="Check" wrapper="circle" variant="soft" color="success" />
<Icon name="Heart" wrapper="circle" variant="filled" color="primary" />
```

### Square

Square wrapper with padding:

```tsx
<Icon name="Settings" wrapper="square" variant="outlined" color="default" />
```

### Rounded

Rounded rectangle wrapper:

```tsx
<Icon name="Info" wrapper="rounded" variant="soft" color="info" />
```

## Visual Variants

Control the emphasis level and background style:

### Default

Minimal, no background (original behavior):

```tsx
<Icon name="Home" />
```

### Filled

Solid colored background with white icon:

```tsx
<Icon name="Check" wrapper="circle" variant="filled" color="success" />
<Icon name="Heart" wrapper="circle" variant="filled" color="primary" />
```

### Outlined

Border only, transparent background (follows "Borders before shadows"):

```tsx
<Icon name="Settings" wrapper="circle" variant="outlined" color="primary" />
<Icon name="Info" wrapper="circle" variant="outlined" color="info" />
```

### Soft

Subtle background with high-contrast text:

```tsx
<Icon name="Check" wrapper="circle" variant="soft" color="success" />
<Icon name="AlertTriangle" wrapper="rounded" variant="soft" color="warning" />
```

### Ghost

Transparent with subtle hover effect:

```tsx
<Icon name="Search" wrapper="circle" variant="ghost" />
```

## Color Variants

Semantic colors with intelligent accessibility:

### Default (default)

Inherits color from parent (original behavior):

```tsx
<Icon name="Heart" />
```

### Primary

Brand color (red by default):

```tsx
<Icon name="Heart" color="primary" />
<Icon name="Star" wrapper="circle" variant="filled" color="primary" />
```

### Success

Green for positive states:

```tsx
<Icon name="Check" color="success" />
<Icon name="CheckCircle" wrapper="circle" variant="soft" color="success" />
```

### Error

Red for errors:

```tsx
<Icon name="X" color="error" />
<Icon name="XCircle" wrapper="circle" variant="filled" color="error" />
```

### Warning

Orange/yellow for warnings:

```tsx
<Icon name="AlertTriangle" color="warning" />
<Icon name="AlertCircle" wrapper="rounded" variant="soft" color="warning" />
```

### Info

Blue for informational states:

```tsx
<Icon name="Info" color="info" />
<Icon name="InfoCircle" wrapper="circle" variant="soft" color="info" />
```

## Using @spexop/icons

### By Name

```tsx
<Icon name="Home" />
<Icon name="User" />
<Icon name="Settings" />
<Icon name="Search" />
<Icon name="Bell" />
```

### Available Icons

The Icon component supports all icons from @spexop/icons package. Common icons include:

- **Navigation:** Home, ChevronLeft, ChevronRight, ChevronUp, ChevronDown
- **Actions:** Plus, Edit, Trash, Save, Check, X, Copy, Download, Upload
- **UI:** Search, Settings, User, Heart, Star, Info
- **Design:** Grid, Layout, Type, Droplet, Package, FileText
- **And many more...**

## Using Custom Icons

### React Component

```tsx
import { Icon } from '@spexop/react';
import { CustomIcon } from './icons';

<Icon size="md">
  <CustomIcon />
</Icon>
```

### SVG Element

```tsx
<Icon size="lg">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
</Icon>
```

### Emoji or Unicode

```tsx
<Icon size="md">
  <span>⭐</span>
</Icon>
```

## Common Patterns

### Icon with Text

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Icon name="Home" size="sm" />
  <span>Home</span>
</div>
```

### Icon Button

```tsx
<button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Icon name="Plus" size="sm" />
  Add Item
</button>
```

### Status Indicators

```tsx
function StatusIndicator({ status }) {
  const iconMap = {
    success: 'CheckCircle',
    error: 'XCircle',
    warning: 'AlertTriangle',
    info: 'Info',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon name={iconMap[status]} size="sm" />
      <span>{status}</span>
    </div>
  );
}
```

### Navigation Menu

```tsx
function NavMenu() {
  const menuItems = [
    { icon: 'Home', label: 'Dashboard' },
    { icon: 'Users', label: 'Team' },
    { icon: 'Settings', label: 'Settings' },
    { icon: 'HelpCircle', label: 'Help' },
  ];

  return (
    <nav>
      {menuItems.map(item => (
        <a key={item.label} href={`/${item.label.toLowerCase()}`}>
          <Icon name={item.icon} size="md" />
          {item.label}
        </a>
      ))}
    </nav>
  );
}
```

### Feature List

```tsx
function FeatureList() {
  const features = [
    'Fast performance',
    'Easy to use',
    'Fully accessible',
    'Dark mode support',
  ];

  return (
    <ul>
      {features.map(feature => (
        <li key={feature}>
          <Icon name="Check" size="sm" />
          {feature}
        </li>
      ))}
    </ul>
  );
}
```

### Icon Grid

```tsx
function IconGrid() {
  const icons = [
    'Home', 'User', 'Settings', 'Search',
    'Bell', 'Mail', 'Heart', 'Star',
  ];

  return (
    <Grid columns={4} gap={4}>
      {icons.map(icon => (
        <GridItem key={icon}>
          <div style={{ textAlign: 'center' }}>
            <Icon name={icon} size="lg" />
            <p>{icon}</p>
          </div>
        </GridItem>
      ))}
    </Grid>
  );
}
```

## Props

```typescript
interface IconProps {
  /** Icon name from @spexop/icons */
  name?: string;
  /** Custom ReactNode icon (takes precedence over name) */
  children?: ReactNode;
  /** Size of the icon */
  size?: "sm" | "md" | "lg" | "xl";
  /** Wrapper shape around the icon */
  wrapper?: "none" | "circle" | "square" | "rounded";
  /** Visual variant for emphasis */
  variant?: "default" | "filled" | "outlined" | "soft" | "ghost";
  /** Color variant with accessibility-first combinations */
  color?: "default" | "primary" | "success" | "error" | "warning" | "info";
  /** Additional CSS classes */
  className?: string;
}
```

### Default Values

All new props have sensible defaults for backward compatibility:

- `wrapper="none"` - No wrapper, original behavior
- `variant="default"` - No background, original behavior
- `color="default"` - Inherits color from parent

## Size Mapping

### Icon Sizes

| Size | Icon Size | Wrapper Size (with padding) |
|------|-----------|---------------------------|
| sm   | 16px      | 32px (16px + 8px padding) |
| md   | 20px      | 40px (20px + 10px padding) |
| lg   | 24px      | 48px (24px + 12px padding) |
| xl   | 32px      | 64px (32px + 16px padding) |

All sizes use design tokens from the theme system.

## Combination Examples

### Status Notifications

```tsx
// Success
<Icon name="Check" wrapper="circle" variant="soft" color="success" size="lg" />

// Error
<Icon name="X" wrapper="circle" variant="filled" color="error" size="md" />

// Warning
<Icon name="AlertTriangle" wrapper="rounded" variant="soft" color="warning" />
```

### Action Buttons

```tsx
// Primary action
<Icon name="Heart" wrapper="circle" variant="filled" color="primary" size="lg" />

// Secondary action
<Icon name="Settings" wrapper="circle" variant="outlined" color="default" />

// Ghost button
<Icon name="Search" wrapper="circle" variant="ghost" />
```

### Feature Highlights

```tsx
<Icon name="Zap" wrapper="rounded" variant="soft" color="primary" size="xl" />
<Icon name="Shield" wrapper="rounded" variant="soft" color="success" size="xl" />
<Icon name="Rocket" wrapper="rounded" variant="soft" color="info" size="xl" />
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Outlined variant uses 2px solid borders
2. **Typography before decoration** - Size and variant establish hierarchy
3. **Tokens before magic numbers** - All spacing uses theme tokens
4. **Standards before frameworks** - Leverages currentColor for theming
5. **Composition before complexity** - Supports both name and children
6. **Accessibility before aesthetics** - WCAG AAA compliant colors

### Color Accessibility

All color variants ensure high contrast:

- **Filled variants**: White icon on colored background (7:1+ contrast)
- **Soft variants**: Dark icon on light colored background (7:1+ contrast)
- **Outlined variants**: 2px colored border for clear definition
- **Default/Ghost**: Inherits contrast from parent context

## Accessibility

- ✅ WCAG AAA compliant color combinations (7:1+ contrast)
- ✅ Uses semantic span wrapper with role="img"
- ✅ Automatic aria-label when using name prop
- ✅ Inherits color from parent (currentColor) for flexibility
- ✅ Focus-visible styling for keyboard navigation
- ✅ Respects reduced motion preferences
- ✅ Screen reader compatible
- ✅ Theme-aware (adapts to light/dark modes)

### Accessibility Improvements (v0.3.2)

Recent enhancements ensure the highest accessibility standards:

- **High Contrast Colors**: All filled and soft variants exceed 7:1 contrast ratio
- **Clear Borders**: Outlined variant uses 2px borders (not shadows)
- **Semantic Colors**: Each color has clear meaning and proper contrast
- **Keyboard Support**: Focus-visible states for interactive icons

### Best Practices

**Decorative Icons:**

```tsx
<button aria-label="Close">
  <Icon name="X" wrapper="circle" variant="ghost" />
</button>
```

**Meaningful Icons:**

```tsx
<Icon 
  name="Check" 
  wrapper="circle" 
  variant="soft" 
  color="success"
  role="img" 
  aria-label="Successfully completed" 
/>
```

**Status Indicators:**

```tsx
<div role="status" aria-live="polite">
  <Icon name="Check" wrapper="circle" variant="filled" color="success" />
  <span>Task completed successfully</span>
</div>
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `IconButton` - Icon-only button
- `Badge` - Status indicators
- `Button` - Buttons with icons

## License

MIT
