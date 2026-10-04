import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ThinClientFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ThinClientFrame({viewportWidth=1440, viewportHeight=900, ...props}:ThinClientFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_COMPUTING.THIN_CLIENT" name="Thin Client" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
