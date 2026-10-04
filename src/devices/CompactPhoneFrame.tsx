import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CompactPhoneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CompactPhoneFrame({viewportWidth=390, viewportHeight=844, ...props}:CompactPhoneFrameProps) { return <DeviceSurface deviceId="DEVICE.PHONES.COMPACT_PHONE" name="Compact Phone" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
