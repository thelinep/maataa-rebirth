import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FoldablePhoneFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FoldablePhoneFrame({viewportWidth=360, viewportHeight=800, ...props}:FoldablePhoneFrameProps) { return <DeviceSurface deviceId="DEVICE.FOLDABLES.FOLDABLE_PHONE" name="Foldable Phone" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
