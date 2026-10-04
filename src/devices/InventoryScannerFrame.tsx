import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type InventoryScannerFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function InventoryScannerFrame({viewportWidth=360, viewportHeight=640, ...props}:InventoryScannerFrameProps) { return <DeviceSurface deviceId="DEVICE.HANDHELD_ENTERPRISE.INVENTORY_SCANNER" name="Inventory Scanner" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
