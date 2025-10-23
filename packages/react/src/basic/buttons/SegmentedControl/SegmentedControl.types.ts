import type React from "react";

export interface SegmentedControlOption {
  /** Unique value for the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Optional icon (ReactNode from @spexop/icons) */
  icon?: React.ReactNode;
  /** Whether this specific option is disabled */
  disabled?: boolean;
  /** Optional description for accessibility */
  description?: string;
  /** Optional badge or count to display */
  badge?: string | number;
}

export interface SegmentedControlProps {
  /**
   * Current selected value
   */
  value: string;

  /**
   * Change handler called when selection changes
   */
  onChange: (value: string) => void;

  /**
   * Available options
   */
  options: SegmentedControlOption[];

  /**
   * Whether the entire control is disabled
   */
  disabled?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * ID for the control group
   */
  id?: string;

  /**
   * ARIA label for accessibility (required if aria-labelledby not provided)
   */
  "aria-label"?: string;

  /**
   * ARIA labelledby for accessibility (required if aria-label not provided)
   */
  "aria-labelledby"?: string;

  /**
   * Size variant for the control
   */
  size?: "sm" | "md" | "lg";

  /**
   * Visual variant for the control
   */
  variant?: "default" | "outline" | "ghost";

  /**
   * Whether to show icons only (hide labels)
   */
  iconOnly?: boolean;

  /**
   * Whether to show badges if provided in options
   */
  showBadges?: boolean;

  /**
   * Custom data attributes for testing
   */
  "data-testid"?: string;
}
