import { Monitor, Moon, RotateCcw, Sun, X } from "@spexop/icons";
import React, { useId, useRef } from "react";
import { Button } from "../../buttons/Button/Button.js";
import { ButtonGroup } from "../../buttons/ButtonGroup/ButtonGroup.js";
import { Card } from "../../cards/Card/Card.js";
import { Slider } from "../../forms/Slider/Slider.js";
import { Drawer } from "../../overlays/Drawer/Drawer.js";
import { Stack } from "../../primitives/Stack/Stack.js";
import styles from "./SettingsPanel.module.css";

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

// Theme options with icons for better UX
const THEME_OPTIONS = [
  {
    value: "light" as const,
    label: "Light",
    icon: <Sun size={16} strokeWidth={2} />,
  },
  {
    value: "dark" as const,
    label: "Dark",
    icon: <Moon size={16} strokeWidth={2} />,
  },
  {
    value: "auto" as const,
    label: "Auto",
    icon: <Monitor size={16} strokeWidth={2} />,
  },
];

// Color palette options with visual indicators
const COLOR_PALETTE_OPTIONS = [
  { value: "red" as const, label: "Red", color: "#b04554" },
  { value: "blue" as const, label: "Blue", color: "#3b82f6" },
  { value: "green" as const, label: "Green", color: "#10b981" },
  { value: "purple" as const, label: "Purple", color: "#8b5cf6" },
  { value: "neutral" as const, label: "Neutral", color: "#404040" },
];

// Layout options (keep as simple buttons for now)
const LAYOUT_VARIANT_OPTIONS = [
  { value: "default" as const, label: "Default" },
  { value: "boxed" as const, label: "Boxed" },
  { value: "fluid" as const, label: "Fluid" },
];

const CONTENT_MAX_WIDTH_OPTIONS = [
  { value: "full" as const, label: "Full" },
  { value: "xl" as const, label: "XL" },
  { value: "lg" as const, label: "L" },
  { value: "md" as const, label: "M" },
];

const SPACING_OPTIONS = [
  { value: "compact" as const, label: "Compact" },
  { value: "normal" as const, label: "Normal" },
  { value: "spacious" as const, label: "Spacious" },
];

const SIDEBAR_POSITION_OPTIONS = [
  { value: "left" as const, label: "Left" },
  { value: "right" as const, label: "Right" },
];

const SIDEBAR_VISIBILITY_OPTIONS = [
  { value: "icons" as const, label: "Show" },
  { value: "hidden" as const, label: "Hide" },
];

/**
 * SettingsPanel - Slide-in settings drawer
 *
 * A full-height settings panel that slides in from the right with backdrop.
 * Pushes content on desktop, overlays on mobile.
 *
 * Features:
 * - Slides from right (400px desktop, 100% mobile)
 * - Backdrop overlay
 * - Theme selection
 * - Text zoom selection
 * - Responsive behavior
 * - Body scroll lock when open
 * - Click outside to close
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <SettingsPanel
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   theme="dark"
 *   onThemeChange={(t) => console.log(t)}
 * />
 * ```
 */
export const SettingsPanel = React.forwardRef<
  HTMLDivElement,
  SettingsPanelProps
>(
  (
    {
      isOpen,
      onClose,
      theme = "light",
      onThemeChange,
      colorPalette = "red",
      onColorPaletteChange,
      textZoom = "100",
      onTextZoomChange,
      layoutVariant = "default",
      onLayoutVariantChange,
      contentMaxWidth = "xl",
      onContentMaxWidthChange,
      spacing = "normal",
      onSpacingChange,
      sidebarPosition = "left",
      onSidebarPositionChange,
      sidebarState = "icons",
      onSidebarStateChange,
      className = "",
      onResetToDefaults,
    },
    ref,
  ) => {
    // Generate unique IDs
    const panelId = useId();
    const zoomSelectId = useId();

    // Ref for close button (first focusable element)
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Change handlers
    const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
      onThemeChange?.(newTheme);
    };

    const handleTextZoomChange = (newZoom: "100" | "130" | "150" | "200") => {
      onTextZoomChange?.(newZoom);
    };

    const handleLayoutVariantChange = (
      newVariant: "default" | "boxed" | "fluid",
    ) => {
      onLayoutVariantChange?.(newVariant);
    };

    const handleContentMaxWidthChange = (
      newWidth: "full" | "xl" | "lg" | "md",
    ) => {
      onContentMaxWidthChange?.(newWidth);
    };

    const handleSpacingChange = (
      newSpacing: "compact" | "normal" | "spacious",
    ) => {
      onSpacingChange?.(newSpacing);
    };

    const handleSidebarPositionChange = (newPosition: "left" | "right") => {
      onSidebarPositionChange?.(newPosition);
    };

    const handleSidebarStateChange = (newState: "icons" | "hidden") => {
      onSidebarStateChange?.(newState);
    };

    return (
      <Drawer
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        position="right"
        size="420px"
        className={className}
        aria-labelledby={`${panelId}-title`}
      >
        {/* Header with Close Button */}
        <div className={styles.header}>
          <h2 id={`${panelId}-title`} className={styles.title}>
            Settings
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close settings panel"
            className={styles.closeButton}
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Settings Content */}
        <Stack direction="vertical" gap={5}>
          {/* SECTION: Theme */}
          <Card
            title="THEME"
            description="Choose your preferred theme appearance"
          >
            <ButtonGroup direction="horizontal" aria-label="Theme selection">
              {THEME_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={theme === option.value ? "primary" : "outline"}
                  size="md"
                  onClick={() => handleThemeChange(option.value)}
                  aria-pressed={theme === option.value}
                >
                  {option.icon}
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </Card>

          {/* SECTION: Color Palette */}
          <Card title="COLOR PALETTE" description="Choose your accent color">
            <ButtonGroup
              direction="horizontal"
              aria-label="Color palette selection"
            >
              {COLOR_PALETTE_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    colorPalette === option.value ? "primary" : "outline"
                  }
                  size="md"
                  onClick={() => onColorPaletteChange?.(option.value)}
                  aria-pressed={colorPalette === option.value}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: option.color,
                      border: "2px solid currentColor",
                    }}
                  />
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </Card>

          {/* SECTION: Layout Width */}
          <Card
            title="LAYOUT WIDTH"
            description="Standard responsive behavior with sensible breakpoints"
          >
            <ButtonGroup
              direction="horizontal"
              aria-label="Layout width selection"
            >
              {LAYOUT_VARIANT_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    layoutVariant === option.value ? "primary" : "outline"
                  }
                  size="md"
                  onClick={() => handleLayoutVariantChange(option.value)}
                  aria-pressed={layoutVariant === option.value}
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </Card>

          {/* SECTION: Content Width */}
          <Card
            title="CONTENT WIDTH"
            description="Optimize reading line length for better readability"
          >
            <ButtonGroup
              direction="horizontal"
              aria-label="Content width selection"
            >
              {CONTENT_MAX_WIDTH_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    contentMaxWidth === option.value ? "primary" : "outline"
                  }
                  size="md"
                  onClick={() => handleContentMaxWidthChange(option.value)}
                  aria-pressed={contentMaxWidth === option.value}
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </Card>

          {/* SECTION: Spacing */}
          <Card
            title="SPACING"
            description="Balanced spacing for all screen sizes"
          >
            <ButtonGroup
              direction="horizontal"
              aria-label="Spacing density selection"
            >
              {SPACING_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={spacing === option.value ? "primary" : "outline"}
                  size="md"
                  onClick={() => handleSpacingChange(option.value)}
                  aria-pressed={spacing === option.value}
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </Card>

          {/* SECTION: Sidebar Position */}
          <Card
            title="SIDEBAR POSITION"
            description="Sidebar appears on the left side. Standard layout for most applications."
          >
            <ButtonGroup
              direction="horizontal"
              aria-label="Sidebar position selection"
            >
              {SIDEBAR_POSITION_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    sidebarPosition === option.value ? "primary" : "outline"
                  }
                  size="md"
                  onClick={() => handleSidebarPositionChange(option.value)}
                  aria-pressed={sidebarPosition === option.value}
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </Card>

          {/* SECTION: Show Sidebar */}
          <Card
            title="SHOW SIDEBAR"
            description="Control sidebar visibility. When enabled, sidebar shows icons and labels. When disabled, sidebar is completely hidden."
          >
            <ButtonGroup
              direction="horizontal"
              aria-label="Sidebar visibility selection"
            >
              {SIDEBAR_VISIBILITY_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    sidebarState === option.value ? "primary" : "outline"
                  }
                  size="md"
                  onClick={() => handleSidebarStateChange(option.value)}
                  aria-pressed={sidebarState === option.value}
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </Card>

          {/* SECTION: Text Zoom */}
          <Card
            title="TEXT ZOOM"
            description="Adjust text size for better readability. WCAG 2.2 AA requires support up to 200%."
          >
            <Slider
              id={zoomSelectId}
              value={Number.parseInt(textZoom, 10)}
              min={100}
              max={200}
              step={10}
              onChange={(value) =>
                handleTextZoomChange(
                  value.toString() as "100" | "130" | "150" | "200",
                )
              }
              showValue={true}
              formatValue={(value) => `${value}%`}
              aria-label="Text zoom selection"
            />
          </Card>

          {/* Reset to Defaults Button */}
          {onResetToDefaults && (
            <div className={styles.resetSection}>
              <button
                type="button"
                onClick={onResetToDefaults}
                className={styles.resetButton}
                aria-label="Reset all settings to default values"
              >
                <RotateCcw size={16} strokeWidth={2} />
                <span>Reset to Defaults</span>
              </button>
            </div>
          )}
        </Stack>
      </Drawer>
    );
  },
);

SettingsPanel.displayName = "SettingsPanel";
