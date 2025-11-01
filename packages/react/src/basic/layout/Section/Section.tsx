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
import { useResponsiveValue } from "../../../hooks/index.js";
import { validateSpacing, validateResponsiveKeys } from "../../../utils/validation.js";
import { Container } from "../../primitives/Container/Container.js";
import type {
  ContainerMaxWidth,
  ContainerProps,
} from "../../primitives/Container/Container.types.js";
import type { SpacingScale } from "../../primitives/types.js";
import type { ResponsiveProp } from "../../../hooks/index.js";
import { Stack } from "../../primitives/Stack/Stack.js";
import type { StackProps } from "../../primitives/Stack/Stack.types.js";
import { cn } from "../../../utils/index.js";
import styles from "./Section.module.css";

export interface SectionProps {
  /** Section content */
  children?: ReactNode;

  /** Visual variant */
  variant?: "white" | "neutral" | "gradient";

  /**
   * Custom background color (CSS color value)
   * Overrides variant background color if provided
   * @example backgroundColor="#ffffff"
   * @example backgroundColor="var(--theme-surface)"
   */
  backgroundColor?: string;

  /**
   * Custom text color (CSS color value)
   * Applies to intro content (label, title, description)
   * @example textColor="#1f2937"
   * @example textColor="var(--theme-text)"
   */
  textColor?: string;

  /**
   * Custom label color (CSS color value)
   * Overrides textColor for label specifically
   */
  labelColor?: string;

  /**
   * Custom title color (CSS color value)
   * Overrides textColor for title specifically
   */
  titleColor?: string;

  /**
   * Custom description color (CSS color value)
   * Overrides textColor for description specifically
   */
  descriptionColor?: string;

  /** Vertical padding size (preset) */
  padding?: "compact" | "normal" | "spacious";

  /** Responsive padding (all sides) */
  paddingAll?: ResponsiveProp<SpacingScale>;

  /** Responsive top padding */
  paddingTop?: ResponsiveProp<SpacingScale>;

  /** Responsive bottom padding */
  paddingBottom?: ResponsiveProp<SpacingScale>;

  /** Responsive left padding */
  paddingLeft?: ResponsiveProp<SpacingScale>;

  /** Responsive right padding */
  paddingRight?: ResponsiveProp<SpacingScale>;

  /** Responsive vertical padding (top and bottom) */
  paddingY?: ResponsiveProp<SpacingScale>;

  /** Responsive horizontal padding (left and right) */
  paddingX?: ResponsiveProp<SpacingScale>;

  /** Bottom margin (preset or responsive) 
   * - Preset: "none" | "normal" | "large"
   * - Responsive: number (0-10), string number (e.g., "4"), or responsive object
   * If number/string number/object provided, treated as responsive (overrides preset)
   */
  marginBottom?: "none" | "normal" | "large" | ResponsiveProp<SpacingScale> | string;

  /** Responsive top margin */
  marginTop?: ResponsiveProp<SpacingScale>;

  /** Responsive bottom margin (overrides marginBottom preset) */
  marginBottomResponsive?: ResponsiveProp<SpacingScale>;

  /** Responsive left margin */
  marginLeft?: ResponsiveProp<SpacingScale>;

  /** Responsive right margin */
  marginRight?: ResponsiveProp<SpacingScale>;

  /** Responsive vertical margin (top and bottom) */
  marginY?: ResponsiveProp<SpacingScale>;

  /** Responsive horizontal margin (left and right) */
  marginX?: ResponsiveProp<SpacingScale>;

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

  /** Container left padding (overrides containerPadding) */
  containerPaddingLeft?: ContainerProps["paddingLeft"];

  /** Container right padding (overrides containerPadding) */
  containerPaddingRight?: ContainerProps["paddingRight"];

  /** Container top padding (overrides containerPadding) */
  containerPaddingTop?: ContainerProps["paddingTop"];

  /** Container bottom padding (overrides containerPadding) */
  containerPaddingBottom?: ContainerProps["paddingBottom"];

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

  /**
   * Border width (CSS value)
   * Overrides default theme border width if provided
   * @example borderWidth="1px"
   * @example borderWidth="2px"
   * @example borderWidth="3px"
   */
  borderWidth?: string;

  /**
   * Border radius (CSS value)
   * Overrides default theme border radius if provided
   * @example borderRadius="8px"
   * @example borderRadius="0"
   * @example borderRadius="var(--theme-radius-lg)"
   */
  borderRadius?: string;

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
      backgroundColor,
      textColor,
      labelColor,
      titleColor,
      descriptionColor,
      padding = "normal",
      paddingAll,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingY,
      paddingX,
      marginBottom = "normal",
      marginTop,
      marginBottomResponsive,
      marginLeft,
      marginRight,
      marginY,
      marginX,
      contextNav,
      label,
      title,
      description,
      introAlign = "center",
      introGap = 8,
      maxWidth = "xl",
      containerPadding = { xs: 6, md: 10 },
      containerPaddingLeft,
      containerPaddingRight,
      containerPaddingTop,
      containerPaddingBottom,
      accent = variant === "gradient" ? "left" : "none",
      accentColor,
      border = true,
      borderColor,
      borderWidth,
      borderRadius,
      fullWidth = false,
      centered = true,
      className,
      id,
      style,
    },
    ref,
  ) => {
    // Validate props (development only)
    if (process.env.NODE_ENV === "development") {
      validateSpacing("Section", "paddingAll", paddingAll);
      validateSpacing("Section", "paddingTop", paddingTop);
      validateSpacing("Section", "paddingBottom", paddingBottom);
      validateSpacing("Section", "paddingLeft", paddingLeft);
      validateSpacing("Section", "paddingRight", paddingRight);
      validateSpacing("Section", "paddingY", paddingY);
      validateSpacing("Section", "paddingX", paddingX);
      validateSpacing("Section", "marginTop", marginTop);
      validateSpacing("Section", "marginBottomResponsive", marginBottomResponsive);
      validateSpacing("Section", "marginLeft", marginLeft);
      validateSpacing("Section", "marginRight", marginRight);
      validateSpacing("Section", "marginY", marginY);
      validateSpacing("Section", "marginX", marginX);

      // Validate responsive objects
      if (typeof paddingAll === "object" && paddingAll !== null) {
        validateResponsiveKeys("Section", "paddingAll", paddingAll as Record<string, unknown>);
      }
      if (typeof marginTop === "object" && marginTop !== null) {
        validateResponsiveKeys("Section", "marginTop", marginTop as Record<string, unknown>);
      }
    }

    // Resolve responsive values
    const currentPaddingAll = useResponsiveValue(paddingAll);
    const currentPaddingTop = useResponsiveValue(paddingTop ?? paddingY);
    const currentPaddingBottom = useResponsiveValue(paddingBottom ?? paddingY);
    const currentPaddingLeft = useResponsiveValue(paddingLeft ?? paddingX);
    const currentPaddingRight = useResponsiveValue(paddingRight ?? paddingX);
    const currentMarginTop = useResponsiveValue(marginTop ?? marginY);
    
    // Handle marginBottom: if it's a number, string number, or object, treat as responsive; otherwise use preset
    const marginBottomIsResponsive = 
      typeof marginBottom === "number" || 
      (typeof marginBottom === "object" && marginBottom !== null) ||
      (typeof marginBottom === "string" && /^\d+$/.test(marginBottom)); // String numbers like "4"
    const currentMarginBottom = useResponsiveValue(
      marginBottomResponsive ?? 
      (marginBottomIsResponsive 
        ? (typeof marginBottom === "string" && /^\d+$/.test(marginBottom) 
          ? parseInt(marginBottom, 10) as SpacingScale 
          : marginBottom as ResponsiveProp<SpacingScale>)
        : undefined) ?? 
      marginY
    );
    const currentMarginLeft = useResponsiveValue(marginLeft ?? marginX);
    const currentMarginRight = useResponsiveValue(marginRight ?? marginX);
    
    // Determine if we should use preset marginBottom class
    const useMarginBottomPreset = !marginBottomResponsive && !marginBottomIsResponsive && !marginY && marginBottom && typeof marginBottom === "string";

    // Build inline styles for responsive spacing (using CSS variables)
    const spacingStyle: React.CSSProperties = {
      ...(currentPaddingAll !== undefined && {
        padding: `var(--theme-spacing-${currentPaddingAll})`,
      }),
      ...(currentPaddingTop !== undefined && {
        paddingTop: `var(--theme-spacing-${currentPaddingTop})`,
      }),
      ...(currentPaddingBottom !== undefined && {
        paddingBottom: `var(--theme-spacing-${currentPaddingBottom})`,
      }),
      ...(currentPaddingLeft !== undefined && {
        paddingLeft: `var(--theme-spacing-${currentPaddingLeft})`,
      }),
      ...(currentPaddingRight !== undefined && {
        paddingRight: `var(--theme-spacing-${currentPaddingRight})`,
      }),
      ...(currentMarginTop !== undefined && {
        marginTop: `var(--theme-spacing-${currentMarginTop})`,
      }),
      ...(currentMarginBottom !== undefined && {
        marginBottom: `var(--theme-spacing-${currentMarginBottom})`,
      }),
      ...(currentMarginLeft !== undefined && {
        marginLeft: `var(--theme-spacing-${currentMarginLeft})`,
      }),
      ...(currentMarginRight !== undefined && {
        marginRight: `var(--theme-spacing-${currentMarginRight})`,
      }),
    };

    // Build section classes
    const classes = [
      styles.section,
      styles[`variant-${variant}`],
      // Only use preset padding/margin classes if responsive props not provided
      !paddingAll && !paddingTop && !paddingBottom && !paddingLeft && !paddingRight && !paddingY && !paddingX && styles[`padding-${padding}`],
      useMarginBottomPreset && styles[`margin-${marginBottom}`],
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
      ...spacingStyle,
      ...(backgroundColor && { backgroundColor }),
      ...(borderWidth && { borderWidth }),
      ...(borderRadius && { borderRadius }),
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
        {label && (
          <div
            className={styles.label}
            style={labelColor ? { color: labelColor } : textColor ? { color: textColor } : undefined}
          >
            {label}
          </div>
        )}
        {title && (
          <h2
            className={styles.title}
            style={titleColor ? { color: titleColor } : textColor ? { color: textColor } : undefined}
          >
            {title}
          </h2>
        )}
        {description && (
          <p
            className={styles.description}
            style={descriptionColor ? { color: descriptionColor } : textColor ? { color: textColor } : undefined}
          >
            {description}
          </p>
        )}
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
        paddingLeft={containerPaddingLeft}
        paddingRight={containerPaddingRight}
        paddingTop={containerPaddingTop}
        paddingBottom={containerPaddingBottom}
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
