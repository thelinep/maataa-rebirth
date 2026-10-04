import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type VideoVillageDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function VideoVillageDisplayFrame({viewportWidth=1920, viewportHeight=1080, ...props}:VideoVillageDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.PRODUCTION.VIDEO_VILLAGE_DISPLAY" name="Video Village Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
