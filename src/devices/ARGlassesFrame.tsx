import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ARGlassesFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ARGlassesFrame({viewportWidth=1280, viewportHeight=720, ...props}:ARGlassesFrameProps) { return <DeviceSurface deviceId="DEVICE.SMART_GLASSES.AR_GLASSES" name="AR Glasses" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
