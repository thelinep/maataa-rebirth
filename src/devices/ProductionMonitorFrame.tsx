import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ProductionMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ProductionMonitorFrame({viewportWidth=1920, viewportHeight=1080, ...props}:ProductionMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.PRODUCTION.PRODUCTION_MONITOR" name="Production Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
