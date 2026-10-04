import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SatellitePhoneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SatellitePhoneFrame({viewportWidth=390, viewportHeight=844, ...props}:SatellitePhoneFrameProps) { return <DeviceSurface deviceId="DEVICE.PHONES.SATELLITE_PHONE" name="Satellite Phone" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
