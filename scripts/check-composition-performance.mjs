import fs from "node:fs";
const topology=JSON.parse(fs.readFileSync(".certification/performance/topology.json","utf8"));
const policy=JSON.parse(fs.readFileSync("beta/composition-performance-budgets.json","utf8"));
const measured={initialJsBytes:topology.initialJsBytes,initialGzipBytes:topology.initialGzipBytes,composerJsBytes:topology.chunks.filter(chunk=>chunk.file.includes("maataa-composer")).reduce((sum,chunk)=>sum+chunk.bytes,0),largestAsyncJsBytes:Math.max(0,...topology.chunks.filter(chunk=>!chunk.initial).map(chunk=>chunk.bytes))};
const checks=Object.entries(policy.limits).map(([metric,limit])=>({metric,actual:measured[metric],limit,status:measured[metric]<=limit?"PASS":"FAIL"}));
const report={status:checks.every(check=>check.status==="PASS")?"PASS":"FAIL",checks,unexecuted:{routeJs:"NOT_RUN",registryParseCost:"NOT_RUN",timeToInteractive:"NOT_RUN",memory:"NOT_RUN"},qualification:"Bundle regression only; runtime performance qualification requires measured browser evidence."};
fs.writeFileSync(".certification/performance/budgets.json",JSON.stringify(report,null,2)+"\n");console.log(JSON.stringify(report,null,2));if(report.status!=="PASS")process.exitCode=1;
