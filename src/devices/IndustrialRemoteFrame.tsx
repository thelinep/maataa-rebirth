import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type IndustrialRemoteFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function IndustrialRemoteFrame({viewportWidth=480, viewportHeight=800, ...props}:IndustrialRemoteFrameProps) { return <DeviceSurface deviceId="DEVICE.REMOTE_CONTROLS.INDUSTRIAL_REMOTE" name="Industrial Remote" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
