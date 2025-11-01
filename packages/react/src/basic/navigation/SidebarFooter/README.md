# SidebarFooter Component

**Status**: ✅ Production Ready | **Version**: 0.2.0

A footer section for sidebar content, typically used for version selectors, quick links, or utility actions.

> For comprehensive documentation, examples, and advanced patterns, see the [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md#sidebar-navigation-system)

## Overview

The `SidebarFooter` provides a styled footer area at the bottom of a Sidebar navigation, perfect for version selectors and utility links.

## Features

✅ **Sticky Positioning**: Stays at bottom of sidebar  
✅ **Border Separation**: 2px top border for visual distinction  
✅ **Flexible Content**: Accepts any child content  
✅ **Dark Mode**: Automatic theme support  
✅ **No Shrink**: Maintains height in flex containers

---

## Installation

```tsx
import { Sidebar, SidebarFooter } from '@spexop/react';
```

---

## Basic Usage

```tsx
import { Sidebar, SidebarFooter, NavSection, NavLink } from '@spexop/react';

function AppSidebar() {
  return (
    <Sidebar isOpen={true}>
      <NavSection label="Navigation">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
      </NavSection>

      <SidebarFooter>
        <p>© 2025 My App</p>
      </SidebarFooter>
    </Sidebar>
  );
}
```

---

## Props

### `SidebarFooterProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Footer content (takes precedence over structured props) |
| `user` | `SidebarFooterUser` | - | User information (only used if children is not provided) |
| `actions` | `SidebarFooterAction[]` | - | Action buttons (only used if children is not provided) |
| `density` | `"compact" \| "normal" \| "spacious"` | `"normal"` | Padding density/spacing control |
| `gap` | `SpacingScale` (0-10) | `3` | Gap between structured content sections |
| `aria-label` | `string` | - | ARIA label for accessibility |
| `className` | `string` | `""` | Additional CSS classes |

---

## Examples

### Version Selector

```tsx
import { SidebarFooter } from '@spexop/react';
import { useId } from 'react';

function AppSidebar() {
  const versionSelectId = useId();

  return (
    <Sidebar isOpen={true}>
      {/* navigation sections */}

      <SidebarFooter>
        <label htmlFor={versionSelectId}>Version</label>
        <select id={versionSelectId}>
          <option value="3.0">v3.0 (Latest)</option>
          <option value="2.5">v2.5</option>
          <option value="2.0">v2.0</option>
        </select>
      </SidebarFooter>
    </Sidebar>
  );
}
```

### Quick Links

```tsx
import { SidebarFooter } from '@spexop/react';

function AppSidebar() {
  return (
    <Sidebar isOpen={true}>
      {/* navigation sections */}

      <SidebarFooter>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="https://github.com/myapp" target="_blank" rel="noopener noreferrer">
            GitHub →
          </a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
```

### Social Links

```tsx
import { SidebarFooter } from '@spexop/react';
import { GitHub, Twitter, Discord } from '@spexop/icons';

function AppSidebar() {
  return (
    <Sidebar isOpen={true}>
      {/* navigation sections */}

      <SidebarFooter>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <a href="https://github.com/myapp" aria-label="GitHub">
            <GitHub size={20} />
          </a>
          <a href="https://twitter.com/myapp" aria-label="Twitter">
            <Twitter size={20} />
          </a>
          <a href="https://discord.gg/myapp" aria-label="Discord">
            <Discord size={20} />
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
```

### Complex Footer

```tsx
import { SidebarFooter } from '@spexop/react';
import { useId } from 'react';

function AppSidebar() {
  const versionSelectId = useId();

  return (
    <Sidebar isOpen={true}>
      {/* navigation sections */}

      <SidebarFooter>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Version Selector */}
          <div>
            <label 
              htmlFor={versionSelectId}
              style={{ fontSize: '12px', color: 'var(--s-color-neutral-600)' }}
            >
              Version
            </label>
            <select 
              id={versionSelectId}
              style={{ width: '100%', marginTop: '4px' }}
            >
              <option value="3.0">v3.0 (Latest)</option>
              <option value="2.5">v2.5</option>
            </select>
          </div>

          {/* Quick Links */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            fontSize: '12px',
            color: 'var(--s-color-neutral-600)'
          }}>
            <a href="/about">About</a>
            <span>•</span>
            <a href="/docs">Docs</a>
            <span>•</span>
            <a href="https://github.com/myapp">GitHub</a>
          </div>

          {/* Copyright */}
          <p style={{ 
            fontSize: '11px', 
            color: 'var(--s-color-neutral-500)',
            textAlign: 'center',
            margin: 0
          }}>
            © 2025 My App
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
```

---

## Styling

### CSS Variables

```css
/* Spacing */
--s-spacing-5 (20px) - padding

/* Colors */
--s-color-neutral-50 (background)
--s-color-neutral-200 (border-top)

/* Dark Theme */
--s-color-neutral-900 (background)
--s-color-neutral-700 (border-top)
```

### Custom Styling

```tsx
import { SidebarFooter } from '@spexop/react';
import styles from './MySidebar.module.css';

<SidebarFooter className={styles.customFooter}>
  {/* content */}
</SidebarFooter>
```

---

## Best Practices

### 1. **Use useId for Form Elements**

Always use React's `useId()` for select elements and labels:

```tsx
import { useId } from 'react';

const versionSelectId = useId();

<label htmlFor={versionSelectId}>Version</label>
<select id={versionSelectId}>...</select>
```

### 2. **External Links**

Open external links in new tabs with proper security attributes:

```tsx
<a 
  href="https://github.com/myapp" 
  target="_blank" 
  rel="noopener noreferrer"
>
  GitHub →
</a>
```

### 3. **Keep It Simple**

The footer should be lightweight and not distract from main navigation:

```tsx
// Good: Simple and clear
<SidebarFooter>
  <select>
    <option>v3.0</option>
    <option>v2.5</option>
  </select>
</SidebarFooter>

// Avoid: Too much content
<SidebarFooter>
  <div style={{ padding: '40px' }}>
    {/* Many form fields, images, etc. */}
  </div>
</SidebarFooter>
```

---

## TypeScript Support

```tsx
import { SidebarFooter, type SidebarFooterProps } from "@spexop/react";

const props: SidebarFooterProps = {
  className: "custom-footer"
};

<SidebarFooter {...props}>
  <p>Version 1.0.0</p>
</SidebarFooter>
```

## Performance

- Lightweight: < 0.5KB gzipped
- No JavaScript dependencies
- Pure CSS styling

## Related Components

- [Sidebar](../Sidebar/README.md) - Main navigation container
- [NavSection](../NavSection/README.md) - Collapsible navigation sections
- [NavLink](../NavLink/README.md) - Individual navigation links
- [TopBar](../TopBar/README.md) - Top navigation bar
- [Complete Navigation System](../USAGE-GUIDE.md#complete-navigation-system) - Full navigation setup

## Further Reading

- [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md) - Comprehensive guide with routing integration, migration guides, and advanced patterns
- [Accessibility Guidelines](../USAGE-GUIDE.md#accessibility) - WCAG compliance details
- [Best Practices](../USAGE-GUIDE.md#best-practices) - Mobile patterns and performance optimization

---

## License

MIT
