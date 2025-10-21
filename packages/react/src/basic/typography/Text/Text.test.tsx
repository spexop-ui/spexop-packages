/**
 * Text Component Tests
 *
 * @component Text
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text.js";

describe("Text", () => {
  it("renders with correct text", () => {
    render(<Text>Test content</Text>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders as paragraph by default", () => {
    const { container } = render(<Text>Paragraph</Text>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  it("renders as different element when specified", () => {
    const { container } = render(<Text as="span">Span text</Text>);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("applies size classes", () => {
    const { rerender } = render(<Text size="sm">Small</Text>);
    expect(screen.getByText("Small")).toHaveClass("size-sm");

    rerender(<Text size="lg">Large</Text>);
    expect(screen.getByText("Large")).toHaveClass("size-lg");

    rerender(<Text size="2xl">2XL</Text>);
    expect(screen.getByText("2XL")).toHaveClass("size-2xl");
  });

  it("applies weight classes", () => {
    const { rerender } = render(<Text weight="regular">Regular</Text>);
    expect(screen.getByText("Regular")).toHaveClass("weight-regular");

    rerender(<Text weight="semibold">Semibold</Text>);
    expect(screen.getByText("Semibold")).toHaveClass("weight-semibold");

    rerender(<Text weight="bold">Bold</Text>);
    expect(screen.getByText("Bold")).toHaveClass("weight-bold");
  });

  it("applies alignment classes", () => {
    const { rerender } = render(<Text align="left">Left</Text>);
    expect(screen.getByText("Left")).toHaveClass("align-left");

    rerender(<Text align="center">Center</Text>);
    expect(screen.getByText("Center")).toHaveClass("align-center");

    rerender(<Text align="right">Right</Text>);
    expect(screen.getByText("Right")).toHaveClass("align-right");

    rerender(<Text align="justify">Justify</Text>);
    expect(screen.getByText("Justify")).toHaveClass("align-justify");
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Text variant="default">Default</Text>);
    expect(screen.getByText("Default")).toHaveClass("variant-default");

    rerender(<Text variant="secondary">Secondary</Text>);
    expect(screen.getByText("Secondary")).toHaveClass("variant-secondary");

    rerender(<Text variant="success">Success</Text>);
    expect(screen.getByText("Success")).toHaveClass("variant-success");

    rerender(<Text variant="error">Error</Text>);
    expect(screen.getByText("Error")).toHaveClass("variant-error");

    rerender(<Text variant="warning">Warning</Text>);
    expect(screen.getByText("Warning")).toHaveClass("variant-warning");
  });

  it("applies truncate class", () => {
    render(<Text truncate>Truncated text</Text>);
    expect(screen.getByText("Truncated text")).toHaveClass("truncate");
  });

  it("applies clamp classes", () => {
    const { rerender } = render(<Text clamp={2}>Clamped text</Text>);
    expect(screen.getByText("Clamped text")).toHaveClass("clamp-2");

    rerender(<Text clamp={3}>Clamped text</Text>);
    expect(screen.getByText("Clamped text")).toHaveClass("clamp-3");
  });

  it("removes margin when noMargin is true", () => {
    render(<Text noMargin>No margin</Text>);
    expect(screen.getByText("No margin")).toHaveClass("no-margin");
  });

  it("applies custom className", () => {
    render(<Text className="custom-class">Custom</Text>);
    expect(screen.getByText("Custom")).toHaveClass("custom-class");
  });

  it("applies custom id", () => {
    render(<Text id="custom-id">With ID</Text>);
    expect(screen.getByText("With ID")).toHaveAttribute("id", "custom-id");
  });

  it("applies aria-label", () => {
    render(<Text aria-label="Descriptive label">Text</Text>);
    expect(screen.getByText("Text")).toHaveAttribute(
      "aria-label",
      "Descriptive label",
    );
  });

  it("applies aria-live", () => {
    render(<Text aria-live="polite">Live text</Text>);
    expect(screen.getByText("Live text")).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("combines multiple classes correctly", () => {
    render(
      <Text size="lg" weight="bold" align="center" variant="success">
        Combined
      </Text>,
    );
    const text = screen.getByText("Combined");
    expect(text).toHaveClass("size-lg");
    expect(text).toHaveClass("weight-bold");
    expect(text).toHaveClass("align-center");
    expect(text).toHaveClass("variant-success");
  });
});
