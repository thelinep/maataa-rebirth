import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type PriceDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function PriceDisplayFrame({viewportWidth=1080, viewportHeight=720, ...props}:PriceDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.RETAIL.PRICE_DISPLAY" name="Price Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
