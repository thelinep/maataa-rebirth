import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type LargeInteractiveDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function LargeInteractiveDisplayFrame({viewportWidth=1920, viewportHeight=1080, ...props}:LargeInteractiveDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.LARGE_FORMAT.LARGE_INTERACTIVE_DISPLAY" name="Large Interactive Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
