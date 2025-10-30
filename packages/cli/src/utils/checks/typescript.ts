/**
 * TypeScript Configuration Check
 * Validates TypeScript setup for Spexop projects
 */

import path from "node:path";
import fs from "fs-extra";

export interface TypeScriptCheckResult {
  status: "pass" | "fail" | "warning";
  configExists: boolean;
  jsxMode: string | null;
  moduleResolution: string | null;
  strictMode: boolean | null;
  issues: string[];
  fixes: string[];
  details: {
    configPath?: string;
    targetPath?: string | null;
  };
}

/**
 * Get TypeScript config
 */
async function getTsConfig(): Promise<Record<string, unknown> | null> {
  try {
    const configPath = path.join(process.cwd(), "tsconfig.json");
    if (!(await fs.pathExists(configPath))) {
      return null;
    }
    const config = await fs.readJson(configPath);
    return config;
  } catch {
    return null;
  }
}

/**
 * Run TypeScript config check
 */
export async function checkTypeScript(): Promise<TypeScriptCheckResult> {
  const result: TypeScriptCheckResult = {
    status: "pass",
    configExists: false,
    jsxMode: null,
    moduleResolution: null,
    strictMode: null,
    issues: [],
    fixes: [],
    details: {},
  };

  const config = await getTsConfig();

  if (!config) {
    result.status = "fail";
    result.issues.push("tsconfig.json not found");
    result.fixes.push("Create tsconfig.json with recommended settings");
    return result;
  }

  result.configExists = true;
  result.details.configPath = "tsconfig.json";

  const compilerOptions =
    (config.compilerOptions as Record<string, unknown>) || {};

  // Check JSX mode
  const jsx = compilerOptions.jsx as string | undefined;
  result.jsxMode = jsx || null;

  if (!jsx || (jsx !== "react-jsx" && jsx !== "react")) {
    result.status = "warning";
    result.issues.push(
      `JSX mode "${jsx || "not set"}" - should be "react-jsx" or "react"`,
    );
    result.fixes.push('Set "jsx": "react-jsx" in tsconfig.json');
  }

  // Check module resolution
  const moduleResolution = compilerOptions.moduleResolution as
    | string
    | undefined;
  result.moduleResolution = moduleResolution || null;

  if (
    !moduleResolution ||
    (moduleResolution !== "bundler" && moduleResolution !== "node16")
  ) {
    result.status = result.status === "fail" ? "fail" : "warning";
    result.issues.push(
      `Module resolution "${moduleResolution || "not set"}" - recommended: "bundler"`,
    );
    result.fixes.push('Set "moduleResolution": "bundler" in tsconfig.json');
  }

  // Check strict mode
  const strict = compilerOptions.strict as boolean | undefined;
  result.strictMode = strict ?? null;

  if (!strict) {
    result.status = result.status === "fail" ? "fail" : "warning";
    result.issues.push("Strict mode disabled - recommended: enable");
    result.fixes.push('Set "strict": true in tsconfig.json');
  }

  return result;
}
