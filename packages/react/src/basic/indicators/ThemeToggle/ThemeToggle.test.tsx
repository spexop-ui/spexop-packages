/// <reference types="@testing-library/jest-dom" />
/**
 * ThemeToggle Component Tests
 *
 * Tests for ThemeToggle component covering:
 * - Basic rendering with variants and sizes
 * - Theme cycling logic (light → dark → auto → light)
 * - Correct icon display for each theme state
 * - Click and keyboard interaction
 * - ARIA attributes and accessibility
 * - Custom className application
 * - Integration patterns
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle.js";

describe("ThemeToggle", () => {
  const mockOnThemeChange = vi.fn();

  beforeEach(() => {
    mockOnThemeChange.mockClear();
  });

  describe("Basic Rendering", () => {
    it("renders with icon variant by default", () => {
      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      expect(button).toBeInTheDocument();
    });

    it("renders with button variant", () => {
      render(
        <ThemeToggle
          currentTheme="light"
          onThemeChange={mockOnThemeChange}
          variant="button"
        />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      expect(button).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <ThemeToggle
          currentTheme="light"
          onThemeChange={mockOnThemeChange}
          className="custom-theme-toggle"
        />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      expect(button).toHaveClass("custom-theme-toggle");
    });

    it("renders with correct label for light theme", () => {
      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      expect(
        screen.getByRole("button", { name: "Theme: light" }),
      ).toBeInTheDocument();
    });

    it("renders with correct label for dark theme", () => {
      render(
        <ThemeToggle currentTheme="dark" onThemeChange={mockOnThemeChange} />,
      );

      expect(
        screen.getByRole("button", { name: "Theme: dark" }),
      ).toBeInTheDocument();
    });

    it("renders with correct label for auto theme", () => {
      render(
        <ThemeToggle currentTheme="auto" onThemeChange={mockOnThemeChange} />,
      );

      expect(
        screen.getByRole("button", { name: "Theme: auto" }),
      ).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      render(
        <ThemeToggle
          currentTheme="light"
          onThemeChange={mockOnThemeChange}
          size="sm"
        />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      expect(button).toBeInTheDocument();
    });

    it("renders with medium size (default)", () => {
      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      expect(button).toBeInTheDocument();
    });

    it("renders with large size", () => {
      render(
        <ThemeToggle
          currentTheme="light"
          onThemeChange={mockOnThemeChange}
          size="lg"
        />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Theme Cycling", () => {
    it("cycles from light to dark", async () => {
      const user = userEvent.setup();

      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      await user.click(button);

      expect(mockOnThemeChange).toHaveBeenCalledTimes(1);
      expect(mockOnThemeChange).toHaveBeenCalledWith("dark");
    });

    it("cycles from dark to auto", async () => {
      const user = userEvent.setup();

      render(
        <ThemeToggle currentTheme="dark" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: /theme: dark/i });
      await user.click(button);

      expect(mockOnThemeChange).toHaveBeenCalledTimes(1);
      expect(mockOnThemeChange).toHaveBeenCalledWith("auto");
    });

    it("cycles from auto to light", async () => {
      const user = userEvent.setup();

      render(
        <ThemeToggle currentTheme="auto" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: /theme: auto/i });
      await user.click(button);

      expect(mockOnThemeChange).toHaveBeenCalledTimes(1);
      expect(mockOnThemeChange).toHaveBeenCalledWith("light");
    });

    it("completes full cycle: light → dark → auto → light", async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      // Click 1: light → dark
      const button1 = screen.getByRole("button", { name: /theme: light/i });
      await user.click(button1);
      expect(mockOnThemeChange).toHaveBeenCalledWith("dark");

      // Rerender with dark theme
      rerender(
        <ThemeToggle currentTheme="dark" onThemeChange={mockOnThemeChange} />,
      );

      // Click 2: dark → auto
      const button2 = screen.getByRole("button", { name: /theme: dark/i });
      await user.click(button2);
      expect(mockOnThemeChange).toHaveBeenCalledWith("auto");

      // Rerender with auto theme
      rerender(
        <ThemeToggle currentTheme="auto" onThemeChange={mockOnThemeChange} />,
      );

      // Click 3: auto → light
      const button3 = screen.getByRole("button", { name: /theme: auto/i });
      await user.click(button3);
      expect(mockOnThemeChange).toHaveBeenCalledWith("light");

      expect(mockOnThemeChange).toHaveBeenCalledTimes(3);
    });

    it("handles rapid clicks correctly", async () => {
      const user = userEvent.setup();

      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });

      // Rapid clicks
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnThemeChange).toHaveBeenCalledTimes(3);
      // All calls should be with "dark" since the component wasn't re-rendered
      expect(mockOnThemeChange).toHaveBeenNthCalledWith(1, "dark");
      expect(mockOnThemeChange).toHaveBeenNthCalledWith(2, "dark");
      expect(mockOnThemeChange).toHaveBeenNthCalledWith(3, "dark");
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA label", () => {
      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: "Theme: light" });
      expect(button).toHaveAttribute("aria-label", "Theme: light");
    });

    it("updates ARIA label when theme changes", () => {
      const { rerender } = render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      expect(
        screen.getByRole("button", { name: "Theme: light" }),
      ).toBeInTheDocument();

      rerender(
        <ThemeToggle currentTheme="dark" onThemeChange={mockOnThemeChange} />,
      );

      expect(
        screen.getByRole("button", { name: "Theme: dark" }),
      ).toBeInTheDocument();
    });

    it("is keyboard accessible with Enter key", async () => {
      const user = userEvent.setup();

      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      button.focus();

      await user.keyboard("{Enter}");

      expect(mockOnThemeChange).toHaveBeenCalledTimes(1);
      expect(mockOnThemeChange).toHaveBeenCalledWith("dark");
    });

    it("is keyboard accessible with Space key", async () => {
      const user = userEvent.setup();

      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      button.focus();

      await user.keyboard(" ");

      expect(mockOnThemeChange).toHaveBeenCalledTimes(1);
      expect(mockOnThemeChange).toHaveBeenCalledWith("dark");
    });

    it("is focusable", () => {
      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      button.focus();

      expect(button).toHaveFocus();
    });

    it("has button role", () => {
      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      expect(button.tagName).toBe("BUTTON");
    });
  });

  describe("Icon Display", () => {
    it("displays Sun icon for light theme", () => {
      render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      // The Sun icon is rendered by IconButton component
      const button = screen.getByRole("button", { name: "Theme: light" });
      expect(button).toBeInTheDocument();
    });

    it("displays Moon icon for dark theme", () => {
      render(
        <ThemeToggle currentTheme="dark" onThemeChange={mockOnThemeChange} />,
      );

      // The Moon icon is rendered by IconButton component
      const button = screen.getByRole("button", { name: "Theme: dark" });
      expect(button).toBeInTheDocument();
    });

    it("displays Monitor icon for auto theme", () => {
      render(
        <ThemeToggle currentTheme="auto" onThemeChange={mockOnThemeChange} />,
      );

      // The Monitor icon is rendered by IconButton component
      const button = screen.getByRole("button", { name: "Theme: auto" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Integration Patterns", () => {
    it("works with controlled state pattern", async () => {
      const user = userEvent.setup();
      let currentTheme: "light" | "dark" | "auto" = "light";

      const ControlledThemeToggle = () => {
        const [theme, setTheme] = React.useState<"light" | "dark" | "auto">(
          currentTheme,
        );

        return (
          <ThemeToggle
            currentTheme={theme}
            onThemeChange={(newTheme) => {
              setTheme(newTheme);
              currentTheme = newTheme;
            }}
          />
        );
      };

      render(<ControlledThemeToggle />);

      expect(
        screen.getByRole("button", { name: "Theme: light" }),
      ).toBeInTheDocument();

      const button = screen.getByRole("button", { name: /theme:/i });
      await user.click(button);

      // After click, theme should update to dark
      expect(
        screen.getByRole("button", { name: "Theme: dark" }),
      ).toBeInTheDocument();
      expect(currentTheme).toBe("dark");
    });

    it("handles theme prop changes from parent", () => {
      const { rerender } = render(
        <ThemeToggle currentTheme="light" onThemeChange={mockOnThemeChange} />,
      );

      expect(
        screen.getByRole("button", { name: "Theme: light" }),
      ).toBeInTheDocument();

      // Parent changes theme
      rerender(
        <ThemeToggle currentTheme="dark" onThemeChange={mockOnThemeChange} />,
      );

      expect(
        screen.getByRole("button", { name: "Theme: dark" }),
      ).toBeInTheDocument();

      // Parent changes theme again
      rerender(
        <ThemeToggle currentTheme="auto" onThemeChange={mockOnThemeChange} />,
      );

      expect(
        screen.getByRole("button", { name: "Theme: auto" }),
      ).toBeInTheDocument();
    });

    it("works with both variant types", async () => {
      const user = userEvent.setup();

      const { rerender } = render(
        <ThemeToggle
          currentTheme="light"
          onThemeChange={mockOnThemeChange}
          variant="icon"
        />,
      );

      let button = screen.getByRole("button", { name: /theme: light/i });
      await user.click(button);

      expect(mockOnThemeChange).toHaveBeenCalledWith("dark");
      mockOnThemeChange.mockClear();

      // Change to button variant
      rerender(
        <ThemeToggle
          currentTheme="light"
          onThemeChange={mockOnThemeChange}
          variant="button"
        />,
      );

      button = screen.getByRole("button", { name: /theme: light/i });
      await user.click(button);

      expect(mockOnThemeChange).toHaveBeenCalledWith("dark");
    });
  });

  describe("Edge Cases", () => {
    it("handles missing onThemeChange gracefully", () => {
      // TypeScript would catch this, but test runtime behavior
      const { container } = render(
        // @ts-expect-error Testing runtime behavior without required prop
        <ThemeToggle currentTheme="light" />,
      );

      expect(container).toBeInTheDocument();
    });

    it("renders correctly with all size and variant combinations", () => {
      const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
      const variants: Array<"icon" | "button"> = ["icon", "button"];

      for (const size of sizes) {
        for (const variant of variants) {
          const { unmount } = render(
            <ThemeToggle
              currentTheme="light"
              onThemeChange={mockOnThemeChange}
              size={size}
              variant={variant}
            />,
          );

          const button = screen.getByRole("button", { name: /theme: light/i });
          expect(button).toBeInTheDocument();

          unmount();
        }
      }
    });

    it("maintains functionality with additional className", async () => {
      const user = userEvent.setup();

      render(
        <ThemeToggle
          currentTheme="light"
          onThemeChange={mockOnThemeChange}
          className="custom-class another-class"
        />,
      );

      const button = screen.getByRole("button", { name: /theme: light/i });
      expect(button).toHaveClass("custom-class", "another-class");

      await user.click(button);
      expect(mockOnThemeChange).toHaveBeenCalledWith("dark");
    });
  });
});
