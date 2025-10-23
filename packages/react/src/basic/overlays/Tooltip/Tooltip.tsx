/**
 * Tooltip - Modern accessible tooltip component
 *
 * A modern tooltip component that provides contextual information on hover or focus,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders with subtle shadow
 * - Principle 3: Typography before decoration - clear hierarchy
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Smart positioning with collision detection
 * - Modern animations with spring-based transitions
 * - Enhanced accessibility with focus management
 * - Responsive design with mobile optimizations
 * - Portal rendering for better z-index management
 * - Screen reader announcements
 * - Keyboard navigation support
 * - Multiple placement options with auto-adjustment
 * - Touch device support
 * - Multiple size variants
 * - Customizable animations
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Tooltip
 *   content="This is helpful information"
 *   placement="top"
 *   animation={{ type: "scale", duration: 200 }}
 *   positioning={{ smart: true, offset: 8 }}
 * >
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */

import { cloneElement, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useEscapeKey } from "../../../hooks/useEscapeKey.js";
import { cn } from "../../../utils/index.js";
import styles from "./Tooltip.module.css";
import type {
  TooltipAnimation,
  TooltipPlacement,
  TooltipProps,
  TooltipSize,
} from "./Tooltip.types.js";

// Helper functions
function getEffectivePlacement(
  placement: TooltipPlacement,
  isMobile: boolean,
  mobilePlacement?: TooltipPlacement,
): TooltipPlacement {
  if (isMobile && mobilePlacement) {
    return mobilePlacement;
  }
  return placement;
}

function getEffectiveSize(
  size: TooltipSize,
  isMobile: boolean,
  mobileSize?: TooltipSize,
): TooltipSize {
  if (isMobile && mobileSize) {
    return mobileSize;
  }
  return size;
}

function calculatePosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: TooltipPlacement,
  offset = 8,
) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let top = 0;
  let left = 0;
  let actualPlacement = placement;

  const baseOffset = offset + (tooltipRect.height > 0 ? 8 : 0); // Arrow height

  switch (placement) {
    case "top":
    case "top-start":
    case "top-end":
      top = triggerRect.top - tooltipRect.height - baseOffset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

      if (placement === "top-start") {
        left = triggerRect.left;
      } else if (placement === "top-end") {
        left = triggerRect.right - tooltipRect.width;
      }

      // Check if tooltip goes off screen
      if (top < 0) {
        actualPlacement = placement.replace(
          "top",
          "bottom",
        ) as TooltipPlacement;
        top = triggerRect.bottom + baseOffset;
      }
      break;

    case "bottom":
    case "bottom-start":
    case "bottom-end":
      top = triggerRect.bottom + baseOffset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

      if (placement === "bottom-start") {
        left = triggerRect.left;
      } else if (placement === "bottom-end") {
        left = triggerRect.right - tooltipRect.width;
      }

      // Check if tooltip goes off screen
      if (top + tooltipRect.height > viewportHeight) {
        actualPlacement = placement.replace(
          "bottom",
          "top",
        ) as TooltipPlacement;
        top = triggerRect.top - tooltipRect.height - baseOffset;
      }
      break;

    case "left":
    case "left-start":
    case "left-end":
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.left - tooltipRect.width - baseOffset;

      if (placement === "left-start") {
        top = triggerRect.top;
      } else if (placement === "left-end") {
        top = triggerRect.bottom - tooltipRect.height;
      }

      // Check if tooltip goes off screen
      if (left < 0) {
        actualPlacement = placement.replace(
          "left",
          "right",
        ) as TooltipPlacement;
        left = triggerRect.right + baseOffset;
      }
      break;

    case "right":
    case "right-start":
    case "right-end":
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.right + baseOffset;

      if (placement === "right-start") {
        top = triggerRect.top;
      } else if (placement === "right-end") {
        top = triggerRect.bottom - tooltipRect.height;
      }

      // Check if tooltip goes off screen
      if (left + tooltipRect.width > viewportWidth) {
        actualPlacement = placement.replace(
          "right",
          "left",
        ) as TooltipPlacement;
        left = triggerRect.left - tooltipRect.width - baseOffset;
      }
      break;
  }

  // Ensure tooltip stays within viewport bounds
  left = Math.max(8, Math.min(left, viewportWidth - tooltipRect.width - 8));
  top = Math.max(8, Math.min(top, viewportHeight - tooltipRect.height - 8));

  return { top, left, actualPlacement };
}

export function Tooltip({
  children,
  content,
  placement = "top",
  size = "md",
  delay = 300,
  mobileDelay = 0,
  disabled = false,
  className,
  triggerClassName,
  id,
  showArrow = true,
  animation = { type: "scale", duration: 200 },
  positioning = { smart: true, offset: 8, flip: true, shift: true },
  responsive = {},
  accessibility = {},
  portal = false,
  portalContainer,
  style,
  onOpen,
  onClose,
  onBeforeOpen,
  onBeforeClose,
  // Legacy props for backward compatibility
  animationType,
  animationDuration,
  offset,
  ...rest
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [actualPlacement, setActualPlacement] = useState(placement);
  const [position, setPosition] = useState({ top: "", left: "" });

  const [tooltipId] = useState(
    () => id || `tooltip-${Math.random().toString(36).substr(2, 9)}`,
  );
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Get effective values with responsive overrides
  const effectivePlacement = getEffectivePlacement(
    placement,
    isMobile,
    responsive.mobilePlacement,
  );
  const effectiveSize = getEffectiveSize(size, isMobile, responsive.mobileSize);

  // Animation configuration
  const animationConfig = {
    type: animationType || animation.type || "scale",
    duration: animationDuration || animation.duration || 200,
    easing: animation.easing || "ease-out",
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update position when tooltip becomes visible
  useEffect(() => {
    if (isVisible) {
      // Set placement immediately
      setActualPlacement(effectivePlacement);

      if (positioning.smart && triggerRef.current) {
        // If smart positioning is enabled, calculate position after a brief delay
        const timeoutId = setTimeout(() => {
          if (tooltipRef.current && triggerRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            const {
              top,
              left,
              actualPlacement: newPlacement,
            } = calculatePosition(
              triggerRect,
              tooltipRect,
              effectivePlacement,
              positioning.offset,
            );

            setPosition({ top: `${top}px`, left: `${left}px` });
            setActualPlacement(newPlacement);
          }
        }, 0);

        return () => clearTimeout(timeoutId);
      }

      // If smart positioning is disabled, clear any existing position
      setPosition({ top: "", left: "" });
    }
  }, [isVisible, effectivePlacement, positioning.smart, positioning.offset]);

  // Escape key handling
  useEscapeKey(() => {
    hideTooltip();
  }, isVisible);

  const showTooltip = useCallback(() => {
    if (disabled || (isMobile && responsive.disableOnMobile)) return;

    onBeforeOpen?.();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const currentDelay = isMobile ? mobileDelay : delay;

    // Always use setTimeout, even for 0 delay, to ensure consistent behavior
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
      onOpen?.();
    }, currentDelay);
  }, [
    disabled,
    isMobile,
    responsive.disableOnMobile,
    mobileDelay,
    delay,
    onBeforeOpen,
    onOpen,
  ]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    onBeforeClose?.();
    setIsVisible(false);
    setIsAnimating(false);
    onClose?.();
  }, [onBeforeClose, onClose]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      hideTooltip();
    }
  };

  // Clone the child element to add event handlers and aria attributes
  const childProps = children.props as {
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    className?: string;
  };

  const trigger = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      showTooltip();
      childProps.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hideTooltip();
      childProps.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      showTooltip();
      childProps.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hideTooltip();
      childProps.onBlur?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      handleKeyDown(e);
      childProps.onKeyDown?.(e);
    },
    "aria-describedby": isVisible ? tooltipId : undefined,
    className: cn(childProps.className, triggerClassName),
  } as React.HTMLAttributes<HTMLElement>);

  const tooltipClassName = cn(
    styles.tooltip,
    styles[`placement-${actualPlacement}`],
    styles[`size-${effectiveSize}`],
    styles[`animation-${animationConfig.type}`],
    isVisible && styles.visible,
    showArrow && styles["with-arrow"],
    className,
  );

  const tooltipStyle: React.CSSProperties = {
    ...style,
    ...(positioning.smart &&
      position.top !== "" &&
      position.left !== "" && {
        top: position.top,
        left: position.left,
      }),
    ...(animationConfig.duration && {
      transitionDuration: `${animationConfig.duration}ms`,
    }),
    ...(animationConfig.easing && {
      transitionTimingFunction: animationConfig.easing,
    }),
  };

  const tooltipElement = (
    <div
      ref={tooltipRef}
      id={tooltipId}
      role="tooltip"
      className={tooltipClassName}
      style={tooltipStyle}
      aria-hidden={!isVisible}
      aria-label={accessibility.ariaLabel}
      aria-describedby={accessibility.ariaDescribedBy}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      {content}
      {showArrow && <div className={styles.arrow} />}
    </div>
  );

  return (
    <>
      {trigger}
      {isVisible &&
        (portal
          ? createPortal(tooltipElement, portalContainer || document.body)
          : tooltipElement)}
    </>
  );
}
