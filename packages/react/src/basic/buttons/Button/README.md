# Button Component

**Version**: 0.4.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A primitives-first button component with comprehensive variants, complete theme integration, and accessibility-first design. Supports 12 variants, 3 sizes, compact modes, icon-only mode, and extensive ARIA properties.

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Button } from '@spexop/react';

function App() {
  return (
    <>
      <Button variant="primary">Primary Action</Button>
      <Button variant="danger">Delete Item</Button>
      <Button variant="outline" size="sm">Cancel</Button>
    </>
  );
}
```

## Variants

### Base Variants (7)

#### Primary

Filled button with primary brand color. Use for main CTAs.

```tsx
<Button variant="primary">Save Changes</Button>
```

**Theme Tokens**: `--theme-button-primary-*`

---

#### Secondary

Border-based button with secondary color. Use for alternative actions.

```tsx
<Button variant="secondary">View Details</Button>
```

**Theme Tokens**: `--theme-button-secondary-*`

---

#### Outline

Transparent with primary border. Use for secondary CTAs.

```tsx
<Button variant="outline">Learn More</Button>
```

**Theme Tokens**: `--theme-button-outline-*`

---

#### Ghost

Minimal transparent button with subtle hover. Use for tertiary actions.

```tsx
<Button variant="ghost">Skip</Button>
```

**Theme Tokens**: `--theme-button-ghost-*`

---

#### Text

Link-style button with underline. Use for inline text actions.

```tsx
<Button variant="text">Read more</Button>
```

**Theme Tokens**: `--theme-button-text-*`

---

#### Pill

Rounded pill shape with primary border. Use for tags or filters.

```tsx
<Button variant="pill">All Items</Button>
```

**Theme Tokens**: `--theme-button-pill-*`

---

#### Border Emphasis

Bold 4px border for strong visual separation. Use for card actions.

```tsx
<Button variant="border-emphasis">Featured Action</Button>
```

**Theme Tokens**: `--theme-button-border-emphasis-*`

---

### Semantic Variants (5)

#### Danger

Red destructive action button. Use for delete, remove, or irreversible actions.

```tsx
<Button variant="danger">Delete Account</Button>
```

**Theme Tokens**: `--theme-button-danger-*`  
**Default Color**: `colors.error` (#ef4444)

---

#### Success

Green positive action button. Use for save, confirm, or success states.

```tsx
<Button variant="success">Save & Publish</Button>
```

**Theme Tokens**: `--theme-button-success-*`  
**Default Color**: `colors.success` (#22c55e)

---

#### Warning

Orange/yellow caution button. Use for warnings or careful actions.

```tsx
<Button variant="warning">Proceed with Caution</Button>
```

**Theme Tokens**: `--theme-button-warning-*`  
**Default Color**: `colors.warning` (#f59e0b)

---

#### Info

Blue informational button. Use for info dialogs or help actions.

```tsx
<Button variant="info">View Information</Button>
```

**Theme Tokens**: `--theme-button-info-*`  
**Default Color**: `colors.info` (#3b82f6)

---

#### Neutral

Gray cancel/secondary button. Use for cancel or neutral actions.

```tsx
<Button variant="neutral">Cancel</Button>
```

**Theme Tokens**: `--theme-button-neutral-*`  
**Default Color**: `colors.neutral` (#737373)

---

## Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
```

- **sm**: 14px font, 8px 12px padding
- **md**: 16px font, 12px 20px padding (default)
- **lg**: 18px font, 16px 24px padding

## Compact Mode

For toolbars and dense UIs:

```tsx
<Button compact="sm" iconOnly aria-label="Settings">
  <Settings size={16} />
</Button>

<Button compact="md" iconOnly aria-label="Menu">
  <Menu size={16} />
</Button>
```

- **compact="sm"**: 32×32px square
- **compact="md"**: 36×36px square

## Icon-Only Mode

```tsx
import { Trash } from '@spexop/icons';

<Button 
  variant="danger" 
  iconOnly 
  aria-label="Delete item"
>
  <Trash size={20} />
</Button>
```

**Important**: `iconOnly` requires `aria-label` for accessibility.

## Full-Width

```tsx
<Button fullWidth variant="primary">
  Continue to Payment
</Button>
```

## Loading State

```tsx
<Button loading variant="primary">
  Processing...
</Button>
```

Shows a loading indicator and disables interaction.

## Border Customization

### Border Weight

```tsx
<Button borderWeight="thin">Thin Border (1px)</Button>
<Button borderWeight="normal">Normal (2px, default)</Button>
<Button borderWeight="thick">Thick Border (4px)</Button>
```

### Border Style

```tsx
<Button borderStyle="solid">Solid (default)</Button>
<Button borderStyle="dashed">Dashed Border</Button>
<Button borderStyle="dotted">Dotted Border</Button>
```

## Text Color Override

```tsx
<Button variant="primary" textColor="light">
  Always Light Text
</Button>

<Button variant="outline" textColor="dark">
  Always Dark Text
</Button>

<Button variant="primary" textColor="auto">
  Adaptive (default)
</Button>
```

## Accessibility

### WCAG AAA Compliance

The Button component meets WCAG AAA standards with:

- **Color Contrast**: Minimum 7:1 ratio for all text
- **Touch Targets**: Minimum 44×44px on mobile devices
- **Focus Indicators**: 2px solid outline with 2px offset
- **Screen Reader Support**: Complete ARIA implementation
- **Keyboard Navigation**: Full keyboard accessibility

### ARIA Support

```tsx
<Button
  aria-label="Delete item"
  aria-pressed={isActive}
  aria-expanded={isOpen}
  aria-controls="menu-1"
  aria-describedby="help-text"
  aria-haspopup="menu"
  aria-disabled={disabled}
>
  Actions
</Button>
```

### Keyboard Navigation

- **Enter/Space**: Activate button
- **Tab**: Focus next element
- **Shift+Tab**: Focus previous element
- **Escape**: Close dropdowns/menus (when applicable)

### Focus Indicators

Enhanced focus-visible styles for keyboard navigation:

```css
/* Automatic 2px outline with primary color */
outline: 2px solid var(--theme-primary);
outline-offset: 2px;
border-radius: var(--theme-radius-md);
```

### Touch Targets

Mobile-optimized touch targets:

- **Desktop**: Minimum 36×36px
- **Mobile**: Minimum 44×44px (automatically applied)
- **Icon-only**: 32×32px desktop, 40×40px mobile

### High Contrast Mode

Automatic enhancements in high contrast mode:

```css
@media (prefers-contrast: high) {
  .button {
    border-width: 3px;
    font-weight: var(--theme-font-weight-bold);
  }
}
```

### Reduced Motion

Respects `prefers-reduced-motion` for smooth or instant transitions:

```css
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
    transform: none;
  }
}
```

### Loading States

Accessible loading indicators with proper ARIA attributes:

```tsx
<Button 
  loading 
  aria-label="Processing your request"
  aria-live="polite"
>
  Save Changes
</Button>
```

### Screen Reader Announcements

- Loading states are announced to screen readers
- Disabled states are properly communicated
- Error states include descriptive text

## Theme Customization

All button variants can be customized through your theme configuration:

```typescript
import { createTheme } from '@spexop/theme';

const myTheme = createTheme({
  // ... other config
  buttons: {
    danger: {
      background: "#dc2626",
      text: "#ffffff",
      border: "#dc2626",
      backgroundHover: "#b91c1c",
      textHover: "#ffffff",
      borderHover: "#b91c1c",
      backgroundActive: "#991b1b",
      textActive: "#ffffff",
      borderActive: "#991b1b",
    },
    // ... other variants
  },
});
```

## Common Patterns

### Action Buttons

```tsx
<div style={{ display: 'flex', gap: '12px' }}>
  <Button variant="primary">Save</Button>
  <Button variant="neutral">Cancel</Button>
</div>
```

### Destructive Confirmation

```tsx
<div style={{ display: 'flex', gap: '12px' }}>
  <Button variant="danger">Yes, Delete</Button>
  <Button variant="ghost">Cancel</Button>
</div>
```

### Card Actions

```tsx
<div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
  <Button variant="outline" fullWidth>Learn More</Button>
  <Button variant="primary" fullWidth>Get Started</Button>
</div>
```

### Icon + Text

```tsx
import { Download } from '@spexop/icons';

<Button variant="primary">
  <Download size={20} />
  Download Report
</Button>
```

### Loading with Feedback

```tsx
function SubmitButton() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };
  
  return (
    <Button 
      variant="primary" 
      loading={loading}
      onClick={handleSubmit}
    >
      {loading ? 'Submitting...' : 'Submit'}
    </Button>
  );
}
```

## TypeScript

```typescript
import type { ButtonProps, ButtonVariant } from '@spexop/react';

// Type-safe variant
const variant: ButtonVariant = "danger";

// Custom button component
interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

function CustomButton({ customProp, ...props }: CustomButtonProps) {
  return <Button {...props} />;
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Bundle Size**: ~2KB gzipped (component + styles)
- **CSS Modules**: Scoped styles, zero runtime
- **Tree-shakeable**: Import only what you use
- **Hardware-accelerated**: Uses `transform` for hover effects

## Migration from v0.3.0

### New Variants

Five new semantic variants are now available:

- `danger` (replaces custom destructive buttons)
- `success` (replaces custom success buttons)
- `warning` (replaces custom warning buttons)
- `info` (replaces custom info buttons)
- `neutral` (replaces custom neutral buttons)

### Breaking Changes

**None**. All existing variants remain unchanged.

### New Features

- Complete theme token coverage for all variants
- Pill and border-emphasis now use theme tokens
- Fixed CSS transition bug
- Improved accessibility

### Accessibility Improvements (v0.4.0)

#### Enhanced Touch Targets

```tsx
// Before: Fixed 36px touch target
<Button iconOnly aria-label="Settings">
  <Settings size={16} />
</Button>

// After: Responsive touch targets (32px desktop, 40px mobile)
<Button iconOnly aria-label="Settings">
  <Settings size={16} />
</Button>
```

#### Improved Focus Indicators

```tsx
// Before: Basic focus outline
// After: Enhanced focus with proper contrast and offset
// Automatically applied - no code changes needed
```

#### Better Loading States

```tsx
// Before: Basic loading spinner
<Button loading>Save</Button>

// After: Accessible loading with ARIA
<Button 
  loading 
  aria-label="Saving your changes"
  aria-live="polite"
>
  Save
</Button>
```

#### Mobile Optimizations

```tsx
// Before: Same padding on all devices
<Button size="sm">Small</Button>

// After: Responsive padding (mobile gets larger touch targets)
<Button size="sm">Small</Button>
```

### Migration Checklist

- [ ] Update icon-only buttons to include `aria-label`
- [ ] Add `aria-live="polite"` to loading buttons
- [ ] Test touch targets on mobile devices
- [ ] Verify focus indicators in high contrast mode
- [ ] Test with screen readers

## Related Components

- **ButtonGroup**: Group multiple buttons with consistent spacing
- **SplitButton**: Button with dropdown menu
- **SegmentedButton**: Toggle-style button group
- **IconButton**: Specialized icon-only button

## Examples

See `apps/website/src/pages/ButtonShowcasePage.tsx` for a complete showcase of all variants and features.

## License

MIT

---

**Questions or Issues?**

- [GitHub Issues](https://github.com/spexop-ui/spexop-design-system/issues)
- [Documentation](https://spexop.com/components/button)
