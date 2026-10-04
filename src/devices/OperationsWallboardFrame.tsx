import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type OperationsWallboardFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function OperationsWallboardFrame({viewportWidth=1920, viewportHeight=1080, ...props}:OperationsWallboardFrameProps) { return <DeviceSurface deviceId="DEVICE.WALLBOARD.OPERATIONS_WALLBOARD" name="Operations Wallboard" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
