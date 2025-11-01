# Getting Started with Spexop

## Quick Start with CLI (Recommended)

The fastest way to get started:

```bash
# Create a new Spexop application (no installation needed)
npx @spexop/cli create my-app

# Or install globally
npm install -g @spexop/cli
spexop create my-app

# Follow the interactive prompts to choose your template
```

This will scaffold a complete Spexop application with everything configured.

## Manual Installation

```bash
# Install packages (latest v0.6.0+)
npm install @spexop/react@^0.6.0 @spexop/theme@^0.6.0 @spexop/icons@^0.6.0

# Or with pnpm
pnpm add @spexop/react@^0.6.0 @spexop/theme@^0.6.0 @spexop/icons@^0.6.0

# Or with yarn
yarn add @spexop/react@^0.6.0 @spexop/theme@^0.6.0 @spexop/icons@^0.6.0

# Optional: Install CLI for utilities
npm install -D @spexop/cli@^0.6.2
```

**Note**: If you're migrating from v0.3.x or v0.4.x, see the [Migration Guides](./migrations/) for detailed instructions.

## Usage Options

### Option 1: Pre-built CSS (Easiest)

Import a ready-made theme:

```typescript
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';
import { Button, Grid, Card } from '@spexop/react';

// Components automatically use the tech theme
```

Available themes: default, tech, startup, healthcare, finance, ecommerce, education, corporate, agency, minimal, dark, pastel, vibrant

### Option 2: Utilities (Recommended - No Providers)

Use utilities directly without provider wrappers:

```typescript
import { useThemeUtil } from '@spexop/react';
import { generateCSS, techPreset } from '@spexop/theme';
import { useEffect } from 'react';

function App() {
  // Inject theme CSS variables
  useEffect(() => {
    const css = generateCSS(techPreset);
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }, []);

  // Use theme mode utility
  const { resolvedMode, setMode } = useThemeUtil({ defaultMode: 'auto' });

  return (
    <>
      <YourComponents />
      <button onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </>
  );
}
```

### Option 3: ThemeProvider (Deprecated - Use for Theme Config Only)

> **Note**: `ThemeProvider` is deprecated. Use `useThemeUtil` for mode management and `generateCSS()` for theme injection instead. See [Migration Guide](./migrations/from-providers-to-utilities.md).

If you need theme configuration injection (CSS variables), you can still use `ThemeProvider`:

```typescript
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

function App() {
  return (
    <ThemeProvider theme={techPreset} defaultMode="auto">
      <YourComponents />
    </ThemeProvider>
  );
}
```

For custom themes:

```typescript
import { ThemeProvider } from '@spexop/react';
import { generateCSS } from '@spexop/theme';
import type { SpexopThemeConfig } from '@spexop/theme';

const myTheme: SpexopThemeConfig = {
  meta: { name: "My Brand", version: "1.0.0" },
  colors: {
    primary: "#your-color",
    secondary: "#your-color",
    accent: "#your-color",
    // ... other colors
  },
};

// Better approach: use generateCSS
useEffect(() => {
  const css = generateCSS(myTheme);
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}, []);

// Or use ThemeProvider (deprecated)
<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

## Framework Integration

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

### Next.js

```typescript
// app/layout.tsx or pages/_app.tsx
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### Create React App

```typescript
// index.tsx
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';
import App from './App';
```

## What's New in v0.4.0

### Major Breaking Changes

#### Component Structure Reorganization

- Removed specialized card components (BlogCard, ProductCard, etc.) - use composition patterns instead
- Eliminated "advanced" category - components moved to semantic categories
- Renamed "display" to "indicators" for clarity
- Moved components to semantic categories for better organization

#### Import Path Changes

- Navigation components moved from `advanced/` to `navigation/`
- Button components moved from `display/` to `buttons/`
- Layout components moved from `display/` to `layout/`
- Feedback components moved from `display/` to `feedback/`
- Animation hooks moved from `animations/` to `hooks/`

### New Features

#### Composition Patterns

- New `src/patterns/cards/` directory with 11 card composition examples
- BlogCard, ProductCard, PricingCard, ProfileCard, TestimonialCard patterns
- TeamMemberCard, FeatureCard, StatCard, MediaCard, EventCard, ComparisonCard patterns
- Complete TypeScript interfaces and usage examples

#### Enhanced Accessibility

- WCAG AAA compliance improvements across all components
- Enhanced focus indicators (2px solid outline with 2px offset)
- Minimum 44x44px touch targets for all interactive elements
- Improved screen reader support with better ARIA labels
- High contrast mode support for better visibility

#### Mobile Optimization

- Safe area insets support for mobile devices with notches
- Dynamic viewport height (`100dvh`) for proper mobile height calculations
- Enhanced touch feedback with active state scaling
- Improved responsive layouts for all components
- Mobile-optimized typography (16px minimum to prevent iOS zoom)

#### Performance Improvements

- 10-15% bundle size reduction through better tree-shaking
- Hardware-accelerated animations for better performance
- Optimized touch scrolling with momentum on mobile
- Lazy loading support for images and non-critical content

### Migration from v0.3.x

#### Quick Migration Steps

1. Update packages: `npm install @spexop/react@^0.4.0 @spexop/theme@^0.4.0`
2. Update imports: Replace category-specific imports with main package imports
3. Replace specialized cards: Use composition patterns from `src/patterns/cards/`
4. Update TypeScript types: Create your own type definitions for removed components
5. Test thoroughly: Verify all components work correctly

#### Detailed Migration Guides

- [React Migration Guide](./migrations/from-v0.3-to-v0.4.md) - Complete React package migration
- [Theme Migration Guide](./migrations/theme-from-v0.3-to-v0.4.md) - Complete Theme package migration
- [Migration Overview](./migrations/v0.4.0-overview.md) - High-level migration strategy

## What's New in v0.3.0

### New Component Categories

- #### Data Components

```typescript
import { DataTable, DataGrid, Chart } from '@spexop/react';

<DataTable columns={columns} data={data} sortable filterable />
```

- #### Feedback Components

```typescript
import { Alert, Spinner, Progress, Skeleton, Toast, EmptyState } from '@spexop/react';

<Alert variant="success">Operation successful!</Alert>
<Spinner size="lg" />
<Progress value={75} />
```

- #### Typography Components

```typescript
import { Heading, Text, Link, Code } from '@spexop/react';

<Heading level={1}>Page Title</Heading>
<Text size="lg">Body text</Text>
<Link href="/docs">Documentation</Link>
```

### New Hooks (33+ total)

```typescript
// Storage
const [value, setValue] = useLocalStorage('key', defaultValue);

// Browser APIs
const isOnline = useOnline();
const size = useWindowSize();

// Interaction
const ref = useClickOutside(() => setIsOpen(false));
const isHovering = useHover(ref);

// Utilities
const debouncedValue = useDebounce(value, 500);
const [copied, copy] = useCopyToClipboard();
```

### Utilities (Recommended)

```typescript
import { 
  useToastUtil,
  useModalUtil,
  useThemeUtil,
  useAccessibilityUtil
} from '@spexop/react';

// No provider wrappers needed!
function App() {
  const { toast, renderToasts } = useToastUtil();
  const { openModal, renderModals } = useModalUtil();
  const { resolvedMode, setMode } = useThemeUtil({ defaultMode: 'auto' });
  const { prefersReducedMotion } = useAccessibilityUtil();
  
  return (
    <>
      <YourComponents />
      {renderToasts()}
      {renderModals()}
    </>
  );
}
```

> **Note**: Providers are deprecated. See [Migration Guide: Providers to Utilities](../docs/migrations/from-providers-to-utilities.md) for details.

### Enhanced Components

- **Carousel** - New slideshow component with touch/swipe support
- **CodeBlock v3** - Redesigned with custom syntax highlighting
- **Card** - New sub-component API (CardHeader, CardBody, CardFooter)
- **Button** - New semantic variants (danger, success, warning, info, neutral)

### Documentation

All 59 components now include:

- Comprehensive README.md
- USAGE-GUIDE.md with practical examples
- Component tests with Vitest
- TypeScript .types.ts files

## Development Status

Version 0.4.0 is a major release with significant improvements in accessibility, mobile optimization, and performance. The library follows "The Spexop Way" design principles and provides a stable foundation for production applications.

**Key Improvements in v0.4.0:**

- WCAG AAA accessibility compliance
- Enhanced mobile experience with safe area support
- 10-15% performance improvements
- Better component organization and composition patterns
- Comprehensive migration guides for smooth upgrades

## Next Steps

- **New to Spexop?** Explore [Examples](../examples/) to see components in action
- **Migrating from v0.3.x?** Check the [Migration Guides](./migrations/) for detailed instructions
- **Building with Spexop?** Read the [Component Docs](../packages/react/README.md) and [Theme System Guide](../packages/theme/README.md)
- **Using the CLI?** See the [CLI Tools](../packages/cli/README.md) for scaffolding, audits, and tokens
- **Need Help?** Join our [Discord Community](https://discord.gg/spexop) or [open an issue](https://github.com/spexop-ui/spexop-design-system)
- **Custom Themes?** Try the [Theme Builder](https://builder.spexop.com)
