import type { ComposerBlock, ComposerScene } from "./types";

const imports: Record<string, { name: string; path: string }> = {
  heading: { name: "Heading", path: "@maataa/ui/typography/Heading" },
  text: { name: "Text", path: "@maataa/ui/typography/Text" },
  button: { name: "Button", path: "@maataa/ui/actions/Button" },
  input: { name: "Input", path: "@maataa/ui/forms/Input" },
  card: { name: "Card", path: "@maataa/ui/surfaces/Card" },
  table: { name: "DataTable", path: "@maataa/ui/data/DataTable" },
  metric: { name: "Metric", path: "@maataa/ui/data/Metric" },
  badge: { name: "Badge", path: "@maataa/ui/feedback/Badge" },
  divider: { name: "Divider", path: "@maataa/ui/foundation/Divider" },
};

function q(value: unknown) { return JSON.stringify(String(value ?? "")); }
function blockJsx(block: ComposerBlock) {
  const p = block.props;
  switch (block.kind) {
    case "heading": return `<Heading level={${Number(p.level ?? 2)}}>${String(p.text ?? "Heading")}</Heading>`;
    case "text": return `<Text>${String(p.text ?? "Text")}</Text>`;
    case "button": return `<Button variant=${q(p.variant ?? "primary")}>${String(p.label ?? "Action")}</Button>`;
    case "input": return `<Input aria-label=${q(p.label ?? "Input")} defaultValue=${q(p.value ?? "")} placeholder=${q(p.placeholder ?? "")} />`;
    case "card": return `<Card header={<strong>${String(p.title ?? "Card")}</strong>}><p>${String(p.body ?? "")}</p></Card>`;
    case "table": return `<DataTable data={rows} columns={columns} />`;
    case "metric": return `<Metric label=${q(p.label ?? "Metric")} value=${q(p.value ?? "0")} helper=${q(p.helper ?? "")} />`;
    case "badge": return `<Badge tone=${q(p.tone ?? "info")}>${String(p.label ?? "badge")}</Badge>`;
    case "divider": return `<Divider />`;
  }
}

export function generateComposerImports(scene: ComposerScene) {
  const used = [...new Set(scene.blocks.filter((b) => !b.hidden).map((b) => b.kind))];
  return used.map((kind) => `import { ${imports[kind].name} } from "${imports[kind].path}";`).join("\n");
}

export function generateComposerJsx(scene: ComposerScene) {
  const importsText = generateComposerImports(scene);
  const usesTable = scene.blocks.some((b) => b.kind === "table" && !b.hidden);
  const data = usesTable ? `\nconst rows = [{id:1,name:"Surface Registry",status:"ready"},{id:2,name:"Device Matrix",status:"simulated"}];\nconst columns = [{id:"name",header:"Name"},{id:"status",header:"Status"}];\n` : "\n";
  const body = scene.blocks.filter((b) => !b.hidden).map((b) => `      ${blockJsx(b)}`).join("\n");
  return `${importsText}${data}\nexport function ${scene.name.replace(/[^A-Za-z0-9_$]/g, "") || "MaataaComposition"}() {\n  return (\n    <div data-workspace=${q(scene.workspaceTypeId)} data-page=${q(scene.pageTypeId)} data-layout=${q(scene.layoutTypeId)}>\n${body}\n    </div>\n  );\n}\n`;
}
