/**
 * File operations utilities
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import type { TemplateFile } from "../commands/types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get the templates directory path
 */
export function getTemplatesDir(): string {
  // When built: dist/index.js -> root of package -> templates
  // In dev: src/utils/files.ts -> src/utils -> src -> root -> templates
  // Solution: Always go from dist location (built output)
  return path.resolve(__dirname, "..", "templates");
}

/**
 * Read template files from a directory
 */
export async function readTemplateFiles(
  templateName: string,
): Promise<TemplateFile[]> {
  const templateDir = path.join(getTemplatesDir(), templateName);
  const files: TemplateFile[] = [];

  async function walkDir(dir: string, baseDir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);

      if (entry.isDirectory()) {
        await walkDir(fullPath, baseDir);
      } else if (entry.isFile()) {
        const content = await fs.readFile(fullPath, "utf-8");
        // Remove .template extension from the path
        const targetPath = relativePath.replace(/\.template$/, "");
        files.push({ path: targetPath, content });
      }
    }
  }

  await walkDir(templateDir, templateDir);
  return files;
}

/**
 * Replace variables in template content
 */
export function replaceVariables(
  content: string,
  variables: Record<string, string>,
): string {
  let result = content;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, "g");
    result = result.replace(regex, value);
  }
  return result;
}

/**
 * Write files to target directory
 */
export async function writeFiles(
  files: TemplateFile[],
  targetDir: string,
): Promise<void> {
  for (const file of files) {
    const targetPath = path.join(targetDir, file.path);
    await fs.ensureDir(path.dirname(targetPath));
    await fs.writeFile(targetPath, file.content, "utf-8");
  }
}

/**
 * Copy directory recursively
 */
export async function copyDir(src: string, dest: string): Promise<void> {
  await fs.copy(src, dest, {
    overwrite: false,
    errorOnExist: false,
  });
}
