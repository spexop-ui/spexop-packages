/**
 * Token Extractor - Enhanced Version
 * Extract and organize ALL tokens from a theme configuration
 *
 * @module @spexop/cli/commands/tokens/extractor
 */

import type { SpexopThemeConfig } from "@spexop/theme";

export interface ColorToken {
  name: string;
  value: string;
  rgb?: string;
  hsl?: string;
  description?: string;
}

export interface SpacingToken {
  name: string;
  value: string;
  pixels: number;
}

export interface TypographyToken {
  name: string;
  value: string;
  category: "family" | "size" | "weight" | "lineHeight";
  description?: string;
}

export interface BorderToken {
  name: string;
  value: string;
  type: "width" | "radius" | "style";
  description?: string;
}

export interface ShadowToken {
  name: string;
  value: string;
  description?: string;
}

export interface ComponentToken {
  variant: string;
  state: string;
  property: string;
  value: string;
  resolvedValue?: string;
  isColorProperty?: boolean;
}

export interface ExtractedTokens {
  colors: ColorToken[];
  spacing: SpacingToken[];
  typography: TypographyToken[];
  borders: BorderToken[];
  shadows: ShadowToken[];
  buttons: ComponentToken[];
  forms: ComponentToken[];
  cards: ComponentToken[];
  navigation: ComponentToken[];
  modals: ComponentToken[];
}

/**
 * Extract value from W3C token
 */
function extractValue(token: unknown): string {
  if (typeof token === "string") return token;
  if (typeof token === "number") return token.toString();
  if (token && typeof token === "object" && "$value" in token) {
    const value = token.$value;
    return typeof value === "string" || typeof value === "number"
      ? String(value)
      : "";
  }
  return "";
}

/**
 * Extract description from W3C token
 */
function extractDescription(token: unknown): string | undefined {
  if (token && typeof token === "object" && "$description" in token) {
    return String(token.$description);
  }
  return undefined;
}

/**
 * Extract color tokens from theme
 */
function extractColors(theme: SpexopThemeConfig): ColorToken[] {
  const colors: ColorToken[] = [];

  if (!theme.colors) return colors;

  const colorEntries = Object.entries(theme.colors);

  for (const [key, token] of colorEntries) {
    const value = extractValue(token);
    if (value) {
      colors.push({
        name: key,
        value,
        description: extractDescription(token),
      });
    }
  }

  return colors;
}

/**
 * Extract spacing tokens from theme (handles both scale arrays and named tokens)
 */
function extractSpacing(theme: SpexopThemeConfig): SpacingToken[] {
  const spacing: SpacingToken[] = [];

  if (!theme.spacing) return spacing;

  const spacingEntries = Object.entries(theme.spacing);

  for (const [key, tokenOrArray] of spacingEntries) {
    // Handle scale arrays
    if (key === "scale" && Array.isArray(tokenOrArray)) {
      tokenOrArray.forEach((token, index) => {
        const value = extractValue(token);
        if (value) {
          const match = value.match(/^(\d+)px$/);
          const pixels = match ? Number.parseInt(match[1], 10) : 0;

          spacing.push({
            name: `scale-${index}`,
            value,
            pixels,
          });
        }
      });
    } else {
      // Handle named tokens
      const value = extractValue(tokenOrArray);
      if (value) {
        const match = value.match(/^(\d+)px$/);
        const pixels = match ? Number.parseInt(match[1], 10) : 0;

        spacing.push({
          name: key,
          value,
          pixels,
        });
      }
    }
  }

  return spacing;
}

/**
 * Extract typography tokens from theme (handles nested structures)
 */
function extractTypography(theme: SpexopThemeConfig): TypographyToken[] {
  const typography: TypographyToken[] = [];

  if (!theme.typography) return typography;

  const typoEntries = Object.entries(theme.typography);

  for (const [key, tokenOrGroup] of typoEntries) {
    // Check if it's a nested group (sizes, weights, line-heights)
    if (
      typeof tokenOrGroup === "object" &&
      tokenOrGroup &&
      !("$value" in tokenOrGroup)
    ) {
      // Nested group
      const groupEntries = Object.entries(tokenOrGroup);

      for (const [subKey, token] of groupEntries) {
        const value = extractValue(token);
        if (!value) continue;

        let category: TypographyToken["category"] = "size";

        if (key === "sizes" || key.includes("size")) {
          category = "size";
        } else if (key === "weights" || key.includes("weight")) {
          category = "weight";
        } else if (key === "line-heights" || key.includes("line-height")) {
          category = "lineHeight";
        } else if (key.includes("family")) {
          category = "family";
        }

        typography.push({
          name: `${key}.${subKey}`,
          value,
          category,
          description: extractDescription(token),
        });
      }
    } else {
      // Single token
      const value = extractValue(tokenOrGroup);
      if (!value) continue;

      let category: TypographyToken["category"] = "size";

      if (key.includes("font-family") || key.includes("family")) {
        category = "family";
      } else if (key.includes("weight")) {
        category = "weight";
      } else if (key.includes("line-height")) {
        category = "lineHeight";
      }

      typography.push({
        name: key,
        value,
        category,
        description: extractDescription(tokenOrGroup),
      });
    }
  }

  return typography;
}

/**
 * Extract border tokens from theme
 */
function extractBorders(theme: SpexopThemeConfig): BorderToken[] {
  const borders: BorderToken[] = [];

  if (!theme.borders) return borders;

  const borderEntries = Object.entries(theme.borders);

  for (const [key, token] of borderEntries) {
    const value = extractValue(token);
    if (!value) continue;

    let type: BorderToken["type"] = "width";

    if (key.includes("radius")) {
      type = "radius";
    } else if (key.includes("style")) {
      type = "style";
    }

    borders.push({
      name: key,
      value,
      type,
      description: extractDescription(token),
    });
  }

  return borders;
}

/**
 * Extract shadow tokens from theme
 */
function extractShadows(theme: SpexopThemeConfig): ShadowToken[] {
  const shadows: ShadowToken[] = [];

  if (!theme.shadows) return shadows;

  const shadowEntries = Object.entries(theme.shadows);

  for (const [key, token] of shadowEntries) {
    const value = extractValue(token);
    if (!value) continue;

    shadows.push({
      name: key,
      value,
      description: extractDescription(token),
    });
  }

  return shadows;
}

/**
 * Extract button tokens from theme
 */
function extractButtons(theme: SpexopThemeConfig): ComponentToken[] {
  const buttons: ComponentToken[] = [];

  if (!theme.buttons) return buttons;

  const variantEntries = Object.entries(theme.buttons);

  for (const [variantName, variantTokens] of variantEntries) {
    if (typeof variantTokens !== "object" || !variantTokens) continue;

    const propertyEntries = Object.entries(variantTokens);

    for (const [propertyKey, token] of propertyEntries) {
      const value = extractValue(token);
      if (!value) continue;

      let state = "default";
      let property = propertyKey;

      if (propertyKey.includes("-hover")) {
        state = "hover";
        property = propertyKey.replace("-hover", "");
      } else if (propertyKey.includes("-active")) {
        state = "active";
        property = propertyKey.replace("-active", "");
      } else if (propertyKey.includes("-disabled")) {
        state = "disabled";
        property = propertyKey.replace("-disabled", "");
      }

      buttons.push({
        variant: variantName,
        state,
        property,
        value,
      });
    }
  }

  return buttons;
}

/**
 * Extract form tokens from theme
 */
function extractForms(theme: SpexopThemeConfig): ComponentToken[] {
  const forms: ComponentToken[] = [];

  if (!theme.forms) return forms;

  const elementEntries = Object.entries(theme.forms);

  for (const [elementName, elementTokens] of elementEntries) {
    if (typeof elementTokens !== "object" || !elementTokens) continue;

    const propertyEntries = Object.entries(elementTokens);

    for (const [propertyKey, token] of propertyEntries) {
      const value = extractValue(token);
      if (!value) continue;

      let state = "default";
      let property = propertyKey;

      if (propertyKey.includes("-focus")) {
        state = "focus";
        property = propertyKey.replace("-focus", "");
      } else if (propertyKey.includes("-error")) {
        state = "error";
        property = propertyKey.replace("-error", "");
      } else if (propertyKey.includes("-disabled")) {
        state = "disabled";
        property = propertyKey.replace("-disabled", "");
      }

      forms.push({
        variant: elementName,
        state,
        property,
        value,
      });
    }
  }

  return forms;
}

/**
 * Extract card tokens from theme
 */
function extractCards(theme: SpexopThemeConfig): ComponentToken[] {
  const cards: ComponentToken[] = [];

  if (!theme.cards) return cards;

  const cardEntries = Object.entries(theme.cards);

  for (const [key, tokenOrGroup] of cardEntries) {
    if (
      typeof tokenOrGroup === "object" &&
      tokenOrGroup &&
      !("$value" in tokenOrGroup)
    ) {
      const propertyEntries = Object.entries(tokenOrGroup);

      for (const [propertyKey, token] of propertyEntries) {
        const value = extractValue(token);
        if (!value) continue;

        cards.push({
          variant: key,
          state: "default",
          property: propertyKey,
          value,
        });
      }
    } else {
      const value = extractValue(tokenOrGroup);
      if (!value) continue;

      cards.push({
        variant: "default",
        state: "default",
        property: key,
        value,
      });
    }
  }

  return cards;
}

/**
 * Extract navigation tokens from theme
 */
function extractNavigation(theme: SpexopThemeConfig): ComponentToken[] {
  const navigation: ComponentToken[] = [];

  if (!theme.navigation) return navigation;

  const navEntries = Object.entries(theme.navigation);

  for (const [key, token] of navEntries) {
    const value = extractValue(token);
    if (!value) continue;

    const state = key.includes("hover")
      ? "hover"
      : key.includes("active")
        ? "active"
        : "default";
    const property = key;

    navigation.push({
      variant: "navigation",
      state,
      property,
      value,
    });
  }

  return navigation;
}

/**
 * Extract modal tokens from theme
 */
function extractModals(theme: SpexopThemeConfig): ComponentToken[] {
  const modals: ComponentToken[] = [];

  if (!theme.modals) return modals;

  const modalEntries = Object.entries(theme.modals);

  for (const [key, token] of modalEntries) {
    const value = extractValue(token);
    if (!value) continue;

    modals.push({
      variant: "modal",
      state: "default",
      property: key,
      value,
    });
  }

  return modals;
}

/**
 * Extract all tokens from theme configuration
 */
export function extractTokens(theme: SpexopThemeConfig): ExtractedTokens {
  return {
    colors: extractColors(theme),
    spacing: extractSpacing(theme),
    typography: extractTypography(theme),
    borders: extractBorders(theme),
    shadows: extractShadows(theme),
    buttons: extractButtons(theme),
    forms: extractForms(theme),
    cards: extractCards(theme),
    navigation: extractNavigation(theme),
    modals: extractModals(theme),
  };
}
