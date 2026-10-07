/** @maataa/maataa-ui · components · empty-state — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import type { ReactNode } from "react";
export type EmptyStateProps = { title?: string; message?: string; action?: ReactNode };
export function EmptyState({
  title = "No data found",
  message = "Try adjusting your search or filters.",
  action
}: EmptyStateProps) {
  return (
    <div style={{ textAlign: "center", padding: 24, color: token("--maataa-text") }}>
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div style={{ color: token("--maataa-text-muted"), fontSize: 12, marginTop: 4 }}>{message}</div>
      {action ? <div style={{ marginTop: 10 }}>{action}</div> : null}
    </div>
  );
}
export default EmptyState;
export const meta = {
  layer: "components",
  id: "empty-state",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
