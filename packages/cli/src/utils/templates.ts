/**
 * Template Loading Utilities
 * Dynamically loads templates from user's installed @spexop/react package
 */

import path from "node:path";
import fs from "fs-extra";

export interface TemplateModule {
  allTemplates: unknown[];
  getTemplateById: (id: string) => unknown;
  searchTemplates: (query: string) => unknown[];
  renderTemplateToReact: (template: unknown, theme?: unknown) => string;
}

/**
 * Load templates from user's node_modules
 * This keeps the CLI bundle small and uses the user's installed version
 */
export async function loadUserTemplates(): Promise<TemplateModule> {
  try {
    // Try multiple possible paths for different build configurations
    const possiblePaths = [
      // Production build - main export
      path.join(process.cwd(), "node_modules/@spexop/react/dist/templates.js"),
      // Production build - nested path
      path.join(
        process.cwd(),
        "node_modules/@spexop/react/dist/src/templates.js",
      ),
      // Development (if using workspace)
      path.join(
        process.cwd(),
        "node_modules/@spexop/react/src/templates/index.ts",
      ),
    ];

    let templatesModule = null;
    for (const modulePath of possiblePaths) {
      try {
        templatesModule = await import(modulePath);
        break;
      } catch {
        // Try next path
      }
    }

    if (!templatesModule) {
      throw new Error("Templates not found");
    }

    return templatesModule as TemplateModule;
  } catch (error) {
    throw new Error(
      "Could not load templates. Make sure @spexop/react v0.5.0+ is installed.\n\n" +
        "Run: pnpm install @spexop/react@latest",
    );
  }
}

/**
 * Check if user's @spexop/react has template support
 */
export async function hasTemplateSupport(): Promise<boolean> {
  try {
    await loadUserTemplates();
    return true;
  } catch {
    return false;
  }
}

/**
 * Get installed @spexop/react version
 */
export async function getInstalledReactVersion(): Promise<string | null> {
  try {
    const packageJsonPath = path.join(
      process.cwd(),
      "node_modules/@spexop/react/package.json",
    );
    const packageJson = await fs.readJson(packageJsonPath);
    return packageJson.version;
  } catch {
    return null;
  }
}
