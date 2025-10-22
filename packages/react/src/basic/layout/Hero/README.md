# Hero Component

A reusable, animated Hero component that serves as a prominent entry point for landing pages. Features multiple layout variants, modern UI/UX elements, smooth animations, and sophisticated visual effects following Spexop principles.

## Features

- ✅ **6 Layout Variants**: centered, split, minimal, full-bleed, modern, elegant
- ✅ **Smooth Animations**: FadeIn, ScaleUp, Stagger with reduced motion support
- ✅ **Modern UI Elements**: Accent bars, enhanced typography, interactive stats
- ✅ **WCAG AA+ Compliant**: Full accessibility with semantic HTML and ARIA
- ✅ **Responsive Design**: Optimized for mobile, tablet, and desktop
- ✅ **Interactive Stats**: Hover effects with accent bar animations
- ✅ **Enhanced Typography**: Clear hierarchy with design tokens
- ✅ **Type-Safe**: Comprehensive TypeScript support
- ✅ **Flexible Content**: Eyebrow, title, subtitle, description, actions, stats
- ✅ **Media Support**: Background images and autoplay videos with optimization

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
      variant="centered"
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

### Centered (Default)

Perfect for single-column layouts with center-aligned content. Now features accent bar under title.

```tsx
<Hero
  variant="centered"
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

- 2px accent bar under title
- Enhanced eyebrow with 2px border
- Interactive stats with hover effects

### Modern (New in v0.3.2)

Contemporary design with subtle gradient and accent line effect.

```tsx
<Hero
  variant="modern"
  eyebrow="Introducing v2.0"
  title="Build the Future Today"
  subtitle="Modern design system for ambitious teams"
  description="Create stunning, accessible interfaces..."
  primaryAction={{ label: "Start Building", onClick: handleStart }}
/>
```

Features:

- Subtle gradient background
- Horizontal accent line at top (fades in/out)
- Center-aligned content
- Clean and contemporary

### Elegant (New in v0.3.2)

Refined design with accent bar and enhanced typography.

```tsx
<Hero
  variant="elegant"
  eyebrow="Enterprise Ready"
  title="Premium Design System"
  subtitle="Built for scale, designed for excellence"
  description="Trusted by leading companies worldwide..."
  primaryAction={{ label: "Request Demo", onClick: handleDemo }}
/>
```

Features:

- 160px primary accent bar at bottom
- 3px strong bottom border
- Enhanced typography (medium weight, letter-spacing)
- Larger description text (18px)
- Professional appearance

### Split

Side-by-side layout with content on one side and media on the other.

```tsx
<Hero
  variant="split"
  title="Design System Excellence"
  description="30+ production-ready components with liquid glass aesthetic"
  media={{
    type: "image",
    src: "/hero-image.jpg",
    alt: "Design system preview"
  }}
  primaryAction={{
    label: "Explore Components",
    onClick: handleExplore
  }}
/>
```

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

### Full-Bleed

Full-width hero with background media and overlay content.

```tsx
<Hero
  variant="full-bleed"
  title="Immersive Experiences"
  subtitle="Build stunning landing pages"
  media={{
    type: "video",
    src: "/background-video.mp4",
    autoplay: true,
    overlay: true
  }}
  background="transparent"
  primaryAction={{
    label: "Watch Demo",
    onClick: handleDemo
  }}
/>
```

## With Statistics

Display key metrics alongside your hero content with modern interactive cards.

```tsx
<Hero
  variant="centered"
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
  variant="centered"
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
| `variant` | `"centered" \| "split" \| "minimal" \| "full-bleed"` | `"centered"` | Layout variant |
| `title` | `string` | Required | Main title text |
| `subtitle` | `string` | - | Subtitle text |
| `description` | `string` | - | Description/body text |
| `eyebrow` | `ReactNode` | - | Badge/tag above title |
| `primaryAction` | `ButtonConfig` | - | Primary CTA button |
| `secondaryAction` | `ButtonConfig` | - | Secondary CTA button |
| `stats` | `HeroStat[]` | - | Statistics/metrics |
| `media` | `HeroMedia` | - | Background media |
| `background` | `"default" \| "elevated" \| "gradient" \| "transparent"` | `"default"` | Background style |
| `align` | `"left" \| "center" \| "right"` | `"center"` | Content alignment |
| `animation` | `HeroAnimationConfig` | - | Animation configuration |
| `titleLevel` | `1 \| 2` | `1` | Heading level |
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
| `overlay` | `boolean` | Dark overlay |
| `autoplay` | `boolean` | Video autoplay |

### HeroStat

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Stat value (e.g., "245+") |
| `label` | `string` | Stat label |

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

## Best Practices

1. **Use h1 for main page heroes**: Set `titleLevel={1}` for the primary hero on a page
2. **Provide meaningful alt text**: Always add descriptive alt text for images
3. **Optimize media**: Compress images and videos for faster loading
4. **Test with reduced motion**: Verify experience with animations disabled
5. **Keep descriptions concise**: Aim for 2-3 sentences maximum
6. **Use appropriate variants**: Choose variants that match your content layout
7. **Leverage new variants**: Use modern for SaaS, elegant for corporate sites

## Examples

### Marketing Landing Page

```tsx
<Hero
  variant="centered"
  eyebrow={<Badge variant="success">New Release</Badge>}
  title="Spexop Design System 2.0"
  subtitle="Build stunning interfaces faster than ever"
  description="Production-ready React components with sophisticated animations and liquid glass aesthetics. Start building beautiful applications today."
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
    { value: "30+", label: "Components" },
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

## License

MIT © Spexop Design System
