/**
 * Accordion Types
 *
 * Type definitions for the Accordion component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface AccordionItem {
  /** Unique identifier */
  id: string;
  /** Item title */
  title: React.ReactNode;
  /** Item content */
  content: React.ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
}

export interface AccordionProps {
  /** Accordion items */
  items: AccordionItem[];

  /** Expanded item IDs (controlled) */
  expandedItems?: string[];

  /** Callback when items expand/collapse */
  onExpandedChange?: (expandedItems: string[]) => void;

  /** Default expanded item IDs (uncontrolled) */
  defaultExpandedItems?: string[];

  /** Whether multiple items can be expanded */
  allowMultiple?: boolean;

  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Visual variant */
  variant?: "default" | "bordered" | "separated";

  /** Additional CSS class */
  className?: string;
}
