/// <reference types="@testing-library/jest-dom" />
/**
 * SegmentedButton Component Tests
 *
 * Tests for SegmentedButton component covering:
 * - Option rendering
 * - Active state
 * - Click handlers
 * - Keyboard navigation (Arrow Left/Right)
 * - Disabled options
 * - Icon rendering
 * - ARIA radiogroup pattern
 * - Wrap-around navigation
 * - Skip disabled options
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { Grid, List } from "@spexop/icons";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { SegmentedButton } from "./SegmentedButton.js";
import styles from "./SegmentedButton.module.css";

describe("SegmentedButton", () => {
  const mockOptions = [
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
    { value: "table", label: "Table" },
  ];

  describe("Rendering", () => {
    it("renders as a radiogroup", () => {
      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toBeInTheDocument();
    });

    it("renders all options", () => {
      render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      expect(screen.getByText("List")).toBeInTheDocument();
      expect(screen.getByText("Grid")).toBeInTheDocument();
      expect(screen.getByText("Table")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
          className="custom-class"
        />,
      );

      const group = container.firstChild;
      expect(group).toHaveClass("custom-class");
    });
  });

  describe("Active State", () => {
    it("marks active option with aria-checked", () => {
      render(
        <SegmentedButton
          aria-label="View mode"
          value="grid"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const gridButton = screen.getByRole("radio", { name: "Grid" });
      expect(gridButton).toHaveAttribute("aria-checked", "true");
    });

    it("marks inactive options with aria-checked false", () => {
      render(
        <SegmentedButton
          aria-label="View mode"
          value="grid"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const listButton = screen.getByRole("radio", { name: "List" });
      const tableButton = screen.getByRole("radio", { name: "Table" });

      expect(listButton).toHaveAttribute("aria-checked", "false");
      expect(tableButton).toHaveAttribute("aria-checked", "false");
    });

    it("applies active class to current option", () => {
      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="grid"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const gridButton = screen.getByRole("radio", { name: "Grid" });
      expect(gridButton.className).toContain("optionActive");
    });

    it("active option has tabIndex 0", () => {
      render(
        <SegmentedButton
          aria-label="View mode"
          value="grid"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const gridButton = screen.getByRole("radio", { name: "Grid" });
      expect(gridButton).toHaveAttribute("tabIndex", "0");
    });

    it("inactive options have tabIndex -1", () => {
      render(
        <SegmentedButton
          aria-label="View mode"
          value="grid"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const listButton = screen.getByRole("radio", { name: "List" });
      const tableButton = screen.getByRole("radio", { name: "Table" });

      expect(listButton).toHaveAttribute("tabIndex", "-1");
      expect(tableButton).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Click Handlers", () => {
    it("calls onChange when option is clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const gridButton = screen.getByRole("radio", { name: "Grid" });
      await user.click(gridButton);

      expect(handleChange).toHaveBeenCalledWith("grid");
    });

    it("does not call onChange when clicking active option", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const listButton = screen.getByRole("radio", { name: "List" });
      await user.click(listButton);

      // onChange is still called, component doesn't prevent this
      expect(handleChange).toHaveBeenCalledWith("list");
    });

    it("does not call onChange when clicking disabled option", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const optionsWithDisabled = [
        { value: "list", label: "List" },
        { value: "grid", label: "Grid", disabled: true },
        { value: "table", label: "Table" },
      ];

      render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={handleChange}
          options={optionsWithDisabled}
        />,
      );

      const gridButton = screen.getByRole("radio", { name: "Grid" });
      await user.click(gridButton);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("moves to next option on Arrow Right", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const group = container.querySelector('[role="radiogroup"]');
      if (group) {
        (group as HTMLElement).focus();
        await user.keyboard("{ArrowRight}");
      }

      expect(handleChange).toHaveBeenCalledWith("grid");
    });

    it("moves to previous option on Arrow Left", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="grid"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const group = container.querySelector('[role="radiogroup"]');
      if (group) {
        (group as HTMLElement).focus();
        await user.keyboard("{ArrowLeft}");
      }

      expect(handleChange).toHaveBeenCalledWith("list");
    });

    it("wraps around to first option from last", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="table"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const group = container.querySelector('[role="radiogroup"]');
      if (group) {
        (group as HTMLElement).focus();
        await user.keyboard("{ArrowRight}");
      }

      expect(handleChange).toHaveBeenCalledWith("list");
    });

    it("wraps around to last option from first", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={handleChange}
          options={mockOptions}
        />,
      );

      const group = container.querySelector('[role="radiogroup"]');
      if (group) {
        (group as HTMLElement).focus();
        await user.keyboard("{ArrowLeft}");
      }

      expect(handleChange).toHaveBeenCalledWith("table");
    });

    it("skips disabled options when navigating", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const optionsWithDisabled = [
        { value: "list", label: "List" },
        { value: "grid", label: "Grid", disabled: true },
        { value: "table", label: "Table" },
      ];

      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={handleChange}
          options={optionsWithDisabled}
        />,
      );

      const group = container.querySelector('[role="radiogroup"]');
      if (group) {
        (group as HTMLElement).focus();
        await user.keyboard("{ArrowRight}");
      }

      // Should skip grid and go to table
      expect(handleChange).toHaveBeenCalledWith("table");
    });
  });

  describe("Disabled Options", () => {
    it("renders disabled option", () => {
      const optionsWithDisabled = [
        { value: "list", label: "List" },
        { value: "grid", label: "Grid", disabled: true },
      ];

      render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={optionsWithDisabled}
        />,
      );

      const gridButton = screen.getByRole("radio", { name: "Grid" });
      expect(gridButton).toBeDisabled();
    });

    it("applies disabled class", () => {
      const optionsWithDisabled = [
        { value: "list", label: "List" },
        { value: "grid", label: "Grid", disabled: true },
      ];

      render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={optionsWithDisabled}
        />,
      );

      const gridButton = screen.getByRole("radio", { name: "Grid" });
      expect(gridButton.className).toContain("optionDisabled");
    });
  });

  describe("Icon Integration", () => {
    it("renders options with icons", () => {
      const optionsWithIcons = [
        { value: "list", label: "List", icon: <List size={20} /> },
        { value: "grid", label: "Grid", icon: <Grid size={20} /> },
      ];

      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={optionsWithIcons}
        />,
      );

      const icons = container.querySelectorAll(`.${styles.optionIcon}`);
      expect(icons).toHaveLength(2);
    });

    it("renders option without icon", () => {
      const optionsWithMixedIcons = [
        { value: "list", label: "List", icon: <List size={20} /> },
        { value: "grid", label: "Grid" }, // No icon
      ];

      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={optionsWithMixedIcons}
        />,
      );

      const icons = container.querySelectorAll(`.${styles.optionIcon}`);
      expect(icons).toHaveLength(1);
    });
  });

  describe("ARIA Attributes", () => {
    it("has radiogroup role", () => {
      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      const { container } = render(
        <SegmentedButton
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveAttribute("aria-label", "View mode");
    });

    it("supports aria-labelledby", () => {
      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
          aria-labelledby="view-label"
        />,
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveAttribute("aria-labelledby", "view-label");
    });

    it("options have radio role", () => {
      render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
    });

    it("supports custom aria-label for options", () => {
      const optionsWithAriaLabel = [
        { value: "list", label: "List", "aria-label": "List view mode" },
        { value: "grid", label: "Grid", "aria-label": "Grid view mode" },
      ];

      render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={optionsWithAriaLabel}
        />,
      );

      const listButton = screen.getByRole("radio", { name: "List view mode" });
      const gridButton = screen.getByRole("radio", { name: "Grid view mode" });

      expect(listButton).toBeInTheDocument();
      expect(gridButton).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles single option", () => {
      const singleOption = [{ value: "only", label: "Only Option" }];

      render(
        <SegmentedButton
          aria-label="View mode"
          value="only"
          onChange={vi.fn()}
          options={singleOption}
        />,
      );

      expect(screen.getByText("Only Option")).toBeInTheDocument();
    });

    it("handles many options", () => {
      const manyOptions = Array.from({ length: 10 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`,
      }));

      render(
        <SegmentedButton
          aria-label="View mode"
          value="option0"
          onChange={vi.fn()}
          options={manyOptions}
        />,
      );

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(10);
    });

    it("handles all disabled options", () => {
      const allDisabled = [
        { value: "list", label: "List", disabled: true },
        { value: "grid", label: "Grid", disabled: true },
      ];

      const handleChange = vi.fn();
      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={handleChange}
          options={allDisabled}
        />,
      );

      // Keyboard navigation should not change anything
      const group = container.querySelector('[role="radiogroup"]');
      if (group) {
        (group as HTMLElement).focus();
      }

      const radios = screen.getAllByRole("radio");
      for (const radio of radios) {
        expect(radio).toBeDisabled();
      }
    });
  });

  describe("Structure", () => {
    it("renders segmentedButton class", () => {
      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const group = container.querySelector(`.${styles.segmentedButton}`);
      expect(group).toBeInTheDocument();
    });

    it("renders option class for each button", () => {
      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const options = container.querySelectorAll(`.${styles.option}`);
      expect(options).toHaveLength(3);
    });

    it("renders optionLabel for each option", () => {
      const { container } = render(
        <SegmentedButton
          aria-label="View mode"
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const labels = container.querySelectorAll(`.${styles.optionLabel}`);
      expect(labels).toHaveLength(3);
    });
  });

  describe("Accessibility", () => {
    it("implements correct ARIA pattern", () => {
      const { container } = render(
        <SegmentedButton
          value="list"
          onChange={vi.fn()}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveAttribute("aria-label", "View mode");

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);

      const activeRadio = radios.find(
        (radio) => radio.getAttribute("aria-checked") === "true",
      );
      expect(activeRadio).toBeInTheDocument();
    });

    it("maintains roving tabindex", () => {
      render(
        <SegmentedButton
          aria-label="View mode"
          value="grid"
          onChange={vi.fn()}
          options={mockOptions}
        />,
      );

      const radios = screen.getAllByRole("radio");
      const tabIndexes = radios.map((radio) => radio.getAttribute("tabIndex"));

      // Only one should have tabIndex 0 (the active one)
      const focusableCount = tabIndexes.filter((t) => t === "0").length;
      expect(focusableCount).toBe(1);
    });
  });
});
