# Popover

A modern, accessible popover component for displaying rich content in an overlay with enhanced UX patterns.

## Features

- **Multiple trigger types** - Click, hover, focus, or manual control
- **Smart positioning** - Collision detection and auto-adjustment
- **Modern animations** - Smooth transitions with reduced motion support
- **Enhanced accessibility** - WCAG AA+ compliant with focus management
- **Responsive design** - Mobile optimizations and adaptive behavior
- **Portal rendering** - Better z-index management
- **Screen reader support** - Automatic announcements and ARIA attributes
- **Keyboard navigation** - Full keyboard support with focus trapping
- **Multiple placements** - 12 placement options with auto-adjustment
- **Backdrop support** - Blur effects and click-to-close
- **Controlled modes** - Both controlled and uncontrolled usage
- **Theme integration** - Full Spexop design system support

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Popover } from "@spexop/react";

function App() {
  return (
    <Popover 
      trigger={<button>Click me</button>}
      title="Popover Title"
      placement="bottom"
    >
      <div>Popover content here</div>
    </Popover>
  );
}
```

## With Title and Subtitle

```tsx
<Popover 
  trigger={<button>Info</button>}
  title="Additional Information"
  subtitle="Learn more about this feature"
>
  <p>This is some helpful information about the feature.</p>
</Popover>
```

## Placement

The Popover supports 12 different placement options:

```tsx
{/* Basic placements */}
<Popover trigger={<button>Top</button>} placement="top">
  <div>Content</div>
</Popover>

<Popover trigger={<button>Right</button>} placement="right">
  <div>Content</div>
</Popover>

<Popover trigger={<button>Bottom</button>} placement="bottom">
  <div>Content</div>
</Popover>

<Popover trigger={<button>Left</button>} placement="left">
  <div>Content</div>
</Popover>

{/* Aligned placements */}
<Popover trigger={<button>Top Start</button>} placement="top-start">
  <div>Content</div>
</Popover>

<Popover trigger={<button>Top End</button>} placement="top-end">
  <div>Content</div>
</Popover>

<Popover trigger={<button>Bottom Start</button>} placement="bottom-start">
  <div>Content</div>
</Popover>

<Popover trigger={<button>Bottom End</button>} placement="bottom-end">
  <div>Content</div>
</Popover>
```

## Trigger Types

### Click Trigger (Default)

```tsx
<Popover 
  trigger={<button>Click me</button>}
  triggerType="click"
>
  <div>Shows on click</div>
</Popover>
```

### Hover Trigger

```tsx
<Popover 
  trigger={<button>Hover me</button>}
  triggerType="hover"
  hoverDelay={200}
  hoverCloseDelay={300}
>
  <div>Shows on hover</div>
</Popover>
```

### Focus Trigger

```tsx
<Popover 
  trigger={<input placeholder="Focus me" />}
  triggerType="focus"
  closeOnBlur={true}
>
  <div>Shows on focus</div>
</Popover>
```

### Manual Trigger

```tsx
<Popover 
  trigger={<button>Manual</button>}
  triggerType="manual"
  isOpen={isOpen}
  onOpenChange={setIsOpen}
>
  <div>Controlled manually</div>
</Popover>
```

## Size Variants

```tsx
{/* Small */}
<Popover trigger={<button>Small</button>} size="sm">
  <div>Compact content</div>
</Popover>

{/* Medium (default) */}
<Popover trigger={<button>Medium</button>} size="md">
  <div>Standard content</div>
</Popover>

{/* Large */}
<Popover trigger={<button>Large</button>} size="lg">
  <div>Extended content</div>
</Popover>

{/* Extra Large */}
<Popover trigger={<button>XL</button>} size="xl">
  <div>Maximum content</div>
</Popover>

{/* Auto size */}
<Popover trigger={<button>Auto</button>} size="auto">
  <div>Content determines size</div>
</Popover>
```

## Animations

```tsx
{/* Scale animation (default) */}
<Popover 
  trigger={<button>Scale</button>}
  animation={{ type: "scale", duration: 200 }}
>
  <div>Content</div>
</Popover>

{/* Fade animation */}
<Popover 
  trigger={<button>Fade</button>}
  animation={{ type: "fade", duration: 150 }}
>
  <div>Content</div>
</Popover>

{/* Slide animation */}
<Popover 
  trigger={<button>Slide</button>}
  animation={{ type: "slide", duration: 250 }}
>
  <div>Content</div>
</Popover>

{/* Custom timing */}
<Popover 
  trigger={<button>Bounce</button>}
  animation={{ 
    type: "scale", 
    duration: 300, 
    timing: "bounce" 
  }}
>
  <div>Content</div>
</Popover>

{/* Disable animation */}
<Popover 
  trigger={<button>No Animation</button>}
  animation={{ disabled: true }}
>
  <div>Content</div>
</Popover>
```

## Without Arrow

```tsx
<Popover 
  trigger={<button>No arrow</button>}
  showArrow={false}
>
  <div>Content</div>
</Popover>
```

## Controlled Mode

```tsx
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover 
      trigger={<button>Toggle</button>}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onOpen={() => console.log("Opened")}
      onClose={() => console.log("Closed")}
    >
      <div>Controlled content</div>
    </Popover>
  );
}
```

## Responsive Design

```tsx
<Popover 
  trigger={<button>Responsive</button>}
  placement="bottom"
  responsive={{
    mobilePlacement: "top",
    mobileSize: "lg",
    fullWidthOnMobile: true,
    disableBackdropOnMobile: false
  }}
>
  <div>Adapts to mobile screens</div>
</Popover>
```

## Portal Rendering

```tsx
<Popover 
  trigger={<button>Portal</button>}
  portal={true}
  portalContainer={document.getElementById("modal-root")}
>
  <div>Rendered in portal</div>
</Popover>
```

## Accessibility Features

```tsx
<Popover 
  trigger={<button>Accessible</button>}
  accessibility={{
    "aria-label": "User information popover",
    announceOnOpen: true,
    announcementMessage: "User details displayed"
  }}
  focus={{
    strategy: "first",
    trapFocus: true,
    restoreFocus: true
  }}
>
  <div>Accessible content</div>
</Popover>
```

## Positioning Options

```tsx
<Popover 
  trigger={<button>Smart Position</button>}
  positioning={{
    smart: true,
    offset: 12,
    flip: true,
    shift: true,
    autoPlacement: true,
    boundary: "viewport"
  }}
>
  <div>Smart positioning</div>
</Popover>
```

## Rich Content Example

```tsx
<Popover 
  trigger={<button>User Info</button>}
  title="John Doe"
>
  <div>
    <p><strong>Email:</strong> john@example.com</p>
    <p><strong>Role:</strong> Developer</p>
    <button>View Profile</button>
  </div>
</Popover>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `React.ReactElement` | required | Trigger element |
| `children` | `React.ReactNode` | - | Popover content |
| `title` | `React.ReactNode` | - | Popover title |
| `subtitle` | `React.ReactNode` | - | Popover subtitle |
| `placement` | `PopoverPlacement` | `"bottom"` | Placement (12 options) |
| `isOpen` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(isOpen: boolean) => void` | - | Open state callback |
| `triggerType` | `PopoverTriggerType` | `"click"` | Trigger type |
| `showArrow` | `boolean` | `true` | Show arrow pointer |
| `size` | `PopoverSize` | `"md"` | Popover size |
| `animation` | `PopoverAnimationConfig` | `{ type: "scale", duration: 200 }` | Animation config |
| `positioning` | `PopoverPositioning` | `{ smart: true, offset: 8 }` | Positioning config |
| `responsive` | `PopoverResponsive` | `{}` | Responsive behavior |
| `accessibility` | `PopoverAccessibility` | `{}` | Accessibility config |
| `focus` | `PopoverFocus` | `{ strategy: "auto" }` | Focus management |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `closeOnOutsideClick` | `boolean` | `true` | Close on outside click |
| `closeOnBlur` | `boolean` | `true` | Close on trigger blur |
| `hoverDelay` | `number` | `0` | Hover delay in ms |
| `hoverCloseDelay` | `number` | `0` | Hover close delay in ms |
| `portal` | `boolean` | `false` | Render in portal |
| `portalContainer` | `HTMLElement` | `document.body` | Portal container |
| `className` | `string` | - | Additional CSS class |
| `triggerClassName` | `string` | - | CSS class for trigger |
| `backdropClassName` | `string` | - | CSS class for backdrop |
| `style` | `React.CSSProperties` | - | Custom styles |
| `backdropStyle` | `React.CSSProperties` | - | Custom backdrop styles |
| `onOpen` | `() => void` | - | Called when opened |
| `onClose` | `() => void` | - | Called when closed |
| `onBeforeOpen` | `() => void` | - | Called before opening |
| `onBeforeClose` | `() => void` | - | Called before closing |
| `onEscapeKey` | `() => void` | - | Called on Escape key |
| `onOutsideClick` | `() => void` | - | Called on outside click |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong borders with subtle shadow
- **Principle 3: Typography before decoration** - Clear hierarchy with bold title
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with full keyboard support

## Accessibility

- **ARIA Support**: Uses `role="dialog"` with proper ARIA attributes
- **Screen Reader**: Automatic announcements and live regions
- **Keyboard Navigation**: Full keyboard support with focus management
- **Focus Management**: Focus trap, restoration, and initial focus control
- **High Contrast**: Enhanced visibility in high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Touch Friendly**: Optimized for touch devices

## Keyboard Navigation

- **Click/Enter/Space**: Open popover (if click trigger)
- **Escape**: Close popover and restore focus
- **Tab**: Navigate through interactive content
- **Arrow Keys**: Navigate within popover content
- **Focus**: Open popover (if focus trigger)
- **Blur**: Close popover (if focus trigger with closeOnBlur)

## Performance

- **GPU Acceleration**: Hardware-accelerated animations
- **Lazy Rendering**: Only renders when needed
- **Memory Efficient**: Proper cleanup of event listeners
- **SSR Safe**: Server-side rendering compatible
- **Bundle Size**: Optimized with tree-shaking support

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Tooltip - For simple hover information
- Dropdown - For menu actions
- Modal - For larger overlay content
