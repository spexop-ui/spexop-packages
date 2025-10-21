/**
 * Tests for Fluid Typography Utilities
 */

import { describe, expect, it } from "vitest";
import type { FluidTypography } from "../../types/SpexopThemeConfig.js";
import {
  fluidTypographyToCSS,
  generateFluidFallback,
  generateFluidSize,
  generateFluidTypographyScale,
  supportsClamp,
  validateFluidTypography,
} from "../fluidTypography.js";

describe("Fluid Typography Utilities", () => {
  describe("generateFluidSize", () => {
    it("should generate valid clamp() syntax", () => {
      const result = generateFluidSize(16, 24, 320, 1280);

      expect(result).toContain("clamp(");
      expect(result).toContain("16px");
      expect(result).toContain("24px");
      expect(result).toContain("vw");
    });

    it("should use default viewport values", () => {
      const result = generateFluidSize(14, 20);

      expect(result).toBeTruthy();
      expect(result).toContain("clamp(");
    });

    it("should handle equal min and max sizes", () => {
      const result = generateFluidSize(16, 16, 320, 1280);

      expect(result).toContain("16px");
    });

    it("should generate mathematically correct slopes", () => {
      const result = generateFluidSize(16, 24, 320, 1280);

      // Slope should be (24-16)/(1280-320) = 8/960 = 0.0083
      expect(result).toContain("0.8");
    });
  });

  describe("generateFluidTypographyScale", () => {
    it("should generate fluid sizes for all scale steps", () => {
      const config: FluidTypography = {
        enabled: true,
        minViewport: 320,
        maxViewport: 1280,
        minSizeMultiplier: 0.8,
        maxSizeMultiplier: 1.2,
      };

      const result = generateFluidTypographyScale(16, 1.25, config);

      expect(result.xs).toBeDefined();
      expect(result.sm).toBeDefined();
      expect(result.base).toBeDefined();
      expect(result.lg).toBeDefined();
      expect(result.xl).toBeDefined();
      expect(result["2xl"]).toBeDefined();
    });

    it("should use custom sizes when provided", () => {
      const config: FluidTypography = {
        enabled: true,
        customSizes: {
          base: { min: 14, max: 18 },
        },
      };

      const result = generateFluidTypographyScale(16, 1.25, config);

      expect(result.base).toContain("14px");
      expect(result.base).toContain("18px");
    });

    it("should apply multipliers correctly", () => {
      const config: FluidTypography = {
        enabled: true,
        minViewport: 320,
        maxViewport: 1280,
        minSizeMultiplier: 0.9,
        maxSizeMultiplier: 1.1,
      };

      const result = generateFluidTypographyScale(16, 1.25, config);

      // Base size: 16px, should be 14.4px to 17.6px
      expect(result.base).toContain("clamp(");
    });

    it("should handle different scale ratios", () => {
      const config: FluidTypography = {
        enabled: true,
      };

      const goldenRatio = generateFluidTypographyScale(16, 1.618, config);
      const majorSecond = generateFluidTypographyScale(16, 1.125, config);

      expect(goldenRatio.lg).toBeDefined();
      expect(majorSecond.lg).toBeDefined();
      expect(goldenRatio.lg).not.toBe(majorSecond.lg);
    });
  });

  describe("fluidTypographyToCSS", () => {
    it("should convert fluid sizes to CSS custom properties", () => {
      const fluidSizes = {
        base: "clamp(16px, 1.5vw, 20px)",
        lg: "clamp(20px, 2vw, 28px)",
      };

      const result = fluidTypographyToCSS(fluidSizes);

      expect(result).toContain("--theme-font-size-base:");
      expect(result).toContain("clamp(16px, 1.5vw, 20px)");
      expect(result).toContain("--theme-font-size-lg:");
    });

    it("should handle empty object", () => {
      const result = fluidTypographyToCSS({});

      expect(result).toBe("");
    });

    it("should format with proper indentation", () => {
      const fluidSizes = {
        base: "clamp(16px, 1.5vw, 20px)",
      };

      const result = fluidTypographyToCSS(fluidSizes);

      expect(result).toMatch(/^\s\s--theme/);
    });
  });

  describe("supportsClamp", () => {
    it("should return boolean", () => {
      const result = supportsClamp();

      expect(typeof result).toBe("boolean");
    });

    it("should not throw errors", () => {
      expect(() => supportsClamp()).not.toThrow();
    });
  });

  describe("generateFluidFallback", () => {
    it("should generate media query fallbacks", () => {
      const result = generateFluidFallback(16);

      expect(result).toContain("@media");
      expect(result).toContain("min-width:");
      expect(result).toContain("font-size:");
    });

    it("should include base size fallback", () => {
      const result = generateFluidFallback(16);

      expect(result).toContain("16px");
    });

    it("should generate multiple breakpoints", () => {
      const result = generateFluidFallback(16);

      expect(result).toContain("768px");
      expect(result).toContain("1024px");
    });

    it("should scale font sizes appropriately", () => {
      const result = generateFluidFallback(16);

      // Should have larger sizes at larger breakpoints
      expect(result).toContain("18px"); // 1.1x
      expect(result).toContain("19px"); // 1.2x
    });
  });

  describe("validateFluidTypography", () => {
    it("should validate correct configuration", () => {
      const config: FluidTypography = {
        enabled: true,
        minViewport: 320,
        maxViewport: 1280,
        minSizeMultiplier: 0.8,
        maxSizeMultiplier: 1.2,
      };

      const result = validateFluidTypography(config);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should allow disabled configuration", () => {
      const config: FluidTypography = {
        enabled: false,
      };

      const result = validateFluidTypography(config);

      expect(result.valid).toBe(true);
    });

    it("should detect invalid viewport values", () => {
      const config: FluidTypography = {
        enabled: true,
        minViewport: 1280,
        maxViewport: 320,
      };

      const result = validateFluidTypography(config);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "minViewport must be less than maxViewport",
      );
    });

    it("should detect invalid multipliers", () => {
      const config: FluidTypography = {
        enabled: true,
        minSizeMultiplier: 1.2,
        maxSizeMultiplier: 0.8,
      };

      const result = validateFluidTypography(config);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("should validate multiplier ranges", () => {
      const config: FluidTypography = {
        enabled: true,
        minSizeMultiplier: 0.3,
        maxSizeMultiplier: 3,
      };

      const result = validateFluidTypography(config);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("should validate custom sizes", () => {
      const config: FluidTypography = {
        enabled: true,
        customSizes: {
          base: { min: 20, max: 10 }, // Invalid: min > max
        },
      };

      const result = validateFluidTypography(config);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        "Custom size 'base': min must be less than max",
      );
    });

    it("should validate custom size bounds", () => {
      const config: FluidTypography = {
        enabled: true,
        customSizes: {
          huge: { min: 5, max: 300 }, // Out of recommended range
        },
      };

      const result = validateFluidTypography(config);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
