import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SonarDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SonarDisplayFrame({viewportWidth=1280, viewportHeight=800, ...props}:SonarDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.MARINE.SONAR_DISPLAY" name="Sonar Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
