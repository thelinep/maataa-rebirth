import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ConsoleDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ConsoleDisplayFrame({viewportWidth=1920, viewportHeight=1080, ...props}:ConsoleDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.GAMING.CONSOLE_DISPLAY" name="Console Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
