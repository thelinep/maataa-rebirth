import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type AssistedRealityGlassesFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function AssistedRealityGlassesFrame({viewportWidth=1280, viewportHeight=720, ...props}:AssistedRealityGlassesFrameProps) { return <DeviceSurface deviceId="DEVICE.SMART_GLASSES.ASSISTED_REALITY_GLASSES" name="Assisted-Reality Glasses" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
