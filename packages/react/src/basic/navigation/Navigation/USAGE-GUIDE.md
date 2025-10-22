# Navigation Component - Complete Usage Guide

**Component Version**: v0.2.0
**Last Updated**: October 20, 2025
**Package**: @spexop/react
**Status**: Production Ready

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [Basic Usage](#basic-usage)
5. [Advanced Patterns](#advanced-patterns)
6. [Router Integration](#router-integration)
7. [Styling and Theming](#styling-and-theming)
8. [Accessibility](#accessibility)
9. [Best Practices](#best-practices)
10. [Migration Guide](#migration-guide)
11. [Troubleshooting](#troubleshooting)
12. [API Reference](#api-reference)

## Overview

The Navigation component is a router-agnostic, accessible navigation bar designed for modern web applications. It features:

- **Router Agnostic**: Works with any routing solution (React Router, Next.js, TanStack Router, etc.)
- **Mobile Responsive**: Built-in mobile menu with smooth animations
- **Accessible**: WCAG AA+ compliant with full keyboard navigation
- **Themeable**: Fully integrated with the Spexop theme system
- **Icon Support**: Seamless integration with @spexop/icons
- **Active State Tracking**: Automatic active link detection
- **External Link Support**: Handle external links with proper security attributes
- **Customizable**: Optional sidebar close button and children slot for custom actions

### When to Use

Use the Navigation component when you need:

- A primary navigation bar with logo and links
- Router-agnostic navigation (not tied to specific routing library)
- Mobile-first responsive navigation
- Active state indication for current page
- Support for both internal and external links
- Custom action buttons (e.g., theme toggle, search, user menu)

### When Not to Use

Consider alternatives when you need:

- **Simple horizontal menu**: Use the TopBar component instead
- **Sidebar navigation**: Use the Sidebar component
- **In-page tabs**: Use the Tabs component
- **Breadcrumbs**: Use the Breadcrumb component

The Navigation component is marked as **legacy** in favor of using TopBar + Sidebar combination for more flexible layouts.

## Quick Start

### Minimal Example

```tsx
import { Navigation } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <Navigation
      logo={{
        text: 'MyApp',
        href: '/',
      }}
      links={[
        { id: '1', label: 'Home', to: '/' },
        { id: '2', label: 'About', to: '/about' },
        { id: '3', label: 'Contact', to: '/contact' },
      ]}
      currentPath={currentPath}
      onNavigate={setCurrentPath}
    />
  );
}
```

### With React Router

```tsx
import { Navigation } from '@spexop/react';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Navigation
      logo={{ text: 'MyApp', href: '/' }}
      links={[
        { id: '1', label: 'Home', to: '/' },
        { id: '2', label: 'About', to: '/about' },
        { id: '3', label: 'Contact', to: '/contact' },
      ]}
      currentPath={location.pathname}
      onNavigate={(path) => navigate(path)}
    />
  );
}
```

## Installation

### Prerequisites

- React 18.0 or higher
- @spexop/theme package for styling
- @spexop/icons package for icons

### Install Dependencies

```bash
# Using pnpm (recommended)
pnpm add @spexop/react @spexop/theme @spexop/icons

# Using npm
npm install @spexop/react @spexop/theme @spexop/icons

# Using yarn
yarn add @spexop/react @spexop/theme @spexop/icons
```

### Import Styles

Ensure your application imports the Spexop theme CSS:

```tsx
// In your main entry file (e.g., main.tsx, App.tsx)
import '@spexop/react/dist/index.css';
```

## Basic Usage

### Simple Navigation

The most basic usage requires a logo, links, current path, and navigation handler:

```tsx
import { Navigation } from '@spexop/react';
import { useState } from 'react';

function BasicNav() {
  const [currentPath, setCurrentPath] = useState('/');

  const links = [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'features', label: 'Features', to: '/features' },
    { id: 'pricing', label: 'Pricing', to: '/pricing' },
    { id: 'docs', label: 'Documentation', to: '/docs' },
  ];

  return (
    <Navigation
      logo={{
        text: 'ProductName',
        href: '/',
      }}
      links={links}
      currentPath={currentPath}
      onNavigate={(path) => {
        setCurrentPath(path);
        console.log('Navigating to:', path);
      }}
    />
  );
}
```

### With Logo Icon

Add visual branding with an icon alongside your logo text:

```tsx
import { Navigation } from '@spexop/react';
import { Rocket } from '@spexop/icons';

function NavWithIcon() {
  return (
    <Navigation
      logo={{
        icon: Rocket,
        text: 'Startup',
        href: '/',
        ariaLabel: 'Startup - Go to homepage',
      }}
      links={links}
      currentPath={currentPath}
      onNavigate={handleNavigate}
    />
  );
}
```

### Links with Icons

Enhance navigation clarity with icons for each link:

```tsx
import { Navigation } from '@spexop/react';
import { Home, Info, Mail, FileText } from '@spexop/icons';

function NavWithLinkIcons() {
  const links = [
    { id: 'home', label: 'Home', to: '/', icon: Home },
    { id: 'about', label: 'About', to: '/about', icon: Info },
    { id: 'contact', label: 'Contact', to: '/contact', icon: Mail },
    { id: 'blog', label: 'Blog', to: '/blog', icon: FileText },
  ];

  return (
    <Navigation
      logo={{ text: 'MyApp', href: '/' }}
      links={links}
      currentPath={currentPath}
      onNavigate={handleNavigate}
    />
  );
}
```

### External Links

Handle external links automatically with proper security attributes:

```tsx
function NavWithExternalLinks() {
  const links = [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'docs', label: 'Docs', to: '/docs' },
    {
      id: 'github',
      label: 'GitHub',
      to: 'https://github.com/myorg/myrepo',
      external: true, // Opens in new tab with rel="noopener noreferrer"
    },
    {
      id: 'blog',
      label: 'Blog',
      to: 'https://blog.example.com',
      external: true,
    },
  ];

  return (
    <Navigation
      logo={{ text: 'MyApp', href: '/' }}
      links={links}
      currentPath={currentPath}
      onNavigate={handleNavigate}
    />
  );
}
```

### With Custom Actions

Add custom buttons or components in the navigation bar:

```tsx
import { Navigation } from '@spexop/react';
import { Button } from '@spexop/react';

function NavWithActions() {
  return (
    <Navigation
      logo={{ text: 'SaaS App', href: '/' }}
      links={links}
      currentPath={currentPath}
      onNavigate={handleNavigate}
    >
      {/* Custom actions appear on the right side */}
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

### With Sidebar Close Button

Enable a close button for sidebar integration on mobile:

```tsx
function NavWithSidebarClose() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Navigation
      logo={{ text: 'MyApp', href: '/' }}
      links={links}
      currentPath={currentPath}
      onNavigate={handleNavigate}
      showCloseSidebar={sidebarOpen}
      onCloseSidebar={() => setSidebarOpen(false)}
    />
  );
}
```

## Advanced Patterns

### Marketing Website Navigation

Complete navigation for a marketing site with CTA buttons:

```tsx
import { Navigation } from '@spexop/react';
import { Button } from '@spexop/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Zap } from '@spexop/icons';

function MarketingSiteNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { id: 'features', label: 'Features', to: '/#features' },
    { id: 'pricing', label: 'Pricing', to: '/#pricing' },
    { id: 'customers', label: 'Customers', to: '/#customers' },
    { id: 'docs', label: 'Documentation', to: '/docs' },
    { id: 'blog', label: 'Blog', to: '/blog' },
  ];

  return (
    <Navigation
      logo={{
        icon: Zap,
        text: 'ProductName',
        href: '/',
        ariaLabel: 'ProductName - Go to homepage',
      }}
      links={links}
      currentPath={location.pathname}
      onNavigate={(path) => {
        if (path.startsWith('/#')) {
          // Handle anchor links
          const anchor = path.substring(2);
          navigate('/');
          setTimeout(() => {
            document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          navigate(path);
        }
      }}
    >
      <Button variant="ghost" onClick={() => navigate('/signin')}>
        Sign In
      </Button>
      <Button variant="primary" onClick={() => navigate('/signup')}>
        Start Free Trial
      </Button>
    </Navigation>
  );
}
```

### Dashboard Application Navigation

Navigation for authenticated dashboard applications:

```tsx
import { Navigation } from '@spexop/react';
import { Avatar, IconButton } from '@spexop/react';
import { Home, BarChart, Users, Settings, Bell, Search } from '@spexop/icons';
import { useAuth } from './hooks/useAuth';

function DashboardNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { id: 'dashboard', label: 'Dashboard', to: '/dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', to: '/analytics', icon: BarChart },
    { id: 'team', label: 'Team', to: '/team', icon: Users },
    { id: 'settings', label: 'Settings', to: '/settings', icon: Settings },
  ];

  return (
    <Navigation
      logo={{
        icon: Home,
        text: 'Dashboard',
        href: '/dashboard',
      }}
      links={links}
      currentPath={location.pathname}
      onNavigate={(path) => navigate(path)}
    >
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
      <Avatar
        src={user.avatar}
        name={user.name}
        onClick={() => setUserMenuOpen(true)}
      />
    </Navigation>
  );
}
```

### Multi-Tenant Application

Navigation with tenant switching:

```tsx
import { Navigation } from '@spexop/react';
import { Select } from '@spexop/react';
import { useTenant } from './hooks/useTenant';

function MultiTenantNav() {
  const { currentTenant, tenants, switchTenant } = useTenant();

  return (
    <Navigation
      logo={{
        text: currentTenant.name,
        href: '/dashboard',
      }}
      links={links}
      currentPath={location.pathname}
      onNavigate={handleNavigate}
    >
      <Select
        value={currentTenant.id}
        onChange={(e) => switchTenant(e.target.value)}
        aria-label="Switch organization"
      >
        {tenants.map((tenant) => (
          <option key={tenant.id} value={tenant.id}>
            {tenant.name}
          </option>
        ))}
      </Select>
    </Navigation>
  );
}
```

### Documentation Site Navigation

Navigation for documentation with search integration:

```tsx
import { Navigation } from '@spexop/react';
import { IconButton } from '@spexop/react';
import { Search, Moon, Sun, Github } from '@spexop/icons';
import { useTheme } from './hooks/useTheme';

function DocsNav() {
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  const links = [
    { id: 'docs', label: 'Documentation', to: '/docs' },
    { id: 'components', label: 'Components', to: '/components' },
    { id: 'examples', label: 'Examples', to: '/examples' },
    {
      id: 'github',
      label: 'GitHub',
      to: 'https://github.com/myorg/docs',
      external: true,
    },
  ];

  return (
    <Navigation
      logo={{ text: 'Docs', href: '/' }}
      links={links}
      currentPath={location.pathname}
      onNavigate={handleNavigate}
    >
      <IconButton
        icon={Search}
        label="Search documentation"
        onClick={() => setSearchOpen(true)}
      />
      <IconButton
        icon={theme === 'dark' ? Sun : Moon}
        label="Toggle theme"
        onClick={toggleTheme}
      />
      <IconButton
        icon={Github}
        label="View on GitHub"
        onClick={() => window.open('https://github.com/myorg/docs', '_blank')}
      />
    </Navigation>
  );
}
```

### E-commerce Navigation

Navigation for online stores with cart and user menu:

```tsx
import { Navigation } from '@spexop/react';
import { IconButton, Badge } from '@spexop/react';
import { ShoppingCart, User, Heart } from '@spexop/icons';
import { useCart } from './hooks/useCart';

function EcommerceNav() {
  const { cartCount } = useCart();

  const links = [
    { id: 'shop', label: 'Shop', to: '/shop' },
    { id: 'men', label: 'Men', to: '/shop/men' },
    { id: 'women', label: 'Women', to: '/shop/women' },
    { id: 'sale', label: 'Sale', to: '/shop/sale' },
  ];

  return (
    <Navigation
      logo={{ text: 'StoreName', href: '/' }}
      links={links}
      currentPath={location.pathname}
      onNavigate={handleNavigate}
    >
      <IconButton
        icon={Heart}
        label="Wishlist"
        onClick={() => navigate('/wishlist')}
      />
      <div style={{ position: 'relative' }}>
        <IconButton
          icon={ShoppingCart}
          label="Shopping cart"
          onClick={() => navigate('/cart')}
        />
        {cartCount > 0 && (
          <Badge
            count={cartCount}
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
        )}
      </div>
      <IconButton
        icon={User}
        label="Account"
        onClick={() => navigate('/account')}
      />
    </Navigation>
  );
}
```

## Router Integration

### React Router v6

Full integration with React Router v6:

```tsx
import { Navigation } from '@spexop/react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/about' },
    { id: 'contact', label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <Navigation
        logo={{ text: 'MyApp', href: '/' }}
        links={links}
        currentPath={location.pathname}
        onNavigate={(path) => navigate(path)}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
```

### Next.js App Router

Integration with Next.js 13+ App Router:

```tsx
// app/components/Navigation.tsx
'use client';

import { Navigation } from '@spexop/react';
import { usePathname, useRouter } from 'next/navigation';

export function AppNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/about' },
    { id: 'blog', label: 'Blog', to: '/blog' },
  ];

  return (
    <Navigation
      logo={{ text: 'Next.js App', href: '/' }}
      links={links}
      currentPath={pathname}
      onNavigate={(path) => router.push(path)}
    />
  );
}

// app/layout.tsx
import { AppNavigation } from './components/Navigation';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppNavigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### Next.js Pages Router

Integration with Next.js Pages Router:

```tsx
// components/Navigation.tsx
import { Navigation } from '@spexop/react';
import { useRouter } from 'next/router';

export function AppNavigation() {
  const router = useRouter();

  const links = [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/about' },
    { id: 'contact', label: 'Contact', to: '/contact' },
  ];

  return (
    <Navigation
      logo={{ text: 'My Site', href: '/' }}
      links={links}
      currentPath={router.pathname}
      onNavigate={(path) => router.push(path)}
    />
  );
}

// pages/_app.tsx
import type { AppProps } from 'next/app';
import { AppNavigation } from '../components/Navigation';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppNavigation />
      <Component {...pageProps} />
    </>
  );
}
```

### TanStack Router

Integration with TanStack Router:

```tsx
import { Navigation } from '@spexop/react';
import { useNavigate, useLocation } from '@tanstack/react-router';

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/about' },
  ];

  return (
    <Navigation
      logo={{ text: 'TanStack App', href: '/' }}
      links={links}
      currentPath={location.pathname}
      onNavigate={(path) => navigate({ to: path })}
    />
  );
}
```

### Remix

Integration with Remix:

```tsx
// app/components/Navigation.tsx
import { Navigation } from '@spexop/react';
import { useLocation, useNavigate } from '@remix-run/react';

export function AppNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/about' },
  ];

  return (
    <Navigation
      logo={{ text: 'Remix App', href: '/' }}
      links={links}
      currentPath={location.pathname}
      onNavigate={(path) => navigate(path)}
    />
  );
}

// app/root.tsx
import { AppNavigation } from './components/Navigation';

export default function Root() {
  return (
    <html>
      <body>
        <AppNavigation />
        <Outlet />
      </body>
    </html>
  );
}
```

## Styling and Theming

### Using Theme Tokens

The Navigation component uses Spexop theme tokens for consistent styling:

```css
/* Available CSS variables */
--theme-surface: Background color
--theme-border: Border color
--theme-text: Primary text color
--theme-text-secondary: Secondary text color
--theme-primary: Primary brand color
--theme-primary-light: Light primary color
--theme-surface-secondary: Hover background
--theme-surface-hover: Dark mode hover
--theme-spacing-*: Spacing scale (1-16)
--theme-font-weight-*: Font weights
--theme-radius-base: Border radius
```

### Custom Styling

Override default styles with custom CSS:

```tsx
import { Navigation } from '@spexop/react';
import './custom-navigation.css';

function CustomStyledNav() {
  return (
    <Navigation
      className="my-custom-nav"
      logo={{ text: 'MyApp', href: '/' }}
      links={links}
      currentPath={currentPath}
      onNavigate={handleNavigate}
    />
  );
}
```

```css
/* custom-navigation.css */
.my-custom-nav {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-bottom: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.my-custom-nav .logo {
  color: white;
  font-size: 24px;
}

.my-custom-nav .link {
  color: rgba(255, 255, 255, 0.9);
}

.my-custom-nav .link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.my-custom-nav .linkActive {
  color: white;
  background: rgba(255, 255, 255, 0.2);
}
```

### Dark Mode Support

The component automatically supports dark mode via the theme system:

```tsx
import { UnifiedThemeProvider } from '@spexop/react';
import { Navigation } from '@spexop/react';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <UnifiedThemeProvider theme={theme}>
      <Navigation
        logo={{ text: 'MyApp', href: '/' }}
        links={links}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      >
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
      </UnifiedThemeProvider>
    </UnifiedThemeProvider>
  );
}
```

### Responsive Behavior

The Navigation component is fully responsive with built-in breakpoints:

- **Desktop (> 1024px)**: Full horizontal layout
- **Tablet (768px - 1024px)**: Compact horizontal layout
- **Mobile (< 768px)**: Collapsible mobile menu

Customize responsive behavior with media queries:

```css
/* Override mobile menu width */
@media (max-width: 767px) {
  .nav .links {
    width: 100%;
    max-width: 320px;
  }
}

/* Custom tablet behavior */
@media (min-width: 768px) and (max-width: 1023px) {
  .nav .link {
    font-size: 14px;
    padding: 8px 12px;
  }
}
```

## Accessibility

### WCAG AA+ Compliance

The Navigation component meets WCAG AA+ standards:

- **Color Contrast**: Minimum 7:1 for text (AAA level)
- **Touch Targets**: All buttons are minimum 44x44px
- **Focus Indicators**: Clear 2px outline on focused elements
- **Semantic HTML**: Proper use of `<nav>`, `<a>`, `<button>` elements
- **ARIA Attributes**: Comprehensive labels, roles, and states

### Keyboard Navigation

Full keyboard support is built-in:

| Key | Action |
|-----|--------|
| **Tab** | Move focus to next interactive element |
| **Shift + Tab** | Move focus to previous element |
| **Enter** | Activate focused link or button |
| **Space** | Activate focused button |
| **Escape** | Close mobile menu (when open) |

### Screen Reader Support

The component provides proper ARIA attributes for screen readers:

```tsx
// Automatic ARIA attributes
<nav aria-label="Main navigation">
  <a href="/" aria-label="MyApp - Home">MyApp</a>
  <button aria-label="Open menu" aria-expanded="false" aria-controls="menu-id">
    Menu
  </button>
  <a href="/about" aria-current="page">About</a>
</nav>
```

### Custom ARIA Labels

Provide custom accessibility labels:

```tsx
<Navigation
  logo={{
    text: 'ProductName',
    href: '/',
    ariaLabel: 'ProductName - Go to homepage',
  }}
  links={[
    {
      id: 'contact',
      label: 'Contact',
      to: '/contact',
      ariaLabel: 'Contact us - Open contact form',
    },
  ]}
  currentPath={currentPath}
  onNavigate={handleNavigate}
  ariaLabel="Primary navigation"
/>
```

### Focus Management

The component manages focus properly in mobile menu:

```tsx
// Automatic focus management
- Opening mobile menu: Focus stays on toggle button
- Closing via link click: Focus returns to page content
- Closing via backdrop: Focus returns to toggle button
- Closing via Escape: Focus returns to toggle button
```

## Best Practices

### Link Organization

Organize links from most to least important:

```tsx
// Good - Primary pages first
const links = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'features', label: 'Features', to: '/features' },
  { id: 'pricing', label: 'Pricing', to: '/pricing' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'blog', label: 'Blog', to: '/blog' },
];

// Bad - Random order
const links = [
  { id: 'blog', label: 'Blog', to: '/blog' },
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'About', to: '/about' },
];
```

### Link Labels

Use clear, concise labels:

```tsx
// Good - Clear and concise
{ id: 'pricing', label: 'Pricing', to: '/pricing' }

// Bad - Too long
{ id: 'pricing', label: 'View our pricing plans and packages', to: '/pricing' }

// Bad - Unclear
{ id: 'info', label: 'Info', to: '/about' }
```

### Icon Usage

Use icons consistently:

```tsx
import { Home, Info, Mail, FileText } from '@spexop/icons';

// Good - Consistent icon style
const links = [
  { id: 'home', label: 'Home', to: '/', icon: Home },
  { id: 'about', label: 'About', to: '/about', icon: Info },
  { id: 'contact', label: 'Contact', to: '/contact', icon: Mail },
  { id: 'blog', label: 'Blog', to: '/blog', icon: FileText },
];

// Bad - Mixed with and without icons
const links = [
  { id: 'home', label: 'Home', to: '/', icon: Home },
  { id: 'about', label: 'About', to: '/about' }, // No icon
  { id: 'contact', label: 'Contact', to: '/contact', icon: Mail },
];
```

### External Link Security

Always mark external links properly:

```tsx
// Good - External link marked
{
  id: 'github',
  label: 'GitHub',
  to: 'https://github.com/myorg/repo',
  external: true, // Adds target="_blank" rel="noopener noreferrer"
}

// Bad - External link not marked
{
  id: 'github',
  label: 'GitHub',
  to: 'https://github.com/myorg/repo',
  // Missing external: true - opens in same tab
}
```

### Mobile Menu UX

Provide feedback for mobile menu state:

```tsx
function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  return (
    <Navigation
      logo={{ text: 'MyApp', href: '/' }}
      links={links}
      currentPath={currentPath}
      onNavigate={handleNavigate}
    />
  );
}
```

### Performance Optimization

Memoize links array to prevent unnecessary re-renders:

```tsx
import { useMemo } from 'react';

function App() {
  // Good - Memoized links
  const links = useMemo(() => [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/about' },
  ], []);

  // Bad - New array on every render
  return (
    <Navigation
      links={[
        { id: 'home', label: 'Home', to: '/' },
        { id: 'about', label: 'About', to: '/about' },
      ]}
      // ...
    />
  );
}
```

### SEO Considerations

Use proper semantic HTML for better SEO:

```tsx
// The Navigation component automatically uses semantic HTML:
<nav aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

// This helps search engines understand your site structure
```

## Migration Guide

### From Material-UI AppBar

```tsx
// Before (Material-UI)
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

<AppBar position="static">
  <Toolbar>
    <Typography variant="h6">MyApp</Typography>
    <Button color="inherit" href="/">Home</Button>
    <Button color="inherit" href="/about">About</Button>
  </Toolbar>
</AppBar>

// After (Spexop)
import { Navigation } from '@spexop/react';

<Navigation
  logo={{ text: 'MyApp', href: '/' }}
  links={[
    { id: 'home', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/about' },
  ]}
  currentPath={location.pathname}
  onNavigate={handleNavigate}
/>
```

### From Chakra UI Header

```tsx
// Before (Chakra UI)
import { Box, Flex, Heading, Link } from '@chakra-ui/react';

<Box as="header" bg="white" boxShadow="sm">
  <Flex align="center" justify="space-between" p={4}>
    <Heading size="md">MyApp</Heading>
    <Flex gap={4}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </Flex>
  </Flex>
</Box>

// After (Spexop)
import { Navigation } from '@spexop/react';

<Navigation
  logo={{ text: 'MyApp', href: '/' }}
  links={[
    { id: 'home', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/about' },
  ]}
  currentPath={location.pathname}
  onNavigate={handleNavigate}
/>
```

### From Ant Design Menu

```tsx
// Before (Ant Design)
import { Menu } from 'antd';

<Menu mode="horizontal" selectedKeys={[current]}>
  <Menu.Item key="home">Home</Menu.Item>
  <Menu.Item key="about">About</Menu.Item>
  <Menu.Item key="contact">Contact</Menu.Item>
</Menu>

// After (Spexop)
import { Navigation } from '@spexop/react';

<Navigation
  logo={{ text: 'MyApp', href: '/' }}
  links={[
    { id: 'home', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/about' },
    { id: 'contact', label: 'Contact', to: '/contact' },
  ]}
  currentPath={location.pathname}
  onNavigate={handleNavigate}
/>
```

## Troubleshooting

### Mobile Menu Not Closing

**Problem**: Mobile menu stays open after clicking a link.

**Solution**: The component automatically closes the menu when links are clicked. If you're experiencing issues, ensure you're not preventing the default behavior:

```tsx
// Correct - Let component handle menu closure
<Navigation
  logo={{ text: 'MyApp', href: '/' }}
  links={links}
  currentPath={currentPath}
  onNavigate={(path) => {
    navigate(path); // Just navigate, menu will close automatically
  }}
/>

// Incorrect - Don't manually control menu state
const [menuOpen, setMenuOpen] = useState(false);
// This is not needed - component manages its own state
```

### Active State Not Working

**Problem**: Active link state doesn't update when navigating.

**Solution**: Ensure `currentPath` prop is updated correctly:

```tsx
// Correct - currentPath updates with location
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <Navigation
      currentPath={location.pathname} // Updates automatically
      // ...
    />
  );
}

// Incorrect - Static currentPath
<Navigation
  currentPath="/" // Never changes!
  // ...
/>
```

### Icons Not Appearing

**Problem**: Icons are missing from navigation.

**Solution**: Ensure @spexop/icons is installed and imported correctly:

```bash
# Install package
pnpm add @spexop/icons

# In your component
import { Home, Settings } from '@spexop/icons';

const links = [
  { id: 'home', label: 'Home', to: '/', icon: Home }, // Pass component, not instance
];
```

### External Links Not Opening in New Tab

**Problem**: External links open in the same tab.

**Solution**: Set the `external` flag:

```tsx
// Correct
{
  id: 'github',
  label: 'GitHub',
  to: 'https://github.com',
  external: true, // Required for new tab
}

// Incorrect
{
  id: 'github',
  label: 'GitHub',
  to: 'https://github.com',
  // Missing external flag
}
```

### Navigation Overlapping Content

**Problem**: Navigation bar covers page content.

**Solution**: The navigation is `position: sticky`. Add padding to your main content:

```tsx
function App() {
  return (
    <>
      <Navigation {...props} />
      <main style={{ paddingTop: '0' }}>
        {/* Navigation is sticky, so no padding needed */}
        {/* Unless you want extra space */}
      </main>
    </>
  );
}
```

### TypeScript Errors

**Problem**: TypeScript errors with link IDs or types.

**Solution**: Ensure proper typing:

```tsx
import type { NavLink } from '@spexop/react';

// Correct - Proper typing
const links: NavLink[] = [
  { id: 'home', label: 'Home', to: '/' },
];

// Incorrect - Missing required properties
const links = [
  { label: 'Home', to: '/' }, // Missing id
];
```

## API Reference

### NavigationProps

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `logo` | `LogoConfig` | - | Yes | Logo configuration object |
| `links` | `NavLink[]` | - | Yes | Array of navigation link objects |
| `currentPath` | `string` | - | Yes | Current page path for active state |
| `onNavigate` | `(path: string) => void` | - | Yes | Navigation handler callback |
| `showCloseSidebar` | `boolean` | `false` | No | Show close sidebar button (mobile) |
| `onCloseSidebar` | `() => void` | - | No | Close sidebar callback |
| `className` | `string` | - | No | Additional CSS class name |
| `children` | `ReactNode` | - | No | Custom content (e.g., action buttons) |
| `ariaLabel` | `string` | `"Main navigation"` | No | ARIA label for navigation element |

### LogoConfig

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| `text` | `string` | - | Yes | Logo text to display |
| `icon` | `IconComponent` | - | No | Icon component from @spexop/icons |
| `href` | `string` | - | Yes | Logo link destination |
| `ariaLabel` | `string` | `"{text} - Home"` | No | Custom ARIA label for logo link |

### NavLink

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| `id` | `string` | - | Yes | Unique identifier for the link |
| `label` | `string` | - | Yes | Link text to display |
| `to` | `string` | - | Yes | Link destination URL or path |
| `icon` | `IconComponent` | - | No | Icon component from @spexop/icons |
| `external` | `boolean` | `false` | No | Whether link is external (opens in new tab) |
| `ariaLabel` | `string` | - | No | Custom ARIA label for accessibility |

### IconComponent Type

```typescript
type IconComponent = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;
```

Icons must follow this signature (all @spexop/icons do).

## Examples Repository

For more examples, see:

- [CodeSandbox Examples](https://codesandbox.io/examples/package/@spexop/react)
- [GitHub Examples](https://github.com/spexop-ui/spexop-react/tree/main/examples)
- [Storybook Documentation](https://spexop-ui.github.io/spexop-react)

## Related Components

- **TopBar**: Simple top navigation bar (recommended for new projects)
- **Sidebar**: Side navigation panel
- **Breadcrumb**: Hierarchical navigation trail
- **Tabs**: In-page tabbed navigation
- **Pagination**: Page number navigation

## Support and Contributing

### Getting Help

- [GitHub Issues](https://github.com/spexop-ui/spexop-react/issues)
- [Discussions](https://github.com/spexop-ui/spexop-react/discussions)
- [Discord Community](https://discord.gg/spexop)

### Contributing

Found a bug or want to contribute? See our [Contributing Guide](https://github.com/spexop-ui/spexop-react/blob/main/CONTRIBUTING.md).

## Version History

- **v0.2.0** (2025-10-20):
  - Fixed workspace rule violations (no inline SVGs)
  - Replaced inline SVGs with @spexop/icons
  - Added comprehensive test suite
  - Enhanced accessibility
  - Improved documentation

- **v0.1.0** (2025-10-13):
  - Initial release
  - Basic navigation functionality
  - Mobile responsive design
  - Router-agnostic implementation

## License

MIT License - See [LICENSE](https://github.com/spexop-ui/spexop-react/blob/main/LICENSE) for details.
