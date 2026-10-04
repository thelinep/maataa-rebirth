import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DrawingTabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DrawingTabletFrame({viewportWidth=834, viewportHeight=1194, ...props}:DrawingTabletFrameProps) { return <DeviceSurface deviceId="DEVICE.TABLETS.DRAWING_TABLET" name="Drawing Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
