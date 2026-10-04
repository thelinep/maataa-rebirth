import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CardTerminalFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CardTerminalFrame({viewportWidth=480, viewportHeight=800, ...props}:CardTerminalFrameProps) { return <DeviceSurface deviceId="DEVICE.PAYMENT.CARD_TERMINAL" name="Card Terminal" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
