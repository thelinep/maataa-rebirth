import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DiagnosticConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DiagnosticConsoleFrame({viewportWidth=1600, viewportHeight=900, ...props}:DiagnosticConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.MEDICAL.DIAGNOSTIC_CONSOLE" name="Diagnostic Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
