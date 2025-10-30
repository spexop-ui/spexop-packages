# Changelog

All notable changes to the Spexop Tokens monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.6.0] - 2025-10-29

### 🎉 Version Synchronization - "Foundation Complete"

**Major Milestone:** All Spexop packages are now version-synchronized for the first time!

This release establishes synchronized versioning across the entire ecosystem, making it easier to communicate releases, manage dependencies, and understand compatibility.

#### Version Updates

- @spexop/react: 0.4.7 → 0.6.0
- @spexop/theme: 0.5.0 → 0.6.0
- @spexop/cli: 0.1.0 → 0.6.0
- @spexop/icons: 0.1.1 → 0.6.0

#### Why Version Synchronization?

Previously, our packages had fragmented versions (0.1.x, 0.4.x, 0.5.x), which made it difficult to:
- Communicate what version of "Spexop" users were running
- Manage peer dependencies clearly
- Market releases effectively

From v0.6.0 forward, all packages will maintain synchronized major.minor versions, signaling that you're running "Spexop v0.6.0" across the board.

#### What's Included in v0.6.0

**@spexop/react v0.6.0:**
- 15 helper utilities (90% boilerplate reduction)
- Provider-free architecture
- 60+ production-ready components
- 33+ React hooks
- 5 provider systems
- 100% documentation coverage

**@spexop/theme v0.6.0:**
- Type-safe tokens for all 13 themes (379 tokens)
- Full TypeScript autocomplete (78 token sets)
- Zero runtime overhead
- Export to 29+ formats

**@spexop/cli v0.6.0:**
- spexop create - scaffold apps in under 30 seconds
- spexop add - 17 component templates
- spexop doctor - health check with auto-fix
- 19.46 KB bundle size

**@spexop/icons v0.6.0:**
- 269 professional icons
- Tree-shakeable ESM
- Full TypeScript support

#### Development Journey Summary (May - October 2025)

Over 5 months, we've:
- Released 7 minor versions
- Built 60+ components following "The Spexop Way"
- Created 15 helper utilities reducing boilerplate by 90%
- Implemented type-safe tokens for all themes
- Built a CLI tool with 3 commands
- Achieved 100% documentation coverage
- Maintained zero linter errors

#### Breaking Changes

None. This is a minor version bump for alignment only. All existing code continues to work.

#### Migration

No migration needed. Update your package.json:

```json
{
  "dependencies": {
    "@spexop/react": "^0.6.0",
    "@spexop/theme": "^0.6.0",
    "@spexop/icons": "^0.6.0"
  },
  "devDependencies": {
    "@spexop/cli": "^0.6.0"
  }
}
```

#### Future Release Cadence

Going forward:
- **Major releases** (x.0.0): Every 6-12 months, breaking changes only
- **Minor releases** (0.x.0): Every 4-6 weeks, new features
- **Patch releases** (0.0.x): As needed, bug fixes only

All packages will maintain synchronized major.minor versions.

#### Next Steps

- v0.7.0 "Developer Experience" (Late November 2025)
- v0.8.0 "Ecosystem Growth" (Mid December 2025)
- v0.9.0 "Pre-Release Candidate" (Late December 2025)
- v1.0.0 "Production Ready" (January 2026)

See our complete [Development Roadmap](./spexop-versioning-strategy.plan.md) for details.

---

## [0.4.7] - 2025-10-25

### @spexop/react v0.4.7

#### Hero Auto-White Text Fix

**Smart Background Detection:**

Hero component now automatically applies white/light text colors when `backgroundMedia` prop is present, solving the common dark-text-on-dark-background issue.

**Auto-Applied Colors:**

- Title: `#ffffff` (pure white)
- Subtitle: `rgba(255, 255, 255, 0.9)` (90% white)
- Description: `rgba(255, 255, 255, 0.85)` (85% white)
- Stats Value: `#ffffff` (pure white)
- Stats Label: `rgba(255, 255, 255, 0.8)` (80% white)

**Independent Control:**

Each text element checks its own color prop independently. Custom color props override auto-white behavior while other elements remain auto-white.

```tsx
// Automatically uses white text with video backgrounds
<Hero
  backgroundMedia={{ type: "video", src: "/video.mp4" }}
  // All text automatically white! ✅
/>

// Mix custom and auto colors
<Hero
  backgroundMedia={{ type: "video", src: "/video.mp4" }}
  titleColor="cyan"         // Custom
  // subtitle auto-white    ✅
  descriptionColor="yellow" // Custom
  // stats auto-white       ✅
/>
```

**Fallback Behavior:**

When no `backgroundMedia` is present, colors fall back to CSS theme variables (`var(--theme-text)`) for proper light/dark mode support.

### @spexop/theme v0.4.7

#### Version Sync

- Version sync with @spexop/react v0.4.7
- No functional changes from v0.4.5

---

## [0.4.6] - 2025-10-24

### @spexop/react v0.4.6

#### Hero Typography Enhancement

Comprehensive typography control system with 32 new props for complete customization of all text elements.

**New Typography Props (32 total):**

**Title Controls (7 props):**

- `titleSize` - Size multiplier (already existed, now documented)
- `titleColor` - Text color (design token or CSS color)
- `titleWeight` - Font weight (number or string)
- `titleLetterSpacing` - Letter spacing
- `titleLineHeight` - Line height
- `titleMaxWidth` - Max width with auto-centering
- `titleOpacity` - Opacity (0-1)

**Subtitle Controls (7 props):**

- `subtitleSize` - Size multiplier (recommended: 0.5-2.0)
- `subtitleColor` - Text color
- `subtitleWeight` - Font weight
- `subtitleLetterSpacing` - Letter spacing
- `subtitleLineHeight` - Line height
- `subtitleMaxWidth` - Max width with auto-centering
- `subtitleOpacity` - Opacity (0-1)

**Description Controls (7 props):**

- `descriptionSize` - Size multiplier
- `descriptionColor` - Text color
- `descriptionWeight` - Font weight
- `descriptionLetterSpacing` - Letter spacing
- `descriptionLineHeight` - Line height
- `descriptionMaxWidth` - Max width with auto-centering
- `descriptionOpacity` - Opacity (0-1)

**Stats Controls (11 props):**

- `statsValueSize` - Stats value size multiplier
- `statsValueColor` - Stats value color
- `statsValueWeight` - Stats value font weight
- `statsValueLineHeight` - Stats value line height
- `statsValueLetterSpacing` - Stats value letter spacing
- `statsLabelSize` - Stats label font size (direct CSS value)
- `statsLabelColor` - Stats label color
- `statsLabelWeight` - Stats label font weight
- `statsLabelLineHeight` - Stats label line height
- `statsLabelLetterSpacing` - Stats label letter spacing
- `statsLabelTransform` - Stats label text transform (none, uppercase, lowercase, capitalize)

**Features:**

- Full responsive sizing with clamp() multipliers
- Auto-centering for maxWidth props when align="center"
- Right-alignment support for maxWidth props when align="right"
- Uses `!important` to override variant-specific CSS
- All props optional with sensible defaults
- 100% backward compatible
- Design token integration following Spexop principles

**Documentation:**

- Updated Hero README.md with comprehensive typography section
- Updated Hero USAGE-GUIDE.md with complete examples
- Added all 32 props to Props API table
- Included best practices and accessibility guidelines

### @spexop/theme v0.4.6

#### Version Sync in v0.4.6

- Version sync with @spexop/react v0.4.6
- No functional changes from v0.4.5

---

## [0.4.5] - 2025-10-24

### @spexop/react v0.4.5

#### Hero Feature Showcase Fix

- Fixed transparent background support for feature-showcase variant
- Feature cards now display with glassmorphic styling when `background="transparent"`
- Added backdrop-filter blur effect and proper text shadows for video backgrounds
- Automatic styling when combining transparent background with feature-showcase
- Dark mode support with adjusted opacity values

### @spexop/theme v0.4.5

#### Version Sync in v0.4.5

- Version sync with @spexop/react v0.4.5
- No functional changes from v0.4.4

---

## [0.4.4] - 2025-10-24

### @spexop/react v0.4.4

#### Build Fix

- Republish of v0.4.3 with proper build
- v0.4.3 was published without running build command
- All v0.4.3 fixes now properly included in distribution

### @spexop/theme v0.4.4

#### Version Sync in v0.4.4

- Version sync with @spexop/react v0.4.4
- No functional changes from v0.4.3

---

## [0.4.3] - 2025-10-24

### @spexop/react v0.4.3

#### Critical Bugfix

- Background media videos now properly autoplay with intersection observer
- Note: This release had a build issue, fixed in v0.4.4

#### Hero Component Major Enhancement in v0.4.2

- 9 layout variants (was 6): centered-spacious, centered-compact, feature-showcase, title, and enhanced modern/elegant/split
- Universal background media support for all variants
- Content positioning control for overlay variants
- Dynamic title sizing and adjustable overlay intensity
- Parallax effects, glassmorphism, and interactive feature grids
- Complete documentation rewrite (1700+ lines)

### @spexop/theme v0.4.3

#### RGB Transparency Support

- Auto-generated RGB variants for primary and surface colors
- `--theme-primary-rgb` and `--theme-surface-rgb` custom properties
- Enables glassmorphism and modern transparency effects
- All 13 pre-built themes updated

---

## [@spexop/theme@0.4.0] - 2025-10-17

### Added

- **10 new large spacing tokens** (sSpacing40 through sSpacing192)
  - Supports hero sections, full-height layouts, and modern responsive designs
  - Range: 160px (sSpacing40) to 768px (sSpacing192)
  - sSpacing160 and sSpacing192 align with sBreakpointSm and sBreakpointMd

### Changed

- **Total Token Count**: 369 → 379 tokens (+2.7%)

---

## [@spexop/theme@0.3.0] - 2025-10-17

### ⚠️ BREAKING CHANGES - Refined Minimalism Alignment

This release removes **83 tokens (18.3%)** from `@spexop/theme` that don't align with the Spexop design system's core principles of **Refined Minimalism**. The package now contains **369 tokens** (down from 452).

#### Design Principles Enforced

1. **"Borders before shadows"** - Heavy drop shadows removed; use borders for structure
2. **"Minimal decoration"** - Glass effects and blur removed; favor clean aesthetics  
3. **"Purpose over decoration"** - Ultra-wide aspect ratios and niche tokens removed

#### Removed Token Categories

- **Slate color palette** (10 tokens) - Use Neutral palette instead
- **Glass effects** (37 tokens) - Contradicts minimal decoration principle
- **Heavy shadows** (8 tokens) - Violates "Borders before shadows" principle
- **Blur/Backdrop effects** (7 tokens) - Anti-pattern for refined aesthetic
- **Container duplicates** (6 tokens) - Use breakpoints instead
- **Ultra-wide aspect ratios** (2 tokens) - Niche use cases removed

#### Migration Guide

See [packages/theme/CHANGELOG.md](./packages/theme/CHANGELOG.md) for detailed migration instructions and code examples.

#### Benefits

✅ **Leaner package** - 13% smaller bundle size (13KB vs 15KB)  
✅ **Clearer philosophy** - Fully aligned with Refined Minimalism  
✅ **Easier decisions** - Less redundancy, clearer token purposes  
✅ **Better maintenance** - Fewer tokens to maintain and document  

---

## [@spexop/theme@0.2.3] - 2025-10-11

### Added Tokens

- `sSpacing7` (28px) - Fills gap between 24px and 32px
- `sSpacing9` (36px) - Fills gap between 32px and 40px
- `sFontSize6xl` (60px) - Extra large headlines
- `sFontSize7xl` (72px) - Hero headlines
- `sFontWeight300` through `sFontWeight900` - Numbered font weight tokens

### What Changed

- **Total Token Count**: 441 → 452 tokens (+11 tokens)
- **Repository Name**: Renamed from "spexop-design-system-public" to "spexop-packages"

---

## [@spexop/theme@0.2.2] - 2025-10-08

### Fixed

- **CSS Variable Naming Bug** - Fixed critical bug where color tokens had incorrect names
  - Before: `--s-color-red-5-0-0` (broken)
  - After: `--s-color-red-500` (correct)

### Updated

- Updated breakpoints for modern displays:
  - `sBreakpointLg`: 1024px → 1280px
  - `sBreakpointXl`: 1536px → 1920px
  - `sBreakpoint2xl`: 1920px → 2560px

---

## [@spexop/theme@0.2.1] - 2025-10-08

⚠️ **This version has a CSS variable naming bug. Please use v0.2.2 instead.**

---

## [@spexop/theme@0.2.0] - 2025-10-06

### Added on 2025-10-06

- Complete redesign with 441 tokens
- TypeScript-first design tokens
- CSS variable generation
- Built-in theme system with dark mode
- Media query utilities
- Comprehensive token categories

---

## Links

- [Package README](./packages/theme/README.md)
- [Detailed Package Changelog](./packages/theme/CHANGELOG.md)
- [NPM Packages](https://www.npmjs.com/org/spexop)
- [GitHub Repository](https://github.com/spexop-ui/spexop-packages)
