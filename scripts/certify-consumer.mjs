import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import assert from "node:assert/strict";

const root=process.cwd();
const cert=path.join(root,".certification");
const packDir=path.join(cert,"package");
const consumer=path.join(cert,"consumer-vite");
fs.rmSync(packDir,{recursive:true,force:true});
fs.rmSync(consumer,{recursive:true,force:true});
fs.mkdirSync(packDir,{recursive:true});

function run(cmd,args,cwd=root){
  const r=spawnSync(cmd,args,{cwd,stdio:"inherit",shell:process.platform==="win32"});
  if(r.status!==0) process.exit(r.status??1);
}

run("pnpm",["pack","--pack-destination",packDir]);
const tgz=fs.readdirSync(packDir).find(x=>x.endsWith(".tgz"));
if(!tgz) throw new Error("pnpm pack did not produce a tarball");
fs.cpSync(path.join(root,"fixtures/consumer-vite"),consumer,{recursive:true});
const relTar=path.relative(consumer,path.join(packDir,tgz));
const pkg={
  name:"maataa-ui-packed-consumer",private:true,type:"module",scripts:{build:"vite build",typecheck:"tsc --noEmit"},
  dependencies:{"@maataa/ui":`file:${relTar}`,react:"^19.0.0","react-dom":"^19.0.0","react-redux":"^9.2.0"},
  devDependencies:{"@vitejs/plugin-react":"^4.3.0","@types/react":"^19.0.0","@types/react-dom":"^19.0.0",typescript:"^5.8.0",vite:"^6.0.0"}
};
fs.writeFileSync(path.join(consumer,"package.json"),JSON.stringify(pkg,null,2)+"\n");
run("pnpm",["install","--prefer-offline","--ignore-scripts"],consumer);
run("node",["--input-type=module","-e",'import fs from "node:fs"; import { DEFAULT_COMPOSER_SCENE, generateComposerJsx } from "@maataa/ui/composer"; fs.writeFileSync("src/GeneratedScene.tsx",generateComposerJsx({...DEFAULT_COMPOSER_SCENE,name:"123 {attack}",blocks:DEFAULT_COMPOSER_SCENE.blocks.map(block=>block.kind==="text"?{...block,props:{...block.props,text:"{alert(1)}"}}:block)}));'],consumer);
run("pnpm",["typecheck"],consumer);
run("pnpm",["build"],consumer);
run("node",["--input-type=module","-e",'await import("@maataa/ui"); await import("@maataa/ui/composer"); await import("@maataa/ui/runtime"); console.log("Packed plain Node SSR imports PASS");'],consumer);
const react18Consumer=path.join(cert,"consumer-react18");
fs.rmSync(react18Consumer,{recursive:true,force:true});fs.cpSync(path.join(root,"fixtures/consumer-vite"),react18Consumer,{recursive:true});
fs.writeFileSync(path.join(react18Consumer,"package.json"),JSON.stringify({...pkg,name:"maataa-packed-react18-consumer",dependencies:{...pkg.dependencies,react:"18.2.0","react-dom":"18.2.0"},devDependencies:{...pkg.devDependencies,"@types/react":"^18.0.0","@types/react-dom":"^18.0.0"}},null,2)+"\n");
run("pnpm",["install","--prefer-offline","--ignore-scripts"],react18Consumer);
fs.copyFileSync(path.join(consumer,"src/GeneratedScene.tsx"),path.join(react18Consumer,"src/GeneratedScene.tsx"));
run("pnpm",["typecheck"],react18Consumer);run("pnpm",["build"],react18Consumer);
run("node",["--input-type=module","-e",'await import("@maataa/ui"); await import("@maataa/ui/composer"); await import("@maataa/ui/runtime"); console.log("React 18 packed SSR imports PASS");'],react18Consumer);
run("pnpm",["dlx","node@20.0.0","--input-type=module","-e",'await import("@maataa/ui"); await import("@maataa/ui/composer"); await import("@maataa/ui/runtime"); console.log("Node minimum",process.version,"packed SSR imports PASS");'],react18Consumer);
const nextConsumer=path.join(cert,"consumer-next");
fs.rmSync(nextConsumer,{recursive:true,force:true});
fs.cpSync(path.join(root,"fixtures/consumer-next"),nextConsumer,{recursive:true});
fs.writeFileSync(path.join(nextConsumer,"package.json"),JSON.stringify({name:"maataa-packed-next-consumer",private:true,type:"module",scripts:{build:"next build --webpack",typecheck:"tsc --noEmit"},dependencies:{...pkg.dependencies,next:"16.3.8"},devDependencies:{typescript:pkg.devDependencies.typescript,"@types/react":pkg.devDependencies["@types/react"],"@types/react-dom":pkg.devDependencies["@types/react-dom"],"@types/node":"^22.0.0"}},null,2)+"\n");
run("pnpm",["install","--prefer-offline","--ignore-scripts"],nextConsumer);
fs.copyFileSync(path.join(consumer,"src/GeneratedScene.tsx"),path.join(nextConsumer,"app/GeneratedScene.tsx"));
run("pnpm",["build"],nextConsumer);
run("pnpm",["typecheck"],nextConsumer);
run("pnpm",["exec","playwright","test","--config","playwright.consumer.config.ts"]);
const exportedHome=path.join(nextConsumer,"out/index.html");
const exportedWorkflow=path.join(nextConsumer,"out/workflow.html");
assert.ok(fs.existsSync(exportedHome),"Next App Router home page was not exported");
assert.ok(fs.existsSync(exportedWorkflow),"Next App Router workflow page was not exported");
const homeHtml=fs.readFileSync(exportedHome,"utf8");
const workflowHtml=fs.readFileSync(exportedWorkflow,"utf8");
assert.match(homeHtml,/A shared React package for product-specific applications/);
assert.match(homeHtml,/Toggle MAATAA theme/);
assert.match(workflowHtml,/Shape an event plan before handoff/);
assert.match(workflowHtml,/Technology Innovation Summit/);
assert.match(workflowHtml,/PUBLIC BRIEF/);
const report={status:"PASS",tarball:tgz,fixtures:["vite-react19","vite-react18.2","next-app-router"],checks:["pack","install","typecheck","build","plain-node-ssr-import","react18-minimum-peer","node20-minimum-ssr-import","next-static-home-and-nevo-workflow-export","public-route-and-theme-control-render","playwright-theme-and-nevo-planning-journey"]};
fs.writeFileSync(path.join(cert,"package-consumer.json"),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));
