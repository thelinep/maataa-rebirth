import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ImagingWorkstationFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ImagingWorkstationFrame({viewportWidth=1600, viewportHeight=900, ...props}:ImagingWorkstationFrameProps) { return <DeviceSurface deviceId="DEVICE.MEDICAL.IMAGING_WORKSTATION" name="Imaging Workstation" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
