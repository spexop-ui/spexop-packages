/**
 * Dependencies Health Check
 * Validates Spexop packages and peer dependencies
 */

import path from "node:path";
import fs from "fs-extra";

export interface DependenciesCheckResult {
  status: "pass" | "fail" | "warning";
  spexopReact: {
    installed: boolean;
    version: string | null;
    latest: string;
    isLatest: boolean;
  };
  spexopTheme: {
    installed: boolean;
    version: string | null;
    latest: string;
    isLatest: boolean;
  };
  spexopIcons: {
    installed: boolean;
    version: string | null;
  };
  issues: string[];
  fixes: string[];
}

/**
 * Get installed package version
 */
async function getPackageVersion(packageName: string): Promise<string | null> {
  try {
    const packageJsonPath = path.join(
      process.cwd(),
      `node_modules/${packageName}/package.json`,
    );
    if (!(await fs.pathExists(packageJsonPath))) {
      return null;
    }
    const packageJson = await fs.readJson(packageJsonPath);
    return packageJson.version;
  } catch {
    return null;
  }
}

/**
 * Check if package is installed
 */
async function isPackageInstalled(packageName: string): Promise<boolean> {
  const version = await getPackageVersion(packageName);
  return version !== null;
}

/**
 * Compare versions (simple major.minor comparison)
 * Returns true if installed is >= latest
 */
function isLatestVersion(installed: string, latest: string): boolean {
  const installedParts = installed.split(".").map(Number);
  const latestParts = latest.split(".").map(Number);

  // Compare major version
  if (installedParts[0] < latestParts[0]) return false;
  if (installedParts[0] > latestParts[0]) return true;

  // Compare minor version
  if (installedParts[1] < latestParts[1]) return false;

  return true;
}

/**
 * Run dependencies check
 */
export async function checkDependencies(): Promise<DependenciesCheckResult> {
  const result: DependenciesCheckResult = {
    status: "pass",
    spexopReact: {
      installed: false,
      version: null,
      latest: "0.5.0", // Hardcoded for now, could fetch from npm registry
      isLatest: false,
    },
    spexopTheme: {
      installed: false,
      version: null,
      latest: "0.4.6", // Hardcoded for now
      isLatest: false,
    },
    spexopIcons: {
      installed: false,
      version: null,
    },
    issues: [],
    fixes: [],
  };

  // Check @spexop/react
  const reactVersion = await getPackageVersion("@spexop/react");
  result.spexopReact.installed = reactVersion !== null;
  result.spexopReact.version = reactVersion;

  if (!reactVersion) {
    result.status = "fail";
    result.issues.push("@spexop/react is not installed");
    result.fixes.push("pnpm add @spexop/react");
  } else {
    result.spexopReact.isLatest = isLatestVersion(
      reactVersion,
      result.spexopReact.latest,
    );

    if (!result.spexopReact.isLatest) {
      result.status = "warning";
      result.issues.push(
        `@spexop/react ${reactVersion} is outdated (latest: ${result.spexopReact.latest})`,
      );
      result.fixes.push("pnpm add @spexop/react@latest");
    }
  }

  // Check @spexop/theme
  const themeVersion = await getPackageVersion("@spexop/theme");
  result.spexopTheme.installed = themeVersion !== null;
  result.spexopTheme.version = themeVersion;

  if (themeVersion) {
    result.spexopTheme.isLatest = isLatestVersion(
      themeVersion,
      result.spexopTheme.latest,
    );

    if (!result.spexopTheme.isLatest) {
      result.status = result.status === "fail" ? "fail" : "warning";
      result.issues.push(
        `@spexop/theme ${themeVersion} is outdated (latest: ${result.spexopTheme.latest})`,
      );
      result.fixes.push("pnpm add @spexop/theme@latest");
    }
  }

  // Check @spexop/icons (optional)
  const iconsVersion = await getPackageVersion("@spexop/icons");
  result.spexopIcons.installed = iconsVersion !== null;
  result.spexopIcons.version = iconsVersion;

  return result;
}
