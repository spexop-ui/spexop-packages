# Spexop Patterns

**Composition examples and design patterns** for building sophisticated interfaces with Spexop primitives.

## Overview

This directory contains **composition examples** that demonstrate how to build common UI patterns using Spexop's primitive components. These are **not exported components** - they are documented examples showing how to compose primitives into more complex interfaces.

## Philosophy: Primitives Before Patterns

Following "The Spexop Way" principle of "Primitives before patterns", these examples show you how to:

1. **Master the primitives** (Grid, Stack, Card, Button, etc.)
2. **Compose them** into sophisticated patterns
3. **Build maintainable** interfaces that follow design system principles

## Available Patterns

### Card Patterns

- **BlogCard** - Blog post cards with cover images and metadata
- **ProductCard** - E-commerce product cards with pricing and actions
- **PricingCard** - Pricing tier cards with feature lists
- **FeatureCard** - Product feature cards with icons and descriptions
- **ProfileCard** - Team member cards with avatars and social links
- **TestimonialCard** - Customer testimonial cards with quotes and ratings
- **StatsCard** - KPI/metric cards with trend indicators
- **DashboardCard** - Dashboard widget cards with loading states
- **CTACard** - Call-to-action cards for conversions
- **ServiceCard** - Service offering cards with numbered badges
- **TimelineCard** - Event timeline cards with dates and status

## How to Use Patterns

### 1. Copy the Example Code

```tsx
// Copy from patterns/cards/BlogCard.example.tsx
import { Card, CardHeader, CardBody, CardFooter, Avatar, Badge } from '@spexop/react';

export function BlogCard({ title, excerpt, author, date, tags, href }) {
  return (
    <Card variant="basic" density="normal">
      <CardHeader>
        <img src={coverImage} alt={title} />
        <h3>{title}</h3>
      </CardHeader>
      <CardBody>
        <p>{excerpt}</p>
        <div className="blog-meta">
          <Avatar src={author.avatar} name={author.name} />
          <span>{author.name}</span>
          <time>{date}</time>
        </div>
        <div className="tags">
          {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>
      </CardBody>
    </Card>
  );
}
```

### 2. Customize for Your Needs

- Adjust the Card variant and density
- Modify the layout structure
- Add or remove sub-components
- Style with your own CSS classes

### 3. Build Your Own Patterns

Once you understand the primitives, create your own patterns:

```tsx
// Your custom pattern
import { Card, CardHeader, CardBody, Button, Stack } from '@spexop/react';

export function MyCustomCard({ title, content, action }) {
  return (
    <Card variant="highlighted">
      <CardHeader title={title} />
      <CardBody>
        <Stack gap={4}>
          <p>{content}</p>
          <Button onClick={action}>Learn More</Button>
        </Stack>
      </CardBody>
    </Card>
  );
}
```

## Benefits of This Approach

### 1. **Maintainable Code**

- Uses stable primitives that rarely change
- Easy to update when design system evolves
- Clear separation of concerns

### 2. **Design Consistency**

- Follows established design tokens
- Consistent spacing, typography, and colors
- Accessible by default

### 3. **Flexibility**

- Easy to customize for specific needs
- Can mix and match different patterns
- No opinionated constraints

### 4. **Learning**

- Understand how components work internally
- Learn composition patterns
- Build expertise with the design system

## Migration from Specialized Components

If you were using the old specialized card components (BlogCard, ProductCard, etc.), follow these steps:

### 1. Find the Pattern

Look in `patterns/cards/` for the equivalent pattern

### 2. Copy the Code

Copy the example code to your project

### 3. Update Imports

```tsx
// Before
import { BlogCard } from '@spexop/react';

// After
import { Card, CardHeader, CardBody, Avatar, Badge } from '@spexop/react';
```

### 4. Customize as Needed

Adjust the pattern for your specific requirements

## Best Practices

### 1. **Start Simple**

Begin with basic Card composition before building complex patterns

### 2. **Use Design Tokens**

Always use CSS custom properties from the theme system

### 3. **Follow Accessibility**

Maintain ARIA labels, keyboard navigation, and semantic HTML

### 4. **Document Your Patterns**

Add comments explaining the composition choices

### 5. **Test Responsively**

Ensure patterns work across all screen sizes

## Contributing Patterns

If you create useful patterns, consider contributing them:

1. Create a new `.example.tsx` file
2. Add comprehensive documentation
3. Include usage examples
4. Follow the established patterns
5. Submit a pull request

## Resources

- [Card Component Documentation](../basic/cards/Card/README.md)
- [Grid System Guide](../basic/primitives/Grid/README.md)
- [Design Tokens Reference](../../theme/README.md)
- [The Spexop Way Principles](../../../docs/getting-started.md)
