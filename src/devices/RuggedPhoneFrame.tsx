import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RuggedPhoneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RuggedPhoneFrame({viewportWidth=390, viewportHeight=844, ...props}:RuggedPhoneFrameProps) { return <DeviceSurface deviceId="DEVICE.PHONES.RUGGED_PHONE" name="Rugged Phone" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
