import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TeleprompterFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TeleprompterFrame({viewportWidth=1920, viewportHeight=1080, ...props}:TeleprompterFrameProps) { return <DeviceSurface deviceId="DEVICE.PRODUCTION.TELEPROMPTER" name="Teleprompter" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
