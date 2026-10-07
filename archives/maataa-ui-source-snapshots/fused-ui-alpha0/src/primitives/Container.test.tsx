import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Container } from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container>Content</Container>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("defaults to the lg max width", () => {
    render(<Container data-testid="container">Content</Container>);
    expect(screen.getByTestId("container")).toHaveStyle({ maxWidth: "1024px" });
  });

  it("applies a different max width", () => {
    render(
      <Container maxWidth="sm" data-testid="container">
        Content
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveStyle({ maxWidth: "640px" });
  });

  it("centers with automatic horizontal margins by default", () => {
    render(<Container data-testid="container">Content</Container>);
    expect(screen.getByTestId("container")).toHaveStyle({
      marginLeft: "auto",
      marginRight: "auto",
    });
  });

  it("does not center when centered is false", () => {
    render(
      <Container centered={false} data-testid="container">
        Content
      </Container>
    );
    const el = screen.getByTestId("container");
    expect(el.style.marginLeft).toBe("");
    expect(el.style.marginRight).toBe("");
  });

  it("applies horizontal padding from the spacing token scale", () => {
    render(
      <Container padding="lg" data-testid="container">
        Content
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveStyle({
      paddingLeft: "24px",
      paddingRight: "24px",
    });
  });

  it("forwards ref to the underlying div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Container ref={ref}>Content</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(Container.displayName).toBe("Container");
  });
});
