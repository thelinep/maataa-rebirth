import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type PDAFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function PDAFrame({viewportWidth=360, viewportHeight=640, ...props}:PDAFrameProps) { return <DeviceSurface deviceId="DEVICE.HANDHELD_ENTERPRISE.PDA" name="PDA" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
