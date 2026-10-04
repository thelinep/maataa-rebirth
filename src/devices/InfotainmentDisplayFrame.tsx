import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type InfotainmentDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function InfotainmentDisplayFrame({viewportWidth=1280, viewportHeight=480, ...props}:InfotainmentDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.AUTOMOTIVE.INFOTAINMENT_DISPLAY" name="Infotainment Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
