import * as React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { LAYOUT_TYPES } from "../src/registries/layoutRegistry";
import { CANONICAL_LAYOUT_LOADERS } from "../src/runtime/layoutLoaders.generated";
import { CanonicalCompositionRuntime } from "../src/runtime/CanonicalCompositionRuntime";
import { DEFAULT_COMPOSER_SCENE } from "../src/composer/defaults";
import { generateComposerJsx } from "../src/composer/codegen";
import { DEPRECATED_LAYOUT_ALIASES } from "../src/composer/layoutAliases";
afterEach(cleanup);
describe("canonical layout execution",()=>{
  it.each(LAYOUT_TYPES)("loads and renders $id",async record=>{
    const {default:Layout}=await CANONICAL_LAYOUT_LOADERS[record.id]();
    const {container}=render(<Layout header={<span>Header</span>} main={<span>Selected layout content</span>}/>);
    expect(container.querySelector('[data-layout-name]')).toHaveAttribute("data-layout-name",record.name.replace(/Layout$/,""));
    expect(container.querySelector('[data-layout-region="main"]')).toHaveTextContent("Selected layout content");
    expect(container.querySelector('[data-layout-region="header"]')).toHaveTextContent("Header");
    // Deprecated aliases generate their same-template replacement (decision 2026-10-12).
    const emitted=LAYOUT_TYPES.find(item=>item.name===(DEPRECATED_LAYOUT_ALIASES[record.name]??record.name))!;
    expect(generateComposerJsx({...DEFAULT_COMPOSER_SCENE,layoutTypeId:record.id})).toContain(`import { ${emitted.name} } from "${emitted.importPath}"`);
  });
  it("executes selection and changes the actual layout implementation",async()=>{
    const {container,rerender}=render(<CanonicalCompositionRuntime scene={DEFAULT_COMPOSER_SCENE}/>);
    await screen.findByRole("button",{name:"Primary action"});
    expect(container.querySelector('[data-layout-name]')).toHaveAttribute("data-layout-name","Builder");
    rerender(<CanonicalCompositionRuntime scene={{...DEFAULT_COMPOSER_SCENE,layoutTypeId:"LAYOUT.BASIC_CONTENT.SINGLECOLUMN"}}/>);
    await screen.findByRole("button",{name:"Primary action"});
    expect(container.querySelector('[data-layout-name]')).toHaveAttribute("data-layout-name","SingleColumn");
    expect(container.firstChild).toHaveAttribute("data-composition-status","unverified");
  });
  it("rejects invented layouts before mounting content or generating code",()=>{
    const scene={...DEFAULT_COMPOSER_SCENE,layoutTypeId:"LAYOUT.INVENTED"} as typeof DEFAULT_COMPOSER_SCENE;
    render(<CanonicalCompositionRuntime scene={scene}/>);
    expect(screen.getByRole("alert")).toHaveTextContent("invalid");
    expect(screen.queryByRole("button",{name:"Primary action"})).toBeNull();
    expect(()=>generateComposerJsx(scene)).toThrow("Unknown canonical layout");
  });
});
