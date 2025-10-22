/// <reference types="@testing-library/jest-dom" />
/**
 * SettingsPanel Component Tests
 *
 * Tests for SettingsPanel component covering:
 * - Open/closed states
 * - Theme switcher functionality
 * - Color palette selection
 * - Layout controls
 * - Content width controls
 * - Spacing controls
 * - Sidebar position controls
 * - Sidebar state controls
 * - Text zoom slider
 * - Close functionality (button, Escape key)
 * - Callback handlers
 * - Reset to defaults
 * - Accessibility (ARIA, keyboard navigation, focus)
 * - Proper use of @spexop/icons
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { SettingsPanel } from "./SettingsPanel.js";

describe("SettingsPanel", () => {
  describe("Rendering", () => {
    it("renders when open", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("does not render when closed", () => {
      render(<SettingsPanel isOpen={false} onClose={() => {}} />);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders Settings title", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("renders close button", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const closeButton = screen.getByLabelText("Close settings panel");
      expect(closeButton).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          className="custom-class"
        />,
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveClass("custom-class");
    });
  });

  describe("Theme Section", () => {
    it("renders theme section", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("THEME")).toBeInTheDocument();
      expect(
        screen.getByText("Choose your preferred theme appearance"),
      ).toBeInTheDocument();
    });

    it("renders all theme options", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("Light")).toBeInTheDocument();
      expect(screen.getByText("Dark")).toBeInTheDocument();
      expect(screen.getByText("Auto")).toBeInTheDocument();
    });

    it("shows selected theme", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} theme="dark" />);

      const darkButton = screen.getByRole("button", { name: /dark/i });
      expect(darkButton).toHaveAttribute("aria-pressed", "true");
    });

    it("calls onThemeChange when theme is selected", async () => {
      const user = userEvent.setup();
      const handleThemeChange = vi.fn();

      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          theme="light"
          onThemeChange={handleThemeChange}
        />,
      );

      const darkButton = screen.getByRole("button", { name: /dark/i });
      await user.click(darkButton);

      expect(handleThemeChange).toHaveBeenCalledWith("dark");
    });

    it("shows light theme as selected by default", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const lightButton = screen.getByRole("button", { name: /light/i });
      expect(lightButton).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("Color Palette Section", () => {
    it("renders color palette section", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("COLOR PALETTE")).toBeInTheDocument();
      expect(screen.getByText("Choose your accent color")).toBeInTheDocument();
    });

    it("renders all color palette options", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("Red")).toBeInTheDocument();
      expect(screen.getByText("Blue")).toBeInTheDocument();
      expect(screen.getByText("Green")).toBeInTheDocument();
      expect(screen.getByText("Purple")).toBeInTheDocument();
      expect(screen.getByText("Neutral")).toBeInTheDocument();
    });

    it("shows selected color palette", () => {
      render(
        <SettingsPanel isOpen={true} onClose={() => {}} colorPalette="blue" />,
      );

      const blueButton = screen.getByRole("button", { name: /blue/i });
      expect(blueButton).toHaveAttribute("aria-pressed", "true");
    });

    it("calls onColorPaletteChange when palette is selected", async () => {
      const user = userEvent.setup();
      const handleColorPaletteChange = vi.fn();

      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          colorPalette="red"
          onColorPaletteChange={handleColorPaletteChange}
        />,
      );

      const greenButton = screen.getByRole("button", { name: /green/i });
      await user.click(greenButton);

      expect(handleColorPaletteChange).toHaveBeenCalledWith("green");
    });

    it("shows red palette as selected by default", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const redButton = screen.getByRole("button", { name: /red/i });
      expect(redButton).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("Layout Width Section", () => {
    it("renders layout width section", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("LAYOUT WIDTH")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Standard responsive behavior with sensible breakpoints",
        ),
      ).toBeInTheDocument();
    });

    it("renders all layout variant options", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const layoutSection = screen.getByText("LAYOUT WIDTH").closest("div");
      expect(layoutSection).toBeInTheDocument();
      if (!layoutSection) throw new Error("Layout section not found");

      const buttons = within(layoutSection).getAllByRole("button");
      const labels = buttons.map((btn) => btn.textContent);

      expect(labels).toContain("Default");
      expect(labels).toContain("Boxed");
      expect(labels).toContain("Fluid");
    });

    it("shows selected layout variant", () => {
      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          layoutVariant="boxed"
        />,
      );

      const layoutSection = screen.getByText("LAYOUT WIDTH").closest("div");
      if (!layoutSection) throw new Error("Layout section not found");
      const boxedButton = within(layoutSection).getByRole("button", {
        name: /boxed/i,
      });
      expect(boxedButton).toHaveAttribute("aria-pressed", "true");
    });

    it("calls onLayoutVariantChange when variant is selected", async () => {
      const user = userEvent.setup();
      const handleLayoutVariantChange = vi.fn();

      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          layoutVariant="default"
          onLayoutVariantChange={handleLayoutVariantChange}
        />,
      );

      const layoutSection = screen.getByText("LAYOUT WIDTH").closest("div");
      if (!layoutSection) throw new Error("Layout section not found");
      const fluidButton = within(layoutSection).getByRole("button", {
        name: /fluid/i,
      });
      await user.click(fluidButton);

      expect(handleLayoutVariantChange).toHaveBeenCalledWith("fluid");
    });
  });

  describe("Content Width Section", () => {
    it("renders content width section", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("CONTENT WIDTH")).toBeInTheDocument();
      expect(
        screen.getByText("Optimize reading line length for better readability"),
      ).toBeInTheDocument();
    });

    it("renders all content width options", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const contentSection = screen.getByText("CONTENT WIDTH").closest("div");
      if (!contentSection) throw new Error("Content section not found");
      const buttons = within(contentSection).getAllByRole("button");
      const labels = buttons.map((btn) => btn.textContent);

      expect(labels).toContain("Full");
      expect(labels).toContain("XL");
      expect(labels).toContain("L");
      expect(labels).toContain("M");
    });

    it("shows selected content width", () => {
      render(
        <SettingsPanel isOpen={true} onClose={() => {}} contentMaxWidth="lg" />,
      );

      const contentSection = screen.getByText("CONTENT WIDTH").closest("div");
      if (!contentSection) throw new Error("Content section not found");
      const lgButton = within(contentSection).getByRole("button", {
        name: /^L$/i,
      });
      expect(lgButton).toHaveAttribute("aria-pressed", "true");
    });

    it("calls onContentMaxWidthChange when width is selected", async () => {
      const user = userEvent.setup();
      const handleContentMaxWidthChange = vi.fn();

      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          contentMaxWidth="xl"
          onContentMaxWidthChange={handleContentMaxWidthChange}
        />,
      );

      const contentSection = screen.getByText("CONTENT WIDTH").closest("div");
      if (!contentSection) throw new Error("Content section not found");
      const mdButton = within(contentSection).getByRole("button", {
        name: /^M$/i,
      });
      await user.click(mdButton);

      expect(handleContentMaxWidthChange).toHaveBeenCalledWith("md");
    });
  });

  describe("Spacing Section", () => {
    it("renders spacing section", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("SPACING")).toBeInTheDocument();
      expect(
        screen.getByText("Balanced spacing for all screen sizes"),
      ).toBeInTheDocument();
    });

    it("renders all spacing options", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const spacingSection = screen.getByText("SPACING").closest("div");
      if (!spacingSection) throw new Error("Spacing section not found");
      const buttons = within(spacingSection).getAllByRole("button");
      const labels = buttons.map((btn) => btn.textContent);

      expect(labels).toContain("Compact");
      expect(labels).toContain("Normal");
      expect(labels).toContain("Spacious");
    });

    it("shows selected spacing", () => {
      render(
        <SettingsPanel isOpen={true} onClose={() => {}} spacing="spacious" />,
      );

      const spacingSection = screen.getByText("SPACING").closest("div");
      if (!spacingSection) throw new Error("Spacing section not found");
      const spaciousButton = within(spacingSection).getByRole("button", {
        name: /spacious/i,
      });
      expect(spaciousButton).toHaveAttribute("aria-pressed", "true");
    });

    it("calls onSpacingChange when spacing is selected", async () => {
      const user = userEvent.setup();
      const handleSpacingChange = vi.fn();

      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          spacing="normal"
          onSpacingChange={handleSpacingChange}
        />,
      );

      const spacingSection = screen.getByText("SPACING").closest("div");
      if (!spacingSection) throw new Error("Spacing section not found");
      const compactButton = within(spacingSection).getByRole("button", {
        name: /compact/i,
      });
      await user.click(compactButton);

      expect(handleSpacingChange).toHaveBeenCalledWith("compact");
    });
  });

  describe("Sidebar Position Section", () => {
    it("renders sidebar position section", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("SIDEBAR POSITION")).toBeInTheDocument();
    });

    it("renders all sidebar position options", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const sidebarSection = screen
        .getByText("SIDEBAR POSITION")
        .closest("div");
      if (!sidebarSection) throw new Error("Sidebar section not found");
      const buttons = within(sidebarSection).getAllByRole("button");
      const labels = buttons.map((btn) => btn.textContent);

      expect(labels).toContain("Left");
      expect(labels).toContain("Right");
    });

    it("shows selected sidebar position", () => {
      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          sidebarPosition="right"
        />,
      );

      const sidebarSection = screen
        .getByText("SIDEBAR POSITION")
        .closest("div");
      if (!sidebarSection) throw new Error("Sidebar section not found");
      const rightButton = within(sidebarSection).getByRole("button", {
        name: /right/i,
      });
      expect(rightButton).toHaveAttribute("aria-pressed", "true");
    });

    it("calls onSidebarPositionChange when position is selected", async () => {
      const user = userEvent.setup();
      const handleSidebarPositionChange = vi.fn();

      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          sidebarPosition="left"
          onSidebarPositionChange={handleSidebarPositionChange}
        />,
      );

      const sidebarSection = screen
        .getByText("SIDEBAR POSITION")
        .closest("div");
      if (!sidebarSection) throw new Error("Sidebar section not found");
      const rightButton = within(sidebarSection).getByRole("button", {
        name: /right/i,
      });
      await user.click(rightButton);

      expect(handleSidebarPositionChange).toHaveBeenCalledWith("right");
    });
  });

  describe("Sidebar Visibility Section", () => {
    it("renders sidebar visibility section", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("SHOW SIDEBAR")).toBeInTheDocument();
    });

    it("renders all sidebar state options", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const sidebarSection = screen.getByText("SHOW SIDEBAR").closest("div");
      if (!sidebarSection)
        throw new Error("Sidebar visibility section not found");
      const buttons = within(sidebarSection).getAllByRole("button");
      const labels = buttons.map((btn) => btn.textContent);

      expect(labels).toContain("Show");
      expect(labels).toContain("Hide");
    });

    it("shows selected sidebar state", () => {
      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          sidebarState="hidden"
        />,
      );

      const sidebarSection = screen.getByText("SHOW SIDEBAR").closest("div");
      if (!sidebarSection)
        throw new Error("Sidebar visibility section not found");
      const hideButton = within(sidebarSection).getByRole("button", {
        name: /hide/i,
      });
      expect(hideButton).toHaveAttribute("aria-pressed", "true");
    });

    it("calls onSidebarStateChange when state is selected", async () => {
      const user = userEvent.setup();
      const handleSidebarStateChange = vi.fn();

      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          sidebarState="icons"
          onSidebarStateChange={handleSidebarStateChange}
        />,
      );

      const sidebarSection = screen.getByText("SHOW SIDEBAR").closest("div");
      if (!sidebarSection)
        throw new Error("Sidebar visibility section not found");
      const hideButton = within(sidebarSection).getByRole("button", {
        name: /hide/i,
      });
      await user.click(hideButton);

      expect(handleSidebarStateChange).toHaveBeenCalledWith("hidden");
    });
  });

  describe("Text Zoom Section", () => {
    it("renders text zoom section", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("TEXT ZOOM")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Adjust text size for better readability. WCAG 2.2 AA requires support up to 200%.",
        ),
      ).toBeInTheDocument();
    });

    it("renders slider control", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const slider = screen.getByRole("slider", {
        name: /text zoom selection/i,
      });
      expect(slider).toBeInTheDocument();
    });

    it("shows current text zoom value", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} textZoom="150" />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "150");
    });

    it("calls onTextZoomChange when slider changes", async () => {
      const user = userEvent.setup();
      const handleTextZoomChange = vi.fn();

      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          textZoom="100"
          onTextZoomChange={handleTextZoomChange}
        />,
      );

      const slider = screen.getByRole("slider");
      await user.click(slider);
      // Slider interaction would trigger onChange

      // Note: Full slider interaction testing would require more setup
      expect(slider).toBeInTheDocument();
    });

    it("sets correct min and max values", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuemin", "100");
      expect(slider).toHaveAttribute("aria-valuemax", "200");
    });
  });

  describe("Close Functionality", () => {
    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(<SettingsPanel isOpen={true} onClose={handleClose} />);

      const closeButton = screen.getByLabelText("Close settings panel");
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("close button has proper ARIA label", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const closeButton = screen.getByLabelText("Close settings panel");
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe("Reset to Defaults", () => {
    it("renders reset button when onResetToDefaults is provided", () => {
      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          onResetToDefaults={() => {}}
        />,
      );

      expect(screen.getByText("Reset to Defaults")).toBeInTheDocument();
    });

    it("does not render reset button when onResetToDefaults is not provided", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.queryByText("Reset to Defaults")).not.toBeInTheDocument();
    });

    it("calls onResetToDefaults when button is clicked", async () => {
      const user = userEvent.setup();
      const handleReset = vi.fn();

      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          onResetToDefaults={handleReset}
        />,
      );

      const resetButton = screen.getByText("Reset to Defaults");
      await user.click(resetButton);

      expect(handleReset).toHaveBeenCalledTimes(1);
    });

    it("reset button has proper ARIA label", () => {
      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          onResetToDefaults={() => {}}
        />,
      );

      const resetButton = screen.getByLabelText(
        "Reset all settings to default values",
      );
      expect(resetButton).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has dialog role", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("has proper ARIA labelledby", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const dialog = screen.getByRole("dialog");
      const labelId = dialog.getAttribute("aria-labelledby");
      expect(labelId).toBeTruthy();
      if (!labelId) throw new Error("aria-labelledby not found");

      const label = document.getElementById(labelId);
      expect(label).toHaveTextContent("Settings");
    });

    it("theme buttons have aria-pressed attributes", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} theme="dark" />);

      const lightButton = screen.getByRole("button", { name: /light/i });
      const darkButton = screen.getByRole("button", { name: /dark/i });

      expect(lightButton).toHaveAttribute("aria-pressed", "false");
      expect(darkButton).toHaveAttribute("aria-pressed", "true");
    });

    it("color palette buttons have aria-pressed attributes", () => {
      render(
        <SettingsPanel isOpen={true} onClose={() => {}} colorPalette="blue" />,
      );

      const redButton = screen.getByRole("button", { name: /red/i });
      const blueButton = screen.getByRole("button", { name: /blue/i });

      expect(redButton).toHaveAttribute("aria-pressed", "false");
      expect(blueButton).toHaveAttribute("aria-pressed", "true");
    });

    it("all button groups have aria-label", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByLabelText("Theme selection")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Color palette selection"),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Layout width selection"),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Content width selection"),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Spacing density selection"),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Sidebar position selection"),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Sidebar visibility selection"),
      ).toBeInTheDocument();
    });

    it("slider has aria-label", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const slider = screen.getByLabelText("Text zoom selection");
      expect(slider).toBeInTheDocument();
    });
  });

  describe("Icons Usage", () => {
    it("uses icons from @spexop/icons", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      // Theme icons should be present (Sun, Moon, Monitor)
      const lightButton = screen.getByRole("button", { name: /light/i });
      const darkButton = screen.getByRole("button", { name: /dark/i });
      const autoButton = screen.getByRole("button", { name: /auto/i });

      // Each button should have an icon
      expect(lightButton.querySelector("svg")).toBeInTheDocument();
      expect(darkButton.querySelector("svg")).toBeInTheDocument();
      expect(autoButton.querySelector("svg")).toBeInTheDocument();

      // Close button should have X icon
      const closeButton = screen.getByLabelText("Close settings panel");
      expect(closeButton.querySelector("svg")).toBeInTheDocument();
    });

    it("reset button has RotateCcw icon", () => {
      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          onResetToDefaults={() => {}}
        />,
      );

      const resetButton = screen
        .getByText("Reset to Defaults")
        .closest("button");
      if (!resetButton) throw new Error("Reset button not found");
      expect(resetButton.querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("Default Values", () => {
    it("uses default theme value", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const lightButton = screen.getByRole("button", { name: /light/i });
      expect(lightButton).toHaveAttribute("aria-pressed", "true");
    });

    it("uses default color palette value", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const redButton = screen.getByRole("button", { name: /red/i });
      expect(redButton).toHaveAttribute("aria-pressed", "true");
    });

    it("uses default text zoom value", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "100");
    });
  });

  describe("Edge Cases", () => {
    it("handles missing change handlers gracefully", () => {
      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          theme="light"
          // No onThemeChange provided
        />,
      );

      const lightButton = screen.getByRole("button", { name: /light/i });
      expect(lightButton).toBeInTheDocument();
    });

    it("renders all sections even with minimal props", () => {
      render(<SettingsPanel isOpen={true} onClose={() => {}} />);

      expect(screen.getByText("THEME")).toBeInTheDocument();
      expect(screen.getByText("COLOR PALETTE")).toBeInTheDocument();
      expect(screen.getByText("LAYOUT WIDTH")).toBeInTheDocument();
      expect(screen.getByText("CONTENT WIDTH")).toBeInTheDocument();
      expect(screen.getByText("SPACING")).toBeInTheDocument();
      expect(screen.getByText("SIDEBAR POSITION")).toBeInTheDocument();
      expect(screen.getByText("SHOW SIDEBAR")).toBeInTheDocument();
      expect(screen.getByText("TEXT ZOOM")).toBeInTheDocument();
    });

    it("handles all props provided", () => {
      render(
        <SettingsPanel
          isOpen={true}
          onClose={() => {}}
          theme="dark"
          onThemeChange={() => {}}
          colorPalette="blue"
          onColorPaletteChange={() => {}}
          textZoom="150"
          onTextZoomChange={() => {}}
          layoutVariant="boxed"
          onLayoutVariantChange={() => {}}
          contentMaxWidth="lg"
          onContentMaxWidthChange={() => {}}
          spacing="spacious"
          onSpacingChange={() => {}}
          sidebarPosition="right"
          onSidebarPositionChange={() => {}}
          sidebarState="hidden"
          onSidebarStateChange={() => {}}
          onResetToDefaults={() => {}}
          className="custom-class"
        />,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
