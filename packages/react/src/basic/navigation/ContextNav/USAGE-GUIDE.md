# ContextNav - Usage Guide

**Component Version**: v2.0.0
**Last Updated**: October 21, 2025
**Compatibility**: Stable API

## Quick Start

### Installation

```bash
pnpm add @spexop/react
```

### Basic Example

```tsx
import { ContextNav } from '@spexop/react';

function MyPage() {
  return (
    <ContextNav
      scope="page"
      title="Grid Component"
      navLinks={[
        { label: "Quick Start", href: "#quick-start" },
        { label: "Features", href: "#features" },
        { label: "Props", href: "#props" }
      ]}
      topOffset={80}
    />
  );
}
```

## Common Use Cases

### Page-Level Navigation

Single navigation for entire page that sticks throughout scroll:

```tsx
import { ContextNav } from '@spexop/react';

function DocumentationPage() {
  const pageNavLinks = [
    { label: "Introduction", href: "#intro" },
    { label: "Installation", href: "#installation" },
    { label: "Usage", href: "#usage" },
    { label: "Examples", href: "#examples" },
    { label: "API", href: "#api" }
  ];

  return (
    <>
      <ContextNav
        scope="page"
        title="Grid Component"
        navLinks={pageNavLinks}
        topOffset={80}
      />
      
      {/* Page sections */}
      <section id="intro">...</section>
      <section id="installation">...</section>
    </>
  );
}
```

### Section-Level Navigation

Per-section navigation that sticks when section is in view:

```tsx
import { ContextNav, Section } from '@spexop/react';

function FeaturesSection() {
  return (
    <Section
      id="features"
      contextNav={
        <ContextNav
          scope="section"
          number="01"
          title="Key Features"
          navLinks={[
            { label: "12-Column Grid", href: "#12col" },
            { label: "Auto-Responsive", href: "#auto" },
            { label: "Named Areas", href: "#areas" }
          ]}
          topOffset={80}
        />
      }
    >
      <div id="12col">12-Column Grid content...</div>
      <div id="auto">Auto-Responsive content...</div>
      <div id="areas">Named Areas content...</div>
    </Section>
  );
}
```

### Stacked Navigation (Page + Section)

Use both modes together for multi-level navigation:

```tsx
import { ContextNav, Section } from '@spexop/react';

function ComplexPage() {
  const pageNav = [
    { label: "Overview", href: "#overview" },
    { label: "Features", href: "#features" },
    { label: "API", href: "#api" }
  ];

  const featuresNav = [
    { label: "Grid System", href: "#grid" },
    { label: "Spacing", href: "#spacing" },
    { label: "Breakpoints", href: "#breakpoints" }
  ];

  return (
    <>
      {/* Page-level nav at top */}
      <ContextNav
        scope="page"
        title="Grid Component"
        navLinks={pageNav}
        topOffset={80}
      />

      {/* Section-level nav stacks below */}
      <Section
        id="features"
        contextNav={
          <ContextNav
            scope="section"
            number="01"
            title="Features"
            navLinks={featuresNav}
            stackBelow="page"  // Auto-calculates offset
          />
        }
      >
        {/* Features content */}
      </Section>
    </>
  );
}
```

### Simple Section Indicator (No Navigation)

Use as section marker without navigation links:

```tsx
import { ContextNav, Section } from '@spexop/react';

function SimpleSection() {
  return (
    <Section
      id="about"
      contextNav={
        <ContextNav
          scope="section"
          number="02"
          title="About Us"
          topOffset={80}
        />
      }
    >
      {/* Section content */}
    </Section>
  );
}
```

## Features and Props

### Scope

The `scope` prop determines navigation behavior:

#### Page Scope

```tsx
<ContextNav
  scope="page"              // Sticky throughout entire page
  title="Documentation"
  navLinks={pageLinks}
  topOffset={80}
/>
```

**Behavior**:

- Sticks at top throughout entire page
- Visible on all screen sizes
- Mobile: Vertical expansion with toggle button
- Desktop: Horizontal expansion with cascading animations
- Z-index: 100 (above section navs)

#### Section Scope (Default)

```tsx
<ContextNav
  scope="section"           // Sticky when section in view
  number="01"
  title="Features"
  navLinks={sectionLinks}
  topOffset={80}
/>
```

**Behavior**:

- Sticks when parent section scrolls into view
- Hidden on mobile (< 1024px)
- Desktop: Horizontal expansion with cascading animations
- Z-index: 90 (below page nav)

### Stacking

Use `stackBelow` to automatically calculate offsets:

```tsx
<ContextNav
  scope="section"
  title="Features"
  navLinks={links}
  stackBelow="page"        // Adds 60px for page nav height
  topOffset={80}           // Base offset + 60px = 140px total
/>
```

**Values**:

- `"page"`: Adds 60px for page nav
- `"section"`: Adds 60px for another section nav
- `number`: Custom pixel value (e.g., `120`)

### Overflow Behavior

Handle many navigation items:

#### Extend (Default)

```tsx
<ContextNav
  navLinks={manyLinks}
  overflowBehavior="extend"  // Unlimited horizontal expansion
/>
```

#### Wrap

```tsx
<ContextNav
  navLinks={manyLinks}
  overflowBehavior="wrap"    // Wraps to multiple rows
  maxWidth="600px"           // Wraps at this width
/>
```

#### Scroll

```tsx
<ContextNav
  navLinks={manyLinks}
  overflowBehavior="scroll"  // Horizontal scroll
/>
```

### Variants

```tsx
{/* Light variant (default) */}
<ContextNav
  variant="light"
  title="Features"
  navLinks={links}
/>

{/* Dark variant */}
<ContextNav
  variant="dark"
  title="Features"
  navLinks={links}
/>
```

## Responsive Behavior

### Desktop (≥ 1024px)

**Page Nav**:

- Sticky at top throughout page
- Horizontal expansion when stuck
- Cascading link animations (0.1s delay between links)
- Max width: 800px
- Touch-friendly even on desktop

**Section Nav**:

- Sticky when parent section in view
- Horizontal expansion when stuck
- Cascading link animations
- Stacks below page nav if both present

### Mobile/Tablet (< 1024px)

**Page Nav**:

- Full-width sticky bar
- Toggle button to expand/collapse
- Vertical expansion (dropdown)
- 44px minimum tap targets
- Auto-closes after clicking link

**Section Nav**:

- Hidden on mobile (returns null)
- Page nav provides main navigation
- Keeps mobile UI simple

## Active Link Highlighting

ContextNav automatically highlights the currently active section:

```tsx
<ContextNav
  title="Documentation"
  navLinks={[
    { label: "Installation", href: "#installation" },
    { label: "Usage", href: "#usage" },
    { label: "API", href: "#api" }
  ]}
/>
```

**Features**:

- Scroll spy automatically detects which section is in view
- Active link gets primary color background and pulse animation
- Smooth transitions between active states
- Uses `aria-current="page"` for screen readers

## Accessibility

### Keyboard Navigation

All links are fully keyboard accessible:

- **Tab**: Focus navigation controls
- **Enter**: Activate focused link
- **Shift + Tab**: Navigate backwards

### Screen Readers

- Semantic HTML with proper anchor elements
- Number badge provides context
- Links have descriptive text
- `aria-expanded` on mobile toggle button
- `aria-current="page"` on active link

### Motion Preferences

Respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* All transitions disabled */
  /* Links appear instantly when stuck */
}
```

### Touch Targets

All interactive elements meet WCAG requirements:

- Mobile toggle button: 44px minimum
- Navigation links: 44px minimum height
- Adequate spacing between links

## Best Practices

### DO

- Use sequential numbering for sections (01, 02, 03)
- Limit navigation links to 4-6 items for best UX
- Use descriptive, concise link labels (2-3 words)
- Match variant to section background
- Set appropriate `topOffset` for your layout
- Test on real content with actual scroll distance
- Use `stackBelow` for automatic offset calculation

### DON'T

- Don't nest inside Container (use Section's `contextNav` prop)
- Don't use without testing mobile behavior
- Don't use too many navigation links (overwhelming)
- Don't forget to provide `topOffset`
- Don't use on very short sections (< 400px height)
- Don't use extremely long link labels

## Common Issues and Solutions

### Sticky Positioning Not Working

**Problem**: ContextNav doesn't stick to viewport

**Solution 1**: Ensure `topOffset` is provided

```tsx
{/* WRONG */}
<ContextNav title="Features" />

{/* CORRECT */}
<ContextNav title="Features" topOffset={80} />
```

**Solution 2**: Check parent containers for `overflow` properties

```css
/* WRONG - breaks sticky positioning */
.layout {
  overflow-x: hidden;
}

/* CORRECT - use max-width instead */
.layout {
  max-width: 100vw;
}
```

**Solution 3**: Ensure proper integration with Section

```tsx
{/* CORRECT */}
<Section
  contextNav={
    <ContextNav
      number="01"
      title="Features"
      topOffset={80}
    />
  }
>
  {/* Content */}
</Section>
```

### Navigation Not Appearing on Mobile

**Problem**: Page nav doesn't show on mobile

**Solution**: Ensure you're using `scope="page"` for mobile visibility

```tsx
{/* Section nav is hidden on mobile */}
<ContextNav scope="section" title="Features" />

{/* Page nav is visible on mobile */}
<ContextNav scope="page" title="Features" />
```

### Links Getting Cut Off

**Problem**: Too many links don't fit

**Solution**: Use `overflowBehavior` prop

```tsx
{/* Use wrap mode */}
<ContextNav
  navLinks={manyLinks}
  overflowBehavior="wrap"
  maxWidth="600px"
/>

{/* Or use scroll mode */}
<ContextNav
  navLinks={manyLinks}
  overflowBehavior="scroll"
/>
```

## Advanced Patterns

### Custom Stacking Offsets

```tsx
function CustomStack() {
  return (
    <>
      {/* First nav at 80px */}
      <ContextNav
        scope="section"
        title="Section 1"
        topOffset={80}
      />
      
      {/* Second nav stacks below first */}
      <ContextNav
        scope="section"
        title="Section 2"
        stackBelow={60}  // Custom height of first nav
        topOffset={80}   // Total: 140px
      />
    </>
  );
}
```

### Conditional Navigation

```tsx
function ConditionalNav({ hasSubsections }) {
  return (
    <Section
      contextNav={
        <ContextNav
          number="01"
          title="Features"
          navLinks={hasSubsections ? subsectionLinks : undefined}
          topOffset={80}
        />
      }
    >
      {/* Content */}
    </Section>
  );
}
```

### Dynamic Link Generation

```tsx
function DynamicNav({ features }) {
  const navLinks = features.map(feature => ({
    label: feature.name,
    href: `#${feature.id}`
  }));

  return (
    <ContextNav
      scope="page"
      title="Features"
      navLinks={navLinks}
      topOffset={80}
    />
  );
}
```

## Styling

### Theme Integration

ContextNav automatically uses theme tokens:

- Primary color: `var(--theme-primary)` for active states
- Border: `var(--theme-border)` → primary when stuck
- Text: `var(--theme-text)`
- Background: `var(--theme-surface)`
- Spacing: `var(--theme-spacing-*)`

### Custom Styling

Override with CSS custom properties:

```css
.custom-nav {
  --context-nav-max-width: 1000px;
  --context-nav-border-width: 3px;
}
```

## Performance

- Debounced scroll listener (12ms)
- GPU-accelerated transforms
- Efficient state updates
- Cleanup on unmount
- Intersection Observer for scroll spy

## Migration Notes

### From v1.0 to v2.0

**New Features** (Backward Compatible):

- `scope` prop (defaults to "section" for compatibility)
- `stackBelow` prop for auto-stacking
- `overflowBehavior` and `maxWidth` props
- Mobile support with toggle button
- Active link highlighting with scroll spy

**No Breaking Changes**: All v1.0 code continues to work.

## Related Components

- **Section**: Primary integration point via `contextNav` prop
- **StickySection**: Wrapper ensuring proper sticky behavior
- **TopBar**: Consider in `topOffset` calculations
- **Sidebar**: Complementary navigation component

## Examples

See the [README.md](./README.md) for comprehensive examples including:

- Documentation pages
- Marketing sections
- Dashboard layouts
- Multi-level navigation
- And more

## Support

For issues, questions, or feature requests:

1. Check this usage guide
2. Review the [README.md](./README.md)
3. Search existing GitHub issues
4. Create a new issue with reproduction

## Summary

ContextNav provides:

- Dual-mode navigation (page and section level)
- Full responsive support (desktop and mobile)
- Automatic scroll spy and active highlighting
- Flexible overflow handling
- Complete accessibility
- Theme integration
- Performance optimizations

Perfect for:

- Documentation pages
- Long-form content
- Multi-section layouts
- Marketing pages
- Dashboard sections

Built with Spexop design principles for a refined, accessible user experience.
