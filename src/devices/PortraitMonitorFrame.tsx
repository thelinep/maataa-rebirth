import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type PortraitMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function PortraitMonitorFrame({viewportWidth=1440, viewportHeight=900, ...props}:PortraitMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_DISPLAYS.PORTRAIT_MONITOR" name="Portrait Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
