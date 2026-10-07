/** @maataa/maataa-ui · components · forms — themed via token() (canonical --maataa-* vars from ThemeProvider). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type FieldProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  focused?: boolean;
  disabled?: boolean;
};
export function TextInput({ placeholder = "", value, focused = false, disabled = false }: FieldProps) {
  return (
    <input
      defaultValue={value}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        width: "100%",
        fontSize: 13,
        background: token("--maataa-surface-alt"),
        border: "1px solid " + (focused ? token("--maataa-accent-secondary") : token("--maataa-border")),
        borderRadius: 9,
        padding: "10px 12px",
        color: token("--maataa-text"),
        opacity: disabled ? 0.5 : 1
      }}
    />
  );
}
export function Field({ label, ...rest }: FieldProps) {
  return (
    <div>
      <label style={{ fontSize: 11, color: token("--maataa-text-muted"), display: "block", margin: "0 0 5px" }}>
        {label}
      </label>
      <TextInput {...rest} />
    </div>
  );
}
export default Field;
export const meta = {
  layer: "components",
  id: "forms",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
