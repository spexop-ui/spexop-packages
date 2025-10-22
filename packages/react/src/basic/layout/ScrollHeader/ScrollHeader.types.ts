/**
 * ScrollHeader Types
 * Navigation header that appears on scroll for long content pages
 */

import type { ComponentType } from "react";

export interface ScrollSection {
  /** Unique identifier for the section */
  id: string;
  /** Display label for the section */
  label: string;
  /** Optional icon component from @spexop/icons */
  icon?: ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
  /** URL or hash link to section */
  href: string;
}

export interface ScrollHeaderProps {
  /** Sections to display in the navigation */
  sections: ScrollSection[];
  /** Scroll threshold in pixels before header appears (default: 200) */
  scrollThreshold?: number;
  /** Current active section ID */
  activeSection?: string;
  /** Callback when section is clicked */
  onSectionClick?: (sectionId: string) => void;
  /** Optional logo/brand element */
  logo?: React.ReactNode;
  /** Optional action buttons on the right */
  actions?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** ARIA label for the header */
  ariaLabel?: string;
  /** Sidebar state for responsive positioning (default: "hidden") */
  sidebarState?: "icons" | "hidden";
}
