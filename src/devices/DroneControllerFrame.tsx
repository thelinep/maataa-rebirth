import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DroneControllerFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DroneControllerFrame({viewportWidth=480, viewportHeight=800, ...props}:DroneControllerFrameProps) { return <DeviceSurface deviceId="DEVICE.REMOTE_CONTROLS.DRONE_CONTROLLER" name="Drone Controller" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
