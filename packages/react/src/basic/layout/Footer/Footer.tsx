/**
 * Footer Component
 * Versatile footer component for page layouts
 *
 * Use for:
 * - Site-wide footers with links and copyright
 * - Section footers within page layouts
 * - Layout composition with Grid/Stack primitives
 *
 * @component Footer
 * @packageName @spexop/react
 * @description Primitives-first footer component
 * @author @spexop-ui | github.com/spexop-ui | @olmstedian | github.com/olmstedian
 * @version 0.1.0
 * @since 2025-10-14
 *
 * @example
 * ```tsx
 * <Footer padding={6}>
 *   <p>© 2025 Company Name</p>
 * </Footer>
 * ```
 *
 * @example
 * ```tsx
 * <Footer variant="minimal" padding={4}>
 *   <Container maxWidth="xl">
 *     <p>© 2025 Company Name. All rights reserved.</p>
 *   </Container>
 * </Footer>
 * ```
 */

import type React from "react";
import { useDebug, useResponsiveValue } from "../../../hooks/index.js";
import { cn } from "../../../utils/index.js";
import {
  validateNoConflict,
  validateResponsiveKeys,
  validateSpacing,
} from "../../../utils/validation.js";
import { Container } from "../../primitives/Container/Container.js";
import { Grid } from "../../primitives/Grid/Grid.js";
import { Stack } from "../../primitives/Stack/Stack.js";
import { Icon } from "../../indicators/Icon/Icon.js";
import styles from "./Footer.module.css";
import type { FooterColumn, FooterProps } from "./Footer.types.js";

export function Footer({
  as: Component = "footer",
  variant = "default",
  padding,
  paddingAll,
  paddingTop: paddingTopProp,
  paddingBottom: paddingBottomProp,
  paddingLeft: paddingLeftProp,
  paddingRight: paddingRightProp,
  paddingY,
  paddingX,
  marginTop: marginTopProp,
  marginBottom: marginBottomProp,
  marginLeft: marginLeftProp,
  marginRight: marginRightProp,
  marginY,
  marginX,
  backgroundColor,
  textColor,
  linkColor,
  borderColor,
  borderWidth,
  borderRadius,
  withBorder = false,
  withBackground = true,
  children,
  columns,
  copyright,
  socialLinks,
  className,
  style,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...rest
}: FooterProps) {
  // Debug mode
  const { enabled: debugEnabled, showBoundaries } = useDebug();

  // Validate props (development only)
  if (process.env.NODE_ENV === "development") {
    // Validate spacing values
    validateSpacing("Footer", "padding", padding);
    validateSpacing("Footer", "paddingAll", paddingAll);
    validateSpacing("Footer", "paddingTop", paddingTopProp);
    validateSpacing("Footer", "paddingBottom", paddingBottomProp);
    validateSpacing("Footer", "paddingLeft", paddingLeftProp);
    validateSpacing("Footer", "paddingRight", paddingRightProp);
    validateSpacing("Footer", "paddingY", paddingY);
    validateSpacing("Footer", "paddingX", paddingX);
    validateSpacing("Footer", "marginTop", marginTopProp);
    validateSpacing("Footer", "marginBottom", marginBottomProp);
    validateSpacing("Footer", "marginLeft", marginLeftProp);
    validateSpacing("Footer", "marginRight", marginRightProp);
    validateSpacing("Footer", "marginY", marginY);
    validateSpacing("Footer", "marginX", marginX);

    // Check for responsive objects
    if (typeof padding === "object" && padding !== null) {
      validateResponsiveKeys(
        "Footer",
        "padding",
        padding as Record<string, unknown>,
      );
    }
    if (typeof paddingAll === "object" && paddingAll !== null) {
      validateResponsiveKeys(
        "Footer",
        "paddingAll",
        paddingAll as Record<string, unknown>,
      );
    }
    if (typeof paddingY === "object" && paddingY !== null) {
      validateResponsiveKeys(
        "Footer",
        "paddingY",
        paddingY as Record<string, unknown>,
      );
    }
    if (typeof paddingX === "object" && paddingX !== null) {
      validateResponsiveKeys(
        "Footer",
        "paddingX",
        paddingX as Record<string, unknown>,
      );
    }
    if (typeof marginTopProp === "object" && marginTopProp !== null) {
      validateResponsiveKeys(
        "Footer",
        "marginTop",
        marginTopProp as Record<string, unknown>,
      );
    }
    if (typeof marginY === "object" && marginY !== null) {
      validateResponsiveKeys(
        "Footer",
        "marginY",
        marginY as Record<string, unknown>,
      );
    }
    if (typeof marginX === "object" && marginX !== null) {
      validateResponsiveKeys(
        "Footer",
        "marginX",
        marginX as Record<string, unknown>,
      );
    }

    // Check for conflicting props
    validateNoConflict(
      "Footer",
      variant === "minimal" && withBorder,
      'variant="minimal" is intended for no borders, but withBorder=true was provided. Consider using variant="bordered" instead.',
    );

    validateNoConflict(
      "Footer",
      variant === "minimal" && withBackground,
      'variant="minimal" is intended for transparent backgrounds, but withBackground=true was provided. Consider using variant="default" instead.',
    );
  }

  // Resolve responsive values - padding: use paddingAll as alias for padding
  const effectivePadding = paddingAll ?? padding;
  const currentPadding = useResponsiveValue(effectivePadding);
  const currentPaddingTop = useResponsiveValue(
    paddingTopProp ?? paddingY,
  );
  const currentPaddingBottom = useResponsiveValue(
    paddingBottomProp ?? paddingY,
  );
  const currentPaddingLeft = useResponsiveValue(
    paddingLeftProp ?? paddingX,
  );
  const currentPaddingRight = useResponsiveValue(
    paddingRightProp ?? paddingX,
  );

  // Resolve responsive values - margins
  const currentMarginTop = useResponsiveValue(marginTopProp ?? marginY);
  const currentMarginBottom = useResponsiveValue(marginBottomProp ?? marginY);
  const currentMarginLeft = useResponsiveValue(marginLeftProp ?? marginX);
  const currentMarginRight = useResponsiveValue(marginRightProp ?? marginX);

  // Build inline styles for custom colors and border
  const customStyle: React.CSSProperties = {
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
    ...(borderColor && { borderColor }),
    ...(borderWidth && { borderWidth }),
    ...(borderRadius && { borderRadius }),
    // Apply margin styles via CSS variables
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
    ...style,
  };

  // Render structured layout if columns/copyright/socialLinks provided and no children
  const renderStructuredLayout = (): React.ReactNode => {
    if (children) return null; // Custom layout takes precedence

    return (
      <Container maxWidth="xl">
        <Stack direction="vertical" gap={8}>
          {/* Columns */}
          {columns && columns.length > 0 && (
            <Grid
              columns={{
                xs: 1,
                sm: 2,
                md: columns.length >= 3 ? 3 : columns.length,
                lg: columns.length,
              }}
              gap={8}
            >
              {columns.map((column, index) => (
                <div key={`footer-column-${index}-${column.title?.slice(0, 10)}`}>
                  {column.title && (
                    <h3 style={{ marginBottom: "var(--theme-spacing-4)" }}>
                      {column.title}
                    </h3>
                  )}
                  {column.content ? (
                    column.content
                  ) : (
                    <Stack direction="vertical" gap={3}>
                      {column.links?.map((link, linkIndex) => (
                        <a
                          key={`footer-link-${index}-${linkIndex}-${link.label?.slice(0, 10)}`}
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          style={{
                            color: linkColor || "var(--theme-text-secondary)",
                          }}
                        >
                          {link.label}
                        </a>
                      ))}
                    </Stack>
                  )}
                </div>
              ))}
            </Grid>
          )}

          {/* Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <Stack direction="horizontal" gap={4} align="center">
              {socialLinks.map((socialLink, index) => (
                <a
                  key={`footer-social-link-${index}-${socialLink.name?.slice(0, 10)}`}
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLink.label || socialLink.name}
                  style={{
                    color: linkColor || "var(--theme-text-secondary)",
                  }}
                >
                  {socialLink.icon ? (
                    <Icon name={socialLink.icon} />
                  ) : (
                    socialLink.name
                  )}
                </a>
              ))}
            </Stack>
          )}

          {/* Copyright */}
          {copyright && (
            <div
              style={{
                textAlign: "center",
                color: textColor || "var(--theme-text-secondary)",
              }}
            >
              {typeof copyright === "string" ? <p>{copyright}</p> : copyright}
            </div>
          )}
        </Stack>
      </Container>
    );
  };

  // Determine content to render
  const content = children || renderStructuredLayout();

  return (
    <Component
      className={cn(
        styles.footer,
        styles[`footer--${variant}`],
        // Padding classes
        currentPadding !== undefined && styles[`padding${currentPadding}`],
        currentPaddingTop !== undefined &&
          styles[`paddingTop${currentPaddingTop}`],
        currentPaddingBottom !== undefined &&
          styles[`paddingBottom${currentPaddingBottom}`],
        currentPaddingLeft !== undefined &&
          styles[`paddingLeft${currentPaddingLeft}`],
        currentPaddingRight !== undefined &&
          styles[`paddingRight${currentPaddingRight}`],
        // Visual modifiers
        withBorder && styles.withBorder,
        !withBackground && styles.noBackground,
        // Debug mode
        debugEnabled && showBoundaries && styles.debugBoundaries,
        className,
      )}
      style={customStyle}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-debug={debugEnabled ? "true" : undefined}
      data-component="Footer"
      data-variant={debugEnabled ? variant : undefined}
      {...rest}
    >
      {/* Apply link color via CSS variable if provided */}
      {linkColor && (
        <style>
          {`
            .${styles.footer} a {
              color: ${linkColor};
            }
            .${styles.footer} a:hover {
              color: ${linkColor};
              opacity: 0.8;
            }
          `}
        </style>
      )}
      {content}
    </Component>
  );
}

Footer.displayName = "Footer";
