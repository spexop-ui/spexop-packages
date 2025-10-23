/**
 * CTACard Component
 * Specialized card for call-to-action sections following Modern UI/UX principles
 *
 * @module @spexop/react/cards
 */

import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Button } from "../../buttons/Button/Button.js";
import { Card, CardBody, CardFooter, CardHeader } from "../Card/index.js";
import styles from "./CTACard.module.css";
import type { CTACardProps } from "./CTACard.types.js";

/**
 * CTACard - Prominent call-to-action card with modern UI/UX
 *
 * Features:
 * - Border-based design (no heavy shadows)
 * - Typography-driven hierarchy
 * - Token-based styling (100%)
 * - Modern state management (loading, error, success)
 * - Enhanced accessibility (WCAG AA+)
 * - Micro-interactions and feedback
 * - Responsive by default
 * - Theme-aware (light/dark)
 *
 * Perfect for landing pages, conversion sections, and important prompts.
 * Supports primary and secondary actions with optional icon.
 *
 * @example
 * ```tsx
 * import { CTACard } from '@spexop/react';
 * import { Rocket } from '@spexop/icons';
 *
 * <CTACard
 *   headline="Ready to get started?"
 *   description="Join thousands of users building better products"
 *   icon={<Rocket />}
 *   primaryAction={{
 *     label: "Start Free Trial",
 *     onClick: () => router.push('/signup')
 *   }}
 *   secondaryAction={{
 *     label: "Learn More",
 *     onClick: () => router.push('/features')
 *   }}
 *   centered
 *   variant="highlighted"
 *   density="spacious"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With state management
 * <CTACard
 *   headline="Processing your request"
 *   description="Please wait while we process your data"
 *   state="loading"
 *   loadingText="Processing..."
 *   primaryAction={{
 *     label: "Cancel",
 *     onClick: handleCancel,
 *     disabled: true
 *   }}
 * />
 * ```
 */
export const CTACard = forwardRef<HTMLDivElement, CTACardProps>(
  (
    {
      headline,
      description,
      primaryAction,
      secondaryAction,
      icon,
      variant = "highlighted",
      density = "spacious",
      centered = false,
      state = "idle",
      feedback = "prominent",
      disabled = false,
      loadingText = "Loading...",
      errorMessage,
      successMessage,
      className,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    // Runtime deprecation warning
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "@spexop/react: CTACard is deprecated and will be removed in v0.4.0. " +
          "Use Card composition instead. See: src/patterns/cards/CTACard.example.tsx",
      );
    }

    // Enhanced accessibility attributes
    const accessibilityProps = {
      "aria-label": ariaLabel || `Call to action: ${headline}`,
      "aria-describedby": ariaDescribedBy,
      "aria-disabled": disabled,
      "aria-busy": state === "loading",
      ...(state === "loading" && { "aria-live": "polite" as const }),
      ...(state === "error" && { "aria-live": "assertive" as const }),
    };

    return (
      <Card
        ref={ref}
        variant={variant}
        density={density}
        state={state}
        feedback={feedback}
        disabled={disabled}
        loadingText={loadingText}
        errorMessage={errorMessage}
        successMessage={successMessage}
        className={cn(styles.ctaCard, centered && styles.centered, className)}
        {...accessibilityProps}
        {...props}
      >
        {icon && (
          <div
            className={cn(
              styles.iconContainer,
              !centered && styles.leftAlign,
              density === "compact" && styles.iconContainerCompact,
              density === "normal" && styles.iconContainerNormal,
              density === "spacious" && styles.iconContainerSpacious,
            )}
          >
            {icon}
          </div>
        )}

        <CardHeader
          title={headline}
          headingLevel={2}
          className={cn(
            styles.header,
            centered && styles.headerCentered,
            density === "compact" && styles.headerCompact,
            density === "normal" && styles.headerNormal,
            density === "spacious" && styles.headerSpacious,
          )}
        />

        <CardBody
          className={cn(
            styles.body,
            centered && styles.bodyCentered,
            density === "compact" && styles.bodyCompact,
            density === "normal" && styles.bodyNormal,
            density === "spacious" && styles.bodySpacious,
          )}
        >
          <p className={styles.description}>{description}</p>
        </CardBody>

        <CardFooter
          align={centered ? "center" : "right"}
          className={cn(
            styles.footer,
            centered && styles.footerCentered,
            density === "compact" && styles.footerCompact,
            density === "normal" && styles.footerNormal,
            density === "spacious" && styles.footerSpacious,
          )}
        >
          <div
            className={cn(styles.actions, centered && styles.actionsCentered)}
          >
            <Button
              variant={primaryAction.variant || "primary"}
              onClick={primaryAction.onClick}
              disabled={
                disabled || primaryAction.disabled || state === "loading"
              }
              loading={primaryAction.loading || state === "loading"}
              className={styles.primaryAction}
            >
              {primaryAction.label}
            </Button>
            {secondaryAction && (
              <Button
                variant={secondaryAction.variant || "ghost"}
                onClick={secondaryAction.onClick}
                disabled={
                  disabled || secondaryAction.disabled || state === "loading"
                }
                loading={secondaryAction.loading}
                className={styles.secondaryAction}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  },
);

CTACard.displayName = "CTACard";
