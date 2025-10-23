# Heading Component - Usage Guide

## Common Use Cases

### Hero Section Heading

```tsx
import { Container, Stack, Heading, Text, Button } from '@spexop/react';

function Hero() {
  return (
    <Container maxWidth="2xl" padding="lg">
      <Stack direction="vertical" gap="md" align="center">
        <Heading level={1} weight="bold" align="center" variant="default">
          Build Beautiful Interfaces
        </Heading>
        <Text size="lg" align="center" weight="regular">
          Modern design system for React applications
        </Text>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Stack>
    </Container>
  );
}
```

### Status Messages

```tsx
import { Stack, Heading, Text } from '@spexop/react';

function StatusMessages() {
  return (
    <Stack direction="vertical" gap="md">
      <Heading level={2} variant="success">
        ✅ Success! Your changes have been saved.
      </Heading>
      
      <Heading level={2} variant="error">
        ❌ Error: Please check your input and try again.
      </Heading>
      
      <Heading level={2} variant="warning">
        ⚠️ Warning: This action cannot be undone.
      </Heading>
    </Stack>
  );
}
```

### Truncated Headings

```tsx
import { Container, Heading } from '@spexop/react';

function CardGrid() {
  return (
    <Container maxWidth="lg">
      <Heading 
        level={3} 
        truncate
        title="This is a very long heading that will be truncated with ellipsis"
      >
        This is a very long heading that will be truncated with ellipsis
      </Heading>
    </Container>
  );
}
```

### Clamped Headings

```tsx
import { Container, Heading } from '@spexop/react';

function ArticlePreview() {
  return (
    <Container maxWidth="md">
      <Heading 
        level={2} 
        clamp={2}
        weight="semibold"
      >
        This is a very long article title that will be clamped to exactly 2 lines with ellipsis at the end for better layout consistency
      </Heading>
    </Container>
  );
}
```

### Polymorphic Headings

```tsx
import { Heading } from '@spexop/react';

function FlexibleHeading() {
  return (
    <div>
      {/* Renders as h2 */}
      <Heading level={2}>Standard Heading</Heading>
      
      {/* Renders as div with heading styles */}
      <Heading level={2} as="div">
        Div with Heading Styles
      </Heading>
      
      {/* Renders as span for inline use */}
      <Heading level={3} as="span" weight="semibold">
        Inline Heading
      </Heading>
    </div>
  );
}
```

### Documentation Page

```tsx
import { Stack, Heading, Text } from '@spexop/react';

function DocsPage() {
  return (
    <article>
      <Stack direction="vertical" gap="lg">
        <Heading level={1} weight="bold">
          Button Component
        </Heading>
        <Text size="lg" weight="regular">
          Interactive button component with multiple variants and sizes.
        </Text>
        
        <Heading level={2} weight="bold" id="installation">
          Installation
        </Heading>
        <Text>Installation instructions...</Text>
        
        <Heading level={2} weight="bold" id="usage">
          Usage
        </Heading>
        <Text>Usage examples...</Text>
        
        <Heading level={3} weight="semibold" id="variants">
          Variants
        </Heading>
        <Text>Variant documentation...</Text>
      </Stack>
    </article>
  );
}
```

### Feature Grid

```tsx
import { Grid, Card, Stack, Heading, Text, Icon } from '@spexop/react';

function Features() {
  return (
    <section>
      <Stack direction="vertical" gap="lg">
        <Heading level={2} weight="bold" align="center">
          Powerful Features
        </Heading>
        
        <Grid columns="auto-fit" minColumnWidth="300px" gap="md">
          <Card padding="md">
            <Stack direction="vertical" gap="sm">
              <Icon name="Layout" size="lg" />
              <Heading level={3} weight="semibold">
                Responsive Design
              </Heading>
              <Text weight="regular">
                Built-in responsive breakpoints
              </Text>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </section>
  );
}
```

### Pricing Section

```tsx
import { Grid, Card, Stack, Heading, Text, Badge, Button } from '@spexop/react';

function Pricing() {
  return (
    <section>
      <Stack direction="vertical" gap="xl">
        <Stack direction="vertical" gap="sm" align="center">
          <Heading level={2} weight="bold" align="center">
            Simple, Transparent Pricing
          </Heading>
          <Text size="lg" align="center" weight="regular">
            Choose the perfect plan for your needs
          </Text>
        </Stack>
        
        <Grid columns="auto-fit" minColumnWidth="300px" gap="md">
          <Card padding="lg">
            <Stack direction="vertical" gap="md">
              <Badge variant="primary">Most Popular</Badge>
              <Heading level={3} weight="semibold">
                Pro
              </Heading>
              <Text size="sm" weight="regular">
                For growing teams
              </Text>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </section>
  );
}
```

### Blog Article

```tsx
import { Container, Stack, Heading, Text } from '@spexop/react';

function BlogArticle() {
  return (
    <article>
      <Container maxWidth="lg" padding="lg">
        <Stack direction="vertical" gap="md">
          <Heading level={1} weight="bold">
            Getting Started with Design Systems
          </Heading>
          <Text size="sm" variant="secondary">
            Published on October 21, 2025 · 5 min read
          </Text>
          
          <Text size="lg" weight="regular">
            Design systems are the foundation of consistent user interfaces...
          </Text>
          
          <Heading level={2} weight="bold">
            What is a Design System?
          </Heading>
          <Text>Content...</Text>
          
          <Heading level={2} weight="bold">
            Key Benefits
          </Heading>
          <Text>Content...</Text>
        </Stack>
      </Container>
    </article>
  );
}
```

## Design Token Integration

All styles use theme tokens:

```css
/* Font Sizes (by level) */
h1: var(--theme-font-size-4xl)  /* 36px */
h2: var(--theme-font-size-3xl)  /* 30px */
h3: var(--theme-font-size-2xl)  /* 24px */
h4: var(--theme-font-size-xl)   /* 20px */
h5: var(--theme-font-size-lg)   /* 18px */
h6: var(--theme-font-size-base) /* 16px */

/* Font Weights */
regular: var(--theme-font-weight-regular)   /* 400 */
semibold: var(--theme-font-weight-semibold) /* 600 */
bold: var(--theme-font-weight-bold)         /* 700 */

/* Spacing */
margin-bottom: var(--theme-spacing-4) /* 16px */
```

## Accessibility Best Practices

### Proper Hierarchy

```tsx
// ✅ Correct - Maintains hierarchy
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section</Heading>
<Heading level={3}>Subsection</Heading>
<Heading level={3}>Another Subsection</Heading>
<Heading level={2}>Another Section</Heading>

// ❌ Wrong - Skips levels
<Heading level={1}>Page Title</Heading>
<Heading level={3}>Subsection</Heading> {/* Skipped h2! */}
```

### Single H1 Per Page

```tsx
// ✅ One h1 per page
<Heading level={1}>Main Page Title</Heading>
<Heading level={2}>Section</Heading>

// ❌ Multiple h1s
<Heading level={1}>Title 1</Heading>
<Heading level={1}>Title 2</Heading>
```

### With ARIA Labels

```tsx
<Heading level={2} aria-label="Features section">
  Features
</Heading>
```

## Responsive Behavior

Headings automatically reduce size on mobile:

```css
/* Desktop */
h1: 36px
h2: 30px
h3: 24px

/* Mobile (<640px) */
h1: 30px
h2: 24px
h3: 20px
```

## Performance

- CSS Modules for scoped styling
- Zero runtime overhead
- Tree-shakeable
- Minimal bundle impact (~1KB)

## Migration

From native HTML headings:

```tsx
// Before
<h1 style={{ fontWeight: 700, textAlign: 'center' }}>
  Title
</h1>

// After
<Heading level={1} weight="bold" align="center">
  Title
</Heading>
```

## Related

- Text - For paragraph and body text
- Link - For navigation links
- Badge - For status indicators
