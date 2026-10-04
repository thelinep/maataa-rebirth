import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FieldMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FieldMonitorFrame({viewportWidth=800, viewportHeight=480, ...props}:FieldMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.CAMERAS.FIELD_MONITOR" name="Field Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
