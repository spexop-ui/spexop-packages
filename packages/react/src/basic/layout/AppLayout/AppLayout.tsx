/**
 * AppLayout - Main application layout with TopBar and Sidebar
 *
 * Automatically handles fixed positioning offsets for TopBar and Sidebar.
 * Eliminates the need for manual margin calculations. Supports responsive
 * layouts with mobile-first design and accessibility features.
 *
 * Following "The Spexop Way":
 * - Principle 1: Primitives before patterns (use with Container, Stack, Grid)
 * - Principle 4: Tokens before magic numbers (uses design tokens)
 * - Principle 5: Composition before complexity (flexible layout composition)
 * - Principle 6: Standards before frameworks (semantic HTML)
 * - Principle 7: Accessibility before aesthetics (ARIA landmarks, keyboard nav)
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.6.0
 * @since 2025-10-25
 * @updated 2025-11-01
 *
 * @example
 * ```tsx
 * // Basic usage
 * <AppLayout
 *   topBar={<TopBar logoText="My App" />}
 *   sidebar={<Sidebar>{navLinks}</Sidebar>}
 * >
 *   <Container>
 *     <YourContent />
 *   </Container>
 * </AppLayout>
 *
 * // With responsive sidebar width
 * <AppLayout
 *   topBar={<TopBar logoText="My App" />}
 *   sidebar={<Sidebar>{navLinks}</Sidebar>}
 *   sidebarWidth={{ xs: 0, md: 280, lg: 320 }}
 *   topBarHeight={{ xs: 56, md: 64 }}
 * >
 *   <YourContent />
 * </AppLayout>
 *
 * // Without sidebar
 * <AppLayout topBar={<TopBar />} hasSidebar={false}>
 *   <YourContent />
 * </AppLayout>
 * ```
 */

import type React from "react";
import { createElement, useMemo } from "react";
import { useDebug, useResponsiveValue } from "../../../hooks/index.js";
import { cn } from "../../../utils/index.js";
import { validateResponsiveKeys } from "../../../utils/validation.js";
import styles from "./AppLayout.module.css";
import type { AppLayoutProps } from "./AppLayout.types.js";
import { LAYOUT_CONSTANTS } from "./AppLayout.types.js";

/**
 * AppLayout Component
 * Handles fixed navigation positioning automatically
 *
 * Use with primitives for page content:
 * - Hero: Full-width (no Container)
 * - Content: Wrap in <Container> or <Stack> with padding
 * - Grid: Use for complex layouts
 */
export function AppLayout({
  topBar,
  sidebar,
  children,
  hasSidebar = true,
  topBarHeight = LAYOUT_CONSTANTS.TOPBAR_HEIGHT,
  sidebarWidth = LAYOUT_CONSTANTS.SIDEBAR_WIDTH,
  className = "",
  style = {},
  as = "main",
  ariaLabel = "Main content",
  smoothScroll = true,
  responsive = true,
  mobileBreakpoint = LAYOUT_CONSTANTS.MOBILE_BREAKPOINT,
}: AppLayoutProps) {
  // Debug mode
  const { enabled: debugEnabled, showBoundaries, showTokens } = useDebug();

  // Validate props (development only)
  if (process.env.NODE_ENV === "development") {
    // Check for responsive objects
    if (typeof topBarHeight === "object" && topBarHeight !== null) {
      validateResponsiveKeys(
        "AppLayout",
        "topBarHeight",
        topBarHeight as Record<string, unknown>,
      );
    } else if (typeof topBarHeight === "number" && topBarHeight <= 0) {
      console.warn(
        `[AppLayout] topBarHeight should be a positive number, got ${topBarHeight}`,
      );
    }

    if (typeof sidebarWidth === "object" && sidebarWidth !== null) {
      validateResponsiveKeys(
        "AppLayout",
        "sidebarWidth",
        sidebarWidth as Record<string, unknown>,
      );
    } else if (typeof sidebarWidth === "number" && sidebarWidth < 0) {
      console.warn(
        `[AppLayout] sidebarWidth should be a non-negative number, got ${sidebarWidth}`,
      );
    }

    if (typeof mobileBreakpoint === "number" && mobileBreakpoint <= 0) {
      console.warn(
        `[AppLayout] mobileBreakpoint should be a positive number, got ${mobileBreakpoint}`,
      );
    }
  }

  // Resolve responsive values
  const currentTopBarHeight = useResponsiveValue(topBarHeight);
  const currentSidebarWidth = useResponsiveValue(sidebarWidth);

  // Calculate main content styles
  const mainStyle: React.CSSProperties = useMemo(() => {
    const baseStyle: React.CSSProperties = {
      marginTop: topBar ? `${currentTopBarHeight}px` : 0,
      marginLeft:
        hasSidebar && sidebar && currentSidebarWidth > 0
          ? `${currentSidebarWidth}px`
          : 0,
      minHeight: topBar ? `calc(100vh - ${currentTopBarHeight}px)` : "100vh",
      ...style,
    };

    return baseStyle;
  }, [
    topBar,
    currentTopBarHeight,
    hasSidebar,
    sidebar,
    currentSidebarWidth,
    style,
  ]);

  // Apply debug styles
  const debugClass = debugEnabled && showBoundaries ? styles.debug : "";
  const smoothScrollClass = smoothScroll ? styles.smoothScroll : "";
  const responsiveClass = responsive ? styles.responsive : "";

  // Combine all classes
  const mainClasses = cn(
    styles.main,
    debugClass,
    smoothScrollClass,
    responsiveClass,
    className,
  );

  return (
    <div
      className={styles.appLayout}
      data-mobile-breakpoint={responsive ? mobileBreakpoint : undefined}
    >
      {topBar}
      {sidebar}
      {createElement(
        as,
        {
          className: mainClasses,
          style: mainStyle,
          "aria-label": ariaLabel,
          role: as === "div" ? "main" : undefined,
        },
        children,
      )}
      {debugEnabled && showTokens && (
        <div className={styles.debugInfo}>
          <p>TopBar Height: {currentTopBarHeight}px</p>
          <p>Sidebar Width: {currentSidebarWidth}px</p>
          <p>Has Sidebar: {hasSidebar ? "Yes" : "No"}</p>
          <p>Responsive: {responsive ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}

AppLayout.displayName = "AppLayout";
