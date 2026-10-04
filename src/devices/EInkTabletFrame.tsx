import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type EInkTabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function EInkTabletFrame({viewportWidth=834, viewportHeight=1194, ...props}:EInkTabletFrameProps) { return <DeviceSurface deviceId="DEVICE.TABLETS.E_INK_TABLET" name="E-Ink Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
