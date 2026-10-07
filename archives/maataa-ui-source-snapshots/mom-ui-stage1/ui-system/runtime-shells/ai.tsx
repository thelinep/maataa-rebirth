/** @maataa/maataa-ui · runtime-shells · ai — IMPLEMENTED. Composes layout + components + widgets. PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { ShellFrame } from "../layouts/_frame.tsx";
import { Card } from "../components/cards.tsx";
export function AIShell() {
  return (
    <ShellFrame title="✦ AI" nav={["Overview", "Mentors", "Models", "Guardrails"]}>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
        <Card title="Mentors" accent="sacredPurple">
          ai-mentor · ai-sage (preview).
        </Card>
        <Card title="Guardrails" accent="sacredPurple">
          No autonomy claimed · real telemetry only.
        </Card>
      </div>
    </ShellFrame>
  );
}
export default AIShell;
export const meta = {
  layer: "runtime-shells",
  id: "ai",
  status: "IMPLEMENTED",
  implemented: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
