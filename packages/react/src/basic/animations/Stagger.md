# Stagger Component

**Version**: v0.3.0  
**Type**: Animation Wrapper  
**Category**: Sequential Animation

## Overview

The `Stagger` component provides enhanced sequential animations with customizable stagger directions, timing, and callbacks. It animates children with progressive delays for engaging content reveals.

## Features

- ✅ **Multiple stagger directions** - Forward, reverse, center-out, edges-in
- ✅ **Animation callbacks** - Individual and completion callbacks
- ✅ **Conditional rendering** - `disabled` prop for conditional animations
- ✅ **Performance optimized** - GPU-accelerated with hardware acceleration
- ✅ **Accessibility compliant** - Respects `prefers-reduced-motion`
- ✅ **TypeScript support** - Full type safety and IntelliSense
- ✅ **Performance limits** - `maxChildren` for large lists

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

```tsx
import { Stagger } from '@spexop/react';

function App() {
  return (
    <Stagger>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stagger>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Children to stagger animate |
| `delay` | `number` | `80` | Delay between each child (ms) |
| `variant` | `AnimationVariant` | `"fadeInUp"` | Animation variant for children |
| `duration` | `number` | `400` | Animation duration in milliseconds |
| `timing` | `AnimationTimingFunction` | `"ease-out"` | CSS timing function |
| `threshold` | `number` | `0.1` | Intersection threshold (0-1) |
| `className` | `string` | `""` | Custom CSS class |
| `style` | `React.CSSProperties` | `{}` | Custom styles to merge |
| `disabled` | `boolean` | `false` | Disable all animations |
| `onAnimationStart` | `(index: number) => void` | - | Callback fired when any animation starts |
| `onAnimationComplete` | `(index: number) => void` | - | Callback fired when any animation completes |
| `onAllAnimationsComplete` | `() => void` | - | Callback fired when all animations complete |
| `hardwareAcceleration` | `boolean` | `true` | Enable hardware acceleration |
| `rootMargin` | `string` | `"0px"` | Custom root margin for intersection observer |
| `respectReducedMotion` | `boolean` | `true` | Whether to respect prefers-reduced-motion |
| `direction` | `"forward" \| "reverse" \| "center-out" \| "edges-in"` | `"forward"` | Stagger direction |
| `maxChildren` | `number` | `Infinity` | Maximum number of children to animate |

## Stagger Directions

### Forward (Default)

- **Order**: 0, 1, 2, 3, 4...
- **Effect**: Animates from first to last child
- **Use case**: Sequential content reveals

### Reverse

- **Order**: 4, 3, 2, 1, 0...
- **Effect**: Animates from last to first child
- **Use case**: Countdown effects, reverse reveals

### Center-Out

- **Order**: 2, 1, 3, 0, 4... (for 5 items)
- **Effect**: Animates from center outward
- **Use case**: Spotlight effects, focus reveals

### Edges-In

- **Order**: 0, 4, 1, 3, 2... (for 5 items)
- **Effect**: Animates from edges toward center
- **Use case**: Converging effects, meeting points

## Examples

### Basic Stagger Animations

```tsx
// Default forward stagger
<Stagger>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Stagger>

// Reverse stagger
<Stagger direction="reverse">
  <Card>Last item first</Card>
  <Card>Middle item</Card>
  <Card>First item last</Card>
</Stagger>

// Center-out stagger
<Stagger direction="center-out">
  <Card>Side item</Card>
  <Card>Center item</Card>
  <Card>Other side item</Card>
</Stagger>
```

### Custom Timing and Delays

```tsx
// Fast stagger with bounce timing
<Stagger delay={50} timing="bounce" duration={300}>
  <Card>Quick item 1</Card>
  <Card>Quick item 2</Card>
  <Card>Quick item 3</Card>
</Stagger>

// Slow stagger with elastic timing
<Stagger delay={200} timing="elastic" duration={800}>
  <Card>Slow item 1</Card>
  <Card>Slow item 2</Card>
  <Card>Slow item 3</Card>
</Stagger>
```

### Different Animation Variants

```tsx
// Slide up stagger
<Stagger variant="slideUp" delay={100}>
  <Card>Slide up 1</Card>
  <Card>Slide up 2</Card>
  <Card>Slide up 3</Card>
</Stagger>

// Scale up stagger
<Stagger variant="scaleUp" delay={80}>
  <Card>Scale up 1</Card>
  <Card>Scale up 2</Card>
  <Card>Scale up 3</Card>
</Stagger>

// Rotate in stagger
<Stagger variant="rotateIn" delay={120}>
  <Card>Rotate 1</Card>
  <Card>Rotate 2</Card>
  <Card>Rotate 3</Card>
</Stagger>
```

### Animation Callbacks

```tsx
function AnimatedList() {
  const handleAnimationStart = (index: number) => {
    console.log(`Animation started for item ${index}`);
  };

  const handleAnimationComplete = (index: number) => {
    console.log(`Animation completed for item ${index}`);
  };

  const handleAllComplete = () => {
    console.log('All animations completed!');
  };

  return (
    <Stagger
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
      onAllAnimationsComplete={handleAllComplete}
    >
      <Card>Item 1</Card>
      <Card>Item 2</Card>
      <Card>Item 3</Card>
    </Stagger>
  );
}
```

### Conditional Animation

```tsx
function ConditionalStagger({ shouldAnimate, items }) {
  return (
    <Stagger 
      disabled={!shouldAnimate}
      delay={100}
    >
      {items.map(item => (
        <Card key={item.id}>{item.title}</Card>
      ))}
    </Stagger>
  );
}
```

### Performance Optimization

```tsx
// Limit to first 10 items for performance
<Stagger maxChildren={10} delay={80}>
  {largeList.map(item => (
    <Card key={item.id}>{item.title}</Card>
  ))}
</Stagger>

// Disable hardware acceleration for simple animations
<Stagger hardwareAcceleration={false}>
  <Card>Simple item 1</Card>
  <Card>Simple item 2</Card>
</Stagger>
```

### Advanced Customization

```tsx
<Stagger
  direction="center-out"
  delay={150}
  variant="slideUp"
  duration={600}
  timing="bounce"
  threshold={0.2}
  onAnimationStart={(index) => console.log(`Starting ${index}`)}
  onAnimationComplete={(index) => console.log(`Complete ${index}`)}
  onAllAnimationsComplete={() => console.log('All done!')}
  style={{ 
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  }}
  className="custom-stagger"
  hardwareAcceleration={true}
  rootMargin="50px"
  maxChildren={20}
>
  <Card>Highly customized item 1</Card>
  <Card>Highly customized item 2</Card>
  <Card>Highly customized item 3</Card>
</Stagger>
```

### Different Stagger Directions

```tsx
// Forward (default)
<Stagger direction="forward" delay={100}>
  <Card>First</Card>
  <Card>Second</Card>
  <Card>Third</Card>
</Stagger>

// Reverse
<Stagger direction="reverse" delay={100}>
  <Card>Third</Card>
  <Card>Second</Card>
  <Card>First</Card>
</Stagger>

// Center-out
<Stagger direction="center-out" delay={100}>
  <Card>Side</Card>
  <Card>Center</Card>
  <Card>Other side</Card>
</Stagger>

// Edges-in
<Stagger direction="edges-in" delay={100}>
  <Card>Edge 1</Card>
  <Card>Middle</Card>
  <Card>Edge 2</Card>
</Stagger>
```

### With Custom Styles

```tsx
<Stagger
  style={{ 
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '600px'
  }}
  className="custom-stagger-list"
>
  <Card>Styled item 1</Card>
  <Card>Styled item 2</Card>
  <Card>Styled item 3</Card>
</Stagger>
```

### Repeated Animations

```tsx
// Animate every time element enters viewport
<Stagger once={false} delay={100}>
  <Card>Repeats on scroll</Card>
  <Card>Repeats on scroll</Card>
  <Card>Repeats on scroll</Card>
</Stagger>
```

### Different Thresholds

```tsx
// Trigger when 50% of element is visible
<Stagger threshold={0.5} delay={100}>
  <Card>Waits until half visible</Card>
  <Card>Waits until half visible</Card>
</Stagger>

// Trigger immediately when any part is visible
<Stagger threshold={0} delay={100}>
  <Card>Triggers immediately</Card>
  <Card>Triggers immediately</Card>
</Stagger>
```

## Advanced Patterns

### Orchestrated Stagger Sequence

```tsx
function OrchestratedHero() {
  return (
    <div className="hero">
      <Stagger direction="center-out" delay={200}>
        <span className="eyebrow">INTRODUCING</span>
        <h1 className="title">Next Generation Design</h1>
        <p className="subtitle">Build faster with our component library</p>
      </Stagger>
    </div>
  );
}
```

### Loading State Animation

```tsx
function LoadingState({ isLoading, data }) {
  if (isLoading) {
    return (
      <Stagger delay={100}>
        <div className="spinner">Loading...</div>
        <div className="spinner">Loading...</div>
        <div className="spinner">Loading...</div>
      </Stagger>
    );
  }

  return (
    <Stagger direction="center-out" delay={150}>
      {data.map(item => (
        <div key={item.id} className="content">{item.title}</div>
      ))}
    </Stagger>
  );
}
```

### Page Transition

```tsx
function PageTransition({ location, children }) {
  return (
    <Stagger key={location.pathname} delay={100}>
      {children}
    </Stagger>
  );
}
```

### Form Field Reveal

```tsx
function AnimatedForm() {
  return (
    <form>
      <Stagger direction="up" delay={80}>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Phone" />
        <textarea placeholder="Message" />
        <button type="submit">Send</button>
      </Stagger>
    </form>
  );
}
```

### Card Grid Animation

```tsx
function AnimatedGrid({ items }) {
  return (
    <div className="grid">
      <Stagger 
        direction="edges-in" 
        delay={100}
        maxChildren={12}
      >
        {items.map(item => (
          <Card key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Card>
        ))}
      </Stagger>
    </div>
  );
}
```

### Staggered List Animation

```tsx
function StaggeredList({ items }) {
  return (
    <ul className="list">
      <Stagger 
        direction="reverse" 
        delay={60}
        variant="slideUp"
      >
        {items.map(item => (
          <li key={item.id} className="list-item">
            {item.title}
          </li>
        ))}
      </Stagger>
    </ul>
  );
}
```

### Modal Stagger Animation

```tsx
function ModalStagger({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <Stagger direction="center-out" delay={100}>
        {children}
      </Stagger>
    </div>
  );
}
```

## Accessibility

### Reduced Motion Support

The component automatically respects `prefers-reduced-motion` by default:

```tsx
// Automatically disabled when user prefers reduced motion
<Stagger>
  <Content />
</Stagger>

// Manually disable reduced motion respect
<Stagger respectReducedMotion={false}>
  <Content />
</Stagger>
```

### ARIA Attributes

The component includes proper ARIA attributes through the underlying Reveal components:

- `aria-hidden` - Set to `true` when not visible
- `role="presentation"` - Indicates decorative content

## Performance

### Hardware Acceleration

Enable GPU acceleration for better performance:

```tsx
<Stagger hardwareAcceleration>
  <Content />
</Stagger>
```

### Performance Optimizations

- Uses `willChange` property for optimal rendering
- `backfaceVisibility: hidden` for 3D acceleration
- `transformStyle: preserve-3d` for hardware acceleration
- IntersectionObserver for efficient viewport detection
- `maxChildren` prop for limiting large lists

### Large List Optimization

```tsx
// For very large lists, limit the number of animated children
<Stagger maxChildren={50} delay={50}>
  {hugeList.map(item => (
    <Card key={item.id}>{item.title}</Card>
  ))}
</Stagger>
```

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
<Stagger delay={150} variant="fadeInUp">
  <Content />
</Stagger>

// v0.3.0 - New features (additive)
<Stagger 
  delay={150}
  variant="fadeInUp"
  direction="center-out"
  onAllAnimationsComplete={() => console.log('All done!')}
  disabled={!shouldAnimate}
  maxChildren={20}
>
  <Content />
</Stagger>
```

## Related Components

- **Reveal** - Universal animation wrapper
- **FadeIn** - Convenient wrapper for fade animations
- **Motion** - State-based spring animations
- **RotateIn** - Rotation with scale and fade effects
- **ScaleUp** - Scale-based zoom effects
- **SlideIn** - Slide animations with direction control
- **ZoomIn** - Scale-based zoom effects

## Design Principles Applied

Following "The Spexop Way":

- **Primitives before patterns** - Core animation primitive for sequential effects
- **Standards before frameworks** - Web platform fundamentals
- **Accessibility before aesthetics** - WCAG AA+ compliance by default
- **Tokens before magic numbers** - Uses design tokens from theme system
- **Composition before complexity** - Simple, composable API

## License

MIT License - See LICENSE file for details
