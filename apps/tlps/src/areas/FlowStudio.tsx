import React, { useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import { createFlow, parseFlowSpec, SceneDesigner, WorkflowDesigner, type FlowSpecV1 } from "@maataa/ui/flow";

export const TLPS_FLOW_STORE_KEY = "tlps.flows.v1";
type FlowStore = { scene: FlowSpecV1; workflow: FlowSpecV1 };

function sampleStore(): FlowStore {
  const scene: FlowSpecV1 = {
    ...createFlow("scene", "tlps-scene-board", "Scene board"),
    nodes: [
      { id: "scene-1", type: "scene", label: "Sample · Sc 12 Cinema lobby, night", position: { x: 0, y: 0 } },
      { id: "character-1", type: "character", label: "Sample · Asha", position: { x: 260, y: -80 } },
      { id: "location-1", type: "location", label: "Sample · Single-screen cinema", position: { x: 260, y: 80 } },
      { id: "shot-1", type: "shot", label: "Sample · 12A wide", position: { x: 0, y: 160 } },
    ],
    edges: [
      { id: "edge-1", source: "character-1", target: "scene-1", label: "appears in" },
      { id: "edge-2", source: "location-1", target: "scene-1", label: "set at" },
      { id: "edge-3", source: "scene-1", target: "shot-1" },
    ],
  };
  const workflow: FlowSpecV1 = {
    ...createFlow("workflow", "tlps-plan-approval", "Plan approval"),
    nodes: [
      { id: "start-1", type: "start", label: "Plan drafted", position: { x: 0, y: 0 } },
      { id: "task-1", type: "task", label: "Line producer checks budget", position: { x: 220, y: 0 } },
      { id: "approval-1", type: "approval", label: "Owner review", position: { x: 440, y: 0 } },
      { id: "end-1", type: "end", label: "Ready for rehearsal", position: { x: 660, y: 0 } },
    ],
    edges: [
      { id: "edge-1", source: "start-1", target: "task-1" },
      { id: "edge-2", source: "task-1", target: "approval-1" },
      { id: "edge-3", source: "approval-1", target: "end-1", label: "approved" },
    ],
  };
  return { scene, workflow };
}

function readStore(): FlowStore {
  try {
    const raw = localStorage.getItem(TLPS_FLOW_STORE_KEY);
    if (!raw) return sampleStore();
    const parsed = JSON.parse(raw) as { scene?: unknown; workflow?: unknown };
    return { scene: parseFlowSpec(JSON.stringify(parsed.scene)), workflow: parseFlowSpec(JSON.stringify(parsed.workflow)) };
  } catch {
    return sampleStore();
  }
}

/** Scene board and approval workflow for Film OS, saved in this browser. */
export function FlowStudio() {
  const [store, setStore] = useState<FlowStore>(readStore);
  const [tab, setTab] = useState<"scene" | "workflow">("scene");
  useEffect(() => { try { localStorage.setItem(TLPS_FLOW_STORE_KEY, JSON.stringify(store)); } catch { /* storage unavailable: keep working in memory */ } }, [store]);
  return (
    <section className="tlps-area-panel" aria-labelledby="tlps-flow-title">
      <h2 id="tlps-flow-title">Scene board and approval workflow</h2>
      <p className="tlps-muted">Drag nodes or use the panel on the right; everything works with a keyboard too. Saved in this browser only.</p>
      <div className="tlps-flow-tabs" role="tablist" aria-label="Designer">
        <button type="button" role="tab" aria-selected={tab === "scene"} onClick={() => setTab("scene")}>Scene board</button>
        <button type="button" role="tab" aria-selected={tab === "workflow"} onClick={() => setTab("workflow")}>Approval workflow</button>
        <button type="button" onClick={() => setStore(sampleStore())}>Reset to sample</button>
      </div>
      <div role="tabpanel" className="tlps-flow-panel">
        {tab === "scene"
          ? <SceneDesigner value={store.scene} onChange={(scene) => setStore((s) => ({ ...s, scene }))} height={460} />
          : <WorkflowDesigner value={store.workflow} onChange={(workflow) => setStore((s) => ({ ...s, workflow }))} height={460} />}
      </div>
    </section>
  );
}
