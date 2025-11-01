/**
 * Type-Safe Tokens for Dark Theme
 * Dark-first theme optimized for low-light environments
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export const colors = {
  primary: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4", // Main brand color (cyan)
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
  secondary: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#a78bfa", // Purple
    600: "#8b5cf6",
    700: "#7c3aed",
    800: "#6d28d9",
    900: "#5b21b6",
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
    500: "#f87171",
    600: "#ef4444",
    700: "#dc2626",
    800: "#b91c1c",
    900: "#991b1b",
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#fbbf24",
    600: "#f59e0b",
    700: "#d97706",
    800: "#b45309",
    900: "#92400e",
  },
  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#60a5fa",
    600: "#3b82f6",
    700: "#2563eb",
    800: "#1d4ed8",
    900: "#1e40af",
  },
  surface: {
    base: "#0a0a0a",
    secondary: "#171717",
    tertiary: "#262626",
    hover: "#262626",
  },
  text: {
    primary: "#fafafa",
    secondary: "#d4d4d4",
    tertiary: "#a3a3a3",
    muted: "#737373",
  },
  border: {
    default: "#262626",
    strong: "#404040",
    subtle: "#171717",
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
    sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },
  fontSize: {
    xs2: "11px",
    xs: "12px",
    sm: "14px",
    base: "15px",
    lg: "17px",
    xl: "19px",
    "2xl": "23px",
    "3xl": "28px",
    "4xl": "34px",
    "5xl": "41px",
    "6xl": "49px",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.75,
  },
  heading: {
    xs: { fontSize: "19px", fontWeight: 700, lineHeight: 1.2 },
    sm: { fontSize: "23px", fontWeight: 700, lineHeight: 1.2 },
    md: { fontSize: "28px", fontWeight: 700, lineHeight: 1.2 },
    lg: { fontSize: "34px", fontWeight: 700, lineHeight: 1.2 },
    xl: { fontSize: "41px", fontWeight: 700, lineHeight: 1.2 },
    "2xl": { fontSize: "49px", fontWeight: 700, lineHeight: 1.2 },
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
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px",
} as const;

export const shadow = {
  none: "none",
  sm: "0 2px 4px rgba(0, 0, 0, 0.3)",
  md: "0 4px 8px rgba(0, 0, 0, 0.4)",
  lg: "0 8px 16px rgba(0, 0, 0, 0.5)",
  xl: "0 16px 24px rgba(0, 0, 0, 0.6)",
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

export type DarkTokens = typeof tokens;
