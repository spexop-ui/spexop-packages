/**
 * CSS Variables Importer
 * Import themes from CSS custom properties
 */

import type { SpexopThemeConfig } from "../types/index.js";

/**
 * Import theme from CSS variables
 */
export function importFromCSS(cssString: string): Partial<SpexopThemeConfig> {
  const variables = parseCSSVariables(cssString);

  const theme: Partial<SpexopThemeConfig> = {
    meta: {
      name: "Imported from CSS",
      version: "1.0.0",
      description: "Theme imported from CSS custom properties",
      author: "Imported",
    },
  };

  // Extract colors
  const colors = extractCSSColors(variables);
  if (colors) {
    theme.colors = colors;
  }

  // Extract spacing
  const spacing = extractCSSSpacing(variables);
  if (spacing) {
    theme.spacing = spacing;
  }

  // Extract typography
  const typography = extractCSSTypography(variables);
  if (typography) {
    theme.typography = typography;
  }

  // Extract borders
  const borders = extractCSSBorders(variables);
  if (borders) {
    theme.borders = borders;
  }

  return theme;
}

/**
 * Parse CSS variables from a string
 */
export function parseCSSVariables(cssString: string): Map<string, string> {
  const variables = new Map<string, string>();

  // Limit input length to prevent ReDoS attacks
  if (cssString.length > 100000) {
    return variables;
  }

  // Match CSS custom properties: --name: value;
  // Use more specific pattern to avoid ReDoS:
  // - Variable name: must start with letter/underscore, then word chars, then optional hyphen-word sequences
  //   Pattern [a-zA-Z_]\w*(?:-\w+)* avoids ambiguity: word chars first, then explicit hyphen-word pairs
  //   This prevents backtracking on patterns like '---name' or '---'
  // - Value: non-greedy match to first semicolon (prevents excessive backtracking)
  const regex = /--([a-zA-Z_]\w*(?:-\w+)*):\s*([^;]+?);/g;
  let match: RegExpExecArray | null;

  // biome-ignore lint/suspicious/noAssignInExpressions: regex exec pattern requires assignment in expression
  while ((match = regex.exec(cssString)) !== null) {
    const name = match[1];
    const value = match[2].trim();
    variables.set(name, value);
  }

  return variables;
}

/**
 * Extract colors from CSS variables
 */
function extractCSSColors(
  variables: Map<string, string>,
): SpexopThemeConfig["colors"] | undefined {
  const getColor = (keys: string[]): string | undefined => {
    for (const key of keys) {
      const value = variables.get(key);
      if (value && isColor(value)) {
        return normalizeColor(value);
      }
    }
    return undefined;
  };

  // Try common CSS variable naming patterns
  const primary =
    getColor(["primary", "color-primary", "primary-color", "brand"]) ||
    "#3b82f6";
  const secondary =
    getColor(["secondary", "color-secondary", "secondary-color"]) || "#8b5cf6";

  return {
    primary,
    primaryHover: getColor(["primary-hover", "primary-dark"]) || primary,
    primaryActive: getColor(["primary-active", "primary-darker"]) || primary,
    secondary,
    secondaryHover:
      getColor(["secondary-hover", "secondary-dark"]) || secondary,
    secondaryActive:
      getColor(["secondary-active", "secondary-darker"]) || secondary,
    surface: getColor(["surface", "background", "bg"]) || "#ffffff",
    surfaceSecondary:
      getColor(["surface-secondary", "background-secondary"]) || "#f5f5f5",
    surfaceHover: getColor(["surface-hover", "background-hover"]) || "#e5e5e5",
    text: getColor(["text", "text-primary", "color-text"]) || "#000000",
    textSecondary: getColor(["text-secondary", "text-muted"]) || "#525252",
    textMuted: getColor(["text-muted", "text-subtle"]) || "#737373",
    border: getColor(["border", "border-color"]) || "#e5e5e5",
    borderStrong: getColor(["border-strong", "border-dark"]) || "#d4d4d4",
    borderSubtle: getColor(["border-subtle", "border-light"]) || "#f5f5f5",
    success: getColor(["success", "color-success", "green"]) || "#10b981",
    warning: getColor(["warning", "color-warning", "yellow"]) || "#f59e0b",
    error: getColor(["error", "color-error", "danger", "red"]) || "#ef4444",
    info: getColor(["info", "color-info", "blue"]) || "#3b82f6",
  };
}

/**
 * Extract spacing from CSS variables
 */
function extractCSSSpacing(
  variables: Map<string, string>,
): SpexopThemeConfig["spacing"] | undefined {
  const scale: number[] = [];

  // Look for spacing variables
  for (const [key, value] of variables.entries()) {
    if (
      key.startsWith("spacing-") ||
      key.startsWith("space-") ||
      key.match(/^s-\d+$/)
    ) {
      const px = parsePxValue(value);
      if (px !== null) {
        scale.push(px);
      }
    }
  }

  if (scale.length === 0) return undefined;

  return {
    baseUnit: 4,
    scale: scale.sort((a, b) => a - b),
  };
}

/**
 * Extract typography from CSS variables
 */
function extractCSSTypography(
  variables: Map<string, string>,
): SpexopThemeConfig["typography"] | undefined {
  const getFontFamily = (keys: string[]): string | undefined => {
    for (const key of keys) {
      const value = variables.get(key);
      if (value) return value.replace(/['"]/g, "");
    }
    return undefined;
  };

  const fontFamily = getFontFamily([
    "font-family",
    "font-family-base",
    "font-sans",
  ]);

  if (!fontFamily) return undefined;

  return {
    fontFamily,
    fontFamilyHeading:
      getFontFamily(["font-family-heading", "font-heading"]) || fontFamily,
    fontFamilyMono:
      getFontFamily(["font-family-mono", "font-mono"]) || "monospace",
    baseSize: 16,
    scale: 1.25,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.75,
    },
  };
}

/**
 * Extract borders from CSS variables
 */
function extractCSSBorders(
  variables: Map<string, string>,
): SpexopThemeConfig["borders"] | undefined {
  const getRadius = (keys: string[]): number => {
    for (const key of keys) {
      const value = variables.get(key);
      if (value) {
        const px = parsePxValue(value);
        if (px !== null) return px;
      }
    }
    return 0;
  };

  const radiusSubtle = getRadius(["radius-subtle", "border-radius", "radius"]);

  if (radiusSubtle === 0) return undefined;

  return {
    thin: 1,
    default: 2,
    thick: 4,
    radiusSubtle,
    radiusRelaxed:
      getRadius(["radius-relaxed", "radius-lg"]) || radiusSubtle * 1.5,
    radiusPill: 9999,
    defaultStyle: "solid",
  };
}

/**
 * Check if a value is a color
 */
function isColor(value: string): boolean {
  return (
    value.startsWith("#") ||
    value.startsWith("rgb") ||
    value.startsWith("hsl") ||
    /^[a-z]+$/i.test(value)
  );
}

/**
 * Normalize color to hex format
 */
function normalizeColor(value: string): string {
  // If already hex, return as is
  if (value.startsWith("#")) return value;

  // For RGB, HSL, or named colors, we'd need a color library
  // For now, just return as is
  return value;
}

/**
 * Parse px value from CSS
 */
function parsePxValue(value: string): number | null {
  const match = value.match(/^(\d+(?:\.\d+)?)px$/);
  if (match) {
    return Number.parseFloat(match[1]);
  }

  // Also try rem (assuming 16px base)
  const remMatch = value.match(/^(\d+(?:\.\d+)?)rem$/);
  if (remMatch) {
    return Number.parseFloat(remMatch[1]) * 16;
  }

  return null;
}
