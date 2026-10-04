import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FleetTerminalFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FleetTerminalFrame({viewportWidth=1024, viewportHeight=600, ...props}:FleetTerminalFrameProps) { return <DeviceSurface deviceId="DEVICE.MOBILITY.FLEET_TERMINAL" name="Fleet Terminal" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
