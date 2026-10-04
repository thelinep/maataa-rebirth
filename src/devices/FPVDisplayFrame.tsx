import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FPVDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FPVDisplayFrame({viewportWidth=1280, viewportHeight=720, ...props}:FPVDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.DRONES.FPV_DISPLAY" name="FPV Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
