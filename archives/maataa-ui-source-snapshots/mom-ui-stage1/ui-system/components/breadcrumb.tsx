/** @maataa/maataa-ui · components · breadcrumb — themed via token(). PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { token } from "../foundations/ThemeProvider.tsx";
export type BreadcrumbProps = { items?: string[] };
export function Breadcrumb({ items = [] }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" style={{ fontSize: 12, color: token("--maataa-text-muted") }}>
      {items.map((it, i) => (
        <span key={it}>
          {i > 0 ? " › " : ""}
          <span style={{ color: i === items.length - 1 ? token("--maataa-text") : token("--maataa-text-muted") }}>
            {it}
          </span>
        </span>
      ))}
    </nav>
  );
}
export default Breadcrumb;
export const meta = {
  layer: "components",
  id: "breadcrumb",
  status: "IMPLEMENTED",
  themed: true,
  runtimeState: "CONTROLLED_NO_GO",
  productionState: "PRODUCTION_READY_NO"
} as const;
