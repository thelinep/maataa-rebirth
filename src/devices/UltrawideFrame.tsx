import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type UltrawideFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function UltrawideFrame({viewportWidth=1440, viewportHeight=900, ...props}:UltrawideFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_DISPLAYS.ULTRAWIDE" name="Ultrawide" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
