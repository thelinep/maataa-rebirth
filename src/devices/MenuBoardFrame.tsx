import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type MenuBoardFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function MenuBoardFrame({viewportWidth=1080, viewportHeight=1920, ...props}:MenuBoardFrameProps) { return <DeviceSurface deviceId="DEVICE.SIGNAGE.MENU_BOARD" name="Menu Board" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
