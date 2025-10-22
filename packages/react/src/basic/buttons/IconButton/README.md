# IconButton Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A consistent, accessible button component for icon-only actions. Used throughout navigation components with multiple variants and sizes.

## Features

- ✅ Icon-only button design
- ✅ 3 variants (ghost, solid, outline)
- ✅ 3 sizes (sm, md, lg)
- ✅ Disabled state support
- ✅ Full keyboard navigation
- ✅ Accessible labels required
- ✅ TypeScript support
- ✅ Theme-aware styling

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { IconButton } from '@spexop/react';
import { Menu } from '@spexop/icons';

function App() {
  return (
    <IconButton
      icon={Menu}
      label="Open menu"
      onClick={() => console.log('Menu opened')}
    />
  );
}
```

## Variants

### Ghost (Default)

Transparent with subtle hover effect.

```tsx
<IconButton
  icon={Menu}
  label="Menu"
  variant="ghost"
  onClick={handleClick}
/>
```

### Solid

Filled background with icon.

```tsx
<IconButton
  icon={Settings}
  label="Settings"
  variant="solid"
  onClick={handleClick}
/>
```

### Outline

Border with transparent background.

```tsx
<IconButton
  icon={X}
  label="Close"
  variant="outline"
  onClick={handleClick}
/>
```

## Sizes

### Small (sm)

Compact for tight spaces.

```tsx
<IconButton
  icon={Edit}
  label="Edit"
  size="sm"
  onClick={handleEdit}
/>
```

### Medium (md) - Default

Standard size.

```tsx
<IconButton
  icon={Trash}
  label="Delete"
  size="md"
  onClick={handleDelete}
/>
```

### Large (lg)

Prominent for emphasis.

```tsx
<IconButton
  icon={Plus}
  label="Add"
  size="lg"
  onClick={handleAdd}
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
  /** Icon component from @spexop/icons or SVG string */
  icon: IconComponent | string;
  /** Accessible label (required for aria-label and title) */
  label: string;
  /** Click handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Visual variant */
  variant?: "ghost" | "solid" | "outline";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Button type */
  type?: "button" | "submit" | "reset";
  /** Custom stroke width for icon */
  strokeWidth?: number;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean border for outline variant
2. **Typography before decoration** - Clear accessible labels
3. **Tokens before magic numbers** - Uses size and spacing tokens
4. **Accessibility before aesthetics** - Required labels for screen readers

## Accessibility

- ✅ Semantic HTML (`<button>` element)
- ✅ Required `aria-label` for screen readers
- ✅ Tooltip title on hover
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ Focus indicators
- ✅ Disabled state properly communicated
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Tab` - Focus button
- `Enter/Space` - Activate button
- `Shift + Tab` - Focus previous element

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

1. **Always provide label** - Required for accessibility
2. **Use appropriate variant** - Ghost for subtle, solid for primary
3. **Consider touch targets** - Minimum 44px for mobile
4. **Group related actions** - Use ButtonGroup
5. **Provide visual feedback** - Hover and active states

## License

MIT
