import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RailwayDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RailwayDisplayFrame({viewportWidth=1080, viewportHeight=1920, ...props}:RailwayDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.PUBLIC_INFRASTRUCTURE.RAILWAY_DISPLAY" name="Railway Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
