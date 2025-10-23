# ScaleUp Component

**Version**: v0.3.0  
**Type**: Animation Wrapper  
**Category**: Viewport-Triggered Animation

## Overview

The `ScaleUp` component provides enhanced scaling animations with customizable scale ranges. It offers smooth scaling effects from small to normal size (or beyond) for engaging content reveals.

## Features

- ✅ **Custom scale ranges** - Adjust initial and final scale factors
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
import { ScaleUp } from '@spexop/react';

function App() {
  return (
    <ScaleUp>
      <h1>Hello, World!</h1>
    </ScaleUp>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fromScale` | `number` | `0.92` | Initial scale factor (0-1, where 1 is normal size) |
| `toScale` | `number` | `1` | Final scale factor (0-2, where 1 is normal size) |
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

### Default Scaling

- **From Scale**: 0.92 (slightly smaller than normal)
- **To Scale**: 1 (normal size)
- **Opacity**: Fades from 0 to 1
- **Duration**: 400ms with ease-out timing

### Custom Scaling

- **From Scale**: Customizable from 0 to 2+
- **To Scale**: Any positive number (0.5 to 2.0 recommended)
- **Combined**: Scale + fade for dynamic effects

## Examples

### Basic Scale Animations

```tsx
// Default subtle scale up
<ScaleUp>
  <Card>Content scales up subtly</Card>
</ScaleUp>

// More dramatic scale effect
<ScaleUp fromScale={0.8} toScale={1.1}>
  <Card>Dramatic scale effect</Card>
</ScaleUp>

// Scale down effect
<ScaleUp fromScale={1.2} toScale={0.9}>
  <Card>Scale down effect</Card>
</ScaleUp>
```

### Page Load Sequence

```tsx
function Hero() {
  return (
    <div className="hero">
      <ScaleUp delay={0} duration={600}>
        <h1>Welcome to Spexop</h1>
      </ScaleUp>
      <ScaleUp delay={200} duration={600} fromScale={0.9}>
        <p className="subtitle">Build faster with design systems</p>
      </ScaleUp>
      <ScaleUp delay={400} duration={600} fromScale={0.85}>
        <button>Get Started</button>
      </ScaleUp>
    </div>
  );
}
```

### Card Grid with Varied Scales

```tsx
function FeatureGrid() {
  const features = [
    { title: "Fast", fromScale: 0.8, toScale: 1.05 },
    { title: "Secure", fromScale: 0.9, toScale: 1.1 },
    { title: "Scalable", fromScale: 0.85, toScale: 1.02 },
    { title: "Reliable", fromScale: 0.88, toScale: 1.08 },
  ];

  return (
    <div className="feature-grid">
      {features.map((feature, index) => (
        <ScaleUp
          key={feature.title}
          fromScale={feature.fromScale}
          toScale={feature.toScale}
          delay={index * 100}
        >
          <FeatureCard title={feature.title} />
        </ScaleUp>
      ))}
    </div>
  );
}
```

### Custom Scale Ranges

```tsx
// Dramatic scale up with overshoot
<ScaleUp fromScale={0.5} toScale={1.2} duration={800}>
  <Card>Dramatic entrance</Card>
</ScaleUp>

// Subtle scale up
<ScaleUp fromScale={0.95} toScale={1.02} duration={300}>
  <Card>Subtle scale effect</Card>
</ScaleUp>

// Scale down effect
<ScaleUp fromScale={1.1} toScale={0.95} duration={500}>
  <Card>Scale down effect</Card>
</ScaleUp>
```

### Animation Callbacks

```tsx
function AnimatedCard() {
  const handleAnimationStart = () => {
    console.log('Scale animation started');
  };

  const handleAnimationComplete = () => {
    console.log('Scale animation finished');
  };

  return (
    <ScaleUp
      fromScale={0.8}
      toScale={1.1}
      duration={700}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      <Card>Card with callbacks</Card>
    </ScaleUp>
  );
}
```

### Conditional Animation

```tsx
function ConditionalScale({ shouldAnimate, children }) {
  return (
    <ScaleUp 
      fromScale={0.9}
      toScale={1.05}
      disabled={!shouldAnimate}
      duration={500}
    >
      {children}
    </ScaleUp>
  );
}

// Usage
<ConditionalScale shouldAnimate={user.prefersAnimation}>
  <Card>Only animates when enabled</Card>
</ConditionalScale>
```

### Advanced Customization

```tsx
<ScaleUp
  fromScale={0.6}
  toScale={1.3}
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
  className="custom-scale"
  hardwareAcceleration={true}
  rootMargin="50px"
>
  <Card>Highly customized scale</Card>
</ScaleUp>
```

### Different Timing Functions

```tsx
// Bouncy scale
<ScaleUp fromScale={0.8} timing="bounce" duration={600}>
  <Card>Bouncy scale</Card>
</ScaleUp>

// Elastic scale
<ScaleUp fromScale={0.7} timing="elastic" duration={800}>
  <Card>Elastic scale</Card>
</ScaleUp>

// Linear scale
<ScaleUp fromScale={0.9} timing="linear" duration={400}>
  <Card>Linear scale</Card>
</ScaleUp>
```

### With Custom Styles

```tsx
<ScaleUp
  fromScale={0.85}
  toScale={1.08}
  style={{ 
    width: '100%', 
    maxWidth: '400px',
    borderRadius: '12px'
  }}
  className="custom-scale-card"
>
  <Card>Custom styled scaling card</Card>
</ScaleUp>
```

### Repeated Animations

```tsx
// Animate every time element enters viewport
<ScaleUp fromScale={0.9} once={false}>
  <Card>Animates on every scroll</Card>
</ScaleUp>
```

### Different Thresholds

```tsx
// Trigger when 50% of element is visible
<ScaleUp fromScale={0.8} threshold={0.5}>
  <Section>Waits until half visible</Section>
</ScaleUp>

// Trigger immediately when any part is visible
<ScaleUp fromScale={0.9} threshold={0}>
  <Section>Triggers as soon as visible</Section>
</ScaleUp>
```

## Advanced Patterns

### Orchestrated Scale Sequence

```tsx
function OrchestratedHero() {
  return (
    <div className="hero">
      <ScaleUp fromScale={0.95} delay={0} duration={600}>
        <span className="eyebrow">INTRODUCING</span>
      </ScaleUp>

      <ScaleUp fromScale={0.8} delay={200} duration={800}>
        <h1 className="title">Next Generation Design</h1>
      </ScaleUp>

      <ScaleUp fromScale={0.9} delay={400} duration={600}>
        <p className="subtitle">
          Build faster with our component library
        </p>
      </ScaleUp>
    </div>
  );
}
```

### Loading State Animation

```tsx
function LoadingState({ isLoading, data }) {
  if (isLoading) {
    return (
      <ScaleUp fromScale={0.9} duration={300}>
        <div className="spinner">Loading...</div>
      </ScaleUp>
    );
  }

  return (
    <ScaleUp fromScale={0.8} duration={600}>
      <div className="content">{data}</div>
    </ScaleUp>
  );
}
```

### Page Transition

```tsx
function PageTransition({ location, children }) {
  return (
    <ScaleUp key={location.pathname} fromScale={0.9} duration={400}>
      {children}
    </ScaleUp>
  );
}
```

### Form Field Reveal

```tsx
function AnimatedForm() {
  return (
    <form>
      <ScaleUp fromScale={0.95} delay={0}>
        <input type="text" placeholder="Name" />
      </ScaleUp>
      <ScaleUp fromScale={0.9} delay={100}>
        <input type="email" placeholder="Email" />
      </ScaleUp>
      <ScaleUp fromScale={0.95} delay={200}>
        <input type="tel" placeholder="Phone" />
      </ScaleUp>
      <ScaleUp fromScale={0.9} delay={300}>
        <textarea placeholder="Message" />
      </ScaleUp>
      <ScaleUp fromScale={0.85} delay={400}>
        <button type="submit">Send</button>
      </ScaleUp>
    </form>
  );
}
```

### Pulse Effect

```tsx
function PulseCard({ children, isActive }) {
  return (
    <ScaleUp 
      fromScale={isActive ? 1 : 0.95} 
      toScale={isActive ? 1.05 : 1}
      duration={300}
      timing="ease-in-out"
    >
      <div className="pulse-card">
        {children}
      </div>
    </ScaleUp>
  );
}
```

### Zoom In Effect

```tsx
function ZoomInCard({ children, isVisible }) {
  return (
    <ScaleUp 
      fromScale={0.3} 
      toScale={1}
      duration={600}
      timing="elastic"
    >
      <div className="zoom-card">
        {children}
      </div>
    </ScaleUp>
  );
}
```

## Accessibility

### Reduced Motion Support

The component automatically respects `prefers-reduced-motion` by default:

```tsx
// Automatically disabled when user prefers reduced motion
<ScaleUp fromScale={0.8}>
  <Content />
</ScaleUp>

// Manually disable reduced motion respect
<ScaleUp fromScale={0.8} respectReducedMotion={false}>
  <Content />
</ScaleUp>
```

### ARIA Attributes

The component includes proper ARIA attributes:

- `aria-hidden` - Set to `true` when not visible
- `role="presentation"` - Indicates decorative content

## Performance

### Hardware Acceleration

Enable GPU acceleration for better performance:

```tsx
<ScaleUp fromScale={0.8} hardwareAcceleration>
  <Content />
</ScaleUp>
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
<ScaleUp duration={600} timing="elastic">
  <Content />
</ScaleUp>

// v0.3.0 - New features (additive)
<ScaleUp 
  fromScale={0.8}
  toScale={1.1}
  duration={600}
  onAnimationStart={() => console.log('Starting...')}
  onAnimationComplete={() => console.log('Complete!')}
  disabled={!shouldAnimate}
>
  <Content />
</ScaleUp>
```

## Related Components

- **Reveal** - Universal animation wrapper
- **FadeIn** - Convenient wrapper for fade animations
- **Motion** - State-based spring animations
- **RotateIn** - Rotation with scale and fade effects
- **SlideIn** - Slide animations with larger movement
- **ZoomIn** - Scale-based zoom effects
- **Stagger** - Sequential child animations

## Design Principles Applied

Following "The Spexop Way":

- **Primitives before patterns** - Core animation primitive for scale effects
- **Standards before frameworks** - Web platform fundamentals
- **Accessibility before aesthetics** - WCAG AA+ compliance by default
- **Tokens before magic numbers** - Uses design tokens from theme system
- **Composition before complexity** - Simple, composable API

## License

MIT License - See LICENSE file for details
