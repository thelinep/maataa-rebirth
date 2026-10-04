import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type LaptopFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function LaptopFrame({viewportWidth=1366, viewportHeight=768, ...props}:LaptopFrameProps) { return <DeviceSurface deviceId="DEVICE.PORTABLE_COMPUTING.LAPTOP" name="Laptop" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
