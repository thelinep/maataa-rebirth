import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CheckInKioskFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CheckInKioskFrame({viewportWidth=1080, viewportHeight=1920, ...props}:CheckInKioskFrameProps) { return <DeviceSurface deviceId="DEVICE.KIOSK.CHECK_IN_KIOSK" name="Check-In Kiosk" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
