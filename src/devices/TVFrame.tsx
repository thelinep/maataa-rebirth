import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TVFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TVFrame({viewportWidth=1920, viewportHeight=1080, ...props}:TVFrameProps) { return <DeviceSurface deviceId="DEVICE.TELEVISION.TV" name="TV" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
