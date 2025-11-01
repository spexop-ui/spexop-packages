/**
 * Semantic Color Pair Detector
 * Automatically detects foreground/background color pairs from theme structure
 *
 * @module @spexop/theme/utils
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";
import { resolveToken } from "./tokenResolver.js";

/**
 * Semantic color pair with context
 */
export interface SemanticColorPair {
  /** Foreground color (resolved to actual color value) */
  foreground: string;
  /** Background color (resolved to actual color value) */
  background: string;
  /** Human-readable context describing where this pair is used */
  context: string;
  /** Path in theme config (e.g. "buttons.primary") */
  path: string;
}

/**
 * Detect semantic color pairs from theme structure
 * Automatically finds foreground/background combinations in:
 * - Buttons (all variants)
 * - Badges (all variants)
 * - Forms (input fields)
 * - Cards (all variants)
 *
 * @param theme - Theme configuration to analyze
 * @returns Array of detected color pairs with context
 *
 * @example
 * ```typescript
 * const pairs = detectSemanticPairs(myTheme);
 * // Returns pairs like:
 * // [
 * //   { foreground: "#ffffff", background: "#3b82f6", context: "Button variant: primary", path: "buttons.primary" },
 * //   { foreground: "#0f172a", background: "#ffffff", context: "Form input", path: "forms.input" },
 * //   ...
 * // ]
 * ```
 */
export function detectSemanticPairs(
  theme: SpexopThemeConfig,
): SemanticColorPair[] {
  const pairs: SemanticColorPair[] = [];

  try {
    // Auto-detect from buttons
    if (theme.buttons) {
      for (const [variant, style] of Object.entries(theme.buttons)) {
        if (
          style &&
          typeof style === "object" &&
          style.text &&
          style.background
        ) {
          try {
            const fg = resolveToken(style.text, theme);
            const bg = resolveToken(style.background, theme);

            // Only add if both resolved to actual values
            if (fg && bg && typeof fg === "string" && typeof bg === "string") {
              pairs.push({
                foreground: String(fg),
                background: String(bg),
                context: `Button variant: ${variant}`,
                path: `buttons.${variant}`,
              });
            }
          } catch (error) {
            // Skip this pair if resolution fails
          }
        }
      }
    }

    // Auto-detect from badges (if present in theme)
    const badges = (theme as { badges?: Record<string, unknown> }).badges;
    if (badges && typeof badges === "object") {
      for (const [variant, style] of Object.entries(badges)) {
        if (style && typeof style === "object") {
          const badgeStyle = style as {
            text?: unknown;
            background?: unknown;
          };

          if (badgeStyle.text && badgeStyle.background) {
            try {
              const fg = resolveToken(
                badgeStyle.text as string | number,
                theme,
              );
              const bg = resolveToken(
                badgeStyle.background as string | number,
                theme,
              );

              if (
                fg &&
                bg &&
                typeof fg === "string" &&
                typeof bg === "string"
              ) {
                pairs.push({
                  foreground: String(fg),
                  background: String(bg),
                  context: `Badge variant: ${variant}`,
                  path: `badges.${variant}`,
                });
              }
            } catch (error) {
              // Skip this pair if resolution fails
            }
          }
        }
      }
    }

    // Auto-detect from forms
    if (theme.forms?.input) {
      const input = theme.forms.input;
      if (input.text && input.background) {
        try {
          const fg = resolveToken(input.text, theme);
          const bg = resolveToken(input.background, theme);

          if (fg && bg && typeof fg === "string" && typeof bg === "string") {
            pairs.push({
              foreground: String(fg),
              background: String(bg),
              context: "Form input",
              path: "forms.input",
            });
          }
        } catch (error) {
          // Skip if resolution fails
        }
      }

      // Check placeholder text contrast
      if (input.placeholder && input.background) {
        try {
          const fg = resolveToken(input.placeholder, theme);
          const bg = resolveToken(input.background, theme);

          if (fg && bg && typeof fg === "string" && typeof bg === "string") {
            pairs.push({
              foreground: String(fg),
              background: String(bg),
              context: "Form input placeholder",
              path: "forms.input.placeholder",
            });
          }
        } catch (error) {
          // Skip if resolution fails
        }
      }
    }

    // Auto-detect from cards
    if (theme.cards) {
      for (const [variant, style] of Object.entries(theme.cards)) {
        if (style && typeof style === "object") {
          // Check if card has text and background
          const cardStyle = style as {
            text?: unknown;
            background?: unknown;
          };

          if (cardStyle.text && cardStyle.background) {
            try {
              const fg = resolveToken(cardStyle.text as string | number, theme);
              const bg = resolveToken(
                cardStyle.background as string | number,
                theme,
              );

              if (
                fg &&
                bg &&
                typeof fg === "string" &&
                typeof bg === "string"
              ) {
                pairs.push({
                  foreground: String(fg),
                  background: String(bg),
                  context: `Card variant: ${variant}`,
                  path: `cards.${variant}`,
                });
              }
            } catch (error) {
              // Skip this pair if resolution fails
            }
          }
        }
      }
    }
  } catch (error) {
    // If anything goes wrong, return what we have so far
    console.debug(
      "[Spexop] Error detecting semantic pairs:",
      error instanceof Error ? error.message : error,
    );
  }

  return pairs;
}

/**
 * Count total semantic pairs in a theme
 *
 * @param theme - Theme to analyze
 * @returns Number of detectable color pairs
 */
export function countSemanticPairs(theme: SpexopThemeConfig): number {
  return detectSemanticPairs(theme).length;
}

/**
 * Check if theme has semantic pairs to validate
 *
 * @param theme - Theme to check
 * @returns True if theme has detectable color pairs
 */
export function hasSemanticPairs(theme: SpexopThemeConfig): boolean {
  return countSemanticPairs(theme) > 0;
}
