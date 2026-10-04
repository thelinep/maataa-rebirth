import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type IndustrialGlassesFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function IndustrialGlassesFrame({viewportWidth=1280, viewportHeight=720, ...props}:IndustrialGlassesFrameProps) { return <DeviceSurface deviceId="DEVICE.SMART_GLASSES.INDUSTRIAL_GLASSES" name="Industrial Glasses" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
