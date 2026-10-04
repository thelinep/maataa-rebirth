import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type AudioConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function AudioConsoleFrame({viewportWidth=1280, viewportHeight=720, ...props}:AudioConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.AUDIO_DEVICES.AUDIO_CONSOLE" name="Audio Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
