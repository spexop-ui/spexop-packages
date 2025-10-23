# @spexop/theme Migration Guide: v0.3 to v0.4

**Breaking Changes**: Security Enhancements, API Updates, and Enhanced Validation

This guide helps you migrate from @spexop/theme v0.3 to v0.4, which includes major security enhancements, improved validation, and API updates for better developer experience.

## Migration Checklist

### Pre-Migration

- [ ] **Backup your project** - Create a git commit or backup
- [ ] **Review breaking changes** - Understand what will change
- [ ] **Check theme configurations** - Look for circular references
- [ ] **Run current tests** - Ensure existing tests pass
- [ ] **Audit color usage** - Check for invalid color values

### Migration Steps

- [ ] **Update package version** - Install @spexop/theme@^0.4.0
- [ ] **Fix circular references** - Resolve any circular token references
- [ ] **Update contrast checker usage** - Update API calls
- [ ] **Update color validation** - Use new validation functions
- [ ] **Add security features** - Implement sanitization where needed
- [ ] **Test theme generation** - Verify all themes work correctly
- [ ] **Update TypeScript types** - Use new type definitions
- [ ] **Test accessibility** - Verify contrast improvements

### Post-Migration

- [ ] **Run full test suite** - Ensure all tests pass
- [ ] **Validate all themes** - Check theme validation works
- [ ] **Test security features** - Verify sanitization works
- [ ] **Check contrast compliance** - Verify WCAG compliance
- [ ] **Test dark mode generation** - Verify dark mode works
- [ ] **Update documentation** - Update any internal documentation
- [ ] **Deploy to staging** - Test in staging environment

## Overview of Changes

### What Changed

1. **Security Enhancements** - Added comprehensive security features
2. **Enhanced Validation** - Improved validation with better error messages
3. **WCAG Accessibility** - Complete contrast checking and compliance
4. **Color Utilities** - Comprehensive color manipulation functions
5. **Dark Mode Generation** - Automatic dark mode generation
6. **API Updates** - Some breaking changes for better consistency
7. **Testing Infrastructure** - 330 tests with 100% pass rate

### What Stayed the Same

- Core theme structure and configuration
- Basic theme generation and export
- Most utility functions
- CSS generation functionality
- Preset themes and configurations

## Breaking Changes

### 1. Token Resolution - Circular Reference Detection

**Issue**: Circular references in theme tokens now throw errors instead of silently failing.

**Before (v0.3)**:

```typescript
const theme = {
  colors: {
    primary: "var(--colors-secondary)", // Circular reference
    secondary: "var(--colors-primary)"  // Circular reference
  }
};

resolveToken("colors.primary", theme); 
// Silent failure or infinite loop
```

**After (v0.4)**:

```typescript
const theme = {
  colors: {
    primary: "var(--colors-secondary)", // Circular reference
    secondary: "var(--colors-primary)"  // Circular reference
  }
};

resolveToken("colors.primary", theme);
// Throws: "Circular reference detected: colors.primary → colors.secondary → colors.primary"
```

**Migration Steps**:

1. **Identify circular references**:

```typescript
import { validateTheme } from '@spexop/theme';

const result = validateTheme(theme);
if (!result.valid) {
  console.log('Validation errors:', result.errors);
}
```

1. **Fix circular references**:

```typescript
// Before - Circular reference
const theme = {
  colors: {
    primary: "var(--colors-secondary)",
    secondary: "var(--colors-primary)"
  }
};

// After - Use actual values
const theme = {
  colors: {
    primary: "#3b82f6",
    secondary: "#8b5cf6"
  }
};
```

### 2. Contrast Checker API Changes

**Issue**: The `ContrastResult` interface has been simplified for better consistency.

**Before (v0.3)**:

```typescript
interface ContrastResult {
  ratio: number;
  level: ContrastLevel;
  passAA: boolean;
  passAAA: boolean;
  passAALarge: boolean;
  passAAALarge: boolean;
  score: number;
}

// Usage
const result = checkContrast("#000000", "#ffffff");
if (result.passAA) {
  console.log("Passes AA contrast");
}
```

**After (v0.4)**:

```typescript
interface ContrastResult {
  ratio: number;
  AA: boolean;
  AAA: boolean;
  AALarge: boolean;
  AAALarge: boolean;
}

// Usage
const result = checkContrast("#000000", "#ffffff");
if (result.AA) {
  console.log("Passes AA contrast");
}
```

**Migration Steps**:

1. **Update property names**:

```typescript
// Before
if (result.passAA) { /* ... */ }
if (result.passAAA) { /* ... */ }
if (result.passAALarge) { /* ... */ }
if (result.passAAALarge) { /* ... */ }

// After
if (result.AA) { /* ... */ }
if (result.AAA) { /* ... */ }
if (result.AALarge) { /* ... */ }
if (result.AALarge) { /* ... */ }
```

1. **Remove unused properties**:

```typescript
// Before
const { ratio, level, passAA, passAAA, score } = result;

// After
const { ratio, AA, AAA, AALarge, AAALarge } = result;
```

### 3. Function Signature Changes

**Issue**: Several function signatures have been updated for better consistency.

#### `generateContrastMatrix()`

**Before (v0.3)**:

```typescript
const colors = {
  primary: "#3b82f6",
  secondary: "#8b5cf6"
};
const matrix = generateContrastMatrix(colors);
```

**After (v0.4)**:

```typescript
const colors = ["#3b82f6", "#8b5cf6"];
const matrix = generateContrastMatrix(colors);
```

**Migration**:

```typescript
// Before
const colors = {
  primary: "#3b82f6",
  secondary: "#8b5cf6"
};
const matrix = generateContrastMatrix(colors);

// After
const colors = ["#3b82f6", "#8b5cf6"];
const matrix = generateContrastMatrix(colors);
```

#### `checkContrast()`

**Before (v0.3)**:

```typescript
const result = checkContrast("#000000", "#ffffff", true); // isLargeText parameter
```

**After (v0.4)**:

```typescript
const result = checkContrast("#000000", "#ffffff");
// Use result.AALarge or result.AAALarge for large text
```

**Migration**:

```typescript
// Before
const result = checkContrast("#000000", "#ffffff", true);
if (result.passAALarge) { /* ... */ }

// After
const result = checkContrast("#000000", "#ffffff");
if (result.AALarge) { /* ... */ }
```

#### `getContrastDescription()`

**Before (v0.3)**:

```typescript
const description = getContrastDescription(result);
```

**After (v0.4)**:

```typescript
const description = getContrastDescription(result.ratio);
```

**Migration**:

```typescript
// Before
const description = getContrastDescription(result);

// After
const description = getContrastDescription(result.ratio);
```

## New Features and APIs

### 1. Security Enhancements

#### Input Sanitization

**New Feature**: Comprehensive sanitization utilities for secure theme handling.

```typescript
import {
  sanitizeTheme,
  sanitizeThemeFromJSON,
  deepCloneSanitize,
  isThemeLike,
  sanitizeAndValidate,
  removeDangerousChars,
  escapeForDisplay,
} from '@spexop/theme';

// Sanitize theme from object
const sanitizedTheme = sanitizeTheme(theme);

// Sanitize theme from JSON string
const sanitizedTheme = sanitizeThemeFromJSON(jsonString);

// Deep clone with sanitization
const safeTheme = deepCloneSanitize(theme);

// Check if object is theme-like
if (isThemeLike(data)) {
  const sanitized = sanitizeAndValidate(data);
}

// Remove dangerous characters
const safeString = removeDangerousChars(input);

// Escape HTML for display
const safeHtml = escapeForDisplay(htmlString);
```

#### Circular Reference Detection

**New Feature**: Automatic detection and prevention of circular references.

```typescript
import { validateTheme } from '@spexop/theme';

const result = validateTheme(theme);
if (!result.valid) {
  result.errors.forEach(error => {
    if (error.type === 'circular_reference') {
      console.error('Circular reference detected:', error.path);
    }
  });
}
```

### 2. Enhanced Color Validation

**New Feature**: Comprehensive color validation with multiple format support.

```typescript
import {
  validateColor,
  isValidHexColor,
  isValidRgbColor,
  isValidHslColor,
  isNamedColor,
  isCssKeyword,
  normalizeColorToHex,
} from '@spexop/theme';

// Validate any color format
const isValid = validateColor("#3b82f6"); // true
const isValid = validateColor("rgb(59, 130, 246)"); // true
const isValid = validateColor("hsl(217, 91%, 60%)"); // true
const isValid = validateColor("blue"); // true

// Check specific formats
const isHex = isValidHexColor("#3b82f6"); // true
const isRgb = isValidRgbColor("rgb(59, 130, 246)"); // true
const isHsl = isValidHslColor("hsl(217, 91%, 60%)"); // true
const isNamed = isNamedColor("blue"); // true
const isKeyword = isCssKeyword("transparent"); // true

// Normalize to hex
const hex = normalizeColorToHex("rgb(59, 130, 246)"); // "#3b82f6"
```

### 3. WCAG Accessibility Features

**New Feature**: Complete WCAG 2.1 AA/AAA contrast validation.

```typescript
import {
  calculateContrastRatio,
  checkContrast,
  meetsMinimumContrast,
  getAccessibleTextColor,
  suggestContrastFix,
  checkMultipleContrasts,
  generateContrastMatrix,
  getContrastDescription,
} from '@spexop/theme';

// Calculate contrast ratio
const ratio = calculateContrastRatio("#000000", "#ffffff"); // 21

// Check contrast compliance
const result = checkContrast("#000000", "#ffffff");
console.log(result.AA); // true
console.log(result.AAA); // true

// Check if meets minimum contrast
const meetsAA = meetsMinimumContrast("#000000", "#ffffff", 'AA'); // true

// Get accessible text color
const textColor = getAccessibleTextColor("#3b82f6"); // "#ffffff" or "#000000"

// Get contrast fix suggestions
const suggestion = suggestContrastFix("#3b82f6", "#ffffff");
if (suggestion) {
  console.log("Suggestion:", suggestion);
}

// Check multiple contrasts
const results = checkMultipleContrasts([
  { foreground: "#000000", background: "#ffffff" },
  { foreground: "#3b82f6", background: "#ffffff" }
]);

// Generate contrast matrix
const colors = ["#000000", "#ffffff", "#3b82f6"];
const matrix = generateContrastMatrix(colors);

// Get contrast description
const description = getContrastDescription(4.5); // "AA Large Text"
```

### 4. Color Manipulation Utilities

**New Feature**: Comprehensive color space conversions and manipulations.

```typescript
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  lightenColor,
  darkenColor,
  saturateColor,
  desaturateColor,
  adjustHue,
  mixColors,
  invertColor,
  generateColorScale,
} from '@spexop/theme';

// Color space conversions
const rgb = hexToRgb("#3b82f6"); // { r: 59, g: 130, b: 246 }
const hex = rgbToHex({ r: 59, g: 130, b: 246 }); // "#3b82f6"
const hsl = rgbToHsl({ r: 59, g: 130, b: 246 }); // { h: 217, s: 91, l: 60 }

// Color adjustments
const lighter = lightenColor("#3b82f6", 20); // "#66a3f7"
const darker = darkenColor("#3b82f6", 20); // "#1e40af"
const saturated = saturateColor("#3b82f6", 20); // "#2563eb"
const desaturated = desaturateColor("#3b82f6", 20); // "#6b7280"
const adjustedHue = adjustHue("#3b82f6", 30); // "#3b82f6" with +30 hue

// Color mixing
const mixed = mixColors("#3b82f6", "#8b5cf6", 0.5); // 50/50 mix

// Color inversion
const inverted = invertColor("#3b82f6"); // "#c47d09"

// Generate color scale
const scale = generateColorScale("#3b82f6", 9); // 9-step scale from 50 to 900
```

### 5. Dark Mode Generation

**New Feature**: Automatic dark mode generation from light themes.

```typescript
import {
  generateDarkMode,
  generateDarkModeIntense,
  generateDarkModeSubtle,
  generateDarkModeModerate,
  validateDarkModeQuality,
} from '@spexop/theme';

// Generate dark mode
const darkTheme = generateDarkMode(lightTheme);

// Generate with specific intensity
const subtleDark = generateDarkModeSubtle(lightTheme);
const moderateDark = generateDarkModeModerate(lightTheme);
const intenseDark = generateDarkModeIntense(lightTheme);

// Validate dark mode quality
const quality = validateDarkModeQuality(lightTheme, darkTheme);
console.log(quality.overallScore); // 0-100
console.log(quality.contrastCompliance); // true/false
console.log(quality.brandPreservation); // true/false
```

## Migration Examples

### Example 1: Updating Contrast Checker Usage

**Before (v0.3)**:

```typescript
import { checkContrast } from '@spexop/theme';

function validateThemeColors(theme) {
  const primary = theme.colors.primary;
  const background = theme.colors.background;
  
  const result = checkContrast(primary, background, false);
  
  if (result.passAA) {
    console.log("✅ Passes AA contrast");
  } else if (result.passAALarge) {
    console.log("⚠️ Passes AA Large Text only");
  } else {
    console.log("❌ Fails contrast requirements");
  }
  
  return {
    ratio: result.ratio,
    level: result.level,
    score: result.score
  };
}
```

**After (v0.4)**:

```typescript
import { checkContrast, getContrastDescription } from '@spexop/theme';

function validateThemeColors(theme) {
  const primary = theme.colors.primary;
  const background = theme.colors.background;
  
  const result = checkContrast(primary, background);
  
  if (result.AA) {
    console.log("✅ Passes AA contrast");
  } else if (result.AALarge) {
    console.log("⚠️ Passes AA Large Text only");
  } else {
    console.log("❌ Fails contrast requirements");
  }
  
  const description = getContrastDescription(result.ratio);
  
  return {
    ratio: result.ratio,
    description: description,
    AA: result.AA,
    AAA: result.AAA
  };
}
```

### Example 2: Adding Security Features

**Before (v0.3)**:

```typescript
import { generateCSS } from '@spexop/theme';

function processTheme(themeData) {
  // No sanitization - potential security risk
  const css = generateCSS(themeData);
  return css;
}
```

**After (v0.4)**:

```typescript
import { generateCSS, sanitizeTheme, validateTheme } from '@spexop/theme';

function processTheme(themeData) {
  // Sanitize input for security
  const sanitizedTheme = sanitizeTheme(themeData);
  
  // Validate theme structure
  const validation = validateTheme(sanitizedTheme);
  if (!validation.valid) {
    throw new Error(`Theme validation failed: ${validation.errors.join(', ')}`);
  }
  
  const css = generateCSS(sanitizedTheme);
  return css;
}
```

### Example 3: Implementing Color Validation

**Before (v0.3)**:

```typescript
function validateColor(color) {
  // Basic validation
  return /^#[0-9A-F]{6}$/i.test(color);
}
```

**After (v0.4)**:

```typescript
import { validateColor, normalizeColorToHex } from '@spexop/theme';

function validateColor(color) {
  // Comprehensive validation
  if (!validateColor(color)) {
    throw new Error(`Invalid color: ${color}`);
  }
  
  // Normalize to hex for consistency
  return normalizeColorToHex(color);
}
```

## Common Issues and Solutions

### Issue: Circular Reference Errors

**Error**: `Circular reference detected: colors.primary → colors.secondary → colors.primary`

**Solution**:

```typescript
// Before - Circular reference
const theme = {
  colors: {
    primary: "var(--colors-secondary)",
    secondary: "var(--colors-primary)"
  }
};

// After - Use actual values
const theme = {
  colors: {
    primary: "#3b82f6",
    secondary: "#8b5cf6"
  }
};
```

### Issue: Contrast Checker API Changes

**Error**: `Property 'passAA' does not exist on type 'ContrastResult'`

**Solution**:

```typescript
// Before
if (result.passAA) { /* ... */ }

// After
if (result.AA) { /* ... */ }
```

### Issue: Color Validation Failures

**Error**: `Invalid color format`

**Solution**:

```typescript
import { validateColor, normalizeColorToHex } from '@spexop/theme';

// Validate and normalize colors
const colors = ["#3b82f6", "rgb(59, 130, 246)", "blue"];
const validColors = colors
  .filter(validateColor)
  .map(normalizeColorToHex);
```

### Issue: Theme Validation Failures

**Error**: `Theme validation failed`

**Solution**:

```typescript
import { validateTheme } from '@spexop/theme';

const result = validateTheme(theme);
if (!result.valid) {
  console.log('Validation errors:', result.errors);
  // Fix each error
  result.errors.forEach(error => {
    console.log(`Error in ${error.path}: ${error.message}`);
  });
}
```

## Performance Considerations

### Bundle Size Impact

- **New features**: ~15KB additional bundle size
- **Tree shaking**: All new features are tree-shakeable
- **Import optimization**: Import only what you need

```typescript
// ❌ Imports everything
import * as Theme from '@spexop/theme';

// ✅ Imports only what you need
import { validateTheme, checkContrast } from '@spexop/theme';
```

### Runtime Performance

- **Validation**: ~2ms per theme validation
- **Contrast checking**: ~0.1ms per contrast check
- **Color manipulation**: ~0.05ms per color operation
- **Dark mode generation**: ~5ms per theme

## Testing Your Migration

### 1. Validate All Themes

```typescript
import { validateTheme } from '@spexop/theme';

const themes = [theme1, theme2, theme3];
themes.forEach((theme, index) => {
  const result = validateTheme(theme);
  if (!result.valid) {
    console.error(`Theme ${index} validation failed:`, result.errors);
  }
});
```

### 2. Test Contrast Compliance

```typescript
import { checkContrast } from '@spexop/theme';

const colorPairs = [
  { foreground: "#000000", background: "#ffffff" },
  { foreground: "#3b82f6", background: "#ffffff" }
];

colorPairs.forEach(({ foreground, background }) => {
  const result = checkContrast(foreground, background);
  console.log(`${foreground} on ${background}:`, result.AA ? '✅' : '❌');
});
```

### 3. Test Security Features

```typescript
import { sanitizeTheme, isThemeLike } from '@spexop/theme';

const maliciousData = {
  colors: {
    primary: "<script>alert('xss')</script>",
    secondary: "var(--colors-primary)" // Circular reference
  }
};

if (isThemeLike(maliciousData)) {
  const sanitized = sanitizeTheme(maliciousData);
  console.log('Sanitized theme:', sanitized);
}
```

## Rollback Plan

If you need to rollback to v0.3:

1. **Downgrade package**: `npm install @spexop/theme@^0.3.0`
2. **Revert code changes**: Use git to revert migration changes
3. **Test thoroughly**: Ensure everything works as before

## Getting Help

If you encounter issues during migration:

1. **Check the changelog**: Review all breaking changes
2. **Use validation tools**: Use `validateTheme()` to find issues
3. **Open an issue**: Report problems on GitHub
4. **Join the community**: Get help in Discord/Slack

## Timeline

- **v0.3.x**: Deprecation warnings added
- **v0.4.0**: Breaking changes released
- **v0.4.1+**: Bug fixes and improvements

## Support

- **Documentation**: [spexop.com/docs](https://spexop.com/docs)
- **GitHub**: [github.com/spexop-ui/spexop-design-system](https://github.com/spexop-ui/spexop-design-system)
- **Discord**: [discord.gg/spexop](https://discord.gg/spexop)

---

**Need help?** Open an issue or reach out to the community. We're here to help make your migration smooth!
