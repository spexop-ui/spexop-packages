/**
 * Tests for CSS Generator
 */

import { describe, expect, it } from "vitest";
import type { SpexopThemeConfig } from "../../types/SpexopThemeConfig.js";
import { generateCSS } from "../css.js";

describe("CSS Generator", () => {
  const mockTheme: SpexopThemeConfig = {
    meta: {
      name: "Test Theme",
      version: "1.0.0",
    },
    colors: {
      primary: "#3b82f6",
      secondary: "#10b981",
      surface: "#ffffff",
      surfaceSecondary: "#f3f4f6",
      surfaceHover: "#e5e7eb",
      text: "#111827",
      textSecondary: "#6b7280",
      textMuted: "#9ca3af",
      border: "#d1d5db",
      borderStrong: "#9ca3af",
      borderSubtle: "#e5e7eb",
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      baseSize: 16,
      scale: 1.25,
      weights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: {
      baseUnit: 4,
      values: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
      },
    },
    borders: {
      default: 2,
      strong: 3,
      radius: {
        sm: 4,
        md: 8,
        lg: 12,
      },
    },
  } as SpexopThemeConfig;

  describe("basic generation", () => {
    it("should generate valid CSS", () => {
      const result = generateCSS(mockTheme);
      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
    });

    it("should use :root selector by default", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain(":root {");
    });

    it("should support custom scope", () => {
      const result = generateCSS(mockTheme, ".my-theme");
      expect(result).toContain(".my-theme {");
      expect(result).not.toContain(":root {");
    });

    it("should be valid CSS syntax", () => {
      const result = generateCSS(mockTheme);

      // Check for basic CSS structure
      expect(result).toContain("{");
      expect(result).toContain("}");
      expect(result).toContain(":");
      expect(result).toContain(";");
    });
  });

  describe("color variables", () => {
    it("should generate color variables", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("--theme-primary:");
      expect(result).toContain("--theme-secondary:");
      expect(result).toContain("--theme-surface:");
      expect(result).toContain("--theme-text:");
    });

    it("should include color values", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("#3b82f6");
      expect(result).toContain("#10b981");
      expect(result).toContain("#ffffff");
      expect(result).toContain("#111827");
    });

    it("should resolve color token references", () => {
      const themeWithRefs = {
        ...mockTheme,
        colors: {
          ...mockTheme.colors,
          accent: "colors.primary",
        },
      } as SpexopThemeConfig;

      const result = generateCSS(themeWithRefs);
      expect(result).toContain("--theme-accent:");
      expect(result).toContain("#3b82f6"); // Should be resolved
      expect(result).not.toContain("colors.primary"); // Should not contain reference
    });
  });

  describe("typography variables", () => {
    it("should generate typography variables", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("--theme-font-family:");
      expect(result).toContain("--theme-font-size-base:");
      expect(result).toContain("--theme-font-size-");
    });

    it("should include font family", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("Inter");
    });

    it("should generate font size scale", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("--theme-font-size-xs:");
      expect(result).toContain("--theme-font-size-sm:");
      expect(result).toContain("--theme-font-size-base:");
      expect(result).toContain("--theme-font-size-lg:");
      expect(result).toContain("--theme-font-size-xl:");
    });

    it("should use base size", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("16px");
    });
  });

  describe("spacing variables", () => {
    it("should generate spacing variables", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("--theme-spacing-");
    });

    it("should include spacing values", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("--theme-spacing-1:");
      expect(result).toContain("--theme-spacing-2:");
      expect(result).toContain("--theme-spacing-3:");
      expect(result).toContain("--theme-spacing-4:");
    });

    it("should use baseUnit for calculations", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("4px");
      expect(result).toContain("8px");
      expect(result).toContain("12px");
      expect(result).toContain("16px");
    });
  });

  describe("border variables", () => {
    it("should generate border width variables", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("--theme-border-width:");
      expect(result).toContain("2px");
    });

    it("should generate border radius variables", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("--theme-radius-sm:");
      expect(result).toContain("--theme-radius-md:");
      expect(result).toContain("--theme-radius-lg:");
    });

    it("should include radius values", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("4px");
      expect(result).toContain("8px");
      expect(result).toContain("12px");
    });
  });

  describe("dark mode support", () => {
    it("should generate dark mode when enabled", () => {
      const themeWithDark = {
        ...mockTheme,
        darkMode: {
          enabled: true,
          colors: {
            primary: "#60a5fa",
            surface: "#111827",
            text: "#f3f4f6",
          },
        },
      } as SpexopThemeConfig;

      const result = generateCSS(themeWithDark);
      expect(result).toContain('[data-theme="dark"]');
    });

    it("should support prefers-color-scheme", () => {
      const themeWithDark = {
        ...mockTheme,
        darkMode: {
          enabled: true,
          colors: {
            primary: "#60a5fa",
            surface: "#111827",
            text: "#f3f4f6",
          },
        },
      } as SpexopThemeConfig;

      const result = generateCSS(themeWithDark);
      expect(result).toContain("@media (prefers-color-scheme: dark)");
    });

    it("should not generate dark mode when disabled", () => {
      const result = generateCSS(mockTheme);
      expect(result).not.toContain('[data-theme="dark"]');
      expect(result).not.toContain("@media (prefers-color-scheme: dark)");
    });
  });

  describe("button variants", () => {
    it("should generate button variant variables when provided", () => {
      const themeWithButtons = {
        ...mockTheme,
        buttons: {
          primary: {
            background: "colors.primary",
            color: "#ffffff",
            border: "colors.primary",
          },
        },
      } as SpexopThemeConfig;

      const result = generateCSS(themeWithButtons);
      expect(result).toContain("--theme-button-primary-");
    });

    it("should resolve button token references", () => {
      const themeWithButtons = {
        ...mockTheme,
        buttons: {
          primary: {
            background: "colors.primary",
            color: "#ffffff",
            border: "colors.primary",
          },
        },
      } as SpexopThemeConfig;

      const result = generateCSS(themeWithButtons);
      expect(result).toContain("#3b82f6"); // Resolved from colors.primary
      expect(result).not.toContain("colors.primary");
    });
  });

  describe("token resolution", () => {
    it("should resolve nested token references", () => {
      const themeWithRefs = {
        ...mockTheme,
        colors: {
          ...mockTheme.colors,
          accent: "colors.primary",
          highlight: "colors.accent",
        },
      } as SpexopThemeConfig;

      const result = generateCSS(themeWithRefs);
      expect(result).toContain("--theme-highlight:");
      // Both should resolve to the same value
      const primaryValue = mockTheme.colors.primary;
      expect(result).toContain(primaryValue);
    });

    it("should preserve literal values", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("#3b82f6");
      expect(result).toContain("#ffffff");
      expect(result).toContain("Inter");
    });
  });

  describe("output format", () => {
    it("should have proper indentation", () => {
      const result = generateCSS(mockTheme);
      expect(result).toContain("  --theme-");
    });

    it("should end with closing brace", () => {
      const result = generateCSS(mockTheme);
      expect(result.trim()).toMatch(/}$/);
    });

    it("should have no syntax errors", () => {
      const result = generateCSS(mockTheme);

      // Count braces
      const openBraces = (result.match(/{/g) || []).length;
      const closeBraces = (result.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);

      // Each property should end with semicolon
      const properties = result.match(/--theme-[^:]+:[^;]+;/g);
      expect(properties).toBeTruthy();
      expect(properties?.length).toBeGreaterThan(0);
    });
  });

  describe("edge cases", () => {
    it("should handle minimal theme", () => {
      const minimalTheme = {
        meta: { name: "Minimal", version: "1.0.0" },
        colors: {
          primary: "#000000",
          surface: "#ffffff",
          surfaceSecondary: "#f5f5f5",
          surfaceHover: "#e5e5e5",
          text: "#000000",
          textSecondary: "#666666",
          textMuted: "#999999",
          border: "#cccccc",
          borderStrong: "#999999",
          borderSubtle: "#e5e5e5",
        },
        typography: {
          fontFamily: "sans-serif",
          baseSize: 16,
          scale: 1.25,
          weights: { normal: 400, bold: 700 },
        },
        spacing: { baseUnit: 4, values: {} },
        borders: { default: 1, strong: 2, radius: { sm: 4, md: 8, lg: 12 } },
      } as SpexopThemeConfig;

      const result = generateCSS(minimalTheme);
      expect(result).toBeTruthy();
      expect(result).toContain("--theme-primary:");
    });

    it("should handle themes with many custom properties", () => {
      const complexTheme = {
        ...mockTheme,
        colors: {
          ...mockTheme.colors,
          custom1: "#ff0000",
          custom2: "#00ff00",
          custom3: "#0000ff",
        },
      } as SpexopThemeConfig;

      const result = generateCSS(complexTheme);
      expect(result).toContain("--theme-custom1:");
      expect(result).toContain("--theme-custom2:");
      expect(result).toContain("--theme-custom3:");
    });
  });

  describe("animation tokens", () => {
    it("should generate animation duration tokens", () => {
      const themeWithAnimations: SpexopThemeConfig = {
        ...mockTheme,
        animations: {
          durations: {
            fast: 150,
            normal: 250,
            slow: 400,
            slower: 600,
          },
        },
      };

      const result = generateCSS(themeWithAnimations);
      expect(result).toContain("--theme-duration-fast: 150ms");
      expect(result).toContain("--theme-duration-normal: 250ms");
      expect(result).toContain("--theme-duration-slow: 400ms");
      expect(result).toContain("--theme-duration-slower: 600ms");
    });

    it("should generate easing function tokens", () => {
      const themeWithEasings: SpexopThemeConfig = {
        ...mockTheme,
        animations: {
          easings: {
            easeIn: "cubic-bezier(0.4, 0, 1, 1)",
            easeOut: "cubic-bezier(0, 0, 0.2, 1)",
            easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            linear: "linear",
          },
        },
      };

      const result = generateCSS(themeWithEasings);
      expect(result).toContain(
        "--theme-easing-ease-in: cubic-bezier(0.4, 0, 1, 1)",
      );
      expect(result).toContain(
        "--theme-easing-ease-out: cubic-bezier(0, 0, 0.2, 1)",
      );
      expect(result).toContain(
        "--theme-easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)",
      );
      expect(result).toContain("--theme-easing-linear: linear");
    });

    it("should generate transition tokens", () => {
      const themeWithTransitions: SpexopThemeConfig = {
        ...mockTheme,
        animations: {
          transitions: {
            default: "all 250ms ease-in-out",
            fast: "all 150ms ease-out",
            slow: "all 400ms ease-in-out",
          },
        },
      };

      const result = generateCSS(themeWithTransitions);
      expect(result).toContain(
        "--theme-transition-default: all 250ms ease-in-out",
      );
      expect(result).toContain("--theme-transition-fast: all 150ms ease-out");
      expect(result).toContain(
        "--theme-transition-slow: all 400ms ease-in-out",
      );
    });

    it("should handle themes without animations", () => {
      const result = generateCSS(mockTheme);
      expect(result).not.toContain("--theme-duration-");
      expect(result).not.toContain("--theme-easing-");
      expect(result).not.toContain("--theme-transition-");
    });

    it("should handle partial animation configurations", () => {
      const themeWithPartialAnimations: SpexopThemeConfig = {
        ...mockTheme,
        animations: {
          durations: {
            fast: 150,
            normal: 250,
          },
        },
      };

      const result = generateCSS(themeWithPartialAnimations);
      expect(result).toContain("--theme-duration-fast: 150ms");
      expect(result).toContain("--theme-duration-normal: 250ms");
      expect(result).not.toContain("--theme-duration-slow");
    });
  });

  describe("opacity tokens", () => {
    it("should generate opacity tokens", () => {
      const themeWithOpacity: SpexopThemeConfig = {
        ...mockTheme,
        opacity: {
          disabled: 0.4,
          hover: 0.8,
          overlay: 0.75,
          subtle: 0.6,
          muted: 0.7,
        },
      };

      const result = generateCSS(themeWithOpacity);
      expect(result).toContain("--theme-opacity-disabled: 0.4");
      expect(result).toContain("--theme-opacity-hover: 0.8");
      expect(result).toContain("--theme-opacity-overlay: 0.75");
      expect(result).toContain("--theme-opacity-subtle: 0.6");
      expect(result).toContain("--theme-opacity-muted: 0.7");
    });

    it("should handle themes without opacity tokens", () => {
      const result = generateCSS(mockTheme);
      expect(result).not.toContain("--theme-opacity-");
    });

    it("should handle partial opacity configurations", () => {
      const themeWithPartialOpacity: SpexopThemeConfig = {
        ...mockTheme,
        opacity: {
          disabled: 0.4,
          hover: 0.8,
        },
      };

      const result = generateCSS(themeWithPartialOpacity);
      expect(result).toContain("--theme-opacity-disabled: 0.4");
      expect(result).toContain("--theme-opacity-hover: 0.8");
      expect(result).not.toContain("--theme-opacity-overlay");
    });

    it("should handle custom opacity values", () => {
      const themeWithCustomOpacity: SpexopThemeConfig = {
        ...mockTheme,
        opacity: {
          customLight: 0.2,
          customHeavy: 0.9,
        },
      };

      const result = generateCSS(themeWithCustomOpacity);
      expect(result).toContain("--theme-opacity-custom-light: 0.2");
      expect(result).toContain("--theme-opacity-custom-heavy: 0.9");
    });
  });
});
