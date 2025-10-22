# Footer Component

**Version**: 0.3.2  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A flexible, primitives-first footer component for website and application layouts. Compose your footer content using Grid, Stack, and Container primitives with modern visual variants and enhanced accessibility.

## Features

- ✅ 6 visual variants (default, minimal, bordered, modern, elegant, accent)
- ✅ Responsive padding system (0-10 scale)
- ✅ Primitives-first composition (use with Grid, Stack, Container)
- ✅ Enhanced link styling with hover effects
- ✅ Semantic HTML (footer, div, or section)
- ✅ ARIA support for accessibility
- ✅ Theme-aware (light & dark mode)
- ✅ Modern UI/UX elements
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { Footer, Container, Grid, Stack } from '@spexop/react';

function App() {
  return (
    <Footer variant="default" padding={10}>
      <Container maxWidth="xl">
        <Grid columns={{ xs: 1, md: 4 }} gap={8}>
          <Stack gap={4}>
            <h3>Product</h3>
            <a href="/features">Features</a>
            <a href="/pricing">Pricing</a>
            <a href="/docs">Documentation</a>
          </Stack>
          <Stack gap={4}>
            <h3>Company</h3>
            <a href="/about">About</a>
            <a href="/blog">Blog</a>
            <a href="/careers">Careers</a>
          </Stack>
          {/* More columns */}
        </Grid>
        <p style={{ textAlign: 'center', marginTop: '32px' }}>
          © 2025 Company Name. All rights reserved.
        </p>
      </Container>
    </Footer>
  );
}
```

## Variants

### Default

Classic footer with clean 2px top border:

```tsx
<Footer variant="default" padding={10}>
  {/* Your content */}
</Footer>
```

### Modern (New in v0.3.2)

Contemporary with subtle gradient and accent line:

```tsx
<Footer variant="modern" padding={10}>
  <Container maxWidth="xl">
    {/* Modern footer content */}
  </Container>
</Footer>
```

Features:

- Subtle gradient background (surface → surface-secondary)
- Horizontal accent line with fade effect
- Clean and contemporary

### Elegant (New in v0.3.2)

Refined with primary color accent bar:

```tsx
<Footer variant="elegant" padding={10}>
  <Container maxWidth="xl">
    {/* Elegant footer content */}
  </Container>
</Footer>
```

Features:

- 120px primary color accent bar at top
- Enhanced typography (font-weight: 500, letter-spacing)
- Professional and sophisticated

### Accent (New in v0.3.2)

Bold with strong primary color emphasis:

```tsx
<Footer variant="accent" padding={10}>
  <Container maxWidth="lg">
    {/* Accent footer content */}
  </Container>
</Footer>
```

Features:

- 3px primary color borders (top and bottom)
- Light primary background tint
- Semibold link typography
- Brand-focused and memorable

### Bordered

Contained footer with full border and rounded corners:

```tsx
<Footer variant="bordered" padding={8}>
  {/* Bordered footer content */}
</Footer>
```

### Minimal

Transparent with no decorations:

```tsx
<Footer variant="minimal" padding={4}>
  <p>© 2025 Company</p>
</Footer>
```

## Common Patterns

### Complete Site Footer

```tsx
import { Footer, Container, Grid, Stack } from '@spexop/react';

function SiteFooter() {
  return (
    <Footer variant="modern" padding={10} aria-label="Site footer">
      <Container maxWidth="xl">
        <Grid columns={{ xs: 1, md: 4 }} gap={8}>
          <Stack gap={4}>
            <h3>Product</h3>
            <a href="/features">Features</a>
            <a href="/pricing">Pricing</a>
            <a href="/docs">Documentation</a>
          </Stack>
          
          <Stack gap={4}>
            <h3>Company</h3>
            <a href="/about">About</a>
            <a href="/careers">Careers</a>
            <a href="/blog">Blog</a>
          </Stack>
          
          <Stack gap={4}>
            <h3>Resources</h3>
            <a href="/support">Support</a>
            <a href="/community">Community</a>
            <a href="/contact">Contact</a>
          </Stack>
          
          <Stack gap={4}>
            <h3>Legal</h3>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/security">Security</a>
          </Stack>
        </Grid>
        
        <div style={{ height: '1px', background: '#e5e5e5', margin: '32px 0' }} />
        
        <p style={{ textAlign: 'center', color: '#737373' }}>
          © 2025 Company Name. All rights reserved.
        </p>
      </Container>
    </Footer>
  );
}
```

### Simple Copyright Footer

```tsx
<Footer variant="minimal" padding={6}>
  <Container maxWidth="xl">
    <p style={{ textAlign: 'center' }}>
      © 2025 Company Name
    </p>
  </Container>
</Footer>
```

### Two-Column Footer

```tsx
<Footer variant="default" padding={10}>
  <Container maxWidth="xl">
    <Grid columns={{ xs: 1, md: 2 }} gap={8}>
      <div>
        <h3>About Us</h3>
        <p>Building the future of web development.</p>
      </div>
      <Stack gap={4}>
        <h3>Quick Links</h3>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/careers">Careers</a>
      </Stack>
    </Grid>
  </Container>
</Footer>
```

### Footer with Social Links

```tsx
import { Icon } from '@spexop/react';

<Footer variant="elegant" padding={10}>
  <Container maxWidth="xl">
    <Grid columns={{ xs: 1, md: 4 }} gap={8}>
      {/* Link columns */}
    </Grid>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
      <p>© 2025 Company</p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <a href="https://twitter.com">
          <Icon name="Twitter" size="md" />
        </a>
        <a href="https://github.com">
          <Icon name="Github" size="md" />
        </a>
        <a href="https://linkedin.com">
          <Icon name="LinkedIn" size="md" />
        </a>
      </div>
    </div>
  </Container>
</Footer>
```

## Props

```typescript
interface FooterProps {
  /** Visual variant */
  variant?: "default" | "minimal" | "bordered" | "modern" | "elegant" | "accent";
  
  /** Padding on all sides (0-10 scale) - Responsive */
  padding?: ResponsiveProp<SpacingScale>;
  
  /** Padding overrides */
  paddingTop?: ResponsiveProp<SpacingScale>;
  paddingBottom?: ResponsiveProp<SpacingScale>;
  paddingLeft?: ResponsiveProp<SpacingScale>;
  paddingRight?: ResponsiveProp<SpacingScale>;
  
  /** Show border on all sides */
  withBorder?: boolean;
  
  /** Apply background color */
  withBackground?: boolean;
  
  /** HTML element to render */
  as?: "footer" | "div" | "section";
  
  /** ARIA label for accessibility */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  
  /** Footer content - compose with primitives */
  children?: ReactNode;
  
  /** Additional CSS class */
  className?: string;
  
  /** Inline styles */
  style?: CSSProperties;
}
```

### Spacing Scale (0-10)

The padding props use design tokens:

| Value | Pixels | Usage |
|-------|--------|-------|
| 0 | 0px | No padding |
| 1 | 4px | Extra tight |
| 2 | 8px | Tight |
| 4 | 16px | Compact |
| 6 | 24px | Default |
| 8 | 32px | Comfortable |
| 10 | 40px | Spacious |

### Responsive Padding

```tsx
<Footer
  padding={{ xs: 4, md: 8, lg: 10 }}
>
  {/* Adapts padding based on screen size */}
</Footer>
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Footer provides structure, you compose with Grid/Stack/Container
2. **Borders before shadows** - All variants use 2-3px borders, no heavy shadows
3. **Typography before decoration** - Enhanced typography in elegant/accent variants for hierarchy
4. **Tokens before magic numbers** - All spacing, colors, and typography use theme tokens
5. **Composition before complexity** - Simple container that works with other primitives
6. **Accessibility before aesthetics** - Semantic HTML, ARIA support, dual hover indicators

### Modern UI/UX Elements

**Modern Variant:**

- Subtle gradient (not flashy)
- Thin accent line effect
- Maintains readability

**Elegant Variant:**

- Primary color accent bar (120px)
- Enhanced font-weight (500) and letter-spacing
- Professional appearance

**Accent Variant:**

- Bold 3px borders
- Semibold typography (600)
- Strong brand presence

## Accessibility

- ✅ Semantic `<footer>` element by default
- ✅ ARIA label support (aria-label, aria-labelledby)
- ✅ Enhanced link hover states (color AND underline)
- ✅ Clear focus-visible outlines for keyboard navigation
- ✅ Respects prefers-reduced-motion
- ✅ High contrast text in all variants
- ✅ Theme-aware (adapts to light/dark modes)

### Link Accessibility

All footer links include dual indicators for better accessibility:

```css
.footer a:hover {
  color: var(--theme-primary);      /* Color change */
  border-bottom-color: var(--theme-primary);  /* Underline appears */
}
```

This ensures users who are color-blind can still see the hover state via the underline.

### Keyboard Navigation

```css
.footer a:focus-visible {
  outline: 2px solid var(--theme-primary);
  outline-offset: 4px;
  border-radius: 4px;
}
```

## Responsive Behavior

The Footer component adapts to different screen sizes:

- Use responsive padding: `padding={{ xs: 4, md: 8, lg: 10 }}`
- Compose with responsive Grid: `columns={{ xs: 1, md: 2, lg: 4 }}`
- Stack primitives handle vertical/horizontal layouts automatically

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Container` - Width constraint
- `Grid` - Column layout
- `Stack` - Vertical stacking
- `TextInput` - Newsletter input

## License

MIT
