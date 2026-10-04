import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type EmbeddedTouchscreenFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function EmbeddedTouchscreenFrame({viewportWidth=800, viewportHeight=480, ...props}:EmbeddedTouchscreenFrameProps) { return <DeviceSurface deviceId="DEVICE.EMBEDDED.EMBEDDED_TOUCHSCREEN" name="Embedded Touchscreen" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
