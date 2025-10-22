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

  /** Navigation links (if provided, enables horizontal expansion) */
  navLinks?: ContextNavLink[];

  /** Top offset when sticky (default: 80px) */
  topOffset?: number;

  /** Variant style */
  variant?: "light" | "dark";

  /** Additional CSS class */
  className?: string;

  /** HTML id */
  id?: string;
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
    },
    ref,
  ) => {
    const [isStuck, setIsStuck] = useState(false);
    const stickyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const element = stickyRef.current;
      if (!element) return;

      let scrollTimeout: NodeJS.Timeout;

      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const rect = element.getBoundingClientRect();
          const parentSection = element.closest("section");

          if (parentSection) {
            const parentRect = parentSection.getBoundingClientRect();

            // Element is stuck when it's at the top offset and parent is scrolling
            const stuck =
              rect.top <= topOffset + 1 &&
              rect.top >= topOffset - 1 &&
              parentRect.top < 0;

            setIsStuck(stuck);
          }
        }, 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      };
    }, [topOffset]);

    const hasNavigation = navLinks && navLinks.length > 0;

    const classes = [
      styles.contextNav,
      variant === "dark" && styles.dark,
      hasNavigation && styles.hasNav,
      isStuck && styles.stuck,
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
        style={{ top: `${topOffset}px` }}
      >
        {number && <span className={styles.number}>{number}</span>}
        <span className={styles.title}>{title}</span>

        {hasNavigation && (
          <>
            <span className={styles.divider} />
            <div className={styles.navItems}>
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.navLink}
                  style={{ transitionDelay: `${0.25 + index * 0.1}s` }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    );
  },
);

ContextNav.displayName = "ContextNav";
