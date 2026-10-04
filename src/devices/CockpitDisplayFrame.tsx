import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type CockpitDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function CockpitDisplayFrame({viewportWidth=1920, viewportHeight=1080, ...props}:CockpitDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.CONTROL_SYSTEMS.COCKPIT_DISPLAY" name="Cockpit Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
