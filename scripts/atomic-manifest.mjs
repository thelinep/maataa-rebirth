import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import url from "node:url";
const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const categories = ["foundation","typography","actions","forms","navigation","surfaces","feedback","data","visualization","maps","mobile","device-atoms","devices","device-groups","themes","atomic","layout-atoms","layouts","page-atoms","pages","workspace-atoms","workspaces","registry-atoms","registry-ui","registries","page-groups","workspace-groups","layout-groups","generator-atoms","generators","generator-groups","tool-atoms","tools","tool-groups","ai-space-atoms","ai-spaces","ai-space-groups","identity","icons","composer","runtime"];
const publicDirectImports=[];
for (const category of categories) {
  const dir=path.join(root,"src",category);
  const files=(await readdir(dir)).filter((f)=>/\.tsx$/.test(f)&&!f.startsWith("_")&&!f.startsWith("index.")).sort();
  for (const file of files) {
    const name=file.replace(/\.tsx$/,"");
    publicDirectImports.push({category,import:`@maataa/ui/${category}/${name}`,name});
  }
}
const pkg=JSON.parse(await readFile(path.join(root,"package.json"),"utf8"));
const manifest={architecture:"atomic-layout-page-workspace-registry-ai-generator-tool-space-aware",package:pkg.name,version:pkg.version,publicDirectImports};
const pretty=JSON.stringify(manifest,null,2)+"\n";
await writeFile(path.join(root,"PUBLIC_API.atomic.json"),pretty);
const hash=createHash("sha256").update(pretty).digest("hex");
await writeFile(path.join(root,"PUBLIC_API.atomic.sha256"),`${hash}  PUBLIC_API.atomic.json\n`);
console.log(`${publicDirectImports.length} direct imports · ${hash}`);
