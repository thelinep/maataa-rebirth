import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type WorkstationFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function WorkstationFrame({viewportWidth=1440, viewportHeight=900, ...props}:WorkstationFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_COMPUTING.WORKSTATION" name="Workstation" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
