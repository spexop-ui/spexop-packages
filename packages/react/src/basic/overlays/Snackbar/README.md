# Snackbar Component

**Version**: 0.4.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

An accessible snackbar notification component for brief messages following "The Spexop Way". Perfect for showing success messages, errors, warnings, or informational updates with optional actions.

## Features

- ✅ 4 semantic variants (info, success, warning, error)
- ✅ Auto-dismiss with configurable duration
- ✅ Action button support with proper accessibility
- ✅ Close button with X icon from @spexop/icons
- ✅ Multiple animation types (slide, fade, scale, none)
- ✅ 6 position options (top/bottom + left/center/right)
- ✅ Portal rendering for proper z-index management
- ✅ Keyboard navigation (Escape, Enter, Space)
- ✅ WCAG AA+ accessible with proper ARIA attributes
- ✅ High contrast mode support
- ✅ Reduced motion support
- ✅ Responsive design
- ✅ TypeScript support with comprehensive types

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Snackbar } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsVisible(true)}>
        Show Notification
      </button>
      
      <Snackbar
        message="Changes saved successfully!"
        variant="success"
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        action={{
          label: "Undo",
          onClick: () => handleUndo()
        }}
      />
    </>
  );
}
```

## Variants

### Info (Default)

Neutral information message.

```tsx
<Snackbar
  message="Profile updated"
  variant="info"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>
```

### Success

Positive confirmation message.

```tsx
<Snackbar
  message="File uploaded successfully!"
  variant="success"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>
```

### Warning

Cautionary message.

```tsx
<Snackbar
  message="Network connection unstable"
  variant="warning"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>
```

### Error

Error message.

```tsx
<Snackbar
  message="Failed to save changes"
  variant="error"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>
```

## Positions

### Bottom Positions

```tsx
// Bottom left
<Snackbar
  message="Message"
  position="bottom-left"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>

// Bottom center (default)
<Snackbar
  message="Message"
  position="bottom-center"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>

// Bottom right
<Snackbar
  message="Message"
  position="bottom-right"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>
```

### Top Positions

```tsx
// Top left
<Snackbar
  message="Message"
  position="top-left"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>

// Top center
<Snackbar
  message="Message"
  position="top-center"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>

// Top right
<Snackbar
  message="Message"
  position="top-right"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>
```

## Animations

### Animation Types

```tsx
// Slide animation (default)
<Snackbar
  message="Message"
  animation="slide"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>

// Fade animation
<Snackbar
  message="Message"
  animation="fade"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>

// Scale animation
<Snackbar
  message="Message"
  animation="scale"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>

// No animation
<Snackbar
  message="Message"
  animation="none"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>
```

## Action Button

### With Action

```tsx
<Snackbar
  message="Changes saved successfully"
  variant="success"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  action={{
    label: "Undo",
    onClick: () => handleUndo()
  }}
/>
```

### Without Action

```tsx
<Snackbar
  message="Simple notification"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
/>
```

## Close Button

### With Close Button (Default)

```tsx
<Snackbar
  message="Message"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  showCloseButton={true}
/>
```

### Without Close Button

```tsx
<Snackbar
  message="Message"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  showCloseButton={false}
/>
```

## Auto-dismiss

### With Auto-dismiss

```tsx
<Snackbar
  message="Message"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  autoHideDuration={4000} // 4 seconds
/>
```

### Without Auto-dismiss

```tsx
<Snackbar
  message="Persistent message"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  autoHideDuration={0} // No auto-hide
/>
```

## Portal Rendering

### With Portal (Default)

```tsx
<Snackbar
  message="Message"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  portal={true}
/>
```

### Without Portal

```tsx
<Snackbar
  message="Message"
  isVisible={isVisible}
  onClose={() => setIsVisible(false)}
  portal={false}
/>
```

## Keyboard Navigation

The Snackbar component supports full keyboard navigation:

- **Escape**: Close the snackbar
- **Enter/Space**: Activate the action button (if present)
- **Tab**: Navigate between interactive elements

## Accessibility

The Snackbar component follows WCAG AA+ guidelines:

- Proper ARIA attributes (`role="alert"`, `aria-live="polite"`)
- Keyboard navigation support
- Screen reader announcements
- High contrast mode support
- Focus management
- Proper color contrast ratios

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `React.ReactNode` | - | **Required.** Snackbar message content |
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Semantic variant for styling |
| `action` | `{ label: string; onClick: () => void }` | - | Optional action button configuration |
| `isVisible` | `boolean` | `true` | Whether the snackbar is visible |
| `autoHideDuration` | `number` | `4000` | Auto-hide duration in ms (0 = no auto-hide) |
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-center"` | Position of the snackbar |
| `onClose` | `() => void` | - | Callback when snackbar closes |
| `className` | `string` | - | Additional CSS class |
| `aria-label` | `string` | - | ARIA label for accessibility |
| `showCloseButton` | `boolean` | `true` | Whether to show close button |
| `animation` | `"slide" \| "fade" \| "scale" \| "none"` | `"slide"` | Animation type |
| `portal` | `boolean` | `true` | Whether to render in portal |

## Best Practices

### When to Use

- **Success confirmations**: "Changes saved successfully"
- **Brief notifications**: "New message received"
- **Non-critical errors**: "Network connection lost"
- **Undo actions**: "File deleted" with "Undo" button

### When NOT to Use

- **Critical errors**: Use Alert or Modal instead
- **Complex forms**: Use inline validation
- **Long messages**: Use Toast or Modal instead
- **Multiple notifications**: Use Toast system instead

### Accessibility Guidelines

- Always provide meaningful `aria-label` for screen readers
- Use semantic variants appropriately (error, warning, success, info)
- Ensure sufficient color contrast (WCAG AA+)
- Test with keyboard navigation
- Test with screen readers

### Design Guidelines

- Keep messages concise and actionable
- Use action buttons sparingly and make them clear
- Position at bottom for desktop, top for mobile
- Use appropriate variants for message type
- Consider auto-hide duration based on message importance

### Performance Tips

- Use `portal={false}` only when necessary
- Avoid rapid show/hide cycles
- Consider using a toast management system for multiple notifications
- Use `animation="none"` for better performance on low-end devices

## Migration from v0.3

The Snackbar component has been significantly improved in v0.4:

### Breaking Changes

- `actionLabel` and `onAction` props replaced with `action` object
- `position` prop now supports 6 positions instead of 2
- `isOpen` prop renamed to `isVisible`
- `duration` prop renamed to `autoHideDuration`

### Migration Guide

```tsx
// v0.3
<Snackbar
  message="Message"
  actionLabel="Undo"
  onAction={handleUndo}
  isOpen={isOpen}
  position="bottom"
  duration={3000}
/>

// v0.4
<Snackbar
  message="Message"
  action={{
    label: "Undo",
    onClick: handleUndo
  }}
  isVisible={isVisible}
  position="bottom-center"
  autoHideDuration={3000}
  onClose={() => setIsVisible(false)}
/>
```

### Persistent (Manual dismiss only)

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Important notification"
  duration={0} // Won't auto-dismiss
/>
```

## Position

### Bottom Center (Default)

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Notification"
  position="bottom-center"
/>
```

### Bottom Left

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Notification"
  position="bottom-left"
/>
```

### Bottom Right

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Notification"
  position="bottom-right"
/>
```

## With Action Button

```tsx
<Snackbar
  isOpen={isOpen}
  onClose={handleClose}
  message="Connection lost"
  variant="error"
  action={{
    label: "Retry",
    onClick: handleRetry
  }}
/>
```

## Common Patterns

### Success Notification

```tsx
function SaveButton() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    try {
      await saveData();
      setShowSuccess(true);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>
      
      <Snackbar
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Changes saved successfully!"
        variant="success"
        duration={3000}
      />
    </>
  );
}
```

### Error with Retry

```tsx
function DataLoader() {
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      await fetchData();
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      {/* Your component */}
      
      <Snackbar
        isOpen={error}
        onClose={() => setError(false)}
        message="Failed to load data"
        variant="error"
        action={{
          label: "Retry",
          onClick: loadData
        }}
        duration={0} // Don't auto-dismiss errors
      />
    </>
  );
}
```

### Undo Action

```tsx
function DeleteButton({ item, onDelete }) {
  const [showUndo, setShowUndo] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);

  const handleDelete = () => {
    setDeletedItem(item);
    setShowUndo(true);
    
    // Delay actual deletion
    setTimeout(() => {
      if (deletedItem) {
        onDelete(deletedItem);
      }
    }, 5000);
  };

  const handleUndo = () => {
    setDeletedItem(null);
    setShowUndo(false);
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      
      <Snackbar
        isOpen={showUndo}
        onClose={() => setShowUndo(false)}
        message="Item deleted"
        variant="default"
        action={{
          label: "Undo",
          onClick: handleUndo
        }}
        duration={5000}
      />
    </>
  );
}
```

### Queue Management

```tsx
function NotificationManager() {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);

  const showNotification = (message, variant = 'default') => {
    const notification = { id: Date.now(), message, variant };
    setQueue(prev => [...prev, notification]);
  };

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [current, queue]);

  const handleClose = () => {
    setCurrent(null);
  };

  return (
    <>
      <button onClick={() => showNotification('First', 'success')}>
        Show First
      </button>
      <button onClick={() => showNotification('Second', 'info')}>
        Show Second
      </button>
      
      {current && (
        <Snackbar
          isOpen={true}
          onClose={handleClose}
          message={current.message}
          variant={current.variant}
          duration={3000}
        />
      )}
    </>
  );
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Alert` - Persistent inline notifications
- `Toast` - More prominent notifications
- `Modal` - Blocking dialogs

## License

MIT
