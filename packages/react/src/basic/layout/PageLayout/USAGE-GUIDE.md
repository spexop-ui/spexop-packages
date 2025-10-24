# PageLayout Component - Comprehensive Usage Guide

Version: 0.4.1
Package: @spexop/react
Status: Production Ready

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [When to Use](#when-to-use)
- [Basic Usage](#basic-usage)
- [Padding Strategies](#padding-strategies)
- [Max-Width Options](#max-width-options)
- [Responsive Patterns](#responsive-patterns)
- [Semantic HTML](#semantic-html)
- [Real-World Examples](#real-world-examples)
- [Best Practices](#best-practices)
- [Accessibility](#accessibility)
- [API Reference](#api-reference)

## Overview

PageLayout is a page-level layout container built on the Container primitive with page-optimized defaults. It provides a centered layout with 1600px max-width and responsive padding that scales from 24px on mobile to 64px on desktop.

### Key Features

- 1600px default max-width (optimized for page layouts)
- Responsive padding: 24px → 40px → 64px
- Dual padding API: semantic strings or numeric values
- Built on Container primitive (DRY principle)
- Polymorphic component (any HTML element)
- Fully typed with TypeScript

### Design Philosophy

PageLayout follows "The Spexop Way":

1. **Primitives before patterns** - Uses Container internally
2. **Tokens before magic numbers** - Design token-based spacing
3. **Composition before complexity** - Simple wrapper, smart defaults
4. **Standards before frameworks** - Standard HTML elements
5. **Accessibility before aesthetics** - Semantic HTML structure

## Core Concepts

### The Container Primitive

PageLayout is a specialized wrapper around the Container primitive:

```typescript
// PageLayout internally:
<Container
  maxWidth="page"      // 1600px
  padding={resolvedPadding}
  centered={true}
>
  {children}
</Container>
```

### Responsive Padding by Default

When using `padding="lg"` (default), PageLayout applies responsive padding:

- **Mobile (xs, sm)**: 24px (spacing-6)
- **Tablet (md, lg)**: 40px (spacing-8)
- **Desktop (xl, 2xl)**: 64px (spacing-10)

## When to Use

### Use PageLayout For

- Main page container
- Full-page layouts
- Content pages with standard width
- Landing pages
- Blog posts and articles
- Dashboard pages

### Do NOT Use For

- Individual sections (use Section component)
- Card-based layouts (use Card component)
- Precise grid layouts (use Grid primitive)
- Full-bleed content (use Container with maxWidth="full")

## Basic Usage

### Simplest Form

```tsx
import { PageLayout } from '@spexop/react';

function MyPage() {
  return (
    <PageLayout>
      <h1>Welcome</h1>
      <p>This is my page content.</p>
    </PageLayout>
  );
}
```

### With Semantic Main Element

```tsx
function MyPage() {
  return (
    <PageLayout as="main">
      <h1>Main Content</h1>
      <p>Accessible page structure.</p>
    </PageLayout>
  );
}
```

## Padding Strategies

### String Variants (Recommended)

Semantic string variants provide better developer experience:

```tsx
// No padding
<PageLayout padding="none">
  <div>Full-bleed content</div>
</PageLayout>

// Compact (16px)
<PageLayout padding="sm">
  <div>Compact padding</div>
</PageLayout>

// Standard (24px)
<PageLayout padding="md">
  <div>Standard padding</div>
</PageLayout>

// Comfortable (40px base, responsive)
<PageLayout padding="lg">
  <div>Comfortable padding with responsive scaling</div>
</PageLayout>

// Spacious (64px)
<PageLayout padding="xl">
  <div>Maximum padding</div>
</PageLayout>
```

### Numeric Values (Precise Control)

Use numeric SpacingScale values when you need exact control:

```tsx
// No padding
<PageLayout padding={0}>
  <div>Content</div>
</PageLayout>

// 16px
<PageLayout padding={4}>
  <div>Content</div>
</PageLayout>

// 24px
<PageLayout padding={6}>
  <div>Content</div>
</PageLayout>

// 40px
<PageLayout padding={8}>
  <div>Content</div>
</PageLayout>

// 64px
<PageLayout padding={10}>
  <div>Content</div>
</PageLayout>
```

### Responsive Objects (Advanced)

For complete control over responsive behavior:

```tsx
<PageLayout
  padding={{
    xs: 4,   // 16px on mobile
    sm: 6,   // 24px on small tablets
    md: 8,   // 40px on tablets
    lg: 8,   // 40px on laptops
    xl: 10,  // 64px on desktops
    '2xl': 10 // 64px on large displays
  }}
>
  <div>Custom responsive padding</div>
</PageLayout>
```

### Padding Decision Guide

| Scenario | Recommendation | Example |
|----------|----------------|---------|
| Standard page | `padding="lg"` | Landing page, blog |
| Compact mobile | `padding="md"` | Mobile-first app |
| Maximum space | `padding="xl"` | Dashboard, data viz |
| Full-bleed | `padding="none"` | Hero sections |
| Custom responsive | Responsive object | Complex layouts |

## Max-Width Options

### Standard Widths

```tsx
// Small (640px) - Narrow content
<PageLayout maxWidth="sm">
  <p>Narrow reading width</p>
</PageLayout>

// Medium (768px) - Blog posts
<PageLayout maxWidth="md">
  <article>Blog content</article>
</PageLayout>

// Large (1024px) - Standard pages
<PageLayout maxWidth="lg">
  <div>Standard page</div>
</PageLayout>

// Extra Large (1536px) - Wide content
<PageLayout maxWidth="xl">
  <div>Wide layout</div>
</PageLayout>

// 2XL (1920px) - Full HD
<PageLayout maxWidth="2xl">
  <div>Maximum width</div>
</PageLayout>

// Page (1600px) - Default, optimized for pages
<PageLayout maxWidth="page">
  <div>Page layout</div>
</PageLayout>

// Full - 100% width
<PageLayout maxWidth="full">
  <div>Full browser width</div>
</PageLayout>
```

### Max-Width Use Cases

| Width | Size | Best For |
|-------|------|----------|
| `sm` | 640px | Long-form reading, blog posts |
| `md` | 768px | Articles, documentation |
| `lg` | 1024px | Standard content pages |
| `xl` | 1536px | Wide content, dashboards |
| `2xl` | 1920px | Full HD layouts |
| `page` | 1600px | Default page layouts |
| `full` | 100% | Full-width experiences |

## Responsive Patterns

### Mobile-First Page

```tsx
function MobilePage() {
  return (
    <PageLayout maxWidth="md" padding="md">
      <header>
        <h1>Mobile-Optimized</h1>
      </header>
      <main>
        <p>Comfortable on mobile devices.</p>
      </main>
    </PageLayout>
  );
}
```

### Desktop-Optimized Page

```tsx
function DesktopPage() {
  return (
    <PageLayout maxWidth="2xl" padding="xl">
      <div>
        <h1>Desktop Dashboard</h1>
        <p>Maximum space for data visualization.</p>
      </div>
    </PageLayout>
  );
}
```

### Adaptive Page

```tsx
function AdaptivePage() {
  return (
    <PageLayout
      maxWidth={{ xs: 'full', md: 'lg', xl: 'page' }}
      padding="lg"
    >
      <div>
        <h1>Adaptive Layout</h1>
        <p>Changes max-width based on screen size.</p>
      </div>
    </PageLayout>
  );
}
```

## Semantic HTML

### Main Page Content

```tsx
function HomePage() {
  return (
    <PageLayout as="main">
      <h1>Welcome to Our Site</h1>
      <p>Main page content.</p>
    </PageLayout>
  );
}
```

### Article Page

```tsx
function BlogPost() {
  return (
    <PageLayout as="article" maxWidth="md" padding="md">
      <header>
        <h1>Blog Post Title</h1>
        <time dateTime="2025-10-24">October 24, 2025</time>
      </header>
      <section>
        <p>Article content...</p>
      </section>
    </PageLayout>
  );
}
```

### Section-Based Layout

```tsx
function SectionPage() {
  return (
    <PageLayout as="section">
      <h2>Page Section</h2>
      <p>Section content.</p>
    </PageLayout>
  );
}
```

## Real-World Examples

### Landing Page

```tsx
function LandingPage() {
  return (
    <PageLayout as="main" padding="lg">
      <header>
        <h1>Welcome to Acme Corp</h1>
        <p>We build amazing products.</p>
      </header>
      
      <section>
        <h2>Features</h2>
        {/* Feature grid */}
      </section>
      
      <section>
        <h2>Testimonials</h2>
        {/* Testimonial cards */}
      </section>
      
      <footer>
        <p>Contact us</p>
      </footer>
    </PageLayout>
  );
}
```

### Blog Post Page

```tsx
function BlogPostPage() {
  return (
    <PageLayout as="article" maxWidth="md" padding="md">
      <header>
        <h1>How to Build Better UIs</h1>
        <div>
          <time dateTime="2025-10-24">October 24, 2025</time>
          <span>By John Doe</span>
        </div>
      </header>
      
      <div>
        <p>Long-form article content with optimal reading width...</p>
        <h2>Section Heading</h2>
        <p>More content...</p>
      </div>
      
      <footer>
        <p>Tags: UI, Design, Development</p>
      </footer>
    </PageLayout>
  );
}
```

### Dashboard Page

```tsx
function DashboardPage() {
  return (
    <PageLayout as="main" maxWidth="2xl" padding="lg">
      <header>
        <h1>Analytics Dashboard</h1>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {/* Dashboard widgets */}
      </div>
    </PageLayout>
  );
}
```

### Documentation Page

```tsx
function DocsPage() {
  return (
    <PageLayout as="main" maxWidth="lg" padding="md">
      <nav>
        <ul>
          <li><a href="#intro">Introduction</a></li>
          <li><a href="#usage">Usage</a></li>
          <li><a href="#api">API</a></li>
        </ul>
      </nav>
      
      <article>
        <h1>Documentation</h1>
        <section id="intro">
          <h2>Introduction</h2>
          <p>Getting started...</p>
        </section>
        {/* More sections */}
      </article>
    </PageLayout>
  );
}
```

### Settings Page

```tsx
function SettingsPage() {
  return (
    <PageLayout as="main" maxWidth="lg" padding="lg">
      <header>
        <h1>Settings</h1>
      </header>
      
      <section>
        <h2>Profile</h2>
        <form>
          {/* Form fields */}
        </form>
      </section>
      
      <section>
        <h2>Preferences</h2>
        {/* Settings options */}
      </section>
    </PageLayout>
  );
}
```

## Best Practices

### Do's

1. **Use semantic HTML**

   ```tsx
   <PageLayout as="main">  // Good
   ```

2. **Use semantic padding variants**

   ```tsx
   <PageLayout padding="lg">  // Good - clear intent
   ```

3. **Choose appropriate max-width**

   ```tsx
   <PageLayout maxWidth="md">  // Good for blog posts
   ```

4. **Combine with other layout components**

   ```tsx
   <PageLayout>
     <Section>Content</Section>
   </PageLayout>
   ```

5. **Use default props when appropriate**

   ```tsx
   <PageLayout>  // Defaults work for most pages
   ```

### Don'ts

1. **Don't nest PageLayouts**

   ```tsx
   // Bad
   <PageLayout>
     <PageLayout>Content</PageLayout>
   </PageLayout>
   ```

2. **Don't use for sections**

   ```tsx
   // Bad - use Section instead
   <PageLayout maxWidth="sm">
     <Card>Section content</Card>
   </PageLayout>
   ```

3. **Don't override with inline styles**

   ```tsx
   // Bad - use props instead
   <PageLayout style={{ maxWidth: '900px' }}>
   ```

4. **Don't mix padding approaches unnecessarily**

   ```tsx
   // Confusing - pick one approach
   <PageLayout padding="lg">
     <div style={{ padding: '20px' }}>Content</div>
   </PageLayout>
   ```

### Performance Tips

1. Use default props when possible (avoids unnecessary calculations)
2. Avoid deeply nested layouts
3. Leverage browser caching for CSS modules
4. Use semantic HTML for better rendering performance

## Accessibility

### Semantic HTML Elements

Always use appropriate semantic elements:

```tsx
// Main page content
<PageLayout as="main">
  <h1>Page Title</h1>
</PageLayout>

// Article content
<PageLayout as="article">
  <h1>Article Title</h1>
</PageLayout>

// Section content
<PageLayout as="section">
  <h2>Section Title</h2>
</PageLayout>
```

### Heading Hierarchy

Maintain proper heading hierarchy:

```tsx
<PageLayout as="main">
  <h1>Page Title</h1>           {/* Only one h1 */}
  <section>
    <h2>Section Title</h2>      {/* h2 for sections */}
    <h3>Subsection</h3>         {/* h3 for subsections */}
  </section>
</PageLayout>
```

### Landmark Regions

Use ARIA landmarks when needed:

```tsx
<PageLayout as="main" role="main">
  <section aria-label="Featured Content">
    {/* Content */}
  </section>
</PageLayout>
```

### Screen Reader Support

PageLayout is transparent to screen readers - it provides layout without affecting content structure:

```tsx
<PageLayout>
  <h1>Title</h1>
  <p>Content</p>
</PageLayout>

// Screen reader: "Title. Content."
// (PageLayout wrapper is ignored)
```

## API Reference

### Props

```typescript
interface PageLayoutProps {
  children?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'page' | 'full';
  padding?: SpacingScale | SpacingVariant | ResponsiveProp<SpacingScale>;
  centered?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}
```

### Type Definitions

```typescript
type SpacingScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type SpacingVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl';

type ResponsiveProp<T> = T | {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};
```

### Defaults

```typescript
{
  maxWidth: 'page',    // 1600px
  padding: 'lg',       // Responsive: 24px → 40px → 64px
  centered: true,
  as: 'div'
}
```

### Design Tokens

```css
/* Spacing tokens used by PageLayout */
--theme-spacing-0: 0;
--theme-spacing-1: 4px;
--theme-spacing-2: 8px;
--theme-spacing-3: 12px;
--theme-spacing-4: 16px;
--theme-spacing-5: 20px;
--theme-spacing-6: 24px;
--theme-spacing-7: 32px;
--theme-spacing-8: 40px;
--theme-spacing-9: 48px;
--theme-spacing-10: 64px;

/* Max-width for page layout */
--page-max-width: 1600px;
```

## Related Components

- **Container** - Base primitive for max-width constraints
- **Section** - Floating card-style sections
- **Grid** - Multi-dimensional layouts
- **Stack** - Vertical/horizontal stacking
- **Hero** - Hero sections with media
- **Footer** - Page footer component

## Further Reading

- [Container Component](../../primitives/Container/README.md)
- [Section Component](../Section/README.md)
- [Grid Primitives Guide](../../primitives/README.md)
- [Spexop Design System](https://github.com/spexop-ui)

## License

MIT

## Author

Created by @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
