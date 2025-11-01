/**
 * JSON Schema Validation
 * Validate theme configuration against JSON Schema
 *
 * @module @spexop/theme/validators
 */

import type { SpexopThemeConfig } from "../types/index.js";

/**
 * Schema validation error
 */
export interface SchemaValidationError {
  path: string;
  message: string;
  expected?: string;
  received?: string;
}

/**
 * Schema validation result
 */
export interface SchemaValidationResult {
  valid: boolean;
  errors: SchemaValidationError[];
}

/**
 * Validate theme against schema structure
 * This is a lightweight structural validator that doesn't require external dependencies
 *
 * @param theme - Theme configuration to validate
 * @returns Validation result with structural errors
 *
 * @example
 * ```typescript
 * const theme = { ... };
 * const result = validateThemeSchema(theme);
 *
 * if (!result.valid) {
 *   console.error("Schema errors:", result.errors);
 * }
 * ```
 */
export function validateThemeSchema(theme: unknown): SchemaValidationResult {
  const errors: SchemaValidationError[] = [];

  // Check if theme is an object
  if (!theme || typeof theme !== "object") {
    errors.push({
      path: "$",
      message: "Theme must be an object",
      expected: "object",
      received: typeof theme,
    });
    return { valid: false, errors };
  }

  const config = theme as Record<string, unknown>;

  // Validate required top-level properties
  const requiredProps = ["meta", "colors", "typography", "spacing", "borders"];
  for (const prop of requiredProps) {
    if (!(prop in config)) {
      errors.push({
        path: `$.${prop}`,
        message: `Missing required property '${prop}'`,
        expected: "defined",
        received: "undefined",
      });
    }
  }

  // Validate meta
  if (config.meta && typeof config.meta === "object") {
    const meta = config.meta as Record<string, unknown>;

    if (!meta.name || typeof meta.name !== "string") {
      errors.push({
        path: "$.meta.name",
        message: "meta.name must be a non-empty string",
        expected: "string",
        received: typeof meta.name,
      });
    } else if (meta.name.length === 0) {
      errors.push({
        path: "$.meta.name",
        message: "meta.name cannot be empty",
      });
    }

    if (!meta.version || typeof meta.version !== "string") {
      errors.push({
        path: "$.meta.version",
        message: "meta.version must be a non-empty string",
        expected: "string",
        received: typeof meta.version,
      });
    }
  }

  // Validate colors
  if (config.colors && typeof config.colors === "object") {
    const colors = config.colors as Record<string, unknown>;
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

    for (const color of requiredColors) {
      if (!(color in colors)) {
        errors.push({
          path: `$.colors.${color}`,
          message: `Missing required color '${color}'`,
        });
      } else if (typeof colors[color] !== "string") {
        errors.push({
          path: `$.colors.${color}`,
          message: `Color '${color}' must be a string`,
          expected: "string",
          received: typeof colors[color],
        });
      }
    }
  }

  // Validate typography
  if (config.typography && typeof config.typography === "object") {
    const typography = config.typography as Record<string, unknown>;

    if (!typography.fontFamily || typeof typography.fontFamily !== "string") {
      errors.push({
        path: "$.typography.fontFamily",
        message: "typography.fontFamily must be a non-empty string",
        expected: "string",
        received: typeof typography.fontFamily,
      });
    }

    if (typeof typography.baseSize !== "number") {
      errors.push({
        path: "$.typography.baseSize",
        message: "typography.baseSize must be a number",
        expected: "number",
        received: typeof typography.baseSize,
      });
    } else if (typography.baseSize < 12 || typography.baseSize > 24) {
      errors.push({
        path: "$.typography.baseSize",
        message: `typography.baseSize must be between 12 and 24, got ${typography.baseSize}`,
      });
    }

    if (typeof typography.scale !== "number") {
      errors.push({
        path: "$.typography.scale",
        message: "typography.scale must be a number",
        expected: "number",
        received: typeof typography.scale,
      });
    } else if (typography.scale < 1.1 || typography.scale > 1.5) {
      errors.push({
        path: "$.typography.scale",
        message: `typography.scale must be between 1.1 and 1.5, got ${typography.scale}`,
      });
    }

    if (!typography.weights || typeof typography.weights !== "object") {
      errors.push({
        path: "$.typography.weights",
        message: "typography.weights must be an object",
        expected: "object",
        received: typeof typography.weights,
      });
    }
  }

  // Validate spacing
  if (config.spacing && typeof config.spacing === "object") {
    const spacing = config.spacing as Record<string, unknown>;

    if (typeof spacing.baseUnit !== "number") {
      errors.push({
        path: "$.spacing.baseUnit",
        message: "spacing.baseUnit must be a number",
        expected: "number",
        received: typeof spacing.baseUnit,
      });
    } else if (spacing.baseUnit < 2 || spacing.baseUnit > 8) {
      errors.push({
        path: "$.spacing.baseUnit",
        message: `spacing.baseUnit must be between 2 and 8, got ${spacing.baseUnit}`,
      });
    }

    // If provided, validate values is an object
    if ("values" in spacing) {
      if (spacing.values !== null && typeof spacing.values !== "object") {
        errors.push({
          path: "$.spacing.values",
          message: "spacing.values must be an object",
          expected: "object",
          received: typeof spacing.values,
        });
      }
    }

    // If provided, validate scale is an array of numbers
    if ("scale" in spacing) {
      if (!Array.isArray(spacing.scale)) {
        errors.push({
          path: "$.spacing.scale",
          message: "spacing.scale must be an array of numbers",
          expected: "number[]",
          received: typeof spacing.scale,
        });
      } else if (!spacing.scale.every((v) => typeof v === "number")) {
        errors.push({
          path: "$.spacing.scale",
          message: "spacing.scale must contain only numbers",
        });
      }
    }
  }

  // Validate borders
  if (config.borders && typeof config.borders === "object") {
    const borders = config.borders as Record<string, unknown>;

    // Validate required numeric widths
    if (typeof borders.default !== "number") {
      errors.push({
        path: "$.borders.default",
        message: "borders.default must be a number",
        expected: "number",
        received: typeof borders.default,
      });
    } else if ((borders.default as number) < 1 || (borders.default as number) > 8) {
      errors.push({
        path: "$.borders.default",
        message: `borders.default must be between 1 and 8, got ${borders.default}`,
      });
    }

    if (typeof borders.thin !== "number") {
      errors.push({
        path: "$.borders.thin",
        message: "borders.thin must be a number",
        expected: "number",
        received: typeof borders.thin,
      });
    }

    if (typeof borders.thick !== "number") {
      errors.push({
        path: "$.borders.thick",
        message: "borders.thick must be a number",
        expected: "number",
        received: typeof borders.thick,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get JSON Schema as object
 * Returns the theme schema for programmatic use
 */
export function getThemeSchema(): Record<string, unknown> {
  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://spexop.com/schemas/theme.schema.json",
    title: "Spexop Theme Configuration",
    description: "Schema for Spexop design system theme configuration",
    type: "object",
    required: ["meta", "colors", "typography", "spacing", "borders"],
    // ... full schema would be here
    // For now, return a lightweight version
  };
}

/**
 * Validate theme against JSON Schema and return detailed errors
 *
 * @param theme - Theme to validate
 * @returns Validation result with detailed error paths
 */
export function validateAgainstSchema(
  theme: SpexopThemeConfig,
): SchemaValidationResult {
  return validateThemeSchema(theme);
}
