import { Search } from "@spexop/icons";
import {
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./CommandPalette.module.css";

// Fuzzy search scoring function
const calculateFuzzyScore = (text: string, query: string): number => {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  // Exact match gets highest score
  if (textLower === queryLower) return 1000;

  // Starts with query gets high score
  if (textLower.startsWith(queryLower)) return 900;

  // Contains query gets medium score
  if (textLower.includes(queryLower)) return 500;

  // For longer queries (more than 6 characters), require word-based matching
  if (queryLower.length > 6) {
    const textWords = textLower.split(/\s+/);
    const queryWords = queryLower.split(/\s+/);

    // Check if any query word starts with any text word
    for (const queryWord of queryWords) {
      for (const textWord of textWords) {
        if (textWord.startsWith(queryWord)) {
          return 400;
        }
      }
    }

    // Check if any query word is contained in any text word
    for (const queryWord of queryWords) {
      for (const textWord of textWords) {
        if (textWord.includes(queryWord)) {
          return 300;
        }
      }
    }

    // For longer queries, don't do character-based fuzzy matching
    return 0;
  }

  // For shorter queries, allow fuzzy matching but be strict
  let queryIndex = 0;
  let consecutiveMatches = 0;
  let maxConsecutive = 0;

  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++;
      consecutiveMatches++;
      maxConsecutive = Math.max(maxConsecutive, consecutiveMatches);
    } else {
      consecutiveMatches = 0;
    }
  }

  // If all query characters found in order, allow fuzzy matching
  if (queryIndex === queryLower.length) {
    // For very short queries (3-4 chars), be more lenient
    if (queryLower.length <= 4) {
      return 300 + maxConsecutive * 10;
    }

    // For medium queries, require at least 2 consecutive matches
    if (maxConsecutive >= 2) {
      const matchRatio = queryLower.length / textLower.length;
      if (matchRatio >= 0.3) {
        return 300 + maxConsecutive * 10;
      }
    }
  }

  return 0;
};

export interface CommandPaletteCommand {
  /**
   * Unique identifier for the command
   */
  id: string;

  /**
   * Command label
   */
  label: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Optional icon element
   */
  icon?: React.ReactNode;

  /**
   * Optional category for grouping
   */
  category?: string;

  /**
   * Keyboard shortcut hint (e.g., "⌘K", "Ctrl+K")
   */
  shortcut?: string;

  /**
   * Callback when command is selected
   */
  onSelect: () => void;

  /**
   * Whether the command is disabled
   */
  disabled?: boolean;

  /**
   * Search keywords for better matching
   */
  keywords?: string[];
}

export interface CommandPaletteProps {
  /**
   * Whether the command palette is open
   */
  open: boolean;

  /**
   * Callback when the command palette should close
   */
  onClose: () => void;

  /**
   * List of available commands
   */
  commands: CommandPaletteCommand[];

  /**
   * Recent commands to show at the top
   */
  recentCommands?: CommandPaletteCommand[];

  /**
   * Placeholder text for search input
   * @default "Type a command or search..."
   */
  placeholder?: string;

  /**
   * Whether to show category headers
   * @default true
   */
  showCategories?: boolean;

  /**
   * Whether to show keyboard shortcuts
   * @default true
   */
  showShortcuts?: boolean;

  /**
   * Whether to show recent commands section
   * @default true
   */
  showRecent?: boolean;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Custom styles
   */
  style?: React.CSSProperties;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;

  /**
   * Maximum number of results to show
   * @default 10
   */
  maxResults?: number;

  /**
   * Empty state message
   * @default "No commands found"
   */
  emptyMessage?: string;

  /**
   * Callback when a command is selected
   */
  onCommandSelect?: (command: CommandPaletteCommand) => void;
}

/**
 * Command Palette Component - Spotlight-style command search
 *
 * Features:
 * - Portal rendering to body
 * - Focus trap and keyboard navigation
 * - Fuzzy search with categories
 * - Keyboard shortcuts display
 * - ESC to close, Enter to execute
 * - Up/Down arrow navigation
 * - Full accessibility (ARIA)
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * // Global Cmd+K handler
 * useEffect(() => {
 *   const handler = (e: KeyboardEvent) => {
 *     if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
 *       e.preventDefault();
 *       setOpen(true);
 *     }
 *   };
 *   window.addEventListener('keydown', handler);
 *   return () => window.removeEventListener('keydown', handler);
 * }, []);
 *
 * <CommandPalette
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   commands={[
 *     {
 *       id: 'home',
 *       label: 'Go to Home',
 *       category: 'Navigation',
 *       onSelect: () => navigate('/'),
 *     },
 *   ]}
 * />
 * ```
 */
export function CommandPalette({
  open,
  onClose,
  commands,
  recentCommands = [],
  placeholder = "Type a command or search...",
  showCategories = true,
  showShortcuts = true,
  showRecent = true,
  className = "",
  style,
  ariaLabel = "Command palette",
  maxResults = 10,
  emptyMessage = "No commands found",
  onCommandSelect,
}: CommandPaletteProps): ReactElement | null {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Virtualization constants
  const ITEM_HEIGHT = 48; // Height of each command item in pixels
  const CONTAINER_HEIGHT = 320; // Height of the command list container
  const OVERSCAN = 5; // Number of items to render outside the visible area
  const VIRTUALIZATION_THRESHOLD = 50; // Only virtualize if there are more than 50 commands

  // Filter and search commands with fuzzy matching
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) {
      // When no search query, show recent commands first, then all commands
      const allCommands = [...commands];
      const recentIds = new Set(recentCommands.map((cmd) => cmd.id));
      const nonRecentCommands = allCommands.filter(
        (cmd) => !recentIds.has(cmd.id),
      );
      return [...recentCommands, ...nonRecentCommands].slice(0, maxResults);
    }

    const query = searchQuery.toLowerCase();
    const recentIds = new Set(recentCommands.map((cmd) => cmd.id));

    // Combine commands and recent commands, avoiding duplicates
    const allCommands = [
      ...recentCommands,
      ...commands.filter((cmd) => !recentIds.has(cmd.id)),
    ];

    const results = allCommands
      .filter((cmd) => !cmd.disabled)
      .map((cmd) => {
        let score = 0;

        // Calculate scores for different fields
        const labelScore = calculateFuzzyScore(cmd.label, query) * 3; // Label is most important
        const descScore = cmd.description
          ? calculateFuzzyScore(cmd.description, query) * 2
          : 0;
        const categoryScore = cmd.category
          ? calculateFuzzyScore(cmd.category, query)
          : 0;
        const keywordScore = cmd.keywords
          ? Math.max(
              ...cmd.keywords.map((kw) => calculateFuzzyScore(kw, query)),
            ) * 1.5
          : 0;

        score = Math.max(labelScore, descScore, categoryScore, keywordScore);

        // Boost score for recent commands
        const isRecent = recentIds.has(cmd.id);
        if (isRecent) score *= 1.2;

        return { command: cmd, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .map(({ command }) => command);

    return results.slice(0, maxResults);
  }, [searchQuery, commands, recentCommands, maxResults]);

  // Virtualization logic
  const virtualizedItems = useMemo(() => {
    const totalItems = filteredCommands.length;
    if (totalItems === 0)
      return {
        startIndex: 0,
        endIndex: 0,
        visibleItems: [],
        shouldVirtualize: false,
      };

    // Only virtualize if there are many commands
    const shouldVirtualize = totalItems > VIRTUALIZATION_THRESHOLD;

    if (!shouldVirtualize) {
      return {
        startIndex: 0,
        endIndex: totalItems - 1,
        visibleItems: filteredCommands,
        totalHeight: totalItems * ITEM_HEIGHT,
        offsetY: 0,
        shouldVirtualize: false,
      };
    }

    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN,
    );
    const endIndex = Math.min(
      totalItems - 1,
      Math.ceil((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT) + OVERSCAN,
    );

    const visibleItems = filteredCommands.slice(startIndex, endIndex + 1);

    return {
      startIndex,
      endIndex,
      visibleItems,
      totalHeight: totalItems * ITEM_HEIGHT,
      offsetY: startIndex * ITEM_HEIGHT,
      shouldVirtualize: true,
    };
  }, [filteredCommands, scrollTop]);

  // Group commands by category
  const groupedCommands = useMemo(() => {
    if (!showCategories && !showRecent) {
      return { "": filteredCommands };
    }

    const groups: Record<string, CommandPaletteCommand[]> = {};
    const recentIds = new Set(recentCommands.map((cmd) => cmd.id));

    // Separate recent commands if showing recent and no search query
    if (showRecent && !searchQuery.trim() && recentCommands.length > 0) {
      const recentCommandsInResults = filteredCommands.filter((cmd) =>
        recentIds.has(cmd.id),
      );
      if (recentCommandsInResults.length > 0) {
        groups.Recent = recentCommandsInResults;
      }
    }

    // Group remaining commands by category
    for (const cmd of filteredCommands) {
      // Skip if already in recent group
      if (showRecent && !searchQuery.trim() && recentIds.has(cmd.id)) {
        continue;
      }

      const category = cmd.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(cmd);
    }

    return groups;
  }, [
    filteredCommands,
    showCategories,
    showRecent,
    recentCommands,
    searchQuery,
  ]);

  // Reset state when opened/closed
  useEffect(() => {
    if (open) {
      setSearchQuery("");
      setSelectedIndex(0);
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus input after a brief delay to ensure portal is rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      // Restore focus when closed
      previousActiveElement.current?.focus();
    }
  }, [open]);

  // Reset selected index when search changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: We intentionally only depend on searchQuery
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Announce search results and navigation changes
  useEffect(() => {
    if (!open) return;

    if (searchQuery.trim()) {
      const resultCount = filteredCommands.length;
      if (resultCount === 0) {
        setAnnouncement("No commands found");
      } else {
        setAnnouncement(
          `${resultCount} ${resultCount === 1 ? "command" : "commands"} found`,
        );
      }
    } else {
      setAnnouncement("");
    }
  }, [open, searchQuery, filteredCommands.length]);

  // Announce selection changes
  useEffect(() => {
    if (!open || filteredCommands.length === 0) return;

    const selectedCommand = filteredCommands[selectedIndex];
    if (selectedCommand) {
      const description = selectedCommand.description
        ? `, ${selectedCommand.description}`
        : "";
      setAnnouncement(`${selectedCommand.label}${description}`);
    }
  }, [open, selectedIndex, filteredCommands]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  // ESC key handler and focus trapping
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    // Focus trapping
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = document.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [open, onClose]);

  // Handle command selection
  const handleSelect = useCallback(
    (command: CommandPaletteCommand) => {
      if (command.disabled) return;

      // Call custom handler if provided
      onCommandSelect?.(command);

      // Execute command
      command.onSelect();

      // Close palette
      onClose();
    },
    [onClose, onCommandSelect],
  );

  // Keyboard navigation with enhanced accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (filteredCommands.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev < filteredCommands.length - 1 ? prev + 1 : 0;
            return newIndex;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => {
            const newIndex = prev > 0 ? prev - 1 : filteredCommands.length - 1;
            return newIndex;
          });
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < filteredCommands.length) {
            handleSelect(filteredCommands[selectedIndex]);
          }
          break;
        case "Home":
          e.preventDefault();
          setSelectedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setSelectedIndex(filteredCommands.length - 1);
          break;
        case "PageUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(0, prev - 5));
          break;
        case "PageDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(filteredCommands.length - 1, prev + 5),
          );
          break;
      }
    },
    [filteredCommands, selectedIndex, handleSelect],
  );

  // Scroll selected item into view with reduced motion support
  useEffect(() => {
    if (!listRef.current) return;

    const selectedElement = listRef.current.querySelector(
      `[data-command-index="${selectedIndex}"]`,
    );
    if (selectedElement) {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      selectedElement.scrollIntoView({
        block: "nearest",
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  }, [selectedIndex]);

  // Handle scroll events for virtualization
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Backdrop click handler
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!open) return null;

  let commandIndex = 0;

  const paletteContent = (
    <>
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={handleBackdropClick}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
      >
        {/* Command Palette Container */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          className={`${styles.palette} ${className}`}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          style={style}
        >
          {/* ARIA Live Region for announcements */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: "0",
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: "0",
            }}
          >
            {announcement}
          </div>
          {/* Search Input */}
          <div className={styles.searchContainer}>
            {/* Search Icon */}
            <Search
              size={20}
              className={styles.searchIcon}
              aria-hidden="true"
            />

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              aria-label={placeholder}
              aria-describedby="search-hint"
              aria-autocomplete="list"
              aria-expanded={filteredCommands.length > 0}
              autoComplete="off"
              spellCheck={false}
              className={styles.searchInput}
            />

            {/* Keyboard hint */}
            <div className={styles.keyboardHintContainer}>
              <kbd className={styles.kbd}>ESC</kbd>
            </div>

            {/* Search hint for screen readers */}
            <div id="search-hint" className="sr-only">
              Type to search commands. Use arrow keys to navigate, Enter to
              select, Escape to close.
            </div>
          </div>

          {/* Command List */}
          <div
            ref={listRef}
            role="listbox"
            aria-label={`Commands, ${filteredCommands.length} ${filteredCommands.length === 1 ? "item" : "items"}`}
            aria-activedescendant={
              filteredCommands.length > 0
                ? `command-${filteredCommands[selectedIndex]?.id}`
                : undefined
            }
            className={styles.commandList}
            tabIndex={-1}
            onScroll={handleScroll}
            style={{
              height: virtualizedItems.shouldVirtualize
                ? CONTAINER_HEIGHT
                : "auto",
              overflowY: virtualizedItems.shouldVirtualize ? "auto" : "visible",
              position: "relative",
            }}
          >
            {filteredCommands.length === 0 ? (
              // Empty state
              <div className={styles.emptyState}>{emptyMessage}</div>
            ) : (
              // Commands grouped by category
              Object.entries(groupedCommands).map(
                ([category, categoryCommands]) => (
                  <div key={category} className={styles.categoryContainer}>
                    {/* Category Header */}
                    {((showCategories && category) ||
                      (showRecent && category === "Recent")) && (
                      <div className={styles.categoryHeader}>{category}</div>
                    )}

                    {/* Commands in category */}
                    {categoryCommands.map((command) => {
                      const currentIndex = commandIndex++;
                      const isSelected = currentIndex === selectedIndex;

                      return (
                        <button
                          key={command.id}
                          id={`command-${command.id}`}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={command.disabled}
                          aria-label={
                            command.description
                              ? `${command.label}, ${command.description}`
                              : command.label
                          }
                          data-command-index={currentIndex}
                          onClick={() => handleSelect(command)}
                          disabled={command.disabled}
                          className={styles.commandButton}
                          onMouseEnter={() => setSelectedIndex(currentIndex)}
                        >
                          {/* Icon */}
                          {command.icon && (
                            <div className={styles.commandIcon}>
                              {command.icon}
                            </div>
                          )}

                          {/* Label & Description */}
                          <div className={styles.commandContent}>
                            <div
                              className={`${styles.commandLabel} ${command.description ? styles.hasDescription : ""}`}
                            >
                              {command.label}
                            </div>
                            {command.description && (
                              <div className={styles.commandDescription}>
                                {command.description}
                              </div>
                            )}
                          </div>

                          {/* Keyboard Shortcut */}
                          {showShortcuts && command.shortcut && (
                            <kbd
                              className={`${styles.kbd} ${styles.commandShortcut}`}
                            >
                              {command.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ),
              )
            )}
          </div>

          {/* Footer with hints */}
          <div className={styles.footer}>
            <div className={styles.footerHint}>
              <kbd className={styles.kbd}>↑↓</kbd>
              <span className={styles.footerLabel}>Navigate</span>
            </div>
            <div className={styles.footerHint}>
              <kbd className={styles.kbd}>↵</kbd>
              <span className={styles.footerLabel}>Select</span>
            </div>
            <div className={styles.footerHint}>
              <kbd className={styles.kbd}>ESC</kbd>
              <span className={styles.footerLabel}>Close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Render in portal
  return createPortal(paletteContent, document.body) as unknown as ReactElement;
}

CommandPalette.displayName = "CommandPalette";
