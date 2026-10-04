import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SwitchControlDeviceFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SwitchControlDeviceFrame({viewportWidth=1280, viewportHeight=800, ...props}:SwitchControlDeviceFrameProps) { return <DeviceSurface deviceId="DEVICE.ACCESSIBILITY.SWITCH_CONTROL_DEVICE" name="Switch-Control Device" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
