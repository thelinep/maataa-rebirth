import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type PhabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function PhabletFrame({viewportWidth=390, viewportHeight=844, ...props}:PhabletFrameProps) { return <DeviceSurface deviceId="DEVICE.PHONES.PHABLET" name="Phablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
