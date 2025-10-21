/**
 * Section Component
 * Floating card-style section container with rounded corners and borders
 *
 * @packageName @spexop/react
 * @description Container component for page sections with refined minimalism aesthetic
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 1.0.0
 * @since 2025-10-14
 *
 */

import type React from "react";
import { type ReactNode, forwardRef } from "react";
import { Container } from "../../primitives/Container/Container.js";
import type {
  ContainerMaxWidth,
  ContainerProps,
} from "../../primitives/Container/Container.types.js";
import { Stack } from "../../primitives/Stack/Stack.js";
import type { StackProps } from "../../primitives/Stack/Stack.types.js";
import styles from "./Section.module.css";

export interface SectionProps {
  /** Section content */
  children?: ReactNode;

  /** Visual variant */
  variant?: "white" | "neutral" | "gradient";

  /** Vertical padding size */
  padding?: "compact" | "normal" | "spacious";

  /** Bottom margin */
  marginBottom?: "none" | "normal" | "large";

  // Context Navigation (renders as direct child for sticky positioning)
  /** Optional ContextNav component (rendered before Container for sticky positioning) */
  contextNav?: ReactNode;

  // HIGH PRIORITY: Section Intro Props
  /** Optional section label (e.g., "THE SPEXOP WAY") */
  label?: string;

  /** Optional section title/heading */
  title?: string;

  /** Optional section description/subtitle */
  description?: string;

  /** Alignment for intro content */
  introAlign?: "left" | "center" | "right";

  /** Gap between intro and children content */
  introGap?: StackProps["gap"];

  // HIGH PRIORITY: Container Control
  /** Maximum width for content container */
  maxWidth?: ContainerMaxWidth;

  /** Container padding (responsive) */
  containerPadding?: ContainerProps["padding"];

  // HIGH PRIORITY: Accent Bar
  /** Accent bar position */
  accent?: "left" | "top" | "bottom" | "right" | "none";

  /** Custom accent color (defaults to primary color) */
  accentColor?: string;

  // MEDIUM PRIORITY: Border Control
  /** Border configuration */
  border?:
    | boolean
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "horizontal"
    | "vertical";

  /** Custom border color */
  borderColor?: string;

  // MEDIUM PRIORITY: Layout Control
  /** Remove max-width constraint */
  fullWidth?: boolean;

  /** Center content horizontally */
  centered?: boolean;

  /** Additional CSS class */
  className?: string;

  /** HTML id for anchor links */
  id?: string;

  /** Additional inline styles */
  style?: React.CSSProperties;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      variant = "white",
      padding = "normal",
      marginBottom = "normal",
      contextNav,
      label,
      title,
      description,
      introAlign = "center",
      introGap = 8,
      maxWidth = "xl",
      containerPadding = { xs: 6, md: 10 },
      accent = variant === "gradient" ? "left" : "none",
      accentColor,
      border = true,
      borderColor,
      fullWidth = false,
      centered = true,
      className,
      id,
      style,
    },
    ref,
  ) => {
    // Build section classes
    const classes = [
      styles.section,
      styles[`variant-${variant}`],
      styles[`padding-${padding}`],
      styles[`margin-${marginBottom}`],
      accent !== "none" && styles[`accent-${accent}`],
      border === false && styles.noBorder,
      typeof border === "string" && styles[`border-${border}`],
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Build inline styles
    const sectionStyle: React.CSSProperties = {
      ...style,
      ...(accentColor &&
        ({ "--accent-color": accentColor } as React.CSSProperties)),
      ...(borderColor &&
        ({ "--border-color": borderColor } as React.CSSProperties)),
    };

    // Render intro section if any intro props provided
    const hasIntro = label || title || description;
    const introContent = hasIntro && (
      <div className={styles.intro} data-align={introAlign}>
        {label && <div className={styles.label}>{label}</div>}
        {title && <h2 className={styles.title}>{title}</h2>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
    );

    // Wrap content in Container if maxWidth is set (and not fullWidth)
    const content = fullWidth ? (
      <>
        {introContent}
        {children}
      </>
    ) : (
      <Container
        maxWidth={maxWidth}
        padding={containerPadding}
        centered={centered}
      >
        {hasIntro && introContent ? (
          <Stack
            direction="vertical"
            gap={introGap}
            align={
              introAlign === "center"
                ? "center"
                : introAlign === "right"
                  ? "end"
                  : "start"
            }
          >
            {introContent}
            {children}
          </Stack>
        ) : (
          children
        )}
      </Container>
    );

    return (
      <section ref={ref} id={id} className={classes} style={sectionStyle}>
        {contextNav}
        {content}
      </section>
    );
  },
);

Section.displayName = "Section";
