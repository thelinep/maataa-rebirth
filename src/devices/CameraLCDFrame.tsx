import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CameraLCDFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CameraLCDFrame({viewportWidth=800, viewportHeight=480, ...props}:CameraLCDFrameProps) { return <DeviceSurface deviceId="DEVICE.CAMERAS.CAMERA_LCD" name="Camera LCD" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
