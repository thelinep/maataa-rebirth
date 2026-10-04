import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TaxiDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TaxiDisplayFrame({viewportWidth=1024, viewportHeight=600, ...props}:TaxiDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.MOBILITY.TAXI_DISPLAY" name="Taxi Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
