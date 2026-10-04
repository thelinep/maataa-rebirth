import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type SituationBoardFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function SituationBoardFrame({viewportWidth=1920, viewportHeight=1080, ...props}:SituationBoardFrameProps) { return <DeviceSurface deviceId="DEVICE.WALLBOARD.SITUATION_BOARD" name="Situation Board" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
