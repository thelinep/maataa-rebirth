import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DeveloperWorkstationFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DeveloperWorkstationFrame({viewportWidth=1440, viewportHeight=900, ...props}:DeveloperWorkstationFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_COMPUTING.DEVELOPER_WORKSTATION" name="Developer Workstation" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
