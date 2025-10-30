/**
 * Console Formatter for Accessibility Audit
 * Beautiful colored output with emojis and formatting
 *
 * @module @spexop/cli/commands/audit/formatters/console
 */

import pc from "picocolors";
import type { AuditResult } from "../a11y.js";

/**
 * Print audit results to console with colors and formatting
 *
 * @param results - Array of audit results
 * @param showFixes - Whether to show fix suggestions
 */
export function printConsoleReport(
  results: AuditResult[],
  showFixes: boolean,
): void {
  console.log(pc.dim(`\n${"=".repeat(60)}`));

  for (const { themeName, filePath, audit, report } of results) {
    console.log(pc.bold(pc.cyan(`\n📋 ${report.title}`)));
    console.log(pc.dim(`   File: ${filePath}`));
    console.log(pc.dim("─".repeat(60)));

    // Score with color
    const scoreColor =
      report.score >= 90 ? "green" : report.score >= 70 ? "yellow" : "red";
    console.log(pc.bold(pc[scoreColor](`\n   Score: ${report.score}/100`)));
    console.log(pc.dim(`   Level: WCAG ${audit.level}`));
    console.log(pc.dim(`   Pass Rate: ${audit.passRate}%`));

    // Summary
    console.log(pc.green(`\n   ✓ Passed: ${audit.summary.passed}`));
    console.log(pc.red(`   ✗ Failed: ${audit.summary.failed}`));
    console.log(pc.yellow(`   ⚠ Warnings: ${audit.summary.warnings}`));

    // Overall result
    if (audit.passed) {
      console.log(
        pc.bold(
          pc.green(`\n   ✅ Theme passes WCAG ${audit.level} standards!`),
        ),
      );
    } else {
      console.log(
        pc.bold(
          pc.red(
            `\n   ❌ Theme has ${audit.issues.filter((i) => i.severity === "error").length} critical issues`,
          ),
        ),
      );
    }

    // Issues
    if (audit.issues.length > 0) {
      console.log(pc.bold("\n   🚨 Issues Found:"));

      // Group by severity
      const errors = audit.issues.filter((i) => i.severity === "error");
      const warnings = audit.issues.filter((i) => i.severity === "warning");

      if (errors.length > 0) {
        console.log(
          pc.bold(pc.red(`\n   Critical Errors (${errors.length}):`)),
        );
        for (const issue of errors) {
          console.log(pc.red(`   ✗ ${issue.message}`));
          console.log(pc.dim(`     Field: ${issue.field}`));

          if (issue.wcagCriterion) {
            console.log(pc.dim(`     WCAG: ${issue.wcagCriterion}`));
          }

          if (showFixes && issue.recommendation) {
            console.log(pc.blue(`     💡 Fix: ${issue.recommendation}`));
          }
          console.log();
        }
      }

      if (warnings.length > 0) {
        console.log(pc.bold(pc.yellow(`   Warnings (${warnings.length}):`)));
        for (const issue of warnings.slice(0, 10)) {
          // Limit to 10
          console.log(pc.yellow(`   ⚠ ${issue.message}`));
          console.log(pc.dim(`     Field: ${issue.field}`));

          if (showFixes && issue.recommendation) {
            console.log(pc.blue(`     💡 Fix: ${issue.recommendation}`));
          }
          console.log();
        }

        if (warnings.length > 10) {
          console.log(
            pc.dim(`   ... and ${warnings.length - 10} more warnings`),
          );
        }
      }
    } else {
      console.log(pc.bold(pc.green("\n   ✅ No accessibility issues found!")));
    }
  }

  // Summary for multiple themes
  if (results.length > 1) {
    console.log(pc.bold(pc.cyan("\n📊 Summary Across All Themes:")));
    console.log(pc.dim("─".repeat(60)));

    const avgScore = Math.round(
      results.reduce((sum, r) => sum + r.report.score, 0) / results.length,
    );
    const totalPassed = results.filter((r) => r.audit.passed).length;

    console.log(pc.bold(`\n   Average Score: ${avgScore}/100`));
    console.log(
      `   ${totalPassed}/${results.length} themes passed WCAG standards`,
    );

    const best = results.reduce((a, b) =>
      a.report.score > b.report.score ? a : b,
    );
    const worst = results.reduce((a, b) =>
      a.report.score < b.report.score ? a : b,
    );

    console.log(
      pc.green(`\n   🏆 Best: ${best.themeName} (${best.report.score}/100)`),
    );
    console.log(
      pc.red(
        `   ⚡ Needs Work: ${worst.themeName} (${worst.report.score}/100)`,
      ),
    );
  }

  console.log(pc.dim(`\n${"=".repeat(60)}`));

  // Final tip
  if (showFixes) {
    console.log(
      pc.dim("\n💡 Tip: Use the suggestions above to improve accessibility"),
    );
  } else {
    console.log(
      pc.dim("\n💡 Tip: Add --fix flag to see detailed fix suggestions"),
    );
  }

  console.log(
    pc.dim("📖 Learn more: https://www.w3.org/WAI/WCAG21/quickref/\n"),
  );
}
