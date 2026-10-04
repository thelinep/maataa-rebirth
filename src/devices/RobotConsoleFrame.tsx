import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RobotConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RobotConsoleFrame({viewportWidth=1280, viewportHeight=800, ...props}:RobotConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.ROBOTICS.ROBOT_CONSOLE" name="Robot Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
