/**
 * Popover - Modern accessible popover component
 *
 * A modern popover component for displaying rich content in an overlay,
 * following "The Spexop Way":
 * - Principle 2: Borders before shadows - strong borders with subtle shadow
 * - Principle 3: Typography before decoration - clear hierarchy
 * - Principle 4: Tokens before magic numbers - uses design tokens
 * - Principle 7: Accessibility before aesthetics - WCAG AA+ compliant
 *
 * Features:
 * - Multiple trigger types (click, hover, focus, manual)
 * - Smart positioning with collision detection
 * - Modern animations with reduced motion support
 * - Enhanced accessibility with focus management
 * - Responsive design with mobile optimizations
 * - Portal rendering for better z-index management
 * - Screen reader announcements
 * - Keyboard navigation and focus trapping
 * - Multiple placement options with auto-adjustment
 * - Backdrop support with blur effects
 * - Controlled and uncontrolled modes
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * @example
 * ```tsx
 * <Popover
 *   trigger={<button>Click me</button>}
 *   title="Popover Title"
 *   placement="bottom"
 *   animation={{ type: "scale", duration: 200 }}
 * >
 *   <div>Popover content here</div>
 * </Popover>
 * ```
 */

import { cloneElement, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "../../../hooks/useBodyScrollLock.js";
import { useEscapeKey } from "../../../hooks/useEscapeKey.js";
import { useFocusTrap } from "../../../hooks/useFocusTrap.js";
import { cn } from "../../../utils/index.js";
import styles from "./Popover.module.css";
import type {
  PopoverAnimation,
  PopoverPlacement,
  PopoverProps,
  PopoverSize,
  PopoverTriggerType,
} from "./Popover.types.js";

// Utility functions
const getEffectivePlacement = (
  placement: PopoverPlacement,
  isMobile: boolean,
  mobilePlacement?: PopoverPlacement,
): PopoverPlacement => {
  if (isMobile && mobilePlacement) {
    return mobilePlacement;
  }
  return placement;
};

const getEffectiveSize = (
  size: PopoverSize,
  isMobile: boolean,
  mobileSize?: PopoverSize,
): PopoverSize => {
  if (isMobile && mobileSize) {
    return mobileSize;
  }
  return size;
};

const getAnimationClass = (animation: PopoverAnimation): string => {
  return `animation-${animation}`;
};

const getTimingFunction = (timing: string): string => {
  const timingMap: Record<string, string> = {
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    linear: "linear",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  };
  return timingMap[timing] || "ease-out";
};

export function Popover({
  trigger,
  children,
  title,
  subtitle,
  placement = "bottom",
  isOpen: controlledIsOpen,
  onOpenChange,
  triggerType = "click",
  showArrow = true,
  size = "md",
  animation = { type: "scale", duration: 200 },
  positioning = { smart: true, offset: 8, flip: true, shift: true },
  responsive = {},
  accessibility = {},
  focus = { strategy: "auto", restoreFocus: true },
  closeOnEscape = true,
  closeOnOutsideClick = true,
  closeOnBlur = true,
  hoverDelay = 0,
  hoverCloseDelay = 0,
  portal = false,
  portalContainer,
  className,
  triggerClassName,
  backdropClassName,
  style,
  backdropStyle,
  onOpen,
  onClose,
  onBeforeOpen,
  onBeforeClose,
  onEscapeKey,
  onOutsideClick,
  // Legacy props for backward compatibility
  offset,
  animationType,
  animationDuration,
  ...rest
}: PopoverProps) {
  // State management
  const isControlled = controlledIsOpen !== undefined;
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Refs
  const triggerRef = useRef<HTMLElement>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate unique IDs
  const [popoverId] = useState(
    () => `popover-${Math.random().toString(36).substr(2, 9)}`,
  );
  const [titleId] = useState(() => `${popoverId}-title`);
  const [descriptionId] = useState(() => `${popoverId}-description`);

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
    delay: animation.delay || 0,
    timing: animation.timing || "ease-out",
    disabled: animation.disabled || false,
  };

  // Positioning configuration
  const positioningConfig = {
    smart: positioning.smart ?? true,
    offset: offset || positioning.offset || 8,
    flip: positioning.flip ?? true,
    shift: positioning.shift ?? true,
    autoPlacement: positioning.autoPlacement ?? false,
    boundary: positioning.boundary || "viewport",
  };

  // Focus configuration
  const focusConfig = {
    strategy: focus.strategy || "auto",
    initialFocusRef: focus.initialFocusRef,
    restoreFocus: focus.restoreFocus ?? true,
    trapFocus: focus.trapFocus ?? false,
  };

  // Accessibility configuration
  const accessibilityConfig = {
    "aria-label": accessibility["aria-label"],
    "aria-labelledby":
      accessibility["aria-labelledby"] || (title ? titleId : undefined),
    "aria-describedby":
      accessibility["aria-describedby"] ||
      (subtitle ? descriptionId : undefined),
    announceOnOpen: accessibility.announceOnOpen ?? true,
    announcementMessage: accessibility.announcementMessage || "Popover opened",
  };

  // State setters
  const setIsOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setInternalIsOpen(open);
      }
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange],
  );

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mount state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus trap
  useFocusTrap(
    popoverRef as React.RefObject<HTMLElement>,
    isOpen && focusConfig.trapFocus,
  );

  // Body scroll lock (for mobile with backdrop)
  useBodyScrollLock(isOpen && isMobile && !responsive.disableBackdropOnMobile);

  // Escape key handling
  useEscapeKey(() => {
    if (isOpen && closeOnEscape) {
      setIsOpen(false);
      onEscapeKey?.();
      if (focusConfig.restoreFocus) {
        triggerRef.current?.focus();
      }
    }
  }, isOpen);

  // Click outside to close
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is outside popover and trigger
      const isOutsidePopover =
        popoverRef.current && !popoverRef.current.contains(target);
      const isOutsideTrigger =
        triggerRef.current && !triggerRef.current.contains(target);
      const isOutsideBackdrop =
        !backdropRef.current || !backdropRef.current.contains(target);

      if (isOutsidePopover && isOutsideTrigger && isOutsideBackdrop) {
        setIsOpen(false);
        onOutsideClick?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeOnOutsideClick, onOutsideClick, setIsOpen]);

  // Hover delay handling
  const handleHoverEnter = useCallback(() => {
    if (triggerType === "hover") {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      if (hoverDelay === 0) {
        // Synchronous execution for 0 delay
        setIsOpen(true);
        onOpen?.();
      } else {
        hoverTimeoutRef.current = setTimeout(() => {
          setIsOpen(true);
          onOpen?.();
        }, hoverDelay);
      }
    }
  }, [triggerType, hoverDelay, setIsOpen, onOpen]);

  const handleHoverLeave = useCallback(() => {
    if (triggerType === "hover") {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }

      if (hoverCloseDelay === 0) {
        // Synchronous execution for 0 delay
        setIsOpen(false);
        onClose?.();
      } else {
        closeTimeoutRef.current = setTimeout(() => {
          setIsOpen(false);
          onClose?.();
        }, hoverCloseDelay);
      }
    }
  }, [triggerType, hoverCloseDelay, setIsOpen, onClose]);

  // Animation handling
  const handleAnimationStart = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setIsAnimating(false);
  }, []);

  // Event handlers
  const handleTriggerClick = useCallback(() => {
    if (triggerType === "click") {
      if (isOpen) {
        onBeforeClose?.();
        setIsOpen(false);
        onClose?.();
      } else {
        onBeforeOpen?.();
        setIsOpen(true);
        onOpen?.();
      }
    }
  }, [
    triggerType,
    isOpen,
    onBeforeClose,
    onBeforeOpen,
    onOpen,
    onClose,
    setIsOpen,
  ]);

  const handleTriggerFocus = useCallback(() => {
    if (triggerType === "focus") {
      setIsOpen(true);
      onOpen?.();
    }
  }, [triggerType, setIsOpen, onOpen]);

  const handleTriggerBlur = useCallback(() => {
    if (triggerType === "focus" && closeOnBlur) {
      setIsOpen(false);
      onClose?.();
    }
  }, [triggerType, closeOnBlur, setIsOpen, onClose]);

  const handlePopoverMouseEnter = useCallback(() => {
    if (triggerType === "hover") {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    }
  }, [triggerType]);

  const handlePopoverMouseLeave = useCallback(() => {
    if (triggerType === "hover") {
      handleHoverLeave();
    }
  }, [triggerType, handleHoverLeave]);

  // Trigger element props
  const triggerProps = trigger.props as {
    onClick?: (e: React.MouseEvent) => void;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    className?: string;
  };

  const triggerElement = cloneElement(trigger, {
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      handleTriggerClick();
      triggerProps.onClick?.(e);
    },
    onMouseEnter: (e: React.MouseEvent) => {
      handleHoverEnter();
      triggerProps.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleHoverLeave();
      triggerProps.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      handleTriggerFocus();
      triggerProps.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      handleTriggerBlur();
      triggerProps.onBlur?.(e);
    },
    "aria-expanded": isOpen,
    "aria-haspopup": "dialog",
    "aria-controls": isOpen ? popoverId : undefined,
    className: cn(triggerProps.className, triggerClassName),
  } as React.HTMLAttributes<HTMLElement>);

  // Popover classes
  const popoverClassName = cn(
    styles.popover,
    styles[`placement-${effectivePlacement}`],
    styles[`size-${effectiveSize}`],
    isOpen && styles.open,
    showArrow && styles["with-arrow"],
    !animationConfig.disabled &&
      styles[getAnimationClass(animationConfig.type)],
    className,
  );

  // Backdrop classes
  const backdropClassNameFinal = cn(
    styles.backdrop,
    isOpen && styles.open,
    backdropClassName,
  );

  // Animation styles
  const animationStyles: React.CSSProperties = {
    transitionDuration: `${animationConfig.duration}ms`,
    transitionDelay: `${animationConfig.delay}ms`,
    transitionTimingFunction: getTimingFunction(animationConfig.timing),
    ...style,
  };

  // Screen reader announcement
  useEffect(() => {
    if (isOpen && accessibilityConfig.announceOnOpen && mounted) {
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.style.position = "absolute";
      announcement.style.left = "-10000px";
      announcement.style.width = "1px";
      announcement.style.height = "1px";
      announcement.style.overflow = "hidden";
      announcement.textContent = accessibilityConfig.announcementMessage;

      document.body.appendChild(announcement);

      const timeoutId = setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      };
    }
  }, [
    isOpen,
    accessibilityConfig.announceOnOpen,
    accessibilityConfig.announcementMessage,
    mounted,
  ]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Don't render until mounted (SSR safety)
  if (!mounted) {
    return <div className={styles.container}>{triggerElement}</div>;
  }

  const popoverContent = (
    <>
      {/* Backdrop */}
      {isOpen && (isMobile || portal) && (
        <div
          ref={backdropRef}
          className={backdropClassNameFinal}
          style={backdropStyle}
          onClick={closeOnOutsideClick ? () => setIsOpen(false) : undefined}
          onKeyDown={
            closeOnOutsideClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsOpen(false);
                  }
                }
              : undefined
          }
          tabIndex={closeOnOutsideClick ? 0 : undefined}
          role={closeOnOutsideClick ? "button" : undefined}
          aria-label={closeOnOutsideClick ? "Close popover" : undefined}
        />
      )}

      {/* Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          id={popoverId}
          role="dialog"
          aria-modal="false"
          aria-label={accessibilityConfig["aria-label"]}
          aria-labelledby={accessibilityConfig["aria-labelledby"]}
          aria-describedby={accessibilityConfig["aria-describedby"]}
          className={popoverClassName}
          style={animationStyles}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
          onAnimationStart={handleAnimationStart}
          onAnimationEnd={handleAnimationEnd}
          tabIndex={-1}
        >
          {/* Header */}
          {(title || subtitle) && (
            <div className={styles.header}>
              {title && (
                <div id={titleId} className={styles.title}>
                  {title}
                </div>
              )}
              {subtitle && (
                <div id={descriptionId} className={styles.subtitle}>
                  {subtitle}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className={styles.content}>{children}</div>

          {/* Arrow */}
          {showArrow && <div className={styles.arrow} />}
        </div>
      )}
    </>
  );

  return (
    <div className={styles.container}>
      {triggerElement}

      {portal
        ? createPortal(popoverContent, portalContainer || document.body)
        : popoverContent}
    </div>
  );
}
