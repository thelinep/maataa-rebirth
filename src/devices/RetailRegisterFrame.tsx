import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RetailRegisterFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RetailRegisterFrame({viewportWidth=1024, viewportHeight=768, ...props}:RetailRegisterFrameProps) { return <DeviceSurface deviceId="DEVICE.POS.RETAIL_REGISTER" name="Retail Register" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
