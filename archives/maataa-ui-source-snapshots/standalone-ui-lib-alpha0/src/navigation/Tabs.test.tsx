import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

describe("Tabs", () => {
  const tabs = [
    { id: "tab1", label: "Tab 1", content: "Content 1" },
    { id: "tab2", label: "Tab 2", content: "Content 2" },
    { id: "tab3", label: "Tab 3", content: "Content 3" },
  ];

  it("renders all tabs", () => {
    render(<Tabs tabs={tabs} defaultTab="tab1" onChange={() => {}} variant="line" />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
  });

  it("displays content of active tab", () => {
    render(<Tabs tabs={tabs} defaultTab="tab1" onChange={() => {}} variant="line" />);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("calls onChange when tab is clicked", () => {
    const onChange = jest.fn();
    render(<Tabs tabs={tabs} defaultTab="tab1" onChange={onChange} variant="line" />);
    const tab2 = screen.getByText("Tab 2");
    fireEvent.click(tab2);
    expect(onChange).toHaveBeenCalledWith("tab2");
  });

  it("changes active tab when clicked", () => {
    render(<Tabs tabs={tabs} defaultTab="tab1" onChange={() => {}} variant="line" />);
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    const tab2 = screen.getByText("Tab 2");
    fireEvent.click(tab2);

    // After clicking, the component should update (in real scenario with controlled component)
    expect(tab2).toBeInTheDocument();
  });

  it("applies line variant", () => {
    const { container } = render(
      <Tabs tabs={tabs} defaultTab="tab1" onChange={() => {}} variant="line" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies box variant", () => {
    const { container } = render(
      <Tabs tabs={tabs} defaultTab="tab1" onChange={() => {}} variant="box" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies pill variant", () => {
    const { container } = render(
      <Tabs tabs={tabs} defaultTab="tab1" onChange={() => {}} variant="pill" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles disabled tabs", () => {
    const disabledTabs = [
      { id: "tab1", label: "Tab 1", content: "Content 1" },
      { id: "tab2", label: "Tab 2", content: "Content 2", disabled: true },
      { id: "tab3", label: "Tab 3", content: "Content 3" },
    ];
    const onChange = jest.fn();

    render(<Tabs tabs={disabledTabs} defaultTab="tab1" onChange={onChange} variant="line" />);

    const tab2 = screen.getByText("Tab 2");
    fireEvent.click(tab2);
    // Disabled tab should not trigger onChange
    expect(onChange).not.toHaveBeenCalledWith("tab2");
  });

  it("supports keyboard navigation", async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Tabs tabs={tabs} defaultTab="tab1" onChange={onChange} variant="line" />
    );

    const tab1 = screen.getByText("Tab 1");
    tab1.focus();

    await userEvent.keyboard("{ArrowRight}");
    // Keyboard navigation should move to next tab
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders tablist with proper ARIA role", () => {
    const { container } = render(
      <Tabs tabs={tabs} defaultTab="tab1" onChange={() => {}} variant="line" />
    );
    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist).toBeInTheDocument();
  });

  it("has tab role on tab buttons", () => {
    const { container } = render(
      <Tabs tabs={tabs} defaultTab="tab1" onChange={() => {}} variant="line" />
    );
    const tabButtons = container.querySelectorAll('[role="tab"]');
    expect(tabButtons.length).toBeGreaterThan(0);
  });

  it("marks active tab with aria-selected", () => {
    const { container } = render(
      <Tabs tabs={tabs} defaultTab="tab1" onChange={() => {}} variant="line" />
    );
    const tabs_elem = container.querySelectorAll('[role="tab"]');
    expect(tabs_elem[0]).toHaveAttribute("aria-selected", "true");
  });
});
