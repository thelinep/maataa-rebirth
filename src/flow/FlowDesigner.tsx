import React, { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";
import { cx } from "../utils";
import {
  addNode,
  connect,
  disconnect,
  executionOrder,
  nodeTypesFor,
  removeNode,
  updateNode,
  validateFlowSpec,
  type FlowNodeType,
  type FlowResult,
  type FlowSpecV1,
} from "./schema";

export interface FlowDesignerProps {
  value: FlowSpecV1;
  onChange: (next: FlowSpecV1) => void;
  /** Accessible name of the designer region. */
  label?: string;
  readOnly?: boolean;
  /** Canvas height in CSS pixels. */
  height?: number;
  className?: string;
}

const PALETTE_MIME = "application/x-maataa-flow-node";

function toCanvasNodes(flow: FlowSpecV1, types: readonly FlowNodeType[], selectedId: string): Node[] {
  return flow.nodes.map((node) => {
    const def = types.find((t) => t.type === node.type);
    return {
      id: node.id,
      position: node.position,
      data: { label: node.label },
      type: def?.canTarget === false ? "input" : def?.canSource === false ? "output" : "default",
      className: `m-flow-node m-flow-node-${node.type}`,
      selected: node.id === selectedId,
      ariaLabel: `${def?.label ?? node.type}: ${node.label}`,
    };
  });
}

function DesignerInner({ value, onChange, label = "Flow designer", readOnly = false, height = 480, className }: FlowDesignerProps) {
  const types = nodeTypesFor(value.kind);
  const [selectedId, setSelectedId] = useState("");
  const [nodes, setNodes] = useState<Node[]>(() => toCanvasNodes(value, types, ""));
  const [message, setMessage] = useState("");
  const [connectTarget, setConnectTarget] = useState("");
  const [connectLabel, setConnectLabel] = useState("");
  const flow = useReactFlow();
  const ids = useId();

  useEffect(() => { setNodes(toCanvasNodes(value, types, selectedId)); }, [value, types, selectedId]);

  const edges: Edge[] = useMemo(() => value.edges.map((edge) => ({ id: edge.id, source: edge.source, target: edge.target, label: edge.label, ariaLabel: `Connection from ${value.nodes.find((n) => n.id === edge.source)?.label} to ${value.nodes.find((n) => n.id === edge.target)?.label}` })), [value]);
  const issues = useMemo(() => validateFlowSpec(value), [value]);
  const order = useMemo(() => value.kind === "workflow" ? executionOrder(value) : [], [value]);
  const selected = value.nodes.find((node) => node.id === selectedId);

  const apply = useCallback((result: FlowResult, success?: string) => {
    if (!result.ok) { setMessage(result.reason); return false; }
    onChange(result.flow);
    if (success) setMessage(success);
    return true;
  }, [onChange]);

  const add = (type: string, position?: { x: number; y: number }) => {
    if (readOnly) return;
    const result = addNode(value, type, position);
    if (apply(result) && result.ok) {
      const created = result.flow.nodes[result.flow.nodes.length - 1];
      setSelectedId(created.id);
      setMessage(`${created.label} added.`);
    }
  };

  const onNodesChange = (changes: NodeChange[]) => {
    setNodes((current) => applyNodeChanges(changes.filter((c) => c.type !== "remove"), current));
    for (const change of changes) {
      if (change.type === "select" && change.selected) setSelectedId(change.id);
      if (readOnly) continue;
      if (change.type === "remove") { apply(removeNode(value, change.id), "Node deleted."); setSelectedId(""); }
      if (change.type === "position" && change.position && change.dragging === false) apply(updateNode(value, change.id, { position: change.position }));
    }
  };
  const onNodeDragStop = (_: unknown, node: Node) => { if (!readOnly) apply(updateNode(value, node.id, { position: node.position })); };
  const onEdgesChange = (changes: EdgeChange[]) => {
    if (readOnly) return;
    for (const change of changes) if (change.type === "remove") apply(disconnect(value, change.id), "Connection removed.");
  };
  const onConnect = (connection: Connection) => {
    if (readOnly || !connection.source || !connection.target) return;
    apply(connect(value, connection.source, connection.target), "Connected.");
  };
  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData(PALETTE_MIME);
    if (type) add(type, flow.screenToFlowPosition({ x: event.clientX, y: event.clientY }));
  };

  return (
    <section className={cx("m-flow-designer", className)} aria-label={label} data-flow-kind={value.kind}>
      {!readOnly && (
        <aside className="m-flow-palette" aria-label="Add a node">
          <p className="m-flow-heading">Add</p>
          {types.map((type) => (
            <button key={type.type} type="button" className="m-flow-palette-item" draggable onDragStart={(event) => { event.dataTransfer.setData(PALETTE_MIME, type.type); event.dataTransfer.effectAllowed = "move"; }} onClick={() => add(type.type)} title={type.description}>
              <span>{type.label}</span><small>{type.description}</small>
            </button>
          ))}
        </aside>
      )}
      <div className="m-flow-canvas" style={{ height }} onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = "move"; }} onDrop={onDrop}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodeDragStop={onNodeDragStop}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPaneClick={() => setSelectedId("")}
          nodesDraggable={!readOnly}
          nodesConnectable={!readOnly}
          elementsSelectable
          nodesFocusable
          edgesFocusable
          deleteKeyCode={readOnly ? null : ["Delete", "Backspace"]}
          fitView
          proOptions={{ hideAttribution: false }}
        >
          <Background gap={20} />
          <Controls showInteractive={false} />
          <MiniMap pannable zoomable ariaLabel="Overview map" />
        </ReactFlow>
      </div>
      <aside className="m-flow-inspector" aria-label="Selected node">
        <p className="m-flow-heading">{selected ? "Selected node" : "Nothing selected"}</p>
        {!selected ? (
          <p className="m-flow-muted">Select a node on the canvas or in the list below. Everything you can do by dragging can also be done here.</p>
        ) : (
          <>
            <label htmlFor={`${ids}-label`}>Name</label>
            <input id={`${ids}-label`} key={selected.id} className="m-input m-ui" defaultValue={selected.label} disabled={readOnly} maxLength={120} onChange={(event) => { if (event.target.value.trim()) apply(updateNode(value, selected.id, { label: event.target.value })); }} />
            <div className="m-flow-row">
              <span>
                <label htmlFor={`${ids}-x`}>X</label>
                <input id={`${ids}-x`} className="m-input m-ui" type="number" step={20} value={selected.position.x} disabled={readOnly} onChange={(event) => apply(updateNode(value, selected.id, { position: { x: Number(event.target.value), y: selected.position.y } }))} />
              </span>
              <span>
                <label htmlFor={`${ids}-y`}>Y</label>
                <input id={`${ids}-y`} className="m-input m-ui" type="number" step={20} value={selected.position.y} disabled={readOnly} onChange={(event) => apply(updateNode(value, selected.id, { position: { x: selected.position.x, y: Number(event.target.value) } }))} />
              </span>
            </div>
            {!readOnly && (
              <>
                <label htmlFor={`${ids}-target`}>Connect to</label>
                <select id={`${ids}-target`} className="m-select" value={connectTarget} onChange={(event) => setConnectTarget(event.target.value)}>
                  <option value="">Choose a node…</option>
                  {value.nodes.filter((node) => node.id !== selected.id).map((node) => <option key={node.id} value={node.id}>{node.label}</option>)}
                </select>
                <label htmlFor={`${ids}-edge-label`}>Connection label (optional)</label>
                <input id={`${ids}-edge-label`} className="m-input m-ui" value={connectLabel} maxLength={120} onChange={(event) => setConnectLabel(event.target.value)} />
                <div className="m-flow-row">
                  <button type="button" className="m-button m-ui" disabled={!connectTarget} onClick={() => { if (apply(connect(value, selected.id, connectTarget, connectLabel), "Connected.")) { setConnectTarget(""); setConnectLabel(""); } }}>Connect</button>
                  <button type="button" className="m-button m-ui" onClick={() => { apply(removeNode(value, selected.id), `${selected.label} deleted.`); setSelectedId(""); }}>Delete node</button>
                </div>
              </>
            )}
          </>
        )}
        <p className="m-flow-heading">Nodes ({value.nodes.length})</p>
        <ul className="m-flow-list" aria-label="Nodes">
          {value.nodes.map((node) => (
            <li key={node.id}><button type="button" aria-pressed={node.id === selectedId} onClick={() => { setSelectedId(node.id); void flow.setCenter(node.position.x + 75, node.position.y + 20, { duration: 200 }); }}>{node.label}<small>{types.find((t) => t.type === node.type)?.label}</small></button></li>
          ))}
        </ul>
        <p className="m-flow-heading">Connections ({value.edges.length})</p>
        <ul className="m-flow-list" aria-label="Connections">
          {value.edges.map((edge) => {
            const from = value.nodes.find((n) => n.id === edge.source)?.label;
            const to = value.nodes.find((n) => n.id === edge.target)?.label;
            return (
              <li key={edge.id}>
                <span>{from} → {to}{edge.label ? ` · ${edge.label}` : ""}</span>
                {!readOnly && <button type="button" aria-label={`Remove connection from ${from} to ${to}`} onClick={() => apply(disconnect(value, edge.id), "Connection removed.")}>Remove</button>}
              </li>
            );
          })}
        </ul>
        {value.kind === "workflow" && order.length > 0 && <p className="m-flow-muted">Order: {order.map((id) => value.nodes.find((n) => n.id === id)?.label).join(" → ")}</p>}
        {issues.length > 0 && <ul className="m-flow-issues">{issues.map((issue) => <li key={issue}>{issue}</li>)}</ul>}
        <p className="m-flow-status" role="status" aria-live="polite">{message}</p>
      </aside>
    </section>
  );
}

/** Node-based designer for a FlowSpecV1. Requires the React Flow stylesheet: import "@xyflow/react/dist/style.css". */
export function FlowDesigner(props: FlowDesignerProps) {
  return <ReactFlowProvider><DesignerInner {...props} /></ReactFlowProvider>;
}

export type WorkflowDesignerProps = Omit<FlowDesignerProps, "label"> & { label?: string };
export function WorkflowDesigner({ label = "Workflow designer", ...props }: WorkflowDesignerProps) {
  if (props.value.kind !== "workflow") throw new Error("WorkflowDesigner needs a flow with kind \"workflow\".");
  return <FlowDesigner label={label} {...props} />;
}

export type SceneDesignerProps = Omit<FlowDesignerProps, "label"> & { label?: string };
export function SceneDesigner({ label = "Scene designer", ...props }: SceneDesignerProps) {
  if (props.value.kind !== "scene") throw new Error("SceneDesigner needs a flow with kind \"scene\".");
  return <FlowDesigner label={label} {...props} />;
}
