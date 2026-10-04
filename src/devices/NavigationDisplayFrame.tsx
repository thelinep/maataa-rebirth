import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type NavigationDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function NavigationDisplayFrame({viewportWidth=1024, viewportHeight=600, ...props}:NavigationDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.MOBILITY.NAVIGATION_DISPLAY" name="Navigation Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
