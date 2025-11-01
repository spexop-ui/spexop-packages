#!/usr/bin/env node

/**
 * Spexop CLI
 * Unified command-line interface for Spexop Design System
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Command } from "commander";
import pc from "picocolors";
import { addCommand } from "./commands/add.js";
import { auditCommand } from "./commands/audit/index.js";
import { createCommand } from "./commands/create.js";
import { doctorCommand } from "./commands/doctor.js";
import { tokensCommand } from "./commands/tokens.js";

// Read version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
const version = packageJson.version || "0.6.0";

const program = new Command();

program
  .name("spexop")
  .description("Spexop Design System CLI - Build beautiful apps faster")
  .version(version);

// Add sub-commands
program.addCommand(createCommand);
program.addCommand(addCommand);
program.addCommand(doctorCommand);

// Audit command
program
  .command("audit <type> [paths...]")
  .description("Run accessibility and quality audits")
  .option("-l, --level <level>", "WCAG level (AA or AAA)", "AAA")
  .option(
    "-f, --format <format>",
    "Output format (console, json, html, markdown)",
    "console",
  )
  .option("-o, --output <file>", "Output file path")
  .option("-s, --strict", "Exit with code 1 if issues found (for CI/CD)")
  .option("--fix", "Show fix suggestions")
  .option("-p, --preset <name>", "Audit a built-in preset theme")
  .action(auditCommand);

program
  .command("tokens [preset]")
  .description("Generate interactive token documentation")
  .option("-o, --output <file>", "Output HTML file path", "tokens-doc.html")
  .option("-t, --theme <path>", "Path to custom theme file")
  .option("--no-contrast", "Skip contrast checking")
  .option("--open", "Open in browser after generation")
  .action(tokensCommand);

program
  .command("theme")
  .description("Manage themes (coming soon)")
  .action(() => {
    console.log(pc.yellow("⚠️  'spexop theme' is coming soon!"));
    console.log(pc.dim("   This will let you manage themes interactively"));
  });

// Parse arguments
program.parse();
