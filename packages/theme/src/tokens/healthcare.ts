/**
 * Type-Safe Tokens for Healthcare Theme
 * Calming healthcare theme with blue and teal
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export const colors = {
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  secondary: {
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
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  surface: {
    base: "#ffffff",
    secondary: "#f9fafb",
    tertiary: "#e5e7eb",
    hover: "#f3f4f6",
  },
  text: {
    primary: "#0f172a",
    secondary: "#475569",
    tertiary: "#64748b",
    muted: "#94a3b8",
  },
  border: {
    default: "#e5e7eb",
    strong: "#d1d5db",
    subtle: "#f3f4f6",
  },
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

export const typography = {
  fontFamily: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    mono: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
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
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  full: "9999px",
} as const;

export const shadow = {
  none: "none",
  sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
  md: "0 4px 6px rgba(0, 0, 0, 0.08)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.12)",
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

export type HealthcareTokens = typeof tokens;
