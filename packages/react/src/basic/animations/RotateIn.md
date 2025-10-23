# RotateIn Component

**Version**: v0.3.0  
**Type**: Animation Wrapper  
**Category**: Viewport-Triggered Animation

## Overview

The `RotateIn` component provides enhanced rotation animations with customizable angle, scale, and fade effects. It offers engaging content reveals with subtle rotation and scaling for a dynamic user experience.

## Features

- ✅ **Custom rotation angle** - Adjust rotation angle in degrees (positive/negative)
- ✅ **Custom scale factor** - Control the scale effect during rotation
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
import { RotateIn } from '@spexop/react';

function App() {
  return (
    <RotateIn>
      <h1>Hello, World!</h1>
    </RotateIn>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `angle` | `number` | `-3` | Rotation angle in degrees (negative = counter-clockwise) |
| `scale` | `number` | `0.97` | Scale factor for the rotation effect |
| `duration` | `number` | `400` | Animation duration in milliseconds |
| `delay` | `number` | `0` | Animation delay in milliseconds |
| `timing` | `AnimationTimingFunction` | `"ease-out"` | CSS timing function |
| `once` | `boolean` | `true` | Only animate once when entering viewport |
| `threshold` | `number` | `0.1` | Intersection threshold (0-1) |
| `style` | `React.CSSProperties` | `{}` | Custom styles to merge |
| `className` | `string` | `""` | Custom CSS class |
| `children` | `React.ReactNode` | - | Content to animate |
| `disabled` | `boolean` | `false` | Disable animation (conditional rendering) |
| `onAnimationStart` | `() => void` | - | Callback fired when animation starts |
| `onAnimationComplete` | `() => void` | - | Callback fired when animation completes |
| `hardwareAcceleration` | `boolean` | `true` | Enable hardware acceleration |
| `rootMargin` | `string` | `"0px"` | Custom root margin for intersection observer |
| `respectReducedMotion` | `boolean` | `true` | Whether to respect prefers-reduced-motion |

## Animation Effects

### Default Rotation

- **Angle**: -3 degrees (subtle counter-clockwise rotation)
- **Scale**: 0.97 (slight scale down effect)
- **Opacity**: Fades from 0 to 1
- **Duration**: 400ms with ease-out timing

### Custom Rotation

- **Angle**: Customizable from -180° to +180°
- **Scale**: Any positive number (0.5 to 2.0 recommended)
- **Combined**: Rotation + scale + fade for dynamic effects

## Examples

### Basic Rotation Animations

```tsx
// Default subtle rotation
<RotateIn>
  <Card>Content rotates in subtly</Card>
</RotateIn>

// More pronounced rotation
<RotateIn angle={-10} scale={0.9}>
  <Card>Dramatic rotation effect</Card>
</RotateIn>

// Clockwise rotation
<RotateIn angle={5} scale={0.95}>
  <Card>Clockwise rotation</Card>
</RotateIn>
```

### Page Load Sequence

```tsx
function Hero() {
  return (
    <div className="hero">
      <RotateIn delay={0} duration={600}>
        <h1>Welcome to Spexop</h1>
      </RotateIn>
      <RotateIn delay={200} duration={600} angle={-2}>
        <p className="subtitle">Build faster with design systems</p>
      </RotateIn>
      <RotateIn delay={400} duration={600} angle={2}>
        <button>Get Started</button>
      </RotateIn>
    </div>
  );
}
```

### Card Grid with Varied Rotations

```tsx
function FeatureGrid() {
  const features = [
    { title: "Fast", angle: -5, scale: 0.95 },
    { title: "Secure", angle: 5, scale: 0.9 },
    { title: "Scalable", angle: -3, scale: 0.97 },
    { title: "Reliable", angle: 3, scale: 0.93 },
  ];

  return (
    <div className="feature-grid">
      {features.map((feature, index) => (
        <RotateIn
          key={feature.title}
          angle={feature.angle}
          scale={feature.scale}
          delay={index * 100}
        >
          <FeatureCard title={feature.title} />
        </RotateIn>
      ))}
    </div>
  );
}
```

### Custom Angle and Scale

```tsx
// Dramatic rotation with large scale change
<RotateIn angle={-15} scale={0.8} duration={800}>
  <Card>Dramatic entrance</Card>
</RotateIn>

// Subtle clockwise rotation
<RotateIn angle={2} scale={0.98} duration={300}>
  <Card>Gentle rotation</Card>
</RotateIn>

// No rotation, just scale effect
<RotateIn angle={0} scale={0.9} duration={500}>
  <Card>Scale-only effect</Card>
</RotateIn>
```

### Animation Callbacks

```tsx
function AnimatedCard() {
  const handleAnimationStart = () => {
    console.log('Rotation animation started');
  };

  const handleAnimationComplete = () => {
    console.log('Rotation animation finished');
  };

  return (
    <RotateIn
      angle={-8}
      scale={0.92}
      duration={700}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      <Card>Card with callbacks</Card>
    </RotateIn>
  );
}
```

### Conditional Animation

```tsx
function ConditionalRotate({ shouldAnimate, children }) {
  return (
    <RotateIn 
      angle={-5}
      scale={0.95}
      disabled={!shouldAnimate}
      duration={500}
    >
      {children}
    </RotateIn>
  );
}

// Usage
<ConditionalRotate shouldAnimate={user.prefersAnimation}>
  <Card>Only animates when enabled</Card>
</ConditionalRotate>
```

### Advanced Customization

```tsx
<RotateIn
  angle={-12}
  scale={0.85}
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
  className="custom-rotate"
  hardwareAcceleration={true}
  rootMargin="50px"
>
  <Card>Highly customized rotation</Card>
</RotateIn>
```

### Different Timing Functions

```tsx
// Bouncy rotation
<RotateIn angle={-5} timing="bounce" duration={600}>
  <Card>Bouncy rotation</Card>
</RotateIn>

// Elastic rotation
<RotateIn angle={-8} timing="elastic" duration={800}>
  <Card>Elastic rotation</Card>
</RotateIn>

// Linear rotation
<RotateIn angle={-3} timing="linear" duration={400}>
  <Card>Linear rotation</Card>
</RotateIn>
```

### With Custom Styles

```tsx
<RotateIn
  angle={-6}
  scale={0.94}
  style={{ 
    width: '100%', 
    maxWidth: '400px',
    borderRadius: '12px'
  }}
  className="custom-rotate-card"
>
  <Card>Custom styled rotating card</Card>
</RotateIn>
```

### Repeated Animations

```tsx
// Animate every time element enters viewport
<RotateIn angle={-4} once={false}>
  <Card>Animates on every scroll</Card>
</RotateIn>
```

### Different Thresholds

```tsx
// Trigger when 50% of element is visible
<RotateIn angle={-5} threshold={0.5}>
  <Section>Waits until half visible</Section>
</RotateIn>

// Trigger immediately when any part is visible
<RotateIn angle={-3} threshold={0}>
  <Section>Triggers as soon as visible</Section>
</RotateIn>
```

## Advanced Patterns

### Orchestrated Rotation Sequence

```tsx
function OrchestratedHero() {
  return (
    <div className="hero">
      <RotateIn angle={-2} delay={0} duration={600}>
        <span className="eyebrow">INTRODUCING</span>
      </RotateIn>

      <RotateIn angle={-4} delay={200} duration={800}>
        <h1 className="title">Next Generation Design</h1>
      </RotateIn>

      <RotateIn angle={2} delay={400} duration={600}>
        <p className="subtitle">
          Build faster with our component library
        </p>
      </RotateIn>
    </div>
  );
}
```

### Loading State Animation

```tsx
function LoadingState({ isLoading, data }) {
  if (isLoading) {
    return (
      <RotateIn angle={-3} duration={300}>
        <div className="spinner">Loading...</div>
      </RotateIn>
    );
  }

  return (
    <RotateIn angle={-5} duration={600}>
      <div className="content">{data}</div>
    </RotateIn>
  );
}
```

### Page Transition

```tsx
function PageTransition({ location, children }) {
  return (
    <RotateIn key={location.pathname} angle={-3} duration={400}>
      {children}
    </RotateIn>
  );
}
```

### Form Field Reveal

```tsx
function AnimatedForm() {
  return (
    <form>
      <RotateIn angle={-2} delay={0}>
        <input type="text" placeholder="Name" />
      </RotateIn>
      <RotateIn angle={2} delay={100}>
        <input type="email" placeholder="Email" />
      </RotateIn>
      <RotateIn angle={-2} delay={200}>
        <input type="tel" placeholder="Phone" />
      </RotateIn>
      <RotateIn angle={2} delay={300}>
        <textarea placeholder="Message" />
      </RotateIn>
      <RotateIn angle={-3} delay={400}>
        <button type="submit">Send</button>
      </RotateIn>
    </form>
  );
}
```

### Card Flip Effect

```tsx
function FlipCard({ children, isFlipped }) {
  return (
    <RotateIn 
      angle={isFlipped ? 180 : 0} 
      scale={isFlipped ? 1.05 : 0.95}
      duration={600}
      timing="ease-in-out"
    >
      <div className="flip-card">
        {children}
      </div>
    </RotateIn>
  );
}
```

## Accessibility

### Reduced Motion Support

The component automatically respects `prefers-reduced-motion` by default:

```tsx
// Automatically disabled when user prefers reduced motion
<RotateIn angle={-5}>
  <Content />
</RotateIn>

// Manually disable reduced motion respect
<RotateIn angle={-5} respectReducedMotion={false}>
  <Content />
</RotateIn>
```

### ARIA Attributes

The component includes proper ARIA attributes:

- `aria-hidden` - Set to `true` when not visible
- `role="presentation"` - Indicates decorative content

## Performance

### Hardware Acceleration

Enable GPU acceleration for better performance:

```tsx
<RotateIn angle={-5} hardwareAcceleration>
  <Content />
</RotateIn>
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
<RotateIn duration={700} timing="bounce">
  <Content />
</RotateIn>

// v0.3.0 - New features (additive)
<RotateIn 
  angle={-5}
  scale={0.95}
  duration={700}
  onAnimationStart={() => console.log('Starting...')}
  onAnimationComplete={() => console.log('Complete!')}
  disabled={!shouldAnimate}
>
  <Content />
</RotateIn>
```

## Related Components

- **Reveal** - Universal animation wrapper
- **FadeIn** - Convenient wrapper for fade animations
- **Motion** - State-based spring animations
- **SlideIn** - Slide animations with larger movement
- **ZoomIn** - Scale-based zoom effects
- **ScaleUp** - Subtle scale animations
- **Stagger** - Sequential child animations

## Design Principles Applied

Following "The Spexop Way":

- **Primitives before patterns** - Core animation primitive for rotation effects
- **Standards before frameworks** - Web platform fundamentals
- **Accessibility before aesthetics** - WCAG AA+ compliance by default
- **Tokens before magic numbers** - Uses design tokens from theme system
- **Composition before complexity** - Simple, composable API

## License

MIT License - See LICENSE file for details
