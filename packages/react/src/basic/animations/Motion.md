# Motion Component

**Version**: v0.3.0  
**Type**: Animation Wrapper  
**Category**: State-Based Animation

## Overview

The `Motion` component provides state-based animations using enhanced spring physics. It offers new animation types including bounce, shake, flip effects, and expanded spring presets for smooth, natural motion.

## Features

- ✅ **State-based animations** - Animate based on component state changes
- ✅ **Spring physics** - Natural, physics-based motion with 10 presets
- ✅ **New animation types** - Bounce, shake, flipX, flipY, zoom effects
- ✅ **Hardware acceleration** - Configurable GPU acceleration
- ✅ **Custom distance support** - Adjust movement distance for slide animations
- ✅ **Enhanced spring configuration** - More physics options including precision and maxDuration
- ✅ **Performance optimized** - 60fps with proper cleanup
- ✅ **TypeScript support** - Full type safety and IntelliSense

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

```tsx
import { Motion } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Motion isActive={isOpen} type="slideDown">
      <div>Animated content</div>
    </Motion>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isActive` | `boolean` | - | Whether the element is visible/active |
| `type` | `MotionType` | `"fade"` | Animation type |
| `spring` | `SpringConfig \| SpringPreset` | `"default"` | Spring configuration or preset |
| `style` | `React.CSSProperties` | `{}` | Custom styles to merge |
| `className` | `string` | `""` | Custom CSS class |
| `children` | `React.ReactNode` | - | Content to animate |
| `distance` | `number` | `20` | Distance/scale multiplier for animations |
| `hardwareAcceleration` | `boolean` | `true` | Enable hardware acceleration |

## Animation Types

### Basic Animations

- `fade` - Simple opacity transition
- `scale` - Scale from 80% to 100%
- `zoom` - Scale from 50% to 100% (enhanced zoom)

### Slide Animations

- `slideDown` - Slide down with spring physics
- `slideUp` - Slide up with spring physics
- `slideLeft` - Slide from left with spring physics
- `slideRight` - Slide from right with spring physics

### 3D Effects

- `rotate` - Rotate 180 degrees
- `flipX` - Horizontal flip (3D)
- `flipY` - Vertical flip (3D)

### Special Effects

- `bounce` - Playful bounce with scale and translate
- `shake` - Attention-grabbing shake effect

## Spring Presets

### Original Presets

- `default` - Balanced and versatile
- `gentle` - Soft and smooth
- `wobbly` - Bouncy with overshoot
- `stiff` - Quick and snappy
- `slow` - Deliberate and smooth

### New Enhanced Presets

- `molasses` - Very slow and heavy
- `bouncy` - Highly elastic with multiple bounces
- `crisp` - Sharp and precise
- `smooth` - Fluid and elegant
- `elastic` - Rubber-like with stretch

## Examples

### Basic State Animations

```tsx
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Menu
      </button>
      <Motion isActive={isOpen} type="slideDown" spring="gentle">
        <ul className="dropdown-menu">
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </Motion>
    </div>
  );
}
```

### Expandable Panel

```tsx
function ExpandablePanel({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="panel">
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {title}
      </button>
      <Motion isActive={isExpanded} type="slideDown" spring="default">
        <div className="panel-content">
          {children}
        </div>
      </Motion>
    </div>
  );
}
```

### Sidebar Toggle

```tsx
function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle Sidebar
      </button>
      <Motion isActive={isVisible} type="slideRight" spring="stiff">
        <aside className="sidebar">
          <nav>Navigation content</nav>
        </aside>
      </Motion>
    </>
  );
}
```

### New Animation Types

```tsx
function AnimationTypesDemo() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <button onClick={() => setActive(!active)}>Toggle All</button>

      {/* Bounce effect with scale and translate */}
      <Motion isActive={active} type="bounce" spring="wobbly">
        <div>Bounce - Playful bounce effect</div>
      </Motion>

      {/* Shake effect for attention */}
      <Motion isActive={active} type="shake" spring="crisp">
        <div>Shake - Attention-grabbing shake</div>
      </Motion>

      {/* 3D flip effects */}
      <Motion isActive={active} type="flipX" spring="smooth">
        <div>Flip X - Horizontal flip</div>
      </Motion>

      <Motion isActive={active} type="flipY" spring="smooth">
        <div>Flip Y - Vertical flip</div>
      </Motion>

      {/* Enhanced zoom with larger scale range */}
      <Motion isActive={active} type="zoom" spring="elastic">
        <div>Zoom - Enhanced scale effect</div>
      </Motion>
    </div>
  );
}
```

### Spring Presets Comparison

```tsx
function SpringDemo() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <button onClick={() => setActive(!active)}>Toggle</button>

      {/* Original presets */}
      <Motion isActive={active} spring="default">
        <div>Default - Balanced and versatile</div>
      </Motion>

      <Motion isActive={active} spring="gentle">
        <div>Gentle - Soft and smooth</div>
      </Motion>

      <Motion isActive={active} spring="wobbly">
        <div>Wobbly - Bouncy with overshoot</div>
      </Motion>

      <Motion isActive={active} spring="stiff">
        <div>Stiff - Quick and snappy</div>
      </Motion>

      <Motion isActive={active} spring="slow">
        <div>Slow - Deliberate and smooth</div>
      </Motion>

      {/* New enhanced presets */}
      <Motion isActive={active} spring="molasses">
        <div>Molasses - Very slow and heavy</div>
      </Motion>

      <Motion isActive={active} spring="bouncy">
        <div>Bouncy - Highly elastic with multiple bounces</div>
      </Motion>

      <Motion isActive={active} spring="crisp">
        <div>Crisp - Sharp and precise</div>
      </Motion>

      <Motion isActive={active} spring="smooth">
        <div>Smooth - Fluid and elegant</div>
      </Motion>

      <Motion isActive={active} spring="elastic">
        <div>Elastic - Rubber-like with stretch</div>
      </Motion>
    </div>
  );
}
```

### Advanced Motion Features

```tsx
// Custom distance for slide animations
<Motion 
  isActive={isOpen} 
  type="slideDown" 
  distance={100}
  spring="bouncy"
>
  <div>Custom slide distance</div>
</Motion>

// Hardware acceleration control
<Motion 
  isActive={isVisible} 
  type="flipX" 
  hardwareAcceleration={false}
  spring="smooth"
>
  <div>Software-rendered flip</div>
</Motion>

// Custom spring configuration with enhanced options
<Motion
  isActive={isActive}
  type="bounce"
  spring={{
    stiffness: 200,
    damping: 15,
    mass: 1,
    velocity: 0,
    precision: 0.001,
    maxDuration: 2000
  }}
  distance={50}
>
  <div>Custom physics with limits</div>
</Motion>
```

### Practical Use Cases

```tsx
// Notification with shake effect
function ErrorNotification({ message, isVisible }) {
  return (
    <Motion 
      isActive={isVisible} 
      type="shake" 
      spring="crisp"
      distance={10}
    >
      <div className="error-notification">
        {message}
      </div>
    </Motion>
  );
}

// Card flip on hover
function FlipCard({ children }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <Motion 
      isActive={isFlipped} 
      type="flipY" 
      spring="smooth"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="flip-card">
        {children}
      </div>
    </Motion>
  );
}

// Bouncing call-to-action
function BouncingCTA({ children }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Motion 
      isActive={isHovered} 
      type="bounce" 
      spring="bouncy"
      distance={20}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="cta-button">
        {children}
      </button>
    </Motion>
  );
}
```

### Custom Spring Configuration

```tsx
<Motion
  isActive={isActive}
  type="scale"
  spring={{
    stiffness: 200,
    damping: 15,
    mass: 1,
    velocity: 0,
    precision: 0.001,
    maxDuration: 0
  }}
>
  <div>Custom physics</div>
</Motion>
```

### Modal with Spring

```tsx
function SpringModal({ isOpen, onClose }) {
  return (
    <>
      <Motion isActive={isOpen} type="fade" spring="gentle">
        <div className="modal-overlay" onClick={onClose} />
      </Motion>
      <Motion isActive={isOpen} type="scale" spring="wobbly">
        <div className="modal">
          <h2>Modal Title</h2>
          <p>Content</p>
          <button onClick={onClose}>Close</button>
        </div>
      </Motion>
    </>
  );
}
```

## Spring Configuration

### SpringConfig Interface

```tsx
interface SpringConfig {
  stiffness?: number;    // Spring stiffness (higher = faster)
  damping?: number;      // Spring damping (higher = less bouncy)
  mass?: number;         // Spring mass (higher = slower)
  velocity?: number;     // Initial velocity
  precision?: number;    // Precision threshold for settling
  maxDuration?: number;  // Maximum duration in milliseconds
}
```

### Spring Preset Details

```tsx
// Default spring - balanced and versatile
default: {
  stiffness: 170,
  damping: 26,
  mass: 1,
  velocity: 0,
  precision: 0.001,
  maxDuration: 0,
}

// Gentle spring - smooth and subtle
gentle: {
  stiffness: 120,
  damping: 14,
  mass: 1,
  velocity: 0,
  precision: 0.001,
  maxDuration: 0,
}

// Wobbly spring - bouncy with overshoot
wobbly: {
  stiffness: 180,
  damping: 12,
  mass: 1,
  velocity: 0,
  precision: 0.001,
  maxDuration: 0,
}

// Bouncy spring - highly elastic with multiple bounces
bouncy: {
  stiffness: 200,
  damping: 8,
  mass: 1,
  velocity: 0,
  precision: 0.001,
  maxDuration: 0,
}

// Elastic spring - rubber-like with stretch
elastic: {
  stiffness: 160,
  damping: 10,
  mass: 1,
  velocity: 0,
  precision: 0.001,
  maxDuration: 0,
}
```

## Performance

### Hardware Acceleration

Enable GPU acceleration for better performance:

```tsx
<Motion isActive={isOpen} type="flipX" hardwareAcceleration>
  <Content />
</Motion>
```

### Performance Optimizations

- Uses `willChange` property for optimal rendering
- `backfaceVisibility: hidden` for 3D acceleration
- `transformStyle: preserve-3d` for hardware acceleration
- Spring physics optimized for 60fps
- Proper cleanup of animation frames

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
<Motion isActive={isOpen} type="slideDown">
  <Content />
</Motion>

// v0.3.0 - New features (additive)
<Motion 
  isActive={isOpen} 
  type="bounce" 
  spring="bouncy"
  distance={30}
  hardwareAcceleration={false}
>
  <Content />
</Motion>
```

## Related Components

- **Reveal** - Universal animation wrapper
- **FadeIn** - Convenient wrapper for fade animations
- **SlideIn** - Slide animations with larger movement
- **ZoomIn** - Scale-based zoom effects
- **RotateIn** - Rotation with fade effects
- **ScaleUp** - Subtle scale animations
- **Stagger** - Sequential child animations

## Design Principles Applied

Following "The Spexop Way":

- **Primitives before patterns** - Core animation primitive for state changes
- **Standards before frameworks** - Web platform fundamentals
- **Accessibility before aesthetics** - WCAG AA+ compliance by default
- **Tokens before magic numbers** - Uses design tokens from theme system
- **Composition before complexity** - Simple, composable API

## License

MIT License - See LICENSE file for details
