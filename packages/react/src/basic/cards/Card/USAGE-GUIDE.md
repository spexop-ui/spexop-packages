# Card Component - Complete Usage Guide

**Component Version**: v0.4.0
**Last Updated**: January 15, 2025
**Package**: @spexop/react
**Status**: Production Ready

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [When to Use Cards](#when-to-use-cards)
5. [Card Structure Best Practices](#card-structure-best-practices)
6. [Variant Reference](#variant-reference)
7. [Density Selection Guide](#density-selection-guide)
8. [State Management Patterns](#state-management-patterns)
9. [Accessibility Best Practices](#accessibility-best-practices)
10. [Layout Patterns](#layout-patterns)
11. [Common Patterns](#common-patterns)
12. [Performance Tips](#performance-tips)
13. [Troubleshooting](#troubleshooting)
14. [API Reference](#api-reference)

## Overview

The Card component is the foundational container element in the Spexop design system. It provides flexible content organization with 6+ variants, comprehensive accessibility support, and modern UI/UX patterns while maintaining the "borders before shadows" philosophy.

### Key Features

- **6+ Visual Variants**: basic, highlighted, outlined, interactive, ghost, elevated
- **3 Density Options**: compact, normal, spacious for different contexts
- **Sub-Component Composition**: CardHeader, CardBody, CardFooter for flexibility
- **State Management**: Loading, error, success states with proper ARIA support
- **Enhanced Accessibility**: WCAG AAA compliant with comprehensive ARIA attributes
- **Modern Interactions**: Ripple effects, smooth transitions, feedback levels
- **Typography-Driven Hierarchy**: Semantic heading levels (h1-h6)
- **Theme-Aware**: Automatic light and dark mode support
- **TypeScript**: Full type safety with comprehensive prop types
- **Clickable**: Transforms to semantic button element with enhanced interactions
- **Responsive**: Works seamlessly with Grid system
- **Keyboard Navigation**: Full keyboard support with proper focus management

## Quick Start

### Basic Example

```tsx
import { Card, CardHeader, CardBody, CardFooter, Button } from '@spexop/react';

function App() {
  return (
    <Card variant="basic" density="normal">
      <CardHeader title="Card Title" subtitle="Subtitle text" />
      <CardBody>
        <p>Main content goes here with optimal line-height for readability.</p>
      </CardBody>
      <CardFooter align="right">
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </CardFooter>
    </Card>
  );
}
```

### With State Management

```tsx
import { Card, CardHeader, CardBody } from '@spexop/react';

function UserCard() {
  return (
    <Card state="loading" loadingText="Loading user data...">
      <CardHeader title="User Profile" />
      <CardBody>Content will appear when loaded</CardBody>
    </Card>
  );
}
```

### Clickable Card

```tsx
import { Card, CardHeader, CardBody } from '@spexop/react';

function ProductCard({ product, onSelect }) {
  return (
    <Card 
      clickable 
      onClick={() => onSelect(product.id)}
      variant="interactive"
      aria-label={`View ${product.name} details`}
    >
      <CardHeader title={product.name} />
      <CardBody>{product.description}</CardBody>
    </Card>
  );
}
```

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
# or
yarn add @spexop/react @spexop/theme
```

### Import Styles

```tsx
import '@spexop/react/dist/index.css';
```

## When to Use Cards

Cards are perfect for:

- **Content grouping**: Related information that belongs together
- **Dashboard widgets**: Metrics, charts, and status displays
- **Product listings**: E-commerce items, services, or features
- **Navigation elements**: Clickable cards that lead to other pages
- **Form containers**: Login forms, settings panels, or data entry
- **Status indicators**: Success messages, error states, or notifications
- **Content previews**: Article snippets, blog posts, or news items

### When Not to Use

Consider alternatives when you need:

- **Simple containers**: Use div with CSS for basic layouts
- **Modal dialogs**: Use Modal or Dialog components
- **Navigation menus**: Use NavLink or Menu components
- **Data tables**: Use Table component for structured data
- **Form sections**: Use Fieldset for form grouping

## Card Structure Best Practices

### 1. Start with CardHeader

Always use CardHeader for titles and metadata:

```tsx
<Card>
  <CardHeader 
    title="Clear Title" 
    subtitle="Supporting information"
    badge={<Badge variant="success">New</Badge>}
  />
  {/* CardBody and CardFooter */}
</Card>
```

**Guidelines:**

- Keep titles concise (under 60 characters)
- Use subtitles for context, not repetition
- Add badges sparingly for important status indicators
- Choose appropriate heading levels (h1-h6) for SEO

### 2. Content in CardBody

CardBody is your main content area:

```tsx
<CardBody>
  <p>Primary content with optimal line-height for readability.</p>
  <ul>
    <li>Supporting information</li>
    <li>Feature lists</li>
    <li>Details and descriptions</li>
  </ul>
</CardBody>
```

**Guidelines:**

- Use semantic HTML elements (p, ul, ol, dl)
- Maintain consistent spacing with design tokens
- Keep content scannable with short paragraphs
- Use lists for structured information

### 3. Actions in CardFooter

CardFooter contains interactive elements:

```tsx
<CardFooter align="right">
  <Button variant="ghost">Cancel</Button>
  <Button variant="primary">Submit</Button>
</CardFooter>
```

**Guidelines:**

- Align actions based on user flow (right for primary actions)
- Use consistent button variants across your app
- Limit to 2-3 actions maximum
- Place destructive actions on the left

## Variant Reference

### Basic (Default)

**Use for**: General content and standard layouts.

```tsx
<Card variant="basic">
  <CardHeader title="Standard Content" />
  <CardBody>Regular information display</CardBody>
</Card>
```

**Styling**: 2px neutral border on white background.

**Theme Tokens**: `--theme-border`, `--theme-surface`

---

### Highlighted

**Use for**: Featured content and important information.

```tsx
<Card variant="highlighted">
  <CardHeader title="Featured Item" />
  <CardBody>Priority content that needs attention</CardBody>
</Card>
```

**Styling**: 2px red border for emphasis.

**Theme Tokens**: `--theme-primary`, `--theme-border`

---

### Outlined

**Use for**: Strong emphasis and warnings.

```tsx
<Card variant="outlined">
  <CardHeader title="Important Notice" />
  <CardBody>Critical information requiring attention</CardBody>
</Card>
```

**Styling**: 3px bold border for strong structure.

**Theme Tokens**: `--theme-border-strong`

---

### Interactive

**Use for**: Clickable cards and navigation.

```tsx
<Card variant="interactive" clickable onClick={handleClick}>
  <CardHeader title="Clickable Card" />
  <CardBody>Navigation or selection cards</CardBody>
</Card>
```

**Styling**: Hover changes border to red (indicates interactivity).

**Theme Tokens**: `--theme-primary-hover`

---

### Ghost

**Use for**: Placeholders and empty states.

```tsx
<Card variant="ghost">
  <CardHeader title="Add New Item" />
  <CardBody>Placeholder for empty states</CardBody>
</Card>
```

**Styling**: Dashed border with transparent background.

**Theme Tokens**: `--theme-border-dashed`

---

### Elevated

**Use for**: Special emphasis and backward compatibility.

```tsx
<Card variant="elevated">
  <CardHeader title="Elevated Card" />
  <CardBody>Subtle colored background for emphasis</CardBody>
</Card>
```

**Styling**: Colored background variant (kept for backward compatibility).

**Theme Tokens**: `--theme-surface-elevated`

---

## Density Selection Guide

### Compact (16px padding)

**Use for:**

- Dashboard widgets
- Admin panels
- Data-heavy interfaces
- Mobile-first layouts

```tsx
<Card density="compact">
  <CardHeader title="Dashboard Widget" />
  <CardBody>Metrics and quick information</CardBody>
</Card>
```

**Context**: Dashboards, admin panels, data-heavy interfaces

### Normal (24px padding) - Default

**Use for:**

- General UI components
- Standard layouts
- Most application interfaces

```tsx
<Card density="normal">
  <CardHeader title="Standard Card" />
  <CardBody>Regular content with balanced spacing</CardBody>
</Card>
```

**Context**: General UI, standard layouts, component libraries

### Spacious (32px padding)

**Use for:**

- Content-focused interfaces
- Reading experiences
- Marketing pages
- Landing pages

```tsx
<Card density="spacious">
  <CardHeader title="Content Article" />
  <CardBody>Long-form content requiring comfortable reading</CardBody>
</Card>
```

**Context**: Blogs, articles, marketing pages, landing pages

## State Management Patterns

### Loading States

Show loading indicators for async operations:

```tsx
<Card state="loading" loadingText="Loading user data...">
  <CardHeader title="User Profile" />
  <CardBody>Content will appear when loaded</CardBody>
</Card>
```

**Features:**

- Shimmer effect for visual feedback
- ARIA live region for screen readers
- Disabled interaction during loading

### Error States

Handle errors gracefully with clear messaging:

```tsx
<Card state="error" errorMessage="Failed to load data. Please try again.">
  <CardHeader title="Error Card" />
  <CardBody>Something went wrong</CardBody>
</Card>
```

**Features:**

- ARIA alert role for screen readers
- Clear error messaging
- Visual error indicators

### Success States

Confirm successful operations:

```tsx
<Card state="success" successMessage="Settings saved successfully">
  <CardHeader title="Settings" />
  <CardBody>Your changes have been applied</CardBody>
</Card>
```

**Features:**

- ARIA status role for screen readers
- Visual success indicators
- Confirmation messaging

## Accessibility Best Practices

### Semantic Structure

Use proper heading hierarchy:

```tsx
<Card>
  <CardHeader title="Main Section" headingLevel={2} />
  <CardBody>
    <Card>
      <CardHeader title="Subsection" headingLevel={3} />
      <CardBody>Nested content</CardBody>
    </Card>
  </CardBody>
</Card>
```

### ARIA Labels

Provide context for screen readers:

```tsx
<Card 
  aria-label="Product information for iPhone 15"
  aria-describedby="product-details"
>
  <CardHeader title="iPhone 15" />
  <CardBody id="product-details">
    Latest Apple smartphone with advanced features
  </CardBody>
</Card>
```

### Keyboard Accessibility

Ensure clickable cards are keyboard accessible:

```tsx
<Card 
  clickable 
  onClick={handleClick}
  aria-label="View product details"
>
  <CardHeader title="Product Card" />
  <CardBody>Press Enter or Space to view details</CardBody>
</Card>
```

**Supported Keys:**

- **Tab**: Navigate to card
- **Enter/Space**: Activate card
- **Focus indicator**: 2px red outline

## Layout Patterns

### Equal Height Cards

Use `fullHeight` for consistent layouts:

```tsx
<Grid columns={{ xs: 1, md: 3 }} gap={6}>
  <Card fullHeight>
    <CardHeader title="Short Content" />
    <CardBody>Brief description</CardBody>
    <CardFooter align="right">
      <Button>Action</Button>
    </CardFooter>
  </Card>
  <Card fullHeight>
    <CardHeader title="Long Content" />
    <CardBody>
      This card has much more content but the footer will still align
      with other cards thanks to fullHeight prop.
    </CardBody>
    <CardFooter align="right">
      <Button>Action</Button>
    </CardFooter>
  </Card>
</Grid>
```

### Responsive Card Grids

Adapt to different screen sizes:

```tsx
<Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
  {items.map(item => (
    <Card key={item.id} fullHeight>
      <CardHeader title={item.title} />
      <CardBody>{item.description}</CardBody>
      <CardFooter align="center">
        <Button variant="primary">View Details</Button>
      </CardFooter>
    </Card>
  ))}
</Grid>
```

## Common Patterns

### Product Cards

E-commerce and catalog displays:

```tsx
<Card fullHeight clickable onClick={() => navigate(`/product/${id}`)}>
  <CardBody>
    <img 
      src={product.image} 
      alt={product.name}
      style={{ 
        width: '100%', 
        height: '200px', 
        objectFit: 'cover',
        borderRadius: 'var(--s-radius-md)',
        marginBottom: 'var(--s-spacing-4)'
      }} 
    />
    <h3 style={{
      fontSize: 'var(--s-font-size-lg)',
      fontWeight: 'var(--s-font-weight-bold)',
      marginBottom: 'var(--s-spacing-2)'
    }}>
      {product.name}
    </h3>
    <p style={{ 
      color: 'var(--s-color-neutral-600)',
      marginBottom: 'var(--s-spacing-4)'
    }}>
      {product.description}
    </p>
  </CardBody>
  <CardFooter align="between">
    <span style={{ 
      fontSize: 'var(--s-font-size-xl)', 
      fontWeight: 'var(--s-font-weight-bold)' 
    }}>
      ${product.price}
    </span>
    <Button variant="primary">Add to Cart</Button>
  </CardFooter>
</Card>
```

### Dashboard Widgets

Metrics and status displays:

```tsx
<Card density="compact">
  <CardHeader 
    title="Total Revenue" 
    subtitle="Last 30 days"
    badge={<Badge variant="success">+12%</Badge>}
  />
  <CardBody>
    <div style={{
      fontSize: 'var(--s-font-size-3xl)',
      fontWeight: 'var(--s-font-weight-bold)',
      color: 'var(--s-color-green-600)',
      marginBottom: 'var(--s-spacing-2)'
    }}>
      $45,231
    </div>
    <div style={{
      fontSize: 'var(--s-font-size-sm)',
      color: 'var(--s-color-neutral-600)'
    }}>
      Up from $40,423 last month
    </div>
  </CardBody>
</Card>
```

### Form Cards

Input and configuration interfaces:

```tsx
<Card>
  <CardHeader title="Account Settings" subtitle="Manage your profile" />
  <CardBody>
    <Stack direction="vertical" gap={4}>
      <div>
        <label style={{ 
          display: 'block',
          fontSize: 'var(--s-font-size-sm)',
          fontWeight: 'var(--s-font-weight-semibold)',
          marginBottom: 'var(--s-spacing-2)'
        }}>
          Full Name
        </label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: 'var(--s-spacing-3)',
            border: '2px solid var(--s-color-neutral-200)',
            borderRadius: 'var(--s-radius-md)',
            fontSize: 'var(--s-font-size-base)'
          }}
        />
      </div>
      {/* More form fields */}
    </Stack>
  </CardBody>
  <CardFooter align="right">
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Save Changes</Button>
  </CardFooter>
</Card>
```

### Article Cards

Content previews and blog posts:

```tsx
<Card density="spacious" clickable onClick={handleRead}>
  <CardHeader 
    title="Understanding Design Systems" 
    subtitle="Oct 13, 2025"
  />
  <CardBody>
    <p>
      A comprehensive guide to building scalable design systems 
      with modern web technologies and best practices.
    </p>
  </CardBody>
  <CardFooter align="between">
    <div style={{ 
      display: 'flex', 
      gap: 'var(--s-spacing-3)',
      fontSize: 'var(--s-font-size-sm)',
      color: 'var(--s-color-neutral-600)'
    }}>
      <User size={16} />
      <span>Jane Doe</span>
      <span>•</span>
      <span>5 min read</span>
    </div>
    <Button variant="primary">Read Article</Button>
  </CardFooter>
</Card>
```

## Performance Tips

### Lazy Loading

For large card lists, implement lazy loading:

```tsx
const [visibleCards, setVisibleCards] = useState(10);

// Load more cards when user scrolls
const loadMore = () => {
  setVisibleCards(prev => prev + 10);
};

return (
  <Grid columns={{ xs: 1, md: 3 }} gap={6}>
    {items.slice(0, visibleCards).map(item => (
      <Card key={item.id}>
        {/* Card content */}
      </Card>
    ))}
    {visibleCards < items.length && (
      <Card clickable onClick={loadMore}>
        <CardBody style={{ textAlign: 'center' }}>
          Load More Items
        </CardBody>
      </Card>
    )}
  </Grid>
);
```

### Memoization

Optimize re-renders for expensive card content:

```tsx
const ProductCard = React.memo(({ product }) => (
  <Card>
    <CardHeader title={product.name} />
    <CardBody>
      <ProductDetails product={product} />
    </CardBody>
  </Card>
));
```

### Virtual Scrolling

For very large lists, consider virtual scrolling:

```tsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedCardList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <Card>
        <CardHeader title={items[index].title} />
        <CardBody>{items[index].description}</CardBody>
      </Card>
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={200}
    >
      {Row}
    </List>
  );
}
```

## Troubleshooting

### Cards Not Aligning in Grid

**Problem**: Cards have different heights
**Solution**: Use `fullHeight` prop

```tsx
<Grid columns={{ xs: 1, md: 3 }} gap={6}>
  <Card fullHeight>Content 1</Card>
  <Card fullHeight>Content 2</Card>
  <Card fullHeight>Content 3</Card>
</Grid>
```

### Clickable Cards Not Working

**Problem**: Card doesn't respond to clicks
**Solution**: Ensure `clickable={true}` is set

```tsx
<Card clickable onClick={handleClick}>
  {/* Card content */}
</Card>
```

### Footer Not at Bottom

**Problem**: Footer doesn't stick to bottom
**Solution**: Use `fullHeight` and ensure CardBody has content

```tsx
<Card fullHeight>
  <CardHeader title="Title" />
  <CardBody>
    {/* Content pushes footer down */}
  </CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### State Not Updating

**Problem**: Loading/error states not showing
**Solution**: Ensure proper state management

```tsx
const [cardState, setCardState] = useState('idle');

// Update state properly
const handleAsyncAction = async () => {
  setCardState('loading');
  try {
    await performAction();
    setCardState('success');
  } catch (error) {
    setCardState('error');
  }
};
```

## API Reference

### CardProps

```typescript
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: 'basic' | 'highlighted' | 'outlined' | 'interactive' | 'ghost' | 'elevated' | 'default' | 'outline';
  
  /** Spacing density (padding scale) */
  density?: 'compact' | 'normal' | 'spacious';
  
  /** Transform to button element when clickable */
  clickable?: boolean;
  
  /** Stretch card to 100% height of container */
  fullHeight?: boolean;
  
  /** Card content */
  children: ReactNode;
  
  /** Additional CSS class */
  className?: string;
  
  /** Click handler (requires clickable=true for button element) */
  onClick?: () => void;
  
  /** Card interaction state */
  state?: 'idle' | 'loading' | 'error' | 'success';
  
  /** Interaction feedback level */
  feedback?: 'none' | 'subtle' | 'prominent';
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Loading text for loading state */
  loadingText?: string;
  
  /** Error message for error state */
  errorMessage?: string;
  
  /** Success message for success state */
  successMessage?: string;
  
  /** ARIA label for accessibility */
  'aria-label'?: string;
  
  /** ARIA described by for accessibility */
  'aria-describedby'?: string;
}
```

### CardHeaderProps

```typescript
interface CardHeaderProps {
  /** Header title */
  title?: string;
  
  /** Optional subtitle */
  subtitle?: string;
  
  /** Optional badge/tag */
  badge?: ReactNode;
  
  /** Hide bottom border */
  noBorder?: boolean;
  
  /** Custom content (if not using title/subtitle) */
  children?: ReactNode;
  
  /** Additional CSS class */
  className?: string;
  
  /** Title heading level (h1-h6) */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /** ARIA label for title */
  'aria-label'?: string;
}
```

### CardBodyProps

```typescript
interface CardBodyProps {
  /** Body content */
  children: ReactNode;
  
  /** Additional CSS class */
  className?: string;
  
  /** ARIA label for body content */
  'aria-label'?: string;
  
  /** ARIA described by for body content */
  'aria-describedby'?: string;
}
```

### CardFooterProps

```typescript
interface CardFooterProps {
  /** Footer content (typically buttons) */
  children: ReactNode;
  
  /** Content alignment */
  align?: 'left' | 'center' | 'right' | 'between';
  
  /** Hide top border */
  noBorder?: boolean;
  
  /** Additional CSS class */
  className?: string;
  
  /** ARIA label for footer content */
  'aria-label'?: string;
}
```

## Related Components

- **Grid**: Layout cards in responsive grids
- **Container**: Wrap card grids with max-width
- **Button**: Action buttons in CardFooter
- **Badge**: Status badges in CardHeader
- **Stack**: Vertical/horizontal spacing

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires CSS Grid and CSS Custom Properties support.

## Performance

- **Bundle Size**: ~3KB gzipped
- **CSS Modules**: Scoped styles, zero runtime overhead
- **Tree-shakeable**: Import only what you use
- **GPU Accelerated**: Transform-based animations with `translateZ(0)`
- **Modern Easing**: Cubic-bezier transitions for smoother animations
- **Ripple Optimization**: Efficient DOM manipulation for ripple effects
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **Memory Management**: Proper cleanup of event listeners and animations
- **Hardware-accelerated**: Transform-based hover effects

## License

MIT

## Support

For issues, questions, or contributions:

- [GitHub Issues](https://github.com/spexop-ui/design-system/issues)
- [Documentation](https://spexop.com)
