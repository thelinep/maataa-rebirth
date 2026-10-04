import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MiniTabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MiniTabletFrame({viewportWidth=834, viewportHeight=1194, ...props}:MiniTabletFrameProps) { return <DeviceSurface deviceId="DEVICE.TABLETS.MINI_TABLET" name="Mini Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
