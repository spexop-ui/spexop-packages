/**
 * CSS Imports Check
 * Validates that required CSS files are imported
 */

import path from "node:path";
import fs from "fs-extra";

export interface CSSImportsCheckResult {
  status: "pass" | "fail" | "warning";
  spexopCSSLoaded: boolean;
  themeCSSLoaded: boolean;
  themeName: string | null;
  issues: string[];
  fixes: string[];
  details: {
    mainEntry?: string;
    imports?: string[];
  };
}

/**
 * Find main entry file (main.tsx, App.tsx, index.tsx)
 */
async function findMainEntry(): Promise<string | null> {
  const possibleEntries = [
    "src/main.tsx",
    "src/main.ts",
    "src/App.tsx",
    "src/index.tsx",
    "src/index.ts",
  ];

  for (const entry of possibleEntries) {
    const fullPath = path.join(process.cwd(), entry);
    if (await fs.pathExists(fullPath)) {
      return entry;
    }
  }

  return null;
}

/**
 * Check if file contains specific import
 */
async function hasImport(
  filePath: string,
  importPattern: string,
): Promise<boolean> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content.includes(importPattern);
  } catch {
    return false;
  }
}

/**
 * Detect which theme is being used
 */
async function detectTheme(filePath: string): Promise<string | null> {
  try {
    const content = await fs.readFile(filePath, "utf-8");

    // Look for theme CSS imports
    const themeImportRegex = /@spexop\/theme\/dist\/css\/([a-z-]+)\.css/;
    const match = content.match(themeImportRegex);

    if (match?.[1]) {
      return match[1];
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Run CSS imports check
 */
export async function checkCSSImports(): Promise<CSSImportsCheckResult> {
  const result: CSSImportsCheckResult = {
    status: "pass",
    spexopCSSLoaded: false,
    themeCSSLoaded: false,
    themeName: null,
    issues: [],
    fixes: [],
    details: {},
  };

  // Find main entry file
  const mainEntry = await findMainEntry();

  if (!mainEntry) {
    result.status = "warning";
    result.issues.push("Could not find main entry file (src/main.tsx)");
    return result;
  }

  result.details.mainEntry = mainEntry;
  const mainEntryPath = path.join(process.cwd(), mainEntry);

  // Check for Spexop React CSS
  const hasSpexopCSS = await hasImport(
    mainEntryPath,
    "@spexop/react/dist/index.css",
  );
  result.spexopCSSLoaded = hasSpexopCSS;

  if (!hasSpexopCSS) {
    result.status = "fail";
    result.issues.push("Missing @spexop/react CSS import");
    result.fixes.push(
      `Add to ${mainEntry}:\nimport '@spexop/react/dist/index.css';`,
    );
  }

  // Check for theme CSS
  const themeName = await detectTheme(mainEntryPath);
  result.themeName = themeName;

  if (themeName) {
    result.themeCSSLoaded = true;
  } else {
    result.status = result.status === "fail" ? "fail" : "warning";
    result.issues.push("No theme CSS detected");
    result.fixes.push(
      `Add to ${mainEntry}:\nimport '@spexop/theme/dist/css/tech.css'; // or any other theme`,
    );
  }

  // Get all CSS imports for details
  try {
    const content = await fs.readFile(mainEntryPath, "utf-8");
    const cssImports = content
      .split("\n")
      .filter((line) => line.includes("import") && line.includes(".css"))
      .map((line) => line.trim());
    result.details.imports = cssImports;
  } catch {
    // Ignore
  }

  return result;
}
