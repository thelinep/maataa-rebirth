import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TripleMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TripleMonitorFrame({viewportWidth=3840, viewportHeight=1080, ...props}:TripleMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.MULTI_DISPLAY.TRIPLE_MONITOR" name="Triple Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
