import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renders children", () => {
    render(<AspectRatio>Content</AspectRatio>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("defaults to a 16/9 ratio", () => {
    render(<AspectRatio data-testid="ratio">Content</AspectRatio>);
    expect(screen.getByTestId("ratio")).toHaveStyle({ aspectRatio: `${16 / 9}` });
  });

  it("applies a custom ratio", () => {
    render(
      <AspectRatio ratio={1} data-testid="ratio">
        Content
      </AspectRatio>
    );
    expect(screen.getByTestId("ratio")).toHaveStyle({ aspectRatio: "1" });
  });

  it("is relatively positioned and clips overflow", () => {
    render(<AspectRatio data-testid="ratio">Content</AspectRatio>);
    expect(screen.getByTestId("ratio")).toHaveStyle({ position: "relative", overflow: "hidden" });
  });

  it("takes the full width of its container", () => {
    render(<AspectRatio data-testid="ratio">Content</AspectRatio>);
    expect(screen.getByTestId("ratio")).toHaveStyle({ width: "100%" });
  });

  it("forwards ref to the underlying div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<AspectRatio ref={ref}>Content</AspectRatio>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(AspectRatio.displayName).toBe("AspectRatio");
  });
});
