/**
 * Audit Command Router
 * Routes audit subcommands to appropriate handlers
 *
 * @module @spexop/cli/commands/audit
 */

import pc from "picocolors";
import { auditAccessibility } from "./a11y.js";

export interface AuditOptions {
  level?: "AA" | "AAA";
  format?: "console" | "json" | "html" | "markdown";
  output?: string;
  strict?: boolean;
  fix?: boolean;
  preset?: string;
}

/**
 * Main audit command router
 *
 * @param subcommand - Audit type (a11y, tokens, colors, etc.)
 * @param paths - File paths to audit
 * @param options - Audit options
 */
export async function auditCommand(
  subcommand: string,
  paths: string[],
  options: AuditOptions,
): Promise<void> {
  switch (subcommand) {
    case "a11y":
    case "accessibility":
      return await auditAccessibility(paths, options);

    default:
      console.error(pc.red(`✗ Unknown audit type: ${subcommand}`));
      console.log(pc.dim("\n Available audit types:"));
      console.log(
        pc.cyan("   • a11y") +
          pc.dim(" - Accessibility audit (WCAG compliance)"),
      );
      console.log(pc.dim("   • tokens - Token validation (coming soon)"));
      console.log(pc.dim("   • colors - Color palette analysis (coming soon)"));
      console.log(pc.dim("   • perf - Performance checks (coming soon)"));
      console.log(
        pc.dim("\n Example: ") +
          pc.white("spexop audit a11y ./src/theme.config.ts"),
      );
      process.exit(1);
  }
}
