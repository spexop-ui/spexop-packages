/**
 * IconButton - Modern icon-only button component
 *
 * A comprehensive, accessible button component for icon-only actions with
 * modern UI/UX patterns, enhanced accessibility, and extensive customization.
 * Used throughout navigation, toolbars, and interactive interfaces.
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns
 * - Principle 2: Borders before shadows
 * - Principle 3: Typography before decoration
 * - Principle 4: Tokens before magic numbers
 * - Principle 5: Composition before complexity
 * - Principle 6: Standards before frameworks
 * - Principle 7: Accessibility before aesthetics
 *
 * @example
 * ```tsx
 * import { IconButton } from '@spexop/react';
 * import { Menu, Settings, Trash } from '@spexop/icons';
 *
 * // Basic usage
 * <IconButton
 *   icon={Menu}
 *   label="Open menu"
 *   onClick={() => console.log('Clicked')}
 *   variant="ghost"
 * />
 *
 * // With semantic variant
 * <IconButton
 *   icon={Trash}
 *   label="Delete item"
 *   variant="danger"
 *   onClick={handleDelete}
 *   loading={isDeleting}
 * />
 *
 * // Compact for dense UIs
 * <IconButton
 *   icon={Settings}
 *   label="Settings"
 *   size="compactSm"
 *   variant="outline"
 * />
 * ```
 */

import { useCallback, useRef, useState } from "react";
import { cn } from "../../../utils/index.js";
import styles from "./IconButton.module.css";
import type {
  IconButtonProps,
  IconButtonSize,
  IconButtonVariant,
} from "./IconButton.types.js";

/**
 * IconButton Component
 * Modern icon-only button with enhanced accessibility and interactions
 */
export function IconButton({
  icon,
  label,
  onClick,
  variant = "ghost",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  iconSize,
  strokeWidth = 1.5,
  iconColor,
  ripple = true,
  pressAnimation = true,
  loading = false,
  loadingText,
  spinnerSize,
  pressed = false,
  focused = false,
  onKeyDown,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-expanded": ariaExpanded,
  "aria-pressed": ariaPressed,
  "aria-controls": ariaControls,
  "aria-live": ariaLive,
  "data-testid": dataTestId,
  "data-variant": dataVariant,
  "data-size": dataSize,
  tooltip,
  tooltipPosition = "top",
  children,
  ...rest
}: IconButtonProps) {
  // State management
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  // Determine icon size based on button size
  const sizeMap: Record<IconButtonSize, number> = {
    sm: 16,
    md: 20,
    lg: 24,
    compactSm: 14,
    compactMd: 16,
  };
  const actualIconSize = iconSize || sizeMap[size];

  // Check if icon is a React component or SVG string
  const isReactComponent = typeof icon !== "string";
  const Icon = isReactComponent ? icon : null;

  // Ripple effect handler
  const createRipple = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple || disabled || loading) return;

      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple = {
        id: rippleIdRef.current++,
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    [ripple, disabled, loading],
  );

  // Event handlers
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      onClick?.(event);
    },
    [createRipple, onClick],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      // Handle Enter and Space keys
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!disabled && !loading) {
          onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
        }
      }
      onKeyDown?.(event);
    },
    [onClick, onKeyDown, disabled, loading],
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const handleMouseDown = useCallback(() => {
    if (pressAnimation && !disabled && !loading) {
      setIsPressed(true);
    }
  }, [pressAnimation, disabled, loading]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseLeave?.(event);
    },
    [onMouseLeave],
  );

  // Build class names
  const buttonClasses = cn(
    styles.iconButton,
    styles[variant],
    styles[size],
    {
      [styles.loading]: loading,
      [styles.pressed]: isPressed || pressed,
      [styles.focused]: isFocused || focused,
    },
    className,
  );

  // Build ARIA attributes
  const ariaAttributes = {
    "aria-label": ariaLabel || label,
    "aria-describedby": ariaDescribedBy,
    "aria-expanded": ariaExpanded,
    "aria-pressed": ariaPressed,
    "aria-controls": ariaControls,
    "aria-live": ariaLive,
    "data-testid": dataTestId,
    "data-variant": dataVariant || variant,
    "data-size": dataSize || size,
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className={styles.loadingSpinner}>
      <div
        className={styles.spinner}
        style={{
          width: spinnerSize || actualIconSize,
          height: spinnerSize || actualIconSize,
        }}
        aria-hidden="true"
      />
    </div>
  );

  return (
    <button
      ref={buttonRef}
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
      title={tooltip || label}
      {...ariaAttributes}
      {...rest}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: Math.max(
              buttonRef.current?.getBoundingClientRect().width || 0,
              buttonRef.current?.getBoundingClientRect().height || 0,
            ),
            height: Math.max(
              buttonRef.current?.getBoundingClientRect().width || 0,
              buttonRef.current?.getBoundingClientRect().height || 0,
            ),
          }}
        />
      ))}

      {/* Icon container */}
      <div className={styles.iconContainer}>
        {isReactComponent && Icon ? (
          <Icon
            size={actualIconSize}
            strokeWidth={strokeWidth}
            color={iconColor || "currentColor"}
          />
        ) : (
          <span
            // biome-ignore lint/security/noDangerouslySetInnerHtml: legacy support for string SVG icons
            dangerouslySetInnerHTML={{ __html: icon as string }}
            style={{ color: iconColor || "currentColor" }}
          />
        )}
      </div>

      {/* Loading spinner */}
      {loading && <LoadingSpinner />}

      {/* Custom children */}
      {children}

      {/* Screen reader loading text */}
      {loading && loadingText && (
        <span className="sr-only" aria-live="polite">
          {loadingText}
        </span>
      )}
    </button>
  );
}
