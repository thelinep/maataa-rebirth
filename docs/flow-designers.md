# Flow designers (`@maataa/ui/flow`)

Status: **EXPERIMENTAL** (not in the Beta stable list).

Node-based designers for workflows and scene graphs, built on React Flow (`@xyflow/react`, MIT). The saved format is ours, so the canvas library can change without migrating saved flows.

## Install

`@xyflow/react` is an optional peer dependency. Install it only if you use this subpath:

```sh
pnpm add @xyflow/react@^12.12.0
```

```tsx
import "@xyflow/react/dist/style.css";
import { createFlow, WorkflowDesigner, type FlowSpecV1 } from "@maataa/ui/flow";

const [flow, setFlow] = useState<FlowSpecV1>(() => createFlow("workflow", "approval", "Plan approval"));
<WorkflowDesigner value={flow} onChange={setFlow} height={480} />;
```

`SceneDesigner` takes a flow with `kind: "scene"`; `FlowDesigner` takes either.

## Saved format: `FlowSpecV1`

```ts
{ schemaVersion: "1", kind: "workflow" | "scene", id, name,
  nodes: [{ id, type, label, position: { x, y } }],
  edges: [{ id, source, target, label? }] }
```

- `validateFlowSpec(value)` returns plain-language problems; `parseFlowSpec(json)` validates and strips unknown keys.
- Limits: 500 nodes, 2,000 connections, labels up to 120 characters.
- Workflows: node types start (one), task, approval, decision, handoff, end. A start node cannot be a target and an end node cannot be a source. Workflows cannot loop; `executionOrder(flow)` lists nodes in order.
- Scenes: scene, shot, character, location, prop, note. Loops are allowed.
- Pure operations: `addNode`, `updateNode`, `removeNode` (also removes its connections), `connect`, `disconnect`. Each returns `{ ok: true, flow }` or `{ ok: false, reason }`.

## Accessibility

Everything that can be done by dragging has a non-drag path (WCAG 2.5.7): palette buttons add nodes; the inspector edits name and X/Y position, connects to another node with an optional label, and deletes; node and connection lists select and remove. React Flow adds keyboard focus, arrow-key moves and announcements on the canvas. Messages appear in a polite live region.
