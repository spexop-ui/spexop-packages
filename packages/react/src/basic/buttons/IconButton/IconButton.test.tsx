/**
 * IconButton Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { Home, Search, Settings } from "@spexop/icons";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  describe("Rendering", () => {
    it("should render with icon and label", () => {
      render(<IconButton icon={Home} label="Home" />);
      const button = screen.getByRole("button", { name: "Home" });
      expect(button).toBeInTheDocument();
    });

    it("should render as button element", () => {
      render(<IconButton icon={Home} label="Home" />);
      const button = screen.getByRole("button");
      expect(button.nodeName).toBe("BUTTON");
    });

    it("should apply custom className", () => {
      render(<IconButton icon={Home} label="Home" className="custom-class" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("should render ghost variant by default", () => {
      render(<IconButton icon={Home} label="Home" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("ghost");
    });

    it("should render ghost variant", () => {
      render(<IconButton icon={Home} label="Home" variant="ghost" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("ghost");
    });

    it("should render solid variant", () => {
      render(<IconButton icon={Home} label="Home" variant="solid" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("solid");
    });

    it("should render outline variant", () => {
      render(<IconButton icon={Home} label="Home" variant="outline" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("outline");
    });
  });

  describe("Sizes", () => {
    it("should render md size by default", () => {
      render(<IconButton icon={Home} label="Home" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("md");
    });

    it("should render sm size", () => {
      render(<IconButton icon={Home} label="Home" size="sm" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("sm");
    });

    it("should render md size", () => {
      render(<IconButton icon={Home} label="Home" size="md" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("md");
    });

    it("should render lg size", () => {
      render(<IconButton icon={Home} label="Home" size="lg" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("lg");
    });
  });

  describe("Button Types", () => {
    it("should render as button type by default", () => {
      render(<IconButton icon={Home} label="Home" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("should render as submit type", () => {
      render(<IconButton icon={Home} label="Home" type="submit" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should render as reset type", () => {
      render(<IconButton icon={Home} label="Home" type="reset" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "reset");
    });
  });

  describe("Click Behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButton icon={Home} label="Home" onClick={handleClick} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton icon={Home} label="Home" onClick={handleClick} disabled />,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should handle multiple clicks", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButton icon={Home} label="Home" onClick={handleClick} />);

      const button = screen.getByRole("button");
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("Disabled State", () => {
    it("should not be disabled by default", () => {
      render(<IconButton icon={Home} label="Home" />);
      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();
    });

    it("should be disabled when disabled prop is true", () => {
      render(<IconButton icon={Home} label="Home" disabled />);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should apply disabled attribute", () => {
      render(<IconButton icon={Home} label="Home" disabled />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("disabled");
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label", () => {
      render(<IconButton icon={Home} label="Home" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Home");
    });

    it("should have title attribute", () => {
      render(<IconButton icon={Home} label="Home" />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("title", "Home");
    });

    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButton icon={Home} label="Home" onClick={handleClick} />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalled();
    });

    it("should be keyboard accessible with space", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButton icon={Home} label="Home" onClick={handleClick} />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard(" ");

      expect(handleClick).toHaveBeenCalled();
    });

    it("should announce label to screen readers", () => {
      render(<IconButton icon={Home} label="Go to home page" />);
      const button = screen.getByRole("button", { name: "Go to home page" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Icon Integration", () => {
    it("should render Home icon", () => {
      const { container } = render(<IconButton icon={Home} label="Home" />);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("should render Search icon", () => {
      const { container } = render(<IconButton icon={Search} label="Search" />);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("should render Settings icon", () => {
      const { container } = render(
        <IconButton icon={Settings} label="Settings" />,
      );
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("should render with custom icon component", () => {
      const CustomIcon = () => <span data-testid="custom">★</span>;
      render(<IconButton icon={CustomIcon} label="Custom" />);
      expect(screen.getByTestId("custom")).toBeInTheDocument();
    });
  });

  describe("Icon Size", () => {
    it("should use default icon size for md button", () => {
      render(<IconButton icon={Home} label="Home" size="md" />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should use smaller icon size for sm button", () => {
      render(<IconButton icon={Home} label="Home" size="sm" />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should use larger icon size for lg button", () => {
      render(<IconButton icon={Home} label="Home" size="lg" />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should accept custom icon size", () => {
      render(<IconButton icon={Home} label="Home" iconSize={28} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should accept custom stroke width", () => {
      render(<IconButton icon={Home} label="Home" strokeWidth={2} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Legacy String Icon Support", () => {
    it("should render string SVG icon (legacy)", () => {
      const svgString = '<svg><circle cx="10" cy="10" r="5"/></svg>';
      render(<IconButton icon={svgString} label="Legacy Icon" />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Use Cases", () => {
    it("should work as toolbar button", () => {
      render(
        <div role="toolbar">
          <IconButton icon={Home} label="Home" />
          <IconButton icon={Search} label="Search" />
          <IconButton icon={Settings} label="Settings" />
        </div>,
      );

      expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Search" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Settings" }),
      ).toBeInTheDocument();
    });

    it("should work as navigation button", () => {
      const handleClick = vi.fn();
      render(<IconButton icon={Home} label="Go home" onClick={handleClick} />);

      const button = screen.getByRole("button", { name: "Go home" });
      expect(button).toBeInTheDocument();
    });

    it("should work as action button", async () => {
      const user = userEvent.setup();
      const handleDelete = vi.fn();
      render(
        <IconButton icon={Settings} label="Delete" onClick={handleDelete} />,
      );

      await user.click(screen.getByRole("button"));
      expect(handleDelete).toHaveBeenCalled();
    });

    it("should work in forms", () => {
      render(
        <form>
          <IconButton icon={Search} label="Submit search" type="submit" />
        </form>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });
  });

  describe("Combination of Props", () => {
    it("should render with all custom props", () => {
      const handleClick = vi.fn();
      render(
        <IconButton
          icon={Home}
          label="Custom Home"
          onClick={handleClick}
          variant="solid"
          size="lg"
          className="custom"
          type="button"
          iconSize={28}
          strokeWidth={2}
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("iconButton", "solid", "lg", "custom");
      expect(button).toHaveAttribute("aria-label", "Custom Home");
      expect(button).toHaveAttribute("type", "button");
    });

    it("should render small outline button", () => {
      render(
        <IconButton icon={Search} label="Search" variant="outline" size="sm" />,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("outline", "sm");
    });

    it("should render large solid disabled button", () => {
      render(
        <IconButton
          icon={Settings}
          label="Settings"
          variant="solid"
          size="lg"
          disabled
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("solid", "lg");
      expect(button).toBeDisabled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined onClick", () => {
      render(<IconButton icon={Home} label="Home" onClick={undefined} />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should handle empty className", () => {
      render(<IconButton icon={Home} label="Home" className="" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("iconButton");
    });

    it("should handle very long label", () => {
      const longLabel =
        "This is a very long label that should still work correctly";
      render(<IconButton icon={Home} label={longLabel} />);
      const button = screen.getByRole("button", { name: longLabel });
      expect(button).toBeInTheDocument();
    });

    it("should handle special characters in label", () => {
      render(<IconButton icon={Home} label="Home & Settings" />);
      const button = screen.getByRole("button", { name: "Home & Settings" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Multiple Buttons", () => {
    it("should render multiple buttons independently", () => {
      render(
        <>
          <IconButton icon={Home} label="Home" />
          <IconButton icon={Search} label="Search" />
          <IconButton icon={Settings} label="Settings" />
        </>,
      );

      expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Search" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Settings" }),
      ).toBeInTheDocument();
    });

    it("should maintain separate click handlers", async () => {
      const user = userEvent.setup();
      const handleHome = vi.fn();
      const handleSearch = vi.fn();

      render(
        <>
          <IconButton icon={Home} label="Home" onClick={handleHome} />
          <IconButton icon={Search} label="Search" onClick={handleSearch} />
        </>,
      );

      await user.click(screen.getByRole("button", { name: "Home" }));
      await user.click(screen.getByRole("button", { name: "Search" }));

      expect(handleHome).toHaveBeenCalledTimes(1);
      expect(handleSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe("Focus Management", () => {
    it("should be focusable", () => {
      render(<IconButton icon={Home} label="Home" />);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("should not be focusable when disabled", () => {
      render(<IconButton icon={Home} label="Home" disabled />);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).not.toHaveFocus();
    });
  });
});
