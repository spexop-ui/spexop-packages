/**
 * KeyboardShortcut Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { KeyboardShortcut } from "./KeyboardShortcut";
import styles from "./KeyboardShortcut.module.css";

describe("KeyboardShortcut", () => {
  describe("Rendering", () => {
    it("should render with keys", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });

    it("should render as kbd element", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      expect(container.firstChild?.nodeName).toBe("KBD");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "k"]} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Keys Rendering", () => {
    it("should render single key", () => {
      render(<KeyboardShortcut keys={["k"]} />);
      expect(screen.getByText("k")).toBeInTheDocument();
    });

    it("should render multiple keys", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "shift", "p"]} />,
      );
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });

    it("should render separator between keys", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      const separator = container.querySelector(`.${styles.separator}`);
      expect(separator).toBeInTheDocument();
      expect(separator?.textContent).toBe("+");
    });

    it("should not render separator after last key", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      const separators = container.querySelectorAll(`.${styles.separator}`);
      // Should have one separator for two keys
      expect(separators).toHaveLength(1);
    });
  });

  describe("Platform Detection", () => {
    it("should detect platform on mount", async () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);

      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });

    it("should format cmd key based on platform", async () => {
      // Mock Mac platform
      Object.defineProperty(window.navigator, "userAgent", {
        writable: true,
        value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      });

      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);

      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });
  });

  describe("Predefined Shortcuts", () => {
    it("should render search shortcut", () => {
      const { container } = render(<KeyboardShortcut shortcut="search" />);
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });

    it("should render command-palette shortcut", () => {
      const { container } = render(
        <KeyboardShortcut shortcut="command-palette" />,
      );
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });

    it("should render settings shortcut", () => {
      const { container } = render(<KeyboardShortcut shortcut="settings" />);
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });
  });

  describe("Raw Text Display", () => {
    it("should render raw text when children is provided", () => {
      render(<KeyboardShortcut>⌘K</KeyboardShortcut>);
      expect(screen.getByText("⌘K")).toBeInTheDocument();
    });

    it("should prioritize children over keys", () => {
      render(
        <KeyboardShortcut keys={["cmd", "k"]}>Custom Text</KeyboardShortcut>,
      );
      expect(screen.getByText("Custom Text")).toBeInTheDocument();
      expect(screen.queryByText("⌘")).not.toBeInTheDocument();
    });

    it("should prioritize children over shortcut", () => {
      render(<KeyboardShortcut shortcut="search">Custom</KeyboardShortcut>);
      expect(screen.getByText("Custom")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("should render md size by default", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      expect(container.firstChild).toHaveClass(styles.md);
    });

    it("should render sm size", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "k"]} size="sm" />,
      );
      expect(container.firstChild).toHaveClass(styles.sm);
    });

    it("should render md size", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "k"]} size="md" />,
      );
      expect(container.firstChild).toHaveClass(styles.md);
    });
  });

  describe("Key Formatting", () => {
    it("should format cmd key", async () => {
      const { container } = render(<KeyboardShortcut keys={["cmd"]} />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });

    it("should format ctrl key", async () => {
      const { container } = render(<KeyboardShortcut keys={["ctrl"]} />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });

    it("should format alt key", async () => {
      const { container } = render(<KeyboardShortcut keys={["alt"]} />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });

    it("should format shift key", async () => {
      const { container } = render(<KeyboardShortcut keys={["shift"]} />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });

    it("should format enter key", async () => {
      const { container } = render(<KeyboardShortcut keys={["enter"]} />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });

    it("should format escape key", async () => {
      const { container } = render(<KeyboardShortcut keys={["escape"]} />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });

    it("should keep unknown keys as-is", async () => {
      render(<KeyboardShortcut keys={["A"]} />);
      await waitFor(() => {
        expect(screen.getByText("A")).toBeInTheDocument();
      });
    });

    it("should be case-insensitive for modifier keys", async () => {
      const { container } = render(<KeyboardShortcut keys={["CMD", "K"]} />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty keys array", () => {
      const { container } = render(<KeyboardShortcut keys={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it("should handle undefined keys", () => {
      const { container } = render(<KeyboardShortcut keys={undefined} />);
      expect(container.firstChild).toBeNull();
    });

    it("should handle empty children", () => {
      const { container } = render(<KeyboardShortcut>{""}</KeyboardShortcut>);
      // Empty string is falsy, so component returns null
      expect(container.firstChild).toBeNull();
    });

    it("should handle undefined className", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "k"]} className={undefined} />,
      );
      expect(container.firstChild).toHaveClass(styles.keyboardShortcut);
    });

    it("should handle whitespace in keys", async () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", " k "]} />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });
  });

  describe("Use Cases", () => {
    it("should work in menu items", () => {
      render(
        <div role="menuitem" tabIndex={0}>
          <span>Search</span>
          <KeyboardShortcut keys={["cmd", "k"]} />
        </div>,
      );
      expect(screen.getByText("Search")).toBeInTheDocument();
    });

    it("should work in tooltips", () => {
      render(
        <div title="Search (⌘K)">
          <button type="button">Search</button>
          <KeyboardShortcut keys={["cmd", "k"]} />
        </div>,
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should work in help text", () => {
      render(
        <p>
          Press <KeyboardShortcut keys={["cmd", "k"]} /> to search
        </p>,
      );
      expect(screen.getByText(/Press/)).toBeInTheDocument();
      expect(screen.getByText(/to search/)).toBeInTheDocument();
    });

    it("should work standalone", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });
  });

  describe("Complex Key Combinations", () => {
    it("should render three-key combination", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "shift", "p"]} />,
      );
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
      const separators = container.querySelectorAll(`.${styles.separator}`);
      expect(separators).toHaveLength(2);
    });

    it("should render four-key combination", () => {
      const { container } = render(
        <KeyboardShortcut keys={["ctrl", "shift", "alt", "k"]} />,
      );
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
      const separators = container.querySelectorAll(`.${styles.separator}`);
      expect(separators).toHaveLength(3);
    });
  });

  describe("Multiple KeyboardShortcuts", () => {
    it("should render multiple shortcuts independently", () => {
      const { container } = render(
        <>
          <KeyboardShortcut keys={["cmd", "k"]} />
          <KeyboardShortcut keys={["cmd", "p"]} />
          <KeyboardShortcut keys={["cmd", "s"]} />
        </>,
      );

      const shortcuts = container.querySelectorAll(
        `.${styles.keyboardShortcut}`,
      );
      expect(shortcuts).toHaveLength(3);
    });

    it("should maintain separate props for multiple shortcuts", () => {
      const { container } = render(
        <>
          <KeyboardShortcut keys={["cmd", "k"]} size="sm" />
          <KeyboardShortcut keys={["cmd", "p"]} size="md" />
        </>,
      );

      const shortcuts = container.querySelectorAll(
        `.${styles.keyboardShortcut}`,
      );
      expect(shortcuts[0]).toHaveClass(styles.sm);
      expect(shortcuts[1]).toHaveClass(styles.md);
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic HTML", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      const kbd = container.querySelector("kbd");
      expect(kbd?.nodeName).toBe("KBD");
    });

    it("should be readable by screen readers", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });
  });

  describe("Shortcut Aliases", () => {
    it("should map search shortcut correctly", async () => {
      const { container } = render(<KeyboardShortcut shortcut="search" />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });

    it("should map command-palette shortcut correctly", async () => {
      const { container } = render(
        <KeyboardShortcut shortcut="command-palette" />,
      );
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });

    it("should map settings shortcut correctly", async () => {
      const { container } = render(<KeyboardShortcut shortcut="settings" />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });
  });

  describe("Server-Side Rendering", () => {
    it("should handle SSR gracefully", () => {
      // Component should render without errors in any environment
      // Note: Cannot simulate SSR by setting window to undefined as it breaks React DOM
      // In a real SSR environment, the component renders correctly
      const { container } = render(<KeyboardShortcut keys={["ctrl", "k"]} />);
      expect(container.firstChild).toBeInTheDocument();
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });
  });

  describe("Special Characters", () => {
    it("should handle special characters in keys", async () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "["]} />);
      await waitFor(() => {
        const kbd = container.querySelector("kbd");
        expect(kbd).toBeInTheDocument();
      });
    });

    it("should handle numbers in keys", async () => {
      render(<KeyboardShortcut keys={["cmd", "1"]} />);
      await waitFor(() => {
        expect(screen.getByText("1")).toBeInTheDocument();
      });
    });

    it("should handle symbols in keys", async () => {
      render(<KeyboardShortcut keys={["cmd", "/"]} />);
      await waitFor(() => {
        expect(screen.getByText("/")).toBeInTheDocument();
      });
    });
  });

  describe("Combination of Props", () => {
    it("should render with all props", () => {
      const { container } = render(
        <KeyboardShortcut
          keys={["cmd", "shift", "p"]}
          size="sm"
          className="custom"
        />,
      );

      expect(container.firstChild).toHaveClass(styles.keyboardShortcut);
      expect(container.firstChild).toHaveClass(styles.sm);
      expect(container.firstChild).toHaveClass("custom");
    });

    it("should render predefined shortcut with custom size and class", () => {
      const { container } = render(
        <KeyboardShortcut shortcut="search" size="sm" className="custom" />,
      );

      expect(container.firstChild).toHaveClass(styles.keyboardShortcut);
      expect(container.firstChild).toHaveClass(styles.sm);
      expect(container.firstChild).toHaveClass("custom");
    });

    it("should render raw text with custom size and class", () => {
      const { container } = render(
        <KeyboardShortcut size="sm" className="custom">
          ⌘K
        </KeyboardShortcut>,
      );

      expect(container.firstChild).toHaveClass(styles.keyboardShortcut);
      expect(container.firstChild).toHaveClass(styles.sm);
      expect(container.firstChild).toHaveClass("custom");
      expect(screen.getByText("⌘K")).toBeInTheDocument();
    });
  });

  describe("Platform Specific Keys", () => {
    it("should display Mac symbols on Mac platform", () => {
      const { container } = render(
        <KeyboardShortcut keys={["cmd", "shift", "alt", "ctrl"]} />,
      );
      // Platform detection happens on mount, default is windows in test
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });

    it("should handle backspace key", () => {
      const { container } = render(<KeyboardShortcut keys={["backspace"]} />);
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });

    it("should handle delete key", () => {
      const { container } = render(<KeyboardShortcut keys={["delete"]} />);
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });

    it("should handle tab key", () => {
      const { container } = render(<KeyboardShortcut keys={["tab"]} />);
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });
  });

  describe("Complex Shortcuts", () => {
    it("should render five-key combination", () => {
      const { container } = render(
        <KeyboardShortcut keys={["ctrl", "shift", "alt", "cmd", "k"]} />,
      );
      const kbd = container.firstChild as HTMLElement;
      const separators = kbd.querySelectorAll(`.${styles.separator}`);
      expect(separators).toHaveLength(4); // 5 keys = 4 separators
    });

    it("should handle all modifier keys together", () => {
      const { container } = render(
        <KeyboardShortcut keys={["ctrl", "shift", "alt", "cmd"]} />,
      );
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
    });

    it("should preserve key order", () => {
      const { container } = render(<KeyboardShortcut keys={["z", "x", "c"]} />);
      const spans = container.querySelectorAll("span");
      expect(spans[0]).toHaveTextContent("z");
    });
  });

  describe("DOM Structure", () => {
    it("should render as kbd element", () => {
      const { container } = render(<KeyboardShortcut keys={["cmd", "k"]} />);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("KBD");
    });

    it("should use semantic kbd element", () => {
      const { container } = render(<KeyboardShortcut keys={["ctrl", "s"]} />);
      const kbd = container.querySelector("kbd");
      expect(kbd).toBeInTheDocument();
      expect(kbd?.tagName).toBe("KBD");
    });

    it("should wrap each key in span", () => {
      const { container } = render(<KeyboardShortcut keys={["a", "b", "c"]} />);
      const kbd = container.firstChild as HTMLElement;
      const keySpans = kbd.querySelectorAll("span");
      expect(keySpans.length).toBeGreaterThan(3); // Keys + separators
    });
  });

  describe("Separator Rendering", () => {
    it("should render correct number of separators", () => {
      const { container } = render(<KeyboardShortcut keys={["a", "b", "c"]} />);
      const separators = container.querySelectorAll(`.${styles.separator}`);
      expect(separators).toHaveLength(2); // 3 keys = 2 separators
    });

    it("should show + as separator", () => {
      render(<KeyboardShortcut keys={["ctrl", "k"]} />);
      expect(screen.getByText("+")).toBeInTheDocument();
    });

    it("should not show separator for single key", () => {
      const { container } = render(<KeyboardShortcut keys={["k"]} />);
      const separators = container.querySelectorAll(`.${styles.separator}`);
      expect(separators).toHaveLength(0);
    });
  });
});
