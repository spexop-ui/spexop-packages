# Button Component - Complete Usage Guide

**Component Version**: v0.4.0
**Last Updated**: October 23, 2025
**Package**: @spexop/react
**Status**: Production Ready

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [Variant Reference](#variant-reference)
5. [Size and Layout](#size-and-layout)
6. [Icon Integration](#icon-integration)
7. [States and Interactions](#states-and-interactions)
8. [Form Integration](#form-integration)
9. [Advanced Patterns](#advanced-patterns)
10. [Accessibility](#accessibility)
11. [Styling and Theming](#styling-and-theming)
12. [Best Practices](#best-practices)
13. [Common Patterns](#common-patterns)
14. [TypeScript](#typescript)
15. [API Reference](#api-reference)

## Overview

The Button component is the foundational interactive element in the Spexop design system. It provides 12 variants, comprehensive accessibility support, and flexible customization options while maintaining the "borders before shadows" philosophy.

### When to Use

Use Button when you need:

- Primary actions (Save, Submit, Confirm)
- Secondary actions (Cancel, Back, Skip)
- Destructive actions (Delete, Remove)
- Form submissions
- Navigation triggers
- Modal/dialog actions
- Inline text actions

### When Not to Use

Consider alternatives when you need:

- **Navigation links**: Use NavLink for in-app navigation
- **Icon-only actions**: Use IconButton for better semantics
- **Toggle controls**: Use Toggle or Switch components
- **Multiple exclusive options**: Use SegmentedButton or RadioGroup
- **Action with dropdown**: Use SplitButton

### Key Features

- **12 comprehensive variants** (7 base + 5 semantic)
- **3 size options + 2 compact modes**
- **Icon-only mode** with accessibility validation
- **Modern interactions** with ripple effects and press states
- **Loading and disabled states** with visual feedback
- **Full-width layout option**
- **Border customization** (weight and style)
- **Text color override** for theme flexibility
- **Polymorphic component** (renders as button or custom element)
- **Enhanced accessibility** with comprehensive ARIA support
- **Advanced keyboard navigation** (Enter, Space, Escape)
- **WCAG AA+ compliant** with focus management
- **Theme-aware** with design tokens
- **Performance optimized** with GPU acceleration
- **Reduced motion support** for accessibility

## Quick Start

### Basic Example

```tsx
import { Button } from '@spexop/react';

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
  );
}
```

### With Icon

```tsx
import { Button } from '@spexop/react';
import { Download } from '@spexop/icons';

function DownloadButton() {
  return (
    <Button variant="primary">
      <Download size={20} />
      Download Report
    </Button>
  );
}
```

### Form Submit

```tsx
import { Button } from '@spexop/react';

function LoginForm() {
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <Button variant="primary" type="submit">
        Sign In
      </Button>
    </form>
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

## Variant Reference

### Base Variants

#### 1. Primary

**Use for**: Main call-to-action, most important action on a page.

```tsx
<Button variant="primary">Save Changes</Button>
```

**Styling**: Filled background with primary brand color, high contrast text.

**Theme Tokens**: `--theme-button-primary-background`, `--theme-button-primary-text`, `--theme-button-primary-border`

---

#### 2. Secondary

**Use for**: Alternative actions, less prominent than primary.

```tsx
<Button variant="secondary">View Details</Button>
```

**Styling**: Border-based with secondary color, transparent background.

**Theme Tokens**: `--theme-button-secondary-*`

---

#### 3. Outline

**Use for**: Secondary CTAs, tertiary actions with clear boundaries.

```tsx
<Button variant="outline">Learn More</Button>
```

**Styling**: Transparent with primary border, minimal background on hover.

**Theme Tokens**: `--theme-button-outline-*`

---

#### 4. Ghost

**Use for**: Minimal actions, toolbar buttons, subtle interactions.

```tsx
<Button variant="ghost">Skip</Button>
```

**Styling**: Fully transparent, minimal hover effect.

**Theme Tokens**: `--theme-button-ghost-*`

---

#### 5. Text

**Use for**: Inline text actions, link-style buttons.

```tsx
<Button variant="text">Read more</Button>
```

**Styling**: Text-only with underline, no borders or background.

**Theme Tokens**: `--theme-button-text-*`

---

#### 6. Pill

**Use for**: Tags, filters, category selection.

```tsx
<Button variant="pill">All Items</Button>
```

**Styling**: Fully rounded (pill shape), primary border.

**Theme Tokens**: `--theme-button-pill-*`

---

#### 7. Border Emphasis

**Use for**: Strong visual separation, card actions, featured buttons.

```tsx
<Button variant="border-emphasis">Featured Action</Button>
```

**Styling**: Bold 4px border for strong visual impact.

**Theme Tokens**: `--theme-button-border-emphasis-*`

---

### Semantic Variants

#### 8. Danger

**Use for**: Destructive actions (delete, remove, permanently discard).

```tsx
<Button variant="danger">Delete Account</Button>
```

**Default Color**: Red (#ef4444)

**Theme Tokens**: `--theme-button-danger-*`

---

#### 9. Success

**Use for**: Positive actions (save, confirm, approve, publish).

```tsx
<Button variant="success">Save & Publish</Button>
```

**Default Color**: Green (#22c55e)

**Theme Tokens**: `--theme-button-success-*`

---

#### 10. Warning

**Use for**: Caution actions, warnings, proceed with care.

```tsx
<Button variant="warning">Proceed with Caution</Button>
```

**Default Color**: Orange (#f59e0b)

**Theme Tokens**: `--theme-button-warning-*`

---

#### 11. Info

**Use for**: Informational actions, help dialogs, info modals.

```tsx
<Button variant="info">View Information</Button>
```

**Default Color**: Blue (#3b82f6)

**Theme Tokens**: `--theme-button-info-*`

---

#### 12. Neutral

**Use for**: Cancel actions, neutral secondary actions.

```tsx
<Button variant="neutral">Cancel</Button>
```

**Default Color**: Gray (#737373)

**Theme Tokens**: `--theme-button-neutral-*`

---

## Size and Layout

### Size Variants

```tsx
// Small - 14px font, compact spacing
<Button size="sm">Small Button</Button>

// Medium (default) - 16px font, standard spacing
<Button size="md">Medium Button</Button>

// Large - 18px font, generous spacing
<Button size="lg">Large Button</Button>
```

**Specifications**:

- **sm**: `font-size: 14px`, `padding: 8px 12px`
- **md**: `font-size: 16px`, `padding: 12px 20px` (default)
- **lg**: `font-size: 18px`, `padding: 16px 24px`

### Compact Mode

For toolbars, dense UIs, and icon-heavy interfaces:

```tsx
// 32x32px square
<Button compact="sm" iconOnly aria-label="Settings">
  <Settings size={16} />
</Button>

// 36x36px square
<Button compact="md" iconOnly aria-label="Menu">
  <Menu size={16} />
</Button>
```

### Full-Width

```tsx
<Button fullWidth variant="primary">
  Continue to Payment
</Button>
```

Perfect for:

- Mobile layouts
- Form submissions
- Modal actions
- Card CTAs

## Icon Integration

### Icon + Text (Leading)

```tsx
import { Download, Save, Trash } from '@spexop/icons';

<Button variant="primary">
  <Download size={20} />
  Download
</Button>

<Button variant="success">
  <Save size={20} />
  Save Changes
</Button>

<Button variant="danger">
  <Trash size={20} />
  Delete
</Button>
```

### Icon-Only Mode

**Critical**: Icon-only buttons require `aria-label` for accessibility.

```tsx
import { Edit, Trash, Settings } from '@spexop/icons';

<Button variant="ghost" iconOnly aria-label="Edit item">
  <Edit size={20} />
</Button>

<Button variant="danger" iconOnly aria-label="Delete item">
  <Trash size={20} />
</Button>

<Button variant="primary" iconOnly aria-label="Open settings">
  <Settings size={20} />
</Button>
```

### Icon Sizing Guidelines

- **sm buttons**: 16px icons
- **md buttons**: 20px icons
- **lg buttons**: 24px icons
- **compact="sm"**: 16px icons
- **compact="md"**: 16px icons

## States and Interactions

### Loading State

```tsx
import { Button } from '@spexop/react';
import { useState } from 'react';

function SubmitButton() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
    } finally {
      setLoading(false);
    }
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

**Behavior**:

- Disables interaction
- Shows loading indicator
- Maintains button dimensions

### Disabled State

```tsx
<Button variant="primary" disabled>
  Unavailable
</Button>
```

**Behavior**:

- Prevents clicks
- Reduced opacity (0.5)
- Not keyboard focusable
- Cursor: not-allowed

## Modern Interactions

### Ripple Effects

The Button component includes modern ripple effects that provide visual feedback on click:

```tsx
<Button variant="primary" onClick={handleClick}>
  Click for Ripple Effect
</Button>
```

**Features**:

- **Material Design inspired** ripple animation
- **Position-aware** - ripple originates from click point
- **Accessible** - hidden from screen readers
- **Performance optimized** - GPU accelerated

### Press States

Visual feedback for mouse interactions:

```tsx
<Button variant="secondary">
  Press Me
</Button>
```

**Behavior**:

- **Mouse down**: Visual press state
- **Mouse up**: Returns to normal
- **Mouse leave**: Cancels press state
- **Disabled/Loading**: No press feedback

### Focus Management

Enhanced focus handling for better accessibility:

```tsx
<Button 
  variant="outline"
  onFocus={() => console.log('Focused')}
  onBlur={() => console.log('Blurred')}
>
  Focus Management
</Button>
```

**Features**:

- **Focus-visible**: Only shows focus ring on keyboard navigation
- **Focus tracking**: Internal state management
- **Escape handling**: Blurs focus for dismissible actions
- **Tab order**: Proper tabIndex management

### Advanced Keyboard Navigation

```tsx
<Button 
  variant="ghost"
  onKeyDown={(e) => {
    if (e.key === 'Escape') {
      // Handle escape
    }
  }}
>
  Advanced Keyboard
</Button>
```

**Supported Keys**:

- **Enter/Space**: Activates button
- **Escape**: Blurs focus (for dismissible actions)
- **Tab**: Standard tab navigation
- **Arrow keys**: Context-dependent behavior

## Form Integration

### Submit Button

```tsx
<form onSubmit={handleSubmit}>
  <input type="text" name="username" />
  <Button variant="primary" type="submit">
    Submit Form
  </Button>
</form>
```

### Reset Button

```tsx
<form>
  <input type="text" name="search" />
  <Button variant="neutral" type="reset">
    Clear
  </Button>
</form>
```

### Form Actions

```tsx
<form onSubmit={handleSubmit}>
  <fieldset>
    {/* Form fields */}
  </fieldset>
  
  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
    <Button variant="primary" type="submit">
      Save
    </Button>
    <Button variant="neutral" type="button" onClick={handleCancel}>
      Cancel
    </Button>
  </div>
</form>
```

## Advanced Patterns

### Polymorphic Button (Custom Element)

```tsx
import { Link } from 'react-router-dom';

// Render as Link component
<Button as={Link} to="/dashboard" variant="primary">
  Go to Dashboard
</Button>

// Render as anchor tag
<Button as="a" href="/download" variant="primary">
  Download
</Button>
```

### Border Customization

```tsx
// Border weight
<Button borderWeight="thin">Thin Border (1px)</Button>
<Button borderWeight="normal">Normal (2px, default)</Button>
<Button borderWeight="thick">Thick Border (4px)</Button>

// Border style
<Button borderStyle="solid">Solid (default)</Button>
<Button borderStyle="dashed">Dashed Border</Button>
<Button borderStyle="dotted">Dotted Border</Button>
```

### Text Color Override

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

### Async Actions with Feedback

```tsx
import { Button } from '@spexop/react';
import { useState } from 'react';

function DeleteButton({ itemId, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    
    try {
      await deleteItem(itemId);
      onDeleted();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <Button 
        variant="danger" 
        loading={deleting}
        onClick={handleDelete}
      >
        {deleting ? 'Deleting...' : 'Delete'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

### Confirmation Pattern

```tsx
import { Button } from '@spexop/react';
import { useState } from 'react';

function DeleteWithConfirmation() {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          Yes, Delete
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button variant="danger" onClick={() => setConfirming(true)}>
      Delete
    </Button>
  );
}
```

## Accessibility

### ARIA Support

```tsx
<Button
  aria-label="Delete item"
  aria-pressed={isActive}
  aria-expanded={isOpen}
  aria-controls="menu-1"
  aria-describedby="help-text"
  aria-haspopup="menu"
>
  Actions
</Button>
```

### Keyboard Navigation

Built-in keyboard support:

- **Tab**: Focus button
- **Shift + Tab**: Focus previous element
- **Enter**: Activate button
- **Space**: Activate button

```tsx
// Keyboard accessible by default
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

### Focus Indicators

Automatic focus-visible styles:

```css
/* Applied automatically */
button:focus-visible {
  outline: 2px solid var(--theme-primary);
  outline-offset: 2px;
}
```

### Screen Reader Announcements

```tsx
import { Button } from '@spexop/react';

function AccessibleButton() {
  const handleClick = () => {
    // Perform action
    announceToScreenReader('Item deleted successfully');
  };

  return (
    <Button 
      variant="danger"
      aria-label="Delete item"
      onClick={handleClick}
    >
      Delete
    </Button>
  );
}

// Helper function
function announceToScreenReader(message) {
  const div = document.createElement('div');
  div.setAttribute('role', 'status');
  div.setAttribute('aria-live', 'polite');
  div.textContent = message;
  div.style.position = 'absolute';
  div.style.left = '-10000px';
  document.body.appendChild(div);
  setTimeout(() => document.body.removeChild(div), 1000);
}
```

### Icon-Only Accessibility

```tsx
// ✅ CORRECT - Has aria-label
<Button iconOnly aria-label="Edit item">
  <Edit size={20} />
</Button>

// ❌ WRONG - Missing aria-label (warning in console)
<Button iconOnly>
  <Edit size={20} />
</Button>
```

## Styling and Theming

### CSS Custom Properties

All button variants use theme tokens:

```css
/* Override button colors */
.custom-button {
  --theme-button-primary-background: #0066cc;
  --theme-button-primary-text: #ffffff;
  --theme-button-primary-border: #0066cc;
  --theme-button-primary-background-hover: #0052a3;
}
```

### Dark Mode Support

```css
/* Automatic with theme provider */
[data-theme="dark"] {
  --theme-button-primary-background: #3b82f6;
  --theme-button-primary-text: #ffffff;
}
```

### Custom Styling

```tsx
<Button 
  variant="primary" 
  className="custom-class"
  style={{ borderRadius: '20px' }}
>
  Custom Button
</Button>
```

```css
.custom-class {
  min-width: 200px;
  font-weight: 700;
  text-transform: uppercase;
}
```

## Best Practices

### 1. Use Semantic Variants

```tsx
// ✅ GOOD - Clear intent
<Button variant="danger">Delete Account</Button>
<Button variant="success">Save Changes</Button>

// ❌ BAD - Unclear intent
<Button variant="primary">Delete Account</Button>
```

### 2. Provide Clear Labels

```tsx
// ✅ GOOD - Clear action
<Button variant="primary">Save Changes</Button>
<Button variant="neutral">Cancel</Button>

// ❌ BAD - Vague labels
<Button variant="primary">OK</Button>
<Button variant="neutral">Close</Button>
```

### 3. Icon-Only Needs aria-label

```tsx
// ✅ GOOD
<Button iconOnly aria-label="Delete item">
  <Trash size={20} />
</Button>

// ❌ BAD
<Button iconOnly>
  <Trash size={20} />
</Button>
```

### 4. Loading State with Feedback

```tsx
// ✅ GOOD
<Button loading={isLoading} variant="primary">
  {isLoading ? 'Saving...' : 'Save'}
</Button>

// ❌ BAD
<Button loading={isLoading} variant="primary">
  Save
</Button>
```

### 5. Appropriate Size for Context

```tsx
// ✅ GOOD - Size matches context
<Button size="sm">Quick Action</Button>  // Toolbar
<Button size="md">Save</Button>          // Form
<Button size="lg">Get Started</Button>   // Hero section

// ❌ BAD - Size mismatch
<Button size="lg">Cancel</Button>  // Too large for cancel
```

### 6. Use Full-Width for Mobile Forms

```tsx
// ✅ GOOD - Responsive
<Button 
  fullWidth 
  variant="primary"
  style={{ width: isMobile ? '100%' : 'auto' }}
>
  Submit
</Button>
```

### 7. Consistent Button Order

```tsx
// ✅ GOOD - Primary action on right
<div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
  <Button variant="neutral">Cancel</Button>
  <Button variant="primary">Save</Button>
</div>

// ❌ BAD - Inconsistent placement
<div style={{ display: 'flex', gap: '12px' }}>
  <Button variant="primary">Save</Button>
  <Button variant="neutral">Cancel</Button>
</div>
```

### 8. Modern Interaction Patterns

```tsx
// ✅ GOOD - Enhanced accessibility
<Button 
  variant="primary"
  aria-describedby="submit-help"
  aria-live="polite"
  data-testid="submit-button"
>
  Submit
</Button>

// ✅ GOOD - Loading state with proper feedback
<Button 
  variant="primary" 
  loading={isSubmitting}
  aria-live={isSubmitting ? "polite" : undefined}
>
  {isSubmitting ? "Submitting..." : "Submit"}
</Button>

// ✅ GOOD - Dismissible action with escape handling
<Button 
  variant="ghost"
  aria-haspopup="dialog"
  onKeyDown={(e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }}
>
  Close Dialog
</Button>
```

### 9. Performance Considerations

```tsx
// ✅ GOOD - Efficient event handling
const handleClick = useCallback((event) => {
  // Handle click
}, [dependency]);

<Button onClick={handleClick}>
  Click Me
</Button>

// ✅ GOOD - Proper loading state management
<Button 
  loading={isLoading}
  disabled={isLoading}
  onClick={handleClick}
>
  {isLoading ? "Processing..." : "Submit"}
</Button>
```

## Common Patterns

### Action Button Group

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
<div style={{ 
  display: 'flex', 
  gap: '12px', 
  marginTop: '16px',
  width: '100%'
}}>
  <Button variant="outline" fullWidth>Learn More</Button>
  <Button variant="primary" fullWidth>Get Started</Button>
</div>
```

### Toolbar Buttons

```tsx
import { Bold, Italic, Underline } from '@spexop/icons';

<div style={{ display: 'flex', gap: '4px' }}>
  <Button compact="sm" iconOnly aria-label="Bold">
    <Bold size={16} />
  </Button>
  <Button compact="sm" iconOnly aria-label="Italic">
    <Italic size={16} />
  </Button>
  <Button compact="sm" iconOnly aria-label="Underline">
    <Underline size={16} />
  </Button>
</div>
```

### Loading with Transition

```tsx
import { Button } from '@spexop/react';
import { useState, useEffect } from 'react';

function SaveButton({ onSave }) {
  const [status, setStatus] = useState('idle'); // idle, saving, success

  const handleSave = async () => {
    setStatus('saving');
    try {
      await onSave();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('idle');
    }
  };

  return (
    <Button 
      variant={status === 'success' ? 'success' : 'primary'}
      loading={status === 'saving'}
      onClick={handleSave}
      disabled={status === 'success'}
    >
      {status === 'saving' && 'Saving...'}
      {status === 'success' && 'Saved!'}
      {status === 'idle' && 'Save'}
    </Button>
  );
}
```

## TypeScript

### Basic Usage

```typescript
import { Button } from '@spexop/react';
import type { ButtonProps } from '@spexop/react';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

### Variant Type

```typescript
import type { ButtonVariant } from '@spexop/react';

const variant: ButtonVariant = "danger";

function getButtonVariant(action: string): ButtonVariant {
  switch (action) {
    case 'delete':
      return 'danger';
    case 'save':
      return 'success';
    default:
      return 'primary';
  }
}
```

### Custom Button Component

```typescript
import { Button } from '@spexop/react';
import type { ButtonProps } from '@spexop/react';

interface CustomButtonProps extends ButtonProps {
  confirm?: boolean;
  onConfirm?: () => void;
}

function CustomButton({ 
  confirm, 
  onConfirm, 
  onClick,
  ...props 
}: CustomButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confirm && onConfirm) {
      if (window.confirm('Are you sure?')) {
        onConfirm();
      }
    } else if (onClick) {
      onClick(e);
    }
  };

  return <Button {...props} onClick={handleClick} />;
}
```

## API Reference

### ButtonProps

```typescript
interface ButtonProps {
  /** Visual variant */
  variant?: ButtonVariant;
  
  /** Text color override */
  textColor?: "auto" | "light" | "dark";
  
  /** Border weight */
  borderWeight?: "thin" | "normal" | "thick";
  
  /** Border style */
  borderStyle?: "solid" | "dashed" | "dotted";
  
  /** Size variant */
  size?: "sm" | "md" | "lg";
  
  /** Compact mode */
  compact?: false | "sm" | "md";
  
  /** Icon-only mode (requires aria-label) */
  iconOnly?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Full-width layout */
  fullWidth?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Button type */
  type?: "button" | "submit" | "reset";
  
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Button content */
  children: React.ReactNode;
  
  /** Additional CSS class */
  className?: string;
  
  /** Custom element to render */
  as?: React.ElementType;
  
  /** ARIA label */
  "aria-label"?: string;
  
  /** ARIA pressed state */
  "aria-pressed"?: boolean;
  
  /** ARIA expanded state */
  "aria-expanded"?: boolean;
  
  /** ARIA controls */
  "aria-controls"?: string;
  
  /** ARIA described by */
  "aria-describedby"?: string;
  
  /** ARIA has popup */
  "aria-haspopup"?: boolean | "menu" | "dialog" | "listbox" | "tree" | "grid";
  
  /** ARIA live region */
  "aria-live"?: "off" | "polite" | "assertive";
  
  /** Test ID for testing */
  "data-testid"?: string;
}
```

### ButtonVariant Type

```typescript
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "text"
  | "pill"
  | "border-emphasis"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "neutral";
```

## Related Components

- **ButtonGroup**: Group multiple buttons with consistent spacing
- **SplitButton**: Button with dropdown menu
- **SegmentedButton**: Toggle-style button group
- **IconButton**: Specialized icon-only button component

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Bundle Size**: ~2.5KB gzipped
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
