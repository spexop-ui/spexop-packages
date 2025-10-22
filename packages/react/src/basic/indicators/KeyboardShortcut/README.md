# KeyboardShortcut Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A component for displaying keyboard shortcuts with platform-specific formatting. Auto-detects the user's operating system and shows appropriate keys (⌘ for Mac, Ctrl for Windows/Linux).

## Features

- ✅ Platform detection (Mac, Windows, Linux)
- ✅ Automatic key formatting (⌘K vs Ctrl+K)
- ✅ Predefined shortcuts (search, command-palette, settings)
- ✅ Custom key combinations
- ✅ 2 sizes (sm, md)
- ✅ Clean, minimal design
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { KeyboardShortcut } from '@spexop/react';

function App() {
  return (
    <div>
      <span>Search</span>
      <KeyboardShortcut keys={["cmd", "k"]} />
    </div>
  );
}
```

## Predefined Shortcuts

### Search

Automatically shows ⌘K (Mac) or Ctrl+K (Windows/Linux)

```tsx
<KeyboardShortcut shortcut="search" />
```

### Command Palette

Shows ⌘⇧P (Mac) or Ctrl+Shift+P (Windows/Linux)

```tsx
<KeyboardShortcut shortcut="command-palette" />
```

### Settings

Shows ⌘, (Mac) or Ctrl+, (Windows/Linux)

```tsx
<KeyboardShortcut shortcut="settings" />
```

## Custom Key Combinations

### Single Key

```tsx
<KeyboardShortcut keys={["esc"]} />
{/* Shows: Esc */}
```

### Modifier + Key

```tsx
<KeyboardShortcut keys={["cmd", "s"]} />
{/* Mac: ⌘S, Windows: Ctrl+S */}

<KeyboardShortcut keys={["ctrl", "shift", "p"]} />
{/* Shows: Ctrl+Shift+P */}
```

### Multiple Modifiers

```tsx
<KeyboardShortcut keys={["cmd", "shift", "k"]} />
{/* Mac: ⌘⇧K, Windows: Ctrl+Shift+K */}
```

## Sizes

### Small (sm) - Default

Compact for inline use.

```tsx
<KeyboardShortcut keys={["cmd", "k"]} size="sm" />
```

### Medium (md)

Larger for emphasis.

```tsx
<KeyboardShortcut keys={["enter"]} size="md" />
```

## Common Patterns

### Menu Items

```tsx
function MenuItems() {
  return (
    <Stack direction="vertical" gap={2}>
      <div className="menu-item">
        <span>Search</span>
        <KeyboardShortcut shortcut="search" />
      </div>
      
      <div className="menu-item">
        <span>Command Palette</span>
        <KeyboardShortcut shortcut="command-palette" />
      </div>
      
      <div className="menu-item">
        <span>Settings</span>
        <KeyboardShortcut shortcut="settings" />
      </div>
    </Stack>
  );
}
```

### Command Palette Usage

```tsx
function CommandPalette() {
  const commands = [
    { label: 'Open file', shortcut: ['cmd', 'o'] },
    { label: 'Save', shortcut: ['cmd', 's'] },
    { label: 'Close', shortcut: ['cmd', 'w'] },
    { label: 'Find', shortcut: ['cmd', 'f'] },
  ];

  return (
    <div>
      {commands.map(cmd => (
        <div key={cmd.label} className="command-item">
          <span>{cmd.label}</span>
          <KeyboardShortcut keys={cmd.shortcut} />
        </div>
      ))}
    </div>
  );
}
```

### Tooltip with Shortcut

```tsx
<Tooltip content={
  <div>
    <div>Search</div>
    <KeyboardShortcut keys={["cmd", "k"]} />
  </div>
}>
  <IconButton icon={Search} label="Search" />
</Tooltip>
```

### Help Dialog

```tsx
function KeyboardShortcutsHelp() {
  const shortcuts = [
    { 
      category: 'Navigation',
      items: [
        { action: 'Go to dashboard', keys: ['g', 'd'] },
        { action: 'Go to projects', keys: ['g', 'p'] },
        { action: 'Go to settings', keys: ['g', 's'] },
      ]
    },
    {
      category: 'Actions',
      items: [
        { action: 'Search', keys: ['cmd', 'k'] },
        { action: 'Create new', keys: ['cmd', 'n'] },
        { action: 'Save', keys: ['cmd', 's'] },
      ]
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2>Keyboard Shortcuts</h2>
      
      {shortcuts.map(section => (
        <div key={section.category}>
          <h3>{section.category}</h3>
          {section.items.map(item => (
            <div key={item.action} className="shortcut-row">
              <span>{item.action}</span>
              <KeyboardShortcut keys={item.keys} />
            </div>
          ))}
        </div>
      ))}
    </Modal>
  );
}
```

### Button with Hint

```tsx
<Button variant="primary" onClick={handleSave}>
  Save
  <KeyboardShortcut keys={["cmd", "s"]} size="sm" />
</Button>
```

## Platform Detection

The component automatically detects the user's platform and shows appropriate keys:

| Platform | Modifier Key | Display |
|----------|-------------|---------|
| macOS | cmd | ⌘ |
| macOS | shift | ⇧ |
| macOS | alt/option | ⌥ |
| macOS | ctrl | ⌃ |
| Windows/Linux | ctrl | Ctrl |
| Windows/Linux | shift | Shift |
| Windows/Linux | alt | Alt |

## Props

```typescript
interface KeyboardShortcutProps {
  /** Array of keys (e.g., ["cmd", "k"] or ["ctrl", "shift", "p"]) */
  keys?: string[];
  /** Predefined shortcut name (auto-detects platform) */
  shortcut?: "search" | "command-palette" | "settings";
  /** Raw text to display (bypasses formatting) */
  children?: string;
  /** Size variant */
  size?: "sm" | "md";
  /** Additional CSS class */
  className?: string;
}
```

## Supported Keys

**Modifiers:**

- `cmd` (Mac) / `ctrl` (Windows/Linux)
- `shift`
- `alt` / `option`
- `ctrl` (Mac only, shown as ⌃)

**Special Keys:**

- `enter`, `return`
- `esc`, `escape`
- `tab`
- `space`
- `backspace`, `delete`
- `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`
- `home`, `end`
- `page-up`, `page-down`

**Standard Keys:**

- Letters: `a-z`
- Numbers: `0-9`
- Symbols: `+`, `-`, `=`, etc.

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean border-based design
2. **Typography before decoration** - Clear, monospace font
3. **Tokens before magic numbers** - Uses spacing and color tokens
4. **Standards before frameworks** - Platform detection built-in

## Accessibility

- ✅ Semantic HTML
- ✅ Proper text formatting
- ✅ Screen reader compatible
- ✅ High contrast display

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `CommandPalette` - Quick actions with shortcuts
- `Tooltip` - Hover hints
- `Button` - Action buttons
- `IconButton` - Icon-only buttons

## Best Practices

1. **Use platform detection** - Let the component handle platform differences
2. **Keep combinations simple** - 2-3 keys maximum
3. **Follow conventions** - Use standard shortcuts when possible
4. **Document shortcuts** - Provide help/reference
5. **Test on all platforms** - Verify shortcuts work correctly

## License

MIT
