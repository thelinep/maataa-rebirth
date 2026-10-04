import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SelfServiceKioskFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SelfServiceKioskFrame({viewportWidth=1080, viewportHeight=1920, ...props}:SelfServiceKioskFrameProps) { return <DeviceSurface deviceId="DEVICE.KIOSK.SELF_SERVICE_KIOSK" name="Self-Service Kiosk" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
