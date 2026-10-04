import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type WarehouseHandheldFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function WarehouseHandheldFrame({viewportWidth=360, viewportHeight=640, ...props}:WarehouseHandheldFrameProps) { return <DeviceSurface deviceId="DEVICE.HANDHELD_ENTERPRISE.WAREHOUSE_HANDHELD" name="Warehouse Handheld" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
