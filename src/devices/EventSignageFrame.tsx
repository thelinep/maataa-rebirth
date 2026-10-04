import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type EventSignageFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function EventSignageFrame({viewportWidth=768, viewportHeight=1024, ...props}:EventSignageFrameProps) { return <DeviceSurface deviceId="DEVICE.EVENT.EVENT_SIGNAGE" name="Event Signage" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
