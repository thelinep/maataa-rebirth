import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SCADAConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SCADAConsoleFrame({viewportWidth=1280, viewportHeight=800, ...props}:SCADAConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.INDUSTRIAL.SCADA_CONSOLE" name="SCADA Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
