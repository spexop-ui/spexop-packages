/**
 * HTML Template Generator
 * Generate interactive HTML documentation template
 *
 * @module @spexop/cli/commands/tokens/template
 */

import type {
  BorderToken,
  ColorToken,
  ComponentToken,
  ShadowToken,
  SpacingToken,
  TypographyToken,
} from "./extractor.js";
import type { ContrastPair } from "./generator.js";

export interface TemplateData {
  themeName: string;
  themeVersion: string;
  themeDescription: string;
  colors: Array<ColorToken & { rgb?: string; hsl?: string }>;
  spacing: SpacingToken[];
  typography: TypographyToken[];
  borders: BorderToken[];
  shadows: ShadowToken[];
  buttons: ComponentToken[];
  forms: ComponentToken[];
  cards: ComponentToken[];
  navigation: ComponentToken[];
  modals: ComponentToken[];
  contrastMatrix: ContrastPair[];
  includeContrast: boolean;
}

/**
 * Generate table of contents
 */
function generateTableOfContents(data: TemplateData): string {
  const sections = [];

  if (data.colors.length > 0)
    sections.push({
      id: "colors-section",
      label: "Colors",
      icon: "🎨",
      count: data.colors.length,
    });
  if (data.spacing.length > 0)
    sections.push({
      id: "spacing-section",
      label: "Spacing",
      icon: "📏",
      count: data.spacing.length,
    });
  if (data.typography.length > 0)
    sections.push({
      id: "typography-section",
      label: "Typography",
      icon: "📝",
      count: data.typography.length,
    });
  if (data.borders.length > 0)
    sections.push({
      id: "borders-section",
      label: "Borders",
      icon: "📦",
      count: data.borders.length,
    });
  if (data.shadows.length > 0)
    sections.push({
      id: "shadows-section",
      label: "Shadows",
      icon: "💎",
      count: data.shadows.length,
    });
  if (data.buttons.length > 0)
    sections.push({
      id: "buttons-section",
      label: "Buttons",
      icon: "🔘",
      count: data.buttons.length,
    });
  if (data.forms.length > 0)
    sections.push({
      id: "forms-section",
      label: "Forms",
      icon: "📝",
      count: data.forms.length,
    });
  if (data.cards.length > 0)
    sections.push({
      id: "cards-section",
      label: "Cards",
      icon: "🃏",
      count: data.cards.length,
    });
  if (data.navigation.length > 0)
    sections.push({
      id: "navigation-section",
      label: "Navigation",
      icon: "🧭",
      count: data.navigation.length,
    });
  if (data.modals.length > 0)
    sections.push({
      id: "modals-section",
      label: "Modals",
      icon: "🪟",
      count: data.modals.length,
    });
  if (data.includeContrast && data.contrastMatrix.length > 0)
    sections.push({
      id: "contrast-section",
      label: "Contrast",
      icon: "♿",
      count: data.contrastMatrix.length,
    });

  return `
    <nav class="toc">
      <div class="toc-header">Contents</div>
      <ul class="toc-list">
        ${sections
          .map(
            (section) => `
          <li>
            <a href="#${section.id}" class="toc-link">
              <span>${section.icon} ${section.label}</span>
              <span class="toc-count">${section.count}</span>
            </a>
          </li>
        `,
          )
          .join("")}
      </ul>
    </nav>
  `;
}

/**
 * Generate visual button previews
 */
function generateButtonPreviews(buttons: ComponentToken[]): string {
  if (buttons.length === 0) return "";

  const grouped: Record<
    string,
    {
      background: string;
      text: string;
      border: string;
      backgroundHover: string;
      textHover: string;
      borderHover: string;
    }
  > = {};

  for (const token of buttons) {
    if (!grouped[token.variant]) {
      grouped[token.variant] = {
        background: "#cccccc",
        text: "#000000",
        border: "#cccccc",
        backgroundHover: "#bbbbbb",
        textHover: "#000000",
        borderHover: "#bbbbbb",
      };
    }

    const resolved = token.resolvedValue || token.value;

    if (token.state === "default") {
      if (token.property === "background")
        grouped[token.variant].background = resolved;
      if (token.property === "text") grouped[token.variant].text = resolved;
      if (token.property === "border") grouped[token.variant].border = resolved;
    } else if (token.state === "hover") {
      if (token.property === "background")
        grouped[token.variant].backgroundHover = resolved;
      if (token.property === "text")
        grouped[token.variant].textHover = resolved;
      if (token.property === "border")
        grouped[token.variant].borderHover = resolved;
    }
  }

  return `
    <div class="button-previews">
      <h3 class="preview-title">Visual Preview</h3>
      <div class="button-preview-grid">
        ${Object.entries(grouped)
          .map(
            ([variant, styles]) => `
          <div class="button-preview-card">
            <div class="button-preview-label">${variant}</div>
            <button class="preview-button" 
              style="
                background: ${styles.background};
                color: ${styles.text};
                border: 2px solid ${styles.border};
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                font-family: inherit;
                font-size: 0.9375rem;
              "
              onmouseover="this.style.background='${styles.backgroundHover}'; this.style.color='${styles.textHover}'; this.style.borderColor='${styles.borderHover}';"
              onmouseout="this.style.background='${styles.background}'; this.style.color='${styles.text}'; this.style.borderColor='${styles.border}';"
            >
              ${variant.charAt(0).toUpperCase() + variant.slice(1)} Button
            </button>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}

/**
 * Generate color tokens section HTML
 */
function generateColorsSection(colors: TemplateData["colors"]): string {
  if (colors.length === 0) return "";

  return `
    <section class="token-section" id="colors-section">
      <h2 class="section-title">
        <span class="section-icon">🎨</span>
        Colors
        <span class="token-count">${colors.length} tokens</span>
      </h2>
      <div class="color-grid">
        ${colors
          .map(
            (color) => `
          <div class="color-card" data-token="color">
            <div class="color-swatch" style="background-color: ${color.value}"></div>
            <div class="color-info">
              <div class="token-name" data-copy="${color.value}">${color.name}</div>
              <div class="token-value">
                <code class="copyable" data-copy="${color.value}">${color.value}</code>
              </div>
              ${
                color.rgb
                  ? `<div class="token-value-alt"><code class="copyable" data-copy="${color.rgb}">${color.rgb}</code></div>`
                  : ""
              }
              ${
                color.hsl
                  ? `<div class="token-value-alt"><code class="copyable" data-copy="${color.hsl}">${color.hsl}</code></div>`
                  : ""
              }
              <div class="code-example">
                <code class="copyable" data-copy="var(--theme-color-${color.name})">var(--theme-color-${color.name})</code>
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>
  `;
}

/**
 * Generate spacing tokens section HTML
 */
function generateSpacingSection(spacing: SpacingToken[]): string {
  if (spacing.length === 0) return "";

  return `
    <section class="token-section" id="spacing-section">
      <h2 class="section-title">
        <span class="section-icon">📏</span>
        Spacing
        <span class="token-count">${spacing.length} tokens</span>
      </h2>
      <div class="spacing-list">
        ${spacing
          .map(
            (space) => `
          <div class="spacing-item" data-token="spacing">
            <div class="spacing-label">
              <span class="token-name">${space.name}</span>
              <code class="copyable" data-copy="${space.value}">${space.value}</code>
            </div>
            <div class="spacing-visual">
              <div class="spacing-bar" style="width: ${space.pixels}px"></div>
              <span class="spacing-pixels">${space.pixels}px</span>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>
  `;
}

/**
 * Generate typography section HTML
 */
function generateTypographySection(typography: TypographyToken[]): string {
  if (typography.length === 0) return "";

  const families = typography.filter((t) => t.category === "family");
  const sizes = typography.filter((t) => t.category === "size");
  const weights = typography.filter((t) => t.category === "weight");
  const lineHeights = typography.filter((t) => t.category === "lineHeight");

  return `
    <section class="token-section" id="typography-section">
      <h2 class="section-title">
        <span class="section-icon">📝</span>
        Typography
        <span class="token-count">${typography.length} tokens</span>
      </h2>

      ${
        families.length > 0
          ? `
        <div class="typo-category">
          <h3 class="category-title">Font Families</h3>
          <div class="typo-list">
            ${families
              .map(
                (font) => `
              <div class="typo-item" data-token="typography">
                <div class="token-name">${font.name}</div>
                <div class="typo-sample" style="font-family: ${font.value}">
                  The quick brown fox jumps over the lazy dog
                </div>
                <code class="copyable" data-copy="${font.value}">${font.value}</code>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }

      ${
        sizes.length > 0
          ? `
        <div class="typo-category">
          <h3 class="category-title">Font Sizes</h3>
          <div class="typo-list">
            ${sizes
              .map(
                (size) => `
              <div class="typo-item" data-token="typography">
                <div class="token-name">${size.name}</div>
                <div class="typo-sample" style="font-size: ${size.value}">
                  Sample Text
                </div>
                <code class="copyable" data-copy="${size.value}">${size.value}</code>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }

      ${
        weights.length > 0
          ? `
        <div class="typo-category">
          <h3 class="category-title">Font Weights</h3>
          <div class="typo-list">
            ${weights
              .map(
                (weight) => `
              <div class="typo-item" data-token="typography">
                <div class="token-name">${weight.name}</div>
                <div class="typo-sample" style="font-weight: ${weight.value}">
                  The quick brown fox
                </div>
                <code class="copyable" data-copy="${weight.value}">${weight.value}</code>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }

      ${
        lineHeights.length > 0
          ? `
        <div class="typo-category">
          <h3 class="category-title">Line Heights</h3>
          <div class="typo-list">
            ${lineHeights
              .map(
                (lh) => `
              <div class="typo-item" data-token="typography">
                <div class="token-name">${lh.name}</div>
                <div class="typo-sample" style="line-height: ${lh.value}">
                  This is sample text<br>with multiple lines<br>to show line height
                </div>
                <code class="copyable" data-copy="${lh.value}">${lh.value}</code>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }
    </section>
  `;
}

/**
 * Generate border tokens section HTML
 */
function generateBordersSection(borders: BorderToken[]): string {
  if (borders.length === 0) return "";

  const widths = borders.filter((b) => b.type === "width");
  const radii = borders.filter((b) => b.type === "radius");
  const styles = borders.filter((b) => b.type === "style");

  return `
    <section class="token-section" id="borders-section">
      <h2 class="section-title">
        <span class="section-icon">📦</span>
        Borders
        <span class="token-count">${borders.length} tokens</span>
      </h2>

      ${
        widths.length > 0
          ? `
        <div class="border-category">
          <h3 class="category-title">Border Widths</h3>
          <div class="border-list">
            ${widths
              .map(
                (border) => `
              <div class="border-item" data-token="border">
                <div class="token-name">${border.name}</div>
                <div class="border-visual">
                  <div class="border-sample" style="border-top: ${border.value} solid var(--border-color)"></div>
                  <code class="copyable" data-copy="${border.value}">${border.value}</code>
                </div>
                ${border.description ? `<div class="token-description">${border.description}</div>` : ""}
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }

      ${
        radii.length > 0
          ? `
        <div class="border-category">
          <h3 class="category-title">Border Radius</h3>
          <div class="border-list">
            ${radii
              .map(
                (border) => `
              <div class="border-item" data-token="border">
                <div class="token-name">${border.name}</div>
                <div class="border-visual">
                  <div class="radius-sample" style="border-radius: ${border.value}; border: 2px solid var(--border-color); width: 100px; height: 60px;"></div>
                  <code class="copyable" data-copy="${border.value}">${border.value}</code>
                </div>
                ${border.description ? `<div class="token-description">${border.description}</div>` : ""}
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }
    </section>
  `;
}

/**
 * Generate shadow tokens section HTML
 */
function generateShadowsSection(shadows: ShadowToken[]): string {
  if (shadows.length === 0) return "";

  return `
    <section class="token-section" id="shadows-section">
      <h2 class="section-title">
        <span class="section-icon">💎</span>
        Shadows
        <span class="token-count">${shadows.length} tokens</span>
      </h2>
      <div class="shadow-list">
        ${shadows
          .map(
            (shadow) => `
          <div class="shadow-item" data-token="shadow">
            <div class="token-name">${shadow.name}</div>
            <div class="shadow-visual">
              <div class="shadow-sample" style="box-shadow: ${shadow.value}"></div>
            </div>
            <code class="copyable" data-copy="${shadow.value}">${shadow.value}</code>
            ${shadow.description ? `<div class="token-description">${shadow.description}</div>` : ""}
          </div>
        `,
          )
          .join("")}
      </div>
    </section>
  `;
}

/**
 * Generate component tokens section HTML
 */
function generateComponentSection(
  title: string,
  icon: string,
  tokens: ComponentToken[],
  sectionId: string,
): string {
  if (tokens.length === 0) return "";

  // Group by variant
  const grouped = tokens.reduce(
    (acc, token) => {
      if (!acc[token.variant]) {
        acc[token.variant] = [];
      }
      acc[token.variant].push(token);
      return acc;
    },
    {} as Record<string, ComponentToken[]>,
  );

  // Add button previews if this is the buttons section
  const preview =
    sectionId === "buttons-section" ? generateButtonPreviews(tokens) : "";

  return `
    <section class="token-section" id="${sectionId}">
      <h2 class="section-title">
        <span class="section-icon">${icon}</span>
        ${title}
        <span class="token-count">${tokens.length} tokens</span>
      </h2>
      
      ${preview}

      ${Object.entries(grouped)
        .map(
          ([variant, variantTokens]) => `
        <details class="component-variant" open>
          <summary class="variant-title">${variant}</summary>
          <div class="component-tokens">
            ${variantTokens
              .map((token) => {
                const displayValue = token.resolvedValue || token.value;
                const isColor =
                  token.isColorProperty &&
                  displayValue.match(/^#[0-9a-fA-F]{6}$/);

                return `
              <div class="component-token" data-token="component">
                <span class="token-label">${token.state !== "default" ? `${token.state}.` : ""}${token.property}:</span>
                <div class="token-value-container">
                  ${isColor ? `<span class="token-color-swatch" style="background-color: ${displayValue}"></span>` : ""}
                  <code class="copyable primary-value" data-copy="${displayValue}">${displayValue}</code>
                  ${token.value !== displayValue && token.value.startsWith("{") ? `<code class="token-reference copyable" data-copy="${token.value}">${token.value}</code>` : ""}
                </div>
              </div>
            `;
              })
              .join("")}
          </div>
        </details>
      `,
        )
        .join("")}
    </section>
  `;
}

/**
 * Generate contrast matrix section HTML
 */
function generateContrastSection(contrastMatrix: ContrastPair[]): string {
  if (contrastMatrix.length === 0) return "";

  // Get top 20 best and worst contrasts
  const sorted = [...contrastMatrix].sort((a, b) => b.ratio - a.ratio);
  const best = sorted.slice(0, 20);
  const worst = sorted.slice(-20).reverse();

  return `
    <section class="token-section" id="contrast-section">
      <h2 class="section-title">
        <span class="section-icon">♿</span>
        Contrast Analysis
        <span class="token-count">${contrastMatrix.length} pairs</span>
      </h2>

      <div class="contrast-summary">
        <div class="summary-stat">
          <div class="stat-value">${contrastMatrix.filter((p) => p.aaa).length}</div>
          <div class="stat-label">AAA Compliant</div>
        </div>
        <div class="summary-stat">
          <div class="stat-value">${contrastMatrix.filter((p) => p.aa && !p.aaa).length}</div>
          <div class="stat-label">AA Compliant</div>
        </div>
        <div class="summary-stat">
          <div class="stat-value">${contrastMatrix.filter((p) => !p.aa).length}</div>
          <div class="stat-label">Below AA</div>
        </div>
      </div>

      <div class="contrast-lists">
        <div class="contrast-column">
          <h3 class="contrast-subtitle">Best Contrast Ratios</h3>
          ${best
            .map(
              (pair) => `
            <div class="contrast-pair ${pair.aaa ? "aaa" : pair.aa ? "aa" : "fail"}">
              <div class="pair-colors">
                <span class="color-dot" style="background: ${pair.foreground}"></span>
                <span class="pair-arrow">→</span>
                <span class="color-dot" style="background: ${pair.background}"></span>
              </div>
              <div class="pair-info">
                <span class="pair-ratio">${pair.ratio}:1</span>
                <span class="pair-badge ${pair.aaa ? "aaa" : pair.aa ? "aa" : "fail"}">
                  ${pair.aaa ? "AAA" : pair.aa ? "AA" : "FAIL"}
                </span>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>

        <div class="contrast-column">
          <h3 class="contrast-subtitle">Worst Contrast Ratios</h3>
          ${worst
            .map(
              (pair) => `
            <div class="contrast-pair ${pair.aaa ? "aaa" : pair.aa ? "aa" : "fail"}">
              <div class="pair-colors">
                <span class="color-dot" style="background: ${pair.foreground}"></span>
                <span class="pair-arrow">→</span>
                <span class="color-dot" style="background: ${pair.background}"></span>
              </div>
              <div class="pair-info">
                <span class="pair-ratio">${pair.ratio}:1</span>
                <span class="pair-badge ${pair.aaa ? "aaa" : pair.aa ? "aa" : "fail"}">
                  ${pair.aaa ? "AAA" : pair.aa ? "AA" : "FAIL"}
                </span>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

/**
 * Generate complete HTML template
 */
export function generateHTMLTemplate(data: TemplateData): string {
  const totalTokens =
    data.colors.length +
    data.spacing.length +
    data.typography.length +
    data.borders.length +
    data.shadows.length +
    data.buttons.length +
    data.forms.length +
    data.cards.length +
    data.navigation.length +
    data.modals.length;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.themeName} - Token Documentation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    :root {
      --bg-primary: #ffffff;
      --bg-secondary: #f9fafb;
      --bg-tertiary: #f3f4f6;
      --text-primary: #111827;
      --text-secondary: #6b7280;
      --border-color: #e5e7eb;
      --accent-color: #3b82f6;
      --success-color: #10b981;
      --warning-color: #f59e0b;
      --danger-color: #ef4444;
    }

    [data-theme="dark"] {
      --bg-primary: #0f172a;
      --bg-secondary: #1e293b;
      --bg-tertiary: #334155;
      --text-primary: #f1f5f9;
      --text-secondary: #cbd5e1;
      --border-color: #334155;
      --accent-color: #60a5fa;
      --success-color: #34d399;
      --warning-color: #fbbf24;
      --danger-color: #f87171;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: var(--text-primary);
      background: var(--bg-secondary);
      transition: background 0.3s, color 0.3s;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem 2rem 2rem 280px;
    }

    /* Sticky Table of Contents */
    .toc {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: 260px;
      background: var(--bg-primary);
      border-right: 2px solid var(--border-color);
      padding: 2rem 1.5rem;
      overflow-y: auto;
      z-index: 50;
      transition: all 0.3s;
    }

    .toc-header {
      font-size: 0.875rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--text-secondary);
      margin-bottom: 1rem;
      letter-spacing: 0.05em;
    }

    .toc-list {
      list-style: none;
    }

    .toc-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.625rem 0.75rem;
      margin-bottom: 0.25rem;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .toc-link:hover {
      background: var(--bg-secondary);
      color: var(--accent-color);
      padding-left: 1rem;
    }

    .toc-link.active {
      background: var(--accent-color);
      color: white;
      font-weight: 600;
    }

    .toc-count {
      font-size: 0.75rem;
      background: var(--bg-tertiary);
      padding: 0.125rem 0.5rem;
      border-radius: 999px;
      font-weight: 600;
    }

    .toc-link.active .toc-count {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .mobile-menu-btn {
      display: none;
      position: fixed;
      top: 1.5rem;
      left: 1.5rem;
      width: 48px;
      height: 48px;
      background: var(--bg-primary);
      border: 2px solid var(--border-color);
      border-radius: 10px;
      cursor: pointer;
      z-index: 60;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    .menu-line {
      width: 20px;
      height: 2px;
      background: var(--text-primary);
      border-radius: 2px;
      transition: all 0.3s;
    }

    .mobile-menu-btn.open .menu-line:nth-child(1) {
      transform: rotate(45deg) translateY(6px);
    }

    .mobile-menu-btn.open .menu-line:nth-child(2) {
      opacity: 0;
    }

    .mobile-menu-btn.open .menu-line:nth-child(3) {
      transform: rotate(-45deg) translateY(-6px);
    }

    header {
      background: var(--bg-primary);
      padding: 2rem;
      border-radius: 12px;
      border: 2px solid var(--border-color);
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .header-meta {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .header-meta span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .stat-card {
      padding: 1rem;
      background: var(--bg-tertiary);
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--accent-color);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-top: 0.25rem;
    }

    .controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .search-box {
      flex: 1;
      min-width: 300px;
      padding: 0.75rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      font-size: 1rem;
      background: var(--bg-primary);
    }

    .search-box:focus {
      outline: none;
      border-color: var(--accent-color);
    }

    .filter-group {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-primary);
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.2s;
    }

    .filter-btn:hover {
      border-color: var(--accent-color);
      color: var(--accent-color);
    }

    .filter-btn.active {
      background: var(--accent-color);
      color: white;
      border-color: var(--accent-color);
    }

    .token-section {
      background: var(--bg-primary);
      padding: 2rem;
      border-radius: 12px;
      border: 2px solid var(--border-color);
      margin-bottom: 2rem;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--border-color);
    }

    .section-icon {
      font-size: 2rem;
    }

    .token-count {
      margin-left: auto;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-secondary);
      background: var(--bg-tertiary);
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .color-card {
      border: 2px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.2s;
    }

    .color-card:hover {
      transform: translateY(-2px);
      border-color: var(--accent-color);
    }

    .color-swatch {
      height: 120px;
      border-bottom: 2px solid var(--border-color);
    }

    .color-info {
      padding: 1rem;
      background: var(--bg-secondary);
    }

    .token-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }

    .token-name:hover {
      color: var(--accent-color);
    }

    .token-value {
      margin-bottom: 0.25rem;
    }

    .token-value-alt {
      font-size: 0.75rem;
    }

    .code-example {
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--border-color);
    }

    .code-example code {
      font-size: 0.75rem;
      color: var(--accent-color);
      background: var(--bg-tertiary);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      display: inline-block;
    }

    code {
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .copyable {
      cursor: pointer;
      padding: 0.125rem 0.25rem;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .copyable:hover {
      background: var(--bg-tertiary);
      color: var(--accent-color);
    }

    .primary-value {
      font-weight: 600;
      background: var(--bg-secondary);
    }

    .spacing-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .spacing-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }

    .spacing-label {
      display: flex;
      align-items: center;
      gap: 1rem;
      min-width: 200px;
    }

    .spacing-visual {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .spacing-bar {
      height: 24px;
      background: var(--accent-color);
      border-radius: 4px;
      transition: width 0.3s;
    }

    .spacing-pixels {
      font-size: 0.875rem;
      color: var(--text-secondary);
      min-width: 50px;
    }

    .typo-category {
      margin-bottom: 2rem;
    }

    .typo-category:last-child {
      margin-bottom: 0;
    }

    .category-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-secondary);
    }

    .typo-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .typo-item {
      padding: 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }

    .typo-sample {
      margin: 0.75rem 0;
      padding: 1rem;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
    }

    .border-category {
      margin-bottom: 2rem;
    }

    .border-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .border-item {
      padding: 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
    }

    .border-visual {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .border-sample {
      width: 100%;
      height: 3px;
      max-width: 200px;
    }

    .radius-sample {
      background: var(--bg-tertiary);
    }

    .shadow-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .shadow-item {
      padding: 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
    }

    .shadow-visual {
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      padding: 2rem;
      background: var(--bg-tertiary);
      border-radius: 4px;
    }

    .shadow-sample {
      width: 80px;
      height: 80px;
      background: var(--bg-primary);
      border-radius: 4px;
    }

    .token-description {
      font-size: 0.75rem;
      color: var(--text-secondary);
      margin-top: 0.5rem;
    }

    .button-previews {
      background: var(--bg-secondary);
      padding: 2rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border: 2px solid var(--border-color);
    }

    .preview-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .button-preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .button-preview-card {
      text-align: center;
      padding: 1rem;
      background: var(--bg-primary);
      border-radius: 8px;
    }

    .button-preview-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 1rem;
      text-transform: capitalize;
    }

    .component-variant {
      margin-bottom: 1.75rem;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-secondary);
    }

    .component-variant[open] {
      border-color: var(--accent-color);
    }

    .variant-title {
      font-size: 1.125rem;
      font-weight: 700;
      text-transform: capitalize;
      padding: 1rem 1.25rem;
      cursor: pointer;
      background: var(--bg-tertiary);
      color: var(--text-primary);
      transition: all 0.2s;
      user-select: none;
      list-style: none;
    }

    .variant-title:hover {
      background: var(--accent-hover);
      color: white;
    }

    .variant-title::marker {
      content: "";
    }

    .component-variant[open] .variant-title {
      border-bottom: 2px solid var(--border-color);
    }

    .component-tokens {
      padding: 1.25rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 0.75rem;
    }

    .component-token {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.75rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
    }

    .token-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-secondary);
      min-width: 120px;
    }

    .token-value-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
      flex-wrap: wrap;
    }

    .token-color-swatch {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      border: 2px solid var(--border-color);
      flex-shrink: 0;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .token-reference {
      font-size: 0.75rem;
      color: var(--text-secondary);
      background: var(--bg-tertiary);
      padding: 0.125rem 0.375rem;
      border-radius: 3px;
      font-family: monospace;
    }

    .contrast-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .summary-stat {
      padding: 1.5rem;
      text-align: center;
      background: var(--bg-secondary);
      border: 2px solid var(--border-color);
      border-radius: 8px;
    }

    .contrast-lists {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .contrast-column {
      flex: 1;
    }

    .contrast-subtitle {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .contrast-pair {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }

    .contrast-pair.aaa {
      border-left: 4px solid var(--success-color);
    }

    .contrast-pair.aa {
      border-left: 4px solid var(--warning-color);
    }

    .contrast-pair.fail {
      border-left: 4px solid var(--danger-color);
    }

    .pair-colors {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .color-dot {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      border: 1px solid var(--border-color);
    }

    .pair-arrow {
      color: var(--text-secondary);
    }

    .pair-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .pair-ratio {
      font-weight: 600;
      font-family: monospace;
    }

    .pair-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .pair-badge.aaa {
      background: var(--success-color);
      color: white;
    }

    .pair-badge.aa {
      background: var(--warning-color);
      color: white;
    }

    .pair-badge.fail {
      background: var(--danger-color);
      color: white;
    }

    .toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 1rem 1.5rem;
      background: var(--text-primary);
      color: white;
      border-radius: 8px;
      font-weight: 600;
      opacity: 0;
      transform: translateY(1rem);
      transition: all 0.3s;
      pointer-events: none;
      z-index: 1000;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    .theme-toggle {
      position: fixed;
      top: 2rem;
      right: 2rem;
      width: 48px;
      height: 48px;
      border: 2px solid var(--border-color);
      border-radius: 12px;
      background: var(--bg-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      transition: all 0.3s;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 100;
    }

    .theme-toggle:hover {
      border-color: var(--accent-color);
      transform: scale(1.05);
    }

    .theme-toggle:active {
      transform: scale(0.95);
    }

    footer {
      text-align: center;
      padding: 2rem;
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    footer a {
      color: var(--accent-color);
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 1024px) {
      .container {
        padding: 1.5rem;
      }

      .toc {
        transform: translateX(-100%);
      }

      .toc.open {
        transform: translateX(0);
        box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
      }

      .mobile-menu-btn {
        display: flex !important;
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }

      h1 {
        font-size: 1.75rem;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .color-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }

      .contrast-lists {
        grid-template-columns: 1fr;
      }

      .theme-toggle {
        top: 1rem;
        right: 1rem;
        width: 44px;
        height: 44px;
      }

      .component-tokens {
        grid-template-columns: 1fr;
      }

      .button-preview-grid {
        grid-template-columns: 1fr;
      }

      .spacing-item {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    html {
      scroll-behavior: smooth;
    }

    ::selection {
      background: var(--accent-color);
      color: white;
    }
  </style>
</head>
<body>
  ${generateTableOfContents(data)}

  <button class="mobile-menu-btn" id="mobile-menu" aria-label="Toggle menu">
    <span class="menu-line"></span>
    <span class="menu-line"></span>
    <span class="menu-line"></span>
  </button>

  <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
    <span id="theme-icon">🌙</span>
  </button>

  <div class="container">
    <header>
      <h1>${data.themeName}</h1>
      <div class="header-meta">
        <span>📦 Version ${data.themeVersion}</span>
        <span>📅 ${new Date().toLocaleDateString()}</span>
      </div>
      ${data.themeDescription ? `<p style="margin-top: 1rem; color: var(--text-secondary);">${data.themeDescription}</p>` : ""}
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${totalTokens}</div>
          <div class="stat-label">Total Tokens</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${data.colors.length}</div>
          <div class="stat-label">Color Tokens</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${data.spacing.length}</div>
          <div class="stat-label">Spacing Tokens</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${data.typography.length}</div>
          <div class="stat-label">Typography Tokens</div>
        </div>
      </div>
    </header>

    <div class="controls">
      <input type="text" class="search-box" id="search-input" placeholder="Search tokens...">
      <div class="filter-group">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="color">Colors</button>
        <button class="filter-btn" data-filter="spacing">Spacing</button>
        <button class="filter-btn" data-filter="typography">Typography</button>
        <button class="filter-btn" data-filter="border">Borders</button>
        <button class="filter-btn" data-filter="shadow">Shadows</button>
        <button class="filter-btn" data-filter="component">Components</button>
      </div>
    </div>

    ${generateColorsSection(data.colors)}
    ${generateSpacingSection(data.spacing)}
    ${generateTypographySection(data.typography)}
    ${generateBordersSection(data.borders)}
    ${generateShadowsSection(data.shadows)}
    ${generateComponentSection("Buttons", "🔘", data.buttons, "buttons-section")}
    ${generateComponentSection("Forms", "📝", data.forms, "forms-section")}
    ${generateComponentSection("Cards", "🃏", data.cards, "cards-section")}
    ${generateComponentSection("Navigation", "🧭", data.navigation, "navigation-section")}
    ${generateComponentSection("Modals", "🪟", data.modals, "modals-section")}
    ${data.includeContrast ? generateContrastSection(data.contrastMatrix) : ""}

    <footer>
      <p>Generated with <a href="https://spexop.com" target="_blank">Spexop CLI</a></p>
      <p style="margin-top: 0.5rem;">Learn more: <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank">WCAG 2.1 Guidelines</a></p>
    </footer>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('docs-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    if (initialTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      themeIcon.textContent = '☀️';
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.body.setAttribute('data-theme', newTheme);
      themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('docs-theme', newTheme);
      
      showToast(\`Switched to \${newTheme} mode\`);
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const toc = document.querySelector('.toc');
    
    mobileMenuBtn?.addEventListener('click', () => {
      toc.classList.toggle('open');
      mobileMenuBtn.classList.toggle('open');
    });

    // Close mobile menu when clicking links
    document.querySelectorAll('.toc-link').forEach(link => {
      link.addEventListener('click', () => {
        toc.classList.remove('open');
        mobileMenuBtn.classList.remove('open');
      });
    });

    // Active section tracking with Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

    document.querySelectorAll('.token-section').forEach(section => {
      observer.observe(section);
    });

    // Copy to clipboard functionality
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(\`Copied: \${text}\`);
      });
    }

    // Show toast notification
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    }

    // Add click listeners to copyable elements
    document.querySelectorAll('.copyable').forEach(el => {
      el.addEventListener('click', () => {
        const text = el.getAttribute('data-copy') || el.textContent;
        copyToClipboard(text);
      });
    });

    // Add click listeners to token names
    document.querySelectorAll('.token-name').forEach(el => {
      el.addEventListener('click', () => {
        const text = el.getAttribute('data-copy') || el.textContent;
        copyToClipboard(text);
      });
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const sections = document.querySelectorAll('.token-section');
      
      sections.forEach(section => {
        const tokens = section.querySelectorAll('[data-token]');
        let visibleCount = 0;
        
        tokens.forEach(token => {
          const text = token.textContent.toLowerCase();
          if (text.includes(query)) {
            token.style.display = '';
            visibleCount++;
          } else {
            token.style.display = 'none';
          }
        });
        
        section.style.display = visibleCount > 0 ? '' : 'none';
      });
    });

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        const sections = document.querySelectorAll('.token-section');
        
        if (filter === 'all') {
          sections.forEach(s => s.style.display = '');
        } else {
          sections.forEach(section => {
            const tokens = section.querySelectorAll(\`[data-token="\${filter}"]\`);
            section.style.display = tokens.length > 0 ? '' : 'none';
          });
        }
      });
    });

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  </script>
</body>
</html>`;
}
