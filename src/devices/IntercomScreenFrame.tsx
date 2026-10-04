import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type IntercomScreenFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function IntercomScreenFrame({viewportWidth=1280, viewportHeight=800, ...props}:IntercomScreenFrameProps) { return <DeviceSurface deviceId="DEVICE.SMART_HOME.INTERCOM_SCREEN" name="Intercom Screen" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
