import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ScreenReaderHostFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ScreenReaderHostFrame({viewportWidth=1280, viewportHeight=800, ...props}:ScreenReaderHostFrameProps) { return <DeviceSurface deviceId="DEVICE.ACCESSIBILITY.SCREEN_READER_HOST" name="Screen Reader Host" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
