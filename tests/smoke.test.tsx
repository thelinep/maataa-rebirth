import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { UiProvider, Button, FormField, Input, Modal, Tabs, DataTable, ThemeProvider, ThemeToggle } from "../src";

describe("@maataa/ui smoke", () => {
  it("renders core package surface", () => {
    const click = vi.fn();
    render(<UiProvider><Button onClick={click}>Create</Button></UiProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    expect(click).toHaveBeenCalledOnce();
  });
  it("links form labels and descriptions", () => {
    render(<FormField label="Email" description="Work email">{({ id, describedBy }) => <Input id={id} aria-describedby={describedBy} />}</FormField>);
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-describedby");
  });
  it("closes a modal with escape", () => {
    const close = vi.fn();
    render(<Modal open onClose={close} title="Confirm">Body</Modal>);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(close).toHaveBeenCalled();
  });
  it("switches tabs", () => {
    const change = vi.fn();
    render(<Tabs value="a" onValueChange={change} tabs={[{ id:"a", label:"A" }, { id:"b", label:"B" }]} />);
    fireEvent.click(screen.getByRole("tab", { name: "B" }));
    expect(change).toHaveBeenCalledWith("b");
  });
  it("renders a generic data table", () => {
    render(<DataTable data={[{ id:"1", name:"One" }]} columns={[{ id:"name", header:"Name" }]} />);
    expect(screen.getByText("One")).toBeInTheDocument();
  });
});
