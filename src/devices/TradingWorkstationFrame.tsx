import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type TradingWorkstationFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function TradingWorkstationFrame({viewportWidth=1440, viewportHeight=900, ...props}:TradingWorkstationFrameProps) { return <DeviceSurface deviceId="DEVICE.DESKTOP_COMPUTING.TRADING_WORKSTATION" name="Trading Workstation" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
