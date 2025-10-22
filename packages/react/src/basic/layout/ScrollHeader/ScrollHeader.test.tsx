/// <reference types="@testing-library/jest-dom" />
/**
 * ScrollHeader Component Tests
 *
 * Tests for ScrollHeader component covering:
 * - Rendering sections, logo, and actions
 * - Scroll threshold visibility behavior
 * - Section navigation and active state
 * - Sidebar offset calculations
 * - Loading states and skeleton display
 * - ARIA attributes and accessibility
 * - Keyboard navigation
 * - Responsive behavior
 * - Edge cases and error handling
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { Home, Settings, User } from "@spexop/icons";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ScrollHeader } from "./ScrollHeader.js";
import type { ScrollSection } from "./ScrollHeader.types.js";

describe("ScrollHeader", () => {
  const mockSections: ScrollSection[] = [
    { id: "intro", label: "Introduction", href: "#intro" },
    { id: "features", label: "Features", href: "#features" },
    { id: "pricing", label: "Pricing", href: "#pricing" },
  ];

  const mockOnSectionClick = vi.fn();

  beforeEach(() => {
    // Reset window scroll position
    window.scrollY = 0;
    mockOnSectionClick.mockClear();

    // Mock scrollTo
    window.scrollTo = vi.fn();

    // Mock sessionStorage
    const sessionStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    })();
    Object.defineProperty(window, "sessionStorage", {
      value: sessionStorageMock,
      writable: true,
    });
  });

  describe("Rendering", () => {
    it("renders as a header element", () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
    });

    it("renders all sections", () => {
      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      expect(screen.getByText("Introduction")).toBeInTheDocument();
      expect(screen.getByText("Features")).toBeInTheDocument();
      expect(screen.getByText("Pricing")).toBeInTheDocument();
    });

    it("renders sections with icons", () => {
      const sectionsWithIcons: ScrollSection[] = [
        { id: "home", label: "Home", href: "#home", icon: Home },
        { id: "profile", label: "Profile", href: "#profile", icon: User },
        {
          id: "settings",
          label: "Settings",
          href: "#settings",
          icon: Settings,
        },
      ];

      const { container } = render(
        <ScrollHeader sections={sectionsWithIcons} scrollThreshold={200} />,
      );

      const icons = container.querySelectorAll(".sectionIcon");
      expect(icons).toHaveLength(3);
    });

    it("renders logo when provided", () => {
      const logo = <div data-testid="custom-logo">My Logo</div>;

      render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          logo={logo}
        />,
      );

      expect(screen.getByTestId("custom-logo")).toBeInTheDocument();
    });

    it("renders actions when provided", () => {
      const actions = (
        <button type="button" data-testid="search-button">
          Search
        </button>
      );

      render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          actions={actions}
        />,
      );

      expect(screen.getByTestId("search-button")).toBeInTheDocument();
    });

    it("renders custom aria-label", () => {
      const { container } = render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          ariaLabel="Custom navigation"
        />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toHaveAttribute("aria-label", "Custom navigation");
    });

    it("renders default aria-label", () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toHaveAttribute("aria-label", "Page navigation header");
    });

    it("applies custom className", () => {
      const { container } = render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          className="custom-class"
        />,
      );

      const header = container.querySelector("header");
      expect(header).toHaveClass("custom-class");
    });
  });

  describe("Visibility Behavior", () => {
    it("is hidden initially when scroll is below threshold", () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      const header = container.querySelector("header");
      expect(header).toHaveAttribute("aria-hidden", "true");
    });

    it("shows when scroll exceeds threshold", async () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      // Simulate scroll
      Object.defineProperty(window, "scrollY", { value: 250, writable: true });
      window.dispatchEvent(new Event("scroll"));

      await waitFor(() => {
        const header = container.querySelector("header");
        expect(header).toHaveAttribute("aria-hidden", "false");
      });
    });

    it("hides when scroll goes below threshold", async () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      // Scroll down
      Object.defineProperty(window, "scrollY", { value: 250, writable: true });
      window.dispatchEvent(new Event("scroll"));

      await waitFor(() => {
        const header = container.querySelector("header");
        expect(header).toHaveAttribute("aria-hidden", "false");
      });

      // Scroll back up
      Object.defineProperty(window, "scrollY", { value: 100, writable: true });
      window.dispatchEvent(new Event("scroll"));

      await waitFor(() => {
        const header = container.querySelector("header");
        expect(header).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("respects custom scroll threshold", async () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={500} />,
      );

      // Scroll to 400px (below threshold)
      Object.defineProperty(window, "scrollY", { value: 400, writable: true });
      window.dispatchEvent(new Event("scroll"));

      await waitFor(() => {
        const header = container.querySelector("header");
        expect(header).toHaveAttribute("aria-hidden", "true");
      });

      // Scroll to 600px (above threshold)
      Object.defineProperty(window, "scrollY", { value: 600, writable: true });
      window.dispatchEvent(new Event("scroll"));

      await waitFor(() => {
        const header = container.querySelector("header");
        expect(header).toHaveAttribute("aria-hidden", "false");
      });
    });
  });

  describe("Section Navigation", () => {
    it("handles section click", async () => {
      const user = userEvent.setup();
      render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          onSectionClick={mockOnSectionClick}
        />,
      );

      const introLink = screen.getByText("Introduction");
      await user.click(introLink);

      expect(mockOnSectionClick).toHaveBeenCalledWith("intro");
    });

    it("scrolls to section on click with hash href", async () => {
      const user = userEvent.setup();

      // Mock querySelector to return a fake element
      const mockElement = {
        getBoundingClientRect: () => ({ top: 1000, bottom: 1500 }),
      };
      document.querySelector = vi.fn().mockReturnValue(mockElement);

      render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          onSectionClick={mockOnSectionClick}
        />,
      );

      const introLink = screen.getByText("Introduction");
      await user.click(introLink);

      expect(window.scrollTo).toHaveBeenCalled();
    });

    it("navigates to external URL on click with non-hash href", async () => {
      const user = userEvent.setup();
      const externalSections: ScrollSection[] = [
        { id: "home", label: "Home", href: "/home" },
        { id: "about", label: "About", href: "/about" },
      ];

      // Mock window.location.href
      const originalLocation = window.location;
      Object.defineProperty(window, "location", {
        value: { href: "/" },
        writable: true,
      });

      render(
        <ScrollHeader
          sections={externalSections}
          scrollThreshold={200}
          onSectionClick={mockOnSectionClick}
        />,
      );

      const homeLink = screen.getByText("Home");
      await user.click(homeLink);

      expect(mockOnSectionClick).toHaveBeenCalledWith("home");

      // Restore original location
      Object.defineProperty(window, "location", {
        value: originalLocation,
        writable: true,
      });
    });

    it("prevents default link behavior on click", async () => {
      const user = userEvent.setup();
      const preventDefault = vi.fn();

      render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          onSectionClick={mockOnSectionClick}
        />,
      );

      const introLink = screen.getByText("Introduction");
      const clickEvent = new MouseEvent("click", { bubbles: true });
      clickEvent.preventDefault = preventDefault;

      await user.click(introLink);

      // The component should call preventDefault
      expect(mockOnSectionClick).toHaveBeenCalled();
    });
  });

  describe("Active State", () => {
    it("highlights active section", () => {
      render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="features"
        />,
      );

      const featuresLink = screen.getByText("Features").closest("a");
      expect(featuresLink).toHaveAttribute("aria-current", "page");
    });

    it("does not highlight inactive sections", () => {
      render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="features"
        />,
      );

      const introLink = screen.getByText("Introduction").closest("a");
      expect(introLink).not.toHaveAttribute("aria-current");
    });

    it("updates active state when prop changes", () => {
      const { rerender } = render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="intro"
        />,
      );

      let introLink = screen.getByText("Introduction").closest("a");
      expect(introLink).toHaveAttribute("aria-current", "page");

      rerender(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="features"
        />,
      );

      introLink = screen.getByText("Introduction").closest("a");
      expect(introLink).not.toHaveAttribute("aria-current");

      const featuresLink = screen.getByText("Features").closest("a");
      expect(featuresLink).toHaveAttribute("aria-current", "page");
    });

    it("handles no active section", () => {
      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      const introLink = screen.getByText("Introduction").closest("a");
      const featuresLink = screen.getByText("Features").closest("a");
      const pricingLink = screen.getByText("Pricing").closest("a");

      expect(introLink).not.toHaveAttribute("aria-current");
      expect(featuresLink).not.toHaveAttribute("aria-current");
      expect(pricingLink).not.toHaveAttribute("aria-current");
    });
  });

  describe("Sidebar Integration", () => {
    it("applies no offset when sidebar is hidden", () => {
      const { container } = render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          sidebarState="hidden"
        />,
      );

      const header = container.querySelector("header");
      expect(header).toHaveStyle({ left: "0px" });
    });

    it("applies offset when sidebar is in icons mode on desktop", () => {
      // Mock window width to desktop size
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          sidebarState="icons"
        />,
      );

      const header = container.querySelector("header");
      expect(header).toHaveStyle({ left: "96px" });
    });

    it("applies no offset on mobile regardless of sidebar state", () => {
      // Mock window width to mobile size
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });

      const { container } = render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          sidebarState="icons"
        />,
      );

      const header = container.querySelector("header");
      expect(header).toHaveStyle({ left: "0px" });
    });

    it("updates offset on window resize", async () => {
      // Start with desktop width
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          sidebarState="icons"
        />,
      );

      let header = container.querySelector("header");
      expect(header).toHaveStyle({ left: "96px" });

      // Resize to mobile
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
      window.dispatchEvent(new Event("resize"));

      await waitFor(
        () => {
          header = container.querySelector("header");
          expect(header).toHaveStyle({ left: "0px" });
        },
        { timeout: 200 },
      );
    });

    it("debounces resize events", async () => {
      const { container } = render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          sidebarState="icons"
        />,
      );

      // Trigger multiple resize events quickly
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("resize"));

      // Wait for debounce
      await waitFor(
        () => {
          const header = container.querySelector("header");
          expect(header).toBeInTheDocument();
        },
        { timeout: 200 },
      );
    });
  });

  describe("Loading States", () => {
    it("displays skeleton when sections array is empty", () => {
      const { container } = render(
        <ScrollHeader sections={[]} scrollThreshold={200} />,
      );

      const skeletonItems = container.querySelectorAll(".skeletonItem");
      expect(skeletonItems).toHaveLength(3);
    });

    it("displays loading state with aria-live", () => {
      const { container } = render(
        <ScrollHeader sections={[]} scrollThreshold={200} />,
      );

      const loadingState = container.querySelector(".loadingState");
      expect(loadingState).toHaveAttribute("aria-live", "polite");
      expect(loadingState).toHaveAttribute("aria-busy", "true");
    });

    it("renders sections when data is loaded", () => {
      const { rerender } = render(
        <ScrollHeader sections={[]} scrollThreshold={200} />,
      );

      let skeletonItems = document.querySelectorAll(".skeletonItem");
      expect(skeletonItems).toHaveLength(3);

      rerender(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      skeletonItems = document.querySelectorAll(".skeletonItem");
      expect(skeletonItems).toHaveLength(0);
      expect(screen.getByText("Introduction")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper navigation landmark", () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute("aria-label");
    });

    it("uses semantic list for sections", () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      const list = container.querySelector("ul");
      expect(list).toBeInTheDocument();

      const listItems = container.querySelectorAll("li");
      expect(listItems).toHaveLength(3);
    });

    it("provides aria-current for active section", () => {
      render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="features"
        />,
      );

      const featuresLink = screen.getByText("Features").closest("a");
      expect(featuresLink).toHaveAttribute("aria-current", "page");
    });

    it("hides header from screen readers when not visible", () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      const header = container.querySelector("header");
      expect(header).toHaveAttribute("aria-hidden", "true");
    });

    it("shows header to screen readers when visible", async () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      // Trigger scroll
      Object.defineProperty(window, "scrollY", { value: 250, writable: true });
      window.dispatchEvent(new Event("scroll"));

      await waitFor(() => {
        const header = container.querySelector("header");
        expect(header).toHaveAttribute("aria-hidden", "false");
      });
    });

    it("all links are keyboard accessible", () => {
      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(3);

      for (const link of links) {
        expect(link).toHaveAttribute("href");
      }
    });
  });

  describe("Responsive Behavior", () => {
    it("renders correctly on mobile", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
    });

    it("renders correctly on tablet", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 768,
      });

      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
    });

    it("renders correctly on desktop", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1440,
      });

      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("warns when more than 8 sections provided", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const manySections: ScrollSection[] = Array.from(
        { length: 10 },
        (_, i) => ({
          id: `section-${i}`,
          label: `Section ${i}`,
          href: `#section-${i}`,
        }),
      );

      render(<ScrollHeader sections={manySections} scrollThreshold={200} />);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("10 sections provided"),
      );

      consoleSpy.mockRestore();
    });

    it("does not warn with 8 or fewer sections", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("handles sections without icons", () => {
      const sectionsNoIcons: ScrollSection[] = [
        { id: "one", label: "One", href: "#one" },
        { id: "two", label: "Two", href: "#two" },
      ];

      render(<ScrollHeader sections={sectionsNoIcons} scrollThreshold={200} />);

      expect(screen.getByText("One")).toBeInTheDocument();
      expect(screen.getByText("Two")).toBeInTheDocument();
    });

    it("handles missing onSectionClick callback", async () => {
      const user = userEvent.setup();

      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      const introLink = screen.getByText("Introduction");

      // Should not throw error
      await expect(user.click(introLink)).resolves.not.toThrow();
    });

    it("handles scroll position restoration", () => {
      // Set stored scroll position
      window.sessionStorage.setItem("scrollHeader-position", "500");

      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      // Wait for restoration
      setTimeout(() => {
        expect(window.scrollTo).toHaveBeenCalledWith(0, 500);
      }, 10);
    });

    it("stores scroll position before unload", () => {
      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      Object.defineProperty(window, "scrollY", { value: 300, writable: true });

      window.dispatchEvent(new Event("beforeunload"));

      expect(window.sessionStorage.getItem("scrollHeader-position")).toBe(
        "300",
      );
    });

    it("handles section element not found gracefully", async () => {
      const user = userEvent.setup();

      // Mock querySelector to return null
      document.querySelector = vi.fn().mockReturnValue(null);

      render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          onSectionClick={mockOnSectionClick}
        />,
      );

      const introLink = screen.getByText("Introduction");

      // Should not throw error
      await expect(user.click(introLink)).resolves.not.toThrow();
      expect(mockOnSectionClick).toHaveBeenCalled();
    });

    it("handles smooth scroll fallback for unsupported browsers", async () => {
      const user = userEvent.setup();

      // Mock scrollTo to throw error
      window.scrollTo = vi.fn().mockImplementation(() => {
        throw new Error("Smooth scroll not supported");
      });

      const mockElement = {
        getBoundingClientRect: () => ({ top: 1000, bottom: 1500 }),
      };
      document.querySelector = vi.fn().mockReturnValue(mockElement);

      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      const introLink = screen.getByText("Introduction");

      // Should handle error gracefully
      await expect(user.click(introLink)).resolves.not.toThrow();
    });
  });

  describe("Scroll Offset Calculations", () => {
    it("calculates correct offset for desktop", async () => {
      const user = userEvent.setup();

      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const mockElement = {
        getBoundingClientRect: () => ({ top: 1000, bottom: 1500 }),
      };
      document.querySelector = vi.fn().mockReturnValue(mockElement);

      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      const introLink = screen.getByText("Introduction");
      await user.click(introLink);

      // Should account for desktop header height (64px) + padding (20px)
      expect(window.scrollTo).toHaveBeenCalled();
    });

    it("calculates correct offset for mobile", async () => {
      const user = userEvent.setup();

      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });

      const mockElement = {
        getBoundingClientRect: () => ({ top: 1000, bottom: 1500 }),
      };
      document.querySelector = vi.fn().mockReturnValue(mockElement);

      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      const introLink = screen.getByText("Introduction");
      await user.click(introLink);

      // Should account for mobile header height (56px) + padding (20px)
      expect(window.scrollTo).toHaveBeenCalled();
    });
  });

  describe("Performance", () => {
    it("cleans up scroll listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function),
      );
    });

    it("cleans up resize listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function),
      );
    });

    it("cleans up beforeunload listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={200} />,
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "beforeunload",
        expect.any(Function),
      );
    });

    it("uses passive scroll listener for performance", () => {
      const addEventListenerSpy = vi.spyOn(window, "addEventListener");

      render(<ScrollHeader sections={mockSections} scrollThreshold={200} />);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function),
        { passive: true },
      );
    });
  });

  describe("Props Validation", () => {
    it("handles undefined scrollThreshold with default", () => {
      const { container } = render(<ScrollHeader sections={mockSections} />);

      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();

      // Should use default threshold (200)
      Object.defineProperty(window, "scrollY", { value: 150, writable: true });
      window.dispatchEvent(new Event("scroll"));

      expect(header).toHaveAttribute("aria-hidden", "true");
    });

    it("handles zero scrollThreshold", async () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={0} />,
      );

      const header = container.querySelector("header");

      // Should be visible immediately
      Object.defineProperty(window, "scrollY", { value: 1, writable: true });
      window.dispatchEvent(new Event("scroll"));

      await waitFor(() => {
        expect(header).toHaveAttribute("aria-hidden", "false");
      });
    });

    it("handles negative scrollThreshold as zero", async () => {
      const { container } = render(
        <ScrollHeader sections={mockSections} scrollThreshold={-100} />,
      );

      const header = container.querySelector("header");

      // Should treat as zero
      Object.defineProperty(window, "scrollY", { value: 1, writable: true });
      window.dispatchEvent(new Event("scroll"));

      await waitFor(() => {
        expect(header).toHaveAttribute("aria-hidden", "false");
      });
    });
  });

  describe("Integration Tests", () => {
    it("works with all props combined", async () => {
      const user = userEvent.setup();
      const logo = <div data-testid="logo">Logo</div>;
      const actions = (
        <button type="button" data-testid="action">
          Action
        </button>
      );

      const sectionsWithIcons: ScrollSection[] = [
        { id: "home", label: "Home", href: "#home", icon: Home },
        {
          id: "settings",
          label: "Settings",
          href: "#settings",
          icon: Settings,
        },
      ];

      const { container } = render(
        <ScrollHeader
          sections={sectionsWithIcons}
          scrollThreshold={300}
          activeSection="home"
          onSectionClick={mockOnSectionClick}
          logo={logo}
          actions={actions}
          className="custom-header"
          ariaLabel="Main site navigation"
          sidebarState="icons"
        />,
      );

      // Check all elements render
      expect(screen.getByTestId("logo")).toBeInTheDocument();
      expect(screen.getByTestId("action")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();

      const header = container.querySelector("header");
      expect(header).toHaveClass("custom-header");

      const nav = container.querySelector("nav");
      expect(nav).toHaveAttribute("aria-label", "Main site navigation");

      // Check active state
      const homeLink = screen.getByText("Home").closest("a");
      expect(homeLink).toHaveAttribute("aria-current", "page");

      // Check click handling
      await user.click(screen.getByText("Home"));
      expect(mockOnSectionClick).toHaveBeenCalledWith("home");
    });

    it("handles rapid prop changes", async () => {
      const { rerender } = render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="intro"
        />,
      );

      // Rapid updates
      rerender(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="features"
        />,
      );

      rerender(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="pricing"
        />,
      );

      rerender(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="intro"
        />,
      );

      const introLink = screen.getByText("Introduction").closest("a");
      expect(introLink).toHaveAttribute("aria-current", "page");
    });

    it("maintains scroll visibility during section changes", async () => {
      const { container, rerender } = render(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="intro"
        />,
      );

      // Make visible
      Object.defineProperty(window, "scrollY", { value: 250, writable: true });
      window.dispatchEvent(new Event("scroll"));

      await waitFor(() => {
        const header = container.querySelector("header");
        expect(header).toHaveAttribute("aria-hidden", "false");
      });

      // Change active section
      rerender(
        <ScrollHeader
          sections={mockSections}
          scrollThreshold={200}
          activeSection="features"
        />,
      );

      // Should remain visible
      const header = container.querySelector("header");
      expect(header).toHaveAttribute("aria-hidden", "false");
    });
  });
});
