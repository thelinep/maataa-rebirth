import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SmartRingFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SmartRingFrame({viewportWidth=320, viewportHeight=320, ...props}:SmartRingFrameProps) { return <DeviceSurface deviceId="DEVICE.WEARABLES.SMART_RING" name="Smart Ring" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
