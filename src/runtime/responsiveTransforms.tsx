import * as React from "react";
import { Button } from "../actions";
import { Drawer } from "../surfaces";
import { RESPONSIVE_TRANSFORMATION_REGISTRY } from "../registries/responsiveTransformationRegistry";
import type { LayoutPresetProps } from "../internal/layoutPreset";
function ResponsiveRegionOverlay({name,side,children,transformation}:{name:string;side:"left"|"bottom";children:React.ReactNode;transformation:string}) {
  const [open,setOpen]=React.useState(false);
  return <div data-transformation={transformation}><Button variant="secondary" onClick={()=>setOpen(true)}>{name}</Button>
    <Drawer open={open} onClose={()=>setOpen(false)} side={side} title={name}>{children}</Drawer>
  </div>;
}
export function applicableResponsiveTransformations(width:number,inputModalities:readonly string[]=[]) {
  return RESPONSIVE_TRANSFORMATION_REGISTRY.filter(record=>{
    switch(record.condition){
      case "mobile":return width<640;
      case "compact-mobile":return width<390;
      case "tablet":return width>=640&&width<900;
      case "tablet-and-below":return width<900;
      case "touch-only":return inputModalities.includes("INPUT.TOUCH")&&!inputModalities.includes("INPUT.MOUSE");
      default:return false;
    }
  });
}
export function transformCompositionRegions(props:LayoutPresetProps,width:number,inputs:readonly string[]=[]) {
  const result={...props};
  const applied:string[]=[];
  const unverified:string[]=[];
  for(const rule of applicableResponsiveTransformations(width,inputs)){
    if(!rule.operation){unverified.push(rule.id);continue;}
    if(rule.operation==="sidebar-drawer"&&result.sidebar!==undefined){
      result.toolbar=<>{result.toolbar}<ResponsiveRegionOverlay name="Navigation" side="left" transformation={rule.id}>{result.sidebar}</ResponsiveRegionOverlay></>;
      result.sidebar=undefined;applied.push(rule.id);
    } else if(rule.operation==="inspector-sheet"&&result.inspector!==undefined){
      result.footer=<>{result.footer}<ResponsiveRegionOverlay name="Inspector" side="bottom" transformation={rule.id}>{result.inspector}</ResponsiveRegionOverlay></>;
      result.inspector=undefined;applied.push(rule.id);
    } else if(rule.operation==="navigation-bottom"&&result.nav!==undefined){result.bottomNav=result.nav;result.nav=undefined;applied.push(rule.id);}
    else if(rule.operation==="grid-stack")applied.push(rule.id);
  }
  return {props:result,applied,unverified,stack:applied.includes("RESPONSIVE.GRID_TO_STACK")};
}
