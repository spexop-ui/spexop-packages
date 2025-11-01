/**
 * Type-Safe Tokens for Tech Theme
 * Full TypeScript autocomplete and compile-time validation
 *
 * Usage:
 * ```bash
 * import { tokens } from '@spexop/theme/tokens/tech';
 *
 * <Box bg={tokens.colors.primary[500]} />
 * <Text size={tokens.typography.fontSize.lg} />
 * ```
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

/**
 * Color scale (50-900) for brand and semantic colors
 */
export const colors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Main brand color
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  secondary: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#8b5cf6", // Main secondary color
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },
  success: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  // Surface colors
  surface: {
    base: "#ffffff",
    secondary: "#f9fafb",
    tertiary: "#e5e7eb",
    hover: "#f3f4f6",
  },
  // Text colors
  text: {
    primary: "#0f172a",
    secondary: "#475569",
    tertiary: "#64748b",
    muted: "#94a3b8",
  },
  // Border colors
  border: {
    default: "#e5e7eb",
    strong: "#d1d5db",
    subtle: "#f3f4f6",
  },
  // Neutral grays
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
} as const;

/**
 * Typography tokens
 */
export const typography = {
  fontFamily: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', 'Source Code Pro', monospace",
  },
  fontSize: {
    xs2: "11px",
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.6,
    relaxed: 1.8,
  },
  // Composite heading tokens
  heading: {
    xs: { fontSize: "20px", fontWeight: 700, lineHeight: 1.25 },
    sm: { fontSize: "24px", fontWeight: 700, lineHeight: 1.25 },
    md: { fontSize: "30px", fontWeight: 700, lineHeight: 1.25 },
    lg: { fontSize: "36px", fontWeight: 700, lineHeight: 1.25 },
    xl: { fontSize: "48px", fontWeight: 700, lineHeight: 1.25 },
    "2xl": { fontSize: "64px", fontWeight: 700, lineHeight: 1.25 },
  },
} as const;

/**
 * Spacing tokens (4px base unit)
 */
export const spacing = {
  0: "0",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
} as const;

/**
 * Border radius tokens
 */
export const radius = {
  none: "0",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  full: "9999px",
} as const;

/**
 * Shadow tokens
 */
export const shadow = {
  none: "none",
  sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
  md: "0 4px 6px rgba(0, 0, 0, 0.08)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.12)",
} as const;

/**
 * Breakpoint tokens (px values)
 */
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Z-index tokens
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  toast: 1600,
} as const;

/**
 * Complete type-safe token set for Tech theme
 */
export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadow,
  breakpoints,
  zIndex,
} as const;

/**
 * Type definition for Tech tokens
 * Use this to type your components that accept tokens
 */
export type TechTokens = typeof tokens;
