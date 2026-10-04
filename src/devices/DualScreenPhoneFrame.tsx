import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DualScreenPhoneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DualScreenPhoneFrame({viewportWidth=360, viewportHeight=800, ...props}:DualScreenPhoneFrameProps) { return <DeviceSurface deviceId="DEVICE.FOLDABLES.DUAL_SCREEN_PHONE" name="Dual-Screen Phone" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
