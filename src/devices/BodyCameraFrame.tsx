import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type BodyCameraFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function BodyCameraFrame({viewportWidth=320, viewportHeight=320, ...props}:BodyCameraFrameProps) { return <DeviceSurface deviceId="DEVICE.WEARABLES.BODY_CAMERA" name="Body Camera" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
