import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MedicalMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MedicalMonitorFrame({viewportWidth=1600, viewportHeight=900, ...props}:MedicalMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.MEDICAL.MEDICAL_MONITOR" name="Medical Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
