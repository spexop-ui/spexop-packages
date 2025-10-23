# FadeIn Component

**Version**: v0.3.0  
**Type**: Animation Wrapper  
**Category**: Viewport-Triggered Animation

## Overview

The `FadeIn` component is a convenient wrapper for fade animations with enhanced customization options. It provides directional movement, custom opacity ranges, animation callbacks, and conditional rendering capabilities.

## Features

- ✅ **Directional animations** - Fade from up, down, left, right, or none
- ✅ **Custom distance control** - Adjust movement distance beyond default 12px
- ✅ **Opacity range customization** - Define custom from/to opacity values
- ✅ **Animation callbacks** - `onAnimationStart` and `onAnimationComplete` events
- ✅ **Conditional rendering** - `disabled` prop for conditional animations
- ✅ **Performance optimized** - GPU-accelerated with hardware acceleration
- ✅ **Accessibility compliant** - Respects `prefers-reduced-motion`
- ✅ **TypeScript support** - Full type safety and IntelliSense

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

```tsx
import { FadeIn } from '@spexop/react';

function App() {
  return (
    <FadeIn direction="up">
      <h1>Hello, World!</h1>
    </FadeIn>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "left" \| "right" \| "none"` | `"none"` | Direction of fade animation |
| `duration` | `number` | `400` | Animation duration in milliseconds |
| `delay` | `number` | `0` | Animation delay in milliseconds |
| `timing` | `AnimationTimingFunction` | `"ease-out"` | CSS timing function |
| `once` | `boolean` | `true` | Only animate once when entering viewport |
| `threshold` | `number` | `0.1` | Intersection threshold (0-1) |
| `style` | `React.CSSProperties` | `{}` | Custom styles to merge |
| `className` | `string` | `""` | Custom CSS class |
| `children` | `React.ReactNode` | - | Content to animate |
| `distance` | `number` | `12` | Distance of movement in pixels |
| `opacity` | `{ from: number; to: number }` | `{ from: 0, to: 1 }` | Opacity range for fade effect |
| `disabled` | `boolean` | `false` | Disable animation (conditional rendering) |
| `onAnimationStart` | `() => void` | - | Callback fired when animation starts |
| `onAnimationComplete` | `() => void` | - | Callback fired when animation completes |

## Animation Directions

### Fade with Movement

- `up` - Fade with upward movement (12px by default)
- `down` - Fade with downward movement (12px by default)
- `left` - Fade from left (12px by default)
- `right` - Fade from right (12px by default)

### Simple Fade

- `none` - Simple fade without movement

## Examples

### Basic Fade Animations

```tsx
// Simple fade up
<FadeIn direction="up">
  <Card>Content fades up</Card>
</FadeIn>

// Fade from left
<FadeIn direction="left">
  <Card>Content fades from left</Card>
</FadeIn>

// Simple fade without movement
<FadeIn direction="none">
  <Card>Content fades in place</Card>
</FadeIn>
```

### Page Load Sequence

```tsx
function Hero() {
  return (
    <div className="hero">
      <FadeIn direction="up" delay={0} duration={600}>
        <h1>Welcome to Spexop</h1>
      </FadeIn>
      <FadeIn direction="up" delay={200} duration={600}>
        <p className="subtitle">Build faster with design systems</p>
      </FadeIn>
      <FadeIn direction="up" delay={400} duration={600}>
        <button>Get Started</button>
      </FadeIn>
    </div>
  );
}
```

### Content Reveal from Sides

```tsx
function Features() {
  return (
    <div className="features">
      <FadeIn direction="left">
        <FeatureCard icon="fast" title="Fast" />
      </FadeIn>
      <FadeIn direction="right">
        <FeatureCard icon="secure" title="Secure" />
      </FadeIn>
      <FadeIn direction="left">
        <FeatureCard icon="scalable" title="Scalable" />
      </FadeIn>
    </div>
  );
}
```

### Custom Distance and Opacity

```tsx
// Custom movement distance (default is 12px)
<FadeIn direction="up" distance={30}>
  <Card>Larger movement animation</Card>
</FadeIn>

// Custom opacity range
<FadeIn 
  direction="left" 
  opacity={{ from: 0.3, to: 1 }}
  duration={800}
>
  <Card>Fades from 30% to 100% opacity</Card>
</FadeIn>
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
    <FadeIn
      direction="up"
      duration={600}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      <Card>Card with callbacks</Card>
    </FadeIn>
  );
}
```

### Conditional Animation

```tsx
function ConditionalFade({ shouldAnimate, children }) {
  return (
    <FadeIn 
      direction="up" 
      disabled={!shouldAnimate}
      duration={400}
    >
      {children}
    </FadeIn>
  );
}

// Usage
<ConditionalFade shouldAnimate={user.prefersAnimation}>
  <Card>Only animates when enabled</Card>
</ConditionalFade>
```

### Advanced Customization

```tsx
<FadeIn
  direction="right"
  distance={50}
  opacity={{ from: 0, to: 0.9 }}
  duration={1000}
  delay={300}
  timing="bounce"
  threshold={0.2}
  onAnimationStart={() => console.log('Starting...')}
  onAnimationComplete={() => console.log('Complete!')}
  style={{ 
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden'
  }}
  className="custom-fade"
>
  <Card>Highly customized animation</Card>
</FadeIn>
```

### Custom Timing

```tsx
<FadeIn
  direction="up"
  duration={800}
  delay={300}
  timing="ease-in-out"
>
  <Section>Slower animation with delay</Section>
</FadeIn>
```

### With Custom Styles

```tsx
<FadeIn
  direction="up"
  style={{ width: '100%', maxWidth: '600px' }}
  className="custom-animation"
>
  <Card>Custom styled animated card</Card>
</FadeIn>
```

### Repeated Animations

```tsx
// Animate every time element enters viewport
<FadeIn direction="up" once={false}>
  <Card>Animates on every scroll</Card>
</FadeIn>
```

### Different Thresholds

```tsx
// Trigger when 50% of element is visible
<FadeIn direction="up" threshold={0.5}>
  <Section>Waits until half visible</Section>
</FadeIn>

// Trigger immediately when any part is visible
<FadeIn direction="up" threshold={0}>
  <Section>Triggers as soon as visible</Section>
</FadeIn>
```

## Advanced Patterns

### Orchestrated Sequence

```tsx
function OrchestratedHero() {
  return (
    <div className="hero">
      <FadeIn direction="down" delay={0} duration={600}>
        <span className="eyebrow">INTRODUCING</span>
      </FadeIn>

      <FadeIn direction="up" delay={200} duration={800}>
        <h1 className="title">Next Generation Design</h1>
      </FadeIn>

      <FadeIn direction="up" delay={400} duration={600}>
        <p className="subtitle">
          Build faster with our component library
        </p>
      </FadeIn>
    </div>
  );
}
```

### Loading State Animation

```tsx
function LoadingState({ isLoading, data }) {
  if (isLoading) {
    return (
      <FadeIn direction="fadeIn" duration={300}>
        <div className="spinner">Loading...</div>
      </FadeIn>
    );
  }

  return (
    <FadeIn direction="up" duration={600}>
      <div className="content">{data}</div>
    </FadeIn>
  );
}
```

### Page Transition

```tsx
function PageTransition({ location, children }) {
  return (
    <FadeIn key={location.pathname} direction="up" duration={400}>
      {children}
    </FadeIn>
  );
}
```

### Form Field Reveal

```tsx
function AnimatedForm() {
  return (
    <form>
      <FadeIn direction="left" delay={0}>
        <input type="text" placeholder="Name" />
      </FadeIn>
      <FadeIn direction="left" delay={100}>
        <input type="email" placeholder="Email" />
      </FadeIn>
      <FadeIn direction="left" delay={200}>
        <input type="tel" placeholder="Phone" />
      </FadeIn>
      <FadeIn direction="left" delay={300}>
        <textarea placeholder="Message" />
      </FadeIn>
      <FadeIn direction="up" delay={400}>
        <button type="submit">Send</button>
      </FadeIn>
    </form>
  );
}
```

## Accessibility

### Reduced Motion Support

The component automatically respects `prefers-reduced-motion` by default:

```tsx
// Automatically disabled when user prefers reduced motion
<FadeIn direction="up">
  <Content />
</FadeIn>

// Manually disable reduced motion respect
<FadeIn direction="up" respectReducedMotion={false}>
  <Content />
</FadeIn>
```

### ARIA Attributes

The component includes proper ARIA attributes:

- `aria-hidden` - Set to `true` when not visible
- `role="presentation"` - Indicates decorative content

## Performance

### Hardware Acceleration

Enable GPU acceleration for better performance:

```tsx
<FadeIn direction="up" hardwareAcceleration>
  <Content />
</FadeIn>
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
<FadeIn direction="up">
  <Content />
</FadeIn>

// v0.3.0 - New features (additive)
<FadeIn 
  direction="up" 
  distance={30}
  opacity={{ from: 0.3, to: 1 }}
  onAnimationStart={() => console.log('Starting...')}
  onAnimationComplete={() => console.log('Complete!')}
  disabled={!shouldAnimate}
>
  <Content />
</FadeIn>
```

## Related Components

- **Reveal** - Universal animation wrapper
- **SlideIn** - Slide animations with larger movement
- **ZoomIn** - Scale-based zoom effects
- **RotateIn** - Rotation with fade effects
- **ScaleUp** - Subtle scale animations
- **Stagger** - Sequential child animations
- **Motion** - State-based spring animations

## Design Principles Applied

Following "The Spexop Way":

- **Primitives before patterns** - Convenient wrapper for common animation patterns
- **Standards before frameworks** - Web platform fundamentals
- **Accessibility before aesthetics** - WCAG AA+ compliance by default
- **Tokens before magic numbers** - Uses design tokens from theme system
- **Composition before complexity** - Simple, composable API

## License

MIT License - See LICENSE file for details
