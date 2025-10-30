/**
 * Git utilities
 */

import path from "node:path";
import { execa } from "execa";
import fs from "fs-extra";

export async function initGit(projectPath: string): Promise<void> {
  try {
    await execa("git", ["init"], { cwd: projectPath });

    // Create .gitignore
    const gitignore = `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
dist/
build/

# Misc
.DS_Store
*.log
*.tsbuildinfo

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
`;
    await fs.writeFile(path.join(projectPath, ".gitignore"), gitignore);
  } catch (error) {
    // Git init is optional, don't fail if it doesn't work
    console.warn("Failed to initialize git repository");
  }
}

export async function isGitInstalled(): Promise<boolean> {
  try {
    await execa("git", ["--version"]);
    return true;
  } catch {
    return false;
  }
}
