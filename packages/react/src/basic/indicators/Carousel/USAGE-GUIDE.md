# Carousel - Usage Guide

**Component Version**: v1.0.0
**Last Updated**: October 20, 2025
**Compatibility**: Stable API

## Quick Start

### Installation

```bash
pnpm add @spexop/react
```

### Basic Example

```tsx
import { Carousel } from '@spexop/react';

const items = [
  { id: '1', content: <img src="slide1.jpg" alt="Slide 1" /> },
  { id: '2', content: <img src="slide2.jpg" alt="Slide 2" /> },
  { id: '3', content: <img src="slide3.jpg" alt="Slide 3" /> }
];

function MyCarousel() {
  return (
    <Carousel
      items={items}
      showArrows
      showDots
      ariaLabel="Image gallery"
    />
  );
}
```

## Common Use Cases

### Product Gallery

Perfect for e-commerce product images:

```tsx
import { Carousel } from '@spexop/react';

function ProductGallery({ product }) {
  const items = product.images.map((image, index) => ({
    id: image.id,
    content: (
      <img 
        src={image.url} 
        alt={`${product.name} - View ${index + 1}`}
      />
    ),
    ariaLabel: `Product image ${index + 1} of ${product.images.length}`
  }));

  return (
    <Carousel
      items={items}
      showArrows
      showDots
      showCounter
      aspectRatio="square"
      ariaLabel={`${product.name} image gallery`}
    />
  );
}
```

### Hero Banner with Auto-Play

Auto-advancing hero section:

```tsx
import { Carousel } from '@spexop/react';

function HeroBanner() {
  const banners = [
    { id: '1', content: <HeroBanner1 /> },
    { id: '2', content: <HeroBanner2 /> },
    { id: '3', content: <HeroBanner3 /> }
  ];

  return (
    <Carousel
      items={banners}
      variant="fade"
      autoPlayInterval={5000}
      showArrows
      showDots
      infinite
      ariaLabel="Featured promotions"
    />
  );
}
```

### Testimonials Carousel

Sliding testimonials with peek mode:

```tsx
import { Carousel } from '@spexop/react';

function Testimonials() {
  const testimonials = reviews.map((review) => ({
    id: review.id,
    content: (
      <div className="testimonial">
        <p>{review.text}</p>
        <cite>— {review.author}</cite>
      </div>
    )
  }));

  return (
    <Carousel
      items={testimonials}
      variant="slide"
      showArrows
      showDots={false}
      peekAmount="10%"
      infinite
      ariaLabel="Customer testimonials"
    />
  );
}
```

### Thumbnail Navigation

Gallery with thumbnail preview:

```tsx
import { Carousel } from '@spexop/react';

function GalleryWithThumbnails() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = images.map((image) => ({
    id: image.id,
    content: <img src={image.large} alt={image.alt} />,
    thumbnail: <img src={image.thumb} alt="" />
  }));

  return (
    <Carousel
      items={items}
      activeIndex={activeIndex}
      onChange={setActiveIndex}
      showThumbnails
      thumbnailPosition="bottom"
      showArrows
      aspectRatio="16/9"
      ariaLabel="Project gallery"
    />
  );
}
```

### Controlled Carousel

Full control over carousel state:

```tsx
import { Carousel } from '@spexop/react';

function ControlledExample() {
  const [index, setIndex] = useState(0);
  const items = slides.map((slide) => ({
    id: slide.id,
    content: <Slide data={slide} />
  }));

  return (
    <div>
      <Carousel
        items={items}
        activeIndex={index}
        onChange={setIndex}
        showArrows
        showDots
      />
      <div>
        <button onClick={() => setIndex(0)}>First</button>
        <button onClick={() => setIndex(items.length - 1)}>Last</button>
      </div>
    </div>
  );
}
```

## Features and Props

### Navigation Controls

#### Arrows

```tsx
<Carousel
  items={items}
  showArrows={true}              // Show prev/next arrows
  arrowPosition="sides"          // 'sides' | 'center'
  arrowSize="large"              // 'small' | 'medium' | 'large'
/>
```

#### Dots

```tsx
<Carousel
  items={items}
  showDots={true}                // Show dot indicators
  dotPosition="bottom"           // 'bottom' | 'top'
/>
```

#### Counter

```tsx
<Carousel
  items={items}
  showCounter={true}             // Show "1 / 5" counter
  counterPosition="top-right"    // Position on screen
/>
```

### Transitions

#### Slide Transition

```tsx
<Carousel
  items={items}
  variant="slide"                // Default: horizontal slide
  transitionDuration={300}       // Milliseconds
/>
```

#### Fade Transition

```tsx
<Carousel
  items={items}
  variant="fade"                 // Crossfade effect
  transitionDuration={500}       // Slower for fade
/>
```

### Auto-Play

```tsx
<Carousel
  items={items}
  autoPlayInterval={3000}        // Auto-advance every 3 seconds
  pauseOnHover={true}            // Pause when hovering
  pauseOnFocus={true}            // Pause when focused
/>
```

### Layout Options

#### Aspect Ratio

```tsx
<Carousel
  items={items}
  aspectRatio="16/9"             // Force specific ratio
  // Options: '16/9', '4/3', '1/1', '21/9', 'auto'
/>
```

#### Peek Mode

```tsx
<Carousel
  items={items}
  peekAmount="15%"               // Show 15% of adjacent slides
  // Or use pixels: peekAmount="50px"
/>
```

### Performance

#### Lazy Loading

```tsx
<Carousel
  items={items}
  lazyLoad={true}                // Load images as needed
  preloadAdjacent={true}         // Preload next/prev slides
/>
```

### Behavior

#### Infinite Loop

```tsx
<Carousel
  items={items}
  infinite={true}                // Loop from last to first
/>
```

#### Swipe Gestures

```tsx
<Carousel
  items={items}
  enableSwipe={true}             // Enable touch swipe (default)
  swipeThreshold={50}            // Pixels to trigger swipe
/>
```

#### Drag Support

```tsx
<Carousel
  items={items}
  enableDrag={true}              // Enable mouse drag
/>
```

## Accessibility

### Keyboard Navigation

The Carousel is fully keyboard accessible:

- **Arrow Right**: Next slide
- **Arrow Left**: Previous slide
- **Home**: First slide
- **End**: Last slide
- **Tab**: Focus navigation controls
- **Enter/Space**: Activate focused button

### ARIA Support

Always provide proper ARIA attributes:

```tsx
<Carousel
  items={items}
  ariaLabel="Product image gallery"     // Required
  ariaLive="polite"                     // Announce changes
  ariaRoledescription="carousel"        // Custom role description
/>
```

Individual slides can have ARIA labels:

```tsx
const items = [
  {
    id: '1',
    content: <img src="slide1.jpg" alt="..." />,
    ariaLabel: "Slide 1 of 3: Product front view"
  }
];
```

### Touch Targets

All interactive elements meet WCAG requirements:

- Arrow buttons: 56px on desktop, 44px on mobile
- Dot indicators: 44px minimum touch target
- Thumbnails: Adequate spacing for touch

### Screen Readers

The component announces:

- Current slide number
- Total slide count
- Slide changes (with aria-live)
- Control states

### Reduced Motion

Respects user preferences automatically:

```css
@media (prefers-reduced-motion: reduce) {
  /* Transitions disabled automatically */
}
```

## Best Practices

### DO

- Always provide meaningful `ariaLabel` for the carousel
- Include alt text for all images
- Use aspect ratios for consistent layouts
- Enable auto-play only when appropriate
- Provide pause controls for auto-playing carousels
- Keep slides focusable for keyboard users
- Test with keyboard and screen readers

### DON'T

- Don't use auto-play for critical content
- Don't make slides too fast (min 3 seconds)
- Don't forget to handle loading states
- Don't hide navigation controls without good reason
- Don't use tiny touch targets on mobile
- Don't auto-play with sound
- Don't use only color to indicate active state

## Performance Tips

### Optimize Images

```tsx
// Use responsive images
const items = images.map((img) => ({
  id: img.id,
  content: (
    <picture>
      <source media="(min-width: 1024px)" srcSet={img.large} />
      <source media="(min-width: 768px)" srcSet={img.medium} />
      <img src={img.small} alt={img.alt} loading="lazy" />
    </picture>
  )
}));
```

### Enable Lazy Loading

```tsx
<Carousel
  items={items}
  lazyLoad={true}              // Load slides as needed
  preloadAdjacent={true}       // Preload nearby slides
/>
```

### Limit Slides

For better performance with many items:

```tsx
// Paginate or virtualize large sets
const visibleItems = items.slice(page * pageSize, (page + 1) * pageSize);
```

## Styling

### Custom Styling

The Carousel uses CSS modules with theme tokens:

```tsx
<Carousel
  items={items}
  className="my-custom-carousel"
/>
```

```css
/* Your styles */
.my-custom-carousel {
  /* Override with theme tokens */
  --carousel-border-width: 2px;
  --carousel-arrow-size: 48px;
}
```

### Theme Integration

Automatically uses your theme tokens:

- Border colors: `var(--theme-border)`
- Text colors: `var(--theme-text)`
- Background: `var(--theme-surface)`
- Spacing: `var(--theme-spacing-*)`

## Troubleshooting

### Slides Not Showing

**Cause**: Items array is empty or invalid

**Solution**:

```tsx
// Ensure items is an array with valid structure
const items = [
  { id: '1', content: <div>Slide 1</div> },  // Required: id, content
  { id: '2', content: <div>Slide 2</div> }
];
```

### Auto-Play Not Working

**Cause**: Auto-play requires interval to be set

**Solution**:

```tsx
<Carousel
  items={items}
  autoPlayInterval={3000}  // Must be > 0
/>
```

### Swipe Not Responsive

**Cause**: Touch events may be blocked by child elements

**Solution**:

```tsx
// Ensure child elements don't prevent touch
<Carousel items={items} enableSwipe={true} />

// In child components, avoid:
// - touch-action: none
// - pointer-events: none
```

### Thumbnails Not Showing

**Cause**: Items missing thumbnail property

**Solution**:

```tsx
const items = [
  {
    id: '1',
    content: <img src="large.jpg" alt="..." />,
    thumbnail: <img src="thumb.jpg" alt="" />  // Required for thumbnails
  }
];

<Carousel items={items} showThumbnails />
```

### Images Stretched

**Cause**: No aspect ratio specified

**Solution**:

```tsx
<Carousel
  items={items}
  aspectRatio="16/9"  // Force consistent ratio
/>
```

### Keyboard Not Working

**Cause**: Carousel not focused

**Solution**:

```tsx
// Carousel must have focus for keyboard nav
// Click or tab to carousel first
// Or programmatically focus:
<Carousel
  items={items}
  autoFocus={true}  // Auto-focus on mount
/>
```

## Advanced Patterns

### Sync Multiple Carousels

```tsx
function SyncedCarousels() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Carousel
        items={mainItems}
        activeIndex={index}
        onChange={setIndex}
        showArrows
      />
      <Carousel
        items={thumbnailItems}
        activeIndex={index}
        onChange={setIndex}
        variant="slide"
        peekAmount="10px"
      />
    </>
  );
}
```

### Custom Controls

```tsx
function CustomControls() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <div>
      <Carousel
        items={items}
        activeIndex={index}
        onChange={setIndex}
        showArrows={false}  // Hide default arrows
      />
      <div className="custom-controls">
        <button onClick={prev}>Previous</button>
        <span>{index + 1} / {items.length}</span>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
```

### Conditional Rendering

```tsx
function ConditionalCarousel({ items }) {
  if (items.length === 0) {
    return <div>No items to display</div>;
  }

  if (items.length === 1) {
    return <div>{items[0].content}</div>;
  }

  return (
    <Carousel
      items={items}
      showArrows={items.length > 1}
      showDots={items.length <= 10}
    />
  );
}
```

## Migration Notes

### Future Versions

This component has a stable API. Future versions will:

- Maintain backward compatibility
- Add new features as optional props
- Deprecate features gracefully with warnings
- Provide migration guides for breaking changes

### Upgrading

To upgrade to the latest version:

```bash
pnpm update @spexop/react
```

Check the CHANGELOG for new features and improvements.

## Related Components

- **CodeBlock**: For displaying code with syntax highlighting
- **Card**: Container component for carousel items
- **Image**: Optimized image component for slides
- **Button**: Custom navigation buttons

## Examples

See the [README.md](./README.md) for comprehensive examples including:

- Product galleries
- Hero banners
- Testimonials
- Before/after comparisons
- Video carousels
- And more

## Support

For issues, questions, or feature requests:

1. Check this usage guide
2. Review the [README.md](./README.md)
3. Search existing GitHub issues
4. Create a new issue with reproduction

## Summary

The Carousel component provides:

- Flexible slideshow functionality
- Full accessibility support
- Multiple transition effects
- Auto-play capabilities
- Touch and drag support
- Responsive design
- Theme integration
- Performance optimizations

Perfect for:

- Product galleries
- Image showcases
- Hero banners
- Testimonials
- Featured content
- Before/after comparisons

**Built with Spexop design principles for a refined, accessible user experience.**
