import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DeliveryHandheldFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DeliveryHandheldFrame({viewportWidth=360, viewportHeight=640, ...props}:DeliveryHandheldFrameProps) { return <DeviceSurface deviceId="DEVICE.HANDHELD_ENTERPRISE.DELIVERY_HANDHELD" name="Delivery Handheld" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
