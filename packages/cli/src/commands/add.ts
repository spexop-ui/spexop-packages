/**
 * spexop add - Add component templates to your project
 */

import path from "node:path";
import * as p from "@clack/prompts";
import { Command } from "commander";
import fs from "fs-extra";
import pc from "picocolors";
import { detectProjectStructure, isSpexopProject } from "../utils/project.js";
import {
  type TemplateModule,
  getInstalledReactVersion,
  hasTemplateSupport,
  loadUserTemplates,
} from "../utils/templates.js";

interface AddCommandOptions {
  path?: string;
  yes?: boolean;
}

/**
 * Template metadata structure
 */
interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  category: string;
}

/**
 * Template structure
 */
interface Template {
  meta: TemplateMeta;
  structure: unknown;
  customization?: {
    content?: {
      editableText?: string[];
    };
  };
}

/**
 * Convert template ID to component name
 * Examples: hero-centered -> HeroCentered, pricing-tiers -> PricingTiers
 */
function toComponentName(id: string): string {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Group templates by category for better UX
 */
function groupTemplatesByCategory(
  templates: Template[],
): Record<string, Template[]> {
  const grouped: Record<string, Template[]> = {};
  for (const template of templates) {
    const cat = template.meta.category || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(template);
  }
  return grouped;
}

/**
 * Interactive template selection with category grouping
 */
async function selectTemplate(templates: Template[]): Promise<Template | null> {
  const grouped = groupTemplatesByCategory(templates);

  // Create options with category hints
  const templateOptions = templates.map((t) => ({
    value: t.meta.id,
    label: t.meta.name,
    hint: `${t.meta.category} - ${t.meta.description.slice(0, 50)}${
      t.meta.description.length > 50 ? "..." : ""
    }`,
  }));

  const selected = await p.select({
    message: "Choose a component template:",
    options: templateOptions,
  });

  if (p.isCancel(selected)) {
    p.cancel("Operation cancelled");
    return null;
  }

  // Find selected template
  return templates.find((t) => t.meta.id === selected) || null;
}

/**
 * Load default theme for rendering
 */
async function loadDefaultTheme(): Promise<Record<string, unknown>> {
  try {
    const themePath = path.join(
      process.cwd(),
      "node_modules/@spexop/theme/dist/index.js",
    );
    const themeModule = await import(themePath);
    return (themeModule.defaultTheme as Record<string, unknown>) || {};
  } catch {
    // If theme not found, return empty object (renderer will use defaults)
    return {};
  }
}

/**
 * Main add command action
 */
async function addAction(
  templateId: string | undefined,
  cmdOptions: AddCommandOptions,
): Promise<void> {
  try {
    // Step 1: Verify Spexop project
    if (!(await isSpexopProject())) {
      p.cancel("Not in a Spexop project");
      console.log(
        pc.yellow("\nRun 'spexop create' first to create a new project"),
      );
      process.exit(1);
    }

    // Step 2: Check template support
    const version = await getInstalledReactVersion();
    if (!version) {
      p.cancel("@spexop/react not found");
      console.log(pc.yellow("\nInstall it first:"));
      console.log(pc.cyan("  pnpm install @spexop/react@latest"));
      process.exit(1);
    }

    if (!(await hasTemplateSupport())) {
      p.cancel("Templates not available");
      console.log(
        pc.yellow(
          `\n@spexop/react ${version} doesn't include template support.`,
        ),
      );
      console.log(pc.dim("Template support requires @spexop/react v0.5.0+"));
      console.log(pc.cyan("\nUpgrade: pnpm install @spexop/react@latest"));
      process.exit(1);
    }

    // Step 3: Load templates
    const spinner = p.spinner();
    spinner.start("Loading templates...");

    const templatesModule: TemplateModule = await loadUserTemplates();
    const { allTemplates, getTemplateById, renderTemplateToReact } =
      templatesModule;

    // Type assertions for dynamically loaded templates
    const templates = allTemplates as Template[];
    const getTemplate = getTemplateById as (id: string) => Template | null;

    spinner.stop("Templates loaded");

    // Step 4: Select or find template
    let template: Template | null = null;

    if (!templateId) {
      // Interactive mode
      console.clear();
      p.intro(pc.bgCyan(pc.black(" spexop add ")));

      // Show available templates count
      p.note(
        `Found ${templates.length} templates from @spexop/react ${version}`,
        "Available",
      );

      template = await selectTemplate(templates);
    } else {
      // Direct mode
      template = getTemplate(templateId);
      if (!template) {
        console.error(pc.red(`\n✗ Template "${templateId}" not found`));
        console.log(
          pc.dim("\nRun 'spexop add' without arguments to see all templates"),
        );
        process.exit(1);
      }
    }

    if (!template) {
      process.exit(0);
    }

    // Step 5: Determine save path
    const { componentPath } = await detectProjectStructure();
    const targetDir = cmdOptions.path || componentPath;
    const componentName = toComponentName(template.meta.id);
    const fileName = `${componentName}.tsx`;
    const filePath = path.join(process.cwd(), targetDir, fileName);

    // Step 6: Check if file exists
    if ((await fs.pathExists(filePath)) && !cmdOptions.yes) {
      const overwrite = await p.confirm({
        message: `File ${fileName} already exists. Overwrite?`,
        initialValue: false,
      });

      if (p.isCancel(overwrite) || !overwrite) {
        p.cancel("Operation cancelled");
        process.exit(0);
      }
    }

    // Step 7: Generate code
    const generateSpinner = p.spinner();
    generateSpinner.start("Generating component...");

    const defaultTheme = await loadDefaultTheme();
    const code = renderTemplateToReact(template, defaultTheme);

    // Step 8: Save file
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, code, "utf-8");

    generateSpinner.stop("Component generated");

    // Step 9: Success message
    const relativePath = path.relative(process.cwd(), filePath);
    const importPath = `./${path
      .relative(path.join(process.cwd(), targetDir), filePath)
      .replace(/\.tsx$/, "")}`;

    p.note(
      `${pc.dim("File:")} ${pc.cyan(relativePath)}\n${pc.dim("Import:")} ${pc.green(`import { ${componentName} } from '${importPath}';`)}`,
      "Success",
    );

    p.outro(pc.green(`✨ Added ${template.meta.name} component!`));
  } catch (error) {
    p.cancel("Failed to add component");
    console.error(
      pc.red(error instanceof Error ? error.message : "Unknown error"),
    );
    process.exit(1);
  }
}

/**
 * Add command definition
 */
export const addCommand = new Command("add")
  .description("Add a component template to your project")
  .argument("[template-id]", "Template ID (e.g., hero-centered, pricing-tiers)")
  .option("-p, --path <path>", "Target directory (default: auto-detected)")
  .option("-y, --yes", "Skip confirmation prompts")
  .action(addAction);
