import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root=process.cwd();
const config=ts.readConfigFile(path.join(root,"tsconfig.json"),ts.sys.readFile);
if(config.error)throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText,"\n"));
const parsed=ts.parseJsonConfigFileContent(config.config,ts.sys,root);
const program=ts.createProgram(parsed.fileNames,{...parsed.options,noEmit:true});
const diagnostics=ts.getPreEmitDiagnostics(program);
if(diagnostics.length)throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics,{getCurrentDirectory:()=>root,getCanonicalFileName:x=>x,getNewLine:()=>"\n"}));
const checker=program.getTypeChecker();
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
// Exports frozen by the recorded API decision (gate 7) are STABLE; see manifests/STABLE_API.json.
const stableKeys=new Set(JSON.parse(fs.readFileSync(path.join(root,"manifests/STABLE_API.json"),"utf8")).exports.map(e=>`${e.subpath} ${e.name}`));
const exportsList=[];
const entryPoints=[];
for(const [subpath,target] of Object.entries(pkg.exports)){
 if(typeof target==="string"){entryPoints.push({subpath,kind:"css",stability:"EXPERIMENTAL"});continue;}
 const sourceStem=target.types.replace(/^\.\/dist\//,"src/").replace(/\.d\.ts$/,"");
 const files=subpath.includes("*")?program.getSourceFiles().filter(file=>{
  const relative=path.relative(root,file.fileName).split(path.sep).join("/");
  const [prefix,suffix]=sourceStem.split("*");return relative.startsWith(prefix)&&relative.replace(/\.tsx?$/,"").endsWith(suffix??"")&&!relative.endsWith(".d.ts");
 }):[program.getSourceFile(path.join(root,sourceStem+".ts"))??program.getSourceFile(path.join(root,sourceStem+".tsx"))];
 if(!files.length||files.some(file=>!file))throw new Error(`Unresolved public entry ${subpath}`);
 for(const file of files){
  const relative=path.relative(root,file.fileName).split(path.sep).join("/");
  const concrete=subpath.includes("*")?subpath.replace("*",relative.replace(/\.tsx?$/,"").slice(sourceStem.split("*")[0].length)):subpath;
  const moduleSymbol=checker.getSymbolAtLocation(file);if(!moduleSymbol)throw new Error(`Missing module symbol ${relative}`);
  entryPoints.push({subpath:concrete,source:relative,kind:"module",stability:"EXPERIMENTAL"});
  for(const symbol of checker.getExportsOfModule(moduleSymbol)){
   const resolved=symbol.flags&ts.SymbolFlags.Alias?checker.getAliasedSymbol(symbol):symbol;
   const declarations=resolved.getDeclarations()??[];
   const typeOnly=(symbol.getDeclarations()??[]).some(declaration=>ts.isExportSpecifier(declaration)&&(declaration.isTypeOnly||declaration.parent.parent.isTypeOnly));
   const deprecated=resolved.getJsDocTags().some(tag=>tag.name==="deprecated");
   exportsList.push({name:symbol.name,subpath:concrete,kind:!typeOnly&&(resolved.flags&ts.SymbolFlags.Value)?"runtime":"type",stability:deprecated?"DEPRECATED":stableKeys.has(`${concrete} ${symbol.name}`)?"STABLE":"EXPERIMENTAL",sources:[...new Set(declarations.map(declaration=>path.relative(root,declaration.getSourceFile().fileName).split(path.sep).join("/")))].sort()});
  }
 }
}
exportsList.sort((a,b)=>a.subpath.localeCompare(b.subpath)||a.name.localeCompare(b.name));
entryPoints.sort((a,b)=>a.subpath.localeCompare(b.subpath));
const manifest={schemaVersion:"2.0.0",package:pkg.name,version:pkg.version,generatedFrom:"TypeScript resolved symbols and package export map",classificationPolicy:"Exports listed in manifests/STABLE_API.json are STABLE by the recorded gate-7 decision (2026-10-12); JSDoc-deprecated exports are DEPRECATED; all other public exports remain EXPERIMENTAL; non-exported implementation modules are INTERNAL.",entryPoints,exports:exportsList};
const pretty=JSON.stringify(manifest,null,2)+"\n";
const output=path.join(root,"manifests");fs.mkdirSync(output,{recursive:true});
const hash=createHash("sha256").update(pretty).digest("hex");
if(process.argv.includes("--check")){
 if(fs.readFileSync(path.join(output,"PUBLIC_API.json"),"utf8")!==pretty||fs.readFileSync(path.join(output,"PUBLIC_API.sha256"),"utf8")!==`${hash}  PUBLIC_API.json\n`)throw new Error("Public API snapshot stale; regenerate and review the API change.");
}else{fs.writeFileSync(path.join(output,"PUBLIC_API.json"),pretty);fs.writeFileSync(path.join(output,"PUBLIC_API.sha256"),`${hash}  PUBLIC_API.json\n`);}
console.log(`${exportsList.length} resolved public symbols across ${entryPoints.length} entry points · ${hash}`);
