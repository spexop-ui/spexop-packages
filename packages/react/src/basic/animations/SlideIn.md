# SlideIn Component

**Version**: v0.3.0  
**Type**: Animation Wrapper  
**Category**: Viewport-Triggered Animation

## Overview

The `SlideIn` component provides enhanced sliding animations with customizable direction and distance. It offers smooth sliding effects from any direction for engaging content reveals.

## Features

- ✅ **Custom slide distance** - Adjust slide distance in pixels
- ✅ **Four directions** - Up, down, left, right sliding
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
import { SlideIn } from '@spexop/react';

function App() {
  return (
    <SlideIn direction="left">
      <h1>Hello, World!</h1>
    </SlideIn>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "left" \| "right"` | `"up"` | Direction of slide animation |
| `distance` | `number` | `20` | Distance to slide in pixels |
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

## Animation Directions

### Up Slide

- **Direction**: `"up"`
- **Transform**: `translateY(20px)` → `translateY(0)`
- **Effect**: Slides up from below

### Down Slide

- **Direction**: `"down"`
- **Transform**: `translateY(-20px)` → `translateY(0)`
- **Effect**: Slides down from above

### Left Slide

- **Direction**: `"left"`
- **Transform**: `translateX(20px)` → `translateX(0)`
- **Effect**: Slides in from the right

### Right Slide

- **Direction**: `"right"`
- **Transform**: `translateX(-20px)` → `translateX(0)`
- **Effect**: Slides in from the left

## Examples

### Basic Slide Animations

```tsx
// Slide up from below
<SlideIn direction="up">
  <Card>Content slides up</Card>
</SlideIn>

// Slide down from above
<SlideIn direction="down">
  <Card>Content slides down</Card>
</SlideIn>

// Slide in from left
<SlideIn direction="left">
  <Card>Content slides from left</Card>
</SlideIn>

// Slide in from right
<SlideIn direction="right">
  <Card>Content slides from right</Card>
</SlideIn>
```

### Custom Slide Distance

```tsx
// Subtle slide
<SlideIn direction="up" distance={10}>
  <Card>Subtle slide up</Card>
</SlideIn>

// Dramatic slide
<SlideIn direction="left" distance={100}>
  <Card>Dramatic slide from left</Card>
</SlideIn>

// No slide (just fade)
<SlideIn direction="up" distance={0}>
  <Card>Fade only</Card>
</SlideIn>
```

### Page Load Sequence

```tsx
function Hero() {
  return (
    <div className="hero">
      <SlideIn direction="up" delay={0} duration={600}>
        <h1>Welcome to Spexop</h1>
      </SlideIn>
      <SlideIn direction="left" delay={200} duration={600} distance={30}>
        <p className="subtitle">Build faster with design systems</p>
      </SlideIn>
      <SlideIn direction="right" delay={400} duration={600} distance={25}>
        <button>Get Started</button>
      </SlideIn>
    </div>
  );
}
```

### Card Grid with Varied Slides

```tsx
function FeatureGrid() {
  const features = [
    { title: "Fast", direction: "up", distance: 20 },
    { title: "Secure", direction: "down", distance: 25 },
    { title: "Scalable", direction: "left", distance: 30 },
    { title: "Reliable", direction: "right", distance: 15 },
  ];

  return (
    <div className="feature-grid">
      {features.map((feature, index) => (
        <SlideIn
          key={feature.title}
          direction={feature.direction}
          distance={feature.distance}
          delay={index * 100}
        >
          <FeatureCard title={feature.title} />
        </SlideIn>
      ))}
    </div>
  );
}
```

### Animation Callbacks

```tsx
function AnimatedCard() {
  const handleAnimationStart = () => {
    console.log('Slide animation started');
  };

  const handleAnimationComplete = () => {
    console.log('Slide animation finished');
  };

  return (
    <SlideIn
      direction="up"
      distance={30}
      duration={700}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      <Card>Card with callbacks</Card>
    </SlideIn>
  );
}
```

### Conditional Animation

```tsx
function ConditionalSlide({ shouldAnimate, children }) {
  return (
    <SlideIn 
      direction="up"
      distance={25}
      disabled={!shouldAnimate}
      duration={500}
    >
      {children}
    </SlideIn>
  );
}

// Usage
<ConditionalSlide shouldAnimate={user.prefersAnimation}>
  <Card>Only animates when enabled</Card>
</ConditionalSlide>
```

### Advanced Customization

```tsx
<SlideIn
  direction="left"
  distance={50}
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
  className="custom-slide"
  hardwareAcceleration={true}
  rootMargin="50px"
>
  <Card>Highly customized slide</Card>
</SlideIn>
```

### Different Timing Functions

```tsx
// Bouncy slide
<SlideIn direction="up" timing="bounce" duration={600}>
  <Card>Bouncy slide</Card>
</SlideIn>

// Elastic slide
<SlideIn direction="left" timing="elastic" duration={800}>
  <Card>Elastic slide</Card>
</SlideIn>

// Linear slide
<SlideIn direction="right" timing="linear" duration={400}>
  <Card>Linear slide</Card>
</SlideIn>
```

### With Custom Styles

```tsx
<SlideIn
  direction="up"
  distance={30}
  style={{ 
    width: '100%', 
    maxWidth: '400px',
    borderRadius: '12px'
  }}
  className="custom-slide-card"
>
  <Card>Custom styled sliding card</Card>
</SlideIn>
```

### Repeated Animations

```tsx
// Animate every time element enters viewport
<SlideIn direction="up" once={false}>
  <Card>Animates on every scroll</Card>
</SlideIn>
```

### Different Thresholds

```tsx
// Trigger when 50% of element is visible
<SlideIn direction="up" threshold={0.5}>
  <Section>Waits until half visible</Section>
</SlideIn>

// Trigger immediately when any part is visible
<SlideIn direction="left" threshold={0}>
  <Section>Triggers as soon as visible</Section>
</SlideIn>
```

## Advanced Patterns

### Orchestrated Slide Sequence

```tsx
function OrchestratedHero() {
  return (
    <div className="hero">
      <SlideIn direction="up" delay={0} duration={600} distance={20}>
        <span className="eyebrow">INTRODUCING</span>
      </SlideIn>

      <SlideIn direction="left" delay={200} duration={800} distance={40}>
        <h1 className="title">Next Generation Design</h1>
      </SlideIn>

      <SlideIn direction="right" delay={400} duration={600} distance={30}>
        <p className="subtitle">
          Build faster with our component library
        </p>
      </SlideIn>
    </div>
  );
}
```

### Loading State Animation

```tsx
function LoadingState({ isLoading, data }) {
  if (isLoading) {
    return (
      <SlideIn direction="up" distance={15} duration={300}>
        <div className="spinner">Loading...</div>
      </SlideIn>
    );
  }

  return (
    <SlideIn direction="up" distance={25} duration={600}>
      <div className="content">{data}</div>
    </SlideIn>
  );
}
```

### Page Transition

```tsx
function PageTransition({ location, children }) {
  return (
    <SlideIn key={location.pathname} direction="up" distance={20} duration={400}>
      {children}
    </SlideIn>
  );
}
```

### Form Field Reveal

```tsx
function AnimatedForm() {
  return (
    <form>
      <SlideIn direction="up" delay={0} distance={15}>
        <input type="text" placeholder="Name" />
      </SlideIn>
      <SlideIn direction="left" delay={100} distance={20}>
        <input type="email" placeholder="Email" />
      </SlideIn>
      <SlideIn direction="right" delay={200} distance={20}>
        <input type="tel" placeholder="Phone" />
      </SlideIn>
      <SlideIn direction="up" delay={300} distance={25}>
        <textarea placeholder="Message" />
      </SlideIn>
      <SlideIn direction="down" delay={400} distance={10}>
        <button type="submit">Send</button>
      </SlideIn>
    </form>
  );
}
```

### Carousel Slide Effect

```tsx
function CarouselSlide({ children, isActive, direction }) {
  return (
    <SlideIn 
      direction={direction}
      distance={isActive ? 0 : 100}
      duration={500}
      timing="ease-in-out"
    >
      <div className="carousel-item">
        {children}
      </div>
    </SlideIn>
  );
}
```

### Staggered Grid Animation

```tsx
function StaggeredGrid({ items }) {
  return (
    <div className="grid">
      {items.map((item, index) => (
        <SlideIn
          key={item.id}
          direction={index % 2 === 0 ? "up" : "down"}
          distance={20 + (index % 3) * 10}
          delay={index * 50}
        >
          <GridItem item={item} />
        </SlideIn>
      ))}
    </div>
  );
}
```

### Modal Slide In

```tsx
function ModalSlideIn({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <SlideIn direction="up" distance={50} duration={300}>
      <div className="modal">
        {children}
      </div>
    </SlideIn>
  );
}
```

## Accessibility

### Reduced Motion Support

The component automatically respects `prefers-reduced-motion` by default:

```tsx
// Automatically disabled when user prefers reduced motion
<SlideIn direction="up">
  <Content />
</SlideIn>

// Manually disable reduced motion respect
<SlideIn direction="up" respectReducedMotion={false}>
  <Content />
</SlideIn>
```

### ARIA Attributes

The component includes proper ARIA attributes:

- `aria-hidden` - Set to `true` when not visible
- `role="presentation"` - Indicates decorative content

## Performance

### Hardware Acceleration

Enable GPU acceleration for better performance:

```tsx
<SlideIn direction="up" hardwareAcceleration>
  <Content />
</SlideIn>
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
<SlideIn direction="left" duration={700}>
  <Content />
</SlideIn>

// v0.3.0 - New features (additive)
<SlideIn 
  direction="left"
  distance={30}
  duration={700}
  onAnimationStart={() => console.log('Starting...')}
  onAnimationComplete={() => console.log('Complete!')}
  disabled={!shouldAnimate}
>
  <Content />
</SlideIn>
```

## Related Components

- **Reveal** - Universal animation wrapper
- **FadeIn** - Convenient wrapper for fade animations
- **Motion** - State-based spring animations
- **RotateIn** - Rotation with scale and fade effects
- **ScaleUp** - Scale-based zoom effects
- **ZoomIn** - Scale-based zoom effects
- **Stagger** - Sequential child animations

## Design Principles Applied

Following "The Spexop Way":

- **Primitives before patterns** - Core animation primitive for slide effects
- **Standards before frameworks** - Web platform fundamentals
- **Accessibility before aesthetics** - WCAG AA+ compliance by default
- **Tokens before magic numbers** - Uses design tokens from theme system
- **Composition before complexity** - Simple, composable API

## License

MIT License - See LICENSE file for details
