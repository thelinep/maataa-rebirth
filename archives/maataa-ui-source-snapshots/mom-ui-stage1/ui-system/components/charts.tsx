/** @maataa/maataa-ui · components · charts — themed via token() (canonical --maataa-* vars from ThemeProvider). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type SparklineProps = { data?: number[]; width?: number; height?: number; color?: string };
export function Sparkline({ data = [4, 8, 6, 10, 7, 12, 9], width = 180, height = 48, color }: SparklineProps) {
  const stroke = color ?? token("--maataa-accent-secondary");
  const max = Math.max(...data, 1),
    min = Math.min(...data, 0);
  const pts = data
    .map((d, i) => (i / (data.length - 1)) * width + "," + (height - ((d - min) / (max - min || 1)) * height))
    .join(" ");
  return (
    <svg width={width} height={height}>
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth={2} />
    </svg>
  );
}
export type DonutProps = { value?: number; size?: number; color?: string };
export function Donut({ value = 72, size = 90, color }: DonutProps) {
  const stroke = color ?? token("--maataa-accent-secondary");
  const r = size / 2 - 9,
    c = 2 * Math.PI * r,
    off = c * (1 - value / 100);
  return (
    <svg width={size} height={size} viewBox={"0 0 " + size + " " + size}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={token("--maataa-surface-alt")} strokeWidth={9} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={9}
        strokeDasharray={c}
        strokeDashoffset={off}
        strokeLinecap="round"
        transform={"rotate(-90 " + size / 2 + " " + size / 2 + ")"}
      />
      <text
        x={size / 2}
        y={size / 2 + 5}
        textAnchor="middle"
        fill={token("--maataa-text")}
        fontSize={16}
        fontWeight={700}
      >
        {value + "%"}
      </text>
    </svg>
  );
}
export default Sparkline;
export const meta = {
  layer: "components",
  id: "charts",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
