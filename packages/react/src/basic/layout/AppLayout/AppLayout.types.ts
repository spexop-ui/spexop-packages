import type { CSSProperties, ReactNode } from "react";
import type { ResponsiveProp } from "../../../hooks/index.js";

/**
 * AppLayout component props
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */
export interface AppLayoutProps {
  /**
   * TopBar component to display at the top of the layout
   * Should be a TopBar component with fixed positioning
   */
  topBar?: ReactNode;

  /**
   * Sidebar component to display on the left side
   * Should be a Sidebar component with fixed positioning
   */
  sidebar?: ReactNode;

  /**
   * Main content area
   * Use primitives (Container, Stack, Grid) for proper spacing
   */
  children: ReactNode;

  /**
   * Whether sidebar is present and should affect layout
   * Set to false to disable sidebar margin even if sidebar is provided
   * @default true
   */
  hasSidebar?: boolean;

  /**
   * Custom TopBar height in pixels
   * Must match the actual TopBar component height
   * @default 64
   */
  topBarHeight?: ResponsiveProp<number>;

  /**
   * Custom Sidebar width in pixels
   * Must match the actual Sidebar component width
   * @default 320
   */
  sidebarWidth?: ResponsiveProp<number>;

  /**
   * Additional CSS class for main content area
   */
  className?: string;

  /**
   * Additional inline styles for main content area
   */
  style?: CSSProperties;

  /**
   * Semantic HTML element to use for main content
   * @default "main"
   */
  as?: "main" | "div" | "section" | "article";

  /**
   * ARIA label for main content area
   * Improves accessibility for screen readers
   * @example "Main content"
   */
  ariaLabel?: string;

  /**
   * Enable smooth scrolling behavior
   * @default true
   */
  smoothScroll?: boolean;

  /**
   * Enable mobile-responsive behavior
   * Automatically hides sidebar on mobile viewports
   * @default true
   */
  responsive?: boolean;

  /**
   * Breakpoint for mobile behavior (in pixels)
   * @default 768
   */
  mobileBreakpoint?: number;
}

/**
 * Layout constants for manual positioning
 * Use these if not using AppLayout component
 */
export const LAYOUT_CONSTANTS = {
  /** Default TopBar height */
  TOPBAR_HEIGHT: 64,
  /** Default Sidebar width (expanded) */
  SIDEBAR_WIDTH: 320,
  /** Default Sidebar width (collapsed) */
  SIDEBAR_WIDTH_COLLAPSED: 64,
  /** Default mobile breakpoint */
  MOBILE_BREAKPOINT: 768,
} as const;

/**
 * Layout constant types
 */
export type LayoutConstants = typeof LAYOUT_CONSTANTS;
