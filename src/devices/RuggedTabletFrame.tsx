import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RuggedTabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RuggedTabletFrame({viewportWidth=834, viewportHeight=1194, ...props}:RuggedTabletFrameProps) { return <DeviceSurface deviceId="DEVICE.TABLETS.RUGGED_TABLET" name="Rugged Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
