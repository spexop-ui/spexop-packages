# TopBar Component

**Status**: ✅ Production Ready | **Version**: 0.2.0

A fixed header navigation bar with logo, search, theme toggle, and action buttons for mobile and desktop.

> For comprehensive documentation, examples, and advanced patterns, see the [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md#topbar-component)

## Overview

A responsive top navigation bar component with logo, search, theme toggle, GitHub link, settings, and mobile menu button. Always visible at the top of the page.

## Features

- ✅ Logo with link
- ✅ Navigation links with active states
- ✅ Search integration
- ✅ User menu/actions
- ✅ Mobile hamburger menu
- ✅ Sticky/fixed positioning
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
import { TopBar } from '@spexop/react';
import { Home, User, Settings } from '@spexop/icons';

function App() {
  return (
    <TopBar
      logo={{
        text: 'MyApp',
        href: '/',
        icon: Home,
      }}
      links={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ]}
      currentPath="/"
      onNavigate={(path) => console.log(path)}
    />
  );
}
```

## With User Menu

```tsx
<TopBar
  logo={{
    text: 'MyApp',
    href: '/',
  }}
  links={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects', href: '/projects' },
    { label: 'Team', href: '/team' },
  ]}
  currentPath="/dashboard"
  onNavigate={handleNavigate}
  userMenu={{
    name: 'John Doe',
    avatar: '/avatar.jpg',
    items: [
      { label: 'Profile', href: '/profile', icon: User },
      { label: 'Settings', href: '/settings', icon: Settings },
      { label: 'Sign Out', onClick: handleSignOut },
    ],
  }}
/>
```

## With Search

```tsx
<TopBar
  logo={{
    text: 'MyApp',
    href: '/',
  }}
  links={navLinks}
  currentPath={currentPath}
  onNavigate={handleNavigate}
  search={{
    placeholder: 'Search...',
    onSearch: handleSearch,
  }}
/>
```

## Sticky/Fixed Position

```tsx
<TopBar
  logo={logo}
  links={links}
  currentPath={currentPath}
  onNavigate={handleNavigate}
  sticky={true}
/>
```

## Common Patterns

### Complete Navigation

```tsx
import { TopBar } from '@spexop/react';
import { Home, Users, Settings, LogOut } from '@spexop/icons';

function AppLayout() {
  const [currentPath, setCurrentPath] = useState('/');

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Team', href: '/team', icon: Users },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  const userMenuItems = [
    {
      label: 'Profile',
      href: '/profile',
      icon: User,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: Settings,
    },
    {
      label: 'Sign Out',
      onClick: handleSignOut,
      icon: LogOut,
    },
  ];

  return (
    <>
      <TopBar
        logo={{
          text: 'MyApp',
          href: '/',
          ariaLabel: 'MyApp Home',
        }}
        links={navLinks}
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        search={{
          placeholder: 'Search...',
          onSearch: handleSearch,
        }}
        userMenu={{
          name: 'John Doe',
          email: 'john@example.com',
          avatar: '/avatar.jpg',
          items: userMenuItems,
        }}
        sticky={true}
      />
      
      <main>
        {/* Page content */}
      </main>
    </>
  );
}
```

### With Actions

```tsx
<TopBar
  logo={logo}
  links={links}
  currentPath={currentPath}
  onNavigate={handleNavigate}
  actions={
    <>
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
      <Button variant="primary">
        Upgrade
      </Button>
    </>
  }
/>
```

### Marketing Site

```tsx
function MarketingSite() {
  return (
    <TopBar
      logo={{
        text: 'Product',
        href: '/',
      }}
      links={[
        { label: 'Features', href: '/#features' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'Docs', href: '/docs' },
        { label: 'Blog', href: '/blog' },
      ]}
      currentPath={currentPath}
      onNavigate={handleNavigate}
      actions={
        <>
          <Button variant="ghost">Sign In</Button>
          <Button variant="primary">Start Free Trial</Button>
        </>
      }
    />
  );
}
```

### App with Breadcrumb

```tsx
<TopBar
  logo={logo}
  links={links}
  currentPath={currentPath}
  onNavigate={handleNavigate}
  breadcrumb={
    <Breadcrumb
      items={[
        { label: 'Projects', href: '/projects' },
        { label: 'Website Redesign', href: '/projects/123' },
        { label: 'Tasks', href: '/projects/123/tasks' },
      ]}
    />
  }
/>
```

## Props

```typescript
interface TopBarProps {
  /** Logo configuration */
  logo: {
    text: string;
    href: string;
    icon?: IconComponent;
    ariaLabel?: string;
  };
  /** Navigation links */
  links: NavLink[];
  /** Current path for active state */
  currentPath: string;
  /** Navigate handler */
  onNavigate: (path: string) => void;
  /** Search configuration */
  search?: {
    placeholder?: string;
    onSearch: (query: string) => void;
  };
  /** User menu configuration */
  userMenu?: {
    name: string;
    email?: string;
    avatar?: string;
    items: MenuItem[];
  };
  /** Custom actions/buttons */
  actions?: React.ReactNode;
  /** Sticky/fixed positioning */
  sticky?: boolean;
  /** Breadcrumb component */
  breadcrumb?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

interface NavLink {
  label: string;
  href: string;
  icon?: IconComponent;
  external?: boolean;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Stack and Container
2. **Borders before shadows** - Clean bottom border separation
3. **Typography before decoration** - Clear navigation labels
4. **Tokens before magic numbers** - Uses spacing and color tokens
5. **Accessibility before aesthetics** - Full keyboard navigation

## Accessibility

### WCAG AAA Compliance

The TopBar component meets WCAG AAA standards with:

- **Color Contrast**: Minimum 7:1 ratio for all text
- **Touch Targets**: Minimum 44×44px on mobile devices
- **Focus Indicators**: 2px solid outline with 2px offset
- **Screen Reader Support**: Complete ARIA implementation
- **Keyboard Navigation**: Full keyboard accessibility
- **Skip Links**: Built-in navigation shortcuts

### ARIA Support

```tsx
<TopBar
  logo={{
    text: 'MyApp',
    href: '/',
    ariaLabel: 'MyApp Home'
  }}
  links={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/settings' }
  ]}
  currentPath="/dashboard"
  onNavigate={handleNavigate}
  aria-label="Main navigation"
/>
```

### Skip Links

Built-in skip navigation for keyboard users:

```tsx
// Automatically includes skip links
<TopBar
  logo={logo}
  links={links}
  currentPath={currentPath}
  onNavigate={handleNavigate}
  skipLinks={[
    { label: 'Skip to main content', href: '#main' },
    { label: 'Skip to navigation', href: '#nav' }
  ]}
/>
```

### Keyboard Navigation

- **Tab**: Navigate through links
- **Enter/Space**: Activate link
- **Escape**: Close mobile menu (when open)
- **Arrow Keys**: Navigate within mobile menu
- **Home/End**: Jump to first/last menu item

### Focus Management

Enhanced focus management for mobile menus:

```tsx
// Focus is trapped within mobile menu when open
// Focus returns to trigger button when closed
// Focus indicators are clearly visible
```

### Touch Targets

Mobile-optimized touch targets:

- **Desktop**: Minimum 36×36px
- **Mobile**: Minimum 44×44px (automatically applied)
- **Logo**: Minimum 44×44px touch area
- **Menu Items**: Full-width touch targets on mobile

### High Contrast Mode

Automatic enhancements in high contrast mode:

```css
@media (prefers-contrast: high) {
  .topBar {
    border-width: 3px;
    font-weight: var(--theme-font-weight-bold);
  }
}
```

### Reduced Motion

Respects `prefers-reduced-motion` for smooth or instant transitions:

```css
@media (prefers-reduced-motion: reduce) {
  .topBar {
    transition: none;
    transform: none;
  }
}
```

### Screen Reader Announcements

- Navigation landmarks are properly identified
- Active page is announced
- Mobile menu state is communicated
- Skip links are available for quick navigation

## Mobile Behavior

On mobile devices (< 768px):

- Navigation collapses to hamburger menu
- Menu slides in from right
- Backdrop overlay
- Body scroll lock when open
- Close button in menu

## TypeScript Support

```tsx
import { TopBar, type TopBarProps } from "@spexop/react";

const props: TopBarProps = {
  logoText: "My App",
  onLogoClick: () => navigate('/'),
  onSearchClick: () => setSearchOpen(true),
  onThemeToggle: () => toggleTheme(),
  currentTheme: "light",
  showMobileMenu: true
};

<TopBar {...props} />
```

## Performance

- Lightweight: ~2KB gzipped
- Fixed positioning optimized for performance
- Icon components from @spexop/icons are shared
- Minimal re-renders

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- React 18+

## Related Components

- [Sidebar](../Sidebar/README.md) - Side navigation
- [NavLink](../NavLink/README.md) - Individual navigation link
- [Breadcrumb](../Breadcrumb/README.md) - Navigation hierarchy
- [Complete Navigation System](../USAGE-GUIDE.md#complete-navigation-system) - Full navigation setup

## Migration from v0.3.0

### Accessibility Improvements (v0.4.0)

#### Enhanced Touch Targets

```tsx
// Before: Fixed touch target size
<TopBar logo={logo} links={links} currentPath={currentPath} onNavigate={handleNavigate} />

// After: Responsive touch targets (44px on mobile)
<TopBar logo={logo} links={links} currentPath={currentPath} onNavigate={handleNavigate} />
```

#### Skip Links

```tsx
// Before: No skip navigation
<TopBar logo={logo} links={links} currentPath={currentPath} onNavigate={handleNavigate} />

// After: Built-in skip links
<TopBar 
  logo={logo} 
  links={links} 
  currentPath={currentPath} 
  onNavigate={handleNavigate}
  skipLinks={[
    { label: 'Skip to main content', href: '#main' },
    { label: 'Skip to navigation', href: '#nav' }
  ]}
/>
```

#### Improved Focus Management

```tsx
// Before: Basic focus indicators
// After: Enhanced focus with proper contrast and offset
// Automatically applied - no code changes needed
```

#### Mobile Menu Enhancements

```tsx
// Before: Basic mobile menu
// After: Focus trap, better keyboard navigation, ARIA live regions
// Automatically applied - no code changes needed
```

### Migration Checklist

- [ ] Add skip links for better keyboard navigation
- [ ] Test touch targets on mobile devices
- [ ] Verify focus indicators in high contrast mode
- [ ] Test mobile menu with keyboard navigation
- [ ] Test with screen readers

## Further Reading

- [Navigation USAGE-GUIDE.md](../USAGE-GUIDE.md) - Comprehensive guide with routing integration, migration guides, and advanced patterns
- [Accessibility Guidelines](../USAGE-GUIDE.md#accessibility) - WCAG compliance details
- [Best Practices](../USAGE-GUIDE.md#best-practices) - Mobile patterns and performance optimization

## License

MIT
