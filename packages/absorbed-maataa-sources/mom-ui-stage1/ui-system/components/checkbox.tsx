/** @maataa/maataa-ui · components · checkbox — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
import { useState } from "react";
export type CheckboxProps = { checked?: boolean; onChange?: (v: boolean) => void; label?: string };
export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  const [internal, setInternal] = useState(checked ?? false);
  const v = checked ?? internal;
  return (
    <button
      role="checkbox"
      aria-checked={v}
      aria-label={label}
      onClick={() => {
        setInternal(!v);
        onChange?.(!v);
      }}
      style={{
        width: 18,
        height: 18,
        borderRadius: 5,
        border: "1px solid " + token("--maataa-border"),
        background: v ? token("--maataa-accent-secondary") : "transparent",
        color: "#fff",
        cursor: "pointer",
        fontSize: 12
      }}
    >
      {v ? "✓" : ""}
    </button>
  );
}
export default Checkbox;
export const meta = {
  layer: "components",
  id: "checkbox",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
