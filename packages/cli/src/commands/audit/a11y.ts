/**
 * Accessibility Audit Command
 * Audits theme files for WCAG compliance
 *
 * @module @spexop/cli/commands/audit/a11y
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { SpexopThemeConfig } from "@spexop/theme";
import pc from "picocolors";
import { printConsoleReport } from "./formatters/console.js";
import { generateHTMLReport } from "./formatters/html.js";
import { generateJSONReport } from "./formatters/json.js";
import { generateMarkdownReport } from "./formatters/markdown.js";
import type { AuditOptions } from "./index.js";

/**
 * Audit result for a single theme
 */
export interface AuditResult {
  themeName: string;
  filePath: string;
  audit: {
    passed: boolean;
    level: "AA" | "AAA";
    issues: Array<{
      category: string;
      severity: string;
      message: string;
      field: string;
      currentValue?: string | number;
      recommendation?: string;
      wcagCriterion?: string;
    }>;
    passRate: number;
    summary: {
      totalChecks: number;
      passed: number;
      failed: number;
      warnings: number;
    };
  };
  report: {
    title: string;
    summary: string;
    score: number;
    level: "AA" | "AAA";
    sections: Array<{
      title: string;
      items: Array<{
        status: "pass" | "fail" | "warning";
        description: string;
        details?: string;
      }>;
    }>;
  };
}

/**
 * Load theme from file
 */
async function loadTheme(filePath: string): Promise<unknown> {
  const fullPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Theme file not found: ${filePath}`);
  }

  // For now, assume the theme file exports a default theme config
  // In a real implementation, we'd use dynamic import
  const content = fs.readFileSync(fullPath, "utf-8");

  // Try to parse as JSON first
  if (fullPath.endsWith(".json")) {
    return JSON.parse(content);
  }

  // For TypeScript/JavaScript files, we need to evaluate them
  // This is a simplified implementation
  throw new Error(
    "TypeScript/JavaScript theme loading requires build-time compilation. Please use JSON themes for now, or use the preset option: --preset tech",
  );
}

/**
 * Load a preset theme
 */
async function loadPreset(presetName: string): Promise<SpexopThemeConfig> {
  // Dynamic import of the preset
  try {
    const { getPreset } = await import("@spexop/theme");
    // Type assertion for preset name - getPreset accepts specific preset names
    const theme = getPreset(
      presetName as
        | "tech"
        | "minimal"
        | "dark"
        | "finance"
        | "healthcare"
        | "ecommerce"
        | "education"
        | "corporate"
        | "agency"
        | "vibrant"
        | "pastel"
        | "startup",
    );
    if (!theme) {
      throw new Error(`Preset '${presetName}' not found`);
    }
    return theme;
  } catch (error) {
    throw new Error(
      `Failed to load preset '${presetName}': ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Main accessibility audit command
 */
export async function auditAccessibility(
  paths: string[],
  options: AuditOptions,
): Promise<void> {
  const level = options.level || "AAA";
  const format = options.format || "console";
  const showFixes = options.fix || false;
  const strict = options.strict || false;

  console.log(pc.bold(pc.cyan("\n🔍 Spexop Accessibility Audit")));
  console.log(pc.dim("─".repeat(60)));

  const results: AuditResult[] = [];

  try {
    // Load accessibility utilities
    const { auditThemeAccessibility, generateAccessibilityReport } =
      await import("@spexop/theme");

    // If preset specified, audit preset(s)
    if (options.preset) {
      console.log(pc.dim(`\nAuditing preset: ${options.preset}`));
      const theme = await loadPreset(options.preset);

      const audit = auditThemeAccessibility(theme, level);
      const report = generateAccessibilityReport(theme);

      results.push({
        themeName: theme.meta?.name || options.preset,
        filePath: `preset:${options.preset}`,
        audit,
        report,
      });
    }
    // Otherwise audit file paths
    else if (paths.length > 0) {
      for (const filePath of paths) {
        console.log(pc.dim(`\nAuditing: ${filePath}`));

        try {
          const theme = (await loadTheme(filePath)) as SpexopThemeConfig;
          const audit = auditThemeAccessibility(theme, level);
          const report = generateAccessibilityReport(theme);

          results.push({
            themeName: theme.meta?.name || path.basename(filePath),
            filePath,
            audit,
            report,
          });
        } catch (error) {
          console.error(
            pc.red(`✗ Failed to audit ${filePath}:`),
            error instanceof Error ? error.message : String(error),
          );
        }
      }
    } else {
      console.error(pc.red("\n✗ No theme files or preset specified\n"));
      console.log(pc.dim("Usage:"));
      console.log(pc.white("  spexop audit a11y <theme-file>"));
      console.log(pc.white("  spexop audit a11y --preset tech"));
      console.log(pc.dim("\nOptions:"));
      console.log(
        pc.cyan("  -l, --level <level>") +
          pc.dim("     WCAG level (AA or AAA, default: AAA)"),
      );
      console.log(
        pc.cyan("  -f, --format <format>") +
          pc.dim("   Output format (console, json, html, markdown)"),
      );
      console.log(
        pc.cyan("  -p, --preset <name>") +
          pc.dim("     Audit a built-in preset theme"),
      );
      console.log(
        pc.cyan("  --fix") + pc.dim("                    Show fix suggestions"),
      );
      console.log(
        pc.cyan("  -s, --strict") +
          pc.dim("             Exit with code 1 if issues found (for CI/CD)"),
      );
      process.exit(1);
    }

    // Format and output results
    switch (format) {
      case "json":
        generateJSONReport(results, options.output);
        break;
      case "html":
        generateHTMLReport(results, options.output);
        break;
      case "markdown":
        generateMarkdownReport(results, options.output);
        break;
      default:
        printConsoleReport(results, showFixes);
    }

    // Exit code for CI/CD
    const hasErrors = results.some((r) => !r.audit.passed);
    if (strict && hasErrors) {
      console.log(pc.red("\n✗ Audit failed with errors (strict mode enabled)"));
      process.exit(1);
    }
  } catch (error) {
    console.error(
      pc.red("\n✗ Audit failed:"),
      error instanceof Error ? error.message : String(error),
    );
    process.exit(1);
  }
}
