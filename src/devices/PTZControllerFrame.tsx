import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type PTZControllerFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function PTZControllerFrame({viewportWidth=800, viewportHeight=480, ...props}:PTZControllerFrameProps) { return <DeviceSurface deviceId="DEVICE.CAMERAS.PTZ_CONTROLLER" name="PTZ Controller" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
