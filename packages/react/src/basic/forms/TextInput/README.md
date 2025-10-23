# TextInput Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A versatile text input component with label, helper text, error states, and various input types. Features clean border-based design with full accessibility support.

## Features

- ✅ Multiple input types (text, email, password, number, tel, url)
- ✅ 3 sizes (sm, md, lg)
- ✅ Label and helper text
- ✅ Error state with validation
- ✅ Disabled and read-only states
- ✅ Prefix and suffix support
- ✅ Character count
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { TextInput } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  
  return (
    <TextInput
      label="Full Name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter your name"
    />
  );
}
```

## Sizes

### Small (sm)

Compact input for dense layouts.

```tsx
<TextInput
  size="sm"
  label="Username"
  value={username}
  onChange={handleChange}
/>
```

### Medium (md) - Default

Standard input size.

```tsx
<TextInput
  size="md"
  label="Email"
  type="email"
  value={email}
  onChange={handleChange}
/>
```

### Large (lg)

Larger input for emphasis.

```tsx
<TextInput
  size="lg"
  label="Search"
  value={query}
  onChange={handleChange}
/>
```

## Input Types

### Text (Default)

```tsx
<TextInput
  type="text"
  label="Name"
  value={name}
  onChange={handleChange}
/>
```

### Email

```tsx
<TextInput
  type="email"
  label="Email Address"
  value={email}
  onChange={handleChange}
  placeholder="you@example.com"
/>
```

### Password

```tsx
<TextInput
  type="password"
  label="Password"
  value={password}
  onChange={handleChange}
/>
```

### Number

```tsx
<TextInput
  type="number"
  label="Age"
  value={age}
  onChange={handleChange}
  min={18}
  max={120}
/>
```

### Telephone

```tsx
<TextInput
  type="tel"
  label="Phone Number"
  value={phone}
  onChange={handleChange}
  placeholder="+1 (555) 123-4567"
/>
```

### URL

```tsx
<TextInput
  type="url"
  label="Website"
  value={website}
  onChange={handleChange}
  placeholder="https://example.com"
/>
```

## States

### With Label and Helper Text

```tsx
<TextInput
  label="Username"
  helperText="Choose a unique username (3-20 characters)"
  value={username}
  onChange={setUsername}
/>
```

### Error State

```tsx
<TextInput
  label="Email"
  value={email}
  onChange={setEmail}
  error="Please enter a valid email address"
/>
```

### Disabled

```tsx
<TextInput
  label="Account ID"
  value={accountId}
  onChange={handleChange}
  disabled={true}
/>
```

### Read-Only

```tsx
<TextInput
  label="Generated Code"
  value={code}
  readOnly={true}
/>
```

### Required

```tsx
<TextInput
  label="Company Name"
  value={company}
  onChange={setCompany}
  required={true}
/>
```

## Prefix and Suffix

### With Prefix

```tsx
<TextInput
  label="Website"
  value={domain}
  onChange={setDomain}
  prefix="https://"
  placeholder="example.com"
/>
```

### With Suffix

```tsx
<TextInput
  label="Price"
  value={price}
  onChange={setPrice}
  type="number"
  suffix="USD"
/>
```

### Both Prefix and Suffix

```tsx
<TextInput
  label="Discount"
  value={discount}
  onChange={setDiscount}
  type="number"
  prefix="Save"
  suffix="%"
/>
```

## Character Count

```tsx
<TextInput
  label="Bio"
  value={bio}
  onChange={setBio}
  maxLength={160}
  showCount={true}
  helperText="Brief description about yourself"
/>
```

## Common Patterns

### Login Form

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
      />
      
      <TextInput
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
      />
      
      <button type="submit">Sign In</button>
    </form>
  );
}
```

### Profile Form

```tsx
function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <Stack direction="vertical" gap={4}>
      <TextInput
        label="First Name"
        value={formData.firstName}
        onChange={handleChange('firstName')}
        required
      />
      
      <TextInput
        label="Last Name"
        value={formData.lastName}
        onChange={handleChange('lastName')}
        required
      />
      
      <TextInput
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange('email')}
        required
      />
      
      <TextInput
        type="tel"
        label="Phone"
        value={formData.phone}
        onChange={handleChange('phone')}
        helperText="Optional"
      />
      
      <TextInput
        type="url"
        label="Website"
        value={formData.website}
        onChange={handleChange('website')}
        prefix="https://"
        helperText="Optional"
      />
    </Stack>
  );
}
```

### Search with Debounce

```tsx
function SearchInput() {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (debouncedValue) {
      // Perform search
      console.log('Searching for:', debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <TextInput
      label="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type to search..."
      prefix="🔍"
    />
  );
}
```

## Props

```typescript
interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  helperText?: string;
  error?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  maxLength?: number;
  showCount?: boolean;
  className?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  min?: number;
  max?: number;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean 2px border design
2. **Typography before decoration** - Clear, readable text
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full keyboard and screen reader support

## Accessibility

### WCAG AAA Compliance

The TextInput component meets WCAG AAA standards with:

- **Color Contrast**: Minimum 7:1 ratio for all text
- **Touch Targets**: Minimum 44×44px on mobile devices
- **Focus Indicators**: 2px solid outline with 2px offset
- **Screen Reader Support**: Complete ARIA implementation
- **Keyboard Navigation**: Full keyboard accessibility
- **Error Announcements**: Live regions for validation messages

### ARIA Support

```tsx
<TextInput
  label="Email Address"
  value={email}
  onChange={setEmail}
  error="Please enter a valid email address"
  aria-describedby="email-help"
  aria-invalid={!!error}
  aria-required={required}
/>
<div id="email-help">Enter your email address</div>
```

### Keyboard Navigation

- **Tab**: Focus next element
- **Shift+Tab**: Focus previous element
- **Enter**: Submit form (when in form context)
- **Escape**: Clear field (when supported)

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
- **Font Size**: 16px on mobile to prevent zoom

### Error Handling

Accessible error states with proper ARIA attributes:

```tsx
<TextInput
  label="Password"
  value={password}
  onChange={setPassword}
  error={passwordError}
  aria-invalid={!!passwordError}
  aria-describedby={passwordError ? "password-error" : "password-help"}
/>
{passwordError && (
  <div id="password-error" role="alert" aria-live="polite">
    {passwordError}
  </div>
)}
```

### Required Field Indicators

Visual and programmatic indication of required fields:

```tsx
<TextInput
  label="Full Name"
  value={name}
  onChange={setName}
  required
  aria-required="true"
/>
```

### High Contrast Mode

Automatic enhancements in high contrast mode:

```css
@media (prefers-contrast: high) {
  .textInput {
    border-width: 3px;
    font-weight: var(--theme-font-weight-bold);
  }
}
```

### Reduced Motion

Respects `prefers-reduced-motion` for smooth or instant transitions:

```css
@media (prefers-reduced-motion: reduce) {
  .textInput {
    transition: none;
    transform: none;
  }
}
```

### Screen Reader Announcements

- Error messages are announced immediately
- Required field status is communicated
- Helper text provides additional context
- Value changes are announced (when appropriate)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Migration from v0.3.0

### Accessibility Improvements (v0.4.0)

#### Enhanced Touch Targets

```tsx
// Before: Fixed touch target size
<TextInput label="Email" value={email} onChange={setEmail} />

// After: Responsive touch targets (44px on mobile)
<TextInput label="Email" value={email} onChange={setEmail} />
```

#### Improved Error Handling

```tsx
// Before: Basic error display
<TextInput 
  label="Email" 
  value={email} 
  onChange={setEmail}
  error="Invalid email"
/>

// After: Accessible error with ARIA
<TextInput 
  label="Email" 
  value={email} 
  onChange={setEmail}
  error="Invalid email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : "email-help"}
/>
{error && (
  <div id="email-error" role="alert" aria-live="polite">
    {error}
  </div>
)}
```

#### Required Field Indicators

```tsx
// Before: No visual required indicator
<TextInput 
  label="Name" 
  value={name} 
  onChange={setName}
  required
/>

// After: Visual asterisk + ARIA
<TextInput 
  label="Name" 
  value={name} 
  onChange={setName}
  required
  aria-required="true"
/>
```

#### Mobile Optimizations

```tsx
// Before: Same font size on all devices
<TextInput label="Phone" type="tel" value={phone} onChange={setPhone} />

// After: 16px font on mobile to prevent zoom
<TextInput label="Phone" type="tel" value={phone} onChange={setPhone} />
```

### Migration Checklist

- [ ] Add `aria-invalid` to error states
- [ ] Add `aria-describedby` for help text and errors
- [ ] Add `aria-required` for required fields
- [ ] Test touch targets on mobile devices
- [ ] Verify error announcements with screen readers
- [ ] Test in high contrast mode

## Related Components

- `TextArea` - Multi-line text input
- `Select` - Dropdown selection
- `SearchBar` - Search-specific input
- `Checkbox` - Boolean input

## License

MIT
