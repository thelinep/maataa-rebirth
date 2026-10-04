import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TabletFrame({viewportWidth=834, viewportHeight=1194, ...props}:TabletFrameProps) { return <DeviceSurface deviceId="DEVICE.TABLETS.TABLET" name="Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
