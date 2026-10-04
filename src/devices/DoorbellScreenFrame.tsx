import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DoorbellScreenFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DoorbellScreenFrame({viewportWidth=1280, viewportHeight=800, ...props}:DoorbellScreenFrameProps) { return <DeviceSurface deviceId="DEVICE.SMART_HOME.DOORBELL_SCREEN" name="Doorbell Screen" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
