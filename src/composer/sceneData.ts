import type { ComposerScene,ComposerValidationIssue } from "./types";
import { COMPOSER_COMPONENT_BINDINGS } from "./componentBindings.generated";
export const COMPOSITION_LIMITS={maxBlocks:1000,maxDepth:20,maxNodes:20_000,maxStringLength:100_000} as const;
/** Inspect descriptors before reading values. Never invoke input accessors. */
export function isCompositionData(value:unknown):boolean {
 const seen=new Set<object>();let nodes=0;
 function visit(item:unknown,depth:number):boolean{
  if(++nodes>COMPOSITION_LIMITS.maxNodes||depth>COMPOSITION_LIMITS.maxDepth)return false;
  if(item===null||typeof item==="boolean")return true;
  if(typeof item==="string")return item.length<=COMPOSITION_LIMITS.maxStringLength;
  if(typeof item==="number")return Number.isFinite(item);
  if(typeof item!=="object"||!item||seen.has(item))return false;
  const prototype=Object.getPrototypeOf(item);if(prototype!==Object.prototype&&prototype!==Array.prototype&&prototype!==null)return false;
  seen.add(item);
  for(const key of Reflect.ownKeys(item)){
   if(typeof key!=="string"||["__proto__","constructor","prototype"].includes(key))return false;
   const descriptor=Object.getOwnPropertyDescriptor(item,key)!;
   if(!("value" in descriptor)||!visit(descriptor.value,depth+1))return false;
  }
  seen.delete(item);return true;
 }
 try{return visit(value,0);}catch{return false;}
}
export function inspectComposerScene(input:unknown):{validShape:boolean;issues:ComposerValidationIssue[]} {
 const fail=(message:string)=>({validShape:false,issues:[{code:"INVALID_SCENE_DATA",level:"error" as const,message}]});
 if(!isCompositionData(input)||!input||Array.isArray(input)||typeof input!=="object")return fail("Scene must be bounded JSON data without accessors, functions or unsafe keys.");
 const data=input as Record<string,unknown>;
 const rootKeys=new Set(["schemaVersion","regions","id","name","workspaceTypeId","pageTypeId","layoutTypeId","deviceId","theme","density","stateMode","blocks","updatedAt"]);
 if(Object.keys(data).some(key=>!rootKeys.has(key)))return fail("Unknown composition field; arbitrary code/planner fields are not part of the scene contract.");
 for(const key of ["id","name","workspaceTypeId","pageTypeId","layoutTypeId","deviceId","theme","density","stateMode","updatedAt"])
  if(typeof data[key]!=="string")return fail(`Scene ${key} must be a string.`);
 if(data.schemaVersion!==undefined&&data.schemaVersion!=="1")return fail("Unsupported composition schema version.");
 if(!["light","dark","system","high-contrast","oled"].includes(data.theme as string)||!["compact","default","comfortable"].includes(data.density as string)||!["default","loading","empty","error","disabled","offline","success"].includes(data.stateMode as string))return fail("Unknown theme, density or state mode.");
 if(!Array.isArray(data.blocks)||data.blocks.length>COMPOSITION_LIMITS.maxBlocks)return fail("Scene blocks must be an array within the composition limit.");
 for(const block of data.blocks){
  if(!block||Array.isArray(block)||typeof block!=="object"||typeof block.id!=="string"||typeof block.kind!=="string"||!Object.hasOwn(COMPOSER_COMPONENT_BINDINGS,block.kind)||!block.props||typeof block.props!=="object"||Array.isArray(block.props))return fail("Every block needs an ID, implemented kind and data props.");
  if((block.hidden!==undefined&&typeof block.hidden!=="boolean")||(block.locked!==undefined&&typeof block.locked!=="boolean"))return fail("Block hidden/locked flags must be booleans.");
 }
 if(data.regions!==undefined&&(!Array.isArray(data.regions)||data.regions.some(region=>!region||typeof region.regionId!=="string"||!Array.isArray(region.blockIds)||region.blockIds.some((id:unknown)=>typeof id!=="string"))))return fail("Region assignments need a canonical region ID and block IDs.");
 return {validShape:true,issues:[]};
}
export function isComposerScene(input:unknown):input is ComposerScene{return inspectComposerScene(input).validShape;}
