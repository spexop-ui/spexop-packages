/**
 * Token Documentation Generator
 * Generate interactive HTML documentation from theme tokens
 *
 * @module @spexop/cli/commands/tokens/generator
 */

import type { SpexopThemeConfig } from "@spexop/theme";
import { resolveToken } from "@spexop/theme";
import { extractTokens } from "./extractor.js";
import { generateHTMLTemplate } from "./template.js";

export interface GeneratorOptions {
  themeName: string;
  includeContrast: boolean;
}

export interface ContrastPair {
  foreground: string;
  background: string;
  ratio: number;
  aa: boolean;
  aaa: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
}

/**
 * Calculate relative luminance for contrast calculations
 */
function getLuminance(hex: string): number {
  // Remove # if present
  const cleanHex = hex.replace("#", "");

  // Convert to RGB
  const r = Number.parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = Number.parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = Number.parseInt(cleanHex.substring(4, 6), 16) / 255;

  // Apply gamma correction
  const gammaCorrect = (c: number) => {
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };

  const rLinear = gammaCorrect(r);
  const gLinear = gammaCorrect(g);
  const bLinear = gammaCorrect(b);

  // Calculate luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors
 */
function calculateContrast(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color is valid hex
 */
function isValidHex(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

/**
 * Generate contrast matrix for all color pairs
 */
function generateContrastMatrix(colors: string[]): ContrastPair[] {
  const pairs: ContrastPair[] = [];

  // Only check valid hex colors
  const validColors = colors.filter(isValidHex);

  for (let i = 0; i < validColors.length; i++) {
    for (let j = i + 1; j < validColors.length; j++) {
      const fg = validColors[i];
      const bg = validColors[j];
      const ratio = calculateContrast(fg, bg);

      pairs.push({
        foreground: fg,
        background: bg,
        ratio: Number(ratio.toFixed(2)),
        aa: ratio >= 4.5,
        aaa: ratio >= 7,
        aaLarge: ratio >= 3,
        aaaLarge: ratio >= 4.5,
      });
    }
  }

  return pairs;
}

/**
 * Convert hex to RGB string
 */
function hexToRgb(hex: string): string {
  const cleanHex = hex.replace("#", "");
  const r = Number.parseInt(cleanHex.substring(0, 2), 16);
  const g = Number.parseInt(cleanHex.substring(2, 4), 16);
  const b = Number.parseInt(cleanHex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Convert hex to HSL string
 */
function hexToHsl(hex: string): string {
  const cleanHex = hex.replace("#", "");

  const r = Number.parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = Number.parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = Number.parseInt(cleanHex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${lPercent}%)`;
}

/**
 * Generate token documentation HTML
 */
export function generateTokenDocumentation(
  theme: SpexopThemeConfig,
  options: GeneratorOptions,
): string {
  // Extract all tokens
  const tokens = extractTokens(theme);

  // Generate contrast matrix if enabled
  let contrastMatrix: ContrastPair[] = [];
  if (options.includeContrast) {
    const colorValues = tokens.colors.map((c) => c.value);
    contrastMatrix = generateContrastMatrix(colorValues);
  }

  // Enrich color tokens with RGB and HSL
  const enrichedColors = tokens.colors.map((color) => {
    if (isValidHex(color.value)) {
      return {
        ...color,
        rgb: hexToRgb(color.value),
        hsl: hexToHsl(color.value),
      };
    }
    return color;
  });

  // Resolve component token references to actual values
  const resolveComponentTokens = (
    componentTokens: Array<{
      variant: string;
      state: string;
      property: string;
      value: string;
    }>,
  ) => {
    return componentTokens.map((token) => ({
      ...token,
      resolvedValue: String(resolveToken(token.value, theme)),
      isColorProperty:
        token.property === "background" ||
        token.property === "text" ||
        token.property === "border",
    }));
  };

  // Generate HTML
  return generateHTMLTemplate({
    themeName: options.themeName,
    themeVersion: theme.meta?.version || "1.0.0",
    themeDescription: theme.meta?.description || "",
    colors: enrichedColors,
    spacing: tokens.spacing,
    typography: tokens.typography,
    borders: tokens.borders,
    shadows: tokens.shadows,
    buttons: resolveComponentTokens(tokens.buttons),
    forms: resolveComponentTokens(tokens.forms),
    cards: resolveComponentTokens(tokens.cards),
    navigation: resolveComponentTokens(tokens.navigation),
    modals: resolveComponentTokens(tokens.modals),
    contrastMatrix,
    includeContrast: options.includeContrast,
  });
}
