import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type RearSeatDisplayFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function RearSeatDisplayFrame({viewportWidth=1280, viewportHeight=480, ...props}:RearSeatDisplayFrameProps) { return <DeviceSurface deviceId="DEVICE.AUTOMOTIVE.REAR_SEAT_DISPLAY" name="Rear-Seat Display" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
