/**
 * SearchModal Component
 * Centered modal-style search with quick links and categorized results
 *
 * Features:
 * - Portal rendering to body
 * - Focus trap and keyboard navigation
 * - Fuzzy search with categories
 * - Quick links in empty state
 * - Recent searches support
 * - Keyboard shortcuts display
 * - Full accessibility (ARIA)
 *
 * @component SearchModal
 * @packageName @spexop/react
 */

import {
  ArrowRight,
  Clock,
  FileText,
  Home,
  Search,
  TrendingUp,
  X,
} from "@spexop/icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SearchModal.module.css";
import type { SearchModalProps, SearchResult, QuickLink } from "./SearchModal.types.js";

export function SearchModal({
  isOpen,
  onClose,
  results,
  quickLinks = [],
  recentSearches = [],
  placeholder = "Search pages, sections, and content...",
  className = "",
  onSearch,
  onResultSelect,
  onQuickLinkClick,
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Highlight search terms in text (returns JSX elements)
  const highlightText = useCallback((text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return <mark key={`highlight-${Math.random()}-${index}`}>{part}</mark>;
      }
      return <span key={`text-${Math.random()}-${index}`}>{part}</span>;
    });
  }, []);

  // Debounce search query
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (searchQuery.trim()) {
      setIsSearching(true);
      debounceTimeoutRef.current = setTimeout(() => {
        setDebouncedQuery(searchQuery);
        setIsSearching(false);
        // Track search analytics
        onSearch?.(searchQuery);
      }, 150);
    } else {
      setDebouncedQuery("");
      setIsSearching(false);
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchQuery, onSearch]);

  // Enhanced search with fuzzy matching and relevance scoring
  const filteredResults = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }

    const query = debouncedQuery.toLowerCase().trim();
    const queryWords = query.split(/\s+/);

    const scoredResults = results
      .map((result) => {
        let score = 0;
        const title = result.title.toLowerCase();
        const description = result.description?.toLowerCase() || "";
        const category = result.category?.toLowerCase() || "";
        const keywords = result.keywords?.map((kw) => kw.toLowerCase()) || [];

        // Exact title match (highest priority)
        if (title === query) {
          score += 1000;
        } else if (title.startsWith(query)) {
          score += 800;
        } else if (title.includes(query)) {
          score += 600;
        }

        // Word-based matching in title
        for (const word of queryWords) {
          if (title.includes(word)) {
            score += 200;
          }
        }

        // Description matching
        if (description.includes(query)) {
          score += 300;
        }
        for (const word of queryWords) {
          if (description.includes(word)) {
            score += 100;
          }
        }

        // Category matching
        if (category.includes(query)) {
          score += 150;
        }

        // Keyword matching
        for (const keyword of keywords) {
          if (keyword.includes(query)) {
            score += 250;
          }
          for (const word of queryWords) {
            if (keyword.includes(word)) {
              score += 50;
            }
          }
        }

        return { result, score };
      })
      .filter(({ score }) => score > 0);

    // Sort by score (highest first) and return results
    return scoredResults
      .sort((a, b) => b.score - a.score)
      .map(({ result }) => result);
  }, [debouncedQuery, results]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    for (const result of filteredResults) {
      const category = result.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(result);
    }
    return groups;
  }, [filteredResults]);

  // Reset state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setDebouncedQuery("");
      setSelectedIndex(0);
      setIsSearching(false);
      previousActiveElement.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Handle result selection with haptic feedback
  const handleSelect = useCallback(
    (result: SearchResult) => {
      // Haptic feedback for mobile devices
      if ("vibrate" in navigator) {
        navigator.vibrate(50);
      }
      // Track result selection analytics
      onResultSelect?.(result);
      onClose();
      // Navigation is handled by the onSelect callback in the result
    },
    [onClose, onResultSelect],
  );

  // Handle quick link click with haptic feedback
  const handleQuickLinkClick = useCallback(
    (link: QuickLink) => {
      // Haptic feedback for mobile devices
      if ("vibrate" in navigator) {
        navigator.vibrate(30);
      }
      // Track quick link click analytics
      onQuickLinkClick?.(link);
      onClose();
    },
    [onClose, onQuickLinkClick],
  );

  // Enhanced keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const totalItems =
        filteredResults.length + quickLinks.length + recentSearches.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (filteredResults.length > 0) {
            setSelectedIndex((prev) =>
              prev < filteredResults.length - 1 ? prev + 1 : 0,
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (filteredResults.length > 0) {
            setSelectedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredResults.length - 1,
            );
          }
          break;
        case "Enter":
          e.preventDefault();
          if (
            filteredResults.length > 0 &&
            selectedIndex >= 0 &&
            selectedIndex < filteredResults.length
          ) {
            handleSelect(filteredResults[selectedIndex]);
          }
          break;
        case "Tab":
          // Allow natural tab navigation
          break;
        case "Home":
          e.preventDefault();
          if (filteredResults.length > 0) {
            setSelectedIndex(0);
          }
          break;
        case "End":
          e.preventDefault();
          if (filteredResults.length > 0) {
            setSelectedIndex(filteredResults.length - 1);
          }
          break;
      }
    },
    [
      filteredResults,
      selectedIndex,
      handleSelect,
      quickLinks.length,
      recentSearches.length,
    ],
  );

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;

    const selectedElement = listRef.current.querySelector(
      `[data-result-index="${selectedIndex}"]`,
    );
    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // Backdrop click handler
  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // Swipe gesture handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;

    if (isUpSwipe) {
      onClose();
    }
  }, [touchStart, touchEnd, onClose]);

  if (!isOpen) return null;

  const showEmptyState = !searchQuery.trim();
  const showNoResults = searchQuery.trim() && filteredResults.length === 0;
  const showResults = searchQuery.trim() && filteredResults.length > 0;

  const modalContent = (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className={styles.backdrop}
        onClick={handleBackdropClick}
        aria-label="Close search modal"
        tabIndex={-1}
      />

      {/* Search Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        aria-describedby="search-description"
        className={`${styles.searchModal} ${className}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Search Input */}
        <div className={styles.searchInputWrapper}>
          <Search size={20} className={styles.searchIcon} />

          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-describedby="search-description"
            aria-expanded={filteredResults.length > 0}
            aria-activedescendant={
              filteredResults.length > 0 && selectedIndex >= 0
                ? `result-${selectedIndex}`
                : undefined
            }
            autoComplete="off"
            spellCheck={false}
            className={styles.searchInput}
          />

          {isSearching && (
            <div
              className={styles.searchingIndicator}
              aria-label="Searching..."
            >
              <div className={styles.spinner} />
            </div>
          )}

          <kbd className={styles.keyboardHint}>⌘K</kbd>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close search button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hidden description for screen readers */}
        <div id="search-description" className="sr-only">
          Search through pages, sections, and content. Use arrow keys to
          navigate results, Enter to select, and Escape to close.
        </div>

        {/* Modal Content */}
        <div
          ref={listRef}
          className={styles.modalContent}
          aria-label="Search results"
        >
          {/* Empty State - Quick Links */}
          {showEmptyState && (
            <div className={styles.emptyState}>
              {quickLinks.length > 0 && (
                <section>
                  <h3 className={styles.sectionHeading}>
                    <Home size={16} className={styles.sectionIcon} />
                    Quick Links
                  </h3>
                  <div className={styles.quickLinks}>
                    {quickLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        className={styles.quickLink}
                        onClick={(e) => {
                          e.preventDefault();
                          handleQuickLinkClick(link);
                        }}
                      >
                        {link.icon ? (
                          <div className={styles.quickLinkIcon}>
                            {link.icon}
                          </div>
                        ) : (
                          <Home size={28} className={styles.quickLinkIcon} />
                        )}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {recentSearches.length > 0 && (
                <section>
                  <h3 className={styles.sectionHeading}>
                    <Clock size={16} className={styles.sectionIcon} />
                    Recent Searches
                  </h3>
                  <div className={styles.guidesList}>
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        type="button"
                        className={styles.guideLink}
                        onClick={() => setSearchQuery(search)}
                      >
                        <ArrowRight size={18} className={styles.guideIcon} />
                        <span>"{search}"</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* Popular Results */}
              {results.length > 0 && (
                <section>
                  <h3 className={styles.sectionHeading}>
                    <TrendingUp size={16} className={styles.sectionIcon} />
                    Popular
                  </h3>
                  <div className={styles.guidesList}>
                    {results.slice(0, 5).map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        className={styles.guideLink}
                        onClick={() => handleSelect(result)}
                      >
                        {result.icon ? (
                          <div className={styles.guideIcon}>{result.icon}</div>
                        ) : (
                          <FileText size={18} className={styles.guideIcon} />
                        )}
                        <div className={styles.guideContent}>
                          <span className={styles.guideTitle}>
                            {result.title}
                          </span>
                          <span className={styles.guideDescription}>
                            {result.description}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* No Results State */}
          {showNoResults && (
            <div className={styles.noResults}>
              <Search size={48} className={styles.noResultsIcon} />
              <h3 className={styles.noResultsTitle}>
                No results found for "{searchQuery}"
              </h3>
              <p className={styles.noResultsDescription}>
                Try adjusting your search or browse our pages.
              </p>

              {quickLinks.length > 0 && (
                <div
                  className={styles.quickLinks}
                  style={{ justifyContent: "center" }}
                >
                  {quickLinks.slice(0, 3).map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className={styles.quickLink}
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuickLinkClick(link);
                      }}
                    >
                      {link.icon ? (
                        <div className={styles.quickLinkIcon}>{link.icon}</div>
                      ) : (
                        <FileText size={28} className={styles.quickLinkIcon} />
                      )}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Search Results */}
          {showResults && (
            <>
              <div className={styles.resultsCount}>
                Found {filteredResults.length} result
                {filteredResults.length !== 1 ? "s" : ""}
              </div>

              {Object.entries(groupedResults).map(
                ([category, categoryResults]) => (
                  <div key={category} className={styles.resultGroup}>
                    <div className={styles.resultGroupHeader}>
                      <FileText size={16} className={styles.resultGroupIcon} />
                      <h3 className={styles.resultGroupTitle}>{category}</h3>
                      <span className={styles.resultGroupCount}>
                        ({categoryResults.length})
                      </span>
                    </div>

                    <div className={styles.resultsList}>
                      {categoryResults.map((result, _index) => {
                        const globalIndex = filteredResults.indexOf(result);
                        const isActive = globalIndex === selectedIndex;

                        return (
                          <button
                            key={result.id}
                            type="button"
                            id={`result-${globalIndex}`}
                            data-result-index={globalIndex}
                            data-active={isActive}
                            className={styles.result}
                            onClick={() => handleSelect(result)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            role="option"
                            aria-selected={isActive}
                            aria-describedby={`result-desc-${globalIndex}`}
                          >
                            {result.icon ? (
                              <div className={styles.resultIcon}>
                                {result.icon}
                              </div>
                            ) : (
                              <FileText
                                size={20}
                                className={styles.resultIcon}
                              />
                            )}

                            <div className={styles.resultContent}>
                              <div className={styles.resultTitle}>
                                {highlightText(result.title, searchQuery)}
                              </div>
                              <div
                                id={`result-desc-${globalIndex}`}
                                className={styles.resultDescription}
                              >
                                {highlightText(result.description, searchQuery)}
                              </div>
                              {(result.badge || result.value) && (
                                <div className={styles.resultMeta}>
                                  {result.badge && (
                                    <span
                                      className={`${styles.resultBadge} ${
                                        result.badge === "Approved"
                                          ? styles.approved
                                          : ""
                                      }`}
                                    >
                                      {result.badge}
                                    </span>
                                  )}
                                  {result.value && (
                                    <code className={styles.resultValue}>
                                      {result.value}
                                    </code>
                                  )}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ),
              )}
            </>
          )}
        </div>

        {/* Keyboard Shortcuts Footer */}
        <div className={styles.modalFooter}>
          <div className={styles.shortcut}>
            <kbd className={styles.shortcutKey}>↑</kbd>
            <kbd className={styles.shortcutKey}>↓</kbd>
            <span>Navigate</span>
          </div>

          <div className={styles.shortcut}>
            <kbd className={styles.shortcutKey}>↵</kbd>
            <span>Select</span>
          </div>

          <div className={styles.shortcut}>
            <kbd className={styles.shortcutKey}>ESC</kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </>
  );

  // Render in portal
  return createPortal(modalContent, document.body);
}
