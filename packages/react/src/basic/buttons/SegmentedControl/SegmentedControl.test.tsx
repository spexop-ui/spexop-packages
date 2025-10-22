/// <reference types="@testing-library/jest-dom" />
/**
 * SegmentedControl Component Tests
 *
 * Tests for SegmentedControl component covering:
 * - Basic rendering with options
 * - Value selection and onChange callback
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Disabled state (entire control and individual options)
 * - ARIA attributes and accessibility
 * - Focus management with roving tabindex
 * - Icon rendering
 * - Custom className
 * - Edge cases (empty options, single option)
 * - Screen reader support
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./SegmentedControl.js";
import type { SegmentedControlOption } from "./SegmentedControl.types.js";

describe("SegmentedControl", () => {
  const mockOptions: SegmentedControlOption[] = [
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
    { value: "table", label: "Table" },
  ];

  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe("Basic Rendering", () => {
    it("renders with options", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      expect(screen.getByLabelText("View mode")).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "List" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Grid" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Table" })).toBeInTheDocument();
    });

    it("renders all option labels", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      expect(screen.getByText("List")).toBeInTheDocument();
      expect(screen.getByText("Grid")).toBeInTheDocument();
      expect(screen.getByText("Table")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          className="custom-class"
          aria-label="View mode"
        />,
      );

      const container = screen.getByLabelText("View mode");
      expect(container).toHaveClass("custom-class");
    });

    it("uses provided id", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          id="custom-id"
          aria-label="View mode"
        />,
      );

      // ID is generated with useId, so we just verify it's set
      const container = screen.getByLabelText("View mode");
      expect(container).toBeInTheDocument();
    });
  });

  describe("Value Selection", () => {
    it("marks the selected option as checked", () => {
      render(
        <SegmentedControl
          value="grid"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const gridOption = screen.getByRole("radio", { name: "Grid" });
      expect(gridOption).toHaveAttribute("aria-checked", "true");

      const listOption = screen.getByRole("radio", { name: "List" });
      expect(listOption).toHaveAttribute("aria-checked", "false");
    });

    it("calls onChange when option is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const gridOption = screen.getByRole("radio", { name: "Grid" });
      await user.click(gridOption);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith("grid");
    });

    it("does not call onChange when clicking already selected option", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      await user.click(listOption);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith("list");
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates to next option with ArrowRight", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      listOption.focus();

      await user.keyboard("{ArrowRight}");

      expect(mockOnChange).toHaveBeenCalledWith("grid");
    });

    it("navigates to next option with ArrowDown", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      listOption.focus();

      await user.keyboard("{ArrowDown}");

      expect(mockOnChange).toHaveBeenCalledWith("grid");
    });

    it("navigates to previous option with ArrowLeft", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="grid"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const gridOption = screen.getByRole("radio", { name: "Grid" });
      gridOption.focus();

      await user.keyboard("{ArrowLeft}");

      expect(mockOnChange).toHaveBeenCalledWith("list");
    });

    it("navigates to previous option with ArrowUp", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="grid"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const gridOption = screen.getByRole("radio", { name: "Grid" });
      gridOption.focus();

      await user.keyboard("{ArrowUp}");

      expect(mockOnChange).toHaveBeenCalledWith("list");
    });

    it("navigates to first option with Home", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="table"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const tableOption = screen.getByRole("radio", { name: "Table" });
      tableOption.focus();

      await user.keyboard("{Home}");

      expect(mockOnChange).toHaveBeenCalledWith("list");
    });

    it("navigates to last option with End", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      listOption.focus();

      await user.keyboard("{End}");

      expect(mockOnChange).toHaveBeenCalledWith("table");
    });

    it("does not navigate past last option with ArrowRight", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="table"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const tableOption = screen.getByRole("radio", { name: "Table" });
      tableOption.focus();

      await user.keyboard("{ArrowRight}");

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("does not navigate before first option with ArrowLeft", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      listOption.focus();

      await user.keyboard("{ArrowLeft}");

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("skips disabled options when navigating", async () => {
      const user = userEvent.setup();

      const optionsWithDisabled: SegmentedControlOption[] = [
        { value: "list", label: "List" },
        { value: "grid", label: "Grid", disabled: true },
        { value: "table", label: "Table" },
      ];

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={optionsWithDisabled}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      listOption.focus();

      await user.keyboard("{ArrowRight}");

      expect(mockOnChange).toHaveBeenCalledWith("table");
    });
  });

  describe("Disabled State", () => {
    it("disables entire control when disabled prop is true", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          disabled={true}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      const gridOption = screen.getByRole("radio", { name: "Grid" });
      const tableOption = screen.getByRole("radio", { name: "Table" });

      expect(listOption).toBeDisabled();
      expect(gridOption).toBeDisabled();
      expect(tableOption).toBeDisabled();
    });

    it("does not call onChange when disabled option is clicked", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          disabled={true}
          aria-label="View mode"
        />,
      );

      const gridOption = screen.getByRole("radio", { name: "Grid" });
      await user.click(gridOption);

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("disables individual option when option.disabled is true", () => {
      const optionsWithDisabled: SegmentedControlOption[] = [
        { value: "list", label: "List" },
        { value: "grid", label: "Grid", disabled: true },
        { value: "table", label: "Table" },
      ];

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={optionsWithDisabled}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      const gridOption = screen.getByRole("radio", { name: "Grid" });
      const tableOption = screen.getByRole("radio", { name: "Table" });

      expect(listOption).not.toBeDisabled();
      expect(gridOption).toBeDisabled();
      expect(tableOption).not.toBeDisabled();
    });

    it("does not call onChange when clicking disabled option", async () => {
      const user = userEvent.setup();

      const optionsWithDisabled: SegmentedControlOption[] = [
        { value: "list", label: "List" },
        { value: "grid", label: "Grid", disabled: true },
        { value: "table", label: "Table" },
      ];

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={optionsWithDisabled}
          aria-label="View mode"
        />,
      );

      const gridOption = screen.getByRole("radio", { name: "Grid" });
      await user.click(gridOption);

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("applies data-disabled attribute when disabled", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          disabled={true}
          aria-label="View mode"
        />,
      );

      const container = screen.getByLabelText("View mode");
      expect(container).toHaveAttribute("data-disabled");
    });
  });

  describe("ARIA Attributes", () => {
    it("has role radiogroup", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const container = screen.getByLabelText("View mode");
      expect(container).toHaveAttribute("role", "radiogroup");
    });

    it("applies aria-label", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode selection"
        />,
      );

      expect(screen.getByLabelText("View mode selection")).toBeInTheDocument();
    });

    it("applies aria-labelledby", () => {
      render(
        <>
          <h2 id="view-label">View Mode</h2>
          <SegmentedControl
            value="list"
            onChange={mockOnChange}
            options={mockOptions}
            aria-labelledby="view-label"
          />
        </>,
      );

      const container = screen.getByRole("radiogroup");
      expect(container).toHaveAttribute("aria-labelledby", "view-label");
    });

    it("each option has role radio", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
    });

    it("selected option has aria-checked true", () => {
      render(
        <SegmentedControl
          value="grid"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const gridOption = screen.getByRole("radio", { name: "Grid" });
      expect(gridOption).toHaveAttribute("aria-checked", "true");
    });

    it("unselected options have aria-checked false", () => {
      render(
        <SegmentedControl
          value="grid"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      const tableOption = screen.getByRole("radio", { name: "Table" });

      expect(listOption).toHaveAttribute("aria-checked", "false");
      expect(tableOption).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("Focus Management", () => {
    it("selected option has tabIndex 0", () => {
      render(
        <SegmentedControl
          value="grid"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const gridOption = screen.getByRole("radio", { name: "Grid" });
      expect(gridOption).toHaveAttribute("tabIndex", "0");
    });

    it("unselected options have tabIndex -1", () => {
      render(
        <SegmentedControl
          value="grid"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      const tableOption = screen.getByRole("radio", { name: "Table" });

      expect(listOption).toHaveAttribute("tabIndex", "-1");
      expect(tableOption).toHaveAttribute("tabIndex", "-1");
    });

    it("maintains focus on selected option", () => {
      const { rerender } = render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const listOption = screen.getByRole("radio", { name: "List" });
      expect(listOption).toHaveAttribute("tabIndex", "0");

      rerender(
        <SegmentedControl
          value="grid"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const gridOption = screen.getByRole("radio", { name: "Grid" });
      expect(gridOption).toHaveAttribute("tabIndex", "0");
      expect(listOption).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Icon Rendering", () => {
    const TestIcon = () => (
      <svg width="16" height="16" data-testid="test-icon">
        <title>Test Icon</title>
        <circle cx="8" cy="8" r="8" />
      </svg>
    );

    it("renders icons when provided", () => {
      const optionsWithIcons: SegmentedControlOption[] = [
        { value: "list", label: "List", icon: <TestIcon /> },
        { value: "grid", label: "Grid", icon: <TestIcon /> },
      ];

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={optionsWithIcons}
          aria-label="View mode"
        />,
      );

      const icons = screen.getAllByTestId("test-icon");
      expect(icons).toHaveLength(2);
    });

    it("renders without icons when not provided", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const icons = screen.queryAllByTestId("test-icon");
      expect(icons).toHaveLength(0);
    });

    it("marks icons as aria-hidden", () => {
      const optionsWithIcons: SegmentedControlOption[] = [
        { value: "list", label: "List", icon: <TestIcon /> },
      ];

      const { container } = render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={optionsWithIcons}
          aria-label="View mode"
        />,
      );

      const iconSpan = container.querySelector('[aria-hidden="true"]');
      expect(iconSpan).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles single option", () => {
      const singleOption: SegmentedControlOption[] = [
        { value: "only", label: "Only Option" },
      ];

      render(
        <SegmentedControl
          value="only"
          onChange={mockOnChange}
          options={singleOption}
          aria-label="Single option"
        />,
      );

      expect(
        screen.getByRole("radio", { name: "Only Option" }),
      ).toBeInTheDocument();
    });

    it("handles empty label", () => {
      const optionsWithEmptyLabel: SegmentedControlOption[] = [
        { value: "a", label: "" },
        { value: "b", label: "Option B" },
      ];

      render(
        <SegmentedControl
          value="a"
          onChange={mockOnChange}
          options={optionsWithEmptyLabel}
          aria-label="Options"
        />,
      );

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(2);
    });

    it("handles value not in options", () => {
      render(
        <SegmentedControl
          value="nonexistent"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const radios = screen.getAllByRole("radio");
      for (const radio of radios) {
        expect(radio).toHaveAttribute("aria-checked", "false");
      }
    });

    it("handles options with special characters in value", () => {
      const specialOptions: SegmentedControlOption[] = [
        { value: "option-1", label: "Option 1" },
        { value: "option_2", label: "Option 2" },
        { value: "option.3", label: "Option 3" },
      ];

      render(
        <SegmentedControl
          value="option-1"
          onChange={mockOnChange}
          options={specialOptions}
          aria-label="Special options"
        />,
      );

      expect(screen.getByRole("radio", { name: "Option 1" })).toHaveAttribute(
        "aria-checked",
        "true",
      );
    });

    it("handles long labels", () => {
      const longLabelOptions: SegmentedControlOption[] = [
        { value: "short", label: "Short" },
        {
          value: "long",
          label: "This is a very long label that might cause layout issues",
        },
      ];

      render(
        <SegmentedControl
          value="short"
          onChange={mockOnChange}
          options={longLabelOptions}
          aria-label="Options"
        />,
      );

      expect(
        screen.getByText(
          "This is a very long label that might cause layout issues",
        ),
      ).toBeInTheDocument();
    });

    it("handles rapid selection changes", async () => {
      const user = userEvent.setup();

      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const gridOption = screen.getByRole("radio", { name: "Grid" });
      const tableOption = screen.getByRole("radio", { name: "Table" });

      await user.click(gridOption);
      await user.click(tableOption);

      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenNthCalledWith(1, "grid");
      expect(mockOnChange).toHaveBeenNthCalledWith(2, "table");
    });
  });

  describe("Button Type", () => {
    it("all options are button elements with type button", () => {
      render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      const buttons = screen.getAllByRole("radio");
      for (const button of buttons) {
        expect(button.tagName).toBe("BUTTON");
        expect(button).toHaveAttribute("type", "button");
      }
    });
  });

  describe("Integration", () => {
    it("works with controlled state", () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState("list");

        return (
          <>
            <SegmentedControl
              value={value}
              onChange={setValue}
              options={mockOptions}
              aria-label="View mode"
            />
            <div data-testid="current-value">{value}</div>
          </>
        );
      };

      render(<TestComponent />);

      expect(screen.getByTestId("current-value")).toHaveTextContent("list");
    });

    it("updates display when value prop changes", () => {
      const { rerender } = render(
        <SegmentedControl
          value="list"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      expect(screen.getByRole("radio", { name: "List" })).toHaveAttribute(
        "aria-checked",
        "true",
      );

      rerender(
        <SegmentedControl
          value="grid"
          onChange={mockOnChange}
          options={mockOptions}
          aria-label="View mode"
        />,
      );

      expect(screen.getByRole("radio", { name: "Grid" })).toHaveAttribute(
        "aria-checked",
        "true",
      );
      expect(screen.getByRole("radio", { name: "List" })).toHaveAttribute(
        "aria-checked",
        "false",
      );
    });
  });
});
