import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ShelfDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ShelfDisplayFrame({viewportWidth=1080, viewportHeight=720, ...props}:ShelfDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.RETAIL.SHELF_DISPLAY" name="Shelf Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
