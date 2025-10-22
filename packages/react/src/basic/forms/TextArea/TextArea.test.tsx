/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { TextArea } from "./TextArea";
import styles from "./TextArea.module.css";

describe("TextArea", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<TextArea label="Comments" />);
      expect(screen.getByLabelText("Comments")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<TextArea label="Description" />);
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(<TextArea label="Bio" placeholder="Tell us about yourself" />);
      expect(
        screen.getByPlaceholderText("Tell us about yourself"),
      ).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<TextArea label="Test" className="custom-class" />);
      expect(screen.getByLabelText("Test")).toHaveClass("custom-class");
    });

    it("renders with custom id", () => {
      render(<TextArea label="Test" id="custom-id" />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("id", "custom-id");
    });
  });

  describe("Rows Configuration", () => {
    it("renders with default rows", () => {
      render(<TextArea label="Test" />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("rows", "4");
    });

    it("renders with custom rows", () => {
      render(<TextArea label="Test" rows={10} />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("rows", "10");
    });

    it("uses minRows when autoResize is enabled", () => {
      render(<TextArea label="Test" autoResize minRows={3} />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("rows", "3");
    });
  });

  describe("Auto Resize", () => {
    it("does not auto-resize by default", () => {
      const { container } = render(<TextArea label="Test" />);
      const textarea = screen.getByLabelText("Test");
      expect(textarea).not.toHaveClass(styles.textareaAutoResize);
    });

    it("applies auto-resize class when enabled", () => {
      render(<TextArea label="Test" autoResize />);
      expect(screen.getByLabelText("Test")).toHaveClass(
        styles.textareaAutoResize,
      );
    });

    it("respects minRows with autoResize", () => {
      render(<TextArea label="Test" autoResize minRows={5} />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("rows", "5");
    });

    it("can be set with maxRows", () => {
      render(<TextArea label="Test" autoResize minRows={2} maxRows={20} />);
      const textarea = screen.getByLabelText("Test");
      expect(textarea).toHaveAttribute("rows", "2");
    });
  });

  describe("Interactions", () => {
    it("calls onChange when text is entered", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextArea label="Test" onChange={handleChange} />);

      await user.type(screen.getByLabelText("Test"), "Hello");

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(5);
    });

    it("calls onFocus when focused", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<TextArea label="Test" onFocus={handleFocus} />);

      await user.click(screen.getByLabelText("Test"));

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when blurred", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<TextArea label="Test" onBlur={handleBlur} />);

      const textarea = screen.getByLabelText("Test");
      await user.click(textarea);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("updates value when controlled", async () => {
      const user = userEvent.setup();
      let value = "";
      const handleChange = vi.fn((e) => {
        value = e.target.value;
      });

      const { rerender } = render(
        <TextArea label="Test" value={value} onChange={handleChange} />,
      );

      await user.type(screen.getByLabelText("Test"), "test");

      rerender(<TextArea label="Test" value="test" onChange={handleChange} />);

      expect(screen.getByLabelText("Test")).toHaveValue("test");
    });

    it("works as uncontrolled component with defaultValue", () => {
      render(<TextArea label="Test" defaultValue="default text" />);
      expect(screen.getByLabelText("Test")).toHaveValue("default text");
    });

    it("handles multiline text", async () => {
      const user = userEvent.setup();
      render(<TextArea label="Test" />);

      await user.type(screen.getByLabelText("Test"), "Line 1{Enter}Line 2");

      expect(screen.getByLabelText("Test")).toHaveValue("Line 1\nLine 2");
    });
  });

  describe("Required Field", () => {
    it("shows required indicator when required", () => {
      render(<TextArea label="Comments" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("does not show required indicator by default", () => {
      render(<TextArea label="Comments" />);
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    it("has required attribute when required", () => {
      render(<TextArea label="Comments" required />);
      expect(screen.getByLabelText("Comments")).toBeRequired();
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled when disabled prop is true", () => {
      render(<TextArea label="Test" disabled />);
      expect(screen.getByLabelText("Test")).toBeDisabled();
    });

    it("does not call onChange when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextArea label="Test" disabled onChange={handleChange} />);

      await user.type(screen.getByLabelText("Test"), "test");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("cannot be focused when disabled", () => {
      render(<TextArea label="Test" disabled />);
      const textarea = screen.getByLabelText("Test");
      textarea.focus();
      expect(textarea).not.toHaveFocus();
    });
  });

  describe("ReadOnly State", () => {
    it("renders as readonly when readOnly prop is true", () => {
      render(<TextArea label="Test" readOnly />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("readonly");
    });

    it("does not call onChange when readonly", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextArea label="Test" readOnly onChange={handleChange} />);

      await user.type(screen.getByLabelText("Test"), "test");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("can be focused when readonly", () => {
      render(<TextArea label="Test" readOnly value="readonly value" />);
      const textarea = screen.getByLabelText("Test");
      textarea.focus();
      expect(textarea).toHaveFocus();
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      render(<TextArea label="Test" size="sm" />);
      expect(screen.getByLabelText("Test")).toHaveClass(styles.textareaSizeSm);
    });

    it("renders with medium size by default", () => {
      render(<TextArea label="Test" />);
      const textarea = screen.getByLabelText("Test");
      expect(textarea).not.toHaveClass(styles.textareaSizeSm);
      expect(textarea).not.toHaveClass(styles.textareaSizeLg);
    });

    it("renders with large size", () => {
      render(<TextArea label="Test" size="lg" />);
      expect(screen.getByLabelText("Test")).toHaveClass(styles.textareaSizeLg);
    });
  });

  describe("Error State", () => {
    it("displays error message when error prop is provided", () => {
      render(<TextArea label="Bio" error="Bio is required" />);
      expect(screen.getByText("Bio is required")).toBeInTheDocument();
    });

    it("applies error styles when error is present", () => {
      render(<TextArea label="Bio" error="Invalid" />);
      expect(screen.getByLabelText("Bio")).toHaveClass(styles.textareaError);
    });

    it("error message has role alert", () => {
      render(<TextArea label="Bio" error="Invalid bio" />);
      expect(screen.getByRole("alert")).toHaveTextContent("Invalid bio");
    });

    it("does not display help text when error is present", () => {
      render(
        <TextArea
          label="Bio"
          error="Invalid"
          helpText="This should not appear"
        />,
      );
      expect(
        screen.queryByText("This should not appear"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Success State", () => {
    it("applies success styles when variant is success", () => {
      render(<TextArea label="Bio" variant="success" />);
      expect(screen.getByLabelText("Bio")).toHaveClass(styles.textareaSuccess);
    });

    it("error overrides success variant", () => {
      render(<TextArea label="Bio" variant="success" error="Error message" />);
      expect(screen.getByLabelText("Bio")).toHaveClass(styles.textareaError);
    });
  });

  describe("Help Text", () => {
    it("displays help text when provided", () => {
      render(<TextArea label="Bio" helpText="Tell us about your experience" />);
      expect(
        screen.getByText("Tell us about your experience"),
      ).toBeInTheDocument();
    });

    it("does not display help text when error is present", () => {
      render(<TextArea label="Bio" error="Error" helpText="Help text" />);
      expect(screen.queryByText("Help text")).not.toBeInTheDocument();
    });
  });

  describe("Name Attribute", () => {
    it("applies name attribute when provided", () => {
      render(<TextArea label="Comments" name="comments" />);
      expect(screen.getByLabelText("Comments")).toHaveAttribute(
        "name",
        "comments",
      );
    });

    it("works in form context", () => {
      render(
        <form>
          <TextArea
            label="Feedback"
            name="feedback"
            defaultValue="Great product!"
          />
        </form>,
      );
      const textarea = screen.getByLabelText("Feedback") as HTMLTextAreaElement;
      expect(textarea.name).toBe("feedback");
      expect(textarea.value).toBe("Great product!");
    });
  });

  describe("Accessibility", () => {
    it("associates label with textarea", () => {
      render(<TextArea label="Comments" />);
      const textarea = screen.getByLabelText("Comments");
      expect(textarea).toBeInTheDocument();
    });

    it("has proper id association with label", () => {
      render(<TextArea label="Comments" id="comments-input" />);
      const label = screen.getByText("Comments");
      expect(label).toHaveAttribute("for", "comments-input");
    });

    it("generates unique id when not provided", () => {
      const { rerender } = render(<TextArea label="Test1" />);
      const firstId = screen.getByLabelText("Test1").id;

      rerender(<TextArea label="Test2" />);
      const secondId = screen.getByLabelText("Test2").id;

      expect(firstId).toBeTruthy();
      expect(secondId).toBeTruthy();
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<TextArea label="Test" />);

      await user.tab();
      expect(screen.getByLabelText("Test")).toHaveFocus();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty value", () => {
      render(<TextArea label="Test" value="" />);
      expect(screen.getByLabelText("Test")).toHaveValue("");
    });

    it("handles long text input", async () => {
      const user = userEvent.setup();
      const longText = "a".repeat(1000);
      render(<TextArea label="Test" />);

      await user.type(screen.getByLabelText("Test"), longText);
      expect(screen.getByLabelText("Test")).toHaveValue(longText);
    });

    it("handles special characters", async () => {
      const user = userEvent.setup();
      render(<TextArea label="Test" />);

      await user.type(screen.getByLabelText("Test"), "!@#$%^&*()");
      expect(screen.getByLabelText("Test")).toHaveValue("!@#$%^&*()");
    });

    it("handles multiple paragraphs", async () => {
      const user = userEvent.setup();
      render(<TextArea label="Test" />);

      await user.type(
        screen.getByLabelText("Test"),
        "Para 1{Enter}{Enter}Para 2",
      );

      expect(screen.getByLabelText("Test")).toHaveValue("Para 1\n\nPara 2");
    });

    it("works with multiple textareas on same page", () => {
      render(
        <>
          <TextArea label="First" />
          <TextArea label="Second" />
          <TextArea label="Third" />
        </>,
      );

      expect(screen.getByLabelText("First")).toBeInTheDocument();
      expect(screen.getByLabelText("Second")).toBeInTheDocument();
      expect(screen.getByLabelText("Third")).toBeInTheDocument();
    });

    it("maintains value after re-render", () => {
      const { rerender } = render(
        <TextArea label="Test" value="initial text" />,
      );

      rerender(<TextArea label="Test" value="initial text" />);

      expect(screen.getByLabelText("Test")).toHaveValue("initial text");
    });

    it("handles rapid typing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextArea label="Test" onChange={handleChange} />);

      await user.type(screen.getByLabelText("Test"), "fast");

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("Form Integration", () => {
    it("works with form submission", () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <TextArea label="Feedback" name="feedback" defaultValue="Great!" />
          <button type="submit">Submit</button>
        </form>,
      );

      const form = screen.getByRole("button").closest("form");
      const textarea = screen.getByLabelText("Feedback") as HTMLTextAreaElement;

      expect(textarea.value).toBe("Great!");
      expect(form).toContainElement(textarea);
    });

    it("supports required validation", () => {
      render(
        <form>
          <TextArea label="Comments" name="comments" required />
        </form>,
      );

      const textarea = screen.getByLabelText("Comments");
      expect(textarea).toBeRequired();
    });
  });

  describe("Configuration Options", () => {
    it("applies correct minRows", () => {
      render(<TextArea label="Test" minRows={5} autoResize />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("rows", "5");
    });

    it("respects rows when autoResize is false", () => {
      render(<TextArea label="Test" rows={8} />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("rows", "8");
    });

    it("can combine all size props", () => {
      render(<TextArea label="Test" rows={6} minRows={3} maxRows={10} />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("rows", "6");
    });
  });
});
