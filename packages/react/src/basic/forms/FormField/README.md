# FormField

Form field wrapper with validation and error display.

## Features

- Built-in validation with multiple rule types
- Real-time error feedback
- Accessible form controls
- Required field indicators
- Helper text support
- Custom error messages
- Seamless integration with FormProvider

## Installation

```bash
npm install @spexop/react
```

## Basic Usage

```tsx
import { FormProvider, FormField, TextInput } from '@spexop/react';

function ContactForm() {
  return (
    <FormProvider
      onSubmit={async (values) => {
        console.log(values);
      }}
    >
      <FormField
        name="email"
        label="Email Address"
        rules={[
          { type: 'required', message: 'Email is required' },
          { type: 'email', message: 'Invalid email format' }
        ]}
      >
        <TextInput />
      </FormField>
      
      <button type="submit">Submit</button>
    </FormProvider>
  );
}
```

## Validation Rules

### Required

```tsx
<FormField
  name="username"
  label="Username"
  rules={[{ type: 'required', message: 'Username is required' }]}
>
  <TextInput />
</FormField>
```

### Email

```tsx
<FormField
  name="email"
  label="Email"
  rules={[{ type: 'email', message: 'Invalid email address' }]}
>
  <TextInput type="email" />
</FormField>
```

### Min/Max Length

```tsx
<FormField
  name="password"
  label="Password"
  rules={[
    { type: 'required', message: 'Password is required' },
    { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
  ]}
>
  <TextInput type="password" />
</FormField>
```

### Pattern

```tsx
<FormField
  name="phone"
  label="Phone Number"
  rules={[
    { type: 'pattern', value: /^\d{3}-\d{3}-\d{4}$/, message: 'Format: XXX-XXX-XXXX' }
  ]}
>
  <TextInput />
</FormField>
```

### Custom Validation

```tsx
<FormField
  name="confirmPassword"
  label="Confirm Password"
  rules={[
    {
      type: 'custom',
      validate: (value, formValues) => {
        return value === formValues.password || 'Passwords must match';
      }
    }
  ]}
>
  <TextInput type="password" />
</FormField>
```

### Async Validation

```tsx
<FormField
  name="username"
  label="Username"
  rules={[
    {
      type: 'async',
      validate: async (value) => {
        const available = await checkUsernameAvailability(value);
        return available || 'Username is already taken';
      }
    }
  ]}
>
  <TextInput />
</FormField>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | string | required | Field name |
| label | string | - | Field label |
| helperText | string | - | Help text below field |
| rules | ValidationRule[] | - | Validation rules |
| defaultValue | unknown | - | Default field value |
| validateOn | 'change' \| 'blur' \| 'submit' | 'blur' | When to validate |
| showRequired | boolean | false | Show required indicator |
| children | ReactNode | required | Input component |
| className | string | - | Additional CSS class |
| errorMessage | string | - | Override error message |
| hideError | boolean | false | Hide error display |

## Design Principles

Following "The Spexop Way":

- **Principle 2: Borders before shadows** - Clean borders for visual hierarchy
- **Principle 3: Typography before decoration** - Bold text for labels
- **Principle 4: Tokens before magic numbers** - Uses design tokens for all spacing
- **Principle 7: Accessibility before aesthetics** - ARIA labels and error announcements

## Accessibility

- WCAG AA+ compliant
- Screen reader support with ARIA labels
- Keyboard navigation
- Error announcements
- Required field indicators
- Focus management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
