import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type StageConfidenceMonitorFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function StageConfidenceMonitorFrame({viewportWidth=768, viewportHeight=1024, ...props}:StageConfidenceMonitorFrameProps) { return <DeviceSurface deviceId="DEVICE.EVENT.STAGE_CONFIDENCE_MONITOR" name="Stage Confidence Monitor" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
