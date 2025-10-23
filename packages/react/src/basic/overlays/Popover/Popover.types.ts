/**
 * Popover Types
 *
 * Type definitions for the Popover component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 * - Modern UI/UX patterns with enhanced animations and positioning
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

export type PopoverPlacement =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-start"
  | "top-end"
  | "right-start"
  | "right-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end";

export type PopoverTriggerType = "click" | "hover" | "focus" | "manual";

export type PopoverAnimation = "fade" | "scale" | "slide" | "zoom" | "none";

export type PopoverSize = "sm" | "md" | "lg" | "xl" | "auto";

export interface PopoverAnimationConfig {
  /** Animation type */
  type?: PopoverAnimation;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Animation timing function */
  timing?:
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "linear"
    | "bounce"
    | "elastic";
  /** Disable animation */
  disabled?: boolean;
}

export interface PopoverPositioning {
  /** Smart positioning with collision detection */
  smart?: boolean;
  /** Offset from trigger element */
  offset?: number;
  /** Flip to opposite side if no space */
  flip?: boolean;
  /** Shift to stay in viewport */
  shift?: boolean;
  /** Auto-adjust placement based on available space */
  autoPlacement?: boolean;
  /** Boundary element for positioning calculations */
  boundary?: HTMLElement | "viewport" | "clippingParents";
}

export interface PopoverResponsive {
  /** Mobile-specific placement */
  mobilePlacement?: PopoverPlacement;
  /** Mobile-specific size */
  mobileSize?: PopoverSize;
  /** Disable backdrop on mobile */
  disableBackdropOnMobile?: boolean;
  /** Full width on mobile */
  fullWidthOnMobile?: boolean;
}

export interface PopoverAccessibility {
  /** Custom ARIA label */
  "aria-label"?: string;
  /** ARIA labelledby */
  "aria-labelledby"?: string;
  /** ARIA describedby */
  "aria-describedby"?: string;
  /** Announce to screen readers when opened */
  announceOnOpen?: boolean;
  /** Custom announcement message */
  announcementMessage?: string;
}

export interface PopoverFocus {
  /** Focus management strategy */
  strategy?: "auto" | "first" | "last" | "none";
  /** Element to focus when opened */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** Restore focus to trigger on close */
  restoreFocus?: boolean;
  /** Trap focus within popover */
  trapFocus?: boolean;
}

export interface PopoverProps {
  /** Trigger element */
  trigger: React.ReactElement;

  /** Popover content */
  children?: React.ReactNode;

  /** Popover title */
  title?: React.ReactNode;

  /** Popover subtitle */
  subtitle?: React.ReactNode;

  /** Placement */
  placement?: PopoverPlacement;

  /** Whether popover is open (controlled) */
  isOpen?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (isOpen: boolean) => void;

  /** Trigger type */
  triggerType?: PopoverTriggerType;

  /** Whether to show arrow */
  showArrow?: boolean;

  /** Popover size */
  size?: PopoverSize;

  /** Animation configuration */
  animation?: PopoverAnimationConfig;

  /** Positioning configuration */
  positioning?: PopoverPositioning;

  /** Responsive behavior */
  responsive?: PopoverResponsive;

  /** Accessibility configuration */
  accessibility?: PopoverAccessibility;

  /** Focus management */
  focus?: PopoverFocus;

  /** Whether to close on escape key */
  closeOnEscape?: boolean;

  /** Whether to close when clicking outside */
  closeOnOutsideClick?: boolean;

  /** Whether to close when trigger loses focus */
  closeOnBlur?: boolean;

  /** Hover delay in milliseconds */
  hoverDelay?: number;

  /** Hover delay before closing in milliseconds */
  hoverCloseDelay?: number;

  /** Portal rendering */
  portal?: boolean;

  /** Portal container */
  portalContainer?: HTMLElement;

  /** Additional CSS class for popover */
  className?: string;

  /** Additional CSS class for trigger */
  triggerClassName?: string;

  /** Additional CSS class for backdrop */
  backdropClassName?: string;

  /** Custom styles */
  style?: React.CSSProperties;

  /** Custom backdrop styles */
  backdropStyle?: React.CSSProperties;

  /** Event handlers */
  onOpen?: () => void;
  onClose?: () => void;
  onBeforeOpen?: () => void;
  onBeforeClose?: () => void;
  onEscapeKey?: () => void;
  onOutsideClick?: () => void;

  /** Legacy props for backward compatibility */
  /** @deprecated Use positioning.offset instead */
  offset?: number;
  /** @deprecated Use animation.type instead */
  animationType?: PopoverAnimation;
  /** @deprecated Use animation.duration instead */
  animationDuration?: number;
}
