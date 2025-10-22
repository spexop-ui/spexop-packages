/**
 * Tabs Component Tests
 *
 * Tests for Tabs component covering:
 * - Tab rendering and switching
 * - Keyboard navigation (Arrow keys, Home, End)
 * - ARIA attributes and accessibility
 * - Controlled and uncontrolled modes
 * - Size and visual variants
 * - Disabled tabs
 * - Icons support
 * - Full width layout
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs.js";
import styles from "./Tabs.module.css";
import type { Tab } from "./Tabs.types.js";

describe("Tabs", () => {
  const defaultTabs: Tab[] = [
    { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
    { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
    { id: "tab3", label: "Tab 3", content: <div>Content 3</div> },
  ];

  describe("Rendering", () => {
    it("renders all tabs", () => {
      render(<Tabs tabs={defaultTabs} />);

      expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();
    });

    it("renders tab content", () => {
      render(<Tabs tabs={defaultTabs} />);

      // First tab content should be visible
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.getByText("Content 1")).toBeVisible();
    });

    it("has proper tablist role", () => {
      render(<Tabs tabs={defaultTabs} />);

      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();
    });

    it("marks first tab as selected by default", () => {
      render(<Tabs tabs={defaultTabs} />);

      const firstTab = screen.getByRole("tab", { name: "Tab 1" });
      expect(firstTab).toHaveAttribute("aria-selected", "true");
    });

    it("sets correct tabindex for selected tab", () => {
      render(<Tabs tabs={defaultTabs} />);

      const firstTab = screen.getByRole("tab", { name: "Tab 1" });
      const secondTab = screen.getByRole("tab", { name: "Tab 2" });

      expect(firstTab).toHaveAttribute("tabindex", "0");
      expect(secondTab).toHaveAttribute("tabindex", "-1");
    });
  });

  describe("Tab Switching", () => {
    it("switches tabs on click", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={defaultTabs} />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content 2")).toBeVisible();
    });

    it("shows only active tab panel content", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={defaultTabs} />);

      // Initially first tab is active
      expect(screen.getByText("Content 1")).toBeVisible();

      // Switch to second tab
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      expect(screen.getByText("Content 2")).toBeVisible();
      // First tab content should be hidden
      expect(screen.getByText("Content 1")).not.toBeVisible();
    });

    it("calls onChange callback when tab changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Tabs tabs={defaultTabs} onChange={handleChange} />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      expect(handleChange).toHaveBeenCalledWith("tab2");
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("Controlled Mode", () => {
    it("respects controlled activeTab prop", () => {
      render(<Tabs tabs={defaultTabs} activeTab="tab2" />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content 2")).toBeVisible();
    });

    it("does not change internally when controlled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { rerender } = render(
        <Tabs tabs={defaultTabs} activeTab="tab1" onChange={handleChange} />,
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      // onChange should be called but component shouldn't update
      expect(handleChange).toHaveBeenCalledWith("tab2");

      // Re-render with same activeTab to verify it didn't change
      rerender(
        <Tabs tabs={defaultTabs} activeTab="tab1" onChange={handleChange} />,
      );

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Uncontrolled Mode", () => {
    it("uses defaultActiveTab", () => {
      render(<Tabs tabs={defaultTabs} defaultActiveTab="tab2" />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content 2")).toBeVisible();
    });

    it("changes tabs internally when uncontrolled", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={defaultTabs} />);

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      await user.click(tab3);

      expect(tab3).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content 3")).toBeVisible();
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates to next tab with ArrowRight", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={defaultTabs} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowRight}");

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveFocus();
      expect(tab2).toHaveAttribute("aria-selected", "true");
    });

    it("navigates to previous tab with ArrowLeft", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={defaultTabs} defaultActiveTab="tab2" />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      tab2.focus();

      await user.keyboard("{ArrowLeft}");

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
    });

    it("wraps to first tab when pressing ArrowRight on last tab", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={defaultTabs} defaultActiveTab="tab3" />);

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      tab3.focus();

      await user.keyboard("{ArrowRight}");

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
    });

    it("wraps to last tab when pressing ArrowLeft on first tab", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={defaultTabs} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowLeft}");

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      expect(tab3).toHaveFocus();
      expect(tab3).toHaveAttribute("aria-selected", "true");
    });

    it("navigates to first tab with Home key", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={defaultTabs} defaultActiveTab="tab3" />);

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      tab3.focus();

      await user.keyboard("{Home}");

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveFocus();
      expect(tab1).toHaveAttribute("aria-selected", "true");
    });

    it("navigates to last tab with End key", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={defaultTabs} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{End}");

      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      expect(tab3).toHaveFocus();
      expect(tab3).toHaveAttribute("aria-selected", "true");
    });

    it("skips disabled tabs with arrow keys", async () => {
      const user = userEvent.setup();
      const tabsWithDisabled: Tab[] = [
        { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
        {
          id: "tab2",
          label: "Tab 2",
          content: <div>Content 2</div>,
          disabled: true,
        },
        { id: "tab3", label: "Tab 3", content: <div>Content 3</div> },
      ];

      render(<Tabs tabs={tabsWithDisabled} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      tab1.focus();

      await user.keyboard("{ArrowRight}");

      // Should skip tab2 and go to tab3
      const tab3 = screen.getByRole("tab", { name: "Tab 3" });
      expect(tab3).toHaveFocus();
    });
  });

  describe("Disabled Tabs", () => {
    it("marks disabled tabs with aria-disabled", () => {
      const tabsWithDisabled: Tab[] = [
        { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
        {
          id: "tab2",
          label: "Tab 2",
          content: <div>Content 2</div>,
          disabled: true,
        },
      ];

      render(<Tabs tabs={tabsWithDisabled} />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      expect(tab2).toHaveAttribute("aria-disabled", "true");
      expect(tab2).toBeDisabled();
    });

    it("does not switch to disabled tab on click", async () => {
      const user = userEvent.setup();
      const tabsWithDisabled: Tab[] = [
        { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
        {
          id: "tab2",
          label: "Tab 2",
          content: <div>Content 2</div>,
          disabled: true,
        },
      ];

      render(<Tabs tabs={tabsWithDisabled} />);

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(tab2);

      // Should still be on tab1
      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(screen.getByText("Content 1")).toBeVisible();
    });
  });

  describe("Visual Variants", () => {
    it("renders with default variant", () => {
      const { container } = render(<Tabs tabs={defaultTabs} />);

      const tabs = container.querySelector(`.${styles.tabs}`);
      expect(tabs).toHaveClass(styles["variant-default"]);
    });

    it("renders with pills variant", () => {
      const { container } = render(<Tabs tabs={defaultTabs} variant="pills" />);

      const tabs = container.querySelector(`.${styles.tabs}`);
      expect(tabs).toHaveClass(styles["variant-pills"]);
    });

    it("renders with underline variant", () => {
      const { container } = render(
        <Tabs tabs={defaultTabs} variant="underline" />,
      );

      const tabs = container.querySelector(`.${styles.tabs}`);
      expect(tabs).toHaveClass(styles["variant-underline"]);
    });
  });

  describe("Size Variants", () => {
    it("renders with small size", () => {
      const { container } = render(<Tabs tabs={defaultTabs} size="sm" />);

      const tabs = container.querySelector(`.${styles.tabs}`);
      expect(tabs).toHaveClass(styles["size-sm"]);
    });

    it("renders with medium size (default)", () => {
      const { container } = render(<Tabs tabs={defaultTabs} />);

      const tabs = container.querySelector(`.${styles.tabs}`);
      expect(tabs).toHaveClass(styles["size-md"]);
    });

    it("renders with large size", () => {
      const { container } = render(<Tabs tabs={defaultTabs} size="lg" />);

      const tabs = container.querySelector(`.${styles.tabs}`);
      expect(tabs).toHaveClass(styles["size-lg"]);
    });
  });

  describe("Full Width", () => {
    it("renders full width when fullWidth is true", () => {
      const { container } = render(<Tabs tabs={defaultTabs} fullWidth />);

      const tabs = container.querySelector(`.${styles.tabs}`);
      expect(tabs).toHaveClass(styles["full-width"]);
    });

    it("does not render full width by default", () => {
      const { container } = render(<Tabs tabs={defaultTabs} />);

      const tabs = container.querySelector(`.${styles.tabs}`);
      expect(tabs).not.toHaveClass(styles["full-width"]);
    });
  });

  describe("Icons", () => {
    it("renders tabs with icons", () => {
      const tabsWithIcons: Tab[] = [
        {
          id: "tab1",
          label: "Tab 1",
          content: <div>Content 1</div>,
          icon: <span data-testid="icon-1">Icon 1</span>,
        },
        {
          id: "tab2",
          label: "Tab 2",
          content: <div>Content 2</div>,
          icon: <span data-testid="icon-2">Icon 2</span>,
        },
      ];

      render(<Tabs tabs={tabsWithIcons} />);

      expect(screen.getByTestId("icon-1")).toBeInTheDocument();
      expect(screen.getByTestId("icon-2")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA roles", () => {
      render(<Tabs tabs={defaultTabs} />);

      expect(screen.getByRole("tablist")).toBeInTheDocument();
      expect(screen.getAllByRole("tab")).toHaveLength(3);
      expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(3);
    });

    it("connects tabs to panels with aria-controls", () => {
      render(<Tabs tabs={defaultTabs} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const panelId = tab1.getAttribute("aria-controls");

      expect(panelId).toBe("tab1-panel");
      expect(screen.getByRole("tabpanel", { hidden: false })).toHaveAttribute(
        "id",
        "tab1-panel",
      );
    });

    it("connects panels to tabs with aria-labelledby", () => {
      render(<Tabs tabs={defaultTabs} />);

      const panel = screen.getByText("Content 1").closest('[role="tabpanel"]');
      expect(panel).toHaveAttribute("aria-labelledby", "tab1");
    });

    it("hides inactive tab panels", () => {
      render(<Tabs tabs={defaultTabs} />);

      const panels = screen.getAllByRole("tabpanel", { hidden: true });
      const visiblePanels = panels.filter(
        (panel) => !panel.hasAttribute("hidden"),
      );

      expect(visiblePanels).toHaveLength(1);
    });
  });

  describe("Custom Class Names", () => {
    it("applies custom className to container", () => {
      const { container } = render(
        <Tabs tabs={defaultTabs} className="custom-tabs" />,
      );

      const tabs = container.querySelector(`.${styles.tabs}`);
      expect(tabs).toHaveClass("custom-tabs");
    });

    it("applies custom className to tab list", () => {
      const { container } = render(
        <Tabs tabs={defaultTabs} tabListClassName="custom-tab-list" />,
      );

      const tabList = screen.getByRole("tablist");
      expect(tabList.className).toContain("custom-tab-list");
    });

    it("applies custom className to tab panels", () => {
      const { container } = render(
        <Tabs tabs={defaultTabs} tabPanelClassName="custom-panel" />,
      );

      const panel = screen.getByText("Content 1").closest('[role="tabpanel"]');
      expect(panel).toHaveClass("custom-panel");
    });
  });

  describe("Edge Cases", () => {
    it("handles single tab", () => {
      const singleTab: Tab[] = [
        { id: "only", label: "Only Tab", content: <div>Only Content</div> },
      ];

      render(<Tabs tabs={singleTab} />);

      expect(screen.getByRole("tab", { name: "Only Tab" })).toBeInTheDocument();
      expect(screen.getByText("Only Content")).toBeVisible();
    });

    it("handles empty content", () => {
      const tabsWithEmptyContent: Tab[] = [
        { id: "tab1", label: "Tab 1", content: null },
        { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
      ];

      render(<Tabs tabs={tabsWithEmptyContent} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      expect(tab1).toBeInTheDocument();
    });

    it("handles React elements as labels", () => {
      const tabsWithElementLabels: Tab[] = [
        {
          id: "tab1",
          label: <strong>Bold Tab</strong>,
          content: <div>Content 1</div>,
        },
        { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
      ];

      render(<Tabs tabs={tabsWithElementLabels} />);

      expect(screen.getByText("Bold Tab")).toBeInTheDocument();
      expect(screen.getByText("Bold Tab").tagName).toBe("STRONG");
    });
  });
});
