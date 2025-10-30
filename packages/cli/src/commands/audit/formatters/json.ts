/**
 * JSON Formatter for Accessibility Audit
 * Machine-readable output for CI/CD integration
 *
 * @module @spexop/cli/commands/audit/formatters/json
 */

import * as fs from "node:fs";
import * as path from "node:path";
import pc from "picocolors";
import type { AuditResult } from "../a11y.js";

/**
 * Generate JSON report from audit results
 *
 * @param results - Array of audit results
 * @param outputPath - Optional output file path
 */
export function generateJSONReport(
  results: AuditResult[],
  outputPath?: string,
): void {
  const report = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    summary: {
      totalThemes: results.length,
      passed: results.filter((r) => r.audit.passed).length,
      failed: results.filter((r) => !r.audit.passed).length,
      averageScore: Math.round(
        results.reduce((sum, r) => sum + r.report.score, 0) / results.length,
      ),
    },
    themes: results.map((r) => ({
      name: r.themeName,
      file: r.filePath,
      score: r.report.score,
      level: r.audit.level,
      passed: r.audit.passed,
      passRate: r.audit.passRate,
      summary: r.audit.summary,
      issues: r.audit.issues,
    })),
  };

  const json = JSON.stringify(report, null, 2);

  if (outputPath) {
    const fullPath = path.resolve(process.cwd(), outputPath);
    fs.writeFileSync(fullPath, json, "utf-8");
    console.log(pc.green(`\n✓ JSON report saved to: ${fullPath}`));
  } else {
    console.log(json);
  }
}
