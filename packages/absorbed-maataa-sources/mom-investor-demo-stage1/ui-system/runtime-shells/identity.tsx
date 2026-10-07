/** @maataa/maataa-ui · runtime-shells · identity — IMPLEMENTED. Composes layout + components + widgets. PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { ShellFrame } from "../layouts/_frame.tsx";
import { DataTable } from "../components/tables.tsx";
export function IdentityShell() {
  const cols = [{ key: "cap", label: "Capability" }, { key: "status", label: "State" }];
  const rows = [{ cap: "approval.sign", status: "ALLOWED" }, { cap: "runtime.promote", status: "BLOCKED" }, { cap: "productionDb.write", status: "BLOCKED" }];
  return <ShellFrame title="🛡 Identity" nav={["Overview","Devices","Sessions","Permissions"]}><DataTable columns={cols} rows={rows} /></ShellFrame>;
}
export default IdentityShell;
export const meta = { layer: "runtime-shells", id: "identity", status: "IMPLEMENTED", implemented: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
