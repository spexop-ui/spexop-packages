/**
 * Modal Types
 *
 * Type definitions for the Modal component following "The Spexop Way":
 * - Accessibility-first design with WCAG AA+ compliance
 * - Clear, semantic type definitions
 * - Modern UX patterns and enhanced functionality
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import type { ReactNode, RefObject } from "react";

/** Modal size variants */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

/** Modal animation variants */
export type ModalAnimation = "fade" | "slide" | "zoom" | "scale" | "none";

/** Modal placement options */
export type ModalPlacement = "center" | "top" | "bottom" | "left" | "right";

/** Modal backdrop variants */
export type ModalBackdrop = "blur" | "dark" | "light" | "transparent";

/** Modal header configuration */
export interface ModalHeader {
  /** Header title */
  title?: ReactNode;
  /** Header subtitle */
  subtitle?: ReactNode;
  /** Custom header content */
  children?: ReactNode;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Custom close button */
  closeButton?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

/** Modal footer configuration */
export interface ModalFooter {
  /** Footer content */
  children?: ReactNode;
  /** Footer alignment */
  align?: "left" | "center" | "right" | "between";
  /** Whether to show divider */
  showDivider?: boolean;
  /** Additional CSS class */
  className?: string;
}

/** Modal animation configuration */
export interface ModalAnimationConfig {
  /** Animation type */
  type?: ModalAnimation;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Animation timing function */
  timing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  /** Whether to disable animations */
  disabled?: boolean;
}

/** Modal accessibility configuration */
export interface ModalAccessibility {
  /** ARIA label for the modal */
  "aria-label"?: string;
  /** ARIA labelledby for the modal */
  "aria-labelledby"?: string;
  /** ARIA describedby for the modal */
  "aria-describedby"?: string;
  /** ARIA role override */
  role?: string;
  /** Whether to announce modal opening to screen readers */
  announceOpen?: boolean;
  /** Custom announcement text */
  announcementText?: string;
}

/** Modal focus management configuration */
export interface ModalFocusConfig {
  /** Initial focus element ref */
  initialFocusRef?: RefObject<HTMLElement>;
  /** Whether to restore focus to trigger element on close */
  restoreFocus?: boolean;
  /** Whether to trap focus within modal */
  trapFocus?: boolean;
  /** Focus trap options */
  focusTrapOptions?: {
    /** Whether to include the modal container in focus trap */
    includeContainer?: boolean;
    /** Whether to return focus to the trigger element */
    returnFocusOnDeactivate?: boolean;
  };
}

/** Modal responsive configuration */
export interface ModalResponsive {
  /** Mobile-specific size override */
  mobileSize?: ModalSize;
  /** Whether to use full screen on mobile */
  fullScreenOnMobile?: boolean;
  /** Mobile-specific placement */
  mobilePlacement?: ModalPlacement;
  /** Whether to disable backdrop on mobile */
  disableBackdropOnMobile?: boolean;
}

/** Modal event handlers */
export interface ModalEventHandlers {
  /** Called when modal opens */
  onOpen?: () => void;
  /** Called when modal closes */
  onClose?: () => void;
  /** Called when modal is about to close (before animation) */
  onBeforeClose?: () => void;
  /** Called when modal is about to open (before animation) */
  onBeforeOpen?: () => void;
  /** Called when backdrop is clicked */
  onBackdropClick?: (event: MouseEvent) => void;
  /** Called when escape key is pressed */
  onEscapeKey?: (event: KeyboardEvent) => void;
}

/** Main Modal component props */
export interface ModalProps extends ModalEventHandlers {
  /** Whether the modal is open */
  isOpen: boolean;

  /** Modal content */
  children?: ReactNode;

  /** Size variant */
  size?: ModalSize;

  /** Modal placement */
  placement?: ModalPlacement;

  /** Backdrop variant */
  backdrop?: ModalBackdrop;

  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;

  /** Whether pressing Escape closes modal */
  closeOnEscape?: boolean;

  /** Whether to prevent body scroll when modal is open */
  preventBodyScroll?: boolean;

  /** Whether to close modal on outside click */
  closeOnOutsideClick?: boolean;

  /** Whether to close modal on escape key */
  closeOnEscapeKey?: boolean;

  /** Additional CSS class for modal */
  className?: string;

  /** Additional CSS class for backdrop */
  backdropClassName?: string;

  /** ID for accessibility */
  id?: string;

  /** Animation configuration */
  animation?: ModalAnimationConfig;

  /** Header configuration */
  header?: ModalHeader;

  /** Footer configuration */
  footer?: ModalFooter;

  /** Accessibility configuration */
  accessibility?: ModalAccessibility;

  /** Focus management configuration */
  focus?: ModalFocusConfig;

  /** Responsive configuration */
  responsive?: ModalResponsive;

  /** Whether to render modal in portal */
  portal?: boolean;

  /** Portal container element */
  portalContainer?: HTMLElement;

  /** Whether to show modal */
  show?: boolean;

  /** Whether modal is loading */
  loading?: boolean;

  /** Loading indicator */
  loadingIndicator?: ReactNode;

  /** Whether modal is draggable */
  draggable?: boolean;

  /** Whether modal is resizable */
  resizable?: boolean;

  /** Custom modal styles */
  style?: React.CSSProperties;

  /** Custom backdrop styles */
  backdropStyle?: React.CSSProperties;

  /** Whether to use native modal (dialog element) */
  native?: boolean;

  /** Whether to use native modal with form method */
  formMethod?: "dialog" | "get" | "post";

  /** Form action for native modal */
  formAction?: string;

  /** Whether to use native modal with return value */
  returnValue?: string;

  /** Legacy props for backward compatibility */
  /** @deprecated Use header.title instead */
  title?: ReactNode;
  /** @deprecated Use header.showCloseButton instead */
  showCloseButton?: boolean;
  /** @deprecated Use focus.initialFocusRef instead */
  initialFocusRef?: RefObject<HTMLElement>;
}
