/** @maataa/maataa-ui · components · skeleton — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type SkeletonProps = { lines?: number };
export function Skeleton({ lines = 3 }: SkeletonProps) {
  return (
    <div aria-busy="true" aria-live="polite">
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          style={{
            height: 12,
            borderRadius: 6,
            background: token("--maataa-surface-alt"),
            marginBottom: 8,
            width: 90 - i * 12 + "%"
          }}
        />
      ))}
    </div>
  );
}
export default Skeleton;
export const meta = {
  layer: "components",
  id: "skeleton",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
