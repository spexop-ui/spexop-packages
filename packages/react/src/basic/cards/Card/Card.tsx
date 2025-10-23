import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Icon } from "../../indicators/Icon/Icon.js";
import styles from "./Card.module.css";
import type { CardProps } from "./Card.types.js";

/**
 * Card - Enhanced flexible container component following Modern UI/UX principles
 *
 * Features:
 * - Border-based separation (no heavy shadows)
 * - Typography-driven hierarchy
 * - Token-based styling (100%)
 * - Density variants (compact/normal/spacious)
 * - Multiple visual variants
 * - Sub-component composition
 * - Full TypeScript support
 * - WCAG 2.1 AA compliant
 * - Theme-aware (light/dark)
 * - Responsive by default
 * - Modern state management (loading, error, success)
 * - Enhanced accessibility
 * - Micro-interactions and feedback
 *
 * @example
 * ```tsx
 * // Basic usage with sub-components
 * <Card variant="highlighted" density="normal">
 *   <CardHeader title="Title" subtitle="Subtitle" />
 *   <CardBody>Content here</CardBody>
 *   <CardFooter align="right">
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Clickable card with modern interactions
 * <Card
 *   clickable
 *   onClick={handleClick}
 *   variant="interactive"
 *   feedback="prominent"
 * >
 *   Interactive content
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Card with state management
 * <Card state="loading" loadingText="Loading content...">
 *   <CardHeader title="Loading Card" />
 *   <CardBody>This card is loading</CardBody>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement | HTMLButtonElement, CardProps>(
  (
    {
      variant = "basic",
      density = "normal",
      clickable = false,
      fullHeight = false,
      children,
      className,
      onClick,
      state = "idle",
      feedback = "subtle",
      disabled = false,
      loadingText = "Loading...",
      errorMessage,
      successMessage,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      size, // deprecated, fallback to density
      icon, // deprecated
      title, // deprecated
      description, // deprecated
      ...props
    },
    ref,
  ) => {
    // Handle deprecated 'size' prop
    const actualDensity = size || density;

    // Handle variant aliases for backward compatibility
    const normalizedVariant =
      variant === "default"
        ? "basic"
        : variant === "outline"
          ? "outlined"
          : variant;

    // Deprecation warnings (development only)
    if (process.env.NODE_ENV === "development") {
      if (size) {
        console.warn(
          'Card: Prop "size" is deprecated. Use "density" instead. This prop will be removed in v2.0.0.',
        );
      }
      if (icon || title || description) {
        console.warn(
          'Card: Props "icon", "title", and "description" are deprecated. Use CardHeader and CardBody sub-components instead. These props will be removed in v2.0.0.',
        );
      }
    }

    // Render deprecated icon prop
    const renderIcon = () => {
      if (!icon) return null;

      return (
        <div className={styles.icon}>
          <Icon name={typeof icon === "string" ? icon : undefined} size="md">
            {typeof icon !== "string" ? icon : undefined}
          </Icon>
        </div>
      );
    };

    // Render deprecated structure (for backward compatibility)
    const renderLegacyContent = () => {
      if (!icon && !title && !description) return null;

      return (
        <>
          {renderIcon()}
          {title && <h3 className={styles.title}>{title}</h3>}
          {description && <p className={styles.description}>{description}</p>}
        </>
      );
    };

    // Render state-specific content
    const renderStateContent = () => {
      if (state === "loading") {
        return (
          <div className={styles.card__state} role="status" aria-live="polite">
            <div className={styles.card__state__spinner} aria-hidden="true" />
            <span className={styles.card__state__text}>{loadingText}</span>
          </div>
        );
      }

      if (state === "error" && errorMessage) {
        return (
          <div
            className={styles.card__state}
            role="alert"
            aria-live="assertive"
          >
            <div className={styles.card__state__icon} aria-hidden="true">
              ⚠️
            </div>
            <span className={styles.card__state__text}>{errorMessage}</span>
          </div>
        );
      }

      if (state === "success" && successMessage) {
        return (
          <div className={styles.card__state} role="status" aria-live="polite">
            <div className={styles.card__state__icon} aria-hidden="true">
              ✅
            </div>
            <span className={styles.card__state__text}>{successMessage}</span>
          </div>
        );
      }

      return null;
    };

    const classNames = cn(
      styles.card,
      styles[`density--${actualDensity}`],
      normalizedVariant !== "basic" && styles[`variant--${normalizedVariant}`],
      clickable && styles.clickable,
      fullHeight && styles.fullHeight,
      disabled && styles["card--disabled"],
      state !== "idle" && styles[`card--${state}`],
      feedback !== "none" && styles[`card--feedback-${feedback}`],
      className,
    );

    const content = (
      <>
        {renderLegacyContent()}
        {renderStateContent()}
        {children}
      </>
    );

    // Enhanced accessibility attributes
    const accessibilityProps = {
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      "aria-disabled": disabled,
      "aria-busy": state === "loading",
      ...(state === "loading" && { "aria-live": "polite" as const }),
      ...(state === "error" && { "aria-live": "assertive" as const }),
    };

    // Render as button if clickable
    if (clickable) {
      return (
        <button
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          className={classNames}
          onClick={onClick}
          type="button"
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
          {...accessibilityProps}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    // Render as div by default
    return (
      <div
        ref={ref as React.ForwardedRef<HTMLDivElement>}
        className={classNames}
        {...accessibilityProps}
        {...props}
      >
        {content}
      </div>
    );
  },
);

Card.displayName = "Card";
