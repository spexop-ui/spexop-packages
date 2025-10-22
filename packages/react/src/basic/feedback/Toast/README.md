# Toast

An accessible toast notification component for brief, non-intrusive messages.

## Features

- Semantic variants (info, success, warning, error)
- Auto-dismiss with configurable duration
- Manual dismiss button
- Optional action button
- Multiple position options
- Screen reader accessible
- Smooth animations
- Portal rendering
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { useState } from "react";
import { Toast } from "@spexop/react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Show Toast</button>
      
      <Toast 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message="Changes saved successfully"
      />
    </>
  );
}
```

## Variants

```tsx
{/* Info (default) */}
<Toast isOpen={isOpen} onClose={onClose} message="Info message" variant="info" />

{/* Success */}
<Toast isOpen={isOpen} onClose={onClose} message="Success!" variant="success" />

{/* Warning */}
<Toast isOpen={isOpen} onClose={onClose} message="Warning" variant="warning" />

{/* Error */}
<Toast isOpen={isOpen} onClose={onClose} message="Error occurred" variant="error" />
```

## Positions

```tsx
{/* Top */}
<Toast isOpen={isOpen} onClose={onClose} message="Message" position="top-left" />
<Toast isOpen={isOpen} onClose={onClose} message="Message" position="top-center" />
<Toast isOpen={isOpen} onClose={onClose} message="Message" position="top-right" />

{/* Bottom (default) */}
<Toast isOpen={isOpen} onClose={onClose} message="Message" position="bottom-left" />
<Toast isOpen={isOpen} onClose={onClose} message="Message" position="bottom-center" />
<Toast isOpen={isOpen} onClose={onClose} message="Message" position="bottom-right" />
```

## With Action

```tsx
<Toast 
  isOpen={isOpen}
  onClose={onClose}
  message="Item deleted"
  variant="info"
  action={{
    label: "Undo",
    onClick: handleUndo,
  }}
/>
```

## Custom Duration

```tsx
{/* 3 seconds */}
<Toast isOpen={isOpen} onClose={onClose} message="Quick message" duration={3000} />

{/* No auto-dismiss */}
<Toast isOpen={isOpen} onClose={onClose} message="Persistent" duration={0} />
```

## Toast Manager Example

```tsx
function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, variant = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, variant, isOpen: true }]);
  };

  const closeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, showToast, closeToast };
}

function App() {
  const { toasts, showToast, closeToast } = useToast();

  return (
    <>
      <button onClick={() => showToast('Success!', 'success')}>
        Show Toast
      </button>

      {toasts.map(toast => (
        <Toast
          key={toast.id}
          isOpen={toast.isOpen}
          onClose={() => closeToast(toast.id)}
          message={toast.message}
          variant={toast.variant}
        />
      ))}
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `React.ReactNode` | required | Toast message |
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Visual variant |
| `duration` | `number` | `5000` | Auto-dismiss duration (0 = never) |
| `isOpen` | `boolean` | required | Whether toast is visible |
| `onClose` | `() => void` | required | Close callback |
| `action` | `{ label: string, onClick: () => void }` | - | Action button |
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-center"` | Position |
| `className` | `string` | - | Additional CSS class |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong semantic borders with subtle shadow
- **Principle 3: Typography before decoration** - Clear, readable messaging
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with proper ARIA

## Accessibility

- Uses `role="status"` for assistive technologies
- `aria-live="polite"` for non-intrusive announcements
- `aria-atomic="true"` for complete message reading
- Keyboard accessible dismiss button
- Focus visible indicators
- Screen reader friendly
- High contrast colors

## Keyboard Navigation

- **Tab**: Focus on action/close buttons
- **Enter/Space**: Activate focused button
- **Escape**: Can be handled by parent component

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Alert - For persistent messages
- Snackbar - Similar brief notifications
- Modal - For important blocking messages
