/**
 * ButtonGroup Component
 * Modern container for grouped buttons with enhanced UX
 *
 * @component ButtonGroup
 * @packageName @spexop/react
 * @description Primitives-first button grouping with modern UI/UX patterns
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.3.0
 * @since 2025-10-13
 * @updated 2025-01-20 - Modern UI/UX improvements
 *
 */

import { forwardRef, useCallback, useRef } from "react";
import styles from "./ButtonGroup.module.css";
import type { ButtonGroupProps } from "./ButtonGroup.types.js";

/**
 * ButtonGroup component with enhanced accessibility and modern interactions
 *
 * @example
 * ```tsx
 * <ButtonGroup direction="horizontal" aria-label="Text formatting">
 *   <Button iconOnly aria-label="Bold"><Bold /></Button>
 *   <Button iconOnly aria-label="Italic"><Italic /></Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    {
      children,
      direction = "horizontal",
      compact = false,
      className = "",
      role = "group",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-describedby": ariaDescribedby,
      "aria-orientation": ariaOrientation,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const groupRef = useRef<HTMLDivElement>(null);

    // Enhanced keyboard navigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (onKeyDown) {
          onKeyDown(event);
          return;
        }

        // Arrow key navigation for better UX
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();

          const buttons = groupRef.current?.querySelectorAll(
            'button:not([disabled]), [role="button"]:not([disabled])',
          );

          if (!buttons || buttons.length === 0) return;

          const currentIndex = Array.from(buttons).indexOf(
            document.activeElement as Element,
          );

          if (currentIndex === -1) return;

          const nextIndex =
            event.key === "ArrowRight"
              ? (currentIndex + 1) % buttons.length
              : (currentIndex - 1 + buttons.length) % buttons.length;

          (buttons[nextIndex] as HTMLElement).focus();
        }
      },
      [onKeyDown],
    );

    // Compose className with modern patterns
    const groupClassName = [
      styles.buttonGroup,
      styles[direction],
      compact && styles.compact,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Enhanced ARIA attributes
    const ariaAttributes = {
      role,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-describedby": ariaDescribedby,
      "aria-orientation":
        ariaOrientation ||
        (direction === "vertical" ? "vertical" : "horizontal"),
    };

    return (
      <div
        ref={ref || groupRef}
        className={groupClassName}
        onKeyDown={handleKeyDown}
        {...ariaAttributes}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
