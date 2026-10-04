import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type LEDWallFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function LEDWallFrame({viewportWidth=1920, viewportHeight=1080, ...props}:LEDWallFrameProps) { return <DeviceSurface deviceId="DEVICE.LARGE_FORMAT.LED_WALL" name="LED Wall" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
