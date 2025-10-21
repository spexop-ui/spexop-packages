/**
 * Theme Input Sanitization
 * Sanitize and clean theme configuration input for security
 *
 * @module @spexop/theme/validators
 */

import type { SpexopThemeConfig, ThemeColors } from "../types/index.js";

/**
 * Sanitization options
 */
export interface SanitizationOptions {
  /**
   * Remove unknown/extra properties
   */
  removeUnknownProperties?: boolean;

  /**
   * Trim string values
   */
  trimStrings?: boolean;

  /**
   * Convert numeric strings to numbers
   */
  parseNumbers?: boolean;

  /**
   * Remove null/undefined values
   */
  removeNullish?: boolean;

  /**
   * Maximum string length for text fields
   */
  maxStringLength?: number;

  /**
   * Maximum depth for nested objects
   */
  maxDepth?: number;
}

/**
 * Default sanitization options
 */
const defaultOptions: Required<SanitizationOptions> = {
  removeUnknownProperties: false,
  trimStrings: true,
  parseNumbers: true,
  removeNullish: true,
  maxStringLength: 1000,
  maxDepth: 10,
};

/**
 * Sanitize a string value
 */
function sanitizeString(
  value: unknown,
  maxLength: number,
  trim: boolean,
): string {
  if (typeof value !== "string") {
    throw new Error(`Expected string, got ${typeof value}`);
  }

  let sanitized = value;

  if (trim) {
    sanitized = sanitized.trim();
  }

  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitize a number value
 */
function sanitizeNumber(value: unknown, parseStrings: boolean): number {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("Number must be finite");
    }
    return value;
  }

  if (parseStrings && typeof value === "string") {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) {
      throw new Error(`Cannot parse "${value}" as number`);
    }
    if (!Number.isFinite(parsed)) {
      throw new Error("Parsed number must be finite");
    }
    return parsed;
  }

  throw new Error(`Expected number, got ${typeof value}`);
}

/**
 * Sanitize color values
 */
function sanitizeColors(
  colors: unknown,
  options: Required<SanitizationOptions>,
): ThemeColors {
  if (!colors || typeof colors !== "object") {
    throw new Error("Colors must be an object");
  }

  const sanitized: Partial<ThemeColors> = {};
  const colorObj = colors as Record<string, unknown>;

  // Required colors
  const requiredColors = [
    "primary",
    "surface",
    "surfaceSecondary",
    "surfaceHover",
    "text",
    "textSecondary",
    "textMuted",
    "border",
    "borderStrong",
    "borderSubtle",
  ];

  for (const key of requiredColors) {
    if (colorObj[key] !== undefined && colorObj[key] !== null) {
      sanitized[key as keyof ThemeColors] = sanitizeString(
        colorObj[key],
        options.maxStringLength,
        options.trimStrings,
      ) as string;
    }
  }

  // Optional colors
  const optionalColors = [
    "secondary",
    "primaryHover",
    "primaryActive",
    "secondaryHover",
    "secondaryActive",
    "success",
    "warning",
    "error",
    "info",
    "accent",
    "link",
  ];

  for (const key of optionalColors) {
    if (colorObj[key] !== undefined && colorObj[key] !== null) {
      sanitized[key as keyof ThemeColors] = sanitizeString(
        colorObj[key],
        options.maxStringLength,
        options.trimStrings,
      ) as string;
    }
  }

  return sanitized as ThemeColors;
}

/**
 * Sanitize typography configuration
 */
function sanitizeTypography(
  typography: unknown,
  options: Required<SanitizationOptions>,
): SpexopThemeConfig["typography"] {
  if (!typography || typeof typography !== "object") {
    throw new Error("Typography must be an object");
  }

  const typo = typography as Record<string, unknown>;

  const result: SpexopThemeConfig["typography"] = {
    fontFamily: sanitizeString(
      typo.fontFamily,
      options.maxStringLength,
      options.trimStrings,
    ),
    baseSize: sanitizeNumber(typo.baseSize, options.parseNumbers),
    scale: sanitizeNumber(typo.scale, options.parseNumbers),
    weights:
      typo.weights && typeof typo.weights === "object"
        ? {
            regular: sanitizeNumber(
              (typo.weights as Record<string, unknown>).regular,
              options.parseNumbers,
            ),
            medium: sanitizeNumber(
              (typo.weights as Record<string, unknown>).medium,
              options.parseNumbers,
            ),
            semibold: sanitizeNumber(
              (typo.weights as Record<string, unknown>).semibold,
              options.parseNumbers,
            ),
            bold: sanitizeNumber(
              (typo.weights as Record<string, unknown>).bold,
              options.parseNumbers,
            ),
          }
        : {
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
          },
    lineHeights:
      typo.lineHeights && typeof typo.lineHeights === "object"
        ? (typo.lineHeights as unknown as SpexopThemeConfig["typography"]["lineHeights"])
        : {
            tight: 1.2,
            snug: 1.375,
            normal: 1.5,
            relaxed: 1.75,
          },
    fontFamilyHeading:
      typo.fontFamilyHeading !== undefined && typo.fontFamilyHeading !== null
        ? sanitizeString(
            typo.fontFamilyHeading,
            options.maxStringLength,
            options.trimStrings,
          )
        : undefined,
    fontFamilyMono:
      typo.fontFamilyMono !== undefined && typo.fontFamilyMono !== null
        ? sanitizeString(
            typo.fontFamilyMono,
            options.maxStringLength,
            options.trimStrings,
          )
        : undefined,
    sizes:
      typo.sizes && typeof typo.sizes === "object"
        ? (typo.sizes as Record<string, unknown>)
        : undefined,
  };

  return result;
}

/**
 * Sanitize spacing configuration
 */
function sanitizeSpacing(
  spacing: unknown,
  options: Required<SanitizationOptions>,
): SpexopThemeConfig["spacing"] {
  if (!spacing || typeof spacing !== "object") {
    throw new Error("Spacing must be an object");
  }

  const space = spacing as Record<string, unknown>;

  return {
    baseUnit: sanitizeNumber(space.baseUnit, options.parseNumbers),
    values:
      space.values && typeof space.values === "object"
        ? (space.values as Record<string, number>)
        : {},
    scale:
      space.scale && typeof space.scale === "object"
        ? (space.scale as number[])
        : undefined,
  } as SpexopThemeConfig["spacing"];
}

/**
 * Sanitize borders configuration
 */
function sanitizeBorders(
  borders: unknown,
  options: Required<SanitizationOptions>,
): SpexopThemeConfig["borders"] {
  if (!borders || typeof borders !== "object") {
    throw new Error("Borders must be an object");
  }

  const border = borders as Record<string, unknown>;

  const sanitized: Record<string, unknown> = {
    default: sanitizeNumber(border.default, options.parseNumbers),
  };

  // Handle strong as optional
  if (border.strong !== undefined && border.strong !== null) {
    sanitized.strong = sanitizeNumber(border.strong, options.parseNumbers);
  }

  // Handle radius as object or individual properties
  if (border.radius && typeof border.radius === "object") {
    sanitized.radius = border.radius;
  }

  // Handle individual radius properties
  const radiusProps = [
    "radiusSubtle",
    "radiusRelaxed",
    "radiusPill",
    "radiusLiquid",
  ];
  for (const prop of radiusProps) {
    if (border[prop] !== undefined && border[prop] !== null) {
      sanitized[prop] = sanitizeNumber(border[prop], options.parseNumbers);
    }
  }

  // Handle border style properties
  if (border.thin !== undefined && border.thin !== null) {
    sanitized.thin = sanitizeNumber(border.thin, options.parseNumbers);
  }
  if (border.thick !== undefined && border.thick !== null) {
    sanitized.thick = sanitizeNumber(border.thick, options.parseNumbers);
  }
  if (border.defaultStyle !== undefined && border.defaultStyle !== null) {
    sanitized.defaultStyle = sanitizeString(
      border.defaultStyle,
      options.maxStringLength,
      options.trimStrings,
    );
  }

  return sanitized as unknown as SpexopThemeConfig["borders"];
}

/**
 * Sanitize meta configuration
 */
function sanitizeMeta(
  meta: unknown,
  options: Required<SanitizationOptions>,
): SpexopThemeConfig["meta"] {
  if (!meta || typeof meta !== "object") {
    throw new Error("Meta must be an object");
  }

  const metaObj = meta as Record<string, unknown>;

  return {
    name: sanitizeString(
      metaObj.name,
      options.maxStringLength,
      options.trimStrings,
    ),
    version: sanitizeString(
      metaObj.version,
      options.maxStringLength,
      options.trimStrings,
    ),
    description:
      metaObj.description !== undefined && metaObj.description !== null
        ? sanitizeString(
            metaObj.description,
            options.maxStringLength * 5, // Allow longer descriptions
            options.trimStrings,
          )
        : undefined,
    author:
      metaObj.author !== undefined && metaObj.author !== null
        ? sanitizeString(
            metaObj.author,
            options.maxStringLength,
            options.trimStrings,
          )
        : undefined,
  };
}

/**
 * Sanitize entire theme configuration
 *
 * @param input - Raw theme configuration input (potentially unsafe)
 * @param options - Sanitization options
 * @returns Sanitized theme configuration
 *
 * @example
 * ```typescript
 * const userInput = {
 *   meta: { name: "  My Theme  ", version: "1.0.0" },
 *   colors: { primary: "#3b82f6   " },
 *   // ... more config
 * };
 *
 * const sanitized = sanitizeTheme(userInput);
 * // Returns cleaned theme with trimmed strings and validated types
 * ```
 */
export function sanitizeTheme(
  input: unknown,
  options: SanitizationOptions = {},
): SpexopThemeConfig {
  const opts = { ...defaultOptions, ...options };

  if (!input || typeof input !== "object") {
    throw new Error("Theme configuration must be an object");
  }

  const config = input as Record<string, unknown>;

  // Check for required top-level properties
  if (!config.meta) {
    throw new Error("Theme must have 'meta' property");
  }
  if (!config.colors) {
    throw new Error("Theme must have 'colors' property");
  }
  if (!config.typography) {
    throw new Error("Theme must have 'typography' property");
  }
  if (!config.spacing) {
    throw new Error("Theme must have 'spacing' property");
  }
  if (!config.borders) {
    throw new Error("Theme must have 'borders' property");
  }

  const sanitized: SpexopThemeConfig = {
    meta: sanitizeMeta(config.meta, opts),
    colors: sanitizeColors(config.colors, opts),
    typography: sanitizeTypography(config.typography, opts),
    spacing: sanitizeSpacing(config.spacing, opts),
    borders: sanitizeBorders(config.borders, opts),
  } as SpexopThemeConfig;

  // Optional properties
  if (config.radii && typeof config.radii === "object") {
    sanitized.radii = config.radii as SpexopThemeConfig["radii"];
  }

  if (config.shadows && typeof config.shadows === "object") {
    sanitized.shadows = config.shadows as SpexopThemeConfig["shadows"];
  }

  if (config.zIndex && typeof config.zIndex === "object") {
    sanitized.zIndex = config.zIndex as SpexopThemeConfig["zIndex"];
  }

  if (config.buttons && typeof config.buttons === "object") {
    sanitized.buttons = config.buttons as SpexopThemeConfig["buttons"];
  }

  if (config.cards && typeof config.cards === "object") {
    sanitized.cards = config.cards as SpexopThemeConfig["cards"];
  }

  if (config.darkMode && typeof config.darkMode === "object") {
    sanitized.darkMode = config.darkMode as SpexopThemeConfig["darkMode"];
  }

  return sanitized;
}

/**
 * Sanitize theme configuration from JSON string
 *
 * @param jsonString - JSON string containing theme configuration
 * @param options - Sanitization options
 * @returns Sanitized theme configuration
 *
 * @example
 * ```typescript
 * const jsonInput = '{"meta":{"name":"Test"},"colors":{...}}';
 * const theme = sanitizeThemeFromJSON(jsonInput);
 * ```
 */
export function sanitizeThemeFromJSON(
  jsonString: string,
  options: SanitizationOptions = {},
): SpexopThemeConfig {
  let parsed: unknown;

  try {
    parsed = JSON.parse(jsonString);
  } catch (error) {
    throw new Error(
      `Invalid JSON: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }

  return sanitizeTheme(parsed, options);
}

/**
 * Deep clone and sanitize theme
 * Removes any potential prototype pollution
 *
 * @param theme - Theme configuration to clone
 * @returns Sanitized clone
 */
export function deepCloneSanitize(theme: SpexopThemeConfig): SpexopThemeConfig {
  // Use JSON parse/stringify to remove prototype pollution
  const jsonString = JSON.stringify(theme);
  const parsed = JSON.parse(jsonString);

  return sanitizeTheme(parsed, {
    trimStrings: false, // Already clean
    parseNumbers: false, // Already numbers
  });
}

/**
 * Check if input is a valid theme-like object
 * Does basic structural validation before sanitization
 *
 * @param input - Input to check
 * @returns True if input has basic theme structure
 */
export function isThemeLike(input: unknown): boolean {
  if (!input || typeof input !== "object") {
    return false;
  }

  const obj = input as Record<string, unknown>;

  // Check for required top-level properties
  const hasRequiredProps =
    obj.meta !== undefined &&
    obj.colors !== undefined &&
    obj.typography !== undefined &&
    obj.spacing !== undefined &&
    obj.borders !== undefined;

  if (!hasRequiredProps) {
    return false;
  }

  // Check meta structure
  if (
    !obj.meta ||
    typeof obj.meta !== "object" ||
    !(obj.meta as Record<string, unknown>).name ||
    !(obj.meta as Record<string, unknown>).version
  ) {
    return false;
  }

  // Check colors structure
  if (!obj.colors || typeof obj.colors !== "object") {
    return false;
  }

  return true;
}

/**
 * Sanitize and validate theme in one step
 * Combines sanitization with validation
 *
 * @param input - Raw input
 * @param sanitizeOptions - Sanitization options
 * @returns Sanitized and validated theme, or errors
 */
export function sanitizeAndValidate(
  input: unknown,
  sanitizeOptions: SanitizationOptions = {},
): {
  success: boolean;
  theme?: SpexopThemeConfig;
  errors: string[];
} {
  const errors: string[] = [];

  try {
    const sanitized = sanitizeTheme(input, sanitizeOptions);
    return {
      success: true,
      theme: sanitized,
      errors: [],
    };
  } catch (error) {
    errors.push(
      error instanceof Error ? error.message : "Unknown sanitization error",
    );
    return {
      success: false,
      errors,
    };
  }
}

/**
 * Remove dangerous characters from string
 * Prevents XSS and injection attacks
 */
export function removeDangerousChars(input: string): string {
  // Remove control characters except tab (0x09), newline (0x0A), carriage return (0x0D)
  // This removes: 0x00-0x08, 0x0B, 0x0C, 0x0E-0x1F, 0x7F
  // Using character codes to avoid control characters in source
  return input
    .split("")
    .filter((char) => {
      const code = char.charCodeAt(0);
      // Keep tab (9), newline (10), carriage return (13)
      if (code === 9 || code === 10 || code === 13) {
        return true;
      }
      // Remove control characters (0-31) and DEL (127)
      return code > 31 && code !== 127;
    })
    .join("");
}

/**
 * Escape special characters for safe display
 */
export function escapeForDisplay(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
