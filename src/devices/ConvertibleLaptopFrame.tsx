import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ConvertibleLaptopFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ConvertibleLaptopFrame({viewportWidth=1366, viewportHeight=768, ...props}:ConvertibleLaptopFrameProps) { return <DeviceSurface deviceId="DEVICE.PORTABLE_COMPUTING.CONVERTIBLE_LAPTOP" name="Convertible Laptop" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
