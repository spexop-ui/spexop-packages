# CodeBlock

A redesigned code block component following "The Spexop Way" with refined minimalism, strong borders, high contrast, and token-based design.

## Features

- ✅ **Custom Syntax Highlighting** - Lightweight highlighting with full control over styling
- ✅ **Theme Integration** - Uses theme tokens for seamless integration
- ✅ **No External Dependencies** - Built-in highlighting system
- ✅ **Borders Before Shadows** - Strong 2px borders for separation
- ✅ **Typography Before Decoration** - Font weight for hierarchy (600/700)
- ✅ **High Contrast** - WCAG AAA compliance
- ✅ **Token-Based** - All values from theme system
- ✅ **Multi-Framework** - Support for React, Vue, Angular, Vanilla JS
- ✅ **Line Numbers** - Optional line numbering with high contrast
- ✅ **Actions** - Copy, download, share buttons with clear hierarchy
- ✅ **Variants** - Default, compact, minimal layouts
- ✅ **Responsive** - Mobile-first design with 44px touch targets
- ✅ **Keyboard Navigation** - Full arrow key support for tabs
- ✅ **Accessible** - Enhanced ARIA attributes, live regions, focus management
- ✅ **Performance Optimized** - Memoized highlighting with efficient rendering
- ✅ **Icons from @spexop/icons** - Consistent icon usage across design system

## Installation

```bash
npm install @spexop/react
# or
pnpm add @spexop/react
```

## Basic Usage

### Simple Code Block

```tsx
import { CodeBlock } from '@spexop/react';

function Example() {
  return (
    <CodeBlock
      code="const hello = 'world';"
      language="javascript"
      title="Hello World"
    />
  );
}
```

### With Syntax Highlighting and Line Numbers

```tsx
import { CodeBlock } from '@spexop/react';

const code = `import { Button } from '@spexop/react';
import { Plus } from '@spexop/icons';

export function MyComponent() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      <Plus size={20} />
      Add Item
    </Button>
  );
}`;

function Example() {
  return (
    <CodeBlock
      code={code}
      language="typescript"
      title="Button Example"
      meta="19 lines • 486 bytes"
      enableSyntaxHighlighting  // Custom lightweight highlighting (enabled by default)
      showLineNumbers
      showCopy
      showDownload
      infoBadge="React 18+"
      onCopy={(code) => console.log('Copied:', code)}
    />
  );
}
```

### Multi-Framework Tabs

```tsx
import { CodeBlock } from '@spexop/react';

const reactCode = `import { Grid, GridItem } from '@spexop/react';

export function MyLayout() {
  return (
    <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
      <GridItem>Card 1</GridItem>
      <GridItem>Card 2</GridItem>
      <GridItem>Card 3</GridItem>
    </Grid>
  );
}`;

const vueCode = `<template>
  <Grid :columns="{ xs: 1, md: 2, lg: 3 }" :gap="6">
    <GridItem>Card 1</GridItem>
    <GridItem>Card 2</GridItem>
    <GridItem>Card 3</GridItem>
  </Grid>
</template>

<script setup>
import { Grid, GridItem } from '@spexop/react';
</script>`;

const angularCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-my-layout',
  template: \`
    <spexop-grid [columns]="{ xs: 1, md: 2, lg: 3 }" [gap]="6">
      <spexop-grid-item>Card 1</spexop-grid-item>
      <spexop-grid-item>Card 2</spexop-grid-item>
      <spexop-grid-item>Card 3</spexop-grid-item>
    </spexop-grid>
  \`
})
export class MyLayoutComponent {}`;

function Example() {
  return (
    <CodeBlock
      code={[
        { framework: 'react', code: reactCode },
        { framework: 'vue', code: vueCode },
        { framework: 'angular', code: angularCode }
      ]}
      title="Grid Layout"
      showCopy
      infoBadge="Multi-Framework"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string \| FrameworkTab[]` | **Required** | Code content or array of framework tabs |
| `language` | `CodeLanguage` | `"javascript"` | Programming language for syntax highlighting |
| `title` | `string` | - | Title displayed in header |
| `meta` | `string` | - | Meta info (file size, line count, etc.) |
| `enableSyntaxHighlighting` | `boolean` | `true` | Enable custom syntax highlighting |
| `showLineNumbers` | `boolean` | `false` | Show line numbers |
| `showCopy` | `boolean` | `true` | Show copy button |
| `showDownload` | `boolean` | `false` | Show download button |
| `showShare` | `boolean` | `false` | Show share button |
| `customActions` | `ReactNode` | - | Custom action buttons |
| `infoBadge` | `string` | - | Info badge in action bar |
| `variant` | `"default" \| "compact" \| "minimal"` | `"default"` | Component variant |
| `activeFramework` | `Framework` | - | Active framework (controlled) |
| `onFrameworkChange` | `(framework: Framework) => void` | - | Framework change callback |
| `onCopy` | `(code: string) => void` | - | Copy callback |
| `onDownload` | `(code: string, language: string) => void` | - | Download callback |
| `onShare` | `(code: string) => void` | - | Share callback |
| `maxHeight` | `string \| number` | `"40vh"` | Maximum height of code area |
| `copyButtonLabel` | `string` | `"Copy Code"` | Copy button label |
| `copiedLabel` | `string` | `"Copied!"` | Copied state label |
| `downloadButtonLabel` | `string` | `"Download"` | Download button label |
| `shareButtonLabel` | `string` | `"Share"` | Share button label |
| `hideHeader` | `boolean` | `false` | Hide header entirely |
| `hideActions` | `boolean` | `false` | Hide action bar entirely |
| `className` | `string` | - | Additional CSS class |
| `aria-label` | `string` | - | ARIA label for accessibility |

## Types

### CodeLanguage

```typescript
type CodeLanguage =
  | "typescript"
  | "javascript"
  | "tsx"
  | "jsx"
  | "css"
  | "html"
  | "json"
  | "bash"
  | "shell"
  | "python"
  | "rust"
  | "go"
  | string;
```

### Framework

```typescript
type Framework = "react" | "vue" | "angular" | "vanilla" | string;
```

### FrameworkTab

```typescript
interface FrameworkTab {
  framework: Framework;
  label?: string;
  code: string;
}
```

## Variants

### Default

Full featured with header, line numbers, and action bar.

```tsx
<CodeBlock
  code={code}
  language="typescript"
  title="Full Featured"
  showLineNumbers
  showCopy
  showDownload
/>
```

### Compact

Reduced padding for inline contexts.

```tsx
<CodeBlock
  code={code}
  language="javascript"
  variant="compact"
  showCopy
/>
```

### Minimal

Code only, no header or extra chrome.

```tsx
<CodeBlock
  code={code}
  language="css"
  variant="minimal"
  hideHeader
/>
```

## Custom Actions

Add custom buttons to the action bar:

```tsx
import { CodeBlock } from '@spexop/react';

function Example() {
  return (
    <CodeBlock
      code={code}
      showCopy
      customActions={
        <>
          <button onClick={handleStackBlitz}>
            Open in StackBlitz
          </button>
          <button onClick={handleCodeSandbox}>
            Open in CodeSandbox
          </button>
        </>
      }
    />
  );
}
```

## Accessibility

CodeBlock follows WCAG AAA guidelines:

### High Contrast

- **Text**: 15:1 contrast (neutral-900 on white) ✅
- **Secondary text**: 7:1 contrast (neutral-700) ✅
- **Borders**: 3.2:1 contrast (neutral-400) ✅
- **Line numbers**: 6:1 contrast (neutral-300 on dark) ✅

### Keyboard Navigation

**Full keyboard support for all interactions:**

- **Tab**: Focus code block and navigate action buttons
- **Enter/Space**: Activate buttons
- **Arrow Right**: Move to next framework tab
- **Arrow Left**: Move to previous framework tab
- **Home**: Jump to first framework tab
- **End**: Jump to last framework tab

**Roving tabindex** ensures only the active tab is in tab order for efficient navigation.

### Screen Readers

- Semantic HTML (`<section>`, `<h3>`, `<button>`)
- ARIA labels on all interactive elements
- `role="tablist"` for framework tabs with `aria-label`
- `role="tabpanel"` for code content
- `aria-describedby` linking code to language badge
- `aria-live="polite"` for copy status announcements
- `aria-selected` state for active tab

### Reduced Motion

Respects `prefers-reduced-motion: reduce` - disables all transitions.

### High Contrast Mode

Respects `prefers-contrast: high` - increases border widths to 3px.

## Design Principles

### 1. Borders Before Shadows

Strong 2-3px borders for all separations:

```css
border: 2px solid var(--s-color-neutral-400);  /* ✅ 3.2:1 contrast */
border-bottom: 2px solid var(--s-color-neutral-400);  /* Header separator */
border-top: 2px solid var(--s-color-neutral-400);  /* Action bar separator */
```

### 2. Typography Before Decoration

Font weight for hierarchy, not lighter colors:

```css
/* Title */
font-weight: var(--s-font-weight-semibold);  /* 600 */

/* Active tab */
font-weight: var(--s-font-weight-bold);  /* 700 */

/* Line numbers */
font-weight: var(--s-font-weight-semibold);  /* 600 - bolder for clarity */
```

### 3. High Contrast Colors

WCAG AAA compliance:

```css
/* Primary text - 15:1 contrast */
color: var(--s-color-neutral-900);  /* #171717 */

/* Secondary text - 7:1 contrast */
color: var(--s-color-neutral-700);  /* #404040 */

/* Borders - 3.2:1 contrast */
border-color: var(--s-color-neutral-400);  /* #a3a3a3 */

/* Line numbers - 6:1 contrast */
color: var(--s-color-neutral-300);  /* #d4d4d4 (dark theme) */
```

### 4. Token-Based Design

All values from `@spexop/theme`:

```tsx
// Spacing
padding: var(--s-spacing-4);  // 16px
padding: var(--s-spacing-5);  // 20px

// Typography
font-size: var(--s-font-size-sm);  // 14px
font-weight: var(--s-font-weight-semibold);  // 600

// Border Radius
border-radius: var(--s-radius-md);  // 8px
border-radius: var(--s-radius-sm);  // 4px
```

## Responsive Design

Mobile-first with breakpoint at 768px:

```css
@media (max-width: 768px) {
  /* Smaller padding */
  padding: var(--s-spacing-3) var(--s-spacing-4);
  
  /* Smaller font */
  font-size: var(--s-font-size-xs);
  
  /* Vertical action bar */
  flex-direction: column;
  
  /* Full-width buttons */
  button { width: 100%; }
}
```

## Dark Theme Support

Automatically adapts to `[data-theme="dark"]`:

```css
/* Light theme */
background: var(--s-color-white);
border-color: var(--s-color-neutral-400);
color: var(--s-color-neutral-900);

/* Dark theme */
[data-theme="dark"] .codeblock {
  background: var(--s-color-neutral-800);
  border-color: var(--s-color-neutral-600);
  color: var(--s-color-neutral-50);
}
```

**Note**: Code area adapts to theme - light background (`neutral-50`) in light theme, dark background (`neutral-950`) in dark theme.

## Syntax Highlighting

CodeBlock includes **custom lightweight syntax highlighting** with full control over styling and spacing.

### What's New in v3.1

- **Custom highlighting engine** - Built-in lightweight syntax highlighter
- **Full control over styling** - No external dependencies or inline style conflicts
- **Perfect spacing control** - Custom letter-spacing and token spacing
- **Theme token integration** - Uses your design system colors directly
- **Performance optimized** - Memoized with `useMemo` for efficient re-renders
- **Error resilient** - Graceful fallback to plain text on highlighting errors

### Supported Languages

Currently supports:

- **TypeScript/TSX** - Full keyword, operator, and syntax highlighting
- **JavaScript/JSX** - Complete JS syntax support
- **CSS** - Style declarations and properties
- **HTML** - Markup and tag highlighting
- **JSON** - Structure and value highlighting

### Token Types

Our custom highlighter identifies and styles:

- **Keywords** - `const`, `let`, `function`, `return`, etc. (Primary color)
- **Strings** - Text in quotes (Success color)
- **Numbers** - Numeric values (Warning color)
- **Operators** - `+`, `-`, `=`, etc. (Secondary text color)
- **Punctuation** - `()`, `[]`, `{}`, etc. (Secondary text color)
- **Variables** - Component names like `Grid`, `GridItem` (Info color)
- **Comments** - `//` and `/* */` (Muted text color)

### Disable Syntax Highlighting

If you prefer plain monospace text:

```tsx
<CodeBlock
  code={code}
  language="typescript"
  enableSyntaxHighlighting={false}  // Disable colored syntax
/>
```

## Performance

CodeBlock v3.1 is optimized for efficient rendering:

### Memoization

- **Syntax highlighting** uses `useMemo` to cache results
- Only re-highlights when code, language, or highlighting setting changes
- Prevents unnecessary re-computation on parent re-renders

### Error Handling

- Highlighting errors fail gracefully with plain text fallback
- No console errors in production
- Silent recovery maintains user experience

### Rendering Optimization

- Line numbers rendered only when enabled
- Tokens generated once and reused
- Efficient token rendering with stable keys

### Best Practices for Performance

```tsx
// ✅ Good: Stable code string
const code = `const hello = 'world';`;
<CodeBlock code={code} language="javascript" />

// ❌ Avoid: Inline code (creates new string on every render)
<CodeBlock code={`const hello = 'world';`} language="javascript" />

// ✅ Good: Controlled framework switching
const [framework, setFramework] = useState('react');
<CodeBlock 
  code={frameworkCode}
  activeFramework={framework}
  onFrameworkChange={setFramework}
/>
```

## Examples

### Basic Example

```tsx
<CodeBlock
  code="console.log('Hello World');"
  language="javascript"
/>
```

### With Title and Meta

```tsx
<CodeBlock
  code={code}
  language="typescript"
  title="Button Component"
  meta="24 lines • 486 bytes"
  showCopy
/>
```

### With Line Numbers

```tsx
<CodeBlock
  code={code}
  language="typescript"
  showLineNumbers
  showCopy
/>
```

### Compact Variant

```tsx
<CodeBlock
  code={code}
  language="css"
  variant="compact"
  showCopy
/>
```

### Multi-Framework

```tsx
<CodeBlock
  code={[
    { framework: 'react', label: 'React', code: reactCode },
    { framework: 'vue', label: 'Vue 3', code: vueCode },
    { framework: 'angular', label: 'Angular', code: angularCode }
  ]}
  title="Grid Example"
  showCopy
  infoBadge="All Frameworks"
/>
```

### With Custom Actions

```tsx
<CodeBlock
  code={code}
  showCopy
  customActions={
    <button onClick={handleEdit}>
      Edit in CodePen
    </button>
  }
/>
```

## Comparison with Previous Versions

| Feature | CodeBlock v1 | CodeBlock v2 (Prism) | CodeBlock v3 (Current) |
|---------|--------------|----------------------|------------------------|
| **Syntax Engine** | Prism.js | Prism-react-renderer | Custom lightweight ✅ |
| **Theme Integration** | Hardcoded colors | Hardcoded colors | Theme tokens ✅ |
| **Theme Switching** | Static | Static | Real-time ✅ |
| **Background Highlights** | Yes (buggy) | Yes (ugly white) | None ✅ |
| **Language Support** | 50+ languages | 50+ languages | Extensible ✅ |
| **Language badge** | Overlay on code | Header (no overlap) | Header (no overlap) ✅ |
| **Line numbers** | Low contrast | High contrast | High contrast ✅ |
| **Action bar** | Top + Bottom | Single bottom bar | Single bottom bar ✅ |
| **Copy button** | Floating over code | Clean action bar | Clean action bar ✅ |
| **Header** | No separation | Strong 2px border | Strong 2px border ✅ |
| **Spacing** | Inconsistent | Token-based | Theme tokens ✅ |
| **Borders** | 1px subtle | 2-3px strong | 2px strong ✅ |
| **Typography** | Color-based | Weight-based | Weight-based ✅ |
| **Keyboard Navigation** | None | None | Full arrow key support ✅ |
| **Touch Targets** | Variable | Variable | 44px minimum (WCAG) ✅ |
| **Performance** | Basic | Basic | Memoized + optimized ✅ |
| **Icons** | Inline SVG | Inline SVG | @spexop/icons ✅ |

## Best Practices

### DO ✅

- Use token-based spacing from theme system
- Use font weight for hierarchy (600/700), not lighter colors
- Show line numbers for longer code examples (10+ lines)
- Provide descriptive `title` and `meta` information
- Use `infoBadge` for version/compatibility info
- Test keyboard navigation (Tab, Arrow keys, Home, End, Enter, Space)
- Ensure 44px minimum touch targets (automatically handled)
- Use stable code strings (avoid inline template literals)
- Leverage memoization for performance

### DON'T ❌

- Don't hardcode colors or spacing values
- Don't use subtle grays for text (use neutral-700+)
- Don't use 1px borders (use 2-3px for visibility)
- Don't float buttons over code area
- Don't skip ARIA labels on icon-only buttons
- Don't forget to handle copy/download callbacks

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Chrome Android 90+

## Related Components

- **CodeBlock** - Original code block component (v1.0)
- **Card** - Container component with similar border styling
- **Button** - Action buttons used in action bar
- **Grid** - Layout examples shown in code blocks

## Migration Guide

**See [USAGE-GUIDE.md](./USAGE-GUIDE.md) for detailed backward compatibility information and upgrade instructions.**

### From v2 (Prism) to v3 (Current)

**Good news!** The API is completely compatible. No code changes needed! Just upgrade:

```bash
pnpm update @spexop/react
```

The component will automatically:

- ✅ Use custom lightweight highlighting instead of Prism
- ✅ Adapt to your site's theme system
- ✅ Remove background highlight issues
- ✅ Provide better performance with memoization
- ✅ Add full keyboard navigation support
- ✅ Use @spexop/icons for consistent design

### From v1 to v3

```tsx
// Before (CodeBlock v1)
<CodeBlock
  examples={{ react: code }}
  title="Example"
  showLineNumbers
  enableTesting={false}
/>

// After (CodeBlock v3)
<CodeBlock
  code={code}
  language="react"
  title="Example"
  showLineNumbers
  showCopy
/>
```

### Breaking Changes

**None!** v2 → v3 is backward compatible.

### New Features in v3.1

- ✅ **Keyboard Navigation**: Arrow keys, Home, End for tab navigation
- ✅ **Enhanced ARIA**: Live regions, better screen reader support
- ✅ **Performance**: Memoized syntax highlighting
- ✅ **Touch Targets**: 44px minimum for WCAG compliance
- ✅ **Icons**: Migrated to @spexop/icons library
- ✅ **Accessibility**: Improved focus management and keyboard support

## Contributing

When contributing to CodeBlock:

1. Follow "The Spexop Way" design principles
2. Maintain WCAG AAA contrast ratios
3. Use tokens from `@spexop/theme` only
4. Test keyboard navigation and screen readers
5. Add tests for new features
6. Update documentation with examples

## Author

@olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui

## License

MIT © Spexop Design System
