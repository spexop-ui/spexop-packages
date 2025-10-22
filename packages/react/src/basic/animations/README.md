# Animation Components

Smooth, performant animation utilities for React applications following Spexop design principles.

**See [USAGE-GUIDE.md](./USAGE-GUIDE.md) for comprehensive usage examples, best practices, and troubleshooting.**

**!!! IMPORTANT !!!**
This documentation is automatically synced from the spexop-packages repository. Last sync: 2025-10-22
It's read-only and should be edited in spexop-packages repository. Please don't edit this file and the content of the components directly.

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
✅ **12 Animation Variants** - Fade, slide, zoom, rotate, and scale effects  
✅ **3 Timing Systems** - CSS transitions, spring physics, and eased values  
✅ **Sequential Animations** - Stagger component for orchestrated reveals  
✅ **Reduced Motion** - Automatic support for accessibility preferences  

## Components

### Core Components

- **Reveal** - Universal animation wrapper with viewport detection
- **FadeIn** - Fade animations with directional movement
- **SlideIn** - Slide animations from any direction
- **ZoomIn** - Scale-based zoom effects
- **RotateIn** - Rotation with fade
- **ScaleUp** - Subtle scale animations
- **Stagger** - Sequential child animations
- **Motion** - Spring-based physics animations

### Custom Hooks

- **useIntersectionObserver** - Viewport detection
- **useSpring** - Physics-based value interpolation
- **useMotionValue** - Eased value transitions

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

### Directional Fades

```tsx
import { FadeIn } from '@spexop/react';

function Hero() {
  return (
    <>
      <FadeIn direction="up" delay={0}>
        <h1>Title</h1>
      </FadeIn>
      <FadeIn direction="up" delay={200}>
        <p>Subtitle appears after title</p>
      </FadeIn>
    </>
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

### Physics-Based Motion

```tsx
import { Motion } from '@spexop/react';
import { useState } from 'react';

function Interactive() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Motion isActive={isOpen} type="slideDown" spring="wobbly">
      <Dropdown>Content</Dropdown>
    </Motion>
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

- `default` - Balanced spring (170 stiffness, 26 damping)
- `gentle` - Soft spring (120 stiffness, 14 damping)
- `wobbly` - Bouncy spring (180 stiffness, 12 damping)
- `stiff` - Firm spring (210 stiffness, 20 damping)
- `slow` - Slow spring (280 stiffness, 60 damping)
- `molasses` - Very slow (280 stiffness, 120 damping)

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

// ❌ Avoid: Long, distracting animations
<FadeIn duration={2000} direction="up">
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
| `type` | `"fade" \| "scale" \| "slideDown" \| "slideUp" \| "slideLeft" \| "slideRight"` | `"fade"` | Animation type |
| `spring` | `SpringConfig \| SpringPreset` | `"default"` | Spring configuration |
| `style` | `CSSProperties` | - | Custom styles |
| `className` | `string` | - | Custom class |

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

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  AnimationVariant,
  AnimationTimingFunction,
  AnimationProps,
  SpringConfig,
  SpringPreset
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
