import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RobotTeachPendantFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RobotTeachPendantFrame({viewportWidth=1280, viewportHeight=800, ...props}:RobotTeachPendantFrameProps) { return <DeviceSurface deviceId="DEVICE.ROBOTICS.ROBOT_TEACH_PENDANT" name="Robot Teach Pendant" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
