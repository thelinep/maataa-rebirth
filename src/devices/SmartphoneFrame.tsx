import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SmartphoneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SmartphoneFrame({viewportWidth=390, viewportHeight=844, ...props}:SmartphoneFrameProps) { return <DeviceSurface deviceId="DEVICE.PHONES.SMARTPHONE" name="Smartphone" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
