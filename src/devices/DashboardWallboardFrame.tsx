import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DashboardWallboardFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DashboardWallboardFrame({viewportWidth=1920, viewportHeight=1080, ...props}:DashboardWallboardFrameProps) { return <DeviceSurface deviceId="DEVICE.WALLBOARD.DASHBOARD_WALLBOARD" name="Dashboard Wallboard" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
