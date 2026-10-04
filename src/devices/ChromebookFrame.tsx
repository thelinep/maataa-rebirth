import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ChromebookFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ChromebookFrame({viewportWidth=1366, viewportHeight=768, ...props}:ChromebookFrameProps) { return <DeviceSurface deviceId="DEVICE.PORTABLE_COMPUTING.CHROMEBOOK" name="Chromebook" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
