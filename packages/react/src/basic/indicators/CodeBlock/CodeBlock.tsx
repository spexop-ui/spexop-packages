/**
 * CodeBlock - Redesigned code block component with custom highlighting
 *
 * A refined minimalist code block following "The Spexop Way":
 * - Borders before shadows (strong 2-3px borders)
 * - Typography before decoration (font weight for hierarchy)
 * - High contrast (WCAG AAA compliance)
 * - Token-based design (no magic numbers)
 * - Custom lightweight syntax highlighting
 * - Full keyboard navigation support
 * - Enhanced accessibility with ARIA
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   code="const hello = 'world';"
 *   language="javascript"
 *   title="Hello World"
 * />
 * ```
 */

import { Check, Copy, Download, Share } from "@spexop/icons";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "../../../utils/index.js";
import styles from "./CodeBlock.module.css";
import type {
  CodeBlockProps,
  CodeBlockState,
  Framework,
  FrameworkTab,
} from "./CodeBlock.types.js";

// Custom syntax highlighting with theme tokens
interface HighlightedToken {
  content: string;
  type:
    | "keyword"
    | "string"
    | "number"
    | "operator"
    | "punctuation"
    | "comment"
    | "variable"
    | "text";
}

function highlightCode(code: string, language: string): HighlightedToken[] {
  const lines = code.split("\n");
  const tokens: HighlightedToken[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineTokens = highlightLine(line, language);
    tokens.push(...lineTokens);

    // Add line break (except for last line)
    if (i < lines.length - 1) {
      tokens.push({ content: "\n", type: "text" });
    }
  }

  return tokens;
}

function highlightLine(line: string, language: string): HighlightedToken[] {
  const tokens: HighlightedToken[] = [];
  let current = "";
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    // const _nextChar = line[i + 1]; // Available for future use

    // Handle strings
    if (!inString && (char === '"' || char === "'" || char === "`")) {
      if (current) {
        tokens.push({ content: current, type: "text" });
        current = "";
      }
      inString = true;
      stringChar = char;
      current = char;
    } else if (inString && char === stringChar) {
      current += char;
      tokens.push({ content: current, type: "string" });
      current = "";
      inString = false;
      stringChar = "";
    } else if (inString) {
      current += char;
    } else {
      // Handle non-string content
      if (isOperator(char)) {
        if (current) {
          tokens.push({ content: current, type: "text" });
          current = "";
        }
        tokens.push({ content: char, type: "operator" });
      } else if (isPunctuation(char)) {
        if (current) {
          tokens.push({ content: current, type: "text" });
          current = "";
        }
        tokens.push({ content: char, type: "punctuation" });
      } else if (char === " " || char === "\t") {
        if (current) {
          tokens.push({ content: current, type: "text" });
          current = "";
        }
        tokens.push({ content: char, type: "text" });
      } else {
        current += char;
      }
    }
  }

  // Add remaining content
  if (current) {
    tokens.push({ content: current, type: "text" });
  }

  // Post-process to identify keywords and numbers
  return tokens.map((token) => {
    if (token.type === "text") {
      if (isKeyword(token.content, language)) {
        return { ...token, type: "keyword" };
      }
      if (isNumber(token.content)) {
        return { ...token, type: "number" };
      }
      if (isVariable(token.content)) {
        return { ...token, type: "variable" };
      }
    }
    return token;
  });
}

function isOperator(char: string): boolean {
  return ["+", "-", "*", "/", "=", "<", ">", "!", "&", "|", "?", ":"].includes(
    char,
  );
}

function isPunctuation(char: string): boolean {
  return ["(", ")", "[", "]", "{", "}", ",", ";", ".", ":"].includes(char);
}

function isKeyword(word: string, language: string): boolean {
  const keywords = {
    js: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "from",
      "as",
      "default",
    ],
    ts: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "from",
      "as",
      "default",
      "interface",
      "type",
      "enum",
    ],
    tsx: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "from",
      "as",
      "default",
      "interface",
      "type",
      "enum",
      "React",
    ],
    jsx: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "from",
      "as",
      "default",
      "React",
    ],
    css: ["@media", "@keyframes", "!important", "inherit", "initial", "unset"],
    html: [
      "!DOCTYPE",
      "html",
      "head",
      "body",
      "div",
      "span",
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ],
  };

  const langKey = language.toLowerCase() as keyof typeof keywords;
  return keywords[langKey]?.includes(word) || false;
}

function isNumber(word: string): boolean {
  return /^\d+(\.\d+)?$/.test(word);
}

function isVariable(word: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(word) && !isKeyword(word, "");
}

/**
 * CodeBlock Component
 * Redesigned code block with refined minimalism and custom highlighting
 * Enhanced with full keyboard navigation and accessibility features
 * @version 3.1.0
 */
export function CodeBlock({
  code,
  language = "javascript",
  title,
  meta,
  enableSyntaxHighlighting = true,
  showLineNumbers = false,
  showCopy = true,
  showDownload = false,
  showShare = false,
  customActions,
  infoBadge,
  variant = "default",
  activeFramework,
  onFrameworkChange,
  onCopy,
  onDownload,
  onShare,
  maxHeight = "40vh",
  copyButtonLabel = "Copy Code",
  copiedLabel = "Copied!",
  downloadButtonLabel = "Download",
  shareButtonLabel = "Share",
  hideHeader = false,
  hideActions = false,
  className = "",
  "aria-label": ariaLabel,
}: CodeBlockProps) {
  // Generate unique ID for accessibility
  const codeId = useId();
  const languageBadgeId = useId();
  const copyStatusId = useId();

  // Determine if we have multi-framework code
  const isMultiFramework = Array.isArray(code);
  const frameworks = isMultiFramework
    ? (code as FrameworkTab[]).map((tab) => tab.framework)
    : [];

  // Refs for keyboard navigation on tabs
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // State for active framework, copied status, and highlighted tokens
  const [state, setState] = useState<
    CodeBlockState & { tokens?: HighlightedToken[] }
  >(() => {
    if (isMultiFramework) {
      const tabs = code as FrameworkTab[];
      const initialFramework = activeFramework || tabs[0]?.framework || "react";
      const initialTab = tabs.find((t) => t.framework === initialFramework);
      return {
        activeFramework: initialFramework,
        code: initialTab?.code || "",
        language: initialFramework,
        copied: false,
        tokens: undefined,
      };
    }
    return {
      activeFramework: "react",
      code: code as string,
      language,
      copied: false,
      tokens: undefined,
    };
  });

  // Watch for theme changes (for future use)
  useEffect(() => {
    if (typeof document === "undefined") return;

    const observer = new MutationObserver(() => {
      // Theme change detection - can be used for future enhancements
      // Triggers re-render when theme changes for syntax highlighting
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Update state when activeFramework prop changes
  useEffect(() => {
    if (isMultiFramework && activeFramework) {
      const tabs = code as FrameworkTab[];
      const tab = tabs.find((t) => t.framework === activeFramework);
      if (tab) {
        setState((prev) => ({
          ...prev,
          activeFramework,
          code: tab.code,
          language: activeFramework,
          tokens: undefined, // Reset to trigger re-highlight
        }));
      }
    }
  }, [activeFramework, code, isMultiFramework]);

  // Optimized syntax highlighting with useMemo
  const highlightedTokens = useMemo(() => {
    if (!enableSyntaxHighlighting) {
      return undefined;
    }

    try {
      const codeString =
        typeof state.code === "string" ? state.code : String(state.code || "");
      return highlightCode(codeString, state.language);
    } catch (error) {
      // Silently fail and return undefined - component will show plain code
      return undefined;
    }
  }, [state.code, state.language, enableSyntaxHighlighting]);

  // Handle framework tab change
  const handleFrameworkChange = (framework: Framework) => {
    const tabs = code as FrameworkTab[];
    const tab = tabs.find((t) => t.framework === framework);
    if (tab) {
      setState((prev) => ({
        ...prev,
        activeFramework: framework,
        code: tab.code,
        language: framework,
        tokens: undefined, // Reset to trigger re-highlight
      }));
      onFrameworkChange?.(framework);
    }
  };

  // Handle copy button click
  const handleCopy = async () => {
    try {
      const textToCopy =
        typeof state.code === "string" ? state.code : String(state.code || "");
      await navigator.clipboard.writeText(textToCopy);
      setState((prev) => ({ ...prev, copied: true }));
      onCopy?.(textToCopy);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setState((prev) => ({ ...prev, copied: false }));
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  // Handle download button click
  const handleDownload = () => {
    const textToDownload =
      typeof state.code === "string" ? state.code : String(state.code || "");
    const blob = new Blob([textToDownload], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${state.language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onDownload?.(textToDownload, state.language);
  };

  // Handle share button click
  const handleShare = () => {
    const textToShare =
      typeof state.code === "string" ? state.code : String(state.code || "");
    onShare?.(textToShare);
  };

  // Handle keyboard navigation for framework tabs
  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    const tabCount = frameworks.length;
    let newIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        newIndex = (currentIndex + 1) % tabCount;
        break;
      case "ArrowLeft":
        event.preventDefault();
        newIndex = (currentIndex - 1 + tabCount) % tabCount;
        break;
      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newIndex = tabCount - 1;
        break;
      default:
        return;
    }

    // Focus the new tab
    tabRefs.current[newIndex]?.focus();
    // Change to the new framework
    handleFrameworkChange(frameworks[newIndex]);
  };

  // Ensure code is always a string
  const codeString =
    typeof state.code === "string" ? state.code : String(state.code || "");

  // Split code into lines for line numbers
  const lines = showLineNumbers ? codeString.split("\n") : [];

  // Determine if we should show header
  const shouldShowHeader = !hideHeader && (title || meta || isMultiFramework);

  // Determine if we should show actions
  const shouldShowActions =
    !hideActions &&
    (showCopy || showDownload || showShare || customActions || infoBadge);

  // Get display language label
  const displayLanguage = state.language.toUpperCase();

  // Convert maxHeight to string
  const maxHeightValue =
    typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

  // Render highlighted tokens
  function renderHighlightedTokens(tokens: HighlightedToken[]) {
    return tokens.map((token, index) => (
      <span
        key={`token-${index}-${token.type}-${token.content.slice(0, 10)}`}
        className={cn(styles.token, styles[`token--${token.type}`])}
      >
        {token.content}
      </span>
    ));
  }

  // Render highlighted line (for line numbers)
  function renderHighlightedLine(line: string, language: string) {
    const lineTokens = highlightLine(line, language);
    return lineTokens.map((token, index) => (
      <span
        key={`line-token-${index}-${token.type}-${token.content.slice(0, 10)}`}
        className={cn(styles.token, styles[`token--${token.type}`])}
      >
        {token.content}
      </span>
    ));
  }

  return (
    <section
      className={cn(
        styles.codeblock,
        variant === "compact" && styles["codeblock--compact"],
        variant === "minimal" && styles["codeblock--minimal"],
        className,
      )}
      aria-label={ariaLabel || `${displayLanguage} code example`}
    >
      {/* Header */}
      {shouldShowHeader && (
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            {title && <h3 className={styles.title}>{title}</h3>}
            <span className={styles.languageBadge} id={languageBadgeId}>
              {displayLanguage}
            </span>
          </div>
          {meta && <span className={styles.meta}>{meta}</span>}
        </div>
      )}

      {/* Framework Tabs */}
      {isMultiFramework && frameworks.length > 1 && (
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Framework selection"
        >
          {frameworks.map((framework, index) => {
            const tabs = code as FrameworkTab[];
            const tab = tabs.find((t) => t.framework === framework);
            const label = tab?.label || framework;
            const isActive = state.activeFramework === framework;

            return (
              <button
                key={framework}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={codeId}
                tabIndex={isActive ? 0 : -1}
                className={cn(styles.tab, isActive && styles["tab--active"])}
                onClick={() => handleFrameworkChange(framework)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Code Display */}
      <div className={styles.codeWrapper}>
        <pre
          className={styles.code}
          style={{ maxHeight: maxHeightValue }}
          id={codeId}
          role="tabpanel"
          aria-describedby={languageBadgeId}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: Tabpanel role requires tabIndex for keyboard accessibility
          tabIndex={0}
        >
          {showLineNumbers ? (
            <code className={styles.codeContent}>
              {lines.map((line, index) => (
                <div
                  key={`line-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: Line numbers are stable
                    index
                  }`}
                  className={styles.line}
                >
                  <span className={styles.lineNumber}>{index + 1}</span>
                  <span className={styles.lineContent}>
                    {enableSyntaxHighlighting
                      ? renderHighlightedLine(line, state.language)
                      : line}
                  </span>
                </div>
              ))}
            </code>
          ) : (
            <code className={styles.codeContent}>
              {highlightedTokens
                ? renderHighlightedTokens(highlightedTokens)
                : codeString}
            </code>
          )}
        </pre>
      </div>

      {/* Action Bar */}
      {shouldShowActions && (
        <div className={styles.actions} role="group" aria-label="Code actions">
          <div className={styles.actionsLeft}>
            {showCopy && (
              <button
                type="button"
                className={cn(
                  styles.btn,
                  !showDownload && !showShare && styles["btn--primary"],
                )}
                onClick={handleCopy}
                aria-label={state.copied ? copiedLabel : copyButtonLabel}
                aria-live="polite"
                aria-atomic="true"
              >
                {state.copied ? (
                  <>
                    <Check
                      className={styles.btnIcon}
                      size={16}
                      strokeWidth={2}
                    />
                    <span id={copyStatusId}>{copiedLabel}</span>
                  </>
                ) : (
                  <>
                    <Copy
                      className={styles.btnIcon}
                      size={16}
                      strokeWidth={2}
                    />
                    {copyButtonLabel}
                  </>
                )}
              </button>
            )}

            {showDownload && (
              <button
                type="button"
                className={styles.btn}
                onClick={handleDownload}
                aria-label={downloadButtonLabel}
              >
                <Download
                  className={styles.btnIcon}
                  size={16}
                  strokeWidth={2}
                />
                {downloadButtonLabel}
              </button>
            )}

            {showShare && (
              <button
                type="button"
                className={styles.btn}
                onClick={handleShare}
                aria-label={shareButtonLabel}
              >
                <Share className={styles.btnIcon} size={16} strokeWidth={2} />
                {shareButtonLabel}
              </button>
            )}
          </div>

          <div className={styles.actionsRight}>
            {infoBadge && <span className={styles.infoBadge}>{infoBadge}</span>}
            {customActions && (
              <div className={styles.customActions}>{customActions}</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
