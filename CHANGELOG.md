# Changelog

All notable changes to the Spexop Tokens monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [@spexop/react@0.4.2] - 2025-10-24

### @spexop/react v0.4.2

#### Hero Component Major Enhancement in v0.4.2

- 9 layout variants (was 6): centered-spacious, centered-compact, feature-showcase, title, and enhanced modern/elegant/split
- Universal background media support for all variants
- Content positioning control for overlay variants
- Dynamic title sizing and adjustable overlay intensity
- Parallax effects, glassmorphism, and interactive feature grids
- Complete documentation rewrite (1700+ lines)

### @spexop/theme v0.4.2

#### RGB Transparency Support in v0.4.2

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
