import type React from "react";

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /**
   * Current selected value
   */
  value: string;

  /**
   * Change handler
   */
  onChange: (value: string) => void;

  /**
   * Available options
   */
  options: SegmentedControlOption[];

  /**
   * Whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * ID for the control group
   */
  id?: string;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;

  /**
   * ARIA labelledby for accessibility
   */
  "aria-labelledby"?: string;
}
