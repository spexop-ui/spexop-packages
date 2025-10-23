# Patterns

Composition patterns for building complex UI components using Spexop primitives.

## Philosophy

Following "The Spexop Way" principle of **"Primitives before patterns"**, this directory contains composition examples that demonstrate how to build specialized components using our base primitives rather than creating monolithic, opinionated components.

## Benefits

- **Flexibility**: Compose exactly what you need
- **Maintainability**: Fewer components to maintain
- **Consistency**: Uses the same primitives across all patterns
- **Customization**: Easy to modify for specific needs
- **Bundle Size**: Better tree-shaking and smaller bundles

## Available Patterns

### Cards

Located in `cards/` directory, these patterns replace the specialized card components that were removed in v0.4.0:

- **BlogCard** - Article preview with author, date, and tags
- **ProductCard** - E-commerce product display
- **PricingCard** - Pricing plan comparison
- **ProfileCard** - User profile display
- **TestimonialCard** - Customer testimonial
- **TeamMemberCard** - Team member profile
- **FeatureCard** - Feature highlight
- **StatCard** - Statistics display
- **MediaCard** - Image/video content
- **EventCard** - Event listing
- **ComparisonCard** - Feature comparison

## Usage

Each pattern includes:

1. **Complete example** - Ready-to-use component
2. **TypeScript types** - Full type safety
3. **Usage notes** - Best practices and customization tips
4. **Props interface** - Clear API documentation

## Migration from Specialized Components

If you were using specialized card components (removed in v0.4.0), you can:

1. Find the equivalent pattern in this directory
2. Copy the composition code
3. Customize as needed for your use case
4. Import the required primitives

## Examples

```tsx
// Before (v0.3.x) - Specialized component
import { BlogCard } from '@spexop/react';

<BlogCard 
  title="Getting Started"
  author="Jane Doe"
  date="2025-10-22"
  tags={["Tutorial", "React"]}
/>

// After (v0.4.0) - Composition pattern
import { Card, CardHeader, CardBody, Avatar, Badge } from '@spexop/react';

<Card variant="basic">
  <CardHeader>
    <h3>Getting Started</h3>
  </CardHeader>
  <CardBody>
    <div className="blog-meta">
      <Avatar name="Jane Doe" />
      <span>Jane Doe</span>
      <time>2025-10-22</time>
    </div>
    <div className="blog-tags">
      <Badge>Tutorial</Badge>
      <Badge>React</Badge>
    </div>
  </CardBody>
</Card>
```

## Creating New Patterns

When creating new patterns:

1. Use only Spexop primitives
2. Follow "The Spexop Way" principles
3. Include comprehensive TypeScript types
4. Add usage documentation
5. Test across different screen sizes
6. Ensure accessibility compliance

## Related Documentation

- [The Spexop Way Principles](../../README.md#the-spexop-way)
- [Component Documentation](../../basic/README.md)
- [Migration Guide](../../../docs/migrations/from-v0.3-to-v0.4.md)
