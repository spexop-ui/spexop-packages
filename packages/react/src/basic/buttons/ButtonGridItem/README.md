# ButtonGridItem Component

**Interactive media card that displays images/videos with overlay content and call-to-action buttons.**

**component** ButtonGridItem  
**packageName** @spexop/react  
**description** Interactive media card with overlay content and call-to-action  
**author** @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian  
**version** 0.4.0  
**since** 2025-10-13  
**updated** 2025-01-27 - Enhanced with modern UI/UX patterns

---

## Features

- ✅ **Media Support**: img, picture, or video elements as background
- ✅ **Dual Click Areas**: Click anywhere on card OR the button to trigger action
- ✅ **Modern Animations**: Smooth, performant animations with cubic-bezier easing
- ✅ **Enhanced Gradient Overlay**: Improved text legibility with modern gradient patterns
- ✅ **Aspect Ratio Control**: Configurable aspect ratio with minimum height
- ✅ **Full Accessibility**: WCAG AA+ compliant with enhanced keyboard navigation
- ✅ **State Management**: Loading, disabled, error, and media loading states
- ✅ **Design System Aligned**: Follows Spexop's "borders before shadows" principle
- ✅ **Theme-Aware**: Works in light and dark modes with proper contrast
- ✅ **Palette Integration**: Action button adapts to selected color palette
- ✅ **Mobile Responsive**: Optimized spacing and typography for all screen sizes
- ✅ **Performance**: GPU acceleration, reduced motion support, optimized animations
- ✅ **Modern Focus Management**: Enhanced focus indicators and keyboard navigation
- ✅ **Screen Reader Support**: Comprehensive ARIA labels and live regions

---

## Installation

```bash
pnpm add @spexop/react
```

---

## Basic Usage

```tsx
import { ButtonGridItem } from '@spexop/react';

function MediaCard() {
  const handleClick = () => {
    console.log('Card clicked!');
  };

  return (
    <ButtonGridItem
      media={<img src="hero-image.jpg" alt="Design system showcase" />}
      label="Learn More"
      description="Discover our comprehensive design system with modern components"
      buttonText="Get Started"
      onClick={handleClick}
    />
  );
}
```

---

## With Video Background

```tsx
import { ButtonGridItem } from '@spexop/react';

function VideoCard() {
  return (
    <ButtonGridItem
      media={
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="video-poster.jpg"
        >
          <source src="hero-video.mp4" type="video/mp4" />
        </video>
      }
      label="Watch Demo"
      description="See our design system in action with this interactive demo"
      buttonText="Play Video"
      onClick={() => window.open('/demo', '_blank')}
    />
  );
}
```

---

## With Responsive Images

```tsx
import { ButtonGridItem } from '@spexop/react';

function ResponsiveCard() {
  return (
    <ButtonGridItem
      media={
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="hero-desktop.jpg 2x, hero-desktop.jpg 1x"
          />
          <source
            media="(max-width: 767px)"
            srcSet="hero-mobile.jpg 2x, hero-mobile.jpg 1x"
          />
          <img
            src="hero-desktop.jpg"
            alt="Responsive hero image"
            loading="lazy"
          />
        </picture>
      }
      label="Explore"
      description="Discover our responsive design patterns and mobile-first approach"
      buttonText="Learn More"
      onClick={handleExplore}
    />
  );
}
```

---

## Custom Aspect Ratio

```tsx
import { ButtonGridItem } from '@spexop/react';

function SquareCard() {
  return (
    <ButtonGridItem
      media={<img src="square-image.jpg" alt="Square format" />}
      label="Square Format"
      description="Custom aspect ratio example"
      buttonText="View"
      aspectRatio="1/1"
      minHeight={400}
      onClick={handleView}
    />
  );
}

function WideCard() {
  return (
    <ButtonGridItem
      media={<img src="wide-banner.jpg" alt="Wide banner" />}
      label="Wide Banner"
      description="21:9 aspect ratio for cinematic feel"
      buttonText="Explore"
      aspectRatio="21/9"
      minHeight={200}
      onClick={handleExplore}
    />
  );
}
```

---

## Props

### ButtonGridItemProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `media` | `ReactNode` | required | Media content (img, picture, or video element) |
| `label` | `string` | required | Title/label for the card |
| `description` | `string` | required | Teaser text/description |
| `buttonText` | `string` | required | CTA button label |
| `onClick` | `() => void` | required | Click handler for the action |
| `className` | `string` | - | Additional CSS class |
| `aspectRatio` | `string` | `'16/9'` | Aspect ratio for the media container |
| `minHeight` | `number` | `300` | Minimum height in pixels |
| `loading` | `boolean` | `false` | Loading state |
| `disabled` | `boolean` | `false` | Disabled state |
| `error` | `boolean` | `false` | Error state |
| `mediaLoading` | `boolean` | `false` | Media loading state |
| `aria-label` | `string` | - | ARIA label for the entire card (overrides label) |
| `aria-label-button` | `string` | - | ARIA label for the internal button |
| `aria-describedby` | `string` | - | ARIA described by for additional description |
| `aria-live` | `'polite' \| 'assertive' \| 'off'` | - | ARIA live region for dynamic content |
| `data-testid` | `string` | - | Test ID for testing |

---

## State Management

### Loading State

```tsx
<ButtonGridItem
  media={<img src="/hero.jpg" alt="Loading..." />}
  label="Processing"
  description="Please wait while we process your request"
  buttonText="Processing..."
  loading={true}
  onClick={handleClick}
/>
```

### Disabled State

```tsx
<ButtonGridItem
  media={<img src="/locked.jpg" alt="Locked content" />}
  label="Premium Feature"
  description="This feature requires a premium subscription"
  buttonText="Upgrade"
  disabled={true}
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
  error={true}
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
  mediaLoading={true}
  onClick={handleView}
/>
```

---

## Keyboard Navigation

### Card Interaction

- **Tab**: Navigate to card
- **Enter/Space**: Activate card action
- **Focus**: Visible focus indicator (3px outline)

### Internal Button

- **Tab**: Navigate to internal button (within card)
- **Enter/Space**: Activate button action
- **Focus**: Visible focus indicator (2px white outline)

---

## Examples

### Hero Section

```tsx
import { ButtonGridItem } from '@spexop/react';

function HeroSection() {
  return (
    <section>
      <ButtonGridItem
        media={<img src="hero-bg.jpg" alt="Hero background" />}
        label="Welcome to Spexop"
        description="Build beautiful, accessible, and performant user interfaces with our comprehensive design system"
        buttonText="Get Started"
        aspectRatio="21/9"
        minHeight={400}
        onClick={() => router.push('/docs')}
      />
    </section>
  );
}
```

### Feature Showcase

```tsx
import { ButtonGridItem, Grid, GridItem } from '@spexop/react';

function FeatureShowcase() {
  const features = [
    {
      media: <img src="components.jpg" alt="Components" />,
      label: "Components",
      description: "100+ production-ready components",
      buttonText: "Browse Components",
      onClick: () => router.push('/components')
    },
    {
      media: <img src="tokens.jpg" alt="Design tokens" />,
      label: "Design Tokens",
      description: "Consistent design language",
      buttonText: "View Tokens",
      onClick: () => router.push('/tokens')
    },
    {
      media: <img src="icons.jpg" alt="Icons" />,
      label: "Icon Library",
      description: "262 carefully crafted icons",
      buttonText: "Explore Icons",
      onClick: () => router.push('/icons')
    }
  ];

  return (
    <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
      {features.map((feature, index) => (
        <GridItem key={index}>
          <ButtonGridItem {...feature} />
        </GridItem>
      ))}
    </Grid>
  );
}
```

### Product Showcase

```tsx
import { ButtonGridItem } from '@spexop/react';

function ProductCard() {
  return (
    <ButtonGridItem
      media={
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet="product-desktop.jpg 2x"
          />
          <source
            media="(min-width: 768px)"
            srcSet="product-tablet.jpg 2x"
          />
          <img
            src="product-mobile.jpg"
            alt="Product showcase"
            loading="lazy"
          />
        </picture>
      }
      label="New Product Launch"
      description="Introducing our latest innovation in design system technology"
      buttonText="Learn More"
      onClick={() => openModal('product-details')}
    />
  );
}
```

---

## Accessibility

### ARIA Pattern

ButtonGridItem implements the **button** ARIA pattern:

```tsx
<article
  role="button"
  tabIndex={0}
  aria-label="Learn More: Discover our comprehensive design system"
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  <img src="..." alt="..." />
  <div>
    <h3>Learn More</h3>
    <p>Description...</p>
    <button aria-label="Get Started">Get Started</button>
  </div>
</article>
```

### Focus Management

- Card receives focus on Tab
- Internal button receives focus when tabbing within card
- Clear focus indicators for both elements
- Keyboard activation with Enter/Space

### Screen Reader Support

- Card announces label and description
- Button announces its label
- All media has proper alt text
- Semantic HTML structure

---

## Foundation Integration

### With Grid System

```tsx
import { Grid, GridItem, Container, ButtonGridItem } from '@spexop/react';

function MediaGrid() {
  return (
    <Container maxWidth="2xl" padding={6}>
      <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
        <GridItem>
          <ButtonGridItem
            media={<img src="card1.jpg" alt="Card 1" />}
            label="Feature 1"
            description="Description for feature 1"
            buttonText="Learn More"
            onClick={handleFeature1}
          />
        </GridItem>
        
        <GridItem>
          <ButtonGridItem
            media={<img src="card2.jpg" alt="Card 2" />}
            label="Feature 2"
            description="Description for feature 2"
            buttonText="Explore"
            onClick={handleFeature2}
          />
        </GridItem>
        
        <GridItem>
          <ButtonGridItem
            media={<img src="card3.jpg" alt="Card 3" />}
            label="Feature 3"
            description="Description for feature 3"
            buttonText="Get Started"
            onClick={handleFeature3}
          />
        </GridItem>
      </Grid>
    </Container>
  );
}
```

### With Stack Layout

```tsx
import { Stack, ButtonGridItem } from '@spexop/react';

function VerticalStack() {
  return (
    <Stack direction="vertical" gap={6}>
      <ButtonGridItem
        media={<img src="hero.jpg" alt="Hero" />}
        label="Main Feature"
        description="Primary feature description"
        buttonText="Primary Action"
        onClick={handlePrimary}
      />
      
      <ButtonGridItem
        media={<img src="secondary.jpg" alt="Secondary" />}
        label="Secondary Feature"
        description="Secondary feature description"
        buttonText="Secondary Action"
        onClick={handleSecondary}
      />
    </Stack>
  );
}
```

---

## Design Tokens Used

```css
/* Card */
--theme-surface: #ffffff            /* Background */
--theme-border-strong: #d4d4d4      /* Border */
--theme-radius-lg: 12px             /* Border radius */
--theme-spacing-6: 24px             /* Content padding */

/* Typography */
--theme-font-size-lg: 20px          /* Label size */
--theme-font-size-base: 16px        /* Description size */
--theme-font-weight-bold: 700       /* Label weight */
--theme-font-weight-normal: 400     /* Description weight */
--theme-font-weight-semibold: 600   /* Button weight */
--theme-font-family-heading: 'Fira Sans', sans-serif /* Heading font */

/* Button */
--theme-primary: #ef4444            /* Button background (palette-aware) */
--theme-primary-hover: #dc2626      /* Button hover */
--theme-primary-active: #b91c1c     /* Button active */
--theme-spacing-3: 12px             /* Button padding */
--theme-spacing-5: 20px             /* Button padding */
--theme-radius-md: 8px              /* Button radius */

/* Spacing */
--theme-spacing-2: 8px              /* Element gaps */
--theme-spacing-4: 16px             /* Mobile padding */

/* Focus & States */
--theme-focus: #3b82f6              /* Focus ring color */
--theme-error: #ef4444              /* Error state color */

/* Transitions */
cubic-bezier(0.4, 0, 0.2, 1)       /* Modern easing function */
```

**Palette Integration**: The action button uses `--theme-primary`, `--theme-primary-hover`, and `--theme-primary-active`, which automatically adapt when users switch between color palettes.

---

## Best Practices

### ✅ DO

```tsx
// Use descriptive alt text for media
<ButtonGridItem
  media={<img src="design-system.jpg" alt="Design system components showcase" />}
  label="Components"
  description="Browse our comprehensive component library"
  buttonText="Explore"
  onClick={handleExplore}
/>

// Use appropriate aspect ratios
<ButtonGridItem
  aspectRatio="16/9"    // Standard video/image ratio
  minHeight={300}       // Ensure minimum height
  {...props}
/>

// Use responsive images for better performance
<ButtonGridItem
  media={
    <picture>
      <source media="(min-width: 768px)" srcSet="desktop.jpg 2x" />
      <img src="mobile.jpg" alt="..." loading="lazy" />
    </picture>
  }
  {...props}
/>

// Provide clear, actionable labels
<ButtonGridItem
  label="Get Started"
  description="Start building with our design system"
  buttonText="Begin Tutorial"
  onClick={handleStart}
/>

// Use loading states for better UX
<ButtonGridItem
  media={<img src="processing.jpg" alt="Processing" />}
  label="Processing Request"
  description="Please wait while we process your data"
  buttonText="Processing..."
  loading={isProcessing}
  onClick={handleProcess}
/>

// Provide proper accessibility attributes
<ButtonGridItem
  media={<img src="feature.jpg" alt="New feature preview" />}
  label="New Feature"
  description="Discover our latest addition"
  buttonText="Learn More"
  aria-describedby="feature-details"
  aria-live="polite"
  data-testid="feature-card"
  onClick={handleLearnMore}
/>
```

### ❌ DON'T

```tsx
// Don't use generic or missing alt text
<ButtonGridItem
  media={<img src="image.jpg" alt="Image" />}  // Too generic!
  {...props}
/>

// Don't use extremely tall aspect ratios
<ButtonGridItem
  aspectRatio="1/3"    // Too tall for most use cases!
  {...props}
/>

// Don't use vague descriptions
<ButtonGridItem
  label="Click Here"                    // Not descriptive!
  description="More info"               // Too vague!
  buttonText="Button"                   // Not actionable!
  {...props}
/>

// Don't forget keyboard accessibility
// Always ensure onClick handlers work with keyboard

// Don't ignore loading states
<ButtonGridItem
  loading={false}  // Always show loading state when appropriate
  {...props}
/>

// Don't use disabled without proper indication
<ButtonGridItem
  disabled={true}
  // Missing proper visual indication or explanation
  {...props}
/>

// Don't forget accessibility attributes
<ButtonGridItem
  // Missing aria-describedby, aria-live, or data-testid when needed
  {...props}
/>
```

---

## Use Cases

**Perfect for:**

- Hero sections with call-to-action
- Feature showcases with media
- Product/service presentations
- Portfolio items with previews
- Marketing campaign cards
- Educational content with visuals
- Event announcements with imagery

**Not suitable for:**

- Simple text-only content (use Card)
- Navigation items (use ButtonGroup)
- Form inputs (use Form components)
- Data display (use Table/List)
- Pure decorative content (use Image)

---

## Mobile Behavior

On screens < 768px:

- Reduced padding (16px instead of 24px)
- Smaller label font size (18px instead of 20px)
- Smaller description font size (14px instead of 16px)
- Smaller button padding and font size
- Maintained aspect ratio and minimum height
- Touch-friendly interactions

```css
@media (max-width: 768px) {
  .contentOverlay {
    padding: var(--s-spacing-4, 16px);  /* Reduced from 24px */
  }
  
  .label {
    font-size: var(--s-font-size-lg, 18px);  /* Reduced from 20px */
  }
  
  .description {
    font-size: var(--s-font-size-sm, 14px);  /* Reduced from 16px */
  }
}
```

---

## Performance

- **GPU Acceleration**: All animations use `transform: translateZ(0)` and `will-change`
- **Modern Easing**: Cubic-bezier transitions for smoother animations
- **Lazy Loading**: Support for `loading="lazy"` on images
- **Efficient Animations**: `requestAnimationFrame` for smooth interactions
- **Optimized Hover**: Separate hover states for different elements
- **Media Optimization**: Support for responsive images and modern formats
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **State Management**: Efficient re-renders with proper state handling
- **Memory Management**: Proper cleanup of event listeners and animations

**Bundle Size**: ~3.2KB (gzipped)

---

## TypeScript

Full TypeScript support:

```tsx
import type { ButtonGridItemProps } from '@spexop/react';

const MyCard: React.FC<ButtonGridItemProps> = (props) => {
  return <ButtonGridItem {...props} />;
};

// Custom media type
interface CustomMediaProps {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
}

const CustomMedia: React.FC<CustomMediaProps> = ({ src, alt, loading }) => (
  <img src={src} alt={alt} loading={loading} />
);

<ButtonGridItem
  media={<CustomMedia src="image.jpg" alt="Custom" loading="lazy" />}
  label="Custom Media"
  description="Using custom media component"
  buttonText="Action"
  onClick={handleAction}
/>
```

---

## Testing

### Interaction Testing

- [ ] Card click triggers onClick handler
- [ ] Button click triggers onClick handler (stops propagation)
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus indicators visible on both card and button
- [ ] Hover animations work smoothly
- [ ] Media zoom effect on hover

### Visual Testing

- [ ] Aspect ratio maintained correctly
- [ ] Minimum height respected
- [ ] Gradient overlay provides good text contrast
- [ ] Button slides right on hover
- [ ] Card lifts on hover
- [ ] Media scales on hover
- [ ] Mobile responsive behavior

### Accessibility Testing

- [ ] All interactive elements have accessible names
- [ ] Focus order is logical
- [ ] Screen reader announces content correctly
- [ ] Keyboard navigation complete
- [ ] Color contrast meets WCAG standards
- [ ] Alt text provided for all media

---

## Design System Alignment

This component follows **Spexop's Refined Minimalism** principles:

1. ✅ **Border-based separation** - Clear 2px border around card (no heavy shadows)
2. ✅ **Typography-driven** - Bold labels with proper font weights for hierarchy
3. ✅ **High-contrast** - Strong gradient overlay for text legibility (WCAG AA+)
4. ✅ **Minimal decoration** - Purposeful animations with modern easing
5. ✅ **Primitives-First** - Uses spacing, color, and typography tokens
6. ✅ **Palette integration** - Action button adapts to themes
7. ✅ **Accessibility-first** - WCAG AA+ compliant with proper focus management
8. ✅ **Performance-optimized** - GPU acceleration and reduced motion support

---

## Related Components

- **Card**: For text-only content without media
- **Button**: For simple actions without media
- **Image**: For display-only images
- **Grid**: For laying out multiple ButtonGridItems

---

## License

MIT © Spexop Design System
