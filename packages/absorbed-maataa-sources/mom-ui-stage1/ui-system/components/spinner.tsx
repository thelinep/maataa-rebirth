/** @maataa/maataa-ui · components · spinner — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type SpinnerProps = { size?: number };
export function Spinner({ size = 28 }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="loading"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        border: "3px solid " + token("--maataa-border"),
        borderTopColor: token("--maataa-accent-secondary"),
        animation: "maataa-spin .8s linear infinite"
      }}
    />
  );
}
export default Spinner;
export const meta = {
  layer: "components",
  id: "spinner",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
