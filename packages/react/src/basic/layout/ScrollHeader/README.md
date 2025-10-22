# ScrollHeader Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

**See [USAGE-GUIDE.md](./USAGE-GUIDE.md) for comprehensive examples, advanced patterns, and troubleshooting.**

## Overview

A navigation header that appears when scrolling past hero content. Provides quick navigation to page sections with smooth animations and responsive behavior. Following "The Spexop Way" with refined minimalism, borders before shadows, and accessibility-first design.

## Features

- ✅ **Scroll-Triggered Visibility** - Appears after scrolling past customizable threshold (default 200px)
- ✅ **Section Navigation** - Quick links to page sections with active state tracking
- ✅ **Logo & Actions Support** - Optional logo element and action buttons
- ✅ **Sidebar Integration** - Automatic offset calculation for sidebar layouts
- ✅ **Smooth Animations** - Slide-down animation with 300ms transition
- ✅ **Loading States** - Skeleton display while sections are loading
- ✅ **Scroll Position Restoration** - Remembers scroll position across navigations
- ✅ **Responsive Design** - Mobile-first with touch-friendly 44px targets
- ✅ **WCAG AA+ Accessible** - Full keyboard navigation and screen reader support
- ✅ **Theme Integration** - Uses tokens from @spexop/theme
- ✅ **Performance Optimized** - Debounced resize handling and passive scroll listeners
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **@spexop/icons Integration** - Seamless icon support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { ScrollHeader } from '@spexop/react';
import { Home, Code, Settings } from '@spexop/icons';

function App() {
  const sections = [
    { id: 'intro', label: 'Introduction', icon: Home, href: '#intro' },
    { id: 'features', label: 'Features', icon: Code, href: '#features' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '#settings' },
  ];
  
  return (
    <ScrollHeader
      sections={sections}
      scrollThreshold={300}
      activeSection="intro"
      onSectionClick={(id) => scrollToSection(id)}
    />
  );
}
```

## Basic Usage

### Simple Sections

```tsx
<ScrollHeader
  sections={[
    { id: 'about', label: 'About', href: '#about' },
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
  ]}
  scrollThreshold={200}
  activeSection={activeSection}
  onSectionClick={handleSectionClick}
/>
```

### With Icons

```tsx
import { Home, Info, DollarSign, Mail } from '@spexop/icons';

<ScrollHeader
  sections={[
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'about', label: 'About', icon: Info, href: '#about' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign, href: '#pricing' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ]}
  scrollThreshold={300}
  activeSection={activeSection}
  onSectionClick={handleSectionClick}
/>
```

### With Logo

```tsx
<ScrollHeader
  logo={{
    icon: Logo,
    text: 'MyApp',
    href: '/',
  }}
  sections={sections}
  scrollThreshold={200}
  activeSection={activeSection}
  onSectionClick={handleSectionClick}
/>
```

### With Actions

```tsx
<ScrollHeader
  sections={sections}
  scrollThreshold={250}
  activeSection={activeSection}
  onSectionClick={handleSectionClick}
  actions={
    <>
      <IconButton
        icon={Search}
        label="Search"
        onClick={() => setShowSearch(true)}
      />
      <Button variant="primary">Sign Up</Button>
    </>
  }
/>
```

## Scroll Tracking

```tsx
function PageWithScrollHeader() {
  const [activeSection, setActiveSection] = useState('intro');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Track active section based on scroll position
      const sections = ['intro', 'features', 'pricing', 'faq'];
      
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
      
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ScrollHeader
        sections={sections}
        scrollThreshold={300}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />
      
      <section id="intro">...</section>
      <section id="features">...</section>
      <section id="pricing">...</section>
      <section id="faq">...</section>
    </>
  );
}
```

## Sidebar Integration

```tsx
<ScrollHeader
  sections={sections}
  scrollThreshold={200}
  activeSection={activeSection}
  onSectionClick={handleSectionClick}
  sidebarState="icons" // Adjusts position for sidebar
/>
```

## Props

```typescript
interface ScrollHeaderProps {
  /** Page sections to navigate */
  sections: Section[];
  /** Scroll threshold to show header (px) */
  scrollThreshold?: number;
  /** Currently active section ID */
  activeSection?: string;
  /** Section click handler */
  onSectionClick?: (id: string) => void;
  /** Optional logo */
  logo?: {
    icon?: IconComponent;
    text: string;
    href: string;
  };
  /** Optional actions */
  actions?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** ARIA label */
  ariaLabel?: string;
  /** Sidebar state for offset calculation */
  sidebarState?: "hidden" | "icons";
}

interface Section {
  id: string;
  label: string;
  href: string;
  icon?: IconComponent;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built with React hooks and composition patterns
2. **Borders before shadows** - Clean borders for separation, no heavy shadows
3. **Typography before decoration** - Font weight (medium/semibold) for hierarchy
4. **Tokens before magic numbers** - All values from theme system (`--theme-spacing-*`, `--theme-primary`, etc.)
5. **Composition before complexity** - Simple, modular component structure
6. **Standards before frameworks** - Standard React patterns and web APIs
7. **Accessibility before aesthetics** - WCAG AA+ compliance with full keyboard and screen reader support

### Refined Minimalism

- **Border-based separation** - 2px borders instead of heavy shadows
- **Typography-driven hierarchy** - Font weight 600/700 for emphasis
- **High-contrast colors** - 7:1 text contrast, 3:1 UI contrast
- **Generous whitespace** - Token-based spacing for breathing room
- **Minimal decoration** - Clean, purposeful design

## Accessibility

- ✅ Semantic HTML (`<nav>` element)
- ✅ ARIA navigation landmark
- ✅ Active state indication
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Screen reader support
- ✅ WCAG AA+ compliant

## Animation & Transitions

- **Slide down** animation on appear (300ms ease)
- **Slide up** animation on hide (300ms ease)
- **Smooth scroll** to sections with fallback for unsupported browsers
- **Responsive transitions** for sidebar offset changes
- **Reduced motion** support - respects `prefers-reduced-motion`

## Performance Characteristics

- **Passive scroll listeners** - No blocking scroll events
- **Debounced resize handling** - 150ms debounce for resize calculations
- **Memoized offset calculations** - Optimized sidebar offset updates
- **Efficient state management** - Minimal re-renders
- **Lazy evaluation** - Only processes sections when needed

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- React 18+
- Modern browsers with CSS custom properties support

## Related Components

- **TopBar** - Permanent top navigation bar
- **Sidebar** - Side navigation for application layouts
- **Navigation** - Full-featured navigation component (legacy)
- **Hero** - Hero sections and headers
- **Breadcrumb** - Hierarchical navigation

## Testing

Comprehensive test suite with 800+ lines covering:

- Rendering and props
- Scroll visibility behavior
- Section navigation and active states
- Sidebar integration and offsets
- Loading states and skeletons
- Accessibility and ARIA attributes
- Responsive behavior
- Edge cases and error handling

Run tests:

```bash
pnpm test ScrollHeader
```

## Migration Guide

### From Navigation Component

```tsx
// Before (Navigation)
<Navigation
  logo={{ text: 'App', href: '/' }}
  links={links}
  currentPath={path}
/>

// After (ScrollHeader)
<ScrollHeader
  logo={<span>App</span>}
  sections={sections}
  activeSection={activeId}
  scrollThreshold={200}
/>
```

### From Custom Implementation

```tsx
// Before (Custom)
const [visible, setVisible] = useState(false);
useEffect(() => {
  const handleScroll = () => setVisible(window.scrollY > 200);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// After (ScrollHeader)
<ScrollHeader
  sections={sections}
  scrollThreshold={200}
  // Component handles visibility internally
/>
```

## License

MIT

---

**Component Documentation**: See [USAGE-GUIDE.md](./USAGE-GUIDE.md) for detailed usage examples, patterns, and best practices.
