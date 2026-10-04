import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type OvenDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function OvenDisplayFrame({viewportWidth=800, viewportHeight=480, ...props}:OvenDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.APPLIANCES.OVEN_DISPLAY" name="Oven Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
