import { planSceneRegions } from "./regionPlan";
import { toCompositionSpec, validateCompositionSpec } from "./spec";
import { LAYOUT_TYPES } from "../registries/layoutRegistry";
import type { ComposerBlock, ComposerScene } from "./types";

import { COMPOSER_COMPONENT_BINDINGS } from "./componentBindings.generated";
import { DEPRECATED_LAYOUT_ALIASES } from "./layoutAliases";
const imports = COMPOSER_COMPONENT_BINDINGS;

/** Serialize data for a JavaScript expression, including script-embedding boundaries. */
function stringLiteral(value: unknown): string {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string -- codegen serialises untyped prop values; String() coercion is existing behaviour (follow-up: an object value becomes "[object Object]")
  return JSON.stringify(String(value ?? ""))
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
function jsxTextExpression(value: unknown): string {
  return `{${stringLiteral(value)}}`;
}
function jsxAttributeValue(value: unknown): string {
  return jsxTextExpression(value);
}
const reservedIdentifiers = new Set([
  "await", "break", "case", "catch", "class", "const", "continue", "debugger",
  "default", "delete", "do", "else", "enum", "export", "extends", "false",
  "finally", "for", "function", "if", "implements", "import", "in", "instanceof",
  "interface", "let", "new", "null", "package", "private", "protected", "public",
  "return", "static", "super", "switch", "this", "throw", "true", "try", "typeof",
  "var", "void", "while", "with", "yield", "eval", "arguments",
]);
function componentIdentifier(value: string, forbidden: readonly string[] = []): string {
  const name = value.replace(/[^A-Za-z0-9_$]/g, "");
  if (!name) return "MaataaComposition";
  // Components need an uppercase first character for JSX consumers as well.
  let identifier = /^[A-Z]/.test(name) && !reservedIdentifiers.has(name)
    ? name : `Maataa${name}`;
  while(forbidden.includes(identifier)) identifier=`Maataa${identifier}`;
  return identifier;
}
function enumValue(value: unknown, choices: readonly string[], fallback: string): string {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string -- enum check: any non-string value fails the choices.includes() test and falls back, so coercion cannot leak
  const text = String(value ?? fallback);
  return choices.includes(text) ? text : fallback;
}
function headingLevel(value: unknown): number {
  const level = Number(value ?? 2);
  return Number.isInteger(level) && level >= 1 && level <= 6 ? level : 2;
}
function blockJsx(block: ComposerBlock) {
  const p = block.props;
  switch (block.kind) {
    case "heading": return `<Heading level={${headingLevel(p.level)}}>${jsxTextExpression(p.text ?? "Heading")}</Heading>`;
    case "text": return `<Text>${jsxTextExpression(p.text ?? "Text")}</Text>`;
    case "button": return `<Button variant=${jsxAttributeValue(enumValue(p.variant, ["primary", "secondary", "ghost", "destructive"], "primary"))}>${jsxTextExpression(p.label ?? "Action")}</Button>`;
    case "input": return `<Input aria-label=${jsxAttributeValue(p.label ?? "Input")} defaultValue=${jsxAttributeValue(p.value ?? "")} placeholder=${jsxAttributeValue(p.placeholder ?? "")} />`;
    case "card": return `<Card header={<strong>${jsxTextExpression(p.title ?? "Card")}</strong>}><p>${jsxTextExpression(p.body ?? "")}</p></Card>`;
    case "table": return `<DataTable data={rows} columns={columns} />`;
    case "metric": return `<Metric label=${jsxAttributeValue(p.label ?? "Metric")} value=${jsxAttributeValue(p.value ?? "0")} helper=${jsxAttributeValue(p.helper ?? "")} />`;
    case "badge": return `<Badge tone=${jsxAttributeValue(enumValue(p.tone, ["neutral", "success", "warning", "danger", "info"], "info"))}>${jsxTextExpression(p.label ?? "badge")}</Badge>`;
    case "divider": return `<Divider />`;
  }
}

function selectedLayout(scene:ComposerScene) {
  const layout=LAYOUT_TYPES.find(item=>item.id===scene.layoutTypeId);
  if(!layout)throw new Error(`Unknown canonical layout: ${scene.layoutTypeId}`);
  const stableName=DEPRECATED_LAYOUT_ALIASES[layout.name];
  if(!stableName)return layout;
  const stable=LAYOUT_TYPES.find(item=>item.name===stableName);
  if(!stable)throw new Error(`Missing stable layout ${stableName} for ${layout.name}`);
  return stable;
}
export function generateComposerImports(scene: ComposerScene) {
  const result=validateCompositionSpec(toCompositionSpec(scene));
  if(!result.accepted)throw new Error(result.errors.join(" "));
  const used = [...new Set(scene.blocks.filter((b) => !b.hidden).map((b) => b.kind))];
  const layout=selectedLayout(scene);
  return [`import { ${layout.name} } from "${layout.importPath}";`, ...used.map((kind) => `import { ${imports[kind].name} } from "${imports[kind].path}";`)].join("\n");
}

export function generateComposerJsx(scene: ComposerScene) {
  const spec=toCompositionSpec(scene);
  const layout=selectedLayout(spec);
  const result=validateCompositionSpec(spec);
  if(!result.accepted)throw new Error(result.errors.join(" "));
  const importsText = generateComposerImports(scene);
  const usesTable = scene.blocks.some((b) => b.kind === "table" && !b.hidden);
  const data = usesTable ? `\nconst rows = [{id:1,name:"Surface Registry",status:"ready"},{id:2,name:"Device Matrix",status:"simulated"}];\nconst columns = [{id:"name",header:"Name"},{id:"status",header:"Status"}];\n` : "\n";
  const plan=planSceneRegions(result.spec);
  const regionProps=[...plan.assignments].map(([slot,blocks])=>`${slot}={<div>\n${blocks.filter(block=>!block.hidden).map(block=>`      ${blockJsx(block)}`).join("\n")}\n    </div>}`).join(" ");
  const placementNote=plan.unverified.length?"// Region placement unverified; primary-region fallback is explicit.\n":"";
  return `${importsText}${data}${placementNote}\nexport function ${componentIdentifier(scene.name,[layout.name,...Object.values(imports).map(item=>item.name)])}() {\n  return (\n    <${layout.name} data-workspace=${jsxAttributeValue(scene.workspaceTypeId)} data-page=${jsxAttributeValue(scene.pageTypeId)} data-layout=${jsxAttributeValue(scene.layoutTypeId)} ${regionProps} />\n  );\n}\n`;
}
