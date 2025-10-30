/**
 * Color Validation Utilities
 * Validates various color formats (hex, RGB, RGBA, HSL, HSLA, named)
 *
 * @module @spexop/theme/utils/colorValidation
 */

/**
 * Named colors supported by browsers
 */
const NAMED_COLORS = new Set([
  "transparent",
  "currentColor",
  "inherit",
  "initial",
  "unset",
  // CSS named colors
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgrey",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "grey",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgrey",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
]);

/**
 * Color validation options
 */
export interface ColorValidationOptions {
  /** Allow hex colors (#RRGGBB or #RGB) */
  allowHex?: boolean;
  /** Allow RGB/RGBA colors */
  allowRgb?: boolean;
  /** Allow HSL/HSLA colors */
  allowHsl?: boolean;
  /** Allow named colors */
  allowNamedColors?: boolean;
  /** Allow CSS keywords (transparent, currentColor, etc.) */
  allowCssKeywords?: boolean;
  /** Require specific format */
  requireFormat?: "hex" | "rgb" | "hsl";
}

/**
 * Color validation result
 */
export interface ColorValidationResult {
  valid: boolean;
  format?:
    | "hex"
    | "hex-short"
    | "rgb"
    | "rgba"
    | "hsl"
    | "hsla"
    | "named"
    | "keyword";
  reason?: string;
}

/**
 * Validate hex color format (#RRGGBB or #RGB)
 */
export function isValidHexColor(color: string): boolean {
  return /^#([0-9A-F]{6}|[0-9A-F]{3})$/i.test(color);
}

/**
 * Validate RGB/RGBA color format
 */
export function isValidRgbColor(color: string): boolean {
  // rgb(r, g, b) or rgba(r, g, b, a)
  // Also support rgb(r g b) and rgb(r g b / a) modern syntax
  // Comma-separated: rgb(59, 130, 246) or rgba(59, 130, 246, 0.5)
  // Space-separated: rgb(59 130 246) or rgb(59 130 246 / 0.5)
  const commaPattern =
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i;
  const spacePattern =
    /^rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(?:\/\s*([\d.]+)\s*)?\)$/i;

  const match = color.match(commaPattern) || color.match(spacePattern);

  if (!match) return false;

  const [, r, g, b, a] = match;
  const red = Number.parseInt(r, 10);
  const green = Number.parseInt(g, 10);
  const blue = Number.parseInt(b, 10);

  // Validate RGB values are 0-255
  if (
    red < 0 ||
    red > 255 ||
    green < 0 ||
    green > 255 ||
    blue < 0 ||
    blue > 255
  ) {
    return false;
  }

  // Validate alpha if present (0-1)
  if (a !== undefined) {
    const alpha = Number.parseFloat(a);
    if (Number.isNaN(alpha) || alpha < 0 || alpha > 1) {
      return false;
    }
  }

  return true;
}

/**
 * Validate HSL/HSLA color format
 */
export function isValidHslColor(color: string): boolean {
  // Limit input length to prevent ReDoS attacks
  if (color.length > 100) {
    return false;
  }

  // hsl(h, s%, l%) or hsla(h, s%, l%, a) - comma-separated syntax
  // Also support hsl(h s% l%) and hsl(h s% l% / a) modern syntax - space-separated
  // Split into two patterns to avoid ambiguous regex that can cause ReDoS

  // Comma-separated pattern: hsl(h, s%, l%) or hsla(h, s%, l%, a)
  const commaPattern =
    /^hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*(?:,\s*([\d.]+)\s*)?\)$/i;

  // Space-separated pattern: hsl(h s% l%) or hsl(h s% l% / a)
  const spacePattern =
    /^hsla?\(\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\s*(?:\/\s*([\d.]+)\s*)?\)$/i;

  const match = color.match(commaPattern) || color.match(spacePattern);

  if (!match) return false;

  const [, h, s, l, a] = match;
  const hue = Number.parseFloat(h);
  const saturation = Number.parseFloat(s);
  const lightness = Number.parseFloat(l);

  // Validate HSL values
  if (
    hue < 0 ||
    hue > 360 ||
    saturation < 0 ||
    saturation > 100 ||
    lightness < 0 ||
    lightness > 100
  ) {
    return false;
  }

  // Validate alpha if present (0-1)
  if (a !== undefined) {
    const alpha = Number.parseFloat(a);
    if (Number.isNaN(alpha) || alpha < 0 || alpha > 1) {
      return false;
    }
  }

  return true;
}

/**
 * Check if color is a named color
 */
export function isNamedColor(color: string): boolean {
  return NAMED_COLORS.has(color.toLowerCase());
}

/**
 * Check if color is a CSS keyword
 */
export function isCssKeyword(color: string): boolean {
  const keywords = [
    "transparent",
    "currentcolor",
    "inherit",
    "initial",
    "unset",
  ];
  return keywords.includes(color.toLowerCase());
}

/**
 * Validate color format with options
 *
 * @param color - Color string to validate
 * @param options - Validation options
 * @returns Validation result with format and reason
 *
 * @example
 * ```typescript
 * validateColor("#3b82f6"); // { valid: true, format: "hex" }
 * validateColor("rgb(59, 130, 246)"); // { valid: true, format: "rgb" }
 * validateColor("hsl(217, 91%, 60%)"); // { valid: true, format: "hsl" }
 * validateColor("blue"); // { valid: true, format: "named" }
 * validateColor("invalid"); // { valid: false, reason: "..." }
 * ```
 */
export function validateColor(
  color: string,
  options: ColorValidationOptions = {},
): ColorValidationResult {
  const {
    allowHex = true,
    allowRgb = true,
    allowHsl = true,
    allowNamedColors = true,
    allowCssKeywords = true,
    requireFormat,
  } = options;

  if (!color || typeof color !== "string") {
    return {
      valid: false,
      reason: "Color must be a non-empty string",
    };
  }

  const trimmedColor = color.trim();

  // Check hex format
  if (isValidHexColor(trimmedColor)) {
    const format = trimmedColor.length === 4 ? "hex-short" : "hex";
    if (requireFormat && requireFormat !== "hex") {
      return {
        valid: false,
        format,
        reason: `Color is hex format but ${requireFormat} is required`,
      };
    }
    if (!allowHex) {
      return {
        valid: false,
        format,
        reason: "Hex colors are not allowed",
      };
    }
    return { valid: true, format };
  }

  // Check RGB/RGBA format
  if (isValidRgbColor(trimmedColor)) {
    const format = trimmedColor.includes("rgba") ? "rgba" : "rgb";
    if (requireFormat && requireFormat !== "rgb") {
      return {
        valid: false,
        format,
        reason: `Color is RGB format but ${requireFormat} is required`,
      };
    }
    if (!allowRgb) {
      return {
        valid: false,
        format,
        reason: "RGB colors are not allowed",
      };
    }
    return { valid: true, format };
  }

  // Check HSL/HSLA format
  if (isValidHslColor(trimmedColor)) {
    const format = trimmedColor.includes("hsla") ? "hsla" : "hsl";
    if (requireFormat && requireFormat !== "hsl") {
      return {
        valid: false,
        format,
        reason: `Color is HSL format but ${requireFormat} is required`,
      };
    }
    if (!allowHsl) {
      return {
        valid: false,
        format,
        reason: "HSL colors are not allowed",
      };
    }
    return { valid: true, format };
  }

  // Check CSS keywords
  if (isCssKeyword(trimmedColor)) {
    if (!allowCssKeywords) {
      return {
        valid: false,
        format: "keyword",
        reason: "CSS keywords are not allowed",
      };
    }
    return { valid: true, format: "keyword" };
  }

  // Check named colors
  if (isNamedColor(trimmedColor)) {
    if (!allowNamedColors) {
      return {
        valid: false,
        format: "named",
        reason: "Named colors are not allowed",
      };
    }
    return { valid: true, format: "named" };
  }

  return {
    valid: false,
    reason: `Invalid color format: "${trimmedColor}". Expected hex (#RRGGBB), RGB (rgb(r, g, b)), HSL (hsl(h, s%, l%)), or named color.`,
  };
}

/**
 * Normalize color to hex format
 * Converts RGB, HSL, and named colors to hex when possible
 *
 * @param color - Color string to normalize
 * @returns Hex color or original if conversion not possible
 */
export function normalizeColorToHex(color: string): string {
  const trimmedColor = color.trim();

  // Already hex
  if (isValidHexColor(trimmedColor)) {
    // Expand short hex (#RGB to #RRGGBB)
    if (trimmedColor.length === 4) {
      const [, r, g, b] = trimmedColor;
      return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
    }
    return trimmedColor.toUpperCase();
  }

  // RGB to hex
  if (isValidRgbColor(trimmedColor)) {
    const match = trimmedColor.match(
      /rgba?\(\s*(\d+)\s*,?\s*(\d+)\s*,?\s*(\d+)/i,
    );
    if (match) {
      const [, r, g, b] = match;
      const red = Number.parseInt(r, 10).toString(16).padStart(2, "0");
      const green = Number.parseInt(g, 10).toString(16).padStart(2, "0");
      const blue = Number.parseInt(b, 10).toString(16).padStart(2, "0");
      return `#${red}${green}${blue}`.toUpperCase();
    }
  }

  // For other formats, return as-is
  // (HSL conversion would require the colorManipulation utilities)
  return trimmedColor;
}
