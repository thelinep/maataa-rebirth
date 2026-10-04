import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type WasherDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function WasherDisplayFrame({viewportWidth=800, viewportHeight=480, ...props}:WasherDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.APPLIANCES.WASHER_DISPLAY" name="Washer Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
