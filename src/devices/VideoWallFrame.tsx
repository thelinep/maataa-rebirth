import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type VideoWallFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function VideoWallFrame({viewportWidth=1920, viewportHeight=1080, ...props}:VideoWallFrameProps) { return <DeviceSurface deviceId="DEVICE.LARGE_FORMAT.VIDEO_WALL" name="Video Wall" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
