import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {spawnSync} from "node:child_process";
const out=path.resolve(".certification/security");fs.mkdirSync(out,{recursive:true});
const run=(cmd,args)=>spawnSync(cmd,args,{encoding:"utf8",maxBuffer:50_000_000,timeout:120_000});
const git=run("git",["rev-parse","HEAD"]);if(git.status!==0)throw new Error("Git provenance unavailable");
const provenance={commit:git.stdout.trim(),dirty:!!run("git",["status","--porcelain"]).stdout.trim(),generatedAt:new Date().toISOString(),node:process.version};
const packages=new Map();
function collectPackage(file){
 if(!fs.existsSync(file))throw new Error(`Resolved package metadata missing: ${file}`);
 const pkg=JSON.parse(fs.readFileSync(file,"utf8"));if(!pkg.name||!pkg.version)throw new Error("Resolved package has no identity");
 let license=typeof pkg.license==="string"?pkg.license:pkg.license?.type??"UNKNOWN";
 let licenseEvidence={kind:"package-metadata",file:path.relative(process.cwd(),file),sha256:crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex")};
 if(license==="UNKNOWN")for(const name of ["LICENSE","LICENSE.md","LICENSE.txt"]){const candidate=path.join(path.dirname(file),name);if(!fs.existsSync(candidate))continue;const text=fs.readFileSync(candidate,"utf8");if(text.trimStart().startsWith("The MIT License (MIT)")){license="MIT";licenseEvidence={kind:"declared-file-header",file:path.relative(process.cwd(),candidate),sha256:crypto.createHash("sha256").update(text).digest("hex")};break;}}
 const purl=`pkg:npm/${pkg.name.replace("@","%40")}@${pkg.version}`;
 if(path.resolve(file)!==path.resolve("package.json"))packages.set(`${pkg.name}@${pkg.version}`,{name:pkg.name,version:pkg.version,license,licenseEvidence,purl});return purl;
}
const graph=run("pnpm",["list","--depth","Infinity","--json"]);if(graph.status!==0)throw new Error("Resolved dependency graph unavailable");
const dependencyEdges=new Map(),uninstalledOptional=new Map(),visitedPaths=new Set();
function visit(node){if(!node.path)throw new Error("Resolved dependency path unavailable");const file=path.join(node.path,"package.json"),manifest=JSON.parse(fs.readFileSync(file,"utf8")),ref=collectPackage(file),children=[];
 if(visitedPaths.has(node.path))return ref;visitedPaths.add(node.path);
 for(const key of ["dependencies","devDependencies","optionalDependencies"])for(const [name,child] of Object.entries(node[key]??{})){
  if((key==="optionalDependencies"||Object.hasOwn(manifest.optionalDependencies??{},name)||manifest.peerDependenciesMeta?.[name]?.optional)&&!fs.existsSync(path.join(child.path,"package.json"))){uninstalledOptional.set(`${name}@${child.version}`,{name,version:child.version,status:"NOT_APPLICABLE",reason:"Optional package not installed on this platform"});continue;}
  children.push(visit(child));
 }
 const existing=dependencyEdges.get(ref)??new Set();for(const child of children)existing.add(child);dependencyEdges.set(ref,existing);return ref;
}
const roots=JSON.parse(graph.stdout);if(!Array.isArray(roots)||roots.length!==1||path.resolve(roots[0].path)!==process.cwd())throw new Error("Dependency graph does not identify this source root");
for(const root of roots)visit(root);if(!packages.size)throw new Error("Empty resolved dependency inventory");
const inventory=[...packages.values()].sort((a,b)=>a.purl.localeCompare(b.purl));
const audit=run("pnpm",["audit","--json"]);let auditData;try{auditData=JSON.parse(audit.stdout);}catch{auditData={error:"Audit service did not return JSON",exitCode:audit.status};}
fs.writeFileSync(path.join(out,"dependency-audit.json"),JSON.stringify(auditData,null,2)+"\n");
const secrets=[];const files=run("git",["ls-files","-z"]).stdout.split("\0").filter(Boolean);
const patterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\b(?:ghp|github_pat)_[A-Za-z0-9_]{30,}\b/,/\bAKIA[0-9A-Z]{16}\b/,/\bsk-proj-[A-Za-z0-9_-]{40,}\b/];
for(const file of files){if(!fs.existsSync(file)||!fs.statSync(file).isFile()||fs.statSync(file).size>2_000_000)continue;const data=fs.readFileSync(file,"utf8");if(patterns.some(pattern=>pattern.test(data)))secrets.push({file,reason:"High-confidence credential pattern; values withheld"});}
const sha=file=>crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const tag=run("git",["rev-parse","maataa-ui-alpha8.6^{}"]);
const auditCounts=auditData.metadata?.vulnerabilities;const auditPassed=audit.status===0&&auditCounts&&["info","low","moderate","high","critical"].every(key=>auditCounts[key]===0)&&Object.values(auditCounts).every(count=>Number.isFinite(count)&&count===0);
const report={...provenance,releaseCertified:false,gates:{dependencyAudit:auditPassed?"PASS":"FAIL",secretScan:secrets.length?"FAIL":"PASS",licenseReview:"NOT_RUN",sbom:"PASS",frozenTag:tag.stdout.trim()==="7e75dd421a5f1df83ceb9dc2cc65bce12561719b"?"PASS":"FAIL",remoteTagProtection:"NOT_RUN",publisherOwnership:"NOT_RUN"},packages:inventory.length,uninstalledOptional:[...uninstalledOptional.values()],secretFindings:secrets,lockfileSha256:sha("pnpm-lock.yaml"),scope:"Resolved installed dependency graph and tracked text files up to 2 MB; no live credentials or repository-host settings audited"};
fs.writeFileSync(path.join(out,"security.json"),JSON.stringify(report,null,2)+"\n");
fs.writeFileSync(path.join(out,"licenses.json"),JSON.stringify({reviewStatus:"NOT_RUN",packages:inventory},null,2)+"\n");
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
fs.writeFileSync(path.join(out,"sbom.json"),JSON.stringify({bomFormat:"CycloneDX",specVersion:"1.5",version:1,metadata:{timestamp:provenance.generatedAt,component:{type:"library",name:pkg.name,version:pkg.version,"bom-ref":`pkg:npm/${pkg.name.replace("@","%40")}@${pkg.version}`},properties:[{name:"maataa:commit",value:provenance.commit},{name:"maataa:dirty",value:String(provenance.dirty)}]},dependencies:[...dependencyEdges].map(([ref,children])=>({ref,dependsOn:[...children].sort()})),components:inventory.map(item=>({type:"library",name:item.name,version:item.version,purl:item.purl,"bom-ref":item.purl,licenses:[{license:{name:item.license}}],properties:[{name:"maataa:licenseSource",value:item.licenseEvidence.file},{name:"maataa:licenseSourceSha256",value:item.licenseEvidence.sha256}]}))},null,2)+"\n");
fs.writeFileSync(path.join(out,"checksums.sha256"),fs.readdirSync(out).filter(file=>file.endsWith(".json")).sort().map(file=>`${sha(path.join(out,file))}  ${file}`).join("\n")+"\n");
console.log(JSON.stringify(report,null,2));if(Object.values(report.gates).includes("FAIL"))process.exitCode=1;
