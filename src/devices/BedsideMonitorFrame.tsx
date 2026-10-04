import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type BedsideMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function BedsideMonitorFrame({viewportWidth=1600, viewportHeight=900, ...props}:BedsideMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.MEDICAL.BEDSIDE_MONITOR" name="Bedside Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
