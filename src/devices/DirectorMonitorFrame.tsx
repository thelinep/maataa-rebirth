import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DirectorMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DirectorMonitorFrame({viewportWidth=1920, viewportHeight=1080, ...props}:DirectorMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.PRODUCTION.DIRECTOR_MONITOR" name="Director Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
