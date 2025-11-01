/**
 * Spexop Preset Theme
 * Custom Spexop brand theme matching logo colors
 * Dark charcoal with cyan accents perfect for the Spexop brand
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const spexopPreset: SpexopThemeConfig = {
  meta: {
    name: "Spexop",
    version: "1.0.0",
    description: "Custom Spexop brand theme matching logo colors",
    author: "Spexop Team",
    tags: ["spexop", "brand", "minimal", "professional"],
  },

  colors: {
    // Primary brand color (cyan accent from spexop.com)
    primary: "#06b6d4",
    primaryHover: "#0891b2",
    primaryActive: "#0e7490",
    primaryLight: "#cffafe",
    primaryDark: "#0e7490",

    // Secondary color (brand charcoal)
    secondary: "#11171b",
    secondaryHover: "#0a0e12",
    secondaryActive: "#050709",
    secondaryLight: "#1a1f25",
    secondaryDark: "#050709",

    // Surface colors (refined minimalism)
    surface: "#ffffff",
    surfaceSecondary: "#fafafa",
    surfaceHover: "#f5f5f5",

    // Text colors
    text: "#11171b",
    textSecondary: "#525252",
    textMuted: "#a3a3a3",

    // Border colors
    border: "#e5e5e5",
    borderStrong: "#d4d4d4",
    borderSubtle: "#f5f5f5",

    // Semantic colors
    success: "#10b981",
    successLight: "#d1fae5",
    successDark: "#065f46",
    warning: "#f59e0b",
    warningLight: "#fef3c7",
    warningDark: "#92400e",
    error: "#ef4444",
    errorLight: "#fee2e2",
    errorDark: "#991b1b",
    info: "#06b6d4",
    infoLight: "#cffafe",
    infoDark: "#0891b2",

    // Accent colors (cyan from logo)
    accent: "#06b6d4",
    accentHover: "#0891b2",
    accentActive: "#0e7490",

    // Link colors (cyan matching accent)
    link: "#06b6d4",
    linkHover: "#0891b2",
    linkActive: "#0e7490",

    // Interactive states
    focus: "#06b6d4",
    hover: "rgba(6, 182, 212, 0.08)",

    // Overlay/backdrop
    overlay: "rgba(0, 0, 0, 0.8)",
    backdrop: "rgba(0, 0, 0, 0.6)",

    // Neutral colors (slate grays)
    neutral: "#525252",
    neutralHover: "#404040",
    neutralActive: "#262626",
  },

  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontFamilyHeading:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontFamilyMono:
      "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
    baseSize: 16,
    scale: 1.2,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    baseUnit: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
  },

  borders: {
    thin: 1,
    default: 2,
    thick: 3,
    radiusSubtle: 6,
    radiusRelaxed: 12,
    radiusPill: 9999,
    defaultStyle: "solid",
  },

  radii: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 20,
    full: 9999,
  },

  shadows: {
    none: "none",
    sm: "0 1px 2px rgba(17, 23, 27, 0.05)",
    md: "0 4px 6px rgba(17, 23, 27, 0.08)",
    lg: "0 10px 15px rgba(17, 23, 27, 0.1)",
    xl: "0 20px 25px rgba(17, 23, 27, 0.12)",
  },

  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
    toast: 1600,
  },

  cards: {
    basic: {
      background: "colors.surface",
      border: "colors.border",
      backgroundHover: "colors.surfaceHover",
      borderHover: "colors.borderStrong",
    },
    highlighted: {
      background: "colors.infoLight",
      border: "colors.accent",
      backgroundHover: "colors.infoLight",
      borderHover: "colors.accentHover",
    },
    outlined: {
      background: "colors.surface",
      border: "colors.borderStrong",
      borderWidth: "borders.thick",
      backgroundHover: "colors.surfaceHover",
      borderHover: "colors.primary",
    },
    interactive: {
      background: "colors.surface",
      border: "colors.border",
      backgroundHover: "colors.surfaceHover",
      borderHover: "colors.accent",
    },
    ghost: {
      background: "transparent",
      border: "colors.border",
      borderStyle: "dashed",
      backgroundHover: "colors.surfaceSecondary",
      borderHover: "colors.accent",
    },
    elevated: {
      background: "colors.surface",
      border: "colors.accent",
      backgroundHover: "colors.surface",
      borderHover: "colors.accent",
    },
  },

  breakpoints: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },

  darkMode: {
    enabled: true,
    colors: {
      surface: "#0a0e12",
      surfaceSecondary: "#11171b",
      surfaceHover: "#1a1f25",
      text: "#fafafa",
      textSecondary: "#d4d4d4",
      textMuted: "#737373",
      border: "#262b30",
      borderStrong: "#404040",
      borderSubtle: "#1a1f25",
    },
    cards: {
      basic: {
        background: "colors.surfaceSecondary",
        border: "colors.border",
        backgroundHover: "colors.surfaceHover",
        borderHover: "colors.borderStrong",
      },
      highlighted: {
        background: "colors.surfaceSecondary",
        border: "colors.accent",
        backgroundHover: "colors.surfaceHover",
        borderHover: "colors.accentHover",
      },
      outlined: {
        background: "colors.surfaceSecondary",
        border: "colors.borderStrong",
        backgroundHover: "colors.surfaceHover",
        borderHover: "colors.borderStrong",
      },
      interactive: {
        background: "colors.surfaceSecondary",
        border: "colors.border",
        backgroundHover: "colors.surfaceHover",
        borderHover: "colors.accent",
      },
      ghost: {
        background: "transparent",
        border: "colors.border",
        backgroundHover: "colors.surfaceSecondary",
        borderHover: "colors.accent",
      },
      elevated: {
        background: "colors.surfaceSecondary",
        border: "colors.accent",
        backgroundHover: "colors.surfaceHover",
        borderHover: "colors.accent",
      },
    },
  },
};
