/**
 * SidebarFooter Component Tests
 *
 * Tests for SidebarFooter component covering:
 * - Rendering children content
 * - Semantic HTML
 * - Custom class names
 * - Various content types
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { SidebarFooter } from "./SidebarFooter.js";
import styles from "./SidebarFooter.module.css";

describe("SidebarFooter", () => {
  describe("Rendering", () => {
    it("renders children content", () => {
      render(
        <SidebarFooter>
          <div>Footer Content</div>
        </SidebarFooter>,
      );

      expect(screen.getByText("Footer Content")).toBeInTheDocument();
    });

    it("renders as a footer element", () => {
      const { container } = render(
        <SidebarFooter>
          <div>Content</div>
        </SidebarFooter>,
      );

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
      expect(footer?.tagName).toBe("FOOTER");
    });

    it("renders multiple children", () => {
      render(
        <SidebarFooter>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </SidebarFooter>,
      );

      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
      expect(screen.getByText("Child 3")).toBeInTheDocument();
    });
  });

  describe("Content Types", () => {
    it("renders text content", () => {
      render(<SidebarFooter>Simple text content</SidebarFooter>);

      expect(screen.getByText("Simple text content")).toBeInTheDocument();
    });

    it("renders version selector", () => {
      render(
        <SidebarFooter>
          <select data-testid="version-select">
            <option>v1.0.0</option>
            <option>v0.9.0</option>
          </select>
        </SidebarFooter>,
      );

      const select = screen.getByTestId("version-select");
      expect(select).toBeInTheDocument();
      expect(screen.getByText("v1.0.0")).toBeInTheDocument();
    });

    it("renders links", () => {
      render(
        <SidebarFooter>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </SidebarFooter>,
      );

      const privacyLink = screen.getByRole("link", { name: "Privacy" });
      const termsLink = screen.getByRole("link", { name: "Terms" });

      expect(privacyLink).toBeInTheDocument();
      expect(termsLink).toBeInTheDocument();
    });

    it("renders complex content structure", () => {
      render(
        <SidebarFooter>
          <div>
            <p>Version 1.0.0</p>
            <div>
              <a href="/docs">Documentation</a>
              <a href="/support">Support</a>
            </div>
          </div>
        </SidebarFooter>,
      );

      expect(screen.getByText("Version 1.0.0")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Documentation" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Support" })).toBeInTheDocument();
    });
  });

  describe("Custom Class Name", () => {
    it("applies custom className", () => {
      const { container } = render(
        <SidebarFooter className="custom-footer">
          <div>Content</div>
        </SidebarFooter>,
      );

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("custom-footer");
    });

    it("combines custom className with base class", () => {
      const { container } = render(
        <SidebarFooter className="custom">
          <div>Content</div>
        </SidebarFooter>,
      );

      const footer = container.querySelector("footer");
      expect(footer).toHaveClass(styles.sidebarFooter);
      expect(footer).toHaveClass("custom");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic HTML", () => {
      const { container } = render(
        <SidebarFooter>
          <div>Footer</div>
        </SidebarFooter>,
      );

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
      expect(footer?.tagName).toBe("FOOTER");
    });

    it("preserves child accessibility attributes", () => {
      render(
        <SidebarFooter>
          <button type="button" aria-label="Close">
            X
          </button>
        </SidebarFooter>,
      );

      const button = screen.getByRole("button", { name: "Close" });
      expect(button).toBeInTheDocument();
    });

    it("maintains interactive elements", () => {
      render(
        <SidebarFooter>
          <select aria-label="Select version">
            <option>v1.0.0</option>
          </select>
        </SidebarFooter>,
      );

      const select = screen.getByRole("combobox", { name: "Select version" });
      expect(select).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("renders with empty string", () => {
      const { container } = render(<SidebarFooter>{""}</SidebarFooter>);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
      expect(footer?.textContent).toBe("");
    });

    it("renders with null children", () => {
      const { container } = render(<SidebarFooter>{null}</SidebarFooter>);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("renders with undefined children", () => {
      const { container } = render(<SidebarFooter>{undefined}</SidebarFooter>);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("renders with number as children", () => {
      render(<SidebarFooter>{42}</SidebarFooter>);

      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("renders with boolean children", () => {
      const { container } = render(<SidebarFooter>{true}</SidebarFooter>);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
      // Booleans don't render in React
      expect(footer?.textContent).toBe("");
    });

    it("renders with array of children", () => {
      render(<SidebarFooter>{["Item 1", "Item 2", "Item 3"]}</SidebarFooter>);

      expect(screen.getByText("Item 1Item 2Item 3")).toBeInTheDocument();
    });
  });

  describe("Typical Use Cases", () => {
    it("renders version information", () => {
      render(
        <SidebarFooter>
          <div style={{ padding: "16px" }}>
            <p style={{ margin: 0 }}>Version 1.0.0</p>
            <p style={{ margin: 0, fontSize: "12px" }}>© 2025 Company Name</p>
          </div>
        </SidebarFooter>,
      );

      expect(screen.getByText("Version 1.0.0")).toBeInTheDocument();
      expect(screen.getByText("© 2025 Company Name")).toBeInTheDocument();
    });

    it("renders legal links", () => {
      render(
        <SidebarFooter>
          <div style={{ padding: "16px" }}>
            <a href="/privacy">Privacy Policy</a>
            {" | "}
            <a href="/terms">Terms of Service</a>
          </div>
        </SidebarFooter>,
      );

      expect(
        screen.getByRole("link", { name: "Privacy Policy" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Terms of Service" }),
      ).toBeInTheDocument();
    });

    it("renders social media links", () => {
      render(
        <SidebarFooter>
          <div>
            <a href="https://twitter.com/company">Twitter</a>
            <a href="https://github.com/company">GitHub</a>
            <a href="https://discord.gg/company">Discord</a>
          </div>
        </SidebarFooter>,
      );

      expect(screen.getByRole("link", { name: "Twitter" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Discord" })).toBeInTheDocument();
    });
  });
});
