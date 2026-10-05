import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import {readCatalog} from "./read-canonical-catalog.mjs";
const components=readCatalog("src/registries/componentRegistry.ts","COMPONENT_REGISTRY");
const regions=readCatalog("src/registries/regionRegistry.ts","REGION_REGISTRY");
const tuples=readCatalog("src/registries/compositionCompatibilityRegistry.ts","COMPOSITION_COMPATIBILITY_REGISTRY");
const audit=JSON.parse(fs.readFileSync("docs/engineering/layout-audit.json","utf8"));
const file="src/composer/ComposerRenderer.tsx",source=fs.readFileSync(file,"utf8");
const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
const imports=new Map();
const resolve=(specifier,origin)=>ts.resolveModuleName(specifier,path.resolve(origin),{moduleResolution:ts.ModuleResolutionKind.Bundler},ts.sys).resolvedModule?.resolvedFileName;
for(const statement of ast.statements)if(ts.isImportDeclaration(statement)&&statement.importClause?.namedBindings&&ts.isNamedImports(statement.importClause.namedBindings)){
 for(const binding of statement.importClause.namedBindings.elements)imports.set(binding.name.text,resolve(statement.moduleSpecifier.text,file));
}
const bindings={};
for(const match of source.matchAll(/case\s*"([^"]+)":\s*return\s*<(\w+)/g)){
 const [_,kind,name]=match;
 const candidates=components.filter(record=>record.name===name).filter(record=>{
  const leaf=record.importPath.replace("@maataa/ui/","src/")+".tsx";
  if(path.resolve(leaf)===imports.get(name))return true;
  const text=fs.readFileSync(leaf,"utf8");
  const reexport=text.match(/export\s*\{[^}]*\}\s*from\s*["']([^"']+)/);
  return reexport&&resolve(reexport[1],leaf)===imports.get(name);
 });
 if(candidates.length!==1)throw new Error(`Ambiguous renderer binding ${kind}/${name}: ${candidates.length}`);
 bindings[kind]={name,componentId:candidates[0].id,path:candidates[0].importPath};
}
if(Object.keys(bindings).length!==9)throw new Error("Renderer vocabulary changed; audit new cases");
const relationships=[];
for(const tuple of tuples){
 relationships.push({subjectId:tuple.workspaceTypeId,relationship:"supports-page",objectId:tuple.pageTypeId,status:"declared",evidence:tuple.evidence});
 relationships.push({subjectId:tuple.pageTypeId,relationship:"supports-layout",objectId:tuple.layoutTypeId,status:"declared",evidence:tuple.evidence});
}
for(const layout of audit.entries)for(const region of layout.regions){
 const record=regions.find(item=>item.name===region.atom);
 if(!record)throw new Error(`Unknown source region ${region.atom}`);
 relationships.push({subjectId:layout.id,relationship:"supports-region",objectId:record.id,status:"declared",evidence:[{kind:"source",reference:"src/internal/layoutPreset.tsx"}]});
}
const outputs={
 "src/composer/regionBindings.generated.ts":`// Derived from audited LayoutPreset region props and REGION_REGISTRY.\nexport const LAYOUT_REGION_BINDINGS: Readonly<Record<string,string>> = ${JSON.stringify(Object.fromEntries(audit.entries[0].regions.map(region=>[regions.find(item=>item.name===region.atom).id,region.prop])),null,2)};\n`,
 "src/composer/componentBindings.generated.ts":`// Generated from ComposerRenderer imports and COMPONENT_REGISTRY.\nexport const COMPOSER_COMPONENT_BINDINGS = ${JSON.stringify(bindings,null,2)} as const;\n`,
 "src/registries/compositionRelationships.generated.ts":`// Derived source facts; registry IDs remain owned by their canonical catalogues.\nimport { LAYOUT_TYPES } from "./layoutRegistry";\nimport { COMPOSITION_COMPATIBILITY_REGISTRY } from "./compositionCompatibilityRegistry";\nexport type CompositionRelationshipStatus="verified"|"declared"|"recommended"|"unverified"|"denied"|"deprecated";\nexport interface CompositionRelationship {subjectId:string;relationship:"supports-page"|"supports-layout"|"supports-region"|"contains-component"|"composes-atom";objectId:string;status:CompositionRelationshipStatus;evidence:readonly {kind:string;reference:string}[];}\nconst sourceRegions = ${JSON.stringify(audit.entries[0].regions.map(region=>regions.find(item=>item.name===region.atom).id))} as const;\nexport const COMPOSITION_RELATIONSHIPS: readonly CompositionRelationship[] = [\n ...COMPOSITION_COMPATIBILITY_REGISTRY.flatMap(tuple=>[\n  {subjectId:tuple.workspaceTypeId,relationship:"supports-page" as const,objectId:tuple.pageTypeId,status:"declared" as const,evidence:tuple.evidence},\n  {subjectId:tuple.pageTypeId,relationship:"supports-layout" as const,objectId:tuple.layoutTypeId,status:"declared" as const,evidence:tuple.evidence},\n ]),\n ...LAYOUT_TYPES.flatMap(layout=>sourceRegions.map(regionId=>({subjectId:layout.id,relationship:"supports-region" as const,objectId:regionId,status:"declared" as const,evidence:[{kind:"source",reference:"src/internal/layoutPreset.tsx"}]}))),\n];\n`,
};
for(const[file,text]of Object.entries(outputs))if(process.argv.includes("--check")){if(fs.readFileSync(file,"utf8")!==text)throw new Error(`${file} stale`);}else fs.writeFileSync(file,text);
console.log(`Derived ${Object.keys(bindings).length} renderer bindings and ${relationships.length} declared relationships; absent edges remain unverified`);
