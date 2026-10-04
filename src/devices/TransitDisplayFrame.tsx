import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TransitDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TransitDisplayFrame({viewportWidth=1080, viewportHeight=1920, ...props}:TransitDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.PUBLIC_INFRASTRUCTURE.TRANSIT_DISPLAY" name="Transit Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
