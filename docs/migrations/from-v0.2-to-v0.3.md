# Migrating from Spexop Theme v0.2 to v0.3

This guide helps you upgrade from Spexop Theme v0.2.x to v0.3.0.

## What's New in v0.3.0

### New Features

- ✅ **Animation Tokens** - durations, easings, transitions
- ✅ **Opacity Tokens** - disabled, hover, overlay, subtle
- ✅ **Extended Radius System** - 7 radius sizes
- ✅ **Enhanced Shadow System** - 5 shadow levels
- ✅ **Z-Index Tokens** - 8 layer system
- ✅ **13 Pre-built Themes** - up from 12
- ✅ **Circular Reference Detection** - prevents infinite loops
- ✅ **Comprehensive Testing** - 562 tests with 100% pass rate

### Breaking Changes

**None!** v0.3.0 is fully backward compatible with v0.2.x.

## Upgrade Steps

### 1. Update Package

```bash
npm install @spexop/theme@^0.3.0
# or
pnpm add @spexop/theme@^0.3.0
```

### 2. (Optional) Add New Features

Your existing themes will continue to work. To use new features, extend your theme:

```typescript
import type { SpexopThemeConfig } from '@spexop/theme';

const theme: SpexopThemeConfig = {
  // ... your existing config ...
  
  // NEW: Animation tokens (optional)
  animations: {
    durations: {
      fast: 150,
      normal: 250,
      slow: 400,
    },
    easings: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    transitions: {
      default: 'all 250ms ease-in-out',
    },
  },
  
  // NEW: Opacity tokens (optional)
  opacity: {
    disabled: 0.4,
    hover: 0.8,
    overlay: 0.75,
    subtle: 0.6,
  },
};
```

### 3. Use New CSS Variables

After adding animations and opacity, use them in your CSS:

```css
/* Animation durations */
.button {
  transition: var(--theme-transition-default);
  animation-duration: var(--theme-duration-fast);
}

/* Easings */
.modal {
  animation-timing-function: var(--theme-easing-ease-out);
}

/* Opacity */
.disabled {
  opacity: var(--theme-opacity-disabled);
}

.overlay {
  opacity: var(--theme-opacity-overlay);
}
```

## New Presets

### Vibrant Theme

v0.3.0 adds a new "vibrant" preset:

```typescript
import { vibrantPreset } from '@spexop/theme';
```

Or via CSS:

```typescript
import '@spexop/theme/dist/css/vibrant.css';
```

## API Improvements

### Enhanced Type Safety

```typescript
// v0.2.x - spacing.strong could cause type errors
borders: {
  strong: 3, // Sometimes caused issues
}

// v0.3.0 - proper optional handling
borders: {
  strong: 3, // Fully supported and type-safe
}
```

### Better JSON Import/Export

```typescript
import { generateJSON, sanitizeThemeFromJSON } from '@spexop/theme';

// v0.2.x - lost spacing.baseUnit
const json = generateJSON(theme);
const restored = sanitizeThemeFromJSON(json);
// restored.spacing.baseUnit was undefined ❌

// v0.3.0 - preserves all data
const json = generateJSON(theme);
const restored = sanitizeThemeFromJSON(json);
// restored.spacing.baseUnit === 4 ✅
```

## Testing Improvements

### Circular Reference Protection

v0.3.0 prevents infinite loops from token references:

```typescript
// This now throws a helpful error instead of crashing
const badTheme: SpexopThemeConfig = {
  colors: {
    primary: "colors.secondary",
    secondary: "colors.primary", // ❌ Circular reference detected!
  },
};
```

Error message:

```bash
Circular reference detected: colors.primary → colors.secondary → colors.primary
```

## Performance

### Bundle Size

No change - still ~45KB uncompressed, ~12KB gzipped.

### New Features Impact

Animation and opacity tokens add minimal size:

- With animations: +0.5KB
- With opacity: +0.2KB

## Migration Checklist

- [ ] Update to v0.3.0
- [ ] Run tests (everything should pass)
- [ ] (Optional) Add animation tokens to your theme
- [ ] (Optional) Add opacity tokens to your theme
- [ ] (Optional) Use new CSS variables in components
- [ ] (Optional) Try the new vibrant preset

## Full Changelog

### Added

- Animation token generation (durations, easings, transitions)
- Opacity token generation (disabled, hover, overlay, subtle)
- Vibrant preset theme (13th preset)
- Circular reference detection in token resolver
- 90+ new generator tests (scss, tailwind, typescript)
- Comprehensive test coverage (562 tests, 100% pass rate)

### Fixed

- `spacing.baseUnit` preservation in JSON import/export
- `borders.strong` optional handling in sanitizer
- README preset count (12 → 13)

### Changed

- Improved TypeScript type definitions
- Enhanced error messages for token resolution
- Better JSDoc documentation

### Security

- Added input sanitization tests
- Circular reference protection
- Validation improvements

## Troubleshooting

### Issue: "Cannot find module '@spexop/theme'"

**Solution:** Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Types not updating

**Solution:** Restart TypeScript server in VS Code:

`Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"

### Issue: CSS variables not appearing

**Solution:** Rebuild your theme CSS:

```bash
npm run build
# or
pnpm build
```

## Support

- [Documentation](https://spexop.com/docs)
- [GitHub Issues](https://github.com/spexop-ui/spexop-packages/issues)
- [Discussions](https://github.com/spexop-ui/spexop-packages/discussions)

## What's Next?

### v0.3.1 (Planned)

- More generator tests (scss, less, figma)
- Additional migration guides
- Performance optimizations

### v0.4.0 (Planned)

- Fluid typography support
- Component-specific tokens (forms, modals, navigation)
- Theme composition utilities export
- CLI tool for theme management

---

**Enjoy v0.3.0!** 🎉
