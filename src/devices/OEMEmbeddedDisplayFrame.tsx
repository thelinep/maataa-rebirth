import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type OEMEmbeddedDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function OEMEmbeddedDisplayFrame({viewportWidth=800, viewportHeight=480, ...props}:OEMEmbeddedDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.EMBEDDED.OEM_EMBEDDED_DISPLAY" name="OEM Embedded Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
