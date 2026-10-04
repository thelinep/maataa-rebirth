import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type AdvertisingDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function AdvertisingDisplayFrame({viewportWidth=1080, viewportHeight=1920, ...props}:AdvertisingDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.SIGNAGE.ADVERTISING_DISPLAY" name="Advertising Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
