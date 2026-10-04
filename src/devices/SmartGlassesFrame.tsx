import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SmartGlassesFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SmartGlassesFrame({viewportWidth=1280, viewportHeight=720, ...props}:SmartGlassesFrameProps) { return <DeviceSurface deviceId="DEVICE.SMART_GLASSES.SMART_GLASSES" name="Smart Glasses" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
