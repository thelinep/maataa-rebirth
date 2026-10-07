import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders children", () => {
    render(<Grid>Content</Grid>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders as a grid display", () => {
    render(<Grid data-testid="grid">Content</Grid>);
    expect(screen.getByTestId("grid")).toHaveStyle({ display: "grid" });
  });

  it("converts a numeric columns prop into an even repeat() track", () => {
    render(
      <Grid columns={3} data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveStyle({ gridTemplateColumns: "repeat(3, 1fr)" });
  });

  it("passes through an explicit columns template string", () => {
    render(
      <Grid columns="1fr 2fr" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveStyle({ gridTemplateColumns: "1fr 2fr" });
  });

  it("converts a numeric rows prop into an even repeat() track", () => {
    render(
      <Grid rows={2} data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveStyle({ gridTemplateRows: "repeat(2, 1fr)" });
  });

  it("resolves a spacing token gap", () => {
    render(
      <Grid gap="md" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveStyle({ gap: "16px" });
  });

  it("resolves independent columnGap and rowGap", () => {
    render(
      <Grid columnGap="sm" rowGap="lg" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveStyle({ columnGap: "8px", rowGap: "24px" });
  });

  it("resolves align and justify to CSS values", () => {
    render(
      <Grid align="center" justify="end" data-testid="grid">
        Content
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveStyle({ alignItems: "center", justifyItems: "end" });
  });

  it("forwards ref to the underlying div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Grid ref={ref}>Content</Grid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets displayName", () => {
    expect(Grid.displayName).toBe("Grid");
  });
});
