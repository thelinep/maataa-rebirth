import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type PINPadFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function PINPadFrame({viewportWidth=480, viewportHeight=800, ...props}:PINPadFrameProps) { return <DeviceSurface deviceId="DEVICE.PAYMENT.PIN_PAD" name="PIN Pad" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
