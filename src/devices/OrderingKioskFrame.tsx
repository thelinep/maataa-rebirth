import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type OrderingKioskFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function OrderingKioskFrame({viewportWidth=1080, viewportHeight=1920, ...props}:OrderingKioskFrameProps) { return <DeviceSurface deviceId="DEVICE.KIOSK.ORDERING_KIOSK" name="Ordering Kiosk" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
