# SubmenuPanel - Usage Guide

**Component Version**: v1.0.0
**Last Updated**: October 20, 2025
**Compatibility**: Stable API

## Quick Start

### Installation

```bash
pnpm add @spexop/react @spexop/icons
```

### Basic Example

```tsx
import { SubmenuPanel } from '@spexop/react';
import { FileText, Image, Video } from '@spexop/icons';

const submenuItems = [
  { label: 'Button', href: '/components/button', icon: FileText },
  { label: 'Card', href: '/components/card', icon: Image },
  { label: 'Modal', href: '/components/modal', icon: Video }
];

function MySubmenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <SubmenuPanel
          title="Components"
          items={submenuItems}
          top={100}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

## Common Use Cases

### Sidebar Navigation with Submenus

Perfect for multi-level navigation in applications:

```tsx
import { SubmenuPanel } from '@spexop/react';
import { FileText, Image, Layout, Settings } from '@spexop/icons';
import { useState } from 'react';

function SidebarWithSubmenus() {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [submenuTop, setSubmenuTop] = useState(0);

  const handleMenuItemHover = (menuId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setActiveSubmenu(menuId);
    setSubmenuTop(rect.top);
  };

  const componentItems = [
    { label: 'Button', href: '/components/button', icon: FileText },
    { label: 'Card', href: '/components/card', icon: Image },
    { label: 'Modal', href: '/components/modal', icon: Layout }
  ];

  return (
    <>
      <div className="sidebar">
        <div
          onMouseEnter={(e) => handleMenuItemHover('components', e)}
          onMouseLeave={() => setActiveSubmenu(null)}
        >
          Components
        </div>
      </div>

      {activeSubmenu === 'components' && (
        <SubmenuPanel
          title="Components"
          items={componentItems}
          top={submenuTop}
          onClose={() => setActiveSubmenu(null)}
        />
      )}
    </>
  );
}
```

### Settings Menu Panel

Contextual settings navigation:

```tsx
import { SubmenuPanel } from '@spexop/react';
import { User, Lock, Bell, CreditCard, Shield } from '@spexop/icons';

function SettingsPanel() {
  const settingsItems = [
    { label: 'Profile', href: '/settings/profile', icon: User },
    { label: 'Security', href: '/settings/security', icon: Lock },
    { label: 'Notifications', href: '/settings/notifications', icon: Bell },
    { label: 'Billing', href: '/settings/billing', icon: CreditCard },
    { label: 'Privacy', href: '/settings/privacy', icon: Shield }
  ];

  return (
    <SubmenuPanel
      title="Settings"
      items={settingsItems}
      top={80}
      onClose={handleClose}
      onItemClick={() => {
        console.log('Setting selected');
      }}
    />
  );
}
```

### Documentation Navigation

Multi-section documentation menu:

```tsx
import { SubmenuPanel } from '@spexop/react';
import { Book, Code, Rocket, Package } from '@spexop/icons';

function DocsNavigation() {
  const [section, setSection] = useState(null);

  const gettingStartedItems = [
    { label: 'Installation', href: '/docs/installation', icon: Rocket },
    { label: 'Quick Start', href: '/docs/quick-start', icon: Book },
    { label: 'Configuration', href: '/docs/config', icon: Package }
  ];

  const apiItems = [
    { label: 'Components', href: '/docs/api/components', icon: Code },
    { label: 'Hooks', href: '/docs/api/hooks', icon: Code },
    { label: 'Utils', href: '/docs/api/utils', icon: Code }
  ];

  return (
    <>
      {section === 'getting-started' && (
        <SubmenuPanel
          title="Getting Started"
          items={gettingStartedItems}
          onClose={() => setSection(null)}
        />
      )}

      {section === 'api' && (
        <SubmenuPanel
          title="API Reference"
          items={apiItems}
          onClose={() => setSection(null)}
        />
      )}
    </>
  );
}
```

### Dashboard Quick Actions

Quick access to dashboard sections:

```tsx
import { SubmenuPanel } from '@spexop/react';
import { BarChart, Users, ShoppingCart, DollarSign } from '@spexop/icons';

function DashboardActions() {
  const actionItems = [
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
    { label: 'Customers', href: '/dashboard/customers', icon: Users },
    { label: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
    { label: 'Revenue', href: '/dashboard/revenue', icon: DollarSign }
  ];

  return (
    <SubmenuPanel
      title="Quick Actions"
      items={actionItems}
      top={60}
      onClose={handleClose}
    />
  );
}
```

## Features and Props

### Positioning

Control where the submenu appears:

```tsx
<SubmenuPanel
  title="Menu"
  items={items}
  top={120}                     // Position from top of viewport in pixels
/>
```

Dynamic positioning based on parent:

```tsx
function DynamicSubmenu() {
  const [position, setPosition] = useState(0);

  const handleHover = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition(rect.top);
  };

  return (
    <SubmenuPanel
      title="Menu"
      items={items}
      top={position}
    />
  );
}
```

### Animation Control

Smooth enter/exit animations:

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
          title="Menu"
          items={items}
          isClosing={isClosing}
          onClose={handleClose}
        />
      )}
    </>
  );
}
```

### Event Handlers

Track user interactions:

```tsx
<SubmenuPanel
  title="Menu"
  items={items}
  onClose={() => {
    console.log('Submenu closed');
    setActiveSubmenu(null);
  }}
  onItemClick={() => {
    console.log('Item clicked');
    // Analytics tracking
    trackEvent('submenu_item_click');
  }}
/>
```

### Custom Styling

Apply custom styles:

```tsx
<SubmenuPanel
  title="Menu"
  items={items}
  className="my-custom-submenu"
/>
```

```css
/* Your custom styles */
.my-custom-submenu {
  /* Override with theme tokens */
  --submenu-width: 280px;
  box-shadow: var(--theme-shadow-lg);
}
```

## Accessibility

### Keyboard Navigation

The SubmenuPanel is fully keyboard accessible:

- **Escape**: Close submenu
- **Arrow Down**: Focus next item (wraps to first)
- **Arrow Up**: Focus previous item (wraps to last)
- **Home**: Focus first item
- **End**: Focus last item
- **Tab**: Navigate through items sequentially
- **Enter**: Activate focused link

### ARIA Support

Proper ARIA attributes for screen readers:

```tsx
<SubmenuPanel
  title="Components"        // Used for aria-label and aria-labelledby
  items={items}
/>
```

Generated ARIA structure:

```html
<div role="navigation" aria-label="Components submenu">
  <div class="submenuHeader">
    <span id="submenu-title-Components">Components</span>
  </div>
  <nav aria-labelledby="submenu-title-Components">
    <ul>
      <li>
        <a href="/button" aria-label="Button">
          <span aria-hidden="true">[Icon]</span>
          <span>Button</span>
        </a>
      </li>
    </ul>
  </nav>
</div>
```

### Touch Targets

All interactive elements meet WCAG requirements:

- Close button: 44px minimum (mobile)
- Menu items: Adequate padding for touch
- Focus indicators: 2px visible outline

### Screen Readers

The component announces:

- Submenu title on open
- Current item on focus
- Close action availability
- Number of items available

### Reduced Motion

Respects user preferences automatically:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled automatically */
}
```

## Best Practices

### DO

- Always provide descriptive titles for context
- Include icons for visual recognition
- Use meaningful href values
- Handle onClose for proper state management
- Test with keyboard and screen readers
- Ensure adequate item spacing
- Provide feedback on item clicks
- Use semantic menu grouping

### DON'T

- Don't nest submenus more than 2 levels deep
- Don't use for primary navigation alone
- Don't forget to close on item click if needed
- Don't use tiny touch targets on mobile
- Don't rely solely on hover for mobile
- Don't use too many items (keep under 10)
- Don't forget escape key handling
- Don't ignore animation states

## Performance Tips

### Conditional Rendering

Only render when needed:

```tsx
function OptimizedSubmenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Only render when open */}
      {isOpen && (
        <SubmenuPanel
          title="Menu"
          items={items}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

### Memoize Items

Prevent unnecessary re-renders:

```tsx
import { useMemo } from 'react';

function MemoizedSubmenu() {
  const items = useMemo(() => [
    { label: 'Button', href: '/button', icon: FileText },
    { label: 'Card', href: '/card', icon: Image }
  ], []); // Only create once

  return <SubmenuPanel title="Menu" items={items} />;
}
```

### Lazy Load Icons

Load icons on demand:

```tsx
import { lazy, Suspense } from 'react';

const FileText = lazy(() => import('@spexop/icons').then(m => ({ default: m.FileText })));

function LazyIconSubmenu() {
  const items = [
    {
      label: 'Docs',
      href: '/docs',
      icon: FileText // Loaded on demand
    }
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubmenuPanel title="Menu" items={items} />
    </Suspense>
  );
}
```

## Styling

### Custom Styling of the SubmenuPanel Component

The SubmenuPanel uses CSS modules with theme tokens:

```tsx
<SubmenuPanel
  title="Menu"
  items={items}
  className="custom-submenu"
/>
```

```css
/* Your styles */
.custom-submenu {
  /* Override using CSS custom properties */
  --submenu-border: var(--theme-border-strong);
  --submenu-background: var(--theme-surface-secondary);
}
```

### Theme Integration of the SubmenuPanel Component

Automatically uses your theme tokens:

- Border colors: `var(--theme-border)`
- Text colors: `var(--theme-text)`
- Background: `var(--theme-surface-secondary)`
- Hover: `var(--theme-surface-hover)`
- Focus: `var(--theme-primary)`
- Spacing: `var(--theme-spacing-*)`
- Font sizes: `var(--theme-font-size-*)`

## Troubleshooting of the SubmenuPanel Component

### Submenu Not Showing of the SubmenuPanel Component

**Cause**: Component not rendered in DOM

**Solution**:

```tsx
// Ensure component is conditionally rendered
{isOpen && (
  <SubmenuPanel
    title="Menu"
    items={items}
  />
)}
```

### Positioning Issues of the SubmenuPanel Component

**Cause**: Incorrect top value or missing position

**Solution**:

```tsx
// Calculate position from parent element
const handleHover = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  setSubmenuTop(rect.top);
};

<SubmenuPanel
  title="Menu"
  items={items}
  top={submenuTop}  // Provide calculated position
/>
```

### Animation Not Working of the SubmenuPanel Component

**Cause**: Missing animation state management

**Solution**:

```tsx
function ProperAnimation() {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 500); // Match animation duration
  };

  return (
    <>
      {isOpen && (
        <SubmenuPanel
          title="Menu"
          items={items}
          isClosing={isClosing}  // Important!
          onClose={handleClose}
        />
      )}
    </>
  );
}
```

### Keyboard Navigation Not Working

**Cause**: Event listeners not attached or panel not focused

**Solution**:

```tsx
// Component handles keyboard automatically
// Ensure panel is in focus chain
<SubmenuPanel
  title="Menu"
  items={items}
  onClose={handleClose}  // Ensure onClose is provided for Escape key
/>
```

### Mobile Close Button Not Showing

**Cause**: Media query not matching or viewport width issue

**Solution**:

```tsx
// Component uses useMediaQuery hook internally
// Ensure viewport meta tag is set in HTML:
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Items Not Clickable

**Cause**: Missing href or event propagation stopped

**Solution**:

```tsx
// Ensure all items have valid href
const items = [
  { label: 'Button', href: '/button' },  // Valid href required
  { label: 'Card', href: '/card' }
];

// Don't prevent default if you want navigation
<SubmenuPanel
  title="Menu"
  items={items}
  onItemClick={() => {
    // Track click but allow navigation
    trackEvent('item_click');
  }}
/>
```

## Advanced Patterns

### Controlled Submenu State

Full control over submenu lifecycle:

```tsx
function ControlledSubmenu() {
  const [activeId, setActiveId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const openSubmenu = (id) => {
    setIsClosing(false);
    setActiveId(id);
  };

  const closeSubmenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveId(null);
      setIsClosing(false);
    }, 500);
  };

  return (
    <>
      {activeId && (
        <SubmenuPanel
          title={getSubmenuTitle(activeId)}
          items={getSubmenuItems(activeId)}
          isClosing={isClosing}
          onClose={closeSubmenu}
        />
      )}
    </>
  );
}
```

### Multiple Submenus

Handle multiple concurrent submenus:

```tsx
function MultipleSubmenus() {
  const [submenus, setSubmenus] = useState([]);

  const addSubmenu = (config) => {
    setSubmenus(prev => [...prev, config]);
  };

  const removeSubmenu = (id) => {
    setSubmenus(prev => prev.filter(s => s.id !== id));
  };

  return (
    <>
      {submenus.map(submenu => (
        <SubmenuPanel
          key={submenu.id}
          title={submenu.title}
          items={submenu.items}
          top={submenu.top}
          onClose={() => removeSubmenu(submenu.id)}
        />
      ))}
    </>
  );
}
```

### Click Outside to Close

Automatically close on outside clicks:

```tsx
import { useEffect, useRef } from 'react';

function ClickOutsideSubmenu() {
  const submenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {isOpen && (
        <SubmenuPanel
          ref={submenuRef}
          title="Menu"
          items={items}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
```

### Submenu with Search

Add search functionality:

```tsx
function SearchableSubmenu() {
  const [search, setSearch] = useState('');
  
  const allItems = [
    { label: 'Button', href: '/button', icon: FileText },
    { label: 'Card', href: '/card', icon: Image },
    { label: 'Modal', href: '/modal', icon: Layout }
  ];

  const filteredItems = allItems.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <SubmenuPanel
        title="Components"
        items={filteredItems}
        onClose={handleClose}
      />
    </div>
  );
}
```

## Migration Notes

### Future Versions

This component has a stable API. Future versions will:

- Maintain backward compatibility
- Add new features as optional props
- Deprecate features gracefully with warnings
- Provide migration guides for breaking changes

### Upgrading

To upgrade to the latest version:

```bash
pnpm update @spexop/react
```

Check the CHANGELOG for new features and improvements.

## Related Components

- **Sidebar**: Main navigation container
- **Dropdown**: Alternative menu component
- **CommandPalette**: Command-based navigation
- **NavSection**: Navigation section grouping

## Examples

See the [README.md](./README.md) for comprehensive examples including:

- Sidebar integration
- Multi-level navigation
- Settings panels
- Quick actions
- And more

## Support

For issues, questions, or feature requests:

1. Check this usage guide
2. Review the [README.md](./README.md)
3. Search existing GitHub issues
4. Create a new issue with reproduction

## Summary

The SubmenuPanel component provides:

- Floating submenu navigation
- Full keyboard accessibility
- Mobile-responsive design
- Smooth animations
- Theme integration
- Touch-friendly controls
- Screen reader support
- TypeScript support

Perfect for:

- Multi-level navigation
- Settings menus
- Contextual actions
- Documentation navigation
- Dashboard quick actions
- Resource lists

Built with Spexop design principles for a refined, accessible user experience.
