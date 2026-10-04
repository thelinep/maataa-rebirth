import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type AirportDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function AirportDisplayFrame({viewportWidth=1080, viewportHeight=1920, ...props}:AirportDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.PUBLIC_INFRASTRUCTURE.AIRPORT_DISPLAY" name="Airport Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
