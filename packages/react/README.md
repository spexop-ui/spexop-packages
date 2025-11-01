# @spexop/react

React component library for modern web applications. Built with TypeScript, accessibility, and the Primitives-First philosophy.

**!!! IMPORTANT !!!**
This documentation is automatically synced from the spexop-packages repository. Last sync: 2025-10-22
It's read-only and should be edited in spexop-packages repository. Please don't edit this file and the content of the components directly.

[![npm version](https://img.shields.io/npm/v/@spexop/react.svg)](https://www.npmjs.com/package/@spexop/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

## What is Spexop?

Spexop is a **Primitives-First Design System** that emphasizes mastering foundational layout components before building complex interfaces. With 75+ React components, comprehensive TypeScript support, and built-in accessibility, Spexop helps you build maintainable web applications.

### The Primitives-First Approach

Start with **5 grid primitives** (Grid, GridItem, Stack, Container, Spacer) to master layout fundamentals, then compose them into sophisticated interfaces. This approach leads to more maintainable code and better design consistency.

## Development Status

This is an active development release (v0.3.0). While components follow "The Spexop Way" design principles and include comprehensive documentation and tests, the library is still evolving. APIs may change in future releases. Use at your own discretion.

## Features

- 🎨 **75+ Components** - Primitives, navigation, forms, buttons, cards, data, feedback, typography, and more
- 📐 **Grid System** - Powerful responsive grid with named areas and container queries
- 🎯 **TypeScript-First** - Full type safety with comprehensive type definitions
- ♿ **Accessibility Built-In** - WCAG AA compliant with keyboard navigation
- 🎨 **Design Tokens** - Built on [@spexop/theme](https://npmjs.com/package/@spexop/theme) with 450+ tokens
- 🔧 **CSS Modules** - Scoped styling with zero runtime overhead
- 📱 **Responsive** - Mobile-first with breakpoint utilities
- 🌳 **Tree-Shakeable** - Import only what you need
- 🎭 **Theme Support** - Light/dark modes with utilities (provider-free)
- 🪝 **36+ React Hooks** - Utilities for common patterns
- 🔧 **8 Utility Hooks** - Toast, Modal, Form, i18n, Performance, Debug, Accessibility, Theme (no providers needed)
- 📚 **100% Documentation** - Every component has README + USAGE-GUIDE + tests

## Installation

```bash
npm install @spexop/react @spexop/theme @spexop/icons
```

Or with pnpm:

```bash
pnpm add @spexop/react @spexop/theme @spexop/icons
```

Or with yarn:

```bash
yarn add @spexop/react @spexop/theme @spexop/icons
```

## Quick Start

### 1. Import CSS

Add the design tokens CSS to your app entry point:

```typescript
// main.tsx or index.tsx
import '@spexop/theme/dist/tokens.css';
import '@spexop/react/dist/index.css';
```

### 2. Use Components

```tsx
import { Grid, GridItem, Card, CardHeader, CardBody, Button } from '@spexop/react';

function App() {
  return (
    <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
      <GridItem>
        <Card>
          <CardHeader title="Getting Started" subtitle="Build with primitives" />
          <CardBody>
            <p>Master the grid system, then build anything.</p>
          </CardBody>
        </Card>
      </GridItem>
      
      <GridItem>
        <Card>
          <CardHeader title="Components" subtitle="60+ ready to use" />
          <CardBody>
            <p>Navigation, forms, buttons, and more.</p>
            <Button variant="primary">Explore</Button>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}
```

### 3. Add Theme System (Optional)

Spexop uses utility-based theme management for light/dark mode and CSS variable injection for full theme configuration.

#### Quick Start: Light/Dark Mode (Recommended)

```typescript
import { useThemeUtil } from '@spexop/react';

function App() {
  const { resolvedMode, setMode } = useThemeUtil({ defaultMode: 'auto' });
  
  return (
    <>
      <YourApp />
      <button onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </>
  );
}
```

#### With Full Theme Config

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
      <YourApp />
      <button onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </>
  );
}
```

> **Note**: `ThemeProvider` is deprecated but still functional for theme config injection. For theme mode only, use `useThemeUtil`. See [Migration Guide](../../docs/migrations/from-providers-to-utilities.md).

[→ Complete theming guide](../../docs/theme-system/README.md) | [→ Migration guide](../../docs/theme-system/unified-theme-provider.md)

## Theme System

Spexop uses a unified theme provider that handles both:

- **Light/Dark Mode Switching** - Simple mode management with system preference support
- **Full Theme Configuration** - Complete brand customization with CSS variables

### Quick Start [v0.3.0]

**Install theme package:**

```bash
npm install @spexop/theme
```

**Basic setup with light/dark mode:**

```typescript
import { ThemeProvider, useTheme } from '@spexop/react';
import { Moon, Sun } from '@spexop/icons';

function ThemeToggle() {
  const { resolvedMode, setMode } = useTheme();
  const isDark = resolvedMode === 'dark';
  
  return (
    <button onClick={() => setMode(isDark ? 'light' : 'dark')}>
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider mode="auto">
      <ThemeToggle />
      <YourApp />
    </ThemeProvider>
  );
}
```

**With full theme configuration:**

```typescript
import { ThemeProvider } from '@spexop/react';
import { techPreset, healthcarePreset, financePreset } from '@spexop/theme';

function App() {
  return (
    <ThemeProvider theme={techPreset} mode="auto">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Available Presets

Choose from 12 professionally designed themes:

- `techPreset` - Modern tech company
- `startupPreset` - Bold and energetic
- `healthcarePreset` - Calm and trustworthy
- `financePreset` - Professional
- `ecommercePreset` - Vibrant shopping
- `educationPreset` - Friendly learning
- `corporatePreset` - Business classic
- `agencyPreset` - Creative studio
- `minimalPreset` - Clean simplicity
- `darkPreset` - Dark mode
- `pastelPreset` - Soft colors
- `vibrantPreset` - Bold and bright

### Custom Theme

Create your own theme:

```typescript
import type { SpexopThemeConfig } from '@spexop/theme';
import { ThemeProvider } from '@spexop/react';

const myTheme: SpexopThemeConfig = {
  meta: {
    name: "My Brand",
    version: "1.0.0",
  },
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    accent: "#8b5cf6",
    success: "#28a745",
    warning: "#ffc107",
    danger: "#dc3545",
    info: "#17a2b8",
    background: "#ffffff",
    surface: "#f8f9fa",
    text: "#212529",
    textSecondary: "#6c757d",
    border: "#dee2e6",
    light: "#f8f9fa",
    dark: "#343a40",
    disabled: "#e9ecef",
    hover: "#e9ecef",
  },
  buttons: {
    primary: {
      background: "colors.primary",  // Token reference
      text: "#ffffff",
      border: "colors.primary",
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <YourComponents />
    </ThemeProvider>
  );
}
```

### Runtime Theme Switching

Switch themes dynamically:

```typescript
import { useState } from 'react';
import { ThemeProvider } from '@spexop/react';
import { techPreset, darkPreset } from '@spexop/theme';

function App() {
  const [theme, setTheme] = useState(techPreset);

  return (
    <>
      <button onClick={() => setTheme(techPreset)}>Light</button>
      <button onClick={() => setTheme(darkPreset)}>Dark</button>

      <ThemeProvider theme={theme}>
        <YourApp />
      </ThemeProvider>
    </>
  );
}
```

### CSS Variables

All components use CSS variables that you can override:

```css
:root {
  --theme-primary: #007bff;
  --theme-secondary: #6c757d;
  --theme-button-primary-bg: var(--theme-primary);
  --theme-button-primary-text: #ffffff;
  /* ... and many more */
}
```

### ThemeProvider API

**Props:**

```typescript
interface ThemeProviderProps {
  // Mode management
  mode?: "light" | "dark" | "auto";
  defaultMode?: "light" | "dark" | "auto";
  disableSystemMode?: boolean;
  
  // Theme configuration
  theme?: SpexopThemeConfig;
  themes?: SpexopThemeConfig[];
  defaultTheme?: string;
  
  // Advanced
  scope?: string;
  storageKey?: string;
  disableStorage?: boolean;
  forcedMode?: "light" | "dark";
  
  children: React.ReactNode;
}
```

**useTheme() Hook:**

```typescript
const {
  mode,              // Current mode ('light' | 'dark' | 'auto')
  resolvedMode,      // Actual applied mode ('light' | 'dark')
  setMode,           // Change mode
  currentTheme,      // Active theme config
  setTheme,          // Change theme (if multi-theme)
  availableThemes,   // All available themes
  isInitializing,    // Loading state
} = useTheme();
```

### Learn More

- **[Complete Theming Guide](../../docs/theme-system/README.md)** - Full documentation
- **[Getting Started](../../docs/theme-system/getting-started.md)** - Setup instructions
- **[Migration Guide](../../docs/theme-system/unified-theme-provider.md)** - Upgrade from old providers
- **[Token References](../../docs/theme-system/token-references.md)** - Advanced theming
- **[Visual Builder](https://builder.spexop.com)** - Create themes visually

## Component Categories

### Grid Primitives (5)

Foundation components for building layouts.

```typescript
import { Grid, GridItem, Stack, Container, Spacer } from '@spexop/react';
```

- **Grid** - Responsive CSS Grid with columns, gap, alignment
- **GridItem** - Grid child with span, positioning, areas
- **Stack** - Flexbox stacking (horizontal/vertical)
- **Container** - Max-width wrapper with responsive padding
- **Spacer** - Quick spacing utility

### Navigation (12)

Complete navigation system for web applications.

```typescript
import { Navigation, TopBar, Sidebar, NavSection, NavLink, SidebarFooter, ContextNav, Breadcrumb, Link, Pagination, Tabs, SubmenuPanel } from '@spexop/react';
```

- **Navigation** - Router-agnostic navigation bar with mobile menu
- **TopBar** - Fixed header with logo, search, actions
- **Sidebar** - Tree-based sidebar with responsive behavior
- **NavSection** - Accordion sections for sidebar
- **NavLink** - Individual navigation links
- **SidebarFooter** - Footer area for version selectors
- **ContextNav** - Sticky context-aware navigation
- **Breadcrumb** - Breadcrumb navigation
- **Link** - Styled link component
- **Pagination** - Page navigation controls
- **Tabs** - Tab navigation component
- **SubmenuPanel** - Submenu panel component

### Forms (8)

Accessible form controls with validation support.

```typescript
import { TextInput, TextArea, Select, RadioGroup, Toggle, Slider, SearchBar, SettingItem } from '@spexop/react';
```

- **TextInput** - Text input with label, error, helper text
- **TextArea** - Multi-line text input
- **Select** - Dropdown select with options
- **RadioGroup** - Radio button group
- **Toggle** - Switch/toggle component
- **Slider** - Range slider control
- **SearchBar** - Search input with shortcuts
- **SettingItem** - Settings form item component

### Buttons (7)

Comprehensive button system with variants.

```typescript
import { Button, ButtonGroup, SegmentedButton, SplitButton, ButtonGridItem, IconButton, SegmentedControl } from '@spexop/react';
```

- **Button** - 7 variants (primary, secondary, outline, ghost, text, pill, border-emphasis)
- **ButtonGroup** - Connected buttons (horizontal/vertical)
- **SegmentedButton** - Radio-style button selection
- **SplitButton** - Primary action + dropdown menu
- **ButtonGridItem** - Interactive media card
- **IconButton** - Icon-only button component
- **SegmentedControl** - Segmented control component

### Cards (1 + Patterns)

Flexible card system with composition patterns.

```typescript
import { Card, CardHeader, CardBody, CardFooter } from '@spexop/react';
```

- **Card** - Container with 6 variants
- **CardHeader** - Title area with subtitle and badge
- **CardBody** - Content area
- **CardFooter** - Actions area

> **Note**: Specialized card components (BlogCard, ProductCard, etc.) are now composition patterns. See [Patterns Documentation](./src/patterns/cards/) for examples.

### Layout (7)

Page structure and section components.

```typescript
import { Section, Hero, Footer, StickySection, PanelSection, Accordion, ScrollHeader, SettingsPanel } from '@spexop/react';
```

- **Section** - Page section with variants, padding, borders
- **Hero** - Hero section with multiple variants
- **Footer** - Page footer with links
- **StickySection** - Section that sticks on scroll
- **PanelSection** - Collapsible panel
- **Accordion** - Collapsible content sections
- **ScrollHeader** - Header that appears on scroll
- **SettingsPanel** - Settings panel component

### Overlays (5)

Modal dialogs and overlay interfaces.

```typescript
import { Drawer, SearchModal, SearchOverlay, CommandPalette, Snackbar } from '@spexop/react';
```

- **Drawer** - Side drawer/panel
- **SearchModal** - Full search interface
- **SearchOverlay** - Overlay with search results
- **CommandPalette** - Command/action palette
- **Snackbar** - Toast notifications

### Display (4)

Typography and visual indicators.

```typescript
import { Badge, Icon, IconButton, KeyboardShortcut } from '@spexop/react';
```

- **Badge** - Status badges and labels
- **Icon** - Icon wrapper (integrates with @spexop/icons)
- **IconButton** - Icon-only button
- **KeyboardShortcut** - Keyboard shortcut display

### Settings (3)

Settings and configuration UI.

```typescript
import { SettingsPanel, SettingsCard, SettingItem } from '@spexop/react';
```

- **SettingsPanel** - Panel for app settings
- **SettingsCard** - Individual setting card
- **SettingItem** - Single setting item

### Indicators (6)

Visual indicators and media components.

```typescript
import { Avatar, Badge, Carousel, CodeBlock, Divider, Icon, KeyboardShortcut, ThemeToggle } from '@spexop/react';
```

- **Avatar** - User profile images
- **Badge** - Status indicators and labels
- **Carousel** - Image/content carousel
- **CodeBlock** - Code syntax highlighting
- **Divider** - Visual separators
- **Icon** - Icon component wrapper
- **KeyboardShortcut** - Keyboard shortcut display
- **ThemeToggle** - Light/dark mode toggle

### Animations (8)

Animation utilities for smooth interactions.

```typescript
import { Motion, FadeIn, SlideIn, ScaleUp, RotateIn, ZoomIn, Stagger, Reveal } from '@spexop/react';
```

- **Motion** - Base motion component
- **FadeIn, SlideIn, ScaleUp, RotateIn, ZoomIn** - Animation primitives
- **Stagger** - Staggered animations
- **Reveal** - Reveal on scroll

### Data (2)

Data display and visualization components.

```typescript
import { DataTable, Table } from '@spexop/react';
```

- **DataTable** - Sortable, filterable table with pagination
- **Table** - Basic table component

### Feedback (7)

User feedback and loading states.

```typescript
import { Alert, Spinner, Progress, Skeleton, Toast, EmptyState, Snackbar } from '@spexop/react';
```

- **Alert** - Contextual notifications (success, warning, error, info)
- **Spinner** - Loading indicators with multiple variants
- **Progress** - Linear and circular progress bars
- **Skeleton** - Loading placeholders
- **Toast** - Non-blocking notifications
- **EmptyState** - No-data states with actions
- **Snackbar** - Snackbar notifications

### Typography (2)

Text and typography components.

```typescript
import { Heading, Text } from '@spexop/react';
```

- **Heading** - Semantic headings (h1-h6) with variants
- **Text** - Paragraph text with size/weight variants

### Utils (1)

Utility components for error handling and debugging.

```typescript
import { ErrorBoundary } from '@spexop/react';
```

- **ErrorBoundary** - React error boundary component

### Hooks (36+)

Essential React hooks for common patterns.

```typescript
import { 
  // Layout & UI
  useAccordion, 
  useBodyScrollLock, 
  useFocusTrap, 
  useEscapeKey,
  useBreakpoint, 
  useMediaQuery, 
  useResponsiveValue,
  useScrollSpy,
  
  // Theme & Debug
  useTheme,
  useDebug,
  useDarkMode,
  
  // Animation
  useIntersectionObserver,
  useMotionValue,
  useSpring,
  useReducedMotion,
  
  // Interaction
  useClickOutside,
  useHover,
  useKeyPress,
  useLongPress,
  
  // Storage
  useLocalStorage,
  useSessionStorage,
  
  // Browser APIs
  useGeolocation,
  useOnline,
  usePageVisibility,
  usePermission,
  useWindowSize,
  useScroll,
  useResizeObserver,
  
  // URL Management
  useHash,
  useQueryParams,
  
  // Utilities
  useCopyToClipboard,
  useDebounce,
  useThrottle,
  useToggle,
  usePrevious,
  useIdle
} from '@spexop/react';
```

### Utilities (8) - Provider-Free Approach

Utility hooks for toast, modal, form, i18n, performance, debug, accessibility, and theme management. No provider wrappers needed!

```typescript
import {
  useToastUtil,
  useModalUtil,
  useFormUtil,
  useI18nUtil,
  usePerformanceUtil,
  useDebugUtil,
  useAccessibilityUtil,
  useThemeUtil
} from '@spexop/react';

// Example: No providers needed!
function App() {
  const { toast, renderToasts } = useToastUtil();
  const { openModal, renderModals } = useModalUtil();
  const { resolvedMode, setMode } = useThemeUtil({ defaultMode: 'auto' });
  
  return (
    <>
      <YourComponents />
      {renderToasts()}
      {renderModals()}
    </>
  );
}
```

- **useToastUtil** - Toast notification system with queue management
- **useModalUtil** - Modal/dialog management with stacking
- **useFormUtil** - Standalone form state, validation, and submission
- **useI18nUtil** - Internationalization with translations and formatting
- **usePerformanceUtil** - Component performance tracking
- **useDebugUtil** - Debug mode and development utilities
- **useAccessibilityUtil** - Global accessibility settings and announcements
- **useThemeUtil** - Theme mode management (light/dark/auto)

> **Note**: Providers are deprecated in v0.6.0+. See [Migration Guide: Providers to Utilities](../../docs/migrations/from-providers-to-utilities.md) for details.

## Documentation

- **Website**: [spexop.com](https://spexop.com)
- **Component Docs**: [spexop.com/components](https://spexop.com/components)
- **GitHub**: [github.com/spexop-ui/spexop-design-system](https://github.com/spexop-ui/spexop-design-system)
- **npm**: [@spexop/react](https://www.npmjs.com/package/@spexop/react)

## Requirements

### Peer Dependencies

```json
{
  "react": "^18.2.0 || ^19.0.0",
  "react-dom": "^18.2.0 || ^19.0.0"
}
```

### Required Packages

This package requires the Spexop design tokens and icons:

```bash
npm install @spexop/theme @spexop/icons
```

### Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

Modern browsers with ES2022 support.

## TypeScript

This package is written in TypeScript and includes comprehensive type definitions. All components, hooks, and utilities are fully typed.

```typescript
import type { GridProps, ButtonProps, CardProps } from '@spexop/react';
```

## Examples

### Responsive Grid Layout

```tsx
import { Grid, GridItem, Container } from '@spexop/react';

function ResponsiveLayout() {
  return (
    <Container maxWidth="2xl" padding={6}>
      <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
        <GridItem span={{ xs: 1, lg: 2 }}>
          <div>Wide column on desktop</div>
        </GridItem>
        <GridItem>
          <div>Regular column</div>
        </GridItem>
      </Grid>
    </Container>
  );
}
```

### Navigation System

```tsx
import { TopBar, Sidebar, NavSection, NavLink } from '@spexop/react';

function AppLayout() {
  return (
    <>
      <TopBar 
        logoText="My App"
        onSearchClick={handleSearch}
        onThemeToggle={handleTheme}
      />
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <NavSection label="Main" defaultOpen>
          <NavLink href="/" active>Home</NavLink>
          <NavLink href="/about">About</NavLink>
        </NavSection>
      </Sidebar>
    </>
  );
}
```

### Form Layout

```tsx
import { Stack, TextInput, TextArea, Button } from '@spexop/react';

function ContactForm() {
  return (
    <Stack direction="vertical" gap={4}>
      <TextInput 
        label="Name" 
        placeholder="Enter your name"
        required
      />
      <TextInput 
        label="Email" 
        type="email"
        placeholder="your@email.com"
        required
      />
      <TextArea 
        label="Message"
        placeholder="Your message"
        rows={5}
        required
      />
      <Button variant="primary" type="submit">
        Send Message
      </Button>
    </Stack>
  );
}
```

### Card Composition

```tsx
import { Grid, Card, CardHeader, CardBody, CardFooter, Button } from '@spexop/react';

function FeatureCards() {
  return (
    <Grid columns={{ xs: 1, md: 3 }} gap={6}>
      <Card fullHeight>
        <CardHeader 
          title="Fast" 
          subtitle="Built for performance"
        />
        <CardBody>
          <p>Optimized components with minimal bundle size.</p>
        </CardBody>
        <CardFooter align="right">
          <Button variant="primary">Learn More</Button>
        </CardFooter>
      </Card>
    </Grid>
  );
}
```

## The Spexop Way

Seven principles that guide every design decision:

1. **Primitives before features** - Master the grid system first
2. **Borders before shadows** - Refined minimalism aesthetic
3. **Typography before decoration** - Content-driven hierarchy
4. **Tokens before magic numbers** - Consistent design language
5. **Composition before complexity** - Build up from simple parts
6. **Standards before frameworks** - Web platform fundamentals
7. **Accessibility before aesthetics** - Inclusive by default

## Design Philosophy

### Refined Minimalism

- **Border-based separation** - Clean 1-2px borders instead of heavy shadows
- **Typography-driven hierarchy** - Bold scale with high contrast
- **High-contrast colors** - Accessibility-first with WCAG AA+ compliance
- **Generous whitespace** - Breathing room for content
- **Minimal decoration** - Purposeful effects only

### Token-Based Design

All components use design tokens from [@spexop/theme](https://npmjs.com/package/@spexop/theme):

- **379 design tokens** - Colors, spacing, typography, shadows, etc.
- **Consistent naming** - S-prefix convention (sColorRed500, sSpacing4)
- **Theme support** - Light/dark modes via CSS custom properties
- **Type-safe** - Full TypeScript definitions

## Package Structure

```bash
@spexop/react/
├── dist/
│   ├── index.js          # ESM bundle (260KB)
│   ├── index.css         # Component styles (198KB)
│   ├── index.d.ts        # TypeScript definitions (124KB)
│   └── *.map             # Source maps
├── src/
│   └── basic/
│       ├── primitives/   # Grid system (5)
│       ├── navigation/   # Navigation (5)
│       ├── forms/        # Form controls (7)
│       ├── buttons/      # Buttons (5)
│       ├── cards/        # Cards (5)
│       ├── layout/       # Layout (6)
│       ├── overlays/     # Overlays (5)
│       ├── display/      # Display (4)
│       ├── settings/     # Settings (3)
│       ├── advanced/     # Advanced (6)
│       └── animations/   # Animations (10+)
└── package.json
```

## Development

```bash
# Install dependencies
pnpm install

# Build package
pnpm --filter @spexop/react build

# Watch mode
pnpm --filter @spexop/react dev

# Run tests
pnpm test

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/spexop-ui/spexop-design-system/blob/master/CONTRIBUTING.md) for details.

### Component Development

All components follow the same structure:

```bash
Component/
├── Component.tsx           # Component logic
├── Component.module.css    # Scoped styles
├── Component.types.ts      # TypeScript types
├── Component.test.tsx      # Tests
├── README.md               # Documentation
└── index.ts                # Exports
```

## Versioning

We use [Semantic Versioning](https://semver.org/):

- **Major** (x.0.0) - Breaking changes
- **Minor** (0.x.0) - New features, backward compatible
- **Patch** (0.0.x) - Bug fixes, backward compatible

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

MIT © [Spexop Team](https://spexop.com)

See [LICENSE](./LICENSE) for details.

## Related Packages

- [@spexop/theme](https://npmjs.com/package/@spexop/theme) - Design tokens (379 tokens)
- [@spexop/icons](https://npmjs.com/package/@spexop/icons) - Icon library (262 icons)

## Community

- **Website**: [spexop.com](https://spexop.com)
- **GitHub**: [github.com/spexop-ui](https://github.com/spexop-ui)
- **Twitter/X**: [@spexop_ui](https://x.com/spexop_ui)
- **Patreon**: [patreon.com/c/Spexop](https://www.patreon.com/c/Spexop)
- **Email**: [contact@spexop.com](mailto:contact@spexop.com)

## Credits

Built with ❤️ by the Spexop Team.

Special thanks to our supporters and contributors who make this project possible.

---

**Ready to get started?** Visit [spexop.com](https://spexop.com) for comprehensive documentation and examples.
