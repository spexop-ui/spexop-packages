/**
 * Link Component Tests
 *
 * @component Link
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Link } from "./Link.js";
import styles from "./Link.module.css";

describe("Link", () => {
  it("renders with correct text", () => {
    render(<Link href="/test">Click me</Link>);
    expect(screen.getByRole("link")).toHaveTextContent("Click me");
  });

  it("applies correct href", () => {
    render(<Link href="/docs">Documentation</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/docs");
  });

  it("applies variant classes", () => {
    const { rerender } = render(
      <Link href="/test" variant="text">
        Text
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass(styles.text);

    rerender(
      <Link href="/test" variant="ghost">
        Ghost
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass(styles.ghost);

    rerender(
      <Link href="/test" variant="outline">
        Outline
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass(styles.outline);

    rerender(
      <Link href="/test" variant="secondary">
        Secondary
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass(styles.secondary);

    rerender(
      <Link href="/test" variant="primary">
        Primary
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass(styles.primary);
  });

  it("applies size classes", () => {
    const { rerender } = render(
      <Link href="/test" size="sm">
        Small
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass(styles["size-sm"]);

    rerender(
      <Link href="/test" size="md">
        Medium
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass(styles["size-md"]);

    rerender(
      <Link href="/test" size="lg">
        Large
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass(styles["size-lg"]);
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(
      <Link href="/test" onClick={handleClick}>
        Click me
      </Link>,
    );

    screen.getByRole("link").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies active state", () => {
    render(
      <Link href="/test" active>
        Active Link
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass(styles.active);
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("handles aria-current attribute", () => {
    render(
      <Link href="/test" aria-current="step">
        Step Link
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "step");
  });

  it("applies full width class", () => {
    render(
      <Link href="/test" fullWidth>
        Full Width
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass(styles["full-width"]);
  });

  it("handles external links correctly", () => {
    render(
      <Link href="https://example.com" external>
        External Link
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass(styles.external);
  });

  it("handles disabled state", () => {
    const handleClick = vi.fn();
    render(
      <Link href="/test" disabled onClick={handleClick}>
        Disabled Link
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabIndex", "-1");

    link.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies aria-label", () => {
    render(
      <Link href="/test" aria-label="Go to homepage">
        Home
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "aria-label",
      "Go to homepage",
    );
  });

  it("applies custom className", () => {
    render(
      <Link href="/test" className="custom-class">
        Custom
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass("custom-class");
  });

  it("supports keyboard navigation", () => {
    render(<Link href="/test">Keyboard Link</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("tabIndex", "0");
  });

  it("renders children correctly", () => {
    render(
      <Link href="/test">
        <span>Icon</span>
        <span>Text</span>
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link.querySelector("span")).toBeInTheDocument();
  });
});
