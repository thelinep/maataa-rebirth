import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CustomerDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CustomerDisplayFrame({viewportWidth=1080, viewportHeight=720, ...props}:CustomerDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.RETAIL.CUSTOMER_DISPLAY" name="Customer Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
