import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TicketingKioskFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TicketingKioskFrame({viewportWidth=1080, viewportHeight=1920, ...props}:TicketingKioskFrameProps) { return <DeviceSurface deviceId="DEVICE.KIOSK.TICKETING_KIOSK" name="Ticketing Kiosk" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
