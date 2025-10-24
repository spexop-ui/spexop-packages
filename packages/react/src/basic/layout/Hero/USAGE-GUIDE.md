# Hero Component - Complete Usage Guide

**Component Version**: v0.4.0
**Last Updated**: October 24, 2025
**Package**: @spexop/react
**Compatibility**: Stable API

## Table of Contents

1. [Quick Start](#quick-start)
2. [Variants](#variants)
3. [Props Reference](#props-reference)
4. [Common Use Cases](#common-use-cases)
5. [Advanced Features](#advanced-features)
6. [Accessibility](#accessibility)
7. [Performance](#performance)
8. [Best Practices](#best-practices)

## Quick Start

### Installation

```bash
pnpm add @spexop/react @spexop/theme
```

### Basic Example

```tsx
import { Hero } from '@spexop/react';

function App() {
  return (
    <Hero
      variant="centered-spacious"
      title="Build Faster with Spexop"
      subtitle="Modern design system for React"
      description="60+ components with complete theme support"
      primaryAction={{
        label: "Get Started",
        onClick: () => navigate('/docs')
      }}
    />
  );
}
```

## Variants

Hero provides 9 distinct layout variants, each optimized for different use cases.

### 1. Centered Spacious (Default)

**Best for**: Landing pages, main hero sections
**Height**: 70vh
**Features**: Generous spacing, perfect for first impressions

```tsx
<Hero
  variant="centered-spacious"
  title="Welcome to Our Platform"
  subtitle="Build amazing things"
  description="Everything you need in one place"
  primaryAction={{ label: "Get Started", onClick: handleStart }}
  stats={[
    { value: "10K+", label: "Users" },
    { value: "50K+", label: "Projects" }
  ]}
/>
```

### 2. Centered Compact

**Best for**: Internal pages, secondary heroes
**Height**: 50vh
**Features**: Minimal spacing, tighter layout

```tsx
<Hero
  variant="centered-compact"
  title="Documentation"
  subtitle="Everything you need to know"
  primaryAction={{ label: "Get Started", onClick: handleDocs }}
/>
```

### 3. Split (Enhanced with Overlay)

**Best for**: Video backgrounds with overlay content
**Height**: 70vh
**Features**: Full-screen media, adjustable content positioning

```tsx
<Hero
  variant="split"
  contentPosition="center"  // "top" | "center" | "bottom"
  title="Experience the Difference"
  subtitle="See it in action"
  media={{
    type: "video",
    src: "/hero.mp4",
    autoplay: true,
    overlay: true
  }}
  overlayIntensity={0.6}
  primaryAction={{ label: "Watch Demo", onClick: handleDemo }}
/>
```

### 4. Modern (Parallax Effects)

**Best for**: Contemporary SaaS products, tech companies
**Height**: 60vh
**Features**: Animated gradients, parallax depth effects

```tsx
<Hero
  variant="modern"
  title="Next-Generation Platform"
  subtitle="Built for the future"
  backgroundMedia={{
    type: "video",
    src: "/bg.mp4",
    overlay: true
  }}
  overlayIntensity={0.4}
  primaryAction={{ label: "Explore", onClick: handleExplore }}
/>
```

### 5. Elegant (Glassmorphism)

**Best for**: Corporate sites, professional services
**Height**: 65vh
**Features**: Video backgrounds, glassmorphism cards, premium feel

```tsx
<Hero
  variant="elegant"
  title="Premium Solutions"
  subtitle="Excellence in every detail"
  backgroundMedia={{
    type: "video",
    src: "/corporate.mp4",
    overlay: true
  }}
  overlayIntensity={0.7}
  primaryAction={{ label: "Learn More", onClick: handleLearn }}
/>
```

### 6. Feature Showcase

**Best for**: Feature pages, benefits sections
**Height**: Auto
**Features**: Grid layout, icon cards, interactive hover effects

```tsx
import { Zap, Shield, Cpu, Layers } from '@spexop/icons';

<Hero
  variant="feature-showcase"
  title="Why Choose Us"
  subtitle="Built for developers, designed for users"
  features={[
    {
      icon: <Zap />,
      title: "Lightning Fast",
      description: "Optimized for performance"
    },
    {
      icon: <Shield />,
      title: "Secure by Default",
      description: "Built-in security best practices"
    },
    {
      icon: <Cpu />,
      title: "Developer Experience",
      description: "Type-safe APIs with TypeScript"
    },
    {
      icon: <Layers />,
      title: "Composable",
      description: "Primitives-first approach"
    }
  ]}
  primaryAction={{ label: "Get Started", onClick: handleStart }}
/>
```

### 7. Minimal

**Best for**: Blog posts, announcement pages
**Height**: 400px
**Features**: Clean, simple, no accent bars

```tsx
<Hero
  variant="minimal"
  eyebrow="NEW RELEASE"
  title="Version 2.0"
  description="Introducing new features and improvements"
  primaryAction={{ label: "Read More", onClick: handleRead }}
/>
```

### 8. Full-Bleed

**Best for**: Immersive experiences, media-heavy pages
**Height**: 600px
**Features**: Full-width media, overlay content

```tsx
<Hero
  variant="full-bleed"
  contentPosition="center"
  title="Immersive Experiences"
  subtitle="Feel the difference"
  media={{
    type: "video",
    src: "/immersive.mp4",
    autoplay: true,
    overlay: true
  }}
  overlayIntensity={0.8}
  background="transparent"
  primaryAction={{ label: "Explore", onClick: handleExplore }}
/>
```

### 9. Title (Documentation Header)

**Best for**: Documentation pages, section headers
**Height**: 25vh (20vh mobile)
**Features**: Compact, title and subtitle only

```tsx
<Hero
  variant="title"
  title="API Reference"
  subtitle="Complete documentation for all props and methods"
  backgroundMedia={{
    type: "image",
    src: "/docs-bg.jpg",
    overlay: true
  }}
  overlayIntensity={0.3}
/>
```

## Props Reference

### Core Props

#### variant

Layout variant selection.

```tsx
type HeroVariant = 
  | "centered-spacious"  // Default, generous spacing
  | "centered-compact"   // Minimal spacing
  | "split"              // Full-screen overlay
  | "modern"             // Parallax effects
  | "elegant"            // Glassmorphism
  | "feature-showcase"   // Feature grid
  | "minimal"            // Simple layout
  | "full-bleed"         // Immersive media
  | "title";             // Documentation header

<Hero variant="modern" title="Title" />
```

#### title (Required)

Main heading text.

```tsx
<Hero 
  title="Your Title Here"
  titleSize={1.2}  // Optional: Scale multiplier (0.5 - 2+)
/>
```

#### subtitle

Secondary heading.

```tsx
<Hero 
  title="Main Title"
  subtitle="Supporting subtitle text"
/>
```

#### description

Body text description.

```tsx
<Hero 
  title="Title"
  subtitle="Subtitle"
  description="Detailed description of your product or service"
/>
```

#### eyebrow

Small text or badge above title.

```tsx
import { Badge } from '@spexop/react';

<Hero 
  eyebrow={<Badge variant="info">New Release</Badge>}
  title="Version 2.0"
/>

// Or simple text
<Hero 
  eyebrow="ANNOUNCEMENT"
  title="Big News"
/>
```

### Action Props

#### primaryAction

Main call-to-action button.

```tsx
<Hero
  title="Title"
  primaryAction={{
    label: "Get Started",
    onClick: () => navigate('/start'),
    variant: "primary",  // Button variant
    iconLeft: <Icon name="Play" />,
    iconRight: <Icon name="ArrowRight" />,
    ariaLabel: "Get started with our platform"
  }}
/>
```

#### secondaryAction

Secondary call-to-action button.

```tsx
<Hero
  title="Title"
  primaryAction={{
    label: "Get Started",
    onClick: handleStart
  }}
  secondaryAction={{
    label: "Learn More",
    onClick: handleLearn,
    variant: "outline"  // Uses outline style
  }}
/>
```

### Media Props

#### media

Variant-specific media (used by split, full-bleed).

```tsx
// Image
<Hero
  variant="split"
  title="Title"
  media={{
    type: "image",
    src: "/hero.jpg",
    alt: "Hero image",
    overlay: true
  }}
/>

// Video
<Hero
  variant="full-bleed"
  title="Title"
  media={{
    type: "video",
    src: "/video.mp4",
    autoplay: true,
    overlay: true
  }}
/>
```

#### backgroundMedia (Universal)

Background media that works with ALL variants.

```tsx
<Hero
  variant="centered-spacious"  // Any variant!
  title="Title"
  backgroundMedia={{
    type: "video",
    src: "/subtle-bg.mp4",
    overlay: true
  }}
  overlayIntensity={0.3}
/>
```

#### overlayIntensity

Control overlay opacity (0-1).

```tsx
<Hero
  title="Title"
  backgroundMedia={{
    type: "video",
    src: "/bg.mp4",
    overlay: true
  }}
  overlayIntensity={0.6}  // 60% opacity
/>
```

### Layout Props

#### contentPosition

Position content in overlay variants (split, full-bleed).

```tsx
<Hero
  variant="split"
  contentPosition="top"     // "top" | "center" | "bottom"
  title="Title"
  media={{ type: "video", src: "/video.mp4" }}
/>
```

#### align

Content text alignment.

```tsx
<Hero
  align="left"    // "left" | "center" | "right"
  title="Title"
/>
```

#### background

Background style.

```tsx
<Hero
  background="gradient"  // "default" | "elevated" | "gradient" | "transparent"
  title="Title"
/>
```

### Data Props

#### stats

Display key metrics.

```tsx
<Hero
  title="Title"
  stats={[
    { value: "10K+", label: "Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ]}
/>
```

#### features

Feature cards (for feature-showcase variant).

```tsx
import { Zap, Shield } from '@spexop/icons';

<Hero
  variant="feature-showcase"
  title="Features"
  features={[
    {
      icon: <Zap />,
      title: "Fast",
      description: "Lightning speed performance"
    },
    {
      icon: <Shield />,
      title: "Secure",
      description: "Bank-level security"
    }
  ]}
/>
```

### Animation Props

#### animation

Control animation behavior.

```tsx
<Hero
  title="Title"
  animation={{
    disabled: false,              // Disable all animations
    sequence: "sequential",       // "sequential" | "simultaneous"
    staggerDelay: 100,           // Delay between elements (ms)
    entranceDelay: 0             // Initial delay (ms)
  }}
/>
```

#### backgroundPattern

Animated background patterns.

```tsx
<Hero
  title="Title"
  backgroundPattern={{
    variant: "particles",        // "particles" | "gradient" | "mesh"
    intensity: "medium",         // "low" | "medium" | "high"
    colors: [
      "rgba(239, 68, 68, 0.3)",
      "rgba(59, 130, 246, 0.2)"
    ]
  }}
/>
```

### Styling Props

#### titleSize

Scale title size dynamically.

```tsx
<Hero
  title="Compact Title"
  titleSize={0.8}  // 80% of default

  title="Large Title"
  titleSize={1.5}  // 150% of default
/>
```

#### titleLevel

Semantic heading level.

```tsx
<Hero
  title="Main Page Hero"
  titleLevel={1}  // h1 (default)
/>

<Hero
  title="Section Hero"
  titleLevel={2}  // h2
/>
```

#### className

Custom CSS class.

```tsx
<Hero
  title="Title"
  className="my-custom-hero"
/>
```

#### style

Inline styles.

```tsx
<Hero
  title="Title"
  style={{
    minHeight: '80vh',
    background: 'linear-gradient(...)'
  }}
/>
```

#### ariaLabel

Accessibility label for section.

```tsx
<Hero
  title="Welcome"
  ariaLabel="Hero section introducing our platform"
/>
```

## Common Use Cases

### Marketing Landing Page

```tsx
<Hero
  variant="centered-spacious"
  eyebrow={<Badge variant="success">New Release</Badge>}
  title="Transform Your Workflow"
  subtitle="The all-in-one platform for modern teams"
  description="Build, ship, and scale your products faster with our comprehensive toolkit"
  primaryAction={{
    label: "Start Free Trial",
    onClick: () => navigate('/signup'),
    iconRight: <ArrowRight />
  }}
  secondaryAction={{
    label: "Watch Demo",
    onClick: () => setVideoOpen(true),
    variant: "outline"
  }}
  stats={[
    { value: "50K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ]}
  backgroundPattern={{
    variant: "particles",
    intensity: "low"
  }}
/>
```

### Product Showcase with Video

```tsx
<Hero
  variant="split"
  contentPosition="center"
  title="See It In Action"
  subtitle="Real-time collaboration made simple"
  description="Watch how teams around the world use our platform"
  media={{
    type: "video",
    src: "/product-demo.mp4",
    autoplay: true,
    overlay: true
  }}
  overlayIntensity={0.5}
  primaryAction={{
    label: "Get Started",
    onClick: handleStart
  }}
/>
```

### Feature Showcase Page

```tsx
import { Zap, Shield, Cpu, Globe, Lock, Sparkles } from '@spexop/icons';

<Hero
  variant="feature-showcase"
  title="Why Choose Our Platform"
  subtitle="Everything you need to succeed"
  description="Powerful features designed for modern teams"
  features={[
    {
      icon: <Zap />,
      title: "Lightning Fast",
      description: "Sub-50ms response times across the globe"
    },
    {
      icon: <Shield />,
      title: "Enterprise Security",
      description: "SOC 2 Type II certified with end-to-end encryption"
    },
    {
      icon: <Cpu />,
      title: "AI-Powered",
      description: "Smart automation to save you hours every week"
    },
    {
      icon: <Globe />,
      title: "Global CDN",
      description: "Deployed across 200+ edge locations worldwide"
    },
    {
      icon: <Lock />,
      title: "Privacy First",
      description: "GDPR compliant with zero tracking"
    },
    {
      icon: <Sparkles />,
      title: "Beautiful UI",
      description: "Designed with attention to every detail"
    }
  ]}
  primaryAction={{
    label: "Start Building",
    onClick: handleStart
  }}
/>
```

### Documentation Page Header

```tsx
<Hero
  variant="title"
  eyebrow="Documentation"
  title="Getting Started"
  subtitle="Everything you need to begin building with our platform"
  backgroundMedia={{
    type: "image",
    src: "/docs-pattern.svg",
    overlay: true
  }}
  overlayIntensity={0.2}
/>
```

### Corporate/Enterprise Hero

```tsx
<Hero
  variant="elegant"
  title="Enterprise Solutions"
  subtitle="Built for scale, designed for excellence"
  description="Trusted by Fortune 500 companies worldwide"
  backgroundMedia={{
    type: "video",
    src: "/corporate-bg.mp4",
    overlay: true
  }}
  overlayIntensity={0.7}
  primaryAction={{
    label: "Schedule Demo",
    onClick: handleDemo
  }}
  secondaryAction={{
    label: "Contact Sales",
    onClick: handleContact,
    variant: "outline"
  }}
/>
```

### Modern SaaS Hero

```tsx
<Hero
  variant="modern"
  title="Build the Future"
  subtitle="Modern tools for modern teams"
  description="Ship faster with our next-generation development platform"
  backgroundMedia={{
    type: "video",
    src: "/tech-bg.mp4",
    overlay: true
  }}
  overlayIntensity={0.4}
  primaryAction={{
    label: "Start Free",
    onClick: handleStart
  }}
  stats={[
    { value: "2M+", label: "Deployments" },
    { value: "10ms", label: "Latency" },
    { value: "100%", label: "Uptime" }
  ]}
/>
```

## Advanced Features

### Universal Background Media

All variants support background media:

```tsx
// Works with ANY variant!
<Hero
  variant="centered-compact"
  title="Title"
  backgroundMedia={{
    type: "video",
    src: "/bg.mp4",
    overlay: true
  }}
  overlayIntensity={0.3}
/>
```

### Dynamic Title Sizing

```tsx
// Small title for long text
<Hero
  title="This is a very long title that needs to be smaller"
  titleSize={0.7}
/>

// Large title for emphasis
<Hero
  title="Big Impact"
  titleSize={1.8}
/>
```

### Content Positioning

```tsx
// Top-aligned content
<Hero
  variant="split"
  contentPosition="top"
  title="Title"
  media={{ type: "video", src: "/video.mp4" }}
/>

// Bottom-aligned content
<Hero
  variant="full-bleed"
  contentPosition="bottom"
  title="Title"
  media={{ type: "image", src: "/img.jpg" }}
/>
```

### Custom Animations

```tsx
<Hero
  title="Custom Animation"
  animation={{
    sequence: "sequential",
    staggerDelay: 200,
    entranceDelay: 500
  }}
/>

// Disable animations
<Hero
  title="Static Hero"
  animation={{ disabled: true }}
/>
```

### Animated Backgrounds

```tsx
// Particles
<Hero
  title="Title"
  backgroundPattern={{
    variant: "particles",
    intensity: "high",
    colors: [
      "rgba(239, 68, 68, 0.4)",
      "rgba(59, 130, 246, 0.3)"
    ]
  }}
/>

// Gradient mesh
<Hero
  title="Title"
  backgroundPattern={{
    variant: "mesh",
    intensity: "medium"
  }}
/>
```

## Accessibility

### Semantic HTML

```tsx
// Use h1 for main page hero
<Hero
  title="Main Page"
  titleLevel={1}
/>

// Use h2 for section heroes
<Hero
  title="Feature Section"
  titleLevel={2}
/>
```

### ARIA Labels

```tsx
<Hero
  title="Welcome"
  ariaLabel="Hero section introducing our platform"
  primaryAction={{
    label: "Get Started",
    onClick: handleStart,
    ariaLabel: "Get started with free trial"
  }}
/>
```

### Keyboard Navigation

All interactive elements are keyboard accessible:

- **Tab**: Navigate to buttons
- **Enter/Space**: Activate buttons
- **Shift + Tab**: Navigate backwards

### Reduced Motion

Automatically respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled automatically */
}
```

### Screen Reader Support

- Semantic HTML structure
- Proper heading hierarchy
- Descriptive button labels
- Alt text for media
- ARIA labels for sections

## Performance

### Image Optimization

```tsx
// Use modern formats
<Hero
  media={{
    type: "image",
    src: "/hero.webp",  // WebP format
    alt: "Hero image"
  }}
/>

// Tips:
// - Use WebP or AVIF
// - Compress images
// - Use responsive images
// - Lazy load below-fold
```

### Video Optimization

```tsx
<Hero
  media={{
    type: "video",
    src: "/hero.mp4",
    autoplay: true
  }}
/>

// Tips:
// - Use H.264 codec
// - Compress to 2-5 Mbps
// - Keep duration 10-20s
// - Provide poster image
// - Use IntersectionObserver (built-in)
```

### Background Patterns

```tsx
// Lower intensity = better performance
<Hero
  backgroundPattern={{
    variant: "particles",
    intensity: "low"  // Fewer particles
  }}
/>
```

### Animation Performance

```tsx
// Animations use CSS transforms (GPU-accelerated)
// Automatically disabled for prefers-reduced-motion
<Hero
  animation={{
    sequence: "sequential",
    staggerDelay: 100
  }}
/>
```

## Best Practices

### DO

- ✅ Use clear, concise titles (5-10 words)
- ✅ Provide meaningful subtitles (10-20 words)
- ✅ Include 1-2 action buttons maximum
- ✅ Use high-quality, optimized media
- ✅ Provide alt text for all images
- ✅ Test on all screen sizes
- ✅ Keep descriptions brief (2-3 sentences)
- ✅ Use appropriate heading levels
- ✅ Choose the right variant for your use case
- ✅ Test with keyboard navigation
- ✅ Verify color contrast

### DON'T

- ❌ Don't use more than 2 action buttons
- ❌ Don't forget alt text for images
- ❌ Don't use low-quality media
- ❌ Don't overwhelm with too much text
- ❌ Don't autoplay videos with sound
- ❌ Don't use excessive animations
- ❌ Don't skip mobile testing
- ❌ Don't forget accessibility
- ❌ Don't use too many variants on one page
- ❌ Don't ignore performance

### Variant Selection Guide

| Use Case | Recommended Variant |
|----------|-------------------|
| Main landing page | centered-spacious |
| Internal pages | centered-compact |
| Video showcase | split |
| Feature benefits | feature-showcase |
| Documentation | title |
| Corporate/Enterprise | elegant |
| Modern SaaS | modern |
| Immersive media | full-bleed |
| Announcements | minimal |

## Migration from v0.3

### Breaking Changes

**Old `"centered"` variant removed:**

```tsx
// Before (v0.3)
<Hero variant="centered" />

// After (v0.4) - Choose one:
<Hero variant="centered-spacious" />  // More spacing
<Hero variant="centered-compact" />   // Less spacing
```

### New Features

- 7 new/updated variants
- Universal `backgroundMedia` prop
- `contentPosition` prop for overlay variants
- `titleSize` prop for dynamic scaling
- `overlayIntensity` prop
- `features` prop for feature-showcase variant

### Recommended Migrations

```tsx
// Old centered → centered-spacious (for landing pages)
<Hero variant="centered" />  // v0.3 ❌
→ <Hero variant="centered-spacious" />  // v0.4 ✅

// Old centered → centered-compact (for internal pages)
<Hero variant="centered" />  // v0.3 ❌
→ <Hero variant="centered-compact" />  // v0.4 ✅

// Old split → Use new overlay features
<Hero variant="split" media={{ ... }} />  // v0.3
→ <Hero variant="split" contentPosition="center" media={{ ... }} />  // v0.4 ✅
```

## Troubleshooting

### Video Not Playing

```tsx
// Ensure autoplay is enabled
<Hero
  media={{
    type: "video",
    src: "/video.mp4",
    autoplay: true  // Required
  }}
/>

// Check video format (H.264 recommended)
// Check video is accessible (CORS, path)
```

### Animations Not Working

```tsx
// Check if reduced motion is enabled
// Check animation config
<Hero
  animation={{
    disabled: false,  // Ensure not disabled
    sequence: "sequential"
  }}
/>
```

### Layout Issues

```tsx
// Check variant spelling
<Hero variant="centered-spacious" />  // ✅
<Hero variant="centered" />           // ❌ (v0.3)

// Check container constraints
// Ensure parent has proper width
```

## Related Components

- **Button**: Action buttons (used in Hero)
- **Badge**: Eyebrow badges
- **Icon**: Feature icons
- **Container**: Width constraints
- **Grid/Stack**: Layout primitives

## Support

For issues, questions, or feature requests:

1. Check this usage guide
2. Review the [README.md](./README.md)
3. Check component examples
4. Search GitHub issues
5. Create new issue with reproduction

## Summary

Hero provides 9 flexible variants for all use cases:

- **centered-spacious**: Landing pages
- **centered-compact**: Internal pages
- **split**: Video overlays
- **modern**: Parallax effects
- **elegant**: Professional/corporate
- **feature-showcase**: Feature grids
- **title**: Documentation headers
- **minimal**: Simple layouts
- **full-bleed**: Immersive media

Built with Spexop design principles:

- ✅ Borders before shadows
- ✅ Typography before decoration
- ✅ Tokens before magic numbers
- ✅ Accessibility before aesthetics
- ✅ WCAG AA+ compliant
- ✅ Fully responsive
- ✅ Performance optimized

Perfect for creating impactful, accessible hero sections for any web application.
