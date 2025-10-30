/**
 * HTML Formatter for Accessibility Audit
 * Rich interactive report with visualizations
 *
 * @module @spexop/cli/commands/audit/formatters/html
 */

import * as fs from "node:fs";
import * as path from "node:path";
import pc from "picocolors";
import type { AuditResult } from "../a11y.js";

/**
 * Generate HTML report from audit results
 *
 * @param results - Array of audit results
 * @param outputPath - Optional output file path
 */
export function generateHTMLReport(
  results: AuditResult[],
  outputPath?: string,
): void {
  const avgScore = Math.round(
    results.reduce((sum, r) => sum + r.report.score, 0) / results.length,
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Audit Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #f9fafb;
      padding: 2rem;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    header {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    h1 { color: #0ea5e9; margin-bottom: 0.5rem; }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .summary-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .summary-card h3 { font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem; }
    .summary-card .value { font-size: 2rem; font-weight: bold; }
    .theme-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    .theme-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e5e7eb;
    }
    .score {
      font-size: 3rem;
      font-weight: bold;
      color: #10b981;
    }
    .score.warning { color: #f59e0b; }
    .score.error { color: #ef4444; }
    .issue {
      padding: 1rem;
      margin-bottom: 0.5rem;
      border-radius: 6px;
      border-left: 4px solid;
    }
    .issue.error { background: #fef2f2; border-color: #ef4444; }
    .issue.warning { background: #fffbeb; border-color: #f59e0b; }
    .issue-title { font-weight: 600; margin-bottom: 0.5rem; }
    .issue-meta { font-size: 0.875rem; color: #6b7280; }
    .fix-suggestion {
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: #eff6ff;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .badge.success { background: #d1fae5; color: #065f46; }
    .badge.error { background: #fee2e2; color: #991b1b; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔍 Accessibility Audit Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
    </header>

    <div class="summary">
      <div class="summary-card">
        <h3>Total Themes</h3>
        <div class="value">${results.length}</div>
      </div>
      <div class="summary-card">
        <h3>Average Score</h3>
        <div class="value ${avgScore >= 90 ? "" : avgScore >= 70 ? "warning" : "error"}">${avgScore}/100</div>
      </div>
      <div class="summary-card">
        <h3>Passed</h3>
        <div class="value" style="color: #10b981">${results.filter((r) => r.audit.passed).length}</div>
      </div>
      <div class="summary-card">
        <h3>Failed</h3>
        <div class="value" style="color: #ef4444">${results.filter((r) => !r.audit.passed).length}</div>
      </div>
    </div>

    ${results
      .map(
        (result) => `
    <div class="theme-card">
      <div class="theme-header">
        <div>
          <h2>${result.themeName}</h2>
          <p style="color: #6b7280; font-size: 0.875rem;">${result.filePath}</p>
        </div>
        <div class="score ${result.report.score >= 90 ? "" : result.report.score >= 70 ? "warning" : "error"}">
          ${result.report.score}
          <span style="font-size: 1.5rem; color: #6b7280;">/100</span>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
        <div>
          <span class="badge ${result.audit.passed ? "success" : "error"}">
            WCAG ${result.audit.level}: ${result.audit.passed ? "Passed" : "Failed"}
          </span>
        </div>
        <div style="color: #6b7280;">
          ✓ ${result.audit.summary.passed} passed
          ✗ ${result.audit.summary.failed} failed
          ⚠ ${result.audit.summary.warnings} warnings
        </div>
      </div>

      ${
        result.audit.issues.length > 0
          ? `
        <h3 style="margin-bottom: 1rem;">Issues Found</h3>
        ${result.audit.issues
          .map(
            (issue) => `
          <div class="issue ${issue.severity}">
            <div class="issue-title">${issue.severity === "error" ? "✗" : "⚠"} ${issue.message}</div>
            <div class="issue-meta">
              Field: <code>${issue.field}</code>
              ${issue.wcagCriterion ? ` • WCAG: ${issue.wcagCriterion}` : ""}
            </div>
            ${
              issue.recommendation
                ? `
              <div class="fix-suggestion">
                💡 ${issue.recommendation}
              </div>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")}
      `
          : `
        <div style="text-align: center; padding: 2rem; color: #10b981;">
          <h3>✅ No Accessibility Issues Found!</h3>
        </div>
      `
      }
    </div>
    `,
      )
      .join("")}

    <footer style="text-align: center; color: #6b7280; margin-top: 3rem;">
      <p>Learn more: <a href="https://www.w3.org/WAI/WCAG21/quickref/" style="color: #0ea5e9;">WCAG 2.1 Guidelines</a></p>
      <p style="margin-top: 0.5rem;">Powered by <a href="https://spexop.com" style="color: #0ea5e9;">Spexop</a></p>
    </footer>
  </div>
</body>
</html>`;

  if (outputPath) {
    const fullPath = path.resolve(process.cwd(), outputPath);
    fs.writeFileSync(fullPath, html, "utf-8");
    console.log(pc.green(`\n✓ HTML report saved to: ${fullPath}`));
    console.log(pc.dim(`   Open in browser: file://${fullPath}`));
  } else {
    console.log(html);
  }
}
