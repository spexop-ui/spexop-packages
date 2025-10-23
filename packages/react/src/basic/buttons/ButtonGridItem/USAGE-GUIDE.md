# ButtonGridItem Component - Complete Usage Guide

**Component Version**: v0.4.0
**Last Updated**: October 23, 2025
**Package**: @spexop/react
**Status**: Production Ready

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [State Management](#state-management)
5. [Media Integration](#media-integration)
6. [Grid Layouts](#grid-layouts)
7. [Aspect Ratio Control](#aspect-ratio-control)
8. [Interactive Patterns](#interactive-patterns)
9. [Accessibility](#accessibility)
10. [Performance Optimization](#performance-optimization)
11. [Responsive Design](#responsive-design)
12. [Advanced Patterns](#advanced-patterns)
13. [Best Practices](#best-practices)
14. [API Reference](#api-reference)

## Overview

ButtonGridItem is an interactive media card component that combines rich media (images, videos) with overlay content and call-to-action buttons. It provides a polished, accessible way to create engaging hero sections, feature showcases, and product presentations.

### When to Use

Use ButtonGridItem when you need:

- Hero sections with media and CTA
- Feature showcases with imagery
- Product/service presentations
- Portfolio item previews
- Marketing campaign cards
- Event announcements with visuals
- Educational content with media

### When Not to Use

Consider alternatives when you need:

- **Text-only content**: Use Card component
- **Simple navigation**: Use NavLink or Button
- **Form inputs**: Use form components
- **Data display**: Use Table or List
- **Decorative media**: Use Image component
- **Video player**: Use dedicated video component

### Key Features

- **Dual click areas** (card + button)
- **Multiple media types** (img, picture, video)
- **Configurable aspect ratio** with minimum height control
- **Modern animations** with cubic-bezier easing
- **Enhanced gradient overlay** for optimal text legibility
- **State management** (loading, disabled, error, media loading)
- **Full keyboard navigation** with enhanced focus management
- **WCAG AA+ accessible** with comprehensive ARIA support
- **GPU-accelerated animations** with reduced motion support
- **Responsive mobile optimizations** for all screen sizes
- **Theme-aware styling** with proper design token usage
- **Performance optimized** with efficient re-renders

## Quick Start

### Basic Example

```tsx
import { ButtonGridItem } from '@spexop/react';

function FeatureCard() {
  return (
    <ButtonGridItem
      media={<img src="/hero.jpg" alt="Design system" />}
      label="Get Started"
      description="Build modern interfaces with our design system"
      buttonText="Learn More"
      onClick={() => console.log('Clicked!')}
    />
  );
}
```

### With Video Background

```tsx
import { ButtonGridItem } from '@spexop/react';

function VideoHero() {
  return (
    <ButtonGridItem
      media={
        <video autoPlay muted loop playsInline>
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      }
      label="Watch Demo"
      description="See our platform in action"
      buttonText="Play"
      onClick={() => playVideo()}
    />
  );
}
```

### In Grid Layout

```tsx
import { ButtonGridItem, Grid, GridItem } from '@spexop/react';

function FeatureGrid() {
  return (
    <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
      <GridItem>
        <ButtonGridItem
          media={<img src="/feature1.jpg" alt="Feature 1" />}
          label="Components"
          description="60+ production-ready components"
          buttonText="Browse"
          onClick={handleClick}
        />
      </GridItem>
      {/* More grid items... */}
    </Grid>
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

### Import Styles

```tsx
import '@spexop/react/dist/index.css';
```

## State Management

ButtonGridItem now includes comprehensive state management for better user experience and visual feedback.

### Loading State

```tsx
<ButtonGridItem
  media={<img src="/processing.jpg" alt="Processing" />}
  label="Processing Request"
  description="Please wait while we process your data"
  buttonText="Processing..."
  loading={isProcessing}
  onClick={handleProcess}
/>
```

### Disabled State

```tsx
<ButtonGridItem
  media={<img src="/locked.jpg" alt="Locked content" />}
  label="Premium Feature"
  description="This feature requires a premium subscription"
  buttonText="Upgrade"
  disabled={!hasAccess}
  onClick={handleUpgrade}
/>
```

### Error State

```tsx
<ButtonGridItem
  media={<img src="/error.jpg" alt="Error occurred" />}
  label="Something went wrong"
  description="We encountered an error processing your request"
  buttonText="Try Again"
  error={hasError}
  onClick={handleRetry}
/>
```

### Media Loading State

```tsx
<ButtonGridItem
  media={<img src="/large-image.jpg" alt="Loading image" />}
  label="High Resolution Image"
  description="Loading high-quality image..."
  buttonText="View"
  mediaLoading={isImageLoading}
  onClick={handleView}
/>
```

### Combined States

```tsx
<ButtonGridItem
  media={<img src="/content.jpg" alt="Content" />}
  label="Dynamic Content"
  description="Content that changes based on state"
  buttonText={isLoading ? "Loading..." : "View"}
  loading={isLoading}
  disabled={!isAuthenticated}
  error={hasError}
  mediaLoading={isMediaLoading}
  onClick={handleAction}
/>
```

## Media Integration

### Static Images

```tsx
<ButtonGridItem
  media={<img src="/hero.jpg" alt="Hero image" loading="lazy" />}
  label="Explore"
  description="Discover our features"
  buttonText="Get Started"
  onClick={handleExplore}
/>
```

### Responsive Images with Picture

```tsx
<ButtonGridItem
  media={
    <picture>
      <source
        media="(min-width: 1024px)"
        srcSet="/hero-desktop.jpg 2x, /hero-desktop.jpg 1x"
      />
      <source
        media="(min-width: 768px)"
        srcSet="/hero-tablet.jpg 2x, /hero-tablet.jpg 1x"
      />
      <img
        src="/hero-mobile.jpg"
        alt="Responsive hero"
        loading="lazy"
      />
    </picture>
  }
  label="Responsive Design"
  description="Optimized for all screen sizes"
  buttonText="Learn More"
  onClick={handleClick}
/>
```

### Video Background

```tsx
<ButtonGridItem
  media={
    <video
      autoPlay
      muted
      loop
      playsInline
      poster="/video-poster.jpg"
    >
      <source src="/hero.mp4" type="video/mp4" />
      <source src="/hero.webm" type="video/webm" />
    </video>
  }
  label="Video Background"
  description="Engaging motion content"
  buttonText="Watch"
  onClick={handleWatch}
/>
```

### Modern Image Formats

```tsx
<ButtonGridItem
  media={
    <picture>
      <source srcSet="/hero.avif" type="image/avif" />
      <source srcSet="/hero.webp" type="image/webp" />
      <img src="/hero.jpg" alt="Modern formats" loading="lazy" />
    </picture>
  }
  label="Modern Formats"
  description="AVIF, WebP support"
  buttonText="Explore"
  onClick={handleClick}
/>
```

## Grid Layouts

### 3-Column Feature Grid

```tsx
import { ButtonGridItem, Grid, GridItem, Container } from '@spexop/react';

function FeatureShowcase() {
  const features = [
    {
      media: <img src="/components.jpg" alt="Components" />,
      label: "Components",
      description: "60+ production-ready components",
      buttonText: "Browse",
      onClick: () => navigate('/components')
    },
    {
      media: <img src="/tokens.jpg" alt="Tokens" />,
      label: "Design Tokens",
      description: "Consistent design language",
      buttonText: "View Tokens",
      onClick: () => navigate('/tokens')
    },
    {
      media: <img src="/icons.jpg" alt="Icons" />,
      label: "Icons",
      description: "262 carefully crafted icons",
      buttonText: "Explore",
      onClick: () => navigate('/icons')
    }
  ];

  return (
    <Container maxWidth="2xl" padding={6}>
      <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
        {features.map((feature, index) => (
          <GridItem key={index}>
            <ButtonGridItem {...feature} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
```

### 2-Column Layout

```tsx
<Grid columns={{ xs: 1, md: 2 }} gap={6}>
  <GridItem>
    <ButtonGridItem
      media={<img src="/product1.jpg" alt="Product 1" />}
      label="Product A"
      description="Enterprise solution"
      buttonText="Learn More"
      onClick={handleProduct1}
    />
  </GridItem>
  <GridItem>
    <ButtonGridItem
      media={<img src="/product2.jpg" alt="Product 2" />}
      label="Product B"
      description="Starter package"
      buttonText="Get Started"
      onClick={handleProduct2}
    />
  </GridItem>
</Grid>
```

### Full-Width Hero

```tsx
<Container maxWidth="full" padding={0}>
  <ButtonGridItem
    media={<img src="/hero-wide.jpg" alt="Hero" />}
    label="Welcome to Spexop"
    description="Build beautiful, accessible interfaces"
    buttonText="Get Started"
    aspectRatio="21/9"
    minHeight={500}
    onClick={handleCTA}
  />
</Container>
```

## Aspect Ratio Control

### Standard Ratios

```tsx
// 16:9 (Default) - Standard video/image ratio
<ButtonGridItem
  aspectRatio="16/9"
  minHeight={300}
  {...props}
/>

// 4:3 - Classic display ratio
<ButtonGridItem
  aspectRatio="4/3"
  minHeight={350}
  {...props}
/>

// 1:1 - Square format
<ButtonGridItem
  aspectRatio="1/1"
  minHeight={400}
  {...props}
/>

// 21:9 - Ultrawide/cinematic
<ButtonGridItem
  aspectRatio="21/9"
  minHeight={250}
  {...props}
/>

// 3:2 - Photography standard
<ButtonGridItem
  aspectRatio="3/2"
  minHeight={300}
  {...props}
/>
```

### Minimum Height Control

```tsx
// Ensure minimum height while maintaining aspect ratio
<ButtonGridItem
  aspectRatio="16/9"
  minHeight={400}  // Card won't be shorter than 400px
  {...props}
/>

// Mobile-optimized heights
<ButtonGridItem
  aspectRatio="16/9"
  minHeight={isMobile ? 250 : 400}
  {...props}
/>
```

## Interactive Patterns

### Click Areas

ButtonGridItem has two interactive areas:

1. **Card Click**: Clicking anywhere on the card triggers action
2. **Button Click**: Clicking the button also triggers action (with stopPropagation)

```tsx
<ButtonGridItem
  media={<img src="/card.jpg" alt="Card" />}
  label="Interactive Card"
  description="Click anywhere to navigate"
  buttonText="Get Started"
  onClick={() => {
    console.log('Clicked!');
    navigate('/details');
  }}
/>
```

### Navigation Pattern

```tsx
import { useNavigate } from 'react-router-dom';

function NavigationCard() {
  const navigate = useNavigate();

  return (
    <ButtonGridItem
      media={<img src="/feature.jpg" alt="Feature" />}
      label="Feature Details"
      description="Learn more about this feature"
      buttonText="View Details"
      onClick={() => navigate('/features/detail')}
    />
  );
}
```

### Modal Trigger

```tsx
import { useState } from 'react';
import { ButtonGridItem, Modal } from '@spexop/react';

function ModalTriggerCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ButtonGridItem
        media={<img src="/preview.jpg" alt="Preview" />}
        label="View Full Image"
        description="Click to see full size"
        buttonText="View"
        onClick={() => setIsOpen(true)}
      />
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <img src="/full-image.jpg" alt="Full size" />
      </Modal>
    </>
  );
}
```

### External Link

```tsx
<ButtonGridItem
  media={<img src="/external.jpg" alt="External" />}
  label="External Resource"
  description="Opens in new tab"
  buttonText="Visit"
  onClick={() => window.open('https://example.com', '_blank')}
/>
```

## Accessibility

### Enhanced Keyboard Navigation

Full keyboard support with improved focus management:

- **Tab**: Focus the card
- **Shift + Tab**: Focus previous element
- **Enter**: Activate card action
- **Space**: Activate card action
- **Tab** (within card): Focus button
- **Escape**: Blur focus (when appropriate)

```tsx
// Keyboard accessible by default
<ButtonGridItem
  media={<img src="/card.jpg" alt="Card" />}
  label="Accessible Card"
  description="Fully keyboard navigable"
  buttonText="Action"
  onClick={handleClick}
/>
```

### Enhanced ARIA Support

```tsx
// Custom aria-label for card
<ButtonGridItem
  media={<img src="/card.jpg" alt="Card" />}
  label="Product Launch"
  description="New product announcement"
  buttonText="Learn More"
  onClick={handleClick}
  aria-label="Product Launch: New product announcement. Click to learn more"
/>

// Custom aria-label for button
<ButtonGridItem
  media={<img src="/card.jpg" alt="Card" />}
  label="Download"
  description="Get the latest version"
  buttonText="Download"
  onClick={handleDownload}
  aria-label-button="Download latest version of the software"
/>

// Additional ARIA attributes
<ButtonGridItem
  media={<img src="/feature.jpg" alt="Feature preview" />}
  label="New Feature"
  description="Discover our latest addition"
  buttonText="Learn More"
  aria-describedby="feature-details"
  aria-live="polite"
  data-testid="feature-card"
  onClick={handleLearnMore}
/>
```

### Alt Text Best Practices

```tsx
// ✅ GOOD - Descriptive alt text
<ButtonGridItem
  media={<img src="/hero.jpg" alt="Modern design system interface with colorful components" />}
  label="Design System"
  description="Explore components"
  buttonText="Browse"
  onClick={handleClick}
/>

// ❌ BAD - Generic alt text
<ButtonGridItem
  media={<img src="/hero.jpg" alt="Image" />}
  label="Design System"
  description="Explore components"
  buttonText="Browse"
  onClick={handleClick}
/>
```

### Screen Reader Announcements

```tsx
<ButtonGridItem
  media={<img src="/card.jpg" alt="Feature showcase" />}
  label="New Feature"
  description="Revolutionary design tools"
  buttonText="Explore"
  onClick={handleClick}
  aria-label="New Feature: Revolutionary design tools. Click to explore"
/>
```

Screen readers will announce:

- Card role (button)
- Label and description
- Button label
- Current state

## Performance Optimization

### Lazy Loading Images

```tsx
<ButtonGridItem
  media={
    <img 
      src="/card.jpg" 
      alt="Card" 
      loading="lazy"  // Browser-native lazy loading
    />
  }
  label="Lazy Loaded"
  description="Loads when scrolled into view"
  buttonText="View"
  onClick={handleClick}
/>
```

### State-Based Performance

```tsx
// Efficient re-renders with proper state management
<ButtonGridItem
  media={<img src="/card.jpg" alt="Card" />}
  label="Optimized Card"
  description="Efficient state handling"
  buttonText="Action"
  loading={isLoading}
  disabled={isDisabled}
  error={hasError}
  mediaLoading={isMediaLoading}
  onClick={handleClick}
/>
```

### Responsive Images

```tsx
<ButtonGridItem
  media={
    <img
      src="/card-mobile.jpg"
      srcSet="
        /card-mobile.jpg 400w,
        /card-tablet.jpg 768w,
        /card-desktop.jpg 1200w
      "
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      alt="Responsive card"
      loading="lazy"
    />
  }
  label="Responsive"
  description="Optimized for all screens"
  buttonText="View"
  onClick={handleClick}
/>
```

### Video Optimization

```tsx
<ButtonGridItem
  media={
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"  // Load metadata only
      poster="/poster.jpg"  // Show poster while loading
    >
      <source src="/video.mp4" type="video/mp4" />
    </video>
  }
  label="Optimized Video"
  description="Fast loading background"
  buttonText="Watch"
  onClick={handleClick}
/>
```

### GPU Acceleration

All animations are GPU-accelerated:

- Card lift: `transform: translateY(-8px)`
- Media zoom: `transform: scale(1.05)`
- Button slide: `transform: translateX(4px)`

```css
/* Automatically applied */
.buttonGridItem {
  transform: translateZ(0);
  will-change: transform;
}
```

## Responsive Design

### Mobile Optimizations

On screens < 768px:

- Reduced padding (16px → 24px)
- Smaller label (18px → 20px)
- Smaller description (14px → 16px)
- Maintained aspect ratio
- Touch-friendly interactions

```tsx
<ButtonGridItem
  media={<img src="/card.jpg" alt="Card" />}
  label="Mobile Optimized"
  description="Adapts to screen size"
  buttonText="View"
  aspectRatio="16/9"
  minHeight={isMobile ? 250 : 400}
  onClick={handleClick}
/>
```

### Responsive Aspect Ratios

```tsx
<ButtonGridItem
  media={<img src="/card.jpg" alt="Card" />}
  label="Responsive Ratio"
  description="Changes with breakpoints"
  buttonText="View"
  aspectRatio={isMobile ? '4/3' : isTablet ? '16/9' : '21/9'}
  minHeight={isMobile ? 250 : isTablet ? 350 : 450}
  onClick={handleClick}
/>
```

## Advanced Patterns

### Hero Section

```tsx
import { ButtonGridItem, Container } from '@spexop/react';

function HeroSection() {
  return (
    <section>
      <Container maxWidth="full" padding={0}>
        <ButtonGridItem
          media={
            <picture>
              <source media="(min-width: 1024px)" srcSet="/hero-desktop.jpg" />
              <source media="(min-width: 768px)" srcSet="/hero-tablet.jpg" />
              <img src="/hero-mobile.jpg" alt="Hero" />
            </picture>
          }
          label="Welcome to Spexop"
          description="Build beautiful, accessible, and performant interfaces with our comprehensive design system"
          buttonText="Get Started"
          aspectRatio="21/9"
          minHeight={500}
          onClick={() => router.push('/docs')}
        />
      </Container>
    </section>
  );
}
```

### Feature Showcase

```tsx
import { ButtonGridItem, Grid, GridItem, Container } from '@spexop/react';

function FeatureShowcase() {
  const features = [
    {
      image: '/components.jpg',
      label: 'Components',
      description: '60+ production-ready React components',
      action: () => navigate('/components')
    },
    {
      image: '/tokens.jpg',
      label: 'Design Tokens',
      description: 'Consistent design language across platforms',
      action: () => navigate('/tokens')
    },
    {
      image: '/icons.jpg',
      label: 'Icon Library',
      description: '262 carefully crafted icons',
      action: () => navigate('/icons')
    }
  ];

  return (
    <Container maxWidth="2xl" padding={6}>
      <h2>Features</h2>
      <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
        {features.map((feature, index) => (
          <GridItem key={index}>
            <ButtonGridItem
              media={<img src={feature.image} alt={feature.label} loading="lazy" />}
              label={feature.label}
              description={feature.description}
              buttonText="Learn More"
              onClick={feature.action}
            />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
```

### Product Cards

```tsx
function ProductGrid() {
  const products = [
    {
      id: 1,
      image: '/product1.jpg',
      name: 'Enterprise Plan',
      description: 'Full-featured solution for large teams',
      price: '$99/month'
    },
    // More products...
  ];

  return (
    <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
      {products.map((product) => (
        <GridItem key={product.id}>
          <ButtonGridItem
            media={<img src={product.image} alt={product.name} />}
            label={product.name}
            description={`${product.description} - ${product.price}`}
            buttonText="Choose Plan"
            aspectRatio="4/3"
            onClick={() => selectProduct(product.id)}
          />
        </GridItem>
      ))}
    </Grid>
  );
}
```

## Best Practices

### 1. Use Descriptive Alt Text

```tsx
// ✅ GOOD
<ButtonGridItem
  media={<img src="/design-system.jpg" alt="Modern design system interface showing component library" />}
  {...props}
/>

// ❌ BAD
<ButtonGridItem
  media={<img src="/design-system.jpg" alt="Image" />}
  {...props}
/>
```

### 2. Appropriate Aspect Ratios

```tsx
// ✅ GOOD - Standard ratios
<ButtonGridItem aspectRatio="16/9" {...props} />  // Video content
<ButtonGridItem aspectRatio="4/3" {...props} />   // Product shots
<ButtonGridItem aspectRatio="1/1" {...props} />   // Square grid

// ❌ BAD - Extreme ratios
<ButtonGridItem aspectRatio="1/3" {...props} />  // Too tall
<ButtonGridItem aspectRatio="10/1" {...props} /> // Too wide
```

### 3. Clear, Actionable Labels

```tsx
// ✅ GOOD
<ButtonGridItem
  label="Get Started"
  description="Begin your journey with our design system"
  buttonText="Start Tutorial"
  {...props}
/>

// ❌ BAD
<ButtonGridItem
  label="Click Here"
  description="More info"
  buttonText="Button"
  {...props}
/>
```

### 4. Performance Optimization

```tsx
// ✅ GOOD - Lazy loading + responsive
<ButtonGridItem
  media={
    <img
      src="/card.jpg"
      srcSet="/card-sm.jpg 400w, /card-lg.jpg 800w"
      sizes="(max-width: 768px) 100vw, 50vw"
      alt="Optimized card"
      loading="lazy"
    />
  }
  {...props}
/>

// ❌ BAD - Large image, no optimization
<ButtonGridItem
  media={<img src="/huge-image.jpg" alt="Card" />}
  {...props}
/>
```

### 5. Consistent Grid Layouts

```tsx
// ✅ GOOD - Consistent spacing and aspect ratios
<Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
  <GridItem>
    <ButtonGridItem aspectRatio="16/9" minHeight={300} {...props1} />
  </GridItem>
  <GridItem>
    <ButtonGridItem aspectRatio="16/9" minHeight={300} {...props2} />
  </GridItem>
</Grid>

// ❌ BAD - Inconsistent sizing
<Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
  <GridItem>
    <ButtonGridItem aspectRatio="16/9" minHeight={300} {...props1} />
  </GridItem>
  <GridItem>
    <ButtonGridItem aspectRatio="1/1" minHeight={500} {...props2} />
  </GridItem>
</Grid>
```

## API Reference

### ButtonGridItemProps

```typescript
interface ButtonGridItemProps {
  /** Media content (img, picture, or video element) */
  media: React.ReactNode;
  
  /** Title/label for the card */
  label: string;
  
  /** Description text */
  description: string;
  
  /** CTA button text */
  buttonText: string;
  
  /** Click handler */
  onClick: () => void;
  
  /** Additional CSS class */
  className?: string;
  
  /** Aspect ratio (CSS aspect-ratio value) */
  aspectRatio?: string;
  
  /** Minimum height in pixels */
  minHeight?: number;
  
  /** Loading state */
  loading?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Error state */
  error?: boolean;
  
  /** Media loading state */
  mediaLoading?: boolean;
  
  /** ARIA label for card (overrides default) */
  "aria-label"?: string;
  
  /** ARIA label for button */
  "aria-label-button"?: string;
  
  /** ARIA described by for additional description */
  "aria-describedby"?: string;
  
  /** ARIA live region for dynamic content */
  "aria-live"?: "polite" | "assertive" | "off";
  
  /** Test ID for testing */
  "data-testid"?: string;
}
```

### Default Props

- `aspectRatio`: `"16/9"`
- `minHeight`: `300`
- `loading`: `false`
- `disabled`: `false`
- `error`: `false`
- `mediaLoading`: `false`

## Related Components

- **Card**: For text-only content
- **Button**: For simple actions
- **Grid**: For layout organization
- **Image**: For display-only images

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Bundle Size**: ~3.2KB gzipped
- **GPU Accelerated**: All animations with `transform: translateZ(0)`
- **Modern Easing**: Cubic-bezier transitions for smoother animations
- **Lazy Loading**: Support for lazy images
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **State Management**: Efficient re-renders with proper state handling
- **Memory Management**: Proper cleanup of event listeners and animations
- **Optimized Hover**: Efficient transform animations

## License

MIT

## Support

For issues, questions, or contributions:

- [GitHub Issues](https://github.com/spexop-ui/design-system/issues)
- [Documentation](https://spexop.com)
