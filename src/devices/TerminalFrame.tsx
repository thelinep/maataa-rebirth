import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TerminalFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TerminalFrame({viewportWidth=1440, viewportHeight=900, ...props}:TerminalFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_COMPUTING.TERMINAL" name="Terminal" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
