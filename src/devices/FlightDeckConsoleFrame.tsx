import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type FlightDeckConsoleFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function FlightDeckConsoleFrame({viewportWidth=1920, viewportHeight=720, ...props}:FlightDeckConsoleFrameProps) { return <DeviceSurface deviceId="DEVICE.AVIATION.FLIGHT_DECK_CONSOLE" name="Flight Deck Console" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
