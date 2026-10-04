import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type StandardTabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function StandardTabletFrame({viewportWidth=834, viewportHeight=1194, ...props}:StandardTabletFrameProps) { return <DeviceSurface deviceId="DEVICE.TABLETS.STANDARD_TABLET" name="Standard Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
