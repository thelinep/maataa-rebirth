import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type UltrabookFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function UltrabookFrame({viewportWidth=1366, viewportHeight=768, ...props}:UltrabookFrameProps) { return <DeviceSurface deviceId="DEVICE.PORTABLE_COMPUTING.ULTRABOOK" name="Ultrabook" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
