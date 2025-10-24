# Changelog

All notable changes to @spexop/react will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2025-10-24

### Added

#### Form Validation & Error Handling System

- **FormProvider**: Context provider for form state management with validation
- **FormField**: Field wrapper component with automatic validation and error display
- **useForm** hook: Access form state and methods
- **useFormField** hook: Individual field management with validation
- Built-in validators: required, email, url, minLength, maxLength, min, max, pattern, custom, async
- Real-time validation (onChange, onBlur, onSubmit)
- Field-level and form-level error handling
- Async validation support
- Cross-field validation
- Conditional validation rules
- Full accessibility with ARIA labels and error announcements

#### Image Component with Optimization

- **Image** component: Optimized image component with lazy loading
- Lazy loading with IntersectionObserver
- Responsive srcset generation
- Blur-up placeholder (LQIP)
- Shimmer loading skeleton
- Modern format support (WebP, AVIF)
- Aspect ratio preservation
- Error fallback handling
- Priority loading support
- **useImageOptimization** hook: Image optimization utilities

#### Data Fetching System

- **DataFetchProvider**: Context provider for data fetching with caching
- **useFetch** hook: Fetch data with loading/error states and caching
- **useMutation** hook: POST/PUT/DELETE operations with callbacks
- **useInfiniteScroll** hook: Paginated data fetching with auto-loading
- **usePrefetch** hook: Prefetch data for performance
- Automatic caching with TTL
- Request deduplication
- Retry logic with exponential backoff
- Abort signal support
- TypeScript generics for type-safe responses

#### SEO Components

- **SEO** component: Comprehensive meta tags and structured data
- **OpenGraph** component: OpenGraph protocol meta tags
- **JsonLd** component: JSON-LD structured data
- OpenGraph protocol support
- Twitter Card support
- Schema.org structured data
- Canonical URL handling
- Meta robots and viewport configuration
- Title template support

#### Animation Presets Library

- **BounceIn**: Bounce entrance animation
- **FlipIn**: 3D flip entrance animation
- **ElasticSlide**: Elastic easing slide animation
- **Blur**: Blur in/out transition
- **TypeWriter**: Text typing effect animation
- **Parallax**: Parallax scroll effect

#### Internationalization (i18n)

- **I18nProvider**: Internationalization context provider
- **useTranslation** hook: Translation hook with fallbacks
- **useLocale** hook: Current locale management
- **useFormatNumber** hook: Number formatting
- **useFormatDate** hook: Date formatting
- **useFormatCurrency** hook: Currency formatting
- JSON-based translation files
- Nested translation keys
- Pluralization support
- Variable interpolation
- Locale switching
- RTL support detection
- Native Intl API formatters

#### Performance Monitoring

- **PerformanceProvider**: Performance tracking provider (dev-only)
- **useRenderCount** hook: Track component renders
- **useRenderTime** hook: Measure render duration
- **useComponentPerf** hook: Component-level metrics
- Component render tracking
- Render time measurement
- Performance warnings (threshold-based)
- Development-only (tree-shaken in production)

### Documentation

- Comprehensive README files for all new components
- USAGE-GUIDE files with examples and patterns
- TypeScript type definitions for all APIs
- Inline JSDoc documentation

## [0.4.1] - 2025-10-24

### Added in v0.4.1

#### PageLayout Component

- New PageLayout component for page-level layouts with optimized defaults
- 1600px default max-width (new 'page' option) ideal for page layouts
- Responsive padding: 24px (mobile) → 40px (tablet) → 64px (desktop)
- Dual padding API: accepts both semantic string variants ('lg') and numeric values (8)
- Built on Container primitive for consistency and DRY principles
- Polymorphic component supporting any HTML element via 'as' prop
- Comprehensive test suite with 30 tests passing
- Complete documentation with README and USAGE-GUIDE

#### LoadingStates Components

- New comprehensive loading state components for various use cases
- **TextSkeleton**: Versatile text loading skeleton with multiple variants (text, heading, circle, rectangle)
- **CardSkeleton**: Loading skeleton for card components with optional image, avatar, and footer
- **PageSkeleton**: Full page loading skeleton with header, navigation, sections, and sidebar
- **LoadingOverlay**: Full-screen or section loading overlay with 4 animation variants (spinner, dots, pulse, bars)
- Size variants (sm, md, lg, xl) across all components
- Animation speed control (slow, normal, fast)
- Responsive and mobile-optimized
- Dark mode and reduced motion support
- Full ARIA labels for accessibility
- 52 comprehensive tests passing

#### Container Enhancements

- Added 'page' maxWidth option (1600px) to Container component
- Available system-wide for all components using Container

### Documentation in v0.4.1

- PageLayout README with quick start and API reference
- PageLayout USAGE-GUIDE with comprehensive examples and patterns
- LoadingStates README with complete API documentation
- Examples for landing pages, blog posts, dashboards, and documentation pages
- Loading state patterns for cards, pages, text, and overlays
- Best practices and accessibility guidelines

## [0.4.0] - 2025-10-22

### Breaking Changes

#### Component Structure Reorganization

- Removed specialized card components: BlogCard, FeatureCard, ProfileCard, StatsCard, TestimonialCard (replaced with composition patterns)
- Kept ProductCard and PricingCard as examples but removed their test files
- Eliminated "advanced" category - components moved to semantic categories
- Renamed "display" to "indicators" for clarity
- Moved components to semantic categories (Navigation, SegmentedControl, ScrollHeader, etc.)
- Consolidated animation hooks in hooks/ directory

#### Import Path Changes

- Navigation components moved from `advanced/` to `navigation/`
- Button components moved from `display/` to `buttons/`
- Layout components moved from `display/` to `layout/`
- Feedback components moved from `display/` to `feedback/`
- Animation hooks moved from `animations/` to `hooks/`

### Added in v0.4.0

#### Composition Patterns

- New `src/patterns/cards/` directory with 11 card composition examples
- BlogCard, FeatureCard, ProfileCard, StatsCard, TestimonialCard patterns
- TeamMemberCard, StatCard, MediaCard, EventCard, ComparisonCard patterns
- Complete TypeScript interfaces and usage examples for all patterns

#### Accessibility Enhancements

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

#### Visual Polish

- 60fps animations using CSS transforms
- Reduced motion support respecting user preferences
- Enhanced loading states for async components
- Better error messaging and visual feedback
- Consistent animation timing and easing

#### Performance Improvements

- 10-15% bundle size reduction through better tree-shaking
- Hardware-accelerated animations for better performance
- Optimized touch scrolling with momentum on mobile
- Lazy loading support for images and non-critical content

### Changed

#### Component Locations

- `advanced/Carousel` → `indicators/Carousel`
- `advanced/CodeBlock` → `indicators/CodeBlock`
- `advanced/ErrorBoundary` → `utils/ErrorBoundary`
- `advanced/Navigation` → `navigation/Navigation`
- `advanced/ScrollHeader` → `layout/ScrollHeader`
- `advanced/SegmentedControl` → `buttons/SegmentedControl`
- `advanced/SubmenuPanel` → `navigation/SubmenuPanel`
- `advanced/ThemeToggle` → `indicators/ThemeToggle`
- `display/IconButton` → `buttons/IconButton`
- `display/Accordion` → `layout/Accordion`
- `display/EmptyState` → `feedback/EmptyState`
- `display/Skeleton` → `feedback/Skeleton`
- `layout/ContextNav` → `navigation/ContextNav`
- `settings/SettingItem` → `forms/SettingItem`
- `settings/SettingsPanel` → `layout/SettingsPanel`

#### Animation Hooks

- `animations/useIntersectionObserver` → `hooks/useIntersectionObserver`
- `animations/useMotionValue` → `hooks/useMotionValue`
- `animations/useSpring` → `hooks/useSpring`

#### Touch Targets

- All interactive elements now minimum 44x44px
- Enhanced mobile touch feedback
- Better touch scrolling performance

#### Focus Management

- Standardized focus indicators across all components
- Improved keyboard navigation
- Better focus trap behavior in modals and overlays

### Deprecated in v0.3.x

- Specialized card components: BlogCard, FeatureCard, ProfileCard, StatsCard, TestimonialCard (removed in v0.4.0)
- Old import paths (removed in v0.4.0)
- `advanced/` category (removed in v0.4.0)
- `settings/` category (removed in v0.4.0)
- `display/` category (renamed to `indicators/` in v0.4.0)

### Removed

- `src/basic/advanced/` folder
- `src/basic/settings/` folder
- `src/basic/display/` folder (renamed to `indicators/`)
- Specialized card components: BlogCard, FeatureCard, ProfileCard, StatsCard, TestimonialCard
- Backwards compatible re-export shims

### Fixed

#### Mobile Issues

- Safe area insets now properly respected
- Viewport height calculations fixed for mobile devices
- Touch target sizes improved for better mobile interaction
- Horizontal scrolling optimized for tables and carousels

#### Accessibility Issues

- Color contrast improved to meet WCAG AAA standards
- Focus indicators now visible and consistent
- Screen reader announcements improved
- Keyboard navigation gaps fixed

#### Performance Issues

- Animation performance optimized for 60fps
- Bundle size reduced through better tree-shaking
- Touch scrolling smoothness improved
- Reduced motion support implemented

#### Visual Issues

- Loading states now consistent across components
- Error states provide better user feedback
- Empty states more helpful and actionable
- Animation timing standardized

### Migration

See [Migration Guide](../../docs/migrations/from-v0.3-to-v0.4.md) for detailed migration instructions.

#### Quick Migration Steps

1. Update package version: `npm install @spexop/react@^0.4.0`
2. Update imports: Replace category-specific imports with main package imports
3. Replace specialized cards: Use composition patterns from `src/patterns/cards/`
4. Update TypeScript types: Create your own type definitions for removed components
5. Test thoroughly: Verify all components work correctly

## [0.3.2] - 2025-10-21

### Changed in v0.3.2

- Made `children` prop optional across all 50+ components for improved flexibility
- Updated type definitions to use `children?: ReactNode` instead of `children: ReactNode`
- Improved TypeScript developer experience by reducing unnecessary type errors

### Components Updated in v0.3.2

- **Primitives**: Grid, Stack, Container, GridItem
- **Buttons**: Button, ButtonGroup
- **Typography**: Text, Heading, Link
- **Navigation**: NavLink, NavSection, Sidebar, SidebarFooter
- **Cards**: Card, CardBody, CardFooter, DashboardCard
- **Layout**: Section, StickySection, Footer, PanelSection
- **Overlays**: Modal, Popover, Drawer
- **Feedback & Display**: Alert, Badge
- **Settings**: SettingsCard, SettingItem
- **Providers**: DebugProvider, AccessibilityProvider, ModalProvider, ToastProvider, UnifiedThemeProvider
- **Data**: Table, TableHeader, TableBody, TableFooter, TableRow, TableCell
- **Advanced**: ErrorBoundary
- **Forms**: Form
- **Animations**: AnimationProps, Motion, Stagger

### Technical Details

- 100% backwards compatible - existing code continues to work
- No runtime behavior changes - only TypeScript type definitions affected
- All components build and type-check successfully

## [0.3.1] - 2025-10-21

### Fixed in v0.3.1

- Corrected repository URL in package.json (github.com/spexop-ui/spexop-public)
- Updated bug tracker URL to point to correct repository

### Note in v0.3.1

This is a metadata-only patch release. No code changes from v0.3.0. Users on v0.3.0 can continue using it without any issues - this update only corrects the repository links in package.json for better discoverability.

## [0.3.0] - 2025-10-21

### Added in v0.3.0 - New Component Categories

- **Data Components (3 new)**

- DataTable - Sortable, filterable table with pagination
- DataGrid - Advanced grid with virtual scrolling
- Chart - Chart.js integration for data visualization

- **Feedback Components (6 new)**

- Alert - Contextual notifications (success, warning, error, info)
- Spinner - Loading indicators with multiple variants
- Progress - Linear and circular progress bars
- Skeleton - Loading placeholders
- Toast - Non-blocking notifications (via ToastProvider)
- EmptyState - No-data states with actions

- **Typography Components (4 new)**

- Heading - Semantic headings (h1-h6) with variants
- Text - Paragraph text with size/weight variants
- Link - Standalone link component with variants
- Code - Inline code formatting

### Added - New Advanced Components

- **Carousel** - Slideshow component with touch/swipe, keyboard navigation, thumbnails, auto-play
  - Borders before shadows (3px bold borders, zero shadows)
  - High-contrast controls (WCAG AAA)
  - Aspect ratio control, lazy loading, peek mode
  - Transition variants (slide, fade)

### Added - Hooks Expansion (13 → 33+)

**20+ new hooks added:**

- useClickOutside - Detect clicks outside element
- useCopyToClipboard - Copy text with feedback
- useDarkMode - Dark mode management
- useDebounce - Debounce values
- useGeolocation - Browser geolocation API
- useHash - URL hash management
- useHover - Hover state detection
- useIdle - User inactivity detection
- useIntersectionObserver - Intersection Observer API
- useKeyPress - Keyboard key detection
- useLocalStorage - LocalStorage with sync
- useLongPress - Long press gesture
- useOnline - Network status detection
- usePageVisibility - Page visibility API
- usePermission - Browser permissions API
- usePrevious - Previous value tracking
- useQueryParams - URL query params management
- useReducedMotion - Motion preference detection
- useResizeObserver - Element resize detection
- useScroll - Scroll position tracking
- useSessionStorage - SessionStorage with sync
- useThrottle - Throttle values
- useToggle - Boolean toggle utility
- useWindowSize - Window dimensions tracking

### Added - New Providers

**AccessibilityProvider** - Global accessibility settings

- Screen reader announcements
- Focus management
- Reduced motion preferences

**ModalProvider** - Modal/dialog management

- Stacked modal support
- Focus trap
- Scroll lock

**ToastProvider** - Toast notification system

- Queue management
- Positioning options
- Auto-dismiss

### Added - Documentation & Testing

100% Documentation Coverage (59/59 components)

Each component now includes:

- Comprehensive README.md with API documentation
- USAGE-GUIDE.md with practical examples and patterns
- Component tests with Vitest
- TypeScript .types.ts files

**Documentation includes:**

- Features list with checkmarks
- Installation instructions
- Quick start examples
- API documentation
- Design principles applied
- Accessibility notes
- Best practices (Do's and Don'ts)
- Browser support

### Enhanced - Existing Components

**CodeBlock v3** - Complete redesign

- Custom lightweight syntax highlighting (no external dependencies)
- Theme integration with real-time switching
- Multi-framework support (React, Vue, Angular, Vanilla JS)
- Enhanced keyboard navigation (arrow keys, Home, End)
- Improved accessibility (ARIA live regions, focus management)
- Performance optimized (memoized highlighting)
- Icons from @spexop/icons

**Card** - New sub-component API

- CardHeader, CardBody, CardFooter composition
- Backward compatible with old API (deprecated)
- Density variants (compact, normal, spacious)
- 6+ visual variants

**Button** - New semantic variants

- danger, success, warning, info, neutral variants
- Complete theme token coverage
- Fixed CSS transition bug

### Changed (✅ DONE)

**Component Organization:**

- Removed duplicate `src/animations/` folder
- All animations now in `src/basic/animations/`
- Cleaner folder structure with no duplication

**Type Coverage:**

- 100% TypeScript coverage (59/59 components have .types.ts files)
- Extracted inline types to separate files
- Improved type exports

**Build System:**

- Enhanced Vite configuration
- Better source maps generation
- Optimized bundle output

### Fixed in 0.3.1

- BadgeProps type export path corrected
- Template ARIA attributes properly typed (ariaHidden, ariaInvalid, ariaLive)
- Duplicate export conflicts resolved (useIntersectionObserver, Modal, Toast)
- All TypeScript declaration errors eliminated (13 errors → 0)
- 0 linter errors across 681 files
- All formatting issues resolved
- Import path corrections
- Export consistency across all components

### Breaking Changes in v0.3.0

**Animations Import Path Change:**

```typescript
// ❌ OLD (no longer works)
import { FadeIn, Motion } from '@spexop/react/animations';

// ✅ NEW (correct path)
import { FadeIn, Motion } from '@spexop/react';
// or
import { FadeIn, Motion } from '@spexop/react/basic/animations';
```

**Migration**: Update any imports from `'@spexop/react/animations'` or `'../animations/'` to `'@spexop/react'` or `'../basic/animations/'`.

### Non-Breaking Changes in v0.3.0

**Provider Type Renames:**

For better clarity and to avoid naming conflicts with components:

- `Modal` type → `ModalData` (from ModalProvider)
- `Toast` type → `ToastData` (from ToastProvider)

Components are unchanged. This only affects direct type imports:

```typescript
// Components (unchanged)
import { Modal, Toast } from '@spexop/react';

// Provider types (new names)
import type { ModalData, ToastData } from '@spexop/react';

// Provider hooks (unchanged)
import { useModal, useToast } from '@spexop/react';
```

### Deprecated

**Card Component Old API:**

Props `icon`, `title`, `description` are deprecated in favor of CardHeader sub-component. Still works with deprecation warnings in development.

```typescript
// ⚠️ DEPRECATED (still works)
<Card icon={<Icon />} title="Title" description="Description" />

// ✅ RECOMMENDED (new API)
<Card>
  <CardHeader title="Title" subtitle="Description" icon={<Icon />} />
</Card>
```

### Migration from v0.2.4

See [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) for detailed migration instructions.

### Package Statistics

- **Components**: 59 (up from ~45)
- **Hooks**: 33+ (up from 13)
- **Providers**: 5 (up from 2)
- **Documentation Coverage**: 100% (59/59 components with README + USAGE-GUIDE)
- **Test Coverage**: 100% (59/59 components with tests)
- **Type Coverage**: 100% (59/59 components with .types.ts)
- **Linter Errors**: 0
- **Bundle Size**: ~280KB JS + ~210KB CSS (uncompressed)

### Development Status

This is an active development release. While components follow "The Spexop Way" design principles and include comprehensive documentation, the library is still evolving. APIs may change in future releases. Use in production at your own discretion.

## [0.2.4] - 2025-10-20

### Fixed in 0.3.0

- **CRITICAL**: Added missing TypeScript definition files (.d.ts) to build output
- Installed and configured `vite-plugin-dts` to generate type definitions
- Added `vite-plugin-dts` as dev dependency for proper type generation

### Changed in 0.2.4

- Build now generates complete TypeScript definitions in dist directory
- Updated vite.config.ts to include DTS plugin configuration

### Note in 0.2.4

Version 0.2.3 was published without TypeScript definitions due to missing Vite plugin configuration. This version resolves that issue. Users on 0.2.3 should upgrade to 0.2.4 immediately.

## [0.2.3] - 2025-10-20

### Changed in 0.2.3

- Switched build system from tsup to Vite for better CSS Modules handling and bundling
- Updated build output structure: entry points now in `dist/src/` directory
- Updated package.json exports to reflect new build structure (`dist/src/index.js` instead of `dist/index.js`)
- Improved source maps generation for better debugging experience

### Fixed in 0.2.3

- Build system now properly handles CSS Modules with consistent naming
- Better support for Next.js App Router with "use client" directive

## [0.2.2] - 2025-10-20

### Fixed in 0.2.2

- Package build configuration improvements
- TypeScript definitions properly generated for all entry points

## [0.2.1] - 2025-10-20

### Fixed in 0.2.1

- Build output paths and module resolution
- Package exports configuration

## [0.2.0] - 2025-10-20

### Added in v0.2.0

- Theme system integration via @spexop/theme
- UnifiedThemeProvider for runtime theme switching and configuration
- Support for pre-built CSS themes (13 presets)
- ThemeProvider export (alias for UnifiedThemeProvider)
- useTheme hook for accessing theme context

### Changed in 0.2.0

- All components now support theme system with --theme-* CSS variables
- Updated component styling to be fully themeable
- Improved TypeScript types for theme integration

### Removed in 0.2.0

- Dependency on @spexop/theme (deprecated in favor of @spexop/theme)
- Dependency on @spexop/utils (unused, private package)

### Migration from v0.1.0

No breaking changes - fully backward compatible. Theme system is opt-in:

**Without theme** (still works):

```typescript
import { Grid, Button } from '@spexop/react';
// Works exactly as before
```

**With theme** (new capability):

```typescript
import { Grid, Button, ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

<ThemeProvider theme={techPreset}>
  <Grid><Button>Themed Button</Button></Grid>
</ThemeProvider>
```

## [0.1.0] - 2025-10-15

### Added to 0.1.0

Initial release of @spexop/react with 60+ production-ready components.

#### Grid Primitives (5 components)

- Grid - Responsive CSS Grid with columns, gap, alignment
- GridItem - Grid child with span, positioning, areas
- Stack - Flexbox stacking (horizontal/vertical)
- Container - Max-width wrapper with responsive padding
- Spacer - Quick spacing utility

#### Navigation (5 components)

- TopBar - Fixed header with logo, search, actions
- Sidebar - Tree-based sidebar with responsive behavior
- NavSection - Accordion sections for sidebar
- NavLink - Individual navigation links
- SidebarFooter - Footer area for version selectors

#### Forms (7 components)

- TextInput - Text input with label, error, helper text
- TextArea - Multi-line text input
- Select - Dropdown select with options
- RadioGroup - Radio button group
- Toggle - Switch/toggle component
- Slider - Range slider control
- SearchBar - Search input with shortcuts

#### Buttons (5 components)

- Button - 7 variants (primary, secondary, outline, ghost, text, pill, border-emphasis)
- ButtonGroup - Connected buttons (horizontal/vertical)
- SegmentedButton - Radio-style button selection
- SplitButton - Primary action + dropdown menu
- ButtonGridItem - Interactive media card

#### Cards (5 components)

- Card - Container with 6 variants
- CardHeader, CardBody, CardFooter - Card sub-components
- ServiceCard - Specialized card with animations

#### Layout (6 components)

- Section - Page section with variants
- Hero - Hero section with multiple variants
- Footer - Page footer with links
- ContextNav - Sticky navigation
- StickySection - Section that sticks on scroll
- PanelSection - Collapsible panel

#### Overlays (5 components)

- Drawer - Side drawer/panel
- SearchModal - Full search interface
- SearchOverlay - Overlay with search results
- CommandPalette - Command/action palette
- Snackbar - Toast notifications

#### Display (4 components)

- Badge - Status badges and labels
- Icon - Icon wrapper
- IconButton - Icon-only button
- KeyboardShortcut - Keyboard shortcut display

#### Settings (3 components)

- SettingsPanel - Panel for app settings
- SettingsCard - Individual setting card
- SettingItem - Single setting item

#### Advanced (6 components)

- CodeBlock - Code syntax highlighting
- SegmentedControl - iOS-style control
- ThemeToggle - Light/dark mode toggle
- ScrollHeader - Scroll-reactive header
- SubmenuPanel - Nested menu panel
- Navigation - Legacy navigation

#### Animations (10+ components)

- Motion, FadeIn, SlideIn, ScaleUp, RotateIn, ZoomIn - Animation primitives
- Stagger - Staggered animations
- Reveal - Reveal on scroll
- AnimatedBackground - Animated backgrounds

#### Hooks (13 hooks)

- useAccordion - Accordion state management
- useBodyScrollLock - Lock body scroll
- useFocusTrap - Trap focus in container
- useEscapeKey - Handle Escape key
- useBreakpoint - Current breakpoint detection
- useMediaQuery - Media query matching
- useResponsiveValue - Responsive value resolution
- useScrollSpy - Scroll position tracking
- useTheme - Theme management
- useDebug - Debug utilities
- useIntersectionObserver - Intersection observer
- useMotionValue - Animation value tracking
- useSpring - Spring animations

#### Providers (2 providers)

- ThemeProvider - Theme context and management
- DebugProvider - Debug mode and utilities

#### Features

- Full TypeScript support with comprehensive type definitions
- CSS Modules for scoped styling
- Responsive design with breakpoint utilities
- Accessibility built-in (WCAG AA compliant)
- Tree-shakeable ESM bundle
- Theme support (light/dark modes)
- Integration with @spexop/theme (452 design tokens)
- Integration with @spexop/icons (262 icons)

### Known Limitations

- Animation components are experimental and APIs may change in minor versions
- Some components have limited test coverage (will be expanded in patches)
- Documentation is being actively expanded

### Dependencies

- @spexop/theme: ^0.2.2
- @spexop/icons: ^0.1.1
- react: ^18.2.0 || ^19.0.0 (peer)
- react-dom: ^18.2.0 || ^19.0.0 (peer)

### Package Info

- **Size**: ~260KB JS + ~198KB CSS (uncompressed)
- **Build**: ESM bundle with TypeScript definitions
- **License**: MIT
- **Repository**: <https://github.com/spexop-ui/spexop-design-system>

---

## [Unreleased]

Future releases will be documented here.
