import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RestaurantPOSFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RestaurantPOSFrame({viewportWidth=1024, viewportHeight=768, ...props}:RestaurantPOSFrameProps) { return <DeviceSurface deviceId="DEVICE.POS.RESTAURANT_POS" name="Restaurant POS" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
