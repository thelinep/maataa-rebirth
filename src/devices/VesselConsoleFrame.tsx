import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type VesselConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function VesselConsoleFrame({viewportWidth=1280, viewportHeight=800, ...props}:VesselConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.MARINE.VESSEL_CONSOLE" name="Vessel Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
