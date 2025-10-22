# Cards Usage Guide

Comprehensive guide to using Spexop's Card primitive and composition patterns for building modern, accessible interfaces.

## Overview

The cards category provides a base Card primitive with sub-components for maximum flexibility. Specialized card patterns are available as composition examples in `src/patterns/cards/` to help you build common UI patterns.

> **⚠️ Breaking Change in v0.4.0**: Specialized card components (BlogCard, ProductCard, etc.) will be removed. Use Card composition patterns instead. See [Migration Guide](../../../docs/migrations/from-v0.3-to-v0.4.md) for details.

## Card Primitive

| Component | Primary Use Case | Key Features | Best For |
|-----------|-----------------|--------------|----------|
| **Card** | Base container | Sub-components, variants, density | Generic content, forms, layouts |
| **CardHeader** | Card header | Title, subtitle, actions | Consistent header styling |
| **CardBody** | Card content | Main content area | Flexible content layout |
| **CardFooter** | Card footer | Actions, metadata | Consistent footer styling |

## Composition Patterns

| Pattern | Primary Use Case | Key Features | Best For |
|---------|-----------------|--------------|----------|
| **BlogCard** | Blog posts | Cover image, metadata, tags | Content sites, blogs, news |
| **CTACard** | Calls to action | Primary/secondary actions | Landing pages, conversions |
| **DashboardCard** | Dashboard widgets | Loading states, errors, actions | Admin panels, analytics |
| **FeatureCard** | Product features | Icon, title, description | Marketing, feature grids |
| **PricingCard** | Pricing tiers | Features list, CTA | Pricing pages, subscriptions |
| **ProductCard** | E-commerce | Image, price, rating, cart | Online stores, catalogs |
| **ProfileCard** | Team members | Avatar, bio, social links | About pages, team sections |
| **ServiceCard** | Services | Numbered badge, meta tag | Service listings, processes |
| **StatsCard** | KPIs/Metrics | Value, trend indicators | Dashboards, reports |
| **TestimonialCard** | Reviews | Quote, rating, author | Social proof, testimonials |
| **TimelineCard** | Events | Date, time, location, status | Roadmaps, timelines, history |

> **Note**: These patterns are examples in `src/patterns/cards/` - not exported components. Copy and customize them for your needs.

## Quick Start

### Installation

```bash
pnpm add @spexop/react @spexop/icons @spexop/theme
```

### Basic Setup

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@spexop/react';

function App() {
  return (
    <Card variant="basic" density="normal">
      <CardHeader title="Card Title" subtitle="Subtitle" />
      <CardBody>
        <p>Your content here</p>
      </CardBody>
      <CardFooter align="right">
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
  );
}
```

## When to Use Each Component

### Card (Base Component)

**Use when:**

- Building custom card layouts
- Creating forms or data displays
- Need maximum flexibility

**Avoid when:**

- A specialized card fits your use case better

```tsx
<Card variant="highlighted" density="spacious">
  <CardHeader title="Custom Layout" />
  <CardBody>
    <CustomContent />
  </CardBody>
  <CardFooter align="between">
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Save</Button>
  </CardFooter>
</Card>
```

### BlogCard

**Use when:**

- Displaying blog posts or articles
- Need cover image and metadata
- Building content grids

**Avoid when:**

- Content doesn't have standard blog structure

```tsx
<BlogCard
  title="Getting Started with Spexop"
  excerpt="Learn how to build beautiful UIs..."
  coverImage="/blog/getting-started.jpg"
  author="Jane Smith"
  date="2025-10-19"
  readTime="5 min"
  tags={["Tutorial", "Beginner"]}
  href="/blog/getting-started"
/>
```

### CTACard

**Use when:**

- Driving user actions
- Marketing conversions
- Prominent prompts needed

**Avoid when:**

- Multiple CTAs compete for attention

```tsx
<CTACard
  headline="Ready to get started?"
  description="Join thousands of users building better products"
  icon={<Rocket />}
  primaryAction={{
    label: "Start Free Trial",
    onClick: handleSignup
  }}
  secondaryAction={{
    label: "Learn More",
    onClick: handleLearnMore
  }}
  centered
/>
```

### DashboardCard

**Use when:**

- Building admin dashboards
- Displaying charts or widgets
- Need loading and error states

**Avoid when:**

- Static content without data fetching

```tsx
<DashboardCard
  title="Revenue Overview"
  subtitle="Last 30 days"
  actions={<IconButton icon={<MoreVertical />} />}
  loading={isLoading}
  error={error?.message}
>
  <LineChart data={revenueData} />
</DashboardCard>
```

### FeatureCard

**Use when:**

- Showcasing product features
- Landing page feature grids
- Icon + title + description layout

**Avoid when:**

- Need detailed content or multiple CTAs

```tsx
<FeatureCard
  icon={<Zap />}
  title="Lightning Fast"
  description="Built for performance with optimized rendering"
  variant="highlighted"
/>
```

### PricingCard

**Use when:**

- Displaying pricing plans
- Feature comparison needed
- Clear CTA for subscription

**Avoid when:**

- Pricing structure is complex or custom

```tsx
<PricingCard
  name="Professional"
  price={49}
  period="month"
  badge="Popular"
  features={[
    "Unlimited projects",
    "Advanced analytics",
    "Priority support"
  ]}
  onCtaClick={() => subscribe('pro')}
  highlighted
/>
```

### ProductCard

**Use when:**

- E-commerce product displays
- Need rating and cart integration
- Product image is important

**Avoid when:**

- Service or non-physical products

```tsx
<ProductCard
  name="Premium Headphones"
  price={299}
  image="/products/headphones.jpg"
  rating={4.5}
  reviews={127}
  badge="20% Off"
  onAddToCart={() => addToCart(productId)}
  onViewDetails={() => router.push('/products/123')}
  inStock={true}
/>
```

### ProfileCard

**Use when:**

- Team member profiles
- Author bios
- User profiles with social links

**Avoid when:**

- Brief mentions (use avatar + name inline)

```tsx
<ProfileCard
  name="Alex Johnson"
  role="Senior Developer"
  bio="Passionate about building accessible, performant web applications."
  avatar="/avatars/alex.jpg"
  socialLinks={[
    { platform: 'twitter', url: 'https://twitter.com/alex' },
    { platform: 'github', url: 'https://github.com/alex' }
  ]}
  onContactClick={() => openContactForm()}
/>
```

### ServiceCard

**Use when:**

- Showcasing services or processes
- Numbered steps needed
- Meta relationships important

**Avoid when:**

- No sequential or relationship context

```tsx
<ServiceCard
  number="01"
  title="Primitives First"
  description="Master five grid primitives before building complex layouts."
  meta="Foundation → Features"
  variant="featured"
/>
```

### StatsCard

**Use when:**

- Displaying KPIs or metrics
- Dashboard statistics
- Trend indicators needed

**Avoid when:**

- Detailed data visualization required

```tsx
<StatsCard
  label="Active Users"
  value="12,543"
  trend={{ value: 12.5, direction: 'up' }}
  icon={<Users />}
  format="number"
/>
```

### TestimonialCard

**Use when:**

- Customer testimonials
- User reviews
- Social proof sections

**Avoid when:**

- Brief quotes (use inline blockquote)

```tsx
<TestimonialCard
  quote="This product transformed our workflow completely!"
  author="Jane Smith"
  role="Product Manager"
  company="Tech Corp"
  avatar="/avatars/jane.jpg"
  rating={5}
/>
```

### TimelineCard

**Use when:**

- Event timelines
- Project milestones
- Roadmap displays

**Avoid when:**

- Simple date lists (use list component)

```tsx
<TimelineCard
  title="Product Launch"
  description="Official release of version 2.0 with new features"
  date="2025-11-01"
  time="10:00 AM PST"
  location="Virtual Event"
  status="upcoming"
  icon={<Rocket />}
/>
```

## Common Patterns

### Responsive Feature Grid

```tsx
import { Grid, Container, FeatureCard } from '@spexop/react';
import { Zap, Shield, Smartphone, Cloud } from '@spexop/icons';

function FeatureGrid() {
  const features = [
    { icon: <Zap />, title: "Fast", description: "Lightning performance" },
    { icon: <Shield />, title: "Secure", description: "Bank-level security" },
    { icon: <Smartphone />, title: "Responsive", description: "Mobile-first" },
    { icon: <Cloud />, title: "Scalable", description: "Grows with you" }
  ];

  return (
    <Container maxWidth="2xl" padding={8}>
      <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap={6}>
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </Grid>
    </Container>
  );
}
```

### Dashboard Layout

```tsx
import { Grid, GridItem, DashboardCard, StatsCard } from '@spexop/react';

function Dashboard() {
  return (
    <Container maxWidth="full" padding={6}>
      <Grid columns={12} gap={6}>
        {/* Stats row */}
        <GridItem span={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            label="Total Revenue"
            value={125430}
            format="currency"
            trend={{ value: 12.5, direction: 'up' }}
          />
        </GridItem>
        <GridItem span={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            label="Active Users"
            value={12543}
            trend={{ value: 8.2, direction: 'up' }}
          />
        </GridItem>
        <GridItem span={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            label="Conversion Rate"
            value={3.24}
            format="percentage"
            trend={{ value: 0.5, direction: 'down' }}
          />
        </GridItem>
        <GridItem span={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            label="Satisfaction"
            value={94}
            format="percentage"
            trend={{ value: 0, direction: 'neutral' }}
          />
        </GridItem>

        {/* Charts */}
        <GridItem span={{ xs: 12, lg: 8 }}>
          <DashboardCard
            title="Revenue Overview"
            subtitle="Last 30 days"
            loading={isLoading}
          >
            <LineChart data={revenueData} />
          </DashboardCard>
        </GridItem>
        
        <GridItem span={{ xs: 12, lg: 4 }}>
          <DashboardCard title="Top Products">
            <ProductList products={topProducts} />
          </DashboardCard>
        </GridItem>
      </Grid>
    </Container>
  );
}
```

### Pricing Page

```tsx
import { Grid, Container, PricingCard } from '@spexop/react';

function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: 0,
      features: ["5 projects", "Basic analytics", "Community support"]
    },
    {
      name: "Professional",
      price: 49,
      badge: "Popular",
      features: ["Unlimited projects", "Advanced analytics", "Priority support"],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: 199,
      features: ["Everything in Pro", "Custom integrations", "Dedicated account manager"]
    }
  ];

  return (
    <Container maxWidth="xl" padding={8}>
      <Grid columns={{ xs: 1, md: 3 }} gap={6}>
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            {...plan}
            onCtaClick={() => handleSubscribe(plan.name)}
          />
        ))}
      </Grid>
    </Container>
  );
}
```

### Blog Grid

```tsx
import { Grid, Container, BlogCard } from '@spexop/react';

function BlogGrid({ posts }) {
  return (
    <Container maxWidth="2xl" padding={8}>
      <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            coverImage={post.image}
            author={post.author}
            date={post.publishedAt}
            readTime={post.readingTime}
            tags={post.tags}
            href={`/blog/${post.slug}`}
          />
        ))}
      </Grid>
    </Container>
  );
}
```

### Team Section

```tsx
import { Grid, Container, ProfileCard } from '@spexop/react';

function TeamSection({ members }) {
  return (
    <Container maxWidth="xl" padding={8}>
      <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap={8}>
        {members.map((member) => (
          <ProfileCard
            key={member.id}
            name={member.name}
            role={member.role}
            bio={member.bio}
            avatar={member.avatar}
            socialLinks={member.socialLinks}
            onContactClick={() => handleContact(member.email)}
          />
        ))}
      </Grid>
    </Container>
  );
}
```

### Product Catalog

```tsx
import { Grid, Container, ProductCard } from '@spexop/react';

function ProductCatalog({ products }) {
  const { addToCart, viewProduct } = useCart();

  return (
    <Container maxWidth="2xl" padding={6}>
      <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap={6}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            rating={product.rating}
            reviews={product.reviewCount}
            badge={product.badge}
            inStock={product.inStock}
            onAddToCart={() => addToCart(product)}
            onViewDetails={() => viewProduct(product.id)}
          />
        ))}
      </Grid>
    </Container>
  );
}
```

### Testimonials Section

```tsx
import { Grid, Container, TestimonialCard } from '@spexop/react';

function Testimonials({ testimonials }) {
  return (
    <Container maxWidth="xl" padding={8}>
      <Grid columns={{ xs: 1, md: 3 }} gap={6}>
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
            company={testimonial.company}
            avatar={testimonial.avatar}
            rating={testimonial.rating}
          />
        ))}
      </Grid>
    </Container>
  );
}
```

## Composition with Primitives

### Using Grid System

All cards work seamlessly with the Grid primitive:

```tsx
import { Grid, GridItem, Card } from '@spexop/react';

<Grid columns={12} gap={6}>
  <GridItem span={{ xs: 12, md: 8 }}>
    <Card fullHeight>Main content</Card>
  </GridItem>
  <GridItem span={{ xs: 12, md: 4 }}>
    <Card fullHeight>Sidebar</Card>
  </GridItem>
</Grid>
```

### Using Stack

Stack cards vertically or horizontally:

```tsx
import { Stack, StatsCard } from '@spexop/react';

<Stack direction="vertical" gap={4}>
  <StatsCard label="Users" value={1234} />
  <StatsCard label="Revenue" value={50000} format="currency" />
  <StatsCard label="Growth" value={12.5} format="percentage" />
</Stack>
```

### Using Container

Constrain card layouts with Container:

```tsx
import { Container, Grid, FeatureCard } from '@spexop/react';

<Container maxWidth="xl" padding={8}>
  <Grid columns={{ xs: 1, md: 3 }} gap={6}>
    <FeatureCard icon={<Zap />} title="Fast" description="Lightning speed" />
    <FeatureCard icon={<Shield />} title="Secure" description="Bank-level" />
    <FeatureCard icon={<Cloud />} title="Scalable" description="Grows with you" />
  </Grid>
</Container>
```

## Accessibility Best Practices

### Semantic HTML

All cards use proper semantic structure:

```tsx
// Card header uses <h3> for titles
<CardHeader title="Semantic Title" />
// Renders: <h3>Semantic Title</h3>

// Clickable cards render as <button>
<Card clickable onClick={handleClick}>
  // Renders as: <button>...</button>
</Card>
```

### Keyboard Navigation

Cards support full keyboard accessibility:

- **Tab**: Navigate between cards
- **Enter/Space**: Activate clickable cards
- **Escape**: Close card modals (when applicable)

```tsx
// Ensure clickable cards have proper handlers
<Card clickable onClick={handleClick} aria-label="Open details">
  <CardBody>Clickable content</CardBody>
</Card>
```

### ARIA Attributes

Use ARIA attributes for enhanced accessibility:

```tsx
<Card
  aria-labelledby="card-title"
  aria-describedby="card-description"
>
  <h3 id="card-title">Card Title</h3>
  <p id="card-description">Card description</p>
</Card>
```

### Color Contrast

All card text meets WCAG AAA standards:

- **Title**: 15:1 contrast ratio
- **Body**: 9:1 contrast ratio
- **Secondary text**: 7:1 contrast ratio

### Focus Indicators

Cards show clear focus indicators:

```css
/* Automatic 2px red outline on focus */
.card:focus {
  outline: 2px solid var(--theme-primary);
  outline-offset: 2px;
}
```

## Design Token Usage

### Spacing Tokens

Cards use consistent spacing tokens:

```tsx
// Density variants use spacing tokens
<Card density="compact">   {/* --theme-spacing-4: 16px */}
<Card density="normal">    {/* --theme-spacing-6: 24px */}
<Card density="spacious">  {/* --theme-spacing-8: 32px */}
```

### Color Tokens

Cards use theme-aware color tokens:

```css
/* Background */
background: var(--theme-surface);

/* Borders */
border: 2px solid var(--theme-border);

/* Text */
color: var(--theme-text);
color: var(--theme-text-secondary);

/* Accent */
border-color: var(--theme-primary);
```

### Typography Tokens

Cards use typography tokens for consistency:

```css
/* Font sizes */
font-size: var(--theme-font-size-base);
font-size: var(--theme-font-size-lg);
font-size: var(--theme-font-size-2xl);

/* Font weights */
font-weight: var(--theme-font-weight-normal);
font-weight: var(--theme-font-weight-semibold);
font-weight: var(--theme-font-weight-bold);

/* Line heights */
line-height: var(--theme-line-height-tight);
line-height: var(--theme-line-height-normal);
line-height: var(--theme-line-height-relaxed);
```

## Performance Tips

### Image Optimization

For cards with images (BlogCard, ProductCard, ProfileCard):

```tsx
// Use lazy loading
<BlogCard
  coverImage="/blog/large-image.jpg"
  // Browser native lazy loading
/>

// Optimize image sizes
<ProductCard
  image="/products/thumbnail-400x400.webp"
  // Use appropriate size, modern format
/>
```

### Virtualization

For long lists of cards:

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualCardList({ items }) {
  const parentRef = useRef(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      {virtualizer.getVirtualItems().map((virtualRow) => (
        <div key={virtualRow.key}>
          <ProductCard {...items[virtualRow.index]} />
        </div>
      ))}
    </div>
  );
}
```

### Code Splitting

Split card imports for better performance:

```tsx
import { lazy, Suspense } from 'react';

const ProductCard = lazy(() => import('@spexop/react').then(m => ({ 
  default: m.ProductCard 
})));

function ProductGrid() {
  return (
    <Suspense fallback={<CardSkeleton />}>
      <ProductCard {...props} />
    </Suspense>
  );
}
```

## Migration Guides

### From Generic Divs to Cards

**Before:**

```tsx
<div className="custom-card">
  <div className="header">
    <h3>Title</h3>
  </div>
  <div className="body">
    <p>Content</p>
  </div>
  <div className="footer">
    <button>Action</button>
  </div>
</div>
```

**After:**

```tsx
<Card variant="basic" density="normal">
  <CardHeader title="Title" />
  <CardBody>
    <p>Content</p>
  </CardBody>
  <CardFooter align="right">
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

### From Other Component Libraries

**Material-UI:**

```tsx
// Before (MUI)
<Paper elevation={2}>
  <CardContent>
    <Typography variant="h5">Title</Typography>
    <Typography>Body</Typography>
  </CardContent>
  <CardActions>
    <Button>Action</Button>
  </CardActions>
</Paper>

// After (Spexop)
<Card variant="basic">
  <CardHeader title="Title" />
  <CardBody>Body</CardBody>
  <CardFooter align="right">
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Chakra UI:**

```tsx
// Before (Chakra)
<Box borderWidth="1px" borderRadius="lg" p={6}>
  <Heading size="md">Title</Heading>
  <Text mt={4}>Body</Text>
  <Button mt={6}>Action</Button>
</Box>

// After (Spexop)
<Card variant="basic" density="normal">
  <CardHeader title="Title" />
  <CardBody>Body</CardBody>
  <CardFooter align="right">
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Spexop Design Principles

All card components follow "The Spexop Way":

### 1. Primitives Before Patterns

All specialized cards build on the base Card primitive:

```tsx
// BlogCard internally uses Card
export const BlogCard = ({ ...props }) => {
  return (
    <Card variant={variant} density="normal">
      {/* Blog-specific content */}
    </Card>
  );
};
```

### 2. Borders Before Shadows

Cards use clean 2px borders instead of heavy shadows:

```css
/* ✅ CORRECT */
border: 2px solid var(--theme-border);

/* ❌ AVOID */
box-shadow: 0 10px 40px rgba(0,0,0,0.3);
```

### 3. Typography Before Decoration

Hierarchy through bold font weights and clear sizes:

```css
/* ✅ CORRECT */
font-weight: var(--theme-font-weight-bold);
font-size: var(--theme-font-size-xl);

/* ❌ AVOID */
font-weight: 400;
text-shadow: 0 2px 4px rgba(0,0,0,0.1);
```

### 4. Tokens Before Magic Numbers

All spacing and colors use design tokens:

```tsx
// ✅ CORRECT
<Card density="normal"> {/* Uses tokens */}

// ❌ AVOID
<div style={{ padding: '24px' }}> {/* Magic number */}
```

### 5. Composition Before Complexity

Build complex layouts from simple sub-components:

```tsx
// ✅ CORRECT - Composable
<Card>
  <CardHeader title="Title" />
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>

// ❌ AVOID - Monolithic
<ComplexCard title="Title" content="Content" actions={...} />
```

### 6. Standards Before Frameworks

Use web platform fundamentals:

```tsx
// Semantic HTML
<Card clickable> // Renders as <button>
<CardHeader title="Title"> // Renders as <h3>
```

### 7. Accessibility Before Aesthetics

WCAG AA+ compliance built-in:

- High contrast text (9:1+ ratio)
- Keyboard navigation
- Screen reader support
- Focus indicators

## Troubleshooting

### Cards Have Different Heights in Grid

**Solution**: Use `fullHeight` prop:

```tsx
<Grid columns={3} gap={6}>
  <Card fullHeight>Short content</Card>
  <Card fullHeight>Much longer content here</Card>
  <Card fullHeight>Medium content</Card>
</Grid>
```

### Footer Not at Bottom of Card

**Solution**: Ensure `fullHeight` and CardBody expands:

```tsx
<Card fullHeight>
  <CardHeader title="Title" />
  <CardBody>
    {/* CardBody has flex: 1 */}
  </CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Clickable Card Not Working

**Solution**: Ensure `clickable` prop is set:

```tsx
<Card clickable onClick={handleClick}>
  {/* Will render as <button> element */}
</Card>
```

### Images Not Loading

**Solution**: Check image paths and use proper formats:

```tsx
<BlogCard
  coverImage="/images/blog/post.jpg" // Absolute path
  // or
  coverImage={require('./assets/post.jpg')} // Relative import
/>
```

### Dark Mode Not Working

**Solution**: Ensure theme provider wraps your app:

```tsx
import { UnifiedThemeProvider } from '@spexop/react';

function App() {
  return (
    <UnifiedThemeProvider>
      <YourCards />
    </UnifiedThemeProvider>
  );
}
```

## Browser Support

All card components support:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

Requires CSS Grid and CSS Custom Properties support.

## Related Documentation

- [Card Component README](./Card/README.md) - Base component details
- [Grid System Guide](../primitives/Grid/README.md) - Layout primitives
- [Design Tokens Reference](../../../../docs/design-tokens.md) - All tokens
- [Accessibility Guide](../../../../docs/accessibility.md) - WCAG compliance

## Component-Specific Guides

- [BlogCard README](./BlogCard/README.md)
- [CTACard README](./CTACard/README.md)
- [DashboardCard README](./DashboardCard/README.md)
- [FeatureCard README](./FeatureCard/README.md)
- [PricingCard README](./PricingCard/README.md)
- [ProductCard README](./ProductCard/README.md)
- [ProfileCard README](./ProfileCard/README.md)
- [ServiceCard README](./ServiceCard/README.md)
- [StatsCard README](./StatsCard/README.md)
- [TestimonialCard README](./TestimonialCard/README.md)
- [TimelineCard README](./TimelineCard/README.md)

## License

MIT
