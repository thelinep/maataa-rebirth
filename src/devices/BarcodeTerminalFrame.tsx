import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type BarcodeTerminalFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function BarcodeTerminalFrame({viewportWidth=360, viewportHeight=640, ...props}:BarcodeTerminalFrameProps) { return <DeviceSurface deviceId="DEVICE.HANDHELD_ENTERPRISE.BARCODE_TERMINAL" name="Barcode Terminal" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
