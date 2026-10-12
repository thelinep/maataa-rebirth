import React, { useState } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, render, renderHook, screen, within } from "@testing-library/react";
import {
  ChipPicker,
  cleanRecord,
  formatMoney,
  LiveStatus,
  parseRegisterRecords,
  pluralLabel,
  readStoredValue,
  RecordForm,
  RecordRegister,
  SelectField,
  StatSummary,
  StatusStep,
  TextField,
  useAnnouncer,
  useStoredValue,
  validateRecord,
  writeStoredValue,
  type RecordField,
  type RegisterRecord,
} from "../src/compounds";

afterEach(() => { cleanup(); localStorage.clear(); });

const FIELDS: RecordField[] = [
  { key: "name", label: "Name", kind: "text", required: true },
  { key: "role", label: "Role", kind: "select", options: ["Lead", "Support"], required: true },
  { key: "date", label: "Date", kind: "date" },
  { key: "fee", label: "Fee", kind: "number", money: true },
];
const STATUSES = ["Open", "Shortlisted", "Selected"];

describe("record schema", () => {
  it("validates required, options, dates and numbers in plain language", () => {
    expect(validateRecord(FIELDS, { name: " ", role: "Extra", date: "2027-02-30", fee: "-1" })).toEqual({
      name: "Name is required.",
      role: "Role must be one of the listed options.",
      date: "Date must be a valid date.",
      fee: "Fee must be a number of 0 or more.",
    });
    expect(validateRecord(FIELDS, { name: "Asha", role: "Lead" })).toEqual({});
    expect(cleanRecord(FIELDS, { name: " Asha ", role: "Lead", extra: "x" })).toEqual({ name: "Asha", role: "Lead", date: "", fee: "" });
    expect(["Casting entry", "Box", "Shot"].map(pluralLabel)).toEqual(["Casting entries", "Boxes", "Shots"]);
    expect(formatMoney(860000)).toBe("₹8,60,000");
  });
});

describe("validated storage", () => {
  const parse = (raw: unknown) => (Array.isArray(raw) && raw.every((x) => typeof x === "string") ? (raw as string[]) : null);
  it("returns the fallback for missing, broken or rejected data", () => {
    expect(readStoredValue("k", parse, ["fallback"])).toEqual(["fallback"]);
    localStorage.setItem("k", "{not json");
    expect(readStoredValue("k", parse, ["fallback"])).toEqual(["fallback"]);
    localStorage.setItem("k", JSON.stringify([1, 2]));
    expect(readStoredValue("k", parse, ["fallback"])).toEqual(["fallback"]);
    expect(writeStoredValue("k", ["a"])).toBe(true);
    expect(readStoredValue("k", parse, [])).toEqual(["a"]);
  });
  it("keeps React state and storage in step", () => {
    const { result } = renderHook(() => useStoredValue("list", parse, () => ["first"]));
    expect(result.current.value).toEqual(["first"]);
    act(() => result.current.setValue((v) => [...v, "second"]));
    expect(JSON.parse(localStorage.getItem("list")!)).toEqual(["first", "second"]);
    act(() => result.current.reset());
    expect(localStorage.getItem("list")).toBeNull();
    expect(result.current.value).toEqual(["first"]);
  });
  it("parses stored register rows against the schema", () => {
    const good = { id: "a", values: { name: "Asha", role: "Lead", date: "", fee: "" }, status: "Open" };
    expect(parseRegisterRecords([good, { ...good, id: "b", status: "Hired" }, { ...good, id: "c", values: { role: "Dancer" } }, "x"], FIELDS, STATUSES)).toEqual([{ ...good, sample: false, updatedAt: "" }]);
    expect(parseRegisterRecords({}, FIELDS, STATUSES)).toBeNull();
  });
});

describe("fields", () => {
  it("wire label, description and error to the control", () => {
    render(<>
      <TextField label="Project name" value="" onValueChange={() => {}} description="Shown on call sheets" error="Project name is required." required />
      <SelectField label="Format" value="" onValueChange={() => {}} options={[{ value: "ff", label: "Feature film" }]} placeholder="Choose…" />
    </>);
    const input = screen.getByLabelText(/Project name/);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAccessibleDescription("Shown on call sheets Project name is required.");
    expect(within(screen.getByLabelText("Format")).getAllByRole("option").map((o) => o.textContent)).toEqual(["Choose…", "Feature film"]);
  });
});

describe("small compounds", () => {
  it("StatusStep only moves forward and names the item", () => {
    const moved: string[] = [];
    const { rerender } = render(<StatusStep status="Open" statuses={STATUSES} itemLabel="Asha" onAdvance={(n) => moved.push(n)} />);
    fireEvent.click(screen.getByRole("button", { name: "Move Asha to Shortlisted" }));
    expect(moved).toEqual(["Shortlisted"]);
    rerender(<StatusStep status="Selected" statuses={STATUSES} itemLabel="Asha" onAdvance={() => {}} />);
    expect(screen.queryByRole("button")).toBeNull();
  });
  it("ChipPicker toggles one choice", () => {
    function Harness() { const [v, set] = useState(""); return <><ChipPicker label="Workspaces" items={[{ value: "a", label: "Alpha", meta: "TLPS" }, { value: "b", label: "Beta" }]} value={v} onValueChange={set} /><output>{v || "none"}</output></>; }
    render(<Harness />);
    const list = screen.getByRole("list", { name: "Workspaces" });
    fireEvent.click(within(list).getByRole("button", { name: /Alpha/ }));
    expect(within(list).getByRole("button", { name: /Alpha/ })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(within(list).getByRole("button", { name: /Alpha/ }));
    expect(screen.getByText("none")).toBeInTheDocument();
  });
  it("StatSummary and LiveStatus", () => {
    function Harness() { const [m, announce] = useAnnouncer(); return <><StatSummary label="Totals" items={[{ label: "Records", value: 2 }]} /><button onClick={() => announce("Saved.")}>save</button><LiveStatus message={m} /></>; }
    render(<Harness />);
    expect(within(screen.getByRole("list", { name: "Totals" })).getByText("Records")).toBeInTheDocument();
    fireEvent.click(screen.getByText("save"));
    expect(screen.getByRole("status")).toHaveTextContent("Saved.");
    fireEvent.click(screen.getByText("save"));
    expect(screen.getByRole("status").textContent).toBe("Saved. ");
  });
});

describe("RecordForm and RecordRegister", () => {
  it("RecordForm submits trimmed values only when valid", () => {
    const submitted: unknown[] = [];
    render(<RecordForm fields={FIELDS} onSubmit={(v) => { submitted.push(v); }} />);
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByText("Check 2 fields.")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toHaveAccessibleDescription("Name is required.");
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "  Asha " } });
    fireEvent.change(screen.getByLabelText(/Role/), { target: { value: "Lead" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(submitted).toEqual([{ name: "Asha", role: "Lead", date: "", fee: "" }]);
    expect(screen.getByLabelText(/Name/)).toHaveValue("");
  });

  it("RecordRegister adds samples, advances, totals and removes", () => {
    let n = 0;
    function Harness() { const [records, setRecords] = useState<RegisterRecord[]>([]); return <RecordRegister recordLabel="Casting entry" fields={FIELDS} statuses={STATUSES} records={records} onRecordsChange={setRecords} samples={[{ name: "Sample A", role: "Lead", fee: "800000" }, { name: "Sample B", role: "Support", fee: "60000" }]} createId={() => `id-${n++}`} now={() => "2027-01-01T00:00:00Z"} />; }
    render(<Harness />);
    expect(screen.getByText(/No casting entries yet/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Add sample records" }));
    const summary = screen.getByRole("list", { name: "Casting entries summary" });
    expect(summary).toHaveTextContent("₹8,60,000");
    fireEvent.click(screen.getByRole("button", { name: "Move Sample A to Shortlisted" }));
    expect(screen.getByRole("status")).toHaveTextContent("Sample A moved to Shortlisted.");
    fireEvent.click(screen.getByRole("button", { name: "Remove Sample B" }));
    expect(screen.getByRole("table", { name: "Casting entries" })).not.toHaveTextContent("Sample B");
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "New" } });
    fireEvent.change(screen.getByLabelText(/Role/), { target: { value: "Support" } });
    fireEvent.click(screen.getByRole("button", { name: "Add casting entry" }));
    expect(screen.getByRole("table", { name: "Casting entries" })).toHaveTextContent("New");
  });
});
