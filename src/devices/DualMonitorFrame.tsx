import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DualMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DualMonitorFrame({viewportWidth=3840, viewportHeight=1080, ...props}:DualMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.MULTI_DISPLAY.DUAL_MONITOR" name="Dual Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
