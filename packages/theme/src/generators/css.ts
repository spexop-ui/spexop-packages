/**
 * CSS Variables Generator
 * Converts SpexopThemeConfig to CSS custom properties
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";
import { hexToRgb } from "../utils/colorManipulation.js";
import {
  fluidTypographyToCSS,
  generateFluidTypographyScale,
} from "../utils/fluidTypography.js";
import { resolveToken } from "../utils/tokenResolver.js";

/**
 * Resolve a value that might be a token reference
 */
function resolveValue(
  value: string | number | undefined,
  theme: SpexopThemeConfig,
): string {
  if (value === undefined) return "";
  if (typeof value === "number") return value.toString();

  // Check if it's a token reference (e.g., "colors.primary")
  if (typeof value === "string" && value.includes(".")) {
    try {
      const resolved = resolveToken(value, theme);
      return typeof resolved === "number" ? resolved.toString() : resolved;
    } catch {
      // If resolution fails, return the original value
      return value;
    }
  }

  return value;
}

/**
 * Helper to generate CSS variable with optional token resolution
 */
function cssVar(
  name: string,
  value: string | number | undefined,
  theme: SpexopThemeConfig,
  optional = false,
): string {
  if (value === undefined || value === "") {
    return optional ? "" : "";
  }

  const resolved = resolveValue(value, theme);
  return optional && !resolved ? "" : `  --theme-${name}: ${resolved};`;
}

/**
 * Helper to generate optional CSS variable
 */
function cssVarOptional(
  name: string,
  value: string | number | undefined,
  theme: SpexopThemeConfig,
): string {
  if (value === undefined || value === "") return "";
  const resolved = resolveValue(value, theme);
  return resolved ? `  --theme-${name}: ${resolved};` : "";
}

/**
 * Helper to generate CSS variable with RGB variant for transparency support
 */
function cssVarWithRgb(
  name: string,
  value: string | number | undefined,
  theme: SpexopThemeConfig,
): string {
  if (value === undefined || value === "") return "";

  const resolved = resolveValue(value, theme);
  if (!resolved) return "";

  let rgbValue = "0, 0, 0"; // Default fallback

  try {
    // Only convert if it's a hex color
    if (resolved.startsWith("#")) {
      const rgb = hexToRgb(resolved);
      rgbValue = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    }
  } catch (e) {
    // If conversion fails, use default
    console.warn(`Could not convert ${resolved} to RGB for ${name}`);
  }

  return `  --theme-${name}: ${resolved};\n  --theme-${name}-rgb: ${rgbValue};`;
}

/**
 * Generate spacing tokens from theme config
 */
function generateSpacingTokens(spacing: SpexopThemeConfig["spacing"]): string {
  const { baseUnit, scale, values } = spacing;

  // Use custom values if provided, otherwise generate from scale
  const spacingValues = values || {
    0: 0,
    1: scale?.[1] || baseUnit,
    2: scale?.[2] || baseUnit * 2,
    3: scale?.[3] || baseUnit * 3,
    4: scale?.[4] || baseUnit * 4,
    5: scale?.[5] || baseUnit * 5,
    6: scale?.[6] || baseUnit * 6,
    7: scale?.[7] || baseUnit * 7,
    8: scale?.[8] || baseUnit * 8,
    9: scale?.[9] || baseUnit * 9,
    10: scale?.[10] || baseUnit * 10,
    12: scale?.[12] || baseUnit * 12,
  };

  return Object.entries(spacingValues)
    .map(([key, value]) => `  --theme-spacing-${key}: ${value}px;`)
    .join("\n");
}

/**
 * Generate typography scale from theme config
 */
function generateTypographyScale(
  typography: SpexopThemeConfig["typography"],
  fluidConfig?: SpexopThemeConfig["fluidTypography"],
): string {
  const { baseSize, scale, sizes } = typography;

  // If fluid typography is enabled, use clamp() values
  if (fluidConfig?.enabled) {
    const fluidSizes = generateFluidTypographyScale(
      baseSize,
      scale,
      fluidConfig,
    );
    return fluidTypographyToCSS(fluidSizes);
  }

  // Use custom sizes if provided, otherwise generate from scale ratio
  const typographySizes = sizes || {
    xs: Math.round(baseSize / (scale * scale)),
    sm: Math.round(baseSize / scale),
    base: baseSize,
    lg: Math.round(baseSize * scale),
    xl: Math.round(baseSize * scale * scale),
    "2xl": Math.round(baseSize * scale * scale * scale),
    "3xl": Math.round(baseSize * scale * scale * scale * scale),
    "4xl": Math.round(baseSize * scale ** 5),
    "5xl": Math.round(baseSize * scale ** 6),
    "6xl": Math.round(baseSize * scale ** 7),
  };

  return Object.entries(typographySizes)
    .map(([key, value]) => `  --theme-font-size-${key}: ${value}px;`)
    .join("\n");
}

/**
 * Generate font weight tokens
 */
function generateFontWeights(
  weights: SpexopThemeConfig["typography"]["weights"],
): string {
  return Object.entries(weights)
    .map(([key, value]) => `  --theme-font-weight-${key}: ${value};`)
    .join("\n");
}

/**
 * Generate line height tokens
 */
function generateLineHeights(
  lineHeights: SpexopThemeConfig["typography"]["lineHeights"],
): string {
  if (!lineHeights) {
    return "";
  }
  return Object.entries(lineHeights)
    .map(([key, value]) => `  --theme-line-height-${key}: ${value};`)
    .join("\n");
}

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Generate dark mode color overrides
 */
function generateDarkModeTokens(
  colors?: Partial<SpexopThemeConfig["colors"]>,
): string {
  if (!colors) return "";

  return Object.entries(colors)
    .map(([key, value]) => `  --theme-${camelToKebab(key)}: ${value};`)
    .join("\n");
}

/**
 * Generate breakpoint tokens
 */
function generateBreakpoints(
  breakpoints?: Partial<SpexopThemeConfig["breakpoints"]>,
): string {
  if (!breakpoints) return "";

  return Object.entries(breakpoints)
    .map(([key, value]) => `  --theme-breakpoint-${key}: ${value}px;`)
    .join("\n");
}

/**
 * Generate button styling tokens
 * Resolves token references to actual values before generating CSS
 */
function generateButtonStyles(
  buttons?: SpexopThemeConfig["buttons"],
  config?: SpexopThemeConfig,
): string {
  if (!buttons || !config) return "";

  const variants: string[] = [];

  for (const [variant, styles] of Object.entries(buttons)) {
    if (!styles) continue;

    const variantStyles: string[] = [];

    if (styles.background) {
      const resolved = resolveToken(styles.background, config);
      variantStyles.push(`  --theme-button-${variant}-bg: ${resolved};`);
    }
    if (styles.text) {
      const resolved = resolveToken(styles.text, config);
      variantStyles.push(`  --theme-button-${variant}-text: ${resolved};`);
    }
    if (styles.border) {
      const resolved = resolveToken(styles.border, config);
      variantStyles.push(`  --theme-button-${variant}-border: ${resolved};`);
    }
    if (styles.backgroundHover) {
      const resolved = resolveToken(styles.backgroundHover, config);
      variantStyles.push(`  --theme-button-${variant}-bg-hover: ${resolved};`);
    }
    if (styles.textHover) {
      const resolved = resolveToken(styles.textHover, config);
      variantStyles.push(
        `  --theme-button-${variant}-text-hover: ${resolved};`,
      );
    }
    if (styles.borderHover) {
      const resolved = resolveToken(styles.borderHover, config);
      variantStyles.push(
        `  --theme-button-${variant}-border-hover: ${resolved};`,
      );
    }
    if (styles.backgroundActive) {
      const resolved = resolveToken(styles.backgroundActive, config);
      variantStyles.push(`  --theme-button-${variant}-bg-active: ${resolved};`);
    }
    if (styles.textActive) {
      const resolved = resolveToken(styles.textActive, config);
      variantStyles.push(
        `  --theme-button-${variant}-text-active: ${resolved};`,
      );
    }
    if (styles.borderActive) {
      const resolved = resolveToken(styles.borderActive, config);
      variantStyles.push(
        `  --theme-button-${variant}-border-active: ${resolved};`,
      );
    }

    if (variantStyles.length > 0) {
      variants.push(variantStyles.join("\n"));
    }
  }

  return variants.join("\n");
}

/**
 * Generate extended radius system tokens
 */
function generateRadiiTokens(radii?: SpexopThemeConfig["radii"]): string {
  if (!radii) return "";

  const tokens: string[] = [];

  if (radii.none !== undefined) {
    tokens.push(`  --theme-radius-none: ${radii.none}px;`);
  }
  if (radii.sm !== undefined) {
    tokens.push(`  --theme-radius-sm: ${radii.sm}px;`);
  }
  if (radii.md !== undefined) {
    tokens.push(`  --theme-radius-md: ${radii.md}px;`);
  }
  if (radii.lg !== undefined) {
    tokens.push(`  --theme-radius-lg: ${radii.lg}px;`);
  }
  if (radii.xl !== undefined) {
    tokens.push(`  --theme-radius-xl: ${radii.xl}px;`);
  }
  if (radii["2xl"] !== undefined) {
    tokens.push(`  --theme-radius-2xl: ${radii["2xl"]}px;`);
  }
  if (radii.full !== undefined) {
    tokens.push(`  --theme-radius-full: ${radii.full}px;`);
  }

  return tokens.length > 0 ? tokens.join("\n") : "";
}

/**
 * Generate shadow system tokens
 */
function generateShadowTokens(shadows?: SpexopThemeConfig["shadows"]): string {
  if (!shadows) return "";

  const tokens: string[] = [];

  if (shadows.none !== undefined) {
    tokens.push(`  --theme-shadow-none: ${shadows.none};`);
  }
  if (shadows.sm !== undefined) {
    tokens.push(`  --theme-shadow-sm: ${shadows.sm};`);
  }
  if (shadows.md !== undefined) {
    tokens.push(`  --theme-shadow-md: ${shadows.md};`);
  }
  if (shadows.lg !== undefined) {
    tokens.push(`  --theme-shadow-lg: ${shadows.lg};`);
  }
  if (shadows.xl !== undefined) {
    tokens.push(`  --theme-shadow-xl: ${shadows.xl};`);
  }

  return tokens.length > 0 ? tokens.join("\n") : "";
}

/**
 * Generate z-index layering tokens
 */
function generateZIndexTokens(zIndex?: SpexopThemeConfig["zIndex"]): string {
  if (!zIndex) return "";

  const tokens: string[] = [];

  if (zIndex.base !== undefined) {
    tokens.push(`  --theme-z-base: ${zIndex.base};`);
  }
  if (zIndex.dropdown !== undefined) {
    tokens.push(`  --theme-z-dropdown: ${zIndex.dropdown};`);
  }
  if (zIndex.sticky !== undefined) {
    tokens.push(`  --theme-z-sticky: ${zIndex.sticky};`);
  }
  if (zIndex.fixed !== undefined) {
    tokens.push(`  --theme-z-fixed: ${zIndex.fixed};`);
  }
  if (zIndex.modal !== undefined) {
    tokens.push(`  --theme-z-modal: ${zIndex.modal};`);
  }
  if (zIndex.popover !== undefined) {
    tokens.push(`  --theme-z-popover: ${zIndex.popover};`);
  }
  if (zIndex.tooltip !== undefined) {
    tokens.push(`  --theme-z-tooltip: ${zIndex.tooltip};`);
  }
  if (zIndex.toast !== undefined) {
    tokens.push(`  --theme-z-toast: ${zIndex.toast};`);
  }

  return tokens.length > 0 ? tokens.join("\n") : "";
}

/**
 * Generate semantic color shade tokens
 */
function generateColorShadeTokens(colors: SpexopThemeConfig["colors"]): string {
  const tokens: string[] = [];

  // Primary shades
  if (colors.primaryDark) {
    tokens.push(`  --theme-primary-dark: ${colors.primaryDark};`);
  }

  // Secondary shades
  if (colors.secondaryLight) {
    tokens.push(`  --theme-secondary-light: ${colors.secondaryLight};`);
  }
  if (colors.secondaryDark) {
    tokens.push(`  --theme-secondary-dark: ${colors.secondaryDark};`);
  }

  // Success shades
  if (colors.successLight) {
    tokens.push(`  --theme-success-light: ${colors.successLight};`);
  }
  if (colors.successDark) {
    tokens.push(`  --theme-success-dark: ${colors.successDark};`);
  }

  // Warning shades
  if (colors.warningLight) {
    tokens.push(`  --theme-warning-light: ${colors.warningLight};`);
  }
  if (colors.warningDark) {
    tokens.push(`  --theme-warning-dark: ${colors.warningDark};`);
  }

  // Error shades
  if (colors.errorLight) {
    tokens.push(`  --theme-error-light: ${colors.errorLight};`);
  }
  if (colors.errorDark) {
    tokens.push(`  --theme-error-dark: ${colors.errorDark};`);
  }

  // Info shades
  if (colors.infoLight) {
    tokens.push(`  --theme-info-light: ${colors.infoLight};`);
  }
  if (colors.infoDark) {
    tokens.push(`  --theme-info-dark: ${colors.infoDark};`);
  }

  return tokens.length > 0 ? tokens.join("\n") : "";
}

/**
 * Generate card variant tokens
 */
function generateCardTokens(
  cards: SpexopThemeConfig["cards"],
  config: SpexopThemeConfig,
): string {
  if (!cards) return "";

  const tokens: string[] = [];

  for (const [variant, style] of Object.entries(cards)) {
    if (!style) continue;

    const variantKebab = camelToKebab(variant);

    if (style.background) {
      tokens.push(
        `  --theme-card-${variantKebab}-bg: ${resolveToken(style.background, config)};`,
      );
    }

    if (style.border) {
      tokens.push(
        `  --theme-card-${variantKebab}-border: ${resolveToken(style.border, config)};`,
      );
    }

    if (style.backgroundHover) {
      tokens.push(
        `  --theme-card-${variantKebab}-bg-hover: ${resolveToken(style.backgroundHover, config)};`,
      );
    }

    if (style.borderHover) {
      tokens.push(
        `  --theme-card-${variantKebab}-border-hover: ${resolveToken(style.borderHover, config)};`,
      );
    }

    if (style.borderStyle) {
      tokens.push(
        `  --theme-card-${variantKebab}-border-style: ${style.borderStyle};`,
      );
    }

    if (style.borderWidth) {
      tokens.push(
        `  --theme-card-${variantKebab}-border-width: ${resolveToken(style.borderWidth, config)};`,
      );
    }
  }

  return tokens.join("\n");
}

/**
 * Generate animation tokens (durations, easings, transitions)
 */
function generateAnimationTokens(
  animations?: SpexopThemeConfig["animations"],
): string {
  if (!animations) return "";

  const tokens: string[] = [];

  // Durations
  if (animations.durations) {
    if (animations.durations.fast !== undefined) {
      tokens.push(`  --theme-duration-fast: ${animations.durations.fast}ms;`);
    }
    if (animations.durations.normal !== undefined) {
      tokens.push(
        `  --theme-duration-normal: ${animations.durations.normal}ms;`,
      );
    }
    if (animations.durations.slow !== undefined) {
      tokens.push(`  --theme-duration-slow: ${animations.durations.slow}ms;`);
    }
    if (animations.durations.slower !== undefined) {
      tokens.push(
        `  --theme-duration-slower: ${animations.durations.slower}ms;`,
      );
    }
  }

  // Easings
  if (animations.easings) {
    for (const [key, value] of Object.entries(animations.easings)) {
      if (value) {
        tokens.push(`  --theme-easing-${camelToKebab(key)}: ${value};`);
      }
    }
  }

  // Transitions
  if (animations.transitions) {
    for (const [key, value] of Object.entries(animations.transitions)) {
      if (value) {
        tokens.push(`  --theme-transition-${camelToKebab(key)}: ${value};`);
      }
    }
  }

  return tokens.length > 0 ? tokens.join("\n") : "";
}

/**
 * Generate opacity tokens
 */
function generateOpacityTokens(opacity?: SpexopThemeConfig["opacity"]): string {
  if (!opacity) return "";

  const tokens: string[] = [];

  for (const [key, value] of Object.entries(opacity)) {
    if (value !== undefined) {
      tokens.push(`  --theme-opacity-${camelToKebab(key)}: ${value};`);
    }
  }

  return tokens.length > 0 ? tokens.join("\n") : "";
}

/**
 * Generate CSS variables from theme configuration
 *
 * @param config - Spexop theme configuration
 * @param scope - Optional CSS selector to scope the variables (default: ':root')
 * @returns CSS string with custom properties
 *
 * @example
 * ```typescript
 * import { generateCSS } from '@spexop/theme/generators';
 * import { myTheme } from './theme.config';
 *
 * const css = generateCSS(myTheme);
 * // Inject into page or save to file
 *
 * // Or scope to a specific container
 * const scopedCss = generateCSS(myTheme, '.theme-preview');
 * ```
 */
export function generateCSS(
  config: SpexopThemeConfig,
  scope = ":root",
): string {
  const {
    colors,
    spacing,
    typography,
    fluidTypography,
    borders,
    radii,
    shadows,
    zIndex,
    buttons,
    cards,
    breakpoints,
    darkMode,
    animations,
    opacity,
  } = config;

  return `
/**
 * ${config.meta.name} - Theme Variables
 * Generated by @spexop/theme
 * Version: ${config.meta.version}
 */

${scope} {
  /* === Colors === */
  /* Primary (with RGB for transparency support) */
${cssVarWithRgb("primary", colors.primary, config)}
${cssVar("primary-hover", colors.primaryHover || colors.primary, config)}
${cssVar("primary-active", colors.primaryActive || colors.primary, config)}
${cssVarOptional("primary-light", colors.primaryLight, config)}
  
  /* Secondary */
${cssVarOptional("secondary", colors.secondary, config)}
${cssVarOptional("secondary-hover", colors.secondaryHover, config)}
${cssVarOptional("secondary-active", colors.secondaryActive, config)}
  
  /* Surface (with RGB for transparency support) */
${cssVarWithRgb("surface", colors.surface, config)}
${cssVar("surface-secondary", colors.surfaceSecondary, config)}
${cssVar("surface-hover", colors.surfaceHover, config)}
  
  /* Text */
${cssVar("text", colors.text, config)}
${cssVar("text-secondary", colors.textSecondary, config)}
${cssVar("text-muted", colors.textMuted, config)}
${cssVarOptional("text-tertiary", colors.textTertiary, config)}
${cssVarOptional("text-inverted", colors.textInverted, config)}
  
  /* Border */
${cssVar("border", colors.border, config)}
${cssVar("border-strong", colors.borderStrong, config)}
${cssVar("border-subtle", colors.borderSubtle, config)}
  
  /* Semantic */
${cssVarOptional("success", colors.success, config)}
${cssVarOptional("warning", colors.warning, config)}
${cssVarOptional("error", colors.error, config)}
${cssVarOptional("danger", colors.error, config)} /* Alias for error */
${cssVarOptional("info", colors.info, config)}
  
  /* Semantic Color Shades */
${generateColorShadeTokens(colors)}
  
  /* Accent */
${cssVarOptional("accent", colors.accent, config)}
${cssVarOptional("accent-hover", colors.accentHover, config)}
${cssVarOptional("accent-active", colors.accentActive, config)}
${cssVarOptional("highlight", (colors as unknown as Record<string, unknown>).highlight as string | undefined, config)}
  
  /* Link */
${cssVarOptional("link", colors.link, config)}
${cssVarOptional("link-hover", colors.linkHover, config)}
${cssVarOptional("link-active", colors.linkActive, config)}
  
  /* Interactive States */
${cssVarOptional("focus", colors.focus, config)}
${cssVarOptional("hover", colors.hover, config)}
  
  /* Overlay/Backdrop */
${cssVarOptional("overlay", colors.overlay, config)}
${cssVarOptional("backdrop", colors.backdrop, config)}
  
  /* Neutral */
${cssVarOptional("neutral", colors.neutral, config)}
${cssVarOptional("neutral-hover", colors.neutralHover, config)}
${cssVarOptional("neutral-active", colors.neutralActive, config)}
  
  /* Custom Color Properties */
${Object.entries(colors)
  .filter(
    ([key]) =>
      ![
        "primary",
        "primaryHover",
        "primaryActive",
        "primaryLight",
        "secondary",
        "secondaryHover",
        "secondaryActive",
        "surface",
        "surfaceSecondary",
        "surfaceHover",
        "text",
        "textSecondary",
        "textMuted",
        "textTertiary",
        "textInverted",
        "border",
        "borderStrong",
        "borderSubtle",
        "success",
        "warning",
        "error",
        "info",
        "accent",
        "accentHover",
        "accentActive",
        "highlight",
        "link",
        "linkHover",
        "linkActive",
        "focus",
        "hover",
        "overlay",
        "backdrop",
        "neutral",
        "neutralHover",
        "neutralActive",
      ].includes(key) &&
      !key.includes("Light") &&
      !key.includes("Dark") &&
      !key.includes("Hover") &&
      !key.includes("Active"),
  )
  .map(([key, value]) => cssVarOptional(key, value, config))
  .join("\n")}

  /* === Spacing === */
${generateSpacingTokens(spacing)}

  /* === Typography === */
  /* Font Families */
  --theme-font-family: ${typography.fontFamily};
  --theme-font-family-heading: ${typography.fontFamilyHeading || typography.fontFamily};
  ${typography.fontFamilyMono ? `--theme-font-family-mono: ${typography.fontFamilyMono};` : ""}
  
  /* Font Sizes */
${generateTypographyScale(typography, fluidTypography)}
  
  /* Font Weights */
${generateFontWeights(typography.weights)}
  --theme-font-weight-normal: ${typography.weights.regular}; /* Alias for regular */
  
  /* Line Heights */
${generateLineHeights(typography.lineHeights)}

  /* === Borders === */
  /* Widths */
  ${borders.thin ? `--theme-border-thin: ${borders.thin}px;` : ""}
  --theme-border-width: ${borders.default}px;
  ${borders.thick ? `--theme-border-thick: ${borders.thick}px;` : ""}
  ${(borders as unknown as Record<string, unknown>).strong ? `--theme-border-strong: ${(borders as unknown as Record<string, unknown>).strong}px;` : ""}
  
  /* Radius */
${
  (borders as unknown as Record<string, unknown>).radius
    ? Object.entries(
        (borders as unknown as Record<string, unknown>).radius as Record<
          string,
          number
        >,
      )
        .map(([key, value]) => `  --theme-radius-${key}: ${value}px;`)
        .join("\n")
    : ""
}
  ${borders.radiusSubtle ? `--theme-radius-subtle: ${borders.radiusSubtle}px;` : ""}
  ${borders.radiusSubtle ? `--theme-radius-base: ${borders.radiusSubtle}px; /* Alias for subtle */` : ""}
  ${borders.radiusRelaxed ? `--theme-radius-relaxed: ${borders.radiusRelaxed}px;` : ""}
  ${borders.radiusRelaxed ? `--theme-radius-medium: ${borders.radiusRelaxed}px; /* Alias for relaxed */` : ""}
  ${borders.radiusPill ? `--theme-radius-pill: ${borders.radiusPill}px;` : ""}
  ${borders.radiusLiquid ? `--theme-radius-liquid: ${borders.radiusLiquid}px;` : ""}
  
  /* Style */
  ${borders.defaultStyle ? `--theme-border-style: ${borders.defaultStyle};` : ""}

  /* === Extended Radius === */
${generateRadiiTokens(radii)}

  /* === Shadows === */
${generateShadowTokens(shadows)}

  /* === Z-Index === */
${generateZIndexTokens(zIndex)}

  /* === Animations === */
${generateAnimationTokens(animations)}

  /* === Opacity === */
${generateOpacityTokens(opacity)}

  /* === Breakpoints === */
${generateBreakpoints(breakpoints)}

  /* === Buttons === */
${generateButtonStyles(buttons, config)}

  /* === Cards === */
${generateCardTokens(cards, config)}
}

${
  darkMode?.enabled
    ? `
/* === Dark Mode === */
${scope}[data-theme="dark"], ${scope}.dark {
${generateDarkModeTokens(darkMode.colors)}
${
  darkMode.buttons || darkMode.cards
    ? (
        () => {
          // Create merged config with dark mode colors for token resolution
          const darkConfig: SpexopThemeConfig = {
            ...config,
            colors: { ...config.colors, ...darkMode.colors },
          };
          return `${generateButtonStyles(darkMode.buttons, darkConfig)}\n${generateCardTokens(darkMode.cards, darkConfig)}`;
        }
      )()
    : ""
}
}

@media (prefers-color-scheme: dark) {
  ${scope}:not([data-theme="light"]) {
${generateDarkModeTokens(darkMode.colors)}
  }
}
`
    : ""
}
`.trim();
}
