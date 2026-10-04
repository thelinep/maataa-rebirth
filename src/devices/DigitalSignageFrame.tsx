import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DigitalSignageFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DigitalSignageFrame({viewportWidth=1080, viewportHeight=1920, ...props}:DigitalSignageFrameProps) { return <DeviceSurface deviceId="DEVICE.SIGNAGE.DIGITAL_SIGNAGE" name="Digital Signage" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
