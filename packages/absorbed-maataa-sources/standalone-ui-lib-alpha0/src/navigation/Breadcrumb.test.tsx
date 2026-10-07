import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics" },
  ];

  it("renders all breadcrumb items", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  it("renders links for items with href", () => {
    render(<Breadcrumb items={items} />);
    const homeLink = screen.getByText("Home") as HTMLAnchorElement;
    const productsLink = screen.getByText("Products") as HTMLAnchorElement;

    expect(homeLink.href).toContain("/");
    expect(productsLink.href).toContain("/products");
  });

  it("renders plain text for items without href", () => {
    render(<Breadcrumb items={items} />);
    const electronics = screen.getByText("Electronics");
    expect(electronics.tagName).not.toBe("A");
  });

  it("calls onClick handler when provided", () => {
    const onClick = jest.fn();
    const itemsWithClick = [
      { label: "Home", onClick },
      { label: "Current", active: true },
    ];
    render(<Breadcrumb items={itemsWithClick} />);

    const home = screen.getByText("Home");
    fireEvent.click(home);
    expect(onClick).toHaveBeenCalled();
  });

  it("marks active item with aria-current", () => {
    const itemsWithActive = [
      { label: "Home", href: "/" },
      { label: "Current", active: true },
    ];
    render(<Breadcrumb items={itemsWithActive} />);

    const current = screen.getByText("Current");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders separator between items", () => {
    const { container } = render(<Breadcrumb items={items} />);
    // Separator should be rendered (default is "/" or custom)
    expect(container.querySelector("nav")).toBeInTheDocument();
  });

  it("uses custom separator when provided", () => {
    const { container } = render(<Breadcrumb items={items} separator="→" />);
    expect(container.textContent).toContain("→");
  });

  it("has semantic nav element", () => {
    const { container } = render(<Breadcrumb items={items} />);
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("applies default aria-label to nav", () => {
    const { container } = render(<Breadcrumb items={items} />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveAttribute("aria-label");
  });

  it("uses custom aria-label when provided", () => {
    const { container } = render(<Breadcrumb items={items} ariaLabel="Product navigation" />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveAttribute("aria-label", "Product navigation");
  });

  it("handles long breadcrumb trails", () => {
    const longItems = Array.from({ length: 10 }, (_, i) => ({
      label: `Level ${i + 1}`,
      href: `/level${i + 1}`,
    }));
    render(<Breadcrumb items={longItems} />);

    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.getByText("Level 10")).toBeInTheDocument();
  });

  it("renders items in correct order", () => {
    const { container } = render(<Breadcrumb items={items} />);
    const text = container.textContent;
    const homeIndex = text.indexOf("Home");
    const productsIndex = text.indexOf("Products");
    const electronicsIndex = text.indexOf("Electronics");

    expect(homeIndex).toBeLessThan(productsIndex);
    expect(productsIndex).toBeLessThan(electronicsIndex);
  });

  it("handles items with both href and onClick", () => {
    const onClick = jest.fn();
    const mixedItems = [{ label: "Home", href: "/", onClick }, { label: "Current" }];
    render(<Breadcrumb items={mixedItems} />);

    const home = screen.getByText("Home");
    fireEvent.click(home);
    expect(onClick).toHaveBeenCalled();
  });
});
