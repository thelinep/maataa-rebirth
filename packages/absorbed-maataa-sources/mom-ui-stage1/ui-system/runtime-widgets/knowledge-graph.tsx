/** @maataa/maataa-ui · runtime-widgets · knowledge-graph — themed via token() (canonical --maataa-* vars from ThemeProvider). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type GraphNode = { id: string };
export type KnowledgeGraphProps = { nodes?: GraphNode[]; size?: number };
export function KnowledgeGraph({
  nodes = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }, { id: "e" }],
  size = 240
}: KnowledgeGraphProps) {
  const cx = size / 2,
    cy = size / 2,
    r = size / 2 - 30;
  const pos = nodes.map((n, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length;
    return { ...n, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  return (
    <svg width={size} height={size}>
      {pos.map((p) => (
        <line key={"l" + p.id} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={token("--maataa-border")} />
      ))}
      <circle cx={cx} cy={cy} r={14} fill={token("--maataa-accent-info")} />
      {pos.map((p) => (
        <g key={p.id}>
          <circle cx={p.x} cy={p.y} r={11} fill={token("--maataa-surface")} stroke={token("--maataa-accent-info")} />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fill={token("--maataa-text")} fontSize={10}>
            {p.id}
          </text>
        </g>
      ))}
    </svg>
  );
}
export default KnowledgeGraph;
export const meta = {
  layer: "runtime-widgets",
  id: "knowledge-graph",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
