# ButtonGroup Component

**Modern container for grouped buttons with enhanced UX and accessibility.**

**component** ButtonGroup
**packageName** @spexop/react
**description** Container for grouped buttons with shared borders
**author** @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
**version** 0.3.0
**since** 2025-10-13
**updated** 2025-01-20 - Modern UI/UX improvements

---

## Features

- ✅ **2 Directions**: Horizontal (row) and Vertical (column)
- ✅ **Compact Mode**: Smaller padding for dense UIs
- ✅ **Shared Borders**: Connected buttons with internal borders
- ✅ **Active States**: Highlight selected buttons with modern animations
- ✅ **Enhanced Accessibility**: WCAG AAA compliance, arrow key navigation
- ✅ **Modern Interactions**: Ripple effects, smooth transitions, micro-animations
- ✅ **Foundation-Aligned**: Uses spacing tokens, semantic colors
- ✅ **Responsive**: Horizontal scroll on mobile with modern scrollbars
- ✅ **Performance Optimized**: GPU acceleration, reduced motion support
- ✅ **Forward Ref Support**: Full ref forwarding for advanced use cases

---

## Installation

```bash
pnpm add @spexop/react
```

---

## Basic Usage

```tsx
import { ButtonGroup, Button } from '@spexop/react';

function MyComponent() {
  return (
    <ButtonGroup direction="horizontal" aria-label="Text formatting">
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>
  );
}
```

---

## Directions

### Horizontal (Default)

Buttons arranged in a row:

```tsx
import { ButtonGroup, Button } from '@spexop/react';
import { Bold, Italic, Underline } from '@spexop/icons';

<ButtonGroup direction="horizontal" aria-label="Text formatting">
  <Button iconOnly aria-label="Bold text">
    <Bold size={20} />
  </Button>
  <Button iconOnly aria-label="Italic text">
    <Italic size={20} />
  </Button>
  <Button iconOnly aria-label="Underline text">
    <Underline size={20} />
  </Button>
</ButtonGroup>
```

### Vertical

Buttons stacked vertically:

```tsx
import { ButtonGroup, Button } from '@spexop/react';
import { Home, FileText, Settings } from '@spexop/icons';

<ButtonGroup direction="vertical" aria-label="Navigation menu">
  <Button>
    <Home size={20} />
    <span>Home</span>
  </Button>
  <Button>
    <FileText size={20} />
    <span>Documents</span>
  </Button>
  <Button>
    <Settings size={20} />
    <span>Settings</span>
  </Button>
</ButtonGroup>
```

---

## Compact Mode

For toolbars and dense UIs:

```tsx
import { ButtonGroup, Button } from '@spexop/react';
import { Copy, Paste, Cut } from '@spexop/icons';

// Horizontal + Compact
<ButtonGroup direction="horizontal" compact aria-label="Clipboard actions">
  <Button iconOnly aria-label="Copy">
    <Copy size={16} />
  </Button>
  <Button iconOnly aria-label="Paste">
    <Paste size={16} />
  </Button>
  <Button iconOnly aria-label="Cut">
    <Cut size={16} />
  </Button>
</ButtonGroup>

// Vertical + Compact
<ButtonGroup direction="vertical" compact aria-label="Quick actions">
  <Button compact="sm">New</Button>
  <Button compact="sm">Edit</Button>
  <Button compact="sm">Delete</Button>
</ButtonGroup>
```

---

## With Active States

```tsx
import { ButtonGroup, Button } from '@spexop/react';
import { useState } from 'react';

function AlignmentButtons() {
  const [align, setAlign] = useState('left');

  return (
    <ButtonGroup direction="horizontal" aria-label="Text alignment">
      <Button 
        aria-pressed={align === 'left'}
        onClick={() => setAlign('left')}
      >
        Left
      </Button>
      <Button 
        aria-pressed={align === 'center'}
        onClick={() => setAlign('center')}
      >
        Center
      </Button>
      <Button 
        aria-pressed={align === 'right'}
        onClick={() => setAlign('right')}
      >
        Right
      </Button>
    </ButtonGroup>
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Button elements to group |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `compact` | `boolean` | `false` | Compact mode (smaller padding) |
| `className` | `string` | - | Additional CSS class |
| `role` | `AriaRole` | `'group'` | ARIA role |
| `aria-label` | `string` | required | ARIA label describing the group |
| `aria-labelledby` | `string` | - | Alternative to aria-label |
| `aria-describedby` | `string` | - | Additional context description |
| `aria-orientation` | `'horizontal' \| 'vertical'` | auto | ARIA orientation (auto-set) |
| `onKeyDown` | `(event: KeyboardEvent) => void` | - | Enhanced keyboard handler |
| `ref` | `Ref<HTMLDivElement>` | - | Forward ref support |

---

## Examples

### Toolbar with Icon-Only Buttons

```tsx
import { ButtonGroup, Button } from '@spexop/react';
import { Bold, Italic, Underline, Strikethrough } from '@spexop/icons';

<ButtonGroup direction="horizontal" aria-label="Text formatting toolbar">
  <Button iconOnly aria-label="Bold text">
    <Bold size={20} />
  </Button>
  <Button iconOnly aria-label="Italic text">
    <Italic size={20} />
  </Button>
  <Button iconOnly aria-label="Underline text">
    <Underline size={20} />
  </Button>
  <Button iconOnly aria-label="Strikethrough text">
    <Strikethrough size={20} />
  </Button>
</ButtonGroup>
```

### Vertical Navigation

```tsx
import { ButtonGroup, Button } from '@spexop/react';
import { Home, FileText, Settings, User } from '@spexop/icons';

<ButtonGroup direction="vertical" aria-label="Main navigation">
  <Button>
    <Home size={20} />
    <span>Home</span>
  </Button>
  <Button aria-pressed={true}>
    <FileText size={20} />
    <span>Documents</span>
  </Button>
  <Button>
    <Settings size={20} />
    <span>Settings</span>
  </Button>
  <Button>
    <User size={20} />
    <span>Profile</span>
  </Button>
</ButtonGroup>
```

### Alignment Controls

```tsx
import { ButtonGroup, Button } from '@spexop/react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from '@spexop/icons';

<ButtonGroup direction="horizontal" aria-label="Text alignment">
  <Button iconOnly aria-label="Align left">
    <AlignLeft size={20} />
  </Button>
  <Button iconOnly aria-label="Align center">
    <AlignCenter size={20} />
  </Button>
  <Button iconOnly aria-label="Align right">
    <AlignRight size={20} />
  </Button>
  <Button iconOnly aria-label="Justify">
    <AlignJustify size={20} />
  </Button>
</ButtonGroup>
```

### Compact Toolbar

```tsx
import { ButtonGroup, Button } from '@spexop/react';
import { Plus, Edit, Trash, Download } from '@spexop/icons';

<ButtonGroup direction="horizontal" compact aria-label="Item actions">
  <Button compact="sm" iconOnly aria-label="Add item">
    <Plus size={16} />
  </Button>
  <Button compact="sm" iconOnly aria-label="Edit item">
    <Edit size={16} />
  </Button>
  <Button compact="sm" iconOnly aria-label="Delete item">
    <Trash size={16} />
  </Button>
  <Button compact="sm" iconOnly aria-label="Download item">
    <Download size={16} />
  </Button>
</ButtonGroup>
```

---

## Modern Features

### Enhanced Keyboard Navigation

The ButtonGroup now supports advanced keyboard navigation:

```tsx
<ButtonGroup aria-label="Text formatting">
  <Button>Bold</Button>
  <Button>Italic</Button>
  <Button>Underline</Button>
</ButtonGroup>
```

**Keyboard Controls**:

- **Tab**: Navigate between button groups
- **Arrow Keys**: Navigate within the group (horizontal: left/right, vertical: up/down)
- **Enter/Space**: Activate focused button
- **Wrapping**: Arrow keys wrap around at boundaries
- **Disabled Skip**: Automatically skips disabled buttons

### Ripple Effects

Modern ripple effects provide visual feedback on interaction:

```tsx
<ButtonGroup aria-label="Actions">
  <Button onClick={handleClick}>Click for Ripple</Button>
</ButtonGroup>
```

**Features**:

- **Position-aware**: Ripple originates from click point
- **Smooth animation**: 300ms ease transition
- **Accessible**: Hidden from screen readers
- **Performance optimized**: GPU accelerated

### Micro-Interactions

Subtle animations enhance the user experience:

- **Hover**: Subtle lift effect with shadow
- **Active**: Press feedback with scale
- **Focus**: Enhanced focus indicators
- **Transitions**: Smooth 200ms cubic-bezier easing

---

## Accessibility

### Required ARIA Attributes

```tsx
// ✅ CORRECT - aria-label is required
<ButtonGroup aria-label="Text formatting">
  <Button>Bold</Button>
  <Button>Italic</Button>
</ButtonGroup>

// ❌ INCORRECT - Missing aria-label
<ButtonGroup>
  <Button>Bold</Button>
  <Button>Italic</Button>
</ButtonGroup>

// ✅ CORRECT - Using aria-labelledby instead
<ButtonGroup aria-labelledby="formatting-label">
  <span id="formatting-label">Text Formatting</span>
  <Button>Bold</Button>
  <Button>Italic</Button>
</ButtonGroup>
```

### Enhanced Keyboard Navigation Features

- **Tab**: Navigate between button groups
- **Arrow Keys**: Navigate within group (with wrapping)
- **Enter/Space**: Activate focused button
- **Focus indicators**: 2px outline with 2px offset
- **High contrast**: 3px outline in high contrast mode

### Active States

```tsx
// Use aria-pressed for toggle behavior
<ButtonGroup direction="horizontal" aria-label="View mode">
  <Button aria-pressed={view === 'list'}>List</Button>
  <Button aria-pressed={view === 'grid'}>Grid</Button>
  <Button aria-pressed={view === 'table'}>Table</Button>
</ButtonGroup>

// Or use .active class (if using CSS Modules)
<ButtonGroup direction="horizontal" aria-label="Options">
  <Button className={isActive1 ? 'active' : ''}>Option 1</Button>
  <Button className={isActive2 ? 'active' : ''}>Option 2</Button>
</ButtonGroup>
```

---

## Foundation Integration

### With Stack

```tsx
import { Stack, ButtonGroup, Button } from '@spexop/react';

<Stack direction="vertical" gap={4}>
  <h3>Formatting Tools</h3>
  
  <ButtonGroup direction="horizontal" aria-label="Text formatting">
    <Button>Bold</Button>
    <Button>Italic</Button>
    <Button>Underline</Button>
  </ButtonGroup>
  
  <ButtonGroup direction="horizontal" aria-label="Alignment">
    <Button>Left</Button>
    <Button>Center</Button>
    <Button>Right</Button>
  </ButtonGroup>
</Stack>
```

### In Sidebar

```tsx
import { Sidebar, ButtonGroup, Button } from '@spexop/react';

<Sidebar>
  <ButtonGroup direction="vertical" aria-label="Main navigation">
    <Button>Home</Button>
    <Button>Documents</Button>
    <Button>Settings</Button>
  </ButtonGroup>
</Sidebar>
```

---

## Design Tokens Used

```css
/* Spacing */
--s-spacing-2: 8px   /* Compact padding */
--s-spacing-3: 12px  /* Default padding */
--s-spacing-4: 16px  /* Default padding (horizontal) */

/* Colors */
--s-color-border-strong: #d4d4d4  /* Container border */
--s-color-surface: #ffffff         /* Button background */
--s-color-text: #171717            /* Button text */
--s-color-hover-bg: #f5f5f5        /* Hover state */
--s-color-primary-500: #ef4444     /* Active state */

/* Border Radius */
--s-radius-md: 6px                 /* Container corners */

/* Typography */
--s-font-size-sm: 14px             /* Compact mode */
--s-font-size-base: 16px           /* Default size */

/* Transitions */
--s-transition-fast: 150ms ease-in-out
```

---

## Best Practices

### ✅ DO

```tsx
// Use with Button components
<ButtonGroup direction="horizontal" aria-label="Actions">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</ButtonGroup>

// Provide aria-label
<ButtonGroup aria-label="Text formatting">
  <Button>Bold</Button>
</ButtonGroup>

// Use compact for toolbars
<ButtonGroup compact aria-label="Toolbar">
  <Button compact="sm">New</Button>
  <Button compact="sm">Edit</Button>
</ButtonGroup>

// Use aria-pressed for active states
<Button aria-pressed={isActive}>Option</Button>
```

### ❌ DON'T

```tsx
// Don't forget aria-label
<ButtonGroup>  {/* Missing aria-label! */}
  <Button>Item 1</Button>
</ButtonGroup>

// Don't nest button groups
<ButtonGroup>
  <ButtonGroup>  {/* Don't nest! */}
    <Button>Item</Button>
  </ButtonGroup>
</ButtonGroup>

// Don't use with non-button children
<ButtonGroup aria-label="Mixed content">
  <Button>Button</Button>
  <div>Not a button</div>  {/* Not recommended */}
</ButtonGroup>
```

---

## Responsive Behavior

### Mobile

On mobile (< 768px), horizontal button groups:

- Allow horizontal scrolling if overflow
- Use touch scrolling for smooth interaction

```css
@media (max-width: 768px) {
  .horizontal {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
```

### Recommendations

- Use vertical direction for mobile navigation
- Limit horizontal groups to 3-5 items on mobile
- Consider compact mode for small screens

---

## TypeScript

Full TypeScript support:

```tsx
import type { ButtonGroupProps } from '@spexop/react';

const MyButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  return <ButtonGroup {...props} />;
};
```

---

## Related Components

- **Button**: Individual button component
- **SegmentedButton**: Radio-style button selection
- **SplitButton**: Action + dropdown combination

---

## Testing

### Keyboard Testing

- [ ] Tab navigates between buttons
- [ ] Enter/Space activates button
- [ ] All buttons focusable individually
- [ ] Focus indicators visible

### Visual Testing

- [ ] Horizontal direction shows row
- [ ] Vertical direction shows column
- [ ] Borders appear between buttons
- [ ] No border on last button
- [ ] Compact mode reduces padding
- [ ] Active states highlight correctly

### Screen Reader Testing

- [ ] Group purpose announced (aria-label)
- [ ] Button labels announced
- [ ] Active states communicated

---

## Design System Alignment

This component follows **Spexop's Refined Minimalism** principles:

1. ✅ **Border-based separation** - Shared 2px borders between buttons
2. ✅ **Typography-driven** - Clean button labels
3. ✅ **High-contrast** - Active states clearly visible
4. ✅ **Primitives-first** - Uses spacing tokens
5. ✅ **Token-based** - All values from design system

---

## Performance

- **Bundle Size**: ~1.2KB (gzipped)
- **Render Time**: < 16ms
- **No Runtime Dependencies**: Pure React
- **GPU Acceleration**: Hardware-accelerated animations
- **Reduced Motion**: Respects user preferences
- **Memory Efficient**: Optimized event handlers and refs

---

## License

MIT © Spexop Design System
