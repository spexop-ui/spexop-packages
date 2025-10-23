# Card Patterns

Composition patterns for building specialized card components using the base Card primitive.

## Overview

These patterns replace the specialized card components that were removed in v0.4.0. Each pattern demonstrates how to compose complex card layouts using Card, CardHeader, CardBody, and CardFooter primitives.

## Available Patterns

### Content Cards

- **BlogCard** - Article preview with metadata
- **MediaCard** - Image/video content display
- **EventCard** - Event listing with details

### Product Cards

- **ProductCard** - E-commerce product display
- **PricingCard** - Pricing plan comparison
- **ComparisonCard** - Feature comparison table

### Profile Cards

- **ProfileCard** - User profile display
- **TeamMemberCard** - Team member profile
- **TestimonialCard** - Customer testimonial

### Data Cards

- **FeatureCard** - Feature highlight
- **StatCard** - Statistics display

## Design Principles

All patterns follow these principles:

1. **Composition over inheritance** - Build from primitives
2. **Borders before shadows** - Use 2px borders for structure
3. **Typography before decoration** - Font weight for hierarchy
4. **Tokens before magic numbers** - Use design tokens
5. **Accessibility first** - WCAG AA+ compliance

## Usage Guidelines

### Basic Structure

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@spexop/react';

<Card variant="basic">
  <CardHeader>
    {/* Title, subtitle, icon */}
  </CardHeader>
  <CardBody>
    {/* Main content */}
  </CardBody>
  <CardFooter>
    {/* Actions, metadata */}
  </CardFooter>
</Card>
```

### Common Patterns

#### Image + Content

```tsx
<Card variant="basic">
  <CardHeader>
    <img src="..." alt="..." />
  </CardHeader>
  <CardBody>
    <h3>Title</h3>
    <p>Description</p>
  </CardBody>
</Card>
```

#### Action Card

```tsx
<Card variant="interactive">
  <CardBody>
    <h3>Title</h3>
    <p>Description</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Metadata Card

```tsx
<Card variant="basic">
  <CardHeader>
    <h3>Title</h3>
    <div className="metadata">
      <Badge>Category</Badge>
      <time>Date</time>
    </div>
  </CardHeader>
  <CardBody>
    <p>Content</p>
  </CardBody>
</Card>
```

## Customization

### Variants

- `basic` - Standard card with subtle border
- `interactive` - Hover effects for clickable cards
- `elevated` - Slight shadow for emphasis
- `outlined` - Strong border for separation

### Density

- `compact` - Reduced padding for dense layouts
- `normal` - Standard spacing
- `spacious` - Extra padding for emphasis

### Responsive Behavior

- Cards stack vertically on mobile
- Images scale appropriately
- Text remains readable at all sizes
- Touch targets meet 44x44px minimum

## Accessibility

All patterns include:

- Proper heading hierarchy (h1-h6)
- Alt text for images
- ARIA labels where needed
- Keyboard navigation support
- Screen reader announcements
- High contrast support

## Migration from Specialized Components

### Before (v0.3.x)

```tsx
import { BlogCard } from '@spexop/react';

<BlogCard 
  title="Article Title"
  author="Author Name"
  date="2025-10-22"
  tags={["Tag1", "Tag2"]}
  excerpt="Article excerpt..."
  imageUrl="/path/to/image.jpg"
/>
```

### After (v0.4.0)

```tsx
import { Card, CardHeader, CardBody, Avatar, Badge } from '@spexop/react';

<Card variant="basic">
  <CardHeader>
    <img src="/path/to/image.jpg" alt="Article Title" />
    <h3>Article Title</h3>
    <div className="blog-meta">
      <Avatar name="Author Name" />
      <span>Author Name</span>
      <time>2025-10-22</time>
    </div>
  </CardHeader>
  <CardBody>
    <p>Article excerpt...</p>
    <div className="blog-tags">
      <Badge>Tag1</Badge>
      <Badge>Tag2</Badge>
    </div>
  </CardBody>
</Card>
```

## Styling

Use CSS custom properties for consistent styling:

```css
.blog-card {
  /* Use theme tokens */
  border: 2px solid var(--theme-border);
  border-radius: var(--theme-radius-md);
  padding: var(--theme-spacing-4);
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: var(--theme-spacing-2);
  color: var(--theme-text-secondary);
  font-size: var(--theme-font-size-sm);
}

.blog-tags {
  display: flex;
  gap: var(--theme-spacing-1);
  flex-wrap: wrap;
}
```

## Examples

See individual pattern files for complete examples:

- `BlogCard.example.tsx`
- `ProductCard.example.tsx`
- `PricingCard.example.tsx`
- etc.

Each example includes:

- Complete TypeScript implementation
- Props interface
- Usage examples
- Styling guidelines
- Accessibility notes
