import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RefrigeratorDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RefrigeratorDisplayFrame({viewportWidth=800, viewportHeight=480, ...props}:RefrigeratorDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.APPLIANCES.REFRIGERATOR_DISPLAY" name="Refrigerator Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
