/**
 * Type definitions for CLI commands
 *
 * @module @spexop/cli/commands/types
 */

/**
 * Scaffold project options
 */
export interface ScaffoldOptions {
  /** Project name */
  projectName: string;
  /** Theme preset name */
  theme: string;
  /** Router type (hash, react-router, none) */
  router: string;
  /** Template type (full-app, minimal) */
  template: string;
  /** Install dependencies */
  install: boolean;
  /** Initialize git repository */
  initGit: boolean;
}

/**
 * Create command options
 */
export interface CreateCommandOptions {
  /** Theme preset */
  theme?: string;
  /** Router type */
  router?: string;
  /** Template type */
  template?: string;
  /** Skip dependency installation */
  install?: boolean;
  /** Skip git initialization */
  git?: boolean;
}

/**
 * Template file structure
 */
export interface TemplateFile {
  /** Relative file path */
  path: string;
  /** File content */
  content: string;
}

/**
 * Package.json dependencies structure
 */
export interface PackageJsonDependencies {
  /** Production dependencies */
  dependencies: Record<string, string>;
  /** Development dependencies */
  devDependencies: Record<string, string>;
}

