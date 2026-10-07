import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Flex } from "./Flex";

describe("Flex", () => {
  it("renders children", () => {
    render(<Flex>Content</Flex>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("defaults to a row flex container", () => {
    render(<Flex data-testid="flex">Content</Flex>);
    expect(screen.getByTestId("flex")).toHaveStyle({ display: "flex", flexDirection: "row" });
  });

  it("applies the column direction", () => {
    render(
      <Flex direction="column" data-testid="flex">
        Content
      </Flex>
    );
    expect(screen.getByTestId("flex")).toHaveStyle({ flexDirection: "column" });
  });

  it("resolves align and justify to CSS values", () => {
    render(
      <Flex align="center" justify="space-between" data-testid="flex">
        Content
      </Flex>
    );
    expect(screen.getByTestId("flex")).toHaveStyle({
      alignItems: "center",
      justifyContent: "space-between",
    });
  });

  it("does not wrap by default", () => {
    render(<Flex data-testid="flex">Content</Flex>);
    expect(screen.getByTestId("flex")).toHaveStyle({ flexWrap: "nowrap" });
  });

  it("wraps when wrap is true", () => {
    render(
      <Flex wrap data-testid="flex">
        Content
      </Flex>
    );
    expect(screen.getByTestId("flex")).toHaveStyle({ flexWrap: "wrap" });
  });

  it("resolves a spacing token gap", () => {
    render(
      <Flex gap="lg" data-testid="flex">
        Content
      </Flex>
    );
    expect(screen.getByTestId("flex")).toHaveStyle({ gap: "24px" });
  });

  it("passes through a raw CSS gap value", () => {
    render(
      <Flex gap="10vw" data-testid="flex">
        Content
      </Flex>
    );
    expect(screen.getByTestId("flex")).toHaveStyle({ gap: "10vw" });
  });

  it("renders as inline-flex when inline is true", () => {
    render(
      <Flex inline data-testid="flex">
        Content
      </Flex>
    );
    expect(screen.getByTestId("flex")).toHaveStyle({ display: "inline-flex" });
  });

  it("forwards ref to the underlying div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Flex ref={ref}>Content</Flex>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(Flex.displayName).toBe("Flex");
  });
});
