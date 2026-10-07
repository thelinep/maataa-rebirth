import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Providers } from "../fixtures/consumer-next/app/providers";
import { Workflow } from "../fixtures/consumer-next/app/workflow";

afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.maataaTheme;
});

describe("packed Next App Router consumer surface", () => {
  it("uses the package theme provider and cycles the global theme", async () => {
    render(<Providers><p>Consumer content</p></Providers>);
    expect(screen.getByText("Consumer content")).toBeTruthy();
    await waitFor(() => expect(document.documentElement.dataset.maataaTheme).toBe("light"));

    fireEvent.click(screen.getByRole("button", { name: "Toggle MAATAA theme" }));
    await waitFor(() => expect(document.documentElement.dataset.maataaTheme).toBe("dark"));
  });

  it("completes the NEVO sample brief to operator-plan review", () => {
    render(<Providers><Workflow /></Providers>);
    fireEvent.change(screen.getByLabelText("Sample event"), { target: { value: "collectors" } });
    expect((screen.getByLabelText("Event name") as HTMLInputElement).value).toBe("Art & Collectors Evening");
    fireEvent.change(screen.getByLabelText("Event name"), { target: { value: "Private gallery preview" } });
    fireEvent.click(screen.getByRole("button", { name: /Build operator plan/ }));
    expect(screen.getByRole("heading", { name: "Review the run-of-show outline." })).toBeTruthy();

    fireEvent.change(screen.getByLabelText("Add a local operator note"), { target: { value: "Review stage access plan" } });
    fireEvent.click(screen.getByRole("button", { name: "Add note" }));
    expect(screen.getByText("Operator note · Review stage access plan")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Review event snapshot/ }));
    expect(screen.getByRole("heading", { name: "Review the event snapshot." })).toBeTruthy();
    expect(screen.getByText("Private gallery preview")).toBeTruthy();
    expect(screen.getByText("Not created · availability unknown")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Mark local draft reviewed" }));
    expect(screen.getByRole("status").textContent).toContain("No tenant handoff");
  });
});
