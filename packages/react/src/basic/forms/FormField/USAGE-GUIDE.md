# FormField Usage Guide

Comprehensive guide for using the FormField component.

## Table of Contents

- [Getting Started](#getting-started)
- [Validation Rules](#validation-rules)
- [Advanced Patterns](#advanced-patterns)
- [Integration Examples](#integration-examples)
- [Best Practices](#best-practices)

## Getting Started

### Basic Form

```tsx
import { FormProvider, FormField, TextInput, Button } from '@spexop/react';

function LoginForm() {
  const handleSubmit = async (values) => {
    await api.login(values.email, values.password);
  };

  return (
    <FormProvider onSubmit={handleSubmit}>
      <FormField
        name="email"
        label="Email"
        rules={[{ type: 'required' }, { type: 'email' }]}
      >
        <TextInput type="email" />
      </FormField>

      <FormField
        name="password"
        label="Password"
        rules={[{ type: 'required' }, { type: 'minLength', value: 8 }]}
      >
        <TextInput type="password" />
      </FormField>

      <Button type="submit">Login</Button>
    </FormProvider>
  );
}
```

## Validation Rules

### Multiple Rules

Combine multiple validation rules:

```tsx
<FormField
  name="username"
  label="Username"
  rules={[
    { type: 'required', message: 'Username is required' },
    { type: 'minLength', value: 3, message: 'Minimum 3 characters' },
    { type: 'maxLength', value: 20, message: 'Maximum 20 characters' },
    { type: 'pattern', value: /^[a-zA-Z0-9_]+$/, message: 'Only letters, numbers, and underscores' }
  ]}
>
  <TextInput />
</FormField>
```

### Conditional Validation

Validate based on other fields:

```tsx
<FormField
  name="confirmEmail"
  label="Confirm Email"
  rules={[
    {
      type: 'custom',
      validate: (value, formValues) => {
        if (value !== formValues.email) {
          return 'Emails must match';
        }
        return true;
      }
    }
  ]}
  dependencies={['email']}
>
  <TextInput type="email" />
</FormField>
```

### Cross-Field Validation

```tsx
<FormProvider>
  <FormField
    name="startDate"
    label="Start Date"
    rules={[{ type: 'required' }]}
  >
    <DatePicker />
  </FormField>

  <FormField
    name="endDate"
    label="End Date"
    rules={[
      { type: 'required' },
      {
        type: 'custom',
        validate: (value, formValues) => {
          const start = new Date(formValues.startDate);
          const end = new Date(value);
          return end > start || 'End date must be after start date';
        }
      }
    ]}
    dependencies={['startDate']}
  >
    <DatePicker />
  </FormField>
</FormProvider>
```

## Advanced Patterns

### Dynamic Field Arrays

```tsx
function AddressForm() {
  const form = useForm();
  const [addresses, setAddresses] = useState([{ id: 1 }]);

  return (
    <FormProvider>
      {addresses.map((address, index) => (
        <div key={address.id}>
          <FormField
            name={`addresses.${index}.street`}
            label="Street"
            rules={[{ type: 'required' }]}
          >
            <TextInput />
          </FormField>

          <FormField
            name={`addresses.${index}.city`}
            label="City"
            rules={[{ type: 'required' }]}
          >
            <TextInput />
          </FormField>
        </div>
      ))}

      <Button onClick={() => setAddresses([...addresses, { id: Date.now() }])}>
        Add Address
      </Button>
    </FormProvider>
  );
}
```

### Async Validation with Debounce

```tsx
import { useDebounce } from '@spexop/react';

<FormField
  name="username"
  label="Username"
  rules={[
    {
      type: 'async',
      validate: async (value) => {
        // Debounced API call
        const response = await fetch(`/api/check-username?username=${value}`);
        const { available } = await response.json();
        return available || 'Username is already taken';
      }
    }
  ]}
  validateOn="change"
>
  <TextInput />
</FormField>
```

### Custom Error Display

```tsx
function CustomFormField() {
  const field = useFormField({
    name: 'email',
    rules: [{ type: 'required' }, { type: 'email' }]
  });

  return (
    <div>
      <label>Email</label>
      <input
        type="email"
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      {field.error && (
        <Alert variant="error">
          <Icon name="AlertCircle" />
          {field.error}
        </Alert>
      )}
    </div>
  );
}
```

## Integration Examples

### With Select Component

```tsx
<FormField
  name="country"
  label="Country"
  rules={[{ type: 'required', message: 'Please select a country' }]}
>
  <Select>
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
  </Select>
</FormField>
```

### With Checkbox

```tsx
<FormField
  name="terms"
  label="Terms and Conditions"
  rules={[
    {
      type: 'custom',
      validate: (value) => value === true || 'You must accept the terms'
    }
  ]}
>
  <Checkbox />
</FormField>
```

### With TextArea

```tsx
<FormField
  name="message"
  label="Message"
  helperText="Maximum 500 characters"
  rules={[
    { type: 'required', message: 'Message is required' },
    { type: 'maxLength', value: 500, message: 'Message is too long' }
  ]}
>
  <TextArea rows={5} />
</FormField>
```

### With File Upload

```tsx
<FormField
  name="avatar"
  label="Profile Picture"
  rules={[
    {
      type: 'custom',
      validate: (value) => {
        if (!value) return true;
        const file = value as File;
        if (file.size > 5 * 1024 * 1024) {
          return 'File size must be less than 5MB';
        }
        return true;
      }
    }
  ]}
>
  <FileUpload accept="image/*" />
</FormField>
```

## Best Practices

### 1. Clear Error Messages

```tsx
// Good: Specific and actionable
rules={[
  { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
]}

// Bad: Vague error message
rules={[
  { type: 'minLength', value: 8, message: 'Invalid password' }
]}
```

### 2. Validate on Blur for UX

```tsx
// Good: Validate after user leaves field
<FormField name="email" validateOn="blur" rules={[{ type: 'email' }]}>
  <TextInput />
</FormField>

// Avoid: Validate on every keystroke (annoying for users)
<FormField name="email" validateOn="change" rules={[{ type: 'email' }]}>
  <TextInput />
</FormField>
```

### 3. Use Helper Text

```tsx
<FormField
  name="password"
  label="Password"
  helperText="Must be at least 8 characters with one number and one special character"
  rules={[
    { type: 'minLength', value: 8 },
    { type: 'pattern', value: /^(?=.*\d)(?=.*[@$!%*?&])/ }
  ]}
>
  <TextInput type="password" />
</FormField>
```

### 4. Group Related Fields

```tsx
<FormProvider>
  <fieldset>
    <legend>Personal Information</legend>
    <FormField name="firstName" label="First Name" rules={[{ type: 'required' }]}>
      <TextInput />
    </FormField>
    <FormField name="lastName" label="Last Name" rules={[{ type: 'required' }]}>
      <TextInput />
    </FormField>
  </fieldset>

  <fieldset>
    <legend>Contact Information</legend>
    <FormField name="email" label="Email" rules={[{ type: 'required' }, { type: 'email' }]}>
      <TextInput />
    </FormField>
    <FormField name="phone" label="Phone">
      <TextInput />
    </FormField>
  </fieldset>
</FormProvider>
```

### 5. Handle Async Validation State

```tsx
function UsernameField() {
  const field = useFormField({
    name: 'username',
    rules: [
      {
        type: 'async',
        validate: async (value) => {
          const available = await checkUsername(value);
          return available || 'Username is taken';
        }
      }
    ]
  });

  return (
    <FormField name="username" label="Username">
      <TextInput />
      {field.validating && <Spinner size="sm" />}
    </FormField>
  );
}
```

## Common Patterns

### Registration Form

```tsx
<FormProvider onSubmit={handleRegister}>
  <FormField
    name="email"
    label="Email"
    rules={[{ type: 'required' }, { type: 'email' }]}
  >
    <TextInput type="email" autoComplete="email" />
  </FormField>

  <FormField
    name="password"
    label="Password"
    rules={[
      { type: 'required' },
      { type: 'minLength', value: 8, message: 'At least 8 characters' }
    ]}
  >
    <TextInput type="password" autoComplete="new-password" />
  </FormField>

  <FormField
    name="confirmPassword"
    label="Confirm Password"
    rules={[
      { type: 'required' },
      {
        type: 'custom',
        validate: (value, formValues) =>
          value === formValues.password || 'Passwords must match'
      }
    ]}
  >
    <TextInput type="password" autoComplete="new-password" />
  </FormField>

  <Button type="submit">Create Account</Button>
</FormProvider>
```

### Contact Form

```tsx
<FormProvider onSubmit={handleContact}>
  <FormField
    name="name"
    label="Your Name"
    rules={[{ type: 'required' }]}
  >
    <TextInput />
  </FormField>

  <FormField
    name="email"
    label="Email Address"
    rules={[{ type: 'required' }, { type: 'email' }]}
  >
    <TextInput type="email" />
  </FormField>

  <FormField
    name="subject"
    label="Subject"
    rules={[{ type: 'required' }]}
  >
    <Select>
      <option value="">Select a subject</option>
      <option value="general">General Inquiry</option>
      <option value="support">Technical Support</option>
      <option value="sales">Sales</option>
    </Select>
  </FormField>

  <FormField
    name="message"
    label="Message"
    rules={[
      { type: 'required' },
      { type: 'minLength', value: 10, message: 'At least 10 characters' }
    ]}
  >
    <TextArea rows={5} />
  </FormField>

  <Button type="submit">Send Message</Button>
</FormProvider>
```
