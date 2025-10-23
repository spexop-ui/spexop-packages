/**
 * Tooltip Types
 *
 * Type definitions for the Tooltip component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 * - Modern UX patterns with enhanced positioning and animations
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

export type TooltipAnimation = "fade" | "scale" | "slide" | "zoom" | "none";

export type TooltipSize = "sm" | "md" | "lg" | "auto";

export interface TooltipAnimationConfig {
  /** Animation type */
  type?: TooltipAnimation;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Custom easing function */
  easing?: string;
}

export interface TooltipPositioning {
  /** Enable smart positioning with collision detection */
  smart?: boolean;
  /** Offset from trigger element (px) */
  offset?: number;
  /** Enable automatic flipping when space is limited */
  flip?: boolean;
  /** Enable automatic shifting to stay in viewport */
  shift?: boolean;
  /** Custom boundary element for collision detection */
  boundary?: Element | "viewport" | "clippingParents";
}

export interface TooltipResponsive {
  /** Placement override for mobile devices */
  mobilePlacement?: TooltipPlacement;
  /** Size override for mobile devices */
  mobileSize?: TooltipSize;
  /** Disable tooltip on mobile devices */
  disableOnMobile?: boolean;
}

export interface TooltipAccessibility {
  /** Custom aria-label for the tooltip */
  ariaLabel?: string;
  /** Custom aria-describedby value */
  ariaDescribedBy?: string;
  /** Whether to announce tooltip content to screen readers */
  announceToScreenReader?: boolean;
}

export interface TooltipProps {
  /** Content to wrap with tooltip */
  children: React.ReactElement;

  /** Tooltip content */
  content: React.ReactNode;

  /** Placement of the tooltip */
  placement?: TooltipPlacement;

  /** Size variant */
  size?: TooltipSize;

  /** Delay before showing tooltip (ms) */
  delay?: number;

  /** Delay before showing tooltip on mobile (ms) */
  mobileDelay?: number;

  /** Whether tooltip is disabled */
  disabled?: boolean;

  /** Additional CSS class for the tooltip */
  className?: string;

  /** Additional CSS class for the trigger element */
  triggerClassName?: string;

  /** ID for accessibility */
  id?: string;

  /** Whether to show arrow pointer */
  showArrow?: boolean;

  /** Animation configuration */
  animation?: TooltipAnimationConfig;

  /** Positioning configuration */
  positioning?: TooltipPositioning;

  /** Responsive behavior configuration */
  responsive?: TooltipResponsive;

  /** Accessibility configuration */
  accessibility?: TooltipAccessibility;

  /** Whether to render in portal */
  portal?: boolean;

  /** Portal container element */
  portalContainer?: Element | null;

  /** Custom styles */
  style?: React.CSSProperties;

  /** Event handlers */
  onOpen?: () => void;
  onClose?: () => void;
  onBeforeOpen?: () => void;
  onBeforeClose?: () => void;

  // Legacy props for backward compatibility
  /** @deprecated Use animation.type instead */
  animationType?: TooltipAnimation;
  /** @deprecated Use animation.duration instead */
  animationDuration?: number;
  /** @deprecated Use positioning.offset instead */
  offset?: number;
}
