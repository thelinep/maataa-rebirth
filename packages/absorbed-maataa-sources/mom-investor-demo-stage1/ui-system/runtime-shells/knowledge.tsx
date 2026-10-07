/** @maataa/maataa-ui · runtime-shells · knowledge — IMPLEMENTED. Composes layout + components + widgets. PHKD: CONTROLLED_NO_GO / PRODUCTION_READY_NO. */
import { ShellFrame } from "../layouts/_frame.tsx";
import { KnowledgeSearch } from "../runtime-widgets/knowledge-search.tsx";
import { KnowledgeGraph } from "../runtime-widgets/knowledge-graph.tsx";
import { Citation } from "../runtime-widgets/citation.tsx";
import { Fact } from "../runtime-widgets/fact.tsx";
export function KnowledgeShell() {
  return (
    <ShellFrame title="◉ Knowledge" nav={["Search","Graph","Citations","Facts"]}>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
        <div><KnowledgeSearch items={["Brahmi","Devanagari","Tamil","Telugu","Kannada"]} /><div style={{ marginTop: 10 }}><Citation source="Lipi registry" ref="wave-1" verified /></div></div>
        <div><KnowledgeGraph /><div style={{ marginTop: 10 }}><Fact claim="426 scripts tracked, 8 catalogued." provenance="lipi-registry" confidence="high" /></div></div>
      </div>
    </ShellFrame>
  );
}
export default KnowledgeShell;
export const meta = { layer: "runtime-shells", id: "knowledge", status: "IMPLEMENTED", implemented: true, runtimeState: "CONTROLLED_NO_GO", productionState: "PRODUCTION_READY_NO" } as const;
