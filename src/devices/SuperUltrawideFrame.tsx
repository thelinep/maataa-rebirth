import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SuperUltrawideFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SuperUltrawideFrame({viewportWidth=1440, viewportHeight=900, ...props}:SuperUltrawideFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_DISPLAYS.SUPER_ULTRAWIDE" name="Super Ultrawide" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
