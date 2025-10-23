/**
 * ButtonGridItem Component Types
 * Interactive component that displays media with overlay content and performs actions
 *
 * @component ButtonGridItem
 * @packageName @spexop/react
 * @description Interactive media card with overlay content and call-to-action
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-13
 *
 */

import type { ReactNode } from "react";

/**
 * ButtonGridItem component props
 */
export interface ButtonGridItemProps {
  /**
   * Media content slot (img, picture, or video element)
   * Must be a valid HTML media element
   */
  media: ReactNode;

  /**
   * Required title/label for the card
   */
  label: string;

  /**
   * Required teaser text/description
   */
  description: string;

  /**
   * CTA button label
   */
  buttonText: string;

  /**
   * Click handler for the action
   */
  onClick: () => void;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Aspect ratio for the media container
   * @default '16/9'
   */
  aspectRatio?: string;

  /**
   * Minimum height in pixels
   * @default 300
   */
  minHeight?: number;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Media loading state
   * @default false
   */
  mediaLoading?: boolean;

  // Accessibility props

  /**
   * ARIA label for the entire card (overrides label)
   */
  "aria-label"?: string;

  /**
   * ARIA label for the internal button
   */
  "aria-label-button"?: string;

  /**
   * ARIA described by for additional description
   */
  "aria-describedby"?: string;

  /**
   * ARIA live region for dynamic content
   */
  "aria-live"?: "polite" | "assertive" | "off";

  /**
   * Test ID for testing
   */
  "data-testid"?: string;
}
