# @spexop/icons

A lightweight, framework-agnostic SVG icon library for the Spexop Design System. Zero dependencies, maximum performance and accessibility.

## Features

✨ **Comprehensive Icon Set** - Covers all common UI needs across multiple categories  
♿ **Accessible** - All icons include proper ARIA labels and semantic markup  
📐 **Scalable** - SVG-based icons that scale perfectly at any size  
🎨 **Customizable** - Use CSS `color` property to change icon color  
🌳 **Tree-shakeable** - Import only the icons you need  
💪 **Type-safe** - Full TypeScript support with proper typing  
⚡ **Performant** - Optimized SVG paths, minimal file sizes  
🔌 **Framework-agnostic** - Works with React, Vue, Angular, Svelte, or vanilla JS  
🪶 **Zero dependencies** - No runtime dependencies, just pure SVG strings

## Installation

```bash
npm install @spexop/icons
# or
pnpm add @spexop/icons
```

## Usage

### Vanilla JavaScript / HTML

```typescript
import { SearchIcon, ArrowRightIcon } from '@spexop/icons';

// Direct insertion
document.getElementById('search').innerHTML = SearchIcon;

// Or with template literals
const html = `
  <div class="icon-container">
    ${SearchIcon}
    ${ArrowRightIcon}
  </div>
`;
```

### React

```typescript
import { SearchIcon, PlusIcon } from '@spexop/icons';

function MyComponent() {
  return (
    <div>
      <button dangerouslySetInnerHTML={{ __html: SearchIcon }} />
      <span dangerouslySetInnerHTML={{ __html: PlusIcon }} />
    </div>
  );
}
```

### Vue 3

```vue
<script setup>
import { SearchIcon, EditIcon } from '@spexop/icons';
</script>

<template>
  <div class="icon-container">
    <span v-html="SearchIcon" />
    <span v-html="EditIcon" />
  </div>
</template>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SearchIcon } from '@spexop/icons';

@Component({
  selector: 'app-search',
  template: `<span [innerHTML]="searchIcon"></span>`
})
export class SearchComponent {
  searchIcon: SafeHtml;
  
  constructor(private sanitizer: DomSanitizer) {
    this.searchIcon = sanitizer.bypassSecurityTrustHtml(SearchIcon);
  }
}
```

### Svelte

```svelte
<script>
  import { SearchIcon, CloseIcon } from '@spexop/icons';
</script>

<div class="icon-container">
  {@html SearchIcon}
  {@html CloseIcon}
</div>
```

### Category-specific Imports

```typescript
// Import from specific categories
import { NavigationIcons } from '@spexop/icons/navigation';
import { ActionIcons } from '@spexop/icons/actions';
import { UIIcons } from '@spexop/icons/ui';

// Use with dynamic icon selection
const iconName = 'search';
const icon = ActionIcons[iconName];
document.getElementById('icon').innerHTML = icon;
```

### Styling Icons

Icons use `currentColor` by default and inherit the text color from their parent:

```css
/* Change icon color */
.icon-container {
  color: #007bff;
}

/* Resize icons */
.icon-container svg {
  width: 32px;
  height: 32px;
}
```

## Icon Categories

### 🚀 Alert Icons

Status and notification icons with standard and solid variants.

**Standard Icons** (dual-tone with subtle fill):

- `InfoIcon` - Information/help state
- `SuccessIcon` - Success/completion state  
- `WarningIcon` - Warning/caution state
- `ErrorIcon` - Error/failure state

**Solid Icons** (fully filled):

- `InfoIconSolid` - Filled information icon
- `SuccessIconSolid` - Filled success icon
- `WarningIconSolid` - Filled warning icon
- `ErrorIconSolid` - Filled error icon

### 🧭 Navigation Icons

Directional and menu icons for navigation.

- `ArrowRightIcon`, `ArrowLeftIcon`, `ArrowUpIcon`, `ArrowDownIcon`
- `ChevronRightIcon`, `ChevronLeftIcon`, `ChevronUpIcon`, `ChevronDownIcon`
- `MenuIcon` - Hamburger menu
- `CloseIcon` - Close/dismiss
- `HomeIcon` - Home/dashboard
- `ExternalLinkIcon` - External link indicator

### ⚡ Action Icons

Common user actions and interactions.

- `SearchIcon` - Search/find
- `PlusIcon` - Add/create
- `EditIcon` - Edit/modify
- `DeleteIcon` - Remove/delete
- `SettingsIcon` - Configuration
- `CopyIcon` - Duplicate/copy
- `DownloadIcon` - Download/save
- `UploadIcon` - Upload/add files
- `FilterIcon` - Filter/sort
- `RefreshIcon` - Reload/refresh
- `MoreHorizontalIcon` - More options (horizontal)
- `MoreVerticalIcon` - More options (vertical)

### 🎨 UI Icons

Interface elements and status indicators.

- `CheckIcon` - Confirmation
- `XIcon` - Cancel/remove
- `HeartIcon`, `HeartFilledIcon` - Like/favorite
- `StarIcon`, `StarFilledIcon` - Rating/featured
- `EyeIcon`, `EyeOffIcon` - Visibility toggle
- `LockIcon`, `UnlockIcon` - Security status
- `UserIcon` - User profile
- `UsersIcon` - Group/team
- `BellIcon` - Notifications
- `CalendarIcon` - Date/schedule
- `ClockIcon` - Time

### 📁 File Icons

File types and document management.

- `FileIcon` - Generic file
- `FileTextIcon` - Text document
- `FolderIcon`, `FolderOpenIcon` - Directories
- `ImageIcon` - Image file
- `CodeIcon` - Code file
- `DatabaseIcon` - Database/storage
- `ArchiveIcon` - Archive/compress
- `BookmarkIcon`, `BookmarkFilledIcon` - Saved items

### 💬 Communication Icons

Messaging and communication features.

- `MailIcon` - Email
- `MessageCircleIcon` - Chat bubble
- `MessageSquareIcon` - Comment/reply
- `PhoneIcon` - Phone call
- `VideoIcon` - Video call
- `SendIcon` - Send message
- `ShareIcon` - Share content
- `LinkIcon` - Hyperlink
- `AtSignIcon` - Mention/email

### 🌐 Social Icons

Social media and platform icons.

- `GitHubIcon` - GitHub
- `TwitterIcon` - Twitter/X
- `LinkedInIcon` - LinkedIn
- `FacebookIcon` - Facebook
- `InstagramIcon` - Instagram
- `YouTubeIcon` - YouTube
- `SlackIcon` - Slack
- `FigmaIcon` - Figma

## Icon Mappings

Each category exports a mapping object for dynamic usage:

```typescript
import { 
  AlertIcons, 
  NavigationIcons, 
  ActionIcons, 
  UIIcons, 
  FileIcons, 
  CommunicationIcons, 
  SocialIcons 
} from '@spexop/icons';

// Use dynamically
const iconName = 'search';
const Icon = ActionIcons[iconName];
```

## TypeScript

Full TypeScript support with typed variants:

```typescript
import { ActionIcons } from '@spexop/icons';
import type { 
  AlertIconVariant,
  NavigationIconVariant,
  ActionIconVariant,
  UIIconVariant,
  FileIconVariant,
  CommunicationIconVariant,
  SocialIconVariant
} from '@spexop/icons';

// Type-safe icon selection
const variant: ActionIconVariant = 'search';
const icon: string = ActionIcons[variant];
```

## Accessibility

All icons follow best practices:

- **ARIA labels**: Every icon includes descriptive `aria-label`
- **Focusable**: Set to `focusable="false"` to prevent tab navigation
- **Role**: Proper `role="img"` for screen readers
- **Semantic**: Meaningful labels that describe the icon's purpose

## Customization

### Size

```css
.icon-sm svg { width: 16px; height: 16px; }
.icon-md svg { width: 24px; height: 24px; }
.icon-lg svg { width: 32px; height: 32px; }
.icon-xl svg { width: 48px; height: 48px; }
```

### Color

```css
.icon-primary { color: #007bff; }
.icon-success { color: #28a745; }
.icon-warning { color: #ffc107; }
.icon-danger { color: #dc3545; }
```

### Animation

```css
.icon-spin svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

## Development

```bash
# Build the package
pnpm build

# Watch for changes
pnpm dev

# Type check
pnpm type-check
```

## Design System Integration

These icons are designed to work seamlessly with modern design systems:

- **Consistent stroke width**: Uniform stroke width for visual harmony
- **Standard viewBox**: Consistent sizing for predictable scaling
- **currentColor**: Inherits color from parent or design tokens
- **Accessible**: WCAG 2.2 compliant with proper ARIA labels
- **Framework-agnostic**: Pure SVG strings work everywhere
- **Zero runtime overhead**: No JavaScript execution needed

## License

MIT © Spexop Design System

## Contributing

We welcome contributions! To add new icons:

1. Follow the existing icon structure
2. Ensure 24x24 viewBox and 2px stroke width
3. Add proper ARIA labels
4. Update the appropriate category file
5. Add TypeScript types
6. Update this README

---

**Comprehensive Coverage** - Multiple icon categories for all UI needs  
**Lightweight Bundle** - Minified and tree-shakeable  
**Zero Dependencies** - No runtime dependencies  
**TypeScript** - Full type safety  
**Accessibility** - WCAG 2.2 compliant  
**Framework Support** - React, Vue, Angular, Svelte, Vanilla JS
