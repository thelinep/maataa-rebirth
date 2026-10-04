import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MixingConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MixingConsoleFrame({viewportWidth=1280, viewportHeight=720, ...props}:MixingConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.AUDIO_DEVICES.MIXING_CONSOLE" name="Mixing Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
