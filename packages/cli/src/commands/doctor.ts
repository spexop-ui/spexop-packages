/**
 * spexop doctor - Validate setup and diagnose issues
 */

import * as p from "@clack/prompts";
import { Command } from "commander";
import pc from "picocolors";
import {
  fixMissingCSSImports,
  fixOutdatedDependencies,
  fixReactTypesMismatch,
  fixTypeScriptConfig,
} from "../utils/autofix.js";
import { checkCSSImports } from "../utils/checks/cssImports.js";
import { checkDependencies } from "../utils/checks/dependencies.js";
import { checkReactVersion } from "../utils/checks/reactVersion.js";
import { checkTypeScript } from "../utils/checks/typescript.js";
import { isSpexopProject } from "../utils/project.js";

interface DoctorCommandOptions {
  check?: string;
  fix?: boolean;
  verbose?: boolean;
  json?: boolean;
}

interface CheckSummary {
  total: number;
  passed: number;
  warnings: number;
  critical: number;
}

/**
 * Format check result icon
 */
function getStatusIcon(status: "pass" | "fail" | "warning"): string {
  switch (status) {
    case "pass":
      return pc.green("✅");
    case "fail":
      return pc.red("❌");
    case "warning":
      return pc.yellow("⚠️ ");
  }
}

/**
 * Run all checks
 */
async function runAllChecks() {
  const results = {
    reactVersion: await checkReactVersion(),
    cssImports: await checkCSSImports(),
    typescript: await checkTypeScript(),
    dependencies: await checkDependencies(),
  };

  return results;
}

/**
 * Calculate summary
 */
function calculateSummary(
  results: Awaited<ReturnType<typeof runAllChecks>>,
): CheckSummary {
  const checks = Object.values(results);
  return {
    total: checks.length,
    passed: checks.filter((c) => c.status === "pass").length,
    warnings: checks.filter((c) => c.status === "warning").length,
    critical: checks.filter((c) => c.status === "fail").length,
  };
}

/**
 * Display results in standard format
 */
function displayResults(
  results: Awaited<ReturnType<typeof runAllChecks>>,
  verbose: boolean,
) {
  console.log("\n🏥 Spexop Doctor - Checking your setup...\n");

  // React Version Check
  const { reactVersion } = results;
  console.log(
    `${getStatusIcon(reactVersion.status)} React Version: ${
      reactVersion.reactVersion
        ? `${reactVersion.reactVersion}${reactVersion.details.isStable ? " (Stable)" : " (Experimental)"}`
        : "Not found"
    }`,
  );

  if (reactVersion.reactTypesVersion) {
    const typesStatus = reactVersion.details.isCompatible ? "pass" : "fail";
    console.log(
      `${getStatusIcon(typesStatus)} React Types: ${reactVersion.reactTypesVersion}${reactVersion.details.isCompatible ? " (Match)" : " (Mismatch)"}`,
    );
  }

  // CSS Imports Check
  const { cssImports } = results;
  console.log(
    `${getStatusIcon(cssImports.status)} CSS Imports: ${
      cssImports.spexopCSSLoaded && cssImports.themeCSSLoaded
        ? "All loaded"
        : cssImports.spexopCSSLoaded
          ? "Spexop CSS only"
          : "Missing"
    }`,
  );

  // TypeScript Check
  const { typescript } = results;
  console.log(
    `${getStatusIcon(typescript.status)} TypeScript: ${
      typescript.configExists ? "Configured" : "Not found"
    }`,
  );

  // Dependencies Check
  const { dependencies } = results;
  const depsStatus = dependencies.spexopReact.installed
    ? dependencies.spexopReact.isLatest
      ? "Up-to-date"
      : "Outdated"
    : "Missing";
  console.log(
    `${getStatusIcon(dependencies.status)} Dependencies: ${depsStatus}`,
  );

  // Show issues
  const allIssues = [
    ...reactVersion.issues,
    ...cssImports.issues,
    ...typescript.issues,
    ...dependencies.issues,
  ];

  if (allIssues.length > 0) {
    console.log("");
    for (const issue of allIssues) {
      console.log(`  ${pc.red("•")} ${issue}`);
    }
  }

  // Summary
  const summary = calculateSummary(results);
  console.log("");

  if (summary.critical > 0) {
    console.log(
      pc.red(
        `❌ ${summary.critical} critical issue${summary.critical > 1 ? "s" : ""}`,
      ),
    );
  }

  if (summary.warnings > 0) {
    console.log(
      pc.yellow(
        `⚠️  ${summary.warnings} warning${summary.warnings > 1 ? "s" : ""}`,
      ),
    );
  }

  if (summary.critical === 0 && summary.warnings === 0) {
    console.log(pc.green("🎉 Your Spexop setup is healthy!"));
  } else {
    console.log("");
    console.log(pc.dim("Run 'npx spexop doctor --fix' to auto-fix issues"));
    console.log(pc.dim("Run 'npx spexop doctor --verbose' for details"));
  }

  console.log("");
}

/**
 * Display verbose results
 */
function displayVerboseResults(
  results: Awaited<ReturnType<typeof runAllChecks>>,
) {
  console.log("\n🏥 Spexop Doctor - Detailed diagnostics...\n");

  // React Version Check
  console.log("━".repeat(50));
  console.log("1. React Version Check");
  console.log("━".repeat(50));
  console.log("");

  const { reactVersion } = results;
  if (reactVersion.reactVersion) {
    console.log(`${pc.green("✅")} React: ${reactVersion.reactVersion}`);
    console.log(`   Location: ${reactVersion.details.reactLocation}`);
    console.log(
      `   Stability: ${reactVersion.details.isStable ? "Stable (recommended)" : "Experimental"}`,
    );
  } else {
    console.log(`${pc.red("❌")} React: Not installed`);
  }

  console.log("");

  if (reactVersion.reactTypesVersion) {
    const icon = reactVersion.details.isCompatible
      ? pc.green("✅")
      : pc.red("❌");
    console.log(`${icon} React Types: ${reactVersion.reactTypesVersion}`);
    console.log(`   Location: ${reactVersion.details.reactTypesLocation}`);

    if (!reactVersion.details.isCompatible) {
      console.log(
        `   ${pc.red("Issue:")} Version mismatch with React ${reactVersion.reactVersion}`,
      );
      console.log("");
      console.log(`   ${pc.cyan("🔧 Fix:")} ${reactVersion.fixes[0]}`);
      console.log("");
      console.log(
        `   ${pc.dim("Why:")} React ${reactVersion.reactVersion?.split(".")[0]} types are incompatible with different major versions`,
      );
      console.log(`   ${pc.dim("Impact:")} TypeScript errors in components`);
    }
  }

  // CSS Imports Check
  console.log("");
  console.log("━".repeat(50));
  console.log("2. CSS Imports Check");
  console.log("━".repeat(50));
  console.log("");

  const { cssImports } = results;
  if (cssImports.spexopCSSLoaded) {
    console.log(`${pc.green("✅")} @spexop/react CSS: Loaded`);
    console.log("   Path: @spexop/react/dist/index.css");
  } else {
    console.log(`${pc.red("❌")} @spexop/react CSS: Missing`);
  }

  console.log("");

  if (cssImports.themeCSSLoaded && cssImports.themeName) {
    console.log(
      `${pc.green("✅")} Theme CSS (${cssImports.themeName}): Loaded`,
    );
  } else {
    console.log(`${pc.yellow("⚠️ ")} Theme CSS: Missing`);
    console.log("");
    console.log(
      `   ${pc.cyan("🔧 Fix:")} ${cssImports.fixes.find((f) => f.includes("theme"))}`,
    );
    console.log("");
    console.log(`   ${pc.dim("Why:")} Components need theme CSS for styling`);
    console.log(`   ${pc.dim("Impact:")} UI will have no colors or spacing`);
  }

  if (cssImports.details.mainEntry) {
    console.log("");
    console.log(`   ${pc.dim("Imported in:")} ${cssImports.details.mainEntry}`);
  }

  // TypeScript Check
  console.log("");
  console.log("━".repeat(50));
  console.log("3. TypeScript Configuration Check");
  console.log("━".repeat(50));
  console.log("");

  const { typescript } = results;
  if (typescript.configExists) {
    console.log(`${pc.green("✅")} TypeScript Config: Found`);
    console.log(`   Location: ${typescript.details.configPath}`);

    if (typescript.jsxMode) {
      const jsxIcon =
        typescript.jsxMode === "react-jsx" || typescript.jsxMode === "react"
          ? pc.green("✅")
          : pc.yellow("⚠️ ");
      console.log(`${jsxIcon} JSX Mode: ${typescript.jsxMode}`);
    }

    if (typescript.moduleResolution) {
      const modResIcon =
        typescript.moduleResolution === "bundler" ||
        typescript.moduleResolution === "node16"
          ? pc.green("✅")
          : pc.yellow("⚠️ ");
      console.log(
        `${modResIcon} Module Resolution: ${typescript.moduleResolution}`,
      );
    }

    if (typescript.strictMode !== null) {
      const strictIcon = typescript.strictMode
        ? pc.green("✅")
        : pc.yellow("⚠️ ");
      console.log(
        `${strictIcon} Strict Mode: ${typescript.strictMode ? "Enabled" : "Disabled (recommended: enable)"}`,
      );
    }
  } else {
    console.log(`${pc.red("❌")} TypeScript Config: Not found`);
  }

  // Dependencies Check
  console.log("");
  console.log("━".repeat(50));
  console.log("4. Dependencies Check");
  console.log("━".repeat(50));
  console.log("");

  const { dependencies } = results;
  if (dependencies.spexopReact.installed) {
    const reactIcon = dependencies.spexopReact.isLatest
      ? pc.green("✅")
      : pc.yellow("⚠️ ");
    console.log(
      `${reactIcon} @spexop/react: ${dependencies.spexopReact.version}${dependencies.spexopReact.isLatest ? " (latest)" : ` (latest: ${dependencies.spexopReact.latest})`}`,
    );
  } else {
    console.log(`${pc.red("❌")} @spexop/react: Not installed`);
  }

  if (dependencies.spexopTheme.installed) {
    const themeIcon = dependencies.spexopTheme.isLatest
      ? pc.green("✅")
      : pc.yellow("⚠️ ");
    console.log(
      `${themeIcon} @spexop/theme: ${dependencies.spexopTheme.version}${dependencies.spexopTheme.isLatest ? " (latest)" : ` (latest: ${dependencies.spexopTheme.latest})`}`,
    );
  } else {
    console.log(`${pc.dim("ℹ️  @spexop/theme: Not installed (optional)")}`);
  }

  if (dependencies.spexopIcons.installed) {
    console.log(
      `${pc.green("✅")} @spexop/icons: ${dependencies.spexopIcons.version}`,
    );
  } else {
    console.log(`${pc.dim("ℹ️  @spexop/icons: Not installed (optional)")}`);
  }

  console.log("");
  console.log("━".repeat(50));
  console.log("");

  const summary = calculateSummary(results);
  console.log(
    `Summary: ${summary.critical} critical, ${summary.warnings} warnings`,
  );
  console.log("");
  console.log(pc.dim("Run 'npx spexop doctor --fix' to apply automatic fixes"));
  console.log("");
}

/**
 * Display JSON results
 */
function displayJSONResults(results: Awaited<ReturnType<typeof runAllChecks>>) {
  const summary = calculateSummary(results);

  const output = {
    timestamp: new Date().toISOString(),
    status:
      summary.critical > 0 ? "fail" : summary.warnings > 0 ? "warning" : "pass",
    summary: {
      total: summary.total,
      passed: summary.passed,
      warnings: summary.warnings,
      critical: summary.critical,
    },
    checks: [
      {
        name: "React Version",
        status: results.reactVersion.status,
        details: {
          version: results.reactVersion.reactVersion,
          typesVersion: results.reactVersion.reactTypesVersion,
          isStable: results.reactVersion.details.isStable,
          isCompatible: results.reactVersion.details.isCompatible,
        },
        issues: results.reactVersion.issues,
        fixes: results.reactVersion.fixes,
      },
      {
        name: "CSS Imports",
        status: results.cssImports.status,
        details: {
          spexopCSSLoaded: results.cssImports.spexopCSSLoaded,
          themeCSSLoaded: results.cssImports.themeCSSLoaded,
          themeName: results.cssImports.themeName,
          mainEntry: results.cssImports.details.mainEntry,
        },
        issues: results.cssImports.issues,
        fixes: results.cssImports.fixes,
      },
      {
        name: "TypeScript",
        status: results.typescript.status,
        details: {
          configExists: results.typescript.configExists,
          jsxMode: results.typescript.jsxMode,
          moduleResolution: results.typescript.moduleResolution,
          strictMode: results.typescript.strictMode,
        },
        issues: results.typescript.issues,
        fixes: results.typescript.fixes,
      },
      {
        name: "Dependencies",
        status: results.dependencies.status,
        details: {
          spexopReact: results.dependencies.spexopReact,
          spexopTheme: results.dependencies.spexopTheme,
          spexopIcons: results.dependencies.spexopIcons,
        },
        issues: results.dependencies.issues,
        fixes: results.dependencies.fixes,
      },
    ],
  };

  console.log(JSON.stringify(output, null, 2));
}

/**
 * Apply auto-fixes
 */
async function applyAutoFixes(
  results: Awaited<ReturnType<typeof runAllChecks>>,
  interactive: boolean,
): Promise<void> {
  console.log("\n🔧 Applying auto-fixes...\n");

  let fixedCount = 0;

  // Fix React types mismatch
  if (
    results.reactVersion.status === "fail" &&
    results.reactVersion.reactVersion &&
    !results.reactVersion.details.isCompatible
  ) {
    const fixed = await fixReactTypesMismatch(
      results.reactVersion.reactVersion,
      interactive,
    );
    if (fixed) fixedCount++;
  }

  // Fix missing CSS imports
  if (
    results.cssImports.status === "fail" ||
    results.cssImports.status === "warning"
  ) {
    const missingImports: string[] = [];

    if (!results.cssImports.spexopCSSLoaded) {
      missingImports.push("import '@spexop/react/dist/index.css';");
    }

    if (!results.cssImports.themeCSSLoaded) {
      missingImports.push("import '@spexop/theme/dist/css/tech.css';");
    }

    if (missingImports.length > 0 && results.cssImports.details.mainEntry) {
      const fixed = await fixMissingCSSImports(
        results.cssImports.details.mainEntry,
        missingImports,
        interactive,
      );
      if (fixed) fixedCount++;
    }
  }

  // Fix TypeScript config
  if (
    results.typescript.status === "warning" &&
    results.typescript.issues.length > 0
  ) {
    const fixed = await fixTypeScriptConfig(
      results.typescript.issues,
      interactive,
    );
    if (fixed) fixedCount++;
  }

  // Fix outdated dependencies
  if (
    results.dependencies.status === "warning" &&
    results.dependencies.issues.length > 0
  ) {
    const outdatedPackages: string[] = [];

    if (!results.dependencies.spexopReact.isLatest) {
      outdatedPackages.push("@spexop/react");
    }

    if (
      results.dependencies.spexopTheme.installed &&
      !results.dependencies.spexopTheme.isLatest
    ) {
      outdatedPackages.push("@spexop/theme");
    }

    if (outdatedPackages.length > 0) {
      const fixed = await fixOutdatedDependencies(
        outdatedPackages,
        interactive,
      );
      if (fixed) fixedCount++;
    }
  }

  // Summary
  console.log("");
  if (fixedCount > 0) {
    console.log(
      pc.green(`✨ Fixed ${fixedCount} issue${fixedCount > 1 ? "s" : ""}!`),
    );
    console.log(pc.dim("\nRun 'npx spexop doctor' again to verify fixes"));
  } else {
    console.log(pc.yellow("No fixes were applied"));
  }
  console.log("");
}

/**
 * Main doctor command action
 */
async function doctorAction(cmdOptions: DoctorCommandOptions): Promise<void> {
  try {
    // Check if in Spexop project
    if (!(await isSpexopProject())) {
      p.cancel("Not in a Spexop project");
      console.log(
        pc.yellow("\nRun 'spexop create' first to create a new project"),
      );
      process.exit(1);
    }

    // Run checks
    const results = await runAllChecks();

    // If fix mode, apply fixes
    if (cmdOptions.fix) {
      // Show brief summary first
      console.log("\n🏥 Spexop Doctor - Checking your setup...\n");

      const summary = calculateSummary(results);
      console.log(
        `Found ${summary.critical} critical issue${summary.critical !== 1 ? "s" : ""}, ${summary.warnings} warning${summary.warnings !== 1 ? "s" : ""}`,
      );

      if (summary.critical === 0 && summary.warnings === 0) {
        console.log(pc.green("\n🎉 Your Spexop setup is healthy!"));
        console.log("");
        return;
      }

      // Apply fixes (interactive by default)
      await applyAutoFixes(results, true);
      return;
    }

    // Display results
    if (cmdOptions.json) {
      displayJSONResults(results);
    } else if (cmdOptions.verbose) {
      displayVerboseResults(results);
    } else {
      displayResults(results, false);
    }

    // Exit with error code if critical issues found
    const summary = calculateSummary(results);
    if (summary.critical > 0) {
      process.exit(1);
    }
  } catch (error) {
    p.cancel("Failed to run diagnostics");
    console.error(
      pc.red(error instanceof Error ? error.message : "Unknown error"),
    );
    process.exit(1);
  }
}

/**
 * Doctor command definition
 */
export const doctorCommand = new Command("doctor")
  .description("Check your Spexop setup for common issues")
  .option("--check <type>", "Run specific check (react, css, typescript, etc.)")
  .option("--fix", "Automatically fix issues when possible")
  .option("--verbose", "Show detailed diagnostic information")
  .option("--json", "Output results as JSON (for CI)")
  .action(doctorAction);
