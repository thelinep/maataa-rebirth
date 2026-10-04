import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type OperatorStationFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function OperatorStationFrame({viewportWidth=1920, viewportHeight=1080, ...props}:OperatorStationFrameProps) { return <DeviceSurface deviceId="DEVICE.CONTROL_SYSTEMS.OPERATOR_STATION" name="Operator Station" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
