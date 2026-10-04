import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FeaturePhoneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FeaturePhoneFrame({viewportWidth=390, viewportHeight=844, ...props}:FeaturePhoneFrameProps) { return <DeviceSurface deviceId="DEVICE.PHONES.FEATURE_PHONE" name="Feature Phone" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
