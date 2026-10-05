import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {spawnSync} from "node:child_process";
const out=path.resolve(".certification/security");fs.mkdirSync(out,{recursive:true});
const run=(cmd,args)=>spawnSync(cmd,args,{encoding:"utf8"});
const git=run("git",["rev-parse","HEAD"]);if(git.status!==0)throw new Error("Git provenance unavailable");
const provenance={commit:git.stdout.trim(),dirty:!!run("git",["status","--porcelain"]).stdout.trim(),generatedAt:new Date().toISOString(),node:process.version};
const packages=new Map();
function collect(directory){if(!fs.existsSync(directory))return;for(const item of fs.readdirSync(directory,{withFileTypes:true})){
 if(item.name.startsWith("@")){collect(path.join(directory,item.name));continue;}
 const file=path.join(directory,item.name,"package.json");if(!fs.existsSync(file))continue;
 const pkg=JSON.parse(fs.readFileSync(file,"utf8"));if(!pkg.name||!pkg.version)continue;
 packages.set(`${pkg.name}@${pkg.version}`,{name:pkg.name,version:pkg.version,license:typeof pkg.license==="string"?pkg.license:pkg.license?.type??"UNKNOWN",purl:`pkg:npm/${pkg.name.replace("@","%40")}@${pkg.version}`});
}}
for(const item of fs.readdirSync("node_modules/.pnpm",{withFileTypes:true}))if(item.isDirectory())collect(path.join("node_modules/.pnpm",item.name,"node_modules"));
const inventory=[...packages.values()].sort((a,b)=>a.purl.localeCompare(b.purl));
const audit=run("pnpm",["audit","--json"]);let auditData;try{auditData=JSON.parse(audit.stdout);}catch{auditData={error:"Audit service did not return JSON",exitCode:audit.status};}
fs.writeFileSync(path.join(out,"dependency-audit.json"),JSON.stringify(auditData,null,2)+"\n");
const secrets=[];const files=run("git",["ls-files","-z"]).stdout.split("\0").filter(Boolean);
const patterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\b(?:ghp|github_pat)_[A-Za-z0-9_]{30,}\b/,/\bAKIA[0-9A-Z]{16}\b/,/\bsk-proj-[A-Za-z0-9_-]{40,}\b/];
for(const file of files){if(!fs.existsSync(file)||!fs.statSync(file).isFile()||fs.statSync(file).size>2_000_000)continue;const data=fs.readFileSync(file,"utf8");if(patterns.some(pattern=>pattern.test(data)))secrets.push({file,reason:"High-confidence credential pattern; values withheld"});}
const sha=file=>crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const tag=run("git",["rev-parse","maataa-ui-alpha8.6^{}"]);
const report={...provenance,releaseCertified:false,gates:{dependencyAudit:audit.status===0?"PASS":"FAIL",secretScan:secrets.length?"FAIL":"PASS",licenseReview:"NOT_RUN",sbom:"PASS",frozenTag:tag.stdout.trim()==="7e75dd421a5f1df83ceb9dc2cc65bce12561719b"?"PASS":"FAIL",remoteTagProtection:"NOT_RUN",publisherOwnership:"NOT_RUN"},packages:inventory.length,secretFindings:secrets,lockfileSha256:sha("pnpm-lock.yaml"),scope:"Installed dependency inventory and tracked text files up to 2 MB; no live credentials or repository-host settings audited"};
fs.writeFileSync(path.join(out,"security.json"),JSON.stringify(report,null,2)+"\n");
fs.writeFileSync(path.join(out,"licenses.json"),JSON.stringify({reviewStatus:"NOT_RUN",packages:inventory},null,2)+"\n");
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
fs.writeFileSync(path.join(out,"sbom.json"),JSON.stringify({bomFormat:"CycloneDX",specVersion:"1.5",version:1,metadata:{timestamp:provenance.generatedAt,component:{type:"library",name:pkg.name,version:pkg.version},properties:[{name:"maataa:commit",value:provenance.commit},{name:"maataa:dirty",value:String(provenance.dirty)}]},components:inventory.map(item=>({type:"library",name:item.name,version:item.version,purl:item.purl,licenses:[{license:{name:item.license}}]}))},null,2)+"\n");
fs.writeFileSync(path.join(out,"checksums.sha256"),fs.readdirSync(out).filter(file=>file.endsWith(".json")).sort().map(file=>`${sha(path.join(out,file))}  ${file}`).join("\n")+"\n");
console.log(JSON.stringify(report,null,2));if(Object.values(report.gates).includes("FAIL"))process.exitCode=1;
