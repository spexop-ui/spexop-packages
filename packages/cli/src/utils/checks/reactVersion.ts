/**
 * React Version Check
 * Validates React version and types compatibility
 */

import path from "node:path";
import fs from "fs-extra";

export interface ReactVersionCheckResult {
  status: "pass" | "fail" | "warning";
  reactVersion: string | null;
  reactTypesVersion: string | null;
  issues: string[];
  fixes: string[];
  details: {
    reactLocation?: string;
    reactTypesLocation?: string;
    isStable?: boolean;
    isCompatible?: boolean;
  };
}

/**
 * Get installed React version
 */
async function getReactVersion(): Promise<{
  version: string | null;
  location: string | null;
}> {
  try {
    const packageJsonPath = path.join(
      process.cwd(),
      "node_modules/react/package.json",
    );
    if (!(await fs.pathExists(packageJsonPath))) {
      return { version: null, location: null };
    }
    const packageJson = await fs.readJson(packageJsonPath);
    return { version: packageJson.version, location: "node_modules/react" };
  } catch {
    return { version: null, location: null };
  }
}

/**
 * Get installed React types version
 */
async function getReactTypesVersion(): Promise<{
  version: string | null;
  location: string | null;
}> {
  try {
    const packageJsonPath = path.join(
      process.cwd(),
      "node_modules/@types/react/package.json",
    );
    if (!(await fs.pathExists(packageJsonPath))) {
      return { version: null, location: null };
    }
    const packageJson = await fs.readJson(packageJsonPath);
    return {
      version: packageJson.version,
      location: "node_modules/@types/react",
    };
  } catch {
    return { version: null, location: null };
  }
}

/**
 * Check if React version is stable (not experimental/RC)
 */
function isStableVersion(version: string): boolean {
  return (
    !version.includes("experimental") &&
    !version.includes("rc") &&
    !version.includes("alpha") &&
    !version.includes("beta")
  );
}

/**
 * Check if React types version is compatible with React version
 */
function areVersionsCompatible(
  reactVersion: string,
  reactTypesVersion: string,
): boolean {
  // Get major versions
  const reactMajor = Number.parseInt(reactVersion.split(".")[0], 10);
  const typesMajor = Number.parseInt(reactTypesVersion.split(".")[0], 10);

  // Must match major version
  return reactMajor === typesMajor;
}

/**
 * Run React version check
 */
export async function checkReactVersion(): Promise<ReactVersionCheckResult> {
  const result: ReactVersionCheckResult = {
    status: "pass",
    reactVersion: null,
    reactTypesVersion: null,
    issues: [],
    fixes: [],
    details: {},
  };

  // Get React version
  const { version: reactVersion, location: reactLocation } =
    await getReactVersion();

  if (!reactVersion) {
    result.status = "fail";
    result.issues.push("React is not installed");
    result.fixes.push("pnpm add react react-dom");
    return result;
  }

  result.reactVersion = reactVersion;
  result.details.reactLocation = reactLocation || undefined;
  result.details.isStable = isStableVersion(reactVersion);

  // Get React types version
  const { version: reactTypesVersion, location: reactTypesLocation } =
    await getReactTypesVersion();

  if (!reactTypesVersion) {
    result.status = "warning";
    result.issues.push("@types/react is not installed");
    result.fixes.push(
      `pnpm add -D @types/react@${reactVersion.split(".")[0]}.x @types/react-dom@${reactVersion.split(".")[0]}.x`,
    );
    return result;
  }

  result.reactTypesVersion = reactTypesVersion;
  result.details.reactTypesLocation = reactTypesLocation || undefined;

  // Check compatibility
  const compatible = areVersionsCompatible(reactVersion, reactTypesVersion);
  result.details.isCompatible = compatible;

  if (!compatible) {
    result.status = "fail";
    result.issues.push(
      `React types version mismatch: React ${reactVersion} with @types/react ${reactTypesVersion}`,
    );
    result.fixes.push(
      `pnpm add -D @types/react@${reactVersion.split(".")[0]}.x @types/react-dom@${reactVersion.split(".")[0]}.x`,
    );
  }

  return result;
}
