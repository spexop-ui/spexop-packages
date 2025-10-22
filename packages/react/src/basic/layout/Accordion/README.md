# Accordion

An accessible accordion component for collapsible content sections.

## Features

- Keyboard accessible (Arrow keys, Home, End, Space, Enter)
- Screen reader accessible with ARIA
- Single or multiple expand modes
- Size variants
- Visual variants (default, bordered, separated)
- Disabled items
- Controlled and uncontrolled modes
- Smooth animations
- Reduced motion support
- WCAG AA+ compliant

## Installation

```bash
pnpm add @spexop/react
```

## Basic Usage

```tsx
import { Accordion } from "@spexop/react";

const items = [
  { 
    id: '1', 
    title: 'What is Spexop?', 
    content: <p>Spexop is a primitives-first design system.</p> 
  },
  { 
    id: '2', 
    title: 'How do I get started?', 
    content: <p>Install the package and import components.</p> 
  },
];

function App() {
  return <Accordion items={items} />;
}
```

## Allow Multiple Open

```tsx
<Accordion items={items} allowMultiple />
```

## Sizes

```tsx
{/* Small */}
<Accordion items={items} size="sm" />

{/* Medium (default) */}
<Accordion items={items} size="md" />

{/* Large */}
<Accordion items={items} size="lg" />
```

## Variants

```tsx
{/* Default */}
<Accordion items={items} variant="default" />

{/* Bordered */}
<Accordion items={items} variant="bordered" />

{/* Separated */}
<Accordion items={items} variant="separated" />
```

## Disabled Items

```tsx
const items = [
  { id: '1', title: 'Enabled', content: <p>Content</p> },
  { id: '2', title: 'Disabled', content: <p>Content</p>, disabled: true },
];

<Accordion items={items} />
```

## Controlled Mode

```tsx
import { useState } from "react";

function App() {
  const [expandedItems, setExpandedItems] = useState(['1']);

  return (
    <Accordion 
      items={items}
      expandedItems={expandedItems}
      onExpandedChange={setExpandedItems}
      allowMultiple
    />
  );
}
```

## Default Expanded

```tsx
<Accordion items={items} defaultExpandedItems={['1', '2']} allowMultiple />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | required | Accordion items |
| `expandedItems` | `string[]` | - | Expanded IDs (controlled) |
| `onExpandedChange` | `(items: string[]) => void` | - | Expand callback |
| `defaultExpandedItems` | `string[]` | `[]` | Default expanded IDs |
| `allowMultiple` | `boolean` | `false` | Allow multiple open |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `variant` | `"default" \| "bordered" \| "separated"` | `"default"` | Visual variant |
| `className` | `string` | - | Additional CSS class |

### AccordionItem Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier |
| `title` | `React.ReactNode` | Yes | Item title |
| `content` | `React.ReactNode` | Yes | Item content |
| `disabled` | `boolean` | No | Whether disabled |

## Design Principles

This component follows "The Spexop Way":

- **Principle 2: Borders before shadows** - Strong borders for clear separation
- **Principle 3: Typography before decoration** - Bold titles for hierarchy
- **Principle 4: Tokens before magic numbers** - All values use design tokens
- **Principle 7: Accessibility before aesthetics** - WCAG AA+ compliant with full keyboard support

## Accessibility

- Uses proper ARIA attributes (`aria-expanded`, `aria-controls`)
- Semantic `role="region"` for panels
- Keyboard navigation with arrow keys
- Home/End keys for first/last items
- Focus visible indicators
- Screen reader friendly
- Hidden panels use `hidden` attribute

## Keyboard Navigation

- **Space/Enter**: Toggle item
- **Arrow Down**: Next item
- **Arrow Up**: Previous item
- **Home**: First item
- **End**: Last item

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- Tabs - For horizontal content navigation
- Dropdown - For menu actions
- Disclosure - For simple show/hide
