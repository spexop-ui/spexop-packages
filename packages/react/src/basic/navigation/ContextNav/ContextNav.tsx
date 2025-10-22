/**
 * ContextNav Component - Context-Aware Expandable Navigation
 * Dual-purpose sticky component that serves as section indicator and contextual navigation
 *
 * @packageName @spexop/react
 * @description Sticky navigation that expands horizontally when stuck at top
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 1.0.0
 * @since 2025-10-14
 *
 */

import { forwardRef, useEffect, useRef, useState } from "react";
import { Icon } from "../../indicators/Icon/Icon.js";
import styles from "./ContextNav.module.css";

export interface ContextNavLink {
  label: string;
  href: string;
}

export interface ContextNavProps {
  /** Section number (e.g., "01", "02") */
  number?: string;

  /** Section title/label */
  title: string;

  /** Navigation links (if provided, enables expansion) */
  navLinks?: ContextNavLink[];

  /** Top offset when sticky (default: 80px) */
  topOffset?: number;

  /** Variant style */
  variant?: "light" | "dark";

  /** Additional CSS class */
  className?: string;

  /** HTML id */
  id?: string;

  /** Navigation scope - determines sticky behavior and positioning (default: "section") */
  scope?: "section" | "page";

  /** Stack below another navigation level for automatic offset calculation */
  stackBelow?: "page" | "section" | number;

  /** How to handle overflow when there are many navigation items */
  overflowBehavior?: "extend" | "wrap" | "scroll";

  /** Maximum width before wrapping (only applies when overflowBehavior="wrap") */
  maxWidth?: string | number;
}

export const ContextNav = forwardRef<HTMLDivElement, ContextNavProps>(
  (
    {
      number,
      title,
      navLinks,
      topOffset = 80,
      variant = "light",
      className,
      id,
      scope = "section",
      stackBelow,
      overflowBehavior = "extend",
      maxWidth = "800px",
    },
    ref,
  ) => {
    const [isStuck, setIsStuck] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeLink, setActiveLink] = useState<string | null>(null);
    const [hasScrolled, setHasScrolled] = useState(false);
    const stickyRef = useRef<HTMLDivElement>(null);

    // Detect scroll position (show when scrolled, hide at top)
    useEffect(() => {
      if (scope !== "page") return;

      const handleScroll = () => {
        setHasScrolled(window.scrollY > 0);
      };

      // Check initial scroll position
      handleScroll();

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [scope]);

    // Screen size detection for responsive behavior
    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 1023);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Sticky detection logic + hero scroll detection
    useEffect(() => {
      const element = stickyRef.current;
      if (!element) return;

      let scrollTimeout: NodeJS.Timeout;

      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const rect = element.getBoundingClientRect();

          // For page scope, check if stuck at top
          if (scope === "page") {
            const stuck = rect.top <= topOffset + 2;
            setIsStuck(stuck);
          }
          // For section scope, check if parent section is scrolling
          else {
            const parentSection = element.closest("section");
            if (parentSection) {
              const parentRect = parentSection.getBoundingClientRect();
              const stuck = rect.top <= topOffset + 2 && parentRect.top < -2;
              setIsStuck(stuck);
            }
          }
        }, 12); // ~60fps for smoother detection
      };

      // Run on mount to check initial state
      handleScroll();

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      };
    }, [topOffset, scope]);

    // Scroll spy for active link highlighting
    useEffect(() => {
      if (!navLinks || navLinks.length === 0) return;

      const handleScroll = () => {
        const scrollPosition = window.scrollY + 100; // Offset for better UX

        // Find the section that's currently in view
        for (let i = navLinks.length - 1; i >= 0; i--) {
          const link = navLinks[i];
          const element = document.querySelector(link.href);

          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;

            if (scrollPosition >= elementTop) {
              setActiveLink(link.href);
              break;
            }
          }
        }
      };

      // Set initial active link
      handleScroll();

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [navLinks]);

    const hasNavigation = navLinks && navLinks.length > 0;

    // Calculate actual top offset with stacking
    let actualTopOffset = topOffset;
    if (stackBelow) {
      if (stackBelow === "page") {
        actualTopOffset = topOffset + 60; // Page nav height
      } else if (stackBelow === "section") {
        actualTopOffset = topOffset + 60; // Section nav height
      } else if (typeof stackBelow === "number") {
        actualTopOffset = topOffset + stackBelow;
      }
    }

    // Hide section nav on mobile (only show page nav)
    if (isMobile && scope === "section") {
      return null;
    }

    // Mobile toggle handler
    const handleToggle = () => {
      if (isMobile) {
        setIsExpanded(!isExpanded);
      }
    };

    // Auto-close after clicking link on mobile
    const handleLinkClick = () => {
      if (isMobile) {
        setIsExpanded(false);
      }
      // Let browser handle smooth scroll via href
    };

    const classes = [
      styles.contextNav,
      variant === "dark" && styles.dark,
      hasNavigation && styles.hasNav,
      isStuck && styles.stuck,
      isMobile && styles.mobile,
      isExpanded && styles.expanded,
      overflowBehavior === "wrap" && styles.wrap,
      overflowBehavior === "scroll" && styles.scroll,
      scope === "page" && !hasScrolled && styles.hiddenBeforeHero,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={(node) => {
          // Handle both refs
          stickyRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        id={id}
        className={classes}
        style={{
          top: `${actualTopOffset}px`,
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        }}
        data-scope={scope}
        data-stack-below={stackBelow}
        data-overflow-behavior={overflowBehavior}
      >
        {number && <span className={styles.number}>{number}</span>}
        <span className={styles.title}>{title}</span>

        {/* Mobile toggle button */}
        {isMobile && hasNavigation && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={handleToggle}
            aria-label={isExpanded ? "Close navigation" : "Open navigation"}
            aria-expanded={isExpanded}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size="md" />
          </button>
        )}

        {hasNavigation && (
          <>
            <span className={styles.divider} />
            <div className={styles.navItems}>
              {navLinks.map((link, index) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                    style={
                      !isMobile
                        ? { transitionDelay: `${0.25 + index * 0.1}s` }
                        : undefined
                    }
                    onClick={handleLinkClick}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  },
);

ContextNav.displayName = "ContextNav";
