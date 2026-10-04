import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type AutonomousSystemConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function AutonomousSystemConsoleFrame({viewportWidth=1280, viewportHeight=800, ...props}:AutonomousSystemConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.ROBOTICS.AUTONOMOUS_SYSTEM_CONSOLE" name="Autonomous-System Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
