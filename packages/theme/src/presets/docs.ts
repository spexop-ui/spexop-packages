/**
 * Docs Preset Theme
 * Spexop brand palette tuned for dense documentation experiences
 * Compact spacing, layered surfaces, and strong navigation contrast
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const docsPreset: SpexopThemeConfig = {
  meta: {
    name: "Docs",
    version: "1.0.0",
    description:
      "Spexop-branded documentation preset with compact spacing and layered navigation surfaces",
    author: "Spexop Team",
    tags: ["spexop", "documentation", "compact", "navigation", "accessibility"],
  },

  colors: {
    // Primary Spexop accent (cyan)
    primary: "#06b6d4",
    primaryHover: "#0891b2",
    primaryActive: "#0e7490",
    primaryLight: "#cffafe",
    primaryDark: "#0e7490",

    // Secondary charcoal for structural elements
    secondary: "#11171b",
    secondaryHover: "#0a0e12",
    secondaryActive: "#050709",
    secondaryLight: "#1b2228",
    secondaryDark: "#050709",

    // Layered surfaces for content / sidebar separation
    surface: "#ffffff",
    surfaceSecondary: "#f6f8f9",
    surfaceHover: "#eef2f4",

    // High-contrast text system
    text: "#11171b",
    textSecondary: "#475467",
    textMuted: "#6b7280",

    // Border system favouring strong delineation
    border: "#d7dde1",
    borderStrong: "#bfc6cc",
    borderSubtle: "#eef2f4",

    // Semantic signals (aligned with Spexop palette)
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

    // Accent + link share the cyan tone
    accent: "#06b6d4",
    accentHover: "#0891b2",
    accentActive: "#0e7490",

    link: "#06b6d4",
    linkHover: "#0891b2",
    linkActive: "#0e7490",

    // Interactive feedback
    focus: "#06b6d4",
    hover: "rgba(6, 182, 212, 0.08)",

    // Backdrop / overlay
    overlay: "rgba(17, 23, 27, 0.8)",
    backdrop: "rgba(17, 23, 27, 0.6)",

    // Neutral scale for muted UI
    neutral: "#4b5563",
    neutralHover: "#374151",
    neutralActive: "#1f2933",
  },

  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontFamilyHeading:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontFamilyMono:
      "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
    baseSize: 16,
    scale: 1.18,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.25,
      snug: 1.4,
      normal: 1.55,
      relaxed: 1.75,
    },
  },

  spacing: {
    baseUnit: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64],
  },

  borders: {
    thin: 1,
    default: 2,
    thick: 3,
    radiusSubtle: 6,
    radiusRelaxed: 10,
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
    sm: "0 1px 2px rgba(17, 23, 27, 0.04)",
    md: "0 6px 16px rgba(17, 23, 27, 0.06)",
    lg: "0 12px 24px rgba(17, 23, 27, 0.08)",
    xl: "0 20px 32px rgba(17, 23, 27, 0.1)",
  },

  zIndex: {
    base: 0,
    dropdown: 1100,
    sticky: 1200,
    fixed: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
    toast: 1700,
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
      surface: "#050709",
      surfaceSecondary: "#0d1317",
      surfaceHover: "#141a1f",
      text: "#f1f5f9",
      textSecondary: "#cbd5e1",
      textMuted: "#94a3b8",
      border: "#1e252b",
      borderStrong: "#2c333a",
      borderSubtle: "#0d1317",
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
        borderHover: "colors.primary",
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
        border: "colors.border",
        backgroundHover: "colors.surfaceHover",
        borderHover: "colors.borderStrong",
      },
    },
  },
};
