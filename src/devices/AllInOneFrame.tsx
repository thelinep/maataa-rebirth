import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type AllInOneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function AllInOneFrame({viewportWidth=1440, viewportHeight=900, ...props}:AllInOneFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_COMPUTING.ALL_IN_ONE" name="All-in-One" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
