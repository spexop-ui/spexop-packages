/**
 * Avatar Component Tests
 *
 * Comprehensive test suite covering functionality, accessibility, and edge cases.
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Avatar } from "./Avatar";
import styles from "./Avatar.module.css";

describe("Avatar", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const { container } = render(<Avatar />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(<Avatar className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render with size variants", () => {
      const { container: xsContainer } = render(<Avatar size="xs" />);
      expect(xsContainer.firstChild).toHaveClass(styles["size-xs"]);

      const { container: xlContainer } = render(<Avatar size="xl" />);
      expect(xlContainer.firstChild).toHaveClass(styles["size-xl"]);

      const { container: xxlContainer } = render(<Avatar size="2xl" />);
      expect(xxlContainer.firstChild).toHaveClass(styles["size-2xl"]);
    });

    it("should render with shape variants", () => {
      const { container: circleContainer } = render(<Avatar shape="circle" />);
      expect(circleContainer.firstChild).toHaveClass(styles["shape-circle"]);

      const { container: squareContainer } = render(<Avatar shape="square" />);
      expect(squareContainer.firstChild).toHaveClass(styles["shape-square"]);
    });
  });

  describe("Image Display", () => {
    it("should render image when src is provided", () => {
      render(<Avatar name="John Doe" src="/test.jpg" />);
      const img = screen.getByRole("img", { hidden: true });
      expect(img).toHaveAttribute("src", "/test.jpg");
    });

    it("should use name as default alt text", () => {
      render(<Avatar name="John Doe" src="/test.jpg" />);
      const img = screen.getByRole("img", { hidden: true });
      expect(img).toHaveAttribute("alt", "John Doe");
    });

    it("should use custom alt text when provided", () => {
      render(<Avatar name="John Doe" src="/test.jpg" alt="Profile picture" />);
      const img = screen.getByRole("img", { hidden: true });
      expect(img).toHaveAttribute("alt", "Profile picture");
    });

    it("should fallback to initials on image error", async () => {
      render(<Avatar name="John Doe" src="/invalid.jpg" />);

      const img = screen.getByRole("img", { hidden: true });

      // Simulate image load error
      img.dispatchEvent(new Event("error"));

      await waitFor(() => {
        expect(screen.getByText("JD")).toBeInTheDocument();
      });
    });
  });

  describe("Initials Display", () => {
    it("should display initials from name", () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should display first two letters for single name", () => {
      render(<Avatar name="John" />);
      expect(screen.getByText("JO")).toBeInTheDocument();
    });

    it("should display first and last initials for multiple names", () => {
      render(<Avatar name="John Michael Doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should handle names with extra whitespace", () => {
      render(<Avatar name="  John   Doe  " />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should convert initials to uppercase", () => {
      render(<Avatar name="john doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should have aria-label with full name", () => {
      render(<Avatar name="John Doe" />);
      const initials = screen.getByText("JD");
      expect(initials).toHaveAttribute("aria-label", "John Doe");
    });
  });

  describe("Fallback Icon", () => {
    it("should display default fallback icon when no name or src", () => {
      const { container } = render(<Avatar />);
      expect(
        container.querySelector(`.${styles.fallback}`),
      ).toBeInTheDocument();
    });

    it("should display custom fallback icon", () => {
      const customIcon = <span data-testid="custom-icon">👤</span>;
      render(<Avatar fallbackIcon={customIcon} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("should have default aria-label for fallback", () => {
      const { container } = render(<Avatar />);
      const fallback = container.querySelector(`.${styles.fallback}`);
      expect(fallback).toHaveAttribute("aria-label", "User avatar");
    });
  });

  describe("Status Indicator", () => {
    it("should show status indicator when showStatus is true", () => {
      const { container } = render(
        <Avatar name="John Doe" status="online" showStatus={true} />,
      );
      const statusElement = container.querySelector(`.${styles.status}`);
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveClass(styles["status-online"]);
    });

    it("should not show status indicator by default", () => {
      const { container } = render(<Avatar name="John Doe" status="online" />);
      expect(
        container.querySelector(`.${styles.status}`),
      ).not.toBeInTheDocument();
    });

    it("should render all status variants", () => {
      const statuses = ["online", "offline", "away", "busy"] as const;

      for (const status of statuses) {
        const { container } = render(
          <Avatar name="John Doe" status={status} showStatus={true} />,
        );
        const statusElement = container.querySelector(`.${styles.status}`);
        expect(statusElement).toHaveClass(styles[`status-${status}`]);
      }
    });

    it("should have aria-label for status", () => {
      const { container } = render(
        <Avatar name="John Doe" status="online" showStatus={true} />,
      );
      const statusElement = container.querySelector(`.${styles.status}`);
      expect(statusElement).toHaveAttribute("aria-label", "Status: online");
    });
  });

  describe("Clickable Avatar", () => {
    it("should render as button when onClick is provided", () => {
      const handleClick = vi.fn();
      render(<Avatar name="John Doe" onClick={handleClick} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Avatar name="John Doe" onClick={handleClick} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should apply clickable class when onClick is provided", () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Avatar name="John Doe" onClick={handleClick} />,
      );
      expect(container.firstChild).toHaveClass(styles.clickable);
    });

    it("should have proper aria-label for clickable avatar", () => {
      const handleClick = vi.fn();
      render(<Avatar name="John Doe" onClick={handleClick} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "John Doe's avatar");
    });

    it("should render as div when onClick is not provided", () => {
      const { container } = render(<Avatar name="John Doe" />);
      const avatar = container.firstChild;
      expect(avatar?.nodeName).toBe("DIV");
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria-label without name", () => {
      const { container } = render(<Avatar />);
      const avatar = container.firstChild;
      expect(avatar).toHaveAttribute("aria-label", "User avatar");
    });

    it("should have proper aria-label with name", () => {
      const { container } = render(<Avatar name="John Doe" />);
      const avatar = container.firstChild;
      expect(avatar).toHaveAttribute("aria-label", "John Doe's avatar");
    });

    it("should have button type when clickable", () => {
      const handleClick = vi.fn();
      render(<Avatar name="John Doe" onClick={handleClick} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty name", () => {
      const { container } = render(<Avatar name="" />);
      expect(
        container.querySelector(`.${styles.fallback}`),
      ).toBeInTheDocument();
    });

    it("should handle undefined name", () => {
      const { container } = render(<Avatar name={undefined} />);
      expect(
        container.querySelector(`.${styles.fallback}`),
      ).toBeInTheDocument();
    });

    it("should handle name with only whitespace", () => {
      const { container } = render(<Avatar name="   " />);
      // Whitespace-only name should be treated as no name and show fallback icon
      expect(
        container.querySelector(`.${styles.fallback}`),
      ).toBeInTheDocument();
    });

    it("should handle single character name", () => {
      render(<Avatar name="J" />);
      expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("should handle names with special characters", () => {
      render(<Avatar name="Jöhn Døe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should prioritize image over initials", () => {
      render(<Avatar name="John Doe" src="/test.jpg" />);
      expect(screen.queryByText("JD")).not.toBeInTheDocument();
    });

    it("should prioritize initials over fallback icon", () => {
      const { container } = render(<Avatar name="John Doe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
      expect(
        container.querySelector(`.${styles.fallback}`),
      ).not.toBeInTheDocument();
    });
  });

  describe("Multiple Display Modes", () => {
    it("should show only one display mode at a time", () => {
      const { container } = render(<Avatar name="John Doe" src="/test.jpg" />);

      // Should show image
      expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
      // Should not show initials
      expect(screen.queryByText("JD")).not.toBeInTheDocument();
      // Should not show fallback
      expect(
        container.querySelector(`.${styles.fallback}`),
      ).not.toBeInTheDocument();
    });

    it("should transition from image to initials on error", async () => {
      render(<Avatar name="John Doe" src="/invalid.jpg" />);

      const img = screen.getByRole("img", { hidden: true });
      img.dispatchEvent(new Event("error"));

      await waitFor(() => {
        expect(screen.getByText("JD")).toBeInTheDocument();
      });
    });
  });

  describe("Status Combinations", () => {
    it("should show status with image", () => {
      const { container } = render(
        <Avatar
          name="John Doe"
          src="/test.jpg"
          status="online"
          showStatus={true}
        />,
      );
      expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
      expect(container.querySelector(`.${styles.status}`)).toBeInTheDocument();
    });

    it("should show status with initials", () => {
      const { container } = render(
        <Avatar name="John Doe" status="online" showStatus={true} />,
      );
      expect(screen.getByText("JD")).toBeInTheDocument();
      expect(container.querySelector(`.${styles.status}`)).toBeInTheDocument();
    });

    it("should show status with fallback icon", () => {
      const { container } = render(
        <Avatar status="online" showStatus={true} />,
      );
      expect(
        container.querySelector(`.${styles.fallback}`),
      ).toBeInTheDocument();
      expect(container.querySelector(`.${styles.status}`)).toBeInTheDocument();
    });
  });

  describe("Size and Shape Combinations", () => {
    it("should render all size variants correctly", () => {
      const sizes = ["sm", "md", "lg", "xl"] as const;
      for (const size of sizes) {
        const { container } = render(<Avatar name="Test" size={size} />);
        const avatar = container.firstChild as HTMLElement;
        expect(avatar).toHaveClass(styles[`size-${size}`]);
      }
    });

    it("should render large square avatar with status", () => {
      const { container } = render(
        <Avatar
          name="John Doe"
          size="lg"
          shape="square"
          status="online"
          showStatus={true}
        />,
      );
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass(styles["size-lg"]);
      expect(avatar).toHaveClass(styles["shape-square"]);
      expect(container.querySelector(`.${styles.status}`)).toBeInTheDocument();
    });

    it("should render small circle avatar with initials", () => {
      const { container } = render(
        <Avatar name="AB" size="sm" shape="circle" />,
      );
      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass(styles["size-sm"]);
      expect(avatar).toHaveClass(styles["shape-circle"]);
      expect(screen.getByText("AB")).toBeInTheDocument();
    });
  });

  describe("Keyboard Interaction", () => {
    it("should be focusable when clickable", () => {
      const handleClick = vi.fn();
      render(<Avatar name="John Doe" onClick={handleClick} />);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("should support Enter key when clickable", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Avatar name="John Doe" onClick={handleClick} />);
      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should support Space key when clickable", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Avatar name="John Doe" onClick={handleClick} />);
      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not be focusable when not clickable", () => {
      const { container } = render(<Avatar name="John Doe" />);
      const avatar = container.firstChild as HTMLElement;
      expect(avatar.tagName).toBe("DIV");
      expect(avatar).not.toHaveAttribute("tabIndex");
    });
  });

  describe("Image Error Handling", () => {
    it("should handle image with no name fallback", async () => {
      const { container } = render(<Avatar src="/invalid.jpg" />);
      const img = screen.getByRole("img", { hidden: true });

      img.dispatchEvent(new Event("error"));

      await waitFor(() => {
        expect(
          container.querySelector(`.${styles.fallback}`),
        ).toBeInTheDocument();
      });
    });

    it("should maintain size when falling back from image", async () => {
      const { container } = render(
        <Avatar name="John Doe" src="/invalid.jpg" size="lg" />,
      );
      const img = screen.getByRole("img", { hidden: true });
      const avatar = container.firstChild as HTMLElement;

      expect(avatar).toHaveClass(styles["size-lg"]);

      img.dispatchEvent(new Event("error"));

      await waitFor(() => {
        expect(screen.getByText("JD")).toBeInTheDocument();
        expect(avatar).toHaveClass(styles["size-lg"]);
      });
    });

    it("should maintain shape when falling back from image", async () => {
      const { container } = render(
        <Avatar name="Test" src="/invalid.jpg" shape="square" />,
      );
      const img = screen.getByRole("img", { hidden: true });
      const avatar = container.firstChild as HTMLElement;

      expect(avatar).toHaveClass(styles["shape-square"]);

      img.dispatchEvent(new Event("error"));

      await waitFor(() => {
        expect(avatar).toHaveClass(styles["shape-square"]);
      });
    });
  });

  describe("Initials Edge Cases", () => {
    it("should handle hyphenated names", () => {
      render(<Avatar name="Mary-Jane Watson" />);
      expect(screen.getByText("MW")).toBeInTheDocument();
    });

    it("should handle names with apostrophes", () => {
      render(<Avatar name="O'Brien Smith" />);
      expect(screen.getByText("OS")).toBeInTheDocument();
    });

    it("should handle numbers in names", () => {
      render(<Avatar name="Agent 007" />);
      expect(screen.getByText("A0")).toBeInTheDocument();
    });

    it("should handle mixed case names", () => {
      render(<Avatar name="jOhN dOe" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });
  });
});
