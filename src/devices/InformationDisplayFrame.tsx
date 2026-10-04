import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type InformationDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function InformationDisplayFrame({viewportWidth=1080, viewportHeight=1920, ...props}:InformationDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.SIGNAGE.INFORMATION_DISPLAY" name="Information Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
