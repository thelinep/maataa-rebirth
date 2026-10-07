import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {spawnSync} from "node:child_process";
const run=(command,args,env={})=>spawnSync(command,args,{encoding:"utf8",maxBuffer:50_000_000,env:{...process.env,...env}});
const git=args=>{const result=run("git",args);if(result.status!==0)throw new Error(`Git inspection failed: ${args.join(" ")}`);return result.stdout.trim();};
const commit=git(["rev-parse","HEAD"]),dirty=git(["status","--porcelain"]);
if(dirty)throw new Error("Certification requires a clean committed source tree; commit reviewed changes first.");
const directory=path.resolve(".certification/release-evidence",commit,String(Date.now()));fs.mkdirSync(directory,{recursive:true});fs.mkdirSync(path.join(directory,"provenance"),{recursive:true});
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
const environment={commit,packageVersion:pkg.version,node:process.version,pnpm:run("pnpm",["--version"]).stdout.trim(),platform:process.platform,architecture:process.arch,startedAt:new Date().toISOString()};
const write=(file,data)=>fs.writeFileSync(path.join(directory,file),JSON.stringify({commit,...data},null,2)+"\n");
write("environment.json",environment);write("git.json",{branch:git(["branch","--show-current"]),cleanAtStart:true,remoteConfigured:!!git(["remote"]),frozenBaseline:git(["rev-parse","maataa-ui-alpha8.6^{}"])});
const steps=[
 ["lockfile","pnpm",["install","--frozen-lockfile","--ignore-scripts","--offline"]],
 ["typecheck","pnpm",["typecheck"]],
 ["tests",process.execPath,["node_modules/vitest/vitest.mjs","run","--reporter=json",`--outputFile=${path.join(directory,"tests.raw.json")}`]],
 ["api","pnpm",["api:manifest","--check"]],
 ["docs","pnpm",["docs:check"]],
 ["layout-contracts",process.execPath,["scripts/generate-layout-loaders.mjs","--check"]],
 ["composition-contracts",process.execPath,["scripts/generate-composition-contracts.mjs","--check"]],
 ["stories","pnpm",["stories:generate"]],
 ["storybook","pnpm",["storybook:build"]],
 ["package","pnpm",["build"]],
 ["demo","pnpm",["demo:build"]],
 ["browser",process.execPath,["node_modules/@playwright/test/cli.js","test","--reporter=list,json",`--output=${path.join(directory,"browser-artifacts")}`]],
 ["depth","pnpm",["validate:depth"]],
 ["devices","pnpm",["validate:devices"]],
 ["surface","pnpm",["validate:surface"]],
 ["ai-catalog","pnpm",["validate:ai"]],
 ["consumer","pnpm",["package:consumer"]],
 ["performance","pnpm",["performance:check"]],
 ["runtime-performance","pnpm",["performance:runtime"]],
 ["security","pnpm",["security:baseline"]],
];
const gates=Object.fromEntries(steps.map(([name])=>[name,{status:"NOT_RUN"}]));
const manual={enterprisePilots:"NOT_RUN",licenseApproval:"NOT_RUN",screenReaderReview:"NOT_RUN",realDeviceAcceptance:"NOT_RUN",runtimePerformanceTargets:"NOT_RUN",releaseOwnership:"BLOCKED",privateSecurityReporting:"BLOCKED",remoteTagProtection:git(["remote"])?"NOT_RUN":"BLOCKED",controlledPublisher:pkg.private?"BLOCKED":"NOT_RUN",apiSchemaFreeze:"NOT_RUN"};
let failed=false;
for(const [name,command,args] of steps){
 console.log(`Executing ${name}`);const start=new Date().toISOString();
 const result=run(command,args,{PLAYWRIGHT_JSON_OUTPUT_FILE:path.join(directory,"browser.raw.json")});
 fs.writeFileSync(path.join(directory,`${name}.log`),result.stdout+result.stderr);
 gates[name]={status:result.status===0?"PASS":"FAIL",command,args,startedAt:start,endedAt:new Date().toISOString(),exitCode:result.status,log:`${name}.log`};
 write("execution.json",{gates});if(result.status!==0){failed=true;console.error(`${name} failed; inspect ${path.join(directory,`${name}.log`)}`);break;}
}
function capture(file,input,gate){if(gates[gate]?.status!=="PASS"){write(file,{status:"NOT_RUN",reason:"Producing execution gate did not pass in this run"});return;}if(fs.existsSync(input))write(file,{status:file==="licenses.json"?"NOT_RUN":"PASS",artifactGenerated:true,executionGate:gate,evidence:JSON.parse(fs.readFileSync(input,"utf8"))});else throw new Error(`Missing execution artifact ${input}`);}
capture("tests.json",path.join(directory,"tests.raw.json"),"tests");capture("browser.json",path.join(directory,"browser.raw.json"),"browser");
if(gates.browser.status==="PASS"&&fs.existsSync(path.join(directory,"browser.raw.json"))){const browser=JSON.parse(fs.readFileSync(path.join(directory,"browser.raw.json"),"utf8"));const axe=[];function visit(suite){for(const spec of suite.specs??[])if(spec.title.startsWith("axe "))axe.push({title:spec.title,tests:spec.tests});for(const child of suite.suites??[])visit(child);}for(const suite of browser.suites??[])visit(suite);write("accessibility.json",{scope:"Automated axe and browser keyboard/focus tests; manual review separate",axe});}
capture("bundle.json",".certification/performance/topology.json","demo");capture("performance.json",".certification/performance/budgets.json","performance");capture("runtime-performance.json",".certification/performance/runtime.json","runtime-performance");capture("public-api.json","manifests/PUBLIC_API.json","api");capture("registries.json","docs/canonical-catalog.json","docs");capture("package-consumer.json",".certification/package-consumer.json","consumer");capture("security.json",".certification/security/security.json","security");capture("sbom.json",".certification/security/sbom.json","security");capture("licenses.json",".certification/security/licenses.json","security");
const sha=file=>crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const tarballs=gates.consumer.status==="PASS"&&fs.existsSync(".certification/package")?fs.readdirSync(".certification/package").filter(file=>file.endsWith(".tgz")).map(file=>({file,sha256:sha(path.join(".certification/package",file))})):[];
write("provenance/manifests.json",{hashes:Object.fromEntries(fs.readdirSync("manifests").filter(file=>file.endsWith("_MANIFEST.json")||file.startsWith("PUBLIC_API")&&file.endsWith(".json")).sort().map(file=>[file,sha(path.join("manifests",file))])),qualification:"Content hashes only; source freshness depends on the executed producing gates"});
write("provenance/artifacts.json",{tarballs,lockfileSha256:sha("pnpm-lock.yaml"),distribution:"Local tarballs; no hosted publisher attestation claimed"});
const unchanged=git(["rev-parse","HEAD"])===commit&&!git(["status","--porcelain"]);
gates.sourceIntegrity={status:unchanged?"PASS":"FAIL"};if(!unchanged)failed=true;
const report={commit,packageVersion:pkg.version,status:failed?"FAIL":"BLOCKED",automatedStatus:failed?"FAIL":"PASS",releaseCertified:false,finishedAt:new Date().toISOString(),gates,manual,reason:failed?"An execution gate failed or source drifted":"Automated gates passed; external and manual enterprise acceptance remains outstanding"};
write("release.json",report);
const categoryGates={Correctness:["typecheck","tests"],Composition:["composition-contracts","layout-contracts","tests"],Runtime:["package","demo","browser"],Device:["devices","browser"],Accessibility:["browser"],Browser:["browser"],Consumer:["consumer"],Security:["security"],Performance:["performance","runtime-performance"],API:["api"],Documentation:["docs","storybook"],Evidence:["sourceIntegrity"]};
const combine=states=>states.includes("FAIL")?"FAIL":states.includes("BLOCKED")?"BLOCKED":states.every(state=>state==="PASS")?"PASS":"NOT_RUN";
write("dashboard.json",{schemaVersion:"1",status:report.status,automatedStatus:report.automatedStatus,releaseCertified:false,scope:"Execution status for this exact source commit; automated category PASS does not imply external acceptance",categories:{...Object.fromEntries(Object.entries(categoryGates).map(([name,required])=>[name,{status:combine(required.map(gate=>gates[gate].status)),gates:required}])),Governance:{status:"BLOCKED",requirements:manual},Release:{status:report.status}},roadmap:{engineeringSteps:"01–31: implemented; qualification is limited to the executed gates and their documented scope",releaseSteps:"32–39: candidate promotion, pilots, freeze, RC and GA remain subject to external acceptance",outstanding:Object.entries(manual).map(([requirement,status])=>({requirement,status}))}});
function files(dir,prefix=""){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?files(path.join(dir,entry.name),prefix+entry.name+"/"):[prefix+entry.name]);}
fs.writeFileSync(path.join(directory,"checksums.sha256"),files(directory).filter(file=>file!=="checksums.sha256").sort().map(file=>`${sha(path.join(directory,file))}  ${file}`).join("\n")+"\n");
console.log(JSON.stringify({directory,status:report.status,automatedStatus:report.automatedStatus,manual},null,2));process.exitCode=failed?1:2;
