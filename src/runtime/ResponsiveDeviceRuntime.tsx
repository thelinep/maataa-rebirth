import * as React from "react";
import { resolveDeviceRuntime } from "./deviceRuntime";
export type PreviewPreset="mobile"|"tablet"|"desktop"|"foldable"|"tv"|"free";
const PRESETS:Record<Exclude<PreviewPreset,"free">,string>={
  mobile:"DEVICE.PHONES.SMARTPHONE",tablet:"DEVICE.TABLETS.TABLET",desktop:"DEVICE.DESKTOP_COMPUTING.DESKTOP",
  foldable:"DEVICE.FOLDABLES.FOLDABLE_PHONE",tv:"DEVICE.TELEVISION.TV",
};
export interface DeviceContainerContextValue{deviceId?:string;width:number;height:number;capabilities:readonly string[];inputModalities:readonly string[];}
export const DeviceContainerContext=React.createContext<DeviceContainerContextValue|undefined>(undefined);
export interface ResponsiveDeviceRuntimeProps{deviceId?:string;preset?:PreviewPreset;width?:number;height?:number;orientation?:"portrait"|"landscape";showFrame?:boolean;children:React.ReactNode;}
export function ResponsiveDeviceRuntime({deviceId,preset="desktop",width,height,orientation,showFrame=true,children}:ResponsiveDeviceRuntimeProps){
 const identity=deviceId??(preset==="free"?undefined:PRESETS[preset]);
 const resolved=identity?resolveDeviceRuntime(identity,orientation):undefined;
 const screen=React.useRef<HTMLDivElement>(null);
 const targetWidth=width??resolved?.width??900;
 const targetHeight=height??resolved?.height??700;
 const [measured,setMeasured]=React.useState<number>();
 React.useEffect(()=>{
   const element=screen.current;
   if(!element||typeof ResizeObserver==="undefined")return;
   const observer=new ResizeObserver(entries=>{const value=entries[0]?.contentRect.width;if(value>0)setMeasured(value);});
   observer.observe(element);return()=>observer.disconnect();
 },[identity]);
 if(identity&&!resolved)return <div role="alert">Unknown canonical device or viewport: {identity}</div>;
 const w=measured??targetWidth;
 const breakpoint=w<640?"compact":w<900?"narrow":w<1280?"medium":"wide";
 const context={deviceId:identity,width:w,height:targetHeight,capabilities:resolved?.device.capabilities??[],inputModalities:resolved?.device.inputModalities??[]};
 return <div className="m-responsive-runtime" data-device-id={identity} data-preset={preset} data-breakpoint={breakpoint} data-frame={showFrame||undefined}>
   <div className="m-responsive-runtime-label"><strong>{resolved?.device.name??"Free"}</strong><span>{targetWidth}×{targetHeight}</span><code>{breakpoint}</code></div>
   <div ref={screen} className="m-responsive-runtime-screen" style={{"--m-preview-width":`${targetWidth}px`,"--m-preview-height":`${targetHeight}px`} as React.CSSProperties}>
     <DeviceContainerContext.Provider value={context}>{children}</DeviceContainerContext.Provider>
   </div>
 </div>;
}
