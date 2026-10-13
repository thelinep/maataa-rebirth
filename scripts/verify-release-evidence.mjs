import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {spawnSync} from "node:child_process";
const directory=path.resolve(process.argv[2]??"MISSING_EVIDENCE_PATH");
const report=JSON.parse(fs.readFileSync(path.join(directory,"release.json"),"utf8"));
const errors=[];
for(const line of fs.readFileSync(path.join(directory,"checksums.sha256"),"utf8").trim().split("\n")){
 const match=line.match(/^([a-f0-9]{64}) {2}(.+)$/);if(!match){errors.push("Malformed checksum record");continue;}
 const file=path.resolve(directory,match[2]);if(!file.startsWith(directory+path.sep)){errors.push("Unsafe evidence path");continue;}
 if(!fs.existsSync(file)||crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex")!==match[1])errors.push(`Checksum mismatch: ${match[2]}`);
}
const head=spawnSync("git",["rev-parse","HEAD"],{encoding:"utf8"});const current=head.status===0&&head.stdout.trim()===report.commit;
const status=errors.length?"FAIL":!current?"STALE":report.status;
console.log(JSON.stringify({status,commit:report.commit,integrity:errors.length?"FAIL":"PASS",errors,releaseCertified:false},null,2));process.exitCode=errors.length?1:status==="PASS"?0:2;
