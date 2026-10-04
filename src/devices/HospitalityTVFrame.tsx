import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type HospitalityTVFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function HospitalityTVFrame({viewportWidth=1920, viewportHeight=1080, ...props}:HospitalityTVFrameProps) { return <DeviceSurface deviceId="DEVICE.TELEVISION.HOSPITALITY_TV" name="Hospitality TV" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
