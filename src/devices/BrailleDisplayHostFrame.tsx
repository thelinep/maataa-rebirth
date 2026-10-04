import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type BrailleDisplayHostFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function BrailleDisplayHostFrame({viewportWidth=1280, viewportHeight=800, ...props}:BrailleDisplayHostFrameProps) { return <DeviceSurface deviceId="DEVICE.ACCESSIBILITY.BRAILLE_DISPLAY_HOST" name="Braille Display Host" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
