/**
 * Project Detection Utilities
 * Check if current directory is a Spexop project and detect structure
 */

import path from "node:path";
import fs from "fs-extra";

/**
 * Check if current directory is a Spexop project
 * Looks for @spexop/react in dependencies or devDependencies
 */
export async function isSpexopProject(): Promise<boolean> {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  if (!(await fs.pathExists(packageJsonPath))) return false;

  const packageJson = await fs.readJson(packageJsonPath);
  return !!(
    packageJson.dependencies?.["@spexop/react"] ||
    packageJson.devDependencies?.["@spexop/react"]
  );
}

/**
 * Detect project structure and best path for new components
 * Returns the most appropriate component directory
 */
export async function detectProjectStructure(): Promise<{
  hasComponents: boolean;
  componentPath: string;
}> {
  const possiblePaths = [
    "src/components",
    "app/components",
    "components",
    "src",
  ];

  for (const p of possiblePaths) {
    if (await fs.pathExists(path.join(process.cwd(), p))) {
      return { hasComponents: true, componentPath: p };
    }
  }

  // Default to src/components if none found
  return { hasComponents: false, componentPath: "src/components" };
}
