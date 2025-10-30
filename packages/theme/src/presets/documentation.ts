/**
 * Documentation Preset Theme
 * Clean, readable theme optimized for documentation sites
 * Perfect for technical documentation, API docs, and knowledge bases
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const documentationPreset: SpexopThemeConfig = {
  meta: {
    name: "Documentation",
    version: "1.0.0",
    description:
      "Clean documentation theme optimized for reading and code examples",
    author: "Spexop Team",
    tags: ["documentation", "technical", "readable", "accessible"],
  },

  colors: {
    // Primary brand color (professional blue)
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryActive: "#1e40af",
    primaryLight: "#dbeafe",
    primaryDark: "#1e40af",

    // Secondary color (slate blue)
    secondary: "#475569",
    secondaryHover: "#334155",
    secondaryActive: "#1e293b",
    secondaryLight: "#f1f5f9",
    secondaryDark: "#334155",

    // Surface colors (clean white with subtle gray)
    surface: "#ffffff",
    surfaceSecondary: "#f8fafc",
    surfaceHover: "#f1f5f9",

    // Text colors (high contrast for readability)
    text: "#0f172a",
    textSecondary: "#475569",
    textMuted: "#64748b",

    // Border colors
    border: "#e2e8f0",
    borderStrong: "#cbd5e1",
    borderSubtle: "#f1f5f9",

    // Semantic colors (accessible)
    success: "#059669",
    successLight: "#d1fae5",
    successDark: "#047857",
    warning: "#d97706",
    warningLight: "#fef3c7",
    warningDark: "#b45309",
    error: "#dc2626",
    errorLight: "#fee2e2",
    errorDark: "#b91c1c",
    info: "#0284c7",
    infoLight: "#dbeafe",
    infoDark: "#0369a1",

    // Accent colors (blue for code/links)
    accent: "#2563eb",
    accentHover: "#1d4ed8",
    accentActive: "#1e40af",

    // Link colors (blue for visibility)
    link: "#2563eb",
    linkHover: "#1d4ed8",
    linkActive: "#1e40af",

    // Interactive states
    focus: "#2563eb",
    hover: "rgba(37, 99, 235, 0.08)",

    // Overlay/backdrop
    overlay: "rgba(15, 23, 42, 0.75)",
    backdrop: "rgba(15, 23, 42, 0.5)",

    // Neutral colors (slate grays)
    neutral: "#64748b",
    neutralHover: "#475569",
    neutralActive: "#334155",
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
      tight: 1.3,
      snug: 1.4,
      normal: 1.6,
      relaxed: 1.75,
    },
  },

  spacing: {
    baseUnit: 8,
    scale: [0, 8, 16, 24, 32, 40, 48, 64, 80, 96, 128],
  },

  borders: {
    thin: 1,
    default: 2,
    thick: 3,
    radiusSubtle: 4,
    radiusRelaxed: 8,
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
    sm: "0 1px 2px rgba(15, 23, 42, 0.05)",
    md: "0 4px 6px rgba(15, 23, 42, 0.1)",
    lg: "0 10px 15px rgba(15, 23, 42, 0.1)",
    xl: "0 20px 25px rgba(15, 23, 42, 0.15)",
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
      background: "colors.primaryLight",
      border: "colors.primary",
      backgroundHover: "colors.primaryLight",
      borderHover: "colors.primaryHover",
    },
    outlined: {
      background: "colors.surface",
      border: "colors.borderStrong",
      borderWidth: "borders.thick",
      backgroundHover: "colors.surfaceHover",
      borderHover: "colors.borderStrong",
    },
    interactive: {
      background: "colors.surface",
      border: "colors.border",
      backgroundHover: "colors.surfaceHover",
      borderHover: "colors.primary",
    },
    ghost: {
      background: "transparent",
      border: "colors.border",
      borderStyle: "dashed",
      backgroundHover: "colors.surfaceSecondary",
      borderHover: "colors.borderStrong",
    },
    elevated: {
      background: "colors.surface",
      border: "colors.border",
      backgroundHover: "colors.surface",
      borderHover: "colors.borderStrong",
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
      surface: "#0f172a",
      surfaceSecondary: "#1e293b",
      surfaceHover: "#334155",
      text: "#f1f5f9",
      textSecondary: "#cbd5e1",
      textMuted: "#94a3b8",
      border: "#334155",
      borderStrong: "#475569",
      borderSubtle: "#1e293b",
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
        border: "colors.primary",
        backgroundHover: "colors.surfaceHover",
        borderHover: "colors.primaryHover",
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
        borderHover: "colors.primary",
      },
      ghost: {
        background: "transparent",
        border: "colors.border",
        backgroundHover: "colors.surfaceSecondary",
        borderHover: "colors.borderStrong",
      },
      elevated: {
        background: "colors.surfaceSecondary",
        border: "colors.border",
        backgroundHover: "colors.surfaceHover",
        borderHover: "colors.borderStrong",
      },
    },
  },
};
