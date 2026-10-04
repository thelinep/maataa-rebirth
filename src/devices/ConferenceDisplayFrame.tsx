import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ConferenceDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ConferenceDisplayFrame({viewportWidth=1920, viewportHeight=1080, ...props}:ConferenceDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.LARGE_FORMAT.CONFERENCE_DISPLAY" name="Conference Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
