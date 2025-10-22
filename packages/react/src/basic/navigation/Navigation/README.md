# Navigation Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A generic, router-agnostic navigation bar with polished interactions, mobile menu, and active state tracking. Features refined minimalism with border-based design.

## Features

- ✅ Logo with link
- ✅ Navigation links with active states
- ✅ Mobile hamburger menu
- ✅ Responsive behavior
- ✅ Close sidebar button (optional)
- ✅ Custom actions slot
- ✅ Smooth animations
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { Navigation } from '@spexop/react';
import { Home } from '@spexop/icons';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  
  return (
    <Navigation
      logo={{
        icon: Home,
        text: 'MyApp',
        href: '/',
      }}
      links={[
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
      ]}
      currentPath={currentPath}
      onNavigate={setCurrentPath}
    />
  );
}
```

## Basic Usage

### Simple Navigation

```tsx
<Navigation
  logo={{
    text: 'MyApp',
    href: '/',
  }}
  links={[
    { label: 'Features', to: '/features' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Docs', to: '/docs' },
  ]}
  currentPath={currentPath}
  onNavigate={handleNavigate}
/>
```

### With Logo Icon

```tsx
import { Rocket } from '@spexop/icons';

<Navigation
  logo={{
    icon: Rocket,
    text: 'Product',
    href: '/',
    ariaLabel: 'Product Home',
  }}
  links={navLinks}
  currentPath={currentPath}
  onNavigate={handleNavigate}
/>
```

### With Actions

```tsx
<Navigation
  logo={logo}
  links={links}
  currentPath={currentPath}
  onNavigate={handleNavigate}
>
  <Button variant="ghost">Sign In</Button>
  <Button variant="primary">Start Free</Button>
</Navigation>
```

### External Links

```tsx
<Navigation
  logo={logo}
  links={[
    { label: 'Home', to: '/' },
    { label: 'Docs', to: '/docs' },
    { label: 'Blog', to: 'https://blog.example.com', external: true },
    { label: 'GitHub', to: 'https://github.com/example', external: true },
  ]}
  currentPath={currentPath}
  onNavigate={handleNavigate}
/>
```

## Common Patterns

### Marketing Site

```tsx
function MarketingNav() {
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <Navigation
      logo={{
        text: 'ProductName',
        href: '/',
      }}
      links={[
        { label: 'Features', to: '/#features' },
        { label: 'Pricing', to: '/#pricing' },
        { label: 'Docs', to: '/docs' },
        { label: 'Blog', to: '/blog' },
      ]}
      currentPath={currentPath}
      onNavigate={setCurrentPath}
    >
      <Button variant="ghost" onClick={() => navigate('/signin')}>
        Sign In
      </Button>
      <Button variant="primary" onClick={() => navigate('/signup')}>
        Get Started
      </Button>
    </Navigation>
  );
}
```

### With Sidebar Integration

```tsx
<Navigation
  logo={logo}
  links={links}
  currentPath={currentPath}
  onNavigate={handleNavigate}
  showCloseSidebar={isMobileSidebarOpen}
  onCloseSidebar={() => setMobileSidebarOpen(false)}
/>
```

### App Navigation

```tsx
function AppNav() {
  const user = useCurrentUser();

  return (
    <Navigation
      logo={{
        icon: Logo,
        text: 'Dashboard',
        href: '/dashboard',
      }}
      links={[
        { label: 'Projects', to: '/projects' },
        { label: 'Team', to: '/team' },
        { label: 'Analytics', to: '/analytics' },
      ]}
      currentPath={location.pathname}
      onNavigate={(path) => navigate(path)}
    >
      <IconButton
        icon={Bell}
        label="Notifications"
        onClick={() => setShowNotifications(true)}
      />
      <IconButton
        icon={Settings}
        label="Settings"
        onClick={() => setShowSettings(true)}
      />
      <Avatar src={user.avatar} name={user.name} />
    </Navigation>
  );
}
```

## Props

```typescript
interface NavigationProps {
  /** Logo configuration */
  logo: {
    icon?: IconComponent;
    text: string;
    href: string;
    ariaLabel?: string;
  };
  /** Navigation links */
  links: NavLink[];
  /** Current path for active state */
  currentPath: string;
  /** Navigate handler */
  onNavigate: (path: string) => void;
  /** Show close sidebar button (mobile) */
  showCloseSidebar?: boolean;
  /** Close sidebar handler */
  onCloseSidebar?: () => void;
  /** Custom actions/content (right side) */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** ARIA label */
  ariaLabel?: string;
}

interface NavLink {
  label: string;
  to: string;
  external?: boolean;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Container and Stack
2. **Borders before shadows** - Clean bottom border
3. **Typography before decoration** - Clear link labels
4. **Tokens before magic numbers** - Uses spacing tokens
5. **Accessibility before aesthetics** - Full keyboard navigation

## Accessibility

- ✅ Semantic HTML (`<nav>` element)
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Active state indication
- ✅ Mobile menu accessible
- ✅ Screen reader support
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Tab` - Navigate through links
- `Enter/Space` - Activate link
- `Escape` - Close mobile menu

## Mobile Behavior

On mobile (< 768px):

- Links collapse to hamburger menu
- Menu slides in
- Backdrop overlay
- Close button visible

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `TopBar` - Top navigation bar
- `Sidebar` - Side navigation
- `NavLink` - Individual links

## License

MIT
