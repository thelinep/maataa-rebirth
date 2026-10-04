import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MarineNavigationDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MarineNavigationDisplayFrame({viewportWidth=1280, viewportHeight=800, ...props}:MarineNavigationDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.MARINE.MARINE_NAVIGATION_DISPLAY" name="Marine Navigation Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
