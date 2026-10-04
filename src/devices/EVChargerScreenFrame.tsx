import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type EVChargerScreenFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function EVChargerScreenFrame({viewportWidth=1024, viewportHeight=600, ...props}:EVChargerScreenFrameProps) { return <DeviceSurface deviceId="DEVICE.MOBILITY.EV_CHARGER_SCREEN" name="EV Charger Screen" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
