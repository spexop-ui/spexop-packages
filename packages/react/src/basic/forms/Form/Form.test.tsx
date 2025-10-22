/**
 * Form Component Tests
 *
 * @component Form
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.1.0
 * @since 2025-10-21
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Form } from "./Form.js";
import styles from "./Form.module.css";

describe("Form", () => {
  it("renders form element", () => {
    const { container } = render(
      <Form>
        <input type="text" name="test" />
      </Form>,
    );
    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <Form>
        <input type="text" name="test" placeholder="Test input" />
      </Form>,
    );
    expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
  });

  it("handles submit events", async () => {
    const handleSubmit = vi.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );

    const form = screen.getByRole("button").closest("form");
    if (form) {
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
    }

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("applies variant classes", () => {
    const { rerender, container } = render(
      <Form variant="default">
        <input type="text" />
      </Form>,
    );
    expect(container.querySelector("form")).toHaveClass(
      styles["variant-default"],
    );

    rerender(
      <Form variant="card">
        <input type="text" />
      </Form>,
    );
    expect(container.querySelector("form")).toHaveClass(styles["variant-card"]);
  });

  it("shows loading overlay when loading", () => {
    render(
      <Form loading>
        <input type="text" />
      </Form>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("disables fieldset when loading", () => {
    const { container } = render(
      <Form loading>
        <input type="text" />
      </Form>,
    );
    const fieldset = container.querySelector("fieldset");
    expect(fieldset).toBeDisabled();
  });

  it("disables fieldset when disabled", () => {
    const { container } = render(
      <Form disabled>
        <input type="text" />
      </Form>,
    );
    const fieldset = container.querySelector("fieldset");
    expect(fieldset).toBeDisabled();
  });

  it("displays validation errors", () => {
    render(
      <Form
        validation={{
          isValid: false,
          errors: ["Error 1", "Error 2"],
          fieldErrors: {},
        }}
      >
        <input type="text" />
      </Form>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Error 1")).toBeInTheDocument();
    expect(screen.getByText("Error 2")).toBeInTheDocument();
  });

  it("does not show errors when form is valid", () => {
    render(
      <Form
        validation={{
          isValid: true,
          errors: [],
          fieldErrors: {},
        }}
      >
        <input type="text" />
      </Form>,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Form className="custom-class">
        <input type="text" />
      </Form>,
    );
    expect(container.querySelector("form")).toHaveClass("custom-class");
  });

  it("applies aria-label", () => {
    const { container } = render(
      <Form aria-label="Login form">
        <input type="text" />
      </Form>,
    );
    expect(container.querySelector("form")).toHaveAttribute(
      "aria-label",
      "Login form",
    );
  });

  it("prevents submit when loading", () => {
    const handleSubmit = vi.fn();
    render(
      <Form onSubmit={handleSubmit} loading>
        <button type="submit">Submit</button>
      </Form>,
    );

    const form = screen.getByRole("button").closest("form");
    if (form) {
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
    }

    // Submit should not be called when loading
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("prevents submit when disabled", () => {
    const handleSubmit = vi.fn();
    render(
      <Form onSubmit={handleSubmit} disabled>
        <button type="submit">Submit</button>
      </Form>,
    );

    const form = screen.getByRole("button").closest("form");
    if (form) {
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
    }

    // Submit should not be called when disabled
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("passes FormData to submit handler", async () => {
    const handleSubmit = vi.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <input type="text" name="username" defaultValue="testuser" />
        <button type="submit">Submit</button>
      </Form>,
    );

    const form = screen.getByRole("button").closest("form");
    if (form) {
      form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
    }

    expect(handleSubmit).toHaveBeenCalled();
    const callArgs = handleSubmit.mock.calls[0];
    expect(callArgs[1]).toBeInstanceOf(FormData);
  });
});
