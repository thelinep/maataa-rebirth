import fs from "node:fs";
import crypto from "node:crypto";
const identitySource=fs.readFileSync("src/identity/identityRegistry.ts","utf8");
const iconSource=fs.readFileSync("src/icons/MaataaIcon.tsx","utf8");
const packageJson=JSON.parse(fs.readFileSync("package.json","utf8"));
const identities=[...identitySource.matchAll(/\{ id:"(IDENTITY\.[^"]+)", name:"([^"]+)", family:"([^"]+)", title:"([^"]+)", demoRole:"([^"]+)", motif:"([^"]+)"/g)].map((m)=>({id:m[1],name:m[2],family:m[3],title:m[4],demoRole:m[5],motif:m[6]}));
const iconArray=(iconSource.match(/MAATAA_ICON_NAMES = \[([\s\S]*?)\] as const/)||[])[1]||"";
const icons=[...iconArray.matchAll(/"([^"]+)"/g)].map((m,index)=>({id:`ICON.MAATAA.${m[1].replace(/-/g,"_").toUpperCase()}`,name:m[1],index:index+1}));
function write(name,obj){const raw=JSON.stringify(obj,null,2)+"\n";fs.mkdirSync("manifests",{recursive:true});fs.writeFileSync(`manifests/${name}`,raw);const hash=crypto.createHash("sha256").update(raw).digest("hex");fs.writeFileSync(`manifests/${name.replace(/\.json$/,".sha256")}`,`${hash}  ${name}\n`);return hash;}
const identityHash=write("IDENTITY_MANIFEST.json",{package:packageJson.name,version:packageJson.version,kind:"symbolic-demo-identities",count:identities.length,identities});
const iconHash=write("ICON_MANIFEST.json",{package:packageJson.name,version:packageJson.version,kind:"maataa-core-icons",count:icons.length,icons});
console.log(JSON.stringify({identities:identities.length,icons:icons.length,identityHash,iconHash}));
