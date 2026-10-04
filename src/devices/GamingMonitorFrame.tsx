import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type GamingMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function GamingMonitorFrame({viewportWidth=1920, viewportHeight=1080, ...props}:GamingMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.GAMING.GAMING_MONITOR" name="Gaming Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
