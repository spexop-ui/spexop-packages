# PageLayout

**Page-level layout container with responsive padding and centered content.**

Built on the Container primitive with page-optimized defaults (1600px max-width, responsive padding scaling). Includes debug mode for development and seamless integration with Spexop utility hooks.

---

## ✅ Features

- ✅ **1600px default max-width** - Optimized for page layouts
- ✅ **Responsive padding** - 24px (mobile) → 40px (tablet) → 64px (desktop)
- ✅ **Semantic variants** - String-based padding ('sm', 'md', 'lg', 'xl')
- ✅ **Numeric precision** - SpacingScale values (0-10)
- ✅ **Debug mode** - Visual debugging with layout information
- ✅ **Built on Container** - Inherits all Container features
- ✅ **Centered by default** - Automatic horizontal centering
- ✅ **Polymorphic** - Renders as any HTML element
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Accessibility** - Semantic HTML and WCAG AA+ compliance
- ✅ **Print-friendly** - Optimized styles for printing

---

## 📦 Installation

```bash
npm install @spexop/react
# or
pnpm add @spexop/react
# or
yarn add @spexop/react
```

---

## 🎯 Basic Usage

### Default Usage

```tsx
import { PageLayout } from '@spexop/react';

function MyPage() {
  return (
    <PageLayout>
      <h1>Welcome to My Page</h1>
      <p>Content is centered with 1600px max-width and responsive padding.</p>
    </PageLayout>
  );
}
```

### Semantic Padding (Recommended)

```tsx
<PageLayout padding="lg">
  <h1>Page Title</h1>
  <p>Uses semantic padding variant that scales responsively.</p>
</PageLayout>
```

### Numeric Padding (Precise Control)

```tsx
<PageLayout padding={8}>
  <h1>Page Title</h1>
  <p>Uses exact numeric spacing scale value (40px).</p>
</PageLayout>
```

### Custom Max-Width

```tsx
<PageLayout maxWidth="xl">
  <h1>Narrower Page</h1>
  <p>Content constrained to 1536px instead of 1600px.</p>
</PageLayout>
```

### As Main Element

```tsx
<PageLayout as="main">
  <h1>Main Content</h1>
  <p>Renders as semantic main element.</p>
</PageLayout>
```

---

## 🎨 Advanced Examples

### Full Page Layout

```tsx
import { PageLayout } from '@spexop/react';

function BlogPost() {
  return (
    <PageLayout as="main" padding="lg">
      <header>
        <h1>Blog Post Title</h1>
        <p>Published on Nov 1, 2025</p>
      </header>
      <article>
        <p>Main content...</p>
      </article>
      <footer>
        <p>© 2025 My Blog</p>
      </footer>
    </PageLayout>
  );
}
```

### Narrow Content Page

```tsx
<PageLayout maxWidth="md" padding="md">
  <h1>Blog Post</h1>
  <p>Narrower content for better readability (768px max-width).</p>
</PageLayout>
```

### No Padding (Full-Bleed Content)

```tsx
<PageLayout padding="none">
  <img src="hero.jpg" alt="Hero" style={{ width: '100%' }} />
  <PageLayout padding="lg">
    <h1>Content Below Hero</h1>
  </PageLayout>
</PageLayout>
```

### Custom Responsive Padding

```tsx
<PageLayout padding={{ xs: 4, sm: 6, md: 8, lg: 10 }}>
  <h1>Custom Responsive Padding</h1>
  <p>16px → 24px → 40px → 64px</p>
</PageLayout>
```

### With Debug Mode

```tsx
import { PageLayout } from '@spexop/react';
import { useDebugUtil } from '@spexop/react';
import { useEffect } from 'react';

function DebugPage() {
  const { setEnabled, setShowBoundaries, setShowTokens } = useDebugUtil();
  
  useEffect(() => {
    setEnabled(true);
    setShowBoundaries(true);
    setShowTokens(true);
  }, []);

  return (
    <PageLayout padding="lg">
      <h1>Debug Mode Enabled</h1>
      <p>See visual boundaries and layout info</p>
    </PageLayout>
  );
}
```

---

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Page content |
| `maxWidth` | `ContainerMaxWidth` | `'page'` | Maximum width of container |
| `padding` | `SpacingScale \| SpacingVariant \| ResponsiveProp` | `'lg'` | Padding around content |
| `centered` | `boolean` | `true` | Center container horizontally |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | `{}` | Inline styles |
| `as` | `ElementType` | `'div'` | HTML element type |

### MaxWidth Options

| Value | Width | Use Case |
|-------|-------|----------|
| `'sm'` | 640px | Narrow content (blog posts) |
| `'md'` | 768px | Medium content (articles) |
| `'lg'` | 1024px | Standard content |
| `'xl'` | 1536px | Wide content |
| `'2xl'` | 1920px | Extra wide |
| `'page'` | **1600px** | **Page layouts (default)** |
| `'full'` | 100% | Full width (no constraint) |

### Padding Options

#### String Variants (Semantic)

| Value | Maps To | Size | Responsive Behavior |
|-------|---------|------|---------------------|
| `'none'` | 0 | 0px | No padding |
| `'sm'` | 4 | 16px | Static |
| `'md'` | 6 | 24px | Static |
| `'lg'` | 8 | **40px base** | **24px → 40px → 64px** ✅ |
| `'xl'` | 10 | 64px | Static |

#### Numeric Values (Precise)

Use SpacingScale values (0-16) that map to design tokens:

- `0` = 0px (--theme-spacing-0)
- `1` = 4px (--theme-spacing-1)
- `2` = 8px (--theme-spacing-2)
- `3` = 12px (--theme-spacing-3)
- `4` = 16px (--theme-spacing-4)
- `5` = 20px (--theme-spacing-5)
- `6` = 24px (--theme-spacing-6)
- `7` = 32px (--theme-spacing-7)
- `8` = 40px (--theme-spacing-8)
- `9` = 48px (--theme-spacing-9)
- `10` = 64px (--theme-spacing-10)

#### Responsive Objects

```tsx
padding={{ xs: 4, md: 6, xl: 10 }}
// 16px mobile → 24px tablet → 64px desktop
```

---

## 🎯 Design Principles Applied

### 1. **Primitives before patterns**
Built on Container primitive:

```tsx
// PageLayout is a smart wrapper around Container
<PageLayout padding="lg">
  {/* Container handles the layout */}
</PageLayout>
```

### 4. **Tokens before magic numbers**
All spacing uses design tokens:
- `padding="lg"` → `--theme-spacing-8` (40px)
- `maxWidth="page"` → `1600px` (page constant)

### 5. **Composition before complexity**
Simple, composable API:

```tsx
<PageLayout padding="lg">
  <Stack gap={8}>
    <Section>Content 1</Section>
    <Section>Content 2</Section>
  </Stack>
</PageLayout>
```

### 6. **Standards before frameworks**
Uses semantic HTML:

```tsx
<PageLayout as="main"> {/* Semantic HTML5 */}
  <article>
    <h1>Title</h1>
  </article>
</PageLayout>
```

### 7. **Accessibility before aesthetics**
- Semantic HTML elements
- Focus-visible styles
- Print-optimized layouts
- No accessibility barriers

---

## ♿ Accessibility

- **Semantic HTML**: Supports `main`, `article`, `section`, etc.
- **Focus Management**: Clear focus indicators with proper contrast
- **Screen Readers**: No barriers introduced
- **Keyboard Navigation**: Full support
- **Print Styles**: Optimized for printing
- **Reduced Motion**: Respects user preferences (inherited from Container)

---

## 🎨 Integration with Utilities

### With useDebugUtil

```tsx
import { PageLayout } from '@spexop/react';
import { useDebugUtil } from '@spexop/react';

function App() {
  const { enabled, setShowBoundaries, setShowTokens } = useDebugUtil();
  
  return (
    <PageLayout padding="lg">
      <button onClick={() => setShowBoundaries(!enabled)}>
        Toggle Debug
      </button>
      <YourContent />
    </PageLayout>
  );
}
```

### With useThemeUtil

```tsx
import { PageLayout } from '@spexop/react';
import { useThemeUtil } from '@spexop/react';

function App() {
  const { resolvedMode } = useThemeUtil({ defaultMode: 'auto' });
  
  return (
    <PageLayout 
      padding="lg"
      className={resolvedMode === 'dark' ? 'dark-theme' : ''}
    >
      <YourContent />
    </PageLayout>
  );
}
```

---

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern browsers with CSS Grid and custom properties support

---

## 📚 Related Components

- **Container** - Base primitive for max-width constraints
- **AppLayout** - Application layout with TopBar and Sidebar
- **Section** - Floating card-style sections
- **Hero** - Hero sections with media
- **Stack** - Vertical/horizontal stacking
- **Grid** - Grid layout system

---

## 💡 Tips

1. **Use semantic padding** - Prefer `padding="lg"` over numeric values
2. **Nest PageLayouts** - Create full-bleed sections within pages
3. **Combine with primitives** - Use Stack/Grid inside PageLayout
4. **Enable debug mode** - Visualize layout during development
5. **Consider max-width** - Choose appropriate max-width for content type

---

## 🔄 Migration from Older Versions

If you're using an older version without debug support:

```tsx
// Old (v0.4.x)
<PageLayout padding="lg">
  <YourContent />
</PageLayout>

// New (v0.6.0+) - Same API, with debug features
<PageLayout padding="lg">
  <YourContent />
</PageLayout>

// Enable debug mode
const { setEnabled, setShowBoundaries } = useDebugUtil();
setEnabled(true);
setShowBoundaries(true);
```

---

## 📝 Version

**v0.6.0** - Updated 2025-11-01

**Changes:**
- Added `useDebug` integration
- Added prop validation in development mode
- Added debug info display
- Improved CSS with design tokens
- Enhanced accessibility features
- Added print styles

---

## 📝 License

MIT License - Part of the Spexop Design System

---

**Built with ❤️ by [@olmstedian](https://github.com/olmstedian) | [@spexop](https://github.com/spexop-ui)**
