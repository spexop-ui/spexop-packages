export interface SettingsPanelProps {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;

  /**
   * Callback when panel should close
   */
  onClose: () => void;

  /**
   * Theme value
   * @default "light"
   */
  theme?: "light" | "dark" | "auto";

  /**
   * Theme change handler
   */
  onThemeChange?: (theme: "light" | "dark" | "auto") => void;

  /**
   * Color palette value
   * @default "red"
   */
  colorPalette?: "red" | "blue" | "green" | "purple" | "neutral";

  /**
   * Color palette change handler
   */
  onColorPaletteChange?: (
    palette: "red" | "blue" | "green" | "purple" | "neutral",
  ) => void;

  /**
   * Text zoom value (percentage)
   * @default "100"
   */
  textZoom?: "100" | "130" | "150" | "200";

  /**
   * Text zoom change handler
   */
  onTextZoomChange?: (zoom: "100" | "130" | "150" | "200") => void;

  /**
   * Layout variant - controls content width behavior
   * @default "default"
   */
  layoutVariant?: "default" | "boxed" | "fluid";

  /**
   * Layout variant change handler
   */
  onLayoutVariantChange?: (variant: "default" | "boxed" | "fluid") => void;

  /**
   * Content max width - maximum content area width
   * @default "xl"
   */
  contentMaxWidth?: "full" | "xl" | "lg" | "md";

  /**
   * Content max width change handler
   */
  onContentMaxWidthChange?: (width: "full" | "xl" | "lg" | "md") => void;

  /**
   * Spacing density - control padding/spacing throughout layout
   * @default "normal"
   */
  spacing?: "compact" | "normal" | "spacious";

  /**
   * Spacing change handler
   */
  onSpacingChange?: (spacing: "compact" | "normal" | "spacious") => void;

  /**
   * Sidebar position - left or right side of layout
   * @default "left"
   */
  sidebarPosition?: "left" | "right";

  /**
   * Sidebar position change handler
   */
  onSidebarPositionChange?: (position: "left" | "right") => void;

  /**
   * Sidebar state - two-state architecture aligned with SProvider
   * @default "icons"
   */
  sidebarState?: "icons" | "hidden";

  /**
   * Sidebar state change handler
   */
  onSidebarStateChange?: (state: "icons" | "hidden") => void;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Reset all settings to default values handler
   */
  onResetToDefaults?: () => void;
}
