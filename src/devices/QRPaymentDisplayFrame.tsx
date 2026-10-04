import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type QRPaymentDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function QRPaymentDisplayFrame({viewportWidth=480, viewportHeight=800, ...props}:QRPaymentDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.PAYMENT.QR_PAYMENT_DISPLAY" name="QR Payment Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
