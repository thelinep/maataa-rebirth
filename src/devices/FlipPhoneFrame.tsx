import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FlipPhoneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FlipPhoneFrame({viewportWidth=360, viewportHeight=800, ...props}:FlipPhoneFrameProps) { return <DeviceSurface deviceId="DEVICE.FOLDABLES.FLIP_PHONE" name="Flip Phone" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
