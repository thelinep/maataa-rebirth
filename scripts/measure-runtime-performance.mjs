import fs from "node:fs";
import net from "node:net";
import {spawn,spawnSync} from "node:child_process";
import {chromium,firefox,webkit} from "@playwright/test";
const directory=".certification/performance";fs.mkdirSync(directory,{recursive:true});
const policy=JSON.parse(fs.readFileSync("beta/runtime-performance-budgets.json","utf8"));
const port=await new Promise((resolve,reject)=>{const socket=net.createServer();socket.once("error",reject);socket.listen(0,"127.0.0.1",()=>{const port=socket.address().port;socket.close(()=>resolve(port));});});
const server=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--config","examples/redux-demo/vite.config.mjs","--port",String(port)],{stdio:["ignore","pipe","pipe"]});let serverLog="";server.stdout.on("data",data=>serverLog+=data);server.stderr.on("data",data=>serverLog+=data);
const url=`http://127.0.0.1:${port}/#/playground`,samples=[],registries=[];
try{
 let ready=false;for(let attempt=0;attempt<100;attempt++){try{const response=await fetch(`http://127.0.0.1:${port}/`);if(response.ok){ready=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,100));}if(!ready)throw new Error("Performance preview did not start");
 for(const [engine,browserType] of Object.entries({chromium,firefox,webkit})){
  const browser=await browserType.launch();try{
   for(const width of [1440,390])for(let trial=1;trial<=3;trial++){
    const context=await browser.newContext({viewport:{width,height:844}});try{
     const page=await context.newPage(),errors=[];page.on("pageerror",error=>errors.push(error.message));
     await page.goto(url,{waitUntil:"domcontentloaded"});await page.locator('[data-maataa-demo-ready="true"]').waitFor({state:"visible",timeout:10_000});
     await page.getByRole("button",{name:"Open dialog",exact:true}).click();await page.getByRole("dialog",{name:"Keyboard dialog"}).waitFor({state:"visible"});
     const data=await page.evaluate(()=>({navigationToVerifiedInteractionMs:performance.now(),routeJavascriptBytes:performance.getEntriesByType("resource").filter(resource=>resource.name.split("?")[0].endsWith(".js")).reduce((total,resource)=>total+(resource.decodedBodySize??0),0)}));
     let heapBytes=null;if(engine==="chromium"){const session=await context.newCDPSession(page);await session.send("Performance.enable");const result=await session.send("Performance.getMetrics");heapBytes=result.metrics.find(metric=>metric.name==="JSHeapUsedSize")?.value??null;await session.detach();}
     samples.push({engine,width,trial,...data,heapBytes,memoryStatus:heapBytes===null?"NOT_RUN":"MEASURED",errors});
    }finally{await context.close();}
   }
  }finally{await browser.close();}
 }
 for(const name of ["componentRegistry","pageRegistry","workspaceRegistry","layoutRegistry","deviceRegistry"])for(let trial=1;trial<=3;trial++){
  const result=spawnSync(process.execPath,["--input-type=module","-e",`const start=performance.now();await import(${JSON.stringify(`./dist/registries/${name}.js`)});console.log(performance.now()-start);`],{encoding:"utf8"});if(result.status!==0)throw new Error(`Registry import benchmark failed: ${name}`);registries.push({name,trial,coldImportMs:Number(result.stdout.trim())});
 }
 const checks=[{metric:"navigationToVerifiedInteractionMs",actual:Math.max(...samples.map(sample=>sample.navigationToVerifiedInteractionMs))},{metric:"routeJavascriptBytes",actual:Math.max(...samples.map(sample=>sample.routeJavascriptBytes))},{metric:"chromiumHeapBytes",actual:Math.max(...samples.filter(sample=>sample.heapBytes!==null).map(sample=>sample.heapBytes))},{metric:"registryColdImportMs",actual:Math.max(...registries.map(sample=>sample.coldImportMs))}].map(check=>({...check,limit:policy.limits[check.metric],status:check.actual<=policy.limits[check.metric]?"PASS":"FAIL"}));
 if(samples.some(sample=>sample.errors.length))checks.push({metric:"pageErrors",status:"FAIL"});
 const report={status:checks.every(check=>check.status==="PASS")?"PASS":"FAIL",generatedAt:new Date().toISOString(),node:process.version,checks,samples,registries,scope:"Local loopback, fresh contexts, desktop/small viewport, three trials. Navigation-to-proven-interaction is not standards TTI. Registry cold import includes I/O, parse and evaluation. Heap measurement is Chromium-only; no other-engine memory claim.",standardTimeToInteractive:"NOT_RUN"};
 fs.writeFileSync(`${directory}/runtime.json`,JSON.stringify(report,null,2)+"\n");console.log(JSON.stringify({status:report.status,checks,samples:samples.length,registryTrials:registries.length},null,2));if(report.status!=="PASS")process.exitCode=1;
}finally{server.kill("SIGTERM");fs.writeFileSync(`${directory}/preview.log`,serverLog);}
