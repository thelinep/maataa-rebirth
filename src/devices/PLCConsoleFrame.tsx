import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type PLCConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function PLCConsoleFrame({viewportWidth=1280, viewportHeight=800, ...props}:PLCConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.INDUSTRIAL.PLC_CONSOLE" name="PLC Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
