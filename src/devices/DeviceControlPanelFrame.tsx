import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type DeviceControlPanelFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function DeviceControlPanelFrame({viewportWidth=800, viewportHeight=480, ...props}:DeviceControlPanelFrameProps) { return <DeviceSurface deviceId="DEVICE.EMBEDDED.DEVICE_CONTROL_PANEL" name="Device Control Panel" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
