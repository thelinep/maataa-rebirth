import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type InformationKioskFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function InformationKioskFrame({viewportWidth=1080, viewportHeight=1920, ...props}:InformationKioskFrameProps) { return <DeviceSurface deviceId="DEVICE.KIOSK.INFORMATION_KIOSK" name="Information Kiosk" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
