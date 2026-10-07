import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "./Sidebar";

const items = [
  { id: "home", label: "Home", href: "/" },
  { id: "docs", label: "Docs", href: "/docs" },
];

describe("Sidebar", () => {
  it("renders as an aside landmark", () => {
    render(<Sidebar items={items} />);
    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });

  it("renders its items via Menu", () => {
    render(<Sidebar items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
  });

  it("renders header content", () => {
    render(<Sidebar items={items} header={<span>My App</span>} />);
    expect(screen.getByText("My App")).toBeInTheDocument();
  });

  it("renders footer content", () => {
    render(<Sidebar items={items} footer={<span>User menu</span>} />);
    expect(screen.getByText("User menu")).toBeInTheDocument();
  });

  it("renders custom children instead of items when provided", () => {
    render(
      <Sidebar items={items}>
        <span>Custom content</span>
      </Sidebar>
    );
    expect(screen.getByText("Custom content")).toBeInTheDocument();
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("uses the default expanded width", () => {
    render(<Sidebar items={items} />);
    expect(screen.getByRole("complementary")).toHaveStyle({ width: "240px" });
  });

  it("uses the collapsed width when collapsed is true", () => {
    render(<Sidebar items={items} collapsed />);
    expect(screen.getByRole("complementary")).toHaveStyle({ width: "64px" });
  });

  it("accepts custom width values", () => {
    render(<Sidebar items={items} width="300px" collapsedWidth="80px" collapsed />);
    expect(screen.getByRole("complementary")).toHaveStyle({ width: "80px" });
  });

  it("propagates onSelect from the underlying Menu", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Sidebar items={items} onSelect={onSelect} />);
    await user.click(screen.getByRole("link", { name: "Home" }));
    expect(onSelect).toHaveBeenCalledWith("home");
  });

  it("marks the active item", () => {
    render(<Sidebar items={items} activeId="docs" />);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
  });

  it("sets displayName", () => {
    expect(Sidebar.displayName).toBe("Sidebar");
  });
});
