import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type AutomotiveHUDFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function AutomotiveHUDFrame({viewportWidth=1280, viewportHeight=480, ...props}:AutomotiveHUDFrameProps) { return <DeviceSurface deviceId="DEVICE.AUTOMOTIVE.AUTOMOTIVE_HUD" name="Automotive HUD" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
