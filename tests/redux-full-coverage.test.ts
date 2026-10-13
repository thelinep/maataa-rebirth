import { describe, expect, it } from "vitest";
import { REDUX_SLICE_REGISTRY } from "../src/registries/reduxSliceRegistry";
import { REDUX_SELECTOR_REGISTRY } from "../src/registries/reduxSelectorRegistry";
import { PAGE_TYPES } from "../src/registries/pageRegistry";
import { WORKSPACE_TYPES } from "../src/registries/workspaceRegistry";
import { LAYOUT_TYPES } from "../src/registries/layoutRegistry";
import { DEVICE_REGISTRY } from "../src/registries/deviceRegistry";
import { GENERATOR_REGISTRY } from "../src/registries/generatorRegistry";
import { TOOL_REGISTRY } from "../src/registries/toolRegistry";
import { AI_SPACE_REGISTRY } from "../src/registries/aiSpaceRegistry";
import { REGISTRY_REGISTRY } from "../src/registries/registryRegistry";
import { DEMO_SCENARIOS } from "../src/demo/scenarios";
import { createMaataaStore } from "../src/redux/store";
import * as selectors from "../src/redux/selectors";
import { demoActions } from "../src/redux/slices/demoSlice";
import { deviceActions } from "../src/redux/slices/deviceSlice";
import { generatorActions } from "../src/redux/slices/generatorSlice";
import { toolActions } from "../src/redux/slices/toolSlice";
import { aiActions } from "../src/redux/slices/aiSlice";
import { registryActions } from "../src/redux/slices/registrySlice";
import { DEMO_PROJECTS } from "../src/static-data/demoProjects";
import { DEMO_EVENTS } from "../src/static-data/demoEvents";
import { DEMO_VENDORS, DEMO_BOOKINGS } from "../src/static-data/demoCommerce";
import { DEMO_TRANSACTIONS } from "../src/static-data/demoFinance";
import { DEMO_TASKS } from "../src/static-data/demoTasks";
import { DEMO_PRODUCTION } from "../src/static-data/demoProduction";
import { DEMO_ACTIVITY } from "../src/static-data/demoNotifications";
import { DEMO_EVALUATIONS } from "../src/static-data/demoAI";
import { projectActions } from "../src/redux/slices/projectSlice";
import { eventActions } from "../src/redux/slices/eventSlice";
import { vendorActions } from "../src/redux/slices/vendorSlice";
import { bookingActions } from "../src/redux/slices/bookingSlice";
import { financeActions } from "../src/redux/slices/financeSlice";
import { taskActions } from "../src/redux/slices/taskSlice";
import { productionActions } from "../src/redux/slices/productionSlice";
import { activityActions } from "../src/redux/slices/activitySlice";
import { evaluationActions } from "../src/redux/slices/evaluationSlice";

describe("full Redux registry contract", () => {
  it("mounts every registered slice and exports every registered selector", () => {
    const store = createMaataaStore();
    const state = store.getState();
    expect(Object.keys(state).sort()).toEqual(REDUX_SLICE_REGISTRY.map((entry) => entry.reducerKey).sort());
    expect(REDUX_SLICE_REGISTRY).toHaveLength(26);
    for (const entry of REDUX_SLICE_REGISTRY) expect(state).toHaveProperty(entry.reducerKey);

    expect(REDUX_SELECTOR_REGISTRY).toHaveLength(52);
    for (const entry of REDUX_SELECTOR_REGISTRY) {
      // eslint-disable-next-line import/namespace -- iterates every registry record by name; the test itself asserts each lookup exists
      const selector = selectors[entry.name as keyof typeof selectors];
      expect(typeof selector, `${entry.name} must be exported`).toBe("function");
      if (entry.name === "selectProjectById") expect(() => selector(state, "missing-project")).not.toThrow();
      else if (entry.name === "selectEventById") expect(() => selector(state, "missing-event")).not.toThrow();
      else expect(() => selector(state)).not.toThrow();
    }

    expect(PAGE_TYPES.some((entry) => entry.id === state.page.activePageTypeId)).toBe(true);
    expect(WORKSPACE_TYPES.some((entry) => entry.id === state.workspace.activeWorkspaceTypeId)).toBe(true);
    expect(LAYOUT_TYPES.some((entry) => entry.id === state.layout.activeLayoutTypeId)).toBe(true);
    expect(DEVICE_REGISTRY.some((entry) => entry.id === state.device.deviceId)).toBe(true);
    expect(GENERATOR_REGISTRY.some((entry) => entry.id === state.generator.selectedGeneratorId)).toBe(true);
    expect(TOOL_REGISTRY.some((entry) => entry.id === state.tool.selectedToolId)).toBe(true);
    expect(AI_SPACE_REGISTRY.some((entry) => entry.id === state.ai.activeSpaceId)).toBe(true);
    expect(REGISTRY_REGISTRY.some((entry) => entry.id === state.registry.activeRegistryId)).toBe(true);
  });

  it("covers the static demo domains with validated selection and record-backed filters", () => {
    const store = createMaataaStore();
    const productionRecords = [...DEMO_PRODUCTION.productions, ...DEMO_PRODUCTION.scenes, ...DEMO_PRODUCTION.crew];
    const collections = [
      { key: "project", actions: projectActions, records: DEMO_PROJECTS, filtered: selectors.selectFilteredProjects, facetField: "status", facet: "active" },
      { key: "event", actions: eventActions, records: DEMO_EVENTS, filtered: selectors.selectFilteredEvents, facetField: "status", facet: "planning" },
      { key: "vendor", actions: vendorActions, records: DEMO_VENDORS, filtered: selectors.selectFilteredVendors, facetField: "status", facet: "preferred" },
      { key: "booking", actions: bookingActions, records: DEMO_BOOKINGS, filtered: selectors.selectFilteredBookings, facetField: "status", facet: "booked" },
      { key: "finance", actions: financeActions, records: DEMO_TRANSACTIONS, filtered: selectors.selectFilteredTransactions, facetField: "status", facet: "posted" },
      { key: "task", actions: taskActions, records: DEMO_TASKS, filtered: selectors.selectFilteredTasks, facetField: "status", facet: "doing" },
      { key: "production", actions: productionActions, records: productionRecords, filtered: selectors.selectFilteredProductionRecords, facetField: "status", facet: "pre-production" },
      { key: "activity", actions: activityActions, records: DEMO_ACTIVITY, filtered: selectors.selectFilteredActivity, facetField: "actorId", facet: "user-parvati" },
      { key: "evaluation", actions: evaluationActions, records: DEMO_EVALUATIONS, filtered: selectors.selectFilteredEvaluations, facetField: "severity", facet: "success" },
    ] as const;

    for (const collection of collections) {
      const first = collection.records[0]!;
      const state = store.getState();
      expect(collection.filtered(state).length, collection.key).toBe(collection.records.length);
      store.dispatch(collection.actions.setFacet(collection.facet));
      expect(collection.filtered(store.getState()).length, `${collection.key} facet`).toBeGreaterThan(0);
      expect(collection.filtered(store.getState()).every((record) => String((record as Record<string, unknown>)[collection.facetField]) === collection.facet)).toBe(true);
      store.dispatch(collection.actions.setFacet(null));
      const searchable = String((first as Record<string, unknown>).name ?? (first as Record<string, unknown>).action ?? first.id);
      store.dispatch(collection.actions.setQuery(`  ${searchable.toUpperCase()}  `));
      expect(collection.filtered(store.getState()).some((record) => record.id === first.id), collection.key).toBe(true);
      store.dispatch(collection.actions.setQuery(""));
      store.dispatch(collection.actions.selectRecord("missing-demo-record"));
      expect((store.getState()[collection.key as keyof typeof state] as { selectedId: string | null }).selectedId).toBeNull();
      store.dispatch(collection.actions.selectRecord(first.id));
      store.dispatch(collection.actions.toggleRecordSelection(first.id));
      store.dispatch(collection.actions.setView("list"));
      const domainState = store.getState()[collection.key as keyof typeof state] as { selectedId: string | null; selectedIds: string[]; view: string };
      expect(domainState.selectedId).toBe(first.id);
      expect(domainState.selectedIds).toContain(first.id);
      expect(domainState.view).toBe("list");
      expect(collection.filtered(store.getState()).length, `${collection.key} reset`).toBe(collection.records.length);
    }
  });

  it("filters all seven canonical catalogs by trimmed text and every catalog's group fields", () => {
    const store = createMaataaStore();
    const catalogSelectors = [
      ["pages", selectors.selectFilteredPages, PAGE_TYPES, "groupKey", "DESIGN_SYSTEM"],
      ["workspaces", selectors.selectFilteredWorkspaces, WORKSPACE_TYPES, "groupKey", "UI_DESIGN_SYSTEM"],
      ["layouts", selectors.selectFilteredLayouts, LAYOUT_TYPES, "groupKey", "CANVAS_SPATIAL"],
      ["devices", selectors.selectFilteredDevices, DEVICE_REGISTRY, "group", "PHONES"],
      ["generators", selectors.selectFilteredGenerators, GENERATOR_REGISTRY, "groupLabels", "Production"],
      ["tools", selectors.selectFilteredTools, TOOL_REGISTRY, "groupLabels", "Builder Tools"],
      ["AI spaces", selectors.selectFilteredAISpaces, AI_SPACE_REGISTRY, "groupLabels", "AI Business Spaces"],
    ] as const;

    store.dispatch(registryActions.setRegistryQuery("  " ));
    for (const [, selector, records] of catalogSelectors) {
      expect(selector(store.getState())).toHaveLength(records.length);
      expect(selector(store.getState())).toBe(selector(store.getState()));
    }

    for (const [label, selector, _records, groupField, groupValue] of catalogSelectors) {
      store.dispatch(registryActions.setRegistryQuery(""));
      store.dispatch(registryActions.setRegistryGroup(groupValue));
      const filtered = selector(store.getState());
      expect(filtered.length, label).toBeGreaterThan(0);
      for (const record of filtered) {
        const value = record[groupField];
        expect(Array.isArray(value) ? value : [value]).toContain(groupValue);
      }
      const first = filtered[0]!;
      store.dispatch(registryActions.setRegistryQuery(`  ${first.name.toUpperCase()}  `));
      expect(selector(store.getState()).some((record) => record.id === first.id)).toBe(true);
    }

    store.dispatch(registryActions.setRegistryGroup(null));
    store.dispatch(registryActions.setLifecycleFilter("canonical"));
    expect(selectors.selectFilteredPages(store.getState())).toEqual([]);
  });

  it("composes each demo scenario into canonical UI, device, generator, tool, and AI state", async () => {
    const store = createMaataaStore();
    for (const scenario of DEMO_SCENARIOS) {
      store.dispatch(demoActions.activateScenario(scenario.id));
      await new Promise((resolve) => setTimeout(resolve, 0));
      const state = store.getState();
      expect(state.workspace.activeWorkspaceTypeId).toBe(scenario.workspaceTypeId);
      expect(state.page.activePageTypeId).toBe(scenario.pageTypeId);
      expect(state.layout.activeLayoutTypeId).toBe(scenario.layoutTypeId);
      expect(state.device.deviceId).toBe(scenario.deviceTypeId);
      if (scenario.generatorId) expect(state.generator.selectedGeneratorId).toBe(scenario.generatorId);
      else expect(state.generator.selectedGeneratorId).toBeNull();
      if (scenario.toolId) expect(state.tool.selectedToolId).toBe(scenario.toolId);
      else expect(state.tool.selectedToolId).toBeNull();
      expect(state.ai.activeSpaceId).toBe(scenario.aiSpaceId ?? null);
    }
    expect(store.getState().generator.runs).toEqual([]);
    expect(store.getState().tool.executions).toEqual([]);
  });

  it("keeps device state coherent with canonical viewport, modality, safe-area, and hinge support", () => {
    const store = createMaataaStore();
    store.dispatch(deviceActions.setDevice("DEVICE.PHONES.SMARTPHONE"));
    let device = store.getState().device;
    expect(device.viewportId).toBe("VIEWPORT.MOBILE_STANDARD");
    expect(device.orientation).toBe("portrait");
    expect(device.inputModalityId).toBe("INPUT.TOUCH");
    expect(device.safeAreaId).toBe("SAFE_AREA.MOBILE_NOTCH");
    store.dispatch(deviceActions.setSafeAreaVisible(true));
    store.dispatch(deviceActions.setInputModality("INPUT.MOUSE"));
    store.dispatch(deviceActions.setScale(Number.NaN));
    device = store.getState().device;
    expect(device.showSafeArea).toBe(true);
    expect(device.inputModalityId).toBe("INPUT.TOUCH");
    expect(device.scale).toBe(1);

    store.dispatch(deviceActions.setDevice("DEVICE.DESKTOP_COMPUTING.DESKTOP"));
    device = store.getState().device;
    expect(device.viewportId).toBe("VIEWPORT.DESKTOP");
    expect(device.inputModalityId).toBe("INPUT.KEYBOARD");
    expect(device.safeAreaId).toBe("SAFE_AREA.NONE");
    expect(device.showSafeArea).toBe(false);
    store.dispatch(deviceActions.setHingeVisible(true));
    expect(store.getState().device.showHinge).toBe(false);
    store.dispatch(deviceActions.setScale(9));
    expect(store.getState().device.scale).toBe(2);
  });

  it("models pending, success, error, draft, message, and reset paths without invoking providers", () => {
    const store = createMaataaStore();
    store.dispatch(generatorActions.saveDraft({ generatorId: "GENERATOR.FORM_GENERATOR", values: { brief: "Sample" } }));
    store.dispatch(generatorActions.startRun({ id: "run-1", generatorId: "GENERATOR.FORM_GENERATOR", createdAt: "2026-10-06T00:00:00Z" }));
    expect(store.getState().generator.runs[0]?.status).toBe("loading");
    store.dispatch(generatorActions.completeRun({ id: "run-1", ok: true }));
    expect(store.getState().generator.runs[0]?.status).toBe("success");
    expect(store.getState().generator.drafts["GENERATOR.FORM_GENERATOR"]).toEqual({ brief: "Sample" });

    store.dispatch(toolActions.startToolExecution({ id: "exec-1", toolId: "TOOL.API_BUILDER", createdAt: "2026-10-06T00:00:00Z" }));
    expect(store.getState().tool.executions[0]?.status).toBe("loading");
    store.dispatch(toolActions.completeToolExecution({ id: "exec-1", ok: false, result: { requestSent: false } }));
    expect(store.getState().tool.executions[0]?.status).toBe("error");
    expect(store.getState().tool.executions[0]?.result).toEqual({ requestSent: false });

    store.dispatch(aiActions.addMessage({ id: "sample-message", role: "assistant", content: "Illustrative only", createdAt: "2026-10-06T00:00:00Z", citations: ["fixture:1"] }));
    expect(store.getState().ai.messages.at(-1)?.citations).toEqual(["fixture:1"]);
    store.dispatch(aiActions.clearMessages());
    expect(store.getState().ai.messages).toEqual([]);
  });
});
