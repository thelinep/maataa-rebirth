import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CinemaCameraMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CinemaCameraMonitorFrame({viewportWidth=800, viewportHeight=480, ...props}:CinemaCameraMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.CAMERAS.CINEMA_CAMERA_MONITOR" name="Cinema Camera Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
