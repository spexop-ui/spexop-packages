/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  describe("Rendering", () => {
    it("renders without crashing", () => {
      render(<SearchBar />);
      expect(screen.getByRole("search")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(<SearchBar placeholder="Search items" />);
      expect(screen.getByPlaceholderText("Search items")).toBeInTheDocument();
    });

    it("renders with default placeholder", () => {
      render(<SearchBar />);
      expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    });

    it("renders search icon", () => {
      const { container } = render(<SearchBar />);
      expect(container.querySelector(".searchIcon")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = render(<SearchBar className="custom-class" />);
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders compact variant", () => {
      const { container } = render(<SearchBar variant="compact" />);
      expect(container.querySelector(".compact")).toBeInTheDocument();
    });

    it("renders full variant", () => {
      const { container } = render(<SearchBar variant="full" />);
      expect(container.querySelector(".full")).toBeInTheDocument();
    });

    it("renders compact variant by default", () => {
      const { container } = render(<SearchBar />);
      expect(container.querySelector(".compact")).toBeInTheDocument();
    });
  });

  describe("Keyboard Shortcut", () => {
    it("shows keyboard shortcut by default", () => {
      render(<SearchBar />);
      // Should show either ⌘K or Ctrl+K depending on platform
      const shortcuts = screen.queryByText(/⌘K|Ctrl\+K/);
      expect(shortcuts).toBeInTheDocument();
    });

    it("hides keyboard shortcut when showShortcut is false", () => {
      const { container } = render(<SearchBar showShortcut={false} />);
      expect(
        container.querySelector(".KeyboardShortcut"),
      ).not.toBeInTheDocument();
    });

    it("renders custom keyboard shortcut", () => {
      render(<SearchBar shortcut="/" />);
      expect(screen.getByText("/")).toBeInTheDocument();
    });
  });

  describe("Controlled Input", () => {
    it("displays controlled value", () => {
      render(<SearchBar value="test query" />);
      const input = screen.getByRole("searchbox") as HTMLInputElement;
      expect(input.value).toBe("test query");
    });

    it("calls onChange when typing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SearchBar onChange={handleChange} />);

      await user.type(screen.getByRole("searchbox"), "test");

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(4);
    });

    it("works as uncontrolled component", async () => {
      const user = userEvent.setup();
      render(<SearchBar />);

      const input = screen.getByRole("searchbox") as HTMLInputElement;
      await user.type(input, "test");

      expect(input.value).toBe("test");
    });
  });

  describe("Search Functionality", () => {
    it("calls onSearch on form submission", async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      render(<SearchBar onSearch={handleSearch} />);

      const input = screen.getByRole("searchbox");
      await user.type(input, "test query");
      await user.keyboard("{Enter}");

      expect(handleSearch).toHaveBeenCalledWith("test query");
    });

    it("calls onSearch when clicking search button", async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      render(<SearchBar onSearch={handleSearch} />);

      await user.type(screen.getByRole("searchbox"), "test");
      await user.click(screen.getByRole("button", { name: /search/i }));

      expect(handleSearch).toHaveBeenCalledWith("test");
    });

    it("prevents default form submission", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<SearchBar onSearch={handleSubmit} />);

      await user.type(screen.getByRole("searchbox"), "test");
      await user.keyboard("{Enter}");

      expect(handleSubmit).toHaveBeenCalledWith("test");
    });
  });

  describe("Read-Only Mode", () => {
    it("renders as read-only when readOnly is true", () => {
      render(<SearchBar readOnly />);
      expect(screen.getByRole("searchbox")).toHaveAttribute("readonly");
    });

    it("calls onClick when clicked in read-only mode", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<SearchBar readOnly onClick={handleClick} />);

      await user.click(screen.getByRole("searchbox"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not update value in read-only mode", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SearchBar readOnly onChange={handleChange} />);

      await user.type(screen.getByRole("searchbox"), "test");

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<SearchBar />);
      expect(screen.getByRole("search")).toBeInTheDocument();
    });

    it("search input has searchbox role", () => {
      render(<SearchBar />);
      expect(screen.getByRole("searchbox")).toBeInTheDocument();
    });

    it("has aria-label on input", () => {
      render(<SearchBar placeholder="Search products" />);
      expect(screen.getByLabelText("Search products")).toBeInTheDocument();
    });

    it("search button has proper label", () => {
      render(<SearchBar />);
      expect(
        screen.getByRole("button", { name: /search/i }),
      ).toBeInTheDocument();
    });

    it("is keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<SearchBar />);

      await user.tab();
      expect(screen.getByRole("button")).toHaveFocus();

      await user.tab();
      expect(screen.getByRole("searchbox")).toHaveFocus();
    });
  });

  describe("Platform Detection", () => {
    it("detects platform for keyboard shortcut", () => {
      render(<SearchBar />);
      // Should render either Mac or Windows/Linux shortcut
      const shortcut = screen.queryByText(/⌘K|Ctrl\+K/);
      expect(shortcut).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty search submission", async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      render(<SearchBar onSearch={handleSearch} />);

      await user.keyboard("{Enter}");

      expect(handleSearch).toHaveBeenCalledWith("");
    });

    it("handles long search queries", async () => {
      const user = userEvent.setup();
      const longQuery = "a".repeat(500);
      render(<SearchBar />);

      const input = screen.getByRole("searchbox") as HTMLInputElement;
      await user.type(input, longQuery);

      expect(input.value).toBe(longQuery);
    });

    it("handles special characters in search", async () => {
      const user = userEvent.setup();
      render(<SearchBar />);

      const input = screen.getByRole("searchbox") as HTMLInputElement;
      await user.type(input, "!@#$%^&*()");

      expect(input.value).toBe("!@#$%^&*()");
    });

    it("handles rapid typing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<SearchBar onChange={handleChange} />);

      await user.type(screen.getByRole("searchbox"), "fast");

      expect(handleChange).toHaveBeenCalled();
    });

    it("clears value on new search", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      let value = "";

      const { rerender } = render(
        <SearchBar
          value={value}
          onChange={(query) => {
            value = query;
            handleChange(query);
          }}
        />,
      );

      await user.type(screen.getByRole("searchbox"), "first");
      rerender(<SearchBar value="first" onChange={handleChange} />);

      await user.clear(screen.getByRole("searchbox"));
      rerender(<SearchBar value="" onChange={handleChange} />);

      expect(screen.getByRole("searchbox")).toHaveValue("");
    });
  });

  describe("Form Integration", () => {
    it("works within a form", () => {
      render(
        <form>
          <SearchBar />
        </form>,
      );
      expect(screen.getByRole("search")).toBeInTheDocument();
    });

    it("submits parent form on Enter", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <SearchBar />
        </form>,
      );

      await user.type(screen.getByRole("searchbox"), "test");
      await user.keyboard("{Enter}");

      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe("Value Persistence", () => {
    it("maintains value across re-renders", () => {
      const { rerender } = render(<SearchBar value="initial" />);

      rerender(<SearchBar value="initial" />);

      expect(screen.getByRole("searchbox")).toHaveValue("initial");
    });

    it("updates when value prop changes", () => {
      const { rerender } = render(<SearchBar value="first" />);

      rerender(<SearchBar value="second" />);

      expect(screen.getByRole("searchbox")).toHaveValue("second");
    });
  });

  describe("Click Behavior", () => {
    it("calls onClick for command palette trigger", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<SearchBar onClick={handleClick} readOnly />);

      await user.click(screen.getByRole("searchbox"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick in normal mode", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<SearchBar onClick={handleClick} />);

      await user.click(screen.getByRole("searchbox"));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Input Type", () => {
    it("renders with type search", () => {
      render(<SearchBar />);
      expect(screen.getByRole("searchbox")).toHaveAttribute("type", "search");
    });
  });
});
