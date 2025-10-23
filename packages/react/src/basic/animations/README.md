# Animation Components

Smooth, performant animation utilities for React applications following Spexop design principles.

**See [USAGE-GUIDE.md](./USAGE-GUIDE.md) for comprehensive usage examples, best practices, and troubleshooting.**

**!!! IMPORTANT !!!**
This documentation is automatically synced from the spexop-packages repository. Last sync: 2025-10-22
It's read-only and should be edited in spexop-packages repository. Please don't edit this file and the content of the components directly.

**🆕 NEW: Enhanced Motion Component**
The Motion component now includes 12 animation types, 10 spring presets, gesture support, and hardware acceleration for smooth, natural animations with physics-based motion.

## Features

✅ **Standards Before Frameworks** - Native CSS transitions, IntersectionObserver API, RequestAnimationFrame  
✅ **Accessibility First** - Respects `prefers-reduced-motion`, no blocking interactions  
✅ **Performance Optimized** - 60fps animations using transform/opacity only  
✅ **Tokens Before Magic** - Configurable durations, delays, and timing functions  
✅ **Viewport Triggered** - Scroll-based animations with IntersectionObserver  
✅ **Physics-Based Motion** - Spring animations with natural movement  
✅ **Flexible Composition** - Mix and match components for complex sequences  
✅ **TypeScript First** - Full type safety with comprehensive interfaces  
✅ **Zero Dependencies** - Pure React, no external animation libraries  
✅ **12 Animation Types** - Fade, slide, zoom, rotate, flip, bounce, and shake effects  
✅ **10 Spring Presets** - Physics-based animations with natural motion curves  
✅ **Gesture Support** - Touch, drag, and momentum-based animation triggers  
✅ **Hardware Acceleration** - GPU-optimized animations for 60fps performance  
✅ **3 Timing Systems** - CSS transitions, spring physics, and eased values  
✅ **Sequential Animations** - Stagger component for orchestrated reveals  
✅ **Reduced Motion** - Automatic support for accessibility preferences  
✅ **Enhanced Customization** - 12+ props for fine-tuned control  
✅ **Animation Callbacks** - Lifecycle hooks for animation events  
✅ **Conditional Animation** - Disable animations based on state  
✅ **Custom Scale Ranges** - Define custom from/to scale values for zoom and scale effects  
✅ **Custom Distance Control** - Adjust movement distances for slide and fade animations  
✅ **Custom Angle Control** - Adjust rotation angles for rotate animations  
✅ **Multiple Stagger Directions** - Forward, reverse, center-out, and edges-in patterns  
✅ **Performance Control** - Limit simultaneous animations with maxChildren prop  
✅ **Enhanced Root Margin** - Custom intersection observer root margin control  
✅ **Hardware Acceleration Control** - Toggle GPU acceleration on/off  
✅ **Zoom Type Control** - Choose between "in" and "out" zoom effects  
✅ **Comprehensive Testing** - Full test coverage for all components and features  

## Components

### Core Components

- **Reveal** - Enhanced universal animation wrapper with viewport detection, callbacks, and conditional rendering
- **FadeIn** - Enhanced fade animations with custom distance, opacity, callbacks, and conditional rendering
- **SlideIn** - Enhanced slide animations with custom distance, direction control, callbacks, and conditional rendering
- **ZoomIn** - Enhanced scale-based zoom effects with custom scale ranges, zoom types, callbacks, and conditional rendering
- **RotateIn** - Enhanced rotation with fade, custom angle/scale control, callbacks, and conditional rendering
- **ScaleUp** - Enhanced scale animations with custom scale ranges, callbacks, and conditional rendering
- **Stagger** - Enhanced sequential child animations with multiple directions, callbacks, performance control, and conditional rendering
- **Motion** - Enhanced spring-based physics animations with 12 types, 10 presets, and hardware acceleration
- **GestureMotion** - Motion component with gesture and momentum support

### Custom Hooks

- **useIntersectionObserver** - Viewport detection
- **useSpring** - Enhanced physics-based value interpolation with 10 presets
- **useMotionValue** - Eased value transitions
- **useGestureMotion** - Gesture-based animation triggers with momentum

## Design Principles Applied

### 1. Standards Before Frameworks (Principle #6)

Uses web platform APIs without external dependencies:

```tsx
// Native IntersectionObserver for viewport detection
const observer = new IntersectionObserver(callback, options);

// RequestAnimationFrame for smooth animations
const animate = (time: number) => {
  requestAnimationFrame(animate);
};

// CSS transitions for performance
transition: opacity 400ms ease-out, transform 400ms ease-out;
```

### 2. Accessibility Before Aesthetics (Principle #7)

Respects user preferences automatically:

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .spex-reveal {
    transition-duration: 0.001ms !important;
  }
}
```

All animations:

- Never block user interactions
- Complete within reasonable timeframes
- Provide immediate feedback when disabled

### 3. Tokens Before Magic Numbers (Principle #4)

All timing values are configurable:

```tsx
<Reveal
  duration={400}        // Configurable duration
  delay={200}           // Configurable delay
  timing="ease-out"     // Standard timing function
/>
```

### 4. Composition Before Complexity (Principle #5)

Build complex animations from simple parts:

```tsx
<Stagger delay={100} variant="fadeInUp">
  <FadeIn direction="up">
    <Card>Item 1</Card>
  </FadeIn>
  <SlideIn direction="left">
    <Card>Item 2</Card>
  </SlideIn>
</Stagger>
```

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

### Viewport-Triggered Animations

```tsx
import { Reveal } from '@spexop/react';

function Page() {
  return (
    <Reveal variant="fadeInUp" duration={600}>
      <section>
        <h1>Content appears when scrolled into view</h1>
      </section>
    </Reveal>
  );
}
```

### Enhanced FadeIn Animations

```tsx
import { FadeIn } from '@spexop/react';

function Hero() {
  return (
    <>
      <FadeIn direction="up" delay={0} distance={20}>
        <h1>Title</h1>
      </FadeIn>
      <FadeIn 
        direction="up" 
        delay={200} 
        duration={800}
        timing="bounce"
        onAnimationComplete={() => console.log('Title animated!')}
      >
        <p>Subtitle appears after title</p>
      </FadeIn>
    </>
  );
}
```

### Advanced FadeIn Customization

```tsx
import { FadeIn } from '@spexop/react';

function AdvancedExample() {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  return (
    <FadeIn
      direction="left"
      duration={600}
      delay={300}
      timing="elastic"
      distance={30}
      opacity={{ from: 0.2, to: 0.9 }}
      threshold={0.5}
      once={false}
      disabled={!shouldAnimate}
      onAnimationStart={() => console.log('Animation started')}
      onAnimationComplete={() => console.log('Animation completed')}
      className="custom-fade"
      style={{ marginTop: '20px' }}
    >
      <Card>Highly customized animation</Card>
    </FadeIn>
  );
}
```

### Sequential Animations

```tsx
import { Stagger } from '@spexop/react';

function Features() {
  return (
    <Stagger delay={150} variant="fadeInUp">
      <FeatureCard title="Fast" />
      <FeatureCard title="Reliable" />
      <FeatureCard title="Scalable" />
    </Stagger>
  );
}
```

### Enhanced Physics-Based Motion

```tsx
import { Motion, GestureMotion } from '@spexop/react';
import { useState } from 'react';

function Interactive() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Motion 
      isActive={isOpen} 
      type="slideDown" 
      spring="wobbly"
      distance={30}
      hardwareAcceleration={true}
    >
      <Dropdown>Content</Dropdown>
    </Motion>
  );
}

// Gesture-based animations
function GestureExample() {
  return (
    <GestureMotion 
      type="scale" 
      spring="bouncy"
      enableMomentum={true}
      threshold={10}
    >
      <Card>Touch, drag, or click to animate</Card>
    </GestureMotion>
  );
}
```

### Custom Hooks of the Animations Component

```tsx
import { useIntersectionObserver } from '@spexop/react';

function CustomAnimation() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0 }}>
      Custom animated content
    </div>
  );
}
```

## Enhanced Component APIs

All animation components now feature enhanced APIs with comprehensive customization options:

### FadeIn Component API

The `FadeIn` component provides extensive customization with 15+ props for fine-tuned control:

#### Basic Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "left" \| "right" \| "none"` | `"none"` | Direction of fade animation |
| `duration` | `number` | `400` | Animation duration in milliseconds |
| `delay` | `number` | `0` | Animation delay in milliseconds |
| `timing` | `AnimationTimingFunction` | `"ease-out"` | Animation timing function |
| `once` | `boolean` | `true` | Only animate once when entering viewport |
| `threshold` | `number` | `0.1` | Intersection threshold (0-1) for viewport detection |

#### Enhanced Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `distance` | `number` | `12` | Movement distance in pixels for directional fades |
| `opacity` | `{ from: number; to: number }` | `{ from: 0, to: 1 }` | Custom opacity range |
| `disabled` | `boolean` | `false` | Disable animation entirely |
| `onAnimationStart` | `() => void` | - | Callback fired when animation starts |
| `onAnimationComplete` | `() => void` | - | Callback fired when animation completes |
| `hardwareAcceleration` | `boolean` | `true` | Enable hardware acceleration |
| `rootMargin` | `string` | `"0px"` | Custom root margin for intersection observer |
| `respectReducedMotion` | `boolean` | `true` | Respect prefers-reduced-motion |

### RotateIn Component API

The `RotateIn` component features custom angle and scale control:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `angle` | `number` | `-3` | Rotation angle in degrees (negative = counter-clockwise) |
| `scale` | `number` | `0.97` | Scale factor for the rotation effect |
| ...all FadeIn props | | | |

### ScaleUp Component API

The `ScaleUp` component features custom scale range control:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fromScale` | `number` | `0.92` | Initial scale factor (0-1, where 1 is normal size) |
| `toScale` | `number` | `1` | Final scale factor (0-2, where 1 is normal size) |
| ...all FadeIn props | | | |

### SlideIn Component API

The `SlideIn` component features custom distance and direction control:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "left" \| "right"` | `"up"` | Direction of slide |
| `distance` | `number` | `20` | Distance to slide in pixels |
| ...all FadeIn props | | | |

### ZoomIn Component API

The `ZoomIn` component features custom scale range and zoom type control:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"in" \| "out"` | `"in"` | Zoom variant |
| `fromScale` | `number` | `0.95` for "in", `1.05` for "out` | Initial scale factor |
| `toScale` | `number` | `1` | Final scale factor |
| ...all FadeIn props | | | |

### Stagger Component API

The `Stagger` component features multiple directions and performance control:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"forward" \| "reverse" \| "center-out" \| "edges-in"` | `"forward"` | Stagger direction |
| `maxChildren` | `number` | `Infinity` | Maximum number of children to animate |
| `onAnimationStart` | `(index: number) => void` | - | Callback fired when any animation starts |
| `onAnimationComplete` | `(index: number) => void` | - | Callback fired when any animation completes |
| `onAllAnimationsComplete` | `() => void` | - | Callback fired when all animations complete |
| ...all FadeIn props | | | |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `React.CSSProperties` | - | Custom styles to merge with animation styles |
| `className` | `string` | - | Custom className to add to wrapper |
| `children` | `React.ReactNode` | - | Content to animate |

### Usage Examples

#### Enhanced FadeIn

```tsx
<FadeIn 
  direction="up" 
  distance={30}
  opacity={{ from: 0.3, to: 1 }}
  onAnimationComplete={() => console.log('Done!')}
>
  <Card>Enhanced fade animation</Card>
</FadeIn>
```

#### Enhanced RotateIn

```tsx
<RotateIn 
  angle={-5} 
  scale={0.95}
  duration={600}
  timing="bounce"
  onAnimationStart={() => console.log('Starting rotation')}
>
  <Card>Custom rotation effect</Card>
</RotateIn>
```

#### Enhanced ScaleUp

```tsx
<ScaleUp 
  fromScale={0.8} 
  toScale={1.1}
  duration={500}
  timing="elastic"
  onAnimationComplete={() => console.log('Scale complete')}
>
  <Card>Dramatic scale effect</Card>
</ScaleUp>
```

#### Enhanced SlideIn

```tsx
<SlideIn 
  direction="left" 
  distance={40}
  duration={600}
  timing="ease-out"
  onAnimationStart={() => console.log('Sliding started')}
>
  <Card>Custom slide distance</Card>
</SlideIn>
```

#### Enhanced ZoomIn

```tsx
<ZoomIn 
  type="in"
  fromScale={0.7} 
  toScale={1.05}
  duration={500}
  timing="elastic"
  onAnimationComplete={() => console.log('Zoom complete')}
>
  <Card>Custom zoom effect</Card>
</ZoomIn>
```

#### Enhanced Stagger

```tsx
<Stagger 
  delay={100}
  direction="center-out"
  variant="fadeInUp"
  maxChildren={5}
  onAllAnimationsComplete={() => console.log('All done!')}
>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Stagger>
```

#### Conditional Animation

```tsx
<FadeIn 
  direction="down" 
  disabled={!shouldAnimate}
  onAnimationComplete={() => setAnimationComplete(true)}
>
  <Card>Conditional animation</Card>
</FadeIn>
```

#### Advanced Customization

```tsx
<FadeIn
  direction="right"
  duration={1000}
  delay={500}
  timing="elastic"
  distance={40}
  opacity={{ from: 0.1, to: 1 }}
  threshold={0.3}
  once={false}
  hardwareAcceleration={true}
  rootMargin="50px"
  className="custom-fade"
  style={{ marginTop: '20px' }}
  onAnimationStart={() => console.log('Started')}
  onAnimationComplete={() => console.log('Completed')}
>
  <Card>Fully customized animation</Card>
</FadeIn>
```

## Animation Variants

The `Reveal` component supports 12 animation variants:

### Fade Variants

- `fadeIn` - Simple fade
- `fadeInUp` - Fade with upward movement (12px)
- `fadeInDown` - Fade with downward movement (12px)
- `fadeInLeft` - Fade from left (12px)
- `fadeInRight` - Fade from right (12px)

### Slide Variants

- `slideUp` - Slide upward (20px)
- `slideDown` - Slide downward (20px)
- `slideLeft` - Slide from left (20px)
- `slideRight` - Slide from right (20px)

### Scale Variants

- `zoomIn` - Scale from 95% to 100%
- `zoomOut` - Scale from 105% to 100%
- `scaleUp` - Scale from 92% to 100%
- `rotateIn` - Rotate -3deg with scale 97% to 100%

## Timing Functions

Standard CSS timing functions plus custom curves:

- `linear` - Constant speed
- `ease` - Standard ease
- `ease-in` - Accelerate
- `ease-out` - Decelerate (recommended)
- `ease-in-out` - Accelerate then decelerate
- `bounce` - Bouncy overshoot
- `elastic` - Elastic spring effect

## Spring Presets

For `Motion` component and `useSpring` hook:

### Core Presets

- `default` - Balanced spring (170 stiffness, 26 damping)
- `gentle` - Soft spring (120 stiffness, 14 damping)
- `wobbly` - Bouncy spring (180 stiffness, 12 damping)
- `stiff` - Firm spring (210 stiffness, 20 damping)
- `slow` - Slow spring (280 stiffness, 60 damping)
- `molasses` - Very slow (280 stiffness, 120 damping)

### Enhanced Presets

- `bouncy` - Highly elastic with multiple bounces (200 stiffness, 8 damping)
- `crisp` - Sharp and precise (250 stiffness, 30 damping, 0.8 mass)
- `smooth` - Fluid and elegant (150 stiffness, 22 damping, 1.2 mass)
- `elastic` - Rubber-like with stretch (160 stiffness, 10 damping)

## Animation Types

The Motion component supports 12 different animation types:

### Basic Animations

- `fade` - Simple opacity transition
- `scale` - Scale animation (0.8x to 1x)
- `zoom` - Dramatic scale animation (0.5x to 1x)

### Slide Animations

- `slideDown` - Slide from top to bottom
- `slideUp` - Slide from bottom to top
- `slideLeft` - Slide from right to left
- `slideRight` - Slide from left to right

### 3D Animations

- `rotate` - 180-degree rotation
- `flipX` - Flip around X-axis
- `flipY` - Flip around Y-axis

### Special Effects

- `bounce` - Bounce effect with scale and translation
- `shake` - Oscillating shake animation

## Gesture Support

The GestureMotion component provides touch, mouse, and keyboard interaction:

### Gesture Features

- **Touch Support** - Full touch event handling for mobile devices
- **Mouse Interaction** - Click, drag, and hover support
- **Keyboard Navigation** - Enter and spacebar activation
- **Momentum Physics** - Natural momentum-based animations
- **Threshold Control** - Configurable gesture sensitivity
- **Velocity Tracking** - Real-time velocity calculations

### Gesture Usage Examples

```tsx
// Basic gesture animation
<GestureMotion type="scale" spring="wobbly">
  <Card>Touch me!</Card>
</GestureMotion>

// Advanced gesture configuration
<GestureMotion 
  type="rotate" 
  spring="bouncy"
  threshold={20}
  maxVelocity={2000}
  friction={0.9}
  enableMomentum={true}
>
  <InteractiveCard>Advanced gestures</InteractiveCard>
</GestureMotion>
```

## Performance

### Optimizations

- Only animates `transform` and `opacity` (GPU-accelerated)
- Uses IntersectionObserver for efficient viewport detection
- Animations disconnect after completion with `once={true}`
- RequestAnimationFrame for smooth 60fps motion
- Automatic cleanup prevents memory leaks

### Best Practices

```tsx
// ✅ Good: Subtle, fast animations
<FadeIn duration={400} direction="up">
  <Card />
</FadeIn>

// ✅ Good: Enhanced customization
<FadeIn 
  direction="up" 
  duration={600} 
  distance={20}
  timing="ease-out"
  onAnimationComplete={() => console.log('Done')}
>
  <Card />
</FadeIn>

// ✅ Good: Conditional animation
<FadeIn 
  direction="left" 
  disabled={!shouldAnimate}
  opacity={{ from: 0.3, to: 1 }}
>
  <Card />
</FadeIn>

// ❌ Avoid: Long, distracting animations
<FadeIn duration={2000} direction="up">
  <Card />
</FadeIn>

// ❌ Avoid: Excessive customization
<FadeIn 
  direction="up" 
  distance={100}
  duration={3000}
  timing="bounce"
  opacity={{ from: 0.1, to: 0.5 }}
  delay={1000}
>
  <Card />
</FadeIn>

// ✅ Good: Stagger with reasonable delays
<Stagger delay={80}>
  {items.map(item => <Card key={item.id} />)}
</Stagger>

// ❌ Avoid: Too many simultaneous animations
{items.map(item => (
  <ZoomIn><RotateIn><SlideIn><Card /></SlideIn></RotateIn></ZoomIn>
))}
```

## Accessibility

### Reduced Motion Support

All components automatically respect `prefers-reduced-motion`:

```tsx
// Animations automatically disable/speed up
// No additional code needed
<FadeIn direction="up">
  <Content />
</FadeIn>
```

### Non-Blocking

Animations never prevent user interaction:

- Content is immediately accessible
- Animations are decorative only
- No interactive elements depend on animation completion

### Semantic HTML

All animation wrappers use semantic `<div>` elements:

```tsx
<div className="spex-reveal spex-reveal--fadeInUp">
  {children}
</div>
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

**Requirements**:

- IntersectionObserver API
- CSS transforms
- RequestAnimationFrame
- ES2020 features

## Integration with Spexop Components

Animations work seamlessly with all Spexop components:

```tsx
import { FadeIn, SlideIn, Stagger } from '@spexop/react';
import { Card, Button, Grid } from '@spexop/react';

function ProductGrid() {
  return (
    <Grid columns={3} gap={6}>
      <Stagger delay={100} variant="fadeInUp">
        {products.map(product => (
          <Card key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <Button>View Details</Button>
          </Card>
        ))}
      </Stagger>
    </Grid>
  );
}
```

## Common Patterns

### Page Load Sequence

```tsx
<>
  <FadeIn direction="up" delay={0}>
    <Header />
  </FadeIn>
  <FadeIn direction="up" delay={200}>
    <MainContent />
  </FadeIn>
  <FadeIn direction="up" delay={400}>
    <Footer />
  </FadeIn>
</>
```

### Scroll-Triggered Sections

```tsx
<Reveal variant="fadeInUp" threshold={0.3} once={true}>
  <Section>
    <h2>Features</h2>
    <p>Appears when 30% visible</p>
  </Section>
</Reveal>
```

### Interactive State Changes

```tsx
<Motion isActive={isExpanded} type="slideDown" spring="gentle">
  <Panel>Expandable content</Panel>
</Motion>
```

### List Animations

```tsx
<Stagger delay={80} variant="fadeInUp">
  {items.map(item => (
    <ListItem key={item.id}>{item.name}</ListItem>
  ))}
</Stagger>
```

## API Reference

### Reveal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `AnimationVariant` | `"fadeIn"` | Animation type |
| `duration` | `number` | `400` | Animation duration (ms) |
| `delay` | `number` | `0` | Animation delay (ms) |
| `timing` | `AnimationTimingFunction` | `"ease-out"` | Timing function |
| `once` | `boolean` | `true` | Animate only once |
| `threshold` | `number` | `0.1` | Visibility threshold (0-1) |
| `style` | `CSSProperties` | - | Custom styles |
| `className` | `string` | - | Custom class |

### FadeIn Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "left" \| "right" \| "none"` | `"none"` | Fade direction |
| ...all Reveal props | | | |

### SlideIn Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "left" \| "right"` | `"up"` | Slide direction |
| ...all Reveal props | | | |

### Motion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isActive` | `boolean` | - | **Required**. Active state |
| `type` | `"fade" \| "scale" \| "zoom" \| "slideDown" \| "slideUp" \| "slideLeft" \| "slideRight" \| "rotate" \| "flipX" \| "flipY" \| "bounce" \| "shake"` | `"fade"` | Animation type |
| `spring` | `SpringConfig \| SpringPreset` | `"default"` | Spring configuration |
| `distance` | `number` | `20` | Animation distance/scale multiplier |
| `hardwareAcceleration` | `boolean` | `true` | Enable hardware acceleration |
| `style` | `CSSProperties` | - | Custom styles |
| `className` | `string` | - | Custom class |
| `children` | `ReactNode` | - | Content to animate |

### GestureMotion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `AnimationType` | `"scale"` | Animation type |
| `spring` | `SpringPreset` | `"gentle"` | Spring preset |
| `threshold` | `number` | `10` | Minimum distance to trigger gesture |
| `maxVelocity` | `number` | `1000` | Maximum velocity for momentum |
| `friction` | `number` | `0.95` | Friction for momentum decay |
| `enableMomentum` | `boolean` | `true` | Enable momentum-based animation |
| `enableGestures` | `boolean` | `true` | Enable gesture-based triggers |
| `distance` | `number` | `20` | Animation distance/scale multiplier |
| `hardwareAcceleration` | `boolean` | `true` | Enable hardware acceleration |
| `style` | `CSSProperties` | - | Custom styles |
| `className` | `string` | - | Custom class |
| `children` | `ReactNode` | - | Content to animate |

### Stagger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required**. Children to animate |
| `delay` | `number` | `80` | Delay between children (ms) |
| `variant` | `AnimationVariant` | `"fadeInUp"` | Animation variant |
| `duration` | `number` | `400` | Animation duration |
| `threshold` | `number` | `0.1` | Visibility threshold |

## Examples

See [USAGE-GUIDE.md](./USAGE-GUIDE.md) for:

- Complete code examples
- Common use cases
- Advanced patterns
- Best practices
- Troubleshooting

### Interactive Demo

Try the enhanced Motion component features in our interactive demo:

- **12 Animation Types** - Test all animation variants
- **10 Spring Presets** - Experience different physics behaviors
- **Gesture Controls** - Touch, drag, and momentum interactions
- **Real-time Controls** - Adjust settings and see immediate results
- **Accessibility Features** - Full keyboard navigation and screen reader support

The demo showcases all the new features including gesture-based animations, enhanced spring presets, and hardware acceleration.

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  AnimationVariant,
  AnimationTimingFunction,
  AnimationProps,
  SpringConfig,
  SpringPreset,
  MotionProps,
  GestureMotionProps,
  GestureMotionConfig,
  AnimationType
} from '@spexop/react';
```

## Related Components

- **Card** - Container for animated content
- **Grid** - Layout for staggered animations
- **Stack** - Sequential layout with animations
- **Button** - Interactive elements with hover effects

## Contributing

See [CONTRIBUTING.md](../../../../../../CONTRIBUTING.md) for development guidelines.

## License

MIT © Spexop Team

---

**Ready to animate?** Check out [USAGE-GUIDE.md](./USAGE-GUIDE.md) for comprehensive examples and patterns.
