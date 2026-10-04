import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type VenueControlScreenFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function VenueControlScreenFrame({viewportWidth=1440, viewportHeight=900, ...props}:VenueControlScreenFrameProps) { return <DeviceSurface deviceId="DEVICE.SPATIAL_EVENT_OPS.VENUE_CONTROL_SCREEN" name="Venue Control Screen" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
