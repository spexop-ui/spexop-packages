# SplitButton Component

**Version**: 0.2.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A button with a primary action and a dropdown menu for additional related actions. Perfect for providing default action with alternatives. Enhanced with comprehensive variants, sizes, loading states, and advanced menu features.

## Features

- ✅ Primary action button with dropdown menu
- ✅ 12 comprehensive variants (7 base + 5 semantic)
- ✅ 3 sizes (sm, md, lg) + 2 compact modes
- ✅ Loading state with spinner
- ✅ Full width support
- ✅ Advanced menu items (descriptions, badges, shortcuts)
- ✅ Menu dividers and groups
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Click outside to close
- ✅ Disabled state support
- ✅ WCAG AA+ accessible
- ✅ TypeScript support
- ✅ Theme-aware styling

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { SplitButton } from '@spexop/react';

function App() {
  return (
    <SplitButton
      label="Save"
      onClick={handleSave}
      menuItems={[
        { label: 'Save and Close', value: 'save-close', onClick: handleSaveAndClose },
        { label: 'Save as Draft', value: 'draft', onClick: handleSaveDraft },
        { label: 'Save as Template', value: 'template', onClick: handleSaveTemplate },
      ]}
    />
  );
}
```

## Variants

### Base Variants (7)

#### Primary (Default)

```tsx
<SplitButton
  label="Publish"
  variant="primary"
  onClick={handlePublish}
  menuItems={[
    { label: 'Publish Now', value: 'now', onClick: handlePublishNow },
    { label: 'Schedule', value: 'schedule', onClick: handleSchedule },
    { label: 'Save as Draft', value: 'draft', onClick: handleDraft },
  ]}
/>
```

#### Secondary

```tsx
<SplitButton
  label="Export"
  variant="secondary"
  onClick={handleExport}
  menuItems={[
    { label: 'Export as PDF', value: 'pdf', onClick: () => handleExport('pdf') },
    { label: 'Export as CSV', value: 'csv', onClick: () => handleExport('csv') },
    { label: 'Export as JSON', value: 'json', onClick: () => handleExport('json') },
  ]}
/>
```

#### Outline

```tsx
<SplitButton
  label="Share"
  variant="outline"
  onClick={handleShare}
  menuItems={[
    { label: 'Copy Link', value: 'copy', onClick: handleCopyLink },
    { label: 'Email', value: 'email', onClick: handleEmail },
    { label: 'Social Media', value: 'social', onClick: handleSocial },
  ]}
/>
```

#### Ghost

```tsx
<SplitButton
  label="More"
  variant="ghost"
  onClick={handleMore}
  menuItems={[
    { label: 'Settings', value: 'settings', onClick: handleSettings },
    { label: 'Help', value: 'help', onClick: handleHelp },
  ]}
/>
```

#### Text

```tsx
<SplitButton
  label="Read More"
  variant="text"
  onClick={handleReadMore}
  menuItems={[
    { label: 'Full Article', value: 'full', onClick: handleFullArticle },
    { label: 'Summary', value: 'summary', onClick: handleSummary },
  ]}
/>
```

#### Pill

```tsx
<SplitButton
  label="Filter"
  variant="pill"
  onClick={handleFilter}
  menuItems={[
    { label: 'All Items', value: 'all', onClick: handleAllItems },
    { label: 'Recent', value: 'recent', onClick: handleRecent },
  ]}
/>
```

#### Border Emphasis

```tsx
<SplitButton
  label="Featured Action"
  variant="border-emphasis"
  onClick={handleFeatured}
  menuItems={[
    { label: 'Premium Feature', value: 'premium', onClick: handlePremium },
    { label: 'Upgrade', value: 'upgrade', onClick: handleUpgrade },
  ]}
/>
```

### Semantic Variants (5)

#### Danger

```tsx
<SplitButton
  label="Delete"
  variant="danger"
  onClick={handleDelete}
  menuItems={[
    { label: 'Delete Permanently', value: 'permanent', onClick: handlePermanentDelete },
    { label: 'Move to Trash', value: 'trash', onClick: handleMoveToTrash },
  ]}
/>
```

#### Success

```tsx
<SplitButton
  label="Publish"
  variant="success"
  onClick={handlePublish}
  menuItems={[
    { label: 'Publish & Notify', value: 'notify', onClick: handlePublishNotify },
    { label: 'Publish Quietly', value: 'quiet', onClick: handlePublishQuietly },
  ]}
/>
```

#### Warning

```tsx
<SplitButton
  label="Proceed"
  variant="warning"
  onClick={handleProceed}
  menuItems={[
    { label: 'Proceed with Caution', value: 'caution', onClick: handleCaution },
    { label: 'Skip Warning', value: 'skip', onClick: handleSkip },
  ]}
/>
```

#### Info

```tsx
<SplitButton
  label="View Info"
  variant="info"
  onClick={handleViewInfo}
  menuItems={[
    { label: 'Detailed Info', value: 'detailed', onClick: handleDetailedInfo },
    { label: 'Quick Summary', value: 'summary', onClick: handleQuickSummary },
  ]}
/>
```

#### Neutral

```tsx
<SplitButton
  label="Cancel"
  variant="neutral"
  onClick={handleCancel}
  menuItems={[
    { label: 'Save & Cancel', value: 'save-cancel', onClick: handleSaveCancel },
    { label: 'Discard Changes', value: 'discard', onClick: handleDiscard },
  ]}
/>
```

## Sizes

### Small (sm)

```tsx
<SplitButton
  label="Actions"
  size="sm"
  onClick={handleDefault}
  menuItems={menuItems}
/>
```

### Medium (md) - Default

```tsx
<SplitButton
  label="Actions"
  size="md"
  onClick={handleDefault}
  menuItems={menuItems}
/>
```

### Large (lg)

```tsx
<SplitButton
  label="Actions"
  size="lg"
  onClick={handleDefault}
  menuItems={menuItems}
/>
```

## Advanced Features

### Loading State

```tsx
<SplitButton
  label="Save"
  loading={isSaving}
  onClick={handleSave}
  menuItems={[
    { label: 'Save as Draft', value: 'draft', onClick: handleDraft },
    { label: 'Save as Template', value: 'template', onClick: handleTemplate },
  ]}
/>
```

### Compact Mode

```tsx
<SplitButton
  label="Settings"
  compact="sm"
  icon={<Settings size={16} />}
  onClick={handleSettings}
  menuItems={[
    { label: 'Preferences', value: 'prefs', onClick: handlePrefs },
    { label: 'Account', value: 'account', onClick: handleAccount },
  ]}
/>
```

### Full Width

```tsx
<SplitButton
  label="Export Data"
  fullWidth
  onClick={handleExport}
  menuItems={[
    { label: 'Export as CSV', value: 'csv', onClick: () => handleExport('csv') },
    { label: 'Export as JSON', value: 'json', onClick: () => handleExport('json') },
  ]}
/>
```

### Advanced Menu Items

```tsx
<SplitButton
  label="Actions"
  onClick={handleDefault}
  menuItems={[
    {
      label: 'Save as Draft',
      value: 'draft',
      description: 'Save without publishing',
      badge: 'NEW',
      shortcut: 'Ctrl+D',
      onClick: handleDraft,
    },
    {
      label: 'Publish',
      value: 'publish',
      description: 'Make visible to everyone',
      onClick: handlePublish,
    },
    { type: 'divider' },
    {
      label: 'Delete',
      value: 'delete',
      description: 'Permanently remove',
      onClick: handleDelete,
      disabled: !canDelete,
    },
  ]}
/>
```

### Menu Groups

```tsx
<SplitButton
  label="File"
  onClick={handleNew}
  menuItems={[
    {
      type: 'group',
      label: 'Create',
      items: [
        { label: 'New Document', value: 'doc', onClick: handleNewDoc },
        { label: 'New Spreadsheet', value: 'sheet', onClick: handleNewSheet },
      ],
    },
    {
      type: 'group',
      label: 'Import',
      items: [
        { label: 'From File', value: 'file', onClick: handleImportFile },
        { label: 'From URL', value: 'url', onClick: handleImportUrl },
      ],
    },
  ]}
/>
```

## Common Patterns

### Save Options

```tsx
function DocumentEditor() {
  const handleSave = () => {
    saveDocument();
  };

  const saveMenuItems = [
    {
      label: 'Save and Continue',
      onClick: () => {
        saveDocument();
        // Stay on page
      }
    },
    {
      label: 'Save and Close',
      onClick: () => {
        saveDocument();
        navigate('/documents');
      }
    },
    {
      label: 'Save as Copy',
      onClick: () => {
        saveDocumentCopy();
      }
    },
    {
      label: 'Save as Template',
      onClick: () => {
        saveAsTemplate();
      }
    },
  ];

  return (
    <div className="editor-toolbar">
      <SplitButton
        label="Save"
        variant="primary"
        onClick={handleSave}
        menuItems={saveMenuItems}
      />
    </div>
  );
}
```

### Download Options

```tsx
function DownloadButton({ file }) {
  const downloadMenuItems = [
    {
      label: 'Download Original',
      onClick: () => download(file, 'original')
    },
    {
      label: 'Download Optimized',
      onClick: () => download(file, 'optimized')
    },
    {
      label: 'Download Thumbnail',
      onClick: () => download(file, 'thumbnail')
    },
  ];

  return (
    <SplitButton
      label="Download"
      onClick={() => download(file, 'original')}
      menuItems={downloadMenuItems}
    />
  );
}
```

### Create Actions

```tsx
function CreateButton() {
  const createMenuItems = [
    {
      label: 'New Document',
      icon: FileText,
      onClick: () => createNew('document')
    },
    {
      label: 'New Spreadsheet',
      icon: Table,
      onClick: () => createNew('spreadsheet')
    },
    {
      label: 'New Presentation',
      icon: Presentation,
      onClick: () => createNew('presentation')
    },
    {
      label: 'From Template',
      icon: Copy,
      onClick: () => showTemplates()
    },
  ];

  return (
    <SplitButton
      label="Create"
      variant="primary"
      onClick={() => createNew('document')}
      menuItems={createMenuItems}
    />
  );
}
```

### Email Actions

```tsx
function EmailActions() {
  const emailMenuItems = [
    { label: 'Reply', onClick: handleReply },
    { label: 'Reply All', onClick: handleReplyAll },
    { label: 'Forward', onClick: handleForward },
    { divider: true },
    { label: 'Mark as Read', onClick: handleMarkRead },
    { label: 'Archive', onClick: handleArchive },
  ];

  return (
    <SplitButton
      label="Reply"
      onClick={handleReply}
      menuItems={emailMenuItems}
    />
  );
}
```

## Props

```typescript
interface SplitButtonProps {
  /** Primary button label */
  label: string;
  /** Primary button click handler */
  onClick: () => void;
  /** Menu items for dropdown */
  menuItems: SplitButtonMenuOption[];
  /** Visual variant */
  variant?: SplitButtonVariant;
  /** Size */
  size?: SplitButtonSize;
  /** Compact mode for dense UIs */
  compact?: SplitButtonCompact;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Main button icon */
  icon?: React.ReactNode;
  /** Loading icon (overrides default spinner) */
  loadingIcon?: React.ReactNode;
  /** ARIA label for main button */
  "aria-label"?: string;
  /** ARIA label for dropdown toggle */
  "aria-label-toggle"?: string;
  /** ARIA described by */
  "aria-describedby"?: string;
  /** ARIA expanded state (controlled) */
  "aria-expanded"?: boolean;
  /** ARIA controls for menu */
  "aria-controls"?: string;
  /** ARIA live region */
  "aria-live"?: "off" | "polite" | "assertive";
}

interface SplitButtonMenuItem {
  label: string;
  value: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  description?: string;
  badge?: string | number;
  shortcut?: string;
  "aria-label"?: string;
}

interface SplitButtonMenuDivider {
  type: "divider";
}

interface SplitButtonMenuGroup {
  type: "group";
  label: string;
  items: SplitButtonMenuItem[];
}

type SplitButtonMenuOption = 
  | SplitButtonMenuItem 
  | SplitButtonMenuDivider 
  | SplitButtonMenuGroup;

type SplitButtonVariant =
  | "primary" | "secondary" | "outline" | "ghost" | "text" | "pill" | "border-emphasis"
  | "danger" | "success" | "warning" | "info" | "neutral";

type SplitButtonSize = "sm" | "md" | "lg";
type SplitButtonCompact = "sm" | "md";
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean button separation
2. **Typography before decoration** - Clear action labels
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full keyboard support

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper ARIA roles
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Focus management
- ✅ Screen reader support
- ✅ Menu state announced
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Tab` - Focus button/menu toggle
- `Enter/Space` - Activate focused button
- `Arrow Down` - Open menu (when dropdown focused)
- `Arrow Up/Down` - Navigate menu items
- `Enter/Space` - Select menu item
- `Escape` - Close menu

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Button` - Regular button
- `ButtonGroup` - Button grouping
- `Dropdown` - Menu component
- `IconButton` - Icon-only button

## Best Practices

1. **Primary action should be most common** - Default to the most frequent use case
2. **Limit menu items** - 4-7 items ideal
3. **Group related actions** - Use dividers for organization
4. **Clear labels** - Action verbs work best
5. **Consistent placement** - Keep menu position predictable

## License

MIT
