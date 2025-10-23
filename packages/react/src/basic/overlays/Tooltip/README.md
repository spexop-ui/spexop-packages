# Tooltip

A modern, accessible tooltip component that provides contextual information on hover or focus, following "The Spexop Way" design principles.

## Features

- **Smart positioning** with collision detection and automatic flipping
- **Modern animations** with spring-based transitions and multiple animation types
- **Enhanced accessibility** with focus management and screen reader support
- **Responsive design** with mobile optimizations and touch support
- **Portal rendering** for better z-index management
- **Multiple placement options** with start/end variants
- **Size variants** (sm, md, lg, auto)
- **Customizable animations** (fade, scale, slide, zoom, none)
- **Keyboard navigation** with Escape key support
- **Touch device support** with mobile-specific delays
- **WCAG AA+ compliant** with high contrast and proper ARIA attributes

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Tooltip } from "@spexop/react";

function App() {
  return (
    <Tooltip content="This is helpful information">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Placement Options

### Basic Placements

```tsx
<Tooltip content="Top tooltip" placement="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
  <button>Right</button>
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <button>Bottom</button>
</Tooltip>

<Tooltip content="Left tooltip" placement="left">
  <button>Left</button>
</Tooltip>
```

### Start/End Variants

```tsx
<Tooltip content="Top start" placement="top-start">
  <button>Top Start</button>
</Tooltip>

<Tooltip content="Top end" placement="top-end">
  <button>Top End</button>
</Tooltip>

<Tooltip content="Right start" placement="right-start">
  <button>Right Start</button>
</Tooltip>

<Tooltip content="Right end" placement="right-end">
  <button>Right End</button>
</Tooltip>
```

## Size Variants

```tsx
<Tooltip content="Small tooltip" size="sm">
  <button>Small</button>
</Tooltip>

<Tooltip content="Medium tooltip" size="md">
  <button>Medium</button>
</Tooltip>

<Tooltip content="Large tooltip" size="lg">
  <button>Large</button>
</Tooltip>

<Tooltip content="Auto width" size="auto">
  <button>Auto</button>
</Tooltip>
```

## Animations

```tsx
<Tooltip 
  content="Fade animation" 
  animation={{ type: "fade", duration: 300 }}
>
  <button>Fade</button>
</Tooltip>

<Tooltip 
  content="Scale animation" 
  animation={{ type: "scale", duration: 200 }}
>
  <button>Scale</button>
</Tooltip>

<Tooltip 
  content="Slide animation" 
  animation={{ type: "slide", duration: 250 }}
>
  <button>Slide</button>
</Tooltip>

<Tooltip 
  content="Zoom animation" 
  animation={{ type: "zoom", duration: 150 }}
>
  <button>Zoom</button>
</Tooltip>
```

## Smart Positioning

```tsx
<Tooltip 
  content="Smart positioning with collision detection"
  positioning={{ 
    smart: true, 
    offset: 12, 
    flip: true, 
    shift: true 
  }}
>
  <button>Smart</button>
</Tooltip>
```

## Responsive Behavior

```tsx
<Tooltip 
  content="Responsive tooltip"
  responsive={{
    mobilePlacement: "bottom",
    mobileSize: "lg",
    disableOnMobile: false
  }}
>
  <button>Responsive</button>
</Tooltip>
```

## Portal Rendering

```tsx
<Tooltip 
  content="Rendered in portal"
  portal={true}
  portalContainer={document.getElementById('tooltip-root')}
>
  <button>Portal</button>
</Tooltip>
```

## With Delay

```tsx
<Tooltip content="Shows after 500ms" delay={500}>
  <button>Delayed tooltip</button>
</Tooltip>

<Tooltip 
  content="Different delays for mobile" 
  delay={300}
  mobileDelay={100}
>
  <button>Mobile optimized</button>
</Tooltip>
```

## Without Arrow

```tsx
<Tooltip content="No arrow" showArrow={false}>
  <button>No arrow</button>
</Tooltip>
```

## Complex Content

```tsx
<Tooltip 
  content={
    <div>
      <strong>Title</strong>
      <p>Detailed description here</p>
      <button>Action</button>
    </div>
  }
>
  <button>Rich content</button>
</Tooltip>
```

## Accessibility Features

```tsx
<Tooltip 
  content="Accessible tooltip"
  accessibility={{
    ariaLabel: "Custom tooltip label",
    announceToScreenReader: true
  }}
>
  <button>Accessible</button>
</Tooltip>
```

## Event Handlers

```tsx
<Tooltip 
  content="With event handlers"
  onOpen={() => console.log('Tooltip opened')}
  onClose={() => console.log('Tooltip closed')}
  onBeforeOpen={() => console.log('About to open')}
  onBeforeClose={() => console.log('About to close')}
>
  <button>Events</button>
</Tooltip>
```

## Disabled State

```tsx
<Tooltip content="This won't show" disabled>
  <button>Disabled tooltip</button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactElement` | required | Element to wrap with tooltip |
| `content` | `React.ReactNode` | required | Tooltip content |
| `placement` | `TooltipPlacement` | `"top"` | Tooltip placement with start/end variants |
| `size` | `"sm" \| "md" \| "lg" \| "auto"` | `"md"` | Size variant |
| `delay` | `number` | `300` | Delay before showing (ms) |
| `mobileDelay` | `number` | `0` | Delay before showing on mobile (ms) |
| `disabled` | `boolean` | `false` | Whether tooltip is disabled |
| `showArrow` | `boolean` | `true` | Whether to show arrow pointer |
| `animation` | `TooltipAnimationConfig` | `{ type: "scale", duration: 200 }` | Animation configuration |
| `positioning` | `TooltipPositioning` | `{ smart: true, offset: 8, flip: true, shift: true }` | Positioning configuration |
| `responsive` | `TooltipResponsive` | `{}` | Responsive behavior configuration |
| `accessibility` | `TooltipAccessibility` | `{}` | Accessibility configuration |
| `portal` | `boolean` | `false` | Whether to render in portal |
| `portalContainer` | `Element \| null` | `document.body` | Portal container element |
| `className` | `string` | - | Additional CSS class for tooltip |
| `triggerClassName` | `string` | - | Additional CSS class for trigger |
| `id` | `string` | auto-generated | ID for accessibility |
| `style` | `React.CSSProperties` | - | Custom styles |
| `onOpen` | `() => void` | - | Called when tooltip opens |
| `onClose` | `() => void` | - | Called when tooltip closes |
| `onBeforeOpen` | `() => void` | - | Called before tooltip opens |
| `onBeforeClose` | `() => void` | - | Called before tooltip closes |

### TooltipPlacement

```tsx
type TooltipPlacement = 
  | "top" | "top-start" | "top-end"
  | "right" | "right-start" | "right-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end";
```

### TooltipAnimationConfig

```tsx
interface TooltipAnimationConfig {
  type?: "fade" | "scale" | "slide" | "zoom" | "none";
  duration?: number;
  easing?: string;
}
```

### TooltipPositioning

```tsx
interface TooltipPositioning {
  smart?: boolean;
  offset?: number;
  flip?: boolean;
  shift?: boolean;
  boundary?: Element | "viewport" | "clippingParents";
}
```

### TooltipResponsive

```tsx
interface TooltipResponsive {
  mobilePlacement?: TooltipPlacement;
  mobileSize?: "sm" | "md" | "lg" | "auto";
  disableOnMobile?: boolean;
}
```

### TooltipAccessibility

```tsx
interface TooltipAccessibility {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  announceToScreenReader?: boolean;
}
```

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Subtle border with minimal shadow for depth
- **Principle 3: Typography before decoration** - Clear, readable text
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with high contrast

## Accessibility

- Uses `aria-describedby` to associate tooltip with trigger
- Shows on both hover and keyboard focus
- Supports Escape key to close
- High contrast text (WCAG AAA)
- Screen reader friendly
- Keyboard navigation support
- Touch device support

## Keyboard Navigation

- **Tab**: Focus on trigger element (shows tooltip)
- **Escape**: Hide tooltip
- **Shift + Tab**: Move to previous element (hides tooltip)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Modal - For larger content that requires interaction
- Popover - For interactive content in an overlay
- Snackbar - For temporary notifications
