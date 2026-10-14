import { describe, expect, it } from "vitest";
import { createRegisterRecord } from "@maataa/ui/compounds";
import { TLPS_OS_CATALOG } from "../apps/tlps/src/operatingSystems";
import { TLPS_WORKSPACE_TYPES } from "../apps/tlps/src/registries/workspaceRegistry";
import { advanceWorkplaceRun, emptyWorkplaceRun, emptyWorkplaceStore, parseWorkplaceStore, TLPS_WORKPLACES, workplaceHandover } from "../apps/tlps/src/areas/workplaceModel";

describe("TLPS workplace demo coverage and review boundaries", () => {
  it("covers all 20 areas and every TLPS product workspace with valid sample inputs", () => {
    expect(new Set(TLPS_WORKPLACES.map((item) => item.areaId))).toEqual(new Set(TLPS_OS_CATALOG.map((item) => item.id)));
    expect(new Set(TLPS_WORKPLACES.map((item) => item.key)).size).toBe(TLPS_WORKPLACES.length);
    for (const item of TLPS_WORKSPACE_TYPES) expect(TLPS_WORKPLACES.some((workplace) => workplace.id === item.id), item.id).toBe(true);
    for (const workplace of TLPS_WORKPLACES) {
      expect(workplace.steps).toHaveLength(4);
      expect(workplace.samples.length).toBeGreaterThan(0);
      for (const sample of workplace.samples) expect(() => createRegisterRecord(workplace.fields, workplace.statuses, sample)).not.toThrow();
    }
    console.info(`${new Set(TLPS_WORKPLACES.map((item) => item.id)).size} workplaces; ${TLPS_WORKPLACES.length} area-specific demos`);
  });

  it("requires records, an owner and a note at each step; exports honest rehearsal status", () => {
    const workplace = TLPS_WORKPLACES[0];
    let run = emptyWorkplaceRun();
    expect(advanceWorkplaceRun(run)).toBe(run);
    run = { ...run, records: [createRegisterRecord(workplace.fields, workplace.statuses, workplace.samples[0], { sample: true })], owner: "Preview owner" };
    expect(advanceWorkplaceRun(run)).toBe(run);
    for (let step = 0; step < 4; step++) {
      run = advanceWorkplaceRun({ ...run, notes: run.notes.map((note, i) => i === step ? "Reviewed in local rehearsal" : note) });
      expect(run.step).toBe(step + 1);
    }
    expect(advanceWorkplaceRun(run)).toBe(run);
    expect(workplaceHandover(workplace, run)).toMatchObject({ demoComplete: true, productionReady: false, realPayments: false, confirmedBookings: false, authenticatedApproval: false });
  });

  it("keeps workplace runs separate and rejects malformed or unsupported stored completion", () => {
    const first = TLPS_WORKPLACES[0], second = TLPS_WORKPLACES[1];
    const store = emptyWorkplaceStore();
    store.runs[first.key] = { ...emptyWorkplaceRun(), owner: "First owner", step: 4 };
    store.runs[second.key] = { ...emptyWorkplaceRun(), owner: "Second owner" };
    const parsed = parseWorkplaceStore(store)!;
    expect(parsed.runs[first.key].step).toBe(0);
    expect(parsed.runs[second.key].owner).toBe("Second owner");
    expect(parseWorkplaceStore({ schema: "other", runs: {} })).toBeNull();
    expect(parseWorkplaceStore({ ...store, runs: { [first.key]: { ...store.runs[first.key], notes: [null] }, unknown: emptyWorkplaceRun() } })!.runs).toEqual({});
  });
});
