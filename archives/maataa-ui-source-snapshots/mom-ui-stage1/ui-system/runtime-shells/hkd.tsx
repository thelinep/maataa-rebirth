/** @maataa/maataa-ui · runtime-shells · hkd — IMPLEMENTED. Composes layout + components + widgets. PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { ShellFrame } from "../layouts/_frame.tsx";
import { DataTable } from "../components/tables.tsx";
import { Donut } from "../components/charts.tsx";
import { HkdLink } from "../runtime-widgets/hkd-link.tsx";
export function HKDShell() {
  const cols = [
    { key: "report", label: "Evidence" },
    { key: "status", label: "State" }
  ];
  const rows = [
    { report: "p5-closure", status: "PASS" },
    { report: "live-observation", status: "PASS" },
    { report: "verify-approvals", status: "PASS" }
  ];
  return (
    <ShellFrame title="🗄 HKD" nav={["Overview", "Entities", "Evidence", "Dual-Path"]}>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "2fr 1fr" }}>
        <DataTable columns={cols} rows={rows} />
        <div style={{ textAlign: "center" }}>
          <Donut value={100} />
          <div>
            <HkdLink entity="HKD-001" kind="entity" />
          </div>
        </div>
      </div>
    </ShellFrame>
  );
}
export default HKDShell;
export const meta = {
  layer: "runtime-shells",
  id: "hkd",
  status: "IMPLEMENTED",
  implemented: true,
  backed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
