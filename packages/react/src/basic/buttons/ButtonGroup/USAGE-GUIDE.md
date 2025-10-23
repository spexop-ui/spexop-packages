# ButtonGroup Component - Complete Usage Guide

**Component Version**: v0.3.0
**Last Updated**: January 20, 2025
**Package**: @spexop/react
**Status**: Production Ready
**Recent Updates**: Modern UI/UX improvements, enhanced accessibility, performance optimizations

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Installation](#installation)
4. [Direction and Layout](#direction-and-layout)
5. [Toolbar Patterns](#toolbar-patterns)
6. [Action Groups](#action-groups)
7. [Icon Button Groups](#icon-button-groups)
8. [Accessibility](#accessibility)
9. [Advanced Patterns](#advanced-patterns)
10. [Best Practices](#best-practices)
11. [API Reference](#api-reference)

## Overview

ButtonGroup is a container component that groups multiple buttons together with shared borders and consistent spacing. It follows the "borders before shadows" principle and provides both horizontal and vertical layout options.

### When to Use

Use ButtonGroup when you need:

- Toolbar button groups
- Form action groups (Save/Cancel)
- Text formatting controls
- Pagination controls
- Related actions grouped together
- Segmented controls (use with Button)
- Icon-only button groups

### When Not to Use

Consider alternatives when you need:

- **Radio-style selection**: Use SegmentedButton
- **Action + Dropdown**: Use SplitButton
- **Single button**: Use Button directly
- **Navigation tabs**: Use Tabs component
- **Toggle controls**: Use Toggle or Switch

### Key Features

- **Modern UI/UX**: Ripple effects, micro-interactions, smooth animations
- **Enhanced Accessibility**: WCAG AAA compliance, arrow key navigation
- **Performance Optimized**: GPU acceleration, reduced motion support
- **Flexible Layout**: Horizontal and vertical directions
- **Compact Mode**: Smaller padding for dense UIs
- **Shared Borders**: Connected buttons with internal borders
- **Consistent Spacing**: Theme-driven spacing system
- **ARIA Support**: Complete group pattern implementation
- **Keyboard Navigation**: Advanced arrow key navigation with wrapping
- **Theme Integration**: Full Spexop design system alignment
- **Forward Ref**: Complete ref forwarding support
- **Composition**: Accepts any children (buttons, custom elements)

## Quick Start

### Basic Example

```tsx
import { Button, ButtonGroup } from '@spexop/react';

function ActionButtons() {
  return (
    <ButtonGroup>
      <Button variant="primary">Save</Button>
      <Button variant="neutral">Cancel</Button>
    </ButtonGroup>
  );
}
```

### Icon Toolbar

```tsx
import { Button, ButtonGroup } from '@spexop/react';
import { Bold, Italic, Underline } from '@spexop/icons';

function TextFormatting() {
  return (
    <ButtonGroup aria-label="Text formatting">
      <Button iconOnly aria-label="Bold">
        <Bold size={20} />
      </Button>
      <Button iconOnly aria-label="Italic">
        <Italic size={20} />
      </Button>
      <Button iconOnly aria-label="Underline">
        <Underline size={20} />
      </Button>
    </ButtonGroup>
  );
}
```

### Vertical Layout

```tsx
import { Button, ButtonGroup } from '@spexop/react';

function VerticalActions() {
  return (
    <ButtonGroup direction="vertical">
      <Button variant="outline">Edit</Button>
      <Button variant="outline">Duplicate</Button>
      <Button variant="danger">Delete</Button>
    </ButtonGroup>
  );
}
```

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
# or
yarn add @spexop/react @spexop/theme
```

### Import Styles

```tsx
import '@spexop/react/dist/index.css';
```

## Direction and Layout

### Horizontal (Default)

```tsx
<ButtonGroup direction="horizontal">
  <Button variant="primary">First</Button>
  <Button variant="primary">Second</Button>
  <Button variant="primary">Third</Button>
</ButtonGroup>
```

**Styling**:

- Buttons aligned horizontally
- Shared vertical borders
- Consistent horizontal spacing

**Use for**:

- Toolbars
- Form actions
- Pagination
- Inline actions

---

### Vertical

```tsx
<ButtonGroup direction="vertical">
  <Button variant="outline">Option 1</Button>
  <Button variant="outline">Option 2</Button>
  <Button variant="outline">Option 3</Button>
</ButtonGroup>
```

**Styling**:

- Buttons stacked vertically
- Shared horizontal borders
- Full-width buttons

**Use for**:

- Dropdown-style menus
- Action lists
- Sidebar actions
- Mobile layouts

---

### Compact Mode

```tsx
<ButtonGroup compact>
  <Button compact="sm" iconOnly aria-label="Previous">
    <ChevronLeft size={16} />
  </Button>
  <Button compact="sm" iconOnly aria-label="Next">
    <ChevronRight size={16} />
  </Button>
</ButtonGroup>
```

**Use for**:

- Dense UIs
- Toolbars
- Icon-only groups
- Mobile interfaces

## Toolbar Patterns

### Text Formatting Toolbar

```tsx
import { Button, ButtonGroup } from '@spexop/react';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight
} from '@spexop/icons';

function EditorToolbar() {
  const [format, setFormat] = useState({
    bold: false,
    italic: false,
    underline: false
  });

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {/* Text style group */}
      <ButtonGroup aria-label="Text style">
        <Button
          iconOnly
          aria-label="Bold"
          aria-pressed={format.bold}
          onClick={() => setFormat(f => ({ ...f, bold: !f.bold }))}
        >
          <Bold size={20} />
        </Button>
        <Button
          iconOnly
          aria-label="Italic"
          aria-pressed={format.italic}
          onClick={() => setFormat(f => ({ ...f, italic: !f.italic }))}
        >
          <Italic size={20} />
        </Button>
        <Button
          iconOnly
          aria-label="Underline"
          aria-pressed={format.underline}
          onClick={() => setFormat(f => ({ ...f, underline: !f.underline }))}
        >
          <Underline size={20} />
        </Button>
      </ButtonGroup>

      {/* Alignment group */}
      <ButtonGroup aria-label="Text alignment">
        <Button iconOnly aria-label="Align left">
          <AlignLeft size={20} />
        </Button>
        <Button iconOnly aria-label="Align center">
          <AlignCenter size={20} />
        </Button>
        <Button iconOnly aria-label="Align right">
          <AlignRight size={20} />
        </Button>
      </ButtonGroup>
    </div>
  );
}
```

### Zoom Controls

```tsx
import { Button, ButtonGroup } from '@spexop/react';
import { ZoomIn, ZoomOut } from '@spexop/icons';

function ZoomControls() {
  const [zoom, setZoom] = useState(100);

  return (
    <ButtonGroup aria-label="Zoom controls">
      <Button
        iconOnly
        aria-label="Zoom out"
        onClick={() => setZoom(z => Math.max(10, z - 10))}
      >
        <ZoomOut size={20} />
      </Button>
      <Button aria-label={`Zoom level ${zoom}%`}>
        {zoom}%
      </Button>
      <Button
        iconOnly
        aria-label="Zoom in"
        onClick={() => setZoom(z => Math.min(200, z + 10))}
      >
        <ZoomIn size={20} />
      </Button>
    </ButtonGroup>
  );
}
```

### Media Controls

```tsx
import { Button, ButtonGroup } from '@spexop/react';
import { SkipBack, Play, Pause, SkipForward } from '@spexop/icons';

function MediaControls() {
  const [playing, setPlaying] = useState(false);

  return (
    <ButtonGroup aria-label="Media controls">
      <Button iconOnly aria-label="Previous track">
        <SkipBack size={20} />
      </Button>
      <Button
        iconOnly
        aria-label={playing ? 'Pause' : 'Play'}
        onClick={() => setPlaying(!playing)}
      >
        {playing ? <Pause size={20} /> : <Play size={20} />}
      </Button>
      <Button iconOnly aria-label="Next track">
        <SkipForward size={20} />
      </Button>
    </ButtonGroup>
  );
}
```

## Action Groups

### Form Actions

```tsx
import { Button, ButtonGroup } from '@spexop/react';

function FormActions() {
  return (
    <ButtonGroup>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
      <Button variant="neutral" type="button" onClick={handleCancel}>
        Cancel
      </Button>
    </ButtonGroup>
  );
}
```

### Dialog Actions

```tsx
import { Button, ButtonGroup } from '@spexop/react';

function DialogActions() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
      <ButtonGroup>
        <Button variant="ghost" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </ButtonGroup>
    </div>
  );
}
```

### Destructive Confirmation

```tsx
import { Button, ButtonGroup } from '@spexop/react';

function DeleteConfirmation() {
  return (
    <ButtonGroup>
      <Button variant="danger" onClick={handleDelete}>
        Yes, Delete
      </Button>
      <Button variant="ghost" onClick={handleCancel}>
        Cancel
      </Button>
    </ButtonGroup>
  );
}
```

## Icon Button Groups

### Compact Icon Group

```tsx
import { Button, ButtonGroup } from '@spexop/react';
import { Edit, Copy, Trash } from '@spexop/icons';

function ActionIcons() {
  return (
    <ButtonGroup compact aria-label="Item actions">
      <Button compact="sm" iconOnly aria-label="Edit">
        <Edit size={16} />
      </Button>
      <Button compact="sm" iconOnly aria-label="Copy">
        <Copy size={16} />
      </Button>
      <Button compact="sm" iconOnly aria-label="Delete" variant="danger">
        <Trash size={16} />
      </Button>
    </ButtonGroup>
  );
}
```

### Navigation Arrows

```tsx
import { Button, ButtonGroup } from '@spexop/react';
import { ChevronLeft, ChevronRight } from '@spexop/icons';

function PaginationControls({ currentPage, totalPages, onPageChange }) {
  return (
    <ButtonGroup aria-label="Pagination">
      <Button
        iconOnly
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={20} />
      </Button>
      <Button aria-label={`Page ${currentPage} of ${totalPages}`}>
        {currentPage} / {totalPages}
      </Button>
      <Button
        iconOnly
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={20} />
      </Button>
    </ButtonGroup>
  );
}
```

## Accessibility

### ARIA Group Pattern

```tsx
<ButtonGroup
  role="group"
  aria-label="Text formatting"
>
  <Button iconOnly aria-label="Bold">
    <Bold size={20} />
  </Button>
  <Button iconOnly aria-label="Italic">
    <Italic size={20} />
  </Button>
</ButtonGroup>
```

### ARIA Radio Group Pattern

For mutually exclusive selections:

```tsx
<ButtonGroup
  role="radiogroup"
  aria-label="Text alignment"
>
  <Button
    role="radio"
    aria-checked={alignment === 'left'}
    onClick={() => setAlignment('left')}
  >
    Left
  </Button>
  <Button
    role="radio"
    aria-checked={alignment === 'center'}
    onClick={() => setAlignment('center')}
  >
    Center
  </Button>
  <Button
    role="radio"
    aria-checked={alignment === 'right'}
    onClick={() => setAlignment('right')}
  >
    Right
  </Button>
</ButtonGroup>
```

### Keyboard Navigation

ButtonGroup supports standard keyboard navigation:

- **Tab**: Focus first button in group
- **Tab** (within group): Focus next button
- **Shift + Tab**: Focus previous button
- **Arrow keys**: Navigate between buttons (custom implementation)

```tsx
import { Button, ButtonGroup } from '@spexop/react';
import { useRef, useCallback } from 'react';

function KeyboardNavGroup() {
  const groupRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const buttons = groupRef.current?.querySelectorAll('button');
      if (!buttons) return;

      const currentIndex = Array.from(buttons).indexOf(
        document.activeElement as HTMLButtonElement
      );

      if (currentIndex === -1) return;

      const nextIndex = e.key === 'ArrowRight'
        ? (currentIndex + 1) % buttons.length
        : (currentIndex - 1 + buttons.length) % buttons.length;

      (buttons[nextIndex] as HTMLButtonElement).focus();
    }
  }, []);

  return (
    <div ref={groupRef} onKeyDown={handleKeyDown}>
      <ButtonGroup aria-label="Actions">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </ButtonGroup>
    </div>
  );
}
```

## Modern Features

### Enhanced Keyboard Navigation

The ButtonGroup now supports advanced keyboard navigation with arrow keys:

```tsx
import { Button, ButtonGroup } from '@spexop/react';

function KeyboardNavExample() {
  return (
    <ButtonGroup aria-label="Navigation controls">
      <Button>Previous</Button>
      <Button>Play</Button>
      <Button>Next</Button>
    </ButtonGroup>
  );
}
```

**Keyboard Controls**:

- **Tab**: Focus the button group
- **Arrow Left/Right**: Navigate between buttons (horizontal)
- **Arrow Up/Down**: Navigate between buttons (vertical)
- **Enter/Space**: Activate focused button
- **Wrapping**: Arrow keys wrap around at boundaries
- **Disabled Skip**: Automatically skips disabled buttons

### Ripple Effects

Modern ripple effects provide visual feedback:

```tsx
<ButtonGroup aria-label="Actions">
  <Button onClick={handleAction}>Click for Ripple</Button>
</ButtonGroup>
```

**Features**:

- **Position-aware**: Ripple originates from click point
- **Smooth animation**: 300ms ease transition
- **Accessible**: Hidden from screen readers
- **Performance optimized**: GPU accelerated

### Micro-Interactions

Subtle animations enhance user experience:

- **Hover**: Subtle lift effect with enhanced shadow
- **Active**: Press feedback with scale animation
- **Focus**: Enhanced focus indicators with box-shadow
- **Transitions**: Smooth 200ms cubic-bezier easing

### Forward Ref Support

Complete ref forwarding for advanced use cases:

```tsx
import { useRef, useEffect } from 'react';
import { ButtonGroup } from '@spexop/react';

function RefExample() {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Access the DOM element directly
    if (groupRef.current) {
      groupRef.current.scrollIntoView();
    }
  }, []);

  return (
    <ButtonGroup ref={groupRef} aria-label="Scrollable group">
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  );
}
```

## Advanced Patterns

### Responsive Button Group

```tsx
import { Button, ButtonGroup } from '@spexop/react';
import { useMediaQuery } from '@spexop/react';

function ResponsiveActions() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <ButtonGroup direction={isMobile ? 'vertical' : 'horizontal'}>
      <Button variant="primary" fullWidth={isMobile}>
        Save
      </Button>
      <Button variant="neutral" fullWidth={isMobile}>
        Cancel
      </Button>
    </ButtonGroup>
  );
}
```

### Conditional Button Group

```tsx
import { Button, ButtonGroup } from '@spexop/react';

function ConditionalActions({ hasPermission, isOwner }) {
  return (
    <ButtonGroup>
      <Button variant="outline">View</Button>
      {hasPermission && (
        <Button variant="primary">Edit</Button>
      )}
      {isOwner && (
        <Button variant="danger">Delete</Button>
      )}
    </ButtonGroup>
  );
}
```

### Split Layout

```tsx
import { Button, ButtonGroup } from '@spexop/react';

function SplitActions() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <ButtonGroup>
        <Button variant="outline">Previous</Button>
        <Button variant="outline">Next</Button>
      </ButtonGroup>
      
      <ButtonGroup>
        <Button variant="neutral">Cancel</Button>
        <Button variant="primary">Finish</Button>
      </ButtonGroup>
    </div>
  );
}
```

## Best Practices

### 1. Use Semantic Grouping

```tsx
// ✅ GOOD - Related actions grouped
<div style={{ display: 'flex', gap: '16px' }}>
  <ButtonGroup aria-label="File operations">
    <Button>New</Button>
    <Button>Open</Button>
    <Button>Save</Button>
  </ButtonGroup>
  
  <ButtonGroup aria-label="Edit operations">
    <Button>Cut</Button>
    <Button>Copy</Button>
    <Button>Paste</Button>
  </ButtonGroup>
</div>

// ❌ BAD - Unrelated actions in same group
<ButtonGroup>
  <Button>New</Button>
  <Button>Delete</Button>
  <Button>Settings</Button>
</ButtonGroup>
```

### 2. Provide ARIA Labels

```tsx
// ✅ GOOD - Clear group purpose
<ButtonGroup aria-label="Text formatting">
  <Button iconOnly aria-label="Bold">
    <Bold size={20} />
  </Button>
  <Button iconOnly aria-label="Italic">
    <Italic size={20} />
  </Button>
</ButtonGroup>

// ❌ BAD - No context
<ButtonGroup>
  <Button iconOnly>
    <Bold size={20} />
  </Button>
  <Button iconOnly>
    <Italic size={20} />
  </Button>
</ButtonGroup>
```

### 3. Consistent Button Variants

```tsx
// ✅ GOOD - Same variant for related actions
<ButtonGroup>
  <Button variant="outline">Option 1</Button>
  <Button variant="outline">Option 2</Button>
  <Button variant="outline">Option 3</Button>
</ButtonGroup>

// ❌ BAD - Mixed variants without reason
<ButtonGroup>
  <Button variant="primary">Option 1</Button>
  <Button variant="outline">Option 2</Button>
  <Button variant="ghost">Option 3</Button>
</ButtonGroup>
```

### 4. Appropriate Direction

```tsx
// ✅ GOOD - Horizontal for toolbars
<ButtonGroup direction="horizontal">
  <Button>Bold</Button>
  <Button>Italic</Button>
</ButtonGroup>

// ✅ GOOD - Vertical for stacked actions
<ButtonGroup direction="vertical">
  <Button fullWidth>Edit Profile</Button>
  <Button fullWidth>Change Password</Button>
  <Button fullWidth>Sign Out</Button>
</ButtonGroup>

// ❌ BAD - Wrong direction for context
<ButtonGroup direction="vertical">
  <Button>Bold</Button>
  <Button>Italic</Button>
  <Button>Underline</Button>
</ButtonGroup>
```

### 5. Icon-Only Needs Labels

```tsx
// ✅ GOOD - All icon buttons have aria-label
<ButtonGroup aria-label="Actions">
  <Button iconOnly aria-label="Edit">
    <Edit size={20} />
  </Button>
  <Button iconOnly aria-label="Delete">
    <Trash size={20} />
  </Button>
</ButtonGroup>

// ❌ BAD - Missing aria-label
<ButtonGroup>
  <Button iconOnly>
    <Edit size={20} />
  </Button>
  <Button iconOnly>
    <Trash size={20} />
  </Button>
</ButtonGroup>
```

## API Reference

### ButtonGroupProps

```typescript
interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'aria-orientation'> {
  /** Button children */
  children: React.ReactNode;
  
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  
  /** Compact mode */
  compact?: boolean;
  
  /** Additional CSS class */
  className?: string;
  
  /** ARIA role */
  role?: "group" | "radiogroup" | "toolbar";
  
  /** ARIA label (required) */
  "aria-label": string;
  
  /** ARIA labelled by */
  "aria-labelledby"?: string;
  
  /** ARIA described by */
  "aria-describedby"?: string;
  
  /** ARIA orientation */
  "aria-orientation"?: "horizontal" | "vertical";
  
  /** Enhanced keyboard handler */
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}
```

### Default Props

- `direction`: `"horizontal"`
- `compact`: `false`
- `role`: `"group"`

## Related Components

- **Button**: Individual button component
- **SegmentedButton**: Radio-style exclusive selection
- **SplitButton**: Action button with dropdown
- **Toolbar**: Dedicated toolbar component (if available)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Bundle Size**: ~1.2KB gzipped
- **CSS Modules**: Scoped styles, zero runtime
- **Composition**: No wrapper overhead
- **Accessible**: Built-in ARIA support
- **GPU Acceleration**: Hardware-accelerated animations
- **Reduced Motion**: Respects user preferences
- **Memory Efficient**: Optimized event handlers and refs
- **Modern CSS**: Uses will-change and transform3d for performance

## License

MIT

## Support

For issues, questions, or contributions:

- [GitHub Issues](https://github.com/spexop-ui/design-system/issues)
- [Documentation](https://spexop.com)
