import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SmartTVFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SmartTVFrame({viewportWidth=1920, viewportHeight=1080, ...props}:SmartTVFrameProps) { return <DeviceSurface deviceId="DEVICE.TELEVISION.SMART_TV" name="Smart TV" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
