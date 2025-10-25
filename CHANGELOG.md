# Changelog

All notable changes to the Spexop Tokens monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

#### Version Sync

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
- [NPM Package](https://www.npmjs.com/package/@spexop/theme)
- [GitHub Repository](https://github.com/spexop-ui/spexop-packages)
