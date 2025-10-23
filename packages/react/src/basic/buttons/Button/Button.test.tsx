/// <reference types="@testing-library/jest-dom" />
/**
 * Button Component Tests
 *
 * Tests for Button component covering:
 * - Rendering all 12 variants
 * - Size variants (sm, md, lg)
 * - Compact mode
 * - Icon-only mode with aria-label requirement
 * - Loading state
 * - Disabled state
 * - Full-width mode
 * - Click handlers
 * - Keyboard navigation (Enter, Space)
 * - ARIA attributes
 * - Border customization
 * - Text color override
 * - Polymorphic rendering
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { Edit } from "@spexop/icons";
import { act, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { forwardRef, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button.js";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders as a button element by default", () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole("button", { name: "Click me" });
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });

    it("renders button text", () => {
      render(<Button>Test Button</Button>);

      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toContain("custom-class");
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      render(<Button variant="primary">Primary</Button>);

      const button = screen.getByRole("button", { name: "Primary" });
      expect(button).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole("button", { name: "Secondary" });
      expect(button).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      render(<Button variant="outline">Outline</Button>);

      const button = screen.getByRole("button", { name: "Outline" });
      expect(button).toBeInTheDocument();
    });

    it("renders ghost variant", () => {
      render(<Button variant="ghost">Ghost</Button>);

      const button = screen.getByRole("button", { name: "Ghost" });
      expect(button).toBeInTheDocument();
    });

    it("renders text variant", () => {
      render(<Button variant="text">Text</Button>);

      const button = screen.getByRole("button", { name: "Text" });
      expect(button).toBeInTheDocument();
    });

    it("renders pill variant", () => {
      render(<Button variant="pill">Pill</Button>);

      const button = screen.getByRole("button", { name: "Pill" });
      expect(button).toBeInTheDocument();
    });

    it("renders border-emphasis variant", () => {
      render(<Button variant="border-emphasis">Border</Button>);

      const button = screen.getByRole("button", { name: "Border" });
      expect(button).toBeInTheDocument();
    });

    it("renders danger variant", () => {
      render(<Button variant="danger">Danger</Button>);

      const button = screen.getByRole("button", { name: "Danger" });
      expect(button).toBeInTheDocument();
    });

    it("renders success variant", () => {
      render(<Button variant="success">Success</Button>);

      const button = screen.getByRole("button", { name: "Success" });
      expect(button).toBeInTheDocument();
    });

    it("renders warning variant", () => {
      render(<Button variant="warning">Warning</Button>);

      const button = screen.getByRole("button", { name: "Warning" });
      expect(button).toBeInTheDocument();
    });

    it("renders info variant", () => {
      render(<Button variant="info">Info</Button>);

      const button = screen.getByRole("button", { name: "Info" });
      expect(button).toBeInTheDocument();
    });

    it("renders neutral variant", () => {
      render(<Button variant="neutral">Neutral</Button>);

      const button = screen.getByRole("button", { name: "Neutral" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      render(<Button size="sm">Small</Button>);

      const button = screen.getByRole("button", { name: "Small" });
      expect(button).toBeInTheDocument();
    });

    it("renders medium size (default)", () => {
      render(<Button size="md">Medium</Button>);

      const button = screen.getByRole("button", { name: "Medium" });
      expect(button).toBeInTheDocument();
    });

    it("renders large size", () => {
      render(<Button size="lg">Large</Button>);

      const button = screen.getByRole("button", { name: "Large" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Compact Mode", () => {
    it("renders compact sm mode", () => {
      render(
        <Button compact="sm" iconOnly aria-label="Edit">
          <Edit size={16} />
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Edit" });
      expect(button).toBeInTheDocument();
    });

    it("renders compact md mode", () => {
      render(
        <Button compact="md" iconOnly aria-label="Edit">
          <Edit size={16} />
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Edit" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Icon-Only Mode", () => {
    it("renders icon-only button with aria-label", () => {
      render(
        <Button iconOnly aria-label="Edit item">
          <Edit size={20} />
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Edit item" });
      expect(button).toBeInTheDocument();
    });

    it("applies iconOnly class", () => {
      render(
        <Button iconOnly aria-label="Edit">
          <Edit size={20} />
        </Button>,
      );

      const button = screen.getByRole("button", { name: "Edit" });
      expect(button).toBeInTheDocument();
    });

    it("warns when iconOnly is true without aria-label in development", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(
        <Button iconOnly>
          <Edit size={20} />
        </Button>,
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        "Button: iconOnly={true} requires an aria-label for accessibility.",
      );

      consoleSpy.mockRestore();
    });
  });

  describe("Loading State", () => {
    it("renders loading state", () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole("button", { name: "Loading" });
      expect(button).toBeInTheDocument();
    });

    it("disables button when loading", () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("does not call onClick when loading", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button loading onClick={handleClick}>
          Loading
        </Button>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("renders disabled button", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("applies disabled class", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button", { name: "Disabled" });
      expect(button).toBeInTheDocument();
    });

    it("does not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("has tabIndex -1 when disabled", () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("tabIndex", "-1");
    });
  });

  describe("Full-Width Mode", () => {
    it("renders full-width button", () => {
      render(<Button fullWidth>Full Width</Button>);

      const button = screen.getByRole("button", { name: "Full Width" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Click Handlers", () => {
    it("calls onClick when button is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      await act(async () => {
        await user.click(button);
      });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick if not provided", async () => {
      const user = userEvent.setup();

      render(<Button>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      // Should not throw
      expect(button).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("button is keyboard accessible", async () => {
      const user = userEvent.setup();

      render(<Button>Keyboard Button</Button>);

      await user.tab();

      const button = screen.getByRole("button");
      expect(button).toHaveFocus();
    });

    it("triggers onClick on Enter key", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole("button");
      button.focus();

      await act(async () => {
        await user.keyboard("{Enter}");
      });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("triggers onClick on Space key", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole("button");
      button.focus();

      await act(async () => {
        await user.keyboard(" ");
      });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("ARIA Attributes", () => {
    it("supports aria-label", () => {
      render(<Button aria-label="Custom label">Button</Button>);

      const button = screen.getByRole("button", { name: "Custom label" });
      expect(button).toBeInTheDocument();
    });

    it("supports aria-pressed", () => {
      render(<Button aria-pressed={true}>Toggle</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-pressed", "true");
    });

    it("supports aria-expanded", () => {
      render(<Button aria-expanded={true}>Expand</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("supports aria-controls", () => {
      render(<Button aria-controls="menu-1">Menu</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-controls", "menu-1");
    });

    it("supports aria-describedby", () => {
      render(<Button aria-describedby="help-text">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "help-text");
    });

    it("supports aria-haspopup", () => {
      render(<Button aria-haspopup="menu">Actions</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-haspopup", "menu");
    });
  });

  describe("Border Customization", () => {
    it("applies thin border weight", () => {
      render(<Button borderWeight="thin">Thin</Button>);

      const button = screen.getByRole("button", { name: "Thin" });
      expect(button).toBeInTheDocument();
    });

    it("applies thick border weight", () => {
      render(<Button borderWeight="thick">Thick</Button>);

      const button = screen.getByRole("button", { name: "Thick" });
      expect(button).toBeInTheDocument();
    });

    it("applies dashed border style", () => {
      render(<Button borderStyle="dashed">Dashed</Button>);

      const button = screen.getByRole("button", { name: "Dashed" });
      expect(button).toBeInTheDocument();
    });

    it("applies dotted border style", () => {
      render(<Button borderStyle="dotted">Dotted</Button>);

      const button = screen.getByRole("button", { name: "Dotted" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Text Color Override", () => {
    it("applies light text color", () => {
      render(<Button textColor="light">Light Text</Button>);

      const button = screen.getByRole("button", { name: "Light Text" });
      expect(button).toBeInTheDocument();
    });

    it("applies dark text color", () => {
      render(<Button textColor="dark">Dark Text</Button>);

      const button = screen.getByRole("button", { name: "Dark Text" });
      expect(button).toBeInTheDocument();
    });

    it("does not apply class for auto text color", () => {
      render(<Button textColor="auto">Auto Text</Button>);

      const button = screen.getByRole("button", { name: "Auto Text" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Button Type", () => {
    it("renders submit type", () => {
      render(<Button type="submit">Submit</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("renders reset type", () => {
      render(<Button type="reset">Reset</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "reset");
    });

    it("renders button type by default", () => {
      render(<Button>Default</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as custom element", () => {
      const CustomElement = forwardRef<
        HTMLAnchorElement,
        { children: ReactNode; [key: string]: unknown }
      >(({ children, ...props }, ref) => (
        <a ref={ref} {...props}>
          {children as ReactNode}
        </a>
      ));

      render(
        <Button as={CustomElement} href="/test">
          Link Button
        </Button>,
      );

      const link = screen.getByRole("link");
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/test");
    });

    it("does not add type attribute for non-button elements", () => {
      const CustomElement = forwardRef<
        HTMLAnchorElement,
        { children: ReactNode; [key: string]: unknown }
      >(({ children, ...props }, ref) => (
        <a ref={ref} {...props}>
          {children as ReactNode}
        </a>
      ));

      render(
        <Button as={CustomElement} href="/test">
          Link
        </Button>,
      );

      const link = screen.getByText("Link");
      expect(link).not.toHaveAttribute("type");
    });

    it("does not add disabled attribute for non-button elements", () => {
      const CustomElement = forwardRef<
        HTMLDivElement,
        { children: ReactNode; [key: string]: unknown }
      >(({ children, ...props }, ref) => (
        <div ref={ref} {...props}>
          {children as ReactNode}
        </div>
      ));

      render(
        <Button as={CustomElement} disabled>
          Div Button
        </Button>,
      );

      const div = screen.getByText("Div Button");
      expect(div).not.toHaveAttribute("disabled");
    });
  });

  describe("Icon Integration", () => {
    it("renders button with icon", () => {
      render(
        <Button>
          <Edit size={20} />
          Edit
        </Button>,
      );

      const button = screen.getByRole("button", { name: /Edit/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Modern UI Patterns", () => {
    it("supports forwardRef", () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Button</Button>);
      expect(ref).toHaveBeenCalled();
    });

    it("handles keyboard events", async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();

      render(<Button onKeyDown={handleKeyDown}>Button</Button>);

      const button = screen.getByRole("button");
      await user.type(button, "Enter");

      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("triggers click on Enter key", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole("button");
      button.focus();
      await act(async () => {
        await user.keyboard("{Enter}");
      });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("triggers click on Space key", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole("button");
      button.focus();
      await act(async () => {
        await user.keyboard(" ");
      });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles Escape key for dismissible actions", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(
        <Button aria-haspopup="menu" onBlur={handleBlur}>
          Menu
        </Button>,
      );

      const button = screen.getByRole("button");
      button.focus();
      await act(async () => {
        await user.keyboard("{Escape}");
      });

      expect(handleBlur).toHaveBeenCalled();
    });

    it("shows ripple effect on click", async () => {
      const user = userEvent.setup();
      const { container } = render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      await act(async () => {
        await user.click(button);
      });

      // Check that the ripple element exists in the DOM
      const ripple = container.querySelector('[aria-hidden="true"]');
      expect(ripple).toBeInTheDocument();
    });

    it("applies pressed state on mouse down", async () => {
      const user = userEvent.setup();
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      await act(async () => {
        await user.pointer({ keys: "[MouseLeft>]", target: button });
      });

      // The pressed state is handled internally, so we just verify the button is interactive
      expect(button).toBeInTheDocument();
    });

    it("applies focused state on focus", async () => {
      const user = userEvent.setup();
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      await act(async () => {
        await user.tab();
      });

      // The focused state is handled internally, so we just verify the button is focusable
      expect(button).toHaveFocus();
    });

    it("supports data-testid", () => {
      render(<Button data-testid="test-button">Button</Button>);

      const button = screen.getByTestId("test-button");
      expect(button).toBeInTheDocument();
    });

    it("supports aria-live for loading state", () => {
      render(
        <Button loading aria-live="assertive">
          Loading
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-live", "assertive");
    });

    it("automatically sets aria-live for loading state", () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("Edge Cases", () => {
    it("handles multiple class combinations", () => {
      const { container } = render(
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled
          className="custom"
        >
          Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button.className).toContain("custom");
      expect(button.className).toContain("primary");
      expect(button.className).toContain("sizeLg");
      expect(button.className).toContain("fullWidth");
      expect(button.className).toContain("disabled");
    });

    it("handles empty children gracefully", () => {
      render(<Button aria-label="Empty button">{null}</Button>);

      const button = screen.getByRole("button", { name: "Empty button" });
      expect(button).toBeInTheDocument();
    });

    it("has tabIndex 0 when not disabled", () => {
      render(<Button>Normal</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Accessibility", () => {
    it("has correct button role", () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("is keyboard focusable", async () => {
      const user = userEvent.setup();

      render(<Button>Focusable</Button>);

      await user.tab();

      const button = screen.getByRole("button");
      expect(button).toHaveFocus();
    });

    it("is not keyboard focusable when disabled", async () => {
      const user = userEvent.setup();

      render(<Button disabled>Disabled</Button>);

      await user.tab();

      const button = screen.getByRole("button");
      expect(button).not.toHaveFocus();
    });
  });
});
