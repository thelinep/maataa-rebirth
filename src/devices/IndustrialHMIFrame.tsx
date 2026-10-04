import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type IndustrialHMIFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function IndustrialHMIFrame({viewportWidth=1280, viewportHeight=800, ...props}:IndustrialHMIFrameProps) { return <DeviceSurface deviceId="DEVICE.INDUSTRIAL.INDUSTRIAL_HMI" name="Industrial HMI" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
