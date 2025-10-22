/**
 * CodeBlock Types
 * TypeScript type definitions for the redesigned CodeBlock component
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 */

import type { ReactNode } from "react";

/**
 * Supported programming languages/frameworks
 */
export type CodeLanguage =
  | "typescript"
  | "javascript"
  | "tsx"
  | "jsx"
  | "css"
  | "html"
  | "json"
  | "bash"
  | "shell"
  | "python"
  | "rust"
  | "go"
  | string;

/**
 * Framework options for multi-framework tabs
 */
export type Framework = "react" | "vue" | "angular" | "vanilla" | string;

/**
 * Component variants
 */
export type CodeBlockVariant = "default" | "compact" | "minimal";

/**
 * Framework tab configuration
 */
export interface FrameworkTab {
  /** Framework identifier */
  framework: Framework;
  /** Display label (defaults to framework name) */
  label?: string;
  /** Code content for this framework */
  code: string;
}

/**
 * Props for CodeBlock component
 */
export interface CodeBlockProps {
  /**
   * Code content to display
   * Use string for single language, or FrameworkTab[] for multi-framework
   */
  code: string | FrameworkTab[];

  /**
   * Programming language for syntax highlighting
   * @default "javascript"
   */
  language?: CodeLanguage;

  /**
   * Title displayed in header
   */
  title?: string;

  /**
   * Meta information (file size, line count, etc.)
   * Example: "24 lines • 486 bytes" or "React 18+"
   */
  meta?: string;

  /**
   * Enable syntax highlighting
   * @default true
   */
  enableSyntaxHighlighting?: boolean;

  /**
   * Show line numbers
   * @default false
   */
  showLineNumbers?: boolean;

  /**
   * Show copy button in action bar
   * @default true
   */
  showCopy?: boolean;

  /**
   * Show download button in action bar
   * @default false
   */
  showDownload?: boolean;

  /**
   * Show share button in action bar
   * @default false
   */
  showShare?: boolean;

  /**
   * Custom action buttons to append to action bar
   */
  customActions?: ReactNode;

  /**
   * Additional info badge in action bar
   * Example: "TypeScript Ready", "v3.0"
   */
  infoBadge?: string;

  /**
   * Component variant
   * - default: Full featured with header and actions
   * - compact: Reduced padding for inline contexts
   * - minimal: Code only, no header
   * @default "default"
   */
  variant?: CodeBlockVariant;

  /**
   * Active framework (when using multi-framework tabs)
   */
  activeFramework?: Framework;

  /**
   * Callback when framework tab is changed
   */
  onFrameworkChange?: (framework: Framework) => void;

  /**
   * Callback when copy button is clicked
   * @param code - The code content being copied
   */
  onCopy?: (code: string) => void;

  /**
   * Callback when download button is clicked
   * @param code - The code content being downloaded
   * @param language - The language of the code
   */
  onDownload?: (code: string, language: string) => void;

  /**
   * Callback when share button is clicked
   * @param code - The code content being shared
   */
  onShare?: (code: string) => void;

  /**
   * Maximum height of code area
   * @default "40vh"
   */
  maxHeight?: string | number;

  /**
   * Custom label for copy button
   * @default "Copy Code"
   */
  copyButtonLabel?: string;

  /**
   * Custom label for copy button after successful copy
   * @default "Copied!"
   */
  copiedLabel?: string;

  /**
   * Custom label for download button
   * @default "Download"
   */
  downloadButtonLabel?: string;

  /**
   * Custom label for share button
   * @default "Share"
   */
  shareButtonLabel?: string;

  /**
   * Hide the header entirely (overrides variant)
   * @default false
   */
  hideHeader?: boolean;

  /**
   * Hide the action bar entirely
   * @default false
   */
  hideActions?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * ARIA label for the code block
   */
  "aria-label"?: string;
}

/**
 * Internal state for multi-framework code blocks
 */
export interface CodeBlockState {
  activeFramework: Framework;
  code: string;
  language: CodeLanguage;
  copied: boolean;
}
