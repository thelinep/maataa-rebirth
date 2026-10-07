import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TopNav } from "./TopNav";

const items = [
  { id: "home", label: "Home", href: "/" },
  { id: "docs", label: "Docs", href: "/docs" },
];

describe("TopNav", () => {
  it("renders as a banner landmark", () => {
    render(<TopNav items={items} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders brand content", () => {
    render(<TopNav brand={<span>My App</span>} items={items} />);
    expect(screen.getByText("My App")).toBeInTheDocument();
  });

  it("renders its items via Menu", () => {
    render(<TopNav items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
  });

  it("renders actions content", () => {
    render(<TopNav items={items} actions={<button>Sign out</button>} />);
    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });

  it("renders custom children instead of items when provided", () => {
    render(
      <TopNav items={items}>
        <span>Custom content</span>
      </TopNav>
    );
    expect(screen.getByText("Custom content")).toBeInTheDocument();
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("is statically positioned by default", () => {
    render(<TopNav items={items} />);
    expect(screen.getByRole("banner")).toHaveStyle({ position: "static" });
  });

  it("is stickily positioned when sticky is true", () => {
    render(<TopNav items={items} sticky />);
    expect(screen.getByRole("banner")).toHaveStyle({ position: "sticky", top: "0px" });
  });

  it("propagates onSelect from the underlying Menu", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TopNav items={items} onSelect={onSelect} />);
    await user.click(screen.getByRole("link", { name: "Home" }));
    expect(onSelect).toHaveBeenCalledWith("home");
  });

  it("marks the active item", () => {
    render(<TopNav items={items} activeId="docs" />);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
  });

  it("sets displayName", () => {
    expect(TopNav.displayName).toBe("TopNav");
  });
});
