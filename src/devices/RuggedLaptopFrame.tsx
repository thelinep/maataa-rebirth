import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RuggedLaptopFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RuggedLaptopFrame({viewportWidth=1366, viewportHeight=768, ...props}:RuggedLaptopFrameProps) { return <DeviceSurface deviceId="DEVICE.PORTABLE_COMPUTING.RUGGED_LAPTOP" name="Rugged Laptop" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
