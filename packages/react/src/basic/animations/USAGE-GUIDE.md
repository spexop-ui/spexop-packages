# Animation Components - Usage Guide

**Component Version**: v0.3.0
**Last Updated**: December 2024
**Compatibility**: Enhanced API with new features

## Quick Start

### Installation

```bash
npm install @spexop/react
```

### Basic Imports

```tsx
import {
  Reveal,
  FadeIn,
  SlideIn,
  ZoomIn,
  RotateIn,
  ScaleUp,
  Stagger,
  Motion,
  useIntersectionObserver,
  useSpring,
  useMotionValue
} from '@spexop/react';
```

### Minimal Example

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

## Overview

The animation system provides three types of animations:

1. **Viewport-Triggered** - Animate when elements enter the viewport (Reveal, FadeIn, SlideIn, etc.)
2. **State-Based** - Animate based on component state (Motion)
3. **Sequential** - Animate children in sequence (Stagger)

All animations are:

- GPU-accelerated (transform/opacity only)
- Accessibility-friendly (respects prefers-reduced-motion)
- Performance-optimized (60fps)
- Highly configurable

## What's New in v0.3.0

### Enhanced FadeIn Component

- **Custom distance control** - Adjust movement distance beyond the default 12px
- **Opacity range customization** - Define custom from/to opacity values
- **Animation callbacks** - `onAnimationStart` and `onAnimationComplete` events
- **Conditional rendering** - `disabled` prop for conditional animations
- **Enhanced customization** - More granular control over animation behavior

### Enhanced Motion Component

- **New animation types** - `bounce`, `shake`, `flipX`, `flipY`, `zoom`
- **Expanded spring presets** - 5 new presets: `molasses`, `bouncy`, `crisp`, `smooth`, `elastic`
- **Hardware acceleration control** - Toggle GPU acceleration on/off
- **Custom distance support** - Adjust movement distance for slide animations
- **Enhanced spring configuration** - More physics options including `precision` and `maxDuration`

### Enhanced Reveal Component

- **Animation callbacks** - `onAnimationStart` and `onAnimationComplete` events
- **Conditional rendering** - `disabled` prop for conditional animations
- **Hardware acceleration control** - Toggle GPU acceleration on/off
- **Custom root margin** - Adjust intersection observer root margin
- **Reduced motion support** - Enhanced `prefers-reduced-motion` handling
- **Performance optimizations** - Better GPU acceleration and cleanup

### Enhanced RotateIn Component

- **Custom angle control** - Adjust rotation angle beyond the default -3deg
- **Custom scale control** - Adjust scale factor beyond the default 0.97
- **Animation callbacks** - `onAnimationStart` and `onAnimationComplete` events
- **Conditional rendering** - `disabled` prop for conditional animations
- **Enhanced customization** - More granular control over rotation behavior

### Enhanced ScaleUp Component

- **Custom scale range** - Define custom `fromScale` and `toScale` values
- **Animation callbacks** - `onAnimationStart` and `onAnimationComplete` events
- **Conditional rendering** - `disabled` prop for conditional animations
- **Enhanced customization** - More granular control over scaling behavior

### Enhanced SlideIn Component

- **Custom distance control** - Adjust slide distance beyond the default 20px
- **Direction control** - Choose from up, down, left, right directions
- **Animation callbacks** - `onAnimationStart` and `onAnimationComplete` events
- **Conditional rendering** - `disabled` prop for conditional animations
- **Enhanced customization** - More granular control over slide behavior

### Enhanced Stagger Component

- **Multiple stagger directions** - `forward`, `reverse`, `center-out`, `edges-in`
- **Animation callbacks** - Individual and batch completion callbacks
- **Performance control** - `maxChildren` prop to limit simultaneous animations
- **Conditional rendering** - `disabled` prop for conditional animations
- **Enhanced customization** - More granular control over stagger behavior

### Enhanced ZoomIn Component

- **Zoom type control** - Choose between "in" and "out" zoom effects
- **Custom scale range** - Define custom `fromScale` and `toScale` values
- **Animation callbacks** - `onAnimationStart` and `onAnimationComplete` events
- **Conditional rendering** - `disabled` prop for conditional animations
- **Enhanced customization** - More granular control over zoom behavior

### Improved Spring Physics

- **Better stability** - Enhanced Verlet integration for smoother animations
- **More presets** - 10 total spring presets for different use cases
- **Performance optimizations** - Improved frame rate capping and settling detection
- **Custom precision** - Configurable precision thresholds for animation completion

## Reveal Component

The universal animation wrapper that powers most other animation components.

### Basic Usage

```tsx
import { Reveal } from '@spexop/react';

function Section() {
  return (
    <Reveal variant="fadeInUp" duration={600}>
      <section>
        <h2>Section Title</h2>
        <p>This content animates when scrolled into view.</p>
      </section>
    </Reveal>
  );
}
```

### All Animation Variants

```tsx
// Fade variants
<Reveal variant="fadeIn">Simple fade</Reveal>
<Reveal variant="fadeInUp">Fade with upward movement</Reveal>
<Reveal variant="fadeInDown">Fade with downward movement</Reveal>
<Reveal variant="fadeInLeft">Fade from left</Reveal>
<Reveal variant="fadeInRight">Fade from right</Reveal>

// Slide variants (larger movement)
<Reveal variant="slideUp">Slide up 20px</Reveal>
<Reveal variant="slideDown">Slide down 20px</Reveal>
<Reveal variant="slideLeft">Slide from left 20px</Reveal>
<Reveal variant="slideRight">Slide from right 20px</Reveal>

// Scale variants
<Reveal variant="zoomIn">Zoom in from 95%</Reveal>
<Reveal variant="zoomOut">Zoom out from 105%</Reveal>
<Reveal variant="scaleUp">Scale up from 92%</Reveal>

// Rotation
<Reveal variant="rotateIn">Rotate -3deg with scale</Reveal>
```

### Custom Timing

```tsx
<Reveal
  variant="fadeInUp"
  duration={800}        // Slower animation
  delay={300}           // Wait before starting
  timing="ease-in-out"  // Custom timing function
>
  <Content />
</Reveal>
```

### Repeated Animations

```tsx
// Animate every time element enters viewport
<Reveal variant="fadeInUp" once={false}>
  <Card>Animates on every scroll</Card>
</Reveal>
```

### Visibility Threshold

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

## FadeIn Component

Convenient wrapper for fade animations with enhanced customization options including custom distance, opacity ranges, animation callbacks, and conditional rendering.

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

### Simple Fade (No Movement)

```tsx
<FadeIn direction="none" duration={800}>
  <div className="overlay">
    Fades in without movement
  </div>
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

### SlideIn Animation Callbacks

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

### SlideIn Conditional Animation

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

### SlideIn Advanced Customization

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

## SlideIn Component

Enhanced slide animations from any direction with custom distance control, animation callbacks, and conditional rendering.

### SlideIn Basic Usage

```tsx
function Sidebar({ isOpen }) {
  return isOpen ? (
    <SlideIn direction="right" duration={400}>
      <nav className="sidebar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </SlideIn>
  ) : null;
}
```

### Custom Distance Control

```tsx
// Dramatic slide effect
<SlideIn direction="up" distance={50} duration={600}>
  <Card>Dramatic slide up</Card>
</SlideIn>

// Subtle slide effect
<SlideIn direction="left" distance={10} duration={300}>
  <Card>Subtle slide left</Card>
</SlideIn>

// Custom distance for each direction
<SlideIn direction="right" distance={30} duration={500}>
  <Card>Custom distance slide</Card>
</SlideIn>
```

### SlideIn Animation Callbacks Basic Usage

```tsx
function AnimatedSection({ title, children, direction }) {
  const handleAnimationStart = () => {
    console.log(`${title} sliding started`);
  };

  const handleAnimationComplete = () => {
    console.log(`${title} sliding completed`);
  };

  return (
    <SlideIn
      direction={direction}
      distance={25}
      duration={500}
      timing="ease-out"
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      <section>
        <h2>{title}</h2>
        {children}
      </section>
    </SlideIn>
  );
}
```

### SlideIn Conditional Animation Basic Usage

```tsx
function ConditionalSlide({ shouldAnimate, children, direction }) {
  return (
    <SlideIn 
      direction={direction}
      distance={20}
      disabled={!shouldAnimate}
      duration={400}
    >
      {children}
    </SlideIn>
  );
}

// Usage
<ConditionalSlide shouldAnimate={user.prefersAnimation} direction="up">
  <Card>Only slides when enabled</Card>
</ConditionalSlide>
```

### Notification Banner Basic Usage

```tsx
function NotificationBanner({ message }) {
  return (
    <SlideIn direction="down" distance={30} duration={300}>
      <div className="banner">
        {message}
      </div>
    </SlideIn>
  );
}
```

### Footer Reveal Basic Usage

```tsx
<SlideIn direction="up" distance={40} threshold={0.3}>
  <footer>
    <p>© 2025 Your Company</p>
  </footer>
</SlideIn>
```

### Alternating Slides Basic Usage

```tsx
function AlternatingContent() {
  return (
    <>
      <SlideIn direction="left" distance={35}>
        <Section>Content from left</Section>
      </SlideIn>
      <SlideIn direction="right" distance={35}>
        <Section>Content from right</Section>
      </SlideIn>
      <SlideIn direction="left" distance={35}>
        <Section>Content from left again</Section>
      </SlideIn>
    </>
  );
}
```

### SlideIn Advanced Customization Basic Usage

```tsx
<SlideIn
  direction="up"
  distance={60}
  duration={800}
  delay={200}
  timing="elastic"
  threshold={0.3}
  once={false}
  onAnimationStart={() => console.log('Starting slide')}
  onAnimationComplete={() => console.log('Slide complete')}
  className="custom-slide"
  style={{ marginTop: '20px' }}
>
  <Card>Highly customized slide</Card>
</SlideIn>
```

## ZoomIn Component

Enhanced scale-based zoom effects for emphasis, featuring custom scale ranges, zoom types, animation callbacks, and conditional rendering.

### ZoomInBasic Usage

```tsx
function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <ZoomIn type="in" duration={300}>
        <div className="modal">
          <h2>Modal Title</h2>
          <p>Modal content</p>
          <button onClick={onClose}>Close</button>
        </div>
      </ZoomIn>
    </div>
  );
}
```

### Custom Scale Range

```tsx
// Dramatic zoom in effect
<ZoomIn type="in" fromScale={0.7} toScale={1.1} duration={600}>
  <Card>Dramatic zoom in</Card>
</ZoomIn>

// Subtle zoom in effect
<ZoomIn type="in" fromScale={0.95} toScale={1.02} duration={300}>
  <Card>Subtle zoom in</Card>
</ZoomIn>

// Custom zoom out effect
<ZoomIn type="out" fromScale={1.2} toScale={0.9} duration={500}>
  <Card>Custom zoom out</Card>
</ZoomIn>
```

### ZoomIn Animation Callbacks

```tsx
function AnimatedModal({ isOpen, onClose, title }) {
  const handleAnimationStart = () => {
    console.log(`${title} zoom started`);
  };

  const handleAnimationComplete = () => {
    console.log(`${title} zoom completed`);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <ZoomIn
        type="in"
        fromScale={0.8}
        toScale={1.05}
        duration={400}
        timing="ease-out"
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        <div className="modal">
          <h2>{title}</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </ZoomIn>
    </div>
  );
}
```

### ZoomIn Conditional Animation

```tsx
function ConditionalZoom({ shouldAnimate, children, type }) {
  return (
    <ZoomIn 
      type={type}
      fromScale={type === "in" ? 0.95 : 1.05}
      toScale={1}
      disabled={!shouldAnimate}
      duration={400}
    >
      {children}
    </ZoomIn>
  );
}

// Usage
<ConditionalZoom shouldAnimate={user.prefersAnimation} type="in">
  <Card>Only zooms when enabled</Card>
</ConditionalZoom>
```

### Call-to-Action Emphasis

```tsx
<ZoomIn 
  type="in" 
  fromScale={0.9}
  toScale={1.08}
  duration={500} 
  delay={600}
>
  <button className="cta-button">
    Get Started Now
  </button>
</ZoomIn>
```

### Image Gallery Reveal

```tsx
function Gallery({ images }) {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <ZoomIn 
          key={image.id} 
          type="in" 
          fromScale={0.8}
          toScale={1.02}
          delay={index * 100}
        >
          <img src={image.url} alt={image.alt} />
        </ZoomIn>
      ))}
    </div>
  );
}
```

### Zoom Out Effect

```tsx
<ZoomIn 
  type="out" 
  fromScale={1.15}
  toScale={0.95}
  duration={400}
>
  <div className="highlighted-card">
    Starts larger and zooms to normal size
  </div>
</ZoomIn>
```

### ZoomIn Advanced Customization

```tsx
<ZoomIn
  type="in"
  fromScale={0.6}
  toScale={1.1}
  duration={800}
  delay={200}
  timing="elastic"
  threshold={0.3}
  once={false}
  onAnimationStart={() => console.log('Starting zoom')}
  onAnimationComplete={() => console.log('Zoom complete')}
  className="custom-zoom"
  style={{ marginTop: '20px' }}
>
  <Card>Highly customized zoom</Card>
</ZoomIn>
```

## RotateIn Component

Enhanced rotation with fade for creative flourishes, featuring custom angle and scale control, animation callbacks, and conditional rendering.

### RotateIn Basic Usage

```tsx
function Badge({ label }) {
  return (
    <RotateIn duration={500}>
      <div className="badge">{label}</div>
    </RotateIn>
  );
}
```

### Custom Angle and Scale

```tsx
// Custom rotation angle (negative values rotate counter-clockwise)
<RotateIn angle={-5} scale={0.95} duration={600}>
  <div className="feature-card">Dramatic rotation</div>
</RotateIn>

// Subtle rotation
<RotateIn angle={-1} scale={0.99} duration={300}>
  <div className="subtle-card">Gentle rotation</div>
</RotateIn>

// Clockwise rotation
<RotateIn angle={3} scale={0.98} duration={500}>
  <div className="clockwise-card">Clockwise rotation</div>
</RotateIn>
```

### RotateIn Animation Callbacks Basic Usage

```tsx
function AnimatedIcon({ icon, label }) {
  const handleAnimationStart = () => {
    console.log(`${label} rotation started`);
  };

  const handleAnimationComplete = () => {
    console.log(`${label} rotation completed`);
  };

  return (
    <RotateIn
      angle={-4}
      scale={0.96}
      duration={600}
      timing="bounce"
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className="icon-wrapper">
        <Icon name={icon} size={48} />
        <span>{label}</span>
      </div>
    </RotateIn>
  );
}
```

### RotateIn Conditional Animation Basic Usage

```tsx
function ConditionalRotate({ shouldAnimate, children }) {
  return (
    <RotateIn 
      angle={-3}
      scale={0.97}
      disabled={!shouldAnimate}
      duration={400}
    >
      {children}
    </RotateIn>
  );
}

// Usage
<ConditionalRotate shouldAnimate={user.prefersAnimation}>
  <Card>Only rotates when enabled</Card>
</ConditionalRotate>
```

### Feature Icons Basic Usage

```tsx
<RotateIn timing="bounce" angle={-2} scale={0.98}>
  <div className="icon-wrapper">
    <Icon name="star" size={48} />
  </div>
</RotateIn>
```

### Price Cards Basic Usage

```tsx
function PricingCard({ plan }) {
  return (
    <RotateIn 
      delay={plan.order * 150}
      angle={-3}
      scale={0.97}
      duration={500}
      timing="ease-out"
    >
      <div className="pricing-card">
        <h3>{plan.name}</h3>
        <p className="price">${plan.price}/mo</p>
        <button>Select Plan</button>
      </div>
    </RotateIn>
  );
}
```

### RotateIn Advanced Customization Basic Usage

```tsx
<RotateIn
  angle={-6}
  scale={0.94}
  duration={800}
  delay={200}
  timing="elastic"
  threshold={0.3}
  once={false}
  onAnimationStart={() => console.log('Starting rotation')}
  onAnimationComplete={() => console.log('Rotation complete')}
  className="custom-rotate"
  style={{ marginTop: '20px' }}
>
  <Card>Highly customized rotation</Card>
</RotateIn>
```

## ScaleUp Component

Enhanced scale animation for interactive elements, featuring custom scale ranges, animation callbacks, and conditional rendering.

### ScaleUp Basic Usage

```tsx
function InteractiveButton() {
  return (
    <ScaleUp duration={400} timing="ease-out">
      <button className="scale-button">
        Hover Me
      </button>
    </ScaleUp>
  );
}
```

### Stagger Custom Scale Range

```tsx
// Dramatic scale effect
<ScaleUp fromScale={0.8} toScale={1.1} duration={600}>
  <Card>Dramatic scale effect</Card>
</ScaleUp>

// Subtle scale effect
<ScaleUp fromScale={0.95} toScale={1.02} duration={300}>
  <Card>Subtle scale effect</Card>
</ScaleUp>

// Scale down effect
<ScaleUp fromScale={1.1} toScale={0.9} duration={500}>
  <Card>Scale down effect</Card>
</ScaleUp>
```

### Stagger Animation Callbacks Basic Usage

```tsx
function AnimatedCard({ title, description }) {
  const handleAnimationStart = () => {
    console.log(`${title} scaling started`);
  };

  const handleAnimationComplete = () => {
    console.log(`${title} scaling completed`);
  };

  return (
    <ScaleUp
      fromScale={0.9}
      toScale={1.05}
      duration={500}
      timing="elastic"
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
    >
      <Card>
        <h3>{title}</h3>
        <p>{description}</p>
      </Card>
    </ScaleUp>
  );
}
```

### Stagger Conditional Animation

```tsx
function ConditionalScale({ shouldAnimate, children }) {
  return (
    <ScaleUp 
      fromScale={0.92}
      toScale={1}
      disabled={!shouldAnimate}
      duration={400}
    >
      {children}
    </ScaleUp>
  );
}

// Usage
<ConditionalScale shouldAnimate={user.prefersAnimation}>
  <Card>Only scales when enabled</Card>
</ConditionalScale>
```

### Card Grid

```tsx
function CardGrid({ items }) {
  return (
    <div className="grid">
      {items.map((item, index) => (
        <ScaleUp 
          key={item.id} 
          delay={index * 80}
          fromScale={0.9}
          toScale={1.02}
        >
          <Card>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Card>
        </ScaleUp>
      ))}
    </div>
  );
}
```

### Testimonial Reveal

```tsx
<ScaleUp 
  fromScale={0.88}
  toScale={1.03}
  duration={600} 
  timing="elastic"
>
  <blockquote className="testimonial">
    <p>"This product changed my life!"</p>
    <cite>— Happy Customer</cite>
  </blockquote>
</ScaleUp>
```

### Stagger Advanced Customization

```tsx
<ScaleUp
  fromScale={0.7}
  toScale={1.1}
  duration={800}
  delay={200}
  timing="bounce"
  threshold={0.3}
  once={false}
  onAnimationStart={() => console.log('Starting scale')}
  onAnimationComplete={() => console.log('Scale complete')}
  className="custom-scale"
  style={{ marginTop: '20px' }}
>
  <Card>Highly customized scale</Card>
</ScaleUp>
```

## Stagger Component

Enhanced sequential animation component with multiple stagger directions, animation callbacks, performance control, and conditional rendering.

### Stagger Basic Usage

```tsx
function FeatureList() {
  return (
    <Stagger delay={100} variant="fadeInUp">
      <FeatureItem icon="fast" title="Blazing Fast" />
      <FeatureItem icon="secure" title="Secure by Default" />
      <FeatureItem icon="scalable" title="Infinitely Scalable" />
      <FeatureItem icon="accessible" title="Fully Accessible" />
    </Stagger>
  );
}
```

### Multiple Stagger Directions

```tsx
// Forward direction (default) - animates from first to last
<Stagger delay={100} direction="forward" variant="fadeInUp">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Stagger>

// Reverse direction - animates from last to first
<Stagger delay={100} direction="reverse" variant="fadeInUp">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Stagger>

// Center-out direction - animates from center outward
<Stagger delay={100} direction="center-out" variant="scaleUp">
  <Card>Item 1</Card>
  <Card>Item 2</Card> {/* Center item animates first */}
  <Card>Item 3</Card>
</Stagger>

// Edges-in direction - animates from edges toward center
<Stagger delay={100} direction="edges-in" variant="slideUp">
  <Card>Item 1</Card> {/* Edge items animate first */}
  <Card>Item 2</Card>
  <Card>Item 3</Card> {/* Edge items animate first */}
</Stagger>
```

### Stagger Multiple Directions

```tsx
function AnimatedFeatureList({ features }) {
  const handleAnimationStart = (index) => {
    console.log(`Feature ${index + 1} animation started`);
  };

  const handleAnimationComplete = (index) => {
    console.log(`Feature ${index + 1} animation completed`);
  };

  const handleAllAnimationsComplete = () => {
    console.log('All features have been animated!');
  };

  return (
    <Stagger
      delay={120}
      variant="fadeInUp"
      direction="center-out"
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
      onAllAnimationsComplete={handleAllAnimationsComplete}
    >
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </Stagger>
  );
}
```

### Performance Control

```tsx
// Limit to 5 children for performance
<Stagger delay={100} maxChildren={5} variant="fadeInUp">
  {largeArray.map(item => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</Stagger>

// No limit (default)
<Stagger delay={100} maxChildren={Infinity} variant="fadeInUp">
  {items.map(item => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</Stagger>
```

### Stagger Performance Control

```tsx
function ConditionalStagger({ shouldAnimate, children }) {
  return (
    <Stagger 
      delay={100}
      variant="fadeInUp"
      disabled={!shouldAnimate}
    >
      {children}
    </Stagger>
  );
}

// Usage
<ConditionalStagger shouldAnimate={user.prefersAnimation}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</ConditionalStagger>
```

### Navigation Menu

```tsx
function NavigationMenu() {
  return (
    <nav>
      <Stagger delay={80} variant="fadeInLeft" direction="forward">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </Stagger>
    </nav>
  );
}
```

### Image Grid

```tsx
function ImageGrid({ images }) {
  return (
    <Stagger 
      delay={120} 
      variant="scaleUp" 
      direction="center-out"
      threshold={0.3}
      maxChildren={10}
    >
      {images.map(image => (
        <img key={image.id} src={image.url} alt={image.alt} />
      ))}
    </Stagger>
  );
}
```

### Custom Stagger Timing

```tsx
// Slower stagger for dramatic effect
<Stagger delay={200} variant="fadeInUp" duration={800} direction="reverse">
  <Section>Section 1</Section>
  <Section>Section 2</Section>
  <Section>Section 3</Section>
</Stagger>

// Fast stagger for subtle effect
<Stagger delay={40} variant="fadeIn" duration={300} direction="edges-in">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</Stagger>
```

### Nested Staggers

```tsx
function NestedStagger() {
  return (
    <Stagger delay={150} variant="fadeInUp" direction="center-out">
      <section>
        <h2>Section 1</h2>
        <Stagger delay={80} variant="fadeInLeft" direction="forward">
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </Stagger>
      </section>
      <section>
        <h2>Section 2</h2>
        <Stagger delay={80} variant="fadeInLeft" direction="reverse">
          <p>Paragraph 3</p>
          <p>Paragraph 4</p>
        </Stagger>
      </section>
    </Stagger>
  );
}
```

### Stagger Advanced Customization Basic Usage

```tsx
<Stagger
  delay={150}
  variant="slideUp"
  direction="center-out"
  duration={600}
  timing="elastic"
  threshold={0.3}
  maxChildren={8}
  onAnimationStart={(index) => console.log(`Item ${index} started`)}
  onAnimationComplete={(index) => console.log(`Item ${index} completed`)}
  onAllAnimationsComplete={() => console.log('All done!')}
  className="custom-stagger"
  style={{ marginTop: '20px' }}
>
  {items.map(item => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</Stagger>
```

## Motion Component

State-based animations using enhanced spring physics with new animation types including bounce, shake, flip effects, and expanded spring presets.

### Dropdown Menu

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

### Enhanced Spring Presets

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

## useIntersectionObserver Hook

Low-level hook for custom viewport-triggered animations.

### Basic Usage of the useIntersectionObserver Hook

```tsx
import { useIntersectionObserver } from '@spexop/react';

function CustomReveal() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out'
      }}
    >
      Custom animated content
    </div>
  );
}
```

### With Delay

```tsx
function DelayedReveal() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.3,
    delay: 500  // Wait 500ms after visible
  });

  return (
    <div ref={ref} className={isVisible ? 'visible' : 'hidden'}>
      Content with delayed animation
    </div>
  );
}
```

### Repeated Trigger

```tsx
function RepeatedAnimation() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: false  // Animate every time
  });

  return (
    <div
      ref={ref}
      className={isVisible ? 'animate-in' : 'animate-out'}
    >
      Animates on every scroll
    </div>
  );
}
```

### Progress Tracking

```tsx
function ProgressBar() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.8 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress(p => Math.min(p + 10, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <div ref={ref}>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
```

### Multiple Elements

```tsx
function MultipleObservers() {
  const [ref1, isVisible1] = useIntersectionObserver();
  const [ref2, isVisible2] = useIntersectionObserver();
  const [ref3, isVisible3] = useIntersectionObserver();

  return (
    <>
      <div ref={ref1} className={isVisible1 ? 'visible' : ''}>
        Section 1
      </div>
      <div ref={ref2} className={isVisible2 ? 'visible' : ''}>
        Section 2
      </div>
      <div ref={ref3} className={isVisible3 ? 'visible' : ''}>
        Section 3
      </div>
    </>
  );
}
```

## useSpring Hook

Physics-based value interpolation for smooth animations.

### Animated Counter

```tsx
import { useSpring } from '@spexop/react';

function AnimatedCounter({ target }) {
  const value = useSpring(target, 'gentle');

  return (
    <div className="counter">
      {Math.round(value)}
    </div>
  );
}

// Usage
<AnimatedCounter target={1000} />
```

### Progress Circle

```tsx
function ProgressCircle({ percent }) {
  const progress = useSpring(percent, {
    stiffness: 100,
    damping: 20
  });

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width="100" height="100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}
```

### Smooth Scroll Progress

```tsx
function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const smoothProgress = useSpring(scrollPercent, 'default');

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const percent = (scrollTop / (docHeight - winHeight)) * 100;
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${smoothProgress}%` }}
    />
  );
}
```

### Interactive Scale

```tsx
function ScaleOnHover() {
  const [isHovered, setIsHovered] = useState(false);
  const scale = useSpring(isHovered ? 1.1 : 1, 'wobbly');

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: `scale(${scale})` }}
    >
      Hover me
    </div>
  );
}
```

## useMotionValue Hook

Eased value transitions with custom timing.

### Fade Controller

```tsx
import { useMotionValue } from '@spexop/react';

function FadeController({ isVisible }) {
  const opacity = useMotionValue(
    isVisible ? 1 : 0,
    { duration: 600, easing: 'easeOutCubic' }
  );

  return (
    <div style={{ opacity }}>
      Content fades with easing
    </div>
  );
}
```

### Smooth Value Transition

```tsx
function ValueDisplay({ value }) {
  const smoothValue = useMotionValue(value, {
    duration: 400,
    easing: 'easeInOut'
  });

  return (
    <div className="value-display">
      {smoothValue.toFixed(2)}
    </div>
  );
}
```

### Custom Easing Functions

```tsx
import { useMotionValue, EASINGS } from '@spexop/react';

function CustomEasing({ target }) {
  // Built-in easing
  const value1 = useMotionValue(target, { easing: 'easeOutExpo' });

  // Custom easing function
  const customEasing = (t: number) => t * t * t;
  const value2 = useMotionValue(target, { easing: customEasing });

  return (
    <div>
      <div>Built-in: {value1}</div>
      <div>Custom: {value2}</div>
    </div>
  );
}
```

### Delayed Transition

```tsx
function DelayedValue({ value }) {
  const delayed = useMotionValue(value, {
    duration: 300,
    delay: 500,
    easing: 'easeOut'
  });

  return <div>{delayed}</div>;
}
```

## Advanced Patterns

### Orchestrated Sequence

Combine multiple animations for complex sequences:

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

      <Stagger delay={100} variant="scaleUp">
        <button className="cta-primary">Get Started</button>
        <button className="cta-secondary">Learn More</button>
      </Stagger>
    </div>
  );
}
```

### Scroll-Based Parallax

```tsx
function ParallaxSection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0 });
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const offset = window.innerHeight - rect.top;
        setScrollOffset(offset * 0.3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div ref={ref} className="parallax-container">
      <div
        className="parallax-content"
        style={{ transform: `translateY(-${scrollOffset}px)` }}
      >
        <h2>Parallax Content</h2>
      </div>
    </div>
  );
}
```

### Conditional Reveal Animation

```tsx
function ConditionalReveal({ shouldAnimate, children }) {
  if (!shouldAnimate) {
    return <>{children}</>;
  }

  return (
    <FadeIn direction="up" duration={600}>
      {children}
    </FadeIn>
  );
}

// Usage
<ConditionalReveal shouldAnimate={user.prefersAnimation}>
  <Card>Content</Card>
</ConditionalReveal>
```

### Loading State Animation

```tsx
function LoadingState({ isLoading, data }) {
  if (isLoading) {
    return (
      <Motion isActive={true} type="fade" spring="gentle">
        <div className="spinner">Loading...</div>
      </Motion>
    );
  }

  return (
    <Stagger delay={80} variant="fadeInUp">
      {data.map(item => (
        <DataCard key={item.id} {...item} />
      ))}
    </Stagger>
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

// Usage with React Router
<PageTransition location={location}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</PageTransition>
```

### Form Field Reveal

```tsx
function AnimatedForm() {
  return (
    <form>
      <Stagger delay={100} variant="fadeInLeft">
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

## Best Practices

### DO

- Use subtle animations (200-600ms duration)
- Prefer `transform` and `opacity` for performance
- Set `once={true}` for content that shouldn't re-animate
- Use appropriate thresholds (0.1-0.3 for large elements)
- Stagger animations with 80-150ms delays
- Test with `prefers-reduced-motion` enabled
- Use spring physics for interactive elements
- Keep animation purposes clear (don't animate for animation's sake)

### DON'T

- Don't use long animations (>1000ms)
- Don't animate width/height (causes layout shifts)
- Don't chain too many animations
- Don't block content with animations
- Don't use animations on every element
- Don't ignore accessibility preferences
- Don't animate critical interactive elements
- Don't use animations to hide loading issues

## Accessibility

### Reduced Motion Support

All animation components respect `prefers-reduced-motion`:

```css
/* Automatically applied by components */
@media (prefers-reduced-motion: reduce) {
  .spex-reveal {
    transition-duration: 0.001ms !important;
  }
}
```

### Testing Reduced Motion

```tsx
// Enable in browser DevTools or OS settings
// Components will automatically disable/speed up animations
```

### Manual Reduced Motion Check

```tsx
function RespectfulAnimation() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    return <div>Content without animation</div>;
  }

  return (
    <FadeIn direction="up">
      <div>Animated content</div>
    </FadeIn>
  );
}
```

## Performance Optimization

### Lazy Load Animations

```tsx
// Only import when needed
const FadeIn = lazy(() => import('@spexop/react').then(m => ({ default: m.FadeIn })));

function OptimizedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FadeIn direction="up">
        <Content />
      </FadeIn>
    </Suspense>
  );
}
```

### Limit Simultaneous Animations

```tsx
// ✅ Good: Staggered animations
<Stagger delay={80}>
  {items.map(item => <Card key={item.id} />)}
</Stagger>

// ❌ Bad: All at once
{items.map(item => (
  <FadeIn key={item.id}>
    <Card />
  </FadeIn>
))}
```

### Use Once for Static Content

```tsx
// Content that doesn't need to re-animate
<Reveal variant="fadeInUp" once={true}>
  <Footer />
</Reveal>
```

### Monitor Performance

```tsx
useEffect(() => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 16) {
        console.warn('Slow animation frame:', entry);
      }
    }
  });

  observer.observe({ entryTypes: ['measure'] });
  return () => observer.disconnect();
}, []);
```

## Troubleshooting

### Animation Not Triggering

**Problem**: Element doesn't animate when scrolled into view

**Solutions**:

```tsx
// 1. Check threshold - might need lower value
<Reveal threshold={0.1}>  // Instead of 0.5
  <Content />
</Reveal>

// 2. Element might already be visible on mount
<Reveal threshold={0}>  // Trigger immediately
  <Content />
</Reveal>

// 3. Parent might have overflow hidden
// Ensure parent doesn't hide IntersectionObserver
```

### Animation Too Fast/Slow

**Problem**: Animation duration doesn't feel right

**Solutions**:

```tsx
// Adjust duration
<FadeIn duration={600}>  // Slower
  <Content />
</FadeIn>

// Try different timing functions
<FadeIn timing="ease-in-out">  // Smoother
  <Content />
</FadeIn>

// Use spring physics instead
<Motion spring="gentle">  // Natural feel
  <Content />
</Motion>
```

### Stagger Not Working

**Problem**: Children animate simultaneously instead of staggered

**Solutions**:

```tsx
// Ensure children are direct descendants
<Stagger delay={100}>
  <Card>1</Card>  {/* ✅ Direct child */}
  <Card>2</Card>
  <Card>3</Card>
</Stagger>

// Not this:
<Stagger delay={100}>
  <div>  {/* ❌ Wrapper prevents stagger */}
    <Card>1</Card>
    <Card>2</Card>
  </div>
</Stagger>

// Increase delay for more noticeable effect
<Stagger delay={150}>  // More visible
  <Card>1</Card>
  <Card>2</Card>
</Stagger>
```

### Motion Not Animating

**Problem**: Motion component doesn't animate state changes

**Solutions**:

```tsx
// Ensure isActive prop changes
const [active, setActive] = useState(false);

<Motion isActive={active} type="slideDown">
  <Content />
</Motion>

// Check spring configuration
<Motion
  isActive={active}
  spring="default"  // Try different preset
>
  <Content />
</Motion>
```

### Performance Issues

**Problem**: Animations cause lag or jank

**Solutions**:

```tsx
// 1. Reduce simultaneous animations
<Stagger delay={100}>  // Staggers reduce load
  {items.map(item => <Card key={item.id} />)}
</Stagger>

// 2. Use once={true} for static content
<Reveal once={true}>
  <StaticContent />
</Reveal>

// 3. Shorten durations
<FadeIn duration={300}>  // Faster = less work
  <Content />
</FadeIn>

// 4. Check for layout thrashing
// Don't animate width, height, top, left
// Only use transform and opacity
```

### TypeScript Errors

**Problem**: Type errors with animation props

**Solutions**:

```tsx
import type { AnimationVariant } from '@spexop/react';

// Ensure variant is typed correctly
const variant: AnimationVariant = 'fadeInUp';

<Reveal variant={variant}>
  <Content />
</Reveal>

// For custom types
import type { AnimationProps } from '@spexop/react';

interface CustomAnimatedProps extends AnimationProps {
  customProp: string;
}
```

## Browser Compatibility

All modern browsers supported:

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

**Polyfills**: None required for supported browsers

**Graceful Degradation**: Content renders immediately if IntersectionObserver unavailable

## Migration Guide

### From v0.2.x to v0.3.0

No breaking changes. All existing APIs remain compatible. New features are additive.

### New Features in v0.3.0

- Enhanced FadeIn with custom distance, opacity, and callbacks
- New Motion animation types (bounce, shake, flipX, flipY, zoom)
- 5 new spring presets (molasses, bouncy, crisp, smooth, elastic)
- Hardware acceleration control for Motion component
- Improved spring physics with better stability
- Enhanced TypeScript types for all new features

### Migration Examples

```tsx
// v0.2.x - Basic FadeIn
<FadeIn direction="up">
  <Card>Content</Card>
</FadeIn>

// v0.3.0 - Enhanced FadeIn (backward compatible)
<FadeIn direction="up">
  <Card>Content</Card>
</FadeIn>

// v0.3.0 - New features
<FadeIn 
  direction="up" 
  distance={30}
  opacity={{ from: 0.3, to: 1 }}
  onAnimationComplete={() => console.log('Done!')}
>
  <Card>Enhanced content</Card>
</FadeIn>

// v0.2.x - Basic Motion
<Motion isActive={isOpen} type="slideDown">
  <div>Content</div>
</Motion>

// v0.3.0 - Enhanced Motion (backward compatible)
<Motion isActive={isOpen} type="slideDown">
  <div>Content</div>
</Motion>

// v0.3.0 - New animation types
<Motion isActive={isOpen} type="bounce" spring="bouncy">
  <div>Bouncing content</div>
</Motion>
```

## Related Components

- **Card** - Animated card containers
- **Button** - Interactive button animations
- **Grid** - Layout for animated content
- **Stack** - Sequential layouts

## Examples Repository

See the examples directory for complete working demos:

- Hero sections with animations
- Product galleries
- Feature lists
- Interactive forms
- Page transitions

## Support

- Documentation: <https://spexop.dev/docs>
- GitHub: <https://github.com/spexop-ui/spexop>
- Issues: <https://github.com/spexop-ui/spexop/issues>

## License

MIT License - See LICENSE file for details

---

**Built with Spexop design principles for refined, accessible animations.**
