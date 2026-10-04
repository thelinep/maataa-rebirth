import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type HandheldConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function HandheldConsoleFrame({viewportWidth=1920, viewportHeight=1080, ...props}:HandheldConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.GAMING.HANDHELD_CONSOLE" name="Handheld Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
