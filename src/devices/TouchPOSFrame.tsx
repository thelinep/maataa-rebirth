import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TouchPOSFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TouchPOSFrame({viewportWidth=1024, viewportHeight=768, ...props}:TouchPOSFrameProps) { return <DeviceSurface deviceId="DEVICE.POS.TOUCH_POS" name="Touch POS" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
