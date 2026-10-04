import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type OperatorConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function OperatorConsoleFrame({viewportWidth=3840, viewportHeight=1080, ...props}:OperatorConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.MULTI_DISPLAY.OPERATOR_CONSOLE" name="Operator Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
