/** @maataa/maataa-ui · components · progress — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type ProgressProps = { value?: number };
export function Progress({ value = 0 }: ProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  return <div role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} style={{ height: 8, borderRadius: 999, background: token("--maataa-surface-alt"), overflow: "hidden" }}><span style={{ display: "block", height: "100%", width: v + "%", background: token("--maataa-accent-secondary") }} /></div>;
}
export default Progress;
export const meta = { layer: "components", id: "progress", status: "IMPLEMENTED", themed: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
