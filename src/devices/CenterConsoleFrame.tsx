import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CenterConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CenterConsoleFrame({viewportWidth=1280, viewportHeight=480, ...props}:CenterConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.AUTOMOTIVE.CENTER_CONSOLE" name="Center Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
