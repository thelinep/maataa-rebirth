import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type HomeHubFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function HomeHubFrame({viewportWidth=1280, viewportHeight=800, ...props}:HomeHubFrameProps) { return <DeviceSurface deviceId="DEVICE.SMART_HOME.HOME_HUB" name="Home Hub" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
