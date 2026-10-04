import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type VRHeadsetFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function VRHeadsetFrame({viewportWidth=1920, viewportHeight=1080, ...props}:VRHeadsetFrameProps) { return <DeviceSurface deviceId="DEVICE.XR_SPATIAL.VR_HEADSET" name="VR Headset" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
