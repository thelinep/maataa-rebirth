import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type WidescreenMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function WidescreenMonitorFrame({viewportWidth=1440, viewportHeight=900, ...props}:WidescreenMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_DISPLAYS.WIDESCREEN_MONITOR" name="Widescreen Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
