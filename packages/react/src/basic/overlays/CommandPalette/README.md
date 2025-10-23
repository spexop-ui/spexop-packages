# CommandPalette Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A powerful command palette for quick actions and navigation. Features fuzzy search, keyboard shortcuts, grouped commands, and recent actions with smooth animations.

## Features

- ✅ Advanced fuzzy search with scoring algorithm
- ✅ Keyboard shortcuts display
- ✅ Grouped commands by category
- ✅ Recent commands section
- ✅ Icon support with @spexop/icons
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Global keyboard shortcut (⌘K)
- ✅ Focus trap and management
- ✅ WCAG AA+ accessible
- ✅ TypeScript support
- ✅ Portal rendering
- ✅ Body scroll lock

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { CommandPalette } from '@spexop/react';
import { Icon } from '@spexop/react';
import { Home, Settings } from '@spexop/icons';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  const commands = [
    {
      id: 'home',
      label: 'Go to Dashboard',
      icon: <Icon name="Home" />,
      onSelect: () => navigate('/'),
      keywords: ['dashboard', 'home'],
    },
    {
      id: 'settings',
      label: 'Open Settings',
      icon: <Icon name="Settings" />,
      onSelect: () => navigate('/settings'),
      keywords: ['settings', 'preferences'],
    },
  ];
  
  return (
    <CommandPalette
      open={isOpen}
      onClose={() => setIsOpen(false)}
      commands={commands}
      placeholder="Search for actions..."
    />
  );
}
```

## With Keyboard Shortcuts

```tsx
const commands = [
  {
    id: 'new-doc',
    label: 'Create New Document',
    icon: <Icon name="FilePlus" />,
    onSelect: handleNewDoc,
    shortcut: '⌘N',
  },
  {
    id: 'save',
    label: 'Save',
    icon: <Icon name="Save" />,
    onSelect: handleSave,
    shortcut: '⌘S',
  },
];

<CommandPalette
  open={isOpen}
  onClose={handleClose}
  commands={commands}
/>
```

## With Recent Commands

```tsx
function AppWithRecentCommands() {
  const [isOpen, setIsOpen] = useState(false);
  const [recentCommands, setRecentCommands] = useState([]);

  const commands = [
    {
      id: 'home',
      label: 'Go to Dashboard',
      icon: <Icon name="Home" />,
      onSelect: () => navigate('/'),
      category: 'Navigation',
    },
    {
      id: 'settings',
      label: 'Open Settings',
      icon: <Icon name="Settings" />,
      onSelect: () => navigate('/settings'),
      category: 'Navigation',
    },
  ];

  const handleCommandSelect = (command) => {
    // Execute command
    command.onSelect();
    
    // Add to recent commands (max 5)
    setRecentCommands(prev => {
      const filtered = prev.filter(cmd => cmd.id !== command.id);
      return [command, ...filtered].slice(0, 5);
    });
  };

  return (
    <CommandPalette
      open={isOpen}
      onClose={() => setIsOpen(false)}
      commands={commands}
      recentCommands={recentCommands}
      onCommandSelect={handleCommandSelect}
      showRecent={true}
    />
  );
}
```

## Common Patterns

### Complete Command Palette

```tsx
import { CommandPalette } from '@spexop/react';
import { 
  Home, Folder, Settings, Users, 
  FilePlus, Save, Copy, Trash 
} from '@spexop/icons';

function AppWithCommands() {
  const [showCommands, setShowCommands] = useState(false);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommands(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commandGroups = [
    {
      title: 'Navigation',
      commands: [
        {
          id: 'dashboard',
          label: 'Go to Dashboard',
          icon: Home,
          onSelect: () => navigate('/'),
          keywords: ['home', 'dashboard', 'main'],
        },
        {
          id: 'projects',
          label: 'Go to Projects',
          icon: Folder,
          onSelect: () => navigate('/projects'),
          keywords: ['projects', 'work'],
        },
        {
          id: 'team',
          label: 'Go to Team',
          icon: Users,
          onSelect: () => navigate('/team'),
          keywords: ['team', 'members', 'people'],
        },
      ],
    },
    {
      title: 'Actions',
      commands: [
        {
          id: 'new-project',
          label: 'Create New Project',
          icon: FilePlus,
          onSelect: handleNewProject,
          shortcut: ['cmd', 'n'],
          keywords: ['create', 'new', 'project'],
        },
        {
          id: 'save',
          label: 'Save',
          icon: Save,
          onSelect: handleSave,
          shortcut: ['cmd', 's'],
        },
        {
          id: 'copy',
          label: 'Copy',
          icon: Copy,
          onSelect: handleCopy,
          shortcut: ['cmd', 'c'],
        },
      ],
    },
    {
      title: 'Settings',
      commands: [
        {
          id: 'preferences',
          label: 'Open Settings',
          icon: Settings,
          onSelect: () => navigate('/settings'),
          shortcut: ['cmd', ','],
        },
      ],
    },
  ];

  return (
    <>
      {/* Your app */}
      
      <CommandPalette
        isOpen={showCommands}
        onClose={() => setShowCommands(false)}
        commandGroups={commandGroups}
        placeholder="Type a command or search..."
        recentCommands={recentCommands}
      />
    </>
  );
}
```

### With Recent Actions

```tsx
function CommandPaletteWithHistory() {
  const [recentCommands, setRecentCommands] = useState([]);

  const handleCommandSelect = (command) => {
    // Execute command
    command.onSelect();
    
    // Add to recent (max 5)
    setRecentCommands(prev => {
      const filtered = prev.filter(cmd => cmd.id !== command.id);
      return [command, ...filtered].slice(0, 5);
    });
  };

  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={handleClose}
      commands={commands}
      recentCommands={recentCommands}
      onCommandSelect={handleCommandSelect}
    />
  );
}
```

### Context-Aware Commands

```tsx
function ContextualCommands() {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    // Update commands based on current context
    const contextCommands = getCurrentContextCommands();
    setCommands(contextCommands);
  }, [currentPage, selectedItems]);

  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={handleClose}
      commands={commands}
      placeholder={`Search ${currentPage} actions...`}
    />
  );
}
```

## Props

```typescript
interface CommandPaletteProps {
  /** Whether palette is open */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** List of available commands */
  commands: CommandPaletteCommand[];
  /** Recent commands to show at the top */
  recentCommands?: CommandPaletteCommand[];
  /** Placeholder text for search input */
  placeholder?: string;
  /** Whether to show category headers */
  showCategories?: boolean;
  /** Whether to show keyboard shortcuts */
  showShortcuts?: boolean;
  /** Whether to show recent commands section */
  showRecent?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Maximum number of results to show */
  maxResults?: number;
  /** Empty state message */
  emptyMessage?: string;
  /** Callback when a command is selected */
  onCommandSelect?: (command: CommandPaletteCommand) => void;
}

interface CommandPaletteCommand {
  /** Unique identifier for the command */
  id: string;
  /** Command label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Optional category for grouping */
  category?: string;
  /** Keyboard shortcut hint (e.g., "⌘K", "Ctrl+K") */
  shortcut?: string;
  /** Callback when command is selected */
  onSelect: () => void;
  /** Whether the command is disabled */
  disabled?: boolean;
  /** Search keywords for better matching */
  keywords?: string[];
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built with foundational layout components
2. **Borders before shadows** - Clean 2px borders instead of heavy shadows
3. **Typography before decoration** - Font weight (600/700) for hierarchy
4. **Tokens before magic numbers** - Uses design tokens from @spexop/theme
5. **Composition before complexity** - Built up from simple parts
6. **Standards before frameworks** - Web platform fundamentals
7. **Accessibility before aesthetics** - WCAG AA+ compliance by default

## Accessibility

- ✅ Focus trap when open
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Screen reader support with proper ARIA roles
- ✅ ARIA labels and descriptions
- ✅ Highlighted selection visible with high contrast
- ✅ Search input accessible with proper labeling
- ✅ WCAG AA+ compliant contrast ratios
- ✅ Reduced motion support
- ✅ Portal rendering for proper focus management
- ✅ Body scroll lock to prevent background interaction

### Keyboard Shortcuts

- `⌘K` / `Ctrl+K` - Open palette (global - implement in your app)
- `Arrow Up/Down` - Navigate commands
- `Enter` - Execute selected command
- `Escape` - Close palette
- `Backspace` - Clear search (when empty)
- `Tab` - Cycle through commands

## Fuzzy Search Algorithm

The CommandPalette uses an advanced fuzzy search algorithm that scores commands based on:

1. **Exact matches** (1000 points) - Perfect match gets highest priority
2. **Prefix matches** (900 points) - Commands starting with query
3. **Contains matches** (500 points) - Commands containing query
4. **Fuzzy matches** (300+ points) - Characters appear in order
5. **Character matches** (10+ points) - Individual character matches

The algorithm also weights different fields:

- **Label** (3x multiplier) - Most important for matching
- **Description** (2x multiplier) - Secondary importance
- **Keywords** (1.5x multiplier) - Custom search terms
- **Category** (1x multiplier) - Basic matching

Recent commands get a 1.2x boost to appear higher in results.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `SearchBar` - Search input
- `SearchModal` - Full-screen search
- `Modal` - Dialog overlay
- `KeyboardShortcut` - Shortcut display

## Best Practices

1. **Provide keyboard shortcuts** - Show shortcuts for common actions
2. **Use fuzzy search** - Be forgiving with typos
3. **Group logically** - Organize commands by category
4. **Track recent actions** - Show frequently used commands
5. **Keep labels action-oriented** - Use verbs ("Go to", "Create", "Open")

## License

MIT
