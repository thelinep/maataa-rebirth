import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MobilePOSFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MobilePOSFrame({viewportWidth=1024, viewportHeight=768, ...props}:MobilePOSFrameProps) { return <DeviceSurface deviceId="DEVICE.POS.MOBILE_POS" name="Mobile POS" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
