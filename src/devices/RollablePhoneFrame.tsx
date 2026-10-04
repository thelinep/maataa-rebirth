import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RollablePhoneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RollablePhoneFrame({viewportWidth=360, viewportHeight=800, ...props}:RollablePhoneFrameProps) { return <DeviceSurface deviceId="DEVICE.FOLDABLES.ROLLABLE_PHONE" name="Rollable Phone" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
