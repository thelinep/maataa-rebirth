import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CommandWallFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CommandWallFrame({viewportWidth=1920, viewportHeight=1080, ...props}:CommandWallFrameProps) { return <DeviceSurface deviceId="DEVICE.WALLBOARD.COMMAND_WALL" name="Command Wall" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
