/**
 * Markdown Formatter for Accessibility Audit
 * Documentation-ready output
 *
 * @module @spexop/cli/commands/audit/formatters/markdown
 */

import * as fs from "node:fs";
import * as path from "node:path";
import pc from "picocolors";
import type { AuditResult } from "../a11y.js";

/**
 * Generate Markdown report from audit results
 *
 * @param results - Array of audit results
 * @param outputPath - Optional output file path
 */
export function generateMarkdownReport(
  results: AuditResult[],
  outputPath?: string,
): void {
  let markdown = "# Accessibility Audit Report\n\n";
  markdown += `Generated: ${new Date().toLocaleString()}\n\n`;

  // Summary
  markdown += "## Summary\n\n";
  markdown += `- Total Themes: ${results.length}\n`;
  markdown += `- Passed: ${results.filter((r) => r.audit.passed).length}\n`;
  markdown += `- Failed: ${results.filter((r) => !r.audit.passed).length}\n`;
  markdown += `- Average Score: ${Math.round(results.reduce((sum, r) => sum + r.report.score, 0) / results.length)}/100\n\n`;

  // Individual theme reports
  for (const result of results) {
    markdown += `## ${result.themeName}\n\n`;
    markdown += `- **File**: \`${result.filePath}\`\n`;
    markdown += `- **Score**: ${result.report.score}/100\n`;
    markdown += `- **WCAG Level**: ${result.audit.level}\n`;
    markdown += `- **Pass Rate**: ${result.audit.passRate}%\n`;
    markdown += `- **Status**: ${result.audit.passed ? "✅ Passed" : "❌ Failed"}\n\n`;

    markdown += "### Test Results\n\n";
    markdown += `- ✓ Passed: ${result.audit.summary.passed}\n`;
    markdown += `- ✗ Failed: ${result.audit.summary.failed}\n`;
    markdown += `- ⚠ Warnings: ${result.audit.summary.warnings}\n\n`;

    if (result.audit.issues.length > 0) {
      markdown += "### Issues\n\n";

      const errors = result.audit.issues.filter((i) => i.severity === "error");
      const warnings = result.audit.issues.filter(
        (i) => i.severity === "warning",
      );

      if (errors.length > 0) {
        markdown += "#### Critical Errors\n\n";
        for (const issue of errors) {
          markdown += `- **${issue.message}**\n`;
          markdown += `  - Field: \`${issue.field}\`\n`;
          if (issue.wcagCriterion) {
            markdown += `  - WCAG: ${issue.wcagCriterion}\n`;
          }
          if (issue.recommendation) {
            markdown += `  - Fix: ${issue.recommendation}\n`;
          }
          markdown += "\n";
        }
      }

      if (warnings.length > 0) {
        markdown += "#### Warnings\n\n";
        for (const issue of warnings) {
          markdown += `- ${issue.message}\n`;
          markdown += `  - Field: \`${issue.field}\`\n`;
          if (issue.recommendation) {
            markdown += `  - Fix: ${issue.recommendation}\n`;
          }
          markdown += "\n";
        }
      }
    } else {
      markdown += "### No Issues Found ✅\n\n";
    }

    markdown += "---\n\n";
  }

  // Resources
  markdown += "## Resources\n\n";
  markdown +=
    "- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)\n";
  markdown += "- [Spexop Documentation](https://spexop.com/docs)\n";

  if (outputPath) {
    const fullPath = path.resolve(process.cwd(), outputPath);
    fs.writeFileSync(fullPath, markdown, "utf-8");
    console.log(pc.green(`\n✓ Markdown report saved to: ${fullPath}`));
  } else {
    console.log(markdown);
  }
}
