/**
 * TableOfContents Types
 *
 * Type definitions for the TableOfContents component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface TocItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** URL hash (e.g., "#section-id") */
  href: string;
  /** Nesting level (1-6) */
  level?: number;
  /** Whether item is currently active */
  active?: boolean;
  /** Nested sub-items */
  items?: TocItem[];
}

export interface TableOfContentsProps {
  /** Table of contents items */
  items: TocItem[];

  /** Title for the TOC */
  title?: string;

  /** Whether to make the TOC sticky */
  sticky?: boolean;

  /** Top offset for sticky positioning (in px) */
  stickyTop?: number;

  /** Maximum height for TOC (scrollable if exceeded) */
  maxHeight?: string;

  /** Callback when an item is clicked */
  onItemClick?: (item: TocItem) => void;

  /** Currently active item ID */
  activeItemId?: string;

  /** Whether to auto-highlight based on scroll position */
  autoHighlight?: boolean;

  /** Additional CSS class for container */
  className?: string;

  /** Additional CSS class for items */
  itemClassName?: string;
}

