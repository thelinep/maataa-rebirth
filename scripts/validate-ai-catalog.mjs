import { readFile, access } from "node:fs/promises";
import path from "node:path";
import url from "node:url";
const root=path.resolve(path.dirname(url.fileURLToPath(import.meta.url)),"..");
const m=JSON.parse(await readFile(path.join(root,"AI_CAPABILITY_MANIFEST.json"),"utf8"));
for (const [key,folder] of [["generators","generators"],["tools","tools"],["aiSpaces","ai-spaces"]]) {
 const items=m[key]; const ids=new Set(), comps=new Set();
 for(const item of items){ if(ids.has(item.id)) throw new Error(`Duplicate ${key} id: ${item.id}`); ids.add(item.id); if(comps.has(item.component)) throw new Error(`Duplicate ${key} component: ${item.component}`); comps.add(item.component); await access(path.join(root,"src",folder,`${item.component}.tsx`)); }
}
console.log(`AI catalog PASS · ${m.generators.length} generators · ${m.tools.length} tools · ${m.aiSpaces.length} spaces`);
