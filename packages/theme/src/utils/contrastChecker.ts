/**
 * WCAG Contrast Checker
 * Calculate contrast ratios and validate WCAG 2.1 compliance
 */

import { type RGB, hexToRgb } from "./colorManipulation.js";

/**
 * WCAG contrast levels
 */
export enum ContrastLevel {
  AAA = "AAA", // 7:1 for normal text, 4.5:1 for large text
  AA = "AA", // 4.5:1 for normal text, 3:1 for large text
  AA_LARGE = "AA_LARGE", // 3:1 for large text only
  ENHANCED = "ENHANCED", // 10:1 or higher for enhanced accessibility
  FAIL = "FAIL", // Below minimum standards
}

/**
 * Contrast check result
 */
export interface ContrastResult {
  ratio: number;
  AA: boolean;
  AAA: boolean;
  AALarge: boolean;
  AAALarge: boolean;
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 formula
 */
function calculateLuminance(rgb: RGB): number {
  const { r, g, b } = rgb;

  // Normalize RGB values
  const normalize = (channel: number): number => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  const rLum = normalize(r);
  const gLum = normalize(g);
  const bLum = normalize(b);

  // Calculate luminance using WCAG formula
  return 0.2126 * rLum + 0.7152 * gLum + 0.0722 * bLum;
}

/**
 * Calculate contrast ratio between two colors
 * Returns ratio from 1:1 (no contrast) to 21:1 (maximum contrast)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const lum1 = calculateLuminance(rgb1);
  const lum2 = calculateLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG requirements
 */
export function checkContrast(
  foreground: string,
  background: string,
): ContrastResult {
  const ratio = calculateContrastRatio(foreground, background);

  // WCAG 2.1 Level AA requirements
  const minNormalAA = 4.5;
  const minLargeAA = 3.0;

  // WCAG 2.1 Level AAA requirements
  const minNormalAAA = 7.0;
  const minLargeAAA = 4.5;

  // Determine pass/fail for each level
  const AA = ratio >= minNormalAA;
  const AAA = ratio >= minNormalAAA;
  const AALarge = ratio >= minLargeAA;
  const AAALarge = ratio >= minLargeAAA;

  return {
    ratio: Math.round(ratio * 100) / 100, // Round to 2 decimals
    AA,
    AAA,
    AALarge,
    AAALarge,
  };
}

/**
 * Get a description of the contrast ratio
 */
export function getContrastDescription(ratio: number): string {
  if (ratio >= 15) {
    return "Excellent contrast - exceptional accessibility";
  }
  if (ratio >= 7) {
    return "Good contrast - WCAG AAA compliant";
  }
  if (ratio >= 4.5) {
    return "Acceptable contrast - WCAG AA compliant";
  }
  if (ratio >= 3) {
    return "Poor contrast - only suitable for large text";
  }
  return "Fails WCAG standards - insufficient contrast";
}

/**
 * Get color representation for contrast level
 */
export function getContrastLevelColor(level: ContrastLevel): string {
  switch (level) {
    case ContrastLevel.AAA:
      return "#10b981"; // Green
    case ContrastLevel.AA:
      return "#3b82f6"; // Blue
    case ContrastLevel.AA_LARGE:
      return "#f59e0b"; // Amber
    case ContrastLevel.ENHANCED:
      return "#059669"; // Emerald
    case ContrastLevel.FAIL:
      return "#ef4444"; // Red
    default:
      return "#6b7280"; // Gray
  }
}

/**
 * Suggest a color adjustment to meet minimum contrast
 */
export function suggestContrastFix(
  foreground: string,
  background: string,
  targetRatio = 4.5,
): string | null {
  const currentRatio = calculateContrastRatio(foreground, background);

  if (currentRatio >= targetRatio) {
    return null;
  }

  // Calculate luminance
  const bgRgb = hexToRgb(background);
  const bgLum = calculateLuminance(bgRgb);

  // For dark backgrounds, suggest white text
  if (bgLum < 0.5) {
    return "Lighten the foreground color or use white for better contrast";
  }

  // For light backgrounds, suggest black text
  return "Darken the foreground color or use black for better contrast";
}

/**
 * Check multiple color combinations
 */
export interface ColorCombination {
  foreground: string;
  background: string;
}

export function checkMultipleContrasts(
  combinations: ColorCombination[],
): Array<{ combination: ColorCombination; result: ContrastResult }> {
  return combinations.map((combo) => ({
    combination: combo,
    result: checkContrast(combo.foreground, combo.background),
  }));
}

/**
 * Generate a contrast matrix for a color palette
 */
export function generateContrastMatrix(
  colors: string[],
): Record<string, Record<string, ContrastResult>> {
  // Use Object.create(null) to prevent prototype pollution attacks
  // This creates objects without Object.prototype, so __proto__ cannot be used
  const matrix = Object.create(null) as Record<
    string,
    Record<string, ContrastResult>
  >;

  for (const fgColor of colors) {
    // Create prototype-less inner objects as well
    matrix[fgColor] = Object.create(null) as Record<string, ContrastResult>;
    for (const bgColor of colors) {
      matrix[fgColor][bgColor] = checkContrast(fgColor, bgColor);
    }
  }

  return matrix;
}

/**
 * Find the best text color for a background
 */
export function getAccessibleTextColor(
  backgroundColor: string,
  darkText = "#000000",
  lightText = "#ffffff",
  minRatio = 4.5,
): string {
  const darkContrast = calculateContrastRatio(darkText, backgroundColor);
  const lightContrast = calculateContrastRatio(lightText, backgroundColor);

  // Return the one that meets minimum ratio, preferring higher contrast
  if (darkContrast >= minRatio) return darkText;
  if (lightContrast >= minRatio) return lightText;

  // If neither meets minimum, return the one with better contrast
  return lightContrast > darkContrast ? lightText : darkText;
}

/**
 * Check if a color meets minimum contrast requirements
 */
export function meetsMinimumContrast(
  foreground: string,
  background: string,
  level: ContrastLevel,
  isLargeText = false,
): boolean {
  const ratio = calculateContrastRatio(foreground, background);

  switch (level) {
    case ContrastLevel.AAA:
      return ratio >= (isLargeText ? 4.5 : 7.0);
    case ContrastLevel.AA:
      return ratio >= (isLargeText ? 3.0 : 4.5);
    case ContrastLevel.ENHANCED:
      return ratio >= 10.0;
    default:
      return false;
  }
}
