import React, { useState } from "react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import {
  addNode,
  connect,
  createFlow,
  disconnect,
  executionOrder,
  parseFlowSpec,
  removeNode,
  SceneDesigner,
  updateNode,
  validateFlowSpec,
  WorkflowDesigner,
  type FlowResult,
  type FlowSpecV1,
} from "../src/flow";

const ok = (result: FlowResult) => { if (!result.ok) throw new Error(result.reason); return result.flow; };

beforeAll(() => {
  // React Flow measures the canvas; jsdom has no layout engine.
  class ResizeObserverStub { observe() {} unobserve() {} disconnect() {} }
  globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;
  (globalThis as { DOMMatrixReadOnly?: unknown }).DOMMatrixReadOnly ??= class { m22 = 1; constructor() {} };
});
afterEach(cleanup);

describe("flow schema", () => {
  it("builds a workflow, keeps it loop-free and orders it", () => {
    let flow = createFlow("workflow", "approval-flow", "Plan approval");
    flow = ok(addNode(flow, "start"));
    flow = ok(addNode(flow, "task"));
    flow = ok(addNode(flow, "approval"));
    flow = ok(addNode(flow, "end"));
    expect(addNode(flow, "start")).toEqual({ ok: false, reason: "Only 1 Start node allowed." });
    flow = ok(connect(flow, "start-1", "task-1"));
    flow = ok(connect(flow, "task-1", "approval-1", "Submit"));
    flow = ok(connect(flow, "approval-1", "end-1"));
    expect(connect(flow, "approval-1", "task-1")).toMatchObject({ ok: false, reason: expect.stringContaining("loop") });
    expect(connect(flow, "task-1", "start-1")).toMatchObject({ ok: false, reason: expect.stringContaining("nothing can lead into") });
    expect(connect(flow, "end-1", "task-1")).toMatchObject({ ok: false });
    expect(connect(flow, "task-1", "approval-1")).toMatchObject({ ok: false, reason: expect.stringContaining("same nodes") });
    expect(executionOrder(flow)).toEqual(["start-1", "task-1", "approval-1", "end-1"]);
    flow = ok(removeNode(flow, "approval-1"));
    expect(flow.edges.map((e) => `${e.source}>${e.target}`)).toEqual(["start-1>task-1"]);
    expect(validateFlowSpec(flow)).toEqual([]);
  });

  it("allows cycles in scene graphs and round-trips through JSON", () => {
    let flow = createFlow("scene", "scene-12", "Scene 12");
    flow = ok(addNode(flow, "scene", { x: 0, y: 0 }, "Cinema lobby"));
    flow = ok(addNode(flow, "character", { x: 200, y: 0 }, "Asha"));
    flow = ok(connect(flow, "scene-1", "character-1", "appears in"));
    flow = ok(connect(flow, "character-1", "scene-1"));
    flow = ok(updateNode(flow, "character-1", { position: { x: 210.6, y: -40.2 } }));
    expect(flow.nodes[1].position).toEqual({ x: 211, y: -40 });
    flow = ok(disconnect(flow, "edge-2"));
    expect(parseFlowSpec(JSON.stringify(flow))).toEqual(flow);
  });

  it("rejects malformed or hostile input", () => {
    expect(() => parseFlowSpec("{")).toThrow(/not valid JSON/);
    expect(validateFlowSpec({ schemaVersion: "2", kind: "workflow", id: "a", name: "A", nodes: [], edges: [] })).toContain("Unsupported flow schema version 2.");
    const bad = { schemaVersion: "1", kind: "workflow", id: "a b", name: "", nodes: [{ id: "n", type: "rocket", label: "x", position: { x: Infinity, y: 0 } }], edges: [{ id: "e", source: "n", target: "missing" }] };
    const issues = validateFlowSpec(bad);
    expect(issues).toEqual(expect.arrayContaining(["The flow ID is missing or has unsupported characters.", "The flow name must be 1–120 characters.", "A node is missing its ID, label or position.", "Connection e points to a missing node."]));
    expect(parseFlowSpec(JSON.stringify({ ...createFlow("scene", "s", "S"), extra: "<script>" }))).not.toHaveProperty("extra");
  });
});

function Harness({ initial, kind }: { initial: FlowSpecV1; kind: "workflow" | "scene" }) {
  const [flow, setFlow] = useState(initial);
  return <>
    {kind === "workflow" ? <WorkflowDesigner value={flow} onChange={setFlow} height={300} /> : <SceneDesigner value={flow} onChange={setFlow} height={300} />}
    <output data-testid="json">{JSON.stringify(flow)}</output>
  </>;
}
const current = () => JSON.parse(screen.getByTestId("json").textContent!) as FlowSpecV1;

describe("flow designer", () => {
  it("can be used without dragging: add, rename, move, connect and remove", async () => {
    render(<Harness kind="workflow" initial={createFlow("workflow", "wf", "Plan approval")} />);
    const palette = screen.getByRole("complementary", { name: "Add a node" });
    await act(async () => { fireEvent.click(within(palette).getByRole("button", { name: /^Start/ })); });
    await act(async () => { fireEvent.click(within(palette).getByRole("button", { name: /^Task/ })); });
    expect(current().nodes.map((n) => n.type)).toEqual(["start", "task"]);
    expect(document.querySelector(".m-flow-status")).toHaveTextContent("Task 1 added.");
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Prepare budget" } });
    fireEvent.change(screen.getByLabelText("X"), { target: { value: "400" } });
    expect(current().nodes[1]).toMatchObject({ label: "Prepare budget", position: { x: 400 } });
    fireEvent.click(within(screen.getByRole("list", { name: "Nodes" })).getByRole("button", { name: /Start 1/ }));
    fireEvent.change(screen.getByLabelText("Connect to"), { target: { value: "task-1" } });
    fireEvent.click(screen.getByRole("button", { name: "Connect" }));
    expect(current().edges).toEqual([{ id: "edge-1", source: "start-1", target: "task-1" }]);
    fireEvent.click(within(screen.getByRole("list", { name: "Nodes" })).getByRole("button", { name: /Prepare budget/ }));
    fireEvent.change(screen.getByLabelText("Connect to"), { target: { value: "start-1" } });
    fireEvent.click(screen.getByRole("button", { name: "Connect" }));
    expect(document.querySelector(".m-flow-status")).toHaveTextContent(/nothing can lead into/);
    fireEvent.click(screen.getByRole("button", { name: "Remove connection from Start 1 to Prepare budget" }));
    expect(current().edges).toEqual([]);
    fireEvent.click(screen.getByRole("button", { name: "Delete node" }));
    expect(current().nodes.map((n) => n.id)).toEqual(["start-1"]);
    expect(document.querySelector('[data-flow-kind="workflow"] .react-flow')).not.toBeNull();
  });

  it("offers scene node types and refuses a flow of the wrong kind", () => {
    render(<Harness kind="scene" initial={createFlow("scene", "sc", "Scene 12")} />);
    const palette = screen.getByRole("complementary", { name: "Add a node" });
    expect(within(palette).getAllByRole("button").map((b) => b.querySelector("span")?.textContent)).toEqual(["Scene", "Shot", "Character", "Location", "Prop", "Note"]);
    cleanup();
    expect(() => render(<WorkflowDesigner value={createFlow("scene", "sc", "S")} onChange={() => {}} />)).toThrow(/kind "workflow"/);
  });
});
