import type { ReactNode } from "react";

export interface SearchResult {
  /**
   * Unique identifier for the result
   */
  id: string;

  /**
   * Result title
   */
  title: string;

  /**
   * Result description
   */
  description: string;

  /**
   * URL to navigate to
   */
  url: string;

  /**
   * Category for grouping
   */
  category: string;

  /**
   * Optional icon
   */
  icon?: ReactNode;

  /**
   * Optional badge text
   */
  badge?: string;

  /**
   * Optional value to display (for tokens)
   */
  value?: string;

  /**
   * Keywords for better search matching
   */
  keywords?: string[];
}

export interface QuickLink {
  /**
   * Link label
   */
  label: string;

  /**
   * Link URL
   */
  url: string;

  /**
   * Optional icon
   */
  icon?: ReactNode;
}

export interface SearchModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Callback when modal should close
   */
  onClose: () => void;

  /**
   * All searchable results
   */
  results: SearchResult[];

  /**
   * Quick links to show in empty state
   */
  quickLinks?: QuickLink[];

  /**
   * Recent searches to show in empty state
   */
  recentSearches?: string[];

  /**
   * Placeholder text for search input
   */
  placeholder?: string;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Callback when a search is performed
   */
  onSearch?: (query: string) => void;

  /**
   * Callback when a result is selected
   */
  onResultSelect?: (result: SearchResult) => void;

  /**
   * Callback when a quick link is clicked
   */
  onQuickLinkClick?: (link: QuickLink) => void;
}
