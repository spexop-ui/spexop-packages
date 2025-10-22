/**
 * ScrollHeader Component
 *
 * A navigation header that appears when scrolling past hero content.
 * Provides quick navigation to page sections with smooth animations.
 * Features clean, minimal design with responsive behavior.
 *
 * @example
 * ```tsx
 * import { ScrollHeader } from '@spexop/react';
 * import { Home, Code, Settings } from '@spexop/icons';
 *
 * const sections = [
 *   { id: 'intro', label: 'Introduction', icon: Home, href: '#intro' },
 *   { id: 'features', label: 'Features', icon: Code, href: '#features' },
 *   { id: 'settings', label: 'Settings', icon: Settings, href: '#settings' },
 * ];
 *
 * <ScrollHeader
 *   sections={sections}
 *   scrollThreshold={300}
 *   activeSection="intro"
 * />
 * ```
 */

import { useEffect, useMemo, useState } from "react";
import { cn, debounce } from "../../../utils/index.js";
import styles from "./ScrollHeader.module.css";
import type { ScrollHeaderProps } from "./ScrollHeader.types.js";

// Breakpoint constants (matching SProvider)
const BREAKPOINT_MOBILE_MAX = 768;
const SIDEBAR_ICONS_WIDTH = 96;
const HEADER_HEIGHT_DESKTOP = 64;
const HEADER_HEIGHT_MOBILE = 56;
const SCROLL_OFFSET_PADDING = 20;

export function ScrollHeader({
  sections,
  scrollThreshold = 200,
  activeSection,
  onSectionClick,
  logo,
  actions,
  className,
  ariaLabel = "Page navigation header",
  sidebarState = "hidden",
}: ScrollHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarOffset, setSidebarOffset] = useState(0);

  // Memoize debounced resize handler
  const debouncedUpdateOffset = useMemo(
    () =>
      debounce(() => {
        const calculateOffset = () => {
          // Mobile: no sidebar offset (sidebar is below AppBar)
          if (window.innerWidth < BREAKPOINT_MOBILE_MAX) {
            return 0;
          }
          // Tablet/Desktop: account for sidebar width when visible
          return sidebarState === "icons" ? SIDEBAR_ICONS_WIDTH : 0;
        };
        setSidebarOffset(calculateOffset());
      }, 150),
    [sidebarState],
  );

  // Update sidebar offset when state or window size changes
  useEffect(() => {
    // Initial calculation
    const calculateOffset = () => {
      if (window.innerWidth < BREAKPOINT_MOBILE_MAX) {
        return 0;
      }
      return sidebarState === "icons" ? SIDEBAR_ICONS_WIDTH : 0;
    };
    setSidebarOffset(calculateOffset());

    // Listen for resize events with debouncing
    window.addEventListener("resize", debouncedUpdateOffset);

    return () => {
      window.removeEventListener("resize", debouncedUpdateOffset);
    };
  }, [sidebarState, debouncedUpdateOffset]);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setIsVisible(scrolled);
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  // Handle section click with scroll offset
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    href: string,
  ) => {
    e.preventDefault();

    // Call custom handler if provided
    if (onSectionClick) {
      onSectionClick(sectionId);
    }

    // Smooth scroll to section
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        // Calculate header offset based on screen size
        const isMobile = window.innerWidth < BREAKPOINT_MOBILE_MAX;
        const headerHeight = isMobile
          ? HEADER_HEIGHT_MOBILE
          : HEADER_HEIGHT_DESKTOP;
        const headerOffset = headerHeight + SCROLL_OFFSET_PADDING;

        // Get element position
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        // Try smooth scroll with fallback
        try {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        } catch {
          // Fallback for browsers that don't support smooth scroll
          window.scrollTo(0, offsetPosition);
        }
      }
    } else {
      // Navigate to URL
      window.location.href = href;
    }
  };

  // Loading state check
  const hasNoSections = !sections || sections.length === 0;

  // Warn if too many sections (only once per mount)
  useEffect(() => {
    if (sections && sections.length > 8) {
      console.warn(
        `ScrollHeader: ${sections.length} sections provided. Recommended maximum is 8 for optimal UX.`,
      );
    }
  }, [sections]);

  // Scroll position restoration
  useEffect(() => {
    // Store scroll position before navigation
    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        "scrollHeader-position",
        window.scrollY.toString(),
      );
    };

    // Restore scroll position on mount
    const storedPosition = sessionStorage.getItem("scrollHeader-position");
    if (storedPosition) {
      // Use timeout to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo(0, Number.parseInt(storedPosition, 10));
        sessionStorage.removeItem("scrollHeader-position");
      }, 0);
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <header
      className={cn(
        styles.scrollHeader,
        isVisible && styles.visible,
        className,
      )}
      style={{
        left: `${sidebarOffset}px`,
        // Use CSS variable for padding transition
        ["--scroll-header-padding-right" as string]: `calc(var(--s-spacing-6) + ${sidebarOffset}px)`,
      }}
      aria-hidden={!isVisible}
    >
      <div
        className={styles.container}
        style={{
          paddingRight: "var(--scroll-header-padding-right)",
        }}
      >
        {/* Logo/Brand Section */}
        {logo && <div className={styles.logoSection}>{logo}</div>}

        {/* Navigation Sections */}
        <nav className={styles.navigation} aria-label={ariaLabel}>
          {hasNoSections ? (
            <div
              className={styles.loadingState}
              aria-live="polite"
              aria-busy="true"
            >
              <div className={styles.skeletonItem} />
              <div className={styles.skeletonItem} />
              <div className={styles.skeletonItem} />
            </div>
          ) : (
            <ul className={styles.sectionList}>
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <li key={section.id} className={styles.sectionItem}>
                    <a
                      href={section.href}
                      className={cn(
                        styles.sectionLink,
                        isActive && styles.active,
                      )}
                      onClick={(e) =>
                        handleSectionClick(e, section.id, section.href)
                      }
                      aria-current={isActive ? "page" : undefined}
                    >
                      {Icon && (
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className={styles.sectionIcon}
                        />
                      )}
                      <span className={styles.sectionLabel}>
                        {section.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        {/* Action Buttons Section */}
        {actions && <div className={styles.actionsSection}>{actions}</div>}
      </div>
    </header>
  );
}

ScrollHeader.displayName = "ScrollHeader";
