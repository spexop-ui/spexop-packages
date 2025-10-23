# Reveal Component

**Version**: v0.3.0  
**Type**: Animation Primitive  
**Category**: Viewport-Triggered Animation

## Overview

The `Reveal` component is the universal animation wrapper that powers most other animation components in the Spexop design system. It animates children when they enter the viewport using IntersectionObserver for optimal performance.

## Features

- ✅ **Viewport-triggered animations** - Animates when elements enter the viewport
- ✅ **14 animation variants** - Fade, slide, zoom, scale, and rotate effects
- ✅ **Customizable timing** - Duration, delay, and timing function control
- ✅ **Performance optimized** - GPU-accelerated with hardware acceleration
- ✅ **Accessibility compliant** - Respects `prefers-reduced-motion`
- ✅ **Animation callbacks** - `onAnimationStart` and `onAnimationComplete` events
- ✅ **Conditional rendering** - `disabled` prop for conditional animations
- ✅ **Hardware acceleration** - Configurable GPU acceleration
- ✅ **Custom root margin** - Fine-tune intersection detection
- ✅ **TypeScript support** - Full type safety and IntelliSense

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

```tsx
import { Reveal } from '@spexop/react';

function App() {
  return (
    <Reveal variant="fadeInUp" duration={600}>
      <h1>Hello, World!</h1>
    </Reveal>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `AnimationVariant` | `"fadeIn"` | Animation type |
| `duration` | `number` | `400` | Animation duration in milliseconds |
| `delay` | `number` | `0` | Animation delay in milliseconds |
| `timing` | `AnimationTimingFunction` | `"ease-out"` | CSS timing function |
| `once` | `boolean` | `true` | Only animate once when entering viewport |
| `threshold` | `number` | `0.1` | Intersection threshold (0-1) |
| `style` | `React.CSSProperties` | `{}` | Custom styles to merge |
| `className` | `string` | `""` | Custom CSS class |
| `children` | `React.ReactNode` | - | Content to animate |
| `onAnimationStart` | `() => void` | - | Callback fired when animation starts |
| `onAnimationComplete` | `() => void` | - | Callback fired when animation completes |
| `disabled` | `boolean` | `false` | Disable animation (conditional rendering) |
| `hardwareAcceleration` | `boolean` | `true` | Enable GPU acceleration |
| `rootMargin` | `string` | `"0px"` | Custom root margin for intersection |
| `respectReducedMotion` | `boolean` | `true` | Respect `prefers-reduced-motion` |

## Animation Variants

### Fade Variants

- `fadeIn` - Simple fade in
- `fadeInUp` - Fade with upward movement (12px)
- `fadeInDown` - Fade with downward movement (12px)
- `fadeInLeft` - Fade from left (12px)
- `fadeInRight` - Fade from right (12px)

### Slide Variants

- `slideUp` - Slide up with larger movement (20px)
- `slideDown` - Slide down with larger movement (20px)
- `slideLeft` - Slide from left (20px)
- `slideRight` - Slide from right (20px)

### Scale Variants

- `zoomIn` - Zoom in from 95% scale
- `zoomOut` - Zoom out from 105% scale
- `scaleUp` - Scale up from 92% scale

### Rotation

- `rotateIn` - Rotate -3deg with scale effect

## Examples

### Basic Animation

```tsx
<Reveal variant="fadeInUp" duration={600}>
  <Card>Content animates when scrolled into view</Card>
</Reveal>
```

### Custom Timing

```tsx
<Reveal
  variant="slideUp"
  duration={800}
  delay={300}
  timing="ease-in-out"
>
  <Section>Slower animation with delay</Section>
</Reveal>
```

### Animation Callbacks

```tsx
function AnimatedCard() {
  const handleAnimationStart = () => {
    console.log('Animation started');
  };

  const handleAnimationComplete = () => {
    console.log('Animation finished');
  };

  return (
    <Reveal
      variant="fadeInUp"
      duration={600}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      <Card>Card with callbacks</Card>
    </Reveal>
  );
}
```

### Conditional Animation

```tsx
function ConditionalReveal({ shouldAnimate, children }) {
  return (
    <Reveal 
      variant="fadeInUp" 
      disabled={!shouldAnimate}
      duration={400}
    >
      {children}
    </Reveal>
  );
}

// Usage
<ConditionalReveal shouldAnimate={user.prefersAnimation}>
  <Card>Only animates when enabled</Card>
</ConditionalReveal>
```

### Performance Optimization

```tsx
<Reveal
  variant="fadeInUp"
  hardwareAcceleration={true}
  rootMargin="100px"
  threshold={0.2}
>
  <Card>Optimized for performance</Card>
</Reveal>
```

### Custom Styles

```tsx
<Reveal
  variant="fadeInUp"
  style={{ 
    width: '100%', 
    maxWidth: '600px',
    willChange: 'transform, opacity'
  }}
  className="custom-reveal"
>
  <Card>Custom styled animation</Card>
</Reveal>
```

### Repeated Animations

```tsx
// Animate every time element enters viewport
<Reveal variant="fadeInUp" once={false}>
  <Card>Animates on every scroll</Card>
</Reveal>
```

### Different Thresholds

```tsx
// Trigger when 50% of element is visible
<Reveal variant="fadeInUp" threshold={0.5}>
  <Section>Waits until half visible</Section>
</Reveal>

// Trigger immediately when any part is visible
<Reveal variant="fadeInUp" threshold={0}>
  <Section>Triggers as soon as visible</Section>
</Reveal>
```

## Advanced Patterns

### Orchestrated Sequence

```tsx
function Hero() {
  return (
    <div className="hero">
      <Reveal variant="fadeInDown" delay={0} duration={600}>
        <span className="eyebrow">INTRODUCING</span>
      </Reveal>

      <Reveal variant="fadeInUp" delay={200} duration={800}>
        <h1 className="title">Next Generation Design</h1>
      </Reveal>

      <Reveal variant="fadeInUp" delay={400} duration={600}>
        <p className="subtitle">
          Build faster with our component library
        </p>
      </Reveal>
    </div>
  );
}
```

### Loading State Animation

```tsx
function LoadingState({ isLoading, data }) {
  if (isLoading) {
    return (
      <Reveal variant="fadeIn" duration={300}>
        <div className="spinner">Loading...</div>
      </Reveal>
    );
  }

  return (
    <Reveal variant="fadeInUp" duration={600}>
      <div className="content">{data}</div>
    </Reveal>
  );
}
```

### Page Transition

```tsx
function PageTransition({ location, children }) {
  return (
    <Reveal key={location.pathname} variant="fadeInUp" duration={400}>
      {children}
    </Reveal>
  );
}
```

## Accessibility

### Reduced Motion Support

The component automatically respects `prefers-reduced-motion` by default:

```tsx
// Automatically disabled when user prefers reduced motion
<Reveal variant="fadeInUp">
  <Content />
</Reveal>

// Manually disable reduced motion respect
<Reveal variant="fadeInUp" respectReducedMotion={false}>
  <Content />
</Reveal>
```

### ARIA Attributes

The component includes proper ARIA attributes:

- `aria-hidden` - Set to `true` when not visible
- `role="presentation"` - Indicates decorative content

## Performance

### Hardware Acceleration

Enable GPU acceleration for better performance:

```tsx
<Reveal variant="fadeInUp" hardwareAcceleration>
  <Content />
</Reveal>
```

### Performance Optimizations

- Uses `willChange` property for optimal rendering
- `backfaceVisibility: hidden` for 3D acceleration
- `transformStyle: preserve-3d` for hardware acceleration
- IntersectionObserver for efficient viewport detection

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

## Migration from v0.2.x

No breaking changes. All existing APIs remain compatible:

```tsx
// v0.2.x - Still works
<Reveal variant="fadeInUp" duration={600}>
  <Content />
</Reveal>

// v0.3.0 - New features (additive)
<Reveal 
  variant="fadeInUp" 
  duration={600}
  onAnimationStart={() => console.log('Starting...')}
  onAnimationComplete={() => console.log('Complete!')}
  disabled={!shouldAnimate}
>
  <Content />
</Reveal>
```

## Related Components

- **FadeIn** - Convenient wrapper for fade animations
- **SlideIn** - Slide animations with larger movement
- **ZoomIn** - Scale-based zoom effects
- **RotateIn** - Rotation with fade effects
- **ScaleUp** - Subtle scale animations
- **Stagger** - Sequential child animations
- **Motion** - State-based spring animations

## Design Principles Applied

Following "The Spexop Way":

- **Primitives before patterns** - Core animation primitive
- **Standards before frameworks** - Web platform fundamentals
- **Accessibility before aesthetics** - WCAG AA+ compliance by default
- **Tokens before magic numbers** - Uses design tokens from theme system
- **Composition before complexity** - Simple, composable API

## License

MIT License - See LICENSE file for details
