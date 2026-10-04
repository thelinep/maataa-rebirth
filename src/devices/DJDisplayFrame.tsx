import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DJDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DJDisplayFrame({viewportWidth=1280, viewportHeight=720, ...props}:DJDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.AUDIO_DEVICES.DJ_DISPLAY" name="DJ Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
