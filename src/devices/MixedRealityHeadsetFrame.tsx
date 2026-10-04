import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MixedRealityHeadsetFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MixedRealityHeadsetFrame({viewportWidth=1920, viewportHeight=1080, ...props}:MixedRealityHeadsetFrameProps) { return <DeviceSurface deviceId="DEVICE.XR_SPATIAL.MIXED_REALITY_HEADSET" name="Mixed-Reality Headset" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
