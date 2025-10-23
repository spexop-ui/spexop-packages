# Modal

A modern, accessible modal dialog component with enhanced UX patterns and comprehensive customization options.

## Features

- **Modern Animation System** - Multiple animation variants (fade, slide, zoom, scale)
- **Enhanced Accessibility** - WCAG AA+ compliant with screen reader announcements
- **Responsive Design** - Mobile-optimized with adaptive sizing and placement
- **Multiple Backdrop Options** - Blur, dark, light, and transparent variants
- **Flexible Header/Footer** - Rich configuration with titles, subtitles, and custom content
- **Loading States** - Built-in loading indicators with custom support
- **Native Dialog Support** - Optional HTML dialog element for form integration
- **Advanced Focus Management** - Custom focus traps and restoration
- **Event System** - Comprehensive lifecycle and interaction callbacks
- **Portal Rendering** - Renders outside DOM hierarchy for proper layering
- **Touch-Friendly** - Optimized for mobile interactions
- **Theme Integration** - Full design token support

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { useState } from "react";
import { Modal } from "@spexop/react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        header={{ title: "My Modal" }}
        animation={{ type: "slide", duration: 300 }}
      >
        <p>Modal content here</p>
      </Modal>
    </>
  );
}
```

## Modern Usage with Enhanced Features

```tsx
import { useState, useRef } from "react";
import { Modal, Button } from "@spexop/react";

function ModernModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modern Modal</Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        header={{
          title: "Create New Item",
          subtitle: "Fill in the details below to create a new item",
          showCloseButton: true
        }}
        footer={{
          children: (
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} loading={loading}>
                Create Item
              </Button>
            </>
          ),
          align: "right"
        }}
        animation={{ type: "zoom", duration: 250 }}
        backdrop="blur"
        placement="center"
        size="md"
        focus={{
          initialFocusRef: inputRef,
          restoreFocus: true,
          trapFocus: true
        }}
        accessibility={{
          announceOpen: true,
          "aria-describedby": "modal-description"
        }}
        onOpen={() => console.log("Modal opened")}
        onClose={() => console.log("Modal closed")}
      >
        <div id="modal-description">
          <label htmlFor="item-name">Item Name</label>
          <input 
            ref={inputRef}
            id="item-name"
            type="text" 
            placeholder="Enter item name"
            className="w-full p-3 border rounded-md"
          />
        </div>
      </Modal>
    </>
  );
}
```

## Animation Variants

```tsx
{/* Fade animation */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Fade Modal" }}
  animation={{ type: "fade", duration: 300 }}
>
  <p>Content with fade animation</p>
</Modal>

{/* Slide animation */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Slide Modal" }}
  animation={{ type: "slide", duration: 400 }}
>
  <p>Content with slide animation</p>
</Modal>

{/* Zoom animation */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Zoom Modal" }}
  animation={{ type: "zoom", duration: 250 }}
>
  <p>Content with zoom animation</p>
</Modal>

{/* Disable animations */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "No Animation" }}
  animation={{ disabled: true }}
>
  <p>Content without animation</p>
</Modal>
```

## Backdrop Variants

```tsx
{/* Blur backdrop (default) */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  backdrop="blur"
  header={{ title: "Blur Backdrop" }}
>
  <p>Content with blur backdrop</p>
</Modal>

{/* Dark backdrop */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  backdrop="dark"
  header={{ title: "Dark Backdrop" }}
>
  <p>Content with dark backdrop</p>
</Modal>

{/* Light backdrop */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  backdrop="light"
  header={{ title: "Light Backdrop" }}
>
  <p>Content with light backdrop</p>
</Modal>

{/* Transparent backdrop */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  backdrop="transparent"
  header={{ title: "Transparent Backdrop" }}
>
  <p>Content with transparent backdrop</p>
</Modal>
```

## Placement Options

```tsx
{/* Center placement (default) */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  placement="center"
  header={{ title: "Center Modal" }}
>
  <p>Centered modal</p>
</Modal>

{/* Top placement */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  placement="top"
  header={{ title: "Top Modal" }}
>
  <p>Modal at the top</p>
</Modal>

{/* Bottom placement */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  placement="bottom"
  header={{ title: "Bottom Modal" }}
>
  <p>Modal at the bottom</p>
</Modal>
```

## Header Configuration

```tsx
{/* Simple header */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Simple Title" }}
>
  <p>Content</p>
</Modal>

{/* Header with subtitle */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ 
    title: "Main Title",
    subtitle: "Optional subtitle text"
  }}
>
  <p>Content</p>
</Modal>

{/* Custom header content */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ 
    children: (
      <div className="flex items-center gap-2">
        <Icon name="Settings" />
        <span>Custom Header</span>
      </div>
    )
  }}
>
  <p>Content</p>
</Modal>

{/* Header without close button */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ 
    title: "No Close Button",
    showCloseButton: false
  }}
>
  <p>Content</p>
</Modal>
```

## Footer Configuration

```tsx
{/* Right-aligned footer (default) */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Right Footer" }}
  footer={{
    children: (
      <>
        <Button variant="ghost">Cancel</Button>
        <Button>Confirm</Button>
      </>
    ),
    align: "right"
  }}
>
  <p>Content</p>
</Modal>

{/* Left-aligned footer */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Left Footer" }}
  footer={{
    children: <Button>Action</Button>,
    align: "left"
  }}
>
  <p>Content</p>
</Modal>

{/* Center-aligned footer */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Center Footer" }}
  footer={{
    children: <Button>Center Action</Button>,
    align: "center"
  }}
>
  <p>Content</p>
</Modal>

{/* Footer with divider */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Footer with Divider" }}
  footer={{
    children: <Button>Action</Button>,
    showDivider: true
  }}
>
  <p>Content</p>
</Modal>
```

## Loading States

```tsx
{/* Default loading indicator */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Loading Modal" }}
  loading={true}
>
  <p>Content is loading...</p>
</Modal>

{/* Custom loading indicator */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Custom Loading" }}
  loading={true}
  loadingIndicator={
    <div className="flex items-center gap-2">
      <Loader2 className="animate-spin" />
      <span>Processing...</span>
    </div>
  }
>
  <p>Content is loading...</p>
</Modal>
```

## Native Dialog Support

```tsx
{/* Native HTML dialog element */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Native Dialog" }}
  native={true}
  formMethod="post"
  formAction="/submit"
  returnValue="submitted"
>
  <p>This uses the native HTML dialog element</p>
</Modal>
```

## Responsive Behavior

```tsx
{/* Mobile-optimized modal */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Responsive Modal" }}
  size="lg"
  responsive={{
    mobileSize: "sm",
    fullScreenOnMobile: true,
    disableBackdropOnMobile: false
  }}
>
  <p>Adapts to mobile screens</p>
</Modal>
```

## Accessibility Examples

```tsx
{/* Enhanced accessibility */}
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Accessible Modal" }}
  accessibility={{
    "aria-label": "Custom modal label",
    "aria-describedby": "modal-description",
    announceOpen: true,
    announcementText: "Modal opened for creating new item"
  }}
  focus={{
    initialFocusRef: inputRef,
    restoreFocus: true,
    trapFocus: true
  }}
>
  <div id="modal-description">
    <p>This modal has enhanced accessibility features</p>
  </div>
</Modal>
```

## Event Handlers

```tsx
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Event Modal" }}
  onOpen={() => console.log("Modal opened")}
  onBeforeOpen={() => console.log("About to open")}
  onClose={() => console.log("Modal closed")}
  onBeforeClose={() => console.log("About to close")}
  onBackdropClick={(event) => console.log("Backdrop clicked", event)}
  onEscapeKey={(event) => console.log("Escape pressed", event)}
>
  <p>Check console for events</p>
</Modal>
```

## Size Variants

```tsx
{/* Small */}
<Modal 
  size="sm" 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Small Modal" }}
>
  <p>Small modal (max-width: 400px)</p>
</Modal>

{/* Medium (default) */}
<Modal 
  size="md" 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Medium Modal" }}
>
  <p>Medium modal (max-width: 600px)</p>
</Modal>

{/* Large */}
<Modal 
  size="lg" 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Large Modal" }}
>
  <p>Large modal (max-width: 800px)</p>
</Modal>

{/* Extra Large */}
<Modal 
  size="xl" 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Extra Large Modal" }}
>
  <p>Extra large modal (max-width: 1200px)</p>
</Modal>

{/* Full Screen */}
<Modal 
  size="full" 
  isOpen={isOpen} 
  onClose={onClose} 
  header={{ title: "Full Screen Modal" }}
>
  <p>Full screen modal (95% viewport)</p>
</Modal>
```

## Advanced Configuration

```tsx
{/* Complex modal with all features */}
<Modal
  isOpen={isOpen}
  onClose={onClose}
  header={{
    title: "Advanced Modal",
    subtitle: "This demonstrates all features",
    showCloseButton: true
  }}
  footer={{
    children: (
      <>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </>
    ),
    align: "right",
    showDivider: true
  }}
  animation={{
    type: "zoom",
    duration: 300,
    timing: "ease-out"
  }}
  backdrop="blur"
  placement="center"
  size="lg"
  loading={isLoading}
  loadingIndicator={<CustomSpinner />}
  accessibility={{
    announceOpen: true,
    "aria-label": "Advanced configuration modal"
  }}
  focus={{
    initialFocusRef: firstInputRef,
    restoreFocus: true,
    trapFocus: true
  }}
  responsive={{
    mobileSize: "sm",
    fullScreenOnMobile: true
  }}
  onOpen={() => console.log("Modal opened")}
  onClose={() => console.log("Modal closed")}
  onBackdropClick={(event) => console.log("Backdrop clicked", event)}
>
  <form>
    <input ref={firstInputRef} placeholder="First input" />
    <input placeholder="Second input" />
  </form>
</Modal>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | required | Whether the modal is open |
| `onClose` | `() => void` | required | Callback when modal should close |
| `children` | `React.ReactNode` | required | Modal content |

### Layout & Appearance

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Size variant |
| `placement` | `"center" \| "top" \| "bottom" \| "left" \| "right"` | `"center"` | Modal placement |
| `backdrop` | `"blur" \| "dark" \| "light" \| "transparent"` | `"blur"` | Backdrop variant |
| `className` | `string` | - | Additional CSS class for modal |
| `backdropClassName` | `string` | - | Additional CSS class for backdrop |
| `style` | `React.CSSProperties` | - | Custom modal styles |
| `backdropStyle` | `React.CSSProperties` | - | Custom backdrop styles |

### Header Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `ModalHeader` | - | Header configuration object |
| `header.title` | `React.ReactNode` | - | Header title |
| `header.subtitle` | `React.ReactNode` | - | Header subtitle |
| `header.children` | `React.ReactNode` | - | Custom header content |
| `header.showCloseButton` | `boolean` | `true` | Show close button |
| `header.closeButton` | `React.ReactNode` | - | Custom close button |

### Footer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `footer` | `ModalFooter` | - | Footer configuration object |
| `footer.children` | `React.ReactNode` | - | Footer content |
| `footer.align` | `"left" \| "center" \| "right" \| "between"` | `"right"` | Footer alignment |
| `footer.showDivider` | `boolean` | `false` | Show divider above footer |

### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `ModalAnimationConfig` | `{ type: "scale", duration: 200 }` | Animation configuration |
| `animation.type` | `"fade" \| "slide" \| "zoom" \| "scale" \| "none"` | `"scale"` | Animation type |
| `animation.duration` | `number` | `200` | Animation duration (ms) |
| `animation.timing` | `"ease" \| "ease-in" \| "ease-out" \| "ease-in-out" \| "linear"` | `"ease-out"` | Timing function |
| `animation.disabled` | `boolean` | `false` | Disable animations |

### Behavior Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closeOnBackdropClick` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `preventBodyScroll` | `boolean` | `true` | Prevent body scroll when open |
| `portal` | `boolean` | `true` | Render in portal |
| `portalContainer` | `HTMLElement` | `document.body` | Portal container element |

### Loading & State Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `false` | Show loading state |
| `loadingIndicator` | `React.ReactNode` | `<Loader2 />` | Custom loading indicator |
| `show` | `boolean` | `true` | Whether to show modal |

### Accessibility Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accessibility` | `ModalAccessibility` | - | Accessibility configuration |
| `accessibility.aria-label` | `string` | - | ARIA label for modal |
| `accessibility.aria-labelledby` | `string` | - | ARIA labelledby for modal |
| `accessibility.aria-describedby` | `string` | - | ARIA describedby for modal |
| `accessibility.announceOpen` | `boolean` | `false` | Announce modal opening |
| `accessibility.announcementText` | `string` | - | Custom announcement text |

### Focus Management Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `focus` | `ModalFocusConfig` | - | Focus management configuration |
| `focus.initialFocusRef` | `React.RefObject<HTMLElement>` | - | Initial focus element |
| `focus.restoreFocus` | `boolean` | `true` | Restore focus on close |
| `focus.trapFocus` | `boolean` | `true` | Trap focus within modal |

### Responsive Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `responsive` | `ModalResponsive` | - | Responsive configuration |
| `responsive.mobileSize` | `ModalSize` | - | Mobile-specific size |
| `responsive.fullScreenOnMobile` | `boolean` | `false` | Full screen on mobile |
| `responsive.disableBackdropOnMobile` | `boolean` | `false` | Disable backdrop on mobile |

### Native Dialog Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `native` | `boolean` | `false` | Use native HTML dialog element |
| `formMethod` | `"dialog" \| "get" \| "post"` | - | Form method for native dialog |
| `formAction` | `string` | - | Form action for native dialog |
| `returnValue` | `string` | - | Return value for native dialog |

### Event Handler Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onOpen` | `() => void` | - | Called when modal opens |
| `onBeforeOpen` | `() => void` | - | Called before modal opens |
| `onBeforeClose` | `() => void` | - | Called before modal closes |
| `onBackdropClick` | `(event: MouseEvent) => void` | - | Called when backdrop is clicked |
| `onEscapeKey` | `(event: KeyboardEvent) => void` | - | Called when Escape key is pressed |

### Legacy Props (Deprecated)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `React.ReactNode` | - | **Deprecated:** Use `header.title` instead |
| `showCloseButton` | `boolean` | `true` | **Deprecated:** Use `header.showCloseButton` instead |
| `initialFocusRef` | `React.RefObject<HTMLElement>` | - | **Deprecated:** Use `focus.initialFocusRef` instead |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong borders with subtle shadow for clear separation
- **Principle 3: Typography before decoration** - Clear hierarchy with bold titles and proper contrast
- **Principle 4: Tokens before magic numbers** - All values use design tokens for consistency
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with comprehensive focus management

### Modern UX Enhancements

- **Smooth Animations** - GPU-accelerated transitions with reduced motion support
- **Touch-Friendly** - 44px+ touch targets and mobile-optimized interactions
- **Responsive Design** - Adaptive sizing and placement for all screen sizes
- **Loading States** - Built-in loading indicators with custom support
- **Event System** - Comprehensive lifecycle callbacks for advanced use cases

## Accessibility Features

### WCAG AA+ Compliance

- **ARIA Support**: Uses `role="dialog"` and `aria-modal="true"`
- **Focus Management**: Traps focus within modal, restores focus on close
- **Screen Reader Support**: Title linked with `aria-labelledby`, custom announcements
- **Keyboard Navigation**: Full keyboard support with proper tab order
- **High Contrast**: Supports high contrast mode with enhanced borders
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

### Keyboard Navigation

- **Tab**: Navigate through focusable elements in modal
- **Shift + Tab**: Navigate backwards through focusable elements
- **Escape**: Close modal (if `closeOnEscape` is enabled)
- **Enter/Space**: Activate focused button or input
- **Arrow Keys**: Navigate within form elements (when applicable)

### Screen Reader Support

- **Announcements**: Optional modal opening announcements
- **Descriptions**: Support for `aria-describedby` with custom descriptions
- **Labels**: Custom `aria-label` support for complex modals
- **Live Regions**: Dynamic content updates are announced

## Performance Optimizations

### Technical Optimizations

- **GPU Acceleration**: Animations use `transform` and `opacity` for 60fps performance
- **Portal Rendering**: Renders outside DOM hierarchy to prevent layout thrashing
- **Lazy Loading**: Only renders when `isOpen` is true
- **Memory Management**: Proper cleanup of event listeners and timers
- **Reduced Motion**: Disables animations when user prefers reduced motion

### Best Practices

- Use `will-change` property for smooth animations
- Implement proper cleanup in `useEffect` hooks
- Avoid heavy computations in render functions
- Use `useCallback` for event handlers to prevent unnecessary re-renders

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: Full support for CSS Grid, Flexbox, and modern JavaScript APIs
- **Fallbacks**: Graceful degradation for older browsers

## Migration Guide

### From v0.3.x to v0.4.x

The Modal component has been significantly enhanced with new features while maintaining backward compatibility:

```tsx
// Old API (still supported)
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="My Modal"
  showCloseButton={true}
  initialFocusRef={inputRef}
>
  <p>Content</p>
</Modal>

// New API (recommended)
<Modal
  isOpen={isOpen}
  onClose={onClose}
  header={{
    title: "My Modal",
    showCloseButton: true
  }}
  focus={{
    initialFocusRef: inputRef
  }}
  animation={{ type: "slide", duration: 300 }}
  backdrop="blur"
>
  <p>Content</p>
</Modal>
```

### Breaking Changes

- None! All existing props continue to work
- Legacy props are marked as deprecated but fully functional
- New features are opt-in and don't affect existing behavior

## Related Components

- **Drawer** - For side panel overlays and navigation
- **Tooltip** - For small contextual information and help text
- **Popover** - For interactive floating content and menus
- **CommandPalette** - For command search interfaces
- **Alert** - For notification and status messages
- **Dialog** - For confirmation dialogs and simple prompts
