import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CloudGamingScreenFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CloudGamingScreenFrame({viewportWidth=1920, viewportHeight=1080, ...props}:CloudGamingScreenFrameProps) { return <DeviceSurface deviceId="DEVICE.GAMING.CLOUD_GAMING_SCREEN" name="Cloud Gaming Screen" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
