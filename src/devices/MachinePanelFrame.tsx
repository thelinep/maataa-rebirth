import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MachinePanelFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MachinePanelFrame({viewportWidth=1280, viewportHeight=800, ...props}:MachinePanelFrameProps) { return <DeviceSurface deviceId="DEVICE.INDUSTRIAL.MACHINE_PANEL" name="Machine Panel" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
