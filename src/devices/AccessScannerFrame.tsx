import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type AccessScannerFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function AccessScannerFrame({viewportWidth=1440, viewportHeight=900, ...props}:AccessScannerFrameProps) { return <DeviceSurface deviceId="DEVICE.SPATIAL_EVENT_OPS.ACCESS_SCANNER" name="Access Scanner" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
