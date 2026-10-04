import React from "react";
import { DeviceSurface, type DeviceSurfaceProps } from "./DeviceSurface";
export type LearningKioskFrameProps = Omit<DeviceSurfaceProps, "deviceId" | "name" | "viewportWidth" | "viewportHeight"> & { viewportWidth?:number; viewportHeight?:number };
export function LearningKioskFrame({viewportWidth=1366, viewportHeight=768, ...props}:LearningKioskFrameProps) { return <DeviceSurface deviceId="DEVICE.EDUCATION.LEARNING_KIOSK" name="Learning Kiosk" viewportWidth={viewportWidth} viewportHeight={viewportHeight} {...props} />; }
