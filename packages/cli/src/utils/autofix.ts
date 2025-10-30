/**
 * Auto-fix utilities for spexop doctor
 * Automatically fix common issues
 */

import path from "node:path";
import * as p from "@clack/prompts";
import { execa } from "execa";
import fs from "fs-extra";
import pc from "picocolors";

/**
 * Detect package manager (pnpm, npm, yarn)
 */
export async function detectPackageManager(): Promise<"pnpm" | "npm" | "yarn"> {
  if (await fs.pathExists(path.join(process.cwd(), "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (await fs.pathExists(path.join(process.cwd(), "yarn.lock"))) {
    return "yarn";
  }
  return "npm";
}

/**
 * Run package manager command
 */
async function runPackageManagerCommand(
  packageManager: string,
  args: string[],
): Promise<void> {
  await execa(packageManager, args, {
    cwd: process.cwd(),
    stdio: "inherit",
  });
}

/**
 * Fix React types mismatch
 */
export async function fixReactTypesMismatch(
  reactVersion: string,
  interactive: boolean,
): Promise<boolean> {
  const reactMajor = reactVersion.split(".")[0];
  const fixCommand = `@types/react@${reactMajor}.x @types/react-dom@${reactMajor}.x`;

  if (interactive) {
    const confirm = await p.confirm({
      message: `Install @types/react@${reactMajor}.x to match React ${reactVersion}?`,
      initialValue: true,
    });

    if (p.isCancel(confirm) || !confirm) {
      return false;
    }
  }

  const spinner = p.spinner();
  spinner.start("Installing React types...");

  try {
    const packageManager = await detectPackageManager();
    await runPackageManagerCommand(packageManager, [
      "add",
      "-D",
      ...fixCommand.split(" "),
    ]);
    spinner.stop("React types updated successfully");
    return true;
  } catch (error) {
    spinner.stop("Failed to update React types");
    console.error(
      pc.red(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ),
    );
    return false;
  }
}

/**
 * Fix missing CSS imports
 */
export async function fixMissingCSSImports(
  mainEntry: string,
  missingImports: string[],
  interactive: boolean,
): Promise<boolean> {
  if (interactive) {
    const confirm = await p.confirm({
      message: `Add missing CSS imports to ${mainEntry}?`,
      initialValue: true,
    });

    if (p.isCancel(confirm) || !confirm) {
      return false;
    }
  }

  const spinner = p.spinner();
  spinner.start("Adding CSS imports...");

  try {
    const mainEntryPath = path.join(process.cwd(), mainEntry);
    let content = await fs.readFile(mainEntryPath, "utf-8");

    // Add imports at the top of the file
    const importStatements = missingImports.join("\n");
    content = `${importStatements}\n${content}`;

    await fs.writeFile(mainEntryPath, content, "utf-8");
    spinner.stop("CSS imports added successfully");
    return true;
  } catch (error) {
    spinner.stop("Failed to add CSS imports");
    console.error(
      pc.red(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ),
    );
    return false;
  }
}

/**
 * Fix TypeScript configuration
 */
export async function fixTypeScriptConfig(
  issues: string[],
  interactive: boolean,
): Promise<boolean> {
  if (interactive) {
    const confirm = await p.confirm({
      message: "Update tsconfig.json with recommended settings?",
      initialValue: true,
    });

    if (p.isCancel(confirm) || !confirm) {
      return false;
    }
  }

  const spinner = p.spinner();
  spinner.start("Updating TypeScript config...");

  try {
    const configPath = path.join(process.cwd(), "tsconfig.json");
    let config: Record<string, unknown> = {};

    // Read existing config if it exists
    if (await fs.pathExists(configPath)) {
      config = await fs.readJson(configPath);
    }

    const compilerOptions =
      (config.compilerOptions as Record<string, unknown>) || {};

    // Apply fixes based on issues
    for (const issue of issues) {
      if (issue.includes("JSX mode")) {
        compilerOptions.jsx = "react-jsx";
      }
      if (issue.includes("Module resolution")) {
        compilerOptions.moduleResolution = "bundler";
      }
      if (issue.includes("Strict mode")) {
        compilerOptions.strict = true;
      }
    }

    // Ensure required settings
    if (!compilerOptions.target) {
      compilerOptions.target = "ES2020";
    }
    if (!compilerOptions.lib) {
      compilerOptions.lib = ["ES2020", "DOM", "DOM.Iterable"];
    }
    if (!compilerOptions.module) {
      compilerOptions.module = "ESNext";
    }

    config.compilerOptions = compilerOptions;

    await fs.writeJson(configPath, config, { spaces: 2 });
    spinner.stop("TypeScript config updated successfully");
    return true;
  } catch (error) {
    spinner.stop("Failed to update TypeScript config");
    console.error(
      pc.red(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ),
    );
    return false;
  }
}

/**
 * Fix outdated dependencies
 */
export async function fixOutdatedDependencies(
  packages: string[],
  interactive: boolean,
): Promise<boolean> {
  if (interactive) {
    const confirm = await p.confirm({
      message: `Update ${packages.join(", ")} to latest versions?`,
      initialValue: true,
    });

    if (p.isCancel(confirm) || !confirm) {
      return false;
    }
  }

  const spinner = p.spinner();
  spinner.start("Updating dependencies...");

  try {
    const packageManager = await detectPackageManager();
    const packagesWithLatest = packages.map((pkg) => `${pkg}@latest`);
    await runPackageManagerCommand(packageManager, [
      "add",
      ...packagesWithLatest,
    ]);
    spinner.stop("Dependencies updated successfully");
    return true;
  } catch (error) {
    spinner.stop("Failed to update dependencies");
    console.error(
      pc.red(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ),
    );
    return false;
  }
}
