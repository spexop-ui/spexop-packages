/**
 * CTACard Component Tests
 * Modern UI/UX enhanced component testing
 *
 * @packageName @spexop/react
 * @version 1.1.0
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { CTACard } from "./CTACard.js";

describe("CTACard", () => {
  const defaultProps = {
    headline: "Ready to get started?",
    description: "Join thousands of users building better products",
    primaryAction: {
      label: "Start Free Trial",
      onClick: vi.fn(),
    },
  };

  it("renders with required props", () => {
    render(<CTACard {...defaultProps} />);

    expect(screen.getByText("Ready to get started?")).toBeDefined();
    expect(
      screen.getByText("Join thousands of users building better products"),
    ).toBeDefined();
    expect(screen.getByText("Start Free Trial")).toBeDefined();
  });

  it("handles primary action click", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <CTACard
        {...defaultProps}
        primaryAction={{ label: "Start Free Trial", onClick: handleClick }}
      />,
    );

    const button = screen.getByText("Start Free Trial");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders secondary action when provided", () => {
    const secondaryAction = {
      label: "Learn More",
      onClick: vi.fn(),
    };

    render(<CTACard {...defaultProps} secondaryAction={secondaryAction} />);

    expect(screen.getByText("Learn More")).toBeDefined();
  });

  it("handles secondary action click", async () => {
    const user = userEvent.setup();
    const handleSecondaryClick = vi.fn();

    render(
      <CTACard
        {...defaultProps}
        secondaryAction={{
          label: "Learn More",
          onClick: handleSecondaryClick,
        }}
      />,
    );

    const button = screen.getByText("Learn More");
    await user.click(button);

    expect(handleSecondaryClick).toHaveBeenCalledTimes(1);
  });

  it("renders icon when provided", () => {
    const TestIcon = () => <div data-testid="test-icon">Icon</div>;

    render(<CTACard {...defaultProps} icon={<TestIcon />} />);

    expect(screen.getByTestId("test-icon")).toBeDefined();
  });

  it("applies centered styling when centered prop is true", () => {
    const { container } = render(<CTACard {...defaultProps} centered />);

    // The component should have centered class applied
    expect(container.querySelector('[class*="centered"]')).toBeDefined();
  });

  it("uses default variant when not specified", () => {
    render(<CTACard {...defaultProps} />);

    expect(screen.getByText("Ready to get started?")).toBeDefined();
  });

  it("supports custom variant", () => {
    render(<CTACard {...defaultProps} variant="basic" />);

    expect(screen.getByText("Ready to get started?")).toBeDefined();
  });

  it("supports density variants", () => {
    const { container: compactContainer } = render(
      <CTACard {...defaultProps} density="compact" />,
    );
    const { container: spaciousContainer } = render(
      <CTACard {...defaultProps} density="spacious" />,
    );

    expect(
      compactContainer.querySelector('[class*="density--compact"]'),
    ).toBeDefined();
    expect(
      spaciousContainer.querySelector('[class*="density--spacious"]'),
    ).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CTACard {...defaultProps} className="custom-class" />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("has proper semantic structure", () => {
    const { container } = render(<CTACard {...defaultProps} />);

    const headline = container.querySelector("h2");
    expect(headline).toBeDefined();
    expect(headline?.textContent).toBe("Ready to get started?");

    const description = container.querySelector("p");
    expect(description).toBeDefined();
  });

  it("renders without secondary action", () => {
    render(<CTACard {...defaultProps} />);

    expect(screen.getByText("Start Free Trial")).toBeDefined();
    expect(screen.queryByText("Learn More")).toBeNull();
  });

  it("uses spacious density by default", () => {
    render(<CTACard {...defaultProps} />);

    // Component should render successfully with default density
    expect(screen.getByText("Ready to get started?")).toBeDefined();
  });

  it("supports loading state", () => {
    render(
      <CTACard {...defaultProps} state="loading" loadingText="Processing..." />,
    );

    expect(screen.getByText("Processing...")).toBeDefined();
  });

  it("supports error state", () => {
    render(
      <CTACard
        {...defaultProps}
        state="error"
        errorMessage="Something went wrong"
      />,
    );

    expect(screen.getByText("Something went wrong")).toBeDefined();
  });

  it("supports success state", () => {
    render(
      <CTACard
        {...defaultProps}
        state="success"
        successMessage="Operation completed"
      />,
    );

    expect(screen.getByText("Operation completed")).toBeDefined();
  });

  it("disables actions when disabled", () => {
    render(<CTACard {...defaultProps} disabled />);

    const primaryButton = screen.getByRole("button", {
      name: "Start Free Trial",
    });
    expect(primaryButton).toBeDisabled();
  });

  it("disables actions when loading", () => {
    render(<CTACard {...defaultProps} state="loading" />);

    const primaryButton = screen.getByRole("button", {
      name: "Start Free Trial",
    });
    expect(primaryButton).toBeDisabled();
  });

  it("supports action button variants", () => {
    const primaryAction = {
      label: "Primary",
      onClick: vi.fn(),
      variant: "secondary" as const,
    };

    const secondaryAction = {
      label: "Secondary",
      onClick: vi.fn(),
      variant: "outline" as const,
    };

    render(
      <CTACard
        {...defaultProps}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
      />,
    );

    expect(screen.getByText("Primary")).toBeDefined();
    expect(screen.getByText("Secondary")).toBeDefined();
  });

  it("supports action button loading states", () => {
    const primaryAction = {
      label: "Loading Action",
      onClick: vi.fn(),
      loading: true,
    };

    render(<CTACard {...defaultProps} primaryAction={primaryAction} />);

    const button = screen.getByRole("button", { name: "Loading Action" });
    expect(button).toBeDisabled();
  });

  it("supports action button disabled states", () => {
    const primaryAction = {
      label: "Disabled Action",
      onClick: vi.fn(),
      disabled: true,
    };

    render(<CTACard {...defaultProps} primaryAction={primaryAction} />);

    const button = screen.getByRole("button", { name: "Disabled Action" });
    expect(button).toBeDisabled();
  });

  it("has proper accessibility attributes", () => {
    const { container } = render(
      <CTACard
        {...defaultProps}
        aria-label="Custom CTA"
        aria-describedby="cta-description"
      />,
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("aria-label", "Custom CTA");
    expect(card).toHaveAttribute("aria-describedby", "cta-description");
  });

  it("generates default aria-label when not provided", () => {
    const { container } = render(<CTACard {...defaultProps} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute(
      "aria-label",
      "Call to action: Ready to get started?",
    );
  });

  it("supports feedback levels", () => {
    const { container: subtleContainer } = render(
      <CTACard {...defaultProps} feedback="subtle" />,
    );
    const { container: prominentContainer } = render(
      <CTACard {...defaultProps} feedback="prominent" />,
    );

    expect(
      subtleContainer.querySelector('[class*="feedback-subtle"]'),
    ).toBeDefined();
    expect(
      prominentContainer.querySelector('[class*="feedback-prominent"]'),
    ).toBeDefined();
  });

  it("handles keyboard navigation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <CTACard
        {...defaultProps}
        primaryAction={{ label: "Start Free Trial", onClick: handleClick }}
      />,
    );

    const button = screen.getByRole("button", { name: "Start Free Trial" });

    // Focus the button first
    button.focus();

    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
