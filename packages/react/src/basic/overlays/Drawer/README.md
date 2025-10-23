# Drawer Component

**Version**: 0.4.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A modern slide-out panel component that appears from any edge of the screen. Perfect for side navigation, settings panels, filters, and contextual content. Features smooth animations, backdrop blur, focus management, and mobile-first responsive design.

Following "The Spexop Way":

- **Principle 2**: Borders before shadows - strong borders with subtle shadow
- **Principle 3**: Typography before decoration - clear hierarchy
- **Principle 4**: Tokens before magic numbers - uses design tokens
- **Principle 7**: Accessibility before aesthetics - WCAG AA+ compliant

## Features

- ✅ 4 positions (left, right, top, bottom)
- ✅ Configurable sizes with responsive behavior
- ✅ Backdrop overlay with blur effect and click-to-close
- ✅ Focus trap when open (WCAG 2.2 AA compliant)
- ✅ Body scroll lock
- ✅ Escape key to close
- ✅ Smooth slide animations with modern easing
- ✅ Portal rendering for better z-index management
- ✅ Mobile-first responsive design
- ✅ Custom animation duration
- ✅ Focus restoration
- ✅ ARIA attributes for screen readers
- ✅ TypeScript support
- ✅ Theme-aware styling

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Drawer } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Drawer
      </button>
      
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
      >
        <h2>Drawer Content</h2>
        <p>This is a slide-out panel.</p>
      </Drawer>
    </>
  );
}
```

## Positions

### Right (Default)

Slides from the right edge.

```tsx
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="right"
>
  {/* Content */}
</Drawer>
```

### Left

Slides from the left edge.

```tsx
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="left"
>
  {/* Navigation menu */}
</Drawer>
```

### Top

Slides from the top edge.

```tsx
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="top"
>
  {/* Notifications */}
</Drawer>
```

### Bottom

Slides from the bottom edge.

```tsx
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="bottom"
>
  {/* Mobile filters */}
</Drawer>
```

## Sizes

### Custom Width/Height

```tsx
{/* Fixed width */}
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="right"
  size="400px"
>
  {/* Content */}
</Drawer>

{/* Percentage width */}
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="left"
  size="80%"
>
  {/* Content */}
</Drawer>

{/* Full width */}
<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  position="top"
  size="100%"
>
  {/* Content */}
</Drawer>
```

## Common Use Cases

### Navigation Menu

```tsx
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
        size="320px"
      >
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </Drawer>
    </>
  );
}
```

### Settings Panel

```tsx
function SettingsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="right"
      size="420px"
    >
      <h2>Settings</h2>
      
      <SettingsCard title="Theme">
        <Select value={theme} onChange={setTheme}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </Select>
      </SettingsCard>
      
      <Button onClick={() => setIsOpen(false)}>
        Close
      </Button>
    </Drawer>
  );
}
```

### Filter Panel

```tsx
function FilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 100],
    inStock: true,
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="left"
      size="360px"
    >
      <h2>Filters</h2>
      
      <Select
        label="Category"
        value={filters.category}
        onChange={(e) => 
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </Select>
      
      <Toggle
        label="In Stock Only"
        checked={filters.inStock}
        onChange={(checked) =>
          setFilters({ ...filters, inStock: checked })
        }
      />
      
      <Button onClick={() => setIsOpen(false)}>
        Apply Filters
      </Button>
    </Drawer>
  );
}
```

### Sheet (Bottom Drawer)

```tsx
function MobileSheet() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="bottom"
      size="auto"
    >
      <div style={{ padding: '24px' }}>
        <h3>Share</h3>
        <button>Copy Link</button>
        <button>Email</button>
        <button>Social Media</button>
      </div>
    </Drawer>
  );
}
```

## Props

```typescript
interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer content */
  children?: React.ReactNode;
  /** Drawer position */
  position?: "left" | "right" | "top" | "bottom";
  /** Drawer width (for left/right) or height (for top/bottom) */
  size?: string;
  /** Whether to show backdrop */
  showBackdrop?: boolean;
  /** Whether clicking backdrop closes drawer */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape closes drawer */
  closeOnEscape?: boolean;
  /** Whether to lock body scroll when open */
  lockScroll?: boolean;
  /** Whether to trap focus within drawer */
  trapFocus?: boolean;
  /** Custom className for drawer */
  className?: string;
  /** Custom className for backdrop */
  backdropClassName?: string;
  /** ARIA label for drawer */
  "aria-label"?: string;
  /** ARIA labelledby for drawer */
  "aria-labelledby"?: string;
  /** ARIA describedby for drawer */
  "aria-describedby"?: string;
  /** Whether to render drawer in a portal */
  portal?: boolean;
  /** Portal container element */
  portalContainer?: HTMLElement;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Whether to prevent body scroll */
  preventBodyScroll?: boolean;
  /** Custom ID for the drawer */
  id?: string;
  /** Ref to element that should receive focus when drawer opens */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** Whether to restore focus to trigger element on close */
  restoreFocus?: boolean;
}
```

## Advanced Usage

### Custom Animation Duration

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  animationDuration={500}
  position="right"
>
  <h2>Slow Animation Drawer</h2>
  <p>This drawer animates over 500ms</p>
</Drawer>
```

### Portal Rendering

```tsx
// Render in custom container
const customContainer = document.getElementById('drawer-portal');

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  portalContainer={customContainer}
>
  <h2>Custom Portal Drawer</h2>
  <p>Rendered in custom container</p>
</Drawer>

// Disable portal rendering
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  portal={false}
>
  <h2>Inline Drawer</h2>
  <p>Rendered inline with parent</p>
</Drawer>
```

### Focus Management

```tsx
const focusRef = useRef<HTMLInputElement>(null);

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  initialFocusRef={focusRef}
  restoreFocus={true}
>
  <h2>Focus Management</h2>
  <input ref={focusRef} placeholder="This input will be focused" />
  <button>Action</button>
</Drawer>
```

### Accessibility Features

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  aria-label="Settings panel"
  aria-labelledby="settings-title"
  aria-describedby="settings-description"
>
  <h2 id="settings-title">Settings</h2>
  <p id="settings-description">Configure your application settings</p>
  <div>Settings content...</div>
</Drawer>
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Strong borders with subtle shadow for clear separation
2. **Typography before decoration** - Clear content hierarchy with font weights
3. **Tokens before magic numbers** - Uses design tokens for consistent spacing and colors
4. **Accessibility before aesthetics** - WCAG AA+ compliant with focus trap and keyboard support

## Accessibility

- ✅ Focus trap when open
- ✅ Focus returns to trigger on close
- ✅ Escape key closes drawer
- ✅ Body scroll lock when open
- ✅ ARIA role="dialog"
- ✅ ARIA labels for screen readers
- ✅ Backdrop click closes drawer
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Escape` - Close drawer
- `Tab` - Cycle through focusable elements (trapped in drawer)
- `Shift + Tab` - Reverse cycle

## Animation

Modern slide animations with improved easing:

- **Duration**: 300ms (customizable)
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1) (Material Design easing)
- **Transform**: translateX/translateY based on position
- **Backdrop**: 200ms fade with blur effect
- **Content**: Staggered animation with 100ms delay

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Modal` - Centered dialog overlay
- `Sidebar` - Persistent side navigation
- `Popover` - Floating content container
- `CommandPalette` - Quick actions overlay

## License

MIT
