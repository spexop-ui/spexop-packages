/**
 * Alert Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

/// <reference path="../../../vitest.d.ts" />

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./Alert";
import styles from "./Alert.module.css";

describe("Alert", () => {
  describe("Rendering", () => {
    it("should render with text content", () => {
      render(<Alert>Alert message</Alert>);
      expect(screen.getByText("Alert message")).toBeInTheDocument();
    });

    it("should render with default props", () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass(styles.alert);
      expect(alert).toHaveClass(styles["variant-info"]);
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Alert className="custom-alert">Alert message</Alert>,
      );
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass("custom-alert");
    });

    it("should render with title", () => {
      render(<Alert title="Important">Alert message</Alert>);
      expect(screen.getByText("Important")).toBeInTheDocument();
      expect(screen.getByText("Alert message")).toBeInTheDocument();
    });

    it("should render without title", () => {
      render(<Alert>Alert message</Alert>);
      expect(screen.getByText("Alert message")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should render info variant", () => {
      const { container } = render(<Alert variant="info">Info message</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass(styles["variant-info"]);
    });

    it("should render success variant", () => {
      const { container } = render(
        <Alert variant="success">Success message</Alert>,
      );
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass(styles["variant-success"]);
    });

    it("should render warning variant", () => {
      const { container } = render(
        <Alert variant="warning">Warning message</Alert>,
      );
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass(styles["variant-warning"]);
    });

    it("should render error variant", () => {
      const { container } = render(
        <Alert variant="error">Error message</Alert>,
      );
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass(styles["variant-error"]);
    });
  });

  describe("Icons", () => {
    it("should render with default icon for info variant", () => {
      const { container } = render(<Alert variant="info">Info message</Alert>);
      const icon = container.querySelector(`.${styles.icon}`);
      expect(icon).toBeInTheDocument();
    });

    it("should render with default icon for success variant", () => {
      const { container } = render(
        <Alert variant="success">Success message</Alert>,
      );
      const icon = container.querySelector(`.${styles.icon}`);
      expect(icon).toBeInTheDocument();
    });

    it("should render with default icon for warning variant", () => {
      const { container } = render(
        <Alert variant="warning">Warning message</Alert>,
      );
      const icon = container.querySelector(`.${styles.icon}`);
      expect(icon).toBeInTheDocument();
    });

    it("should render with default icon for error variant", () => {
      const { container } = render(
        <Alert variant="error">Error message</Alert>,
      );
      const icon = container.querySelector(`.${styles.icon}`);
      expect(icon).toBeInTheDocument();
    });

    it("should render with custom icon", () => {
      const customIcon = <span data-testid="custom-icon">⚠️</span>;
      render(<Alert icon={customIcon}>Alert with custom icon</Alert>);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("should not render icon when showIcon is false", () => {
      const { container } = render(
        <Alert showIcon={false}>Alert without icon</Alert>,
      );
      const icon = container.querySelector(`.${styles.icon}`);
      expect(icon).not.toBeInTheDocument();
    });

    it("should prioritize custom icon over default icon", () => {
      const customIcon = <span data-testid="custom-icon">⚠️</span>;
      render(
        <Alert icon={customIcon} variant="info">
          Alert message
        </Alert>,
      );
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
  });

  describe("Dismissible Functionality", () => {
    it("should not render dismiss button when dismissible is false", () => {
      render(<Alert dismissible={false}>Alert message</Alert>);
      expect(screen.queryByLabelText("Dismiss alert")).not.toBeInTheDocument();
    });

    it("should render dismiss button when dismissible is true", () => {
      render(
        <Alert dismissible onDismiss={vi.fn()}>
          Alert message
        </Alert>,
      );
      expect(screen.getByLabelText("Dismiss alert")).toBeInTheDocument();
    });

    it("should call onDismiss when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();

      render(
        <Alert dismissible onDismiss={onDismiss}>
          Alert message
        </Alert>,
      );

      const dismissButton = screen.getByLabelText("Dismiss alert");
      await user.click(dismissButton);

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it("should call onDismiss when dismiss button is activated with Enter key", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();

      render(
        <Alert dismissible onDismiss={onDismiss}>
          Alert message
        </Alert>,
      );

      const dismissButton = screen.getByLabelText("Dismiss alert");
      dismissButton.focus();
      await user.keyboard("{Enter}");

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it("should call onDismiss when dismiss button is activated with Space key", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();

      render(
        <Alert dismissible onDismiss={onDismiss}>
          Alert message
        </Alert>,
      );

      const dismissButton = screen.getByLabelText("Dismiss alert");
      dismissButton.focus();
      await user.keyboard(" ");

      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("ARIA Attributes", () => {
    it("should have role='alert' by default", () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
    });

    it("should have aria-live='assertive' when role is 'alert'", () => {
      const { container } = render(<Alert role="alert">Alert message</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveAttribute("aria-live", "assertive");
    });

    it("should have aria-live='polite' when role is 'status'", () => {
      const { container } = render(<Alert role="status">Alert message</Alert>);
      const alert = container.querySelector('[role="status"]');
      expect(alert).toHaveAttribute("aria-live", "polite");
    });

    it("should support custom role", () => {
      const { container } = render(<Alert role="region">Alert message</Alert>);
      const alert = container.querySelector('[role="region"]');
      expect(alert).toBeInTheDocument();
    });
  });

  describe("Complex Content", () => {
    it("should render ReactNode children", () => {
      render(
        <Alert>
          <p>First paragraph</p>
          <p>Second paragraph</p>
        </Alert>,
      );
      expect(screen.getByText("First paragraph")).toBeInTheDocument();
      expect(screen.getByText("Second paragraph")).toBeInTheDocument();
    });

    it("should render with title and complex children", () => {
      render(
        <Alert title="Complex Alert">
          <p>Paragraph 1</p>
          <button type="button">Action</button>
        </Alert>,
      );
      expect(screen.getByText("Complex Alert")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Action" }),
      ).toBeInTheDocument();
    });

    it("should render ReactNode title", () => {
      render(<Alert title={<strong>Bold Title</strong>}>Alert message</Alert>);
      const title = screen.getByText("Bold Title");
      expect(title.tagName).toBe("STRONG");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty string content", () => {
      const { container } = render(<Alert>{""}</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toBeInTheDocument();
    });

    it("should handle zero as content", () => {
      render(<Alert>{0}</Alert>);
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("should handle very long text", () => {
      const longText =
        "This is a very long alert message that should still render correctly and wrap appropriately within the alert container without breaking the layout or causing any visual issues.";
      render(<Alert>{longText}</Alert>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it("should handle undefined className", () => {
      const { container } = render(
        <Alert className={undefined}>Alert message</Alert>,
      );
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass(styles.alert);
    });

    it("should handle empty className", () => {
      const { container } = render(<Alert className="">Alert message</Alert>);
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveClass(styles.alert);
    });
  });

  describe("Multiple Alerts", () => {
    it("should render multiple alerts independently", () => {
      render(
        <>
          <Alert variant="info">Info alert</Alert>
          <Alert variant="success">Success alert</Alert>
          <Alert variant="error">Error alert</Alert>
        </>,
      );

      expect(screen.getByText("Info alert")).toBeInTheDocument();
      expect(screen.getByText("Success alert")).toBeInTheDocument();
      expect(screen.getByText("Error alert")).toBeInTheDocument();
    });

    it("should maintain separate styles for multiple alerts", () => {
      const { container } = render(
        <>
          <Alert variant="info">Info alert</Alert>
          <Alert variant="success">Success alert</Alert>
        </>,
      );

      const alerts = container.querySelectorAll('[role="alert"]');
      expect(alerts[0]).toHaveClass(styles["variant-info"]);
      expect(alerts[1]).toHaveClass(styles["variant-success"]);
    });

    it("should handle multiple dismissible alerts", async () => {
      const user = userEvent.setup();
      const onDismiss1 = vi.fn();
      const onDismiss2 = vi.fn();

      render(
        <>
          <Alert dismissible onDismiss={onDismiss1}>
            Alert 1
          </Alert>
          <Alert dismissible onDismiss={onDismiss2}>
            Alert 2
          </Alert>
        </>,
      );

      const dismissButtons = screen.getAllByLabelText("Dismiss alert");
      await user.click(dismissButtons[0]);
      await user.click(dismissButtons[1]);

      expect(onDismiss1).toHaveBeenCalledTimes(1);
      expect(onDismiss2).toHaveBeenCalledTimes(1);
    });
  });

  describe("Keyboard Navigation", () => {
    it("should allow tabbing to dismiss button", async () => {
      const user = userEvent.setup();

      render(
        <Alert dismissible onDismiss={vi.fn()}>
          Alert message
        </Alert>,
      );

      await user.tab();
      const dismissButton = screen.getByLabelText("Dismiss alert");
      expect(dismissButton).toHaveFocus();
    });

    it("should not be focusable when not dismissible", async () => {
      const user = userEvent.setup();

      render(<Alert dismissible={false}>Alert message</Alert>);

      await user.tab();
      expect(screen.queryByLabelText("Dismiss alert")).not.toBeInTheDocument();
    });
  });

  describe("Combination of Props", () => {
    it("should render with all props combined", () => {
      const customIcon = <span data-testid="custom-icon">⚠️</span>;
      const onDismiss = vi.fn();

      const { container } = render(
        <Alert
          variant="warning"
          title="Warning Title"
          dismissible
          onDismiss={onDismiss}
          icon={customIcon}
          className="custom-class"
          role="status"
        >
          Warning message content
        </Alert>,
      );

      const alert = container.querySelector('[role="status"]');
      expect(alert).toHaveClass(styles["variant-warning"]);
      expect(alert).toHaveClass("custom-class");
      expect(screen.getByText("Warning Title")).toBeInTheDocument();
      expect(screen.getByText("Warning message content")).toBeInTheDocument();
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      expect(screen.getByLabelText("Dismiss alert")).toBeInTheDocument();
    });
  });
});
