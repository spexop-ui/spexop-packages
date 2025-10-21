/**
 * JSON Theme Generator
 * Generates simple JSON key-value format
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

/**
 * Generate JSON theme
 *
 * @param config - Spexop theme configuration
 * @returns JSON theme string
 */
export function generateJSON(config: SpexopThemeConfig): string {
  const { colors, spacing, typography, borders, breakpoints } = config;

  const spacingValues = spacing.values || {
    0: 0,
    1: spacing.scale?.[1] || spacing.baseUnit,
    2: spacing.scale?.[2] || spacing.baseUnit * 2,
    3: spacing.scale?.[3] || spacing.baseUnit * 3,
    4: spacing.scale?.[4] || spacing.baseUnit * 4,
    5: spacing.scale?.[5] || spacing.baseUnit * 5,
    6: spacing.scale?.[6] || spacing.baseUnit * 6,
    7: spacing.scale?.[7] || spacing.baseUnit * 7,
    8: spacing.scale?.[8] || spacing.baseUnit * 8,
    9: spacing.scale?.[9] || spacing.baseUnit * 9,
    10: spacing.scale?.[10] || spacing.baseUnit * 10,
  };

  const theme = {
    meta: config.meta,
    colors: {
      primary: colors.primary,
      primaryHover: colors.primaryHover || colors.primary,
      primaryActive: colors.primaryActive || colors.primary,
      ...(colors.secondary && { secondary: colors.secondary }),
      ...(colors.secondaryHover && { secondaryHover: colors.secondaryHover }),
      ...(colors.secondaryActive && {
        secondaryActive: colors.secondaryActive,
      }),
      surface: colors.surface,
      surfaceSecondary: colors.surfaceSecondary,
      surfaceHover: colors.surfaceHover,
      text: colors.text,
      textSecondary: colors.textSecondary,
      textMuted: colors.textMuted,
      border: colors.border,
      borderStrong: colors.borderStrong,
      borderSubtle: colors.borderSubtle,
      ...(colors.success && { success: colors.success }),
      ...(colors.warning && { warning: colors.warning }),
      ...(colors.error && { error: colors.error }),
      ...(colors.info && { info: colors.info }),
    },
    spacing: {
      baseUnit: spacing.baseUnit,
      values: spacingValues,
    },
    typography: {
      fontFamily: typography.fontFamily,
      fontFamilyHeading: typography.fontFamilyHeading || typography.fontFamily,
      ...(typography.fontFamilyMono && {
        fontFamilyMono: typography.fontFamilyMono,
      }),
      baseSize: typography.baseSize,
      scale: typography.scale,
      fontSize: {
        xs: Math.round(typography.baseSize / typography.scale ** 2),
        sm: Math.round(typography.baseSize / typography.scale),
        base: typography.baseSize,
        lg: Math.round(typography.baseSize * typography.scale),
        xl: Math.round(typography.baseSize * typography.scale ** 2),
        "2xl": Math.round(typography.baseSize * typography.scale ** 3),
      },
      fontWeight: typography.weights,
      lineHeight: typography.lineHeights,
    },
    borders: {
      width: {
        thin: borders.thin,
        default: borders.default,
        thick: borders.thick,
      },
      radius: {
        subtle: borders.radiusSubtle,
        relaxed: borders.radiusRelaxed,
        pill: borders.radiusPill,
      },
      style: borders.defaultStyle,
    },
    breakpoints: breakpoints || {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  };

  return JSON.stringify(theme, null, 2);
}
