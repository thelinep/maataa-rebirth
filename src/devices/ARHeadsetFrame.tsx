import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ARHeadsetFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ARHeadsetFrame({viewportWidth=1920, viewportHeight=1080, ...props}:ARHeadsetFrameProps) { return <DeviceSurface deviceId="DEVICE.XR_SPATIAL.AR_HEADSET" name="AR Headset" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
