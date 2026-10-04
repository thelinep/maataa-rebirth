import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type LargePhoneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function LargePhoneFrame({viewportWidth=390, viewportHeight=844, ...props}:LargePhoneFrameProps) { return <DeviceSurface deviceId="DEVICE.PHONES.LARGE_PHONE" name="Large Phone" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
