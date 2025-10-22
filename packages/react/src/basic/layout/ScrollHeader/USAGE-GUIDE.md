# ScrollHeader Component - Complete Usage Guide

**Component Version**: v0.1.0
**Last Updated**: October 20, 2025
**Package**: @spexop/react
**Status**: Production Ready

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [Basic Usage](#basic-usage)
5. [Advanced Patterns](#advanced-patterns)
6. [Scroll Tracking Implementation](#scroll-tracking-implementation)
7. [Active Section Detection](#active-section-detection)
8. [Sidebar Integration](#sidebar-integration)
9. [Styling and Theming](#styling-and-theming)
10. [Accessibility](#accessibility)
11. [Best Practices](#best-practices)
12. [Performance Optimization](#performance-optimization)
13. [Troubleshooting](#troubleshooting)
14. [API Reference](#api-reference)

## Overview

The ScrollHeader component is a navigation header that appears when scrolling past hero content. It provides quick navigation to page sections with smooth animations and responsive behavior, following the Spexop design principles.

### When to Use

Use ScrollHeader when you need:

- A sticky navigation header that appears after scrolling
- Quick navigation to different sections of a long page
- Context-aware navigation that shows current section
- Integration with existing sidebar layouts
- Smooth scroll behavior with offset calculations
- Loading states while content is being fetched

### When Not to Use

Consider alternatives when you need:

- **Permanent top navigation**: Use the TopBar component instead
- **Complex nested navigation**: Use the Navigation or Sidebar component
- **In-page tabs**: Use the Tabs component
- **Short pages**: ScrollHeader is designed for long-form content with multiple sections

### Key Features

- Scroll-triggered visibility with customizable threshold
- Section navigation with active tracking
- Optional logo and action buttons
- Sidebar offset awareness for responsive positioning
- Smooth slide-down animation
- Loading states with skeleton display
- WCAG AA+ accessible with full keyboard support
- Mobile-responsive with touch-friendly targets
- Scroll position restoration on navigation
- Performance-optimized with debounced resize handling

## Quick Start

### Minimal Example

```tsx
import { ScrollHeader } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: 'Introduction', href: '#intro' },
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
  ];

  return (
    <>
      <ScrollHeader
        sections={sections}
        scrollThreshold={300}
        activeSection={activeSection}
        onSectionClick={(id) => {
          setActiveSection(id);
          console.log(`Navigating to: ${id}`);
        }}
      />
      
      <section id="intro">
        <h1>Introduction</h1>
        <p>Your content here...</p>
      </section>
      
      <section id="features">
        <h1>Features</h1>
        <p>Your content here...</p>
      </section>
      
      <section id="pricing">
        <h1>Pricing</h1>
        <p>Your content here...</p>
      </section>
    </>
  );
}
```

### With Icons

```tsx
import { ScrollHeader } from '@spexop/react';
import { Home, Code, DollarSign, Mail } from '@spexop/icons';

function App() {
  const sections = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'features', label: 'Features', icon: Code, href: '#features' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign, href: '#pricing' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <ScrollHeader
      sections={sections}
      scrollThreshold={200}
      activeSection="home"
    />
  );
}
```

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
# or
yarn add @spexop/react @spexop/icons @spexop/theme
```

### Peer Dependencies

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

### Import Statements

```tsx
// Component import
import { ScrollHeader } from '@spexop/react';

// Icon imports (optional)
import { Home, Code, Settings } from '@spexop/icons';

// Types import (if using TypeScript)
import type { ScrollHeaderProps, ScrollSection } from '@spexop/react';
```

## Basic Usage

### Simple Sections

```tsx
import { ScrollHeader } from '@spexop/react';

function SimplePage() {
  const sections = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  return (
    <ScrollHeader
      sections={sections}
      scrollThreshold={200}
    />
  );
}
```

### With Logo

```tsx
import { ScrollHeader } from '@spexop/react';
import { Zap } from '@spexop/icons';

function PageWithLogo() {
  const logo = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Zap size={24} strokeWidth={2} />
      <span style={{ fontWeight: 700, fontSize: '18px' }}>MyApp</span>
    </div>
  );

  return (
    <ScrollHeader
      logo={logo}
      sections={sections}
      scrollThreshold={250}
    />
  );
}
```

### With Action Buttons

```tsx
import { ScrollHeader } from '@spexop/react';
import { Button } from '@spexop/react';
import { Search, User } from '@spexop/icons';

function PageWithActions() {
  const actions = (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => console.log('Search clicked')}
      >
        <Search size={18} />
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() => console.log('Sign in clicked')}
      >
        <User size={18} />
        Sign In
      </Button>
    </div>
  );

  return (
    <ScrollHeader
      sections={sections}
      scrollThreshold={300}
      actions={actions}
    />
  );
}
```

### Custom Scroll Threshold

```tsx
// Appears after scrolling 500 pixels
<ScrollHeader
  sections={sections}
  scrollThreshold={500}
/>

// Appears immediately on any scroll
<ScrollHeader
  sections={sections}
  scrollThreshold={0}
/>

// Appears after scrolling past the hero section
function DynamicThreshold() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(200);

  useEffect(() => {
    if (heroRef.current) {
      setThreshold(heroRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <div ref={heroRef}>
        <Hero />
      </div>
      <ScrollHeader
        sections={sections}
        scrollThreshold={threshold}
      />
    </>
  );
}
```

## Advanced Patterns

### Complete Integration Example

```tsx
import { ScrollHeader } from '@spexop/react';
import { Home, Info, Code, DollarSign, Mail } from '@spexop/icons';
import { useState, useEffect } from 'react';

function AdvancedPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'about', label: 'About', icon: Info, href: '#about' },
    { id: 'features', label: 'Features', icon: Code, href: '#features' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign, href: '#pricing' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
      
      // Update active section based on scroll position
      const sectionIds = ['home', 'about', 'features', 'pricing', 'contact'];
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (accounting for header offset)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    console.log(`Navigating to section: ${id}`);
    
    // Optional: Analytics tracking
    // trackEvent('section_navigation', { section: id });
  };

  const logo = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontWeight: 700, fontSize: '18px' }}>MyApp</span>
    </div>
  );

  const actions = (
    <button
      onClick={() => console.log('CTA clicked')}
      style={{
        padding: '8px 16px',
        background: 'var(--theme-primary)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      Get Started
    </button>
  );

  return (
    <>
      <ScrollHeader
        sections={sections}
        scrollThreshold={300}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
        logo={logo}
        actions={actions}
        ariaLabel="Main page navigation"
      />
      
      {/* Page content */}
      <section id="home" style={{ minHeight: '100vh' }}>
        <h1>Home</h1>
      </section>
      
      <section id="about" style={{ minHeight: '100vh' }}>
        <h1>About</h1>
      </section>
      
      <section id="features" style={{ minHeight: '100vh' }}>
        <h1>Features</h1>
      </section>
      
      <section id="pricing" style={{ minHeight: '100vh' }}>
        <h1>Pricing</h1>
      </section>
      
      <section id="contact" style={{ minHeight: '100vh' }}>
        <h1>Contact</h1>
      </section>
    </>
  );
}
```

### Loading State Pattern

```tsx
import { ScrollHeader } from '@spexop/react';
import { useState, useEffect } from 'react';

function PageWithLoadingState() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    fetch('/api/page-sections')
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollHeader
      // Pass empty array while loading to show skeleton
      sections={loading ? [] : sections}
      scrollThreshold={200}
    />
  );
}
```

### Custom Styling

```tsx
import { ScrollHeader } from '@spexop/react';

function StyledScrollHeader() {
  return (
    <ScrollHeader
      sections={sections}
      scrollThreshold={200}
      className="my-custom-header"
      style={{
        // Custom inline styles
        '--scroll-header-bg': '#f8f9fa',
      } as React.CSSProperties}
    />
  );
}

// In your CSS file
// .my-custom-header {
//   backdrop-filter: blur(10px);
//   box-shadow: 0 1px 3px rgba(0,0,0,0.1);
// }
```

## Scroll Tracking Implementation

### Basic Scroll Tracking

```tsx
import { useState, useEffect } from 'react';
import { ScrollHeader } from '@spexop/react';

function useScrollTracking(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
}

function Page() {
  const sectionIds = ['intro', 'features', 'pricing', 'faq'];
  const activeSection = useScrollTracking(sectionIds);

  const sections = [
    { id: 'intro', label: 'Introduction', href: '#intro' },
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
  ];

  return (
    <ScrollHeader
      sections={sections}
      scrollThreshold={200}
      activeSection={activeSection}
    />
  );
}
```

### Scroll Tracking with Debouncing

```tsx
import { useState, useEffect, useCallback } from 'react';
import { ScrollHeader } from '@spexop/react';

function useScrollTracking(sectionIds: string[], delay = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const updateActiveSection = useCallback(() => {
    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        // More precise calculation accounting for header offset
        const headerOffset = 84; // Header height + padding
        if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
          setActiveSection(id);
          break;
        }
      }
    }
  }, [sectionIds]);

  useEffect(() => {
    const debouncedUpdate = debounce(updateActiveSection, delay);
    
    window.addEventListener('scroll', debouncedUpdate, { passive: true });
    updateActiveSection(); // Initial call

    return () => window.removeEventListener('scroll', debouncedUpdate);
  }, [updateActiveSection, delay]);

  return activeSection;
}
```

## Active Section Detection

### Using Intersection Observer (Recommended)

```tsx
import { useState, useEffect, useRef } from 'react';
import { ScrollHeader } from '@spexop/react';

function useIntersectionObserver(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Calculate offset for header
    const headerOffset = 84; // Header height + padding
    const rootMargin = `-${headerOffset}px 0px -50% 0px`;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        
        if (visibleEntry) {
          const id = visibleEntry.target.id;
          setActiveSection(id);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin,
      }
    );

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds]);

  return activeSection;
}

function Page() {
  const sectionIds = ['intro', 'features', 'pricing'];
  const activeSection = useIntersectionObserver(sectionIds);

  const sections = [
    { id: 'intro', label: 'Introduction', href: '#intro' },
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
  ];

  return (
    <ScrollHeader
      sections={sections}
      scrollThreshold={200}
      activeSection={activeSection}
    />
  );
}
```

### Manual Viewport Detection

```tsx
import { useState, useEffect } from 'react';

function useViewportDetection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const checkViewport = () => {
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      
      let mostVisibleSection = sectionIds[0];
      let maxVisibleHeight = 0;

      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementBottom = elementTop + element.offsetHeight;

        // Calculate visible portion
        const visibleTop = Math.max(elementTop, scrollTop);
        const visibleBottom = Math.min(elementBottom, scrollTop + viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          mostVisibleSection = id;
        }
      });

      setActiveSection(mostVisibleSection);
    };

    window.addEventListener('scroll', checkViewport, { passive: true });
    checkViewport();

    return () => window.removeEventListener('scroll', checkViewport);
  }, [sectionIds]);

  return activeSection;
}
```

## Sidebar Integration

### With Sidebar Component

```tsx
import { ScrollHeader, Sidebar } from '@spexop/react';
import { useState } from 'react';

function PageWithSidebar() {
  const [sidebarState, setSidebarState] = useState<'hidden' | 'icons'>('icons');

  return (
    <>
      <Sidebar
        state={sidebarState}
        onStateChange={setSidebarState}
        items={sidebarItems}
      />
      
      <ScrollHeader
        sections={sections}
        scrollThreshold={200}
        // Pass sidebar state so ScrollHeader can adjust its position
        sidebarState={sidebarState}
      />
      
      <main style={{
        marginLeft: sidebarState === 'icons' ? '96px' : '0',
        transition: 'margin-left 0.3s ease',
      }}>
        {/* Page content */}
      </main>
    </>
  );
}
```

### Responsive Sidebar Integration

```tsx
import { ScrollHeader, Sidebar } from '@spexop/react';
import { useState, useEffect } from 'react';

function ResponsivePage() {
  const [sidebarState, setSidebarState] = useState<'hidden' | 'icons'>('icons');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Hide sidebar on mobile
      if (mobile) {
        setSidebarState('hidden');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {!isMobile && (
        <Sidebar
          state={sidebarState}
          onStateChange={setSidebarState}
          items={sidebarItems}
        />
      )}
      
      <ScrollHeader
        sections={sections}
        scrollThreshold={200}
        sidebarState={sidebarState}
      />
      
      <main
        style={{
          marginLeft: !isMobile && sidebarState === 'icons' ? '96px' : '0',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Page content */}
      </main>
    </>
  );
}
```

### Manual Offset Control

```tsx
import { ScrollHeader } from '@spexop/react';
import { useState } from 'react';

function CustomOffsetPage() {
  const [customOffset, setCustomOffset] = useState(0);

  // ScrollHeader internally calculates offset based on sidebarState
  // But you can also control positioning via custom styles
  return (
    <div style={{ position: 'relative' }}>
      <ScrollHeader
        sections={sections}
        scrollThreshold={200}
        style={{
          // Add custom offset if needed
          paddingLeft: `${customOffset}px`,
        } as React.CSSProperties}
      />
    </div>
  );
}
```

## Styling and Theming

### Theme Integration

The ScrollHeader component uses theme tokens from `@spexop/theme`:

```tsx
import { UnifiedThemeProvider } from '@spexop/react';
import { ocean } from '@spexop/theme/presets';

function ThemedApp() {
  return (
    <UnifiedThemeProvider theme={ocean}>
      <ScrollHeader
        sections={sections}
        scrollThreshold={200}
      />
    </UnifiedThemeProvider>
  );
}
```

### Theme Tokens Used

The component uses the following theme tokens:

- **Spacing**: `--theme-spacing-2` through `--theme-spacing-8`
- **Colors**: `--theme-primary`, `--theme-text`, `--theme-text-secondary`, `--theme-surface`, `--theme-border`
- **Typography**: `--theme-font-family`, `--theme-font-size-sm`, `--theme-font-weight-medium`, `--theme-font-weight-semibold`
- **Radius**: `--theme-radius-base`
- **Border**: `--theme-border-width`

### Custom CSS Overrides

```css
/* In your global CSS or module */
.custom-scroll-header {
  /* Override background */
  background: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.9)) !important;
  backdrop-filter: blur(8px);
  
  /* Add subtle shadow */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.custom-scroll-header .sectionLink {
  /* Customize link appearance */
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 13px;
}

.custom-scroll-header .sectionLink.active {
  /* Customize active state */
  color: var(--theme-primary);
  font-weight: 700;
}
```

### Dark Mode Support

```tsx
function DarkModeExample() {
  const [theme, setTheme] = useState('light');

  return (
    <div data-theme={theme}>
      <ScrollHeader
        sections={sections}
        scrollThreshold={200}
        actions={
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Toggle Theme
          </button>
        }
      />
    </div>
  );
}
```

## Accessibility

### WCAG AA+ Compliance

The ScrollHeader component is designed to meet WCAG AA+ standards:

- **Contrast Ratios**: All text meets minimum 7:1 contrast
- **Touch Targets**: All interactive elements are minimum 44px
- **Keyboard Navigation**: Full support for Tab, Enter, and Space
- **Screen Readers**: Proper ARIA labels and landmarks
- **Focus Indicators**: Clear focus states on all interactive elements

### Keyboard Navigation

```tsx
// The component automatically handles:
// - Tab: Navigate between section links
// - Enter/Space: Activate section link
// - Escape: No specific handler (can be added via onSectionClick)

function AccessiblePage() {
  const handleSectionClick = (id: string) => {
    // Announce to screen readers
    const message = `Navigating to ${id} section`;
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <ScrollHeader
      sections={sections}
      scrollThreshold={200}
      onSectionClick={handleSectionClick}
      ariaLabel="Main page navigation"
    />
  );
}
```

### Screen Reader Support

```tsx
function ScreenReaderOptimized() {
  const sections = [
    { 
      id: 'intro',
      label: 'Introduction',
      href: '#intro',
      // Screen readers will announce: "Introduction, link, current page"
    },
    {
      id: 'features',
      label: 'Features',
      href: '#features',
    },
  ];

  return (
    <ScrollHeader
      sections={sections}
      scrollThreshold={200}
      activeSection="intro"
      // Descriptive aria-label for the navigation landmark
      ariaLabel="Main content navigation with 2 sections"
    />
  );
}
```

### Focus Management

```tsx
import { useRef, useEffect } from 'react';

function FocusManagementExample() {
  const scrollHeaderRef = useRef<HTMLElement>(null);

  const handleSectionClick = (id: string) => {
    // Navigate to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Move focus to the section heading for screen readers
      const heading = element.querySelector('h1, h2, h3');
      if (heading) {
        (heading as HTMLElement).setAttribute('tabindex', '-1');
        (heading as HTMLElement).focus();
      }
    }
  };

  return (
    <ScrollHeader
      sections={sections}
      scrollThreshold={200}
      onSectionClick={handleSectionClick}
    />
  );
}
```

## Best Practices

### Do's ✓

1. **Use descriptive section labels**

   ```tsx
   // Good
   { id: 'pricing', label: 'Pricing Plans', href: '#pricing' }
   
   // Bad
   { id: 'section3', label: 'Section 3', href: '#section3' }
   ```

2. **Limit to 8 or fewer sections**

   ```tsx
   // Good - 5 sections
   const sections = [
     { id: 'home', label: 'Home', href: '#home' },
     { id: 'about', label: 'About', href: '#about' },
     { id: 'features', label: 'Features', href: '#features' },
     { id: 'pricing', label: 'Pricing', href: '#pricing' },
     { id: 'contact', label: 'Contact', href: '#contact' },
   ];
   ```

3. **Use icons consistently**

   ```tsx
   // Good - all sections have icons
   const sections = [
     { id: 'home', label: 'Home', icon: Home, href: '#home' },
     { id: 'about', label: 'About', icon: Info, href: '#about' },
     { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
   ];
   
   // Or none have icons
   const sections = [
     { id: 'home', label: 'Home', href: '#home' },
     { id: 'about', label: 'About', href: '#about' },
   ];
   ```

4. **Set appropriate scroll threshold**

   ```tsx
   // Good - threshold matches hero height
   const heroHeight = 600;
   <ScrollHeader scrollThreshold={heroHeight} sections={sections} />
   ```

5. **Track active section accurately**

   ```tsx
   // Good - use IntersectionObserver or scroll tracking
   const activeSection = useIntersectionObserver(sectionIds);
   <ScrollHeader activeSection={activeSection} sections={sections} />
   ```

### Don'ts ✗

1. **Don't use too many sections**

   ```tsx
   // Bad - 15 sections is overwhelming
   const sections = Array.from({ length: 15 }, (_, i) => ({
     id: `section-${i}`,
     label: `Section ${i}`,
     href: `#section-${i}`,
   }));
   ```

2. **Don't mix icons inconsistently**

   ```tsx
   // Bad - some have icons, some don't
   const sections = [
     { id: 'home', label: 'Home', icon: Home, href: '#home' },
     { id: 'about', label: 'About', href: '#about' }, // No icon
     { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
   ];
   ```

3. **Don't use vague labels**

   ```tsx
   // Bad
   { id: 'sec1', label: 'Info', href: '#sec1' }
   
   // Good
   { id: 'company-info', label: 'Company Information', href: '#company-info' }
   ```

4. **Don't set threshold too low**

   ```tsx
   // Bad - appears immediately, no time to see content
   <ScrollHeader scrollThreshold={10} sections={sections} />
   
   // Good - gives user time to see hero
   <ScrollHeader scrollThreshold={300} sections={sections} />
   ```

5. **Don't forget to track active section**

   ```tsx
   // Bad - no active tracking
   <ScrollHeader sections={sections} />
   
   // Good - tracks current section
   <ScrollHeader sections={sections} activeSection={activeSection} />
   ```

## Performance Optimization

### Memoization

```tsx
import { useMemo } from 'react';
import { ScrollHeader } from '@spexop/react';

function OptimizedPage() {
  // Memoize sections to prevent re-creation
  const sections = useMemo(() => [
    { id: 'intro', label: 'Introduction', href: '#intro' },
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
  ], []);

  // Memoize logo to prevent re-renders
  const logo = useMemo(() => (
    <div>Logo</div>
  ), []);

  return (
    <ScrollHeader
      sections={sections}
      logo={logo}
      scrollThreshold={200}
    />
  );
}
```

### Debounced Scroll Tracking

```tsx
import { useState, useEffect } from 'react';

function useDebouncedScroll(threshold: number, delay: number = 100) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(window.scrollY > threshold);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, delay]);

  return isVisible;
}
```

### Lazy Loading Sections

```tsx
import { useState, useEffect } from 'react';
import { ScrollHeader } from '@spexop/react';

function LazyLoadedSections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load sections asynchronously
    import('./sections-data.json')
      .then((data) => {
        setSections(data.default);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollHeader
      sections={loading ? [] : sections}
      scrollThreshold={200}
    />
  );
}
```

### Virtual Scrolling for Long Pages

```tsx
// For extremely long pages with many sections,
// consider virtual scrolling
import { ScrollHeader } from '@spexop/react';

function VirtualScrolledPage() {
  // Only render sections currently visible in ScrollHeader
  const visibleSections = useMemo(() => {
    // Logic to determine which sections are near viewport
    return allSections.slice(startIndex, endIndex);
  }, [startIndex, endIndex]);

  return (
    <ScrollHeader
      sections={visibleSections}
      scrollThreshold={200}
    />
  );
}
```

## Troubleshooting

### Common Issues

#### Issue: ScrollHeader doesn't appear

**Problem**: Component doesn't show when scrolling.

**Solutions**:

```tsx
// 1. Check scroll threshold
<ScrollHeader scrollThreshold={200} sections={sections} />

// 2. Verify you're scrolling past the threshold
console.log('Current scroll:', window.scrollY);

// 3. Check if sections are provided
console.log('Sections:', sections);

// 4. Ensure component is rendered
const { container } = render(<ScrollHeader ... />);
console.log('Header:', container.querySelector('header'));
```

#### Issue: Active section not updating

**Problem**: Active state doesn't change when scrolling.

**Solutions**:

```tsx
// 1. Implement proper scroll tracking
const activeSection = useScrollTracking(sectionIds);

// 2. Verify section IDs match
sections.forEach(s => {
  const element = document.getElementById(s.id);
  console.log(`Section ${s.id} exists:`, !!element);
});

// 3. Check for proper offset calculation
const headerOffset = 84; // Adjust based on your layout
```

#### Issue: Sidebar offset incorrect

**Problem**: ScrollHeader doesn't align properly with sidebar.

**Solutions**:

```tsx
// 1. Pass correct sidebarState
<ScrollHeader sidebarState="icons" sections={sections} />

// 2. Verify sidebar width matches constant
// SIDEBAR_ICONS_WIDTH = 96 in component

// 3. Check responsive behavior
const isMobile = window.innerWidth < 768;
console.log('Is mobile:', isMobile);
```

#### Issue: Smooth scroll not working

**Problem**: Clicking sections jumps instead of smooth scrolling.

**Solutions**:

```tsx
// 1. The component handles smooth scroll internally
// No additional config needed

// 2. Check browser support
// Fallback is automatic for unsupported browsers

// 3. Verify section element exists
const element = document.querySelector('#section-id');
console.log('Element found:', !!element);
```

#### Issue: Loading skeleton not showing

**Problem**: Skeleton doesn't display when sections are empty.

**Solutions**:

```tsx
// 1. Pass empty array, not undefined
<ScrollHeader sections={[]} scrollThreshold={200} />

// 2. Check initial state
const [sections, setSections] = useState([]); // Not undefined

// 3. Verify CSS classes load
import styles from './ScrollHeader.module.css';
console.log('Styles:', styles);
```

### Debug Mode

```tsx
function DebugScrollHeader() {
  const [activeSection, setActiveSection] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Debug overlay */}
      <div style={{
        position: 'fixed',
        top: 100,
        right: 20,
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '12px',
        zIndex: 9999,
      }}>
        <div>Scroll Y: {scrollY}</div>
        <div>Active: {activeSection}</div>
        <div>Threshold: 200</div>
        <div>Visible: {scrollY > 200 ? 'Yes' : 'No'}</div>
      </div>

      <ScrollHeader
        sections={sections}
        scrollThreshold={200}
        activeSection={activeSection}
        onSectionClick={(id) => {
          console.log('Section clicked:', id);
          setActiveSection(id);
        }}
      />
    </>
  );
}
```

## API Reference

### ScrollHeaderProps

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sections` | `ScrollSection[]` | **Required** | Array of navigation sections |
| `scrollThreshold` | `number` | `200` | Scroll position (px) before header appears |
| `activeSection` | `string` | `undefined` | ID of currently active section |
| `onSectionClick` | `(id: string) => void` | `undefined` | Callback when section is clicked |
| `logo` | `React.ReactNode` | `undefined` | Optional logo element |
| `actions` | `React.ReactNode` | `undefined` | Optional action buttons |
| `className` | `string` | `""` | Additional CSS class |
| `ariaLabel` | `string` | `"Page navigation header"` | ARIA label for navigation |
| `sidebarState` | `"icons" \| "hidden"` | `"hidden"` | Sidebar state for offset calculation |

### ScrollSection

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | **Required** - Unique section identifier |
| `label` | `string` | **Required** - Display label |
| `href` | `string` | **Required** - URL or hash link |
| `icon` | `ComponentType` | Optional icon from @spexop/icons |

### CSS Custom Properties

Override these CSS custom properties for styling:

```css
.scrollHeader {
  --scroll-header-padding-right: var(--theme-spacing-6);
}
```

### Events

#### onSectionClick

```tsx
onSectionClick?: (sectionId: string) => void
```

Called when a section link is clicked. The section ID is passed as an argument.

**Example**:

```tsx
const handleSectionClick = (id: string) => {
  console.log(`Navigating to: ${id}`);
  // Track analytics
  // Update application state
  // Custom navigation logic
};

<ScrollHeader
  sections={sections}
  onSectionClick={handleSectionClick}
/>
```

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- React 18+

### TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  ScrollHeaderProps,
  ScrollSection,
} from '@spexop/react';

const sections: ScrollSection[] = [
  { id: 'home', label: 'Home', href: '#home' },
];

const props: ScrollHeaderProps = {
  sections,
  scrollThreshold: 200,
  activeSection: 'home',
};
```

## Related Components

- **TopBar** - Permanent top navigation
- **Sidebar** - Side navigation for application layouts
- **Navigation** - Full-featured navigation component (legacy)
- **Breadcrumb** - Hierarchical navigation
- **Tabs** - In-page tab navigation

## License

MIT

## Support

For issues, questions, or contributions:

- GitHub: [github.com/spexop-ui/spexop](https://github.com/spexop-ui/spexop)
- Documentation: [spexop.dev/docs](https://spexop.dev/docs)

---

**Last Updated**: October 20, 2025
**Component Version**: v0.1.0
**Package**: @spexop/react v0.2.0
