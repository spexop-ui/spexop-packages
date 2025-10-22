/// <reference types="@testing-library/jest-dom" />
/**
 * SettingItem Component Tests
 *
 * Tests for SettingItem component covering:
 * - Label and description rendering
 * - Label-control association
 * - Disabled state handling
 * - Custom ID support
 * - Auto-generated ID fallback
 * - Custom className application
 * - Accessibility attributes
 * - Integration with form controls
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { SettingItem } from "./SettingItem.js";

describe("SettingItem", () => {
  describe("Rendering", () => {
    it("renders label text", () => {
      render(
        <SettingItem label="Test Setting">
          <input type="checkbox" />
        </SettingItem>,
      );

      expect(screen.getByText("Test Setting")).toBeInTheDocument();
    });

    it("renders description when provided", () => {
      render(
        <SettingItem label="Setting" description="This is a description">
          <input type="checkbox" />
        </SettingItem>,
      );

      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
      const { container } = render(
        <SettingItem label="Setting">
          <input type="checkbox" />
        </SettingItem>,
      );

      const description = container.querySelector("p");
      expect(description).not.toBeInTheDocument();
    });

    it("renders children", () => {
      render(
        <SettingItem label="Setting">
          <input type="checkbox" data-testid="test-control" />
        </SettingItem>,
      );

      expect(screen.getByTestId("test-control")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <SettingItem label="Setting" className="custom-class">
          <input type="checkbox" />
        </SettingItem>,
      );

      const settingItem = container.firstChild;
      expect(settingItem).toHaveClass("custom-class");
    });
  });

  describe("Label-Control Association", () => {
    it("associates label with control using auto-generated ID", () => {
      render(
        <SettingItem label="Enable notifications">
          <input type="checkbox" />
        </SettingItem>,
      );

      const label = screen.getByText("Enable notifications");
      const htmlFor = label.getAttribute("for");

      expect(htmlFor).toBeTruthy();
      expect(htmlFor).toMatch(/^:r[0-9]+:$/); // React useId format
    });

    it("associates label with control using custom ID", () => {
      render(
        <SettingItem id="custom-id" label="Custom Setting">
          <input type="checkbox" id="custom-id" />
        </SettingItem>,
      );

      const label = screen.getByText("Custom Setting");
      expect(label.getAttribute("for")).toBe("custom-id");

      const input = screen.getByRole("checkbox");
      expect(input.getAttribute("id")).toBe("custom-id");
    });

    it("label click focuses control", () => {
      render(
        <SettingItem label="Click me">
          <input type="checkbox" />
        </SettingItem>,
      );

      const label = screen.getByText("Click me");
      const input = screen.getByRole("checkbox");

      label.click();
      expect(document.activeElement).toBe(input);
    });
  });

  describe("Disabled State", () => {
    it("applies disabled styling when disabled prop is true", () => {
      const { container } = render(
        <SettingItem label="Disabled Setting" disabled={true}>
          <input type="checkbox" />
        </SettingItem>,
      );

      const settingItem = container.firstChild as HTMLElement;
      expect(settingItem).toHaveAttribute("data-disabled");
    });

    it("does not apply disabled styling when disabled prop is false", () => {
      const { container } = render(
        <SettingItem label="Enabled Setting" disabled={false}>
          <input type="checkbox" />
        </SettingItem>,
      );

      const settingItem = container.firstChild as HTMLElement;
      expect(settingItem).not.toHaveAttribute("data-disabled");
    });

    it("applies disabled class when disabled", () => {
      const { container } = render(
        <SettingItem label="Setting" disabled={true}>
          <input type="checkbox" />
        </SettingItem>,
      );

      const settingItem = container.firstChild;
      expect(settingItem).toHaveClass("disabled");
    });
  });

  describe("Structure", () => {
    it("renders with correct DOM structure", () => {
      const { container } = render(
        <SettingItem label="Setting" description="Description">
          <input type="checkbox" />
        </SettingItem>,
      );

      // Main container
      const settingItem = container.firstChild as HTMLElement;
      expect(settingItem).toBeInTheDocument();

      // Label container
      const labelContainer = settingItem.querySelector(".labelContainer");
      expect(labelContainer).toBeInTheDocument();

      // Label
      const label = labelContainer?.querySelector("label");
      expect(label).toBeInTheDocument();

      // Description
      const description = labelContainer?.querySelector("p");
      expect(description).toBeInTheDocument();

      // Control container
      const control = settingItem.querySelector(".control");
      expect(control).toBeInTheDocument();
    });

    it("renders label in label element", () => {
      render(
        <SettingItem label="Test Label">
          <input type="checkbox" />
        </SettingItem>,
      );

      const label = screen.getByText("Test Label");
      expect(label.tagName).toBe("LABEL");
    });

    it("renders description in paragraph element", () => {
      const { container } = render(
        <SettingItem label="Setting" description="Test Description">
          <input type="checkbox" />
        </SettingItem>,
      );

      const description = screen.getByText("Test Description");
      expect(description.tagName).toBe("P");
    });
  });

  describe("Integration with Controls", () => {
    it("works with checkbox input", () => {
      render(
        <SettingItem label="Enable feature">
          <input type="checkbox" />
        </SettingItem>,
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("works with text input", () => {
      render(
        <SettingItem label="Username">
          <input type="text" />
        </SettingItem>,
      );

      const textbox = screen.getByRole("textbox");
      expect(textbox).toBeInTheDocument();
    });

    it("works with select element", () => {
      render(
        <SettingItem label="Choose option">
          <select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </SettingItem>,
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    it("works with button", () => {
      render(
        <SettingItem label="Action">
          <button type="button">Click me</button>
        </SettingItem>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("works with multiple children", () => {
      render(
        <SettingItem label="Range">
          <div>
            <input type="number" aria-label="Min" />
            <input type="number" aria-label="Max" />
          </div>
        </SettingItem>,
      );

      const inputs = screen.getAllByRole("spinbutton");
      expect(inputs).toHaveLength(2);
    });
  });

  describe("Accessibility", () => {
    it("has proper label element with htmlFor attribute", () => {
      render(
        <SettingItem label="Accessible Setting">
          <input type="checkbox" />
        </SettingItem>,
      );

      const label = screen.getByText("Accessible Setting");
      expect(label.tagName).toBe("LABEL");
      expect(label.getAttribute("for")).toBeTruthy();
    });

    it("maintains label-control association with custom ID", () => {
      render(
        <SettingItem id="test-id" label="Test">
          <input type="checkbox" id="test-id" />
        </SettingItem>,
      );

      const label = screen.getByText("Test") as HTMLLabelElement;
      const input = screen.getByRole("checkbox") as HTMLInputElement;

      expect(label.htmlFor).toBe("test-id");
      expect(input.id).toBe("test-id");
    });

    it("applies data-disabled attribute for accessibility", () => {
      const { container } = render(
        <SettingItem label="Setting" disabled={true}>
          <input type="checkbox" />
        </SettingItem>,
      );

      const settingItem = container.firstChild as HTMLElement;
      expect(settingItem.getAttribute("data-disabled")).toBe("");
    });

    it("does not apply data-disabled when not disabled", () => {
      const { container } = render(
        <SettingItem label="Setting" disabled={false}>
          <input type="checkbox" />
        </SettingItem>,
      );

      const settingItem = container.firstChild as HTMLElement;
      expect(settingItem.hasAttribute("data-disabled")).toBe(false);
    });
  });

  describe("CSS Classes", () => {
    it("applies settingItem class", () => {
      const { container } = render(
        <SettingItem label="Setting">
          <input type="checkbox" />
        </SettingItem>,
      );

      const settingItem = container.firstChild;
      expect(settingItem).toHaveClass("settingItem");
    });

    it("applies disabled class when disabled", () => {
      const { container } = render(
        <SettingItem label="Setting" disabled={true}>
          <input type="checkbox" />
        </SettingItem>,
      );

      const settingItem = container.firstChild;
      expect(settingItem).toHaveClass("settingItem");
      expect(settingItem).toHaveClass("disabled");
    });

    it("applies labelContainer class", () => {
      const { container } = render(
        <SettingItem label="Setting">
          <input type="checkbox" />
        </SettingItem>,
      );

      const labelContainer = container.querySelector(".labelContainer");
      expect(labelContainer).toBeInTheDocument();
    });

    it("applies label class", () => {
      const { container } = render(
        <SettingItem label="Setting">
          <input type="checkbox" />
        </SettingItem>,
      );

      const label = container.querySelector(".label");
      expect(label).toBeInTheDocument();
    });

    it("applies description class", () => {
      const { container } = render(
        <SettingItem label="Setting" description="Description">
          <input type="checkbox" />
        </SettingItem>,
      );

      const description = container.querySelector(".description");
      expect(description).toBeInTheDocument();
    });

    it("applies control class", () => {
      const { container } = render(
        <SettingItem label="Setting">
          <input type="checkbox" />
        </SettingItem>,
      );

      const control = container.querySelector(".control");
      expect(control).toBeInTheDocument();
    });

    it("combines custom className with default classes", () => {
      const { container } = render(
        <SettingItem label="Setting" className="custom-class">
          <input type="checkbox" />
        </SettingItem>,
      );

      const settingItem = container.firstChild;
      expect(settingItem).toHaveClass("settingItem");
      expect(settingItem).toHaveClass("custom-class");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty string label", () => {
      render(
        <SettingItem label="">
          <input type="checkbox" />
        </SettingItem>,
      );

      const label = document.querySelector("label");
      expect(label).toBeInTheDocument();
      expect(label?.textContent).toBe("");
    });

    it("handles empty string description", () => {
      const { container } = render(
        <SettingItem label="Setting" description="">
          <input type="checkbox" />
        </SettingItem>,
      );

      const description = container.querySelector(".description");
      expect(description).not.toBeInTheDocument();
    });

    it("handles null children gracefully", () => {
      render(<SettingItem label="Setting">{null}</SettingItem>);

      const label = screen.getByText("Setting");
      expect(label).toBeInTheDocument();
    });

    it("handles undefined description gracefully", () => {
      const { container } = render(
        <SettingItem label="Setting" description={undefined}>
          <input type="checkbox" />
        </SettingItem>,
      );

      const description = container.querySelector(".description");
      expect(description).not.toBeInTheDocument();
    });

    it("handles very long label text", () => {
      const longLabel =
        "This is a very long label text that should still render properly and not break the layout";

      render(
        <SettingItem label={longLabel}>
          <input type="checkbox" />
        </SettingItem>,
      );

      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it("handles very long description text", () => {
      const longDescription =
        "This is a very long description text that should still render properly and not break the layout and provide helpful information to the user";

      render(
        <SettingItem label="Setting" description={longDescription}>
          <input type="checkbox" />
        </SettingItem>,
      );

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });
});
