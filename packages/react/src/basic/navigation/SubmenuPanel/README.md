# SubmenuPanel Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A floating submenu panel that displays next to sidebar items. Features animations, keyboard navigation, and accessibility support for nested navigation.

## Features

- ✅ Floating panel positioning
- ✅ Submenu items with icons
- ✅ Smooth enter/exit animations
- ✅ Mobile close button
- ✅ Full keyboard navigation (Arrow keys, Home, End, Escape)
- ✅ Auto-positioning with top prop
- ✅ Click outside to close (Escape key)
- ✅ Responsive mobile/desktop layout
- ✅ Focus management and trapping
- ✅ WCAG AAA accessibility compliance
- ✅ TypeScript support with JSDoc
- ✅ Theme token integration

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { SubmenuPanel } from '@spexop/react';
import { FileText, Image, Video } from '@spexop/icons';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <SubmenuPanel
          title="Components"
          items={[
            { label: 'Button', href: '/button', icon: FileText },
            { label: 'Card', href: '/card', icon: Image },
            { label: 'Modal', href: '/modal', icon: Video },
          ]}
          top={100}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

## Basic Usage

### Simple Submenu

```tsx
<SubmenuPanel
  title="Settings"
  items={[
    { label: 'Profile', href: '/settings/profile' },
    { label: 'Account', href: '/settings/account' },
    { label: 'Privacy', href: '/settings/privacy' },
  ]}
  top={150}
  onClose={handleClose}
/>
```

### With Icons

```tsx
import { User, Lock, Bell, CreditCard } from '@spexop/icons';

<SubmenuPanel
  title="Account"
  items={[
    { label: 'Profile', href: '/account/profile', icon: User },
    { label: 'Security', href: '/account/security', icon: Lock },
    { label: 'Notifications', href: '/account/notifications', icon: Bell },
    { label: 'Billing', href: '/account/billing', icon: CreditCard },
  ]}
  top={200}
  onClose={handleClose}
  onItemClick={handleItemClick}
/>
```

### Closing Animation

```tsx
function AnimatedSubmenu() {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 500); // Match CSS animation duration
  };

  return (
    <>
      {isOpen && (
        <SubmenuPanel
          title="Components"
          items={submenuItems}
          top={120}
          isClosing={isClosing}
          onClose={handleClose}
        />
      )}
    </>
  );
}
```

## Common Patterns

### Sidebar with Submenu

```tsx
import { SubmenuPanel } from '@spexop/react';
import { Layers, Book, MousePointer, Square, Maximize, Rocket, CheckCircle } from '@spexop/icons';
import { useState } from 'react';

function SidebarWithSubmenu() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [submenuTop, setSubmenuTop] = useState(0);

  const handleItemHover = (itemId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setActiveSubmenu(itemId);
    setSubmenuTop(rect.top);
  };

  const navItems = [
    {
      id: 'components',
      label: 'Components',
      icon: Layers,
      submenu: [
        { label: 'Button', href: '/components/button', icon: MousePointer },
        { label: 'Card', href: '/components/card', icon: Square },
        { label: 'Modal', href: '/components/modal', icon: Maximize },
      ],
    },
    {
      id: 'guides',
      label: 'Guides',
      icon: Book,
      submenu: [
        { label: 'Getting Started', href: '/guides/start', icon: Rocket },
        { label: 'Best Practices', href: '/guides/practices', icon: CheckCircle },
      ],
    },
  ];

  return (
    <>
      <div className="sidebar">
        {navItems.map(item => (
          <div
            key={item.id}
            onMouseEnter={(e) => handleItemHover(item.id, e)}
            onMouseLeave={() => setActiveSubmenu(null)}
          >
            {item.label}
          </div>
        ))}
      </div>
      
      {activeSubmenu && (
        <SubmenuPanel
          title={navItems.find(item => item.id === activeSubmenu)?.label}
          items={navItems.find(item => item.id === activeSubmenu)?.submenu}
          top={submenuTop}
          onClose={() => setActiveSubmenu(null)}
          onItemClick={() => setActiveSubmenu(null)}
        />
      )}
    </>
  );
}
```

### Settings Menu

```tsx
import { SubmenuPanel } from '@spexop/react';
import { User, Lock, Bell, CreditCard, Shield } from '@spexop/icons';

function SettingsMenu() {
  const settingsItems = [
    { label: 'Profile', href: '/settings/profile', icon: User },
    { label: 'Security', href: '/settings/security', icon: Lock },
    { label: 'Notifications', href: '/settings/notifications', icon: Bell },
    { label: 'Billing', href: '/settings/billing', icon: CreditCard },
    { label: 'Privacy', href: '/settings/privacy', icon: Shield },
  ];

  return (
    <SubmenuPanel
      title="Settings"
      items={settingsItems}
      top={80}
      onClose={handleClose}
    />
  );
}
```

### Documentation Navigation

```tsx
import { SubmenuPanel } from '@spexop/react';
import { Book, Code, Rocket, Package } from '@spexop/icons';

function DocsNavigation() {
  const docsItems = [
    { label: 'Installation', href: '/docs/installation', icon: Rocket },
    { label: 'Quick Start', href: '/docs/quick-start', icon: Book },
    { label: 'API Reference', href: '/docs/api', icon: Code },
    { label: 'Components', href: '/docs/components', icon: Package },
  ];

  return (
    <SubmenuPanel
      title="Documentation"
      items={docsItems}
      onClose={handleClose}
    />
  );
}
```

## Props

```typescript
interface SubmenuPanelProps {
  /** Submenu title */
  title: string;
  /** Submenu items */
  items: SubmenuItem[];
  /** Top position (from parent item) */
  top?: number;
  /** Closing animation state */
  isClosing?: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Callback when item is clicked */
  onItemClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

interface SubmenuItem {
  label: string;
  href: string;
  icon?: IconComponent;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean panel border
2. **Typography before decoration** - Clear item labels
3. **Tokens before magic numbers** - Uses spacing tokens
4. **Accessibility before aesthetics** - Keyboard accessible

## Accessibility

- ✅ Full keyboard navigation (Arrow keys, Home, End, Escape)
- ✅ Focus management with proper trapping
- ✅ Escape key closes panel
- ✅ Screen reader support with ARIA labels
- ✅ `role="navigation"` for semantic structure
- ✅ `aria-label` for context
- ✅ `aria-labelledby` for title association
- ✅ `aria-hidden` on decorative icons
- ✅ 44px minimum touch targets on mobile
- ✅ WCAG AAA contrast ratios
- ✅ Focus visible indicators

### Keyboard Shortcuts

- **Escape** - Close submenu
- **Arrow Down** - Focus next item (wraps to first)
- **Arrow Up** - Focus previous item (wraps to last)
- **Home** - Focus first item
- **End** - Focus last item
- **Tab** - Navigate through items
- **Enter** - Activate focused link
- **Space** - Activate focused link

## Animation

- **Fade in** on open (150ms)
- **Fade out** on close (150ms)
- **Slide** subtle movement

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Sidebar` - Parent navigation container
- `NavSection` - Navigation section grouping
- `Dropdown` - Alternative menu component
- `CommandPalette` - Command-based navigation
- `Sheet` - Sliding panel component

## Usage Guide

See the comprehensive [USAGE-GUIDE.md](./USAGE-GUIDE.md) for:

- Detailed use cases and examples
- Advanced patterns and techniques
- Performance optimization tips
- Troubleshooting common issues
- Accessibility best practices
- Custom styling guidance

## Migration

This component follows semantic versioning. Future updates will:

- Maintain backward compatibility for minor versions
- Provide clear migration guides for major versions
- Deprecate features with warnings before removal
- Document all breaking changes in CHANGELOG

## Contributing

Found a bug or have a feature request? Please:

1. Check existing issues
2. Create a detailed bug report or feature request
3. Include reproduction steps and examples
4. Follow the contribution guidelines

## License

MIT
