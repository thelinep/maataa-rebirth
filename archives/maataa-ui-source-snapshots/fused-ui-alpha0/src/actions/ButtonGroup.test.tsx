import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "../primitives/Button";

describe("ButtonGroup", () => {
  it("renders its button children", () => {
    render(
      <ButtonGroup>
        <Button>Day</Button>
        <Button>Week</Button>
      </ButtonGroup>
    );
    expect(screen.getByText("Day")).toBeInTheDocument();
    expect(screen.getByText("Week")).toBeInTheDocument();
  });

  it("has an accessible group role by default", () => {
    render(
      <ButtonGroup>
        <Button>Day</Button>
      </ButtonGroup>
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("lays buttons out horizontally by default", () => {
    render(
      <ButtonGroup data-testid="group">
        <Button>Day</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId("group")).toHaveStyle({ display: "flex", flexDirection: "row" });
  });

  it("lays buttons out vertically when orientation is vertical", () => {
    render(
      <ButtonGroup orientation="vertical" data-testid="group">
        <Button>Day</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId("group")).toHaveStyle({ flexDirection: "column" });
  });

  it("has no gap when attached (the default)", () => {
    render(
      <ButtonGroup data-testid="group">
        <Button>Day</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId("group")).toHaveStyle({ gap: "0px" });
  });

  it("applies a gap when not attached", () => {
    render(
      <ButtonGroup attached={false} gap="lg" data-testid="group">
        <Button>Day</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId("group")).toHaveStyle({ gap: "24px" });
  });

  it("rounds the outer-left corners of the first attached button", () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Middle</Button>
        <Button>Last</Button>
      </ButtonGroup>
    );
    expect(screen.getByText("First")).toHaveStyle({
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px",
    });
  });

  it("rounds the outer-right corners of the last attached button", () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Middle</Button>
        <Button>Last</Button>
      </ButtonGroup>
    );
    expect(screen.getByText("Last")).toHaveStyle({
      borderTopRightRadius: "6px",
      borderBottomRightRadius: "6px",
    });
  });

  it("does not round the middle button's corners", () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Middle</Button>
        <Button>Last</Button>
      </ButtonGroup>
    );
    expect(screen.getByText("Middle")).toHaveStyle({ borderRadius: "0" });
  });

  it("forwards ref to the underlying div", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ButtonGroup ref={ref}>
        <Button>Day</Button>
      </ButtonGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(ButtonGroup.displayName).toBe("ButtonGroup");
  });
});
