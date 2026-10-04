import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CabinDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CabinDisplayFrame({viewportWidth=1920, viewportHeight=720, ...props}:CabinDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.AVIATION.CABIN_DISPLAY" name="Cabin Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
