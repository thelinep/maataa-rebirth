import type { ComposerBlock,ComposerScene } from "./types";
import { LAYOUT_REGION_BINDINGS } from "./regionBindings.generated";
import { LAYOUT_RUNTIME_CONTRACTS } from "../registries/layoutExecutionMetadata.generated";
/** Shared executable placement plan for renderer and code generator. */
export function planSceneRegions(scene:ComposerScene) {
 const contract=LAYOUT_RUNTIME_CONTRACTS[scene.layoutTypeId];const primary=contract?.primarySlot??"main";
 const assignments=new Map<string,ComposerBlock[]>();const unverified:string[]=[];
 if(!scene.regions){assignments.set(primary,scene.blocks);return {assignments,unverified};}
 for(const region of scene.regions){
  let slot=LAYOUT_REGION_BINDINGS[region.regionId];
  const area=slot==="statusBar"?"statusbar":slot==="bottomNav"?"bottomnav":slot==="secondarySidebar"?"secondary":slot;
  if(!slot||(contract?.gridRegions.length&&!contract.gridRegions.includes(area))){unverified.push(region.regionId);slot=primary;}
  assignments.set(slot,[...assignments.get(slot)??[],...scene.blocks.filter(block=>region.blockIds.includes(block.id))]);
 }
 return {assignments,unverified};
}
