import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type StandardMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function StandardMonitorFrame({viewportWidth=1440, viewportHeight=900, ...props}:StandardMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_DISPLAYS.STANDARD_MONITOR" name="Standard Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
