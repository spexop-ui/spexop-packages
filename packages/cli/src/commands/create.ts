/**
 * Create Command
 * Scaffolds a new Spexop application
 */

import path from "node:path";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { execa } from "execa";
import fs from "fs-extra";
import pc from "picocolors";
import {
  readTemplateFiles,
  replaceVariables,
  writeFiles,
} from "../utils/files.js";
import { initGit, isGitInstalled } from "../utils/git.js";
import { generatePackageJson } from "../utils/packageJson.js";
import {
  ROUTER_OPTIONS,
  TEMPLATE_OPTIONS,
  THEME_PRESETS,
} from "./constants.js";
import type { CreateCommandOptions, ScaffoldOptions } from "./types.js";
import { validateProjectName } from "./validate.js";

/**
 * Interactive CLI flow
 */
async function runInteractiveCLI(
  projectNameArg?: string,
): Promise<ScaffoldOptions | null> {
  console.clear();

  p.intro(pc.bgCyan(pc.black(" spexop create ")));

  // Project name
  let projectName = projectNameArg;
  if (!projectName) {
    const result = await p.text({
      message: "Project name:",
      placeholder: "my-spexop-app",
      validate: validateProjectName,
    });

    if (p.isCancel(result)) {
      p.cancel("Operation cancelled");
      return null;
    }

    projectName = result as string;
  }

  // Theme selection
  const theme = (await p.select({
    message: "Choose a theme preset:",
    options: THEME_PRESETS as unknown as {
      value: string;
      label?: string;
      hint?: string;
    }[],
    initialValue: "tech",
  })) as string;

  if (p.isCancel(theme)) {
    p.cancel("Operation cancelled");
    return null;
  }

  // Router selection
  const router = (await p.select({
    message: "Choose router:",
    options: ROUTER_OPTIONS as unknown as {
      value: string;
      label?: string;
      hint?: string;
    }[],
    initialValue: "hash",
  })) as string;

  if (p.isCancel(router)) {
    p.cancel("Operation cancelled");
    return null;
  }

  // Template selection
  const template = (await p.select({
    message: "Choose template:",
    options: TEMPLATE_OPTIONS as unknown as {
      value: string;
      label?: string;
      hint?: string;
    }[],
    initialValue: "full-app",
  })) as string;

  if (p.isCancel(template)) {
    p.cancel("Operation cancelled");
    return null;
  }

  // Install dependencies
  const install = await p.confirm({
    message: "Install dependencies?",
    initialValue: true,
  });

  if (p.isCancel(install)) {
    p.cancel("Operation cancelled");
    return null;
  }

  // Git initialization
  const initGitFlag = await p.confirm({
    message: "Initialize git repository?",
    initialValue: true,
  });

  if (p.isCancel(initGitFlag)) {
    p.cancel("Operation cancelled");
    return null;
  }

  return {
    projectName,
    theme,
    router,
    template,
    install: install as boolean,
    initGit: initGitFlag as boolean,
  };
}

/**
 * Scaffold project
 */
async function scaffoldProject(options: ScaffoldOptions): Promise<string> {
  const {
    projectName,
    theme,
    router,
    template,
    initGit: shouldInitGit,
  } = options;

  // Create project directory
  const projectPath = path.join(process.cwd(), projectName);
  await fs.ensureDir(projectPath);

  // Read template files
  const templateFiles = await readTemplateFiles(template);

  // Process template files with variable replacement
  const processedFiles = templateFiles.map((file) => ({
    ...file,
    content: replaceVariables(file.content, {
      PROJECT_NAME: projectName,
      THEME: theme,
      ROUTER: router,
      THEME_CSS: `@spexop/theme/dist/css/${theme}.css`,
    }),
  }));

  // Write files to project directory
  await writeFiles(processedFiles, projectPath);

  // Generate package.json
  const packageJson = generatePackageJson(options);
  await fs.writeJson(path.join(projectPath, "package.json"), packageJson, {
    spaces: 2,
  });

  // Initialize git
  if (shouldInitGit && (await isGitInstalled())) {
    await initGit(projectPath);
  }

  return projectPath;
}

/**
 * Create command action
 */
async function createAction(
  projectName: string | undefined,
  cmdOptions: CreateCommandOptions,
): Promise<void> {
  try {
    // If flags provided, use non-interactive mode
    const useInteractive = !cmdOptions.theme && !cmdOptions.template;

    let options: ScaffoldOptions | null;

    if (useInteractive) {
      // Interactive mode with prompts
      options = await runInteractiveCLI(projectName);
      if (!options) {
        process.exit(0);
      }
    } else {
      // Non-interactive mode with flags
      if (!projectName) {
        console.error(pc.red("Error: Project name is required"));
        process.exit(1);
      }

      const validation = validateProjectName(projectName);
      if (validation) {
        console.error(pc.red(`Error: ${validation}`));
        process.exit(1);
      }

      options = {
        projectName,
        theme: cmdOptions.theme || "tech",
        router: cmdOptions.router || "hash",
        template: cmdOptions.template || "full-app",
        install: cmdOptions.install !== false,
        initGit: cmdOptions.git !== false,
      };
    }

    // Scaffold project
    const spinner = p.spinner();
    spinner.start("Creating project...");

    const projectPath = await scaffoldProject(options);

    spinner.stop("Project created successfully!");

    // Install dependencies
    if (options.install) {
      const installSpinner = p.spinner();
      installSpinner.start("Installing dependencies");

      try {
        // Detect package manager
        let packageManager = "pnpm";
        if (
          await fs.pathExists(path.join(process.cwd(), "package-lock.json"))
        ) {
          packageManager = "npm";
        } else if (await fs.pathExists(path.join(process.cwd(), "yarn.lock"))) {
          packageManager = "yarn";
        }

        await execa(packageManager, ["install"], {
          cwd: projectPath,
          stdio: useInteractive ? "inherit" : "pipe",
        });

        installSpinner.stop("Dependencies installed!");
      } catch (error) {
        installSpinner.stop("Failed to install dependencies");
        console.error(
          pc.yellow(
            `\n⚠️  Run '${pc.cyan(`cd ${options.projectName} && pnpm install`)}' manually`,
          ),
        );
      }
    }

    // Success message
    const nextSteps = `
  cd ${options.projectName}
  ${!options.install ? "pnpm install\n  " : ""}pnpm dev      # or npm run dev
`;

    p.note(nextSteps, "Next steps:");

    p.outro(
      pc.green(`✨ Done! Your Spexop app is ready at ${pc.cyan(projectPath)}`),
    );
  } catch (error) {
    p.cancel("Failed to create project");
    console.error(
      pc.red(error instanceof Error ? error.message : "Unknown error occurred"),
    );
    process.exit(1);
  }
}

/**
 * Export create command
 */
export const createCommand = new Command("create")
  .description("Create a new Spexop application")
  .argument("[project-name]", "Name of the project")
  .option("-t, --theme <theme>", "Theme preset (tech, minimal, dark, etc.)")
  .option(
    "-r, --router <router>",
    "Router type (hash, react-router, none)",
    "hash",
  )
  .option(
    "--template <template>",
    "Template type (full-app, minimal)",
    "full-app",
  )
  .option("--no-install", "Skip dependency installation")
  .option("--no-git", "Skip git initialization")
  .action(createAction);
