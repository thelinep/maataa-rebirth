import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type BodyWornDeviceFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function BodyWornDeviceFrame({viewportWidth=320, viewportHeight=320, ...props}:BodyWornDeviceFrameProps) { return <DeviceSurface deviceId="DEVICE.WEARABLES.BODY_WORN_DEVICE" name="Body-Worn Device" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
