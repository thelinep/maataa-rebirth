import fs from "node:fs";
import crypto from "node:crypto";
import {readCatalog} from "./read-canonical-catalog.mjs";
const inputs=[['components','src/registries/componentRegistry.ts','COMPONENT_REGISTRY'],['layouts','src/registries/layoutRegistry.ts','LAYOUT_TYPES'],['pages','src/registries/pageRegistry.ts','PAGE_TYPES'],['workspaces','src/registries/workspaceRegistry.ts','WORKSPACE_TYPES'],['devices','src/registries/deviceRegistry.ts','DEVICE_REGISTRY'],['regions','src/registries/regionRegistry.ts','REGION_REGISTRY']];
const registries=Object.fromEntries(inputs.map(([kind,file,name])=>[kind,{source:file,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),records:readCatalog(file,name)}]));
const document={schemaVersion:1,sourcePolicy:"Literal canonical source records; no inferred compatibility, props, accessibility approval or deprecation status.",unknownFields:["purpose where absent","supported parents and children without relationship evidence","per-component accessibility qualification","device compatibility without evidence","deprecation where undeclared"],registries};
const content=JSON.stringify(document,null,2)+'\n',file='docs/canonical-catalog.json';
if(process.argv.includes('--check')){if(fs.readFileSync(file,'utf8')!==content)throw new Error('Canonical documentation stale');}else fs.writeFileSync(file,content);
console.log(Object.fromEntries(Object.entries(registries).map(([kind,value])=>[kind,value.records.length])));
