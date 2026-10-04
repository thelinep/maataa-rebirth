import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RegistrationKioskFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RegistrationKioskFrame({viewportWidth=768, viewportHeight=1024, ...props}:RegistrationKioskFrameProps) { return <DeviceSurface deviceId="DEVICE.EVENT.REGISTRATION_KIOSK" name="Registration Kiosk" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
