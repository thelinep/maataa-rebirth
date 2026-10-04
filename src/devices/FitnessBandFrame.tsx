import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FitnessBandFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FitnessBandFrame({viewportWidth=320, viewportHeight=320, ...props}:FitnessBandFrameProps) { return <DeviceSurface deviceId="DEVICE.WEARABLES.FITNESS_BAND" name="Fitness Band" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
