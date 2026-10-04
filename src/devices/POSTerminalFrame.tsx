import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type POSTerminalFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function POSTerminalFrame({viewportWidth=1024, viewportHeight=768, ...props}:POSTerminalFrameProps) { return <DeviceSurface deviceId="DEVICE.POS.POS_TERMINAL" name="POS Terminal" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
