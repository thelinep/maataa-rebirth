import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ApplianceControlPanelFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ApplianceControlPanelFrame({viewportWidth=800, viewportHeight=480, ...props}:ApplianceControlPanelFrameProps) { return <DeviceSurface deviceId="DEVICE.APPLIANCES.APPLIANCE_CONTROL_PANEL" name="Appliance Control Panel" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
