# Card Composition Patterns

**Examples of how to compose Card primitives** into common UI patterns for modern web applications.

## Overview

These patterns demonstrate how to build sophisticated card interfaces using Spexop's Card primitive and its sub-components (CardHeader, CardBody, CardFooter). Each pattern is a **composition example**, not an exported component.

## Available Patterns

| Pattern | Use Case | Key Features |
|---------|----------|--------------|
| **BlogCard** | Blog posts, articles | Cover image, metadata, tags, author info |
| **ProductCard** | E-commerce products | Product image, price, rating, add to cart |
| **PricingCard** | Pricing tiers, subscriptions | Feature lists, pricing, CTA buttons |
| **FeatureCard** | Product features, services | Icon, title, description, optional CTA |
| **ProfileCard** | Team members, user profiles | Avatar, bio, social links, contact info |
| **TestimonialCard** | Customer reviews, testimonials | Quote, rating, author, company |
| **StatsCard** | KPIs, metrics, analytics | Value, trend indicators, labels |
| **DashboardCard** | Admin widgets, data displays | Loading states, error handling, actions |
| **CTACard** | Calls to action, conversions | Headline, description, primary/secondary actions |
| **ServiceCard** | Service offerings, processes | Numbered badge, meta tag, description |
| **TimelineCard** | Events, milestones, history | Date, time, location, status indicators |

## Base Card Primitive

All patterns build on the Card primitive:

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@spexop/react';

<Card variant="basic" density="normal">
  <CardHeader title="Title" subtitle="Subtitle" />
  <CardBody>
    <p>Main content goes here</p>
  </CardBody>
  <CardFooter align="right">
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

## Pattern Examples

### BlogCard Pattern

```tsx
import { Card, CardHeader, CardBody, Avatar, Badge, Text } from '@spexop/react';

export function BlogCard({ 
  title, 
  excerpt, 
  coverImage, 
  author, 
  date, 
  readTime, 
  tags, 
  href 
}) {
  return (
    <Card variant="basic" density="normal">
      <CardHeader>
        <img 
          src={coverImage} 
          alt={title}
          className="blog-cover-image"
        />
        <h3 className="blog-title">{title}</h3>
      </CardHeader>
      <CardBody>
        <Text className="blog-excerpt">{excerpt}</Text>
        <div className="blog-meta">
          <Avatar src={author.avatar} name={author.name} size="sm" />
          <div className="blog-author-info">
            <Text size="sm" weight="semibold">{author.name}</Text>
            <Text size="xs" color="secondary">
              {date} • {readTime} read
            </Text>
          </div>
        </div>
        <div className="blog-tags">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
```

### ProductCard Pattern

```tsx
import { Card, CardHeader, CardBody, CardFooter, Button, Badge, Text } from '@spexop/react';

export function ProductCard({ 
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviewCount, 
  onAddToCart,
  onViewDetails 
}) {
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  
  return (
    <Card variant="interactive" density="normal">
      <CardHeader>
        {discount > 0 && (
          <Badge variant="destructive" className="product-discount">
            -{discount}%
          </Badge>
        )}
        <img src={image} alt={name} className="product-image" />
      </CardHeader>
      <CardBody>
        <Text size="sm" color="secondary" className="product-category">
          Category
        </Text>
        <h3 className="product-name">{name}</h3>
        <div className="product-rating">
          <div className="stars">★★★★★</div>
          <Text size="sm" color="secondary">
            {rating} ({reviewCount} reviews)
          </Text>
        </div>
        <div className="product-pricing">
          <Text size="lg" weight="bold">${price}</Text>
          {originalPrice && (
            <Text size="sm" color="secondary" className="original-price">
              ${originalPrice}
            </Text>
          )}
        </div>
      </CardBody>
      <CardFooter align="between">
        <Button variant="ghost" onClick={onViewDetails}>
          View Details
        </Button>
        <Button variant="primary" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### PricingCard Pattern

```tsx
import { Card, CardHeader, CardBody, CardFooter, Button, Badge, Text } from '@spexop/react';

export function PricingCard({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  isPopular, 
  ctaText, 
  onSelect 
}) {
  return (
    <Card 
      variant={isPopular ? "highlighted" : "basic"} 
      density="spacious"
      className={isPopular ? "pricing-popular" : ""}
    >
      <CardHeader>
        {isPopular && (
          <Badge variant="primary" className="pricing-badge">
            Most Popular
          </Badge>
        )}
        <h3 className="pricing-name">{name}</h3>
        <div className="pricing-price">
          <Text size="4xl" weight="bold">${price}</Text>
          <Text size="lg" color="secondary">/{period}</Text>
        </div>
        <Text color="secondary" className="pricing-description">
          {description}
        </Text>
      </CardHeader>
      <CardBody>
        <ul className="pricing-features">
          {features.map((feature, index) => (
            <li key={index} className="pricing-feature">
              <Text size="sm">✓ {feature}</Text>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter align="center">
        <Button 
          variant={isPopular ? "primary" : "outline"} 
          size="lg"
          onClick={onSelect}
          className="pricing-cta"
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
```

## Styling Patterns

### CSS Custom Properties

Use design tokens for consistent styling:

```css
.blog-card {
  /* Use theme tokens */
  border: 2px solid var(--theme-border);
  border-radius: var(--theme-radius-md);
  padding: var(--theme-spacing-6);
  
  /* Custom spacing */
  --blog-meta-gap: var(--theme-spacing-3);
  --blog-tags-gap: var(--theme-spacing-2);
}

.blog-cover-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--theme-radius-sm);
  margin-bottom: var(--theme-spacing-4);
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: var(--blog-meta-gap);
  margin: var(--theme-spacing-4) 0;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--blog-tags-gap);
  margin-top: var(--theme-spacing-4);
}
```

### Responsive Design

Make patterns responsive using the Grid system:

```tsx
import { Grid, GridItem } from '@spexop/react';

export function BlogGrid({ posts }) {
  return (
    <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
      {posts.map(post => (
        <GridItem key={post.id}>
          <BlogCard {...post} />
        </GridItem>
      ))}
    </Grid>
  );
}
```

## Migration from Specialized Components

### Before (Old Specialized Components)

```tsx
import { BlogCard, ProductCard, PricingCard } from '@spexop/react';

<BlogCard 
  title="Getting Started"
  author="Jane Doe"
  date="2025-10-22"
  tags={["Tutorial", "React"]}
/>
```

### After (Pattern Composition)

```tsx
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

## Best Practices

### 1. **Composition Over Inheritance**

Build patterns by composing primitives, not extending them

### 2. **Consistent Spacing**

Use design tokens for all spacing and sizing

### 3. **Accessible Markup**

Use semantic HTML and proper ARIA attributes

### 4. **Responsive Design**

Ensure patterns work across all screen sizes

### 5. **Performance**

Keep patterns lightweight and focused

### 6. **Documentation**

Add clear comments explaining the composition

## Contributing

To add a new card pattern:

1. Create a new `.example.tsx` file
2. Follow the established naming convention
3. Include comprehensive documentation
4. Add usage examples
5. Test across different screen sizes
6. Submit a pull request

## Resources

- [Card Component Documentation](../../basic/cards/Card/README.md)
- [Design Tokens Reference](../../../theme/README.md)
- [Grid System Guide](../../basic/primitives/Grid/README.md)
- [The Spexop Way Principles](../../../docs/getting-started.md)
