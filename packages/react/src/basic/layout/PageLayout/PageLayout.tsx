/**
 * PageLayout Component
 *
 * A page-level layout container with responsive padding and centered content.
 * Built on top of the Container primitive with page-optimized defaults.
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns - Built on Container primitive
 * - Principle 4: Tokens before magic numbers - Uses design tokens exclusively
 * - Principle 5: Composition before complexity - Simple wrapper with smart defaults
 * - Principle 6: Standards before frameworks - Standard HTML elements
 * - Principle 7: Accessibility before aesthetics - Semantic HTML structure
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.6.0
 * @since 2025-10-24
 * @updated 2025-11-01
 *
 * @example
 * ```tsx
 * // Semantic padding (most common)
 * <PageLayout padding="lg">
 *   <h1>Page Title</h1>
 *   <p>Page content with responsive padding</p>
 * </PageLayout>
 *
 * // Numeric padding (precise control)
 * <PageLayout padding={8}>
 *   <h1>Page Title</h1>
 * </PageLayout>
 *
 * // Custom max-width
 * <PageLayout maxWidth="xl" padding="md">
 *   <h1>Narrower Page</h1>
 * </PageLayout>
 * ```
 */

import type React from "react";
import { type ResponsiveProp, useDebug } from "../../../hooks/index.js";
import { cn } from "../../../utils/index.js";
import { validateResponsiveKeys } from "../../../utils/validation.js";
import { Container } from "../../primitives/Container/Container.js";
import type { SpacingScale } from "../../primitives/types.js";
import styles from "./PageLayout.module.css";
import type { PageLayoutProps, SpacingVariant } from "./PageLayout.types.js";

/**
 * Resolve padding prop to ResponsiveProp<SpacingScale>
 * Accepts string variants, numeric values, or responsive objects
 */
function resolvePadding(
  padding: SpacingScale | SpacingVariant | ResponsiveProp<SpacingScale>,
): ResponsiveProp<SpacingScale> {
  // If already a responsive object, return as-is
  if (typeof padding === "object" && padding !== null) {
    return padding;
  }

  // If numeric, return as-is
  if (typeof padding === "number") {
    return padding;
  }

  // Map string variants to responsive padding objects
  const paddingMap: Record<SpacingVariant, ResponsiveProp<SpacingScale>> = {
    none: 0,
    sm: 4,
    md: 6,
    lg: { xs: 6, sm: 6, md: 8, lg: 8, xl: 10, "2xl": 10 }, // 24px → 40px → 64px
    xl: 10,
  };

  return paddingMap[padding];
}

export function PageLayout({
  children,
  maxWidth = "page",
  padding = "lg",
  centered = true,
  className = "",
  style = {},
  as = "div",
}: PageLayoutProps) {
  // Debug mode
  const { enabled: debugEnabled, showBoundaries, showTokens } = useDebug();

  // Validate props (development only)
  if (process.env.NODE_ENV === "development") {
    // Check for responsive objects in padding
    if (
      typeof padding === "object" &&
      padding !== null &&
      typeof padding !== "number"
    ) {
      validateResponsiveKeys(
        "PageLayout",
        "padding",
        padding as Record<string, unknown>,
      );
    }

    // Validate padding variant
    if (typeof padding === "string") {
      const validVariants: SpacingVariant[] = ["none", "sm", "md", "lg", "xl"];
      if (!validVariants.includes(padding as SpacingVariant)) {
        console.warn(
          `[PageLayout] Invalid padding variant "${padding}". Valid values: ${validVariants.join(", ")}`,
        );
      }
    }

    // Validate numeric padding
    if (typeof padding === "number") {
      if (padding < 0 || padding > 16) {
        console.warn(
          `[PageLayout] padding value ${padding} is outside the recommended range (0-16). Consider using a valid SpacingScale value.`,
        );
      }
    }
  }

  const resolvedPadding = resolvePadding(padding);

  // Apply debug styles
  const debugClass = debugEnabled && showBoundaries ? styles.debug : "";

  return (
    <>
      <Container
        maxWidth={maxWidth}
        padding={resolvedPadding}
        centered={centered}
        className={cn(styles.pageLayout, debugClass, className)}
        style={style}
        as={as}
      >
        {children}
      </Container>
      {debugEnabled && showTokens && (
        <div className={styles.debugInfo}>
          <p>Max Width: {maxWidth}</p>
          <p>Padding: {JSON.stringify(resolvedPadding)}</p>
          <p>Centered: {centered ? "Yes" : "No"}</p>
          <p>Element: {String(as)}</p>
        </div>
      )}
    </>
  );
}

PageLayout.displayName = "PageLayout";

// Re-export types
export type { PageLayoutProps, SpacingVariant } from "./PageLayout.types.js";
