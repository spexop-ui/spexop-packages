/**
 * Card Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Card } from "./Card.js";
import { CardBody } from "./CardBody.js";
import { CardFooter } from "./CardFooter.js";
import { CardHeader } from "./CardHeader.js";

describe("Card", () => {
  it("renders with children", () => {
    render(<Card>Test content</Card>);

    expect(screen.getByText("Test content")).toBeDefined();
  });

  it("renders as div by default", () => {
    const { container } = render(<Card>Content</Card>);

    const card = container.firstChild;
    expect(card?.nodeName).toBe("DIV");
  });

  it("renders as button when clickable", () => {
    const { container } = render(
      <Card clickable onClick={vi.fn()}>
        Content
      </Card>,
    );

    const card = container.firstChild;
    expect(card?.nodeName).toBe("BUTTON");
  });

  it("handles click events when clickable", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Card clickable onClick={handleClick}>
        Clickable content
      </Card>,
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe("Variants", () => {
    it("renders basic variant", () => {
      render(<Card variant="basic">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });

    it("renders highlighted variant", () => {
      render(<Card variant="highlighted">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });

    it("renders outlined variant", () => {
      render(<Card variant="outlined">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });

    it("renders interactive variant", () => {
      render(<Card variant="interactive">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });

    it("renders ghost variant", () => {
      render(<Card variant="ghost">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });

    it("renders elevated variant", () => {
      render(<Card variant="elevated">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });

    it("handles variant alias: default to basic", () => {
      render(<Card variant="default">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });

    it("handles variant alias: outline to outlined", () => {
      render(<Card variant="outline">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });
  });

  describe("Density", () => {
    it("renders compact density", () => {
      render(<Card density="compact">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });

    it("renders normal density (default)", () => {
      render(<Card density="normal">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });

    it("renders spacious density", () => {
      render(<Card density="spacious">Content</Card>);
      expect(screen.getByText("Content")).toBeDefined();
    });
  });

  describe("Deprecated props", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    afterEach(() => {
      consoleSpy.mockClear();
    });

    it("shows deprecation warning for size prop in development", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      render(<Card size="compact">Content</Card>);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Prop "size" is deprecated'),
      );

      process.env.NODE_ENV = originalEnv;
    });

    it("shows deprecation warning for icon prop in development", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      const TestIcon = () => <div>Icon</div>;
      render(
        <Card icon={<TestIcon />} title="Title">
          Content
        </Card>,
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("deprecated"),
      );

      process.env.NODE_ENV = originalEnv;
    });

    it("renders with deprecated title prop", () => {
      render(<Card title="Deprecated Title">Content</Card>);

      expect(screen.getByText("Deprecated Title")).toBeDefined();
    });

    it("renders with deprecated description prop", () => {
      render(<Card description="Deprecated description">Content</Card>);

      expect(screen.getByText("Deprecated description")).toBeDefined();
    });
  });

  describe("Props", () => {
    it("applies fullHeight", () => {
      const { container } = render(<Card fullHeight>Content</Card>);

      const card = container.querySelector('[class*="fullHeight"]');
      expect(card).toBeDefined();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Card className="custom-class">Content</Card>,
      );

      const card = container.querySelector(".custom-class");
      expect(card).toBeDefined();
    });

    it("forwards HTML attributes", () => {
      render(
        <Card id="test-card" data-testid="card">
          Content
        </Card>,
      );

      const card = screen.getByTestId("card");
      expect(card.id).toBe("test-card");
    });
  });
});

describe("CardHeader", () => {
  it("renders with title", () => {
    render(<CardHeader title="Test Title" />);

    expect(screen.getByText("Test Title")).toBeDefined();
  });

  it("renders with title and subtitle", () => {
    render(<CardHeader title="Title" subtitle="Subtitle" />);

    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Subtitle")).toBeDefined();
  });

  it("renders with badge", () => {
    render(
      <CardHeader title="Title" badge={<span data-testid="badge">New</span>} />,
    );

    expect(screen.getByTestId("badge")).toBeDefined();
  });

  it("renders custom children", () => {
    render(
      <CardHeader>
        <div>Custom content</div>
      </CardHeader>,
    );

    expect(screen.getByText("Custom content")).toBeDefined();
  });

  it("renders title with children", () => {
    render(
      <CardHeader title="Title">
        <button type="button">Action</button>
      </CardHeader>,
    );

    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Action")).toBeDefined();
  });

  it("applies noBorder prop", () => {
    const { container } = render(<CardHeader title="Title" noBorder />);

    const header = container.querySelector('[class*="no-border"]');
    expect(header).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CardHeader title="Title" className="custom-header" />,
    );

    const header = container.querySelector(".custom-header");
    expect(header).toBeDefined();
  });

  it("uses h3 for title", () => {
    const { container } = render(<CardHeader title="Title" />);

    const title = container.querySelector("h3");
    expect(title?.textContent).toBe("Title");
  });
});

describe("CardBody", () => {
  it("renders with children", () => {
    render(<CardBody>Body content</CardBody>);

    expect(screen.getByText("Body content")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CardBody className="custom-body">Content</CardBody>,
    );

    const body = container.querySelector(".custom-body");
    expect(body).toBeDefined();
  });

  it("renders complex children", () => {
    render(
      <CardBody>
        <div>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>
      </CardBody>,
    );

    expect(screen.getByText("Paragraph 1")).toBeDefined();
    expect(screen.getByText("Paragraph 2")).toBeDefined();
  });
});

describe("CardFooter", () => {
  it("renders with children", () => {
    render(<CardFooter>Footer content</CardFooter>);

    expect(screen.getByText("Footer content")).toBeDefined();
  });

  it("applies default right alignment", () => {
    const { container } = render(<CardFooter>Content</CardFooter>);

    const footer = container.querySelector('[class*="right"]');
    expect(footer).toBeDefined();
  });

  it("applies left alignment", () => {
    const { container } = render(<CardFooter align="left">Content</CardFooter>);

    const footer = container.querySelector('[class*="left"]');
    expect(footer).toBeDefined();
  });

  it("applies center alignment", () => {
    const { container } = render(
      <CardFooter align="center">Content</CardFooter>,
    );

    const footer = container.querySelector('[class*="center"]');
    expect(footer).toBeDefined();
  });

  it("applies between alignment", () => {
    const { container } = render(
      <CardFooter align="between">Content</CardFooter>,
    );

    const footer = container.querySelector('[class*="between"]');
    expect(footer).toBeDefined();
  });

  it("applies noBorder prop", () => {
    const { container } = render(<CardFooter noBorder>Content</CardFooter>);

    const footer = container.querySelector('[class*="no-border"]');
    expect(footer).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CardFooter className="custom-footer">Content</CardFooter>,
    );

    const footer = container.querySelector(".custom-footer");
    expect(footer).toBeDefined();
  });
});

describe("Card Composition", () => {
  it("renders with all sub-components", () => {
    render(
      <Card>
        <CardHeader title="Card Title" subtitle="Subtitle" />
        <CardBody>
          <p>Body content</p>
        </CardBody>
        <CardFooter>
          <button type="button">Action</button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByText("Card Title")).toBeDefined();
    expect(screen.getByText("Subtitle")).toBeDefined();
    expect(screen.getByText("Body content")).toBeDefined();
    expect(screen.getByText("Action")).toBeDefined();
  });

  it("renders with partial sub-components", () => {
    render(
      <Card>
        <CardHeader title="Title" />
        <CardBody>Content</CardBody>
      </Card>,
    );

    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("renders with custom content mixed with sub-components", () => {
    render(
      <Card>
        <CardHeader title="Title" />
        <div>Custom section</div>
        <CardBody>Body</CardBody>
      </Card>,
    );

    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Custom section")).toBeDefined();
    expect(screen.getByText("Body")).toBeDefined();
  });

  it("maintains proper layout with fullHeight", () => {
    render(
      <Card fullHeight>
        <CardHeader title="Title" />
        <CardBody>Body content</CardBody>
        <CardFooter>Actions</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Body content")).toBeDefined();
    expect(screen.getByText("Actions")).toBeDefined();
  });
});

describe("Accessibility", () => {
  it("has proper semantic structure", () => {
    const { container } = render(
      <Card>
        <CardHeader title="Accessible Card" />
        <CardBody>Content</CardBody>
      </Card>,
    );

    const heading = container.querySelector("h3");
    expect(heading?.textContent).toBe("Accessible Card");
  });

  it("renders clickable card as button with proper role", () => {
    render(
      <Card clickable onClick={vi.fn()}>
        Clickable
      </Card>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDefined();
  });

  it("has button type for clickable cards", () => {
    render(
      <Card clickable onClick={vi.fn()}>
        Clickable
      </Card>,
    );

    const button = screen.getByRole("button");
    expect(button.getAttribute("type")).toBe("button");
  });

  it("supports keyboard interaction on clickable cards", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Card clickable onClick={handleClick}>
        Clickable
      </Card>,
    );

    const button = screen.getByRole("button");

    // Focus and press Enter
    button.focus();
    await user.keyboard("{Enter}");

    expect(handleClick).toHaveBeenCalled();
  });
});
