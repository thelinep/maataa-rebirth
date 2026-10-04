import React from "react";
import { cx } from "../utils";
import { DeviceFrame, DeviceBezel, DeviceScreen, DeviceSafeArea, DeviceLabel, DeviceContent } from "../device-atoms";
export type DeviceSurfaceProps = React.HTMLAttributes<HTMLDivElement> & { deviceId:string; name:string; viewportWidth?:number; viewportHeight?:number; orientation?:"portrait"|"landscape"; label?:React.ReactNode; };
export function DeviceSurface({deviceId,name,viewportWidth=390,viewportHeight=844,orientation,className,children,label,style,...props}:DeviceSurfaceProps){
 const resolved=orientation ?? (viewportWidth>=viewportHeight?"landscape":"portrait");
 return <DeviceFrame data-device-id={deviceId} data-device-name={name} data-device-orientation={resolved} className={cx("m-device-frame",className)} style={{...style,"--m-device-w":String(viewportWidth),"--m-device-h":String(viewportHeight)} as React.CSSProperties} {...props}>
   <DeviceBezel><DeviceScreen><DeviceSafeArea><DeviceContent>{children}</DeviceContent></DeviceSafeArea></DeviceScreen></DeviceBezel>
   <DeviceLabel>{label??name}</DeviceLabel>
 </DeviceFrame>;
}
