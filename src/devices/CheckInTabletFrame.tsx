import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CheckInTabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CheckInTabletFrame({viewportWidth=768, viewportHeight=1024, ...props}:CheckInTabletFrameProps) { return <DeviceSurface deviceId="DEVICE.EVENT.CHECK_IN_TABLET" name="Check-In Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
