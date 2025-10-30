/**
 * Tokens Command
 * Generate interactive HTML documentation for design tokens
 *
 * @module @spexop/cli/commands/tokens
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { SpexopThemeConfig } from "@spexop/theme";
import pc from "picocolors";
import { generateTokenDocumentation } from "./tokens/generator.js";

export interface TokensOptions {
  output?: string;
  theme?: string;
  contrast?: boolean;
  open?: boolean;
}

/**
 * Load theme from preset name or file path
 */
async function loadTheme(
  presetName?: string,
  themePath?: string,
): Promise<{ theme: SpexopThemeConfig; name: string }> {
  // If custom theme path provided
  if (themePath) {
    try {
      const fullPath = path.resolve(process.cwd(), themePath);

      if (!fs.existsSync(fullPath)) {
        throw new Error(`Theme file not found: ${themePath}`);
      }

      // Dynamic import for ESM/CJS compatibility
      const themeModule = await import(fullPath);
      const theme = themeModule.default || themeModule;

      return {
        theme,
        name:
          theme.meta?.name || path.basename(themePath, path.extname(themePath)),
      };
    } catch (error) {
      console.error(pc.red(`✗ Failed to load theme from ${themePath}`));
      throw error;
    }
  }

  // Load from preset
  try {
    // Dynamic import @spexop/theme
    const themePackage = await import("@spexop/theme");

    if (!presetName || presetName === "default") {
      return {
        theme: themePackage.defaultTheme,
        name: "Default Theme",
      };
    }

    // Try to load preset by name
    const presetKey = `${presetName}Preset`;
    const themeMap = themePackage as unknown as Record<
      string,
      SpexopThemeConfig
    >;

    if (themeMap[presetKey]) {
      return {
        theme: themeMap[presetKey],
        name: themeMap[presetKey].meta?.name || presetName,
      };
    }

    // Try direct preset name
    if (themeMap[presetName]) {
      return {
        theme: themeMap[presetName],
        name: themeMap[presetName].meta?.name || presetName,
      };
    }

    throw new Error(`Unknown preset: ${presetName}`);
  } catch (error) {
    console.error(pc.red(`✗ Failed to load preset: ${presetName}`));
    console.log(pc.dim("\n Available presets:"));
    console.log(pc.cyan("   • tech") + pc.dim(" - Modern tech theme"));
    console.log(pc.cyan("   • minimal") + pc.dim(" - Clean minimal theme"));
    console.log(pc.cyan("   • dark") + pc.dim(" - Dark mode theme"));
    console.log(pc.cyan("   • startup") + pc.dim(" - Bold startup theme"));
    console.log(pc.cyan("   • healthcare") + pc.dim(" - Healthcare theme"));
    console.log(pc.cyan("   • finance") + pc.dim(" - Finance theme"));
    console.log(pc.cyan("   • ecommerce") + pc.dim(" - E-commerce theme"));
    console.log(pc.cyan("   • education") + pc.dim(" - Education theme"));
    console.log(pc.cyan("   • corporate") + pc.dim(" - Corporate theme"));
    console.log(pc.cyan("   • agency") + pc.dim(" - Creative agency theme"));
    console.log(pc.cyan("   • vibrant") + pc.dim(" - Vibrant theme"));
    console.log(pc.cyan("   • pastel") + pc.dim(" - Pastel theme"));
    throw error;
  }
}

/**
 * Tokens command handler
 */
export async function tokensCommand(
  preset: string | undefined,
  options: TokensOptions,
): Promise<void> {
  console.log(pc.cyan("\n📚 Generating Token Documentation...\n"));

  try {
    // Load theme
    const { theme, name } = await loadTheme(preset, options.theme);
    console.log(pc.green(`✓ Loaded theme: ${name}`));

    // Generate documentation
    const html = generateTokenDocumentation(theme, {
      themeName: name,
      includeContrast: options.contrast !== false,
    });
    console.log(pc.green("✓ Generated documentation"));

    // Write to file
    const outputPath = path.resolve(
      process.cwd(),
      options.output || "tokens-doc.html",
    );
    fs.writeFileSync(outputPath, html, "utf-8");
    console.log(pc.green(`✓ Saved to: ${outputPath}`));

    // Calculate file size
    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(pc.dim(`   Size: ${sizeKB} KB`));

    // Open in browser if requested
    if (options.open) {
      try {
        const { default: open } = await import("open");
        await open(outputPath);
        console.log(pc.green("✓ Opened in browser"));
      } catch (error) {
        console.log(pc.yellow("\n⚠  Could not open browser automatically"));
        console.log(pc.dim(`   Open manually: file://${outputPath}`));
      }
    } else {
      console.log(pc.dim(`\n   Open in browser: file://${outputPath}`));
    }

    console.log(pc.green("\n✓ Token documentation generated successfully!\n"));
  } catch (error) {
    console.error(pc.red("\n✗ Failed to generate token documentation"));
    if (error instanceof Error) {
      console.error(pc.dim(`   ${error.message}`));
    }
    process.exit(1);
  }
}
