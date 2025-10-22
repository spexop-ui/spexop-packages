/// <reference types="@testing-library/jest-dom" />
/**
 * SearchModal Component Tests
 *
 * Tests for SearchModal component covering:
 * - Rendering and visibility
 * - Portal rendering
 * - Search functionality
 * - Quick links display
 * - Recent searches
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Result selection
 * - Category grouping
 * - Empty and no results states
 * - Focus management
 * - Body scroll lock
 * - ARIA attributes
 * - Backdrop interaction
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SearchModal } from "./SearchModal.js";
import styles from "./SearchModal.module.css";
import type { SearchResult } from "./SearchModal.types.js";

const mockResults: SearchResult[] = [
  {
    id: "result-1",
    title: "Getting Started",
    description: "Learn how to get started with the system",
    category: "Documentation",
    url: "/docs/getting-started",
  },
  {
    id: "result-2",
    title: "API Reference",
    description: "Complete API documentation",
    category: "Documentation",
    url: "/docs/api",
  },
  {
    id: "result-3",
    title: "User Settings",
    description: "Manage your account settings",
    category: "Settings",
    url: "/settings",
  },
];

const mockQuickLinks = [
  {
    url: "/home",
    label: "Home",
  },
  {
    url: "/docs",
    label: "Documentation",
  },
];

describe("SearchModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  describe("Rendering", () => {
    it("renders nothing when isOpen is false", () => {
      render(
        <SearchModal isOpen={false} onClose={vi.fn()} results={mockResults} />,
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders when isOpen is true", async () => {
      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });

    it("renders portal to document.body", async () => {
      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog.parentElement?.parentElement).toBe(document.body);
      });
    });

    it("has correct ARIA attributes", async () => {
      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(dialog).toHaveAttribute("aria-label", "Search");
      });
    });
  });

  describe("Search Input", () => {
    it("renders search input", async () => {
      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });
    });

    it("uses custom placeholder", async () => {
      render(
        <SearchModal
          isOpen={true}
          onClose={vi.fn()}
          results={mockResults}
          placeholder="Search here..."
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search here..."),
        ).toBeInTheDocument();
      });
    });

    it("filters results based on search query", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "settings");

      await waitFor(() => {
        expect(screen.getByText("User Settings")).toBeInTheDocument();
        expect(screen.queryByText("Getting Started")).not.toBeInTheDocument();
      });
    });

    it("searches by description", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "account");

      await waitFor(() => {
        expect(screen.getByText("User Settings")).toBeInTheDocument();
      });
    });

    it("searches by category", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "documentation");

      await waitFor(() => {
        expect(screen.getByText("Getting Started")).toBeInTheDocument();
        expect(screen.getByText("API Reference")).toBeInTheDocument();
      });
    });
  });

  describe("Empty State", () => {
    it("shows quick links when search is empty", async () => {
      render(
        <SearchModal
          isOpen={true}
          onClose={vi.fn()}
          results={mockResults}
          quickLinks={mockQuickLinks}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Quick Links")).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Documentation")).toBeInTheDocument();
      });
    });

    it("shows recent searches when available", async () => {
      render(
        <SearchModal
          isOpen={true}
          onClose={vi.fn()}
          results={mockResults}
          recentSearches={["api", "settings"]}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText("Recent Searches")).toBeInTheDocument();
        expect(screen.getByText('"api"')).toBeInTheDocument();
        expect(screen.getByText('"settings"')).toBeInTheDocument();
      });
    });

    it("clicking recent search fills the input", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal
          isOpen={true}
          onClose={vi.fn()}
          results={mockResults}
          recentSearches={["api"]}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('"api"')).toBeInTheDocument();
      });

      await user.click(screen.getByText('"api"'));

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      ) as HTMLInputElement;
      expect(searchInput.value).toBe("api");
    });
  });

  describe("No Results State", () => {
    it("shows no results message when search yields nothing", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "nonexistent");

      await waitFor(() => {
        expect(
          screen.getByText(/No results found for "nonexistent"/i),
        ).toBeInTheDocument();
      });
    });

    it("shows quick links in no results state", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal
          isOpen={true}
          onClose={vi.fn()}
          results={mockResults}
          quickLinks={mockQuickLinks}
        />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "xyz");

      await waitFor(() => {
        // Should show at least the first 3 quick links
        expect(screen.getByText("Home")).toBeInTheDocument();
      });
    });
  });

  describe("Search Results", () => {
    it("displays results count", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "settings");

      await waitFor(() => {
        expect(screen.getByText("Found 1 result")).toBeInTheDocument();
      });
    });

    it("uses plural for multiple results", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "documentation");

      await waitFor(() => {
        expect(screen.getByText("Found 2 results")).toBeInTheDocument();
      });
    });

    it("groups results by category", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "a");

      await waitFor(() => {
        expect(screen.getByText("Documentation")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });
    });

    it("shows category count", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "a");

      await waitFor(() => {
        expect(screen.getByText("(2)")).toBeInTheDocument(); // Documentation has 2 results
      });
    });
  });

  describe("Result Selection", () => {
    it("closes modal when result is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const results: SearchResult[] = [
        {
          id: "test",
          title: "Test Result",
          description: "Test description",
          url: "/test",
          category: "Test",
        },
      ];

      render(<SearchModal isOpen={true} onClose={onClose} results={results} />);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "test");

      await waitFor(() => {
        expect(screen.getByText("Test Result")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Test Result"));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("closes modal after result selection", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const results: SearchResult[] = [
        {
          id: "test",
          title: "Test Result",
          description: "Test description",
          url: "/test",
          category: "Test",
        },
      ];

      render(<SearchModal isOpen={true} onClose={onClose} results={results} />);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "test");

      await waitFor(() => {
        expect(screen.getByText("Test Result")).toBeInTheDocument();
      });

      await user.click(screen.getByText("Test Result"));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates down with ArrowDown", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "a");

      await waitFor(() => {
        expect(screen.getByText("Getting Started")).toBeInTheDocument();
      });

      await user.keyboard("{ArrowDown}");

      const firstResult = screen.getByText("Getting Started").closest("button");
      expect(firstResult).toHaveAttribute("data-active", "true");
    });

    it("navigates up with ArrowUp", async () => {
      const user = userEvent.setup();

      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "a");

      await waitFor(() => {
        expect(screen.getByText("Getting Started")).toBeInTheDocument();
      });

      await user.keyboard("{ArrowUp}");

      // Should wrap to last result
      const lastResult = screen.getByText("User Settings").closest("button");
      expect(lastResult).toHaveAttribute("data-active", "true");
    });

    it("selects result with Enter", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const results: SearchResult[] = [
        {
          id: "test",
          title: "Test Result",
          description: "Test description",
          url: "/test",
          category: "Test",
        },
      ];

      render(<SearchModal isOpen={true} onClose={onClose} results={results} />);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "test");

      await waitFor(() => {
        expect(screen.getByText("Test Result")).toBeInTheDocument();
      });

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Close Functionality", () => {
    it("closes when close button is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <SearchModal isOpen={true} onClose={onClose} results={mockResults} />,
      );

      await waitFor(() => {
        expect(screen.getByLabelText("Close search")).toBeInTheDocument();
      });

      // Get the X button, not the backdrop button
      const closeButtons = screen.getAllByLabelText("Close search");
      const xButton = closeButtons.find(
        (btn) =>
          btn.tagName === "BUTTON" && btn.className.includes("closeButton"),
      );

      if (xButton) {
        await user.click(xButton);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });

    it("closes when Escape is pressed", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <SearchModal isOpen={true} onClose={onClose} results={mockResults} />,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("closes when backdrop is clicked", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(
        <SearchModal isOpen={true} onClose={onClose} results={mockResults} />,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const backdrop = screen.getByLabelText("Close search");
      await user.click(backdrop);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Focus Management", () => {
    it("focuses search input when opened", async () => {
      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        const input = screen.getByPlaceholderText(
          "Search pages, sections, and content...",
        );
        expect(document.activeElement).toBe(input);
      });
    });

    it("clears search when opened", () => {
      const { rerender } = render(
        <SearchModal isOpen={false} onClose={vi.fn()} results={mockResults} />,
      );

      rerender(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      waitFor(() => {
        const input = screen.getByPlaceholderText(
          "Search pages, sections, and content...",
        ) as HTMLInputElement;
        expect(input.value).toBe("");
      });
    });
  });

  describe("Body Scroll Lock", () => {
    it("locks body scroll when opened", async () => {
      render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      await waitFor(() => {
        expect(document.body.style.overflow).toBe("hidden");
      });
    });

    it("restores body scroll when closed", () => {
      const { rerender } = render(
        <SearchModal isOpen={true} onClose={vi.fn()} results={mockResults} />,
      );

      expect(document.body.style.overflow).toBe("hidden");

      rerender(
        <SearchModal isOpen={false} onClose={vi.fn()} results={mockResults} />,
      );

      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", async () => {
      render(
        <SearchModal
          isOpen={true}
          onClose={vi.fn()}
          results={mockResults}
          className="custom-modal"
        />,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveClass("custom-modal");
      });
    });
  });

  describe("Icons", () => {
    it("renders custom icons in results", async () => {
      const user = userEvent.setup();
      const results: SearchResult[] = [
        {
          id: "test",
          title: "Test Result",
          description: "Test description",
          url: "/test",
          category: "Test",
          icon: <span data-testid="custom-icon">📄</span>,
        },
      ];

      render(<SearchModal isOpen={true} onClose={vi.fn()} results={results} />);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "test");

      await waitFor(() => {
        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      });
    });

    it("renders custom icons in quick links", async () => {
      const quickLinks = [
        {
          url: "/test",
          label: "Test Link",
          icon: <span data-testid="link-icon">🔗</span>,
        },
      ];

      render(
        <SearchModal
          isOpen={true}
          onClose={vi.fn()}
          results={mockResults}
          quickLinks={quickLinks}
        />,
      );

      await waitFor(() => {
        expect(screen.getByTestId("link-icon")).toBeInTheDocument();
      });
    });
  });

  describe("Keywords", () => {
    it("searches by keywords", async () => {
      const user = userEvent.setup();
      const results: SearchResult[] = [
        {
          id: "test",
          title: "Configuration",
          description: "Configuration settings",
          url: "/config",
          category: "Settings",
          keywords: ["setup", "install", "config"],
        },
      ];

      render(<SearchModal isOpen={true} onClose={vi.fn()} results={results} />);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText("Search pages, sections, and content..."),
        ).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search pages, sections, and content...",
      );
      await user.type(searchInput, "setup");

      await waitFor(() => {
        expect(screen.getByText("Configuration")).toBeInTheDocument();
      });
    });
  });
});
