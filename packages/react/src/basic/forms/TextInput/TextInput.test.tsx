/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { TextInput } from "./TextInput";
import styles from "./TextInput.module.css";

describe("TextInput", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<TextInput label="Username" />);
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<TextInput label="Email address" />);
      expect(screen.getByText("Email address")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(<TextInput label="Name" placeholder="Enter your name" />);
      expect(
        screen.getByPlaceholderText("Enter your name"),
      ).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<TextInput label="Test" className="custom-class" />);
      expect(screen.getByLabelText("Test")).toHaveClass("custom-class");
    });

    it("renders with custom id", () => {
      render(<TextInput label="Test" id="custom-id" />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("id", "custom-id");
    });
  });

  describe("Input Types", () => {
    it("renders as text input by default", () => {
      render(<TextInput label="Test" />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("type", "text");
    });

    it("renders as email input when type is email", () => {
      render(<TextInput label="Email" type="email" />);
      expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    });

    it("renders as password input when type is password", () => {
      render(<TextInput label="Password" type="password" />);
      expect(screen.getByLabelText("Password")).toHaveAttribute(
        "type",
        "password",
      );
    });

    it("renders as tel input when type is tel", () => {
      render(<TextInput label="Phone" type="tel" />);
      expect(screen.getByLabelText("Phone")).toHaveAttribute("type", "tel");
    });

    it("renders as url input when type is url", () => {
      render(<TextInput label="Website" type="url" />);
      expect(screen.getByLabelText("Website")).toHaveAttribute("type", "url");
    });
  });

  describe("Interactions", () => {
    it("calls onChange when text is entered", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextInput label="Test" onChange={handleChange} />);

      await user.type(screen.getByLabelText("Test"), "Hello");

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(5); // Once per character
    });

    it("calls onFocus when focused", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<TextInput label="Test" onFocus={handleFocus} />);

      await user.click(screen.getByLabelText("Test"));

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when blurred", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<TextInput label="Test" onBlur={handleBlur} />);

      const input = screen.getByLabelText("Test");
      await user.click(input);
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
        <TextInput label="Test" value={value} onChange={handleChange} />,
      );

      await user.type(screen.getByLabelText("Test"), "test");

      rerender(<TextInput label="Test" value="test" onChange={handleChange} />);

      expect(screen.getByLabelText("Test")).toHaveValue("test");
    });

    it("works as uncontrolled component with defaultValue", () => {
      render(<TextInput label="Test" defaultValue="default text" />);
      expect(screen.getByLabelText("Test")).toHaveValue("default text");
    });
  });

  describe("Required Field", () => {
    it("shows required indicator when required", () => {
      render(<TextInput label="Name" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("does not show required indicator by default", () => {
      render(<TextInput label="Name" />);
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    it("has required attribute when required", () => {
      render(<TextInput label="Name" required />);
      expect(screen.getByLabelText("Name")).toBeRequired();
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled when disabled prop is true", () => {
      render(<TextInput label="Test" disabled />);
      expect(screen.getByLabelText("Test")).toBeDisabled();
    });

    it("does not call onChange when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextInput label="Test" disabled onChange={handleChange} />);

      await user.type(screen.getByLabelText("Test"), "test");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("cannot be focused when disabled", () => {
      render(<TextInput label="Test" disabled />);
      const input = screen.getByLabelText("Test");
      input.focus();
      expect(input).not.toHaveFocus();
    });
  });

  describe("ReadOnly State", () => {
    it("renders as readonly when readOnly prop is true", () => {
      render(<TextInput label="Test" readOnly />);
      expect(screen.getByLabelText("Test")).toHaveAttribute("readonly");
    });

    it("does not call onChange when readonly", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextInput label="Test" readOnly onChange={handleChange} />);

      await user.type(screen.getByLabelText("Test"), "test");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("can be focused when readonly", () => {
      render(<TextInput label="Test" readOnly value="readonly value" />);
      const input = screen.getByLabelText("Test");
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      render(<TextInput label="Test" size="sm" />);
      expect(screen.getByLabelText("Test")).toHaveClass(styles.inputSizeSm);
    });

    it("renders with medium size by default", () => {
      render(<TextInput label="Test" />);
      const input = screen.getByLabelText("Test");
      expect(input).not.toHaveClass(styles.inputSizeSm);
      expect(input).not.toHaveClass(styles.inputSizeLg);
    });

    it("renders with large size", () => {
      render(<TextInput label="Test" size="lg" />);
      expect(screen.getByLabelText("Test")).toHaveClass(styles.inputSizeLg);
    });
  });

  describe("Error State", () => {
    it("displays error message when error prop is provided", () => {
      render(<TextInput label="Email" error="Invalid email address" />);
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });

    it("applies error styles when error is present", () => {
      render(<TextInput label="Email" error="Invalid" />);
      expect(screen.getByLabelText("Email")).toHaveClass(styles.inputError);
    });

    it("error message has role alert", () => {
      render(<TextInput label="Email" error="Invalid email" />);
      expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
    });

    it("does not display help text when error is present", () => {
      render(
        <TextInput
          label="Email"
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
      render(<TextInput label="Email" variant="success" />);
      expect(screen.getByLabelText("Email")).toHaveClass(styles.inputSuccess);
    });

    it("error overrides success variant", () => {
      render(
        <TextInput label="Email" variant="success" error="Error message" />,
      );
      expect(screen.getByLabelText("Email")).toHaveClass(styles.inputError);
    });
  });

  describe("Help Text", () => {
    it("displays help text when provided", () => {
      render(
        <TextInput label="Email" helpText="We'll never share your email" />,
      );
      expect(
        screen.getByText("We'll never share your email"),
      ).toBeInTheDocument();
    });

    it("does not display help text when error is present", () => {
      render(<TextInput label="Email" error="Error" helpText="Help text" />);
      expect(screen.queryByText("Help text")).not.toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    it("renders with left icon", () => {
      const { container } = render(
        <TextInput label="Search" leftIcon={<span>🔍</span>} />,
      );
      expect(
        container.querySelector(`.${styles.leftIcon}`),
      ).toBeInTheDocument();
    });

    it("renders with right icon", () => {
      const { container } = render(
        <TextInput label="Password" rightIcon={<span>👁</span>} />,
      );
      expect(
        container.querySelector(`.${styles.rightIcon}`),
      ).toBeInTheDocument();
    });

    it("renders with both left and right icons", () => {
      const { container } = render(
        <TextInput
          label="Username"
          leftIcon={<span>👤</span>}
          rightIcon={<span>✓</span>}
        />,
      );
      expect(
        container.querySelector(`.${styles.leftIcon}`),
      ).toBeInTheDocument();
      expect(
        container.querySelector(`.${styles.rightIcon}`),
      ).toBeInTheDocument();
    });

    it("applies correct class when left icon is present", () => {
      render(<TextInput label="Test" leftIcon={<span>icon</span>} />);
      expect(screen.getByLabelText("Test")).toHaveClass(
        styles.inputWithLeftIcon,
      );
    });

    it("applies correct class when right icon is present", () => {
      render(<TextInput label="Test" rightIcon={<span>icon</span>} />);
      expect(screen.getByLabelText("Test")).toHaveClass(
        styles.inputWithRightIcon,
      );
    });

    it("applies correct class when both icons are present", () => {
      render(
        <TextInput
          label="Test"
          leftIcon={<span>left</span>}
          rightIcon={<span>right</span>}
        />,
      );
      expect(screen.getByLabelText("Test")).toHaveClass(
        styles.inputWithBothIcons,
      );
    });
  });

  describe("Name Attribute", () => {
    it("applies name attribute when provided", () => {
      render(<TextInput label="Username" name="username" />);
      expect(screen.getByLabelText("Username")).toHaveAttribute(
        "name",
        "username",
      );
    });

    it("works in form context", () => {
      render(
        <form>
          <TextInput label="Email" name="email" defaultValue="test@test.com" />
        </form>,
      );
      const input = screen.getByLabelText("Email") as HTMLInputElement;
      expect(input.name).toBe("email");
      expect(input.value).toBe("test@test.com");
    });
  });

  describe("Accessibility", () => {
    it("associates label with input", () => {
      render(<TextInput label="Email" />);
      const input = screen.getByLabelText("Email");
      expect(input).toBeInTheDocument();
    });

    it("has proper id association with label", () => {
      render(<TextInput label="Username" id="user-input" />);
      const label = screen.getByText("Username");
      expect(label).toHaveAttribute("for", "user-input");
    });

    it("generates unique id when not provided", () => {
      const { rerender } = render(<TextInput label="Test1" />);
      const firstId = screen.getByLabelText("Test1").id;

      rerender(<TextInput label="Test2" />);
      const secondId = screen.getByLabelText("Test2").id;

      expect(firstId).toBeTruthy();
      expect(secondId).toBeTruthy();
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<TextInput label="Test" />);

      await user.tab();
      expect(screen.getByLabelText("Test")).toHaveFocus();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty value", () => {
      render(<TextInput label="Test" value="" />);
      expect(screen.getByLabelText("Test")).toHaveValue("");
    });

    it("handles long text input", async () => {
      const user = userEvent.setup();
      const longText = "a".repeat(1000);
      render(<TextInput label="Test" />);

      await user.type(screen.getByLabelText("Test"), longText);
      expect(screen.getByLabelText("Test")).toHaveValue(longText);
    });

    it("handles special characters", async () => {
      const user = userEvent.setup();
      render(<TextInput label="Test" />);

      await user.type(screen.getByLabelText("Test"), "!@#$%^&*()");
      expect(screen.getByLabelText("Test")).toHaveValue("!@#$%^&*()");
    });

    it("handles unicode characters", async () => {
      const user = userEvent.setup();
      render(<TextInput label="Test" />);

      await user.type(screen.getByLabelText("Test"), "你好🌟");
      expect(screen.getByLabelText("Test")).toHaveValue("你好🌟");
    });

    it("handles rapid typing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<TextInput label="Test" onChange={handleChange} />);

      await user.type(screen.getByLabelText("Test"), "fast");

      expect(handleChange).toHaveBeenCalled();
    });

    it("works with multiple inputs on same page", () => {
      render(
        <>
          <TextInput label="First" />
          <TextInput label="Second" />
          <TextInput label="Third" />
        </>,
      );

      expect(screen.getByLabelText("First")).toBeInTheDocument();
      expect(screen.getByLabelText("Second")).toBeInTheDocument();
      expect(screen.getByLabelText("Third")).toBeInTheDocument();
    });

    it("maintains value after re-render", () => {
      const { rerender } = render(<TextInput label="Test" value="initial" />);

      rerender(<TextInput label="Test" value="initial" />);

      expect(screen.getByLabelText("Test")).toHaveValue("initial");
    });
  });

  describe("Form Integration", () => {
    it("works with form submission", () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <TextInput label="Email" name="email" defaultValue="test@test.com" />
          <button type="submit">Submit</button>
        </form>,
      );

      const form = screen.getByRole("button").closest("form");
      const input = screen.getByLabelText("Email") as HTMLInputElement;

      expect(input.value).toBe("test@test.com");
      expect(form).toContainElement(input);
    });

    it("supports required validation", () => {
      render(
        <form>
          <TextInput label="Email" name="email" required />
        </form>,
      );

      const input = screen.getByLabelText("Email");
      expect(input).toBeRequired();
    });
  });
});
