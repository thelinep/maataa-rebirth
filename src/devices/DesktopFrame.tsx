import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DesktopFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DesktopFrame({viewportWidth=1440, viewportHeight=900, ...props}:DesktopFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_COMPUTING.DESKTOP" name="Desktop" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
