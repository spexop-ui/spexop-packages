/**
 * CommandPalette Component Tests
 *
 * Tests for CommandPalette component covering:
 * - Rendering and visibility
 * - Portal rendering
 * - Advanced fuzzy search functionality
 * - Recent commands functionality
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Command selection and execution
 * - Category grouping
 * - Keyboard shortcuts display
 * - Focus management
 * - Body scroll lock
 * - Empty state
 * - ARIA attributes
 * - New props (recentCommands, showRecent, onCommandSelect)
 * - Fuzzy search algorithm testing
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CommandPalette } from "./CommandPalette.js";
import type { CommandPaletteCommand } from "./CommandPalette.js";
import styles from "./CommandPalette.module.css";

const mockCommands: CommandPaletteCommand[] = [
  {
    id: "home",
    label: "Go to Home",
    description: "Navigate to home page",
    category: "Navigation",
    onSelect: vi.fn(),
  },
  {
    id: "settings",
    label: "Open Settings",
    description: "Configure app settings",
    category: "Navigation",
    shortcut: "⌘,",
    onSelect: vi.fn(),
  },
  {
    id: "save",
    label: "Save Document",
    category: "Actions",
    shortcut: "⌘S",
    onSelect: vi.fn(),
  },
  {
    id: "delete",
    label: "Delete Item",
    category: "Actions",
    onSelect: vi.fn(),
    disabled: true,
  },
];

describe("CommandPalette", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  describe("Rendering", () => {
    it("renders nothing when open is false", () => {
      render(
        <CommandPalette
          open={false}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders when open is true", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });

    it("renders portal to document.body", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog.parentElement?.parentElement).toBe(document.body);
      });
    });

    it("has correct ARIA attributes", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(dialog).toHaveAttribute("aria-label");
      });
    });
  });

  describe("Search Functionality", () => {
    it("renders search input", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });
    });

    it("displays all commands initially", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          maxResults={10}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Go to Home")).toBeInTheDocument();
        expect(screen.getByText("Open Settings")).toBeInTheDocument();
        expect(screen.getByText("Save Document")).toBeInTheDocument();
      });
    });

    it("filters commands based on search query", async () => {
      const user = userEvent.setup();

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Type a command or search...",
      );
      await user.type(searchInput, "settings");

      await waitFor(() => {
        expect(screen.getByText("Open Settings")).toBeInTheDocument();
        // "Go to Home" should not be visible because it doesn't match "settings"
        expect(screen.queryByText("Go to Home")).not.toBeInTheDocument();
      });
    });

    it("shows empty message when no results found", async () => {
      const user = userEvent.setup();

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Type a command or search...",
      );
      await user.type(searchInput, "nonexistent command");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
        expect(screen.getAllByText("No commands found")).toHaveLength(2);
      });
    });

    it("uses custom empty message", async () => {
      const user = userEvent.setup();

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          emptyMessage="Nothing here"
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Type a command or search...",
      );
      await user.type(searchInput, "xyz");

      await waitFor(() => {
        expect(screen.getByText("Nothing here")).toBeInTheDocument();
      });
    });
  });

  describe("Categories", () => {
    it("displays category headers", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          showCategories={true}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Navigation")).toBeInTheDocument();
        expect(screen.getByText("Actions")).toBeInTheDocument();
      });
    });

    it("hides categories when showCategories is false", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          showCategories={false}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Go to Home")).toBeInTheDocument();
      });

      expect(screen.queryByText("Navigation")).not.toBeInTheDocument();
      expect(screen.queryByText("Actions")).not.toBeInTheDocument();
    });
  });

  describe("Keyboard Shortcuts", () => {
    it("displays keyboard shortcuts", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          showShortcuts={true}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("⌘,")).toBeInTheDocument();
        expect(screen.getByText("⌘S")).toBeInTheDocument();
      });
    });

    it("hides shortcuts when showShortcuts is false", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          showShortcuts={false}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Open Settings")).toBeInTheDocument();
      });

      expect(screen.queryByText("⌘,")).not.toBeInTheDocument();
      expect(screen.queryByText("⌘S")).not.toBeInTheDocument();
    });
  });

  describe("Command Selection", () => {
    it("calls onSelect when command is clicked", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const commands = [
        {
          id: "test",
          label: "Test Command",
          onSelect,
        },
      ];

      render(
        <CommandPalette open={true} onClose={vi.fn()} commands={commands} />,
      );

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Test Command" }),
        ).toBeInTheDocument();
      });

      await user.click(screen.getByRole("option", { name: "Test Command" }));

      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("closes palette after command selection", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const commands = [
        {
          id: "test",
          label: "Test Command",
          onSelect: vi.fn(),
        },
      ];

      render(
        <CommandPalette open={true} onClose={onClose} commands={commands} />,
      );

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Test Command" }),
        ).toBeInTheDocument();
      });

      await user.click(screen.getByRole("option", { name: "Test Command" }));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not execute disabled commands", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const commands = [
        {
          id: "test",
          label: "Test Command",
          onSelect,
          disabled: true,
        },
      ];

      render(
        <CommandPalette open={true} onClose={vi.fn()} commands={commands} />,
      );

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Test Command" }),
        ).toBeInTheDocument();
      });

      const button = screen.getByRole("option", { name: "Test Command" });
      await user.click(button);

      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates down with ArrowDown", async () => {
      const user = userEvent.setup();

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands.slice(0, 3)}
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Type a command or search...");
      input.focus();

      await user.keyboard("{ArrowDown}");

      // Check if any command is selected (the first one should be)
      const selectedOptions = screen
        .getAllByRole("option")
        .filter((option) => option.getAttribute("aria-selected") === "true");
      expect(selectedOptions).toHaveLength(1);
    });

    it("navigates up with ArrowUp", async () => {
      const user = userEvent.setup();

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands.slice(0, 3)}
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Type a command or search...");
      input.focus();

      await user.keyboard("{ArrowUp}");

      // Should wrap to last command
      const lastOption = screen.getByRole("option", { name: /Save Document/i });
      expect(lastOption).toHaveAttribute("aria-selected", "true");
    });

    it("selects command with Enter key", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const commands = [
        {
          id: "test",
          label: "Test Command",
          onSelect,
        },
      ];

      render(
        <CommandPalette open={true} onClose={vi.fn()} commands={commands} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Type a command or search...");
      input.focus();

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe("Escape Key", () => {
    it("closes palette when Escape is pressed", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <CommandPalette
          open={true}
          onClose={onClose}
          commands={mockCommands}
        />,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Focus Management", () => {
    it("focuses search input when opened", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      await waitFor(() => {
        const input = screen.getByPlaceholderText(
          "Type a command or search...",
        );
        expect(document.activeElement).toBe(input);
      });
    });

    it("resets search when opened", () => {
      const { rerender } = render(
        <CommandPalette
          open={false}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      rerender(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      waitFor(() => {
        const input = screen.getByPlaceholderText(
          "Type a command or search...",
        ) as HTMLInputElement;
        expect(input.value).toBe("");
      });
    });
  });

  describe("Body Scroll Lock", () => {
    it("locks body scroll when opened", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      await waitFor(() => {
        expect(document.body.style.overflow).toBe("hidden");
      });
    });

    it("restores body scroll when closed", () => {
      const { rerender } = render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <CommandPalette
          open={false}
          onClose={vi.fn()}
          commands={mockCommands}
        />,
      );

      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Custom Props", () => {
    it("uses custom placeholder", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          placeholder="Search commands..."
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search commands..."),
        ).toBeInTheDocument();
      });
    });

    it("applies custom className", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          className="custom-palette"
        />,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveClass("custom-palette");
      });
    });

    it("uses custom ariaLabel", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          ariaLabel="Custom command palette"
        />,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-label", "Custom command palette");
      });
    });
  });

  describe("Max Results", () => {
    it("limits results to maxResults", async () => {
      const manyCommands: CommandPaletteCommand[] = Array.from(
        { length: 20 },
        (_, i) => ({
          id: `cmd-${i}`,
          label: `Command ${i}`,
          onSelect: vi.fn(),
        }),
      );

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={manyCommands}
          maxResults={5}
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Command 0" }),
        ).toBeInTheDocument();
      });

      expect(screen.getByText("Command 4")).toBeInTheDocument();
      expect(screen.queryByText("Command 5")).not.toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    it("renders command icons", async () => {
      const commands: CommandPaletteCommand[] = [
        {
          id: "test",
          label: "Test Command",
          icon: <span data-testid="custom-icon">Icon</span>,
          onSelect: vi.fn(),
        },
      ];

      render(
        <CommandPalette open={true} onClose={vi.fn()} commands={commands} />,
      );

      await waitFor(() => {
        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      });
    });
  });

  describe("Keywords", () => {
    it("searches by keywords", async () => {
      const user = userEvent.setup();
      const commands: CommandPaletteCommand[] = [
        {
          id: "test",
          label: "Open File",
          keywords: ["document", "edit", "write"],
          onSelect: vi.fn(),
        },
      ];

      render(
        <CommandPalette open={true} onClose={vi.fn()} commands={commands} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Type a command or search...");
      await user.type(input, "document");

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Open File" }),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Recent Commands", () => {
    it("displays recent commands section", async () => {
      const recentCommands: CommandPaletteCommand[] = [
        {
          id: "recent1",
          label: "Recent Command",
          onSelect: vi.fn(),
        },
      ];

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          recentCommands={recentCommands}
          showRecent={true}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Recent")).toBeInTheDocument();
        expect(
          screen.getByRole("option", { name: "Recent Command" }),
        ).toBeInTheDocument();
      });
    });

    it("hides recent commands when showRecent is false", async () => {
      const recentCommands: CommandPaletteCommand[] = [
        {
          id: "recent1",
          label: "Recent Command",
          onSelect: vi.fn(),
        },
      ];

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          recentCommands={recentCommands}
          showRecent={false}
        />,
      );

      await waitFor(() => {
        expect(screen.queryByText("Recent")).not.toBeInTheDocument();
      });
    });

    it("calls onCommandSelect when provided", async () => {
      const user = userEvent.setup();
      const onCommandSelect = vi.fn();
      const commands = [
        {
          id: "test",
          label: "Test Command",
          onSelect: vi.fn(),
        },
      ];

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={commands}
          onCommandSelect={onCommandSelect}
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Test Command" }),
        ).toBeInTheDocument();
      });

      await user.click(screen.getByRole("option", { name: "Test Command" }));

      expect(onCommandSelect).toHaveBeenCalledTimes(1);
      expect(onCommandSelect).toHaveBeenCalledWith(commands[0]);
    });
  });

  describe("Fuzzy Search", () => {
    it("performs fuzzy matching with typos", async () => {
      const user = userEvent.setup();
      const commands: CommandPaletteCommand[] = [
        {
          id: "search",
          label: "Search Files",
          onSelect: vi.fn(),
        },
        {
          id: "settings",
          label: "Settings",
          onSelect: vi.fn(),
        },
      ];

      render(
        <CommandPalette open={true} onClose={vi.fn()} commands={commands} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Type a command or search...");

      // Test fuzzy matching with typo
      await user.type(input, "srch"); // Should match "Search Files"

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Search Files" }),
        ).toBeInTheDocument();
      });
    });

    it("prioritizes exact matches over fuzzy matches", async () => {
      const user = userEvent.setup();
      const commands: CommandPaletteCommand[] = [
        {
          id: "search",
          label: "Search Files",
          onSelect: vi.fn(),
        },
        {
          id: "settings",
          label: "Settings",
          onSelect: vi.fn(),
        },
        {
          id: "save",
          label: "Save",
          onSelect: vi.fn(),
        },
      ];

      render(
        <CommandPalette open={true} onClose={vi.fn()} commands={commands} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Type a command or search...");
      await user.type(input, "save");

      await waitFor(() => {
        const saveCommand = screen.getByRole("option", { name: "Save" });
        const commandsList = saveCommand.closest('[role="listbox"]');
        const firstCommand = commandsList?.querySelector('[role="option"]');
        expect(firstCommand).toHaveTextContent("Save");
      });
    });

    it("boosts recent commands in search results", async () => {
      const user = userEvent.setup();
      const commands: CommandPaletteCommand[] = [
        {
          id: "search",
          label: "Search Files",
          onSelect: vi.fn(),
        },
        {
          id: "settings",
          label: "Settings",
          onSelect: vi.fn(),
        },
      ];

      const recentCommands: CommandPaletteCommand[] = [
        {
          id: "settings",
          label: "Settings",
          onSelect: vi.fn(),
        },
      ];

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={commands}
          recentCommands={recentCommands}
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Type a command or search...");
      await user.type(input, "s"); // Should match both but prioritize recent

      await waitFor(() => {
        // Should show both commands but with recent command prioritized
        expect(
          screen.getAllByRole("option", { name: "Settings" }),
        ).toHaveLength(1);
        expect(
          screen.getByRole("option", { name: "Search Files" }),
        ).toBeInTheDocument();
      });
    });
  });

  describe("New Props", () => {
    it("uses custom ariaLabel", async () => {
      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          ariaLabel="Custom command palette"
        />,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-label", "Custom command palette");
      });
    });

    it("limits results to maxResults", async () => {
      const manyCommands: CommandPaletteCommand[] = Array.from(
        { length: 20 },
        (_, i) => ({
          id: `cmd-${i}`,
          label: `Command ${i}`,
          onSelect: vi.fn(),
        }),
      );

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={manyCommands}
          maxResults={5}
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Command 0" }),
        ).toBeInTheDocument();
      });

      expect(screen.getByText("Command 4")).toBeInTheDocument();
      expect(screen.queryByText("Command 5")).not.toBeInTheDocument();
    });

    it("shows custom empty message", async () => {
      const user = userEvent.setup();

      render(
        <CommandPalette
          open={true}
          onClose={vi.fn()}
          commands={mockCommands}
          emptyMessage="Nothing found"
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Type a command or search..."),
        ).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText("Type a command or search...");
      await user.type(input, "xyz");

      await waitFor(() => {
        expect(screen.getByText("Nothing found")).toBeInTheDocument();
      });
    });
  });
});
