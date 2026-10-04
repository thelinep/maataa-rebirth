import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type NotebookFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function NotebookFrame({viewportWidth=1366, viewportHeight=768, ...props}:NotebookFrameProps) { return <DeviceSurface deviceId="DEVICE.PORTABLE_COMPUTING.NOTEBOOK" name="Notebook" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
