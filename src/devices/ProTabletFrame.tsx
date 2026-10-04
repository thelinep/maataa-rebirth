import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ProTabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ProTabletFrame({viewportWidth=834, viewportHeight=1194, ...props}:ProTabletFrameProps) { return <DeviceSurface deviceId="DEVICE.TABLETS.PRO_TABLET" name="Pro Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
