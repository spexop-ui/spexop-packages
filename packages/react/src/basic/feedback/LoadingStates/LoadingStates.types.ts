import type { CSSProperties, ReactNode } from "react";

/**
 * Size variants for loading states
 */
export type LoadingSize = "sm" | "md" | "lg" | "xl";

/**
 * Animation speed variants
 */
export type AnimationSpeed = "slow" | "normal" | "fast";

/**
 * Base props shared across all loading state components
 */
export interface BaseLoadingProps {
  /**
   * Size variant
   * @default "md"
   */
  size?: LoadingSize;

  /**
   * Animation speed
   * @default "normal"
   */
  speed?: AnimationSpeed;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: CSSProperties;
}

/**
 * PageSkeleton component props
 */
export interface PageSkeletonProps extends BaseLoadingProps {
  /**
   * Show header skeleton
   * @default true
   */
  showHeader?: boolean;

  /**
   * Show navigation skeleton
   * @default false
   */
  showNav?: boolean;

  /**
   * Number of content sections
   * @default 3
   */
  sections?: number;

  /**
   * Show sidebar skeleton
   * @default false
   */
  showSidebar?: boolean;
}

/**
 * CardSkeleton component props
 */
export interface CardSkeletonProps extends BaseLoadingProps {
  /**
   * Show image skeleton
   * @default true
   */
  showImage?: boolean;

  /**
   * Show avatar skeleton
   * @default false
   */
  showAvatar?: boolean;

  /**
   * Number of text lines
   * @default 3
   */
  lines?: number;

  /**
   * Show footer/actions skeleton
   * @default false
   */
  showFooter?: boolean;
}

/**
 * TextSkeleton component props
 */
export interface TextSkeletonProps extends BaseLoadingProps {
  /**
   * Number of lines to display
   * @default 1
   */
  lines?: number;

  /**
   * Width of the skeleton (CSS value)
   * @default "100%"
   */
  width?: string | number;

  /**
   * Height of each line (CSS value)
   * @default undefined (uses size variant)
   */
  height?: string | number;

  /**
   * Variant style
   * @default "text"
   */
  variant?: "text" | "heading" | "circle" | "rectangle";

  /**
   * Border radius (CSS value)
   * @default undefined (uses variant default)
   */
  borderRadius?: string | number;
}

/**
 * LoadingOverlay component props
 */
export interface LoadingOverlayProps extends BaseLoadingProps {
  /**
   * Show backdrop
   * @default true
   */
  showBackdrop?: boolean;

  /**
   * Loading message
   */
  message?: string;

  /**
   * Variant type
   * @default "spinner"
   */
  variant?: "spinner" | "dots" | "pulse" | "bars";

  /**
   * Overlay children (replaces default spinner/message)
   */
  children?: ReactNode;

  /**
   * Backdrop opacity
   * @default 0.75
   */
  backdropOpacity?: number;
}

/**
 * LoadingButton component props
 */
export interface LoadingButtonProps {
  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Button text when not loading
   */
  children: ReactNode;

  /**
   * Loading text to display
   */
  loadingText?: string;

  /**
   * Size variant
   * @default "md"
   */
  size?: LoadingSize;

  /**
   * Disable button when loading
   * @default true
   */
  disableWhenLoading?: boolean;

  /**
   * Show spinner icon
   * @default true
   */
  showSpinner?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Button click handler
   */
  onClick?: () => void | Promise<void>;
}
