import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type PaymentTerminalFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function PaymentTerminalFrame({viewportWidth=480, viewportHeight=800, ...props}:PaymentTerminalFrameProps) { return <DeviceSurface deviceId="DEVICE.PAYMENT.PAYMENT_TERMINAL" name="Payment Terminal" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
