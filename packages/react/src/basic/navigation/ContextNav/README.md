# ContextNav Component

**Version**: 2.0.0  
**Status**: Production Ready  
**Category**: Navigation Primitive  
**Innovation**: Dual-Mode Responsive Navigation

Context-aware expandable navigation that serves as both a section indicator and contextual messaging. Supports both **page-level** and **section-level** navigation with responsive behavior across all screen sizes. On desktop, expands horizontally with cascading animations. On mobile, expands vertically with touch-friendly controls.

## What Makes It Unique

This is a **versatile UI pattern** that combines:

1. **Dual-mode support** (page-level OR section-level navigation)
2. **Scroll-triggered expansion** (not hover or click)
3. **Responsive layouts** (horizontal on desktop, vertical on mobile)
4. **Staggered cascade animation** (links appear one by one on desktop)
5. **Color state indication** (neutral → red when active)
6. **Auto-stacking** (multiple navs stack properly)
7. **Context-aware behavior** (expands based on scroll position)

## Features

- ✅ **Dual-mode support** (page-level and section-level)
- ✅ **Responsive** (all screen sizes: mobile, tablet, desktop)
- ✅ **Auto-stacking** (multiple navs stack properly)
- ✅ **Desktop**: Horizontal expansion with cascading animations
- ✅ **Mobile**: Vertical expansion with toggle button
- ✅ **Touch-friendly** (44px minimum tap targets on mobile)
- ✅ **Active section highlighting** (scroll spy with visual feedback)
- ✅ **Color state indication** (neutral → primary when active)
- ✅ **Smooth animations** (hover effects, transitions, pulse)
- ✅ **Light and dark variants**
- ✅ **Keyboard navigation support**
- ✅ **Reduced motion support**
- ✅ **Auto-close on mobile** (closes after clicking link)

## Installation

```tsx
import { ContextNav } from '@spexop/react';
import type { ContextNavLink } from '@spexop/react';
```

## Basic Usage

### Page-Level Navigation (New in v2.0)

Single navigation for entire page - sticks at top throughout scroll:

```tsx
<ContextNav
  scope="page"
  title="Grid Component"
  navLinks={[
    { label: "Quick Start", href: "#quick-start" },
    { label: "Features", href: "#features" },
    { label: "Props", href: "#props" },
    { label: "Examples", href: "#examples" },
  ]}
  topOffset={80}
/>
```

### Section-Level Navigation (Default)

Per-section navigation - sticks when section is in view:

```tsx
<Section
  id="features"
  contextNav={
    <ContextNav
      scope="section"
      number="01"
      title="Key Features"
      navLinks={[
        { label: "12-Column", href: "#12col" },
        { label: "Auto-Responsive", href: "#auto" },
        { label: "Named Areas", href: "#areas" },
      ]}
      topOffset={80}
    />
  }
>
  {/* Section content */}
</Section>
```

### Both Page + Section (Stacking)

Use both modes together for multi-level navigation:

```tsx
{/* Page-level nav at top */}
<ContextNav
  scope="page"
  title="Grid Component"
  navLinks={allPageSections}
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
      navLinks={featureSubsections}
      stackBelow="page"  // Auto-calculates offset
    />
  }
>
  {/* Content */}
</Section>
```

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `number` | `string` | - | Section number badge (e.g., "01", "02") |
| `title` | `string` | - | **Required**. Section title/label |
| `navLinks` | `ContextNavLink[]` | - | Navigation links (enables expansion) |
| `topOffset` | `number` | `80` | Top position when sticky (in pixels) |
| `variant` | `"light" \| "dark"` | `"light"` | Visual style variant |
| `className` | `string` | - | Additional CSS class |
| `id` | `string` | - | HTML id for anchor links |
| `scope` | `"section" \| "page"` | `"section"` | **New in v2.0**. Navigation scope and behavior |
| `stackBelow` | `"page" \| "section" \| number` | - | **New in v2.0**. Auto-stacking offset calculation |
| `overflowBehavior` | `"extend" \| "wrap" \| "scroll"` | `"extend"` | **New in v2.0**. How to handle many navigation items |
| `maxWidth` | `string \| number` | `"800px"` | **New in v2.0**. Maximum width before wrapping (wrap mode only) |

**Note on `id` prop**: The ContextNav component is excluded from Biome's `useUniqueElementIds` rule because it's designed to accept static IDs for navigation and deep linking purposes. This is intentional and safe for this component.

### ContextNavLink Interface

```tsx
interface ContextNavLink {
  label: string;  // Link text
  href: string;   // Target anchor (e.g., "#primitives")
}
```

### Scope Prop Explained

#### `scope="section"` (Default)

- **Purpose**: Section indicator and sub-navigation
- **Sticky Behavior**: Sticks when parent section scrolls into view
- **Placement**: One per section via Section's `contextNav` prop
- **Desktop**: Horizontal expansion with cascading animations
- **Mobile**: Hidden (page nav provides main navigation)
- **Use Case**: Detailed sections with subsections

#### `scope="page"` (New in v2.0)

- **Purpose**: Page-wide navigation
- **Sticky Behavior**: Sticks when page scrolls (stays throughout)
- **Placement**: One per page, placed before first section
- **Desktop**: Horizontal expansion with cascading animations
- **Mobile**: Vertical expansion with toggle button
- **Use Case**: Main page section navigation

### StackBelow Prop Explained

Automatically calculates top offset when stacking multiple navs:

```tsx
// Without stackBelow - manual calculation
<ContextNav scope="section" topOffset={140} />  // 80px + 60px

// With stackBelow - automatic calculation
<ContextNav scope="section" stackBelow="page" topOffset={80} />
// Component automatically adds 60px for page nav height
```

**Values**:

- `"page"`: Adds 60px (page nav height)
- `"section"`: Adds 60px (section nav height)
- `number`: Adds custom pixel value

### OverflowBehavior Prop Explained

When you have many navigation items, choose how to handle the overflow:

#### `overflowBehavior="extend"` (Default)

- **Behavior**: Unlimited horizontal expansion
- **Use Case**: When you want the nav to grow as wide as needed
- **Visual**: Single row, items may extend beyond viewport
- **Best For**: Few navigation items or wide screens

```tsx
<ContextNav
  title="Grid Component"
  navLinks={manyLinks}
  overflowBehavior="extend"  // Default - grows horizontally
/>
```

#### `overflowBehavior="wrap"`

- **Behavior**: Wraps to multiple rows when maxWidth is reached
- **Use Case**: When you want to keep items visible in a constrained space
- **Visual**: Multiple rows of smaller items
- **Best For**: Many items, constrained width, or mobile-first design

```tsx
<ContextNav
  title="Grid Component"
  navLinks={manyLinks}
  overflowBehavior="wrap"
  maxWidth="600px"  // Wraps when this width is reached
/>
```

#### `overflowBehavior="scroll"`

- **Behavior**: Horizontal scroll when content overflows
- **Use Case**: When you want to keep single row but handle overflow gracefully
- **Visual**: Single row with horizontal scrollbar
- **Best For**: Many items, single row preferred, touch devices

```tsx
<ContextNav
  title="Grid Component"
  navLinks={manyLinks}
  overflowBehavior="scroll"  // Horizontal scroll when needed
/>
```

### Active Section Highlighting

ContextNav automatically highlights the currently active section as you scroll:

```tsx
<ContextNav
  scope="page"
  title="Grid Component"
  navLinks={[
    { label: "Quick Start", href: "#quick-start" },
    { label: "Features", href: "#features" },
    { label: "Props", href: "#props" },
    { label: "Examples", href: "#examples" },
  ]}
/>
```

**Features**:

- ✅ **Scroll Spy**: Automatically detects which section is in view
- ✅ **Visual Feedback**: Active link gets primary color background
- ✅ **Smooth Transitions**: Animated state changes
- ✅ **Accessibility**: Uses `aria-current="page"` for screen readers
- ✅ **Pulse Animation**: Subtle pulse effect on active link

## Usage with Section Component

### Critical: Use `contextNav` Prop

ContextNav **MUST** be a direct child of the section element for sticky positioning to work. When using with Section component, pass it via the `contextNav` prop:

```tsx
{/* ✅ CORRECT - Direct child */}
<Section
  variant="white"
  label="FEATURES"
  title="Core Features"
  contextNav={
    <ContextNav
      number="01"
      title="Features"
      navLinks={[
        { label: "Primitives", href: "#primitives" },
        { label: "Tokens", href: "#tokens" },
      ]}
      topOffset={80}
    />
  }
>
  {/* Content */}
</Section>

{/* ❌ WRONG - Gets wrapped in Container, sticky breaks */}
<Section>
  <ContextNav number="01" title="Features" />
  {/* Content */}
</Section>
```

## Animation Sequence

When the element becomes sticky:

| Time | Event | Duration | Delay |
|------|-------|----------|-------|
| 0.0s | Border: gray → red | 0.4s | 0s |
| 0.0s | Number: gray → red | 0.4s | 0s |
| 0.1s | Divider scales in vertically | 0.3s | 0.1s |
| 0.1s | Container expands horizontally (0 → 600px) | 0.5s | 0.1s |
| 0.25s | First nav link appears | 0.35s | 0.25s |
| 0.35s | Second nav link appears | 0.35s | 0.35s |
| 0.45s | Third nav link appears | 0.35s | 0.45s |
| 0.55s | Fourth nav link appears | 0.35s | 0.55s |

**Total Duration**: ~0.8s for complete expansion

### Easing Curves

- Main expansion: `cubic-bezier(0.4, 0, 0.2, 1)` - Smooth, natural
- Link cascade: `cubic-bezier(0.34, 1.56, 0.64, 1)` - Gentle bounce

## Behavior

### Closed State (Default)

- Compact badge with number + title
- Border: neutral-200
- Number: neutral-400
- Navigation: Hidden (max-width: 0, opacity: 0)

### Stuck State (When Sticky)

- Expanded width to show navigation
- Border: red-500
- Number: red-500
- Navigation: Visible with cascade animation
- Links: Fully interactive

### Unstuck (Scroll Away)

- Smoothly collapses back to closed state
- All animations reverse
- Returns to neutral colors

## Top Offset

The `topOffset` prop controls where the element sticks:

```tsx
{/* Stick at 80px from top (default - below TopBar) */}
<ContextNav topOffset={80} title="Section 1" />

{/* Stack multiple ContextNavs */}
<ContextNav topOffset={80} title="Section 1" />
<ContextNav topOffset={150} title="Section 2" />
<ContextNav topOffset={220} title="Section 3" />
```

**Common Values**:

- `80px` - Below TopBar (64px) with spacing
- `150px` - Stack second ContextNav
- `220px` - Stack third ContextNav

## Sticky Detection Logic

The component uses scroll detection to determine when it's stuck:

```tsx
const isStuck = 
  rect.top <= topOffset + 1 &&      // At top offset
  rect.top >= topOffset - 1 &&      // (with 1px tolerance)
  parentRect.top < 0;               // Parent section is scrolling
```

**Why this works**:

- Checks element position relative to viewport
- Confirms parent section is in view
- Only activates when truly stuck (not just near top)

## Responsive Behavior (v2.0)

### Desktop (≥ 1024px)

#### Page-Level Nav (`scope="page"`)

- Sticky at top throughout entire page
- Horizontal expansion when stuck
- Cascading link animations
- Max width: 800px
- Z-index: 100

#### Section-Level Nav (`scope="section"`)

- Sticky when parent section in view
- Horizontal expansion when stuck
- Cascading link animations
- Max width: 800px
- Z-index: 90 (below page nav)

### Mobile/Tablet (< 1024px)

#### Page-Level Nav (`scope="page"`) (New in v2.0)

- ✅ **Fully functional** on mobile
- Full-width sticky bar
- **Toggle button** to expand/collapse
- **Vertical expansion** (dropdown from bottom)
- Touch-friendly 44px tap targets
- Auto-closes after clicking link
- Pushes content down when expanded

#### Section-Level Nav (`scope="section"`) (New in v2.0)

- ❌ **Hidden on mobile** (returns null)
- Page-level nav provides main navigation
- Keeps mobile UI simple and focused
- Desktop-only feature for detailed navigation

## Accessibility

### Keyboard Navigation

- All links fully keyboard accessible (Tab key)
- Standard anchor link behavior
- No JavaScript interaction required

### Screen Readers

- Semantic HTML with proper anchor elements
- Number badge provides context
- Links have descriptive text

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  /* All transitions disabled */
  /* Links appear instantly when stuck */
}
```

### Color Contrast

- WCAG AA compliant color ratios
- High contrast in both light and dark modes
- Clear focus states

## Use Cases

### Ideal For

1. **Long-form Content Pages**
   - Documentation with multiple sections
   - Blog articles with table of contents
   - Product feature pages

2. **Multi-section Dashboards**
   - Analytics sections with sub-metrics
   - Admin panels with categories
   - Settings pages with groups

3. **Marketing Landing Pages**
   - Feature showcases with details
   - Service offerings with specs
   - Product comparisons

4. **Portfolio Sites**
   - Project sections with highlights
   - Team member listings
   - Case study sections

### Not Ideal For

- ❌ Single-section pages (no scroll benefit)
- ❌ Mobile-first experiences (limited screen space)
- ❌ High-density layouts (too much motion)
- ❌ Short sections (not enough scroll distance)

## Best Practices

### Do ✅

- Use sequential numbering (01, 02, 03, etc.)
- Limit navigation links to 4-6 items max
- Use descriptive, concise link labels
- Match variant to section background (light/dark)
- Set appropriate `topOffset` for your layout
- Test on real content with actual scroll distance

### Don't ❌

- Don't nest inside Container (use Section's `contextNav` prop)
- Don't use without navigation on every section (mix simple and nav variants)
- Don't use too many navigation links (overwhelming)
- Don't forget mobile considerations
- Don't use on short sections (< 400px height)

## Styling

### Default Colors

**Light Variant**:

- Background: `white`
- Border: `neutral-200` → `red-500` (when stuck)
- Number: `neutral-400` → `red-500` (when stuck)
- Nav links: `neutral-100` background

**Dark Variant**:

- Background: `neutral-900`
- Border: `neutral-800` → `red-500` (when stuck)
- Number: `neutral-600` → `red-500` (when stuck)
- Nav links: `neutral-800` background

### Customization

ContextNav inherits primary color from CSS custom properties:

- `--primary-color` - Used for stuck state border and number
- `--primary-hover` - Used for accent gradients

Change palette at the page level to affect ContextNav colors.

## Performance

- ✅ Scroll listener with debounce (10ms)
- ✅ GPU-accelerated transforms (translateX, scale)
- ✅ No layout thrashing
- ✅ Cleanup on unmount
- ✅ Efficient state updates

## Examples

### Documentation Page

```tsx
<Section
  id="getting-started"
  contextNav={
    <ContextNav
      number="01"
      title="Getting Started"
      navLinks={[
        { label: "Installation", href: "#installation" },
        { label: "Setup", href: "#setup" },
        { label: "First Component", href: "#first-component" },
      ]}
    />
  }
>
  {/* Documentation content */}
</Section>
```

### Marketing Messages

ContextNav can display full-length marketing messages without truncation:

```tsx
<Section
  id="philosophy"
  contextNav={
    <ContextNav
      number="01"
      title="Our Approach"
      navLinks={[
        { 
          label: "Fundamentals over flashy features", 
          href: "#philosophy" 
        },
      ]}
    />
  }
>
  {/* Philosophy content */}
</Section>
```

**Note**: Marketing messages display in full without ellipsis truncation, while navigation links maintain their original behavior.

### Dashboard Section

```tsx
<Section
  id="analytics"
  variant="neutral"
  contextNav={
    <ContextNav
      number="02"
      title="Analytics"
      navLinks={[
        { label: "Overview", href: "#overview" },
        { label: "Users", href: "#users" },
        { label: "Revenue", href: "#revenue" },
        { label: "Performance", href: "#performance" },
      ]}
    />
  }
>
  {/* Dashboard content */}
</Section>
```

### Marketing Page

```tsx
<Section
  id="features"
  variant="gradient"
  contextNav={
    <ContextNav
      number="01"
      title="Features"
      navLinks={[
        { label: "Fast", href: "#fast" },
        { label: "Secure", href: "#secure" },
        { label: "Scalable", href: "#scalable" },
      ]}
    />
  }
>
  {/* Feature cards */}
</Section>
```

## File Structure

```bash
ContextNav/
├── ContextNav.tsx        # Component logic with scroll detection
├── ContextNav.module.css # Scoped styles with animations
├── ContextNav.types.ts   # TypeScript types
├── index.ts              # Exports
└── README.md            # This file
```

## Related Components

- **Section** - Use `contextNav` prop to integrate
- **TopBar** - Consider `topOffset` to account for TopBar height
- **Sidebar** - ContextNav works alongside Sidebar navigation
- **NavLink** - Similar navigation component for sidebars
- **NavSection** - Accordion navigation for sidebars

## Testing

See `/test/section` route for live examples demonstrating:

- All 9 sections with different ContextNav configurations
- Various numbers of navigation links (2-6)
- With and without navigation
- Sticky behavior and animation timing
- Dark mode support

## Common Issues and Solutions

### Sticky Positioning Not Working

If ContextNav is not sticking to the viewport, check these common issues:

**1. Missing `topOffset` prop**

```tsx
// ❌ WRONG - Sticky won't work without topOffset
<ContextNav number="01" title="Navigation" />

// ✅ CORRECT - Always provide topOffset
<ContextNav number="01" title="Navigation" topOffset={80} />
```

**2. Parent container has `overflow` property**

```css
/* ❌ WRONG - overflow-x breaks sticky positioning */
.layout {
  overflow-x: hidden; /* Creates new containing block */
}

/* ✅ CORRECT - Remove overflow properties */
.layout {
  /* No overflow property */
  width: 100%;
  max-width: 100vw; /* Use max-width instead for horizontal constraints */
}
```

###  **3. Parent container uses flex layout**

```css
/* ⚠️ CAUTION - Flex can interfere with sticky positioning */
.page {
  display: flex;
  flex-direction: column;
  gap: 40px; /* flex gap can cause issues */
}

/* ✅ BETTER - Use block layout with margins */
.page {
  /* No flex layout */
}
.section {
  margin-bottom: 40px; /* Use margins on children instead */
}
```

### **4. Section component integration**

```tsx
// ✅ CORRECT - ContextNav renders as direct child of section
<Section
  contextNav={
    <ContextNav number="01" title="Features" topOffset={80} />
  }
>
  {/* Content */}
</Section>
```

### **5. Navigation link length considerations**

```tsx
// ❌ AVOID - Very long navigation labels
<ContextNav
  navLinks={[
    { label: "Very Long Navigation Label That Might Get Cut Off", href: "#link1" },
    { label: "Another Extremely Long Navigation Label", href: "#link2" }
  ]}
/>

// ✅ BETTER - Concise navigation labels
<ContextNav
  navLinks={[
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Support", href: "#support" }
  ]}
/>
```

### Key Technical Details

- **`overflow-x: hidden`** creates a new containing block that breaks `position: sticky`
- **`topOffset`** must account for fixed headers (e.g., TopBar height + spacing)
- Sticky positioning requires a scrollable ancestor (not the element itself)
- Section component must have sufficient height for sticky behavior to trigger

### Debugging Checklist

1. ✅ Is `topOffset` prop provided?
2. ✅ Do parent containers have `overflow: hidden` or `overflow-x: hidden`?
3. ✅ Is the section tall enough for sticky behavior?
4. ✅ Are there conflicting CSS transforms or perspective on parents?
5. ✅ Is the scroll detection logic working? (Check browser console)

## Version History

### 2.0.0 (2025-10-16)

**Major Enhancement**: Dual-mode navigation with mobile support and overflow handling

- ✨ **NEW**: `scope` prop ("section" | "page") for dual-mode navigation
- ✨ **NEW**: `stackBelow` prop for automatic offset calculation
- ✨ **NEW**: `overflowBehavior` prop ("extend" | "wrap" | "scroll") for handling many nav items
- ✨ **NEW**: `maxWidth` prop for controlling wrap behavior
- ✨ **NEW**: Mobile/tablet support with vertical expansion
- ✨ **NEW**: Toggle button for mobile navigation
- 🔧 **CHANGED**: Component now renders on all screen sizes
- 🔧 **CHANGED**: Section nav hidden on mobile (page nav only)
- 📱 **ENHANCED**: Touch-friendly 44px tap targets on mobile
- 🎨 **ENHANCED**: Auto-close on mobile link click
- 🎨 **ENHANCED**: Wrap mode prevents cut-off with many navigation items
- ✨ **NEW**: Active section highlighting with scroll spy
- ✨ **NEW**: Smooth hover animations and transitions
- ✨ **NEW**: Pulse animation for active links
- 🎨 **ENHANCED**: Better alignment next to sidebar
- 🎨 **ENHANCED**: Improved visual hierarchy and shadows
- 📚 **ENHANCED**: Comprehensive documentation updates

**Breaking Changes**: None - fully backward compatible

### 1.0.0 (2025-10-14)

- Initial release
- Ported from homepage-prototype.html
- Added TypeScript types
- Added React hooks for scroll detection
- Added dark variant
- Desktop-only implementation
- Added reduced motion support
