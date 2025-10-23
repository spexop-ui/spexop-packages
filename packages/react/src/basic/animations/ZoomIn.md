# ZoomIn Component

**Version**: v0.3.0  
**Type**: Animation Wrapper  
**Category**: Viewport-Triggered Animation

## Overview

The `ZoomIn` component provides enhanced zoom animations with customizable scale ranges and zoom types. It offers smooth zoom effects for engaging content reveals with both zoom in and zoom out capabilities.

## Features

- ✅ **Zoom types** - Zoom in and zoom out animations
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
import { ZoomIn } from '@spexop/react';

function App() {
  return (
    <ZoomIn type="in">
      <h1>Hello, World!</h1>
    </ZoomIn>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"in" \| "out"` | `"in"` | Zoom animation type |
| `fromScale` | `number` | `0.95` (in) / `1.05` (out) | Initial scale factor (0-1, where 1 is normal size) |
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

## Zoom Types

### Zoom In

- **Type**: `"in"`
- **Default Scale**: 0.95 → 1
- **Effect**: Scales up from smaller to normal size
- **Use case**: Content reveals, attention-grabbing elements

### Zoom Out

- **Type**: `"out"`
- **Default Scale**: 1.05 → 1
- **Effect**: Scales down from larger to normal size
- **Use case**: Subtle reveals, gentle entrances

## Examples

### Basic Zoom Animations

```tsx
// Zoom in from smaller size
<ZoomIn type="in">
  <Card>Content zooms in</Card>
</ZoomIn>

// Zoom out from larger size
<ZoomIn type="out">
  <Card>Content zooms out</Card>
</ZoomIn>
```

### Custom Scale Ranges

```tsx
// Dramatic zoom in
<ZoomIn type="in" fromScale={0.5} toScale={1.2}>
  <Card>Dramatic zoom in</Card>
</ZoomIn>

// Subtle zoom out
<ZoomIn type="out" fromScale={1.02} toScale={0.98}>
  <Card>Subtle zoom out</Card>
</ZoomIn>

// Reverse zoom effect
<ZoomIn type="in" fromScale={1.1} toScale={0.9}>
  <Card>Reverse zoom</Card>
</ZoomIn>
```

### Page Load Sequence

```tsx
function Hero() {
  return (
    <div className="hero">
      <ZoomIn type="in" delay={0} duration={600}>
        <h1>Welcome to Spexop</h1>
      </ZoomIn>
      <ZoomIn type="out" delay={200} duration={600} fromScale={1.1}>
        <p className="subtitle">Build faster with design systems</p>
      </ZoomIn>
      <ZoomIn type="in" delay={400} duration={600} fromScale={0.8}>
        <button>Get Started</button>
      </ZoomIn>
    </div>
  );
}
```

### Card Grid with Varied Zooms

```tsx
function FeatureGrid() {
  const features = [
    { title: "Fast", type: "in", fromScale: 0.9 },
    { title: "Secure", type: "out", fromScale: 1.1 },
    { title: "Scalable", type: "in", fromScale: 0.85 },
    { title: "Reliable", type: "out", fromScale: 1.05 },
  ];

  return (
    <div className="feature-grid">
      {features.map((feature, index) => (
        <ZoomIn
          key={feature.title}
          type={feature.type}
          fromScale={feature.fromScale}
          delay={index * 100}
        >
          <FeatureCard title={feature.title} />
        </ZoomIn>
      ))}
    </div>
  );
}
```

### Animation Callbacks

```tsx
function AnimatedCard() {
  const handleAnimationStart = () => {
    console.log('Zoom animation started');
  };

  const handleAnimationComplete = () => {
    console.log('Zoom animation finished');
  };

  return (
    <ZoomIn
      type="in"
      fromScale={0.8}
      toScale={1.1}
      duration={700}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      <Card>Card with callbacks</Card>
    </ZoomIn>
  );
}
```

### Conditional Animation

```tsx
function ConditionalZoom({ shouldAnimate, children }) {
  return (
    <ZoomIn 
      type="in"
      fromScale={0.9}
      toScale={1.05}
      disabled={!shouldAnimate}
      duration={500}
    >
      {children}
    </ZoomIn>
  );
}

// Usage
<ConditionalZoom shouldAnimate={user.prefersAnimation}>
  <Card>Only animates when enabled</Card>
</ConditionalZoom>
```

### Advanced Customization

```tsx
<ZoomIn
  type="out"
  fromScale={1.3}
  toScale={0.8}
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
  className="custom-zoom"
  hardwareAcceleration={true}
  rootMargin="50px"
>
  <Card>Highly customized zoom</Card>
</ZoomIn>
```

### Different Timing Functions

```tsx
// Bouncy zoom
<ZoomIn type="in" timing="bounce" duration={600}>
  <Card>Bouncy zoom</Card>
</ZoomIn>

// Elastic zoom
<ZoomIn type="out" timing="elastic" duration={800}>
  <Card>Elastic zoom</Card>
</ZoomIn>

// Linear zoom
<ZoomIn type="in" timing="linear" duration={400}>
  <Card>Linear zoom</Card>
</ZoomIn>
```

### With Custom Styles

```tsx
<ZoomIn
  type="in"
  fromScale={0.85}
  toScale={1.08}
  style={{ 
    width: '100%', 
    maxWidth: '400px',
    borderRadius: '12px'
  }}
  className="custom-zoom-card"
>
  <Card>Custom styled zooming card</Card>
</ZoomIn>
```

### Repeated Animations

```tsx
// Animate every time element enters viewport
<ZoomIn type="in" once={false}>
  <Card>Animates on every scroll</Card>
</ZoomIn>
```

### Different Thresholds

```tsx
// Trigger when 50% of element is visible
<ZoomIn type="in" threshold={0.5}>
  <Section>Waits until half visible</Section>
</ZoomIn>

// Trigger immediately when any part is visible
<ZoomIn type="out" threshold={0}>
  <Section>Triggers as soon as visible</Section>
</ZoomIn>
```

## Advanced Patterns

### Orchestrated Zoom Sequence

```tsx
function OrchestratedHero() {
  return (
    <div className="hero">
      <ZoomIn type="in" delay={0} duration={600} fromScale={0.9}>
        <span className="eyebrow">INTRODUCING</span>
      </ZoomIn>

      <ZoomIn type="out" delay={200} duration={800} fromScale={1.2}>
        <h1 className="title">Next Generation Design</h1>
      </ZoomIn>

      <ZoomIn type="in" delay={400} duration={600} fromScale={0.8}>
        <p className="subtitle">
          Build faster with our component library
        </p>
      </ZoomIn>
    </div>
  );
}
```

### Loading State Animation

```tsx
function LoadingState({ isLoading, data }) {
  if (isLoading) {
    return (
      <ZoomIn type="in" fromScale={0.9} duration={300}>
        <div className="spinner">Loading...</div>
      </ZoomIn>
    );
  }

  return (
    <ZoomIn type="in" fromScale={0.8} duration={600}>
      <div className="content">{data}</div>
    </ZoomIn>
  );
}
```

### Page Transition

```tsx
function PageTransition({ location, children }) {
  return (
    <ZoomIn key={location.pathname} type="in" fromScale={0.9} duration={400}>
      {children}
    </ZoomIn>
  );
}
```

### Form Field Reveal

```tsx
function AnimatedForm() {
  return (
    <form>
      <ZoomIn type="in" delay={0} fromScale={0.95}>
        <input type="text" placeholder="Name" />
      </ZoomIn>
      <ZoomIn type="out" delay={100} fromScale={1.05}>
        <input type="email" placeholder="Email" />
      </ZoomIn>
      <ZoomIn type="in" delay={200} fromScale={0.9}>
        <input type="tel" placeholder="Phone" />
      </ZoomIn>
      <ZoomIn type="out" delay={300} fromScale={1.1}>
        <textarea placeholder="Message" />
      </ZoomIn>
      <ZoomIn type="in" delay={400} fromScale={0.85}>
        <button type="submit">Send</button>
      </ZoomIn>
    </form>
  );
}
```

### Image Gallery Zoom

```tsx
function ImageGallery({ images }) {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <ZoomIn
          key={image.id}
          type={index % 2 === 0 ? "in" : "out"}
          fromScale={index % 2 === 0 ? 0.8 : 1.2}
          delay={index * 100}
        >
          <img src={image.src} alt={image.alt} />
        </ZoomIn>
      ))}
    </div>
  );
}
```

### Modal Zoom Effect

```tsx
function ModalZoom({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <ZoomIn type="in" fromScale={0.3} duration={300}>
      <div className="modal">
        {children}
      </div>
    </ZoomIn>
  );
}
```

### Card Hover Zoom

```tsx
function HoverZoomCard({ children, isHovered }) {
  return (
    <ZoomIn 
      type="in"
      fromScale={isHovered ? 1 : 0.95} 
      toScale={isHovered ? 1.05 : 1}
      duration={300}
      timing="ease-in-out"
    >
      <div className="hover-card">
        {children}
      </div>
    </ZoomIn>
  );
}
```

## Accessibility

### Reduced Motion Support

The component automatically respects `prefers-reduced-motion` by default:

```tsx
// Automatically disabled when user prefers reduced motion
<ZoomIn type="in">
  <Content />
</ZoomIn>

// Manually disable reduced motion respect
<ZoomIn type="in" respectReducedMotion={false}>
  <Content />
</ZoomIn>
```

### ARIA Attributes

The component includes proper ARIA attributes:

- `aria-hidden` - Set to `true` when not visible
- `role="presentation"` - Indicates decorative content

## Performance

### Hardware Acceleration

Enable GPU acceleration for better performance:

```tsx
<ZoomIn type="in" hardwareAcceleration>
  <Content />
</ZoomIn>
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
<ZoomIn type="in" duration={500}>
  <Content />
</ZoomIn>

// v0.3.0 - New features (additive)
<ZoomIn 
  type="in"
  fromScale={0.8}
  toScale={1.1}
  duration={500}
  onAnimationStart={() => console.log('Starting...')}
  onAnimationComplete={() => console.log('Complete!')}
  disabled={!shouldAnimate}
>
  <Content />
</ZoomIn>
```

## Related Components

- **Reveal** - Universal animation wrapper
- **FadeIn** - Convenient wrapper for fade animations
- **Motion** - State-based spring animations
- **RotateIn** - Rotation with scale and fade effects
- **ScaleUp** - Scale-based zoom effects
- **SlideIn** - Slide animations with direction control
- **Stagger** - Sequential child animations

## Design Principles Applied

Following "The Spexop Way":

- **Primitives before patterns** - Core animation primitive for zoom effects
- **Standards before frameworks** - Web platform fundamentals
- **Accessibility before aesthetics** - WCAG AA+ compliance by default
- **Tokens before magic numbers** - Uses design tokens from theme system
- **Composition before complexity** - Simple, composable API

## License

MIT License - See LICENSE file for details
