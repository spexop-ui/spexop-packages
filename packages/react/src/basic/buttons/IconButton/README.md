# IconButton Component

**Version**: 0.4.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A modern, comprehensive icon-only button component with enhanced accessibility, modern UI/UX patterns, and extensive customization options. Used throughout navigation, toolbars, and interactive interfaces with support for 10 variants, 5 sizes, and advanced features like ripple effects and loading states.

## Features

- ✅ **10 comprehensive variants** (4 base + 6 semantic)
- ✅ **5 size options** including compact modes
- ✅ **Modern interactions** with ripple effects and press states
- ✅ **Loading and disabled states** with visual feedback
- ✅ **Enhanced accessibility** with comprehensive ARIA support
- ✅ **Full keyboard navigation** with Enter/Space support
- ✅ **Customizable icons** with size, color, and stroke width control
- ✅ **Ripple effects** for modern touch feedback
- ✅ **Press animations** for tactile feedback
- ✅ **Tooltip support** for additional context
- ✅ **TypeScript support** with comprehensive type definitions
- ✅ **Theme-aware styling** with design tokens
- ✅ **Mobile optimized** with proper touch targets
- ✅ **Reduced motion support** for accessibility

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { IconButton } from '@spexop/react';
import { Menu, Settings, Trash } from '@spexop/icons';

function App() {
  return (
    <div className="toolbar">
      <IconButton
        icon={Menu}
        label="Open menu"
        onClick={() => console.log('Menu opened')}
      />
      
      <IconButton
        icon={Settings}
        label="Settings"
        variant="outline"
        onClick={() => console.log('Settings opened')}
      />
      
      <IconButton
        icon={Trash}
        label="Delete item"
        variant="danger"
        onClick={handleDelete}
        loading={isDeleting}
      />
    </div>
  );
}
```

## Variants

### Base Variants (4)

#### Ghost (Default)

Transparent with subtle hover effect. Perfect for subtle actions.

```tsx
<IconButton
  icon={Menu}
  label="Menu"
  variant="ghost"
  onClick={handleClick}
/>
```

#### Solid

Filled background with icon. Great for secondary actions.

```tsx
<IconButton
  icon={Settings}
  label="Settings"
  variant="solid"
  onClick={handleClick}
/>
```

#### Outline

Border with transparent background. Ideal for secondary CTAs.

```tsx
<IconButton
  icon={X}
  label="Close"
  variant="outline"
  onClick={handleClick}
/>
```

#### Primary

Primary brand color. Use for main actions.

```tsx
<IconButton
  icon={Plus}
  label="Add"
  variant="primary"
  onClick={handleAdd}
/>
```

### Semantic Variants (6)

#### Danger

Destructive actions like delete or remove.

```tsx
<IconButton
  icon={Trash}
  label="Delete"
  variant="danger"
  onClick={handleDelete}
/>
```

#### Success

Positive actions like save or confirm.

```tsx
<IconButton
  icon={Check}
  label="Save"
  variant="success"
  onClick={handleSave}
/>
```

#### Warning

Caution actions like warnings or alerts.

```tsx
<IconButton
  icon={AlertTriangle}
  label="Warning"
  variant="warning"
  onClick={handleWarning}
/>
```

#### Info

Informational actions like help or details.

```tsx
<IconButton
  icon={Info}
  label="Info"
  variant="info"
  onClick={handleInfo}
/>
```

#### Secondary

Secondary brand color for alternative actions.

```tsx
<IconButton
  icon={Edit}
  label="Edit"
  variant="secondary"
  onClick={handleEdit}
/>
```

#### Neutral

Cancel or neutral actions.

```tsx
<IconButton
  icon={X}
  label="Cancel"
  variant="neutral"
  onClick={handleCancel}
/>
```

## Sizes

### Standard Sizes (3)

#### Small (sm)

Compact for tight spaces. 36x36px with 16px icon.

```tsx
<IconButton
  icon={Edit}
  label="Edit"
  size="sm"
  onClick={handleEdit}
/>
```

#### Medium (md) - Default

Standard size. 44x44px with 20px icon.

```tsx
<IconButton
  icon={Trash}
  label="Delete"
  size="md"
  onClick={handleDelete}
/>
```

#### Large (lg)

Prominent for emphasis. 52x52px with 24px icon.

```tsx
<IconButton
  icon={Plus}
  label="Add"
  size="lg"
  onClick={handleAdd}
/>
```

### Compact Sizes (2)

#### Compact Small (compactSm)

Dense UIs and toolbars. 32x32px with 14px icon.

```tsx
<IconButton
  icon={Settings}
  label="Settings"
  size="compactSm"
  onClick={handleSettings}
/>
```

#### Compact Medium (compactMd)

Slightly larger compact size. 36x36px with 16px icon.

```tsx
<IconButton
  icon={Search}
  label="Search"
  size="compactMd"
  onClick={handleSearch}
/>
```

## Modern Features

### Loading States

Show loading spinners for async operations.

```tsx
function DeleteButton({ isDeleting, onDelete }) {
  return (
    <IconButton
      icon={Trash}
      label="Delete item"
      variant="danger"
      onClick={onDelete}
      loading={isDeleting}
      loadingText="Deleting item..."
    />
  );
}
```

### Ripple Effects

Modern touch feedback with ripple animations.

```tsx
<IconButton
  icon={Plus}
  label="Add item"
  variant="primary"
  ripple={true}
  onClick={handleAdd}
/>
```

### Custom Icon Styling

Control icon appearance with size, color, and stroke width.

```tsx
<IconButton
  icon={Settings}
  label="Settings"
  iconSize={28}
  iconColor="#6366f1"
  strokeWidth={2}
  onClick={handleSettings}
/>
```

### Tooltips

Add contextual information with tooltips.

```tsx
<IconButton
  icon={Info}
  label="More information"
  tooltip="Click for detailed information about this feature"
  tooltipPosition="top"
  onClick={handleInfo}
/>
```

### Press Animations

Tactile feedback with press animations.

```tsx
<IconButton
  icon={Heart}
  label="Like"
  variant="ghost"
  pressAnimation={true}
  onClick={handleLike}
/>
```

## Common Patterns

### Navigation Actions

```tsx
function NavigationBar() {
  return (
    <div className="nav-actions">
      <IconButton
        icon={Menu}
        label="Open menu"
        onClick={() => setMenuOpen(true)}
      />
      
      <IconButton
        icon={Search}
        label="Search"
        onClick={() => setSearchOpen(true)}
      />
      
      <IconButton
        icon={Bell}
        label="Notifications"
        onClick={() => setNotificationsOpen(true)}
      />
      
      <IconButton
        icon={Settings}
        label="Settings"
        onClick={() => setSettingsOpen(true)}
      />
    </div>
  );
}
```

### Modal Close Button

```tsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <div className="modal-header">
    <h2>Title</h2>
    <IconButton
      icon={X}
      label="Close dialog"
      variant="ghost"
      onClick={handleClose}
    />
  </div>
</Modal>
```

### Toolbar Actions

```tsx
function EditorToolbar() {
  return (
    <ButtonGroup aria-label="Text formatting">
      <IconButton
        icon={Bold}
        label="Bold"
        onClick={() => formatText('bold')}
        variant={isBold ? 'solid' : 'ghost'}
      />
      
      <IconButton
        icon={Italic}
        label="Italic"
        onClick={() => formatText('italic')}
        variant={isItalic ? 'solid' : 'ghost'}
      />
      
      <IconButton
        icon={Underline}
        label="Underline"
        onClick={() => formatText('underline')}
        variant={isUnderline ? 'solid' : 'ghost'}
      />
    </ButtonGroup>
  );
}
```

### Floating Action Button

```tsx
<IconButton
  icon={Plus}
  label="Create new"
  variant="solid"
  size="lg"
  onClick={handleCreate}
  style={{
    position: 'fixed',
    bottom: '24px',
    right: '24px',
  }}
/>
```

### Card Actions

```tsx
function CardWithActions() {
  return (
    <Card>
      <div className="card-header">
        <h3>Card Title</h3>
        <div className="card-actions">
          <IconButton
            icon={Edit}
            label="Edit"
            size="sm"
            onClick={handleEdit}
          />
          <IconButton
            icon={Trash}
            label="Delete"
            size="sm"
            onClick={handleDelete}
          />
        </div>
      </div>
      <div className="card-body">
        Content
      </div>
    </Card>
  );
}
```

### Media Player Controls

```tsx
function MediaControls({ isPlaying }) {
  return (
    <div className="media-controls">
      <IconButton
        icon={SkipBack}
        label="Previous"
        onClick={handlePrevious}
      />
      
      <IconButton
        icon={isPlaying ? Pause : Play}
        label={isPlaying ? 'Pause' : 'Play'}
        onClick={handlePlayPause}
        variant="solid"
        size="lg"
      />
      
      <IconButton
        icon={SkipForward}
        label="Next"
        onClick={handleNext}
      />
      
      <IconButton
        icon={Volume2}
        label="Volume"
        onClick={handleVolumeToggle}
      />
    </div>
  );
}
```

## Props

```typescript
interface IconButtonProps {
  // Required props
  /** Icon component from @spexop/icons or SVG string (legacy) */
  icon: IconComponent | string;
  /** Accessible label (required for aria-label and title) */
  label: string;

  // Event handlers
  /** Click handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Keyboard event handler */
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /** Mouse enter handler */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Mouse leave handler */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  // Visual variants
  /** Visual variant */
  variant?: "ghost" | "solid" | "outline" | "primary" | "secondary" | 
           "danger" | "success" | "warning" | "info" | "neutral";
  /** Size variant */
  size?: "sm" | "md" | "lg" | "compactSm" | "compactMd";
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Button type */
  type?: "button" | "submit" | "reset";

  // Icon customization
  /** Custom icon size in pixels */
  iconSize?: number;
  /** Custom stroke width for icon */
  strokeWidth?: number;
  /** Custom color for icon */
  iconColor?: string;

  // Modern features
  /** Whether to show ripple effect on click */
  ripple?: boolean;
  /** Whether to show press animation */
  pressAnimation?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Loading spinner size */
  spinnerSize?: number;
  /** Loading text for screen readers */
  loadingText?: string;

  // Accessibility
  /** ARIA label for screen readers */
  "aria-label"?: string;
  /** ARIA described by */
  "aria-describedby"?: string;
  /** ARIA expanded state */
  "aria-expanded"?: boolean;
  /** ARIA pressed state */
  "aria-pressed"?: boolean;
  /** ARIA controls */
  "aria-controls"?: string;
  /** ARIA live region */
  "aria-live"?: "off" | "polite" | "assertive";

  // Data attributes
  /** Custom data attributes */
  "data-testid"?: string;
  /** Custom data attributes */
  "data-variant"?: string;
  /** Custom data attributes */
  "data-size"?: string;

  // Tooltips
  /** Tooltip content */
  tooltip?: string;
  /** Tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";

  // State management
  /** Whether the button is currently pressed */
  pressed?: boolean;
  /** Whether the button is currently focused */
  focused?: boolean;
  /** Custom children (for advanced use cases) */
  children?: ReactNode;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on foundational button primitives
2. **Borders before shadows** - Clean borders for visual separation
3. **Typography before decoration** - Clear accessible labels and tooltips
4. **Tokens before magic numbers** - Comprehensive design token usage
5. **Composition before complexity** - Modular features that compose well
6. **Standards before frameworks** - Web platform fundamentals
7. **Accessibility before aesthetics** - WCAG AA+ compliance by default

### Modern UI/UX Patterns

- **Ripple effects** for tactile feedback
- **Press animations** for visual confirmation
- **Loading states** with spinner animations
- **Enhanced focus indicators** for keyboard navigation
- **Touch-optimized sizing** for mobile devices
- **Reduced motion support** for accessibility
- **High contrast mode** compatibility
- **Dark mode** support with theme tokens

## Accessibility

- ✅ **Semantic HTML** (`<button>` element)
- ✅ **Required `aria-label`** for screen readers
- ✅ **Comprehensive ARIA support** (expanded, pressed, controls, live regions)
- ✅ **Tooltip title** on hover
- ✅ **Keyboard navigation** (Tab, Enter, Space)
- ✅ **Enhanced focus indicators** with high contrast support
- ✅ **Disabled state** properly communicated
- ✅ **Loading state** announced to screen readers
- ✅ **Reduced motion** support for accessibility
- ✅ **High contrast mode** compatibility
- ✅ **WCAG AA+ compliant** by default

### Keyboard Shortcuts

- `Tab` - Focus button
- `Enter/Space` - Activate button
- `Shift + Tab` - Focus previous element
- `Escape` - Close dropdowns/modals (when applicable)

### Screen Reader Support

- **Loading states** are announced with `aria-live` regions
- **Custom loading text** for better context
- **ARIA attributes** for complex interactions
- **Focus management** for dynamic content

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Button` - Regular button with text
- `Icon` - Icon display
- `Badge` - Status indicators

## Best Practices

### Accessibility Guidelines

1. **Always provide label** - Required for accessibility
2. **Use semantic variants** - Danger for delete, success for save
3. **Provide loading feedback** - Use loading state for async operations
4. **Include loading text** - Help screen readers understand state changes
5. **Test with keyboard** - Ensure full keyboard navigation

### Visual Design

1. **Use appropriate variant** - Ghost for subtle, primary for main actions
2. **Consider touch targets** - Minimum 44px for mobile (48px recommended)
3. **Group related actions** - Use consistent spacing and alignment
4. **Provide visual feedback** - Hover, active, and focus states
5. **Use consistent sizing** - Stick to the size scale for consistency

### Performance

1. **Disable ripple on low-end devices** - Use `ripple={false}` if needed
2. **Optimize icon loading** - Use React components over SVG strings
3. **Minimize re-renders** - Use `useCallback` for event handlers
4. **Test on mobile** - Ensure smooth animations on touch devices

### Modern Patterns

1. **Use loading states** - Show progress for async operations
2. **Add tooltips** - Provide additional context when needed
3. **Enable press animations** - Enhance tactile feedback
4. **Customize icons** - Use appropriate colors and sizes
5. **Test reduced motion** - Ensure accessibility compliance

## License

MIT
