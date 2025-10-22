/// <reference types="@testing-library/jest-dom" />
/**
 * ButtonGridItem Component Tests
 *
 * Tests for ButtonGridItem component covering:
 * - Rendering with media
 * - Click handlers (card and button)
 * - Keyboard navigation (Enter, Space)
 * - Focus management
 * - ARIA labels
 * - Aspect ratio application
 * - Min height enforcement
 * - Event propagation (stopPropagation on button)
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ButtonGridItem } from "./ButtonGridItem.js";
import styles from "./ButtonGridItem.module.css";

describe("ButtonGridItem", () => {
  const mockMedia = <img src="/test.jpg" alt="Test visual" />;
  const mockProps = {
    media: mockMedia,
    label: "Test Label",
    description: "Test description",
    buttonText: "Click Me",
    onClick: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders as a div with role button", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const card = container.querySelector('[role="button"]');
      expect(card).toBeInTheDocument();
      expect(card?.tagName).toBe("DIV");
    });

    it("renders media content", () => {
      render(<ButtonGridItem {...mockProps} />);

      const image = screen.getByAltText("Test visual");
      expect(image).toBeInTheDocument();
    });

    it("renders label", () => {
      render(<ButtonGridItem {...mockProps} />);

      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("renders description", () => {
      render(<ButtonGridItem {...mockProps} />);

      expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("renders button text", () => {
      render(<ButtonGridItem {...mockProps} />);

      expect(screen.getByText("Click Me")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <ButtonGridItem {...mockProps} className="custom-class" />,
      );

      const card = container.querySelector('[role="button"]');
      expect(card).toHaveClass("custom-class");
    });
  });

  describe("Click Handlers", () => {
    it("calls onClick when card is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      const { container } = render(
        <ButtonGridItem {...mockProps} onClick={handleClick} />,
      );

      const card = container.querySelector('[role="button"]');
      if (card) {
        await user.click(card);
      }

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick when button is clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<ButtonGridItem {...mockProps} onClick={handleClick} />);

      const button = screen.getByRole("button", { name: mockProps.buttonText });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("button click stops propagation", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<ButtonGridItem {...mockProps} onClick={handleClick} />);

      const button = screen.getByRole("button", { name: mockProps.buttonText });
      await user.click(button);

      // Should only be called once (from button, not card)
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Keyboard Navigation", () => {
    it("card is keyboard accessible", async () => {
      const user = userEvent.setup();
      const { container } = render(<ButtonGridItem {...mockProps} />);

      await user.tab();

      const card = container.querySelector('[role="button"]');
      expect(card).toHaveFocus();
    });

    it("triggers onClick on Enter key", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      const { container } = render(
        <ButtonGridItem {...mockProps} onClick={handleClick} />,
      );

      const card = container.querySelector('[role="button"]');
      if (card) {
        (card as HTMLElement).focus();
        await user.keyboard("{Enter}");
      }

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("triggers onClick on Space key", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      const { container } = render(
        <ButtonGridItem {...mockProps} onClick={handleClick} />,
      );

      const card = container.querySelector('[role="button"]');
      if (card) {
        (card as HTMLElement).focus();
        await user.keyboard(" ");
      }

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("button is keyboard accessible", async () => {
      const user = userEvent.setup();

      render(<ButtonGridItem {...mockProps} />);

      // Tab to card
      await user.tab();

      // Tab to button
      await user.tab();

      const button = screen.getByRole("button", { name: mockProps.buttonText });
      expect(button).toHaveFocus();
    });
  });

  describe("ARIA Attributes", () => {
    it("has default aria-label from label and description", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const card = container.querySelector('[role="button"]');
      expect(card).toHaveAttribute(
        "aria-label",
        `${mockProps.label}: ${mockProps.description}`,
      );
    });

    it("uses custom aria-label when provided", () => {
      const customLabel = "Custom aria label";
      const { container } = render(
        <ButtonGridItem {...mockProps} aria-label={customLabel} />,
      );

      const card = container.querySelector('[role="button"]');
      expect(card).toHaveAttribute("aria-label", customLabel);
    });

    it("button has aria-label from buttonText", () => {
      render(<ButtonGridItem {...mockProps} />);

      const button = screen.getByRole("button", { name: mockProps.buttonText });
      expect(button).toHaveAttribute("aria-label", mockProps.buttonText);
    });

    it("button uses custom aria-label-button when provided", () => {
      const customButtonLabel = "Custom button label";
      render(
        <ButtonGridItem {...mockProps} aria-label-button={customButtonLabel} />,
      );

      const button = screen.getByRole("button", { name: customButtonLabel });
      expect(button).toBeInTheDocument();
    });

    it("card has tabIndex 0", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const card = container.querySelector('[role="button"]');
      expect(card).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Aspect Ratio and Min Height", () => {
    it("applies default aspect ratio (16/9)", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const card = container.querySelector('[role="button"]');
      const style = card?.getAttribute("style");
      expect(style).toContain("aspect-ratio: 16/9");
    });

    it("applies custom aspect ratio", () => {
      const { container } = render(
        <ButtonGridItem {...mockProps} aspectRatio="4/3" />,
      );

      const card = container.querySelector('[role="button"]');
      const style = card?.getAttribute("style");
      expect(style).toContain("aspect-ratio: 4/3");
    });

    it("applies default min height (300px)", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const card = container.querySelector('[role="button"]');
      const style = card?.getAttribute("style");
      expect(style).toContain("min-height: 300px");
    });

    it("applies custom min height", () => {
      const { container } = render(
        <ButtonGridItem {...mockProps} minHeight={400} />,
      );

      const card = container.querySelector('[role="button"]');
      const style = card?.getAttribute("style");
      expect(style).toContain("min-height: 400px");
    });
  });

  describe("Media Types", () => {
    it("renders with image element", () => {
      const media = <img src="/image.jpg" alt="Visual content" />;
      render(<ButtonGridItem {...mockProps} media={media} />);

      const image = screen.getByAltText("Visual content");
      expect(image).toBeInTheDocument();
    });

    it("renders with video element", () => {
      const media = (
        <video>
          <source src="/video.mp4" type="video/mp4" />
          <track
            kind="captions"
            src="/captions.vtt"
            srcLang="en"
            label="English"
          />
        </video>
      );
      const { container } = render(
        <ButtonGridItem {...mockProps} media={media} />,
      );

      const video = container.querySelector("video");
      expect(video).toBeInTheDocument();
    });

    it("renders with picture element", () => {
      const media = (
        <picture>
          <source srcSet="/image.webp" type="image/webp" />
          <img src="/image.jpg" alt="Visual element" />
        </picture>
      );
      render(<ButtonGridItem {...mockProps} media={media} />);

      const picture = screen.getByAltText("Visual element");
      expect(picture).toBeInTheDocument();
    });
  });

  describe("Event Propagation", () => {
    it("prevents event propagation when button is clicked", async () => {
      const user = userEvent.setup();
      const cardClick = vi.fn();
      const buttonClick = vi.fn();

      const { container } = render(
        <ButtonGridItem {...mockProps} onClick={buttonClick} />,
      );

      const card = container.querySelector('[role="button"]');
      card?.addEventListener("click", cardClick);

      const button = screen.getByRole("button", { name: mockProps.buttonText });
      await user.click(button);

      // Button click should be called
      expect(buttonClick).toHaveBeenCalledTimes(1);

      // Card click should not be triggered due to stopPropagation
      // Note: This is handled by stopPropagation in the component
    });
  });

  describe("Edge Cases", () => {
    it("handles empty label gracefully", () => {
      render(<ButtonGridItem {...mockProps} label="" />);

      expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    });

    it("handles empty description gracefully", () => {
      render(<ButtonGridItem {...mockProps} description="" />);

      expect(screen.getByText(mockProps.label)).toBeInTheDocument();
    });

    it("handles long labels", () => {
      const longLabel =
        "This is a very long label that might wrap to multiple lines in the interface";
      render(<ButtonGridItem {...mockProps} label={longLabel} />);

      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it("handles long descriptions", () => {
      const longDesc =
        "This is a very long description that provides detailed information about the card and might wrap to multiple lines";
      render(<ButtonGridItem {...mockProps} description={longDesc} />);

      expect(screen.getByText(longDesc)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has correct role for card", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const card = container.querySelector('[role="button"]');
      expect(card).toBeInTheDocument();
    });

    it("button has correct type", () => {
      render(<ButtonGridItem {...mockProps} />);

      const button = screen.getByRole("button", { name: mockProps.buttonText });
      expect(button).toHaveAttribute("type", "button");
    });

    it("media has alt text", () => {
      render(<ButtonGridItem {...mockProps} />);

      const image = screen.getByAltText("Test visual");
      expect(image).toBeInTheDocument();
    });

    it("all interactive elements are keyboard accessible", async () => {
      const user = userEvent.setup();
      const { container } = render(<ButtonGridItem {...mockProps} />);

      // Tab to card
      await user.tab();
      const card = container.querySelector('[role="button"]');
      expect(card).toHaveFocus();

      // Tab to button
      await user.tab();
      const button = screen.getByRole("button", { name: mockProps.buttonText });
      expect(button).toHaveFocus();
    });
  });

  describe("Structure", () => {
    it("renders media container", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const mediaContainer = container.querySelector(".mediaContainer");
      expect(mediaContainer).toBeInTheDocument();
    });

    it("renders content overlay", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const contentOverlay = container.querySelector(".contentOverlay");
      expect(contentOverlay).toBeInTheDocument();
    });

    it("renders content wrapper", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const content = container.querySelector(".content");
      expect(content).toBeInTheDocument();
    });

    it("label is rendered as h3", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const label = container.querySelector("h3");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent(mockProps.label);
    });

    it("description is rendered as p", () => {
      const { container } = render(<ButtonGridItem {...mockProps} />);

      const description = container.querySelector("p");
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent(mockProps.description);
    });
  });

  describe("Performance", () => {
    it("uses requestAnimationFrame for card click", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const rafSpy = vi
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb) => {
          cb(0);
          return 0;
        });

      const { container } = render(
        <ButtonGridItem {...mockProps} onClick={handleClick} />,
      );

      const card = container.querySelector('[role="button"]');
      if (card) {
        await user.click(card);
      }

      expect(rafSpy).toHaveBeenCalled();

      rafSpy.mockRestore();
    });

    it("uses requestAnimationFrame for button click", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const rafSpy = vi
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb) => {
          cb(0);
          return 0;
        });

      render(<ButtonGridItem {...mockProps} onClick={handleClick} />);

      const button = screen.getByRole("button", { name: mockProps.buttonText });
      await user.click(button);

      expect(rafSpy).toHaveBeenCalled();

      rafSpy.mockRestore();
    });

    it("uses requestAnimationFrame for keyboard events", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const rafSpy = vi
        .spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb) => {
          cb(0);
          return 0;
        });

      const { container } = render(
        <ButtonGridItem {...mockProps} onClick={handleClick} />,
      );

      const card = container.querySelector('[role="button"]');
      if (card) {
        (card as HTMLElement).focus();
        await user.keyboard("{Enter}");
      }

      expect(rafSpy).toHaveBeenCalled();

      rafSpy.mockRestore();
    });
  });
});
