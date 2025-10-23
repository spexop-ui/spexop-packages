/**
 * Button Component
 * Primitives-first button with comprehensive variants and accessibility
 *
 * @component Button
 * @packageName @spexop/react
 * @description Primitives-first button system with comprehensive variants
 * @author @spexop-ui | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-13
 * @updated 2025-01-27 - Enhanced with modern UI/UX patterns
 *
 */

import { forwardRef, useCallback, useRef, useState } from "react";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types.js";

/**
 * Button component
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click Me</Button>
 * <Button variant="secondary" compact="sm" iconOnly aria-label="Add">
 *   <Plus size={16} />
 * </Button>
 * ```
 */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      as: Component = "button",
      variant = "primary",
      textColor = "auto",
      borderWeight = "normal",
      borderStyle = "solid",
      size = "md",
      compact = false,
      iconOnly = false,
      disabled = false,
      fullWidth = false,
      loading = false,
      type = "button",
      onClick,
      onKeyDown,
      children,
      className = "",
      "aria-label": ariaLabel,
      "aria-pressed": ariaPressed,
      "aria-expanded": ariaExpanded,
      "aria-controls": ariaControls,
      "aria-describedby": ariaDescribedby,
      "aria-haspopup": ariaHaspopup,
      "aria-live": ariaLive,
      "data-testid": testId,
      ...rest
    },
    ref,
  ) {
    const [isPressed, setIsPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleRef = useRef<HTMLSpanElement>(null);

    // Validation: iconOnly requires aria-label
    if (iconOnly && !ariaLabel && process.env.NODE_ENV !== "production") {
      console.warn(
        "Button: iconOnly={true} requires an aria-label for accessibility.",
      );
    }

    // Enhanced click handler with ripple effect
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;

        // Create ripple effect
        if (rippleRef.current) {
          const rect = event.currentTarget.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = event.clientX - rect.left - size / 2;
          const y = event.clientY - rect.top - size / 2;

          rippleRef.current.style.width = `${size}px`;
          rippleRef.current.style.height = `${size}px`;
          rippleRef.current.style.left = `${x}px`;
          rippleRef.current.style.top = `${y}px`;
          rippleRef.current.classList.add(styles.rippleActive);

          // Remove ripple after animation
          setTimeout(() => {
            rippleRef.current?.classList.remove(styles.rippleActive);
          }, 600);
        }

        onClick?.(event);
      },
      [disabled, loading, onClick],
    );

    // Enhanced keyboard handler
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;

        // Handle Enter and Space
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }

        // Handle Escape for dismissible actions
        if (event.key === "Escape" && ariaHaspopup) {
          event.currentTarget.blur();
        }

        onKeyDown?.(event);
      },
      [disabled, loading, onKeyDown, ariaHaspopup],
    );

    // Focus handlers for better accessibility
    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    // Mouse handlers for press state
    const handleMouseDown = useCallback(() => {
      if (!disabled && !loading) {
        setIsPressed(true);
      }
    }, [disabled, loading]);

    const handleMouseUp = useCallback(() => {
      setIsPressed(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsPressed(false);
    }, []);

    // Compose className with enhanced states
    const buttonClassName = [
      styles.button,
      styles[variant],
      textColor !== "auto" &&
        styles[
          `textColor${textColor.charAt(0).toUpperCase()}${textColor.slice(1)}`
        ],
      borderWeight !== "normal" &&
        styles[
          `borderWeight${borderWeight.charAt(0).toUpperCase()}${borderWeight.slice(1)}`
        ],
      borderStyle !== "solid" &&
        styles[
          `borderStyle${borderStyle.charAt(0).toUpperCase()}${borderStyle.slice(1)}`
        ],
      styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
      compact &&
        styles[`compact${compact.charAt(0).toUpperCase()}${compact.slice(1)}`],
      iconOnly && styles.iconOnly,
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      disabled && styles.disabled,
      isPressed && styles.pressed,
      isFocused && styles.focused,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Enhanced accessibility attributes
    const accessibilityProps = {
      "aria-label": ariaLabel,
      "aria-pressed": ariaPressed,
      "aria-expanded": ariaExpanded,
      "aria-controls": ariaControls,
      "aria-describedby": ariaDescribedby,
      "aria-haspopup": ariaHaspopup,
      "aria-live": ariaLive || (loading ? "polite" : undefined),
      "aria-disabled": disabled || loading,
      "data-testid": testId,
    };

    return (
      <Component
        ref={ref || buttonRef}
        type={Component === "button" ? type : undefined}
        className={buttonClassName}
        disabled={Component === "button" ? disabled || loading : undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        {...accessibilityProps}
        {...rest}
      >
        {/* Ripple effect overlay */}
        <span ref={rippleRef} className={styles.ripple} aria-hidden="true" />

        {/* Loading spinner */}
        {loading && (
          <span className={styles.loadingSpinner} aria-hidden="true">
            <span className={styles.spinner} />
          </span>
        )}

        {/* Button content */}
        <span className={styles.buttonContent}>{children}</span>
      </Component>
    );
  },
);
