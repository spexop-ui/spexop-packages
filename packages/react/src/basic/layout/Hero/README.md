# Hero Component

A reusable, animated Hero component that serves as a prominent entry point for landing pages. Features multiple layout variants, modern UI/UX elements, smooth animations, and sophisticated visual effects following Spexop principles.

## Features

- ✅ **9 Layout Variants**: centered-compact, centered-spacious, split, minimal, full-bleed, modern, elegant, feature-showcase, title
- ✅ **Universal Media Backgrounds**: All variants support photo/video backgrounds
- ✅ **Content Overlay Positioning**: Top, center, or bottom positioning for split/full-bleed variants
- ✅ **Smooth Animations**: FadeIn, ScaleUp, Stagger with reduced motion support
- ✅ **Modern UI Elements**: Accent bars, parallax effects, glassmorphism, interactive stats
- ✅ **Feature Showcase**: Grid-based feature cards with icons and hover effects
- ✅ **WCAG AA+ Compliant**: Full accessibility with semantic HTML and ARIA
- ✅ **Responsive Design**: Optimized for mobile, tablet, and desktop
- ✅ **Enhanced Typography**: Clear hierarchy with design tokens
- ✅ **Title Size Control**: Flexible title scaling with multiplier prop
- ✅ **Overlay Intensity**: Adjustable media overlay opacity (0-1)
- ✅ **Spexop Button Integration**: Uses proper Button variants with custom Hero styling
- ✅ **Type-Safe**: Comprehensive TypeScript support
- ✅ **Flexible Content**: Eyebrow, title, subtitle, description, actions, stats, features

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Hero } from '@spexop/react';

function App() {
  return (
    <Hero
      variant="centered-spacious"
      title="Build Faster with Spexop"
      subtitle="Modern design system for React"
      description="Production-ready components with 245+ design tokens"
      primaryAction={{
        label: "Get Started",
        onClick: () => navigate('/docs')
      }}
    />
  );
}
```

## Layout Variants

### Centered Spacious (Default)

Perfect for landing pages with generous spacing and breathing room.

```tsx
<Hero
  variant="centered-spacious"
  eyebrow={<Badge variant="info">New Release</Badge>}
  title="Welcome to Spexop"
  subtitle="Build beautiful interfaces"
  description="A comprehensive design system for modern React applications"
  primaryAction={{
    label: "Get Started",
    onClick: handleGetStarted
  }}
  secondaryAction={{
    label: "View Docs",
    onClick: handleViewDocs
  }}
  stats={[
    { value: "60+", label: "Components" },
    { value: "245+", label: "Tokens" },
  ]}
/>
```

Features:

- Generous spacing (70vh min-height)
- 2px accent bar under title
- Enhanced eyebrow with 2px border
- Interactive stats with hover effects
- Center-aligned content

### Centered Compact

Minimal spacing variant for secondary pages or contained sections.

```tsx
<Hero
  variant="centered-compact"
  title="Get Started"
  subtitle="Quick start guide"
  description="Everything you need to begin building with Spexop"
  primaryAction={{
    label: "View Docs",
    onClick: handleDocs
  }}
/>
```

Features:

- Compact spacing (50vh min-height)
- Smaller title sizing
- Tighter gaps between elements
- Perfect for internal pages

### Modern (Enhanced)

Contemporary design with parallax effects and dynamic depth.

```tsx
<Hero
  variant="modern"
  eyebrow="Introducing v2.0"
  title="Build the Future Today"
  subtitle="Modern design system for ambitious teams"
  description="Create stunning, accessible interfaces..."
  backgroundMedia={{
    type: "video",
    src: "/bg-video.mp4",
    overlay: true
  }}
  overlayIntensity={0.4}
  primaryAction={{ label: "Start Building", onClick: handleStart }}
/>
```

Features:

- Animated gradient background with depth
- Shimmering top accent line
- Pulsing radial gradient effect (parallax-style)
- Supports background media with overlay
- Center-aligned content
- Modern and dynamic appearance

### Elegant (Enhanced with Video Support)

Professional design with glassmorphism and video background support.

```tsx
<Hero
  variant="elegant"
  eyebrow="Enterprise Ready"
  title="Premium Design System"
  subtitle="Built for scale, designed for excellence"
  description="Trusted by leading companies worldwide..."
  backgroundMedia={{
    type: "video",
    src: "/corporate-bg.mp4",
    overlay: true
  }}
  overlayIntensity={0.6}
  primaryAction={{ label: "Request Demo", onClick: handleDemo }}
/>
```

Features:

- Full video background support
- Glassmorphism content card (backdrop blur)
- 200px gradient accent bar at bottom
- 3px strong bottom border
- Enhanced typography with perfect spacing
- Professional and premium appearance

### Split (Enhanced with Content Overlay)

Full-width video or image with content overlay. Supports adjustable positioning.

```tsx
<Hero
  variant="split"
  contentPosition="center"  // "top" | "center" | "bottom"
  title="Design System Excellence"
  subtitle="Build faster with confidence"
  description="60+ production-ready components with modern UI/UX"
  media={{
    type: "video",
    src: "/hero-video.mp4",
    autoplay: true,
    overlay: true
  }}
  overlayIntensity={0.5}
  primaryAction={{
    label: "Explore Components",
    onClick: handleExplore
  }}
/>
```

Features:

- Full-screen media background
- Content overlay with positioning control
- Adjustable overlay intensity
- Video fills entire viewport
- Responsive mobile behavior

### Minimal

Simplified single-column layout with reduced spacing.

```tsx
<Hero
  variant="minimal"
  eyebrow={<Badge variant="info">New Release</Badge>}
  title="Version 2.0 is Here"
  description="Introducing enhanced animations and 15 new components"
  primaryAction={{
    label: "Read Announcement",
    onClick: handleReadMore
  }}
/>
```

### Title (New - Compact Documentation Header)

Ultra-compact variant (20-30vh) perfect for documentation pages. Supports only title and subtitle with optional background media.

```tsx
<Hero
  variant="title"
  title="Component API"
  subtitle="Complete reference for all props and methods"
  backgroundMedia={{
    type: "image",
    src: "/docs-bg.jpg",
    overlay: true
  }}
  overlayIntensity={0.3}
/>

// Or with simple eyebrow
<Hero
  variant="title"
  eyebrow="Documentation"
  title="Getting Started"
  subtitle="Everything you need to begin building with Spexop"
/>
```

Features:

- Compact height (25vh default, 20vh mobile)
- Center-aligned title and subtitle only
- No actions, stats, or description displayed
- Supports background media with overlay
- Perfect for documentation section headers
- Clean and minimal design
- Responsive typography scaling

### Full-Bleed

Full-width hero with background media and overlay content.

```tsx
<Hero
  variant="full-bleed"
  contentPosition="center"
  title="Immersive Experiences"
  subtitle="Build stunning landing pages"
  media={{
    type: "video",
    src: "/background-video.mp4",
    autoplay: true,
    overlay: true
  }}
  overlayIntensity={0.7}
  background="transparent"
  primaryAction={{
    label: "Watch Demo",
    onClick: handleDemo
  }}
/>
```

### Feature Showcase (New)

Grid-based feature display with icons and interactive cards.

```tsx
import { Zap, Shield, Cpu, Layers } from '@spexop/icons';

<Hero
  variant="feature-showcase"
  title="Why Choose Spexop"
  subtitle="Built for developers, designed for users"
  description="Everything you need to build modern applications"
  features={[
    {
      icon: <Zap />,
      title: "Lightning Fast",
      description: "Optimized for performance with minimal bundle size"
    },
    {
      icon: <Shield />,
      title: "Secure by Default",
      description: "Built-in security best practices and WCAG AA+ compliance"
    },
    {
      icon: <Cpu />,
      title: "Developer Experience",
      description: "Type-safe APIs with comprehensive TypeScript support"
    },
    {
      icon: <Layers />,
      title: "Composable",
      description: "Primitives-first approach for maximum flexibility"
    }
  ]}
  primaryAction={{
    label: "Get Started",
    onClick: handleStart
  }}
/>
```

Features:

- Responsive grid layout (auto-fit, 280px min)
- Interactive hover effects with accent bars
- Icon containers with primary brand colors
- 2px borders following Spexop principles
- Smooth animations with Stagger support
- Perfect for feature pages or benefits sections

## Universal Background Media

All variants now support background media through the `backgroundMedia` prop:

```tsx
<Hero
  variant="centered-spacious"
  backgroundMedia={{
    type: "video",
    src: "/subtle-bg.mp4",
    overlay: true
  }}
  overlayIntensity={0.3}
  title="Your Title Here"
  subtitle="With video background"
/>
```

## With Statistics

Display key metrics alongside your hero content with modern interactive cards.

```tsx
<Hero
  variant="centered-spacious"
  title="Trusted by Developers"
  subtitle="Building the future of design systems"
  stats={[
    { value: "245+", label: "Design Tokens" },
    { value: "60+", label: "Components" },
    { value: "100%", label: "TypeScript" },
    { value: "10K+", label: "Downloads" }
  ]}
  primaryAction={{
    label: "Get Started",
    onClick: handleStart
  }}
/>
```

**Enhanced Features (v0.3.2):**

- Interactive hover effects (top accent bar slides in, card lifts up)
- 2px borders (following "Borders before shadows")
- Vertical layout for better mobile experience
- Primary color on hover for visual feedback

## Animation Configuration

Control animation behavior with fine-grained settings.

```tsx
<Hero
  variant="centered-spacious"
  title="Animated Hero"
  animation={{
    sequence: 'sequential',     // or 'simultaneous'
    staggerDelay: 150,          // milliseconds between animations
    entranceDelay: 200,         // initial delay before first animation
    disabled: false             // disable all animations
  }}
  primaryAction={{
    label: "Learn More",
    onClick: handleLearn
  }}
/>
```

### Animation Sequences

- **`sequential`** (default): Elements animate one after another with stagger delay
- **`simultaneous`**: All elements animate at once with slight variations

The component automatically respects the user's `prefers-reduced-motion` preference.

## Background Variants

Control the hero's background styling:

```tsx
// Default background
<Hero background="default" title="Hero Title" />

// Elevated with glass effect
<Hero background="elevated" title="Hero Title" />

// Gradient background
<Hero background="gradient" title="Hero Title" />

// Transparent (useful with media)
<Hero background="transparent" title="Hero Title" />
```

## Content Alignment

Align content to the left, center, or right:

```tsx
<Hero
  align="left"
  title="Left-aligned Hero"
  description="Content aligned to the left side"
/>

<Hero
  align="center"
  title="Center-aligned Hero"
  description="Content centered (default)"
/>

<Hero
  align="right"
  title="Right-aligned Hero"
  description="Content aligned to the right side"
/>
```

## Media Support

### Images

```tsx
<Hero
  variant="split"
  title="Hero with Image"
  media={{
    type: "image",
    src: "/hero-image.jpg",
    alt: "Product showcase"
  }}
/>
```

### Videos with Autoplay

```tsx
<Hero
  variant="full-bleed"
  title="Hero with Video"
  media={{
    type: "video",
    src: "/background-video.mp4",
    autoplay: true,
    overlay: true  // Adds dark overlay for better text contrast
  }}
  background="transparent"
/>
```

Video automatically pauses when out of viewport to improve performance.

## Title Size Control

Control the size of the hero title using the `titleSize` prop. This prop accepts a multiplier value that scales the base clamp values.

```tsx
// Small title (50% of default)
<Hero
  title="Compact Hero Title"
  titleSize={0.5}
  description="Perfect for secondary pages"
/>

// Default title
<Hero
  title="Standard Hero Title"
  titleSize={1}
  description="Default size (can be omitted)"
/>

// Large title (150% of default)
<Hero
  title="Bold Hero Title"
  titleSize={1.5}
  description="Great for emphasis"
/>

// Extra large title (200% of default)
<Hero
  title="Massive Hero Title"
  titleSize={2}
  description="Maximum impact"
/>
```

The base title sizing uses responsive clamp values that scale automatically across breakpoints.

## Overlay Intensity Control

When using background media with an overlay, control the opacity of the overlay using the `overlayIntensity` prop. This accepts a value between 0 (transparent) and 1 (fully opaque).

```tsx
// Light overlay (30% opacity)
<Hero
  variant="full-bleed"
  title="Subtle Overlay"
  media={{
    type: "video",
    src: "/background.mp4",
    autoplay: true,
    overlay: true
  }}
  overlayIntensity={0.3}
/>

// Medium overlay (50% opacity)
<Hero
  variant="full-bleed"
  title="Balanced Overlay"
  media={{
    type: "image",
    src: "/background.jpg",
    overlay: true
  }}
  overlayIntensity={0.5}
/>

// Heavy overlay (80% opacity)
<Hero
  variant="full-bleed"
  title="Dark Overlay"
  media={{
    type: "video",
    src: "/background.mp4",
    autoplay: true,
    overlay: true
  }}
  overlayIntensity={0.8}
/>

// Full opacity overlay
<Hero
  variant="full-bleed"
  title="Maximum Contrast"
  media={{
    type: "image",
    src: "/background.jpg",
    overlay: true
  }}
  overlayIntensity={1}
/>
```

Note: The `overlayIntensity` prop only takes effect when `media.overlay` is set to `true`.

## With Icons

Add icons to action buttons for better visual hierarchy:

```tsx
import { ArrowRight, Github } from '@spexop/icons';

<Hero
  title="Get Started Today"
  primaryAction={{
    label: "Start Building",
    onClick: handleStart,
    iconRight: <ArrowRight size={20} />
  }}
  secondaryAction={{
    label: "View Source",
    onClick: handleGithub,
    iconLeft: <Github size={20} />
  }}
/>
```

## Accessibility

The Hero component is built with accessibility in mind:

- **Semantic HTML**: Uses proper heading levels (h1 or h2)
- **ARIA Labels**: Supports custom ARIA labels for sections and buttons
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Reduced Motion**: Automatically respects `prefers-reduced-motion`
- **Screen Readers**: Proper announcements for animated content
- **Color Contrast**: Meets WCAG 2.1 Level AA standards

```tsx
<Hero
  title="Accessible Hero"
  titleLevel={1}           // Use h1 for main page hero
  ariaLabel="Main hero section"
  primaryAction={{
    label: "Get Started",
    onClick: handleClick,
    ariaLabel: "Get started with Spexop design system"
  }}
/>
```

## Props API

### HeroProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"centered-compact" \| "centered-spacious" \| "split" \| "minimal" \| "full-bleed" \| "modern" \| "elegant" \| "feature-showcase" \| "title"` | `"centered-spacious"` | Layout variant |
| `title` | `string` | Required | Main title text |
| `subtitle` | `string` | - | Subtitle text |
| `description` | `string` | - | Description/body text |
| `eyebrow` | `ReactNode` | - | Badge/tag above title |
| `primaryAction` | `ButtonConfig` | - | Primary CTA button |
| `secondaryAction` | `ButtonConfig` | - | Secondary CTA button |
| `stats` | `HeroStat[]` | - | Statistics/metrics |
| `features` | `HeroFeature[]` | - | Features for feature-showcase variant |
| `media` | `HeroMedia` | - | Variant-specific media |
| `backgroundMedia` | `HeroMedia` | - | Universal background media (all variants) |
| `background` | `"default" \| "elevated" \| "gradient" \| "transparent"` | `"default"` | Background style |
| `align` | `"left" \| "center" \| "right"` | `"center"` | Content alignment |
| `contentPosition` | `"top" \| "center" \| "bottom"` | `"center"` | Content position for overlay variants |
| `animation` | `HeroAnimationConfig` | - | Animation configuration |
| `backgroundPattern` | `HeroBackgroundPattern` | - | Animated background pattern |
| `titleLevel` | `1 \| 2` | `1` | Heading level |
| `titleSize` | `number` | `1` | Title size scale multiplier |
| `overlayIntensity` | `number` | - | Media overlay opacity (0-1) |
| `ariaLabel` | `string` | - | ARIA label |
| `className` | `string` | - | Additional CSS class |
| `style` | `React.CSSProperties` | - | Inline styles |

### ButtonConfig

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Button text |
| `onClick` | `() => void` | Click handler |
| `iconLeft` | `ReactNode` | Icon before label |
| `iconRight` | `ReactNode` | Icon after label |
| `variant` | `ButtonColor` | Button variant |
| `ariaLabel` | `string` | Accessibility label |

### HeroMedia

| Prop | Type | Description |
|------|------|-------------|
| `type` | `"image" \| "video"` | Media type |
| `src` | `string` | Media source URL |
| `alt` | `string` | Alt text (images) |
| `overlay` | `boolean` | Enable dark overlay |
| `autoplay` | `boolean` | Video autoplay |

Note: Use the `overlayIntensity` prop on `Hero` to control the overlay opacity when `overlay` is `true`.

### HeroStat

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Stat value (e.g., "245+") |
| `label` | `string` | Stat label |

### HeroFeature

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `ReactNode` | Feature icon element |
| `title` | `string` | Feature title |
| `description` | `string` | Feature description |

### HeroAnimationConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disable all animations |
| `sequence` | `"sequential" \| "simultaneous"` | `"sequential"` | Animation sequence |
| `staggerDelay` | `number` | `100` | Stagger delay (ms) |
| `entranceDelay` | `number` | `0` | Initial delay (ms) |

## Responsive Behavior

- **Desktop (> 1024px)**: Full variant expressions with all spacing
- **Tablet (768px - 1024px)**: Maintains variants with adjusted spacing
- **Mobile (< 768px)**: All variants stack vertically for optimal readability

## Performance

- **Lazy Loading**: Images and videos are lazy-loaded by default
- **Intersection Observer**: Animations triggered only when in viewport
- **Video Optimization**: Videos pause when out of view
- **CSS Animations**: Hardware-accelerated CSS transforms (60fps)
- **Optimized Re-renders**: Minimal React re-renders

## Design Tokens

The Hero component uses S-prefix design tokens for consistent styling:

```css
--s-spacing-*        /* Spacing scale */
--s-font-size-*      /* Font sizes */
--s-font-weight-*    /* Font weights */
--s-color-*          /* Color palette */
--s-border-radius-*  /* Border radii */
--s-shadow-*         /* Box shadows */
--s-blur-*           /* Backdrop blur */
```

## Modern UI/UX Improvements (v0.3.2)

### Enhanced Visual Elements

**Title Accent Bar:**

- 4px solid bar under title in primary color
- Adapts to text alignment (left/center/right)
- Adds visual emphasis without overwhelming

**Enhanced Eyebrow:**

- 2px solid primary border (was 1px)
- Light primary background
- Hover lift effect (translateY -2px)
- Better spacing and contrast

**Interactive Stats:**

- Top accent bar slides in on hover (scaleX animation)
- Card lifts up on hover (translateY -4px)
- Border changes to primary color
- Vertical layout for better mobile UX

**Enhanced Media:**

- 2px borders (stronger than original 1px)
- Hover effect with border color change and lift
- Larger border radius for modern feel

### New Variants

**Modern:** Gradient background + top accent line for contemporary feel  
**Elegant:** Accent bar + enhanced typography for professional appearance

## Variant Selection Guide

Choose the right variant for your use case:

| Use Case | Recommended Variant | Why |
|----------|-------------------|-----|
| Main landing page | `centered-spacious` | Maximum impact, generous breathing room |
| Internal/secondary pages | `centered-compact` | Compact, efficient use of space |
| Video showcase | `split` | Full-screen media with overlay content |
| Feature benefits | `feature-showcase` | Grid cards perfect for listing features |
| Documentation headers | `title` | Ultra-compact, perfect for section headers |
| Corporate/Enterprise | `elegant` | Professional with glassmorphism |
| Modern SaaS | `modern` | Contemporary with parallax effects |
| Immersive experiences | `full-bleed` | Full-width media backgrounds |
| Simple announcements | `minimal` | Clean and straightforward |

## Best Practices

### Content Guidelines

- **Use h1 for main page heroes**: Set `titleLevel={1}` for the primary hero on a page
- **Keep titles concise**: Aim for 5-10 words maximum
- **Meaningful subtitles**: 10-20 words providing context
- **Brief descriptions**: 2-3 sentences maximum
- **Limit actions**: Use 1-2 buttons maximum

### Media Guidelines

- **Provide meaningful alt text**: Always add descriptive alt text for images
- **Optimize media**: Compress images (WebP/AVIF) and videos (H.264, 2-5 Mbps)
- **Video duration**: Keep looping videos to 10-20 seconds
- **Overlay intensity**: Use 0.3-0.7 for readability, adjust based on content
- **Background media**: Use subtle backgrounds to avoid overwhelming content

### Accessibility Guidelines

- **Test with reduced motion**: Verify experience with animations disabled
- **Keyboard navigation**: Ensure all buttons are keyboard accessible
- **Color contrast**: Maintain WCAG AA+ contrast ratios
- **Screen reader testing**: Verify ARIA labels and semantic HTML

### Performance Guidelines

- **Lazy load**: Below-fold images should lazy load
- **Video autoplay**: Only autoplay muted videos
- **Pattern intensity**: Use "low" intensity for better performance
- **Responsive images**: Provide multiple sizes for different viewports

## Examples

### Marketing Landing Page

```tsx
<Hero
  variant="centered-spacious"
  eyebrow={<Badge variant="success">New Release</Badge>}
  title="Spexop Design System 2.0"
  subtitle="Build stunning interfaces faster than ever"
  description="Production-ready React components with sophisticated animations and modern UI/UX. Start building beautiful applications today."
  primaryAction={{
    label: "Get Started",
    onClick: () => navigate('/docs'),
    iconRight: <ArrowRight size={20} />
  }}
  secondaryAction={{
    label: "View on GitHub",
    onClick: () => window.open(githubUrl),
    iconLeft: <Github size={20} />
  }}
  stats={[
    { value: "245+", label: "Design Tokens" },
    { value: "60+", label: "Components" },
    { value: "100%", label: "TypeScript" }
  ]}
  animation={{
    sequence: 'sequential',
    staggerDelay: 100
  }}
/>
```

### Product Showcase

```tsx
<Hero
  variant="split"
  align="left"
  title="Meet Your New Design System"
  description="Spexop combines beautiful aesthetics with uncompromising accessibility. Every component is crafted for performance and developer experience."
  media={{
    type: "image",
    src: "/product-showcase.jpg",
    alt: "Design system component showcase"
  }}
  background="elevated"
  primaryAction={{
    label: "Explore Components",
    onClick: handleExplore
  }}
/>
```

### Immersive Video Hero

```tsx
<Hero
  variant="full-bleed"
  title="Experience the Future"
  subtitle="Immersive design meets cutting-edge technology"
  media={{
    type: "video",
    src: "/hero-background.mp4",
    autoplay: true,
    overlay: true
  }}
  background="transparent"
  primaryAction={{
    label: "Watch Demo",
    onClick: handleDemo,
    variant: "elevated"
  }}
  animation={{
    sequence: 'sequential',
    entranceDelay: 300
  }}
/>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [`Button`](../Button/README.md) - Used for action buttons
- [`Badge`](../Badge/README.md) - Used for eyebrow content
- [`Container`](../Container/README.md) - Layout container
- [`FadeIn`](../../animations/FadeIn.tsx) - Animation component

## Quick Reference

### All Variants

```tsx
"centered-spacious"  // Default, 70vh, generous spacing
"centered-compact"   // 50vh, minimal spacing
"split"              // 70vh, full-screen overlay
"modern"             // 60vh, parallax effects
"elegant"            // 65vh, glassmorphism
"feature-showcase"   // Auto height, feature grid
"title"              // 25vh, documentation header
"minimal"            // 400px, simple layout
"full-bleed"         // 600px, immersive media
```

### Essential Props Cheatsheet

```tsx
// Required
title: string

// Layout
variant?: HeroVariant
align?: "left" | "center" | "right"
background?: "default" | "elevated" | "gradient" | "transparent"
contentPosition?: "top" | "center" | "bottom"

// Content
subtitle?: string
description?: string
eyebrow?: ReactNode
titleSize?: number  // 0.5 - 2+
titleLevel?: 1 | 2

// Media
media?: HeroMedia
backgroundMedia?: HeroMedia
overlayIntensity?: number  // 0-1

// Actions
primaryAction?: ButtonConfig
secondaryAction?: ButtonConfig

// Data
stats?: HeroStat[]
features?: HeroFeature[]

// Animation
animation?: HeroAnimationConfig
backgroundPattern?: HeroBackgroundPattern

// Styling
className?: string
style?: CSSProperties
ariaLabel?: string
```

### Media Configuration

```tsx
{
  type: "image" | "video",
  src: string,
  alt?: string,
  overlay?: boolean,
  autoplay?: boolean  // Video only
}
```

### Button Configuration

```tsx
{
  label: string,
  onClick: () => void,
  variant?: ButtonVariant,
  iconLeft?: ReactNode,
  iconRight?: ReactNode,
  ariaLabel?: string
}
```

### Feature Configuration

```tsx
{
  icon: ReactNode,
  title: string,
  description: string
}
```

## Migration Guide

### From v0.3 to v0.4

The `"centered"` variant has been split into two variants:

```tsx
// Before (v0.3)
<Hero variant="centered" />  // ❌ No longer supported

// After (v0.4)
// For landing pages:
<Hero variant="centered-spacious" />  // ✅ Use this

// For internal pages:
<Hero variant="centered-compact" />  // ✅ Use this
```

**New features in v0.4:**

- 7 new/updated variants
- Universal `backgroundMedia` prop
- `contentPosition` prop
- `titleSize` prop
- `overlayIntensity` prop
- `features` prop for feature-showcase variant

## Related Documentation

- [Usage Guide](./USAGE-GUIDE.md) - Comprehensive usage examples
- [Button Component](../buttons/Button/README.md) - Action buttons
- [Badge Component](../indicators/Badge/README.md) - Eyebrow badges
- [Theme Documentation](../../../../theme/README.md) - Design tokens

## License

MIT © Spexop Design System
  