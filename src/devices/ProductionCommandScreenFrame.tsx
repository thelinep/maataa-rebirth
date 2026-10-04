import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ProductionCommandScreenFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ProductionCommandScreenFrame({viewportWidth=1440, viewportHeight=900, ...props}:ProductionCommandScreenFrameProps) { return <DeviceSurface deviceId="DEVICE.SPATIAL_EVENT_OPS.PRODUCTION_COMMAND_SCREEN" name="Production Command Screen" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
