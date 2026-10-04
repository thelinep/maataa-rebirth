import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type GroundControlStationFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function GroundControlStationFrame({viewportWidth=1280, viewportHeight=720, ...props}:GroundControlStationFrameProps) { return <DeviceSurface deviceId="DEVICE.DRONES.GROUND_CONTROL_STATION" name="Ground Control Station" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
