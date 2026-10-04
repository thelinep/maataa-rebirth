import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SmartRemoteFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SmartRemoteFrame({viewportWidth=480, viewportHeight=800, ...props}:SmartRemoteFrameProps) { return <DeviceSurface deviceId="DEVICE.REMOTE_CONTROLS.SMART_REMOTE" name="Smart Remote" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
