import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ProjectorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ProjectorFrame({viewportWidth=1920, viewportHeight=1080, ...props}:ProjectorFrameProps) { return <DeviceSurface deviceId="DEVICE.LARGE_FORMAT.PROJECTOR" name="Projector" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
