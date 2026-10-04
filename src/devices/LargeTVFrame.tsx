import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type LargeTVFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function LargeTVFrame({viewportWidth=1920, viewportHeight=1080, ...props}:LargeTVFrameProps) { return <DeviceSurface deviceId="DEVICE.TELEVISION.LARGE_TV" name="Large TV" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
