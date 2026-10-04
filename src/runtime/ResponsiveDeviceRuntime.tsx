import * as React from "react";
export type PreviewPreset="mobile"|"tablet"|"desktop"|"foldable"|"tv"|"free";
const PRESETS:Record<Exclude<PreviewPreset,"free">,{width:number;height:number,label:string}>={mobile:{width:390,height:844,label:"Mobile"},tablet:{width:768,height:1024,label:"Tablet"},desktop:{width:1440,height:900,label:"Desktop"},foldable:{width:717,height:720,label:"Foldable"},tv:{width:1920,height:1080,label:"TV"}};
export interface ResponsiveDeviceRuntimeProps{preset?:PreviewPreset;width?:number;height?:number;orientation?:"portrait"|"landscape";showFrame?:boolean;children:React.ReactNode;}
export function ResponsiveDeviceRuntime({preset="desktop",width,height,orientation,showFrame=true,children}:ResponsiveDeviceRuntimeProps){
 const base=preset==="free"?{width:width??900,height:height??700,label:"Free"}:PRESETS[preset];
 const w=orientation==="portrait"?Math.min(base.width,base.height):orientation==="landscape"?Math.max(base.width,base.height):base.width;
 const h=orientation==="portrait"?Math.max(base.width,base.height):orientation==="landscape"?Math.min(base.width,base.height):base.height;
 const breakpoint=w<640?"compact":w<900?"narrow":w<1280?"medium":"wide";
 return <div className="m-responsive-runtime" data-preset={preset} data-breakpoint={breakpoint} data-frame={showFrame||undefined}><div className="m-responsive-runtime-label"><strong>{base.label}</strong><span>{w}×{h}</span><code>{breakpoint}</code></div><div className="m-responsive-runtime-screen" style={{"--m-preview-width":`${w}px`,"--m-preview-height":`${h}px`} as React.CSSProperties}>{children}</div></div>;
}
