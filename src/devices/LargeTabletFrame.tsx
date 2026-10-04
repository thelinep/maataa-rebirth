import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type LargeTabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function LargeTabletFrame({viewportWidth=834, viewportHeight=1194, ...props}:LargeTabletFrameProps) { return <DeviceSurface deviceId="DEVICE.TABLETS.LARGE_TABLET" name="Large Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
