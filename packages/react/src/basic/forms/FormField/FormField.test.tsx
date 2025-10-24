/**
 * FormField Component Tests
 *
 * @packageName @spexop/react
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 * @version 0.4.0
 * @since 2025-10-24
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it } from "vitest";
import { FormProvider } from "../../../providers/FormProvider/index.js";
import { FormField } from "./FormField.js";

describe("FormField", () => {
  it("renders with label", () => {
    render(
      <FormProvider>
        <FormField name="email" label="Email Address">
          <input type="email" />
        </FormField>
      </FormProvider>,
    );

    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  });

  it("shows required indicator", () => {
    render(
      <FormProvider>
        <FormField
          name="email"
          label="Email Address"
          rules={[{ type: "required" }]}
        >
          <input type="email" />
        </FormField>
      </FormProvider>,
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(
      <FormProvider>
        <FormField
          name="email"
          label="Email Address"
          helperText="We'll never share your email"
        >
          <input type="email" />
        </FormField>
      </FormProvider>,
    );

    expect(
      screen.getByText("We'll never share your email"),
    ).toBeInTheDocument();
  });

  it("shows validation error on blur", async () => {
    const user = userEvent.setup();

    render(
      <FormProvider>
        <FormField
          name="email"
          label="Email Address"
          rules={[{ type: "required", message: "Email is required" }]}
        >
          <input type="email" />
        </FormField>
      </FormProvider>,
    );

    const input = screen.getByLabelText("Email Address");
    await user.click(input);
    await user.tab();

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();

    render(
      <FormProvider>
        <FormField
          name="email"
          label="Email Address"
          rules={[{ type: "email", message: "Invalid email" }]}
        >
          <input type="email" />
        </FormField>
      </FormProvider>,
    );

    const input = screen.getByLabelText("Email Address");
    await user.type(input, "invalid-email");
    await user.tab();

    expect(await screen.findByText("Invalid email")).toBeInTheDocument();
  });

  it("clears error when valid input is provided", async () => {
    const user = userEvent.setup();

    render(
      <FormProvider>
        <FormField
          name="email"
          label="Email Address"
          rules={[{ type: "email", message: "Invalid email" }]}
        >
          <input type="email" />
        </FormField>
      </FormProvider>,
    );

    const input = screen.getByLabelText("Email Address");
    await user.type(input, "invalid");
    await user.tab();

    expect(await screen.findByText("Invalid email")).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "valid@email.com");
    await user.tab();

    expect(screen.queryByText("Invalid email")).not.toBeInTheDocument();
  });

  it("passes field value to child component", async () => {
    const user = userEvent.setup();

    render(
      <FormProvider>
        <FormField name="email" label="Email Address">
          <input type="email" />
        </FormField>
      </FormProvider>,
    );

    const input = screen.getByLabelText("Email Address") as HTMLInputElement;
    await user.type(input, "test@example.com");

    expect(input.value).toBe("test@example.com");
  });

  it("supports custom error message override", async () => {
    const user = userEvent.setup();

    render(
      <FormProvider>
        <FormField
          name="email"
          label="Email Address"
          rules={[{ type: "required" }]}
          errorMessage="Custom error message"
        >
          <input type="email" />
        </FormField>
      </FormProvider>,
    );

    const input = screen.getByLabelText("Email Address");
    await user.click(input);
    await user.tab();

    expect(await screen.findByText("Custom error message")).toBeInTheDocument();
  });

  it("can hide error messages", async () => {
    const user = userEvent.setup();

    render(
      <FormProvider>
        <FormField
          name="email"
          label="Email Address"
          rules={[{ type: "required", message: "Email is required" }]}
          hideError
        >
          <input type="email" />
        </FormField>
      </FormProvider>,
    );

    const input = screen.getByLabelText("Email Address");
    await user.click(input);
    await user.tab();

    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });

  it("sets aria attributes correctly", () => {
    render(
      <FormProvider>
        <FormField
          name="email"
          label="Email Address"
          rules={[{ type: "required" }]}
          helperText="Helper text"
        >
          <input type="email" />
        </FormField>
      </FormProvider>,
    );

    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAttribute("aria-describedby");
  });
});
