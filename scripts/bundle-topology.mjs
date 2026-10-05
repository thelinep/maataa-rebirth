import fs from "node:fs";
import path from "node:path";
import {gzipSync} from "node:zlib";
export function bundleTopology(){return {name:"maataa-bundle-topology",generateBundle(_,bundle){
 const chunks=Object.values(bundle).filter(item=>item.type==="chunk");
 const initial=new Set();function visit(file){if(initial.has(file))return;initial.add(file);for(const dependency of bundle[file]?.imports??[])visit(dependency);}
 for(const chunk of chunks)if(chunk.isEntry)visit(chunk.fileName);
 const records=chunks.map(chunk=>({file:chunk.fileName,entry:chunk.isEntry,initial:initial.has(chunk.fileName),bytes:Buffer.byteLength(chunk.code),gzipBytes:gzipSync(chunk.code).length,imports:chunk.imports,dynamicImports:chunk.dynamicImports,modules:Object.entries(chunk.modules).map(([id,info])=>({id:path.relative(process.cwd(),id).replaceAll("\\","/"),renderedLength:info.renderedLength,originalLength:info.originalLength,importers:this.getModuleInfo(id)?.importers.map(importer=>path.relative(process.cwd(),importer).replaceAll("\\","/"))??[]})).sort((a,b)=>b.renderedLength-a.renderedLength)})).sort((a,b)=>b.bytes-a.bytes);
 const directory=".certification/performance";fs.mkdirSync(directory,{recursive:true});
 fs.writeFileSync(`${directory}/topology.json`,JSON.stringify({schemaVersion:1,generatedAt:new Date().toISOString(),initialJsBytes:records.filter(chunk=>chunk.initial).reduce((total,chunk)=>total+chunk.bytes,0),initialGzipBytes:records.filter(chunk=>chunk.initial).reduce((total,chunk)=>total+chunk.gzipBytes,0),chunks:records},null,2)+"\n");
 }};}
