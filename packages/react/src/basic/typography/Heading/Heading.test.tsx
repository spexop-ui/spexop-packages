/**
 * Heading Component Tests
 *
 * @component Heading
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading.js";
import styles from "./Heading.module.css";

describe("Heading", () => {
  it("renders with correct text", () => {
    render(<Heading level={1}>Test Heading</Heading>);
    expect(screen.getByRole("heading")).toHaveTextContent("Test Heading");
  });

  it("renders correct heading level", () => {
    const { rerender } = render(<Heading level={1}>H1</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

    rerender(<Heading level={2}>H2</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

    rerender(<Heading level={3}>H3</Heading>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();

    rerender(<Heading level={4}>H4</Heading>);
    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();

    rerender(<Heading level={5}>H5</Heading>);
    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();

    rerender(<Heading level={6}>H6</Heading>);
    expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();
  });

  it("applies weight classes", () => {
    const { rerender } = render(
      <Heading level={2} weight="regular">
        Regular
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass(styles["weight-regular"]);

    rerender(
      <Heading level={2} weight="semibold">
        Semibold
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass(styles["weight-semibold"]);

    rerender(
      <Heading level={2} weight="bold">
        Bold
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass(styles["weight-bold"]);
  });

  it("applies alignment classes", () => {
    const { rerender } = render(
      <Heading level={2} align="left">
        Left
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass(styles["align-left"]);

    rerender(
      <Heading level={2} align="center">
        Center
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass(styles["align-center"]);

    rerender(
      <Heading level={2} align="right">
        Right
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass(styles["align-right"]);
  });

  it("applies size override classes", () => {
    render(
      <Heading level={2} size="xl">
        Extra Large
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass(styles["size-xl"]);
  });

  it("removes margin when noMargin is true", () => {
    render(
      <Heading level={2} noMargin>
        No Margin
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass(styles["no-margin"]);
  });

  it("applies custom className", () => {
    render(
      <Heading level={2} className="custom-class">
        Custom
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass("custom-class");
  });

  it("applies custom id", () => {
    render(
      <Heading level={2} id="custom-id">
        With ID
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveAttribute("id", "custom-id");
  });

  it("applies aria-label", () => {
    render(
      <Heading level={2} aria-label="Section heading">
        Heading
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveAttribute(
      "aria-label",
      "Section heading",
    );
  });

  it("applies aria-describedby", () => {
    render(
      <Heading level={2} aria-describedby="description">
        Heading
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveAttribute(
      "aria-describedby",
      "description",
    );
  });

  it("defaults to h2 when level not provided", () => {
    render(<Heading>Default Heading</Heading>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("combines multiple classes correctly", () => {
    render(
      <Heading level={1} weight="bold" align="center" size="4xl">
        Combined
      </Heading>,
    );
    const heading = screen.getByRole("heading");
    expect(heading).toHaveClass(styles["level-1"]);
    expect(heading).toHaveClass(styles["weight-bold"]);
    expect(heading).toHaveClass(styles["align-center"]);
    expect(heading).toHaveClass(styles["size-4xl"]);
  });
});
