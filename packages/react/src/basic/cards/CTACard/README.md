# CTACard Component

**Version**: 1.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready (Deprecated - Use Card composition instead)

## Overview

A modern call-to-action card component designed to drive user engagement with enhanced UI/UX principles. Features prominent headings, compelling copy, and emphasized action buttons with border-based design and comprehensive accessibility support.

## Features

- ✅ **Modern UI/UX**: Micro-interactions, better spacing, enhanced feedback
- ✅ **Border-Based Design**: Clean 2px borders with subtle elevation on hover
- ✅ **Typography-Driven Hierarchy**: Bold headlines for emphasis
- ✅ **Token-Based Styling**: 100% design token usage
- ✅ **Density Variants**: Compact, Normal, Spacious for different contexts
- ✅ **State Management**: Loading, error, success states with proper ARIA support
- ✅ **Enhanced Accessibility**: WCAG AA+ compliant with comprehensive ARIA attributes
- ✅ **Modern Interactions**: Ripple effects, smooth transitions, feedback levels
- ✅ **Theme-Aware**: Automatic light and dark mode support
- ✅ **TypeScript**: Full type safety with comprehensive prop types
- ✅ **Responsive**: Mobile-first design with optimized touch targets
- ✅ **Keyboard Navigation**: Full keyboard support with proper focus management

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { CTACard } from '@spexop/react';

function App() {
  return (
    <CTACard
      headline="Ready to get started?"
      description="Join thousands of users building amazing products"
      primaryAction={{
        label: "Start Free Trial",
        onClick: () => navigate('/signup')
      }}
    />
  );
}
```

## Basic Usage

### Simple CTA

```tsx
<CTACard
  headline="Join our community"
  description="Connect with developers worldwide"
  primaryAction={{
    label: "Sign Up",
    onClick: handleSignup
  }}
/>
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

### Centered (Default)

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

### Left-Aligned

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
  return (
    <CTACard
      headline="Stay in the loop"
      description="Get the latest updates, tips, and exclusive content"
      primaryAction={{
        label: "Subscribe",
        onClick: handleSubscribe
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

## Props

```typescript
interface CTACardProps {
  /** Main headline */
  headline: string;
  /** Supporting description */
  description: string;
  /** Primary action button */
  primaryAction: CTAAction;
  /** Optional secondary action button */
  secondaryAction?: CTAAction;
  /** Optional icon or illustration */
  icon?: React.ReactNode;
  /** Card visual variant */
  variant?: CardVariant;
  /** Card density */
  density?: CardDensity;
  /** Center align content */
  centered?: boolean;
  /** Card state */
  state?: CardState;
  /** Feedback level */
  feedback?: CardFeedback;
  /** Loading text */
  loadingText?: string;
  /** Error message */
  errorMessage?: string;
  /** Success message */
  successMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Accessibility label */
  "aria-label"?: string;
  /** Accessibility description */
  "aria-describedby"?: string;
}

interface CTAAction {
  /** Button label */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant override */
  variant?: "primary" | "secondary" | "ghost" | "outline";
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive with CardHeader, CardBody, CardFooter
2. **Borders before shadows** - Clean 2px borders instead of heavy shadows
3. **Typography before decoration** - Bold headlines for emphasis, not lighter colors
4. **Tokens before magic numbers** - Uses spacing and color tokens throughout
5. **Composition before complexity** - Simple, focused component built from primitives
6. **Standards before frameworks** - Web platform fundamentals
7. **Accessibility before aesthetics** - WCAG AA+ compliance by default

## Accessibility

- ✅ **Semantic HTML structure** with proper heading hierarchy
- ✅ **High contrast text** with WCAG AAA compliance
- ✅ **Keyboard accessible buttons** with proper focus management
- ✅ **Focus indicators** with visible outline styles
- ✅ **Screen reader friendly** with comprehensive ARIA attributes
- ✅ **Touch targets** minimum 44px for mobile accessibility
- ✅ **Reduced motion support** respects user preferences
- ✅ **High contrast mode** enhanced visibility

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

1. **Clear value proposition** - Make benefit obvious in headline
2. **Strong action verbs** - "Start", "Get", "Join", "Upgrade"
3. **Single focus** - One primary action per card
4. **Create urgency** - When appropriate, use time-sensitive language
5. **Keep it concise** - Brief, compelling copy
6. **Use appropriate density** - Spacious for important CTAs, compact for secondary
7. **Provide feedback** - Use loading states for async actions
8. **Test accessibility** - Ensure keyboard navigation and screen reader support

## Migration Guide

This component is deprecated and will be removed in v0.4.0. Use Card composition instead:

```tsx
// Before (CTACard)
<CTACard
  headline="Get Started"
  description="Join our platform"
  primaryAction={{ label: "Sign Up", onClick: handleSignup }}
/>

// After (Card composition)
<Card variant="highlighted" density="spacious">
  <CardHeader title="Get Started" />
  <CardBody>
    <p>Join our platform</p>
  </CardBody>
  <CardFooter align="center">
    <Button variant="primary" onClick={handleSignup}>
      Sign Up
    </Button>
  </CardFooter>
</Card>
```

## License

MIT
