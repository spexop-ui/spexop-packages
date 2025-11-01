/**
 * Type-Safe Tokens for Minimal Theme
 * Clean, monochrome theme with subtle grays
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export const colors = {
  primary: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#000000", // Main brand color (black)
    600: "#171717",
    700: "#262626",
    800: "#404040",
    900: "#525252",
  },
  secondary: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#404040", // Dark gray
    600: "#525252",
    700: "#737373",
    800: "#a3a3a3",
    900: "#d4d4d4",
  },
  success: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#404040",
    600: "#525252",
    700: "#737373",
    800: "#a3a3a3",
    900: "#d4d4d4",
  },
  error: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#171717",
    600: "#262626",
    700: "#404040",
    800: "#525252",
    900: "#737373",
  },
  warning: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#525252",
    600: "#737373",
    700: "#a3a3a3",
    800: "#d4d4d4",
    900: "#e5e5e5",
  },
  info: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#a3a3a3",
    700: "#d4d4d4",
    800: "#e5e5e5",
    900: "#f5f5f5",
  },
  surface: {
    base: "#ffffff",
    secondary: "#fafafa",
    tertiary: "#f5f5f5",
    hover: "#f5f5f5",
  },
  text: {
    primary: "#0a0a0a",
    secondary: "#525252",
    tertiary: "#737373",
    muted: "#a3a3a3",
  },
  border: {
    default: "#e5e5e5",
    strong: "#d4d4d4",
    subtle: "#fafafa",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "'System', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    mono: "'SF Mono', 'Menlo', 'Courier New', monospace",
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
  heading: {
    xs: { fontSize: "20px", fontWeight: 700, lineHeight: 1.25 },
    sm: { fontSize: "24px", fontWeight: 700, lineHeight: 1.25 },
    md: { fontSize: "30px", fontWeight: 700, lineHeight: 1.25 },
    lg: { fontSize: "36px", fontWeight: 700, lineHeight: 1.25 },
    xl: { fontSize: "48px", fontWeight: 700, lineHeight: 1.25 },
    "2xl": { fontSize: "64px", fontWeight: 700, lineHeight: 1.25 },
  },
} as const;

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

export const radius = {
  none: "0",
  sm: "2px",
  md: "4px",
  lg: "6px",
  xl: "8px",
  "2xl": "12px",
  full: "9999px",
} as const;

export const shadow = {
  none: "none",
  sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
  md: "0 2px 4px rgba(0, 0, 0, 0.06)",
  lg: "0 4px 6px rgba(0, 0, 0, 0.08)",
  xl: "0 6px 8px rgba(0, 0, 0, 0.1)",
} as const;

export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

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

export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadow,
  breakpoints,
  zIndex,
} as const;

export type MinimalTokens = typeof tokens;
