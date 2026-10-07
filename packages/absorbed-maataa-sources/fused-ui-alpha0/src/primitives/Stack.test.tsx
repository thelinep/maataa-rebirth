import React from "react";
import { render, screen } from "@testing-library/react";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders with children", () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies vertical direction by default", () => {
    const { container } = render(
      <Stack>
        <div>Item</div>
      </Stack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle("flexDirection: column");
  });

  it("applies horizontal direction when specified", () => {
    const { container } = render(
      <Stack direction="horizontal">
        <div>Item</div>
      </Stack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle("flexDirection: row");
  });

  it("applies spacing tokens correctly", () => {
    const { container } = render(
      <Stack spacing="md">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle("gap: 16px");
  });

  it("applies custom spacing values", () => {
    const { container } = render(
      <Stack spacing="24px">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle("gap: 24px");
  });

  it("applies alignment properties", () => {
    const { container } = render(
      <Stack align="center" justify="space-between">
        <div>Item</div>
      </Stack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle("alignItems: center");
    expect(stack).toHaveStyle("justifyContent: space-between");
  });

  it("applies wrap property", () => {
    const { container } = render(
      <Stack wrap="wrap">
        <div>Item</div>
      </Stack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle("flexWrap: wrap");
  });

  it("applies fullWidth property", () => {
    const { container } = render(
      <Stack fullWidth>
        <div>Item</div>
      </Stack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle("width: 100%");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Stack className="custom-stack">
        <div>Item</div>
      </Stack>
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveClass("custom-stack");
  });
});
