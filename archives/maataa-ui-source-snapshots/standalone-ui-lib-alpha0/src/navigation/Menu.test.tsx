import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu, type MenuItem } from "./Menu";

const items: MenuItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "docs", label: "Docs", href: "/docs" },
];

describe("Menu", () => {
  it("renders a nav landmark", () => {
    render(<Menu items={items} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders an item for each entry", () => {
    render(<Menu items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
  });

  it("renders items with an href as links", () => {
    render(<Menu items={items} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("marks the active item with aria-current", () => {
    render(<Menu items={items} activeId="docs" />);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("calls onSelect when a link item is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Menu items={items} onSelect={onSelect} />);
    await user.click(screen.getByRole("link", { name: "Home" }));
    expect(onSelect).toHaveBeenCalledWith("home");
  });

  it("renders items without an href as buttons", () => {
    render(<Menu items={[{ id: "logout", label: "Log out", onClick: () => {} }]} />);
    expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();
  });

  it("calls onSelect when a button item is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Menu items={[{ id: "logout", label: "Log out" }]} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Log out" }));
    expect(onSelect).toHaveBeenCalledWith("logout");
  });

  it("does not fire onSelect for a disabled item", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <Menu items={[{ id: "logout", label: "Log out", disabled: true }]} onSelect={onSelect} />
    );
    await user.click(screen.getByRole("button", { name: "Log out" }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders nested children collapsed by default", () => {
    render(
      <Menu
        items={[
          {
            id: "settings",
            label: "Settings",
            children: [{ id: "profile", label: "Profile", href: "/profile" }],
          },
        ]}
      />
    );
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  it("expands nested children when the parent is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Menu
        items={[
          {
            id: "settings",
            label: "Settings",
            children: [{ id: "profile", label: "Profile", href: "/profile" }],
          },
        ]}
      />
    );
    await user.click(screen.getByRole("button", { name: /Settings/ }));
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("starts expanded when the id is in defaultExpandedIds", () => {
    render(
      <Menu
        items={[
          {
            id: "settings",
            label: "Settings",
            children: [{ id: "profile", label: "Profile", href: "/profile" }],
          },
        ]}
        defaultExpandedIds={["settings"]}
      />
    );
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("sets aria-expanded on items with children", () => {
    render(
      <Menu
        items={[
          {
            id: "settings",
            label: "Settings",
            children: [{ id: "profile", label: "Profile", href: "/profile" }],
          },
        ]}
      />
    );
    expect(screen.getByRole("button", { name: /Settings/ })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("sets displayName", () => {
    expect(Menu.displayName).toBe("Menu");
  });
});
