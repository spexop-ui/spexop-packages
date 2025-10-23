# CTACard Usage Guide

Comprehensive guide to using Spexop's CTACard component for building modern, accessible call-to-action interfaces.

## Overview

The CTACard component is a specialized card designed to drive user engagement and conversions. It features prominent headings, compelling copy, and emphasized action buttons with modern UI/UX principles and comprehensive accessibility support.

> **⚠️ Deprecation Notice**: CTACard is deprecated and will be removed in v0.4.0. Use Card composition patterns instead. See [Migration Guide](#migration-guide) for details.

## Quick Reference

| Feature | Description | Best For |
|---------|-------------|----------|
| **Modern UI/UX** | Micro-interactions, better spacing, enhanced feedback | All CTA contexts |
| **Border-Based Design** | Clean 2px borders with subtle elevation on hover | Consistent with Spexop principles |
| **Typography-Driven Hierarchy** | Bold headlines for emphasis | Clear value propositions |
| **Token-Based Styling** | 100% design token usage | Theme consistency |
| **Density Variants** | Compact, Normal, Spacious for different contexts | Flexible layouts |
| **State Management** | Loading, error, success states with proper ARIA support | Async operations |
| **Enhanced Accessibility** | WCAG AA+ compliant with comprehensive ARIA attributes | Inclusive design |
| **Modern Interactions** | Ripple effects, smooth transitions, feedback levels | Enhanced user experience |
| **Theme-Aware** | Automatic light and dark mode support | Multi-theme applications |
| **Responsive** | Mobile-first design with optimized touch targets | Cross-device compatibility |

## Installation

```bash
pnpm add @spexop/react @spexop/theme
```

## Basic Usage

### Simple CTA

```tsx
import { CTACard } from '@spexop/react';

function SimpleCTA() {
  return (
    <CTACard
      headline="Ready to get started?"
      description="Join thousands of users building better products"
      primaryAction={{
        label: "Start Free Trial",
        onClick: () => navigate('/signup')
      }}
    />
  );
}
```

### With Secondary Action

```tsx
<CTACard
  headline="Upgrade to Pro"
  description="Unlock advanced features and premium support"
  primaryAction={{
    label: "Upgrade Now",
    onClick: handleUpgrade
  }}
  secondaryAction={{
    label: "Learn More",
    onClick: () => navigate('/pricing')
  }}
/>
```

### With Icon

```tsx
import { Rocket } from '@spexop/icons';

<CTACard
  icon={<Rocket />}
  headline="Launch your project"
  description="Everything you need to build and deploy"
  primaryAction={{
    label: "Get Started",
    onClick: handleStart
  }}
/>
```

## Layout Variants

### Centered Layout (Default)

```tsx
<CTACard
  headline="Transform your workflow"
  description="Streamline your process with powerful tools"
  centered
  primaryAction={{
    label: "Try It Free",
    onClick: handleTrial
  }}
/>
```

### Left-Aligned Layout

```tsx
<CTACard
  headline="Need help?"
  description="Our support team is here for you 24/7"
  centered={false}
  primaryAction={{
    label: "Contact Support",
    onClick: handleContact
  }}
/>
```

## Density Variants

### Compact Density

Perfect for secondary CTAs or dense layouts:

```tsx
<CTACard
  headline="Quick Action"
  description="Fast and efficient"
  density="compact"
  primaryAction={{
    label: "Go",
    onClick: handleQuickAction
  }}
/>
```

### Normal Density

Balanced spacing for standard contexts:

```tsx
<CTACard
  headline="Standard CTA"
  description="Balanced spacing and typography"
  density="normal"
  primaryAction={{
    label: "Continue",
    onClick: handleContinue
  }}
/>
```

### Spacious Density (Default)

Generous spacing for important calls-to-action:

```tsx
<CTACard
  headline="Premium Experience"
  description="Generous spacing for important calls-to-action"
  density="spacious"
  primaryAction={{
    label: "Get Premium",
    onClick: handlePremium
  }}
/>
```

## State Management

### Loading State

```tsx
function LoadingCTA() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await processSubmission();
    } finally {
      setLoading(false);
    }
  };

  return (
    <CTACard
      headline="Processing your request"
      description="Please wait while we process your data"
      state="loading"
      loadingText="Processing..."
      primaryAction={{
        label: "Cancel",
        onClick: handleCancel,
        disabled: true
      }}
    />
  );
}
```

### Error State

```tsx
<CTACard
  headline="Something went wrong"
  description="We encountered an error processing your request"
  state="error"
  errorMessage="Failed to process payment"
  primaryAction={{
    label: "Try Again",
    onClick: handleRetry
  }}
/>
```

### Success State

```tsx
<CTACard
  headline="Success!"
  description="Your account has been created successfully"
  state="success"
  successMessage="Welcome to our platform"
  primaryAction={{
    label: "Get Started",
    onClick: handleGetStarted
  }}
/>
```

## Advanced Features

### Action Button Variants

```tsx
<CTACard
  headline="Custom Actions"
  description="Different button styles for different purposes"
  primaryAction={{
    label: "Primary Action",
    onClick: handlePrimary,
    variant: "primary"
  }}
  secondaryAction={{
    label: "Secondary Action",
    onClick: handleSecondary,
    variant: "outline"
  }}
/>
```

### Action Button States

```tsx
<CTACard
  headline="Button States"
  description="Loading and disabled states for actions"
  primaryAction={{
    label: "Loading Action",
    onClick: handleAction,
    loading: true
  }}
  secondaryAction={{
    label: "Disabled Action",
    onClick: handleDisabled,
    disabled: true
  }}
/>
```

### Feedback Levels

```tsx
{/* Subtle feedback */}
<CTACard
  headline="Subtle Interaction"
  description="Minimal hover effects"
  feedback="subtle"
  primaryAction={{
    label: "Subtle Action",
    onClick: handleSubtle
  }}
/>

{/* Prominent feedback */}
<CTACard
  headline="Prominent Interaction"
  description="Enhanced hover effects"
  feedback="prominent"
  primaryAction={{
    label: "Prominent Action",
    onClick: handleProminent
  }}
/>
```

## Common Patterns

### Newsletter Signup

```tsx
function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await subscribeToNewsletter(email);
      // Show success state
    } catch (error) {
      // Show error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <CTACard
      headline="Stay in the loop"
      description="Get the latest updates, tips, and exclusive content"
      state={loading ? "loading" : "idle"}
      loadingText="Subscribing..."
      primaryAction={{
        label: "Subscribe",
        onClick: handleSubscribe,
        loading: loading
      }}
      secondaryAction={{
        label: "View Archive",
        onClick: () => navigate('/newsletter')
      }}
    />
  );
}
```

### Trial Conversion

```tsx
<CTACard
  icon={<Star />}
  headline="Ready to upgrade?"
  description="Get unlimited projects, priority support, and advanced features"
  primaryAction={{
    label: "Start 14-Day Free Trial",
    onClick: handleTrial
  }}
  secondaryAction={{
    label: "Compare Plans",
    onClick: () => navigate('/pricing')
  }}
  variant="highlighted"
  density="spacious"
/>
```

### Footer CTA

```tsx
import { Container } from '@spexop/react';

function FooterCTA() {
  return (
    <Container maxWidth="xl" padding={8}>
      <CTACard
        headline="Build something amazing"
        description="Join thousands of developers creating the future"
        primaryAction={{
          label: "Get Started Free",
          onClick: () => navigate('/signup')
        }}
        secondaryAction={{
          label: "View Documentation",
          onClick: () => navigate('/docs')
        }}
        centered
        variant="highlighted"
      />
    </Container>
  );
}
```

### Download CTA

```tsx
<CTACard
  icon={<Download />}
  headline="Download our mobile app"
  description="Access your account anywhere, anytime"
  primaryAction={{
    label: "App Store",
    onClick: handleAppStore
  }}
  secondaryAction={{
    label: "Google Play",
    onClick: handleGooglePlay
  }}
/>
```

### Limited Time Offer

```tsx
<CTACard
  headline="Black Friday Sale"
  description="Save 50% on all annual plans - ends in 24 hours"
  primaryAction={{
    label: "Claim Offer",
    onClick: handleClaim
  }}
  secondaryAction={{
    label: "View Details",
    onClick: showDetails
  }}
  variant="highlighted"
  feedback="prominent"
/>
```

## Design Principles

Following "The Spexop Way":

### 1. Primitives Before Patterns

CTACard is built on the Card primitive with sub-components:

```tsx
// CTACard internally uses Card composition
<Card variant="highlighted" density="spacious">
  <CardHeader title={headline} headingLevel={2} />
  <CardBody>
    <p>{description}</p>
  </CardBody>
  <CardFooter align="center">
    <Button variant="primary">{primaryAction.label}</Button>
  </CardFooter>
</Card>
```

### 2. Borders Before Shadows

Clean 2px borders instead of heavy shadows:

```css
/* ✅ CORRECT */
border: var(--theme-border-width) solid var(--theme-card-highlighted-border);

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
<CTACard density="spacious"> {/* Uses tokens */}

// ❌ AVOID
<div style={{ padding: '32px' }}> {/* Magic number */}
```

### 5. Composition Before Complexity

Build complex layouts from simple sub-components:

```tsx
// ✅ CORRECT - Composable
<CTACard
  headline="Title"
  description="Content"
  primaryAction={{ label: "Action", onClick: handleAction }}
/>

// ❌ AVOID - Monolithic
<ComplexCTACard title="Title" content="Content" actions={...} />
```

### 6. Standards Before Frameworks

Use web platform fundamentals:

```tsx
// ✅ CORRECT - Semantic HTML
<CardHeader title="Title" headingLevel={2} />

// ❌ AVOID - Custom elements
<CustomTitle level="2">Title</CustomTitle>
```

### 7. Accessibility Before Aesthetics

WCAG AA+ compliance by default:

```tsx
// ✅ CORRECT - Accessible
<CTACard
  aria-label="Call to action: Get started"
  primaryAction={{
    label: "Get Started",
    onClick: handleStart
  }}
/>

// ❌ AVOID - Missing accessibility
<CTACard onClick={handleStart}>Get Started</CTACard>
```

## Accessibility

### WCAG AA+ Compliance

- **Text contrast**: Minimum 7:1 (AAA), 4.5:1 (AA)
- **UI contrast**: Minimum 3:1
- **Touch targets**: Minimum 44px
- **Keyboard navigation**: Full support
- **Screen readers**: ARIA labels and roles

### Keyboard Navigation

```tsx
// CTACard automatically handles keyboard navigation
<CTACard
  primaryAction={{
    label: "Submit",
    onClick: handleSubmit
  }}
/>

// Users can:
// - Tab to focus the primary action button
// - Press Enter or Space to activate
// - Use Escape to cancel (if implemented)
```

### ARIA Support

```tsx
<CTACard
  aria-label="Custom CTA"
  aria-describedby="cta-description"
  primaryAction={{
    label: "Action",
    onClick: handleAction
  }}
/>
```

### Screen Reader Support

```tsx
// Automatic semantic structure
<CTACard
  headline="Get Started" // Renders as <h2>
  description="Join our platform" // Renders as <p>
  primaryAction={{
    label: "Sign Up", // Renders as <button>
    onClick: handleSignup
  }}
/>
```

## Responsive Design

### Mobile-First Approach

```tsx
// CTACard automatically adapts to mobile
<CTACard
  headline="Mobile Optimized"
  description="Responsive by default"
  primaryAction={{
    label: "Mobile Action",
    onClick: handleMobileAction
  }}
/>

// Mobile optimizations:
// - Stacked button layout
// - Optimized touch targets (44px minimum)
// - Reduced spacing for compact screens
// - Full-width buttons on mobile
```

### Breakpoint Behavior

```css
/* Mobile (max-width: 768px) */
@media (max-width: 768px) {
  .actions {
    flex-direction: column;
    gap: var(--theme-spacing-2);
    width: 100%;
  }
  
  .primaryAction,
  .secondaryAction {
    width: 100%;
    min-width: auto;
  }
}
```

## Performance

### Optimization Tips

1. **Memoize Action Handlers**

```tsx
const handleAction = useCallback(() => {
  // Action logic
}, [dependency]);

<CTACard
  primaryAction={{
    label: "Action",
    onClick: handleAction
  }}
/>
```

2. **Lazy Load Icons**

```tsx
const LazyIcon = lazy(() => import('@spexop/icons').then(m => ({ default: m.Rocket })));

<CTACard
  icon={<Suspense fallback={<div>Loading...</div>}><LazyIcon /></Suspense>}
  // ... other props
/>
```

3. **Avoid Inline Functions**

```tsx
// ❌ AVOID - Creates new function on every render
<CTACard
  primaryAction={{
    label: "Action",
    onClick: () => handleAction() // Inline function
  }}
/>

// ✅ CORRECT - Stable reference
const handleAction = useCallback(() => {
  // Action logic
}, []);

<CTACard
  primaryAction={{
    label: "Action",
    onClick: handleAction
  }}
/>
```

## Testing

### Unit Testing

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CTACard } from './CTACard';

describe('CTACard', () => {
  it('renders with required props', () => {
    render(
      <CTACard
        headline="Test Headline"
        description="Test Description"
        primaryAction={{
          label: "Test Action",
          onClick: vi.fn()
        }}
      />
    );

    expect(screen.getByText("Test Headline")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Action")).toBeInTheDocument();
  });

  it('handles primary action click', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <CTACard
        headline="Test"
        description="Test"
        primaryAction={{
          label: "Click Me",
          onClick: handleClick
        }}
      />
    );

    const button = screen.getByRole('button', { name: 'Click Me' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should not have accessibility violations', async () => {
  const { container } = render(
    <CTACard
      headline="Test"
      description="Test"
      primaryAction={{
        label: "Test",
        onClick: vi.fn()
      }}
    />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Migration Guide

### From CTACard to Card Composition

CTACard is deprecated and will be removed in v0.4.0. Use Card composition instead:

```tsx
// Before (CTACard)
<CTACard
  headline="Get Started"
  description="Join our platform"
  primaryAction={{ label: "Sign Up", onClick: handleSignup }}
  secondaryAction={{ label: "Learn More", onClick: handleLearn }}
  icon={<Rocket />}
  centered
  variant="highlighted"
  density="spacious"
/>

// After (Card composition)
<Card variant="highlighted" density="spacious">
  <CardHeader 
    title="Get Started" 
    headingLevel={2}
    className="text-center"
  />
  <CardBody className="text-center">
    <p>Join our platform</p>
  </CardBody>
  <CardFooter align="center">
    <div className="flex gap-3">
      <Button variant="primary" onClick={handleSignup}>
        Sign Up
      </Button>
      <Button variant="ghost" onClick={handleLearn}>
        Learn More
      </Button>
    </div>
  </CardFooter>
</Card>
```

### Migration Steps

1. **Replace CTACard with Card**
2. **Move headline to CardHeader with headingLevel={2}**
3. **Move description to CardBody**
4. **Move actions to CardFooter with proper alignment**
5. **Add icon as separate element if needed**
6. **Apply appropriate styling classes**

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Card` - Base card component with sub-components
- `CardHeader` - Consistent header styling
- `CardBody` - Flexible content layout
- `CardFooter` - Consistent footer styling
- `Button` - Action buttons with variants
- `Hero` - Landing page hero sections

## Best Practices

### Content Strategy

1. **Clear Value Proposition**
   - Make benefit obvious in headline
   - Use action-oriented language
   - Focus on user benefits, not features

2. **Strong Action Verbs**
   - "Start", "Get", "Join", "Upgrade"
   - Avoid weak verbs like "Learn More"
   - Be specific about the action

3. **Single Focus**
   - One primary action per card
   - Secondary actions should be clearly secondary
   - Avoid decision paralysis

### Design Guidelines

1. **Use Appropriate Density**
   - Spacious for important CTAs
   - Normal for standard contexts
   - Compact for secondary actions

2. **Provide Feedback**
   - Use loading states for async actions
   - Show success/error states when appropriate
   - Give users clear next steps

3. **Test Accessibility**
   - Ensure keyboard navigation works
   - Test with screen readers
   - Verify color contrast ratios

### Performance

1. **Optimize Images**
   - Use appropriate icon sizes
   - Consider lazy loading for large images
   - Optimize for different screen densities

2. **Minimize Re-renders**
   - Memoize action handlers
   - Use stable references
   - Avoid inline functions

3. **Consider Bundle Size**
   - Import only needed icons
   - Use tree-shaking friendly imports
   - Consider code splitting for large features

## Troubleshooting

### Common Issues

**Q: My CTA isn't converting well**
A: Check your value proposition, action verb, and visual hierarchy. Consider A/B testing different headlines and button text.

**Q: The component looks different on mobile**
A: This is expected behavior. CTACard uses responsive design with mobile-first approach. Check if you need custom mobile styling.

**Q: Accessibility issues with screen readers**
A: Ensure you're using semantic HTML structure and proper ARIA attributes. Test with actual screen readers.

**Q: Performance issues with many CTAs**
A: Consider memoizing action handlers and using React.memo for the component if needed.

### Getting Help

- Check the [Card Usage Guide](../Card/USAGE-GUIDE.md) for base component patterns
- Review [Accessibility Guidelines](../../../docs/accessibility.md)
- See [Migration Guide](../../../docs/migrations/from-v0.3-to-v0.4.md) for v0.4.0 changes
- Join the [Spexop Community](https://github.com/spexop-ui/spexop) for support
