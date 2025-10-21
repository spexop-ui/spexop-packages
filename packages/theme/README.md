# @spexop/theme

Professional theming system for Spexop Design System with token references, pre-built themes, and 29+ export formats.

## Features

- ✅ **Token Reference System** - Maintain relationships between design tokens
- ✅ **13 Pre-built Themes** - Production-ready preset themes
- ✅ **Pre-built CSS Files** - Import and go
- ✅ **29+ Export Formats** - CSS, SCSS, Tailwind, Figma, and more
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Zero Runtime Cost** - Uses CSS variables
- ✅ **Tree-Shakeable** - Import only what you need

## Installation

```bash
npm install @spexop/theme

# Or with React components
npm install @spexop/react @spexop/theme
```

## Quick Start

### Option 1: Pre-built CSS (Easiest)

Import a pre-built theme CSS file:

```typescript
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';

// Done! All components use the tech theme
```

Available themes:

- `default.css` - Balanced starter theme
- `tech.css` - Modern tech company
- `startup.css` - Bold and energetic
- `healthcare.css` - Calm and trustworthy
- `finance.css` - Professional
- `ecommerce.css` - Vibrant shopping
- `education.css` - Friendly learning
- `corporate.css` - Business classic
- `agency.css` - Creative studio
- `minimal.css` - Clean simplicity
- `dark.css` - Dark mode
- `pastel.css` - Soft colors
- `vibrant.css` - Bold and bright

### Option 2: ThemeProvider (Flexible)

Use with React for runtime theme switching:

```typescript
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

function App() {
  return (
    <ThemeProvider theme={techPreset}>
      <YourComponents />
    </ThemeProvider>
  );
}
```

### Option 3: Custom Theme (Full Control)

Create a custom theme configuration:

```typescript
import { generateCSS } from '@spexop/theme';
import type { SpexopThemeConfig } from '@spexop/theme';

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
};

// Generate CSS
const css = generateCSS(myTheme);
console.log(css); // CSS variables ready to use
```

## Token Reference System

Token references let you maintain relationships between design tokens:

```typescript
const theme: SpexopThemeConfig = {
  colors: {
    primary: "#007bff",
    secondary: "#28a745",
  },
  buttons: {
    primary: {
      background: "colors.primary",  // ← References colors.primary
      text: "#ffffff",
      border: "colors.primary",
    },
  },
};

// When you change colors.primary, the primary button updates automatically!
```

### Benefits

- **DRY Principle** - Single source of truth for colors
- **Maintainability** - Change once, update everywhere
- **Clear Intent** - "colors.secondary" is more meaningful than "#3b82f6"
- **Hybrid Approach** - Mix references and literals as needed

## Available Presets

Import any preset theme:

```typescript
import {
  defaultTheme,
  techPreset,
  startupPreset,
  healthcarePreset,
  financePreset,
  ecommercePreset,
  educationPreset,
  corporatePreset,
  agencyPreset,
  minimalPreset,
  darkPreset,
  pastelPreset,
  vibrantPreset,
} from '@spexop/theme';
```

All presets include:

- Complete color palettes
- Button styling configurations
- Typography settings
- Spacing values
- Border configurations

## Export Formats

Generate your theme in 29+ formats:

```typescript
import {
  generateCSS,
  generateSCSS,
  generateLess,
  generateTailwind,
  generateTypeScript,
  generateJSON,
  generateFigma,
  // ... and 22 more formats
} from '@spexop/theme';

const theme = techPreset;

// Export to different formats
const css = generateCSS(theme);
const scss = generateSCSS(theme);
const tailwind = generateTailwind(theme);
const figma = generateFigma(theme);
```

### Supported Formats

**Core Formats:**

- CSS Variables
- TypeScript
- JavaScript
- JSON
- YAML

**CSS Preprocessors:**

- SCSS
- Less
- Tailwind CSS
- UnoCSS
- PostCSS

**CSS-in-JS:**

- Emotion
- Styled Components
- Vanilla Extract
- Panda CSS

**Frameworks:**

- Vue/Nuxt
- Svelte
- Angular Material
- React Native
- Flutter
- Chakra UI

**Design Tools:**

- Figma Variables
- Tokens Studio
- Style Dictionary
- Sketch
- Canva Brand Kit
- Adobe XD
- Zeplin/Penpot

**Documentation:**

- Storybook
- Docusaurus
- W3C Design Tokens

## API Reference

### Core Functions

#### `generateCSS(config, scope?)`

Generate CSS custom properties from theme configuration.

```typescript
import { generateCSS } from '@spexop/theme';

const css = generateCSS(theme);
// Returns CSS string with :root {...}

const scopedCSS = generateCSS(theme, '.my-scope');
// Returns CSS string with .my-scope {...}
```

#### Token Resolver Utilities

```typescript
import {
  resolveToken,
  findTokenForValue,
  isTokenReference,
  resolveButtonTokens,
} from '@spexop/theme';

// Resolve a token reference to its actual value
const color = resolveToken("colors.primary", theme);
// Returns: "#007bff"

// Find token path for a value (reverse lookup)
const tokenPath = findTokenForValue("#007bff", theme);
// Returns: "colors.primary"

// Check if a value is a token reference
isTokenReference("colors.primary");  // true
isTokenReference("#007bff");         // false

// Resolve all button token references
const resolved = resolveButtonTokens(theme.buttons, theme);
```

### Types

```typescript
import type {
  SpexopThemeConfig,
  ThemeColors,
  ThemeButtons,
  ButtonVariantStyle,
  ThemeTypography,
  ThemeSpacing,
  ThemeBorders,
  DarkModeConfig,
} from '@spexop/theme';
```

#### `SpexopThemeConfig`

Main theme configuration interface:

```typescript
interface SpexopThemeConfig {
  meta: {
    name: string;
    version: string;
    description?: string;
    author?: string;
    tags?: string[];
  };
  colors: ThemeColors;
  buttons?: ThemeButtons;
  typography?: ThemeTypography;
  spacing?: ThemeSpacing;
  borders?: ThemeBorders;
  darkMode?: DarkModeConfig;
}
```

#### `ThemeColors`

All color tokens (32 total):

```typescript
interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  light: string;
  dark: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  disabled: string;
  hover: string;
}
```

#### `ThemeButtons`

Button styling configuration with token references:

```typescript
interface ThemeButtons {
  primary?: Partial<ButtonVariantStyle>;
  secondary?: Partial<ButtonVariantStyle>;
  outline?: Partial<ButtonVariantStyle>;
  ghost?: Partial<ButtonVariantStyle>;
  text?: Partial<ButtonVariantStyle>;
}

interface ButtonVariantStyle {
  // Default state
  background: string | number;
  text: string | number;
  border: string | number;
  
  // Hover state
  backgroundHover: string | number;
  textHover: string | number;
  borderHover: string | number;
  
  // Active state
  backgroundActive: string | number;
  textActive: string | number;
  borderActive: string | number;
}
```

## Preset Theme Utilities

```typescript
import {
  presets,           // Object with all presets
  getPreset,         // Get preset by name
  getPresetNames,    // Get all preset names
  getPresetsByTag,   // Filter presets by tag
  presetMeta,        // Get preset metadata
} from '@spexop/theme';

// Get all preset names
const names = getPresetNames();
// Returns: ['default', 'tech', 'startup', ...]

// Get preset by name
const theme = getPreset('tech');

// Get presets by tag
const professionalThemes = getPresetsByTag('professional');
const modernThemes = getPresetsByTag('modern');

// Get preset metadata
const meta = presetMeta.tech;
// Returns: { name, description, tags, preview }
```

## Importing Themes

Import themes from various formats:

```typescript
import {
  importFromFigma,
  importFromTailwind,
  importFromJSON,
  importFromCSS,
  autoImport,
} from '@spexop/theme';

// Import from Figma Tokens format
const theme = importFromFigma(figmaTokens);

// Import from Tailwind config
const theme = importFromTailwind(tailwindConfig);

// Import from JSON
const theme = importFromJSON(jsonData);

// Import from CSS variables
const theme = importFromCSS(cssString);

// Auto-detect format
const theme = autoImport(data);
```

## Color Utilities

Manipulate colors programmatically:

```typescript
import {
  lighten,
  darken,
  saturate,
  desaturate,
  adjustHue,
  complementary,
  generatePalette,
  checkContrast,
  getAccessibleTextColor,
} from '@spexop/theme';

// Lighten color
const lighter = lighten("#007bff", 20);

// Generate color palette
const palette = generatePalette("#007bff", 9);

// Check contrast ratio
const contrast = checkContrast("#007bff", "#ffffff");

// Get accessible text color
const textColor = getAccessibleTextColor("#007bff");
```

## Dark Mode

Generate dark mode automatically:

```typescript
import { generateDarkMode } from '@spexop/theme';

const darkTheme = generateDarkMode(lightTheme, {
  method: 'invert',      // 'invert', 'custom', or 'adjust'
  preserve: ['accent'],  // Colors to keep unchanged
  adjustment: 0.8,       // Lightness adjustment (0-1)
});
```

## Package Size

- **Total:** ~45KB (uncompressed)
- **Gzipped:** ~12KB
- **Tree-shakeable:** Import only what you need
- **Zero dependencies**

## Browser Support

Works in all modern browsers that support CSS custom properties:

- Chrome/Edge 49+
- Firefox 31+
- Safari 9.1+
- iOS Safari 9.3+
- Android Browser 5+

## TypeScript

Fully typed with strict mode enabled. Includes `.d.ts` files for all exports.

## License

MIT

## Links

- **Documentation:** [https://spexop.com/docs/theme-system](https://spexop.com/docs/theme-system)
- **Theme Builder:** [https://builder.spexop.com](https://builder.spexop.com)
- **GitHub:** [https://github.com/spexop-ui/spexop-design-system](https://github.com/spexop-ui/spexop-design-system)
- **npm:** [https://www.npmjs.com/package/@spexop/theme](https://www.npmjs.com/package/@spexop/theme)

## Examples

### Basic Usage

```typescript
import { generateCSS, techPreset } from '@spexop/theme';

// Generate CSS
const css = generateCSS(techPreset);

// Inject into page
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);
```

### With React

```typescript
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';
import { Button, Card } from '@spexop/react';

function App() {
  return (
    <ThemeProvider theme={techPreset}>
      <Card>
        <h1>Themed Content</h1>
        <Button variant="primary">Themed Button</Button>
      </Card>
    </ThemeProvider>
  );
}
```

### Extending a Preset

```typescript
import { techPreset } from '@spexop/theme';

const myTheme = {
  ...techPreset,
  colors: {
    ...techPreset.colors,
    primary: "#ff0000",  // Override primary color
  },
};
```

### Multiple Themes

```typescript
import { useState } from 'react';
import { ThemeProvider } from '@spexop/react';
import { techPreset, healthcarePreset } from '@spexop/theme';

function App() {
  const [theme, setTheme] = useState(techPreset);

  return (
    <>
      <select onChange={(e) => setTheme(e.target.value === 'tech' ? techPreset : healthcarePreset)}>
        <option value="tech">Tech</option>
        <option value="healthcare">Healthcare</option>
      </select>

      <ThemeProvider theme={theme}>
        <YourApp />
      </ThemeProvider>
    </>
  );
}
```

---

Built with ❤️ by the Spexop team
