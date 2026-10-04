import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SmartwatchFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SmartwatchFrame({viewportWidth=320, viewportHeight=320, ...props}:SmartwatchFrameProps) { return <DeviceSurface deviceId="DEVICE.WEARABLES.SMARTWATCH" name="Smartwatch" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
