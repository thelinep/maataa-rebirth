import { describe, expect, it } from "vitest";
import ts from "typescript";
import path from "node:path";
import { DEFAULT_COMPOSER_SCENE, createComposerBlock, generateComposerJsx } from "../src/composer";
import type { ComposerScene } from "../src/composer/types";

const attacks = [
  '{alert("x")}', '${process.env.SECRET}', '`template ${expression}`',
  '</Text><script>alert(1)</script>', '{"x":1}', 'double " quotes', "single ' quotes",
  'back\\slashes', 'line\nbreak', 'tab\there', 'नमस्ते 世界', '🙂', '',
  'x'.repeat(20_000), '\u2028\u2029', '&lt;script&gt;',
];
function attackScene(value: string): ComposerScene {
  const kinds = ["heading", "text", "button", "input", "card", "table", "metric", "badge", "divider"] as const;
  return {
    ...DEFAULT_COMPOSER_SCENE, name: "123 bad",
    blocks: kinds.map((kind, i) => ({ ...createComposerBlock(kind, `b${i}`), props: {
      text: value, label: value, title: value, body: value, value, helper: value,
      placeholder: value, level: value, variant: value, tone: value,
    }})),
  };
}
function syntaxErrors(source: string) {
  return ts.transpileModule(source, { fileName: "generated.tsx", reportDiagnostics: true,
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).diagnostics ?? [];
}
describe("codegen trust boundary", () => {
  it.each(attacks)("preserves text as a literal: %s", (value) => {
    const code = generateComposerJsx(attackScene(value));
    expect(syntaxErrors(code)).toEqual([]);
    const ast = ts.createSourceFile("generated.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const literals: string[] = [];
    const calls: string[] = [];
    function visit(node: ts.Node) {
      if (ts.isCallExpression(node)) calls.push(node.getText(ast));
      if (ts.isJsxExpression(node) && node.expression && ts.isStringLiteral(node.expression)) literals.push(node.expression.text);
      ts.forEachChild(node, visit);
    }
    visit(ast);
    expect(calls).toEqual([]);
    expect(literals.filter(text => text === value).length).toBeGreaterThanOrEqual(10);
    expect(code).not.toContain("<script>");
  });
  it.each(["123 bad", "", "class", "await", "eval", "arguments", "lowercase", "🙂", "名字", "$Name", "A\\nB"])("emits a consumable component name: %s", name => {
    const code = generateComposerJsx({ ...DEFAULT_COMPOSER_SCENE, name });
    expect(syntaxErrors(code)).toEqual([]);
    expect(code).toMatch(/export function [A-Z][A-Za-z0-9_$]*\(/);
  });
  it("serializes identity attributes and rejects invalid numeric/enum props", () => {
    const scene = attackScene('"} onClick={alert(1)}');
    const code = generateComposerJsx({ ...scene, workspaceTypeId: scene.blocks[0].props.text as any });
    expect(syntaxErrors(code)).toEqual([]);
    expect(code).toContain('level={2}');
    expect(code).toContain('variant={"primary"}');
    expect(code).toContain('tone={"info"}');
  });
  it("typechecks generated default and adversarial compositions against real source exports", () => {
    const sources = new Map([
      [path.resolve("generated-default.tsx"), generateComposerJsx(DEFAULT_COMPOSER_SCENE)],
      [path.resolve("generated-adversarial.tsx"), generateComposerJsx(attackScene(attacks[3]))],
    ]);
    const options: ts.CompilerOptions = {
      noEmit: true, strict: true, skipLibCheck: true, esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler,
      baseUrl: process.cwd(), paths: { "@maataa/ui/*": ["src/*"] },
    };
    const host = ts.createCompilerHost(options);
    const original = host.getSourceFile;
    host.getSourceFile = (file, version, onError, create) => sources.has(file)
      ? ts.createSourceFile(file, sources.get(file)!, version, true, ts.ScriptKind.TSX)
      : original(file, version, onError, create);
    const program = ts.createProgram([...sources.keys()], options, host);
    expect(ts.getPreEmitDiagnostics(program).map(d => ts.flattenDiagnosticMessageText(d.messageText, "\n"))).toEqual([]);
  });
});
