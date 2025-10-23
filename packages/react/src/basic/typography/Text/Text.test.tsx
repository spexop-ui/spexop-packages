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
import styles from "./Text.module.css";

// Ensure Jest DOM matchers are available
import "@testing-library/jest-dom";

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
    expect(screen.getByText("Small")).toHaveClass(styles["size-sm"]);

    rerender(<Text size="lg">Large</Text>);
    expect(screen.getByText("Large")).toHaveClass(styles["size-lg"]);

    rerender(<Text size="2xl">2XL</Text>);
    expect(screen.getByText("2XL")).toHaveClass(styles["size-2xl"]);
  });

  it("applies weight classes", () => {
    const { rerender } = render(<Text weight="regular">Regular</Text>);
    expect(screen.getByText("Regular")).toHaveClass(styles["weight-regular"]);

    rerender(<Text weight="medium">Medium</Text>);
    expect(screen.getByText("Medium")).toHaveClass(styles["weight-medium"]);

    rerender(<Text weight="semibold">Semibold</Text>);
    expect(screen.getByText("Semibold")).toHaveClass(styles["weight-semibold"]);

    rerender(<Text weight="bold">Bold</Text>);
    expect(screen.getByText("Bold")).toHaveClass(styles["weight-bold"]);
  });

  it("applies alignment classes", () => {
    const { rerender } = render(<Text align="left">Left</Text>);
    expect(screen.getByText("Left")).toHaveClass(styles["align-left"]);

    rerender(<Text align="center">Center</Text>);
    expect(screen.getByText("Center")).toHaveClass(styles["align-center"]);

    rerender(<Text align="right">Right</Text>);
    expect(screen.getByText("Right")).toHaveClass(styles["align-right"]);

    rerender(<Text align="justify">Justify</Text>);
    expect(screen.getByText("Justify")).toHaveClass(styles["align-justify"]);
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Text variant="default">Default</Text>);
    expect(screen.getByText("Default")).toHaveClass(styles["variant-default"]);

    rerender(<Text variant="secondary">Secondary</Text>);
    expect(screen.getByText("Secondary")).toHaveClass(
      styles["variant-secondary"],
    );

    rerender(<Text variant="success">Success</Text>);
    expect(screen.getByText("Success")).toHaveClass(styles["variant-success"]);

    rerender(<Text variant="error">Error</Text>);
    expect(screen.getByText("Error")).toHaveClass(styles["variant-error"]);

    rerender(<Text variant="warning">Warning</Text>);
    expect(screen.getByText("Warning")).toHaveClass(styles["variant-warning"]);

    rerender(<Text variant="info">Info</Text>);
    expect(screen.getByText("Info")).toHaveClass(styles["variant-info"]);
  });

  it("applies truncate class", () => {
    render(<Text truncate>Truncated text</Text>);
    expect(screen.getByText("Truncated text")).toHaveClass(styles.truncate);
  });

  it("applies clamp classes", () => {
    const { rerender } = render(<Text clamp={2}>Clamped text</Text>);
    expect(screen.getByText("Clamped text")).toHaveClass(styles["clamp-2"]);

    rerender(<Text clamp={3}>Clamped text</Text>);
    expect(screen.getByText("Clamped text")).toHaveClass(styles["clamp-3"]);
  });

  it("removes margin when noMargin is true", () => {
    render(<Text noMargin>No margin</Text>);
    expect(screen.getByText("No margin")).toHaveClass(styles["no-margin"]);
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

  it("applies text decoration classes", () => {
    const { rerender } = render(<Text decoration="underline">Underlined</Text>);
    expect(screen.getByText("Underlined")).toHaveClass(
      styles["decoration-underline"],
    );

    rerender(<Text decoration="line-through">Strikethrough</Text>);
    expect(screen.getByText("Strikethrough")).toHaveClass(
      styles["decoration-line-through"],
    );

    rerender(<Text decoration="none">No decoration</Text>);
    expect(screen.getByText("No decoration")).not.toHaveClass(
      styles["decoration-underline"],
    );
  });

  it("applies text transform classes", () => {
    const { rerender } = render(<Text transform="uppercase">Uppercase</Text>);
    expect(screen.getByText("Uppercase")).toHaveClass(
      styles["transform-uppercase"],
    );

    rerender(<Text transform="lowercase">Lowercase</Text>);
    expect(screen.getByText("Lowercase")).toHaveClass(
      styles["transform-lowercase"],
    );

    rerender(<Text transform="capitalize">Capitalize</Text>);
    expect(screen.getByText("Capitalize")).toHaveClass(
      styles["transform-capitalize"],
    );
  });

  it("applies text overflow classes", () => {
    const { rerender } = render(<Text overflow="ellipsis">Ellipsis</Text>);
    expect(screen.getByText("Ellipsis")).toHaveClass(
      styles["overflow-ellipsis"],
    );

    rerender(<Text overflow="clip">Clip</Text>);
    // overflow="clip" is the default, so it doesn't add a class
    expect(screen.getByText("Clip")).not.toHaveClass(
      styles["overflow-ellipsis"],
    );
  });

  it("applies white space classes", () => {
    const { rerender } = render(<Text whiteSpace="nowrap">No wrap</Text>);
    expect(screen.getByText("No wrap")).toHaveClass(
      styles["whitespace-nowrap"],
    );

    rerender(<Text whiteSpace="pre">Pre</Text>);
    expect(screen.getByText("Pre")).toHaveClass(styles["whitespace-pre"]);

    rerender(<Text whiteSpace="pre-line">Pre line</Text>);
    expect(screen.getByText("Pre line")).toHaveClass(
      styles["whitespace-pre-line"],
    );
  });

  it("applies custom inline styles", () => {
    render(
      <Text
        lineHeight={1.8}
        letterSpacing={2}
        wordSpacing={4}
        style={{ color: "red" }}
      >
        Styled text
      </Text>,
    );
    const text = screen.getByText("Styled text");
    expect(text).toHaveStyle({
      lineHeight: "1.8",
      letterSpacing: "2px",
      wordSpacing: "4px",
      color: "rgb(255, 0, 0)",
    });
  });

  it("renders as different semantic elements", () => {
    const { rerender, container } = render(<Text as="strong">Strong</Text>);
    expect(container.querySelector("strong")).toBeInTheDocument();

    rerender(<Text as="em">Emphasis</Text>);
    expect(container.querySelector("em")).toBeInTheDocument();

    rerender(<Text as="small">Small</Text>);
    expect(container.querySelector("small")).toBeInTheDocument();

    rerender(<Text as="mark">Mark</Text>);
    expect(container.querySelector("mark")).toBeInTheDocument();
  });

  it("applies accessibility attributes", () => {
    render(
      <Text
        aria-label="Descriptive label"
        aria-live="polite"
        aria-describedby="description"
        aria-atomic={true}
        aria-relevant="additions"
        role="status"
        tabIndex={0}
      >
        Accessible text
      </Text>,
    );
    const text = screen.getByText("Accessible text");
    expect(text).toHaveAttribute("aria-label", "Descriptive label");
    expect(text).toHaveAttribute("aria-live", "polite");
    expect(text).toHaveAttribute("aria-describedby", "description");
    expect(text).toHaveAttribute("aria-atomic", "true");
    expect(text).toHaveAttribute("aria-relevant", "additions");
    expect(text).toHaveAttribute("role", "status");
    expect(text).toHaveAttribute("tabIndex", "0");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<Text ref={ref}>Ref text</Text>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    expect(ref.current).toHaveTextContent("Ref text");
  });

  it("handles clamp values correctly", () => {
    const { rerender } = render(<Text clamp={1}>Clamp 1</Text>);
    expect(screen.getByText("Clamp 1")).toHaveClass(styles["clamp-1"]);

    rerender(<Text clamp={3}>Clamp 3</Text>);
    expect(screen.getByText("Clamp 3")).toHaveClass(styles["clamp-3"]);

    rerender(<Text clamp={5}>Clamp 5</Text>);
    expect(screen.getByText("Clamp 5")).toHaveClass(styles["clamp-5"]);
  });

  it("combines multiple classes correctly", () => {
    render(
      <Text
        size="lg"
        weight="bold"
        align="center"
        variant="success"
        decoration="underline"
        transform="uppercase"
        whiteSpace="nowrap"
      >
        Combined
      </Text>,
    );
    const text = screen.getByText("Combined");
    expect(text).toHaveClass(styles["size-lg"]);
    expect(text).toHaveClass(styles["weight-bold"]);
    expect(text).toHaveClass(styles["align-center"]);
    expect(text).toHaveClass(styles["variant-success"]);
    expect(text).toHaveClass(styles["decoration-underline"]);
    expect(text).toHaveClass(styles["transform-uppercase"]);
    expect(text).toHaveClass(styles["whitespace-nowrap"]);
  });

  it("has correct display name", () => {
    expect(Text.displayName).toBe("Text");
  });
});
