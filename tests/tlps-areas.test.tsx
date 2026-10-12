import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { TLPS_OS_CATALOG } from "../apps/tlps/src/operatingSystems";
import {
  AREA_DEFINITIONS,
  aiSpacesForArea,
  createAreaRecord,
  emptyAreaStore,
  nextStatus,
  readAreaStore,
  sampleRecords,
  summarizeArea,
  TLPS_AREA_STORE_SCHEMA,
  validateAreaValues,
  workspacesForArea,
  type AreaStore,
} from "../apps/tlps/src/areas/areaModel";
import { AreaScreen } from "../apps/tlps/src/areas/AreaScreen";

afterEach(cleanup);

describe("TLPS work areas", () => {
  it("gives every OS entry a work area and no entry stays catalogue-only", () => {
    expect(TLPS_OS_CATALOG).toHaveLength(20);
    for (const system of TLPS_OS_CATALOG) {
      const def = AREA_DEFINITIONS[system.id];
      expect(def, system.id).toBeDefined();
      expect(system.availability).not.toBe("catalogue");
      expect(def.mode).toBe(system.availability === "demo" ? "workflow" : "register");
      if (def.mode === "register") {
        expect(def.fields.length).toBeGreaterThan(0);
        expect(def.statuses.length).toBeGreaterThan(1);
        for (const sample of def.samples) expect(validateAreaValues(def, sample), system.id).toEqual([]);
      } else {
        expect(def.target).toBeDefined();
      }
      expect(def.boundary.length).toBeGreaterThan(10);
    }
    expect(TLPS_OS_CATALOG.filter((system) => system.availability === "local")).toHaveLength(15);
  });

  it("wires the moved TLPS workspaces and AI spaces into their areas", () => {
    const ids = (id: keyof typeof AREA_DEFINITIONS) => workspacesForArea(AREA_DEFINITIONS[id]).filter((w) => w.source === "tlps").length;
    expect(ids("production-os")).toBe(13);
    expect(ids("casting")).toBe(10);
    expect(ids("crew")).toBe(8);
    expect(aiSpacesForArea(AREA_DEFINITIONS["maataa-ai"])).toHaveLength(7);
    expect(aiSpacesForArea(AREA_DEFINITIONS.casting).map((space) => space.id)).toEqual(["AI_SPACE.TLPS_CASTING_AI"]);
    for (const def of Object.values(AREA_DEFINITIONS)) for (const workspace of workspacesForArea(def)) expect(workspace.aliasOf).toBeUndefined();
  });

  it("validates records, moves status forward only and sums estimates", () => {
    const def = AREA_DEFINITIONS["wedding-os"];
    expect(validateAreaValues(def, { fn: "Party", date: "2027-13-40", guests: "-3" })).toEqual([
      "Function must be one of the listed options.",
      "Date must be a valid date.",
      "Guests must be a number of 0 or more.",
    ]);
    expect(() => createAreaRecord(AREA_DEFINITIONS["production-os"], {})).toThrow(/planning workflow/);
    const record = createAreaRecord(def, { fn: "Haldi", date: "2027-12-09", budget: "150000" });
    expect(record.status).toBe("Idea");
    expect(nextStatus(def, "Idea")).toBe("Planning");
    expect(nextStatus(def, "Done")).toBeNull();
    const summary = summarizeArea(def, [record, ...sampleRecords(def)]);
    expect(summary.total).toBe(3);
    expect(summary.moneyTotal).toBe(150000 + 2200000 + 4800000);
    expect(summary.samples).toBe(2);
  });

  it("reads stored data defensively", () => {
    expect(readAreaStore("not json")).toEqual(emptyAreaStore());
    expect(readAreaStore(JSON.stringify({ schema: "other", areas: {} }))).toEqual(emptyAreaStore());
    const good = createAreaRecord(AREA_DEFINITIONS.casting, { role: "Female Lead Actor", candidate: "A" });
    const raw = JSON.stringify({ schema: TLPS_AREA_STORE_SCHEMA, areas: {
      casting: [good, { ...good, id: "x", status: "Hired" }, { ...good, id: "y", values: { role: "Dancer", candidate: "B" } }],
      "production-os": [good],
      unknown: [good],
    } });
    const store = readAreaStore(raw);
    expect(store.areas.casting).toHaveLength(1);
    expect(store.areas["production-os"]).toBeUndefined();
    expect(Object.keys(store.areas)).toEqual(["casting"]);
  });
});

describe("TLPS area screen", () => {
  function renderArea(areaId: keyof typeof AREA_DEFINITIONS, initial: AreaStore = emptyAreaStore()) {
    let store = initial;
    const onOpenView = vi.fn();
    const utils = render(<AreaScreen areaId={areaId} store={store} onStoreChange={(next) => { store = next; utils.rerender(<AreaScreen areaId={areaId} store={store} onStoreChange={(n) => { store = n; }} onOpenView={onOpenView} onBack={() => {}} />); }} onOpenView={onOpenView} onBack={() => {}} />);
    return { ...utils, getStore: () => store, onOpenView };
  }

  it("adds, advances and removes a casting entry and renders a moved workspace and AI space", () => {
    const { getStore } = renderArea("casting");
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Role is required.");
    fireEvent.change(screen.getByLabelText("Role (required)"), { target: { value: "Female Lead Actor" } });
    fireEvent.change(screen.getByLabelText("Candidate (required)"), { target: { value: "Test candidate" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(getStore().areas.casting).toHaveLength(1);
    const table = screen.getByRole("table");
    expect(within(table).getByText("Test candidate")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Move Female Lead Actor to Shortlisted" }));
    expect(getStore().areas.casting?.[0].status).toBe("Shortlisted");
    fireEvent.click(screen.getByRole("button", { name: /Casting Board/ }));
    expect(screen.getByTestId("tlps-workspace-preview")).toHaveTextContent("WORKSPACE.CASTING.CASTING_BOARD");
    expect(document.querySelector('[data-workspace-type="WORKSPACE.CASTING.CASTING_BOARD"]')).not.toBeNull();
    expect(document.querySelector('[data-ai-space-id="AI_SPACE.TLPS_CASTING_AI"]')).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Remove Female Lead Actor" }));
    expect(getStore().areas.casting).toHaveLength(0);
  });

  it("sends planning areas to the workflow step", () => {
    const { onOpenView } = renderArea("finance-os");
    fireEvent.click(screen.getByRole("button", { name: /Open the plan step/ }));
    expect(onOpenView).toHaveBeenCalledWith("plan");
    expect(screen.queryByRole("table")).toBeNull();
  });
});
