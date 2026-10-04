import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type Device2In1FrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function Device2In1Frame({viewportWidth=1366, viewportHeight=768, ...props}:Device2In1FrameProps) { return <DeviceSurface deviceId="DEVICE.PORTABLE_COMPUTING.2_IN_1" name="2-in-1" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
