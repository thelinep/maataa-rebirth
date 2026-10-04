import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type InstrumentClusterFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function InstrumentClusterFrame({viewportWidth=1280, viewportHeight=480, ...props}:InstrumentClusterFrameProps) { return <DeviceSurface deviceId="DEVICE.AUTOMOTIVE.INSTRUMENT_CLUSTER" name="Instrument Cluster" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
