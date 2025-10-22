# Carousel Component

A slideshow component following Spexop design principles with bold borders, high-contrast controls, and full accessibility support.

**See [USAGE-GUIDE.md](./USAGE-GUIDE.md) for comprehensive usage examples, best practices, and troubleshooting.**

## Features

✅ **Borders Before Shadows** - Bold 3px borders, zero shadows (Refined Minimalism)  
✅ **High-Contrast Controls** - WCAG AAA compliant navigation (7:1 text, 3:1 UI)  
✅ **Keyboard Navigation** - Arrow keys, Home, End support  
✅ **Touch/Swipe Gestures** - Mobile-first swipe navigation  
✅ **Mouse Drag Support** - Desktop drag-to-navigate  
✅ **Transition Variants** - Slide (default) and Fade effects  
✅ **Thumbnail Navigation** - Visual preview navigation (bottom or side)  
✅ **Peek Mode** - Show partial next/previous slides  
✅ **Aspect Ratio Control** - Constrain slide dimensions (16/9, 4/3, etc.)  
✅ **Lazy Loading** - Performance optimization for large galleries  
✅ **Auto-Play** - Optional auto-advance with pause on hover  
✅ **Dot Indicators** - Visual navigation with high contrast  
✅ **Item Counter** - Optional "1 / 5" display  
✅ **Infinite Loop** - Seamless continuous navigation  
✅ **Reduced Motion** - Respects user preferences  
✅ **Responsive** - Adapts to mobile (44px) and desktop (56px arrows)  
✅ **@spexop/icons** - Uses design system icons (ChevronLeft/ChevronRight)  

## Design Principles Applied

### 1. Borders Before Shadows (Principle #2)

```css
/* ✅ Bold 3px borders, no shadows */
border: 3px solid var(--s-color-neutral-900);

/* ❌ NOT USED: Heavy shadows */
/* box-shadow: 0 10px 50px rgba(0,0,0,0.3); */
```

### 2. Typography Before Decoration (Principle #3)

Counter uses typography for emphasis:

```css
.counter {
  font-size: var(--s-font-size-sm);
  font-weight: var(--s-font-weight-semibold);
  letter-spacing: 0.5px;
}
```

### 3. Accessibility Before Aesthetics (Principle #7)

- 7:1 contrast ratio on all text (WCAG AAA)
- 3:1 contrast ratio on all UI components
- 56px arrow buttons on desktop (44px minimum)
- Full keyboard navigation
- Complete ARIA support

### 4. Tokens Before Magic Numbers (Principle #4)

All values use design tokens:

```css
padding: var(--s-spacing-8);
gap: var(--s-spacing-3);
border-radius: var(--s-radius-md);
color: var(--s-color-neutral-900);
```

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

```tsx
import { Carousel } from '@spexop/react';

const items = [
  { 
    id: '1', 
    content: <img src="slide1.jpg" alt="Product view 1" />,
    ariaLabel: "Product view 1 of 3"
  },
  { 
    id: '2', 
    content: <img src="slide2.jpg" alt="Product view 2" />,
    ariaLabel: "Product view 2 of 3"
  },
  { 
    id: '3', 
    content: <img src="slide3.jpg" alt="Product view 3" />,
    ariaLabel: "Product view 3 of 3"
  }
];

function ProductGallery() {
  return (
    <Carousel
      items={items}
      showArrows
      showDots
      ariaLabel="Product image gallery"
    />
  );
}
```

## Props

### CarouselProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CarouselItem[]` | **Required** | Array of items to display |
| `activeIndex` | `number` | `undefined` | Controlled active index |
| `onChange` | `(index: number) => void` | `undefined` | Callback when active item changes |
| `variant` | `"slide" \| "fade"` | `"slide"` | Transition effect variant |
| `autoPlayInterval` | `number` | `undefined` | Auto-advance interval in ms |
| `showArrows` | `boolean` | `true` | Show previous/next arrows |
| `showDots` | `boolean` | `true` | Show dot indicators |
| `showCounter` | `boolean` | `false` | Show item counter (e.g., "1 / 5") |
| `showThumbnails` | `boolean` | `false` | Show thumbnail navigation |
| `thumbnailPosition` | `"bottom" \| "side"` | `"bottom"` | Thumbnail layout position |
| `loop` | `boolean` | `true` | Enable infinite loop |
| `enableKeyboard` | `boolean` | `true` | Enable keyboard navigation |
| `enableSwipe` | `boolean` | `true` | Enable touch/swipe + mouse drag |
| `showPeek` | `boolean` | `false` | Show partial next/prev slides |
| `peekAmount` | `number \| string` | `60` | Peek distance (px or %) |
| `lazyLoad` | `boolean` | `false` | Enable lazy loading |
| `preloadCount` | `number` | `1` | Slides to preload adjacent to active |
| `transitionDuration` | `number` | `300` | Transition duration in ms |
| `aspectRatio` | `string` | `undefined` | Slide aspect ratio (e.g., "16/9") |
| `pauseOnHover` | `boolean` | `true` | Pause auto-play on hover |
| `ariaLabel` | `string` | `"Carousel"` | ARIA label for carousel |
| `className` | `string` | `""` | Additional CSS class |

### CarouselItem

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | **Required** - Unique identifier |
| `content` | `ReactNode` | **Required** - Content to display |
| `ariaLabel` | `string` | Optional ARIA label for the item |
| `thumbnail` | `string` | Optional thumbnail image URL |
| `thumbnailAlt` | `string` | Optional alt text for thumbnail |

## Examples

### Auto-Play Carousel

```tsx
<Carousel
  items={items}
  autoPlayInterval={5000}
  pauseOnHover
  showArrows
  showDots
  ariaLabel="Featured products"
/>
```

### Controlled Carousel

```tsx
function ControlledExample() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Carousel
      items={items}
      activeIndex={activeIndex}
      onChange={setActiveIndex}
      showArrows
      showDots
      ariaLabel="Testimonials"
    />
  );
}
```

### With Counter (No Dots)

```tsx
<Carousel
  items={items}
  showArrows
  showDots={false}
  showCounter
  ariaLabel="Tutorial steps"
/>
```

### Non-Looping Carousel

```tsx
<Carousel
  items={items}
  loop={false}
  showArrows
  showDots
  ariaLabel="Step-by-step guide"
/>
```

### Text Content Carousel

```tsx
const testimonials = [
  {
    id: '1',
    content: (
      <div style={{ textAlign: 'center', padding: 'var(--s-spacing-8)' }}>
        <p style={{ fontSize: 'var(--s-font-size-xl)', marginBottom: 'var(--s-spacing-4)' }}>
          "This design system transformed our workflow."
        </p>
        <p style={{ fontWeight: 'var(--s-font-weight-semibold)' }}>
          - Sarah Johnson, Lead Designer
        </p>
      </div>
    ),
    ariaLabel: "Testimonial from Sarah Johnson"
  },
  // More testimonials...
];

<Carousel
  items={testimonials}
  autoPlayInterval={8000}
  showArrows
  showDots
  ariaLabel="Customer testimonials"
/>
```

### Custom Content with Grid

```tsx
import { Carousel, Grid, GridItem } from '@spexop/react';

const features = [
  {
    id: '1',
    content: (
      <Grid columns={2} gap={6}>
        <GridItem>
          <img src="feature1.jpg" alt="Feature 1" />
        </GridItem>
        <GridItem>
          <h3>Fast Performance</h3>
          <p>Optimized for speed and efficiency.</p>
        </GridItem>
      </Grid>
    )
  },
  // More features...
];

<Carousel items={features} showArrows showDots />
```

## New Features

### Transition Variants

Choose between slide and fade transition effects:

```tsx
// Slide variant (default) - slides horizontally
<Carousel
  items={items}
  variant="slide"
  showArrows
  ariaLabel="Product showcase"
/>

// Fade variant - cross-fade effect
<Carousel
  items={items}
  variant="fade"
  autoPlayInterval={4000}
  showDots
  ariaLabel="Image gallery"
/>
```

**Features:**

- Slide: GPU-accelerated horizontal sliding
- Fade: Smooth opacity transitions
- Drag support works with slide variant only
- Reduced motion support for both

### Mouse Drag Support (Desktop)

Desktop users can drag slides with the mouse:

```tsx
<Carousel
  items={items}
  enableSwipe={true}  // Enables both touch swipe AND mouse drag
  variant="slide"     // Drag only works with slide variant
  showArrows
/>
```

**Drag Features:**

- Works on desktop with mouse
- Visual feedback (cursor changes to grabbing)
- 50px minimum drag distance
- Smooth drag-follow animation
- Auto-disabled for fade variant

### Peek Mode (Show Partial Slides)

Show partial next/previous slides for context:

```tsx
<Carousel
  items={items}
  showPeek
  peekAmount={60}  // Show 60px of adjacent slides
  showArrows
  ariaLabel="Product lineup"
/>

// Or use percentage
<Carousel
  items={items}
  showPeek
  peekAmount="10%"  // Show 10% of adjacent slides
/>
```

**Peek Features:**

- Creates visual depth and context
- User knows more content exists
- Works with infinite loop
- Configurable amount (px or %)

### Aspect Ratio Control

Constrain slide dimensions for consistent layout:

```tsx
// 16:9 widescreen
<Carousel
  items={items}
  aspectRatio="16/9"
  showArrows
/>

// 4:3 standard
<Carousel
  items={items}
  aspectRatio="4/3"
/>

// 1:1 square
<Carousel
  items={items}
  aspectRatio="1/1"
/>
```

**Aspect Ratio Benefits:**

- Prevents layout shift
- Consistent sizing across slides
- CSS aspect-ratio property
- Works with responsive images

### Thumbnail Navigation (Bottom or Side)

Display visual previews for navigation:

```tsx
const items = [
  {
    id: '1',
    content: <img src="/images/product-1-large.jpg" alt="Product view 1" />,
    thumbnail: '/images/product-1-thumb.jpg',
    thumbnailAlt: 'Product thumbnail 1',
    ariaLabel: 'Product view 1 of 5'
  },
  {
    id: '2',
    content: <img src="/images/product-2-large.jpg" alt="Product view 2" />,
    thumbnail: '/images/product-2-thumb.jpg',
    thumbnailAlt: 'Product thumbnail 2',
    ariaLabel: 'Product view 2 of 5'
  },
  // More items...
];

<Carousel
  items={items}
  showThumbnails
  showArrows
  ariaLabel="Product image gallery"
/>
```

// Side thumbnails (vertical layout)

```tsx
<Carousel
  items={items}
  showThumbnails
  thumbnailPosition="side"
  showArrows
  ariaLabel="Product gallery"
/>
```

**Thumbnail Features:**

- Bottom or side positioning
- Keyboard navigation with Arrow keys (Left/Right for bottom, Up/Down for side)
- High-contrast active state (3px border)
- Touch-friendly (60px minimum on touch devices)
- Automatic scrolling in overflow
- Falls back to numbered placeholders if no thumbnail provided

### Lazy Loading for Performance

Optimize large galleries by only rendering visible slides:

```tsx
const largeGallery = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  content: <img src={`/gallery/image-${i + 1}.jpg`} alt={`Image ${i + 1}`} loading="lazy" />,
  thumbnail: `/gallery/thumb-${i + 1}.jpg`,
}));

<Carousel
  items={largeGallery}
  lazyLoad
  preloadCount={2}  // Preload 2 slides on each side
  showThumbnails
  showArrows
  ariaLabel="Photo gallery"
/>
```

**Performance Benefits:**

- Only active slide + `preloadCount` adjacent slides are rendered
- Reduces initial render time for large galleries
- Lower memory footprint
- Smooth transitions with preloading
- Works seamlessly with infinite loop

**Recommended Settings:**

- `preloadCount={1}` - For image-heavy carousels (default)
- `preloadCount={2}` - For faster navigation feel
- `preloadCount={0}` - Maximum performance (only active slide)

### Mobile-First Swipe Carousel

Optimized for touch devices:

```tsx
<Carousel
  items={items}
  enableSwipe
  showDots
  showArrows={false}  // Hide arrows on mobile
  pauseOnHover={false}  // Disable hover behavior on touch
  ariaLabel="Featured products"
/>
```

### Product Gallery with All Features

Complete example combining all features:

```tsx
import { Carousel } from '@spexop/react';
import { useState } from 'react';

function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const productImages = [
    {
      id: '1',
      content: <img src="/products/shoe-angle1.jpg" alt="Running shoe - angle 1" />,
      thumbnail: '/products/shoe-angle1-thumb.jpg',
      thumbnailAlt: 'Angle 1 preview',
    },
    {
      id: '2',
      content: <img src="/products/shoe-angle2.jpg" alt="Running shoe - angle 2" />,
      thumbnail: '/products/shoe-angle2-thumb.jpg',
      thumbnailAlt: 'Angle 2 preview',
    },
    {
      id: '3',
      content: <img src="/products/shoe-top.jpg" alt="Running shoe - top view" />,
      thumbnail: '/products/shoe-top-thumb.jpg',
      thumbnailAlt: 'Top view preview',
    },
    {
      id: '4',
      content: <img src="/products/shoe-sole.jpg" alt="Running shoe - sole" />,
      thumbnail: '/products/shoe-sole-thumb.jpg',
      thumbnailAlt: 'Sole preview',
    },
  ];

  return (
    <div>
      <Carousel
        items={productImages}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        showThumbnails
        showArrows
        enableSwipe
        lazyLoad={false}  // Small gallery, no need for lazy loading
        transitionDuration={400}
        ariaLabel="Product image gallery"
      />
      <p>Currently viewing: {activeIndex + 1} of {productImages.length}</p>
    </div>
  );
}
```

### Large Gallery with Lazy Loading

Handling 100+ images efficiently:

```tsx
function PhotoGallery() {
  // Generate large set of images
  const photos = Array.from({ length: 150 }, (_, i) => ({
    id: `photo-${i + 1}`,
    content: (
      <img
        src={`/photos/full/${i + 1}.jpg`}
        alt={`Photo ${i + 1}`}
        loading="lazy"
        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
      />
    ),
    thumbnail: `/photos/thumbs/${i + 1}.jpg`,
    thumbnailAlt: `Photo ${i + 1} thumbnail`,
  }));

  return (
    <Carousel
      items={photos}
      lazyLoad
      preloadCount={2}
      showThumbnails
      showArrows
      showCounter
      enableSwipe
      ariaLabel="Photo collection"
    />
  );
}
```

## Touch/Swipe Gestures

The carousel supports native touch gestures for mobile devices:

- **Swipe Left** - Next slide
- **Swipe Right** - Previous slide
- **Minimum swipe distance** - 50px (prevents accidental swipes)
- **Respects loop setting** - Wraps around if loop is enabled

```tsx
<Carousel
  items={items}
  enableSwipe={true}  // Default
  showArrows
  ariaLabel="Product gallery"
/>
```

Disable swipe if needed:

```tsx
<Carousel
  items={items}
  enableSwipe={false}
  showArrows
/>
```

## Keyboard Navigation

When the carousel or any of its controls are focused:

### Main Carousel Navigation

- **Arrow Left** - Previous slide
- **Arrow Right** - Next slide
- **Home** - First slide
- **End** - Last slide
- **Tab** - Navigate through controls (arrows, dots, thumbnails)

### Thumbnail Navigation Features

- **Arrow Left/Right** - Navigate between thumbnails
- **Enter/Space** - Activate selected thumbnail
- **Tab** - Move focus to next interactive element

## Accessibility

### ARIA Support

The carousel implements full ARIA support:

- `role="group"` and `aria-roledescription="slide"` on slides
- `role="tablist"` and `role="tab"` on dot indicators and thumbnails
- `aria-live="polite"` for screen reader announcements
- `aria-hidden="true"` on inactive slides
- `aria-label` on navigation buttons and thumbnails
- `aria-selected` on active dot and thumbnail
- Proper focus management for keyboard navigation

### Screen Reader Experience

1. Announces carousel role and label
2. Announces current slide when changed
3. Provides context for each slide
4. Clear button labels ("Previous slide", "Next slide", "Go to slide 1")

### High Contrast Mode

Automatically increases border widths in high contrast mode:

```css
@media (prefers-contrast: high) {
  border-width: 4px; /* Increased from 3px */
}
```

### Reduced Motion

Respects `prefers-reduced-motion` preference:

```css
@media (prefers-reduced-motion: reduce) {
  transition-duration: 0ms !important;
}
```

### Touch Device Accessibility

Optimized touch targets for mobile:

```css
@media (hover: none) and (pointer: coarse) {
  .arrowButton {
    min-width: 44px;  /* WCAG AAA minimum */
    min-height: 44px;
  }
  
  .dot {
    min-width: 44px;
    min-height: 44px;
  }
  
  .thumbnail {
    min-width: 60px;
    min-height: 60px;
  }
}
```

## Mobile UX Best Practices

### Recommended Mobile Configuration

```tsx
// Mobile-optimized setup
<Carousel
  items={items}
  enableSwipe={true}
  showArrows={false}  // Hide arrows on mobile, rely on swipe
  showDots={true}     // Keep dots for visual feedback
  showThumbnails={false}  // Optional: may be too small on mobile
  pauseOnHover={false}    // Hover doesn't exist on touch devices
  transitionDuration={250}  // Snappier on mobile
  ariaLabel="Product gallery"
/>
```

### Responsive Carousel Setup

Use media queries or responsive hooks to adapt:

```tsx
import { Carousel } from '@spexop/react';
import { useMediaQuery } from '@spexop/react';

function ResponsiveCarousel({ items }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <Carousel
      items={items}
      enableSwipe={isMobile}
      showArrows={!isMobile}
      showThumbnails={!isMobile}
      showDots={true}
      transitionDuration={isMobile ? 250 : 300}
      ariaLabel="Responsive gallery"
    />
  );
}
```

### Mobile Performance Tips

1. **Use Lazy Loading** for galleries with 10+ images:

   ```tsx
   <Carousel items={items} lazyLoad preloadCount={1} />
   ```

2. **Optimize Images** with appropriate sizes:

   ```tsx
   const items = [
     {
       id: '1',
       content: (
         <img
           src="/mobile/image-1.jpg"
           srcSet="/mobile/image-1.jpg 480w, /desktop/image-1.jpg 1200w"
           sizes="(max-width: 768px) 100vw, 1200px"
           alt="Product"
           loading="lazy"
         />
       ),
     },
   ];
   ```

3. **Enable Hardware Acceleration** - Already built-in via `transform` CSS

4. **Reduce Transition Duration** on mobile for snappier feel

### Touch Interaction Guidelines

- **Swipe Distance**: 50px minimum prevents accidental swipes
- **Touch Feedback**: Visual feedback on thumbnail/dot activation
- **Gesture Conflict**: Carousel disables y-axis scrolling during swipe
- **Auto-Play**: Consider disabling on mobile or longer intervals

```tsx
// Mobile-friendly auto-play
<Carousel
  items={items}
  autoPlayInterval={isMobile ? 5000 : 3000}  // Longer on mobile
  pauseOnHover={!isMobile}  // Only on desktop
  enableSwipe={isMobile}
/>
```

## Styling Customization

### Custom Container Width

```tsx
<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
  <Carousel items={items} />
</div>
```

### Custom Slide Content

```tsx
const items = [
  {
    id: '1',
    content: (
      <div style={{
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <YourCustomComponent />
      </div>
    )
  }
];
```

### Custom Aspect Ratio (Images)

```tsx
const items = [
  {
    id: '1',
    content: (
      <img 
        src="slide.jpg" 
        alt="Slide" 
        style={{ 
          width: '100%', 
          height: '500px', 
          objectFit: 'cover' 
        }} 
      />
    )
  }
];
```

## Performance Considerations

### Lazy Loading Strategy

The carousel's lazy loading only renders slides near the active index:

```tsx
// Only renders: active slide + preloadCount on each side
<Carousel
  items={largeGallery}
  lazyLoad
  preloadCount={1}  // Renders 3 slides total (active + 1 before + 1 after)
/>
```

**Performance Impact:**

- 100 slide gallery with `lazyLoad={false}`: Renders 100 elements
- 100 slide gallery with `lazyLoad` and `preloadCount={1}`: Renders 3 elements
- 97% reduction in DOM nodes!

### Lazy Loading Images

Combine carousel lazy loading with native image lazy loading:

```tsx
const items = [
  {
    id: '1',
    content: <img src="slide1.jpg" alt="Slide 1" loading="lazy" />
  }
];

<Carousel items={items} lazyLoad preloadCount={1} />
```

### GPU-Accelerated Transitions

The carousel uses `transform: translateX()` for smooth, GPU-accelerated transitions:

```css
.slidesContainer {
  transform: translateX(-100%);
  will-change: transform;
}
```

### Auto-Play Cleanup

Auto-play timers are automatically cleaned up when:

- Component unmounts
- User hovers (if `pauseOnHover` is true)
- User navigates manually
- User swipes on touch devices

### Thumbnail Image Optimization

Thumbnails should be appropriately sized:

```tsx
// ✅ Good: Optimized 80x60px thumbnails
thumbnail: '/products/thumb-80x60.jpg'

// ❌ Bad: Full-size image as thumbnail
thumbnail: '/products/full-4000x3000.jpg'
```

## Common Patterns

### Product Gallery

```tsx
<Carousel
  items={productImages}
  showArrows
  showDots
  loop
  ariaLabel="Product images"
/>
```

### Testimonials Carousel

```tsx
<Carousel
  items={testimonials}
  autoPlayInterval={8000}
  showArrows={false}
  showDots
  ariaLabel="Customer testimonials"
/>
```

### Tutorial Steps

```tsx
<Carousel
  items={tutorialSteps}
  loop={false}
  showCounter
  showArrows
  ariaLabel="Tutorial steps"
/>
```

### Hero Slider

```tsx
<Carousel
  items={heroSlides}
  autoPlayInterval={6000}
  showArrows
  showDots
  transitionDuration={500}
  ariaLabel="Featured content"
/>
```

## Integration with Grid Primitives

```tsx
import { Container, Grid, GridItem, Carousel } from '@spexop/react';

<Container maxWidth="2xl" padding={6}>
  <Grid columns={{ xs: 1, md: 2 }} gap={6}>
    <GridItem>
      <Carousel items={products} showArrows showDots />
    </GridItem>
    <GridItem>
      <h2>Product Details</h2>
      <p>Description...</p>
    </GridItem>
  </Grid>
</Container>
```

## Advanced Examples

### Complete Feature Showcase

Carousel with all features enabled:

```tsx
<Carousel
  items={productImages}
  variant="slide"
  showArrows
  showDots
  showThumbnails
  thumbnailPosition="bottom"
  showPeek
  peekAmount={40}
  aspectRatio="16/9"
  enableSwipe
  lazyLoad
  preloadCount={2}
  autoPlayInterval={5000}
  pauseOnHover
  transitionDuration={400}
  ariaLabel="Complete product showcase"
/>
```

### Fade Carousel with Aspect Ratio

Perfect for hero sections:

```tsx
<Carousel
  items={heroSlides}
  variant="fade"
  aspectRatio="21/9"
  showDots
  showArrows={false}
  autoPlayInterval={6000}
  transitionDuration={600}
  ariaLabel="Hero banner"
/>
```

### Peek Mode with Side Thumbnails

Best for product galleries:

```tsx
<Carousel
  items={productViews}
  showThumbnails
  thumbnailPosition="side"
  showPeek
  peekAmount={50}
  aspectRatio="4/3"
  enableSwipe
  ariaLabel="Product view gallery"
/>
```

## Feature Matrix

| Feature | Supported | Notes |
|---------|-----------|-------|
| Touch/Swipe | ✅ | Mobile & tablet |
| Mouse Drag | ✅ | Desktop only, slide variant |
| Keyboard Nav | ✅ | Arrow keys, Home, End |
| Slide Transition | ✅ | Default, GPU-accelerated |
| Fade Transition | ✅ | Smooth opacity animation |
| Thumbnails (Bottom) | ✅ | Horizontal scroll |
| Thumbnails (Side) | ✅ | Vertical scroll |
| Peek Mode | ✅ | Shows partial adjacent slides |
| Aspect Ratio | ✅ | Prevents layout shift |
| Lazy Loading | ✅ | Performance optimization |
| Auto-play | ✅ | With pause on hover |
| Infinite Loop | ✅ | Seamless wraparound |
| Dot Indicators | ✅ | High contrast |
| Item Counter | ✅ | "1 / 5" format |
| Reduced Motion | ✅ | Respects user preference |
| WCAG AAA | ✅ | 7:1 text, 3:1 UI contrast |

## Browser Support (Experimental)

All modern browsers with CSS aspect-ratio support:

- ✅ Chrome 88+
- ✅ Firefox 89+
- ✅ Safari 15+
- ✅ Edge 88+

For older browsers, aspect-ratio gracefully degrades.

## Related Components

- **Grid** - Layout container for multiple carousels
- **Container** - Max-width wrapper
- **Card** - Common carousel content
- **Button** - Custom navigation buttons

## Contributing

When contributing to Carousel:

1. Follow "The Spexop Way" design principles
2. Maintain WCAG AAA contrast ratios
3. Use tokens from `@spexop/theme` only
4. Test keyboard navigation and screen readers
5. Test all transition variants and layouts
6. Add tests for new features
7. Update documentation with examples

## Author

@olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui

## License

MIT © Spexop Design System
