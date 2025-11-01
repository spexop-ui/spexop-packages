/**
 * TableOfContents - Accessible content navigation component
 *
 * A table of contents component for navigating long-form content,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - clean borders for structure
 * - Principle 3: Typography before decoration - hierarchy through font weight
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Sticky positioning option
 * - Auto-highlight based on scroll position
 * - Nested items support (up to 6 levels)
 * - Keyboard navigation
 * - Screen reader accessible
 * - Smooth scrolling to sections
 * - Responsive behavior
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * const items = [
 *   {
 *     id: 'intro',
 *     label: 'Introduction',
 *     href: '#intro',
 *     level: 1,
 *   },
 *   {
 *     id: 'features',
 *     label: 'Features',
 *     href: '#features',
 *     level: 1,
 *     items: [
 *       { id: 'feature-1', label: 'Feature 1', href: '#feature-1', level: 2 },
 *     ],
 *   },
 * ];
 *
 * <TableOfContents items={items} sticky autoHighlight />
 * ```
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/index.js";
import styles from "./TableOfContents.module.css";
import type { TableOfContentsProps, TocItem } from "./TableOfContents.types.js";

// Individual TOC Item Component
function TocItemComponent({
  item,
  isActive,
  onClick,
  itemClassName,
  activeItemId,
}: {
  item: TocItem;
  isActive: boolean;
  onClick: (item: TocItem) => void;
  itemClassName?: string;
  activeItemId?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(item);

    // Smooth scroll to target
    const target = document.querySelector(item.href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL without jumping
      window.history.pushState(null, "", item.href);
    }
  };

  const itemClass = cn(
    styles.item,
    isActive && styles.active,
    item.level ? styles[`level-${item.level}`] : undefined,
    itemClassName,
  );

  return (
    <li className={styles["item-wrapper"]}>
      <a
        href={item.href}
        className={itemClass}
        onClick={handleClick}
        aria-current={isActive ? "location" : undefined}
      >
        {item.label}
      </a>
      {item.items && item.items.length > 0 && (
        <ul className={styles["nested-list"]}>
          {item.items.map((subItem) => (
            <TocItemComponent
              key={subItem.id}
              item={subItem}
              isActive={activeItemId === subItem.id}
              onClick={onClick}
              itemClassName={itemClassName}
              activeItemId={activeItemId}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TableOfContents({
  items,
  title = "On this page",
  sticky = false,
  stickyTop = 80,
  maxHeight = "calc(100vh - 160px)",
  onItemClick,
  activeItemId: controlledActiveId,
  autoHighlight = true,
  className,
  itemClassName,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | undefined>(
    controlledActiveId,
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Auto-highlight based on scroll position
  useEffect(() => {
    if (!autoHighlight) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the first intersecting entry
      const intersecting = entries.find((entry) => entry.isIntersecting);

      if (intersecting) {
        const id = intersecting.target.id;
        setActiveId(id);
      }
    };

    // Create observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "-100px 0px -50% 0px",
      threshold: 0.5,
    });

    // Observe all sections referenced in TOC
    const getAllIds = (tocItems: TocItem[]): string[] => {
      return tocItems.flatMap((item) => [
        item.href.replace("#", ""),
        ...(item.items ? getAllIds(item.items) : []),
      ]);
    };

    const ids = getAllIds(items);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    for (const element of elements) {
      observerRef.current.observe(element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items, autoHighlight]);

  // Use controlled active ID if provided
  const currentActiveId = controlledActiveId ?? activeId;

  const handleItemClick = (item: TocItem) => {
    if (!autoHighlight) {
      setActiveId(item.id);
    }
    onItemClick?.(item);
  };

  const containerClass = cn(
    styles.container,
    sticky && styles.sticky,
    className,
  );

  const containerStyle: React.CSSProperties = {
    ...(sticky && { 
      top: `${stickyTop}px`,
      position: 'sticky',
      alignSelf: 'flex-start',
    }),
  };

  const contentStyle: React.CSSProperties = {
    ...(maxHeight && { maxHeight, overflowY: "auto" }),
  };

  return (
    <nav
      className={containerClass}
      style={containerStyle}
      aria-label="Table of contents"
    >
      <div className={styles.content} style={contentStyle}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <ul className={styles.list}>
          {items.map((item) => (
            <TocItemComponent
              key={item.id}
              item={item}
              isActive={currentActiveId === item.id}
              onClick={handleItemClick}
              itemClassName={itemClassName}
              activeItemId={currentActiveId}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

