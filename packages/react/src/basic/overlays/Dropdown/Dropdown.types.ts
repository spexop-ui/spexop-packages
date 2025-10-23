/**
 * Dropdown Types
 *
 * Type definitions for the Dropdown component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export interface DropdownMenuItem {
  /** Unique identifier */
  id: string;
  /** Menu item label */
  label: React.ReactNode;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Item variant */
  variant?: "default" | "danger";
  /** Click handler */
  onClick?: () => void;
  /** Divider after item */
  divider?: boolean;
  /** Search keywords for filtering */
  keywords?: string[];
  /** Group identifier for grouping items */
  group?: string;
}

export interface DropdownGroup {
  /** Group identifier */
  id: string;
  /** Group label */
  label: string;
  /** Items in this group */
  items: DropdownMenuItem[];
}

export interface DropdownProps {
  /** Menu items */
  items: DropdownMenuItem[];

  /** Trigger element */
  trigger: React.ReactElement;

  /** Dropdown placement */
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";

  /** Whether dropdown is open (controlled) */
  isOpen?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (isOpen: boolean) => void;

  /** Additional CSS class for dropdown */
  className?: string;

  /** Additional CSS class for trigger */
  triggerClassName?: string;

  /** Whether to close on item click */
  closeOnItemClick?: boolean;

  /** Enable search functionality */
  searchable?: boolean;

  /** Search placeholder text */
  searchPlaceholder?: string;

  /** Custom search filter function */
  onSearch?: (query: string, items: DropdownMenuItem[]) => DropdownMenuItem[];

  /** Group items by group property */
  grouped?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Empty state content */
  emptyState?: React.ReactNode;

  /** Maximum height of dropdown */
  maxHeight?: number;

  /** Whether to show dividers between groups */
  showGroupDividers?: boolean;

  /** Custom item renderer */
  renderItem?: (item: DropdownMenuItem, index: number) => React.ReactNode;

  /** Callback when search query changes */
  onSearchChange?: (query: string) => void;

  /** Whether to highlight search matches */
  highlightMatches?: boolean;
}
