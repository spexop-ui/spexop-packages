/**
 * NavSection Component Types
 * Accordion-style navigation section for sidebar
 *
 * @component NavSection
 * @packageName @spexop/react
 * @description Accordion-style navigation section for sidebar with expand/collapse
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 */

import type { ReactNode } from "react";

export interface NavSectionProps {
  /**
   * Section label/title
   */
  label: string;

  /**
   * Whether section is open by default
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Section content (NavLink components)
   */
  children?: ReactNode;

  /**
   * Callback when section is toggled
   * @param isOpen - New open state
   */
  onToggle?: (isOpen: boolean) => void;

  /**
   * Additional CSS class
   */
  className?: string;
}
