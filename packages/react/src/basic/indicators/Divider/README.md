# Divider

An accessible divider component for visual separation of content.

## Features

- Horizontal or vertical orientation
- Optional label with alignment
- Visual variants (solid, dashed, dotted)
- Thickness variants
- Semantic HTML with proper ARIA role
- Simple and clean design
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Divider } from "@spexop/react";

function App() {
  return (
    <div>
      <p>Content above</p>
      <Divider />
      <p>Content below</p>
    </div>
  );
}
```

## With Label

```tsx
{/* Center aligned (default) */}
<Divider label="OR" />

{/* Left aligned */}
<Divider label="Section 1" labelAlign="left" />

{/* Right aligned */}
<Divider label="End" labelAlign="right" />
```

## Orientation

```tsx
{/* Horizontal (default) */}
<Divider />

{/* Vertical */}
<div style={{ display: 'flex', height: '100px', alignItems: 'center' }}>
  <div>Left</div>
  <Divider orientation="vertical" />
  <div>Right</div>
</div>
```

## Variants

```tsx
{/* Solid (default) */}
<Divider variant="solid" />

{/* Dashed */}
<Divider variant="dashed" />

{/* Dotted */}
<Divider variant="dotted" />
```

## Thickness

```tsx
{/* Thin */}
<Divider thickness="thin" />

{/* Normal (default) */}
<Divider thickness="normal" />

{/* Thick */}
<Divider thickness="thick" />
```

## Login Form Example

```tsx
<form>
  <input type="email" placeholder="Email" />
  <input type="password" placeholder="Password" />
  <button>Sign In</button>
  
  <Divider label="OR" />
  
  <button>Continue with Google</button>
  <button>Continue with GitHub</button>
</form>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Divider orientation |
| `label` | `React.ReactNode` | - | Label to display |
| `labelAlign` | `"left" \| "center" \| "right"` | `"center"` | Label alignment |
| `variant` | `"solid" \| "dashed" \| "dotted"` | `"solid"` | Visual variant |
| `thickness` | `"thin" \| "normal" \| "thick"` | `"normal"` | Divider thickness |
| `className` | `string` | - | Additional CSS class |
| `role` | `string` | `"separator"` | ARIA role |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Simple border-based divider
- **Principle 3: Typography before decoration** - Clear, readable labels
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - Proper semantic role

## Accessibility

- Uses semantic `<hr>` element for basic dividers
- Proper `role="separator"` for ARIA
- `aria-orientation` attribute
- Screen reader friendly
- High contrast colors

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Accordion - For collapsible sections
- Tabs - For content sections
- Card - For content containers
