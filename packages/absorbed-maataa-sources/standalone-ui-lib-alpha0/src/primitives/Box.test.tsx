import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Box } from "./Box";

describe("Box", () => {
  it("renders children", () => {
    render(<Box>Content</Box>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies padding from the spacing token scale", () => {
    render(<Box padding="lg">Content</Box>);
    expect(screen.getByText("Content")).toHaveStyle({ padding: "24px" });
  });

  it("applies margin from the spacing token scale", () => {
    render(<Box margin="sm">Content</Box>);
    expect(screen.getByText("Content")).toHaveStyle({ margin: "8px" });
  });

  it("applies background color from tokens", () => {
    render(<Box background="secondary">Content</Box>);
    expect(screen.getByText("Content")).toHaveStyle({ backgroundColor: "#FAF6F1" });
  });

  it("applies radius from tokens", () => {
    render(<Box radius="lg">Content</Box>);
    expect(screen.getByText("Content")).toHaveStyle({ borderRadius: "12px" });
  });

  it("renders a border when border is true", () => {
    render(<Box border>Content</Box>);
    expect(screen.getByText("Content")).toHaveStyle({ border: "1px solid #D4AF9F" });
  });

  it("does not render a border by default", () => {
    render(<Box>Content</Box>);
    expect(screen.getByText("Content").style.border).toBe("");
  });

  it("applies className", () => {
    render(<Box className="custom-box">Content</Box>);
    expect(screen.getByText("Content")).toHaveClass("custom-box");
  });

  it("merges custom style with token styles", () => {
    render(
      <Box padding="sm" style={{ color: "rgb(255, 0, 0)" }}>
        Content
      </Box>
    );
    const el = screen.getByText("Content");
    expect(el).toHaveStyle({ padding: "8px", color: "rgb(255, 0, 0)" });
  });

  it("forwards ref to the underlying div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Box ref={ref}>Content</Box>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards arbitrary div props", () => {
    const onClick = vi.fn();
    render(
      <Box onClick={onClick} data-testid="box">
        Content
      </Box>
    );
    screen.getByTestId("box").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("sets displayName", () => {
    expect(Box.displayName).toBe("Box");
  });
});
