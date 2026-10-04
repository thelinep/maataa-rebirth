import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FloorPlanTabletFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FloorPlanTabletFrame({viewportWidth=1440, viewportHeight=900, ...props}:FloorPlanTabletFrameProps) { return <DeviceSurface deviceId="DEVICE.SPATIAL_EVENT_OPS.FLOOR_PLAN_TABLET" name="Floor-Plan Tablet" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
