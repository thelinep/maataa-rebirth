import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MultiMonitorWallFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MultiMonitorWallFrame({viewportWidth=3840, viewportHeight=1080, ...props}:MultiMonitorWallFrameProps) { return <DeviceSurface deviceId="DEVICE.MULTI_DISPLAY.MULTI_MONITOR_WALL" name="Multi-Monitor Wall" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
