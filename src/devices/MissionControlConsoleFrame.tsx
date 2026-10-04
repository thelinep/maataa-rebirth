import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MissionControlConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MissionControlConsoleFrame({viewportWidth=1920, viewportHeight=1080, ...props}:MissionControlConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.CONTROL_SYSTEMS.MISSION_CONTROL_CONSOLE" name="Mission-Control Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
