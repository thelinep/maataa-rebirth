import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SpatialComputerFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SpatialComputerFrame({viewportWidth=1920, viewportHeight=1080, ...props}:SpatialComputerFrameProps) { return <DeviceSurface deviceId="DEVICE.XR_SPATIAL.SPATIAL_COMPUTER" name="Spatial Computer" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
