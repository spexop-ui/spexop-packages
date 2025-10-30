/**
 * Validation utilities
 */

import fs from "node:fs";
import path from "node:path";
import validateNpmPackageName from "validate-npm-package-name";

export function validateProjectName(name: string | symbol): string | undefined {
  if (typeof name === "symbol") {
    return "Project name is required";
  }

  if (!name || name.trim().length === 0) {
    return "Project name is required";
  }

  const validation = validateNpmPackageName(name);
  if (!validation.validForNewPackages) {
    const errors = [
      ...(validation.errors || []),
      ...(validation.warnings || []),
    ];
    return `Invalid project name: ${errors.join(", ")}`;
  }

  // Check if directory already exists
  const targetPath = path.join(process.cwd(), name);
  if (fs.existsSync(targetPath)) {
    return `Directory "${name}" already exists`;
  }

  return undefined;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
