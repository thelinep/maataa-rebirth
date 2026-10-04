import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type WayfindingScreenFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function WayfindingScreenFrame({viewportWidth=1080, viewportHeight=1920, ...props}:WayfindingScreenFrameProps) { return <DeviceSurface deviceId="DEVICE.PUBLIC_INFRASTRUCTURE.WAYFINDING_SCREEN" name="Wayfinding Screen" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
