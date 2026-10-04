import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ControlRoomConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ControlRoomConsoleFrame({viewportWidth=1920, viewportHeight=1080, ...props}:ControlRoomConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.CONTROL_SYSTEMS.CONTROL_ROOM_CONSOLE" name="Control Room Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
