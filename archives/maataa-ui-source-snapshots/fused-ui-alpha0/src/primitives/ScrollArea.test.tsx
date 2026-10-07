import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  it("renders children", () => {
    render(<ScrollArea>Content</ScrollArea>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("scrolls vertically only by default", () => {
    render(<ScrollArea data-testid="scroll">Content</ScrollArea>);
    expect(screen.getByTestId("scroll")).toHaveStyle({ overflowY: "auto", overflowX: "hidden" });
  });

  it("scrolls horizontally when direction is horizontal", () => {
    render(
      <ScrollArea direction="horizontal" data-testid="scroll">
        Content
      </ScrollArea>
    );
    expect(screen.getByTestId("scroll")).toHaveStyle({ overflowY: "hidden", overflowX: "auto" });
  });

  it("scrolls both axes when direction is both", () => {
    render(
      <ScrollArea direction="both" data-testid="scroll">
        Content
      </ScrollArea>
    );
    expect(screen.getByTestId("scroll")).toHaveStyle({ overflowY: "auto", overflowX: "auto" });
  });

  it("applies maxHeight and maxWidth", () => {
    render(
      <ScrollArea maxHeight="240px" maxWidth="320px" data-testid="scroll">
        Content
      </ScrollArea>
    );
    expect(screen.getByTestId("scroll")).toHaveStyle({ maxHeight: "240px", maxWidth: "320px" });
  });

  it("applies the base scroll-area class alongside a custom className", () => {
    render(
      <ScrollArea className="custom" data-testid="scroll">
        Content
      </ScrollArea>
    );
    const el = screen.getByTestId("scroll");
    expect(el).toHaveClass("maataa-scroll-area");
    expect(el).toHaveClass("custom");
  });

  it("forwards ref to the underlying div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ScrollArea ref={ref}>Content</ScrollArea>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(ScrollArea.displayName).toBe("ScrollArea");
  });
});
