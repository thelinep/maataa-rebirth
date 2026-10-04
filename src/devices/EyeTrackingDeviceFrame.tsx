import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type EyeTrackingDeviceFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function EyeTrackingDeviceFrame({viewportWidth=1280, viewportHeight=800, ...props}:EyeTrackingDeviceFrameProps) { return <DeviceSurface deviceId="DEVICE.ACCESSIBILITY.EYE_TRACKING_DEVICE" name="Eye-Tracking Device" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
