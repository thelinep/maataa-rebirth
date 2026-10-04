import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type ThermostatDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function ThermostatDisplayFrame({viewportWidth=1280, viewportHeight=800, ...props}:ThermostatDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.SMART_HOME.THERMOSTAT_DISPLAY" name="Thermostat Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
