import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TouchMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TouchMonitorFrame({viewportWidth=1440, viewportHeight=900, ...props}:TouchMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_DISPLAYS.TOUCH_MONITOR" name="Touch Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
