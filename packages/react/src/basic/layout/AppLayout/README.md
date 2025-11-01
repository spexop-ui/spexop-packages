# AppLayout

**Main application layout component with automatic positioning for TopBar and Sidebar.**

Eliminates the need for manual margin calculations and provides a consistent layout structure for your application. Supports responsive design, accessibility features, and seamless integration with Spexop primitives.

---

## ✅ Features

- ✅ **Automatic positioning** - Handles TopBar and Sidebar offsets automatically
- ✅ **Responsive design** - Mobile-first with configurable breakpoints
- ✅ **Flexible composition** - Works with any TopBar/Sidebar configuration
- ✅ **Responsive dimensions** - TopBar height and Sidebar width support breakpoints
- ✅ **Accessibility first** - ARIA landmarks and semantic HTML
- ✅ **Debug mode** - Visual debugging with layout information
- ✅ **Type-safe** - Full TypeScript support with responsive types
- ✅ **Smooth scrolling** - Optional smooth scroll behavior
- ✅ **Print-friendly** - Optimized styles for printing
- ✅ **Reduced motion** - Respects user preferences

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

### Simple Layout

```tsx
import { AppLayout, TopBar, Sidebar, Container } from '@spexop/react';

function App() {
  return (
    <AppLayout
      topBar={<TopBar logoText="My App" />}
      sidebar={<Sidebar>{/* nav items */}</Sidebar>}
    >
      <Container>
        <h1>Welcome to My App</h1>
        <p>Your content here...</p>
      </Container>
    </AppLayout>
  );
}
```

### Responsive Layout

```tsx
import { AppLayout, TopBar, Sidebar } from '@spexop/react';

function App() {
  return (
    <AppLayout
      topBar={<TopBar logoText="My App" />}
      sidebar={<Sidebar>{/* nav items */}</Sidebar>}
      topBarHeight={{ xs: 56, md: 64 }}
      sidebarWidth={{ xs: 0, md: 280, lg: 320 }}
    >
      <YourContent />
    </AppLayout>
  );
}
```

### Without Sidebar

```tsx
import { AppLayout, TopBar, Container } from '@spexop/react';

function App() {
  return (
    <AppLayout
      topBar={<TopBar logoText="My App" />}
      hasSidebar={false}
    >
      <Container>
        <h1>Simple Layout</h1>
      </Container>
    </AppLayout>
  );
}
```

### With Custom Dimensions

```tsx
import { AppLayout, TopBar, Sidebar } from '@spexop/react';

function App() {
  return (
    <AppLayout
      topBar={<TopBar height={80} />}
      sidebar={<Sidebar width={280} />}
      topBarHeight={80}
      sidebarWidth={280}
    >
      <YourContent />
    </AppLayout>
  );
}
```

---

## 🎨 Advanced Examples

### Full-Width Hero Section

```tsx
import { AppLayout, TopBar, Sidebar, Hero, Container, Stack } from '@spexop/react';

function LandingPage() {
  return (
    <AppLayout
      topBar={<TopBar logoText="My App" transparent />}
      sidebar={<Sidebar>{/* nav */}</Sidebar>}
    >
      {/* Hero takes full width */}
      <Hero
        title="Welcome"
        subtitle="Build amazing things"
        variant="gradient"
      />
      
      {/* Content uses Container */}
      <Container>
        <Stack gap={8}>
          <Section>Your content</Section>
        </Stack>
      </Container>
    </AppLayout>
  );
}
```

### With Debug Mode

```tsx
import { AppLayout, TopBar, Sidebar } from '@spexop/react';
import { useDebugUtil } from '@spexop/react';

function DebugApp() {
  const { setEnabled, setShowBoundaries, setShowTokens } = useDebugUtil();
  
  // Enable debug mode
  useEffect(() => {
    setEnabled(true);
    setShowBoundaries(true);
    setShowTokens(true);
  }, []);

  return (
    <AppLayout
      topBar={<TopBar logoText="Debug Mode" />}
      sidebar={<Sidebar>{/* nav */}</Sidebar>}
    >
      <YourContent />
    </AppLayout>
  );
}
```

### Custom Semantic Elements

```tsx
import { AppLayout, TopBar, Sidebar } from '@spexop/react';

function ArticlePage() {
  return (
    <AppLayout
      topBar={<TopBar logoText="Blog" />}
      sidebar={<Sidebar>{/* nav */}</Sidebar>}
      as="article"
      ariaLabel="Blog post content"
    >
      <article>
        <h1>Article Title</h1>
        <p>Article content...</p>
      </article>
    </AppLayout>
  );
}
```

---

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `topBar` | `ReactNode` | - | TopBar component to display at the top |
| `sidebar` | `ReactNode` | - | Sidebar component to display on the left |
| `children` | `ReactNode` | **required** | Main content area |
| `hasSidebar` | `boolean` | `true` | Whether sidebar affects layout |
| `topBarHeight` | `ResponsiveProp<number>` | `64` | TopBar height in pixels |
| `sidebarWidth` | `ResponsiveProp<number>` | `320` | Sidebar width in pixels |
| `className` | `string` | `""` | Additional CSS class for main area |
| `style` | `CSSProperties` | `{}` | Additional inline styles for main area |
| `as` | `"main" \| "div" \| "section" \| "article"` | `"main"` | Semantic HTML element |
| `ariaLabel` | `string` | `"Main content"` | ARIA label for screen readers |
| `smoothScroll` | `boolean` | `true` | Enable smooth scrolling |
| `responsive` | `boolean` | `true` | Enable mobile-responsive behavior |
| `mobileBreakpoint` | `number` | `768` | Breakpoint for mobile behavior (px) |

---

## 🎯 Design Principles Applied

### 1. **Primitives before patterns**
Use AppLayout with primitives (Container, Stack, Grid) for content:

```tsx
<AppLayout topBar={<TopBar />} sidebar={<Sidebar />}>
  <Hero variant="gradient" /> {/* Full-width primitive */}
  <Container> {/* Content constraint */}
    <Stack gap={8}> {/* Vertical spacing */}
      <Section>Content</Section>
    </Stack>
  </Container>
</AppLayout>
```

### 4. **Tokens before magic numbers**
All dimensions use design tokens:
- TopBar height: `64px` (default)
- Sidebar width: `320px` (default)
- Mobile breakpoint: `768px` (default)
- All responsive via `ResponsiveProp<number>`

### 5. **Composition before complexity**
Simple, composable API:
- Works with any TopBar/Sidebar configuration
- No complex state management
- Just layout positioning logic

### 6. **Standards before frameworks**
Uses semantic HTML:
- `<main>` by default (can be customized via `as` prop)
- Proper ARIA landmarks
- Native `scroll-behavior`

### 7. **Accessibility before aesthetics**
- ARIA landmarks for screen readers
- Configurable `ariaLabel` for main content
- Focus-visible styles with proper contrast
- Keyboard navigation support
- Reduced motion support
- Print-optimized styles

---

## ♿ Accessibility

- **Semantic HTML**: Uses `<main>` element by default
- **ARIA Labels**: Configurable `ariaLabel` for main content area
- **Focus Management**: Clear focus indicators with proper contrast
- **Screen Reader Support**: Proper landmark regions
- **Keyboard Navigation**: Full keyboard support
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Print Styles**: Optimized layout for printing

---

## 🎨 Integration with Utilities

### With useDebugUtil

```tsx
import { AppLayout } from '@spexop/react';
import { useDebugUtil } from '@spexop/react';

function App() {
  const { enabled, setShowBoundaries } = useDebugUtil();
  
  return (
    <AppLayout topBar={<TopBar />} sidebar={<Sidebar />}>
      <YourContent />
    </AppLayout>
  );
}
```

### With useThemeUtil

```tsx
import { AppLayout, TopBar } from '@spexop/react';
import { useThemeUtil } from '@spexop/react';

function App() {
  const { resolvedMode } = useThemeUtil({ defaultMode: 'auto' });
  
  return (
    <AppLayout
      topBar={<TopBar theme={resolvedMode} />}
      sidebar={<Sidebar />}
    >
      <YourContent />
    </AppLayout>
  );
}
```

---

## 🎨 Layout Constants

Export named constants for manual positioning:

```tsx
import { LAYOUT_CONSTANTS } from '@spexop/react';

console.log(LAYOUT_CONSTANTS.TOPBAR_HEIGHT); // 64
console.log(LAYOUT_CONSTANTS.SIDEBAR_WIDTH); // 320
console.log(LAYOUT_CONSTANTS.SIDEBAR_WIDTH_COLLAPSED); // 64
console.log(LAYOUT_CONSTANTS.MOBILE_BREAKPOINT); // 768
```

Use these when you need consistent dimensions across your app without using AppLayout.

---

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- All modern browsers with CSS Grid and custom properties support

---

## 📚 Related Components

- **TopBar** - Fixed header navigation
- **Sidebar** - Fixed side navigation
- **Container** - Content width constraint
- **Stack** - Vertical/horizontal layout
- **Grid** - Grid layout system
- **Section** - Page section container
- **Hero** - Full-width hero sections

---

## 💡 Tips

1. **Always use primitives** for content inside AppLayout
2. **Match dimensions** - TopBar/Sidebar dimensions should match component props
3. **Use responsive props** for mobile-first design
4. **Full-width sections** - Don't wrap Hero in Container
5. **Enable debug mode** during development to visualize layout
6. **Consider accessibility** - Use proper semantic elements and ARIA labels

---

## 🔄 Migration from Older Versions

If you're using an older version of AppLayout without responsive support:

```tsx
// Old (v0.4.x)
<AppLayout
  topBar={<TopBar />}
  sidebar={<Sidebar />}
  topBarHeight={64}
  sidebarWidth={320}
>

// New (v0.6.0+)
<AppLayout
  topBar={<TopBar />}
  sidebar={<Sidebar />}
  topBarHeight={{ xs: 56, md: 64 }}
  sidebarWidth={{ xs: 0, md: 320 }}
  responsive
>
```

---

## 📝 License

MIT License - Part of the Spexop Design System

---

**Built with ❤️ by [@olmstedian](https://github.com/olmstedian) | [@spexop](https://github.com/spexop-ui)**
