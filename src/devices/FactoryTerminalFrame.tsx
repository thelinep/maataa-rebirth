import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FactoryTerminalFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FactoryTerminalFrame({viewportWidth=1280, viewportHeight=800, ...props}:FactoryTerminalFrameProps) { return <DeviceSurface deviceId="DEVICE.INDUSTRIAL.FACTORY_TERMINAL" name="Factory Terminal" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
