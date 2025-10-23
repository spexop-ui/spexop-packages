/**
 * Text Component
 * Paragraph and body text with typography control
 *
 * Follows "The Spexop Way":
 * - Principle 3: Typography before decoration
 * - Principle 4: Tokens before magic numbers
 * - Principle 7: Accessibility before aesthetics
 *
 * @component Text
 * @packageName @spexop/react
 * @description Paragraph and body text component
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 *
 * @example
 * ```tsx
 * <Text size="lg" weight="regular" align="center">
 *   Body text content
 * </Text>
 * ```
 */

import { forwardRef, useMemo } from "react";
import { cn } from "../../../utils/index.js";
import styles from "./Text.module.css";
import type { TextProps } from "./Text.types.js";

// Define a proper ref type for polymorphic components
type TextRef =
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLDivElement
  | HTMLLabelElement
  | HTMLElement;

export const Text = forwardRef<TextRef, TextProps>(
  (
    {
      children,
      size = "base",
      weight = "regular",
      align = "left",
      variant = "default",
      as: Component = "p",
      noMargin = false,
      truncate = false,
      clamp,
      decoration = "none",
      transform = "none",
      overflow = "clip",
      whiteSpace = "normal",
      lineHeight,
      letterSpacing,
      wordSpacing,
      className,
      style,
      id,
      "aria-label": ariaLabel,
      "aria-live": ariaLive,
      "aria-describedby": ariaDescribedBy,
      "aria-atomic": ariaAtomic,
      "aria-relevant": ariaRelevant,
      role,
      tabIndex = -1,
      ...props
    },
    ref,
  ) => {
    const textClassName = useMemo(
      () =>
        cn(
          styles.text,
          styles[`size-${size}`],
          styles[`weight-${weight}`],
          styles[`align-${align}`],
          styles[`variant-${variant}`],
          truncate && styles.truncate,
          clamp != null && styles[`clamp-${clamp}`],
          noMargin && styles["no-margin"],
          decoration !== "none" && styles[`decoration-${decoration}`],
          transform !== "none" && styles[`transform-${transform}`],
          overflow !== "clip" && styles[`overflow-${overflow}`],
          whiteSpace !== "normal" && styles[`whitespace-${whiteSpace}`],
          className,
        ),
      [
        size,
        weight,
        align,
        variant,
        truncate,
        clamp,
        noMargin,
        decoration,
        transform,
        overflow,
        whiteSpace,
        className,
      ],
    );

    const inlineStyles = useMemo(() => {
      const styles: React.CSSProperties = {};

      if (lineHeight != null) {
        styles.lineHeight = lineHeight;
      }

      if (letterSpacing != null) {
        styles.letterSpacing = `${letterSpacing}px`;
      }

      if (wordSpacing != null) {
        styles.wordSpacing = `${wordSpacing}px`;
      }

      return { ...styles, ...style };
    }, [lineHeight, letterSpacing, wordSpacing, style]);

    return (
      <Component
        ref={
          ref as React.Ref<HTMLElement> &
            React.Ref<HTMLParagraphElement> &
            React.Ref<HTMLSpanElement> &
            React.Ref<HTMLDivElement> &
            React.Ref<HTMLLabelElement>
        }
        id={id}
        className={textClassName}
        style={inlineStyles}
        aria-label={ariaLabel}
        aria-live={ariaLive}
        aria-describedby={ariaDescribedBy}
        aria-atomic={ariaAtomic}
        aria-relevant={ariaRelevant}
        role={role}
        tabIndex={tabIndex}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = "Text";
