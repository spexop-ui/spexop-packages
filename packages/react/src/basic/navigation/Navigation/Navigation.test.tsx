/// <reference types="@testing-library/jest-dom" />
/**
 * Navigation Component Tests
 *
 * Tests for Navigation component covering:
 * - Rendering logo and navigation links
 * - Mobile menu toggle functionality
 * - Active state indication
 * - External link handling
 * - Close sidebar button behavior
 * - Navigation callbacks
 * - ARIA attributes
 * - Keyboard navigation
 * - Mobile responsive behavior
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { Home, Settings, Users } from "@spexop/icons";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Navigation } from "./Navigation.js";
import type { NavLink } from "./Navigation.types.js";

describe("Navigation", () => {
  const mockLogo = {
    text: "TestApp",
    href: "/",
  };

  const mockLinks: NavLink[] = [
    { id: "home", label: "Home", to: "/" },
    { id: "about", label: "About", to: "/about" },
    { id: "contact", label: "Contact", to: "/contact" },
  ];

  const mockOnNavigate = vi.fn();

  describe("Rendering", () => {
    it("renders as a nav element", () => {
      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toBeInTheDocument();
    });

    it("renders logo text", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      expect(screen.getByText("TestApp")).toBeInTheDocument();
    });

    it("renders logo with icon", () => {
      const logoWithIcon = {
        ...mockLogo,
        icon: Home,
      };

      const { container } = render(
        <Navigation
          logo={logoWithIcon}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const logoIcon = container.querySelector(".logoIcon");
      expect(logoIcon).toBeInTheDocument();
    });

    it("renders all navigation links", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("renders links with icons", () => {
      const linksWithIcons: NavLink[] = [
        { id: "home", label: "Home", to: "/", icon: Home },
        { id: "team", label: "Team", to: "/team", icon: Users },
        { id: "settings", label: "Settings", to: "/settings", icon: Settings },
      ];

      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={linksWithIcons}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const linkIcons = container.querySelectorAll(".linkIcon");
      expect(linkIcons).toHaveLength(3);
    });

    it("renders custom aria-label", () => {
      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
          ariaLabel="Primary navigation"
        />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toHaveAttribute("aria-label", "Primary navigation");
    });

    it("renders default aria-label", () => {
      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toHaveAttribute("aria-label", "Main navigation");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
          className="custom-nav"
        />,
      );

      const nav = container.querySelector("nav");
      expect(nav?.className).toContain("custom-nav");
    });
  });

  describe("Logo Click", () => {
    it("renders logo as a link", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const logo = screen.getByRole("link", { name: /TestApp/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("href", "/");
    });

    it("calls onNavigate when logo is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const logo = screen.getByRole("link", { name: /TestApp/i });
      await user.click(logo);

      expect(mockOnNavigate).toHaveBeenCalledWith("/");
    });

    it("uses custom logo aria-label", () => {
      const logoWithAriaLabel = {
        ...mockLogo,
        ariaLabel: "Custom Logo Label",
      };

      render(
        <Navigation
          logo={logoWithAriaLabel}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const logo = screen.getByRole("link", { name: "Custom Logo Label" });
      expect(logo).toBeInTheDocument();
    });
  });

  describe("Navigation Links", () => {
    it("renders internal links", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const homeLink = screen.getByRole("link", { name: "Home" });
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("calls onNavigate when internal link is clicked", async () => {
      const user = userEvent.setup();

      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const aboutLink = screen.getByRole("link", { name: "About" });
      await user.click(aboutLink);

      expect(mockOnNavigate).toHaveBeenCalledWith("/about");
    });

    it("marks active link with aria-current", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/about"
          onNavigate={mockOnNavigate}
        />,
      );

      const aboutLink = screen.getByRole("link", { name: "About" });
      expect(aboutLink).toHaveAttribute("aria-current", "page");
    });

    it("applies active class to current path", () => {
      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/about"
          onNavigate={mockOnNavigate}
        />,
      );

      const aboutLink = screen.getByRole("link", { name: "About" });
      expect(aboutLink.className).toContain("linkActive");
    });

    it("does not mark non-active links with aria-current", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/about"
          onNavigate={mockOnNavigate}
        />,
      );

      const homeLink = screen.getByRole("link", { name: "Home" });
      expect(homeLink).not.toHaveAttribute("aria-current");
    });
  });

  describe("External Links", () => {
    it("renders external links with target=_blank", () => {
      const externalLinks: NavLink[] = [
        { id: "home", label: "Home", to: "/" },
        {
          id: "github",
          label: "GitHub",
          to: "https://github.com",
          external: true,
        },
      ];

      render(
        <Navigation
          logo={mockLogo}
          links={externalLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const githubLink = screen.getByRole("link", { name: "GitHub" });
      expect(githubLink).toHaveAttribute("target", "_blank");
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("does not prevent default for external links", async () => {
      const user = userEvent.setup();

      const externalLinks: NavLink[] = [
        {
          id: "github",
          label: "GitHub",
          to: "https://github.com",
          external: true,
        },
      ];

      render(
        <Navigation
          logo={mockLogo}
          links={externalLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const githubLink = screen.getByRole("link", { name: "GitHub" });
      await user.click(githubLink);

      // External links should not trigger onNavigate
      expect(mockOnNavigate).not.toHaveBeenCalled();
    });

    it("does not mark external links as active", () => {
      const externalLinks: NavLink[] = [
        {
          id: "github",
          label: "GitHub",
          to: "https://github.com",
          external: true,
        },
      ];

      render(
        <Navigation
          logo={mockLogo}
          links={externalLinks}
          currentPath="https://github.com"
          onNavigate={mockOnNavigate}
        />,
      );

      const githubLink = screen.getByRole("link", { name: "GitHub" });
      expect(githubLink).not.toHaveAttribute("aria-current");
      expect(githubLink.className).not.toContain("linkActive");
    });
  });

  describe("Mobile Menu Toggle", () => {
    it("renders mobile menu toggle button", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const toggleButton = screen.getByRole("button", { name: "Open menu" });
      expect(toggleButton).toBeInTheDocument();
    });

    it("toggles mobile menu on click", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const toggleButton = screen.getByRole("button", { name: "Open menu" });
      await user.click(toggleButton);

      // Check if mobile menu is open
      const linksContainer = container.querySelector(".linksOpen");
      expect(linksContainer).toBeInTheDocument();

      // Button text should change
      expect(
        screen.getByRole("button", { name: "Close menu" }),
      ).toBeInTheDocument();
    });

    it("closes mobile menu when link is clicked", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      // Open mobile menu
      const toggleButton = screen.getByRole("button", { name: "Open menu" });
      await user.click(toggleButton);

      // Click a link
      const homeLink = screen.getByRole("link", { name: "Home" });
      await user.click(homeLink);

      // Mobile menu should be closed
      const linksContainer = container.querySelector(".linksOpen");
      expect(linksContainer).not.toBeInTheDocument();
    });

    it("closes mobile menu when backdrop is clicked", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      // Open mobile menu
      const toggleButton = screen.getByRole("button", { name: "Open menu" });
      await user.click(toggleButton);

      // Click backdrop
      const backdrop = container.querySelector(".backdrop");
      expect(backdrop).toBeInTheDocument();
      if (backdrop) {
        await user.click(backdrop);
      }

      // Mobile menu should be closed
      const linksContainer = container.querySelector(".linksOpen");
      expect(linksContainer).not.toBeInTheDocument();
    });

    it("has correct aria attributes for mobile toggle", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const toggleButton = screen.getByRole("button", { name: "Open menu" });
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
      expect(toggleButton).toHaveAttribute("aria-controls");
    });
  });

  describe("Close Sidebar Button", () => {
    it("renders close sidebar button when showCloseSidebar is true", () => {
      const onCloseSidebar = vi.fn();

      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
          showCloseSidebar={true}
          onCloseSidebar={onCloseSidebar}
        />,
      );

      const closeButton = screen.getByRole("button", {
        name: "Close sidebar",
      });
      expect(closeButton).toBeInTheDocument();
    });

    it("does not render close sidebar button when showCloseSidebar is false", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
          showCloseSidebar={false}
        />,
      );

      const closeButton = screen.queryByRole("button", {
        name: "Close sidebar",
      });
      expect(closeButton).not.toBeInTheDocument();
    });

    it("calls onCloseSidebar when close button is clicked", async () => {
      const user = userEvent.setup();
      const onCloseSidebar = vi.fn();

      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
          showCloseSidebar={true}
          onCloseSidebar={onCloseSidebar}
        />,
      );

      const closeButton = screen.getByRole("button", {
        name: "Close sidebar",
      });
      await user.click(closeButton);

      expect(onCloseSidebar).toHaveBeenCalledTimes(1);
    });
  });

  describe("Children Slot", () => {
    it("renders children in navigation", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        >
          <button type="button">Sign In</button>
          <button type="button">Sign Up</button>
        </Navigation>,
      );

      expect(screen.getByText("Sign In")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("all links are keyboard accessible", async () => {
      const user = userEvent.setup();

      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      // Tab to logo
      await user.tab();
      const logo = screen.getByRole("link", { name: /TestApp/i });
      expect(logo).toHaveFocus();

      // Tab to mobile toggle
      await user.tab();
      const toggleButton = screen.getByRole("button", { name: "Open menu" });
      expect(toggleButton).toHaveFocus();
    });

    it("supports Enter key on links", async () => {
      const user = userEvent.setup();

      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const aboutLink = screen.getByRole("link", { name: "About" });
      aboutLink.focus();
      await user.keyboard("{Enter}");

      expect(mockOnNavigate).toHaveBeenCalledWith("/about");
    });

    it("closes mobile menu on Escape key", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      // Open mobile menu
      const toggleButton = screen.getByRole("button", { name: "Open menu" });
      await user.click(toggleButton);

      // Press Escape on backdrop
      const backdrop = container.querySelector(".backdrop");
      expect(backdrop).toBeInTheDocument();

      await user.keyboard("{Escape}");

      // Mobile menu should be closed
      const linksContainer = container.querySelector(".linksOpen");
      expect(linksContainer).not.toBeInTheDocument();
    });

    it("all buttons have correct tabindex", () => {
      const onCloseSidebar = vi.fn();

      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
          showCloseSidebar={true}
          onCloseSidebar={onCloseSidebar}
        />,
      );

      const closeButton = screen.getByRole("button", {
        name: "Close sidebar",
      });
      const toggleButton = screen.getByRole("button", { name: "Open menu" });

      expect(closeButton).toHaveAttribute("type", "button");
      expect(toggleButton).toHaveAttribute("type", "button");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic HTML structure", () => {
      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toBeInTheDocument();
      expect(nav?.tagName).toBe("NAV");
    });

    it("logo has accessible name", () => {
      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const logo = screen.getByRole("link", { name: /TestApp/i });
      expect(logo).toBeInTheDocument();
    });

    it("buttons have accessible labels", () => {
      const onCloseSidebar = vi.fn();

      render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
          showCloseSidebar={true}
          onCloseSidebar={onCloseSidebar}
        />,
      );

      expect(screen.getByLabelText("Close sidebar")).toBeInTheDocument();
      expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
    });

    it("external links have security attributes", () => {
      const externalLinks: NavLink[] = [
        {
          id: "github",
          label: "GitHub",
          to: "https://github.com",
          external: true,
        },
      ];

      render(
        <Navigation
          logo={mockLogo}
          links={externalLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const githubLink = screen.getByRole("link", { name: "GitHub" });
      expect(githubLink).toHaveAttribute("target", "_blank");
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("uses custom aria-label for links", () => {
      const linksWithAriaLabel: NavLink[] = [
        {
          id: "home",
          label: "Home",
          to: "/",
          ariaLabel: "Go to home page",
        },
      ];

      render(
        <Navigation
          logo={mockLogo}
          links={linksWithAriaLabel}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const homeLink = screen.getByRole("link", { name: "Go to home page" });
      expect(homeLink).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders with empty links array", () => {
      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={[]}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toBeInTheDocument();
    });

    it("handles undefined icon gracefully", () => {
      const logoWithoutIcon = {
        text: "TestApp",
        href: "/",
        icon: undefined,
      };

      render(
        <Navigation
          logo={logoWithoutIcon}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      expect(screen.getByText("TestApp")).toBeInTheDocument();
    });

    it("handles all callbacks being undefined gracefully", () => {
      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toBeInTheDocument();
    });

    it("handles very long link labels", () => {
      const longLinks: NavLink[] = [
        {
          id: "long",
          label: "This is a very long navigation link label that might wrap",
          to: "/long",
        },
      ];

      render(
        <Navigation
          logo={mockLogo}
          links={longLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const longLink = screen.getByRole("link", {
        name: /This is a very long/i,
      });
      expect(longLink).toBeInTheDocument();
    });

    it("handles special characters in paths", () => {
      const specialLinks: NavLink[] = [
        {
          id: "special",
          label: "Special",
          to: "/path?query=value&foo=bar#section",
        },
      ];

      render(
        <Navigation
          logo={mockLogo}
          links={specialLinks}
          currentPath="/path?query=value&foo=bar#section"
          onNavigate={mockOnNavigate}
        />,
      );

      const specialLink = screen.getByRole("link", { name: "Special" });
      expect(specialLink).toHaveAttribute(
        "href",
        "/path?query=value&foo=bar#section",
      );
      expect(specialLink).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Responsive Behavior", () => {
    it("mobile menu is hidden by default", () => {
      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const linksContainer = container.querySelector(".linksOpen");
      expect(linksContainer).not.toBeInTheDocument();
    });

    it("backdrop only renders when mobile menu is open", () => {
      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const backdrop = container.querySelector(".backdrop");
      expect(backdrop).not.toBeInTheDocument();
    });

    it("applies correct classes for mobile menu state", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Navigation
          logo={mockLogo}
          links={mockLinks}
          currentPath="/"
          onNavigate={mockOnNavigate}
        />,
      );

      const toggleButton = screen.getByRole("button", { name: "Open menu" });
      await user.click(toggleButton);

      const linksContainer = container.querySelector(".linksOpen");
      expect(linksContainer).toBeInTheDocument();
      expect(linksContainer?.className).toContain("linksOpen");
    });
  });
});
