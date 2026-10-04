import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SmartDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SmartDisplayFrame({viewportWidth=1280, viewportHeight=800, ...props}:SmartDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.SMART_HOME.SMART_DISPLAY" name="Smart Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
