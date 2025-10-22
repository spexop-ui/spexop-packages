/**
 * TopBar Component Tests
 *
 * Tests for TopBar component covering:
 * - Rendering logo and buttons
 * - Click handlers for all buttons
 * - Theme icon switching
 * - Mobile menu button
 * - GitHub link behavior
 * - ARIA attributes
 * - Keyboard navigation
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

/// <reference types="@testing-library/jest-dom" />

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { TopBar } from "./TopBar.js";
import styles from "./TopBar.module.css";

describe("TopBar", () => {
  describe("Rendering", () => {
    it("renders with default logo text", () => {
      render(<TopBar />);

      expect(screen.getByText("Spexop")).toBeInTheDocument();
    });

    it("renders with custom logo text", () => {
      render(<TopBar logoText="My App" />);

      expect(screen.getByText("My App")).toBeInTheDocument();
    });

    it("renders as a header element", () => {
      const { container } = render(<TopBar />);

      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
    });

    it("renders logo icon", () => {
      const { container } = render(<TopBar logoText="Test" />);

      const logoIcon = container.querySelector(".logoIcon");
      expect(logoIcon).toBeInTheDocument();
      expect(logoIcon?.textContent).toBe("S");
    });
  });

  describe("Logo Click", () => {
    it("renders logo as a link", () => {
      render(<TopBar logoText="Home" />);

      const logo = screen.getByRole("link", { name: /home - home/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("href", "/");
    });

    it("calls onLogoClick when logo is clicked", async () => {
      const user = userEvent.setup();
      const handleLogoClick = vi.fn();

      render(<TopBar logoText="App" onLogoClick={handleLogoClick} />);

      const logo = screen.getByRole("link", { name: /app - home/i });
      await user.click(logo);

      expect(handleLogoClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Search Button", () => {
    it("renders search button when onSearchClick is provided", () => {
      render(<TopBar onSearchClick={vi.fn()} />);

      const searchButton = screen.getByRole("button", { name: "Search" });
      expect(searchButton).toBeInTheDocument();
    });

    it("does not render search button when onSearchClick is not provided", () => {
      render(<TopBar />);

      const searchButton = screen.queryByRole("button", { name: "Search" });
      expect(searchButton).not.toBeInTheDocument();
    });

    it("calls onSearchClick when search button is clicked", async () => {
      const user = userEvent.setup();
      const handleSearchClick = vi.fn();

      render(<TopBar onSearchClick={handleSearchClick} />);

      const searchButton = screen.getByRole("button", { name: "Search" });
      await user.click(searchButton);

      expect(handleSearchClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Theme Toggle", () => {
    it("renders theme toggle button when onThemeToggle is provided", () => {
      render(<TopBar onThemeToggle={vi.fn()} />);

      const themeButton = screen.getByRole("button", {
        name: /toggle theme/i,
      });
      expect(themeButton).toBeInTheDocument();
    });

    it("does not render theme toggle when onThemeToggle is not provided", () => {
      render(<TopBar />);

      const themeButton = screen.queryByRole("button", {
        name: /toggle theme/i,
      });
      expect(themeButton).not.toBeInTheDocument();
    });

    it("calls onThemeToggle when theme button is clicked", async () => {
      const user = userEvent.setup();
      const handleThemeToggle = vi.fn();

      render(<TopBar onThemeToggle={handleThemeToggle} />);

      const themeButton = screen.getByRole("button", {
        name: /toggle theme/i,
      });
      await user.click(themeButton);

      expect(handleThemeToggle).toHaveBeenCalledTimes(1);
    });

    it("shows correct theme in aria-label", () => {
      render(<TopBar onThemeToggle={vi.fn()} currentTheme="dark" />);

      const themeButton = screen.getByRole("button", {
        name: "Toggle theme (current: dark)",
      });
      expect(themeButton).toBeInTheDocument();
    });
  });

  describe("GitHub Link", () => {
    it("renders GitHub link by default", () => {
      const { container } = render(<TopBar />);

      const githubLink = screen.getByRole("link", {
        name: "GitHub repository",
      });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute(
        "href",
        "https://github.com/spexop-ui",
      );
    });

    it("renders GitHub link with custom URL", () => {
      render(<TopBar gitHubUrl="https://github.com/custom/repo" />);

      const githubLink = screen.getByRole("link", {
        name: "GitHub repository",
      });
      expect(githubLink).toHaveAttribute(
        "href",
        "https://github.com/custom/repo",
      );
    });

    it("renders GitHub button when onGitHubClick is provided", () => {
      render(<TopBar onGitHubClick={vi.fn()} />);

      const githubButton = screen.getByRole("button", {
        name: "GitHub repository",
      });
      expect(githubButton).toBeInTheDocument();
    });

    it("calls onGitHubClick when GitHub button is clicked", async () => {
      const user = userEvent.setup();
      const handleGitHubClick = vi.fn();

      render(<TopBar onGitHubClick={handleGitHubClick} />);

      const githubButton = screen.getByRole("button", {
        name: "GitHub repository",
      });
      await user.click(githubButton);

      expect(handleGitHubClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Settings Button", () => {
    it("renders settings button when onSettingsClick is provided", () => {
      render(<TopBar onSettingsClick={vi.fn()} />);

      const settingsButton = screen.getByRole("button", {
        name: "Open settings",
      });
      expect(settingsButton).toBeInTheDocument();
    });

    it("does not render settings button when onSettingsClick is not provided", () => {
      render(<TopBar />);

      const settingsButton = screen.queryByRole("button", {
        name: "Open settings",
      });
      expect(settingsButton).not.toBeInTheDocument();
    });

    it("calls onSettingsClick when settings button is clicked", async () => {
      const user = userEvent.setup();
      const handleSettingsClick = vi.fn();

      render(<TopBar onSettingsClick={handleSettingsClick} />);

      const settingsButton = screen.getByRole("button", {
        name: "Open settings",
      });
      await user.click(settingsButton);

      expect(handleSettingsClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Mobile Menu Button", () => {
    it("renders mobile menu button when onMobileMenuClick is provided", () => {
      render(<TopBar onMobileMenuClick={vi.fn()} />);

      const menuButton = screen.getByRole("button", { name: "Toggle sidebar" });
      expect(menuButton).toBeInTheDocument();
    });

    it("does not render mobile menu button when onMobileMenuClick is not provided", () => {
      render(<TopBar />);

      const menuButton = screen.queryByRole("button", {
        name: "Toggle sidebar",
      });
      expect(menuButton).not.toBeInTheDocument();
    });

    it("does not render mobile menu button when showMobileMenu is false", () => {
      render(<TopBar onMobileMenuClick={vi.fn()} showMobileMenu={false} />);

      const menuButton = screen.queryByRole("button", {
        name: "Toggle sidebar",
      });
      expect(menuButton).not.toBeInTheDocument();
    });

    it("calls onMobileMenuClick when menu button is clicked", async () => {
      const user = userEvent.setup();
      const handleMenuClick = vi.fn();

      render(<TopBar onMobileMenuClick={handleMenuClick} />);

      const menuButton = screen.getByRole("button", { name: "Toggle sidebar" });
      await user.click(menuButton);

      expect(handleMenuClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Keyboard Navigation", () => {
    it("all buttons are keyboard accessible", async () => {
      const user = userEvent.setup();
      render(
        <TopBar
          onSearchClick={vi.fn()}
          onThemeToggle={vi.fn()}
          onSettingsClick={vi.fn()}
          onMobileMenuClick={vi.fn()}
        />,
      );

      // Tab through interactive elements
      await user.tab(); // Logo
      const logo = screen.getByRole("link", { name: /spexop - home/i });
      expect(logo).toHaveFocus();

      await user.tab(); // Mobile menu
      const menuButton = screen.getByRole("button", { name: "Toggle sidebar" });
      expect(menuButton).toHaveFocus();

      await user.tab(); // Search
      const searchButton = screen.getByRole("button", { name: "Search" });
      expect(searchButton).toHaveFocus();

      await user.tab(); // Theme
      const themeButton = screen.getByRole("button", { name: /toggle theme/i });
      expect(themeButton).toHaveFocus();
    });

    it("buttons have correct tabindex", () => {
      render(
        <TopBar
          onSearchClick={vi.fn()}
          onThemeToggle={vi.fn()}
          onSettingsClick={vi.fn()}
        />,
      );

      const searchButton = screen.getByRole("button", { name: "Search" });
      const themeButton = screen.getByRole("button", { name: /toggle theme/i });
      const settingsButton = screen.getByRole("button", {
        name: "Open settings",
      });

      expect(searchButton).toHaveAttribute("tabindex", "0");
      expect(themeButton).toHaveAttribute("tabindex", "0");
      expect(settingsButton).toHaveAttribute("tabindex", "0");
    });
  });

  describe("Custom Class Name", () => {
    it("applies custom className", () => {
      const { container } = render(<TopBar className="custom-topbar" />);

      const header = container.querySelector("header");
      expect(header).toHaveClass("custom-topbar");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic HTML structure", () => {
      const { container } = render(<TopBar />);

      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
      expect(header?.tagName).toBe("HEADER");
    });

    it("logo has accessible name", () => {
      render(<TopBar logoText="My Application" />);

      const logo = screen.getByRole("link", {
        name: "My Application - Home",
      });
      expect(logo).toBeInTheDocument();
    });

    it("buttons have accessible labels", () => {
      render(
        <TopBar
          onSearchClick={vi.fn()}
          onThemeToggle={vi.fn()}
          onSettingsClick={vi.fn()}
          currentTheme="light"
        />,
      );

      expect(screen.getByLabelText("Search")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Toggle theme (current: light)"),
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Open settings")).toBeInTheDocument();
    });

    it("GitHub link opens in new tab with security attributes", () => {
      render(<TopBar />);

      const githubLink = screen.getByRole("link", {
        name: "GitHub repository",
      });
      expect(githubLink).toHaveAttribute("target", "_blank");
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Edge Cases", () => {
    it("renders with empty logo text", () => {
      render(<TopBar logoText="" />);

      const { container } = render(<TopBar logoText="" />);
      const logo = container.querySelector(".logo");
      expect(logo).toBeInTheDocument();
    });

    it("handles all callbacks being undefined", () => {
      const { container } = render(<TopBar />);

      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
    });
  });
});
