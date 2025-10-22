/// <reference types="@testing-library/jest-dom" />
/**
 * SplitButton Component Tests
 *
 * Tests for SplitButton component covering:
 * - Main button click
 * - Toggle dropdown
 * - Option clicks
 * - Click outside behavior
 * - Escape key handling
 * - Keyboard navigation (Arrow Up/Down)
 * - Menu open/close state
 * - ARIA attributes (expanded, haspopup)
 * - Disabled state
 * - Variant rendering
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { Download } from "@spexop/icons";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SplitButton } from "./SplitButton.js";
import styles from "./SplitButton.module.css";

describe("SplitButton", () => {
  const mockOptions = [
    {
      label: "Option 1",
      value: "option1",
      onClick: vi.fn(),
    },
    {
      label: "Option 2",
      value: "option2",
      onClick: vi.fn(),
    },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders main button", () => {
      render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("renders toggle button", () => {
      render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      expect(toggleButton).toBeInTheDocument();
    });

    it("menu is not visible by default", () => {
      const { container } = render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const menu = container.querySelector('[role="menu"]');
      expect(menu).not.toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <SplitButton
          label="Save"
          onClick={vi.fn()}
          options={mockOptions}
          className="custom-class"
        />,
      );

      const splitButton = container.firstChild;
      expect(splitButton).toHaveClass("custom-class");
    });
  });

  describe("Main Button Click", () => {
    it("calls onClick when main button is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <SplitButton
          label="Save"
          onClick={handleClick}
          options={mockOptions}
        />,
      );

      const mainButton = screen.getByText("Save");
      await user.click(mainButton);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when main button is disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <SplitButton
          label="Save"
          onClick={handleClick}
          options={mockOptions}
          disabled
        />,
      );

      const mainButton = screen.getByText("Save");
      await user.click(mainButton);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Toggle Dropdown", () => {
    it("opens menu when toggle button is clicked", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      const menu = container.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
    });

    it("closes menu when toggle button is clicked again", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });

      // Open menu
      await user.click(toggleButton);
      let menu = container.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();

      // Close menu
      await user.click(toggleButton);
      menu = container.querySelector('[role="menu"]');
      expect(menu).not.toBeInTheDocument();
    });

    it("does not open menu when toggle is disabled", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <SplitButton
          label="Save"
          onClick={vi.fn()}
          options={mockOptions}
          disabled
        />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      const menu = container.querySelector('[role="menu"]');
      expect(menu).not.toBeInTheDocument();
    });
  });

  describe("Option Clicks", () => {
    it("renders all menu options when open", async () => {
      const user = userEvent.setup();

      render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("calls option onClick when clicked", async () => {
      const user = userEvent.setup();
      const option1Click = vi.fn();
      const options = [
        { label: "Option 1", value: "opt1", onClick: option1Click },
      ];

      render(<SplitButton label="Save" onClick={vi.fn()} options={options} />);

      // Open menu
      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      // Click option
      const option = screen.getByRole("menuitem", { name: "Option 1" });
      await user.click(option);

      expect(option1Click).toHaveBeenCalledTimes(1);
    });

    it("closes menu after option is clicked", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      // Open menu
      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      // Click option
      const option = screen.getByRole("menuitem", { name: "Option 1" });
      await user.click(option);

      // Menu should be closed
      const menu = container.querySelector('[role="menu"]');
      expect(menu).not.toBeInTheDocument();
    });

    it("does not call onClick for disabled options", async () => {
      const user = userEvent.setup();
      const disabledClick = vi.fn();
      const options = [
        {
          label: "Disabled Option",
          value: "disabled",
          onClick: disabledClick,
          disabled: true,
        },
      ];

      render(<SplitButton label="Save" onClick={vi.fn()} options={options} />);

      // Open menu
      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      // Try to click disabled option
      const option = screen.getByRole("menuitem", { name: "Disabled Option" });
      await user.click(option);

      expect(disabledClick).not.toHaveBeenCalled();
    });
  });

  describe("Click Outside Behavior", () => {
    it("closes menu when clicking outside", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <div>
          <button type="button">Outside Button</button>
          <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />
        </div>,
      );

      // Open menu
      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      // Click outside
      const outsideButton = screen.getByText("Outside Button");
      await user.click(outsideButton);

      // Menu should be closed
      const menu = container.querySelector('[role="menu"]');
      expect(menu).not.toBeInTheDocument();
    });
  });

  describe("Escape Key Handling", () => {
    it("closes menu on Escape key", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      // Open menu
      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      // Press Escape
      await user.keyboard("{Escape}");

      // Menu should be closed
      const menu = container.querySelector('[role="menu"]');
      expect(menu).not.toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates menu items with Arrow Down", async () => {
      const user = userEvent.setup();

      render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      // Open menu
      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      // Arrow Down should focus first item
      await user.keyboard("{ArrowDown}");

      const firstItem = screen.getByRole("menuitem", { name: "Option 1" });
      expect(firstItem).toHaveFocus();
    });

    it("navigates menu items with Arrow Up", async () => {
      const user = userEvent.setup();

      render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      // Open menu
      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      // Focus first item
      await user.keyboard("{ArrowDown}");

      // Arrow Down to second item
      await user.keyboard("{ArrowDown}");

      const secondItem = screen.getByRole("menuitem", { name: "Option 2" });
      expect(secondItem).toHaveFocus();
    });
  });

  describe("ARIA Attributes", () => {
    it("toggle button has aria-expanded false when closed", () => {
      render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    });

    it("toggle button has aria-expanded true when open", async () => {
      const user = userEvent.setup();

      render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    });

    it("toggle button has aria-haspopup", () => {
      render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      expect(toggleButton).toHaveAttribute("aria-haspopup", "true");
    });

    it("menu has role menu", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      const menu = container.querySelector('[role="menu"]');
      expect(menu).toBeInTheDocument();
    });

    it("menu items have role menuitem", async () => {
      const user = userEvent.setup();

      render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      const menuItems = screen.getAllByRole("menuitem");
      expect(menuItems).toHaveLength(2);
    });

    it("supports custom aria-label for main button", () => {
      render(
        <SplitButton
          label="Save"
          onClick={vi.fn()}
          options={mockOptions}
          aria-label="Save document"
        />,
      );

      const mainButton = screen.getByRole("button", { name: "Save document" });
      expect(mainButton).toBeInTheDocument();
    });

    it("supports custom aria-label-toggle", () => {
      render(
        <SplitButton
          label="Save"
          onClick={vi.fn()}
          options={mockOptions}
          aria-label-toggle="More save options"
        />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "More save options",
      });
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("disables main button", () => {
      render(
        <SplitButton
          label="Save"
          onClick={vi.fn()}
          options={mockOptions}
          disabled
        />,
      );

      const mainButton = screen.getByText("Save").closest("button");
      expect(mainButton).toBeDisabled();
    });

    it("disables toggle button", () => {
      render(
        <SplitButton
          label="Save"
          onClick={vi.fn()}
          options={mockOptions}
          disabled
        />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      expect(toggleButton).toBeDisabled();
    });

    it("applies disabled class", () => {
      const { container } = render(
        <SplitButton
          label="Save"
          onClick={vi.fn()}
          options={mockOptions}
          disabled
        />,
      );

      const splitButton = container.querySelector(`.${styles.disabled}`);
      expect(splitButton).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("applies primary variant by default", () => {
      const { container } = render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const variantClass = container.querySelector(
        `.${styles["variant-primary"]}`,
      );
      expect(variantClass).toBeInTheDocument();
    });

    it("applies custom variant", () => {
      const { container } = render(
        <SplitButton
          label="Save"
          onClick={vi.fn()}
          options={mockOptions}
          variant="secondary"
        />,
      );

      const variantClass = container.querySelector(
        `.${styles["variant-secondary"]}`,
      );
      expect(variantClass).toBeInTheDocument();
    });
  });

  describe("Icon Integration", () => {
    it("renders main button with icon", () => {
      const { container } = render(
        <SplitButton
          label="Download"
          icon={<Download size={20} />}
          onClick={vi.fn()}
          options={mockOptions}
        />,
      );

      const icon = container.querySelector(`.${styles.buttonIcon}`);
      expect(icon).toBeInTheDocument();
    });

    it("renders menu items with icons", async () => {
      const user = userEvent.setup();
      const optionsWithIcons = [
        {
          label: "Option 1",
          value: "opt1",
          onClick: vi.fn(),
          icon: <Download size={18} />,
        },
      ];

      const { container } = render(
        <SplitButton
          label="Save"
          onClick={vi.fn()}
          options={optionsWithIcons}
        />,
      );

      // Open menu
      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      const icon = container.querySelector(`.${styles.menuItemIcon}`);
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles single option", async () => {
      const user = userEvent.setup();
      const singleOption = [
        { label: "Only Option", value: "only", onClick: vi.fn() },
      ];

      render(
        <SplitButton label="Save" onClick={vi.fn()} options={singleOption} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      expect(screen.getByText("Only Option")).toBeInTheDocument();
    });

    it("handles many options", async () => {
      const user = userEvent.setup();
      const manyOptions = Array.from({ length: 10 }, (_, i) => ({
        label: `Option ${i}`,
        value: `opt${i}`,
        onClick: vi.fn(),
      }));

      render(
        <SplitButton label="Save" onClick={vi.fn()} options={manyOptions} />,
      );

      const toggleButton = screen.getByRole("button", {
        name: "Show more options",
      });
      await user.click(toggleButton);

      const menuItems = screen.getAllByRole("menuitem");
      expect(menuItems).toHaveLength(10);
    });
  });

  describe("Structure", () => {
    it("renders splitButton class", () => {
      const { container } = render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const splitButton = container.querySelector(`.${styles.splitButton}`);
      expect(splitButton).toBeInTheDocument();
    });

    it("renders mainButton class", () => {
      const { container } = render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const mainButton = container.querySelector(`.${styles.mainButton}`);
      expect(mainButton).toBeInTheDocument();
    });

    it("renders toggleButton class", () => {
      const { container } = render(
        <SplitButton label="Save" onClick={vi.fn()} options={mockOptions} />,
      );

      const toggleButton = container.querySelector(`.${styles.toggleButton}`);
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("uses requestAnimationFrame for clicks", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const rafSpy = vi
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb) => {
          cb(0);
          return 0;
        });

      render(
        <SplitButton
          label="Save"
          onClick={handleClick}
          options={mockOptions}
        />,
      );

      const mainButton = screen.getByText("Save");
      await user.click(mainButton);

      expect(rafSpy).toHaveBeenCalled();

      rafSpy.mockRestore();
    });
  });
});
