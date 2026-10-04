import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FieldTerminalFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FieldTerminalFrame({viewportWidth=360, viewportHeight=640, ...props}:FieldTerminalFrameProps) { return <DeviceSurface deviceId="DEVICE.HANDHELD_ENTERPRISE.FIELD_TERMINAL" name="Field Terminal" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
