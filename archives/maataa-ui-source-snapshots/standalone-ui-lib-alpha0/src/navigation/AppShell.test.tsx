import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders its main content", () => {
    render(
      <AppShell>
        <p>Page content</p>
      </AppShell>
    );
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("renders content inside a main landmark", () => {
    render(
      <AppShell>
        <p>Page content</p>
      </AppShell>
    );
    expect(screen.getByRole("main")).toHaveTextContent("Page content");
  });

  it("renders topNav content above the content area", () => {
    render(
      <AppShell topNav={<div>Top bar</div>}>
        <p>Page content</p>
      </AppShell>
    );
    expect(screen.getByText("Top bar")).toBeInTheDocument();
  });

  it("renders sidebar content alongside the main content", () => {
    render(
      <AppShell sidebar={<div>Side nav</div>}>
        <p>Page content</p>
      </AppShell>
    );
    expect(screen.getByText("Side nav")).toBeInTheDocument();
  });

  it("fills the viewport height by default", () => {
    const { container } = render(
      <AppShell>
        <p>Page content</p>
      </AppShell>
    );
    expect((container.firstChild as HTMLElement).style.height).toBe("100vh");
  });

  it("fills only 100% height when fullHeight is false", () => {
    const { container } = render(
      <AppShell fullHeight={false}>
        <p>Page content</p>
      </AppShell>
    );
    expect(container.firstChild).toHaveStyle({ height: "100%" });
  });

  it("sets displayName", () => {
    expect(AppShell.displayName).toBe("AppShell");
  });
});
