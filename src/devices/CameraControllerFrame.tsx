import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CameraControllerFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CameraControllerFrame({viewportWidth=480, viewportHeight=800, ...props}:CameraControllerFrameProps) { return <DeviceSurface deviceId="DEVICE.REMOTE_CONTROLS.CAMERA_CONTROLLER" name="Camera Controller" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
