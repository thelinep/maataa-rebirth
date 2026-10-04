import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root=process.cwd();
const cert=path.join(root,".certification");
const packDir=path.join(cert,"package");
const consumer=path.join(cert,"consumer-vite");
fs.rmSync(cert,{recursive:true,force:true});
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
run("pnpm",["typecheck"],consumer);
run("pnpm",["build"],consumer);
const report={status:"PASS",tarball:tgz,fixture:"vite-react",checks:["pack","install","typecheck","build"]};
fs.writeFileSync(path.join(root,"CONSUMER_CERTIFICATION.json"),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));
