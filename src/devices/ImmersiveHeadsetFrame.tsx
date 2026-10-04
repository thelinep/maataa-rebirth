import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ImmersiveHeadsetFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ImmersiveHeadsetFrame({viewportWidth=1920, viewportHeight=1080, ...props}:ImmersiveHeadsetFrameProps) { return <DeviceSurface deviceId="DEVICE.XR_SPATIAL.IMMERSIVE_HEADSET" name="Immersive Headset" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
