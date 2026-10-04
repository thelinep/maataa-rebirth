import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type InteractiveProductScreenFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function InteractiveProductScreenFrame({viewportWidth=1080, viewportHeight=720, ...props}:InteractiveProductScreenFrameProps) { return <DeviceSurface deviceId="DEVICE.RETAIL.INTERACTIVE_PRODUCT_SCREEN" name="Interactive Product Screen" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
