import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type IoTDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function IoTDisplayFrame({viewportWidth=800, viewportHeight=480, ...props}:IoTDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.EMBEDDED.IOT_DISPLAY" name="IoT Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
