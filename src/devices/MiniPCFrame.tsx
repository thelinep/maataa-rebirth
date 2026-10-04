import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MiniPCFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MiniPCFrame({viewportWidth=1440, viewportHeight=900, ...props}:MiniPCFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_COMPUTING.MINI_PC" name="Mini PC" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
